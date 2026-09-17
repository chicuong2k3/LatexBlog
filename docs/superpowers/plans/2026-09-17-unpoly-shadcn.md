# LatexBlog → Unpoly.Blazor + Shadcn Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert LatexBlog (Blazor static SSR + htmx + custom Sakura CSS) to Unpoly.Blazor + Unpoly.Blazor.Shadcn with zero behavior loss.

**Architecture:** Strangler in 5 phases — P1 Unpoly wiring (delete 3 HtmlRenderer endpoints), P2 Tailwind v4 + Sakura-as-shadcn-theme (migrate `data-theme` → `.dark`), P3 pages to shadcn components one by one, P4 Supabase/Alpine islands to Unpoly+shadcn, P5 KaTeX compilers + PWA + new tests. Ship after each phase.

**Tech Stack:** .NET 10 Blazor static SSR, Unpoly 3 (via Unpoly.Blazor), Tailwind CSS v4, Unpoly.Blazor.Shadcn (copy-in Razor source), KaTeX 0.16.11, Supabase JS (islands until P4), Playwright (tests/e2e).

## Global Constraints

- KaTeX math rendering must stay pixel-identical at all widths; pandoc HTML in `wwwroot/generated/` is untouched.
- Dark mode must work on every converted page from P2 onward; toggle writes `.dark` on `<html>`, persisted, no-flash before first paint.
- Every route stays a real bookmarkable page that works with JS off; never let a route require `IsUnpoly()`.
- Vietnamese UI strings stay intact; `posts/*.tex` sources and `tools/build_posts.py` are untouched.
- No `blazor.web.js` ever; no `as any`/`@ts-ignore` equivalents (no `!` class overrides to force shadcn); `ui.js` stays IIFE-wrapped.
- `LatexBlog.csproj` stays `net10.0`, Nullable + ImplicitUsings enabled.
- Working directory for all commands: `C:\Users\nguye\Desktop\codes\LatexBlog`. E2E commands run from `tests\e2e`.

---

## File Structure

New / modified files by phase:

- P1: `Program.cs` (AddUnpoly + UseUnpoly, delete `/posts` `/tags` `/search/results` endpoints), `Components/App.razor` (UnpolyHead + unpoly.min.js, drop htmx), `Components/Layout/MainLayout.razor` (UpChrome), `Components/Pages/Home.razor`, `Tag.razor`, `Search.razor`, `PostList.razor` (hx-* → up-* attrs).
- P2: `package.json` + `Styles/app.css` (new), `wwwroot/css/app.css` (generated, git-ignored), `Components/Ui/*` (copied shadcn source), `Styles/sakura-theme.css` (new token block), `Components/App.razor` (stylesheet swap), `wwwroot/js/site.js` (toggle writes `.dark`).
- P3: `Components/Shared/PostCard.razor`, `Components/Pages/*.razor` (component swap, one page per task).
- P4: `Components/Shared/CommentSection.razor`, `PostActions.razor`, `Components/Pages/User.razor`, `Profile.razor`, `wwwroot/js/comments.js` (shrinks), search modal in `MainLayout.razor`.
- P5: `wwwroot/js/unpoly-compilers.js` (new), `wwwroot/sw.js`, `tests/e2e/tests/unpoly-swaps.spec.js` + `shadcn-theme.spec.js` (new).

Library source location (clone once, read-only): `<sibling>\Unpoly.Blazor\src\Unpoly.Blazor` and `<sibling>\Unpoly.Blazor.Shadcn\src\Unpoly.Blazor.Shadcn`.

---

### Task 1: P1 — Reference Unpoly.Blazor and wire Program.cs

**Files:**
- Modify: `LatexBlog.csproj`
- Modify: `Program.cs:6-48`
- Test: `tests/e2e/tests/endpoints.spec.js` (extend with Vary assertion)

**Interfaces:**
- Consumes: existing `Program.cs` middleware order (UseStaticFiles → endpoints → MapRazorComponents).
- Produces: `AddUnpoly(MainTargets=[".lb-main"])` service + `UseUnpoly()` middleware; `Vary: X-Up-Target, X-Up-Version, X-Up-Mode, X-Up-Context` on every response for P1-Task 3 to rely on.

- [ ] **Step 1: Clone the two libraries as read-only siblings**

```powershell
Set-Location C:\Users\nguye\Desktop\codes
git clone https://github.com/chicuong2k3/Unpoly.Blazor.git
git clone https://github.com/chicuong2k3/Unpoly.Blazor.Shadcn.git
```

- [ ] **Step 2: Try NuGet first, fall back to ProjectReference**

```powershell
Set-Location C:\Users\nguye\Desktop\codes\LatexBlog
dotnet add package Unpoly.Blazor
```

Expected: success if the package is published. If it fails with "package not found", edit `LatexBlog.csproj` instead:

```xml
<ItemGroup>
  <ProjectReference Include="..\Unpoly.Blazor\src\Unpoly.Blazor\Unpoly.Blazor.csproj" />
</ItemGroup>
```

- [ ] **Step 3: Wire services and middleware in Program.cs**

```csharp
builder.Services.AddUnpoly(o => o.MainTargets = [".lb-main"]);
// ...
app.UseStaticFiles();
app.UseUnpoly();      // BEFORE UseAntiforgery. Sets Vary, empties 204/304 bodies.
app.UseAntiforgery();
```

Do NOT delete the htmx endpoints yet (Task 4 does that after attrs are converted).

- [ ] **Step 4: Build**

```powershell
dotnet build
```

Expected: exit 0, no new warnings.

- [ ] **Step 5: Add Vary regression test to tests/e2e/tests/endpoints.spec.js**

```js
test('every response varies on Unpoly headers', async ({ request }) => {
  const res = await request.get('/');
  const vary = res.headers()['vary'] || '';
  expect(vary).toContain('X-Up-Target');
});
```

- [ ] **Step 6: Run it**

```powershell
Set-Location C:\Users\nguye\Desktop\codes\LatexBlog\tests\e2e
npx playwright test tests/endpoints.spec.js
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add LatexBlog.csproj Program.cs tests/e2e/tests/endpoints.spec.js
git commit -m "feat: wire Unpoly.Blazor services and middleware"
```

---

### Task 2: P1 — App.razor head: UnpolyHead in, htmx out

**Files:**
- Modify: `Components/App.razor:1-39`
- Test: `tests/e2e/tests/home.spec.js` (extend: no htmx script tag)

**Interfaces:**
- Consumes: Task 1 middleware (Vary/CSRF plumbing).
- Produces: `<UnpolyHead />` inside `<UpChrome>` in `<head>`; `HeadOutlet` outside `UpChrome`; unpoly.min.js served; zero htmx references for Task 4 to rely on.

- [ ] **Step 1: Add failing assertion — htmx must be gone, unpoly present**

```js
test('head uses Unpoly, not htmx', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('script[src*="htmx"]').count()).toBe(0);
  expect(await page.locator('script[src*="unpoly"]').count()).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run to verify it fails**

```powershell
npx playwright test tests/home.spec.js
```

Expected: FAIL on the htmx count line.

- [ ] **Step 3: Edit Components/App.razor head**

```razor
<head>
    <UpChrome>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        @* ... keep all existing meta/link/font/KaTeX tags ... *@
        <UnpolyHead />
    </UpChrome>
    <HeadOutlet />
    @* KaTeX + Alpine scripts stay; DELETE the htmx <script> line *@
</head>
```

Rules: `HeadOutlet` stays outside `UpChrome` or `PageTitle` stops updating. Never add `blazor.web.js`.

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx playwright test tests/home.spec.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add Components/App.razor tests/e2e/tests/home.spec.js
git commit -m "feat: UnpolyHead in App.razor, drop htmx"
```

---

### Task 3: P1 — MainLayout UpChrome around nav/footer, bare main target

**Files:**
- Modify: `Components/Layout/MainLayout.razor:1-149`
- Test: `tests/e2e/tests/unpoly-swaps.spec.js` (new file)

**Interfaces:**
- Consumes: Task 2 head wiring.
- Produces: `<main class="lb-main">` as the fragment target; nav/footer inside `UpChrome` with `Provides` covering every targetable selector inside chrome, for Task 4 links to target safely.

- [ ] **Step 1: Write the failing fragment test**

```js
// tests/e2e/tests/unpoly-swaps.spec.js
const { test, expect } = require('@playwright/test');

test('fragment request skips chrome but keeps target', async ({ request }) => {
  const res = await request.get('/tags/toan', { headers: { 'X-Up-Target': '.lb-main' } });
  const html = await res.text();
  expect(html).toContain('lb-main');
  expect(html).not.toContain('lb-nav');
});
```

- [ ] **Step 2: Run to verify it fails**

```powershell
npx playwright test tests/unpoly-swaps.spec.js
```

Expected: FAIL (chrome still rendered — nothing wrapped yet).

- [ ] **Step 3: Wrap chrome in MainLayout.razor**

```razor
<UpChrome Provides=".lb-nav, .lb-nav-links, .lb-notif__badge">
    <div class="lb-nav" ...>
        @* entire existing nav block, unchanged *@
    </div>
</UpChrome>

<main class="lb-main">
    @Body
</main>

<UpChrome>
    <footer class="lb-footer">
        @* existing footer, unchanged *@
    </footer>
</UpChrome>
```

Rules: the `<main class="lb-main">` target itself is never wrapped. `Provides` must list every selector inside chrome that any link/form targets (nav links, notification badge), or those swaps silently do nothing.

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx playwright test tests/unpoly-swaps.spec.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add Components/Layout/MainLayout.razor tests/e2e/tests/unpoly-swaps.spec.js
git commit -m "feat: UpChrome around layout chrome, bare .lb-main target"
```

---

### Task 4: P1 — Convert hx-* to up-* and delete the 3 HtmlRenderer endpoints

**Files:**
- Modify: `Components/Pages/Home.razor:55-64` (load-more button)
- Modify: `Components/Pages/Tag.razor:14-21` (tag chips)
- Modify: `Components/Pages/Search.razor:15-24` (live search input)
- Modify: `Components/Layout/MainLayout.razor:104-113` (search modal input)
- Modify: `Components/Pages/PostList.razor:11-20`
- Modify: `Program.cs:33-76` (delete `/posts`, `/tags`, `/search/results` endpoints + now-unused usings)
- Test: `tests/e2e/tests/unpoly-swaps.spec.js` (append swap tests), `tests/e2e/tests/search.spec.js`

**Interfaces:**
- Consumes: Tasks 1–3 (middleware, head, chrome/target split).
- Produces: zero `hx-` attributes in repo; zero `HtmlRenderer` usage; load-more/tag/search all Unpoly swaps against real pages — the seam P2–P5 build on.

- [ ] **Step 1: Append failing swap tests**

```js
test('home load-more swaps without full reload', async ({ page }) => {
  await page.goto('/');
  const more = page.locator('.lb-load-more');
  if (await more.count() === 0) test.skip();
  await more.locator('button, a').first().click();
  await expect(page.locator('.lb-post-list .lb-post').nth(3)).toBeVisible();
});

test('search input swaps results', async ({ page }) => {
  await page.goto('/search');
  await page.locator('input[name="q"]').fill('ma trận');
  await expect(page.locator('#search-results .lb-post').first()).toBeVisible({ timeout: 10000 });
});
```

- [ ] **Step 2: Run to verify they fail**

```powershell
npx playwright test tests/unpoly-swaps.spec.js tests/search.spec.js
```

Expected: FAIL (htmx script is gone, so hx-* attributes do nothing).

- [ ] **Step 3: Convert attributes (mechanical, per element)**

Home load-more (`Home.razor`):

```razor
<a class="lb-button" href="/?page=2" up-target=".lb-post-list:after, .lb-load-more" up-fallback=".lb-main">Xem thêm</a>
```

Rule: Unpoly needs full pages, not fragments — the Home page itself must accept `?page=` and render that slice server-side (add `?page=` handling to `Home.razor` `@code`, default 1). Same for tag chips (`Tag.razor`): plain links with `up-target=".lb-main"` (they already navigate to real routes — just delete the `hx-*` attrs and add `up-follow`). Search input (`Search.razor` + modal input): wrap in a GET form targeting `#search-results`:

```razor
<form method="get" action="/search" up-target="#search-results" up-autosubmit up-watch-delay="300">
    <input type="search" name="q" class="lb-field" placeholder="Tìm kiếm bài viết…" autocomplete="off" value="@Q" />
</form>
```

`/search` page reads `?q=` server-side and renders `SearchResults` inline (no separate endpoint).

- [ ] **Step 4: Delete the 3 endpoints from Program.cs**

Delete the `/posts`, `/tags`, `/search/results` `MapGet` blocks and the now-unused `HtmlRenderer`/`Mvc` usings. Keep RSS, sitemap, robots, cover endpoints untouched.

- [ ] **Step 5: Verify zero htmx remnants**

```powershell
Select-String -Pattern 'hx-|HtmlRenderer|htmx' -Path Components, Program.cs -Recurse
```

Expected: no output.

- [ ] **Step 6: Full check**

```powershell
dotnet build
python tools/test_build_posts.py
Set-Location tests/e2e; npx playwright test tests/unpoly-swaps.spec.js tests/search.spec.js tests/home.spec.js
```

Expected: build 0, python tests pass, Playwright PASS.

- [ ] **Step 7: Commit**

```bash
git add Program.cs Components tests/e2e/tests/unpoly-swaps.spec.js tests/e2e/tests/search.spec.js
git commit -m "feat: htmx endpoints deleted, Unpoly fragment swaps live"
```

---

### Task 5: P2 — Tailwind v4 + copy-in shadcn source + Sakura theme block

**Files:**
- Create: `package.json`, `Styles/app.css`, `Styles/sakura-theme.css`, `Components/Ui/*` (copied)
- Create: `wwwroot/js/ui.js` (copied, IIFE intact — verify, never edit the wrapper)
- Modify: `Components/App.razor` (stylesheet link), `.gitignore` (built css)
- Test: `tests/e2e/tests/shadcn-theme.spec.js` (new file)

**Interfaces:**
- Consumes: Task 4 (stable Unpoly shell).
- Produces: Tailwind-built `wwwroot/css/app.css` containing shadcn tokens + Sakura light/dark blocks + `.dark` variant; `Ui` component namespace available for P3.

- [ ] **Step 1: Install Tailwind and copy library source**

```powershell
npm init -y
npm install -D tailwindcss @tailwindcss/cli
Copy-Item -Recurse <sibling>\Unpoly.Blazor.Shadcn\src\Unpoly.Blazor.Shadcn\Components Components\Ui
Copy-Item <sibling>\Unpoly.Blazor.Shadcn\src\Unpoly.Blazor.Shadcn\Styles\ui.css Styles\ui.css
Copy-Item <sibling>\Unpoly.Blazor.Shadcn\src\Unpoly.Blazor.Shadcn\Styles\ui.behavior.css Styles\ui.behavior.css
Copy-Item <sibling>\Unpoly.Blazor.Shadcn\src\Unpoly.Blazor.Shadcn\wwwroot\ui.js wwwroot\js\ui.js
Copy-Item <sibling>\Unpoly.Blazor.Shadcn\src\Unpoly.Blazor.Shadcn\ButtonVariants.cs Components\Ui\ButtonVariants.cs
```

Verify `wwwroot/js/ui.js` starts with an IIFE opener (e.g. `(() => {` / `(function(){`) and ends with its closer. If not wrapped, do NOT paste it raw — wrap the whole file once.

- [ ] **Step 2: Write Styles/app.css**

```css
@import "tailwindcss";
@import "./ui.css";
@import "./sakura-theme.css";

@source "../Components/**/*.razor";
@source "./ui.js";
@source "../Components/Ui/ButtonVariants.cs";
```

`@source "../wwwroot/js/ui.js"` equivalent: the `@source` for `ui.js` must resolve to `wwwroot/js/ui.js` (Select panel, dropdown, confirm dialog are JS-built — missing source = silently unstyled in prod).

- [ ] **Step 3: Write Styles/sakura-theme.css (Sakura tokens, both modes)**

Map DESIGN.md palette onto shadcn variables, light in `:root`, dark in `.dark`:

```css
:root {
  --background: #fdf1f6; --foreground: #231726;
  --card: #ffffff; --card-foreground: #231726;
  --primary: #e63e8f; --primary-foreground: #ffffff;
  --secondary: #7a5cff; --accent: #0ea5c4;
  --muted: #f0d8e4; --muted-foreground: #7a4a68;
  --border: #f0d8e4; --input: #f0d8e4; --ring: #e63e8f;
  --radius: 0.625rem;
  --control-h: 2.875rem; --control-text: 15px;
}
.dark {
  --background: #0c0a16; --foreground: #f2ecf7;
  --card: #161226; --card-foreground: #f2ecf7;
  --primary: #ff5fa2; --primary-foreground: #0c0a16;
  --secondary: #8b7cff; --accent: #5fd4ff;
  --muted: #2b2140; --muted-foreground: #9d8fb8;
  --border: #2b2140; --input: #2b2140; --ring: #ff5fa2;
}
@custom-variant dark (&:where(.dark, .dark *));
@layer base { * { border-color: var(--border); } }
```

The last two rules are load-bearing, not optional (see spec §1).

- [ ] **Step 4: Build the CSS and wire it**

```powershell
npx @tailwindcss/cli -i Styles/app.css -o wwwroot/css/app.css
```

Add `wwwroot/css/app.css` to `.gitignore` (built artifact, like `wwwroot/generated/`). In `App.razor`, replace the `site.css` link with `/css/app.css` but KEEP `site.css` linked after it for now (hybrid period — P3 removes it piece by piece; shadcn utilities win where both apply).

- [ ] **Step 5: Migrate the theme toggle to .dark**

In `wwwroot/js/site.js`, change the `db-theme` restore + toggle to set `document.documentElement.classList.toggle('dark', saved === 'dark')` while still writing `localStorage["db-theme"]`. Keep the `data-theme` attribute write as a no-op shim for one phase so old CSS selectors don't break mid-migration.

- [ ] **Step 6: Write theme tests**

```js
// tests/e2e/tests/shadcn-theme.spec.js
const { test, expect } = require('@playwright/test');

test('dark toggle persists via .dark class', async ({ page }) => {
  await page.goto('/');
  await page.locator('.lb-theme-btn').click();
  await expect(page.locator('html.dark')).toBeAttached();
  await page.reload();
  await expect(page.locator('html.dark')).toBeAttached();
});
```

- [ ] **Step 7: Verify**

```powershell
dotnet build
Set-Location tests/e2e; npx playwright test tests/shadcn-theme.spec.js tests/home.spec.js
```

Expected: PASS, both modes visually Sakura (eyeball home + one post in each mode).

- [ ] **Step 8: Commit**

```bash
git add package.json Styles Components/Ui wwwroot/js/ui.js Components/App.razor wwwroot/js/site.js .gitignore tests/e2e/tests/shadcn-theme.spec.js
git commit -m "feat: Tailwind v4 + shadcn source + Sakura theme on .dark"
```

---

### Task 6: P3 — Convert static pages to shadcn components (one page per commit)

**Files per page:** `Components/Shared/PostCard.razor`, `Components/Pages/Home.razor`, `Tag.razor`, `Search.razor`, `About.razor`, `NotFound.razor`, `Error.razor`
**Test:** existing `home/page-layout/post/search` specs stay green; extend `shadcn-theme.spec.js` with component assertions.

Order: PostCard → Home → Tag → Search → About → NotFound/Error. Each page is its own commit; each must keep its Playwright spec green before moving on.

Component map (shadcn first, plain markup only for the rest):

```razor
@* PostCard: Card + Badge, keep .lb-post-num outline numeral as plain span *@
<Card>
    <CardHeader><span class="lb-post-num">@Number.ToString("00")</span>
        <CardTitle><a href="/posts/@Post.Slug" up-target=".lb-main">@Post.Title</a></CardTitle>
    </CardHeader>
    <CardContent><p>@Post.Summary</p></CardContent>
    <CardFooter><span>Đăng ngày @Post.Date</span>
        @foreach (var tag in Post.Tags) { <Badge Href="@($"/tags/{tag}")">@tag</Badge> }
    </CardFooter>
</Card>
```

```razor
@* Load-more / CTAs: Button with Href instead of asChild *@
<Button Href="/?page=2" up-target=".lb-post-list:after, .lb-load-more" up-fallback=".lb-main">Xem thêm</Button>
```

Rules for every file: no `asChild`; `Select` = native + `SelectItem`; `data-active="@(b ? "true" : null)"`; `id="@($"row-{x}")"`; every non-submit button `type="button"`; `up-*` attrs written as plain lowercase attributes (they splat through `AdditionalAttributes`).

- [ ] **Step 1 per page:** convert markup, keeping all text/routes/classes-that-carry-Sakura-identity.
- [ ] **Step 2 per page:** run its spec (`npx playwright test tests/<page>.spec.js`) — PASS required.
- [ ] **Step 3 per page:** commit (`git commit -m "feat: <page> on shadcn components"`).
- [ ] **Final step:** delete dead `lb-*` rules from `wwwroot/css/site.css` only for converted pages; run FULL e2e (`npx playwright test`) — all green.

---

### Task 7: P4 — CommentSection + PostActions as shadcn Forms (422 + validating guard)

**Files:**
- Modify: `Components/Shared/CommentSection.razor`, `Components/Shared/PostActions.razor`
- Modify: `Components/Pages/Post.razor:78` (cascade HttpContext for `IsUpValidating`)
- Test: extend `tests/e2e/tests/post.spec.js` + `supabase.spec.js`

**Interfaces:**
- Consumes: P3 Card/Button/Input/Textarea in `Ui`.
- Produces: comment post via Unpoly form swap with 422-on-invalid contract; like/view counts via `up-hungry` regions.

- [ ] **Step 1: Failing tests**

```js
test('invalid comment shows errors without navigating', async ({ page }) => {
  await page.goto('/posts/ma-tran');
  await page.locator('textarea[name="body"]').fill('');
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/posts\/ma-tran/);
  await expect(page.locator('[data-slot="form-message"], .field-error').first()).toBeVisible();
});
```

- [ ] **Step 2: Convert to Form/FormField + server guard**

```razor
@code {
    [CascadingParameter] public HttpContext Ctx { get; set; } = default!;

    async Task SubmitAsync()
    {
        Errors = Validate(Model);
        if (Ctx.IsUpValidating()) return;   // BEFORE any write: blur/keystroke probes must not persist
        if (Errors.Count > 0)
        {
            Ctx.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
            return;
        }
        await Comments.SaveAsync(Model);
        Ctx.UpRetarget(".comments-list, .comment-count:maybe");
    }
}
```

422, never 200 — a 200 makes Unpoly treat the invalid form as success and swap the ordinary target.

- [ ] **Step 3:** run specs — PASS. **Step 4:** commit.

---

### Task 8: P4 — Auth/user/profile/notifications/search-modal islands

**Files:**
- Modify: `Components/Layout/MainLayout.razor:96-133` (search modal → Dialog), `:36-60` (notifications → DropdownMenu), `:62-84` (auth buttons → Button/Avatar)
- Modify: `Components/Pages/User.razor`, `Profile.razor`
- Modify: `wwwroot/js/comments.js`, `wwwroot/js/site.js` (delete replaced Alpine stores)
- Test: `tests/e2e/tests/auth-ui.spec.js`, `notifications.spec.js`, `profile.spec.js`, `search.spec.js`

Per-island rules: search modal → `Dialog` pair (`DialogTrigger Target="search-dialog"` + `DialogContent Id="search-dialog"`, read the id back after writing); notifications → `DropdownMenu` + `up-poll` badge with `:maybe` suffix; auth buttons → `Button`/`Avatar`; profile stats → `Card` + `Badge` + `Progress`; highlight/note menus → `Popover` pairs; supabase-js kept ONLY for direct DB reads until each island posts through Unpoly, then deleted. Every converted Alpine store gets `[up-keep]` on its region during transition, removed when the compiler/store lands.

- [ ] Steps per island: failing spec → convert → spec PASS → commit. Full e2e green at the end.

---

### Task 9: P5 — KaTeX/TOC/copy/lightbox compilers + PWA + full suite

**Files:**
- Create: `wwwroot/js/unpoly-compilers.js`
- Modify: `Components/App.razor` (include it `<script defer>` in head), `wwwroot/sw.js` (precache new assets)
- Modify: `Components/Pages/Post.razor:52-65` (TOC), `:69-76` (prose mount points)
- Test: `tests/e2e/tests/post.spec.js`, `page-layout.spec.js`, new `tests/e2e/tests/unpoly-swaps.spec.js` compiler cases

```js
// wwwroot/js/unpoly-compilers.js — every compiler returns a destructor
up.compiler('.lb-prose', (el) => {
  renderMathInElement(el, { delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
  ]});
  const copy = installCopyButtons(el);
  const box = installLightbox(el);
  return () => { copy.dispose(); box.dispose(); };
});

up.compiler('[data-toc-spy]', (el) => {
  const spy = installScrollspy(el);
  return () => spy.dispose();
});
```

Without the destructor, every swap leaks another KaTeX pass / observer — the page slows down over time with no visible error.

SW: add `/css/app.css`, `/js/ui.js`, `/js/unpoly-compilers.js`, unpoly bundle to precache; keep `/` OUT of precache (stale-pages lesson) and keep the controllerchange reload.

- [ ] Step 1: failing test — navigate home → post → home → post, assert single KaTeX render + TOC highlights. Step 2: implement compilers. Step 3: `npx playwright test` FULL suite green + `python tools/test_build_posts.py` green + `dotnet build` 0 warnings. Step 4: commit.

---

### Task 10: P5 — Delete site.css remnants, a11y sweep, docs

**Files:**
- Modify: `wwwroot/css/site.css` (delete; remove link in `App.razor`), `README.md` (stack section: htmx/Alpine → Unpoly/shadcn), `DESIGN.md` (tech notes: Tailwind+tokens), `docs/` verdict note for Htmxor (superseded).
- Test: FULL `npx playwright test` + keyboard-only pass (all dialogs/menus/switches operable, focus visible, TOC/prose contrast ≥ 4.5:1 both modes).

- [ ] Step 1: remove `site.css` link, run full suite — PASS (proves nothing references it).
- [ ] Step 2: delete the file, update README/DESIGN/docs.
- [ ] Step 3: a11y keyboard sweep on home/post/search/profile in both modes.
- [ ] Step 4: commit.

---

## Self-Review

- Spec coverage: §1 arch → Tasks 1–4; tokens/`.dark`/base rules → Task 5; §2 components + translation hygiene → Tasks 6–8; §3 data flow (reads/writes/overlays/placeholders/cache/history) → Tasks 4, 7, 8; §4 errors (422/204/304/Provides/single-expression/no-blazor.web.js/head-defer/GET idempotence) → Tasks 4, 7, 9; tests (parity + new Unpoly specs) → every task; phases P1–P5 → Tasks 1–10 in order.
- Placeholder scan: no TBD/TODO; every step names exact files, code, and commands with expected outputs.
- Type consistency: target selector `.lb-main` used in Tasks 1, 3, 4, 6; `Provides` list defined in Task 3 and reused in Task 4; `.dark` + `db-theme` key shared between Tasks 5 and 9; spec filenames consistent (`unpoly-swaps.spec.js`, `shadcn-theme.spec.js`).
