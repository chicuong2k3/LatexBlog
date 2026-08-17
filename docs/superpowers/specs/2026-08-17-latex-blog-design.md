# LatexBlog — Design Specification

**Date:** 2026-08-17
**Status:** Approved by user (2026-08-17)
**Stack:** .NET 10 Blazor Web App (Static SSR) · DAUB CSS · Htmxor (htmx) · Alpine.js · Pandoc (build-time LaTeX → HTML)

---

## 1. Goal

A personal blog where posts are authored as full LaTeX documents (`.tex`) in the repo, converted to static HTML fragments at build time via Pandoc, and served by a Blazor Web App running in **Static SSR mode** (no SignalR, no WebAssembly). Interactivity is handled by **htmx (via Htmxor)** for partial-page updates and **Alpine.js + DAUB JS** for client-side micro-interactions.

Deployment target: any .NET server host (VPS / Docker / IIS / Azure).

## 2. Non-Goals

- No RSS feed (explicitly declined).
- No comments system in v1.
- No runtime LaTeX rendering (build-time only).
- No admin UI / CMS — posts are committed as files.
- No Blazor interactive render modes (InteractiveServer / InteractiveAuto / WASM).
- No enhanced navigation (turned off to avoid re-init conflicts with DAUB/Alpine/htmx partials).

## 3. Architecture

```
posts/*.tex                        ← source of truth (YAML frontmatter in LaTeX comment block)
   │
   ▼  MSBuild BeforeBuild target → build script (Python stdlib)
wwwroot/generated/posts/*.html     ← Pandoc-rendered HTML fragments (KaTeX + code highlight CSS embedded)
wwwroot/generated/index.json       ← build-time metadata index (title, slug, date, tags, summary)
   │
   ▼  runtime (Static SSR)
Blazor components read generated files via PostStore singleton service
   ├── htmx (Htmxor)               → /search, /tags/{tag}, /posts/load-more (HTML fragment responses)
   └── Alpine.js + DAUB JS         → dark mode toggle, TOC scrollspy, mobile menu, copy-code, etc.
```

**Rationale for build-time:** posts become static HTML at build time → runtime only reads files (fast, cacheable, SEO-friendly); production server needs no LaTeX toolchain — Pandoc is a dev/CI dependency only.

## 4. Content Format (`posts/`)

Each post is one `.tex` file. Frontmatter is YAML inside a LaTeX comment block so the file remains valid LaTeX:

```latex
%---
% title: "Đạo hàm và ý nghĩa hình học"
% date: 2026-08-17
% tags: [math, latex]
% summary: "Tìm hiểu đạo hàm qua góc nhìn hình học."
%---
\section{Giới thiệu}
...
\begin{equation}
f'(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}
\end{equation}
```

- **Slug:** default = filename (without `.tex`), overridable via `slug:` in frontmatter.
- **Processing:** build script (1) parses frontmatter (Python `yaml`-less parser or regex — stdlib only), (2) strips the comment block, (3) invokes Pandoc.

## 5. Pandoc Invocation

```bash
pandoc input.tex \
  --from latex \
  --to html5 \
  --katex \
  --highlight-style=pygments \
  --standalone=false \
  --wrap=none \
  --template=html-fragment   # custom minimal template, body only
```

- **Math:** `--katex` emits KaTeX markup + auto-includes KaTeX CSS/JS CDN links (client-side rendering — no server math engine).
- **Code highlighting:** `--highlight-style=pygments` renders syntax-highlighted `<span>`s with class names; the matching Pygments CSS is emitted into the fragment so no client JS is needed (per user choice).
- **Output:** body-only HTML fragment stored at `wwwroot/generated/posts/{slug}.html`.

## 6. Build Pipeline

- **MSBuild target** (`BeforeBuild`) in the main project file invokes the build script (`tools/build_posts.py`, Python stdlib only — runs on any dev machine with Python 3).
- Build script responsibilities:
  1. Scan `posts/*.tex`.
  2. Parse frontmatter → metadata dict; validate required fields (`title`, `date`, `tags`, `summary`).
  3. Strip frontmatter comment block.
  4. Run Pandoc per file → write HTML fragment.
  5. Write `wwwroot/generated/index.json` (sorted by date desc).
- **Fail fast:** script exits non-zero with a clear message if Pandoc is missing or a post fails to convert.
- **Pandoc install (dev machine):** `winget install --id JohnMacFarlane.Pandoc` — documented in README; production does not need it.
- **Generated files** are git-ignored or committed? Decision: commit `index.json` is derived → `.gitignore` the whole `wwwroot/generated/`; regeneration is deterministic at build time. (If a CI without Python+Pandoc is needed later, revisit.)
- Content-root independent: `posts/` lives at repo root; script and project reference it via relative paths.

## 7. Blazor Application Structure (Static SSR)

| Route | Component | Responsibility |
|---|---|---|
| `/` | `Pages/Home.razor` | Post list (cards), tags, "Xem thêm" load-more button (htmx append) |
| `/posts/{slug}` | `Pages/Post.razor` | Reads HTML fragment, renders inside `db-prose`, TOC (scrollspy), tag links, prev/next optional |
| `/tags/{tag}` | `Pages/Tag.razor` | Filter by tag; htmx partial when switching tags |
| `/search` | `Pages/Search.razor` | htmx partial — input → server-side filter → HTML fragment result list |
| — | `Layout/MainLayout.razor` | Header (`db-nav`), dark-mode toggle (Alpine), footer |
| — | `App.razor` | DAUB CSS/JS, Alpine, htmx script tags; `data-theme` on `<html>` |

**Key decisions:**

- **Static SSR only** — no `@rendermode` interactive, no `.client.cs` files, no SignalR.
- **Enhanced navigation OFF** (`<EnhancedNav Enabled="false">` or equivalent in .NET 10) — avoids script re-init issues with DAUB/Alpine and avoids double-fetching alongside htmx partials.
- **PostStore** — singleton service loaded at startup from `index.json`; `GetPost(slug)` reads the HTML file from `wwwroot` and returns the fragment (cached in memory). Runtime never touches Pandoc/LaTeX.
- **404 handling:** unknown slug → `NotFound` result with friendly page.

## 8. htmx Integration (Htmxor)

- Package: `Htmxor` (egil/Htmxor) — first-party htmx support for ASP.NET Core; maps Razor components to endpoints returning fragments.
- **Search:** `input[hx-post="/search"][hx-trigger="input changed delay:300ms"]` → server filters title+summary (+ optionally HTML text) → returns fragment with result cards; Alpine manages input state/debounce.
- **Tag filter:** clicking a tag issues `hx-get="/tags/{tag}"` (partial) or filters in place on the tag page; page does not reload.
- **Load-more:** `hx-get="/posts?page=N"` with `hx-swap="beforeend"` appends the next page of cards; button hidden when no more posts.
- **Important:** htmx responses must be fragments (no full HTML document) — Htmxor components are mapped with `[HtmxRoute]` and return partial markup only.

## 9. Client-Side (DAUB + Alpine.js)

- **DAUB CSS:** `daub-classless.css` for prose-heavy post body + `daub.css` component classes for chrome (`db-nav`, `db-card`, `db-breadcrumbs`, `db-button`, `db-chip`, `db-prose`). Loaded via CDN (daub.dev or jsDelivr pinned version) in `App.razor` `<head>`. No NuGet package exists — pure CSS/JS.
- **Dark mode:** Alpine `x-data` on layout → toggles `data-theme` attribute on `<html>` (DAUB theme families ship light+dark variants), persists to `localStorage`, respects `prefers-color-scheme` on first load.
- **TOC scrollspy:** Alpine + IntersectionObserver highlights current section in the post's table of contents.
- **Micro-interactions:** mobile menu toggle, copy-code button on `<pre>` blocks, subtle transitions. Keep Alpine usage minimal — DAUB JS already covers some components.
- **Fonts:** "Be Vietnam Pro" (Vietnamese subset) via Google Fonts for UI + body; KaTeX fonts auto-loaded by `--katex`.

## 10. i18n / Vietnamese

- UI chrome strings (menu, search placeholder, "Xem thêm", footer) via a small `I18n` static class / resx with Vietnamese default; structure ready for later languages.
- Slug normalization: Vietnamese diacritics stripped for URL slugs (if auto-generated from title); explicit `slug:` in frontmatter overrides.
- `lang="vi"` on `<html>`.

## 11. Project Layout

```
LatexBlog/
├── LatexBlog.csproj              # + MSBuild BeforeBuild target
├── posts/                        # *.tex sources
│   └── dao-ham-va-y-nghia-hinh-hoc.tex
├── tools/
│   └── build_posts.py            # frontmatter parse + pandoc + index.json
├── wwwroot/
│   └── generated/                # build output (git-ignored)
├── Components/
│   ├── App.razor
│   ├── Layout/MainLayout.razor
│   └── Pages/
│       ├── Home.razor
│       ├── Post.razor
│       ├── Tag.razor
│       └── Search.razor
├── Services/
│   └── PostStore.cs
└── I18n/ (resource strings)
```

## 12. Error Handling & Edge Cases

- Malformed frontmatter / missing required field → build fails with file+field name.
- Pandoc not installed → build fails with install hint.
- Post slug collision → build fails.
- Runtime: missing generated file for a known slug → 404 page (not crash).
- Empty search query → partial returns "no results" fragment (not an error).
- KaTeX/DAUB CDN offline → graceful: math shows raw LaTeX, prose remains readable.

## 13. Testing

- **Build-level (deterministic):** Python unit-ish checks — frontmatter parser round-trip, pandoc output contains expected KaTeX markup and Pygments spans, index.json sorted/valid.
- **Blazor/htmx (manual smoke):** home renders list; post page renders KaTeX + highlighted code; search partial returns fragment; tag filter; load-more appends; dark mode persists; 404 for bad slug.
- Optional later: Playwright E2E for the htmx flows.

## 14. Setup Steps (dev machine)

1. `winget install --id JohnMacFarlane.Pandoc` (or `choco install pandoc`).
2. `dotnet new blazor -o LatexBlog` (empty/static template), apply Static SSR config.
3. `dotnet add package Htmxor`.
4. Add DAUB + Alpine + htmx script tags in `App.razor`.
5. Add `posts/` + `tools/build_posts.py` + MSBuild target.
6. Implement components/services per sections 7–9.
7. `dotnet build` regenerates content; `dotnet run` to smoke-test.