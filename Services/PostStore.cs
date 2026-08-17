using System.Text.Json;

namespace LatexBlog.Services;

public sealed record PostMeta(
    string Slug, string Title, string Date, string[] Tags, string Summary);

public sealed class PostStore
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<PostStore> _logger;
    private readonly Dictionary<string, string> _htmlCache = new();
    private List<PostMeta>? _all;

    public PostStore(IWebHostEnvironment env, ILogger<PostStore> logger)
    {
        _env = env;
        _logger = logger;
    }

    private string GeneratedDir =>
        Path.Combine(_env.WebRootPath, "generated");

    public IReadOnlyList<PostMeta> All => _all ??= LoadIndex();

    private List<PostMeta> LoadIndex()
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
        return items.OrderByDescending(p => p.Date).ToList();
    }

    public PostMeta? GetMeta(string slug) =>
        All.FirstOrDefault(p => p.Slug == slug);

    public string? GetHtml(string slug)
    {
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
}
