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

  const wrap = listEl.closest('.lb-wrap') ?? listEl.parentElement;
  const wrapCs = getComputedStyle(wrap);
  const containerWidth = wrap.clientWidth - parseFloat(wrapCs.paddingLeft) - parseFloat(wrapCs.paddingRight);

  const cols = columnCountFor(window.innerWidth);
  const colW = (containerWidth - CARD_GAP * (cols - 1)) / cols;
  if (colW < 220) return false; // card too narrow -> keep CSS flow layout

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
      const chips = [...tags.querySelectorAll('.lb-tag')];
      const tagCS = getComputedStyle(chips[0]);
      const padX = parseFloat(tagCS.paddingLeft) + parseFloat(tagCS.paddingRight);
      const borderX = parseFloat(tagCS.borderLeftWidth) + parseFloat(tagCS.borderRightWidth);
      const chipH = tagF.lineHeight + parseFloat(tagCS.paddingTop) + parseFloat(tagCS.paddingBottom) + parseFloat(tagCS.borderTopWidth) * 2;
      const gap = parseFloat(getComputedStyle(tags).gap) || INNER_GAP;
      const rows = tagRows(chips, tagF, padX + borderX, gap, innerW);
      tagsH = rows * chipH + Math.max(0, rows - 1) * gap;
    }
    const numH = numF ? numF.lineHeight : 0;
    const cardGap = parseFloat(ccs.gap) || INNER_GAP;

    // Reconstruct the rendered card height from the real flex structure:
    // pad + num + gap + body(title+mb+summary) + gap + meta(date+mt+tags) + mb + pad.
    // Margins come from computed style so the prediction matches the browser
    // exactly (an early version summed plain gaps and cards overlapped on
    // narrow columns where 3px errors accumulated).
    const titleMB = parseFloat(getComputedStyle(title).marginBottom);
    const tagsMT = parseFloat(getComputedStyle(tags).marginTop);
    const metaMB = parseFloat(getComputedStyle(date.closest('.lb-post-meta')).marginBottom);
    const bodyH = titleH + titleMB + summaryH;
    const metaH = dateH + tagsMT + tagsH;
    const padH = parseFloat(ccs.paddingTop) + parseFloat(ccs.paddingBottom);
    const borderH = parseFloat(ccs.borderTopWidth) + parseFloat(ccs.borderBottomWidth);
    const cardH = padH + numH + cardGap + bodyH + cardGap + metaH + metaMB + borderH;

    const col = colH.indexOf(Math.min(...colH)); // greedy shortest-column
    card.style.position = 'absolute';
    card.style.left = `${col * (colW + CARD_GAP)}px`;
    card.style.top = `${colH[col]}px`;
    card.style.width = `${colW}px`;
    colH[col] += cardH + CARD_GAP;
  }

  listEl.style.minHeight = `${Math.max(...colH) - CARD_GAP}px`;
  return true;
}

// Clears every masonry inline position + min-height so the container can be
// re-laid out from scratch (idempotency contract; call before each layout).
function resetMasonry(listEl) {
  listEl.querySelectorAll(':scope > .lb-post').forEach((c) => {
    c.style.position = '';
    c.style.left = '';
    c.style.top = '';
    c.style.width = '';
  });
  listEl.style.minHeight = '';
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

  const clampMin = min ?? baseSize;
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
function initPage({ masonrySelector, headingSelector, headingOpts, fontSpecs, requiredFonts, adoptSelector, resize }) {
  if (!('Intl' in window) || !window.Intl.Segmenter) return; // pretext needs it
  const list = masonrySelector ? document.querySelector(masonrySelector) : null;
  const heading = headingSelector ? document.querySelector(headingSelector) : null;
  if (!list && !heading) return;

  const specs = fontSpecs ?? [];
  // Only a specific font is load-critical (the hero's display face); the body
  // fonts load alongside it from the same source. Hard-failing on every spec
  // made the layout flaky when a secondary webfont lagged behind in CI.
  const required = (requiredFonts && requiredFonts.length ? requiredFonts : specs);
  (async () => {
    await waitFonts(specs);
    if (required.length && !fontsReady(required)) return; // font fail -> fallback

    let appliedMasonry = false;
    if (list) {
      list.classList.add(MASONRY_CLASS);
      resetMasonry(list);
      appliedMasonry = layoutMasonry(list);
    }
    if (heading && headingOpts) autofitHeading(heading, headingOpts);

    // Home's "Xem thêm" swaps fresh cards into the surrounding .lb-wrap as
    // siblings of the list; move them into the grid before re-laying out.
    const adopt = () => {
      if (!adoptSelector || !list) return;
      const wrap = list.closest(adoptSelector) ?? document.querySelector(adoptSelector);
      if (wrap) wrap.querySelectorAll(':scope > .lb-post').forEach((c) => list.appendChild(c));
    };

    const run = () => {
      adopt();
      if (!list) return;
      resetMasonry(list);
      layoutMasonry(list);
      if (heading && headingOpts) autofitHeading(heading, headingOpts);
    };

    document.addEventListener('htmx:afterSwap', (e) => {
      const elt = e.detail && e.detail.elt ? e.detail.elt : e.target;
      // Re-layout when the swap touched our container, its adopter, or replaced content.
      if (elt && (elt === list || (adoptSelector && elt.closest && elt.closest(adoptSelector)))) run();
    });
    if (resize !== false) {
      let t;
      window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(run, 150); });
    }
  })();
}

export { layoutMasonry, resetMasonry, autofitHeading, initPage, cssFont, measureLines, tagRows, waitFonts, fontsReady, columnCountFor, firstFontFamily, CARD_GAP, INNER_GAP, MASONRY_CLASS };
