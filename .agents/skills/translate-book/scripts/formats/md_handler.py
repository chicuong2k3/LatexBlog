"""Markdown format handler — translates in-place, preserves structure."""
from __future__ import annotations

import re
import sys
from pathlib import Path

_SCRIPTS = Path(__file__).resolve().parent.parent
if str(_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS))

from engine import Segment, log, translate_file_segments
from formats import TranslationConfig
from report import RunStats, markdown_report, sample_segments_for_report


def _split_blocks(text: str) -> list[tuple[str, bool]]:
    """Split markdown into (block_text, is_translatable) pairs.

    Preserves code fences, front matter, and blank lines as non-translatable.
    """
    blocks: list[tuple[str, bool]] = []
    lines = text.split("\n")
    i = 0
    current: list[str] = []
    in_fence = False
    in_frontmatter = False

    def flush(translatable: bool) -> None:
        nonlocal current
        if current:
            blocks.append(("\n".join(current), translatable))
            current = []

    while i < len(lines):
        line = lines[i]

        # Front matter (--- at start of file)
        if i == 0 and line.strip() == "---":
            in_frontmatter = True
            current.append(line)
            i += 1
            while i < len(lines):
                current.append(lines[i])
                if lines[i].strip() == "---":
                    i += 1
                    break
                i += 1
            flush(False)
            continue

        # Code fences
        if re.match(r"^```", line):
            flush(True)
            current.append(line)
            i += 1
            while i < len(lines):
                current.append(lines[i])
                if re.match(r"^```", lines[i]):
                    i += 1
                    break
                i += 1
            flush(False)
            continue

        # Blank line = paragraph boundary
        if not line.strip():
            flush(True)
            blocks.append((line, False))
            i += 1
            continue

        # HTML comments
        if line.strip().startswith("<!--"):
            flush(True)
            current.append(line)
            while i < len(lines) and "-->" not in lines[i]:
                i += 1
                if i < len(lines):
                    current.append(lines[i])
            flush(False)
            i += 1
            continue

        # Regular content line
        current.append(line)
        i += 1

    flush(True)
    return blocks


class MdHandler:
    def run(self, config: TranslationConfig) -> int:
        input_md = config.input_file.resolve()
        output_md = config.output_file.resolve()
        qa_report_path = config.qa_report_path.resolve()

        models = [config.model]
        if config.fallback_model and config.fallback_model != config.model:
            models.append(config.fallback_model)

        # --- Read and split ---
        text = input_md.read_text(encoding="utf-8")
        blocks = _split_blocks(text)

        stats = RunStats()
        stats.files_seen = 1

        # --- Build segments from translatable blocks ---
        segments: list[Segment] = []
        block_map: list[int | None] = []  # maps block index -> segment index or None
        seq = 1
        for idx, (block_text, translatable) in enumerate(blocks):
            if translatable and block_text.strip() and len(block_text.strip()) >= 3:
                segments.append(Segment(
                    segment_id=f"s{seq:05d}",
                    file_path=input_md.name,
                    block_index=idx + 1,
                    source_markup=block_text,
                    source_text=block_text,
                    placeholders={},
                    block=None,
                ))
                block_map.append(len(segments) - 1)
                seq += 1
            else:
                block_map.append(None)

        stats.segments_seen = len(segments)
        if not segments:
            log("No translatable text found in Markdown.")
            return 1

        # Apply sample limit
        active_segments = segments
        if config.sample_blocks:
            active_segments = segments[:config.sample_blocks]

        log(f"{len(blocks)} blocks, {len(segments)} translatable, translating {len(active_segments)}")

        # --- Translate ---
        results = translate_file_segments(
            file_path=input_md.name,
            segments=active_segments,
            file_index=1,
            total_files=1,
            provider=config.provider,
            models=models,
            target_lang=config.target_lang,
            source_lang=config.source_lang,
            style_guide=config.style_guide,
            glossary=config.glossary,
            secret=config.secret,
            timeout=config.timeout,
            batch_char_limit=config.batch_char_limit,
            max_retries=config.max_retries,
            review_pass=config.review_pass,
            has_markup=False,
        )
        for r in results:
            stats.absorb_batch(r)
        stats.files_translated = 1

        # --- Reassemble ---
        translated_ids = {seg.segment_id for seg in active_segments}
        seg_by_id = {seg.segment_id: seg for seg in active_segments}

        output_parts: list[str] = []
        for idx, (block_text, translatable) in enumerate(blocks):
            seg_idx = block_map[idx]
            if seg_idx is not None and segments[seg_idx].segment_id in translated_ids:
                seg = seg_by_id.get(segments[seg_idx].segment_id)
                if seg:
                    translated = seg.review_markup or seg.translated_markup
                    if translated:
                        output_parts.append(translated)
                        continue
            output_parts.append(block_text)

        output_md.parent.mkdir(parents=True, exist_ok=True)
        output_md.write_text("\n".join(output_parts), encoding="utf-8")

        # --- QA report ---
        all_segs = [seg for r in stats.batch_results for seg in r.segments]
        report_segments = sample_segments_for_report(all_segs) if not config.sample_blocks else all_segs[:6]
        report = markdown_report(
            input_file=input_md,
            output_file=output_md,
            target_lang=config.target_lang,
            provider=config.provider,
            model=config.model,
            style_guide=config.style_guide,
            glossary=config.glossary,
            stats=stats,
            sample_blocks=config.sample_blocks,
            segments_for_report=report_segments,
        )
        qa_report_path.parent.mkdir(parents=True, exist_ok=True)
        qa_report_path.write_text(report, encoding="utf-8")

        print(f"Wrote Markdown: {output_md}")
        print(f"Wrote QA report: {qa_report_path}")
        return 0
