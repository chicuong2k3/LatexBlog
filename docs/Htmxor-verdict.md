# Htmxor Gate Verdict — 2026-08-17

## Result: FAILED — Htmxor does not run on .NET 10. Fallback mode active.

## Evidence

- Installed `Htmxor 1.0.0-beta.1.24` (latest on NuGet — verified via
  `https://api.nuget.org/v3-flatcontainer/htmxor/index.json`; no newer version exists).
- App compiled fine (0 errors) with `AddHtmx()`, `[HtmxRoute]`, `ConditionalComponentBase`,
  `<HtmxFragment RenderDuringStandardRequest="false">`, `<HtmxHeadOutlet />`.
- **Runtime failure:** `NullReferenceException` at startup:
  ```
  HtmxorComponentEndpointRouteBuilderExtensions.AddHtmxorComponentEndpoints
    → GetDiscoveredComponents(...) : line 28
  ```
- **Root cause:** `GetDiscoveredComponents()` reflects into Blazor internals:
  `builder.GetProperty("ApplicationBuilder", NonPublic)` → `appBuilder.Components`
  → `ToComponentCollection()`. Reflection probe against the installed runtime
  (`Microsoft.AspNetCore.Components.Endpoints.dll`, .NET 10.0.8) shows
  `Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilder` in .NET 10
  exposes only: `ComponentApplicationBuilderActions`, `ManifestPath`,
  `ResourceCollectionConventionRegistered`, `EndpointRouteBuilder` — **the private
  `ApplicationBuilder` property was removed/renamed in .NET 10**. `GetProperty`
  returns null → `GetValue(null)` → NRE.
- The Htmxor GitHub `main` branch uses the same reflection code — no fix upstream.
- No open GitHub issue specifically tracking .NET 10 compatibility (issues #57, #75 are
  related but do not address this).

## Decision

**Fallback mode (per plan Task 2):**

- Remove Htmxor package + all Htmxor wiring.
- Load **htmx 1.9.12 from jsDelivr CDN** in `App.razor` head.
- Serve HTML fragments from **minimal API endpoints using `HtmlRenderer`**
  (already registered by `AddRazorComponents()`):
  `app.MapGet("/posts", ...)`, `app.MapGet("/tags", ...)`, `app.MapGet("/search", ...)`
  each render a plain fragment component (no `@page`, no layout) to a string and return
  `Results.Content(html, "text/html")`.
- **All fragment requests are GET** (no POST) → no antiforgery plumbing needed.
- htmx attributes in pages: `hx-get` + `hx-target` + `hx-swap` only.

## Verified API surface (for the fallback)

- `HtmlRenderer` — namespace `Microsoft.AspNetCore.Components.Web`, registered by
  `AddRazorComponents()`.
- `renderer.Dispatcher.InvokeAsync(() => renderer.RenderComponentAsync<T>(parameters))`
  → `HtmlRootComponent`; `.ToHtmlString().ToString()` → fragment HTML.
- `ParameterView.FromDictionary(new Dictionary<string, object?>{ [nameof(P.Query)] = v })`.

## Impact on plan tasks

- Tasks 9 (load-more), 11 (tag), 12 (search) use the fallback endpoint pattern instead of
  `[HtmxRoute]`. Task 2's component probe is replaced by an endpoint probe at `/probe`.