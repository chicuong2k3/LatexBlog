---
name: translate-book
description: >
  Translate books (EPUB, PDF, Markdown) to any major language using
  Gemini, OpenAI, or Anthropic. Publisher-grade quality with structure
  preservation, resume/checkpoint, concurrency, QA scanning, and 11+
  built-in language profiles. Use when a user wants to translate a book
  or document. Trigger: /translate-book, "translate this book",
  "翻譯這本書", "help me translate"
---

# translate-book

Use this skill when the user wants to translate a book or long document. Supports EPUB, PDF, and Markdown input.

## When to use

- Translating an EPUB book (structure preserved, outputs EPUB)
- Translating a PDF document (extracted text, outputs Markdown)
- Translating a Markdown or plain-text document (translates in-place, outputs Markdown)

## Required interaction

Before running scripts, gather these from the user:

1. **File path** -- which file to translate
2. **Target language** -- e.g. zh-TW, ja, fr, de
3. **Special requirements** -- terminology policy, tone, proper noun handling, region-specific usage, terms to keep in English
4. **Provider** -- gemini (default), openai, or anthropic

If the user has no special requirements, use the default language profile, high quality, and Gemini.

## Secret handling

Never ask the user to paste raw API keys into chat.

Prefer one of these:

- Environment variable name (`--api-key-env`)
- Local secret file path (`--api-key-file`)
- Shell command that retrieves the key (`--api-key-command`)

If none are provided, the script falls back to provider-specific environment variables (e.g. `GEMINI_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`).

## Format notes

| Input | Output | Notes |
|-------|--------|-------|
| EPUB | EPUB | Full structure preserved (TOC, links, notes, inline markup) |
| PDF | Markdown | Text extracted via pdfplumber, translated to Markdown |
| Markdown / .txt | Markdown | Translated in-place |

Format is auto-detected from extension. Override with `--format`.

## Default policy

- **Provider:** gemini
- **Quality:** high
- **Workflow:** sample-first (always start with a sample unless user overrides)

For English to Traditional Chinese: use `zh-TW` profile; keep prose modern and trade-publishing friendly.

## Provider guidance

| Provider | Default model | Notes |
|----------|--------------|-------|
| gemini | gemini-3-flash-preview | Primary default. Fallback: gemini-2.5-flash |
| openai | gpt-5.1 | Uses Responses API |
| anthropic | claude-sonnet-4-20250514 | Uses Messages API |
| google-translate | (none) | Lower quality, draft/cost-sensitive only |

Read [references/providers.md](references/providers.md) for full setup details.

## Workflow

### 1. Sample translation

Always start with a sample unless the user explicitly says to skip it.

```bash
python3 ~/.claude/skills/translate-book/scripts/translate.py \
  "/path/to/book.epub" \
  --target-lang zh-TW \
  --provider gemini \
  --quality high \
  --sample-blocks 6
```

### 2. QA review

After the sample completes, a QA report is auto-generated at `<output>.qa.md`. Inspect:

- Weird symbols or mojibake
- Untranslated source-language residue in body text
- Terminology consistency
- Structural integrity (EPUB validity, links, notes)

If glossary is provided, check term consistency against the glossary.

### 3. Full translation

If the sample looks good, run without `--sample-blocks`:

```bash
python3 ~/.claude/skills/translate-book/scripts/translate.py \
  "/path/to/book.epub" \
  --target-lang zh-TW \
  --provider gemini \
  --quality high \
  --glossary-file glossary.json
```

The script supports resume/checkpoint. If interrupted, re-run the same command to continue from where it left off. Use `--clean` to discard cached progress and start fresh.

## Language profiles

11 built-in profiles in [references/languages.json](references/languages.json): zh-TW, zh-HK, zh-CN, ja, ko, fr, de, es, pt-BR, it, plus a generic default.

If the target language matches a built-in profile, it is used automatically. If the user requests a different house style, merge user instructions on top of the default profile (do not discard the profile).

## Dependency check

- **EPUB:** requires `lxml` (`pip install lxml`)
- **PDF:** requires `pdfplumber` (`pip install pdfplumber`)
- **Markdown:** no extra dependencies

## Available scripts

Main entry point:

```
~/.claude/skills/translate-book/scripts/translate.py
```

### Full argument list

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `input_file` | yes | -- | Path to the source file |
| `--output` | no | auto | Output file path |
| `--format` | no | auto | Force format: epub, pdf, markdown |
| `--target-lang` | yes | -- | Target language code (e.g. zh-TW, ja, fr) |
| `--source-lang` | no | auto | Source language (auto-detected if omitted) |
| `--provider` | no | gemini | LLM provider: gemini, openai, anthropic, google-translate |
| `--model` | no | per-provider | Override model name |
| `--fallback-model` | no | -- | Fallback model within same provider |
| `--quality` | no | high | Quality preset: high, balanced, fast |
| `--api-key-env` | no | -- | Env var name for API key |
| `--api-key-file` | no | -- | File path containing API key |
| `--api-key-command` | no | -- | Shell command that returns API key |
| `--sample-blocks` | no | 0 (all) | Translate only first N blocks for testing |
| `--only-file` | no | -- | (EPUB) Only process files matching this substring; repeatable |
| `--style-file` | no | -- | Custom style guide file path |
| `--glossary-file` | no | -- | JSON glossary file path |
| `--qa-report` | no | auto | QA report output path |
| `--timeout` | no | 240 | API timeout in seconds |
| `--concurrency` | no | 1 | (EPUB) Parallel file translation |
| `--clean` | no | false | Discard cached progress, start fresh |
| `--batch-char-limit` | no | per-quality | Override batch character limit |
| `--max-retries` | no | per-quality | Override max retries per model |
| `--no-review-pass` | no | false | Disable review pass |

## Notes

- High-quality mode is slower and more expensive. Inform the user.
- For google-translate, warn that quality is lower and the result should be treated as a draft.
- The script auto-generates output filenames: `<stem>.<lang>.epub` for EPUB, `<stem>.<lang>.md` for PDF/Markdown.
