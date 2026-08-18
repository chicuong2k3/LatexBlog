using LatexBlog.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents();
builder.Services.AddScoped<HtmlRenderer>();
builder.Services.AddSingleton<LatexBlog.Services.PostStore>();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();

app.UseAntiforgery();

// Static files: classic middleware. MapStaticAssets (dotnet 9/10) registers
// precompressed gzip variants in its manifest that do not exist in dev, so
// any client accepting gzip receives an empty 200 for css/js — served raw here.
app.UseStaticFiles();

// ---- htmx fragment endpoints (fallback mode; see docs/Htmxor-verdict.md) ----
// HtmlRenderer renders a component to an HTML string; the endpoint returns the
// body-only fragment for htmx to swap in. All fragment requests are GET.
app.MapGet("/posts", async ([FromServices] HtmlRenderer renderer, int? page) =>
{
    var html = await renderer.Dispatcher.InvokeAsync(async () =>
    {
        var root = await renderer.RenderComponentAsync<LatexBlog.Components.Pages.PostList>(
            ParameterView.FromDictionary(new Dictionary<string, object?>
            {
                [nameof(LatexBlog.Components.Pages.PostList.Page)] = Math.Max(1, page ?? 1),
            }));
        return root.ToHtmlString().ToString();
    });
    return Results.Content(html, "text/html; charset=utf-8");
});

app.MapGet("/tags", async ([FromServices] HtmlRenderer renderer, string? tag) =>
{
    var html = await renderer.Dispatcher.InvokeAsync(async () =>
    {
        var root = await renderer.RenderComponentAsync<LatexBlog.Components.Pages.TagList>(
            ParameterView.FromDictionary(new Dictionary<string, object?>
            {
                [nameof(LatexBlog.Components.Pages.TagList.Tag)] = tag ?? "",
            }));
        return root.ToHtmlString().ToString();
    });
    return Results.Content(html, "text/html; charset=utf-8");
});

app.MapGet("/search/results", async ([FromServices] HtmlRenderer renderer, string? q) =>
{
    var html = await renderer.Dispatcher.InvokeAsync(async () =>
    {
        var root = await renderer.RenderComponentAsync<LatexBlog.Components.Pages.SearchResults>(
            ParameterView.FromDictionary(new Dictionary<string, object?>
            {
                [nameof(LatexBlog.Components.Pages.SearchResults.Q)] = q ?? "",
            }));
        return root.ToHtmlString().ToString();
    });
    return Results.Content(html, "text/html; charset=utf-8");
});

// ---- RSS + sitemap ----
app.MapGet("/rss.xml", (LatexBlog.Services.PostStore store, HttpContext ctx) =>
{
    var baseUrl = $"{ctx.Request.Scheme}://{ctx.Request.Host}";
    var sb = new System.Text.StringBuilder();
    sb.Append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
    sb.Append("<rss version=\"2.0\"><channel>");
    sb.Append("<title>Alternative World</title><link>").Append(baseUrl).Append("</link>");
    sb.Append("<description>Viết bằng LaTeX, xuất bản bằng Blazor.</description>");
    foreach (var p in store.All)
    {
        sb.Append("<item><title>").Append(System.Net.WebUtility.HtmlEncode(p.Title)).Append("</title>");
        sb.Append("<link>").Append(baseUrl).Append("/posts/").Append(p.Slug).Append("</link>");
        sb.Append("<guid>").Append(baseUrl).Append("/posts/").Append(p.Slug).Append("</guid>");
        sb.Append("<description>").Append(System.Net.WebUtility.HtmlEncode(p.Summary)).Append("</description>");
        sb.Append("<pubDate>").Append(DateTimeOffset.Parse(p.Date).ToUniversalTime().ToString("R")).Append("</pubDate>");
        sb.Append("</item>");
    }
    sb.Append("</channel></rss>");
    return Results.Content(sb.ToString(), "application/rss+xml; charset=utf-8");
});

app.MapGet("/sitemap.xml", (LatexBlog.Services.PostStore store, HttpContext ctx) =>
{
    var baseUrl = $"{ctx.Request.Scheme}://{ctx.Request.Host}";
    var sb = new System.Text.StringBuilder();
    sb.Append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
    sb.Append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");
    sb.Append("<url><loc>").Append(baseUrl).Append("/</loc></url>");
    foreach (var p in store.All)
    {
        sb.Append("<url><loc>").Append(baseUrl).Append("/posts/").Append(p.Slug).Append("</loc></url>");
    }
    sb.Append("</urlset>");
    return Results.Content(sb.ToString(), "application/xml; charset=utf-8");
});

// ---- cover SVG (bìa tự sinh cho bài viết / og:image) ----
app.MapGet("/cover/{slug}.svg", (LatexBlog.Services.PostStore store, string slug) =>
{
    var p = store.All.FirstOrDefault(x => x.Slug == slug);
    var title = p?.Title ?? "Alternative World";
    var safe = System.Net.WebUtility.HtmlEncode(title);
    var svg = $"""
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#1b1530"/><stop offset=".55" stop-color="#0e0c1e"/><stop offset="1" stop-color="#241a3d"/>
            </linearGradient>
            <radialGradient id="glow" cx=".85" cy=".15" r=".6">
              <stop offset="0" stop-color="#ff5fa2" stop-opacity=".5"/><stop offset="1" stop-color="#ff5fa2" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#g)"/>
          <rect width="1200" height="630" fill="url(#glow)"/>
          <g fill="none" stroke="#ff5fa2" stroke-width="6" opacity=".9">
            <path d="M600 330 C560 296 520 246 545 205 C558 182 590 180 600 198 C610 180 642 182 655 205 C680 246 640 296 600 330 Z"/>
            <path d="M600 330 C560 296 520 246 545 205 C558 182 590 180 600 198 C610 180 642 182 655 205 C680 246 640 296 600 330 Z" transform="rotate(72 600 330)"/>
            <path d="M600 330 C560 296 520 246 545 205 C558 182 590 180 600 198 C610 180 642 182 655 205 C680 246 640 296 600 330 Z" transform="rotate(144 600 330)"/>
            <path d="M600 330 C560 296 520 246 545 205 C558 182 590 180 600 198 C610 180 642 182 655 205 C680 246 640 296 600 330 Z" transform="rotate(216 600 330)"/>
            <path d="M600 330 C560 296 520 246 545 205 C558 182 590 180 600 198 C610 180 642 182 655 205 C680 246 640 296 600 330 Z" transform="rotate(288 600 330)"/>
          </g>
          <text x="600" y="455" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#efe9f6">Alternative World</text>
          <text x="600" y="540" text-anchor="middle" font-family="Georgia, serif" font-size="58" font-weight="700" fill="#f7a0c6">{safe}</text>
        </svg>
        """;
    return Results.Content(svg, "image/svg+xml; charset=utf-8");
});

app.MapRazorComponents<App>();

app.Run();