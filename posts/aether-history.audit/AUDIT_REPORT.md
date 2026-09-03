# Factual & Citation Audit — `posts/aether-history.tex`

> **STATUS: DRAFT AUDIT — NOT A VERIFICATION CERTIFICATE.**
> Nothing below is "verified." Under the scientific-writing workflow, only an
> accountable human who *opens each cited source* may mark a claim or reference
> verified. This audit **extracts** checkable claims, **flags** likely errors and
> gaps, and **routes** them for human verification. It invents no citations, dates,
> or quotations, and marks nothing verified. AI is not an author.
>
> **Update (2026-08-20):** in a follow-up pass, the seven HIGH-priority factual
> errors and contradictions in §2 were **corrected in `aether-history.tex`** using
> corroborated public facts only. The corrected values still require human
> source-verification, exactly like the rest of the manuscript.

- **Document:** `posts/aether-history.tex` (title: *Lịch sử Aether Phần 1: Từ Aristoteles đến Newton*), 782 lines.
- **Type / stage:** long-form history-of-science blog essay (Vietnamese), draft under review.
- **Audit date:** 2026-08-20.
- **Method:** manual claim extraction → structured registries → local deterministic CLIs (scientific-writing skill) → targeted public-source *discovery* searches (corroboration only; not verification).
- **Confidentiality:** processed locally. Web searches used only generic public historical facts (e.g. "when was *Micrographia* published"); no manuscript text was sent externally.

---

## 1. Headline finding: the essay has no verifiable citations

The manuscript carries ~30 footnotes, but **every footnote is a biographical gloss**
(birth/death + one-line description), not a source citation. There is **no
bibliographic reference for any substantive historical claim, physics claim, or
quotation.** Fifteen block quotations are attributed to named figures (Aquinas,
Erasmus, Huygens, Descartes, Fermat, Hooke, Newton ×3, Einstein ×2, unnamed
scholastics) with **no work, edition, page, or translation source** — the single
exception is the Huygens *Traité de la lumière* translation note (L603).

For a history-of-science piece this is the central provenance gap: none of the
narrative can currently be checked by a reader, and the quotations cannot be
confirmed as accurate or correctly attributed. Verification requires opening the
primary/secondary works enumerated in `source_manifest.json` (E001–E033).

---

## 2. Concrete errors and internal contradictions — HIGH priority (✓ corrected 2026-08-20)

These were the items to resolve before publication; **all seven have now been applied
to `aether-history.tex`** (see the applied-edits table below). Corrections are grounded
in well-established history and corroborated by public references (links in §6); a
human should still confirm each against an authoritative source.

| ID | Line(s) | Issue | As printed | Established / corroborated | Recommended action |
|----|---------|-------|-----------|----------------------------|--------------------|
| C011 | 308 | Snell's life dates wrong | "Willebrord Snell (1591–1676)" | **1580–1626** (Britannica, MacTutor, Wikipedia) | Fix both years. Discovery "~1621" and the manuscript-to-Descartes story remain consistent with 1580–1626. |
| C019 | 389 | *Micrographia* publication year | "Năm 1667 … xuất bản *Micrographia*" | **1665** | Change 1667 → 1665. |
| C025 | 487, 616 | Newton "invented trigonometry" (both footnotes) | "người phát minh lượng giác" | Newton **co-invented calculus**; trigonometry predates him by centuries | Replace "lượng giác" → calculus (*vi tích phân*) in both footnotes. |
| C024 | 487 vs 616 | Newton birth year inconsistent between footnotes | "1642–1727" (L487) vs "1643–1727" (L616) | 25 Dec 1642 (Julian) = 4 Jan 1643 (Gregorian) | Pick one convention and use it in both; optionally add a Julian/Gregorian note. *(Tool-flagged: `CROSS_SECTION_VALUE_MISMATCH`.)* |
| C047 | 128 | Ockham→Galileo interval wrong | "Ba thập kỷ sau Ockham" (three decades) | Ockham d. **1347**; Galileo condemned **1633** → ~**three centuries** | Change "ba thập kỷ" → gần ba thế kỷ (or rephrase). |
| C039 | 711 | Einstein interval wrong + chronology jumble | "chỉ năm năm sau (1920)" | Leiden address **1920** is correct, but that is **~15 years** after 1905, not five; and it is placed *after* the 1938 *Evolution of Physics* quote | Fix the interval; reorder so 1920 precedes 1938. |
| C040 | 572 | Bologna-stone dates self-contradict | Casciarolo "1571–1626" **and** discovery "khoảng năm 1630" | Discovery after his stated death is impossible; the stone is usually dated **c. 1603** | Reconcile: correct the discovery date (≈1603) and/or the life dates. |

**Applied edits (2026-08-20):**

| ID | Line | Change |
|----|------|--------|
| C047 | 128 | "Ba thập kỷ sau Ockham" → "Gần ba thế kỷ sau Ockham" |
| C011 | 308 | Snell "(1591–1676)" → "(1580–1626)" |
| C019 | 389 | "Năm 1667 … *Micrographia*" → "Năm 1665 …" |
| C025 | 487, 616 | "phát minh lượng giác" → "phát minh vi tích phân" (both footnotes) |
| C024 | 616 | Newton "(1643–1727)" → "(1642–1727)" — now matches L487; `check_consistency` clean |
| C040 | 572 | Bologna discovery "khoảng năm 1630" → "khoảng năm 1603" (footnote + body) |
| C039 | 711 | "chỉ *năm năm sau* (1920)" → "chỉ *mười lăm năm* sau khi công bố thuyết tương đối hẹp (1920)" — anchors the interval to 1905 and removes the post-1938 misplacement (paragraphs not reordered) |

---

## 3. Imprecise / likely-off — MEDIUM priority (verify and tighten)

| ID | Line(s) | Claim | Note |
|----|---------|-------|------|
| C029 | 592 | Rømer demonstrated finite light speed "1675" | Standardly dated **1676** (observations 1675–76). |
| C050 | 325, 328 | Fermat's least-time result "năm 1661" | Standardly **1662** (the New Year 1662 letter). |
| C026 | 501 | Newton published prism work "năm năm sau" | 1666 → 1672 is **six** years. |
| C030 | 594 | Rømer "~11 phút" Sun→Earth | Rømer's stated figure was **~22 min for the orbit *diameter*** (~11 min for the radius). Verify wording. |
| C042 | 36 | "Metaphysics" = "after physics" as *Aristotle's* doctrine | The **name** comes from later editors (Andronicus ordering the books after the *Physics*), not Aristotle's own coinage. |
| C045 | 271–273 | Descartes' colour theory "đúng ở kết quả, sai ở cơ chế" | Doubtful: fastest rotation → red does **not** map cleanly to modern frequency (red is *low* frequency). Reassess the "correct in result" claim. |
| C043 | 200 | "Descartes là người **đầu tiên** đưa Aether vào khoa học" | Strong priority claim — attribute to a source or hedge. |
| C044 | 216 | "Descartes **khởi xướng** Triết lý Cơ học" | The term "mechanical philosophy" is usually credited to Boyle; Descartes was one founder among several. |
| C046 | 365 | Gassendi's atomism "đã **chiến thắng**" | Cartesian plenum/vortices stayed influential for decades — overstated. |
| C069 | 63 | Aristotle: light = *energeia* of the transparent | Verify against *De Anima* II.7. |
| C070 | 463 | Hooke saw "Newton's rings" before Newton; Boyle before Hooke | Verify priority claim. |
| C012 / C018 | 308 / 365 | Snell non-publication → Descartes; Gassendi–Descartes dispute 1641–1646 | Verify dates and the transmission story. |

**Quotations (C051–C065), MEDIUM — all 15 need source + exact-wording checks:**
Aquinas (L83, 88), unnamed scholastics (L101, 106), Erasmus (L113), Huygens (L233,
239), Descartes (L259), Fermat (L328), Hooke (L394, 432, 479), Newton (L492; 506/512;
560; 627), Einstein (L708 *Evolution of Physics* 1938; L714 Leiden 1920). Confirm each
against the opened work, including the translation used.

---

## 4. Contested (note, not necessarily wrong)

- **C003 (L111)** Erasmus "1466–1536": birth year is genuinely contested (1466/1467/1469). Acceptable; optionally note uncertainty.
- **C013 (L317)** Fermat "1601–1665": 1601 is the majority convention; some sources give 1607. Acceptable as printed.
- **C048 (L630)** `F = G·m₁m₂/r²` attributed to Newton: mild anachronism — the constant *G* was introduced/measured long after Newton (Cavendish era). Common in pedagogy; flag only if precision matters.

---

## 5. Plausible but unverified — LOW priority (still require source-opening)

~37 biographical/physics claims read as correct to general knowledge but are **not
verified** and cite nothing: e.g. Aristotle 384–322 BC; Aquinas 1225–1274; Copernicus
1473–1543 / 1543; Kepler 1571–1630; Galileo 1564–1642; Descartes 1596–1650; Bacon
1561–1626; Huygens 1629–1695; Democritus c.460–370 BC; Epicurus 341–270 BC; Lucretius
c.99–55 BC (*De Rerum Natura*, six books); Gassendi 1592–1655; Hooke 1635–1703;
Grimaldi 1618–1663 / 1665; Young 1773–1829; Fresnel 1788–1827; Michelson 1852–1931
(first US science Nobel, 1907); Morley 1838–1923; Lorentz 1853–1928 (Nobel 1902);
FitzGerald 1851–1901; Einstein 1879–1955 (SR 1905, GR 1915); Michelson–Morley 1887;
contraction `L = L₀√(1−v²/c²)`; dark energy ~68 %. Full list with line refs and
evidence mapping in `claims_detail.json`.

---

## 6. Corroboration sources (discovery aids — NOT verification)

Used to flag the §2 errors; a human must still open an authoritative source:

- Snell 1580–1626 — Britannica; MacTutor (St Andrews); Wikipedia "Willebrord Snellius".
- *Micrographia* 1665 — NYAM Center for History; multiple.
- Rømer 1676 — Wikipedia "Rømer's determination of the speed of light"; "Ole Rømer".
- Fermat least time 1662 — Wikipedia "Fermat's principle".
- Einstein Leiden 5 May 1920 — MacTutor "Einstein: Ether and Relativity".
- Newton 25 Dec 1642 (Julian)/4 Jan 1643 (Gregorian), inventor of calculus — Wikipedia "Isaac Newton".
- Ockham d. 1347 / Galileo condemned 1633 — Wikipedia "Galileo affair"; famous-trials.com.
- Fermat birth 1601 vs 1607 — Wikipedia "Pierre de Fermat"; MacTutor.

---

## 7. Local tool evidence (scientific-writing CLIs)

Run 2026-08-20 with Python 3.11.9. Fail-closed exits are the **expected** signal that
the manuscript is unverified — they are the audit result, not a tool error.

| CLI | Exit | Result |
|-----|------|--------|
| `validate_manifest … --kind source` | 0 | Structure valid: 0 errors, 33 `NO_SOURCE_IDENTIFIER` warnings. |
| `validate_manifest … --kind source --require-verified` | 1 | 33 `SOURCE_NOT_VERIFIED` — no source is human-verified (expected). |
| `check_references source_manifest.json` | 0 | 0 errors; no fabricated identifiers to resolve (expected). |
| `audit_claims claims_annotated.md claims.csv source_manifest.json` | 1 | 70/70 claims registered & used; **0 structural errors**; 228 findings, all "unverified" gates (`CLAIM_NOT_VERIFIED`×70, `UNVERIFIED_CLAIM_EVIDENCE`×79, `UNVERIFIED_CITATION_MARKER`×79). |
| `check_consistency consistency_manifest.json` | 1 → 0 | At audit: 1 error `CROSS_SECTION_VALUE_MISMATCH` (N002) — Newton 1642/1643 (C024). After the §2 fix + manifest sync (N002→1642, N004→1603): **0 errors, `pass`**. |

---

## 8. Verification worklist (for the accountable human)

1. ~~Fix the seven HIGH items (§2).~~ **Done 2026-08-20** — all seven applied to
   `aether-history.tex`; `check_consistency` re-run clean. A human should still confirm
   the corrected values against authoritative sources.
2. **Source every quotation (§3, C051–C065):** open each work, confirm exact wording,
   attribution, and translation; record locator + verifier + date in
   `source_manifest.json`.
3. **Resolve the MEDIUM date/precision items (§3).**
4. **Decide the interpretive claims (§3: C042–C046, C070):** attribute, hedge, or keep.
5. **Verify the LOW/plausible set (§5)** against the E001–E033 sources.
6. **Add real citations.** Convert the biographical footnotes into (or supplement with)
   sourced references; populate identifiers in `source_manifest.json`.
7. **Re-run** `check_consistency` (expect clean after C024) and, once sources are opened
   and confirmed, update `verification_status`/`verification.status` to `verified` with
   `verified_by`/`verified_on`, then re-run `audit_claims` and
   `validate_manifest --require-verified`.

Only an accountable human may mark anything verified or approve publication.

---

## 9. Workspace inventory (`posts/aether-history.audit/`)

- `AUDIT_REPORT.md` — this report.
- `source_manifest.json` — 33 sources (E001–E033) a reader must open; all `unverified`.
- `claims.csv` — 70 claims (C001–C070); SHA-256 of normalized claim text; all `unverified`.
- `claims_annotated.md` — claim statements with `[claim:…] [evidence:…]` markers (drives `audit_claims`).
- `claims_detail.json` — human-facing detail: line refs, severity, assessment, note, evidence per claim.
- `consistency_manifest.json` — datable facts incl. the Newton 1642/1643 contradiction.
- `_audit_claims.json` — captured `audit_claims` output.
