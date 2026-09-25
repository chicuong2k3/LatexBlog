# Quality Bar

Acceptance standards for translation output.

## Must pass

- **Structural integrity** -- EPUB remains valid; XHTML parseable; TOC, links, notes, and inline markup preserved
- **No encoding damage** -- no mojibake, replacement characters, or broken Unicode
- **No bad placeholders** -- no leftover template variables or XML artifacts in output text
- **Natural readability** -- output reads as competent target-language prose, not word-for-word transfer
- **Terminology consistency** -- key terms translated the same way throughout; glossary entries respected if provided
- **No unjustified source-language residue** -- body text should be in the target language; source-language terms only when intentionally retained (proper nouns, technical terms marked for retention)

## Not claimed

- Universal perfection in every genre and register
- Guaranteed parity with a top human literary translator
- Zero human review needed in all cases

## Manual spot-check guidance

After QA scan, check at least:

- One title-heavy or heading-heavy section
- One concept-heavy or abstract section
- One paragraph with inline notes, emphasis, or links
- One proper-noun or terminology-heavy section

## Reject or revise if

- Title or heading voice feels mechanical
- Important abstract terms are translated inconsistently
- Untranslated source-language text remains in body without justification
- Punctuation or spacing looks broken
- Custom placeholders or note anchors have disappeared
- EPUB fails validation or links are broken
