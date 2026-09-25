"""EPUB format handler — preserves full EPUB structure during translation."""
from __future__ import annotations

import concurrent.futures
import sys
from pathlib import Path
from zipfile import ZipFile

from lxml import etree

# Add parent scripts dir to path for sibling imports
_SCRIPTS = Path(__file__).resolve().parent.parent
if str(_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS))

from engine import Segment, log, translate_file_segments
from epub_core import (
    apply_translated_markup,
    get_spine_documents,
    iter_segments_for_tree,
    read_container_opf,
    write_epub,
)
from formats import TranslationConfig
from progress import ProgressTracker, compute_config_hash
from report import RunStats, markdown_report, sample_segments_for_report


class EpubHandler:
    def run(self, config: TranslationConfig) -> int:
        input_epub = config.input_file.resolve()
        output_epub = config.output_file.resolve()
        qa_report_path = config.qa_report_path.resolve()

        models = [config.model]
        if config.fallback_model and config.fallback_model != config.model:
            models.append(config.fallback_model)

        # --- Progress tracking (disabled for sample mode) ---
        config_hash = compute_config_hash(
            config.provider, config.model, config.fallback_model or "",
            config.target_lang, config.style_guide, config.glossary,
        )
        progress_dir = output_epub.parent / (output_epub.stem + ".progress")
        progress = ProgressTracker(progress_dir, config_hash)

        if config.clean and progress_dir.exists():
            import shutil
            shutil.rmtree(progress_dir)
            log("Cleaned previous progress.")

        has_cache = False
        if not config.sample_blocks and progress.load():
            has_cache = True
            log(f"Resuming: {len(progress.completed)} files already translated.")

        # --- Phase 1: Read all files from EPUB ---
        xml_parser = etree.XMLParser(remove_blank_text=False, recover=True)
        stats = RunStats()
        sequence = 1
        file_tasks: list[tuple[str, etree._Element, list[Segment]]] = []

        with ZipFile(input_epub, "r") as zf:
            opf_path = read_container_opf(zf)
            content_docs = get_spine_documents(zf, opf_path)
            if config.only_file:
                needles = [n for n in config.only_file if n]
                content_docs = [
                    p for p in content_docs
                    if any(n in p for n in needles)
                ]
            for file_path in content_docs:
                stats.files_seen += 1
                raw = zf.read(file_path)
                root = etree.fromstring(raw, xml_parser)
                segments, sequence = iter_segments_for_tree(file_path, root, sequence)
                stats.segments_seen += len(segments)
                file_tasks.append((file_path, root, segments))

        total_translatable = sum(1 for _, _, segs in file_tasks if segs)
        log(f"{stats.files_seen} files, {stats.segments_seen} segments, {total_translatable} translatable")

        updated_files: dict[str, bytes] = {}

        # --- Phase 2: Load cached files ---
        if has_cache:
            cached_count = 0
            for file_path, _root, segments in file_tasks:
                if not segments:
                    continue
                if progress.is_completed(file_path):
                    updated_files[file_path] = progress.load_file(file_path)
                    stats.files_translated += 1
                    stats.files_cached += 1
                    stats.segments_translated += len(segments)
                    cached_count += 1
            if cached_count:
                log(f"Loaded {cached_count} cached files ({stats.segments_translated} segments)")

        # --- Phase 3: Translate remaining files ---
        to_translate = [
            (fp, root, segs)
            for fp, root, segs in file_tasks
            if segs and fp not in updated_files
        ]

        if config.sample_blocks:
            # Sample mode: sequential, limited blocks, no progress saving
            translated_so_far = 0
            for file_path, root, segments in to_translate:
                if translated_so_far >= config.sample_blocks:
                    break
                remaining = config.sample_blocks - translated_so_far
                segments = segments[:remaining]
                if not segments:
                    continue

                results = translate_file_segments(
                    file_path=file_path,
                    segments=segments,
                    file_index=stats.files_translated + 1,
                    total_files=total_translatable,
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
                    has_markup=True,
                    apply_fn=apply_translated_markup,
                )
                translated_bytes = etree.tostring(root, encoding="utf-8", xml_declaration=True)
                updated_files[file_path] = translated_bytes
                for r in results:
                    stats.absorb_batch(r)
                stats.files_translated += 1
                translated_so_far += sum(len(r.segments) for r in results)
        else:
            # Full mode: parallel file processing
            concurrency = max(config.concurrency, 1)
            file_index_start = stats.files_cached + 1

            if concurrency > 1 and len(to_translate) > 1:
                log(f"Translating {len(to_translate)} files with concurrency={concurrency}")

            def _do_file(file_path: str, root: etree._Element, segments: list[Segment], idx: int) -> tuple[str, bytes, list]:
                results = translate_file_segments(
                    file_path=file_path,
                    segments=segments,
                    file_index=idx,
                    total_files=total_translatable,
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
                    has_markup=True,
                    apply_fn=apply_translated_markup,
                )
                translated_bytes = etree.tostring(root, encoding="utf-8", xml_declaration=True)
                return file_path, translated_bytes, results

            with concurrent.futures.ThreadPoolExecutor(max_workers=concurrency) as executor:
                futures: dict[concurrent.futures.Future, str] = {}
                for i, (file_path, root, segments) in enumerate(to_translate):
                    future = executor.submit(
                        _do_file, file_path, root, segments, file_index_start + i
                    )
                    futures[future] = file_path

                for future in concurrent.futures.as_completed(futures):
                    file_path, translated_bytes, results = future.result()
                    updated_files[file_path] = translated_bytes
                    progress.mark_completed(file_path, translated_bytes)
                    for r in results:
                        stats.absorb_batch(r)
                    stats.files_translated += 1

        if not updated_files:
            log("No translatable EPUB blocks were found.")
            return 1

        # --- Write EPUB ---
        output_epub.parent.mkdir(parents=True, exist_ok=True)
        write_epub(output_epub, input_epub, updated_files)

        # --- QA report ---
        all_translated_segments = [seg for r in stats.batch_results for seg in r.segments]
        if config.sample_blocks:
            report_segments = all_translated_segments[:6]
        else:
            report_segments = sample_segments_for_report(all_translated_segments)

        report = markdown_report(
            input_file=input_epub,
            output_file=output_epub,
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

        # --- Cleanup progress on success ---
        progress.cleanup()

        print(f"Wrote EPUB: {output_epub}")
        print(f"Wrote QA report: {qa_report_path}")
        return 0
