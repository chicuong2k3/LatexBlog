// wwwroot/js/page-layout.js
// Generic per-page init for non-home pages (tag, search, about, post).
// Reads its own <script data-...> tag for config, so one file serves every
// page: data-masonry = selector of the .lb-post-list to masonry, data-heading
// = selector of the h1 to auto-fit, data-adopt = htmx load-more adopter
// (home-like "Xem thêm" pattern). Home keeps its own thin wrapper because it
// needs hero-specific font specs; everything else goes through this file.

import { initPage } from './layout-engine.js';

const script = document.querySelector('script[data-page-layout]');
const cfg = script ? script.dataset : {};

const headingOpts = cfg.heading
  ? { lines: parseInt(cfg.lines || '2', 10) }
  : null;

initPage({
  masonrySelector: cfg.masonry || null,
  headingSelector: cfg.heading || null,
  headingOpts,
  adoptSelector: cfg.adopt || null,
  requiredFonts: ['800 48px "Bricolage Grotesque"'],
  fontSpecs: [
    '800 48px "Bricolage Grotesque"',
    '600 18px "Space Grotesk"',
    '400 15px "Space Grotesk"',
  ],
});