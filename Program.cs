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

app.MapStaticAssets();

// ---- htmx fragment endpoints (fallback mode; see docs/Htmxor-verdict.md) ----
// HtmlRenderer renders a component to an HTML string; the endpoint returns the
// body-only fragment for htmx to swap in. All fragment requests are GET.
app.MapGet("/probe", async ([FromServices] HtmlRenderer renderer) =>
{
    var html = await renderer.Dispatcher.InvokeAsync(async () =>
    {
        var root = await renderer.RenderComponentAsync<LatexBlog.Components.Pages.HtmxProbe>();
        return root.ToHtmlString().ToString();
    });
    return Results.Content(html, "text/html; charset=utf-8");
});

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

app.MapRazorComponents<App>();

app.Run();