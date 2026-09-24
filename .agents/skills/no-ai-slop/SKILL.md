---
name: no-ai-slop
description: Detect and edit AI-sounding prose in Vietnamese mathematical posts, preserving every proof, fact, example, equation, code block, and LaTeX command. Use for posts/*.tex or posts/*.md before delivery.
---

# No AI slop for LatexBlog

Project-local workflow composed from the vendored `humanizer`, `story-deslop`, and `claude-blog` editorial-pattern guides. This is a LOCAL skill, not an upstream copy.

1. Read the entire post and project `CLAUDE.md`. Mark vague announcements, repeated explanations, formulaic contrast, repetitive paragraph openings, unearned conclusions, and untranslated English fragments. For the diagnostic checklist read `../humanizer/SKILL.md` and `../claude-blog/skills/blog/references/ai-slop-detection.md`. When useful, run `node ../oh-story/story-deslop/scripts/check-ai-patterns.js --check <absolute-post-path>` **only as a read-only advisory**; it targets Chinese web fiction and can misclassify mathematical exposition and Vietnamese punctuation.
2. Edit the flagged **prose**, not the mathematics. Preserve all facts, arguments, proofs, examples, quoted words, glossary terms, figures, commands, code, YAML, and LaTeX structure. Never remove a reasoning step that answers why a mathematical operation works. Do not add SEO filler, novel-story dialogue, or fake human mistakes. Improve the argument's flow instead of replacing individual trigger words mechanically.
3. Re-read the entire post, compare the facts and mathematical notation with the original, scan for repeated transitions, and run the project's post-rendering tests. Run the vendored `stop-slop` quick checks and score the five dimensions; revise if the total is below 35/50. The project's Vietnamese punctuation and bilingual-gloss rules override external defaults.
