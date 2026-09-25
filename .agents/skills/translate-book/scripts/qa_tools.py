#!/usr/bin/env python3
"""QA scan and glossary extraction tools.

Usage:
  python3 qa_tools.py scan SOURCE.epub TRANSLATED.epub [--glossary-file g.json] [--strict-coverage]
  python3 qa_tools.py glossary SOURCE.epub [--min-count 2] [--top 200]
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path
from zipfile import ZipFile

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from lxml import etree

from epub_core import (
    BLOCK_TAGS,
    collect_leaf_blocks,
    get_spine_documents,
    iter_non_note_text,
    local_name,
    normalize_glossary_mapping,
    normalize_whitespace,
    read_container_opf,
)

# ---------------------------------------------------------------------------
# QA scan
# ---------------------------------------------------------------------------

MOJIBAKE_MARKERS = re.compile(r"[Ã¢â€ï»¿Â]|\ufffd")
HIGH_LATIN_THRESHOLD = 0.7


def _extract_block_texts(epub_path: Path) -> list[tuple[str, str]]:
    """Return (file_path, block_text) for every leaf block in an EPUB."""
    parser = etree.XMLParser(remove_blank_text=False, recover=True)
    rows: list[tuple[str, str]] = []
    with ZipFile(epub_path, "r") as zf:
        opf = read_container_opf(zf)
        docs = get_spine_documents(zf, opf)
        for doc in docs:
            root = etree.fromstring(zf.read(doc), parser)
            for block in collect_leaf_blocks(root):
                text = normalize_whitespace("".join(iter_non_note_text(block)))
                if text:
                    rows.append((doc, text))
    return rows


def _latin_ratio(text: str) -> float:
    if not text:
        return 0.0
    latin = sum(1 for c in text if c.isascii() and c.isalpha())
    total = sum(1 for c in text if not c.isspace())
    return latin / total if total else 0.0


def run_qa_scan(args: argparse.Namespace) -> int:
    source_rows = _extract_block_texts(Path(args.source_epub))
    target_rows = _extract_block_texts(Path(args.translated_epub))

    glossary: dict[str, str] = {}
    if args.glossary_file:
        raw = json.loads(Path(args.glossary_file).read_text(encoding="utf-8"))
        glossary = normalize_glossary_mapping(raw)

    findings: list[str] = []
    weird_count = 0
    unchanged_count = 0
    high_latin_count = 0
    glossary_miss_count = 0

    # Check target blocks
    for file_path, text in target_rows:
        if MOJIBAKE_MARKERS.search(text):
            findings.append(f"MOJIBAKE `{file_path}`: {text[:120]}")
            weird_count += 1
        if _latin_ratio(text) > HIGH_LATIN_THRESHOLD and len(text) > 20:
            findings.append(f"HIGH_LATIN `{file_path}`: {text[:120]}")
            high_latin_count += 1

    # Check for unchanged blocks (strict mode)
    if args.strict_coverage and len(source_rows) == len(target_rows):
        for (sf, st), (tf, tt) in zip(source_rows, target_rows):
            if st == tt and len(st) > 10:
                findings.append(f"UNCHANGED `{sf}`: {st[:120]}")
                unchanged_count += 1

    # Glossary consistency check
    if glossary:
        for file_path, text in target_rows:
            for src_term, tgt_term in glossary.items():
                if src_term.lower() in text.lower() and tgt_term not in text:
                    findings.append(f"GLOSSARY_MISS `{file_path}`: expected '{tgt_term}' for '{src_term}' in: {text[:100]}")
                    glossary_miss_count += 1

    # Build report
    lines = [
        "# QA Scan Report",
        "",
        f"- Source: `{args.source_epub}`",
        f"- Translated: `{args.translated_epub}`",
        f"- Source blocks: `{len(source_rows)}`",
        f"- Translated blocks: `{len(target_rows)}`",
        f"- Mojibake/weird: `{weird_count}`",
        f"- High Latin residue: `{high_latin_count}`",
        f"- Unchanged blocks: `{unchanged_count}`",
        f"- Glossary misses: `{glossary_miss_count}`",
        f"- Total findings: `{len(findings)}`",
        "",
    ]

    if findings:
        lines.extend(["## Findings", ""])
        for f in findings[:100]:
            lines.append(f"- {f}")
        if len(findings) > 100:
            lines.append(f"\n... and {len(findings) - 100} more")

    # Sample comparisons
    lines.extend(["", "## Sample comparisons", ""])
    sample_indices = [0, len(source_rows) // 4, len(source_rows) // 2, 3 * len(source_rows) // 4, len(source_rows) - 1]
    for idx in sample_indices:
        if 0 <= idx < len(source_rows) and idx < len(target_rows):
            sf, st = source_rows[idx]
            _tf, tt = target_rows[idx]
            lines.extend([
                f"### Block {idx + 1} · `{sf}`",
                "",
                f"**Source:** {st[:300]}",
                "",
                f"**Target:** {tt[:300]}",
                "",
            ])

    report_path = Path(args.translated_epub).with_suffix(".scan.md")
    report_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote scan report: {report_path}")
    return 0


# ---------------------------------------------------------------------------
# Glossary extraction
# ---------------------------------------------------------------------------

CAPITALIZED_PHRASE = re.compile(r"\b(?:[A-Z][a-z]+(?:\s+(?:of|the|and|in|for|on|at|to|&|de|von|van)\s+)?)+(?:[A-Z][a-z]+)\b")


def run_glossary_extract(args: argparse.Namespace) -> int:
    rows = _extract_block_texts(Path(args.source_epub))
    counter: Counter[str] = Counter()
    for _file_path, text in rows:
        for match in CAPITALIZED_PHRASE.finditer(text):
            phrase = match.group(0).strip()
            if len(phrase) >= 3 and not phrase.isdigit():
                counter[phrase] += 1

    min_count = args.min_count
    top = args.top
    candidates = [
        {"source": phrase, "count": count, "target": ""}
        for phrase, count in counter.most_common()
        if count >= min_count
    ][:top]

    output_path = Path(args.source_epub).with_suffix(".glossary_candidates.json")
    output_path.write_text(json.dumps(candidates, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(candidates)} candidates to: {output_path}")
    return 0


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="QA tools for translate-book")
    sub = parser.add_subparsers(dest="command")

    scan_p = sub.add_parser("scan", help="Scan translated EPUB for issues")
    scan_p.add_argument("source_epub", help="Original EPUB")
    scan_p.add_argument("translated_epub", help="Translated EPUB")
    scan_p.add_argument("--glossary-file", help="Glossary JSON for consistency check")
    scan_p.add_argument("--strict-coverage", action="store_true", help="Flag unchanged blocks")

    gloss_p = sub.add_parser("glossary", help="Extract glossary candidates from EPUB")
    gloss_p.add_argument("source_epub", help="Source EPUB")
    gloss_p.add_argument("--min-count", type=int, default=2, help="Minimum occurrences")
    gloss_p.add_argument("--top", type=int, default=200, help="Maximum candidates")

    args = parser.parse_args()
    if args.command == "scan":
        return run_qa_scan(args)
    elif args.command == "glossary":
        return run_glossary_extract(args)
    else:
        parser.print_help()
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
