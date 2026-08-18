using System.Text.Json;

namespace LatexBlog.Services;

public sealed record PostMeta(
    string Slug, string Title, string Date, string[] Tags, string Summary);

/// <summary>
/// Bài viết = file (.tex) + bài trên Supabase.
/// Cache có fail-safe + chống stampede (tương đương FusionCache mà không cần dependency):
/// - File posts: TTL 1h.
/// - DB posts: TTL 60s, nếu fetch lỗi → phục vụ bản cache cũ (blog vẫn chạy khi Supabase chết).
/// - Khóa lock → chỉ 1 request fetch DB khi cache hết hạn.
/// </summary>
public sealed class PostStore
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<PostStore> _logger;
    private readonly IConfiguration _config;
    private readonly HttpClient _http = new() { Timeout = TimeSpan.FromSeconds(5) };
    private readonly Dictionary<string, string> _htmlCache = new();
    private readonly object _dbLock = new();

    private List<PostMeta>? _filePosts;
    private DateTime _fileFetchedAt = DateTime.MinValue;

    private List<PostMeta>? _dbPosts;
    private Dictionary<string, string>? _dbBodies;
    private DateTime _dbFetchedAt = DateTime.MinValue;

    public PostStore(IWebHostEnvironment env, ILogger<PostStore> logger, IConfiguration config)
    {
        _env = env;
        _logger = logger;
        _config = config;
    }

    private string GeneratedDir =>
        Path.Combine(_env.WebRootPath, "generated");

    public IReadOnlyList<PostMeta> All
    {
        get
        {
            var file = GetFilePosts();
            var (db, _) = GetDbBundle();
            var all = new List<PostMeta>(file);
            all.AddRange(db);
            return all.OrderByDescending(p => p.Date).ToList();
        }
    }

    public PostMeta? GetMeta(string slug) =>
        All.FirstOrDefault(p => p.Slug == slug);

    public bool IsDbPost(string slug) =>
        GetDbBody(slug) is not null;

    public string? GetDbBody(string slug)
    {
        var (_, bodies) = GetDbBundle();
        return bodies != null && bodies.TryGetValue(slug, out var body) ? body : null;
    }

    public string? GetHtml(string slug)
    {
        if (IsDbPost(slug)) return null;
        if (_htmlCache.TryGetValue(slug, out var cached))
            return cached;
        var path = Path.Combine(GeneratedDir, "posts", $"{slug}.html");
        if (!File.Exists(path))
            return null;
        var html = File.ReadAllText(path);
        _htmlCache[slug] = html;
        return html;
    }

    public IReadOnlyList<PostMeta> Search(string q)
    {
        if (string.IsNullOrWhiteSpace(q))
            return Array.Empty<PostMeta>();
        var query = q.Trim();
        return All.Where(p =>
                p.Title.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                p.Summary.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                p.Tags.Any(t => t.Contains(query, StringComparison.OrdinalIgnoreCase)))
            .ToList();
    }

    // ---- cache file posts (TTL 1h) ----
    private List<PostMeta> GetFilePosts()
    {
        if (_filePosts != null && (DateTime.UtcNow - _fileFetchedAt).TotalHours < 1)
            return _filePosts;
        _filePosts = LoadFilePosts();
        _fileFetchedAt = DateTime.UtcNow;
        return _filePosts;
    }

    private List<PostMeta> LoadFilePosts()
    {
        var path = Path.Combine(GeneratedDir, "index.json");
        if (!File.Exists(path))
        {
            _logger.LogWarning("index.json missing at {Path} - run the build script.", path);
            return new List<PostMeta>();
        }
        var items = JsonSerializer.Deserialize<List<PostMeta>>(
            File.ReadAllText(path),
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
            ?? new List<PostMeta>();
        return items.ToList();
    }

    // ---- cache DB posts (TTL 60s, fail-safe + stampede-protected) ----
    private (List<PostMeta>, Dictionary<string, string>) GetDbBundle()
    {
        if (_dbPosts != null && (DateTime.UtcNow - _dbFetchedAt).TotalSeconds < 60)
            return (_dbPosts, _dbBodies ?? new Dictionary<string, string>());
        lock (_dbLock)
        {
            if (_dbPosts != null && (DateTime.UtcNow - _dbFetchedAt).TotalSeconds < 60)
                return (_dbPosts, _dbBodies ?? new Dictionary<string, string>());
            try
            {
                var (posts, bodies) = FetchDbBundle();
                _dbPosts = posts;
                _dbBodies = bodies;
                _dbFetchedAt = DateTime.UtcNow;
                return (posts, bodies);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Supabase posts fetch failed — serving cached (fail-safe)");
                if (_dbPosts != null)
                    return (_dbPosts, _dbBodies ?? new Dictionary<string, string>());
                return (new List<PostMeta>(), new Dictionary<string, string>());
            }
        }
    }

    private sealed record DbPostRow(string Slug, string Title, string Date, string[] Tags, string Summary, string BodyMd);

    private (List<PostMeta>, Dictionary<string, string>) FetchDbBundle()
    {
        var url = _config["Supabase:Url"];
        var key = _config["Supabase:AnonKey"];
        if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(key))
            return (new List<PostMeta>(), new Dictionary<string, string>());
        var req = new HttpRequestMessage(HttpMethod.Get,
            $"{url}/rest/v1/posts?select=slug,title,date,tags,summary,body_md&published=eq.true&order=date.desc");
        req.Headers.Add("apikey", key);
        req.Headers.Add("Authorization", $"Bearer {key}");
        var res = _http.Send(req);
        res.EnsureSuccessStatusCode();
        var json = res.Content.ReadAsStringAsync().GetAwaiter().GetResult();
        var rows = JsonSerializer.Deserialize<List<DbPostRow>>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new List<DbPostRow>();
        var posts = rows.Select(r => new PostMeta(r.Slug, r.Title, r.Date, r.Tags ?? Array.Empty<string>(), r.Summary)).ToList();
        var bodies = rows.ToDictionary(r => r.Slug, r => r.BodyMd);
        return (posts, bodies);
    }
}
