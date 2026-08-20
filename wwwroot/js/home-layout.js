// wwwroot/js/home-layout.js
// Pretext-powered home layout: masonry post grid (+ hero auto-fit, Task 3).
// Loaded only on the home page via <script type="module"> in Home.razor.
// Falls back to the plain CSS flow layout when JS/fonts/pretext are unavailable.

import { prepare, layout, measureNaturalWidth } from './vendor/pretext.esm.js';

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
// measurement matches what the browser actually renders (design rule:
// font + letterSpacing must be synced with CSS).
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

// --- init ---------------------------------------------------------------------
async function init() {
  if (!('Intl' in window) || !window.Intl.Segmenter) return; // pretext needs it
  const list = document.querySelector('.lb-posts .lb-post-list');
  if (!list) return; // not the home page

  await waitFonts();
  if (!document.fonts.check(`800 ${HERO_SIZE_MAX}px "${HERO_FONT}"`)) return; // font fail -> fallback

  list.classList.add(MASONRY_CLASS);

  const run = () => { layoutMasonry(); autofitHero(); };
  run();

  document.addEventListener('htmx:afterSwap', onAfterSwap);
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(run, 150); });
}

init();