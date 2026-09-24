// wwwroot/js/layout-engine.js
// Shared pretext-powered layout engine for every page: masonry post grid +
// heading auto-fit. Loaded as a module by thin per-page init scripts (and by
// home-layout.js). Falls back to the plain CSS flow layout when JS/fonts/
// pretext are unavailable.
//
// Design: the engine is generic over any element that directly contains
// `.lb-post` children (the masonry container) and any `h1` (the auto-fit
// heading target). Every run is idempotent: it clears the container's prior
// inline positions/min-height and re-lays out from scratch, so re-running
// after an htmx swap (which appends/replaces cards) never double-positions or
// overlaps. Font/style values are read from computed style so measurements
// match what the browser actually renders (design rule: font + letterSpacing
// must be synced with CSS).

import { prepare, layout, measureNaturalWidth } from './vendor/pretext.esm.js';

// --- constants (MUST stay in sync with site.css) -------------------------
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

const normalLineRatio = new Map();
// line-height: normal resolves per-font; probe the rendered ratio so pretext
// measurements match the browser exactly (a hardcoded 1.2 under-measures
// Space Grotesk's ~1.42 and cards overlap on narrow columns).
function normalLineHeight(size, family) {
  const key = `${family}@${size}`;
  if (!normalLineRatio.has(key)) {
    const span = document.createElement('span');
    span.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font:400 ${size}px ${family};line-height:normal;`;
    span.textContent = 'Ág';
    document.body.appendChild(span);
    const h = span.getBoundingClientRect().height;
    span.remove();
    normalLineRatio.set(key, h / size);
  }
  return size * normalLineRatio.get(key);
}

// Build a canvas font spec from the element's real computed style so the
// measurement matches what the browser actually renders.
function cssFont(el, weightOverride) {
  const cs = getComputedStyle(el);
  const weight = weightOverride ?? (cs.fontWeight === 'normal' ? 400 : parseInt(cs.fontWeight, 10) || 400);
  const size = parseFloat(cs.fontSize);
  const family = firstFontFamily(cs.fontFamily);
  const parsedLineHeight = parseFloat(cs.lineHeight);
  const lineHeight = Number.isFinite(parsedLineHeight)
    ? parsedLineHeight
    : normalLineHeight(size, family);
  const letterSpacing = cs.letterSpacing === 'normal' ? 0 : (parseFloat(cs.letterSpacing) || 0);
  return { str: `${weight} ${size}px ${family}`, size, weight, family, lineHeight, letterSpacing };
}

function measureLines(text, font, widthPx) {
  const p = prepare(text, font.str, { letterSpacing: font.letterSpacing });
  return Math.max(1, layout(p, widthPx, font.lineHeight).lineCount); // clamp (empty summary gotcha)
}

// Tags render as flex chips (each with its own padding + border), so pretext's
// plain line-count of the joined label under-counts rows whenever the chip
// chrome pushes the total past the wrap width. Measure each chip's natural
// width (pretext) + chrome, then greedily pack rows like the flex container.
function tagRows(chips, font, chipChromeX, gap, innerW) {
  const widths = chips.map((t) => {
    const p = prepare(t.textContent, font.str, { letterSpacing: font.letterSpacing });
    return measureNaturalWidth(p) + chipChromeX;
  });
  let rows = 1;
  let cur = 0;
  for (const w of widths) {
    if (cur > 0 && cur + gap + w > innerW) {
      rows += 1;
      cur = w;
    } else {
      cur = cur === 0 ? w : cur + gap + w;
    }
  }
  return rows;
}

function columnCountFor(width) {
  if (width >= 900) return 3;
  if (width >= 560) return 2;
  return 1;
}

async function waitFonts(specs) {
  const f = document.fonts;
  await Promise.race([
    Promise.all([f.ready, ...specs.map((s) => f.load(s))]),
    sleep(FONT_TIMEOUT_MS),
  ]);
}

function fontsReady(specs) {
  return specs.every((s) => document.fonts.check(s));
}

// --- masonry -----------------------------------------------------------------
// Lays out the cards inside `listEl` into columns. Idempotent: clears prior
// inline positions + min-height first, then re-positions every card from
// scratch using pretext-measured heights. Returns true if it applied masonry,
// false if it fell back (keeps the CSS flow layout untouched).
function layoutMasonry(listEl) {
  const cards = [...listEl.querySelectorAll(':scope > .lb-post')];
  if (!cards.length) return false;
  listEl.classList.add(MASONRY_CLASS);
  return true;
}

function resetMasonry(listEl) {
  listEl.classList.remove(MASONRY_CLASS);
}

// --- heading auto-fit -------------------------------------------------------
// Fits `h1El` to exactly `lines` lines by binary-searching its font-size
// within [min, max]. Reads the h1's own computed font family/weight/letter-
// spacing so it works for any heading. If the text already wraps to <= lines
// at max size it stays (grows); if it can't fit in `lines` even at min it
// keeps the CSS clamp (never shrinks a short heading). Returns the chosen px
// or null when left untouched.
function autofitHeading(h1El, opts) {
  const { lines = 2, max, min, lineHeight, letterSpacing, weight } = opts;
  const cs = getComputedStyle(h1El);
  const family = firstFontFamily(cs.fontFamily);
  const baseSize = parseFloat(cs.fontSize);
  const parent = h1El.parentElement;
  const parentCs = getComputedStyle(parent);
  const w = (parent ? parent.clientWidth : 0) - parseFloat(parentCs.paddingLeft) - parseFloat(parentCs.paddingRight);
  const text = h1El.textContent.trim();
  if (!text || !w) return null;

  // Defaults keep the CSS size as the ceiling (never grow a heading beyond the
  // design) but allow shrinking down to 60% so long titles can be pulled back
  // to the target line count; explicit min/max (hero) override both.
  const clampMin = min ?? baseSize * 0.6;
  const clampMax = max ?? baseSize;
  // line-height comes back from computed style as px (already scaled to the
  // element's font-size); convert to a ratio so per-size lines stay correct.
  const computedLh = parseFloat(cs.lineHeight);
  const lhFactor = lineHeight ?? (Number.isFinite(computedLh) && baseSize > 0 ? computedLh / baseSize : 1);
  const wght = weight ?? (cs.fontWeight === 'normal' ? 400 : parseInt(cs.fontWeight, 10) || 400);
  // letter-spacing also comes back as px (scaled to font-size); normalize to an
  // em ratio so per-size spacing stays proportional.
  const ls = letterSpacing
    ?? (cs.letterSpacing === 'normal' ? 0 : ((parseFloat(cs.letterSpacing) || 0) / (baseSize || 1)));

  const lineCountAt = (size) => {
    const font = {
      str: `${wght} ${size}px ${family}`,
      letterSpacing: ls * size, // em -> px at this size (0 when already px)
      lineHeight: lhFactor * size,
    };
    const p = prepare(text, font.str, { letterSpacing: font.letterSpacing });
    return layout(p, w, font.lineHeight).lineCount;
  };

  // Short heading that already fits in `lines` at the CSS size: keep design size.
  if (lineCountAt(clampMax) <= lines) return null;
  // Too long even at min: keep the clamp (can't fit).
  if (lineCountAt(clampMin) > lines) return null;

  let lo = clampMin, hi = clampMax;
  while (hi - lo > 0.5) {
    const mid = (lo + hi) / 2;
    if (lineCountAt(mid) <= lines) lo = mid; else hi = mid;
  }
  h1El.style.fontSize = `${lo.toFixed(1)}px`;
  return lo;
}

// --- page init ---------------------------------------------------------------
// Binds the engine to a page: optionally masonry for a list, optionally
// auto-fit for a heading, with font waiting + htmx afterSwap re-layout.
// List/heading are re-queried on every run because htmx fragment swaps replace
// the target element with a fresh one (e.g. tag filter / search results), so a
// cached reference would go stale; the masonry class is re-added accordingly.
function initPage({ masonrySelector, headingSelector, headingOpts, fontSpecs, requiredFonts, adoptSelector, resize }) {
  if (!('Intl' in window) || !window.Intl.Segmenter) return; // pretext needs it
  if (!masonrySelector && !headingSelector) return;

  const specs = fontSpecs ?? [];
  // Only a specific font is load-critical (the hero's display face); the body
  // fonts load alongside it from the same source. Hard-failing on every spec
  // made the layout flaky when a secondary webfont lagged behind in CI.
  const required = (requiredFonts && requiredFonts.length ? requiredFonts : specs);
  const findList = () => (masonrySelector ? document.querySelector(masonrySelector) : null);
  const findHeading = () => (headingSelector ? document.querySelector(headingSelector) : null);

  // Home's "Xem thêm" swaps fresh cards into the surrounding .lb-wrap as
  // siblings of the list; the swapped fragment now wraps its own cards in a
  // .lb-post-list, so adopt both bare cards and cards inside a sibling list,
  // then drop the now-empty wrapper.
  const adopt = (list) => {
    if (!adoptSelector || !list) return;
    const wrap = list.closest(adoptSelector) ?? document.querySelector(adoptSelector);
    if (!wrap) return;
    for (const c of wrap.querySelectorAll(':scope > .lb-post, :scope > .lb-post-list > .lb-post')) {
      list.appendChild(c);
    }
    for (const el of wrap.querySelectorAll(':scope > .lb-post-list')) {
      if (el !== list && !el.querySelector('.lb-post')) el.remove();
    }
  };

  const run = () => {
    const list = findList();
    const heading = findHeading();
    if (!list && !heading) return;
    if (list) {
      list.classList.add(MASONRY_CLASS);
      adopt(list);
      resetMasonry(list);
      layoutMasonry(list);
    }
    if (heading && headingOpts) autofitHeading(heading, headingOpts);
  };

  (async () => {
    await waitFonts(specs);
    if (required.length && !fontsReady(required)) return; // font fail -> fallback

    run();

    document.addEventListener('htmx:afterSwap', (e) => {
      const elt = e.detail && e.detail.elt ? e.detail.elt : e.target;
      if (!elt || !elt.closest) return;
      // Re-layout when the swap touched our masonry container (or replaced it),
      // its adopter, or the auto-fit heading.
      const inList = masonrySelector && (elt.matches(masonrySelector) || elt.querySelector(masonrySelector));
      const inAdopter = adoptSelector && elt.closest(adoptSelector);
      const inHeading = headingSelector && (elt.matches(headingSelector) || elt.querySelector(headingSelector));
      if (inList || inAdopter || inHeading) run();
    });
    if (resize !== false) {
      let t;
      window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(run, 150); });
    }
  })();
}

export { layoutMasonry, resetMasonry, autofitHeading, initPage, cssFont, measureLines, tagRows, waitFonts, fontsReady, columnCountFor, firstFontFamily, CARD_GAP, INNER_GAP, MASONRY_CLASS };
