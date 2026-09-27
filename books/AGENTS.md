# Book translation rules

## Translation status — sealed chapters are read-only

Each chapter's frontmatter carries a `status` field:

```yaml
status: hoan-thanh        # translation finished
status: chua-hoan-thanh   # still in progress (this is the default when absent)
```

**A chapter marked `status: hoan-thanh` is sealed. Do not edit it. Not the prose,
not the formulas, not the footnotes, not the whitespace, not the frontmatter.**

- Sealed means sealed. Even a "harmless" typo fix or a blank-line cleanup is
  forbidden, because the owner marked that file as final.
- If a sealed chapter genuinely needs a change, stop and ask. Only the owner may
  un-seal it, by editing the `status` themselves.
- A book has no `status` of its own — the build rejects one. A book counts as
  complete only when every one of its chapters is sealed, and the site derives
  the badge from that.
- Never mark a chapter `hoan-thanh` on the owner's behalf. Sealing is their
  decision, not yours.

## Translation rules

- Treat the source book, not an OCR summary, as the source of truth.
- Translate every source page and every sentence. Do not omit, summarize, add, or silently repair source content.
- Preserve formulas, footnotes, tables, captions, page references, headers, and diagrams.
- Keep figures. Extract them when possible; when extraction is impossible, recreate the figure faithfully with TeX/TikZ or an equivalent vector source and mark it for review.
- Use TeX when it is the clearest way to preserve mathematical notation or reproduce a figure.
- Maintain a page-level ledger mapping every source page to its translated file/section, figure status, and QA status.
- OCR is only a working aid. Compare every page against the scan before accepting it.
- Never describe a book translation as complete until every source page is accounted for and reviewed.
