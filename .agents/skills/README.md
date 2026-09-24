# Project writing skills

Vendored from the following GitHub revisions for use with pi's project `.agents/skills/` discovery. `SKILL.md` files keep their upstream instructions; this inventory is not an extra skill.

| Source | Revision | Installed content |
|---|---|---|
| [AgriciDaniel/claude-blog](https://github.com/AgriciDaniel/claude-blog) | `2500d4c765034864cede2bf215d00ccd4d7d6fb8` | `claude-blog/skills/` (entire skill suite), `claude-blog/scripts/`, license |
| [zenstory-ai/oh-story-claudecode](https://github.com/zenstory-ai/oh-story-claudecode) | `55cf682c5b43b97c1ee9c081b428ae020ba9df6c` | `oh-story/story-deslop/` (relevant anti-AI prose skill, its references and check scripts), license; not the novel-writing suite |
| [blader/humanizer](https://github.com/blader/humanizer) | `9862685f575c65a8247f90369951df1b3416e3d6` | `humanizer/SKILL.md`, license |
| [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | `8da1f030185bdfe8471220585162991eaeb970e9` | `stop-slop/SKILL.md`, references, license |

`no-ai-slop/SKILL.md` is a project-local composition of these editorial checks, added to satisfy the repository's detect-then-edit rule. It is not another vendored GitHub skill.

For Vietnamese mathematical posts, follow repository `CLAUDE.md` before external skill defaults. Preserve all mathematics, proofs, examples, technical glosses, code and LaTeX, with no colon-style headings or colon-led prose. Use `blog`'s editorial-pattern review and `humanizer` to mark structural tells, `story-deslop` only for applicable *prose* observations (the script targets Chinese web fiction and must not rewrite mathematical Markdown), then `stop-slop`'s quick checks and five-dimension score. Do not add SEO boilerplate, images, sales copy, novel dialogue, or fake personal experience to satisfy a skill checklist. Do not run vendored scripts that install dependencies, rewrite punctuation, or touch files without reviewing them first. Pi discovers new project skills on the next session/reload.
