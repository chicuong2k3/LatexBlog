"""Format handlers for translate-book skill."""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Protocol, runtime_checkable


@dataclass
class TranslationConfig:
    input_file: Path
    output_file: Path
    target_lang: str
    source_lang: str | None = None
    provider: str = "anthropic"
    model: str = "claude-sonnet-4-20250514"
    fallback_model: str = ""
    quality: str = "balanced"
    secret: Any = None
    style_guide: str = ""
    glossary: dict[str, str] = field(default_factory=dict)
    timeout: int = 120
    concurrency: int = 4
    batch_char_limit: int = 6500
    max_retries: int = 1
    review_pass: bool = True
    sample_blocks: int = 0
    only_file: list[str] = field(default_factory=list)
    qa_report_path: Path = Path("qa_report.md")
    clean: bool = False


@runtime_checkable
class FormatHandler(Protocol):
    def run(self, config: TranslationConfig) -> int: ...


# --------------- handler registry ---------------
_HANDLERS: dict[str, type] = {}


def register_handler(name: str, handler_class: type) -> None:
    _HANDLERS[name] = handler_class


def get_handler(name: str) -> FormatHandler:
    if name not in _HANDLERS:
        raise KeyError(f"Unknown format handler: {name!r}")
    return _HANDLERS[name]()


# --------------- quality presets ---------------
def quality_defaults(quality: str, provider: str) -> dict:
    if provider == "google-translate":
        return {"batch_char_limit": 8000, "max_retries": 0, "review_pass": False}
    presets = {
        "high":     {"batch_char_limit": 4500, "max_retries": 2, "review_pass": True},
        "balanced": {"batch_char_limit": 6500, "max_retries": 1, "review_pass": True},
        "fast":     {"batch_char_limit": 9000, "max_retries": 1, "review_pass": False},
    }
    return presets.get(quality, presets["balanced"])
