# Hero Orbits Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put a real-time three.js Kepler-orbit figure behind the home-page hero as a quiet background layer, so the neon headline and the daily-formula card stay the loudest things on the page.

**Architecture:** An `up.compiler` in the always-loaded `site.js` lazily `import()`s a scene module the first time a `canvas[data-lb-orbits]` appears, and the scene module in turn imports a vendored three.js. Nothing about the hero costs a post page anything, and the canvas survives Unpoly navigation because the compiler — not the markup — owns the lifecycle. If any of it fails, the existing `.lb-hero::before` gradient is what remains.

**Tech Stack:** three.js r186 (vendored ES module), vanilla ES modules, Unpoly 3 compilers, Blazor Static SSR, Playwright e2e.

**Spec:** `docs/superpowers/specs/2026-09-26-hero-orbits-design.md`

## Global Constraints

- three.js is pinned to **exactly `0.170.0`**, from `build/three.module.min.js`, expected size **691648 bytes**. That release predates the build split, so the file is self-contained and imports nothing.
- Scene tokens are read at mount time from `getComputedStyle(document.documentElement)` — `--bg`, `--neon`, `--neon-2`, `--neon-3`. **No hex literal for a palette colour in JavaScript.**
- Line opacity stays within **0.22 - 0.46**. Nothing in the scene is a filled shape except the node sprite at **0.85**.
- The scene loads on the home page only. No post, chapter or book page may reference it.
- `prefers-reduced-motion: reduce` renders **exactly one frame** and starts no animation loop.
- The canvas is `pointer-events: none` and `aria-hidden="true"`.
- The existing `.lb-hero::before` gradient is **not modified or removed**.
- Cache version in `wwwroot/sw.js` is bumped `lb-v18` → `lb-v19` as part of this work.
- Test names are written in Vietnamese, matching `tests/e2e/tests/home.spec.js`.
- E2E tests need the app running: `dotnet run --urls http://127.0.0.1:5080`. The Playwright `baseURL` is `127.0.0.1`, **not** `localhost`.

## File Structure

| File | Responsibility |
| --- | --- |
| `wwwroot/js/vendor/three.module.min.js` | Vendored three.js r186. Committed, like the 7 existing tracked files in that directory. |
| `wwwroot/js/hero-orbits.js` | The scene. Exports `mount(canvas) -> dispose`. No work at module scope. |
| `wwwroot/js/site.js` | One `up.compiler("[data-lb-orbits]")` that does the lazy `import()` and owns teardown. |
| `Components/Pages/Home.razor` | The `<canvas>` element inside `.lb-hero`. |
| `wwwroot/css/site.css` | Canvas positioning, `.lb-wrap` z-index, mobile opacity. |
| `wwwroot/sw.js` | Offline registration of the two new paths + cache bump. |
| `tests/e2e/tests/home.spec.js` | Five new cases. |

`hero-orbits.js` stays a separate file from `site.js` on purpose: `site.js` is a classic script loaded on every page and must stay free of any three.js reference, or the 676 KB stops being conditional.

---

## Task 1: The hero canvas shell

The canvas element and the CSS that positions it, with no JavaScript behind it yet. The hero must be unchanged for a reader; this task only adds a correctly-placed, correctly-sized element.

**Files:**
- Modify: `Components/Pages/Home.razor:11-16` (add the canvas as the first child of `.lb-hero`)
- Modify: `wwwroot/css/site.css:98` (raise `.lb-hero .lb-wrap` to `z-index: 1`) and append a new block after line 1090
- Test: `tests/e2e/tests/home.spec.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `canvas[data-lb-orbits].lb-orbits` inside `.lb-hero`, occupying the hero's full box, `pointer-events: none`, `aria-hidden="true"`. Tasks 2–4 bind to it by the `data-lb-orbits` attribute.

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/tests/home.spec.js`:

```js
test('hero có canvas 3D đúng kích thước và không gây tràn ngang', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('canvas[data-lb-orbits]');
  await expect(canvas).toHaveCount(1);
  await expect(canvas).toHaveAttribute('aria-hidden', 'true');
  const box = await canvas.boundingBox();
  expect(box.width).toBeGreaterThan(300);
  expect(box.height).toBeGreaterThan(150);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('canvas không chặn bôi đen chữ trên hero', async ({ page }) => {
  await page.goto('/');
  const pe = await page.locator('canvas[data-lb-orbits]')
    .evaluate((c) => getComputedStyle(c).pointerEvents);
  expect(pe).toBe('none');
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "hero có canvas 3D|không chặn bôi đen"
```

Expected: FAIL — `canvas[data-lb-orbits]` resolves to 0 elements.

If the app is not already up: `dotnet run --urls http://127.0.0.1:5080` in a second terminal.

- [ ] **Step 3: Add the canvas to the hero**

In `Components/Pages/Home.razor`, replace lines 11-16 with:

```razor
<section class="lb-hero">
    <canvas class="lb-orbits" data-lb-orbits aria-hidden="true"></canvas>
    <div class="lb-wrap">
        <h1>"Nếu tôi nhìn được <span class="lb-neon">xa hơn</span>, đó là vì đứng trên vai những người <span class="lb-violet">khổng lồ</span>." <cite>— Isaac Newton</cite></h1>
        <p class="lb-hero-lead">Nhìn thế giới qua một lăng kính khác.</p>
    </div>
</section>
```

- [ ] **Step 4: Add the CSS**

In `wwwroot/css/site.css`, change line 98 from

```css
.lb-hero .lb-wrap { position: relative; max-width: 1140px; }
```

to

```css
.lb-hero .lb-wrap { position: relative; z-index: 1; max-width: 1140px; }
```

and append at the end of the file:

```css
/* ---------- hero orbits (home) ---------- */
/* A 3D figure, not a feature. The canvas layers over the .lb-hero::before wash and gives
   way to it entirely if the module never arrives, so the gradient is the fallback rather
   than a decoration hiding behind another decoration. */
.lb-orbits {
  position: absolute; inset: 0; z-index: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  opacity: .75;
}
@media (max-width: 720px) { .lb-orbits { opacity: .38; } }
```

`z-index: 0` on the canvas and `z-index: 1` on the wrap are what keep the figure behind the headline. `.lb-hero` already has `position: relative` and `overflow: hidden`, so the canvas is positioned against the hero and clipped by it.

- [ ] **Step 5: Run the tests to verify they pass**

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "hero có canvas 3D|không chặn bôi đen"
```

Expected: PASS, 2 passed.

- [ ] **Step 6: Confirm the build is still clean**

```powershell
dotnet build
```

Expected: 0 errors. The two `NU1902` warnings about `Microsoft.Build.Tasks.Git` are pre-existing and unrelated.

- [ ] **Step 7: Commit**

```bash
git add Components/Pages/Home.razor wwwroot/css/site.css tests/e2e/tests/home.spec.js
git commit -m "feat(blog): add hero orbits canvas"
```

---

## Task 2: The scene, loaded on demand

The three.js figure and the lazy loader that reaches it. This is the task that makes the hero draw something.

**Files:**
- Create: `wwwroot/js/vendor/three.module.min.js`
- Create: `wwwroot/js/hero-orbits.js`
- Modify: `wwwroot/js/site.js` (append the compiler)
- Test: `tests/e2e/tests/home.spec.js`

**Interfaces:**
- Consumes: `canvas[data-lb-orbits]` from Task 1.
- Produces:
  - `hero-orbits.js` exports `mount(canvas: HTMLCanvasElement) -> () => void`. The returned function releases every GPU resource. If WebGL cannot be created, `mount` removes the canvas and returns a no-op.
  - The mounted scene sets `canvas.dataset.lbFrames` to a string integer, incremented once per rendered frame. Task 3 asserts on it.
  - `site.js` registers `up.compiler("[data-lb-orbits]", …)`.

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/tests/home.spec.js`:

```js
test('scene orbits dựng và chạy: frame counter tăng, canvas có kích thước thật', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('canvas[data-lb-orbits]');
  await expect
    .poll(async () => Number((await canvas.getAttribute('data-lb-frames')) || 0), { timeout: 15000 })
    .toBeGreaterThan(3);
  const size = await canvas.evaluate((c) => [c.width, c.height]);
  expect(size[0]).toBeGreaterThan(0);
  expect(size[1]).toBeGreaterThan(0);
});
```

A non-zero frame count is proof the whole chain resolved: the compiler found the canvas, `hero-orbits.js` evaluated, three.js loaded, and the render loop ran.

- [ ] **Step 2: Run the test to verify it fails**

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "scene orbits dựng và chạy"
```

Expected: FAIL — the poll times out at 15 s with a frame count of 0, because nothing populates `data-lb-frames` yet.

- [ ] **Step 3: Vendor three.js**

```powershell
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js" `
  -OutFile "wwwroot/js/vendor/three.module.min.js"
(Get-Item wwwroot/js/vendor/three.module.min.js).Length
```

Expected: `691648`. Any other size means the wrong artifact was fetched — delete it and stop rather than committing a mystery file. Then confirm it imports nothing, which is the whole reason this release was chosen over a newer one:

```powershell
$t = [System.IO.File]::ReadAllText("wwwroot\js\vendor\three.module.min.js")
([regex]::Matches($t, 'from\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }) -join ', '
```

Expected output: empty. From r180 onward the entry does `import … from './three.core.js'`, and vendoring that means either 1.78 MB of text or a hand-patched import specifier that a re-download from the CDN silently reverts — with no build step to catch it. 0.170.0 predates the split. The file **is committed**, matching the 7 vendor files already tracked in git.

- [ ] **Step 4: Write the scene module**

Create `wwwroot/js/hero-orbits.js`:

```js
// wwwroot/js/hero-orbits.js
// The hero's Kepler figure: nested ellipses sharing one focus, the way Newton drew them.
// Reached only through the up.compiler in site.js, which is the one thing that knows a
// canvas appeared — three.js is 676 KB and must not cost a post page anything.
//
// Every colour is read from the site's own CSS tokens rather than hardcoded, because
// site.css redefines :root in several appended theme blocks and a hex literal here would
// drift the first time a palette is retuned.

import * as THREE from '/js/vendor/three.module.min.js';

const ORBITS = 7;
const SEGMENTS = 512;
const A_MIN = 2.6, A_MAX = 9.4;
const E_TIGHT = 0.86, E_WIDE = 0.28;
const OPACITY_IN = 0.46, OPACITY_OUT = 0.22;
const TILT_DEG = 2, TILT_STEP_DEG = 3;
const GROUP_TILT_DEG = -14;
const PRECESS_PERIOD_S = 90;
const NODE_PERIOD_S = 24;
const NODE_OPACITY = 0.85;
const NODE_SCALE = 0.62;
const FOG_DENSITY = 0.038;
const CAMERA_Y = 3.2, CAMERA_Z = 12;
const FALLBACK = { bg: '#f4f6fb', neon: '#5367e8', neon2: '#159b9b', neon3: '#2d78c5' };

function token(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
}

function lerp(a, b, t) { return a + (b - a) * t; }

// x = a(cosE - e) puts the focus at the origin, which is what lets every orbit in the
// family share a single focus instead of a common centre.
function orbitPoint(a, e, E, out) {
    var b = a * Math.sqrt(1 - e * e);
    return out.set(a * (Math.cos(E) - e), 0, b * Math.sin(E));
}

export function mount(canvas) {
    var renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (err) {
        // No WebGL: the CSS gradient underneath is the whole design, so leave it alone.
        canvas.remove();
        return function () {};
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color(token('--bg', FALLBACK.bg)), FOG_DENSITY);

    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, CAMERA_Y, CAMERA_Z);
    camera.lookAt(0, 0, 0);

    var group = new THREE.Group();
    group.rotation.x = GROUP_TILT_DEG * Math.PI / 180;
    scene.add(group);

    var palette = [
        token('--neon', FALLBACK.neon),
        token('--neon-2', FALLBACK.neon2),
        token('--neon-3', FALLBACK.neon3),
    ];
    var owned = [];
    var p = new THREE.Vector3();

    for (var i = 0; i < ORBITS; i++) {
        var t = ORBITS === 1 ? 0 : i / (ORBITS - 1);
        var a = lerp(A_MIN, A_MAX, t);
        var e = lerp(E_TIGHT, E_WIDE, t);
        var pts = new Float32Array(SEGMENTS * 3);
        for (var s = 0; s < SEGMENTS; s++) {
            orbitPoint(a, e, (s / SEGMENTS) * Math.PI * 2, p);
            pts[s * 3] = p.x;
            pts[s * 3 + 1] = p.y;
            pts[s * 3 + 2] = p.z;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        var mat = new THREE.LineBasicMaterial({
            color: new THREE.Color(palette[i % palette.length]),
            transparent: true,
            opacity: lerp(OPACITY_IN, OPACITY_OUT, t),
        });
        var loop = new THREE.LineLoop(geo, mat);
        loop.rotation.x = (TILT_DEG + TILT_STEP_DEG * i) * Math.PI / 180;
        group.add(loop);
        owned.push(geo, mat);
    }

    // One travelling node on the tightest orbit. A sprite, not a mesh: it needs no light
    // and cannot fall outside the palette.
    var nodeMat = new THREE.SpriteMaterial({
        color: new THREE.Color(palette[0]),
        transparent: true,
        opacity: NODE_OPACITY,
    });
    var node = new THREE.Sprite(nodeMat);
    node.scale.setScalar(NODE_SCALE);
    group.add(node);
    owned.push(nodeMat);

    function resize() {
        var w = canvas.clientWidth, h = canvas.clientHeight;
        if (!w || !h) return;                 // ResizeObserver fires again once it has a size
        renderer.setSize(w, h, false);       // false: CSS owns the display size
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    resize();

    var frames = 0;
    function draw(elapsed) {
        orbitPoint(A_MIN, E_TIGHT, (elapsed / NODE_PERIOD_S) * Math.PI * 2, p);
        node.position.set(p.x, p.y, p.z);
        group.rotation.y = (elapsed / PRECESS_PERIOD_S) * Math.PI * 2;
        renderer.render(scene, camera);
        canvas.dataset.lbFrames = String(++frames);
    }

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var raf = 0, startedAt = 0;
    function tick(now) {
        if (!startedAt) startedAt = now;
        draw((now - startedAt) / 1000);
        if (!reduced) raf = requestAnimationFrame(tick);
    }

    if (reduced) draw(0);
    else raf = requestAnimationFrame(tick);

    // A background tab should not hold a GPU.
    function onVisibility() {
        if (document.hidden) {
            if (raf) cancelAnimationFrame(raf);
            raf = 0;
        } else if (!reduced && !raf) {
            startedAt = 0;
            raf = requestAnimationFrame(tick);
        }
    }
    document.addEventListener('visibilitychange', onVisibility);

    var ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return function dispose() {
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        for (var k = 0; k < owned.length; k++) owned[k].dispose();
        renderer.dispose();
    };
}
```

- [ ] **Step 5: Write the lazy loader in `site.js`**

Append to `wwwroot/js/site.js`:

```js
// ---- hero orbits (home page) ----
// Registered from a script every page loads, but the scene and three.js are pulled in on
// demand. Two reasons, both learned the hard way: 676 KB should not be fetched by a post
// page, and a <script type="module"> inside Home.razor would never run when Unpoly swaps
// the fragment in, because HTML5 does not execute scripts inserted by DOM manipulation —
// a reader arriving on a post and clicking "Trang chủ" would get an empty canvas.
up.compiler("[data-lb-orbits]", function (canvas) {
    var cancelled = false;
    var dispose = function () {};
    import('/js/hero-orbits.js?v=20260926a')
        .then(function (m) {
            // The fragment can be swapped away while the import is in flight. Mounting into
            // a detached node would create a WebGL context nothing ever releases.
            if (cancelled) return;
            dispose = m.mount(canvas) || function () {};
        })
        .catch(function () { canvas.remove(); });
    return function () {
        cancelled = true;
        dispose();
    };
});
```

- [ ] **Step 6: Run the test to verify it passes**

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "scene orbits dựng và chạy"
```

Expected: PASS.

- [ ] **Step 7: Run the whole home suite for regressions**

```powershell
cd tests/e2e
npx playwright test home.spec.js
```

Expected: all pass. If `home hero: tự co cỡ chữ` fails, check whether it failed before this change — `wwwroot/js/home-layout.js` is referenced by no page, so that test may be pre-existing broken. Record it; do not fix it here.

- [ ] **Step 8: Commit**

```bash
git add wwwroot/js/vendor/three.module.min.js wwwroot/js/hero-orbits.js wwwroot/js/site.js tests/e2e/tests/home.spec.js
git commit -m "feat(blog): draw a Kepler orbit figure in the hero"
```

---

## Task 3: Degradation

The paths where the figure must not appear: reduced motion, no WebGL, no JavaScript. Each must leave the gradient and a readable headline.

**Files:**
- Test: `tests/e2e/tests/home.spec.js`
- Modify: `wwwroot/js/hero-orbits.js` only if a test exposes a gap.

**Interfaces:**
- Consumes: `mount(canvas) -> dispose` from Task 2.
- Produces: no new interface. This task proves existing behaviour.

- [ ] **Step 1: Write the failing tests**

Append to `tests/e2e/tests/home.spec.js`:

```js
test('prefers-reduced-motion: scene dựng đúng 1 frame rồi đứng yên', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  const canvas = page.locator('canvas[data-lb-orbits]');
  await expect.poll(async () => canvas.getAttribute('data-lb-frames'), { timeout: 15000 }).toBe('1');
  await page.waitForTimeout(1200);
  expect(await canvas.getAttribute('data-lb-frames')).toBe('1');
  await expect(page.locator('.lb-hero h1')).toBeVisible();
  await ctx.close();
});

test('không có WebGL thì bỏ canvas, hero vẫn đọc được', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = function () { return null; };
  });
  await page.goto('/');
  await expect(page.locator('canvas[data-lb-orbits]')).toHaveCount(0);
  await expect(page.locator('.lb-hero h1')).toBeVisible();
});

test('tắt JS thì hero vẫn hiện, không cần canvas để đọc', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('.lb-hero h1')).toBeVisible();
  await expect(page.locator('.lb-hero-lead')).toBeVisible();
  await ctx.close();
});
```

- [ ] **Step 2: Run them to see which fail**

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "reduced-motion|không có WebGL|tắt JS thì hero"
```

Expected: the reduced-motion and WebGL cases PASS on the current implementation — they were written to match the code in Task 2, and their value is locking that behaviour down. The `tắt JS` case PASSES as well. A failure here means Task 2's implementation and this spec disagree; fix `hero-orbits.js` rather than weakening the assertion.

- [ ] **Step 3: Verify the WebGL failure path really is the code path, not a coincidence**

Temporarily comment out the `try`/`catch` around `new THREE.WebGLRenderer` in `hero-orbits.js`, re-run the `không có WebGL` case, and confirm it FAILS. Restore the `catch` immediately after. This proves the test exercises the guard rather than passing because of something else.

- [ ] **Step 4: Run the full e2e suite**

```powershell
cd tests/e2e
npx playwright test --project=chromium
```

Expected: all pass, with any pre-existing failures recorded rather than fixed.

- [ ] **Step 5: Commit**

```bash
git add tests/e2e/tests/home.spec.js
git commit -m "test(blog): cover hero orbits degradation paths"
```

---

## Task 4: The Unpoly round trip

The lifecycle. Unpoly destroys `.lb-main` on navigation, so the scene must be released and remounted, exactly once each time.

**Files:**
- Test: `tests/e2e/tests/home.spec.js`
- Modify: `wwwroot/js/site.js` or `wwwroot/js/hero-orbits.js` if a test exposes a leak.

**Interfaces:**
- Consumes: the compiler from Task 2, whose destructor is the whole point of this task.
- Produces: no new interface.

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/tests/home.spec.js`:

```js
// Nav links are Unpoly-intercepted, so clicking them is what exercises the destructor.
// page.goto() would be a full load and would prove nothing about teardown.
const goHome = async (page) => {
  await page.locator('.lb-nav-links a', { hasText: 'Trang chủ' }).first().click();
  await expect(page.locator('.lb-hero h1')).toBeVisible();
};
const frames = (page) =>
  page.locator('canvas[data-lb-orbits]').getAttribute('data-lb-frames').then(Number).catch(() => 0);

test('Unpoly điều hướng rồi quay lại: đúng một canvas, scene sống lại', async ({ page }) => {
  // Start away from home, so three.js is not yet loaded and the lazy import has to run
  // against a canvas that arrived through a fragment swap — the path a <script> tag inside
  // Home.razor would have missed entirely.
  await page.goto('/books');
  await goHome(page);

  await expect(page.locator('canvas[data-lb-orbits]')).toHaveCount(1);
  await expect.poll(() => frames(page), { timeout: 15000 }).toBeGreaterThan(2);

  // Two more Unpoly round trips. A leaked WebGL context or a double-mounted scene would
  // show up as more than one canvas, or as a frame counter frozen on the first mount.
  for (let i = 0; i < 2; i++) {
    await page.locator('.lb-nav-links a', { hasText: 'Thẻ' }).first().click();
    await expect(page.locator('.lb-main')).toBeVisible();
    await goHome(page);
    await expect(page.locator('canvas[data-lb-orbits]')).toHaveCount(1);
    await expect.poll(() => frames(page), { timeout: 15000 }).toBeGreaterThan(2);
  }
});
```

Starting at `/books` is the point of the test: it forces the lazy `import()` to run against a canvas that arrived through a fragment swap, which is the path that a `<script>` tag inside `Home.razor` would have missed entirely.

- [ ] **Step 2: Run it to verify it passes**

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "Unpoly điều hướng rồi quay lại"
```

Expected: PASS. The race guard and destructor from Task 2 already cover this; the test's value is preventing a regression.

- [ ] **Step 3: Prove the destructor is load-bearing**

Temporarily replace the compiler body in `site.js` with an empty destructor, leaving the mount in place:

```js
up.compiler("[data-lb-orbits]", function (canvas) {
    var cancelled = false;
    var dispose = function () {};
    import('/js/hero-orbits.js?v=20260926a')
        .then(function (m) { if (cancelled) return; dispose = m.mount(canvas) || function () {}; })
        .catch(function () { canvas.remove(); });
    return function () { cancelled = true; /* dispose() deliberately not called */ };
});
```

Reload the page so the new `site.js` is served. With the destructor gutted, the render loop of every abandoned canvas keeps running against a canvas no longer in the document, and the browser starts logging context-loss warnings once the WebGL context limit is hit. Drive three round trips in the browser and watch the console:

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "Unpoly điều hướng rồi quay lại"
```

The document-level canvas count will still read 1 — a detached canvas is simply gone from the DOM — so the leak shows up as console noise and climbing CPU, not as a failing assertion. That is the honest limit of what this test can prove, which is why the test exists to catch a regression rather than to detect the leak on its own.

**Restore `site.js` to the real destructor before committing**, then re-run the case and confirm PASS.

- [ ] **Step 4: Run the full home suite**

```powershell
cd tests/e2e
npx playwright test home.spec.js
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add tests/e2e/tests/home.spec.js
git commit -m "test(blog): cover the hero orbits Unpoly round trip"
```

---

## Task 5: Offline and the quiet register

The service worker cannot see cross-origin requests, so a CDN-hosted three.js would lose the hero offline. Vendoring already happened in Task 2; this task registers it. It also pins the register the design thesis depends on.

**Files:**
- Modify: `wwwroot/sw.js:2-12`
- Test: `tests/e2e/tests/home.spec.js`

**Interfaces:**
- Consumes: `wwwroot/js/hero-orbits.js` and `wwwroot/js/vendor/three.module.min.js` from Task 2.
- Produces: cache `lb-v19`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/e2e/tests/home.spec.js`:

```js
test('three.js được vendor cục bộ và service worker cache offline được', async ({ request }) => {
  const three = await request.get('/js/vendor/three.module.min.js');
  expect(three.status()).toBe(200);
  expect(three.headers()['content-type']).toContain('javascript');

  const sw = await request.get('/sw.js');
  const src = await sw.text();
  expect(src).toContain('/js/vendor/three.module.min.js');
  expect(src).toContain('/js/hero-orbits.js');
  expect(src).toContain('lb-v19');
});

test('nền 3D giữ mức tĩnh: opacity thấp, và thấp hơn nữa trên mobile', async ({ page }) => {
  await page.goto('/');
  const read = () =>
    page.locator('canvas[data-lb-orbits]').evaluate((c) => Number(getComputedStyle(c).opacity));
  expect(await read()).toBeLessThanOrEqual(0.6);
  await page.setViewportSize({ width: 375, height: 800 });
  expect(await read()).toBeLessThanOrEqual(0.3);
});
```

- [ ] **Step 2: Run the offline test to verify it fails**

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "vendor cục bộ"
```

Expected: FAIL on the `sw.js` assertions — `lb-v19` is not in the file yet. The `/js/vendor/three.module.min.js` fetch already passes, since Task 2 vendored the file.

- [ ] **Step 3: Register the assets and bump the cache**

In `wwwroot/sw.js`, change line 2 and extend the `STATIC` array:

```js
var CACHE = "lb-v19";
var STATIC = [
  "/css/app.css",
  "/css/site.css",
  "/js/site.js",
  "/js/comments.js",
  "/js/hero-orbits.js",
  "/js/vendor/three.module.min.js",
  "/js/layout-engine.js",
  "/js/page-layout.js?v=20260821a",
  "/js/vendor/pretext.esm.js",
  "/generated/pygments.css"
];
```

- [ ] **Step 4: Run the tests to verify they pass**

```powershell
cd tests/e2e
npx playwright test home.spec.js -g "vendor cục bộ|mức tĩnh"
```

Expected: PASS, 2 passed.

- [ ] **Step 5: Capture the hero for visual review**

Automated assertions cannot tell whether the figure is beautiful, or whether the formula is still the brightest thing on the page. Capture both widths as artifacts and look at them.

`npx playwright screenshot` has no `--viewport-size` flag, so drive the browser directly. Run this from `tests/e2e` (that is where `@playwright/test` resolves) with the app already up:

```powershell
New-Item -ItemType Directory -Force -Path ..\..\artifacts\hero-orbits | Out-Null
@'
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 375, height: 800 }]]) {
    const page = await browser.newPage({ viewport, locale: 'vi-VN' });
    await page.goto('http://127.0.0.1:5080/');
    await page.waitForFunction(
      () => Number((document.querySelector('canvas[data-lb-orbits]') || {}).dataset?.lbFrames || 0) > 3,
      null, { timeout: 15000 }
    );
    await page.waitForTimeout(600);
    await page.screenshot({ path: `../../artifacts/hero-orbits/${name}.png` });
    await page.close();
  }
  await browser.close();
})();
'@ | Set-Content -Encoding utf8 $env:TEMP\lb-hero-shot.js
node $env:TEMP\lb-hero-shot.js
```

The `waitForFunction` is not optional: three.js arrives asynchronously, and a screenshot taken before the first frames land shows an empty hero.

Review both against the spec's acceptance bar:
- The headline and the daily-formula card are the brightest elements; the figure is a field behind them.
- No glow, no bloom, nothing that reads as cyberpunk.
- On mobile the figure is faint enough not to fight a 2.4 rem headline.
- Text selection across the headline still works.

`artifacts/` is git-ignored, so these stay local.
- [ ] **Step 6: Run the full e2e suite and the build**

```powershell
cd tests/e2e
npx playwright test --project=chromium
cd ../..
dotnet build
```

Expected: tests pass, build 0 errors.

- [ ] **Step 7: Commit**

```bash
git add wwwroot/sw.js tests/e2e/tests/home.spec.js
git commit -m "feat(blog): cache hero orbits offline"
```

---

## Self-Review

**Spec coverage.** Every section of the spec maps to a task:

| Spec section | Task |
| --- | --- |
| Load path (dynamic `import`, both entry paths) | 2 |
| Scene construction (7 ellipses, parametrisation, tilt, palette, fog, camera, precession) | 2 |
| Frame counter `data-lbFrames` | 2, asserted in 3 |
| Lifecycle (destructor, `visibilitychange`, `ResizeObserver`) | 2, proven in 4 |
| Race guard on the in-flight import | 2, exercised in 4 |
| Degradation table (import reject, WebGL throw, reduced motion, zero size) | 3 |
| Stacking and `pointer-events` | 1 |
| Mobile opacity | 1, asserted in 5 |
| Offline, cache bump to `lb-v19` | 5 |
| Cost (676 KB, home page only) | 2 Step 3 verifies the byte count and the absence of imports |
| Verification list, all five cases | 1, 2, 3, 4, 5 |
| Manual register review | 5 Step 5 |

No spec requirement is unassigned.

**Placeholder scan.** No `TBD`, no "add appropriate error handling", no "similar to Task N". Every code step contains the code. The one judgement call left to the implementer is whether a Task 3 or Task 4 test fails, in which case the instruction is to fix `hero-orbits.js` rather than relax the assertion — stated explicitly in both tasks.

**Type consistency.** `mount(canvas) -> dispose` is defined once in Task 2 and consumed by name in Tasks 3 and 4. `data-lb-frames` is written in Task 2 and read in Tasks 3 and 5. `lb-v19` is asserted in Task 5 and written in the same task. The compiler selector `[data-lb-orbits]` is introduced in Task 1 and used in Tasks 2 and 4. No name drifts.
