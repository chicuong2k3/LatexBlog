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
  literal `\n`, `\"` umlaut bugs, and typos.

NEVER shrink scope silently, and NEVER invent new content.
