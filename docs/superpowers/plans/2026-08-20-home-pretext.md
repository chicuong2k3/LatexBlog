# Home page pretext (masonry + hero auto-fit) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage post list into a pretext-measured masonry grid and auto-fit the hero title to exactly 2 lines, as a technology prototype for `@chenglou/pretext`.

**Architecture:** No server-side changes — Blazor SSR, htmx, and `PostCard` render exactly as today. A single ES module `wwwroot/js/home-layout.js` imports a vendored copy of pretext's ESM build, measures text purely arithmetically (`prepare` + `layout`), and absolutely positions `.lb-post` cards into a masonry grid + binary-searches the hero `h1` font-size. When JS, fonts, or pretext are unavailable, the original CSS flow layout stays intact (class `lb-post-list--masonry` is only ever *added*, never relied upon).

**Tech Stack:** `@chenglou/pretext@0.0.8` (vendored, no bundler), vanilla ES module JS, Blazor Static SSR, htmx, existing `site.css` Sakura Neon design system, Playwright e2e.

## Global Constraints

- **No new npm dependencies / build step** — pretext ESM is copied verbatim into `wwwroot/js/vendor/`.
- **No server-side rendering changes** — `Home.razor`, `PostList.razor`, `PostCard.razor` render logic stays byte-identical except one `<script type="module">` tag added to `Home.razor` `<HeadContent>`.
- **No design-system changes** — colors, typography, tokens untouched. Masonry only adds a card container style using existing tokens (`var(--surface)`, `var(--line)`, `var(--neon)`).
- **Fallback mandatory** — no JS / font fail / pretext fail → original layout renders unchanged.
- **Fonts must be measured with named families, never `system-ui`** (macOS measures wrong). Font + `letterSpacing` must sync with real CSS.
- **Empty summary** → `layout` returns `lineCount: 0`; always clamp with `Math.max(1, lineCount)`.
- **Breakpoints (masonry columns):** `<560px` = 1 col, `560–900px` = 2 cols, `>900px` = 3 cols (computed from `window.innerWidth`).
- **Hero auto-fit range:** `clamp(2.4rem, 6.4vw, 4.2rem)` = 38.4–67.2 px (16px root), `line-height: .98`, `letter-spacing: -.03em`, Bricolage Grotesque 800.
- **htmx "Xem thêm":** new cards arrive as siblings of `.lb-post-list` (inside `.lb-wrap`); JS moves them into the list, then re-layouts. Hooked via `htmx:afterSwap` (bubbles to `document`).
- **Resize:** debounce 150 ms → re-run masonry + hero autofit.
- **Cache-busting pattern:** version query `?v=YYYYMMDDx` on changed assets. New: `/css/site.css?v=20260820a`, `/js/home-layout.js?v=20260820a`. Service worker `STATIC` list must contain the exact request URLs for offline precache; bump `CACHE` name to `"lb-v12"`.
- **Git:** every git command prefixed `$env:GIT_MASTER='1';`. Commit style: SEMANTIC + English (`chore:`/`feat:`/`test:`/`docs:`). Every commit body ends with the Sisyphus attribution footer:
  ```
  Ultraworked with [Sisyphus](https://github.com/code-yeongyu/oh-my-openagent)

  Co-authored-by: Sisyphus <clio-agent@sisyphuslabs.ai>
  ```
- **NEVER stage user's unrelated changes:** modified `posts/aether-history.tex`; untracked `.omo/`, `CLAUDE.md`, `posts/aether-history.audit/`. Stage only the exact files each task lists.
- **E2E prereq:** app running at `http://127.0.0.1:5080` (`dotnet run --urls http://127.0.0.1:5080`); Playwright runs from `tests/e2e` (`npx playwright test tests/home.spec.js`).

---

### Task 1: Vendor pretext ESM + precache in service worker

**Files:**
- Create: `wwwroot/js/vendor/pretext.esm.js`
- Modify: `wwwroot/sw.js:2` (CACHE name), `wwwroot/sw.js:3-8` (STATIC list)
- Test: command-line verification (node import probe)

**Interfaces:**
- Produces: `wwwroot/js/vendor/pretext.esm.js` — an ES module exporting at least `prepare` and `layout` (named exports, same as the npm package). Task 2 imports `{ prepare, layout }` from `./vendor/pretext.esm.js`.
- Produces: `sw.js` precaches `/js/vendor/pretext.esm.js` and `/js/home-layout.js?v=20260820a` (the latter referenced in Task 2; adding it now keeps precache complete after Task 2).

- [ ] **Step 1: Download and extract the pretext package**

Run (PowerShell, from repo root `C:\Users\nguye\Desktop\codes\LatexBlog`):

```powershell
$tmp = Join-Path $env:TEMP "pretext-0.0.8"
Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $tmp | Out-Null
npm pack @chenglou/pretext@0.0.8 --pack-destination $tmp
tar -xzf (Get-ChildItem "$tmp\*.tgz").FullName -C $tmp
Get-ChildItem "$tmp\package\dist"
```

Expected: `dist/` contains `layout.js` (and possibly `rich-inline.js`). Record `layout.js` byte size for the commit message (expect several hundred KB).

- [ ] **Step 2: Inspect imports of `layout.js`**

Run:

```powershell
Get-Content (Join-Path $tmp "package\dist\layout.js") -TotalCount 15
```

Expected: top of file has `import`/`export` statements only (no `document`/`window` access at module top-level — pretext is DOM-free). If the file imports relative modules (e.g. `./rich-inline.js`), copy those files into `wwwroot/js/vendor/` too and adjust the import in Task 2 accordingly. Record the export names (expect `prepare`, `layout`, `prepareWithSegments`, `layoutWithLines`, `measureLineStats`, `layoutNextLineRange`, `clearCache`).

- [ ] **Step 3: Copy the ESM build into the repo**

```powershell
New-Item -ItemType Directory -Force -Path "wwwroot\js\vendor" | Out-Null
Copy-Item (Join-Path $tmp "package\dist\layout.js") "wwwroot\js\vendor\pretext.esm.js"
```

- [ ] **Step 4: Verify it imports cleanly and exports `prepare`/`layout`**

Run:

```powershell
node --input-type=module -e "import('./wwwroot/js/vendor/pretext.esm.js').then(m => console.log(Object.keys(m).sort().join(', ')))"
```

Expected: prints a comma list containing `layout` and `prepare`. If node rejects the file (browser-only API at top level — unlikely, but possible if it touches `navigator`/`canvas` at import time), fall back to a Playwright probe: temporarily load the file in a page context and assert `window.__pretext` has `prepare`/`layout`; note this in the task log and move on.

- [ ] **Step 5: Update `wwwroot/sw.js` — cache name + STATIC list**

Change line 2 from `var CACHE = "lb-v11";` to `var CACHE = "lb-v12";`.

Change the `STATIC` array (lines 3-8) to:

```js
var STATIC = [
  "/css/site.css",
  "/js/site.js",
  "/js/comments.js",
  "/js/home-layout.js?v=20260820a",
  "/js/vendor/pretext.esm.js",
  "/generated/pygments.css"
];
```

- [ ] **Step 6: Commit**

```powershell
$env:GIT_MASTER='1'; git add wwwroot/js/vendor/pretext.esm.js wwwroot/sw.js
$env:GIT_MASTER='1'; git status
```

Expected: staged = exactly the two files above (nothing from `posts/`, `.omo/`, `CLAUDE.md`, `posts/aether-history.audit/`). Commit:

```powershell
$env:GIT_MASTER='1'; git commit -m "chore: vendor @chenglou/pretext esm build and precache new home js

Vendors the pretext v0.0.8 ESM build for the upcoming home-page
masonry + hero auto-fit prototype. Pre-caches it and the future
home-layout module in the service worker (cache lb-v12).

Ultraworked with [Sisyphus](https://github.com/code-yeongyu/oh-my-openagent)

Co-authored-by: Sisyphus <clio-agent@sisyphuslabs.ai>"
```

Expected: commit succeeds; `git log --oneline -3` shows the new commit on top of `41aa0c6`.

---

### Task 2: Masonry post grid (tests-first)

**Files:**
- Modify: `tests/e2e/tests/home.spec.js` — add masonry tests (written first)
- Create: `wwwroot/js/home-layout.js` — masonry part
- Modify: `Components/Pages/Home.razor:7-9` — add module script to `<HeadContent>`
- Modify: `wwwroot/css/site.css` — masonry card styles (append after the `.lb-load-more` block, line 183)
- Modify: `Components/App.razor:17` — bump `/css/site.css?v=20260819d` → `?v=20260820a`
- Test: `tests/e2e/tests/home.spec.js` (new masonry tests)

**Interfaces:**
- Consumes: `prepare`, `layout` from `./vendor/pretext.esm.js` (Task 1).
- Consumes: htmx global `htmx:afterSwap` event (bubbling to `document`, `event.detail.elt` = swapped root).
- Produces: DOM contract for Task 3 — `init()` is an `async function init()` exported via module top-level call; masonry runs inside it. Task 3 extends the same `init()` with hero autofit.
- Produces: CSS class `.lb-post-list--masonry` on `.lb-post-list`; inline `position/left/top/width` on each `.lb-post`; `min-height` on `.lb-post-list`.

- [ ] **Step 1: Write the failing Playwright tests**

Append to `tests/e2e/tests/home.spec.js`:

```js
test('home masonry: danh sách bài xếp cột bằng pretext', async ({ page }) => {
  await page.goto('/');
  const list = page.locator('.lb-post-list');
  await expect(list).toHaveClass(/lb-post-list--masonry/);
  const first = list.locator('.lb-post').first();
  await expect(first).toHaveCSS('position', 'absolute');
  const box = await first.boundingBox();
  expect(box.width).toBeGreaterThan(200);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('home masonry: card mới từ htmx được đưa vào lưới và xếp lại', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.lb-post-list')).toHaveClass(/lb-post-list--masonry/);
  const before = await page.locator('.lb-post-list .lb-post').count();
  await page.evaluate(() => {
    const wrap = document.querySelector('.lb-posts .lb-wrap');
    const card = document.createElement('article');
    card.className = 'lb-post';
    card.innerHTML =
      '<span class="lb-post-num">04</span>' +
      '<div class="lb-post-body"><h3><a href="/posts/x">Bài viết mới qua htmx</a></h3>' +
      '<p>Một đoạn tóm tắt khá dài để kiểm tra việc xếp cột bằng pretext, đủ chữ để wrap nhiều dòng.</p></div>' +
      '<div class="lb-post-meta"><span class="lb-date">Đăng ngày 2026-08-20</span>' +
      '<div class="lb-post-tags"><a href="/tags/toan" class="lb-tag">toan</a></div></div>';
    wrap.appendChild(card);
    wrap.dispatchEvent(new Event('htmx:afterSwap', { bubbles: true }));
  });
  await expect(page.locator('.lb-post-list .lb-post')).toHaveCount(before + 1);
  await expect(page.locator('.lb-post-list .lb-post').last()).toHaveCSS('position', 'absolute');
});

test('home masonry: fallback khi tắt JS', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('.lb-post-list')).not.toHaveClass(/lb-post-list--masonry/);
  await expect(page.locator('.lb-post').first()).toBeVisible();
  await ctx.close();
});
```

- [ ] **Step 2: Run the new tests — verify they FAIL**

Prereq: app running.

```powershell
$env:BASE_URL="http://127.0.0.1:5080"; npx playwright test tests/home.spec.js --grep "masonry"
```

Run from `tests/e2e`. Expected: FAIL — `home-layout.js` is not loaded yet, so `.lb-post-list` never gets the masonry class (first two tests fail on `toHaveClass`; the JS-off fallback test passes immediately, which is correct).

- [ ] **Step 3: Write `wwwroot/js/home-layout.js` (masonry part)**

Create the file:

```js
// wwwroot/js/home-layout.js
// Pretext-powered home layout: masonry post grid (+ hero auto-fit, Task 3).
// Loaded only on the home page via <script type="module"> in Home.razor.
// Falls back to the plain CSS flow layout when JS/fonts/pretext are unavailable.

import { prepare, layout } from './vendor/pretext.esm.js';

// --- constants (MUST stay in sync with site.css) -------------------------
const HERO_FONT = 'Bricolage Grotesque';
const BODY_FONT = 'Space Grotesk';
const HERO_SIZE_MIN = 2.4 * 16; // clamp(2.4rem, ...) px
const HERO_SIZE_MAX = 4.2 * 16; // clamp(..., 4.2rem) px
const HERO_LINE_HEIGHT = 0.98;  // line-height
const HERO_LETTER_SPACING = -0.03; // letter-spacing (em of font-size)
const CARD_GAP = 24;            // px between masonry cards
const INNER_GAP = 8;            // px gap inside a card (flex gap)
const FONT_TIMEOUT_MS = 2000;

const MASONRY_CLASS = 'lb-post-list--masonry';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- helpers ---------------------------------------------------------------
function firstFontFamily(family) {
  const first = family.split(',')[0].trim();
  return first.startsWith('"') ? first : `"${first}"`;
}

// Build a canvas font spec from the element's real computed style so the
// measurement matches what the browser actually renders (design rule:
// font + letterSpacing must be synced with CSS).
function cssFont(el, weightOverride) {
  const cs = getComputedStyle(el);
  const weight = weightOverride ?? (cs.fontWeight === 'normal' ? 400 : parseInt(cs.fontWeight, 10) || 400);
  const size = parseFloat(cs.fontSize);
  const family = firstFontFamily(cs.fontFamily);
  const lineHeight = parseFloat(cs.lineHeight) || Math.round(size * 1.2);
  const letterSpacing = cs.letterSpacing === 'normal' ? 0 : (parseFloat(cs.letterSpacing) || 0);
  return { str: `${weight} ${size}px ${family}`, size, weight, family, lineHeight, letterSpacing };
}

async function waitFonts() {
  const f = document.fonts;
  await Promise.race([
    Promise.all([
      f.ready,
      f.load(`800 ${HERO_SIZE_MAX}px "${HERO_FONT}"`),
      f.load(`600 18px "${BODY_FONT}"`),
      f.load(`400 15px "${BODY_FONT}"`),
    ]),
    sleep(FONT_TIMEOUT_MS),
  ]);
}

function measureLines(text, font, widthPx) {
  const p = prepare(text, font.str, { letterSpacing: font.letterSpacing });
  return Math.max(1, layout(p, widthPx, font.lineHeight).lineCount); // clamp (empty summary gotcha)
}

function columnCountFor(width) {
  if (width >= 900) return 3;
  if (width >= 560) return 2;
  return 1;
}

// --- masonry -----------------------------------------------------------------
function layoutMasonry() {
  const list = document.querySelector('.lb-posts .lb-post-list');
  if (!list) return;
  const cards = [...list.querySelectorAll(':scope > .lb-post')];
  if (!cards.length) return;

  const wrap = list.closest('.lb-wrap');
  const wrapCs = getComputedStyle(wrap);
  const containerWidth = wrap.clientWidth - parseFloat(wrapCs.paddingLeft) - parseFloat(wrapCs.paddingRight);

  const cols = columnCountFor(window.innerWidth);
  const colW = (containerWidth - CARD_GAP * (cols - 1)) / cols;
  if (colW < 220) return; // card too narrow -> keep CSS flow layout

  const colH = new Array(cols).fill(0);
  for (const card of cards) {
    const num = card.querySelector('.lb-post-num');
    const title = card.querySelector('.lb-post-body h3');
    const summary = card.querySelector('.lb-post-body p');
    const date = card.querySelector('.lb-date');
    const tags = card.querySelector('.lb-post-tags');
    const ccs = getComputedStyle(card);

    const numF = num ? cssFont(num) : null;
    const titleF = cssFont(title);
    const summaryF = cssFont(summary);
    const dateF = date ? cssFont(date) : null;
    const tagF = tags && tags.querySelector('.lb-tag') ? cssFont(tags.querySelector('.lb-tag')) : null;

    const innerW = colW - parseFloat(ccs.paddingLeft) - parseFloat(ccs.paddingRight);
    const titleH = measureLines(title.textContent, titleF, innerW) * titleF.lineHeight;
    const summaryH = measureLines(summary.textContent, summaryF, innerW) * summaryF.lineHeight;
    const dateH = dateF ? dateF.lineHeight : 0;
    let tagsH = 0;
    if (tagF && tags) {
      const label = [...tags.querySelectorAll('.lb-tag')].map((t) => '#' + t.textContent).join(' ');
      const rows = measureLines(label, tagF, innerW);
      const tagCS = getComputedStyle(tags.querySelector('.lb-tag'));
      const chipH = tagF.lineHeight
        + parseFloat(tagCS.paddingTop) + parseFloat(tagCS.paddingBottom)
        + parseFloat(tagCS.borderTopWidth) * 2;
      const gap = parseFloat(getComputedStyle(tags).gap) || INNER_GAP;
      tagsH = rows * chipH + Math.max(0, rows - 1) * gap;
    }
    const numH = numF ? numF.lineHeight : 0;
    const padH = parseFloat(ccs.paddingTop) + parseFloat(ccs.paddingBottom);
    const blocks = [numH, titleH, summaryH, dateH, tagsH].filter((h) => h > 0).length;
    const cardH = padH + numH + titleH + summaryH + dateH + tagsH + Math.max(0, blocks - 1) * INNER_GAP;

    const col = colH.indexOf(Math.min(...colH)); // greedy shortest-column
    card.style.position = 'absolute';
    card.style.left = `${col * (colW + CARD_GAP)}px`;
    card.style.top = `${colH[col]}px`;
    card.style.width = `${colW}px`;
    colH[col] += cardH + CARD_GAP;
  }

  list.style.minHeight = `${Math.max(...colH) - CARD_GAP}px`;
}

// htmx "Xem thêm" swaps new cards + a fresh #load-more into .lb-wrap as
// siblings of .lb-post-list; move them into the grid, then re-layout.
function adoptSwappedCards() {
  const wrap = document.querySelector('.lb-posts .lb-wrap');
  const list = document.querySelector('.lb-posts .lb-post-list');
  if (!wrap || !list) return;
  wrap.querySelectorAll(':scope > .lb-post').forEach((c) => list.appendChild(c));
}

function onAfterSwap(e) {
  const elt = e.detail && e.detail.elt ? e.detail.elt : e.target;
  if (elt && !elt.closest('.lb-posts')) return;
  adoptSwappedCards();
  layoutMasonry();
}

// --- init ---------------------------------------------------------------------
async function init() {
  if (!('Intl' in window) || !window.Intl.Segmenter) return; // pretext needs it
  const list = document.querySelector('.lb-posts .lb-post-list');
  if (!list) return; // not the home page

  await waitFonts();
  if (!document.fonts.check(`800 ${HERO_SIZE_MAX}px "${HERO_FONT}"`)) return; // font fail -> fallback

  list.classList.add(MASONRY_CLASS);

  const run = () => { layoutMasonry(); /* hero autofit added in Task 3 */ };
  run();

  document.addEventListener('htmx:afterSwap', onAfterSwap);
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(run, 150); });
}

init();
```

- [ ] **Step 4: Wire the module into `Home.razor`**

Change `Components/Pages/Home.razor:7-9` from:

```razor
<HeadContent>
    <script type="application/ld+json">@((MarkupString)WebsiteJsonLd)</script>
</HeadContent>
```

to:

```razor
<HeadContent>
    <script type="application/ld+json">@((MarkupString)WebsiteJsonLd)</script>
    <script type="module" src="/js/home-layout.js?v=20260820a"></script>
</HeadContent>
```

- [ ] **Step 5: Add masonry styles to `wwwroot/css/site.css`**

Append after the `.lb-load-more` rule (line 183), before the tag-cloud section:

```css
/* ---------- post list: masonry (home, pretext-driven; progressive enhancement) ---------- */
.lb-post-list--masonry { position: relative; border-top: none; }
.lb-post-list--masonry .lb-post {
  position: absolute; top: 0; left: 0; width: 100%;
  box-sizing: border-box;
  display: flex; flex-direction: column; gap: 8px;
  margin: 0; padding: 16px 18px;
  border: 1px solid var(--line); border-bottom: 1px solid var(--line);
  border-radius: 10px; background: var(--surface);
  transition: background .16s;
}
.lb-post-list--masonry .lb-post:hover { background: color-mix(in srgb, var(--neon) 5%, transparent); }
.lb-post-list--masonry .lb-post-num { font-size: .78rem; line-height: 1.2; color: var(--ink-soft); -webkit-text-stroke: 0; }
.lb-post-list--masonry .lb-post-body h3 { margin: 0; }
.lb-post-list--masonry .lb-post-body p { max-width: none; }
.lb-post-list--masonry .lb-post-meta { text-align: left; }
.lb-post-list--masonry .lb-post-meta .lb-post-tags { justify-content: flex-start; }
```

Note: `.lb-post-list--masonry .lb-post` (specificity 0,3,0) outranks the base `.lb-post` (0,1,0) and the `@media (max-width: 720px)` overrides (0,1,0), so it applies at every breakpoint. The `gap: 8px` matches `INNER_GAP` in the JS.

- [ ] **Step 6: Bump the CSS cache-buster in `App.razor`**

Change `Components/App.razor:17`:

```razor
<link rel="stylesheet" href="/css/site.css?v=20260819d" />
```

to:

```razor
<link rel="stylesheet" href="/css/site.css?v=20260820a" />
```

- [ ] **Step 7: Rebuild and run the tests — verify they PASS**

```powershell
dotnet build
$env:BASE_URL="http://127.0.0.1:5080"; npx playwright test tests/home.spec.js --grep "masonry"
```

Run from repo root for `dotnet build`; run `npx playwright test` from `tests/e2e`. Expected: all three masonry tests PASS (first two now green, JS-off fallback still green).

- [ ] **Step 8: Commit**

```powershell
$env:GIT_MASTER='1'; git add wwwroot/js/home-layout.js Components/Pages/Home.razor wwwroot/css/site.css Components/App.razor tests/e2e/tests/home.spec.js
$env:GIT_MASTER='1'; git status
```

Expected: staged = exactly those five files. Commit:

```powershell
$env:GIT_MASTER='1'; git commit -m "feat: pretext-powered masonry post grid on home page

Home post list becomes a masonry grid measured arithmetically with
@chenglou/pretext (no DOM text reads). New cards from the htmx
load-more swap are adopted and re-laid out on htmx:afterSwap;
resize re-lays out debounced at 150ms. Falls back to the original
flow layout when JS or fonts are unavailable.

Ultraworked with [Sisyphus](https://github.com/code-yeongyu/oh-my-openagent)

Co-authored-by: Sisyphus <clio-agent@sisyphuslabs.ai>"
```

Expected: commit succeeds; `git status` clean except user's unrelated changes.

---

### Task 3: Hero title auto-fit (tests-first)

**Files:**
- Modify: `tests/e2e/tests/home.spec.js` — add hero autofit test (written first)
- Modify: `wwwroot/js/home-layout.js` — add `autofitHero()` and call it from `run()`
- Test: `tests/e2e/tests/home.spec.js` (new hero test)

**Interfaces:**
- Consumes: Task 2's `init()`, `waitFonts()`, `measureLines()`, `firstFontFamily()`, constants (`HERO_SIZE_MIN/MAX`, `HERO_LINE_HEIGHT`, `HERO_LETTER_SPACING`, `HERO_FONT`).
- Produces: inline `style.fontSize` (px) on `.lb-hero h1` such that the Newton quote lays out in exactly 2 lines at the current viewport width.

- [ ] **Step 1: Write the failing Playwright test**

Append to `tests/e2e/tests/home.spec.js`:

```js
test('home hero: tự co cỡ chữ để quote vừa đúng 2 dòng', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(
    () => document.querySelector('.lb-hero h1').style.fontSize !== ''
  );
  const h1 = page.locator('.lb-hero h1');
  const style = await h1.getAttribute('style');
  expect(style).toMatch(/font-size:\s*\d+(\.\d+)?px/);
  const fs = parseFloat(style.match(/font-size:\s*([\d.]+)px/)[1]);
  const h = (await h1.boundingBox()).height;
  expect(fs).toBeGreaterThanOrEqual(2.4 * 16); // >= clamp min
  expect(fs).toBeLessThanOrEqual(4.2 * 16);    // <= clamp max
  expect(h).toBeGreaterThan(fs * 1.5);         // more than one line
  expect(h).toBeLessThan(fs * 3);              // no more than ~3 lines
});
```

- [ ] **Step 2: Run the new test — verify it FAILS**

```powershell
$env:BASE_URL="http://127.0.0.1:5080"; npx playwright test tests/home.spec.js --grep "hero"
```

Run from `tests/e2e`. Expected: FAIL on `page.waitForFunction` (timeout) — no inline `font-size` is set yet.

- [ ] **Step 3: Add `autofitHero()` to `wwwroot/js/home-layout.js`**

Add this function after `onAfterSwap`:

```js
// --- hero auto-fit -------------------------------------------------------------
function autofitHero() {
  const h1 = document.querySelector('.lb-hero h1');
  if (!h1) return;
  const wrap = h1.closest('.lb-wrap');
  const cs = getComputedStyle(wrap);
  const width = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const text = h1.textContent.trim();
  const family = firstFontFamily(getComputedStyle(h1).fontFamily);

  const lineCountAt = (size) => {
    const font = {
      str: `800 ${size}px ${family}`,
      letterSpacing: HERO_LETTER_SPACING * size, // em -> px at this size
      lineHeight: HERO_LINE_HEIGHT * size,
    };
    const p = prepare(text, font.str, { letterSpacing: font.letterSpacing });
    return layout(p, width, font.lineHeight).lineCount;
  };

  if (lineCountAt(HERO_SIZE_MIN) > 2) return; // too long even at min -> keep clamp
  let lo = HERO_SIZE_MIN, hi = HERO_SIZE_MAX;
  while (hi - lo > 0.5) {
    const mid = (lo + hi) / 2;
    if (lineCountAt(mid) <= 2) lo = mid; else hi = mid;
  }
  h1.style.fontSize = `${lo.toFixed(1)}px`;
}
```

Then change the `run()` call inside `init()` from:

```js
  const run = () => { layoutMasonry(); /* hero autofit added in Task 3 */ };
```

to:

```js
  const run = () => { layoutMasonry(); autofitHero(); };
```

- [ ] **Step 4: Rebuild and run the tests — verify they PASS**

```powershell
dotnet build
$env:BASE_URL="http://127.0.0.1:5080"; npx playwright test tests/home.spec.js --grep "hero"
```

Run `dotnet build` from repo root (server-rendered HTML is unchanged, so a rebuild isn't strictly required, but keeps the running app honest). Expected: hero test PASSES.

- [ ] **Step 5: Commit**

```powershell
$env:GIT_MASTER='1'; git add wwwroot/js/home-layout.js tests/e2e/tests/home.spec.js
$env:GIT_MASTER='1'; git status
```

Expected: staged = exactly those two files. Commit:

```powershell
$env:GIT_MASTER='1'; git commit -m "feat: pretext hero title auto-fit to exactly two lines

Binary-searches the Newton quote font-size within the existing
clamp(2.4rem, 6.4vw, 4.2rem) range so it always lays out on two
lines, measured arithmetically by pretext. Without JS the clamp
stays untouched.

Ultraworked with [Sisyphus](https://github.com/code-yeongyu/oh-my-openagent)

Co-authored-by: Sisyphus <clio-agent@sisyphuslabs.ai>"
```

Expected: commit succeeds.

---

### Task 4: Full verification

**Files:**
- None (verification only; fix commits if needed)

- [ ] **Step 1: Run the entire e2e suite**

App running at `http://127.0.0.1:5080`. Run:

```powershell
$env:BASE_URL="http://127.0.0.1:5080"; npx playwright test
```

Run from `tests/e2e`. Expected: ALL specs pass — the 6 pre-existing `home.spec.js` tests (hero visible, featured card, dark-mode toggle, language switch, back-to-top, search popup), the 4 new home tests, plus `post`, `search`, `annotations`, `auth-ui`, `endpoints`, `write`, `profile`, `notifications` suites (skip `real-auth.spec.js` — requires a test user; it's excluded by default project config anyway).

- [ ] **Step 2: Manual visual check at the DESIGN.md widths (390 / 720 / 1440 px)**

Via Playwright's built-in browser or a real browser devtools:
1. `page.goto('/')` with viewport 390×844 → 1 column, no horizontal scroll (`scrollWidth <= clientWidth`), hero quote 2 lines.
2. 720×900 → 2 columns, hero 2 lines.
3. 1440×900 → 3 columns, hero 2 lines.
4. Resize slowly between breakpoints → masonry re-lays out within ~200ms, no overlapping cards.
5. Disable JS (devtools → settings → disable JavaScript, reload) → original flow list with bottom borders, hero at clamp size, page fully readable.
6. Network → offline (or block fonts) → fallback layout (no masonry class), page readable.

Expected: all checks pass.

- [ ] **Step 3: Confirm the repo is clean except the user's unrelated changes**

```powershell
$env:GIT_MASTER='1'; git status
```

Expected: tracked changes = only `posts/aether-history.tex` (user's, untouched); untracked = `.omo/`, `CLAUDE.md`, `posts/aether-history.audit/` (user's, untouched). Our 3 commits are on top of `41aa0c6`. `git log --oneline -4` shows: `feat: pretext hero…`, `feat: pretext-powered masonry…`, `chore: vendor @chenglou/pretext…`, `docs: add pretext home-page redesign design doc`.

- [ ] **Step 4 (only if fixes needed): commit fixes**

If any verification step exposed a bug, fix it, then commit with:

```powershell
$env:GIT_MASTER='1'; git add <fixed files>
$env:GIT_MASTER='1'; git commit -m "fix: <what was wrong>"
```

Follow the same footer convention. Re-run Step 1 and Step 2 until green.

---

## Self-Review

**Spec coverage (design doc → task):**
- Masonry greedy shortest-column → Task 2 (`colH.indexOf(Math.min(...colH))`).
- Breakpoints <560/560-900/>900 = 1/2/3 → Task 2 `columnCountFor` + Global Constraints.
- pretext `prepare`+`layout` per block, heights summed + padding + meta → Task 2 `layoutMasonry`.
- No DOM text reads (computed style cached per layout pass only) → `cssFont` reads computed styles for font specs (design doc explicitly allows reading padding/border from computed style); text widths come only from pretext.
- Hero binary search for `lineCount == 2` within clamp range → Task 3 `autofitHero`.
- Wait `document.fonts.ready` + `load()` for Bricolage 800 & Space Grotesk 400 before measuring → Task 2 `waitFonts`.
- No `system-ui` → `cssFont` uses the element's first real font family; hero uses explicit named family.
- Empty-summary clamp `Math.max(1, lineCount)` → Task 2 `measureLines`.
- htmx "Xem thêm" re-layout → Task 2 `onAfterSwap` + `adoptSwappedCards`.
- Resize debounce 150ms → Task 2 `window.addEventListener('resize', …)`.
- Fallback no-JS / font fail → Task 2: class added only after `waitFonts` + `fonts.check`; no-JS never adds it.
- Vendor pretext, no bundler, offline-friendly → Task 1.
- Verification 390/720/1440 + Xem thêm + 2-line hero + no-JS → Task 4.

**Placeholder scan:** no TBD/TODO/"implement later"; every step has exact code/commands/expected output.

**Type/name consistency:** `prepare`, `layout`, `measureLines`, `waitFonts`, `firstFontFamily`, `cssFont`, `layoutMasonry`, `autofitHero`, `adoptSwappedCards`, `onAfterSwap`, `init`, `MASONRY_CLASS`, `HERO_*`, `CARD_GAP`, `INNER_GAP` are defined once and used consistently across Tasks 2-3. File paths and cache-buster strings (`v=20260820a`, `lb-v12`) are identical across Tasks 1-2.