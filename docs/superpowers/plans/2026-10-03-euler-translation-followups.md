# Euler Translation Follow-ups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the items left open by the 2026-10-02 fidelity review of `books/euler-calculi-differentialis`, so that the three translated chapters are internally consistent and the ledger no longer states anything that the print contradicts.

**Architecture:** The translation is text-only; there is no code path beyond the existing Python tools in `tools/`. Two of these tasks add a small guard to a tool, one adds a constraint table to a guide. No chapter file is sealed (`status: chua-hoan-thanh` on all three), so translation edits are permitted, but every text edit must be declared in `AUTHORIZED_TEXT_FIXES.tsv` or the `--fidelity` gate rejects the working tree.

**Tech Stack:** Markdown, Python 3.12, PyMuPDF (`fitz`), Internet Archive scan `bub_gb_sYE_AAAAcAAJ`.

## Global Constraints

- `books/AGENTS.md` is binding: a chapter marked `status: hoan-thanh` is sealed. Never seal a chapter yourself, and never edit a sealed one.
- `ANNOTATION_GUIDE.md` §2: do not change terminology without explicit instruction. Task 3 is therefore gated on an owner decision, not just an implementation.
- Every change to chapter prose must be declared in `books/euler-calculi-differentialis/AUTHORIZED_TEXT_FIXES.tsv`. Regenerate it with `python tools/make_euler_authorized_fixes.py`; the script re-applies the manifest to `git show HEAD` and fails if it does not reproduce the working tree, so it is safe to re-run after editing.
- Errors of Euler are preserved, never silently repaired (`ANNOTATION_GUIDE.md` §2bis). An uncertain *reading* is also preserved and marked, not guessed.
- Print two ways with two different words (the index and the chapter title page) means the print itself is inconsistent; pick the canonical form deliberately and record which was chosen.

## What the review already settled

Do not redo these. Each was checked page by page against the scan, and most were additionally verified numerically.

- Chapters 00, 01, 02 contain no omitted passage, no invented passage, and no mistranslation. The preface (PDF 5–28) is complete sentence by sentence; the index of contents matches the print in 27/27 rows; the errata page (PDF 28) matches character for character.
- The arithmetic was re-checked independently and is correct: the §14 table is `k!·S(n,k)` (Stirling numbers of the second kind), the §29 series reproduces the §27 rows, the Faulhaber coefficients in §61 (12 of 13) and all seventeen rows of the §62 table check out, and the twenty-row table of §51 checks out.
- Euler's own misprints are kept verbatim with translator notes, per §2bis. The paragraph introducing the difference scheme in Chapter I prints `5.` where `§7` would be expected, §12 prints `Δ³q = aΔ³q`, Exemplum III prints `12ω³x²` for `12ω²x²`, §14 prints `(n−3)(n−3)` in the numerator of `E`, §19 prints `(aa+xx⁴` without a closing bracket, §20 prints `Δv` where the running formula uses `Δy`, §29 prints `n−12)` without an opening one, and the §62 table has three wrong rows. These are correct behaviour, not defects.
- `S.X` in §61 against `S.xⁿ` in the formulas below it is Euler's own inconsistency, faithfully kept.
- `AUTHORIZED_TEXT_FIXES.tsv` exists and the `--fidelity` gate passes with zero deviations.

## Reading a doubtful formula

The OCR layer of this scan is unusable wherever the mathematics is, and it fails *silently* rather than loudly: on printed page 55 it drops the letter `e` from both `litterae b, c, d, e` and the final term of `TERMINUS GENERALIS`, which makes a correct translation look wrong. Always confirm a doubtful cell against the page itself.

The scan PDF is not in the repo. Fetch it once into a scratch directory:

```powershell
$t = "$env:TEMP\euler1755"; New-Item -ItemType Directory -Force -Path $t | Out-Null
curl.exe -sS -L -o "$t\euler.pdf" "https://archive.org/download/bub_gb_sYE_AAAAcAAJ/bub_gb_sYE_AAAAcAAJ.pdf"
```

`Invoke-WebRequest` truncates this file; use `curl.exe`. The file is about 31 MB. Confirm the size matches `size` in `https://archive.org/metadata/bub_gb_sYE_AAAAcAAJ` before trusting it.

Render a page, then crop and magnify the region of interest. Both numbers below are fractions of the page in the order top, left, bottom, right:

```powershell
python tools\euler_scan.py "$t\euler.pdf" 71 --width 1700 --out "$t\p71.png"
python tools\euler_scan.py "$t\euler.pdf" 71 --crop 0.355,0.12,0.435,0.78 --width 2200 --out "$t\p71-crop.png"
```

A full page at 1700 px is readable for prose but not for stacked fractions. `--width 2200` on a crop is what resolved the §42 exponent. Read the image, do not infer it from surrounding formulas alone: the entire premise of the earlier review was that two independent sources (OCR text and arithmetic) agreed with each other and both disagreed with the page.

- [ ] **Step 1: Re-download the scan and confirm its size**

```powershell
$t = "$env:TEMP\euler1755"
$expected = (Get-Content "$t\meta.json" -Raw | ConvertFrom-Json).files |
  Where-Object { $_.name -eq 'bub_gb_sYE_AAAAcAAJ.pdf' } |
  Select-Object -ExpandProperty size
"expected $expected, on disk $((Get-Item "$t\euler.pdf").Length)"
```

Expected: the two numbers are equal. If `$t\meta.json` is gone, fetch the metadata endpoint again and write it there.

---

### Task 1: Close the two resolved items in the ledger's open-questions list

`TRANSLATION_LEDGER.md` ends with a section titled "Nghi vấn còn mở" listing seven unresolved readings. Two of them have now been settled by reading the page, and the ledger still describes them as open.

**Files:**
- Modify: `books/euler-calculi-differentialis/TRANSLATION_LEDGER.md`

**Interfaces:**
- Consumes: nothing.
- Produces: an accurate open-questions list; no translation text changes, so no `AUTHORIZED_TEXT_FIXES.tsv` entry is needed.

- [ ] **Step 1: Strike item 5, §42 `aut denique`**

The ledger says the coefficient is a very small fraction and the exponent on `a` is unreadable, keeping `1/4` and `a^III`. Reading PDF 71 at high zoom shows the print has **1/4** and **a^II**. The exponent was a misreading, now corrected in the chapter; the coefficient is printed and is a genuine misprint of Euler, kept as `1/4`.

- [ ] **Step 2: Strike item 6, §57's `e`**

No ledger entry claims this, but record the near-miss: OCR drops `e` twice on printed page 55, which briefly made a correct five-term formula look like a spurious added term. The chapter now carries a translator note saying so.

- [ ] **Step 3: Keep the remaining five items**

Items 1, 2, 3, 4 and 7 still need eyes on the page at higher zoom or a second scan.

- [ ] **Step 4: Add a dated entry recording the method**

Append a subsection to the ledger's dated log, in the style of the existing 2026-09-28 entries, saying that the review compared PDF 5–97 against the scan and that two readings were settled by rendering the page rather than trusting the text layer.

---

### Task 2: Stop `euler_page.py` from crashing on non-cp1252 consoles

`tools/euler_page.py` prints to the platform encoding. On this machine it dies with `UnicodeEncodeError: 'charmap' codec can't encode character '\u25a0'` on pages containing `♦` or `■`, unless the caller first sets `PYTHONIOENCODING=utf-8`. Every worker hits this within minutes.

**Files:**
- Modify: `tools/euler_page.py`

**Interfaces:**
- Consumes: nothing.
- Produces: the same stdout, emitted as UTF-8 regardless of console code page.

- [ ] **Step 1: Reconfigure stdout at the top of `main()`**

Add before the loop:

```python
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
```

- [ ] **Step 2: Verify against a page that previously crashed**

```powershell
python tools\euler_page.py "$env:TEMP\euler1755\euler-1755-ocr-paged.txt" 71
```

Expected: exit 0 and output, with no `PYTHONIOENCODING` set in the environment.

---

### Task 3: Settle the Vietnamese terminology — owner decision required

`ANNOTATION_GUIDE.md` §2 forbids changing terminology, so this task must not be started without an explicit answer. The review found the translation inconsistent on four points. Counts are over `books/euler-calculi-differentialis/chapters/*.md`.

| Item | Current state | Note |
|---|---|---|
| `analysis` | "giải tích vô hạn" 3× for *Analysis Infinitorum*, "**phân tích** hữu hạn" 1× for *Analysis finitorum*, plus the book title and the preface subtitle | In Vietnamese mathematical usage *analysis* is "giải tích". "Phân tích" is the verb, not the name of the field. The mismatch is visible in the book title. |
| harmonic | "chuỗi điều hòa" 1× | The same sentence uses "cấp số cộng" and "cấp số nhân" correctly. School text uses "cấp số điều hòa" or "cấp số hài". |
| Latin retention | `constans` 12× / "hằng" 48×; `variabilis` 7× / "biến" 49× | The Latin is kept in some places and translated in others with no rule visible. |
| `functio` | 125× against "hàm số" 1× | This one is coherent and almost certainly deliberate. Keep. |
| `differentia` | 267× against "sai lệch" 29× | Mixed inside a single passage; the chapter title itself uses "sai lệch". |

- [ ] **Step 1: Ask the owner which of these to change**

Offer a concrete recommendation rather than an open question: unify *analysis* to "giải tích" in the book title, the preface subtitle and the two body occurrences; change "chuỗi điều hòa" to "cấp số điều hòa"; leave `functio` as is; and either apply "giữ Latin ở lần định nghĩa đầu, sau đó dịch" consistently or keep Latin throughout.

- [ ] **Step 2: Apply only what was approved, then regenerate the manifest**

```powershell
python tools\make_euler_authorized_fixes.py
python tools\check_book_callouts.py books\euler-calculi-differentialis --fidelity
```

Expected: the gate reports zero translation deviations. Any terminology change touches chapter text and will be caught if it was not declared.

---

### Task 4: Add a binding terminology table to the Euler annotation guide

`books/tesla-alternate-currents-1892/ANNOTATION_GUIDE.md` §4 carries a terminology table described as binding, because chapters were not all drafted at once. The Euler guide has no such table, which is why Task 3's inconsistencies had no written rule to appeal to.

**Files:**
- Modify: `books/euler-calculi-differentialis/ANNOTATION_GUIDE.md`

**Interfaces:**
- Consumes: the decisions taken in Task 3.
- Produces: a table future chapters cite before translating a term.

- [ ] **Step 1: Add a "Bảng thuật ngữ" section**

Three columns: Latin term, the Vietnamese rendering in force, and modern equivalent. Cover at minimum `functio`, `differentia`, `incrementum`, `constans`, `variabilis`, `terminus generalis`, `terminus summatorius`, `analysis infinitorum`, `analysis finitorum`, `progressio`, `series`, `summa`, and `limes`.

- [ ] **Step 2: Note the roman-numeral index convention**

State that superscript indices are Roman unless the print shows otherwise, and that `Sec.` in OCR is `§.`. This is already in `KY_HIEU_EULER.md`; the guide should point there rather than restate it.

---

### Task 5: Decide what to print for the two titles Euler gives two ways

In two cases the book's own index and the chapter's own title page disagree. Neither is a scanning error.

| Chapter | Index | Chapter title page |
|---|---|---|
| Pars Posterior XVIII | `Rejunctione` Fractionum (PDF 27, printed xxiii) | `RESOLUTIONE` FRACTIONUM (PDF 881, printed 843) |
| Pars Posterior I | OCR reads `TRANSFORMATIONS`, unresolved | same, unresolved |

- [ ] **Step 1: Read Pars Posterior I from the page**

```powershell
$t = "$env:TEMP\euler1755"
python tools\euler_scan.py "$t\euler.pdf" 309 --width 2000 --out "$t\p309.png"
```

Expected: a readable answer distinguishing *Transformatione*, *Transformationibus* or *Transformationes*. Until this is read, `CHAPTER_PLAN.json` keeps `De Transformationibus Serierum` and no change is made.

- [ ] **Step 2: Choose which page is canonical for Pars Posterior XVIII, and say why**

The chapter title page is the natural authority for a chapter's name; the index is a cross-reference. But the index is what a reader consults. Whichever is chosen, `book.md`, `CHAPTER_PLAN.json`, the ledger plan table and the preface index must all agree afterwards. Record the decision in the ledger.

- [ ] **Step 3: Verify that the chosen form is applied everywhere**

```powershell
Select-String -Path books\euler-calculi-differentialis\*.md, books\euler-calculi-differentialis\*.json,
  books\euler-calculi-differentialis\chapters\00-*.md -Pattern "Rejunctione|Resolutione"
```

Expected: one form only, in the chapter opening and in the index as each was chosen.

---

### Task 6: Rename two chapter files whose names no longer match their content

Four chapter titles in `CHAPTER_PLAN.json` were wrong and have been corrected. Two of the fixes invalidate a file name, and `vn` was already updated to match:

| File | Now reads |
|---|---|
| `12-sai-lech-tuong-tu.md` | *De Inventione Differentiarum finitarium* — "Tìm sai lệch **hữu hạn**" |
| `25-dao-ham-ham-an.md` | *De Differentiatione Functionum inexplicabilium* — "Đạo hàm functio **inexplicabilis**" |

Neither chapter has been drafted, so renaming now costs nothing. Nothing outside the ledger and the plan references these names.

**Files:**
- Modify: `books/euler-calculi-differentialis/CHAPTER_PLAN.json` (`file` field only)

**Interfaces:**
- Consumes: nothing.
- Produces: plan file names that match the titles, so chapter creation does not inherit the wrong name.

- [ ] **Step 1: Choose the new names**

Suggested: `12-tim-sai-lech-huu-han.md` and `25-dao-ham-functio-inexplicabilis.md`. Keep the `NN-` prefix and the kebab-case convention used by every other chapter.

- [ ] **Step 2: Update the `file` fields, then rebuild both ledger tables**

```powershell
$t = "$env:TEMP\euler1755"
python tools\make_euler_plan_table.py --pagemap "$t\pagemap.json"
python tools\euler_ledger.py --pagemap "$t\pagemap.json"
```

Expected: `rows written : 934`, and both tables name the new files.

- [ ] **Step 3: Confirm the gate still passes**

```powershell
python tools\check_book_callouts.py books\euler-calculi-differentialis --fidelity
```

Expected: zero structural errors, zero translation deviations.

---

### Task 7: Translate the missing ten pages of Chapter II

`chapters/02-dung-sai-lech-trong-ly-thuyet-chuoi.md` stops at PDF 87, printed 59, §62. The chapter runs to printed 69. PDF 88–97 is untranslated, which is 34% of the chapter. The file already says so in a comment at its end, so nothing is silently truncated; the page table in the ledger reflects the gap.

The missing material, by printed page: the tail of the §62 table running out to the 29th power; §63 on the law governing the §62 tables and how to get the last term from a constant φ; §64 summarising that the summatory term is now available for every series whose general term is an integral rational function of x; Exemplum I on the series 1, 7, 17, 37, 66; Exemplum II on the odd cubes giving x⁴ − x²; §65 on products of simple factors; §66 on the triangular, square and tetrahedral figurate numbers; §67 on recovering earlier summatory terms by addition; §68 and §69 on proper fractions, leading to partial-fraction decomposition, with two exempla; §70 on geometric denominators; and §71, the closing paragraph of CAPUT II, on the condition that the denominator exceed the numerator by powers of x.

- [ ] **Step 1: Render the ten pages and work from them, not from the OCR**

```powershell
$t = "$env:TEMP\euler1755"
python tools\euler_scan.py "$t\euler.pdf" --pages 88,89,90,91,92,93,94,95,96,97 --width 1700
```

Expected: ten PNGs in the temp directory. Crop and magnify each table and each stacked fraction before transcribing it. The §62 table alone runs `S.x⁰` to `S.x¹⁶`, seventeen coefficients per row, and each row spills across two printed lines with its last term set in the right margin.

- [ ] **Step 2: Append the translation with page markers**

Add `<!-- PDF 88, trang in 60 -->` through `<!-- PDF 97, trang in 69 -->`, keep the existing style, keep Latin technical terms in italics as the rest of the book does, and preserve any of Euler's misprints with a translator note rather than repairing them.

- [ ] **Step 3: Remove the trailing "Chưa dịch" marker**

Delete the closing comment that currently records the gap, and replace it with the normal end-of-chapter note, matching what Chapter I does at PDF 66.

- [ ] **Step 4: Rebuild the ledger and re-run the gate**

```powershell
python tools\euler_ledger.py --pagemap "$t\pagemap.json"
python tools\check_book_callouts.py books\euler-calculi-differentialis --fidelity
```

---

### Task 8: Bring callout counts up to the plan quota

The quota lives in `CHAPTER_PLAN.json` and is mirrored as an upper bound in `BOOK_DENSITY_BANDS` in `tools/check_book_callouts.py`. The bands are `(0, n)`: the floor is deliberately zero, because a chapter still being drafted may not have its callouts yet, so the tool will not complain about a shortfall. That is by design and must not be "fixed".

| Chapter | Callouts now | Quota |
|---|---:|---:|
| 00 `00-loi-tua-va-muc-luc.md` | 1 | 2 |
| 01 `01-sai-lech-huu-han.md` | 5 | 6 |
| 02 `02-dung-sai-lech-trong-ly-thuyet-chuoi.md` | 0 | 4 |

**Files:**
- Modify: `books/euler-calculi-differentialis/chapters/*.md`

**Interfaces:**
- Consumes: `ANNOTATION_GUIDE.md` §6, which lists the terms that should earn a callout on first appearance.
- Produces: chapters whose explanatory layer matches the quota. Callouts are excluded from the `--fidelity` gate, so these edits need no manifest entry.

- [ ] **Step 1: Add the missing callout to Chapter 02 first**

It has none at all, and the chapter introduces `terminus generalis`, `terminus summatorius`, and the notion of a series of a given order. `ANNOTATION_GUIDE.md` §6 names all three. Insert after the block each explains, and before the next heading.

- [ ] **Step 2: Respect the length floor**

Callouts must run 25–700 words excluding LaTeX, checked by the tool. The current Euler callouts run 130–246 words, so aim for that range rather than padding to the maximum.

- [ ] **Step 3: Check the gate**

```powershell
python tools\check_book_callouts.py books\euler-calculi-differentialis
```

Expected: `lỗi cấu trúc : 0`, and the count line reporting three chapters with callouts.

---

### Task 9: Read the remaining chapter openings on the page

Only two of the twenty-eight chapter boundaries have been confirmed against the rendered page: PDF 647 (`CAPUT XI`) and PDF 685 (`CAPUT XII`). The rest came from the OCR layer, which is the same source that produced two false alarms during this review.

**Files:**
- Modify: `books/euler-calculi-differentialis/TRANSLATION_LEDGER.md` (open-questions list only, if anything stays ambiguous)

**Interfaces:**
- Consumes: the scan PDF in `%TEMP%\euler1755\`.
- Produces: a boundary list where every chapter's opening page has been read, or an explicit list of the ones still unverified.

- [ ] **Step 1: Render all chapter openings at a width that shows the heading**

```powershell
$t = "$env:TEMP\euler1755"
python tools\euler_scan.py "$t\euler.pdf" --width 1200 --out "$t\open.png" --pages 31,67,98,126,152,179,206,232,269,309,332,360,387,431,469,507,543,574,606,647,685,717,740,766,797,836,881
```

Expected: one PNG per chapter opening, each showing `CAPUT <roman>` with its title. Only the heading needs to be legible, so 1200 px is enough.

- [ ] **Step 2: Compare each heading against `CHAPTER_PLAN.json`**

Expected: every chapter number matches its plan entry. Anything that does not is a real discrepancy and goes in the ledger.

- [ ] **Step 3: Record what was checked**

Note in the ledger that the boundaries were read on the page, with the date, so a later reader does not repeat the pass.

---

## Notes for whoever picks this up

- The scan PDF and the paged OCR both live in `%TEMP%\euler1755\` and will not survive a reboot. To rebuild the OCR from scratch:

```powershell
$t = "$env:TEMP\euler1755"
curl.exe -sS -L -o "$t\djvu.xml" "https://archive.org/download/bub_gb_sYE_AAAAcAAJ/bub_gb_sYE_AAAAcAAJ_djvu.xml"
python tools\build_djvu_paged_ocr.py "$t\djvu.xml" $t
```

- `tools/archive_pagemap_report.py` writes the `pagemap.json` that both ledger generators require; it needs network access and prints only two offset jumps, at PDF 29 and PDF 871. The +38 offset from PDF 871 onward is real: this scan repeats printed pages 833–842 twice, once at PDF 861–870 and once at PDF 871–880. That is why the plan table takes folios from `page_numbers` rather than subtracting 28.
- The plan table in `TRANSLATION_LEDGER.md` and the per-page table below it are now both generated. Run `make_euler_plan_table.py` then `euler_ledger.py` after editing `CHAPTER_PLAN.json`, or they will drift apart again; they drifted for exactly this reason before.
- The `BOOK_DENSITY_BANDS` floor of zero in `check_book_callouts.py` is deliberate and documented in a comment at line 83. A chapter below its callout quota will not be flagged. Do not tighten it without deciding how a chapter still being drafted should behave.
- No chapter is sealed. If any is sealed later, everything above stops applying to that file and the agent must report instead of edit.