# AIM Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the reader-facing brand "Alternative World" with "AIM" across all 14 visible surfaces, centralise the brand into one constant, and rewrite `/about` around the origin of the name.

**Architecture:** One new `Services/SiteInfo.cs` holds the brand string and a page-title builder. Every `<PageTitle>` calls the builder, so the brand is written in exactly one place. Non-title surfaces (wordmark, meta, RSS, manifest, favicon, JSON-LD, cover SVG) either read `SiteInfo.Brand` or — where they are static assets that cannot reference C# — take the literal `AIM`. `/about` gains three new content tiers wrapped around its existing prose, and is linked from the nav.

**Tech Stack:** .NET 10 Blazor Web App (Static SSR, file-based routing), C# 12, Razor, Playwright e2e (CommonJS `require`, Node).

**Spec:** `docs/superpowers/specs/2026-09-27-aim-rename-design.md`

## Global Constraints

- **The brand being replaced is `Alternative World`, not `LatexBlog`.** `LatexBlog` has zero reader-visible occurrences; it is the C# namespace, the `.csproj` filename, npm package names, an MCP server name, and a test email domain. Do not "fix" it.
- **`LatexBlog` must survive as the assembly identity.** Renaming it breaks `Dockerfile:15` (`COPY LatexBlog.csproj`) and `Dockerfile:29` (`ENTRYPOINT ["dotnet", "LatexBlog.dll"]`) for no reader-visible gain.
- **The `lb-` CSS class prefix stays.** It is a legacy abbreviation across the whole stylesheet and layout; purely cosmetic, ~200 call sites.
- **The service worker cache must be bumped `lb-v19` → `lb-v20`** in the same change, or returning visitors keep seeing the old brand from cache.
- **No URL redirects.** No route contains the brand.
- **WARNING — the working tree is already dirty.** As of 2026-09-27 there are ~72 unrelated modified files under `books/newton-principia/`, plus `tools/build_books.py`, `tools/build_posts.py`, `tools/check_book_callouts.py`, `tools/test_build_books.py`, and an untracked `books/whittaker-aether-vol1/` and `tests/e2e/tests/book.spec.js`. **Never run `git add -A`, `git add .`, or `git commit -a`.** Every `git add` in this plan names its files explicitly. Do not stage, revert, or touch anything under `books/` or `tools/`.
- **These four known defects sit next to this work. Leave all of them alone** — they
  are recorded, not invited: orphaned `.lb-footer` CSS at `site.css:642-644` with no
  `<footer>` in the layout; `Error.razor` being entirely English while the rest of
  the site is Vietnamese; the stale page list in `PRODUCT.md`'s `## Evidence on Hand`
  (no Letters page exists; `Books`, `About` and `Profile` do); and the base URL being
  computed per-request in five places with no configured value. Do not "helpfully"
  fix any of them in this branch.
- **`<Nullable>enable</Nullable>` and `<ImplicitUsings>enable</ImplicitUsings>`** are set in `LatexBlog.csproj:5-6`, so `string?` annotations and `System.Linq` are available without a `using`.
- **`Program.cs` fully-qualifies the `Services` namespace** (`LatexBlog.Services.PostStore` at lines 45, 66, 129). Match that style: `LatexBlog.Services.SiteInfo`.
- **Page titles use the em dash ` — ` (U+2014).** Six pages currently use ` - ` (hyphen); this change normalises all of them to the em dash. This is intentional, not a typo.
- **`dotnet build` is not cheap.** `LatexBlog.csproj:23-41` runs `tools/build_posts.py`, `tools/build_books.py` and `npm run css` as pre-build targets. Budget for it, and use `dotnet build` (not `dotnet watch`) before every e2e run.

## Preconditions

The e2e suite needs the app running and the suite is **not** a CI gate — `.github/workflows/deploy.yml` only deploys. These tests are a local regression net.

```powershell
# once, if not already done
cd C:\Users\nguye\Desktop\codes\LatexBlog\tests\e2e
npm install
npx playwright install chromium
```

Start the app before any e2e step, and **restart it after every code change** or the test will read the old build:

```powershell
dotnet run --urls http://127.0.0.1:5080     # leave running
```

In a second shell:

```powershell
cd C:\Users\nguye\Desktop\codes\LatexBlog\tests\e2e
npx playwright test brand.spec.js
```

`BASE_URL` overrides the default `http://127.0.0.1:5080` if you need a different port.

## File Structure

**Created**

| File | Responsibility |
|---|---|
| `Services/SiteInfo.cs` | The one place the brand string exists, plus the page-title builder |
| `tests/e2e/tests/brand.spec.js` | Regression net for every reader-visible brand surface. Grown one increment per task. |

**Modified**

| File | Responsibility after the change |
|---|---|
| `Components/Layout/MainLayout.razor` | Wordmark text; fourth nav item |
| `Components/App.razor` | Global meta description; RSS discovery `title` |
| `Components/Pages/Home.razor` | Bare title; JSON-LD `name` + `publisher.name` |
| `Components/Pages/About.razor` | Full rewrite: three tiers around the existing prose |
| `Components/Pages/Books.razor` | Title |
| `Components/Pages/Book.razor` | Title |
| `Components/Pages/BookChapter.razor` | Title (three-part) |
| `Components/Pages/Post.razor` | Title; JSON-LD `author.name` + `publisher.name` |
| `Components/Pages/Search.razor` | Title |
| `Components/Pages/Tag.razor` | Title |
| `Components/Pages/Profile.razor` | Title |
| `Components/Pages/User.razor` | Title |
| `Program.cs` | RSS channel title; cover-SVG brand text (2 sites) |
| `wwwroot/manifest.webmanifest` | `name` and `short_name` |
| `wwwroot/favicon.svg` | `aria-label` |
| `wwwroot/sw.js` | Header comment; cache name bump |
| `wwwroot/css/site.css` | Header comment |
| `PRODUCT.md` | Product-name line |

**Deliberately untouched:** `LatexBlog.csproj`, `Dockerfile`, `package.json`,
`tools/mcp/*`, `tests/e2e/package.json`, `supabase/*.sql`,
`wwwroot/js/comments.js`, `README.md`, `CLAUDE.md`, `DESIGN.md`,
`Components/Pages/NotFound.razor`, `Components/Pages/Error.razor`,
and `Post.razor:9` (its own not-found fallback title, which carries no brand).

---

### Task 1: The brand constant and the ten page titles

**Files:**
- Create: `Services/SiteInfo.cs`
- Create: `tests/e2e/tests/brand.spec.js`
- Modify: `Components/Pages/Home.razor:6`
- Modify: `Components/Pages/About.razor:3`
- Modify: `Components/Pages/Books.razor:4`
- Modify: `Components/Pages/Book.razor:4`
- Modify: `Components/Pages/BookChapter.razor:6`
- Modify: `Components/Pages/Post.razor:14`
- Modify: `Components/Pages/Search.razor:4`
- Modify: `Components/Pages/Tag.razor:5`
- Modify: `Components/Pages/Profile.razor:5`
- Modify: `Components/Pages/User.razor:3`

**Interfaces:**
- Consumes: nothing. This is the root of the dependency graph.
- Produces: `LatexBlog.Services.SiteInfo.Brand` — `public const string`, value `"AIM"`.
  `LatexBlog.Services.SiteInfo.Title(params string?[] parts)` → `string`. Returns
  `Brand` when `parts` is empty or all blank; otherwise returns the non-blank parts
  trimmed, in order, with `Brand` appended, joined by `" — "`. Later tasks read
  `SiteInfo.Brand` directly. `Components/_Imports.razor:14` already has
  `@using LatexBlog.Services`, so no page needs a new import.

- [ ] **Step 1: Write the failing test**

Create `tests/e2e/tests/brand.spec.js` with exactly this content:

```js
const { test, expect } = require('@playwright/test');

test('trang chủ: tiêu đề chỉ còn AIM', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('AIM');
});

test('trang tĩnh: tiêu đề kết thúc bằng — AIM', async ({ page }) => {
  for (const path of ['/about', '/tags', '/tags/aether', '/books', '/search']) {
    await page.goto(path);
    await expect(page).toHaveTitle(/ — AIM$/);
  }
});

test('trang bài viết: tiêu đề kết thúc bằng — AIM', async ({ page }) => {
  await page.goto('/posts/aether-history');
  await expect(page).toHaveTitle(/ — AIM$/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

With the app running on an unmodified tree:

```powershell
cd tests\e2e
npx playwright test brand.spec.js
```

Expected: **3 failures.** The first reports `Expected: AIM` against a received
title containing `Alternative World`; the other two report the received title
ending in `Alternative World` rather than `AIM`.

- [ ] **Step 3: Create the constant**

Create `Services/SiteInfo.cs`:

```csharp
namespace LatexBlog.Services;

/// <summary>
/// The single source of truth for the reader-facing brand. Every page title,
/// meta tag, feed entry and structured-data node reads from here, so a rename is
/// one edit instead of a hunt across a dozen files.
/// </summary>
public static class SiteInfo
{
    public const string Brand = "AIM";

    /// <summary>
    /// Builds a page title: the supplied segments followed by the brand, joined
    /// with an em dash. Blank segments are dropped so an optional part — a
    /// chapter's book, a missing title — disappears instead of leaving a dangling
    /// dash. With no usable segments the title is the bare brand.
    /// </summary>
    public static string Title(params string?[] parts)
    {
        var segments = parts
            .Where(p => !string.IsNullOrWhiteSpace(p))
            .Select(p => p!.Trim())
            .ToList();

        if (segments.Count == 0)
        {
            return Brand;
        }

        segments.Add(Brand);
        return string.Join(" — ", segments);
    }
}
```

- [ ] **Step 4: Repoint the ten page titles**

Apply each replacement exactly. The left column is the current line, the right
column is what it becomes.

`Components/Pages/Home.razor:6` — the only page whose title stays bare:

```razor
<PageTitle>@SiteInfo.Title()</PageTitle>
```

`Components/Pages/About.razor:3`:

```razor
<PageTitle>@SiteInfo.Title("Về tôi")</PageTitle>
```

`Components/Pages/Books.razor:4`:

```razor
<PageTitle>@SiteInfo.Title("Dịch sách")</PageTitle>
```

`Components/Pages/Book.razor:4`:

```razor
<PageTitle>@SiteInfo.Title(BookItem?.Title ?? "Dịch sách")</PageTitle>
```

`Components/Pages/BookChapter.razor:6` — note this one is three-part, and
`Book?.Title` is allowed to be null, which is exactly what the blank-filter is for:

```razor
<PageTitle>@SiteInfo.Title(Chapter?.Title ?? "Dịch sách", Book?.Title)</PageTitle>
```

`Components/Pages/Post.razor:14`:

```razor
<PageTitle>@SiteInfo.Title(PostMeta.Title)</PageTitle>
```

`Components/Pages/Search.razor:4`:

```razor
<PageTitle>@SiteInfo.Title("Tìm kiếm")</PageTitle>
```

`Components/Pages/Tag.razor:5`:

```razor
<PageTitle>@SiteInfo.Title(string.IsNullOrEmpty(CurrentTag) ? "Thẻ" : "#" + CurrentTag)</PageTitle>
```

`Components/Pages/Profile.razor:5`:

```razor
<PageTitle>@SiteInfo.Title("Trang cá nhân")</PageTitle>
```

`Components/Pages/User.razor:3`:

```razor
<PageTitle>@SiteInfo.Title("Trang cá nhân")</PageTitle>
```

Do not touch `NotFound.razor:4`, `Error.razor:4`, or `Post.razor:9` — none carry a
brand.

- [ ] **Step 5: Build**

```powershell
dotnet build
```

Expected: exit 0, no errors. If a Razor page fails to compile, the usual cause is
a missing `@using`; `Components/_Imports.razor:14` should already cover it, in
which case check for a typo in the namespace on the new file.

- [ ] **Step 6: Restart the app and run the test to verify it passes**

```powershell
# restart the app process, then
cd tests\e2e
npx playwright test brand.spec.js
```

Expected: **3 passed.**

- [ ] **Step 7: Confirm no literal brand remains in any title**

```powershell
Select-String -Path Components\Pages\*.razor -Pattern 'Alternative World'
```

Expected: **no output.** Every occurrence was in a `<PageTitle>` and all ten are
now routed through the helper.

- [ ] **Step 8: Commit**

```powershell
git add Services/SiteInfo.cs tests/e2e/tests/brand.spec.js `
        Components/Pages/Home.razor Components/Pages/About.razor `
        Components/Pages/Books.razor Components/Pages/Book.razor `
        Components/Pages/BookChapter.razor Components/Pages/Post.razor `
        Components/Pages/Search.razor Components/Pages/Tag.razor `
        Components/Pages/Profile.razor Components/Pages/User.razor
git commit -m "feat(blog): centralise the brand in SiteInfo and rename page titles"
```

Verify with `git status --short` that nothing under `books/` or `tools/` was
staged.

---

### Task 2: Every non-title brand surface

**Files:**
- Modify: `Components/Layout/MainLayout.razor:11`
- Modify: `Components/App.razor:10`, `:21`
- Modify: `Components/Pages/Home.razor:134`, `:138`
- Modify: `Components/Pages/Post.razor:124`, `:129`
- Modify: `Program.cs:51`, `:132`, `:153`
- Modify: `wwwroot/manifest.webmanifest:2`, `:3`
- Modify: `wwwroot/favicon.svg:1`
- Modify: `wwwroot/sw.js:1`, `:2`
- Modify: `wwwroot/css/site.css:2`
- Modify: `PRODUCT.md` (the `## Brand Commitments` line)
- Modify: `tests/e2e/tests/brand.spec.js` (append)

**Interfaces:**
- Consumes: `SiteInfo.Brand` and `SiteInfo.Title` from Task 1. **Task 1 must be
  merged first** — `dotnet build` fails without `Services/SiteInfo.cs`.
- Produces: nothing new. This task is the last writer of the brand string outside
  static assets, and it introduces the two edits a text search cannot find:
  the `AltWorld` short name and the cover-SVG `<text>` node.

- [ ] **Step 1: Write the failing tests**

Append to `tests/e2e/tests/brand.spec.js`:

```js
test('header: chữ trên cùng là AIM', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.lb-brand')).toHaveText('AIM');
});

test('meta description nhắc AIM và không còn tên cũ', async ({ page }) => {
  await page.goto('/');
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toContain('AIM');
  expect(description).not.toContain('Alternative World');
});

test('feed rss.xml đặt tiêu đề kênh là AIM', async ({ request }) => {
  const response = await request.get('/rss.xml');
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain('<title>AIM</title>');
});

test('manifest: cả name và short_name đều là AIM', async ({ request }) => {
  const response = await request.get('/manifest.webmanifest');
  expect(response.ok()).toBeTruthy();
  const manifest = JSON.parse(await response.text());
  expect(manifest.name).toBe('AIM');
  expect(manifest.short_name).toBe('AIM');
});

test('json-ld trang chủ nói AIM', async ({ page }) => {
  await page.goto('/');
  const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
  const node = JSON.parse(raw);
  expect(node.name).toBe('AIM');
  expect(node.publisher.name).toBe('AIM');
});
```

- [ ] **Step 2: Run the new tests to verify they fail**

```powershell
cd tests\e2e
npx playwright test brand.spec.js
```

Expected: **5 failures, 3 passed.** The three from Task 1 stay green; the wordmark
reports `Alternative World`, the meta description contains no `AIM`, the feed
contains `<title>Alternative World</title>`, the manifest `short_name` is
`AltWorld`, and the JSON-LD `name` is `Alternative World`.

- [ ] **Step 3: Rename the code-visible surfaces**

`Components/Layout/MainLayout.razor:11` — the wordmark is a bare text node
between the `<a>` at line 9 and its close at line 12. Replace only the text; leave
the blossom `<svg><use href="#lb-blossom" /></svg>` on line 10 exactly as it is.

```razor
        <a href="/" class="lb-brand">
            <svg class="lb-brand__mark" aria-hidden="true"><use href="#lb-blossom" /></svg>
            AIM
        </a>
```

`Components/App.razor:10`:

```razor
    <meta name="description" content="@SiteInfo.Brand — nghĩ khác đi về toán học và lập trình" />
```

`Components/App.razor:21`:

```razor
    <link rel="alternate" type="application/rss+xml" title="@SiteInfo.Brand RSS" href="/rss.xml" />
```

`Components/Pages/Home.razor:134`:

```csharp
                ["name"] = SiteInfo.Brand,
```

`Components/Pages/Home.razor:138`:

```csharp
                ["publisher"] = new JsonObject { ["@type"] = "Organization", ["name"] = SiteInfo.Brand },
```

`Components/Pages/Post.razor:124`:

```csharp
                    ["name"] = SiteInfo.Brand,
```

`Components/Pages/Post.razor:129`:

```csharp
                    ["name"] = SiteInfo.Brand,
```

`Program.cs:51` — note the fully-qualified namespace, matching the file's existing
style:

```csharp
    sb.Append("<title>").Append(LatexBlog.Services.SiteInfo.Brand).Append("</title><link>").Append(baseUrl).Append("</link>");
```

`Program.cs:132` — the cover-SVG fallback text:

```csharp
    var title = p?.Title ?? LatexBlog.Services.SiteInfo.Brand;
```

`Program.cs:153` — the second of the two cover-SVG traps. It sits inside an
interpolated raw string (`$"""`), so the interpolation goes inside the `<text>`
element:

```csharp
          <text x="600" y="455" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#efe9f6">{LatexBlog.Services.SiteInfo.Brand}</text>
```

- [ ] **Step 4: Rename the static assets, which cannot reference C#**

`wwwroot/manifest.webmanifest` — **both** tokens. `short_name` is `AltWorld`, which
does not contain the old brand as a substring, so a find-and-replace of the long
form silently misses it:

```json
  "name": "AIM",
  "short_name": "AIM",
```

Leave the `description` on line 4 alone — it reads "Viết bằng LaTeX, xuất bản
bằng Blazor." and carries no brand.

`wwwroot/favicon.svg:1` — change only the `aria-label` attribute value:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="AIM">
```

`wwwroot/sw.js` — lines 1 and 2 together. The bump is mandatory; without it a
returning visitor is served the old brand out of cache:

```js
// AIM service worker - offline reading: cache static assets + generated posts.
var CACHE = "lb-v20";
```

`wwwroot/css/site.css:2` — header comment only:

```css
   AIM - Sakura Neon (own world)
```

- [ ] **Step 5: Fix the product-name line**

In `PRODUCT.md`, under `## Brand Commitments`, replace:

```markdown
- Tên sản phẩm: **LatexBlog**.
```

with:

```markdown
- Tên sản phẩm: **AIM**.
```

Leave the neighbouring `## Evidence on Hand` section alone. It lists a real post
titled *"Chào mừng đến với LatexBlog"* — that is a published article's title, not
the brand, and it must not change.

- [ ] **Step 6: Build and verify the C# changes**

```powershell
dotnet build
```

Expected: exit 0. Restart the app afterwards.

- [ ] **Step 7: Run the full spec to verify it passes**

```powershell
cd tests\e2e
npx playwright test brand.spec.js
```

Expected: **8 passed.**

- [ ] **Step 8: Prove the two traps are gone**

```powershell
Select-String -Path wwwroot\manifest.webmanifest,Program.cs,Components\App.razor,Components\Layout\MainLayout.razor -Pattern 'Alternative World|AltWorld'
```

Expected: **no output.**

- [ ] **Step 9: Confirm the cover SVG renders the new brand**

```powershell
(Invoke-WebRequest "http://127.0.0.1:5080/cover/khong-co-bai-nay-xyz.svg").Content |
  Select-String -Pattern 'AIM' -Quiet
```

Expected: `True`. A slug that does not exist forces the `?? SiteInfo.Brand`
fallback, which is the branch being changed. Then open the same URL in a browser
and confirm the rendered image reads `AIM` — the text is converted to glyphs at
render time, so only the eye can confirm this one.

- [ ] **Step 10: Commit**

```powershell
git add Components/Layout/MainLayout.razor Components/App.razor `
        Components/Pages/Home.razor Components/Pages/Post.razor `
        Program.cs wwwroot/manifest.webmanifest wwwroot/favicon.svg `
        wwwroot/sw.js wwwroot/css/site.css PRODUCT.md `
        tests/e2e/tests/brand.spec.js
git commit -m "feat(blog): rename the remaining brand surfaces to AIM"
```

---

### Task 3: The About page, rewritten by addition

**Files:**
- Modify: `Components/Pages/About.razor` (whole file, currently 24 lines)
- Modify: `tests/e2e/tests/brand.spec.js` (append)

**Interfaces:**
- Consumes: `SiteInfo.Title` from Task 1.
- Produces: nothing consumed by later tasks except the DOM shape the next task's
  nav test relies on — a `/about` route that exists and is reachable. **The route
  already exists; this task does not add it.** The existing e2e test
  `trang về tôi: heading hiển thị, không lỗi` at
  `tests/e2e/tests/page-layout.spec.js:35-38` pins `.lb-about h1` to `Về tôi` and
  must keep passing.

- [ ] **Step 1: Write the failing tests**

Append to `tests/e2e/tests/brand.spec.js`:

```js
test('trang về tôi: có đủ ba tầng', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.lb-about h2')).toHaveText([
    'AIM là gì',
    'Tên đến từ đâu',
    'Trang này sẽ làm gì',
  ]);
});

test('trang về tôi: giữ nguyên trích dẫn Newton', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.lb-about__lead')).toContainText('đại dương chân lý mênh mông');
});

test('trang về tôi: giữ chi tiết LaTeX và KaTeX', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.lb-about')).toContainText('KaTeX');
});

test('trang về tôi: giữ câu về bình luận và trang cá nhân', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.lb-about')).toContainText('thích những bài mình ưng');
});
```

- [ ] **Step 2: Run the new tests to verify they fail**

```powershell
cd tests\e2e
npx playwright test brand.spec.js
```

Expected: **1 failure, 11 passed** — and that is the correct result, not a
surprise. Only `có đủ ba tầng` fails, because the three `h2` tiers do not exist
yet. The other three are regression guards on content that is already there: the
Newton quotation, the LaTeX/KaTeX fact and the comment sentence all pass today and
must still pass after the rewrite. They are there to catch a rewrite that quietly
drops existing prose.

If the Newton, KaTeX or comment test fails *before* you change anything, stop and
re-read `About.razor` — you have mis-copied the current text, and the fix is to
read the file again, never to weaken the test.

- [ ] **Step 3: Rewrite the page**

Replace the whole of `Components/Pages/About.razor` with:

```razor
@page "/about"

<PageTitle>@SiteInfo.Title("Về tôi")</PageTitle>
<HeadContent>
    <script type="module" src="/js/page-layout.js?v=20260821a"
            data-page-layout
            data-heading=".lb-about h1, .lb-about h2"></script>
</HeadContent>

<section class="lb-about">
    <h1>Về tôi</h1>

    <p class="lb-about__lead">"Tôi không biết mình xuất hiện trước thế giới ra sao,
    nhưng với bản thân, tôi chỉ như một cậu bé chơi đùa trên bờ biển… trong khi cả
    đại dương chân lý mênh mông vẫn nằm đó, chưa được khám phá." — Isaac Newton</p>

    <h2>AIM là gì</h2>

    <p>AIM là tên của trang này, và cũng là cách trang này được viết.</p>

    <p>Trang này không tuyên bố điều gì về mình. Nó không bảo bạn phải học theo
    cách nào. Nó chỉ ghi lại cách tôi thật sự hiểu một vấn đề toán học, và chỉ
    những chỗ tôi thật sự tới nơi. Chỗ nào chưa hiểu, tôi để trống thay vì đoán
    bừa.</p>

    <p>Series hiện tại gọi nó là <em>Forget School. Learn Mathematics.</em></p>

    <h2>Tên đến từ đâu</h2>

    <p>Trong <em>A Certain Magical Index</em> (魔法禁書目录), người có năng lực
    được định nghĩa bằng thứ họ toả ra, chứ không phải thứ họ tin. Cái đó gọi là
    AIM diffuse field. Ba điều ở đó giống cách trang này viết:</p>

    <ul>
      <li>Bạn không bật được nó. Nó tự toả ra, và người xung quanh bị ảnh hưởng
      dù bạn có muốn hay không.</li>
      <li>Nó nói bạn là ai, không nói bạn tin gì. Nó là chữ ký, không phải tuyên
      ngôn.</li>
      <li>Nó không giả được. Thứ đập ra thành thứ bạn đang thật sự nghĩ.</li>
    </ul>

    <p>Một trang toán học cũng vậy. Viết ra là toả ra, và không có cách nào viết
    mà không lộ cách mình nghĩ. Tôi không viết để tỏ ra đúng. Tôi viết để ghi
    lại chỗ mình đã hiểu.</p>

    <p>Nếu bạn không đọc Toaru, bỏ qua mục này cũng được. Mục trên đã đủ.</p>

    <h2>Trang này sẽ làm gì</h2>

    <p>Viết về toán học và lập trình theo hướng ngược lại với thói quen: hỏi lại
    định nghĩa, thử lại giả thiết, và tìm cách hiểu khác cho những thứ tưởng đã
    hiểu rồi. Không mở đầu bằng định nghĩa — mở đầu bằng một bài toán, một chỗ
    vướng, một cách nhìn mới, rồi mới đặt tên cho nó.</p>

    <p>Mỗi bài viết bắt đầu từ một tệp LaTeX, biên dịch sang HTML bằng Pandoc —
    công thức là toán thật, render bằng KaTeX, không phải ảnh chèn.</p>

    <p>Phần Dịch sách là bản dịch và chú thích sách cổ:
    <a href="/books">Principia</a> của Newton, <em>Aether</em> của Whittaker,
    <em>De Motu</em> — kèm chú thích so với cách hiểu hiện đại.</p>

    <p>Bạn có thể bình luận bằng Google account, thích những bài mình ưng, rồi xem
    lại chúng trong trang cá nhân.</p>

    <p><Button Href="/" Variant="link" Class="lb-cta px-0">Về trang chủ</Button></p>
</section>
```

Four things to get right:

- **The `data-heading` selector widens to `.lb-about h1, .lb-about h2`.** Without
  this the table of contents will not track the new sections.
- **The Newton quotation is reproduced exactly**, including the `…` ellipsis and
  the `lb-about__lead` class. Do not tidy it, shorten it, or reflow it into a
  different sentence.
- **No heading contains a colon.** Four headings: one `h1` and three `h2`.
- **The `<a href="/books">Principia</a>` is deliberately unclassed.** The sweep
  found no prose-link class in the design system. Before shipping, open any post
  and copy the class list off an in-prose link so it matches. Do not borrow
  `.lb-cta` — that is a button style used by the trailing control.

- [ ] **Step 4: Build, restart, and run the spec**

```powershell
dotnet build
```

Then restart the app and:

```powershell
cd tests\e2e
npx playwright test brand.spec.js page-layout.spec.js
```

Expected: **all pass.** `page-layout.spec.js` is included on purpose — its
`trang về tôi: heading hiển thị, không lỗi` test guards the `h1`.

- [ ] **Step 5: Check the new prose-link treatment by eye**

Open a post, click an in-prose link, note its classes. Then open `/about` and
confirm `<a href="/books">Principia</a>` looks the same. If it does not, apply the
class you found.

- [ ] **Step 6: Commit**

```powershell
git add Components/Pages/About.razor tests/e2e/tests/brand.spec.js
git commit -m "feat(blog): rewrite the about page around the AIM story"
```

---

### Task 4: Nav link, and the repo-wide zero-hit check

**Files:**
- Modify: `Components/Layout/MainLayout.razor:20-24`
- Modify: `tests/e2e/tests/brand.spec.js` (append)

**Interfaces:**
- Consumes: the `/about` route and its `Về tôi` `h1` from Task 3, and the
  `.lb-brand` anchor markup from Task 2.
- Produces: nothing. This is the closing task — it makes the About page reachable
  and proves the rename is complete.

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/tests/brand.spec.js`:

```js
test('nav có mục Về tôi dẫn tới /about', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('.lb-nav-links a[href="/about"]');
  await expect(link).toBeVisible();
  await expect(link).toHaveText('Về tôi');
});
```

- [ ] **Step 2: Run it to verify it fails**

```powershell
cd tests\e2e
npx playwright test brand.spec.js
```

Expected: **1 failure, 11 passed.** The link is not in the DOM yet.

- [ ] **Step 3: Add the nav item**

In `Components/Layout/MainLayout.razor`, the list at lines 20-24 currently reads:

```razor
        <ul class="lb-nav-links">
            <li><Button Href="/" Variant="link" Size="sm" Class="px-0">Trang chủ</Button></li>
            <li><Button Href="/tags" Variant="link" Size="sm" Class="px-0">Thẻ</Button></li>
            <li><Button Href="/books" Variant="link" Size="sm" Class="px-0">Dịch sách</Button></li>
        </ul>
```

Add a fourth `<li>`, matching the siblings' `Variant`, `Size` and `Class` exactly:

```razor
        <ul class="lb-nav-links">
            <li><Button Href="/" Variant="link" Size="sm" Class="px-0">Trang chủ</Button></li>
            <li><Button Href="/tags" Variant="link" Size="sm" Class="px-0">Thẻ</Button></li>
            <li><Button Href="/books" Variant="link" Size="sm" Class="px-0">Dịch sách</Button></li>
            <li><Button Href="/about" Variant="link" Size="sm" Class="px-0">Về tôi</Button></li>
        </ul>
```

- [ ] **Step 4: Build, restart, and run the full suite**

```powershell
dotnet build
```

Restart the app, then run everything — not just the new file, because the nav
change touches shared layout:

```powershell
cd tests\e2e
npx playwright test
```

Expected: **all specs pass.** If unrelated specs fail, check whether they failed
before this change started; do not assume this plan caused it and do not delete
the test.

- [ ] **Step 5: The zero-hit check**

This is the real completion gate. Both strings must be gone from the whole repo:

```powershell
Select-String -Path (Get-ChildItem -Recurse -File -Include *.cs,*.razor,*.json,*.js,*.css,*.html,*.md,*.webmanifest,*.svg,*.csproj,*.yml | Where-Object { $_.FullName -notmatch 'node_modules|\\.git\\|\\bin\\|\\obj\\|\\external\\|\\.codegraph\\|\\books\\|wwwroot\\generated' }).FullName -Pattern 'Alternative World|AltWorld'
```

Expected: **no output.** Any surviving hit is a bug in this change.

- [ ] **Step 6: Confirm `LatexBlog` was left alone where it should be**

```powershell
Select-String -Path Program.cs,LatexBlog.csproj,Dockerfile,Components\_Imports.razor -Pattern 'LatexBlog'
```

Expected: **output present** in all four. If this returns nothing, something
renamed the assembly and broke the Docker build.

- [ ] **Step 7: Check the nav at mobile width by eye**

The list sits inside a collapsible `.lb-nav-panel` behind the toggle at
`MainLayout.razor:14-17`. At 1280px the Playwright viewport sees the panel open,
which is why Step 1 can assert visibility. Narrow the window to ~390px, open the
menu, and confirm all four items are reachable and not clipped. This is manual
because the e2e suite runs one fixed viewport.

- [ ] **Step 8: Commit**

```powershell
git add Components/Layout/MainLayout.razor tests/e2e/tests/brand.spec.js
git commit -m "feat(blog): link the about page from the nav"
```

- [ ] **Step 9: Final confirmation**

```powershell
dotnet build
cd tests\e2e
npx playwright test
git status --short
```

Expected: build exits 0, all specs pass, and `git status --short` shows only the
pre-existing `books/` and `tools/` modifications that were dirty before this work
began — nothing new.
