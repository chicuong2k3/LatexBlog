"""Locate chapter openings in the paged Euler 1755 OCR.

A chapter in this book always starts a fresh page with a centred heading, so a
genuine opening is one of the first few OCR lines of a page.  A looser match
picks up cross-references in the prose ("ut Caput X") and the book's own table
of contents, which repeats every chapter title; both are excluded by requiring
the heading to sit at the very top of a page.

The reported page is a candidate, not a verdict: every boundary is confirmed
against the scan before any translation is written.

Usage:
    python tools/euler_locate_chapters.py OCR_FILE [--show N]
"""

from __future__ import annotations

import argparse
import io
import re
import sys

PAGE_MARK = re.compile(r"^<<<PDF p(\d{4})>>>$")
ROMAN_VALUES = [
    "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII",
    "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
]
ROMAN_ALT = "|".join(ROMAN_VALUES)
# "CAPUT III" alone on its line, or followed by the chapter title.
HEADING = re.compile(
    rf"^\s*C[AU]P[UV]T\s+({ROMAN_ALT})\s*\.?\s*$", re.IGNORECASE
)
HEADING_WITH_TITLE = re.compile(
    rf"^\s*C[AU]P[UV]T\s+({ROMAN_ALT})\s*\.?\s+\S", re.IGNORECASE
)
TOP_LINES = 6


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("ocr")
    parser.add_argument("--show", type=int, default=0,
                        help="print N OCR lines of context per hit")
    args = parser.parse_args()

    pages: dict[int, list[str]] = {}
    page = 0
    for raw in io.open(args.ocr, encoding="utf-8").read().splitlines():
        mark = PAGE_MARK.match(raw.strip())
        if mark:
            page = int(mark.group(1))
            pages.setdefault(page, [])
            continue
        if page:
            pages.setdefault(page, []).append(raw)

    hits: list[tuple[int, str]] = []
    for number, lines in pages.items():
        for line in lines[:TOP_LINES]:
            stripped = line.strip()
            match = HEADING.match(stripped) or HEADING_WITH_TITLE.match(stripped)
            if match:
                hits.append((number, match.group(1).upper()))
                break

    print(f"{'PDF':>5}  {'CH':>5}  first line(s) of the page")
    print("-" * 100)
    for number, numeral in hits:
        head = next((l.strip() for l in pages[number][:TOP_LINES] if l.strip()), "")
        print(f"{number:>5}  {numeral:>5}  {head[:70]}")
        if args.show:
            for line in pages[number][1 : 1 + args.show]:
                if line.strip():
                    print(f"{'':>5}       | {line.strip()[:70]}")
            print()

    print()
    print(f"total chapter openings: {len(hits)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
