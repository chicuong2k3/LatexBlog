# Principia Review and Follow-ups Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring `books/newton-principia` in line with the 1846 Motte print: no omitted sentences, correct numbers and formulas, editorial callouts that are physically right and do not put words in Newton's mouth, and figures that are the book's own figures.

**Architecture:** Text-only work on Markdown chapters plus asset files. Sealed chapters (`status: hoan-thanh`, currently 01 and 02) are read-only for agents; only the owner edits them. Every edit to translated prose is declared in `books/newton-principia/AUTHORIZED_TEXT_FIXES.tsv`, and figure blocks in `EXTRACTED_FIGURES.tsv`, so `tools/check_book_callouts.py --fidelity` stays at zero deviations.

**Tech Stack:** Markdown, SVG/PNG, Python 3.12 (a scratch venv with numpy, scipy, PyMuPDF, lxml for the figure tool), Internet Archive item `newtonspmathema00newtrich`.

## Read this first: what the review could and could not do

- **No reviewer could see images.** That includes the agent that wrote this plan. Nothing here says a figure "looks wrong" or "looks right". Figure findings are about labels, coordinates, reuse across chapters, and counts. Judging a drawing needs a person or an image-capable model, and that is Task 4.
- **The source was the Internet Archive OCR of the 1846 print**, not page images. The English OCR is far cleaner than the Latin OCR used for the Euler book, but formulas, ratios and point labels are still damaged, so some findings are OCR ambiguity rather than translation errors.
- **One reviewer, one pass, a cap of 12 items per chunk of about 16 KB.** 148 chunks were reviewed. **81 of them hit the cap and none was clean**, so the list is the most important dozen per chunk, not the complete set of errors.
- **Precision, honestly estimated:** four findings were checked by hand against the source (three confirmed, one still open); a further twelve were read for plausibility, and about a quarter of those were OCR ambiguity or inflated severity. Treat `NANG` as "look at this first", never as "proven".
- The worksheet is `docs/superpowers/reviews/2026-10-03-principia-findings.md` (1612 findings, grouped by chapter, `NANG` first). Nothing in the chapters was changed by this review.

## Confirmed by hand against the source

- **Ch 45, Rule 5:** the source says `HX may be to AI as n + 1 to 1`; the translation has `HX:AI=(n-1):1`. A sign error in a stated ratio.
- **Ch 17, Props V-VI:** the source uses *solid* (a three-dimensional product of lengths); the translation says "khối lượng" (mass) six times. The meaning is wrong, not just the word.
- **Ch 56, Props VII-VIII:** three sentences that are in the source (OCR lines 21455, 21540, 21548) are absent from the translation: a larger planet is made of smaller planets; the Moon is denser than the Earth; the planets sit at different distances so that each gets a suitable share of the Sun's heat.
- **Ch 47, Props XV Cors. 6 and 8:** the reviewer reports the source says *tangent* and the translation says *cotang* in two places and in a callout. My own read of the OCR only shows half the sentence, so this is **unresolved**.

## Reported by reviewers, not yet checked by hand

- **Ch 17:** the proof of Prop VI cites "Lem. X" where the source (OCR `Lem. XL`, a damaged `XI`) means Lemma XI; the denominator of the Prop VI Corollary 2 expression is `QR` not `QR^2`; Corollary 5 lost its `/QR`; Prop V says the lines are "perpendicular to each other" where the source means perpendicular to `PA`, `QB`, `RC`.
- **Ch 11:** the OCR artefact `dc` (for `&c.`) was copied into the translation four times in Lemma II, so a base `dc` that does not exist appears in the statement; `K7, Lw, M//` were copied as labels where `Kl, Lm, Mn` are meant.
- **Ch 56:** "greatest heliocentric elongations" was garbled in Cor. 1 of Prop VIII, and the figure 1/1691282 should be checked on the scan (the reviewer suspects six digits).

## Systemic patterns

Keyword counts over all 1612 findings, so a pattern that shows up in the count is not a one-off.

| Pattern | Findings |
|---|---:|
| Table or numerical data missing from the translation | 109 |
| `Q.E.D.` / `Q.E.F.` dropped | 91 |
| Cross-reference to an earlier Proposition, Lemma or Corollary dropped | 90 |
| Editorial callout attributes to Newton something he did not write | 39 |
| `[OCR không rõ]` marker where the OCR is partly readable and could be filled | 34 |
| Wrong sign or exponent in a stated ratio | 25 |
| *solid* / *exponent* mistranslated | 24 |
| OCR error copied into the translation | 13 |

By kind: omitted text 384 (222 serious), wrong meaning 331, wrong number or formula 268, editorial callouts 247 (149 serious), terminology 139, figures 77, added text 100.

## Editorial callouts

247 findings fall on the `**[Chú giải]**` blocks, and 149 are marked serious. Recurring faults, with chapters where each was reported:

- A callout turns a proposition into a modern theorem and gets the logic backwards, for example presenting Lemma I as an epsilon-delta definition when it is an epsilon-N statement and swaps hypothesis and conclusion (ch 11).
- A callout states modern physics incorrectly: radiative equilibrium temperature goes as the fourth root of flux, not the square root (ch 56); an effective potential for an inverse-square force has a single minimum (a callout in ch 19 claims otherwise); the Moon recedes by gaining orbital energy, which a callout in ch 57 contradicts.
- A callout invents Newton's motive, instrument or intention ("the instrument Newton describes", "he needed it to..."), which `ANNOTATION_GUIDE.md` forbids.
- A callout contradicts the translated text directly above it.
- Typos inside callouts ("quỹ tảo", "hành tích", "mạng" for "mạnh").

## Figures

This is the largest gap and it has a structural cause, not a scattering of mistakes.

- **One 1.4 KB placeholder SVG, `book-ii-section-i-motion.svg`, is inserted in 25 consecutive chapters (43 to 67).** It shows a hyperbola and a time axis labelled A, O, B. It is captioned as a diagram for gravitation of the planets, for the Moon's motion, for comet orbits and so on. The captions themselves say "reused from Part I; to be checked against the original figures".
- Other shared placeholders: `section-xii-spherical-attraction.svg` in ch 38 to 42, `section-vii-rectilinear-motion.svg` in ch 32 to 34, `propositions-7-9-diagrams.svg` in ch 18 and 19, `lemmas-13-14-parabola-focus.svg` in ch 23 and 24.
- From chapter 21 on, every figure has only 2 to 6 point labels while the proof beside it uses 10 to 24 distinct lettered points. By construction those figures cannot be the figures of those propositions.
- Chapters whose proofs use many lettered points but which have no figure at all: 15, 26, 29.
- The bespoke SVGs for chapters 11 and 17 fail even on text-level checks. A reviewer reading the ch 11 SVG coordinates reports that the bases are not equal (140, 140, 140, 140, 170 units) although Lemma II requires equal bases; my own label audit finds the ch 11 diagram missing B, C, D, K and the ch 17 diagram missing D, E, T, V, Y, which its proofs use.
- **The book has about 316 engraved figures on 228 pages** (a detector described below found them; 1 to 4 per page, mostly in Book I). The repository carries about 25 SVG and 14 PNG, which is roughly one tenth, and most of the SVG are the placeholders above.
- Eleven PNG for the System of the World (ch 68) and three for the Laws of Motion (ch 02) already come from the scan and are not the problem.

The figure tool is `tools/principia_figfind.py`. It masks the printed lines using the OCR coordinates and reports what ink is left. Validated against the three figures already extracted for ch 02: same pages as the ledger records (PDF 96, 99) and aspect ratios within 6 percent (0.697 vs 0.720, 1.749 vs 1.789, 1.126 vs 1.057). The candidate boxes for the whole book are in `docs/superpowers/reviews/2026-10-03-principia-figure-candidates.json`. It does not read the labels, because the OCR drops letters inside diagrams, so **it can find where a figure is and cut it out, but only a reader who can see can confirm it is the right one.**

## Tasks

### Task 1: Fix the confirmed translation errors

**Files:**
- Modify: `books/newton-principia/chapters/17-sach-i-phan-ii-proposition-v-vi.md`, `45-sach-ii-phan-ii-proposition-viii-x.md`, `56-sach-iii-proposition-vii-viii.md`
- Modify: `books/newton-principia/AUTHORIZED_TEXT_FIXES.tsv`

**Interfaces:**
- Consumes: the "Confirmed by hand" list above.
- Produces: chapters at zero `--fidelity` deviations.

- [x] **Step 1:** ch 45: change `(n-1):1` to `(n+1):1` in Rule 5. Done in `eebdda8`.
- [x] **Step 2:** ch 17: "khối lượng" for *solid* became "đại lượng khối" in Corollaries 1, 2, 3, 5. The two uses inside callouts mean real mass and were left.
- [x] **Step 3:** ch 56: restored four omitted pieces (larger planet made of smaller ones; the Earth's density "truly defined" by the Moon's parallax; the Moon denser than the Earth; why the planets sit at different distances).
- [x] **Step 4:** nine declarations added to `AUTHORIZED_TEXT_FIXES.tsv`, each checked to occur once in HEAD and to reproduce the working file. The three chapters show no deviation in `python tools/check_book_callouts.py books/newton-principia --fidelity`.

Do not touch `01-dinh-nghia.md` or `02-dinh-luat-van-dong.md`. If a finding there is real, tell the owner.

**Left over from Task 1, outside the three approved errors:**

- ch 17 Corollary 2 still has `QR^2` in the denominator. Corollary 1 gives the solid as `SP^2 x QT^2 / QR`, and the chapter's own identity `SY x QP = SP x QT` turns that into `SY^2 x QP^2 / QR`, so `QR^2` contradicts the text just above it. Corollary 5 (`SP^2 x QT^2`) also lacks the division by `QR`. Both are derived from the translation's own statements rather than read from the source, whose denominator the OCR lost.
- The gate currently reports two deviations that this work did not cause. `04-he-qua-ii-hop-phan-tich-luc.md` carries an undeclared uncommitted edit (`DC` perpendicular to `OD`). `02-dinh-luat-van-dong.md` deviates on a clean checkout of HEAD: after commit `739b87e` the figure block in that sealed chapter and the entries in `EXTRACTED_FIGURES.tsv` no longer compose. Only the owner can touch chapter 02.

### Task 2: Work through the worksheet, chapter by chapter

- [ ] **Step 1:** start with `NANG` items of kind `THIEU`, `SOLIEU` and `SAINGHIA` in chapters 03 to 20, where the proofs are shortest and the OCR is cleanest.
- [ ] **Step 2:** for each, open the source lines named in the item, confirm the claim, and fix only if the source is unambiguous. If the OCR is damaged, add the cell to the ledger's open-questions list instead of guessing.
- [ ] **Step 3:** repeat for the 81 chunks that hit the cap, but split each into two halves first so the cap stops binding.

### Task 3: Rewrite or delete the callouts rated not reasonable

- [ ] **Step 1:** list every callout the reviewers marked `KHÔNG HỢP LÍ` (grep the worksheet for `CHUGIAI`).
- [ ] **Step 2:** for each, either correct it so it states only what the source and standard physics support, or delete it. A callout is not required to exist; `ANNOTATION_GUIDE.md` asks that it add something a modern reader would otherwise miss.
- [ ] **Step 3:** check the callout quota in `tools/check_book_callouts.py` afterwards; deleting is allowed but the band may need a note.

### Task 4: Replace placeholder figures with scan crops (needs an image-capable reader)

**Files:**
- Create: `books/newton-principia/assets/principia-<pdfpage>-<n>.png`
- Modify: `books/newton-principia/EXTRACTED_FIGURES.tsv` and the chapters that insert them

**Interfaces:**
- Consumes: `tools/principia_figfind.py`, the candidate JSON, and a reader who can open the image.
- Produces: figures that are the book's own, each with a caption naming its source page.

- [ ] **Step 1:** set up the tool (see its docstring): scratch venv, then download `newton.pdf` and `newton_djvu.xml` from the item into `%TEMP%\principia1846`.
- [ ] **Step 2:** for one section at a time, find the PDF pages of its propositions, run `principia_figfind.py page <n>`, and crop each `FIGURE` box with `principia_figfind.py crop`.
- [ ] **Step 3:** a person or an image-capable model opens every crop and confirms it is the figure the proof describes and that the point letters match the text. Record the page and the verdict in the ledger. **Do not insert any crop that has not been looked at.**
- [ ] **Step 4:** replace the placeholder block with the crop and a caption of the form `Hình N. ... (bản in 1846, trang <printed>)`, and declare it in `EXTRACTED_FIGURES.tsv`.
- [ ] **Step 5:** delete the placeholder SVG once no chapter references it. Start with the 25-chapter placeholder so the worst offence goes first.

**Staged for the 25-chapter placeholder (chapters 43 to 67), not yet looked at by anyone.** `tools/principia_stage.py` cut the candidates and laid them on one numbered contact sheet per chapter:

- Output is in `%TEMP%\principia1846\staging\`: `index.md`, `sheets/chNN.jpg` (20 sheets, 3.1 MB), `crops/pPAGE-N.png` (128 files, 20 MB), `ranges.json`. It is not committed; re-create it with `python tools/principia_stage.py <dir>` (about 12 minutes, needs the scratch venv and the two downloads).
- 146 candidates across 20 chapters. Chapter page ranges come from decoding the proposition headings: Book III decodes 42 of 42, Book II 51 of 53, so Book II ranges are approximate and a boundary page can belong to the neighbouring chapter.
- **Chapters 51, 56, 57, 58 and 59 yielded no candidate, and re-running those pages with the lower reporting threshold found only fragments under 210 px wide at the page foot (page numbers or footnote marks).** If a reader confirms the scan has no figure there, the right fix is to delete the placeholder from those five chapters, not to replace it.
- The first thing for the image-capable reader to do: open `index.md`, then `sheets/ch43.jpg`, and for each numbered crop say which proposition and which point letters it carries. Chapter 55 has a single candidate and chapters 44, 61, 62 have two to three, so the placeholder there may have been covering a genuinely sparse range.

### Task 5: Tidy ledger statements that the findings contradict

- [ ] **Step 1:** ch 56 ends with an italic note saying figures "have been checked against scan pages 398 to 399" while one number in the same chapter is still in doubt. Reword so it claims only what was checked.
- [ ] **Step 2:** ch 03 and 04 ledger rows say the diagrams are redrawn and "need to be compared with the scan". Keep that wording until Task 4 does it.

## Not touched by this review

- The owner's uncommitted edits in `books/newton-principia/chapters/04-he-qua-ii-hop-phan-tich-luc.md` (changing "DC perpendicular to AC" to "DC perpendicular to OD", which the ledger already describes) and in `TRANSLATION_LEDGER.md`.
- The `external/Unpoly.Blazor` submodule pointer.
- Chapter 00 (the biography and front matter, 11 chunks) and chapter 68 (System of the World, 14 chunks) were reviewed like the rest and carry the most findings (129 and 147), mostly because they are the longest. Chapter 69 (index) was not reviewed.
