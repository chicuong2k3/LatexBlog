# LatexBlog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A static-SSR Blazor blog whose posts are authored as LaTeX files and rendered to HTML fragments at build time by Pandoc, served with DAUB CSS, htmx partials, and Alpine.js micro-interactions.

**Architecture:** `posts/*.tex` (source of truth, YAML frontmatter in a `%---` comment block) → an MSBuild `BeforeBuild` target runs a Python stdlib-only script (`tools/build_posts.py`) that parses frontmatter, invokes Pandoc (`--katex`, `--highlight-style=pygments`) to write `wwwroot/generated/posts/{slug}.html`, extracts the Pygments CSS once into `wwwroot/generated/pygments.css`, and writes `wwwroot/generated/index.json` sorted by date desc. At runtime a Blazor Web App in **Static SSR** mode (no SignalR, no WASM, no enhanced navigation) reads those files via a singleton `PostStore`; htmx fragment endpoints (search, tag filter, load-more) are served by minimal API endpoints that render plain Razor components to HTML fragments via `HtmlRenderer` (Htmxor failed its gate on .NET 10 — see `docs/Htmxor-verdict.md`); Alpine.js + a no-flash inline script handle dark mode, TOC scrollspy, mobile menu, and copy-code buttons.

**Tech Stack:** .NET 10 Blazor Web App (Static SSR) · DAUB CSS 3.19.12 via jsDelivr (`daub.css` + `daub-classless.css`) · htmx 1.9.12 via jsDelivr (Htmxor gate FAILED on .NET 10 → `HtmlRenderer` fragment endpoints) · Alpine.js 3.14.1 · KaTeX 0.16.11 (CSS only — `--katex` renders math server-side) · Pandoc 3.6.4 (dev/CI only, installed under `tools/pandoc/`) · Python 3.11 (stdlib only) · "Be Vietnam Pro" (Google Fonts) · git 2.54

---

## Global Constraints

- **Static SSR only** — never add `AddInteractiveServerComponents()`, `AddInteractiveServerRenderMode()`, `@rendermode`, `.client.cs`, `blazor.web.js`, or enhanced navigation. htmx/Alpine provide all interactivity.
- **DAUB pinned to `daub-ui@3.19.12`** on jsDelivr (verified live: `daub.css` and `daub-classless.css` both exist at that version). Dark mode = `data-theme="dark"` attribute on `<html>`; light = `data-theme="default"`. Never bump versions silently.
- **Htmxor FAILED on .NET 10 (gate Task 2).** Fallback mode active: htmx 1.9.12 from CDN + minimal API fragment endpoints using `HtmlRenderer` (`[FromServices]` + `renderer.RenderComponentAsync<T>()` → `Results.Content(html, "text/html")`). Fragment components are plain components (no `@page`, no layout, no Htmxor base). All fragment requests are **GET**. See `docs/Htmxor-verdict.md` for the full evidence.
- **Pandoc is a dev/CI-only dependency.** Production never needs it. It must be discoverable via (1) `PANDOC` env var, (2) `tools/pandoc/**/pandoc.exe` under the repo, (3) PATH.
- **`tools/build_posts.py` is Python stdlib only** — no third-party packages (no PyYAML, no requests). Must run on any machine with Python 3.
- **`wwwroot/generated/` and `tools/pandoc/` are git-ignored** — regeneration is deterministic at every build.
- **UI strings are Vietnamese** and come exclusively from `I18n/I18n.cs` (no hardcoded UI text in components). `<html lang="vi">`.
- **Content format:** each post is one `.tex` file with YAML-ish frontmatter in a LaTeX comment block: required fields `title`, `date` (ISO `YYYY-MM-DD`), `tags` (non-empty list), `summary`; optional `slug` (default = filename without `.tex`).
- **Fail fast at build:** missing pandoc, malformed frontmatter, missing required field, invalid date, empty tags, or slug collision must fail the build with a clear message.
- **No RSS, no comments, no admin UI, no runtime LaTeX, no interactive render modes** (per spec §2).
- **Paths:** project root is `C:\Users\nguye\Desktop\codes\LatexBlog`. Commands in this plan run with that as working directory.

---

### Task 1: Scaffold static-SSR Blazor project

**Files:**
- Modify: `LatexBlog.csproj`, `Program.cs`, `Components/App.razor`, `Components/Routes.razor`, `Components/_Imports.razor`
- Delete: `Components/Pages/Counter.razor`, `Components/Pages/Weather.razor` (only if present)
- Replace: `Components/Pages/Home.razor` with a placeholder

**Interfaces:**
- Produces: a compiling static-SSR Blazor app with git initialized; the base every later task builds on.

- [ ] **Step 1: Create the project**

Run from the project root (`C:\Users\nguye\Desktop\codes\LatexBlog`) — the folder already exists (it holds `docs/`); scaffold INTO it, not nested:

```powershell
dotnet new blazor -o .
git init
dotnet new gitignore
```

Then append to `.gitignore`:

```gitignore
# SDD progress ledger and task scratch (subagent-driven-development)
.superpowers/
```

Expected: template files created at the project root; `git init` succeeds; `.gitignore` exists and contains the `.superpowers/` entry.

- [ ] **Step 2: Strip all interactive-mode code**

Open `Program.cs`. Delete the `.AddInteractiveServerComponents()` segment (the `AddRazorComponents` call must become `builder.Services.AddRazorComponents();`) and the `.AddInteractiveServerRenderMode()` call on `MapRazorComponents`. Open `Components/App.razor`: delete `<ReconnectModal />`, `<ImportMap />`, and the `<script src="~/_framework/blazor.web.js"></script>` line if present. Grep for leftovers:

```powershell
Select-String -Path "Components\*.razor","Components\Layout\*.razor","Components\Pages\*.razor","Program.cs" -Pattern "InteractiveServer|@rendermode|blazor.web.js|ReconnectModal|ImportMap" -SimpleMatch:$false
```

Expected: zero matches. If `Home.razor` or any page carries `@rendermode`, remove that attribute.

- [ ] **Step 3: Ensure final files match these shapes**

`Program.cs` final for this task:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAntiforgery();
app.MapStaticAssets();
app.MapRazorComponents<App>();
app.UseStatusCodePagesWithReExecute("/not-found");

app.Run();
```

`Components/App.razor` (minimal for now — expanded in Task 8):

```razor
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="/" />
    <link rel="stylesheet" href="css/site.css" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <HeadOutlet />
</head>
<body>
    <Routes />
</body>
</html>
```

`Components/Routes.razor`:

```razor
<Router AppAssembly="typeof(Program).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="routeData" DefaultLayout="typeof(Layout.MainLayout)" />
        <FocusOnNavigate RouteData="routeData" Selector="h1" />
    </Found>
    <NotFound>
        <PageTitle>Not found</PageTitle>
        <LayoutView Layout="typeof(Layout.MainLayout)">
            <p role="alert">Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>
```

Replace `Components/Pages/Home.razor` (placeholder — real list comes in Task 9):

```razor
@page "/"

<PageTitle>LatexBlog</PageTitle>

<h1>LatexBlog</h1>
<p>Posts will render here (Task 9).</p>
```

- [ ] **Step 4: Build and verify static SSR**

```powershell
dotnet build
```

Expected: build succeeds with 0 errors.

```powershell
dotnet run --urls http://localhost:5080
```

In a second terminal:

```powershell
curl.exe -s http://localhost:5080/ | Select-String "blazor.web.js|InteractiveServer"
```

Expected: the curl output contains NO `blazor.web.js` and NO `InteractiveServer`; the page body contains "Posts will render here". Stop the app (Ctrl+C in the run terminal).

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "chore: scaffold static SSR Blazor project"
```

---

### Task 2: Htmxor gate test (pin the real API on .NET 10)

**Files:**
- Modify: `LatexBlog.csproj`, `Program.cs`, `Components/App.razor`, `Components/_Imports.razor`
- Create: `Components/Pages/HtmxProbe.razor`
- Create: `docs/Htmxor-verdict.md` (records the verified API or the fallback decision)

**Interfaces:**
- Consumes: Task 1's static-SSR app.
- Produces: a verified working htmx fragment endpoint pattern (`[HtmxRoute]` + `ConditionalComponentBase` + `HtmxFragment` + `HtmxContext.Request.IsHtmx`) that Tasks 10–12 reuse verbatim; OR a documented fallback (plain htmx CDN + `HtmlRenderer` minimal-API fragments) that Tasks 10–12 reuse instead. **All later htmx tasks depend on this task's verdict — do not skip it.**

- [ ] **Step 1: Add the Htmxor package**

```powershell
dotnet add package Htmxor --version 1.0.0-beta.1.24
```

Expected: package restores (it targets net8.0 — .NET 10 can reference it).

- [ ] **Step 2: Wire Htmxor into Program.cs**

```csharp
using Htmxor;
using Htmxor.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents().AddHtmx();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAntiforgery();
app.UseHtmxAntiforgery();
app.MapStaticAssets();
app.MapRazorComponents<App>().AddHtmxorComponentEndpoints(app);
app.UseStatusCodePagesWithReExecute("/not-found");

app.Run();
```

If `AddHtmx` or `AddHtmxorComponentEndpoints` does not resolve, locate the correct namespace by listing the package's public surface:

```powershell
dotnet build
Get-ChildItem "$env:USERPROFILE\.nuget\packages\htmxor\1.0.0-beta.1.24\lib" -Recurse -Filter *.dll | Select-Object FullName
```

then inspect the DLL (e.g. `strings`, or add `@using Htmxor;` / `@using Htmxor.Builder;` until it compiles). Expected: `dotnet build` succeeds.

- [ ] **Step 3: Create the probe fragment component**

`Components/Pages/HtmxProbe.razor`:

```razor
@attribute [HtmxRoute("/probe")]
@inherits ConditionalComponentBase

@if (HtmxContext.Request.IsHtmx)
{
    <HtmxFragment RenderDuringStandardRequest="false">
        <p id="probe-result">fragment-ok</p>
    </HtmxFragment>
}
else
{
    <p>probe-full-page</p>
}
```

If `HtmxContext.Request.IsHtmx` does not compile, check the installed version's context shape (e.g. `HtmxContext.RequestHeaders`). The intent is unchanged: the htmx branch must render ONLY the `<p id="probe-result">fragment-ok</p>` fragment.

- [ ] **Step 4: Add the HtmxHeadOutlet**

In `Components/App.razor` `<head>`, add `<HtmxHeadOutlet />` next to `<HeadOutlet />` (injects htmx.js + htmxor.js + the antiforgery meta tag). Add `@using Htmxor;` to `Components/_Imports.razor` (full `_Imports.razor` is finalized in Task 8).

- [ ] **Step 5: Verify the fragment round-trip**

```powershell
dotnet build
dotnet run --urls http://localhost:5080
```

Second terminal:

```powershell
curl.exe -s http://localhost:5080/probe
```

Expected: body contains `probe-full-page` and **not** `<html`.

```powershell
curl.exe -s -H "HX-Request: true" http://localhost:5080/probe
```

Expected: body is exactly `<p id="probe-result">fragment-ok</p>` (a bare fragment, no `<html>`, no layout). This is the core gate. Stop the app.

- [ ] **Step 6: Record the verdict**

`docs/Htmxor-verdict.md` — if the gate passed, record: package version, the exact API surface that compiled (`[HtmxRoute]`, `ConditionalComponentBase`, `HtmxContext.Request.IsHtmx`, `<HtmxFragment RenderDuringStandardRequest="false">`, `AddHtmx()`, `AddHtmxorComponentEndpoints(app)`, `UseHtmxAntiforgery()`, `<HtmxHeadOutlet />`), and note the htmx version bundled (1.9.12). If it FAILED, write the fallback:

**Fallback (only if the gate fails):** remove Htmxor; use htmx 1.9.12 from CDN (`https://cdn.jsdelivr.net/npm/htmx.org@1.9.12/dist/htmx.min.js`) and serve fragments from minimal API endpoints using `HtmlRenderer` (already registered by `AddRazorComponents`):

```csharp
app.MapGet("/search", async (HtmlRenderer renderer, string? q) =>
{
    var root = await renderer.Dispatcher.InvokeAsync(() =>
        renderer.RenderComponentAsync<Components.Pages.SearchResults>(
            ParameterView.FromDictionary(new Dictionary<string, object?>
            {
                [nameof(Components.Pages.SearchResults.Query)] = q,
            })));
    return Results.Content(root.ToHtmlString().ToString(), "text/html; charset=utf-8");
});
```

with `Components/Pages/SearchResults.razor` being a plain component (no `@page`, no layout) that renders only the results list. In fallback mode, htmx GET fragments (load-more, tag) need only the `HX-Request` header; use GET (not POST) for search to avoid antiforgery plumbing. `docs/Htmxor-verdict.md` must state clearly which mode Tasks 10–12 must use.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "chore: gate Htmxor on .NET 10 with fragment probe"
```

---

### Task 3: Install Pandoc (no winget on this machine)

**Files:**
- Modify: `.gitignore` (add `tools/pandoc/`)
- Create: `tools/pandoc/` (binary, git-ignored)

**Interfaces:**
- Produces: a working `pandoc.exe` discoverable by `tools/build_posts.py` via the `tools/pandoc/**` glob (Task 4/5) and on PATH. `pandoc --version` exits 0.

- [ ] **Step 1: Add `tools/pandoc/` to .gitignore**

Append to `.gitignore`:

```gitignore
# local pandoc install (dev/CI only)
tools/pandoc/
```

- [ ] **Step 2: Download and extract pandoc**

winget is NOT available on this machine, so download the portable zip from GitHub releases:

```powershell
New-Item -ItemType Directory -Force -Path "tools\pandoc" | Out-Null
$v = "3.6.4"
$url = "https://github.com/jgm/pandoc/releases/download/$v/pandoc-$v-windows-x86_64.zip"
$zip = "$env:TEMP\pandoc-$v.zip"
Invoke-WebRequest -Uri $url -OutFile $zip
Expand-Archive -Path $zip -DestinationPath "tools\pandoc" -Force
Get-ChildItem "tools\pandoc" -Recurse -Filter pandoc.exe | Select-Object FullName
```

Expected: `pandoc.exe` appears under `tools\pandoc\pandoc-3.6.4\pandoc.exe` (or similar). If the URL 404s (version moved on), fetch `https://github.com/jgm/pandoc/releases/latest`, read the tag, and repeat with that version number.

- [ ] **Step 3: Verify pandoc works**

```powershell
& "tools\pandoc\pandoc-3.6.4\pandoc.exe" --version
```

Expected: prints `pandoc 3.6.4` (or the downloaded version) and the "Compiled with" features list (must include KaTeX — `katex` is a built-in math method; no extra install needed).

- [ ] **Step 4: Commit**

```powershell
git add .gitignore
git commit -m "chore: ignore local pandoc install directory"
```

---

### Task 4: build_posts.py — frontmatter parser (TDD)

**Files:**
- Create: `tools/build_posts.py` (part 1: frontmatter + slugify + validate)
- Create: `tools/test_build_posts.py` (part 1: parser tests)

**Interfaces:**
- Consumes: nothing (pure stdlib).
- Produces:
  - `parse_frontmatter(text: str) -> tuple[dict, str]` — returns `(meta, body_without_frontmatter)`; meta keys lowercased; string values unquoted; `tags` parsed as list; `slug` optional.
  - `slugify_title(title: str) -> str` — Vietnamese diacritic-stripped kebab-case (fallback slug source).
  - `validate_meta(meta: dict, slug: str, path: Path) -> None` — raises `ValueError` with file+field name on missing required field (`title`, `date`, `tags`, `summary`), invalid ISO date, or empty tags.
  - These are used by `build_all()` in Task 5.

- [ ] **Step 1: Write the failing tests**

`tools/test_build_posts.py`:

```python
import unittest
from pathlib import Path

from build_posts import parse_frontmatter, slugify_title, validate_meta

SAMPLE = """%---
% title: "Đạo hàm và ý nghĩa hình học"
% date: 2026-08-17
% tags: [math, latex]
% summary: "Tìm hiểu đạo hàm qua góc nhìn hình học."
%---
\\section{Giới thiệu}
\\begin{equation}
f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}
\\end{equation}
"""


class ParseFrontmatterTest(unittest.TestCase):
    def test_parses_all_fields(self):
        meta, body = parse_frontmatter(SAMPLE)
        self.assertEqual(meta["title"], "Đạo hàm và ý nghĩa hình học")
        self.assertEqual(meta["date"], "2026-08-17")
        self.assertEqual(meta["tags"], ["math", "latex"])
        self.assertEqual(meta["summary"], "Tìm hiểu đạo hàm qua góc nhìn hình học.")
        self.assertNotIn("slug", meta)

    def test_body_has_frontmatter_stripped(self):
        _, body = parse_frontmatter(SAMPLE)
        self.assertNotIn("%---", body)
        self.assertIn("\\section{Giới thiệu}", body)

    def test_no_frontmatter_returns_empty_meta_and_full_text(self):
        meta, body = parse_frontmatter("\\section{X}\nplain text\n")
        self.assertEqual(meta, {})
        self.assertIn("\\section{X}", body)

    def test_optional_slug(self):
        meta, _ = parse_frontmatter("%---\n% slug: \"my-post\"\n%---\nbody\n")
        self.assertEqual(meta["slug"], "my-post")

    def test_key_lowercased(self):
        meta, _ = parse_frontmatter("%---\n% Title: \"X\"\n%---\nbody\n")
        self.assertEqual(meta["title"], "X")


class SlugifyTitleTest(unittest.TestCase):
    def test_vietnamese_diacritics_stripped(self):
        self.assertEqual(
            slugify_title("Đạo hàm và ý nghĩa hình học"),
            "dao-ham-va-y-nghia-hinh-hoc",
        )

    def test_empty_title_falls_back(self):
        self.assertEqual(slugify_title("   "), "untitled")


class ValidateMetaTest(unittest.TestCase):
    def _meta(self, **overrides):
        m = {"title": "x", "date": "2026-01-01", "tags": ["a"], "summary": "s"}
        m.update(overrides)
        return m

    def test_valid_passes(self):
        validate_meta(self._meta(), "x", Path("x.tex"))  # must not raise

    def test_missing_field_raises(self):
        for field in ("title", "date", "tags", "summary"):
            with self.subTest(field=field):
                meta = self._meta()
                del meta[field]
                with self.assertRaises(ValueError) as ctx:
                    validate_meta(meta, "x", Path("x.tex"))
                self.assertIn(field, str(ctx.exception))
                self.assertIn("x.tex", str(ctx.exception))

    def test_bad_date_raises(self):
        with self.assertRaises(ValueError):
            validate_meta(self._meta(date="2026/08/17"), "x", Path("x.tex"))

    def test_empty_tags_raises(self):
        with self.assertRaises(ValueError):
            validate_meta(self._meta(tags=[]), "x", Path("x.tex"))


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run tests to verify they fail**

```powershell
python tools\test_build_posts.py
```

Expected: FAIL with `ModuleNotFoundError: No module named 'build_posts'` (module doesn't exist yet).

- [ ] **Step 3: Write the minimal implementation**

`tools/build_posts.py` (part 1 — parser; Task 5 appends the pandoc/index part):

```python
#!/usr/bin/env python3
"""Build blog posts from LaTeX sources (stdlib only).

Part 1: frontmatter parsing, slugification, validation.
Part 2 (Task 5): pandoc rendering + index.json.
"""
import re
import unicodedata
from datetime import date
from pathlib import Path

FRONTMATTER_RE = re.compile(
    r"^%\s*---\s*\n(?P<body>(?:^%.*$\n?)*?)^%\s*---\s*$",
    re.MULTILINE,
)

REQUIRED_FIELDS = ("title", "date", "tags", "summary")


def parse_frontmatter(text):
    """Extract YAML-ish frontmatter from a %--- comment block.

    Returns (meta: dict, body: str). Meta keys are lowercased.
    Supports: title: "string", date: YYYY-MM-DD, tags: [a, b],
    summary: "string", slug: "string".
    """
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text.strip()
    meta = {}
    for raw_line in m.group("body").splitlines():
        line = raw_line.strip().lstrip("%").strip()
        if not line or ":" not in line:
            continue
        key, _, value = line.partition(":")
        key = key.strip().lower()
        value = value.strip()
        if not key or not value:
            continue
        if value.startswith("[") and value.endswith("]"):
            items = [v.strip().strip("'\"") for v in value[1:-1].split(",")]
            meta[key] = [i for i in items if i]
        else:
            meta[key] = value.strip("'\"")
    body = text[m.end():].strip()
    return meta, body


def slugify_title(title):
    """Vietnamese diacritic-stripped kebab-case URL slug."""
    s = unicodedata.normalize("NFD", title)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or "untitled"


def validate_meta(meta, slug, path):
    """Raise ValueError with file+field context on invalid frontmatter."""
    missing = [f for f in REQUIRED_FIELDS if f not in meta]
    if missing:
        raise ValueError(
            f"{path.name}: missing frontmatter field(s): {', '.join(missing)}"
        )
    try:
        date.fromisoformat(meta["date"])
    except ValueError:
        raise ValueError(
            f"{path.name}: invalid date {meta['date']!r}, expected YYYY-MM-DD"
        )
    if not isinstance(meta["tags"], list) or not meta["tags"]:
        raise ValueError(f"{path.name}: tags must be a non-empty list")
```

- [ ] **Step 4: Run tests to verify they pass**

```powershell
python tools\test_build_posts.py
```

Expected: `OK` (all tests pass). Run from the project root so `import build_posts` resolves (`tools` is on `sys.path` only when running the file directly — the `if __name__ == "__main__"` runner adds it; if `import build_posts` still fails, run with `cd tools; py -3 test_build_posts.py` instead).

- [ ] **Step 5: Commit**

```powershell
git add tools/build_posts.py tools/test_build_posts.py
git commit -m "test: frontmatter parser with Vietnamese slugification"
```

---

### Task 5: build_posts.py — pandoc render + index.json (TDD)

**Files:**
- Modify: `tools/build_posts.py` (add `find_pandoc`, `render_pandoc`, `write_pygments_css`, `build_all`, `main`)
- Modify: `tools/test_build_posts.py` (add render + index tests)
- Create: `tools/testdata/sample.tex` (fixture used by render tests)

**Interfaces:**
- Consumes: Task 4's `parse_frontmatter`, `slugify_title`, `validate_meta`; Task 3's pandoc binary.
- Produces:
  - `find_pandoc() -> str` — resolves pandoc via (1) `PANDOC` env var, (2) `tools/pandoc/**/pandoc(.exe)` glob, (3) PATH; raises `FileNotFoundError` with an install hint otherwise.
  - `render_pandoc(pandoc, tex_path: Path, out_html: Path) -> None` — runs pandoc `--from latex --to html5 --katex --highlight-style=pygments --standalone=false --wrap=none`; raises `RuntimeError` with stderr excerpt on non-zero exit.
  - `write_pygments_css(pandoc, out_css: Path) -> None` — renders a tiny standalone markdown probe, extracts the `<style>` block, writes it as CSS.
  - `build_all(posts_dir: Path, out_dir: Path, index_path: Path, pandoc: str) -> list[dict]` — scans `*.tex`, parses/validates, renders each to `out_dir/{slug}.html`, returns metadata list sorted by date desc, detects slug collisions.
  - `main() -> int` — wires the above to real paths; prints progress; returns 0 on success, 1 on no posts, non-zero on failure.

- [ ] **Step 1: Write the failing tests**

Append to `tools/test_build_posts.py`:

```python
import os
import shutil
import tempfile
import unittest
import json
from pathlib import Path

from build_posts import build_all, find_pandoc, write_pygments_css

SAMPLE_TEX = """%---
% title: "Bài viết A"
% date: 2026-08-17
% tags: [toan]
% summary: "Tóm tắt A."
%---
\\section{Mở đầu}
Text $x^2$ here.
\\begin{verbatim}
def hi():
    return 1
\\end{verbatim}
"""


class FindPandocTest(unittest.TestCase):
    def test_returns_path_or_raises(self):
        try:
            p = find_pandoc()
            self.assertTrue(p)
        except FileNotFoundError:
            # acceptable only if pandoc truly missing; task 3 should prevent this
            raise


class BuildAllTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pandoc = os.environ.get("PANDOC") or shutil.which("pandoc")
        if not cls.pandoc:
            # look in tools/pandoc recursively
            for cand in Path("tools/pandoc").rglob("pandoc.exe" if os.name == "nt" else "pandoc"):
                cls.pandoc = str(cand)
                break

    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.posts = self.tmp / "posts"
        self.out = self.tmp / "out"
        self.index = self.tmp / "index.json"
        self.posts.mkdir()

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def _write_post(self, name, content):
        (self.posts / name).write_text(content, encoding="utf-8")

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_renders_html_and_writes_index_sorted_desc(self):
        self._write_post("b.tex", SAMPLE_TEX)
        self._write_post(
            "a.tex",
            SAMPLE_TEX.replace("2026-08-17", "2026-08-01").replace("Bài viết A", "Bài viết B"),
        )
        items = build_all(self.posts, self.out, self.index, self.pandoc)
        self.assertEqual([i["slug"] for i in items], ["b", "a"])  # date desc
        html = (self.out / "b.html").read_text(encoding="utf-8")
        self.assertIn('class="math inline"', html)  # --katex keeps raw TeX; client-side KaTeX renders it
        self.assertIn("<pre", html)   # verbatim -> code block
        data = json.loads(self.index.read_text(encoding="utf-8"))
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]["title"], "Bài viết A")

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_slug_collision_raises(self):
        self._write_post("a.tex", SAMPLE_TEX)
        self._write_post("b.tex", SAMPLE_TEX.replace("Bài viết A", "Bài viết B"))
        with self.assertRaises(ValueError) as ctx:
            build_all(self.posts, self.out, self.index, self.pandoc)
        self.assertIn("slug collision", str(ctx.exception))

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_pygments_css_extracted(self):
        css_path = self.tmp / "pygments.css"
        write_pygments_css(self.pandoc, css_path)
        css = css_path.read_text(encoding="utf-8")
        self.assertGreater(len(css), 100)
        self.assertIn("color", css)
        self.assertNotIn("<style>", css)
```

Also create `tools/testdata/sample.tex`:

```latex
%---
% title: "Bài viết A"
% date: 2026-08-17
% tags: [toan]
% summary: "Tóm tắt A."
%---
\section{Mở đầu}
Text $x^2$ here.
\begin{verbatim}
def hi():
    return 1
\end{verbatim}
```

- [ ] **Step 2: Run tests to verify they fail**

```powershell
python tools\test_build_posts.py
```

Expected: FAIL — `ImportError: cannot import name 'build_all' from 'build_posts'`.

- [ ] **Step 3: Write the implementation**

Append to `tools/build_posts.py`:

```python
import json
import os
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent


def find_pandoc():
    """Resolve pandoc: PANDOC env > tools/pandoc/** > PATH. Raise with hint."""
    env = os.environ.get("PANDOC")
    if env and Path(env).exists():
        return env
    exe = "pandoc.exe" if os.name == "nt" else "pandoc"
    local = sorted((ROOT / "tools" / "pandoc").rglob(exe))
    if local:
        return str(local[0])
    for dir_ in os.environ.get("PATH", "").split(os.pathsep):
        candidate = Path(dir_) / exe
        if candidate.exists():
            return str(candidate)
    raise FileNotFoundError(
        "pandoc not found. Install it (see docs/README or Task 3) "
        "or set PANDOC=/path/to/pandoc"
    )


def render_pandoc(pandoc, tex_path, out_html):
    """Convert one .tex to an HTML fragment with KaTeX + pygments spans."""
    cmd = [
        pandoc, str(tex_path),
        "--from", "latex",
        "--to", "html5",
        "--katex",
        "--highlight-style=pygments",
        "--standalone=false",
        "--wrap=none",
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(
            f"pandoc failed for {tex_path.name}:\n{proc.stderr[:2000]}"
        )
    out_html.write_text(proc.stdout, encoding="utf-8")


def write_pygments_css(pandoc, out_css):
    """Extract the pygments <style> block pandoc emits for standalone HTML."""
    probe = "```python\nprint('hi')\n```\n"
    proc = subprocess.run(
        [pandoc, "--from", "markdown", "--to", "html5", "--standalone",
         "--highlight-style=pygments"],
        input=probe, capture_output=True, text=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"pandoc css generation failed:\n{proc.stderr[:2000]}")
    m = re.search(r"<style>(.*?)</style>", proc.stdout, re.DOTALL)
    if not m:
        raise RuntimeError("could not extract pygments CSS from pandoc output")
    out_css.write_text(m.group(1).strip(), encoding="utf-8")


def build_all(posts_dir, out_dir, index_path, pandoc):
    """Render all .tex posts; return metadata list sorted by date desc."""
    posts = sorted(Path(posts_dir).glob("*.tex"))
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    index = []
    seen_slugs = {}
    for tex in posts:
        text = tex.read_text(encoding="utf-8")
        meta, _ = parse_frontmatter(text)
        slug = meta.get("slug", tex.stem)
        if slug in seen_slugs:
            raise ValueError(
                f"slug collision: {tex.name} and {seen_slugs[slug]} "
                f"both map to '{slug}'"
            )
        seen_slugs[slug] = tex.name
        validate_meta(meta, slug, tex)
        out_html = out_dir / f"{slug}.html"
        render_pandoc(pandoc, tex, out_html)
        index.append({
            "slug": slug,
            "title": meta["title"],
            "date": meta["date"],
            "tags": meta["tags"],
            "summary": meta["summary"],
        })
        print(f"  rendered {tex.name} -> {out_html}")
    index.sort(key=lambda p: p["date"], reverse=True)
    index_path = Path(index_path)
    index_path.parent.mkdir(parents=True, exist_ok=True)
    index_path.write_text(
        json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return index


def main():
    try:
        pandoc = find_pandoc()
    except FileNotFoundError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 2
    posts_dir = ROOT / "posts"
    out_dir = ROOT / "wwwroot" / "generated" / "posts"
    index_path = ROOT / "wwwroot" / "generated" / "index.json"
    css_path = ROOT / "wwwroot" / "generated" / "pygments.css"
    try:
        items = build_all(posts_dir, out_dir, index_path, pandoc)
        write_pygments_css(pandoc, css_path)
    except (ValueError, RuntimeError, OSError) as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1
    if not items:
        print("No posts found in posts/", file=sys.stderr)
        return 1
    print(f"wrote {index_path} ({len(items)} posts)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 4: Run tests to verify they pass**

```powershell
python tools\test_build_posts.py
```

Expected: `OK` (13 tests). Note: tests run from the project root; `find_pandoc` finds the Task 3 install under `tools/pandoc/`.

- [ ] **Step 5: Commit**

```powershell
git add tools/build_posts.py tools/test_build_posts.py tools/testdata/sample.tex
git commit -m "feat: pandoc rendering pipeline with index.json generation"
```

---

### Task 6: Sample posts + MSBuild BeforeBuild target

**Files:**
- Create: `posts/dao-ham-va-y-nghia-hinh-hoc.tex`, `posts/python-co-ban.tex`, `posts/gioi-thieu-blog.tex`, `posts/ma-tran-va-phep-bien-doi.tex`
- Modify: `LatexBlog.csproj` (add `BuildPosts` target), `.gitignore` (add `wwwroot/generated/`)

**Interfaces:**
- Consumes: Task 5's `main()`.
- Produces: four posts; `dotnet build` automatically regenerates `wwwroot/generated/` (html fragments + `index.json` + `pygments.css`) before the Blazor compiler runs.

- [ ] **Step 1: Add the MSBuild target**

In `LatexBlog.csproj`, inside the top-level `<Project>` element, add:

```xml
  <Target Name="BuildPosts" BeforeTargets="BeforeBuild">
    <Exec Command="python tools/build_posts.py" WorkingDirectory="$(MSBuildProjectDirectory)" />
  </Target>
```

If `py` is not the launcher on this machine, replace with `python tools/build_posts.py`.

- [ ] **Step 2: Add `wwwroot/generated/` to .gitignore**

Append:

```gitignore
# deterministic build output
wwwroot/generated/
```

- [ ] **Step 3: Write the four sample posts**

`posts/dao-ham-va-y-nghia-hinh-hoc.tex`:

```latex
%---
% title: "Đạo hàm và ý nghĩa hình học"
% date: 2026-08-17
% tags: [toan, latex]
% summary: "Tìm hiểu đạo hàm qua góc nhìn hình học: định nghĩa, quy tắc tính và ứng dụng."
%---
\section{Giới thiệu}

Đạo hàm là một trong những khái niệm nền tảng nhất của giải tích.
Nó mô tả tốc độ thay đổi tức thời của một hàm số.

\section{Định nghĩa}

Đạo hàm của hàm số \(f\) tại điểm \(x\) được định nghĩa bởi giới hạn:

\begin{equation}
f'(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}
\end{equation}

\section{Ví dụ bằng mã}

Dưới đây là một hàm Python tính đạo hàm số:

\begin{verbatim}
def dao_ham(f, x, h=1e-6):
    return (f(x + h) - f(x - h)) / (2 * h)
\end{verbatim}

\section{Kết luận}

Đạo hàm giúp ta hiểu độ dốc của đồ thị tại từng điểm, và là công cụ
trung tâm trong tối ưu hóa, vật lý và học máy.
```

`posts/python-co-ban.tex`:

```latex
%---
% title: "Python cơ bản cho người mới"
% date: 2026-08-15
% tags: [lap-trinh, python]
% summary: "Các khái niệm nền tảng của Python: biến, hàm và vòng lặp, kèm ví dụ chạy được."
%---
\section{Khởi động}

Python là ngôn ngữ lập trình thông dịch, dễ đọc và phù hợp để bắt đầu.
Một chương trình Python đơn giản nhất chỉ cần một dòng.

\section{Hàm}

Hàm giúp nhóm logic và tái sử dụng:

\begin{verbatim}
def giai_thua(n):
    if n <= 1:
        return 1
    return n * giai_thua(n - 1)
\end{verbatim}

\section{Vòng lặp}

Vòng lặp \texttt{for} duyệt qua các phần tử của một danh sách.

\section{Kết luận}

Nắm vững biến, hàm và vòng lặp là nền tảng để học các chủ đề nâng cao.
```

`posts/gioi-thieu-blog.tex`:

```latex
%---
% title: "Chào mừng đến với LatexBlog"
% date: 2026-08-10
% tags: [blog]
% summary: "Giới thiệu về blog và quy trình xuất bản bài viết từ LaTeX."
%---
\section{Tại sao LaTeX?}

LaTeX cho phép viết toán học đẹp, quản lý tài liệu dài và xuất bản
nhất quán. Blog này nhận bài viết dạng \texttt{.tex} và chuyển thành
HTML ngay lúc build bằng Pandoc.

\section{Quy trình xuất bản}

\begin{enumerate}
\item Viết bài dưới dạng \texttt{posts/*.tex}.
\item Commit và build — MSBuild gọi \texttt{tools/build\_posts.py}.
\item Pandoc tạo HTML tĩnh; Blazor phục vụ chúng.
\end{enumerate}

\section{Kết luận}

Hy vọng bạn thấy những bài viết sắp tới hữu ích.
```

`posts/ma-tran-va-phep-bien-doi.tex`:

```latex
%---
% title: "Ma trận và phép biến đổi tuyến tính"
% date: 2026-08-05
% tags: [toan, dai-so]
% summary: "Ma trận biểu diễn phép biến đổi tuyến tính như thế nào, kèm ví dụ."
%---
\section{Ma trận}

Ma trận là bảng số hình chữ nhật. Mỗi ma trận \(A\) kích thước
\(m \times n\) có \(m\) hàng và \(n\) cột.

\begin{equation}
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
\end{equation}

\section{Phép biến đổi tuyến tính}

Mỗi ma trận xác định một ánh xạ tuyến tính từ \(\mathbb{R}^n\) vào
\(\mathbb{R}^m\).

\section{Ví dụ}

Ma trận xoay trong mặt phẳng một góc \(\theta\):

\begin{equation}
R(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\
\sin\theta & \cos\theta \end{pmatrix}
\end{equation}

\section{Kết luận}

Ma trận là cầu nối giữa đại số tuyến tính và hình học.
```

- [ ] **Step 4: Build and verify regeneration**

```powershell
dotnet build
```

Expected: MSBuild prints the script's progress lines (`rendered ...` × 4, `wrote ...\index.json (4 posts)`), then the C# build succeeds.

```powershell
Get-Content wwwroot\generated\index.json
Get-ChildItem wwwroot\generated\posts
Test-Path wwwroot\generated\pygments.css
```

Expected: `index.json` has 4 entries sorted by date desc (`2026-08-17` first, `2026-08-05` last); 4 `.html` files exist; `pygments.css` exists and is non-empty.

- [ ] **Step 5: Commit**

```powershell
git add LatexBlog.csproj .gitignore posts/
git commit -m "feat: build-time LaTeX rendering with sample posts"
```

---

### Task 7: PostStore singleton service

**Files:**
- Create: `Services/PostStore.cs`
- Modify: `Program.cs` (register `PostStore` + `AddHttpContextAccessor`)

**Interfaces:**
- Consumes: Task 6's generated `wwwroot/generated/index.json` + `posts/*.html`.
- Produces:
  - `record PostMeta(string Slug, string Title, string Date, string[] Tags, string Summary)` — JSON shape matches `build_all` output (camelCase keys map via case-insensitive deserialization).
  - `class PostStore` (singleton) with:
    - `IReadOnlyList<PostMeta> All` — lazy-loaded from `index.json`, sorted date desc (already sorted by build; defensive re-sort).
    - `PostMeta? GetMeta(string slug)` — null when unknown.
    - `string? GetHtml(string slug)` — returns the HTML fragment from disk, cached in a `Dictionary<string,string>`; null when the file is missing.
    - `IReadOnlyList<PostMeta> Search(string q)` — case-insensitive substring match on title, summary, and tags; empty/whitespace q returns empty list.
- Consumed by: Home (Task 9), Post (Task 10), Tag (Task 11), Search (Task 12).

- [ ] **Step 1: Write the service**

`Services/PostStore.cs`:

```csharp
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
```

- [ ] **Step 2: Register the service**

In `Program.cs`, after `builder.Services.AddRazorComponents().AddHtmx();` add:

```csharp
builder.Services.AddSingleton<PostStore>();
builder.Services.AddHttpContextAccessor();
```

Add the using at the top: `using LatexBlog.Services;`

- [ ] **Step 3: Build and verify**

```powershell
dotnet build
```

Expected: build succeeds with 0 errors. (PostStore is exercised by pages in Tasks 9–12; compile-clean is the gate here.)

- [ ] **Step 4: Commit**

```powershell
git add Services/PostStore.cs Program.cs
git commit -m "feat: PostStore singleton reading generated index and fragments"
```

---

### Task 8: App shell (head) + MainLayout (nav, dark mode, footer) + site assets

**Files:**
- Modify: `Components/App.razor` (full head + body shell), `Components/_Imports.razor`
- Replace: `Components/Layout/MainLayout.razor` (delete template `NavMenu.razor` if it was referenced)
- Create: `wwwroot/css/site.css` (overwrite template), `wwwroot/js/site.js`, `I18n/I18n.cs`

**Interfaces:**
- Consumes: DAUB 3.19.12 CDN files, Alpine 3.14.1, KaTeX 0.16.11 (CSS + JS), htmx 1.9.12 CDN (already in App.razor head from Task 2).
- Produces:
  - `I18n` static class — every UI string used by Tasks 8–12 (constants listed in Step 3; components must reference these names).
  - `data-theme` on `<html>` (default `default`; no-flash script restores `localStorage["db-theme"]` or `prefers-color-scheme` before first paint).
  - Alpine data components in `site.js`: `themeToggle` (toggles `data-theme` between `default`/`dark`, persists), `tocSpy` (IntersectionObserver scrollspy — consumed by Task 10), and `initProse(el)` (copy-code buttons + KaTeX re-render safety — consumed by Task 10).
  - `MainLayout` with header nav (`Trang chủ`, `Thẻ`, `Tìm kiếm`), theme toggle button, mobile menu toggle, footer.

- [ ] **Step 1: Write I18n**

`I18n/I18n.cs`:

```csharp
namespace LatexBlog.I18n;

public static class I18n
{
    public const string Lang = "vi";
    public const string SiteTitle = "LatexBlog";
    public const string HeroSubtitle = "Viết bằng LaTeX, xuất bản bằng Blazor.";
    public const string MenuHome = "Trang chủ";
    public const string MenuTags = "Thẻ";
    public const string MenuSearch = "Tìm kiếm";
    public const string SearchTitle = "Tìm kiếm";
    public const string SearchPlaceholder = "Tìm kiếm bài viết…";
    public const string SearchHint = "Gõ để tìm theo tiêu đề, tóm tắt hoặc thẻ.";
    public const string LoadMore = "Xem thêm";
    public const string NoPosts = "Chưa có bài viết nào.";
    public const string NoResults = "Không tìm thấy bài viết phù hợp.";
    public const string PostedOn = "Đăng ngày";
    public const string Toc = "Mục lục";
    public const string TagPageTitle = "Bài viết theo thẻ";
    public const string NotFoundTitle = "Không tìm thấy trang";
    public const string NotFoundMessage = "Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.";
    public const string BackHome = "Về trang chủ";
    public const string ThemeToDark = "Chuyển sang giao diện tối";
    public const string ThemeToLight = "Chuyển sang giao diện sáng";
    public const string ToggleMenu = "Mở menu";
    public const string Footer = "© 2026 LatexBlog";
    public const string CopyCode = "Sao chép";
    public const string Copied = "Đã chép!";
}
```

- [ ] **Step 2: Rewrite App.razor**

`Components/App.razor`:

```razor
@using LatexBlog.I18n

<!DOCTYPE html>
<html lang="vi" data-theme="default">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="@I18n.SiteTitle" />
    <base href="/" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daub-ui@3.19.12/daub.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daub-ui@3.19.12/daub-classless.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
    <link rel="stylesheet" href="/generated/pygments.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="css/site.css" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <HeadOutlet />
    <HtmxHeadOutlet />
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js" defer></script>
    <script>
        // no-flash theme restore - runs before first paint
        (function () {
            var saved = localStorage.getItem("db-theme");
            if (saved === null) {
                saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";
            }
            document.documentElement.setAttribute("data-theme", saved);
        })();
    </script>
</head>
<body>
    <Routes />
    <script src="js/site.js"></script>
</body>
</html>
```

- [ ] **Step 3: Finalize _Imports.razor**

Ensure `Components/_Imports.razor` contains at least:

```razor
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Components.Web
@using Microsoft.AspNetCore.Components.Web.Virtualization
@using LatexBlog
@using LatexBlog.Components
@using LatexBlog.Components.Layout
@using LatexBlog.Components.Pages
@using LatexBlog.Components.Shared
@using LatexBlog.Services
@using LatexBlog.I18n
```

(Keep whatever else the template had — duplicates are harmless.)

- [ ] **Step 4: Rewrite MainLayout.razor**

`Components/Layout/MainLayout.razor` (delete the template's `NavMenu.razor` reference if present, and the file if nothing else uses it):

```razor
@inherits LayoutComponentBase

<div class="db-nav" x-data="{ menuOpen: false }">
    <nav class="db-container db-nav__inner">
        <a href="/" class="db-nav__brand">@I18n.SiteTitle</a>
        <button type="button" class="db-nav__toggle"
                x-on:click="menuOpen = !menuOpen"
                :aria-expanded="menuOpen"
                aria-label="@I18n.ToggleMenu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
        </button>
        <ul class="db-nav__links" :class="{ 'open': menuOpen }">
            <li><a href="/">@I18n.MenuHome</a></li>
            <li><a href="/tags/toan">@I18n.MenuTags</a></li>
            <li><a href="/search">@I18n.MenuSearch</a></li>
        </ul>
        <button type="button" class="db-button db-button--ghost db-button--sm"
                x-data="themeToggle" x-on:click="toggle"
                :aria-label="dark ? '@I18n.ThemeToLight' : '@I18n.ThemeToDark'">
            <span x-text="dark ? 'Sáng' : 'Tối'"></span>
        </button>
    </nav>
</div>

<main class="db-container db-main">
    @Body
</main>

<footer class="db-footer">
    <div class="db-container">
        <p>@I18n.Footer</p>
    </div>
</footer>
```

- [ ] **Step 5: Write site.js**

`wwwroot/js/site.js`:

```js
// ---- theme ----
function getTheme() {
    return document.documentElement.getAttribute("data-theme") || "default";
}
function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("db-theme", t);
}
document.addEventListener("alpine:init", () => {
    Alpine.data("themeToggle", () => ({
        dark: getTheme() === "dark",
        toggle() {
            setTheme(this.dark ? "default" : "dark");
            this.dark = !this.dark;
        },
    }));

    // TOC scrollspy - consumed by Post page (Task 10)
    Alpine.data("tocSpy", () => ({
        activeId: "",
        init(el) {
            const links = el.querySelectorAll('a[href^="#"]');
            const headings = [...links]
                .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
                .filter(Boolean);
            if (!headings.length) return;
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) this.activeId = entry.target.id;
                });
            }, { rootMargin: "-80px 0px -70% 0px" });
            headings.forEach((h) => io.observe(h));
        },
    }));
});

// ---- copy-code buttons + KaTeX safety - consumed by Post page (Task 10)
function initProse(root) {
    root.querySelectorAll("pre").forEach((pre) => {
        const code = pre.querySelector("code");
        if (!code || pre.querySelector("[data-copy-code]")) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "db-button db-button--sm db-post__copy";
        btn.setAttribute("data-copy-code", "");
        btn.textContent = "Sao chép";
        btn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(code.innerText);
                btn.textContent = "Đã chép!";
            } catch {
                btn.textContent = "Lỗi!";
            }
            setTimeout(() => (btn.textContent = "Sao chép"), 1500);
        });
        pre.classList.add("db-post__codeblock");
        pre.appendChild(btn);
    });
    // Re-render math pandoc left as raw LaTeX (verified: `pandoc --katex` in
    // fragment mode emits `<span class="math inline">` with raw TeX and NO
    // pre-rendered KaTeX — client-side rendering via auto-render is REQUIRED)
    if (window.renderMathInElement) {
        renderMathInElement(root, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "\\[", right: "\\]", display: true },
                { left: "\\(", right: "\\)", display: false },
            ],
        });
    }
}
```

- [ ] **Step 6: Write site.css**

`wwwroot/css/site.css` (overwrite template; DAUB provides most styling — this layers blog-specific rules):

```css
:root {
    font-family: "Be Vietnam Pro", var(--db-font-ui);
}
body {
    font-family: "Be Vietnam Pro", var(--db-font-ui);
    background: var(--db-color-bg);
    color: var(--db-color-text);
}
.db-main {
    padding-block: var(--db-space-7);
    min-height: 60vh;
}
/* nav */
.db-nav__inner {
    display: flex;
    align-items: center;
    gap: var(--db-space-5);
    height: var(--db-navbar-height);
}
.db-nav__brand {
    font-weight: var(--db-weight-bold);
    font-size: var(--db-text-lg);
    text-decoration: none;
    color: var(--db-color-text);
    margin-right: auto;
}
.db-nav__links {
    display: flex;
    gap: var(--db-space-4);
    list-style: none;
    margin: 0;
    padding: 0;
}
.db-nav__links a {
    text-decoration: none;
    color: var(--db-color-text-secondary);
}
.db-nav__toggle {
    display: none;
    background: none;
    border: 0;
    color: var(--db-color-text);
    cursor: pointer;
}
@media (max-width: 768px) {
    .db-nav__toggle { display: inline-flex; }
    .db-nav__links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: var(--db-navbar-height);
        left: 0;
        right: 0;
        background: var(--db-color-surface);
        border-bottom: 1px solid var(--db-color-border);
        padding: var(--db-space-4);
        gap: var(--db-space-3);
    }
    .db-nav__links.open { display: flex; }
}
/* footer */
.db-footer {
    border-top: 1px solid var(--db-color-border);
    padding-block: var(--db-space-6);
    color: var(--db-color-text-muted);
    font-size: var(--db-text-sm);
}
/* prose content (pandoc fragment) */
.db-prose {
    font-family: "Be Vietnam Pro", var(--db-font-body);
    line-height: var(--db-leading-loose);
    font-size: var(--db-text-lg);
}
.db-prose h1, .db-prose h2, .db-prose h3 {
    font-family: "Be Vietnam Pro", var(--db-font-heading);
    margin-top: var(--db-space-7);
}
.db-prose img { max-width: 100%; }
.db-prose table {
    border-collapse: collapse;
    width: 100%;
}
.db-prose th, .db-prose td {
    border: 1px solid var(--db-color-border);
    padding: var(--db-space-2) var(--db-space-3);
}
/* code blocks + copy button */
.db-post__codeblock { position: relative; }
.db-post__copy {
    position: absolute;
    top: var(--db-space-2);
    right: var(--db-space-2);
    font-size: var(--db-text-xs);
}
/* TOC */
.db-toc {
    border-left: 2px solid var(--db-color-accent);
    padding-left: var(--db-space-4);
    margin-bottom: var(--db-space-6);
}
.db-toc ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.db-toc a {
    display: block;
    padding-block: var(--db-space-1);
    color: var(--db-color-text-secondary);
    text-decoration: none;
    font-size: var(--db-text-sm);
}
.db-toc a.is-active {
    color: var(--db-color-accent);
    font-weight: var(--db-weight-semibold);
}
```

- [ ] **Step 7: Build and verify the shell**

```powershell
dotnet build
dotnet run --urls http://localhost:5080
```

```powershell
curl.exe -s http://localhost:5080/ | Select-String "daub-ui|alpinejs|katex|data-theme|Trang chủ|db-nav"
```

Expected: page contains the DAUB/Alpine/KaTeX CDN links, `data-theme="default"` (before the no-flash script — note the inline script sets it after the attribute; final DOM value is what the script writes), and the nav with "Trang chủ". Stop the app.

- [ ] **Step 8: Commit**

```powershell
git add -A
git commit -m "feat: app shell with DAUB, dark mode, i18n, layout and site assets"
```

---

### Task 9: Home page + PostCard + load-more (htmx)

**Files:**
- Modify: `Components/Pages/Home.razor` (real implementation)
- Create: `Components/Shared/PostCard.razor`, `Components/Pages/PostList.razor` (plain fragment component for `/posts?page=N`), modify `Program.cs` (add `/posts` fragment endpoint)

**Interfaces:**
- Consumes: `PostStore.All`, `PostMeta`, `I18n.*`; Task 2's fallback fragment pattern (HtmlRenderer endpoint + plain fragment component).
- Produces:
  - `PostCard` — `[Parameter, EditorRequired] public PostMeta Post { get; set; }` — renders one card (title → `/posts/{slug}`, date, summary, tag chips → `/tags/{tag}`). Reused by Tag (Task 11) and Search (Task 12).
  - `PostList` — plain fragment component (NO `@page`, NO layout) with `[Parameter] public int Page` — renders `PagePosts` cards + a next-page "Xem thêm" button inside a `#load-more` container (or nothing on the last page).
  - Home — hero + page-1 cards + "Xem thêm" button in a `#load-more` container. The button targets `#load-more` with `hx-swap="outerHTML"` so each response replaces the button with cards + the next button (no duplicate buttons).

- [ ] **Step 1: Write PostCard**

`Components/Shared/PostCard.razor`:

```razor
@using LatexBlog.Services
@using LatexBlog.I18n

<article class="db-card db-post-card">
    <a href="/posts/@Post.Slug" class="db-post-card__link">
        <h2 class="db-post-card__title">@Post.Title</h2>
    </a>
    <p class="db-post-card__meta">@I18n.PostedOn @Post.Date</p>
    <p class="db-post-card__summary">@Post.Summary</p>
    <div class="db-post-card__tags">
        @foreach (var tag in Post.Tags)
        {
            <a href="/tags/@tag" class="db-chip">#@tag</a>
        }
    </div>
</article>

@code {
    [Parameter, EditorRequired] public PostMeta Post { get; set; } = default!;
}
```

- [ ] **Step 2: Write PostList (plain fragment component)**

`Components/Pages/PostList.razor` — NO `@page`, NO layout, NO Htmxor:

```razor
@inject PostStore PostStore

@foreach (var post in PagePosts)
{
    <PostCard Post="post" />
}
@if (HasMore)
{
    <div id="load-more">
        <button type="button" class="db-button"
                hx-get="/posts?page=@(Page + 1)"
                hx-target="#load-more"
                hx-swap="outerHTML"
                hx-push-url="false">@I18n.LoadMore</button>
    </div>
}

@code {
    private const int PageSize = 3;

    [Parameter] public int Page { get; set; } = 1;

    private IReadOnlyList<PostMeta> PagePosts =>
        PostStore.All.Skip((Page - 1) * PageSize).Take(PageSize).ToList();

    private bool HasMore => Page * PageSize < PostStore.All.Count;
}
```

- [ ] **Step 2b: Add the /posts fragment endpoint in Program.cs**

In `Program.cs`, after the `/probe` endpoint, add:

```csharp
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
```

- [ ] **Step 3: Rewrite Home.razor**

`Components/Pages/Home.razor`:

```razor
@page "/"
@inject PostStore PostStore

<PageTitle>@I18n.SiteTitle</PageTitle>

<section class="db-hero">
    <h1>@I18n.SiteTitle</h1>
    <p class="db-hero__subtitle">@I18n.HeroSubtitle</p>
</section>

<section id="post-list" class="db-post-list">
    @foreach (var post in PagePosts)
    {
        <PostCard Post="post" />
    }
</section>

@if (HasMore)
{
    <div id="load-more">
        <button type="button" class="db-button"
                hx-get="/posts?page=2"
                hx-target="#load-more"
                hx-swap="outerHTML"
                hx-push-url="false">@I18n.LoadMore</button>
    </div>
}

@code {
    private const int PageSize = 3;

    private IReadOnlyList<PostMeta> PagePosts =>
        PostStore.All.Take(PageSize).ToList();

    private bool HasMore => PostStore.All.Count > PageSize;
}
```

- [ ] **Step 4: Build and verify**

```powershell
dotnet build
dotnet run --urls http://localhost:5080
```

```powershell
curl.exe -s http://localhost:5080/
```

Expected: hero + 3 post cards (dao-ham, python, gioi-thieu — date desc) + a "Xem thêm" button with `hx-get="/posts?page=2"` inside `#load-more`.

```powershell
curl.exe -s -H "HX-Request: true" "http://localhost:5080/posts?page=2"
```

Expected: a bare fragment (no `<html>`) containing exactly 1 card (ma-tran) and NO `#load-more` container (last page). Stop the app.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: home list with htmx load-more pagination"
```

---

### Task 10: Post page + TOC scrollspy + copy-code + 404 handling

**Files:**
- Create: `Components/Pages/Post.razor`

**Interfaces:**
- Consumes: `PostStore.GetMeta(slug)`, `PostStore.GetHtml(slug)`, `I18n.*`, `site.js` `tocSpy` + `initProse`.
- Produces: `/posts/{slug}` page — title, date, tag chips, TOC (extracted from fragment headings) with Alpine scrollspy, prose body (`MarkupString`) with copy-code buttons; unknown slug → HTTP 404 status + friendly inline message.

- [ ] **Step 1: Write Post.razor**

`Components/Pages/Post.razor`:

```razor
@page "/posts/{slug}"
@inject PostStore PostStore
@inject IHttpContextAccessor HttpContextAccessor
@inject ILogger<Post> Logger

@if (PostMeta is null || Html is null)
{
    <PageTitle>@I18n.NotFoundTitle</PageTitle>
    <section class="db-not-found">
        <h1>@I18n.NotFoundTitle</h1>
        <p>@I18n.NotFoundMessage</p>
        <a href="/" class="db-button">@I18n.BackHome</a>
    </section>
}
else
{
    <PageTitle>@PostMeta.Title — @I18n.SiteTitle</PageTitle>

    <article class="db-post">
        <header class="db-post__header">
            <h1>@PostMeta.Title</h1>
            <p class="db-post__meta">@I18n.PostedOn @PostMeta.Date</p>
            <div class="db-post__tags">
                @foreach (var tag in PostMeta.Tags)
                {
                    <a href="/tags/@tag" class="db-chip">#@tag</a>
                }
            </div>
        </header>

        @if (Toc.Count > 0)
        {
            <nav class="db-toc" x-data="tocSpy" x-init="init($el)" aria-label="@I18n.Toc">
                <strong>@I18n.Toc</strong>
                <ul>
                    @foreach (var entry in Toc)
                    {
                        <li>
                            <a href="#@entry.Id"
                               x-bind:class="activeId === '@entry.Id' ? 'is-active' : ''">@entry.Text</a>
                        </li>
                    }
                </ul>
            </nav>
        }

        <div class="db-prose" x-data x-init="initProse($el)">
            @((MarkupString)Html)
        </div>
    </article>
}

@code {
    private static readonly Regex HeadingRegex = new(
        @"<h([1-3])\s+id=""([^""]+)""[^>]*>(.*?)</h\1>",
        RegexOptions.IgnoreCase | RegexOptions.Singleline);

    [Parameter] public string? Slug { get; set; }

    private PostMeta? PostMeta;
    private string? Html;
    private List<TocEntry> Toc { get; } = new();

    protected override void OnParametersSet()
    {
        PostMeta = Slug is null ? null : PostStore.GetMeta(Slug);
        Html = PostMeta is null ? null : PostStore.GetHtml(PostMeta.Slug);
        Toc.Clear();
        if (Html is not null)
            Toc.AddRange(ExtractToc(Html));
        if (PostMeta is null)
            HttpContextAccessor.HttpContext?.Response.Headers.Append(
                "X-Robots-Tag", "noindex");
        if (PostMeta is null && HttpContextAccessor.HttpContext is { } ctx)
            ctx.Response.StatusCode = StatusCodes.Status404NotFound;
    }

    private static IEnumerable<TocEntry> ExtractToc(string html)
    {
        foreach (Match m in HeadingRegex.Matches(html))
        {
            var text = Regex.Replace(m.Groups[3].Value, "<[^>]+>", "");
            text = System.Net.WebUtility.HtmlDecode(text).Trim();
            if (text.Length == 0)
                continue;
            yield return new TocEntry(m.Groups[2].Value, text);
        }
    }

    private sealed record TocEntry(string Id, string Text);
}
```

- [ ] **Step 2: Build and verify**

```powershell
dotnet build
dotnet run --urls http://localhost:5080
```

```powershell
curl.exe -s http://localhost:5080/posts/dao-ham-va-y-nghia-hinh-hoc
```

Expected: page contains the title, "Mục lục" TOC (3 sections), `<span class="math inline">` raw-math markup (KaTeX renders client-side via auto-render), a `<pre>` with pygments spans, and the `db-prose` container. (The "Sao chép" button is injected by `initProse` at runtime, so it will NOT appear in curl output.)

```powershell
curl.exe -s -o NUL -w "%{http_code}" http://localhost:5080/posts/khong-ton-tai
```

Expected: `404` and the body contains "Không tìm thấy trang". Stop the app.

- [ ] **Step 3: Commit**

```powershell
git add Components/Pages/Post.razor
git commit -m "feat: post page with TOC scrollspy, prose and 404 handling"
```

---

### Task 11: Tag page + htmx tag switching

**Files:**
- Create: `Components/Pages/Tag.razor` (full page) + `Components/Pages/TagList.razor` (plain fragment component), modify `Program.cs` (add `/tags` fragment endpoint)

**Interfaces:**
- Consumes: `PostStore.All`, `PostCard`, `I18n.*`, Task 2's fallback fragment pattern.
- Produces: `/tags/{tag}` full page (heading + filtered cards) AND a `/tags?tag=X` fragment endpoint returning just the `#tag-list` content so chips can switch tags without a full reload. Chip links carry `hx-get="/tags?tag=X"` + `hx-target="#tag-list"` + `hx-push-url="false"`.

- [ ] **Step 1: Write TagList (plain fragment component)**

`Components/Pages/TagList.razor` — NO `@page`, NO layout:

```razor
@inject PostStore PostStore

<div id="tag-list">
    @if (Posts.Count == 0)
    {
        <p>@I18n.NoPosts</p>
    }
    else
    {
        @foreach (var post in Posts)
        {
            <PostCard Post="post" />
        }
    }
</div>

@code {
    [Parameter] public string? Tag { get; set; }

    private IReadOnlyList<PostMeta> Posts =>
        PostStore.All
            .Where(p => p.Tags.Contains(Tag ?? "", StringComparer.OrdinalIgnoreCase))
            .ToList();
}
```

- [ ] **Step 1b: Add the /tags fragment endpoint in Program.cs**

```csharp
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
```

- [ ] **Step 2: Write Tag.razor (full page)**

`Components/Pages/Tag.razor`:

```razor
@page "/tags/{tag}"
@inject PostStore PostStore

<PageTitle>#@CurrentTag — @I18n.SiteTitle</PageTitle>
<header class="db-tag-header">
    <h1>@I18n.TagPageTitle: #@CurrentTag</h1>
    <div class="db-tag-header__chips">
        @foreach (var tag in AllTags)
        {
            <a href="/tags/@tag" class="db-chip"
               hx-get="/tags?tag=@tag"
               hx-target="#tag-list"
               hx-push-url="false">#@tag</a>
        }
    </div>
</header>
<TagList Tag="CurrentTag" />

@code {
    [Parameter] public string? Tag { get; set; }

    private string CurrentTag => Tag ?? "";

    private IReadOnlyList<string> AllTags =>
        PostStore.All.SelectMany(p => p.Tags)
                     .Distinct(StringComparer.OrdinalIgnoreCase)
                     .OrderBy(t => t, StringComparer.OrdinalIgnoreCase)
                     .ToList();
}
```

Note: the htmx chips target `#tag-list` (inside TagList). Since TagList renders `<div id="tag-list">`, `hx-target="#tag-list"` with default `hx-swap=innerHTML` swaps the list content in place.

- [ ] **Step 3: Build and verify**

```powershell
dotnet build
dotnet run --urls http://localhost:5080
```

```powershell
curl.exe -s http://localhost:5080/tags/toan
```

Expected: full page with heading "Bài viết theo thẻ: #toan", 2 cards (dao-ham, ma-tran), chips for all tags (blog, dai-so, lap-trinh, latex, python, toan).

```powershell
curl.exe -s -H "HX-Request: true" "http://localhost:5080/tags?tag=python"
```

Expected: bare fragment (no `<html>`) with `id="tag-list"` containing 1 card (python-co-ban). Stop the app.

- [ ] **Step 3: Commit**

```powershell
git add Components/Pages/Tag.razor
git commit -m "feat: tag page with htmx tag switching"
```

---

### Task 12: Search page + htmx partial

**Files:**
- Create: `Components/Pages/Search.razor` (full page) + `Components/Pages/SearchResults.razor` (plain fragment component), modify `Program.cs` (add `/search` fragment endpoint)

**Interfaces:**
- Consumes: `PostStore.Search(q)`, `PostCard`, `I18n.*`, Task 2's fallback fragment pattern (GET).
- Produces: `/search` full page (input + empty results container) AND a `/search?q=` GET fragment endpoint returning `#search-results` content: cards, or a "no results" message for empty/zero matches. Input triggers `hx-get` on `input changed delay:300ms`.

- [ ] **Step 1: Write SearchResults (plain fragment component)**

`Components/Pages/SearchResults.razor` — NO `@page`, NO layout:

```razor
@inject PostStore PostStore

<div id="search-results">
    @if (Results.Count == 0)
    {
        <p class="db-search__empty">@I18n.NoResults</p>
    }
    else
    {
        @foreach (var post in Results)
        {
            <PostCard Post="post" />
        }
    }
</div>

@code {
    [Parameter] public string? Q { get; set; }

    private IReadOnlyList<PostMeta> Results =>
        string.IsNullOrWhiteSpace(Q) ? Array.Empty<PostMeta>() : PostStore.Search(Q);
}
```

- [ ] **Step 1b: Add the /search fragment endpoint in Program.cs**

```csharp
app.MapGet("/search", async ([FromServices] HtmlRenderer renderer, string? q) =>
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
```

- [ ] **Step 2: Write Search.razor (full page)**

`Components/Pages/Search.razor`:

```razor
@page "/search"
@inject PostStore PostStore

<PageTitle>@I18n.SearchTitle — @I18n.SiteTitle</PageTitle>
<header class="db-search-header">
    <h1>@I18n.SearchTitle</h1>
    <p>@I18n.SearchHint</p>
</header>
<input type="search"
       name="q"
       class="db-field"
       placeholder="@I18n.SearchPlaceholder"
       autocomplete="off"
       hx-get="/search"
       hx-target="#search-results"
       hx-swap="innerHTML"
       hx-trigger="input changed delay:300ms"
       hx-params="q" />
<div id="search-results" class="db-search-results"></div>
```

Note: `hx-params="q"` restricts the request to the input's own `q` value (no enclosing form needed).

- [ ] **Step 3: Build and verify**

```powershell
dotnet build
dotnet run --urls http://localhost:5080
```

```powershell
curl.exe -s http://localhost:5080/search
```

Expected: full page with the search input (carrying `hx-get="/search"` and the 300ms trigger) and an empty `#search-results` div.

```powershell
curl.exe -s "http://localhost:5080/search?q=%C4%91%E1%BA%A1o"
```

Expected: bare fragment (no `<html>`) with `id="search-results"` containing 1 card (Đạo hàm và ý nghĩa hình học).

```powershell
curl.exe -s "http://localhost:5080/search?q=zzzz"
```

Expected: bare fragment with `<p class="db-search__empty">Không tìm thấy bài viết phù hợp.</p>`.

Browser smoke: open `http://localhost:5080/search`, type `đạo`, expect cards to appear in `#search-results` without a page reload; clear the field, expect the no-results message. Stop the app.

- [ ] **Step 4: Commit**

```powershell
git add Components/Pages/Search.razor
git commit -m "feat: search page with htmx partial results"
```

---

### Task 13: 404 polish, README, and full smoke checklist

**Files:**
- Modify: `Components/Routes.razor` (NotFound block → i18n), `Components/Pages/NotFound.razor` (if the template created one with `@page "/not-found"`, restyle it; otherwise rely on Routes.razor NotFound)
- Create: `README.md`

**Interfaces:**
- Consumes: everything from Tasks 1–12.
- Produces: a polished 404 experience, setup/ops documentation, and a recorded full smoke pass.

- [ ] **Step 1: Polish the NotFound experience**

If `Components/Pages/NotFound.razor` exists (template ships it with `@page "/not-found"`), replace its content with:

```razor
@page "/not-found"
@inject IHttpContextAccessor HttpContextAccessor

<PageTitle>@I18n.NotFoundTitle</PageTitle>

<section class="db-not-found">
    <h1>@I18n.NotFoundTitle</h1>
    <p>@I18n.NotFoundMessage</p>
    <a href="/" class="db-button">@I18n.BackHome</a>
</section>
```

If it does not exist, update the `NotFound` block in `Components/Routes.razor` to render the same markup inside a `LayoutView` (as in Task 1) with `@I18n.NotFoundTitle` / `@I18n.NotFoundMessage` instead of the English text.

- [ ] **Step 2: Write README.md**

`README.md`:

```markdown
# LatexBlog

Personal blog: posts written as LaTeX (`.tex`), rendered to static HTML at
build time with Pandoc, served by a .NET 10 Blazor Web App in **Static SSR**
mode. Interactivity via htmx (1.9.12 CDN) partials and Alpine.js. Styling via
DAUB CSS.

## Stack

- .NET 10 Blazor Web App (Static SSR — no SignalR, no WASM, no enhanced nav)
- DAUB CSS 3.19.12 (jsDelivr) + daub-classless for prose
- htmx 1.9.12 (jsDelivr CDN) — fragment endpoints via HtmlRenderer: search, tag filter, load-more (Htmxor gate failed on .NET 10; see docs/Htmxor-verdict.md)
- Alpine.js 3.14.1 — dark mode, TOC scrollspy, mobile menu, copy-code
- KaTeX 0.16.11 (CSS + JS via CDN; `pandoc --katex` keeps raw TeX in `math inline` spans — client-side auto-render required)
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
dotnet run        # serve at http://localhost:5080
```

## Authoring a post

Create `posts/my-slug.tex` with frontmatter in a `%---` comment block:

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

Required: `title`, `date` (YYYY-MM-DD), `tags` (non-empty list), `summary`.
Optional: `slug` (defaults to the filename). Build fails fast with a clear
message on malformed frontmatter, missing fields, invalid dates, empty tags,
or slug collisions.

## Layout

```
posts/*.tex                  source of truth
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
```

- [ ] **Step 3: Run the full smoke checklist**

Start the app (`dotnet run --urls http://localhost:5080`) and verify each row, recording pass/fail:

| # | Check | Command / action | Expected |
|---|-------|------------------|----------|
| 1 | Home list | `curl http://localhost:5080/` | 3 newest cards + "Xem thêm" |
| 2 | Load-more | `curl -H "HX-Request: true" "http://localhost:5080/posts?page=2"` | 1 card, no button (fragment) |
| 3 | Post renders | `curl http://localhost:5080/posts/dao-ham-va-y-nghia-hinh-hoc` | title, TOC, `math inline` span, `<pre>` |
| 4 | 404 | `curl -o NUL -w "%{http_code}" http://localhost:5080/posts/xyz` | `404` + "Không tìm thấy trang" |
| 5 | Tag page | `curl http://localhost:5080/tags/toan` | 2 cards, chips present |
| 6 | Tag htmx | `curl -H "HX-Request: true" "http://localhost:5080/tags?tag=python"` | fragment with 1 card |
| 7 | Search page | `curl http://localhost:5080/search` | input + empty `#search-results` |
| 8 | Search partial | `curl "http://localhost:5080/search?q=%C4%91%E1%BA%A1o"` | fragment with "Đạo hàm" card |
| 9 | Empty search | `curl "http://localhost:5080/search?q=zzzz"` | "Không tìm thấy bài viết phù hợp." |
| 10 | Dark mode | browser: click Tối/Sáng, reload | theme persists; `data-theme="dark"` on `<html>` |
| 11 | TOC scrollspy | browser: scroll a post | active heading highlighted |
| 12 | Copy-code | browser: click "Sao chép" on a code block | clipboard gets code; button shows "Đã chép!" |
| 13 | Mobile menu | browser: narrow window | hamburger toggles nav links |
| 14 | No blazor.web.js | `curl http://localhost:5080/ \| Select-String blazor.web.js` | no match |

Record the results in `docs/smoke-2026-08-17.md` (or a new dated file). If any row fails, fix it before committing (the fix belongs to the owning task's file).

- [ ] **Step 4: Final commit**

```powershell
git add -A
git commit -m "docs: README and smoke checklist; polish 404"
```

---

## Self-Review (done at plan time)

**Spec coverage:** §4 frontmatter → Task 4; §5 pandoc flags → Task 5; §6 pipeline/MSBuild/gitignore → Tasks 5–6; §7 structure/PostStore/404 → Tasks 7, 9–10, 13; §8 htmx (search/tag/load-more fragments) → Tasks 2, 9, 11, 12; §9 DAUB/dark mode/TOC/micro-interactions/fonts → Task 8 + 10; §10 i18n/`lang="vi"`/diacritics → Tasks 4, 8, 10; §12 edge cases (fail-fast, collision, 404, empty search, CDN-offline) → Tasks 5, 6, 10, 12, README; §13 tests → Tasks 4–5 (Python) + Task 13 smoke; §14 setup (winget unavailable → Task 3 alternate install + README).

**Placeholder scan:** no TBD/TODO; every code step shows exact code; the only adaptive step is Task 2's gate, which FAILED and was resolved via the documented HtmlRenderer fallback (recorded in `docs/Htmxor-verdict.md`; Tasks 9/11/12 updated to the fallback pattern).

**Type consistency:** `PostMeta(Slug, Title, Date, Tags, Summary)` everywhere (Task 7 ↔ 9–12); `PostStore.{All, GetMeta, GetHtml, Search}` names stable; `I18n` constants referenced by components match Task 8 Step 1; `tocSpy`/`initProse` names match `site.js` and Post.razor; `PostCard` param `Post` consistent across Home/PostList/Tag/Search.
