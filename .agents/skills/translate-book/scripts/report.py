"""QA report generation for all formats."""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

from engine import BatchResult, Segment


@dataclass
class RunStats:
    files_seen: int = 0
    files_translated: int = 0
    files_cached: int = 0
    segments_seen: int = 0
    segments_translated: int = 0
    provider_calls: int = 0
    review_calls: int = 0
    retries: int = 0
    retry_details: list[str] = field(default_factory=list)
    batch_results: list[BatchResult] = field(default_factory=list)

    def absorb_batch(self, result: BatchResult) -> None:
        self.batch_results.append(result)
        self.segments_translated += len(result.segments)
        self.provider_calls += result.provider_calls
        self.review_calls += result.review_calls
        self.retries += result.retries
        self.retry_details.extend(result.retry_details)


def sample_segments_for_report(all_segments: list[Segment], count: int = 6) -> list[Segment]:
    """Sample segments from across the book, preferring longer substantive text."""
    if len(all_segments) <= count:
        return list(all_segments)
    n = len(all_segments)
    third = n // 3
    buckets = [
        all_segments[:third],
        all_segments[third:2 * third],
        all_segments[2 * third:],
    ]
    per_bucket = max(count // 3, 1)
    sampled: list[Segment] = []
    for bucket in buckets:
        by_len = sorted(bucket, key=lambda s: len(s.source_text), reverse=True)
        sampled.extend(by_len[:per_bucket])
    sampled.sort(key=lambda s: s.segment_id)
    return sampled[:count]


def markdown_report(
    *,
    input_file: Path,
    output_file: Path,
    target_lang: str,
    provider: str,
    model: str,
    style_guide: str,
    glossary: dict[str, str],
    stats: RunStats,
    sample_blocks: int,
    segments_for_report: list[Segment],
) -> str:
    lines = [
        "# Translation QA Report",
        "",
        f"- Input: `{input_file}`",
        f"- Output: `{output_file}`",
        f"- Target language: `{target_lang}`",
        f"- Provider: `{provider}`",
        f"- Model: `{model}`",
        f"- Mode: `{sample_blocks or 'full run'}`",
        f"- Files seen: `{stats.files_seen}`",
        f"- Files translated: `{stats.files_translated}`",
    ]
    if stats.files_cached:
        lines.append(f"- Files cached (resumed): `{stats.files_cached}`")
    lines.extend([
        f"- Segments seen: `{stats.segments_seen}`",
        f"- Segments translated: `{stats.segments_translated}`",
        f"- Provider calls: `{stats.provider_calls}`",
        f"- Review calls: `{stats.review_calls}`",
        f"- Retry events: `{stats.retries}`",
    ])

    # Models used
    counts: dict[str, int] = {}
    for result in stats.batch_results:
        key = f"{result.provider}/{result.model}"
        counts[key] = counts.get(key, 0) + 1
    if counts:
        lines.extend(["", "## Models used", ""])
        for key, count in counts.items():
            lines.append(f"- `{key}`: {count} batch(es)")

    # Glossary
    lines.extend(["", "## Glossary", ""])
    if glossary:
        for src, dst in glossary.items():
            lines.append(f"- `{src}` => `{dst}`")
    else:
        lines.append("- none")

    # House style
    lines.extend(["", "## House style", "", "```text", style_guide.strip(), "```"])

    # Retry details
    if stats.retry_details:
        lines.extend(["", "## Retry details", ""])
        for detail in stats.retry_details:
            lines.append(f"- {detail}")

    # Sample segments
    lines.extend(["", "## Sample segments", ""])
    for seg in segments_for_report:
        translated = seg.review_markup or seg.translated_markup or ""
        lines.extend([
            f"### {seg.segment_id} · `{seg.file_path}` · block {seg.block_index}",
            "",
            "**Source text**",
            "",
            "```text",
            seg.source_text,
            "```",
            "",
            "**Translated**",
            "",
            "```",
            translated,
            "```",
            "",
        ])
    return "\n".join(lines).strip() + "\n"
