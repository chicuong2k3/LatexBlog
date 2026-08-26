using System.ComponentModel;
using System.Text.Json;
using ModelContextProtocol.Server;

namespace LatexBlog.Services;

/// <summary>
/// MCP tools cho admin viết bài từ xa (endpoint /mcp, Bearer Mcp:Token).
/// Bài ghi vào bảng Supabase posts (body markdown) — sống ngay, không cần deploy.
/// Ghi bằng Supabase:ServiceKey (bypass RLS); thiếu key → tool báo lỗi rõ ràng.
/// </summary>
[McpServerToolType]
public sealed class McpPostTools
{
    private static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(10) };
    private readonly IConfiguration _config;
    private readonly PostStore _store;

    public McpPostTools(IConfiguration config, PostStore store)
    {
        _config = config;
        _store = store;
    }

    private HttpRequestMessage Req(HttpMethod method, string pathAndQuery)
    {
        var url = _config["Supabase:Url"];
        var key = _config["Supabase:ServiceKey"];
        if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(key))
            throw new InvalidOperationException("Supabase:Url / Supabase:ServiceKey chưa cấu hình — không ghi được bài.");
        var req = new HttpRequestMessage(method, $"{url}/rest/v1/{pathAndQuery}");
        req.Headers.Add("apikey", key);
        req.Headers.Add("Authorization", $"Bearer {key}");
        return req;
    }

    [McpServerTool(Name = "list_posts"), Description("Liệt kê tất cả bài viết của blog (cả bài .tex build sẵn và bài DB) kèm metadata.")]
    public string ListPosts() =>
        JsonSerializer.Serialize(
            _store.All.Select(p => new { p.Slug, p.Title, p.Date, p.Tags, p.Summary, HasTldr = !string.IsNullOrEmpty(p.Tldr), Editable = _store.IsDbPost(p.Slug) }),
            new JsonSerializerOptions { WriteIndented = true, Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping });

    [McpServerTool(Name = "read_post"), Description("Đọc nội dung markdown của một bài DB theo slug. Bài .tex build sẵn không sửa từ xa được.")]
    public string ReadPost([Description("slug bài viết")] string slug)
    {
        var body = _store.GetDbBody(slug);
        if (body is not null) return body;
        return _store.GetMeta(slug) is null
            ? $"ERROR: không có bài '{slug}'."
            : $"ERROR: '{slug}' là bài .tex build sẵn trong repo — chỉ đọc/sửa qua git, không qua MCP.";
    }

    [McpServerTool(Name = "write_post"), Description(
        "Tạo mới hoặc ghi đè một bài viết DB (upsert theo slug). Thân bài là Markdown, hỗ trợ toán KaTeX ($...$, $$...$$) " +
        "và code fence. Bài hiển thị công khai gần như ngay lập tức (published=true, cache ~60s); truyền published=false để lưu nháp.")]
    public async Task<string> WritePost(
        [Description("slug kebab-case không dấu, vd: chuoi-taylor")] string slug,
        [Description("tiêu đề bài")] string title,
        [Description("ngày YYYY-MM-DD")] string date,
        [Description("danh sách tags")] string[] tags,
        [Description("tóm tắt 1-2 câu cho trang chủ/SEO")] string summary,
        [Description("TL;DR 2-3 câu hiển thị trong khung đầu bài")] string tldr,
        [Description("thân bài Markdown")] string bodyMd,
        [Description("true = công khai ngay, false = nháp")] bool published = true)
    {
        if (!System.Text.RegularExpressions.Regex.IsMatch(slug, "^[a-z0-9-]+$"))
            return "ERROR: slug phải là kebab-case không dấu ([a-z0-9-]).";
        if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", out _))
            return "ERROR: date phải có dạng YYYY-MM-DD.";
        if (tags.Length == 0 || string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(summary) || string.IsNullOrWhiteSpace(tldr))
            return "ERROR: title/tags/summary/tldr không được rỗng.";

        var req = Req(HttpMethod.Post, "posts?on_conflict=slug");
        req.Headers.Add("Prefer", "resolution=merge-duplicates,return=minimal");
        req.Content = new StringContent(JsonSerializer.Serialize(new
        {
            slug, title, date, tags, summary, tldr,
            body_md = bodyMd, published,
            updated_at = DateTime.UtcNow,
        }), System.Text.Encoding.UTF8, "application/json");
        var res = await Http.SendAsync(req);
        if (!res.IsSuccessStatusCode)
            return $"ERROR Supabase {(int)res.StatusCode}: {await res.Content.ReadAsStringAsync()}";
        _store.InvalidateDbCache();
        return $"OK: đã lưu '{slug}' ({(published ? "công khai" : "nháp")}) — /posts/{slug}";
    }

    [McpServerTool(Name = "set_published"), Description("Bật/tắt công khai một bài DB (publish nháp hoặc gỡ bài).")]
    public async Task<string> SetPublished(string slug, bool published)
    {
        var req = Req(HttpMethod.Patch, $"posts?slug=eq.{Uri.EscapeDataString(slug)}");
        req.Headers.Add("Prefer", "return=representation");
        req.Content = new StringContent(JsonSerializer.Serialize(new { published }), System.Text.Encoding.UTF8, "application/json");
        var res = await Http.SendAsync(req);
        var body = await res.Content.ReadAsStringAsync();
        if (!res.IsSuccessStatusCode) return $"ERROR Supabase {(int)res.StatusCode}: {body}";
        if (body == "[]") return $"ERROR: không có bài DB '{slug}'.";
        _store.InvalidateDbCache();
        return $"OK: '{slug}' → published={published}";
    }
}
