# Provider Setup

## Supported providers

| Provider | Default model | API style |
|----------|--------------|-----------|
| gemini | gemini-3-flash-preview | Gemini API |
| openai | gpt-5.1 | Responses API |
| anthropic | claude-sonnet-4-20250514 | Messages API |
| google-translate | (none) | Google Translate API |

## API key resolution

The script resolves keys in this order:

1. `--api-key-env NAME` -- read from the named environment variable
2. `--api-key-file /path` -- read from a file
3. `--api-key-command "cmd"` -- execute a shell command and use its stdout

If none are provided, the script falls back to provider-specific environment variables:

| Provider | Env vars (checked in order) |
|----------|---------------------------|
| gemini | `GEMINI_API_KEY`, `GOOGLE_API_KEY` |
| openai | `OPENAI_API_KEY` |
| anthropic | `ANTHROPIC_API_KEY` |
| google-translate | `GOOGLE_TRANSLATE_API_KEY`, `GOOGLE_API_KEY` |

## Gemini

- Primary default provider for this skill.
- Handles JSON-oriented translation and review prompting well.
- Default model: `gemini-3-flash-preview`. Fallback: `gemini-2.5-flash`.
- Can run through Gemini CLI for a no-key local path.

## OpenAI

- Good alternative when the user prefers OpenAI models.
- Default model: `gpt-5.1`.
- Uses the Responses API.

## Anthropic

- Good alternative for stylistic editing and translation refinement.
- Default model: `claude-sonnet-4-20250514`.
- Uses the Messages API.

## Google Translate

- Lower quality than LLM providers for publisher-grade output.
- Useful for draft mode, rough pass, or cost-sensitive previewing.
- No model selection required.
- Use only with explicit user awareness of the quality tradeoff.
