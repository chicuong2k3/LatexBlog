"""Format-agnostic translation engine.

Handles batching, prompt construction, LLM calling, JSON parsing,
validation, retry logic, and review pass. Used by all format handlers.
"""
from __future__ import annotations

import json
import re
import threading
from dataclasses import dataclass, field
from typing import Any, Callable

from lxml import etree

# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

MARKUP_SYSTEM_PROMPT = """You are an elite literary translator and bilingual line editor.

Your task is to translate XHTML block content into polished publication-grade target language prose.

Hard requirements:
1. Return only valid JSON.
2. Preserve every segment id exactly.
3. Preserve every placeholder tag exactly:
   - <g id="..."> ... </g>
   - <ph id="..."/>
4. Do not add or remove placeholders.
5. Do not modify placeholder ids.
6. Translate only human-readable prose.
7. Keep markup structure intact. Do not invent tags, attributes, notes, or explanations.
8. Preserve paragraph-level meaning with high fidelity while making the prose read like a first-rate commercial translation from a world-class publisher.
9. Do not summarize. Do not omit nuance. Do not flatten voice.
10. Return the translated content in the same order as the input.
"""

PLAIN_SYSTEM_PROMPT = """You are an elite literary translator and bilingual line editor.

Your task is to translate text blocks into polished publication-grade target language prose.

Hard requirements:
1. Return only valid JSON.
2. Preserve every segment id exactly.
3. Translate only human-readable prose.
4. Preserve paragraph-level meaning with high fidelity while making the prose read like a first-rate commercial translation from a world-class publisher.
5. Do not summarize. Do not omit nuance. Do not flatten voice.
6. Return the translated content in the same order as the input.
"""


class TranslationError(RuntimeError):
    pass


@dataclass
class Segment:
    """A translatable text block. Works for all formats.

    For EPUB: source_markup has <g>/<ph> placeholders, block is lxml Element.
    For PDF/Markdown: source_markup == source_text, placeholders is empty, block is None.
    """
    segment_id: str
    file_path: str
    block_index: int
    source_markup: str
    source_text: str
    placeholders: dict[str, Any]
    block: Any | None = None
    translated_markup: str | None = None
    review_markup: str | None = None


@dataclass
class BatchResult:
    provider: str
    model: str
    reviewed: bool
    retries: int
    segments: list[Segment]
    provider_calls: int = 0
    review_calls: int = 0
    retry_details: list[str] = field(default_factory=list)


# ---------------------------------------------------------------------------
# Thread-safe logging
# ---------------------------------------------------------------------------

_print_lock = threading.Lock()


def log(msg: str) -> None:
    import sys
    with _print_lock:
        print(msg, file=sys.stderr, flush=True)


# ---------------------------------------------------------------------------
# Batching
# ---------------------------------------------------------------------------


def batch_segments(segments: list[Segment], char_limit: int) -> list[list[Segment]]:
    batches: list[list[Segment]] = []
    current: list[Segment] = []
    current_chars = 0
    for seg in segments:
        seg_size = max(len(seg.source_text), len(seg.source_markup))
        if current and current_chars + seg_size > char_limit:
            batches.append(current)
            current = []
            current_chars = 0
        current.append(seg)
        current_chars += seg_size
    if current:
        batches.append(current)
    return batches


def surrounding_context(segments: list[Segment], batch: list[Segment]) -> tuple[str, str]:
    first = segments.index(batch[0])
    last = segments.index(batch[-1])
    before = " ".join(seg.source_text for seg in segments[max(0, first - 6):first])
    after = " ".join(seg.source_text for seg in segments[last + 1:last + 7])
    return before[-1200:], after[:1200]


# ---------------------------------------------------------------------------
# Prompt construction
# ---------------------------------------------------------------------------


def pretty_json(obj: Any) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2)


def build_translation_prompt(
    *,
    target_lang: str,
    style_guide: str,
    glossary: dict[str, str],
    batch: list[Segment],
    before_context: str,
    after_context: str,
    has_markup: bool,
) -> str:
    system = MARKUP_SYSTEM_PROMPT if has_markup else PLAIN_SYSTEM_PROMPT
    payload = {
        "translations": [
            {"id": seg.segment_id, "source": seg.source_markup}
            for seg in batch
        ]
    }
    glossary_lines = "\n".join(f"- {src} => {dst}" for src, dst in glossary.items()) or "- none"
    return "\n".join([
        system.strip(),
        "",
        f"Target language: {target_lang}",
        "",
        "House style:",
        style_guide.strip(),
        "",
        "Glossary decisions:",
        glossary_lines,
        "",
        "Immediate previous context:",
        before_context or "(none)",
        "",
        "Immediate following context:",
        after_context or "(none)",
        "",
        "Return only this JSON shape:",
        '{"translations":[{"id":"...","content":"..."}]}',
        "",
        "Payload:",
        pretty_json(payload),
    ])


def build_review_prompt(
    *,
    target_lang: str,
    style_guide: str,
    glossary: dict[str, str],
    batch: list[Segment],
    before_context: str,
    after_context: str,
    has_markup: bool,
) -> str:
    system = MARKUP_SYSTEM_PROMPT if has_markup else PLAIN_SYSTEM_PROMPT
    payload = {
        "translations": [
            {
                "id": seg.segment_id,
                "source": seg.source_markup,
                "draft": seg.translated_markup,
            }
            for seg in batch
        ]
    }
    glossary_lines = "\n".join(f"- {src} => {dst}" for src, dst in glossary.items()) or "- none"
    return "\n".join([
        system.strip(),
        "",
        f"This is a second-pass review for {target_lang}.",
        "Improve the draft where needed for fidelity, nuance, rhythm, and publication quality.",
        "If a draft line is already strong, keep it stable rather than rewriting gratuitously.",
        "",
        "House style:",
        style_guide.strip(),
        "",
        "Glossary decisions:",
        glossary_lines,
        "",
        "Immediate previous context:",
        before_context or "(none)",
        "",
        "Immediate following context:",
        after_context or "(none)",
        "",
        "Return only this JSON shape:",
        '{"translations":[{"id":"...","content":"..."}]}',
        "",
        "Payload:",
        pretty_json(payload),
    ])


# ---------------------------------------------------------------------------
# JSON extraction & validation
# ---------------------------------------------------------------------------


def extract_json(text: str) -> dict[str, Any]:
    stripped = text.strip()
    if stripped.startswith("```"):
        stripped = re.sub(r"^```(?:json)?\s*", "", stripped)
        stripped = re.sub(r"\s*```$", "", stripped)
    try:
        return json.loads(stripped)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}\s*$", stripped, re.S)
        if not match:
            raise
        return json.loads(match.group(0))


def local_name(tag: str | None) -> str:
    if not tag:
        return ""
    if tag.startswith("{"):
        return tag.split("}", 1)[1]
    return tag


def validate_fragment(markup: str, placeholders: dict[str, Any]) -> None:
    """Validate translated markup preserves all placeholders.

    No-op when placeholders is empty (PDF/Markdown mode).
    """
    if not placeholders:
        return
    wrapper = etree.fromstring(f"<root>{markup}</root>".encode("utf-8"))
    counts: dict[str, int] = {key: 0 for key in placeholders}
    for node in wrapper.iter():
        if node is wrapper:
            continue
        tag_name = local_name(node.tag)
        if tag_name not in {"g", "ph"}:
            raise TranslationError(f"Unexpected tag '{tag_name}' in translated fragment.")
        token_id = node.attrib.get("id")
        if token_id not in placeholders:
            raise TranslationError(f"Unknown placeholder id '{token_id}'.")
        expected_kind = placeholders[token_id].kind
        if tag_name != expected_kind:
            raise TranslationError(
                f"Placeholder id '{token_id}' changed kind from {expected_kind} to {tag_name}."
            )
        counts[token_id] += 1
    missing = [token for token, seen in counts.items() if seen != 1]
    if missing:
        raise TranslationError(f"Placeholder count mismatch for ids: {', '.join(missing)}")


# ---------------------------------------------------------------------------
# Core translation
# ---------------------------------------------------------------------------


def translate_batch(
    *,
    batch: list[Segment],
    all_segments: list[Segment],
    provider: str,
    models: list[str],
    target_lang: str,
    source_lang: str | None,
    style_guide: str,
    glossary: dict[str, str],
    secret: Any,
    timeout: int,
    max_retries: int,
    review_pass: bool,
    has_markup: bool,
    log_fn: Callable[[str], None] = log,
) -> BatchResult:
    # Lazy import to avoid circular deps at module level
    from providers import call_provider

    before_context, after_context = surrounding_context(all_segments, batch)
    prompt = build_translation_prompt(
        target_lang=target_lang, style_guide=style_guide, glossary=glossary,
        batch=batch, before_context=before_context, after_context=after_context,
        has_markup=has_markup,
    )

    last_error: Exception | None = None
    used_model = models[0]
    provider_calls = 0
    review_calls = 0
    retry_details: list[str] = []

    for model in models:
        used_model = model
        for attempt in range(max_retries + 1):
            provider_calls += 1
            try:
                raw = call_provider(provider, prompt, model, secret, timeout)
                payload = extract_json(raw)
                translations = payload.get("translations")
                if not isinstance(translations, list):
                    raise TranslationError("Output missing 'translations' list.")
                content_by_id = {
                    str(item["id"]): str(item["content"])
                    for item in translations
                }
                if set(content_by_id) != {seg.segment_id for seg in batch}:
                    raise TranslationError("Segment ids in response do not match the request.")
                for seg in batch:
                    validate_fragment(content_by_id[seg.segment_id], seg.placeholders)
                    seg.translated_markup = content_by_id[seg.segment_id]
                last_error = None
                break
            except Exception as exc:
                last_error = exc
                detail = (
                    f"{provider}/{model} attempt {attempt + 1}/{max_retries + 1}: "
                    f"{type(exc).__name__}: {str(exc)[:200]}"
                )
                retry_details.append(detail)
                log_fn(f"    retry — {detail}")
        if last_error is None:
            break
    if last_error is not None:
        raise TranslationError(str(last_error))

    reviewed = False
    if review_pass:
        review = build_review_prompt(
            target_lang=target_lang, style_guide=style_guide, glossary=glossary,
            batch=batch, before_context=before_context, after_context=after_context,
            has_markup=has_markup,
        )
        for model in models:
            try:
                review_calls += 1
                raw = call_provider(provider, review, model, secret, timeout)
                payload = extract_json(raw)
                translations = payload.get("translations")
                if not isinstance(translations, list):
                    raise TranslationError("Review output missing 'translations' list.")
                content_by_id = {
                    str(item["id"]): str(item["content"])
                    for item in translations
                }
                if set(content_by_id) != {seg.segment_id for seg in batch}:
                    raise TranslationError("Review segment ids do not match the request.")
                for seg in batch:
                    validate_fragment(content_by_id[seg.segment_id], seg.placeholders)
                    seg.review_markup = content_by_id[seg.segment_id]
                reviewed = True
                break
            except Exception as exc:
                detail = f"review {provider}/{model}: {type(exc).__name__}: {str(exc)[:200]}"
                retry_details.append(detail)
                log_fn(f"    review fallback — {detail}")
                continue

    return BatchResult(
        provider=provider,
        model=used_model,
        reviewed=reviewed,
        retries=len(retry_details),
        segments=batch,
        provider_calls=provider_calls,
        review_calls=review_calls,
        retry_details=retry_details,
    )


def translate_file_segments(
    *,
    file_path: str,
    segments: list[Segment],
    file_index: int,
    total_files: int,
    provider: str,
    models: list[str],
    target_lang: str,
    source_lang: str | None,
    style_guide: str,
    glossary: dict[str, str],
    secret: Any,
    timeout: int,
    batch_char_limit: int,
    max_retries: int,
    review_pass: bool,
    has_markup: bool,
    apply_fn: Callable[[Segment, str], None] | None = None,
) -> list[BatchResult]:
    """Translate all segments for a single file/document.

    Args:
        apply_fn: Optional callback to apply translated markup back to the
                  document structure (e.g. EPUB XML reconstruction). Called
                  with (segment, final_markup) for each segment after translation.

    Returns list of BatchResult.
    """
    width = len(str(total_files))
    prefix = f"[{file_index:>{width}}/{total_files}]"

    batches = batch_segments(segments, batch_char_limit)
    log(f"{prefix} {file_path} ({len(segments)} segments, {len(batches)} batches)")

    def _log_fn(msg: str, _p: str = prefix) -> None:
        log(f"{_p} {msg}")

    results: list[BatchResult] = []
    for bi, batch in enumerate(batches, 1):
        result = translate_batch(
            batch=batch,
            all_segments=segments,
            provider=provider,
            models=models,
            target_lang=target_lang,
            source_lang=source_lang,
            style_guide=style_guide,
            glossary=glossary,
            secret=secret,
            timeout=timeout,
            max_retries=max_retries,
            review_pass=review_pass,
            has_markup=has_markup,
            log_fn=_log_fn,
        )
        results.append(result)

        # Apply translations back to document structure
        if apply_fn:
            for seg in batch:
                final = seg.review_markup or seg.translated_markup
                if final:
                    apply_fn(seg, final)

        model_info = f"{result.provider}/{result.model}" + (" + review" if result.reviewed else "")
        log(f"{prefix}   batch {bi}/{len(batches)} — {model_info}")

    seg_count = sum(len(r.segments) for r in results)
    log(f"{prefix} done — {seg_count} segments")
    return results
