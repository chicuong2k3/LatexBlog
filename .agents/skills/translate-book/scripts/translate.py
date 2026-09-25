#!/usr/bin/env python3
"""Unified CLI entry point for translate-book.

Detects format (EPUB/PDF/Markdown), dispatches to the appropriate handler.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from formats import TranslationConfig, get_handler, quality_defaults, register_handler
from providers import DEFAULT_MODELS, SecretConfig


def _load_style_guide(style_file: Path | None, target_lang: str, languages_path: Path | None = None) -> str:
    """Build style guide from language profile + optional user style file."""
    # Try to load language profile
    style = f"Target language: {target_lang}\n"
    if languages_path is None:
        languages_path = SCRIPT_DIR.parent / "references" / "languages.json"
    if languages_path.exists():
        try:
            profiles = json.loads(languages_path.read_text(encoding="utf-8"))
            lang_key = target_lang.lower().replace(" ", "-").replace("(", "").replace(")", "")
            profile = profiles.get(lang_key) or profiles.get(target_lang) or profiles.get("default", {})
            if profile:
                guide_lines = profile.get("style_guide", [])
                if guide_lines:
                    style += "\nHouse style:\n" + "\n".join(f"- {line}" for line in guide_lines) + "\n"
        except (json.JSONDecodeError, OSError):
            pass

    if style_file:
        extra = style_file.read_text(encoding="utf-8").strip()
        if extra:
            style += "\nProject-specific style:\n" + extra + "\n"
    return style


def _load_glossary(glossary_file: Path | None) -> dict[str, str]:
    if not glossary_file:
        return {}
    raw = json.loads(glossary_file.read_text(encoding="utf-8"))
    if isinstance(raw, dict):
        return {str(k): str(v) for k, v in raw.items() if v}
    if isinstance(raw, list):
        return {str(item["source"]): str(item["target"]) for item in raw if item.get("source") and item.get("target")}
    return {}


def detect_format(path: Path) -> str:
    ext = path.suffix.lower()
    if ext == ".epub":
        return "epub"
    if ext == ".pdf":
        return "pdf"
    if ext in {".md", ".markdown", ".txt"}:
        return "markdown"
    return "markdown"  # default fallback


def default_output_path(input_file: Path, target_lang: str, fmt: str) -> Path:
    suffix = target_lang.lower().replace(" ", "-").replace("(", "").replace(")", "").replace("/", "-")
    if fmt == "epub":
        return input_file.with_name(f"{input_file.stem}.{suffix}.epub")
    elif fmt == "pdf":
        return input_file.with_name(f"{input_file.stem}.{suffix}.md")
    else:
        return input_file.with_name(f"{input_file.stem}.{suffix}.md")


def default_report_path(output_file: Path) -> Path:
    import tempfile
    report_dir = Path(tempfile.gettempdir()) / "translate-book-reports"
    report_dir.mkdir(parents=True, exist_ok=True)
    return report_dir / (output_file.stem + ".qa.md")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Translate books (EPUB, PDF, Markdown) with multiple LLM providers."
    )
    parser.add_argument("input_file", type=Path, help="Path to the source file.")
    parser.add_argument("--output", type=Path, help="Output file path.")
    parser.add_argument("--format", choices=["auto", "epub", "pdf", "markdown"], default="auto",
                        help="Input format. Default: auto-detect from extension.")
    parser.add_argument("--target-lang", required=True, help="Target language (e.g. zh-TW, ja, fr).")
    parser.add_argument("--source-lang", help="Source language (optional, auto-detected).")
    parser.add_argument("--provider", default="gemini",
                        choices=["gemini", "openai", "anthropic", "google-translate"],
                        help="LLM provider. Default: gemini.")
    parser.add_argument("--model", help="Override model name.")
    parser.add_argument("--fallback-model", help="Fallback model within same provider.")
    parser.add_argument("--quality", default="high", choices=["high", "balanced", "fast"],
                        help="Quality preset. Default: high.")
    parser.add_argument("--api-key-env", help="Environment variable name for API key.")
    parser.add_argument("--api-key-file", help="File path containing API key.")
    parser.add_argument("--api-key-command", help="Shell command that returns API key.")
    parser.add_argument("--sample-blocks", type=int, default=0,
                        help="Translate only first N blocks for testing.")
    parser.add_argument("--only-file", action="append", default=[],
                        help="(EPUB) Only process files matching this substring.")
    parser.add_argument("--style-file", type=Path, help="Custom style guide file.")
    parser.add_argument("--glossary-file", type=Path, help="JSON glossary file.")
    parser.add_argument("--qa-report", type=Path, help="QA report output path.")
    parser.add_argument("--timeout", type=int, default=240, help="API timeout in seconds.")
    parser.add_argument("--concurrency", type=int, default=1,
                        help="(EPUB) Parallel file translation. Default: 1.")
    parser.add_argument("--clean", action="store_true",
                        help="Discard cached progress and start fresh.")
    parser.add_argument("--batch-char-limit", type=int, help="Override batch character limit.")
    parser.add_argument("--max-retries", type=int, help="Override max retries per model.")
    parser.add_argument("--no-review-pass", action="store_true", help="Disable review pass.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    input_file = args.input_file.resolve()
    if not input_file.exists():
        print(f"Input file not found: {input_file}", file=sys.stderr)
        return 1

    # Detect format
    fmt = args.format if args.format != "auto" else detect_format(input_file)

    # Register handlers
    if fmt == "epub":
        from formats.epub_handler import EpubHandler
        register_handler("epub", EpubHandler)
    elif fmt == "pdf":
        from formats.pdf_handler import PdfHandler
        register_handler("pdf", PdfHandler)
    elif fmt == "markdown":
        from formats.md_handler import MdHandler
        register_handler("markdown", MdHandler)

    handler = get_handler(fmt)

    # Resolve quality defaults
    qd = quality_defaults(args.quality, args.provider)
    batch_char_limit = args.batch_char_limit or qd["batch_char_limit"]
    max_retries = args.max_retries if args.max_retries is not None else qd["max_retries"]
    review_pass = qd["review_pass"] and not args.no_review_pass

    # Resolve model
    model = args.model or DEFAULT_MODELS.get(args.provider, "")
    fallback_model = args.fallback_model or ""

    # Resolve paths
    output_file = args.output or default_output_path(input_file, args.target_lang, fmt)
    if output_file.resolve() == input_file:
        print(
            f"SAFETY: output path is the same as input path.\n"
            f"  Input:  {input_file}\n"
            f"  Output: {output_file.resolve()}\n"
            f"Use --output to specify a different output path. Refusing to overwrite source file.",
            file=sys.stderr,
        )
        return 1
    qa_report = args.qa_report or default_report_path(output_file)

    # Build config
    config = TranslationConfig(
        input_file=input_file,
        output_file=output_file,
        target_lang=args.target_lang,
        source_lang=args.source_lang,
        provider=args.provider,
        model=model,
        fallback_model=fallback_model,
        quality=args.quality,
        secret=SecretConfig(
            provider=args.provider,
            api_key_env=args.api_key_env,
            api_key_file=args.api_key_file,
            api_key_command=args.api_key_command,
        ),
        style_guide=_load_style_guide(args.style_file, args.target_lang),
        glossary=_load_glossary(args.glossary_file),
        timeout=args.timeout,
        concurrency=args.concurrency,
        batch_char_limit=batch_char_limit,
        max_retries=max_retries,
        review_pass=review_pass,
        sample_blocks=args.sample_blocks,
        only_file=args.only_file,
        qa_report_path=qa_report,
        clean=args.clean,
    )

    return handler.run(config)


if __name__ == "__main__":
    raise SystemExit(main())
