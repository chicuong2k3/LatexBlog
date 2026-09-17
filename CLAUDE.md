# LatexBlog — Project Rules

## Vietnamese prose rewriting (`posts/*.tex`) — MANDATORY

When writing, editing, reviewing, or refactoring the Vietnamese blog posts, rewrite the
sentences so they read **naturally and fluently — the way a real person would actually
tell the story**.

MUST:
- Preserve **100%** of the meaning, information, arguments, examples, analogies, and
  details. NEVER remove, omit, shorten, summarize, or leave out any sentence, word,
  idea, explanation, or detail from the original.
- Only improve **wording, sentence flow, rhythm, and overall naturalness**. Keep
  everything **in Vietnamese**.
- Keep every fact, date, and name intact (they were fact-checked in the audit).
- Keep the bilingual technical glosses the posts use, e.g. `wave-front (sóng tuyến)`,
  `khúc xạ (law of refraction)` — the English gloss is content, do not delete it.
- Preserve all LaTeX structure and commands, math, figures, list structure, and every
  `\footnote{}` fact.
- Preserve attributed block quotations (`\begin{quote}`): fix only broken markup, NEVER
  change the quoted words.
- Fix machine-translation artifacts: stray untranslated English/foreign words dropped
  mid-sentence, jammed spacing before `\emph{}`/`\textbf{}`, scattergun/random emphasis,
  literal `\n`, `\"` umlaut bugs, and typos. Also fix English-idiom calques: NEVER
  translate English idioms word-by-word (e.g. `đặt một chân vào đại số tuyến tính`
  from "put a foot in" --- Vietnamese never uses that image; rewrite natively,
  e.g. `bước sang đại số tuyến tính`).
- Headings: NEVER use `X: Y` colon-style headings (e.g. `\section{Mở đầu: từ ...}`).
  A heading is one clean phrase (e.g. `\section{Mở đầu}`). Any subtitle/hook goes into
  the opening paragraph, not the heading.
- AI-voice announcement patterns: NEVER use drumroll transitions like `Và đây chính là...`,
  `Đây chính là ...`, `Chính tại đây/khoảnh khắc này...` (e.g. `Và đây chính là điểm chúng ta
  bước sang đại số tuyến tính`). A real person never announces a transition with fanfare ---
  they just make it. State what the reader has just understood and move on
  (e.g. `Nhận ra được điểm chung này, coi như các em đã bước sang đại số tuyến tính`).
- Writing skills (MANDATORY): ALWAYS run `no-ai-slop` (detect, then edit) and `stop-slop`
  (quick checks + 5-dimension scoring, revise if below 35/50) on every `posts/*.tex` draft
  before delivering. Repo conventions in this file override skill defaults on conflict:
  `---` is normal Vietnamese punctuation (not an em-dash crutch); bilingual glosses and
  quoted historical notes are content, never clutter.

NEVER shrink scope silently, and NEVER invent new content.
