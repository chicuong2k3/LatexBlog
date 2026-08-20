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