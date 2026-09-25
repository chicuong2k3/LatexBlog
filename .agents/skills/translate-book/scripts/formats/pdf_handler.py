"""PDF format handler — extracts text, translates, outputs Markdown."""
from __future__ import annotations

import sys
from pathlib import Path

_SCRIPTS = Path(__file__).resolve().parent.parent
if str(_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS))

from engine import Segment, log, translate_file_segments
from formats import TranslationConfig
from report import RunStats, markdown_report, sample_segments_for_report


def _extract_pages(pdf_path: Path) -> list[list[str]]:
    """Extract text blocks per page using pdfplumber."""
    import pdfplumber  # optional dep, checked at runtime

    pages: list[list[str]] = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            blocks = [b.strip() for b in text.split("\n\n") if b.strip()]
            pages.append(blocks)
    return pages


class PdfHandler:
    def run(self, config: TranslationConfig) -> int:
        # Check dependency
        try:
            import pdfplumber  # noqa: F401
        except ImportError:
            log("PDF support requires pdfplumber. Install with: pip install pdfplumber")
            return 1

        input_pdf = config.input_file.resolve()
        output_md = config.output_file.resolve()
        qa_report_path = config.qa_report_path.resolve()

        models = [config.model]
        if config.fallback_model and config.fallback_model != config.model:
            models.append(config.fallback_model)

        # --- Extract pages ---
        log(f"Extracting text from {input_pdf.name}...")
        pages = _extract_pages(input_pdf)
        if not pages or not any(pages):
            log("No text found in PDF.")
            return 1

        # --- Build segments ---
        stats = RunStats()
        stats.files_seen = 1
        segments: list[Segment] = []
        seq = 1
        for page_idx, blocks in enumerate(pages, 1):
            for block_idx, text in enumerate(blocks, 1):
                if not text or len(text) < 3:
                    continue
                segments.append(Segment(
                    segment_id=f"s{seq:05d}",
                    file_path=f"page_{page_idx}",
                    block_index=block_idx,
                    source_markup=text,
                    source_text=text,
                    placeholders={},
                    block=None,
                ))
                seq += 1
        stats.segments_seen = len(segments)

        if not segments:
            log("No translatable text found in PDF.")
            return 1

        # Apply sample limit
        if config.sample_blocks:
            segments = segments[:config.sample_blocks]

        log(f"{len(pages)} pages, {stats.segments_seen} blocks, translating {len(segments)}")

        # --- Translate ---
        results = translate_file_segments(
            file_path=input_pdf.name,
            segments=segments,
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

        # --- Write Markdown output ---
        lines: list[str] = []
        current_page = ""
        for seg in segments:
            translated = seg.review_markup or seg.translated_markup or seg.source_text
            if seg.file_path != current_page:
                current_page = seg.file_path
                page_num = current_page.replace("page_", "")
                if lines:
                    lines.append("")
                    lines.append("---")
                    lines.append("")
                lines.append(f"## Page {page_num}")
                lines.append("")
            lines.append(translated)
            lines.append("")

        output_md.parent.mkdir(parents=True, exist_ok=True)
        output_md.write_text("\n".join(lines), encoding="utf-8")

        # --- QA report ---
        all_segments = [seg for r in stats.batch_results for seg in r.segments]
        report_segments = sample_segments_for_report(all_segments) if not config.sample_blocks else all_segments[:6]
        report = markdown_report(
            input_file=input_pdf,
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
