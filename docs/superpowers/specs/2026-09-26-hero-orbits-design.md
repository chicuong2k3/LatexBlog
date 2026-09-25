# Hero orbits design: a Kepler figure behind the home-page hero

**Date:** 2026-09-26
**Status:** Approved in chat (register, subject and cost accepted by the user)

## Goal

Put a real-time 3D figure behind the home-page hero: a family of nested Kepler
ellipses sharing one focus, drawn as thin lines, carrying a small travelling node,
precessing slowly. It is a background layer, not a feature — the neon headline and
the daily-formula card must stay the loudest things on the page.

## Why this subject

The hero is a Newton quotation, the books section carries a full translation of
*Principia*, and the lead line reads "Nhìn thế giới qua một lăng kính khác" — see the
world through a different lens. Orbital mechanics is exactly a change of reference
frame. The figure therefore says what the site already says instead of decorating
it.

## Register: the figure is quieter than the formula

`Components/App.razor` carries a written thesis:

> math is the loudest thing on the page — a formula glows neon while the rest of the
> blog stays quiet and readable … HONEST RISK: the neon register can read loud for
> readers of long math prose; the prose keeps the quiet end of the palette so
> reading stays calm.

This design holds that line by three rules:

1. Line opacity stays in the `0.14`–`0.34` band. Nothing in the scene is filled.
2. The only moving light is one small node. The field of lines is nearly static.
3. The scene lives in the hero only. No post, chapter or book page loads it.

The active theme is light and flat (`--bg: #f4f6fb`, `--neon: #5367e8`,
`--neon-2: #159b9b`, `--neon-3: #2d78c5`, `--shadow: none`). A dark, glow-heavy
cyberpunk scene would fight the palette, so the figure is drawn in the site's own
tokens, read from CSS at runtime rather than hardcoded.

## Scope

### In scope

- `wwwroot/js/vendor/three.module.min.js` — vendored three.js r186.
- `wwwroot/js/hero-orbits.js` — the scene module.
- `wwwroot/js/site.js` — one `up.compiler` that lazily loads the module.
- `Components/Pages/Home.razor` — the canvas element.
- `wwwroot/css/site.css` — hero stacking and canvas rules.
- `wwwroot/sw.js` — offline registration and cache-version bump.
- `tests/e2e/tests/home.spec.js` — new cases.

### Out of scope

- Mouse or scroll parallax. The scene is passive by decision.
- Any dark-theme variant. The site is light-only.
- Replacing or removing the existing `.lb-hero::before` gradient. The canvas layers
  over it and the gradient stays as the fallback.
- Touching post, chapter or book pages.
- Fixing the orphaned `wwwroot/js/home-layout.js`, which no page references.
- Any change to the hero copy, the featured card, or the daily-formula card.

## Architecture

### Load path

`site.js` already loads on every page and already hosts Unpoly compilers. The
compiler lives there, but the module and three.js are pulled in **dynamically**, on
the first canvas that actually appears.

This matters for two reasons:

- three.js is 384 KB raw. Loading it eagerly in `App.razor` would tax every page of
  a maths blog for one hero.
- A `<script type="module">` placed inside `Home.razor` would only ever run on a
  full page load of `/`. Unpoly navigation (`up-fallback=".lb-main"`) inserts markup
  by DOM manipulation, and HTML5 does not execute scripts inserted that way. A user
  who lands on a post and clicks "Trang chủ" would get an empty canvas.

`import()` is cached by the browser, so the cost is paid once, only if a canvas
appears, and by either entry path.

```
site.js            up.compiler("[data-lb-orbits]")  — always registered
  └─ import('/js/hero-orbits.js')                  — once, on first canvas
       └─ import('/js/vendor/three.module.min.js') — once, on first mount
```

`hero-orbits.js` exports `mount(canvas) -> dispose`. It runs no work at module
scope beyond defining the export, so a stray import is inert.

### Scene construction

Ellipses are generated from orbital elements, not hand-placed. For semi-major axis
`a` and eccentricity `e`, with `b = a·√(1−e²)`, the eccentric-anomaly parametrisation
about a focus at the origin is:

```
x = a·(cos E − e)        z = b·sin E        E ∈ [0, 2π)
```

- **Orbit family:** 7 ellipses. Both `a` and `e` step **linearly** by index: `a`
  from `2.6` to `9.4`, `e` from `0.86` (tight, fast) at the centre to `0.28` (wide,
  slow) at the rim, so the figure reads as a gradient of energy rather than 7 copies
  of one ring.
- **Depth:** each orbit is tilted about X by `2° + 3°·index` and the group is rotated
  `−14°` about X, so the family reads as a shallow bowl seen from slightly above.
  Without the tilt it is a flat rosette and the 3D is invisible.
- **Lines:** `THREE.LineLoop` over 512 sampled points, `LineBasicMaterial` with
  `transparent: true`. Opacity steps linearly by index from `0.34` at the centre to
  `0.14` at the rim. Colour cycles through `--neon`, `--neon-2`, `--neon-3` by
  orbit index.
- **Node:** one `Sprite` on the innermost orbit, advanced by `E(t) = t · ω` with `ω`
  chosen for one revolution every 24 s, wrapping at `2π`. A sprite rather than a mesh
  so it needs no light and cannot fall out of the palette. Its `material.opacity` is
  `0.85` — the brightest single element in the scene, and still below the neon
  headline.
- **Fog:** `FogExp2(pageBackground, 0.055)`, so distant parts of the figure recede
  instead of stacking into a flat wash.
- **Renderer:** `alpha: true` (the CSS gradient shows through), `antialias: true`,
  `setPixelRatio(min(devicePixelRatio, 2))`.
- **Camera:** `PerspectiveCamera(45, aspect, 0.1, 100)` at `(0, 3.2, 12)` looking at
  the origin.
- **Motion:** the group precesses about Y at `2π / 90 rad·s⁻¹` — one revolution every
  90 s, slow enough that a glance registers as drift rather than spin.

Tokens are read with `getComputedStyle(document.documentElement)` at mount time.
`site.css` defines `:root` in several appended blocks, so a hex literal in JS would
drift the moment a theme is retuned.

### Lifecycle

`up.compiler` returns a destructor. Unpoly destroys `.lb-main` on navigation, so the
canvas, its `ResizeObserver`, its animation frame and its GPU resources all have to
be released explicitly or a session accumulates dead WebGL contexts:

- `cancelAnimationFrame`
- `ResizeObserver.disconnect()`
- `renderer.dispose()`, and dispose of geometries and materials
- remove the `visibilitychange` listener

`document.hidden` pauses the loop. A background tab should not hold a GPU.

**Race guard.** The dynamic `import()` is not instantaneous, and the fragment can be
swapped away before it resolves. Each compiler invocation takes a token; if the token
is stale by the time the module arrives, the result is discarded rather than mounted
into a detached node.

### Degradation

Every failure path ends with the CSS gradient and nothing else on screen.

| Condition | Behaviour |
| --- | --- |
| `import()` rejects | Log once, remove the canvas element |
| WebGL context creation throws | Log once, remove the canvas element |
| `prefers-reduced-motion: reduce` | Mount, render exactly one frame, no loop |
| Canvas has zero size | Skip; `ResizeObserver` will fire when it gains one |

The canvas is `pointer-events: none`, so it never intercepts text selection over the
headline.

## Stacking

`.lb-hero::before` (the existing radial-gradient wash) is untouched. The canvas is
inserted as a child of `.lb-hero` at `z-index: 0`; `.lb-hero .lb-wrap` already
carries `position: relative` and is raised to `z-index: 1`. The existing
`overflow: hidden` on `.lb-hero` clips the figure.

Below 720 px the canvas opacity is halved: the hero is short on a phone, and a
44 %-opacity field behind a 2.4 rem headline costs legibility for no gain.

## Offline

`wwwroot/sw.js` skips every cross-origin request, so a CDN-hosted three.js would
never be cached and the hero would lose its figure offline. Vendoring follows the
existing `wwwroot/js/vendor/pretext.esm.js` precedent.

`/js/hero-orbits.js` and `/js/vendor/three.module.min.js` are added to the `STATIC`
array and `CACHE` is bumped `lb-v18` → `lb-v19`. The static list is populated on
`install`, so the 384 KB is fetched at install time rather than on first paint.

three.js is pinned to `0.186.1` and vendored by hand, not by a package manager. The
`package.json` toolchain here exists for Tailwind only.

## Cost

384 KB raw, roughly 100 KB over gzip, fetched once, on the home page only, and
cached by the service worker after install. It is the single largest asset the site
ships. The alternative — hand-written raw WebGL, around 6 KB of drawing code for
ellipses and one sprite — was considered and rejected: the request was to integrate
three.js, and a bespoke renderer is a second engine to maintain.

## Verification

Playwright cases in `tests/e2e/tests/home.spec.js`, matching the existing
Vietnamese-naming convention:

1. The canvas exists, is `aria-hidden`, and has a non-zero bounding box.
2. The page has no horizontal overflow (`scrollWidth − clientWidth ≤ 1`) — the
   existing masonry test already establishes this pattern.
3. With JavaScript disabled the hero headline is still visible and the canvas is
   absent, proving the gradient fallback is intact.
4. Under `reducedMotion: 'reduce'` the canvas mounts and its frame counter stays at
   `1`.
5. Full Unpoly round trip: navigate to a post, then back to `/` through the nav
   link. Exactly one canvas is present and its frame counter is advancing, which
   covers both the lazy `import()` path and the destructor.

The frame counter is exposed as `canvas.dataset.lbFrames`, incremented in the render
loop. It is one line, and it makes "is this actually animating" observable from
outside rather than a matter of trust.

Manual checks: hero at 1440 px and 375 px, with the pointer over the headline to
confirm text selection still works, and with the daily-formula card in view to
confirm the formula still reads as the brightest element on the page.

`dotnet build` must pass. No new Razor or CSS diagnostics beyond what the repository
already reports.
