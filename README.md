# LatexBlog

Personal blog: posts written as LaTeX (`.tex`) or Markdown (`.md`), rendered
to static HTML at build time with Pandoc, served by a .NET 10 Blazor Web App
in **Static SSR** mode. Interactivity via htmx (1.9.12 CDN) partials and
Alpine.js. Styling via DAUB CSS.

## Stack

- .NET 10 Blazor Web App (Static SSR — no SignalR, no WASM, no enhanced nav)
- DAUB CSS 3.19.12 (jsDelivr) + daub-classless for prose
- htmx 1.9.12 (jsDelivr CDN) — fragment endpoints via HtmlRenderer: search,
  tag filter, load-more (Htmxor gate failed on .NET 10; see
  docs/Htmxor-verdict.md)
- Unpoly.Blazor.Shadcn (submodule, Tailwind v4 via `npm run css`) — UI components
- Vanilla JS as Unpoly `up.compiler`s — TOC scrollspy, mobile menu, copy-code,
  comments/auth (no Alpine; light theme only)
- KaTeX 0.16.11 (CSS + JS via CDN; `pandoc --katex` keeps raw TeX in `math
  inline` spans — client-side auto-render required)
- Python 3 (stdlib only) build script + Pandoc (dev/CI only)

## Prerequisites

- .NET 10 SDK
- Python 3
- Pandoc — **dev machine only**; production never needs it.
  - Install via winget (`winget install --id JohnMacFarlane.Pandoc`),
    chocolatey (`choco install pandoc`), or download the portable zip and
    place `pandoc.exe` under `tools/pandoc/` (auto-discovered; git-ignored).
  - Or set `PANDOC` env var to the full path.

## Setup & run

```bash
dotnet build      # MSBuild target regenerates wwwroot/generated/ from posts/
dotnet run        # serve at http://localhost:5080 (port 5000 is taken on this machine)
```

## Authoring a post

Two formats are supported in `posts/`: `.tex` (LaTeX) and `.md` (Markdown).

### LaTeX (`posts/my-slug.tex`)

Frontmatter in a `%---` comment block:

```latex
%---
% title: "Tiêu đề bài viết"
% date: 2026-08-17
% tags: [toan, latex]
% summary: "Một câu tóm tắt."
%---
\section{Mở đầu}
...LaTeX...
```

### Markdown (`posts/my-slug.md`)

Frontmatter as a standard YAML `---` block:

```markdown
---
title: "Tiêu đề bài viết"
date: 2026-08-17
tags: [toan, markdown]
summary: "Một câu tóm tắt."
---

# Mở đầu

Nội dung Markdown. Math: $E = mc^2$ hoặc \( \sqrt{x} \).
```

Required: `title`, `date` (YYYY-MM-DD), `tags` (non-empty list), `summary`.
Optional: `slug` (defaults to the filename). Build fails fast with a clear
message on malformed frontmatter, missing fields, invalid dates, empty tags,
or slug collisions (including cross-extension: `foo.tex` vs `foo.md`).

## Layout

```
posts/*.{tex,md}              source of truth (LaTeX or Markdown)
tools/build_posts.py         frontmatter parse + pandoc + index.json (stdlib)
tools/test_build_posts.py    Python unit tests (python tools\test_build_posts.py)
wwwroot/generated/           build output (git-ignored; deterministic)
Components/Pages/            Home, Post, Tag, Search, NotFound
Components/Shared/PostCard   reusable card
Services/PostStore.cs        singleton reading generated files
I18n/I18n.cs                 Vietnamese UI strings
```

## Known trade-offs

- `wwwroot/generated/` is git-ignored; CI/deploy must run a build (or install
  Python+Pandoc) to regenerate. Revisit if headless publish without a toolchain
  is needed.
- DAUB/Alpine/KaTeX load from CDN; if offline, math shows raw LaTeX and prose
  stays readable (graceful degradation).
