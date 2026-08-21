// wwwroot/js/home-layout.js
// Thin per-page init for the home page: masonry post grid + hero title
// auto-fit, both powered by the shared layout-engine.js. Delegates all
// measuring/layout to the engine; kept only to scope the home selectors.

import { initPage } from './layout-engine.js';

const HERO_SIZE_MIN = 2.4 * 16; // clamp(2.4rem, ...) px
const HERO_SIZE_MAX = 4.2 * 16; // clamp(..., 4.2rem) px

initPage({
  masonrySelector: '.lb-posts .lb-post-list',
  headingSelector: '.lb-hero h1',
  headingOpts: { lines: 2, min: HERO_SIZE_MIN, max: HERO_SIZE_MAX },
  adoptSelector: '.lb-posts .lb-wrap',
  requiredFonts: [`800 ${HERO_SIZE_MAX}px "Bricolage Grotesque"`],
  fontSpecs: [
    `800 ${HERO_SIZE_MAX}px "Bricolage Grotesque"`,
    '600 18px "Space Grotesk"',
    '400 15px "Space Grotesk"',
  ],
});
