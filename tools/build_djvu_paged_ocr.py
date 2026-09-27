"""Build a page-aligned OCR working file for Euler, Institutiones calculi
differentialis (Petropolis 1755), from the Internet Archive djvu.xml.

The raw ``_djvu.txt`` on archive.org has proper word spacing but no page
boundaries, so it cannot be cited by page.  The djvu.xml has both.  This script
parses the XML, restores word/line structure, and writes one normalised text
file with explicit page delimiters, plus a folio map that ties each PDF page to
its printed page number.

Usage:
    python books/tools/build_euler_ocr.py <path-to-djvu.xml> <out-dir>
"""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path
from xml.etree import ElementTree as ET

# Google Books boilerplate that appears on nearly every scan and is not part of
# the printed book.  Stripped so the working text is readable.
BOILERPLATE = re.compile(
    r"(Digitized\s+by\s+Goog\w*|Bayer\s*Staatsbibliothek|<\d{15,})",
    re.IGNORECASE,
)

# A folio in a running head: a bare token that is either a decimal number or a
# lowercase/uppercase roman numeral standing alone on a line.
ROMAN = re.compile(r"^[ivxlIVXL]{1,7}$")
NUMERIC = re.compile(r"^\d{1,4}$")


def normalise(text: str) -> str:
    """Normalise OCR ligature damage without inventing content.

    The scan renders long s as ``f`` and ``ſt`` as ``ft``, so ``fummere`` is
    really ``sumere`` and ``fperanda`` is ``speranda``.  We cannot repair that
    mechanically, but we can fold the ligature characters the OCR emits into
    their ASCII counterparts and drop the replacement character the decoder
    leaves behind, so the text is at least consistent to read.
    """
    text = text.replace("ſ", "s")
    text = unicodedata.normalize("NFC", text)
    text = text.replace("\ufffd", "")
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def page_lines(obj: ET.Element) -> list[str]:
    """Return the text of one <OBJECT> (one scan page) as a list of lines."""
    lines: list[str] = []
    for line in obj.iter("LINE"):
        words = [w.text or "" for w in line.iter("WORD")]
        joined = normalise(" ".join(w for w in words if w.strip()))
        if joined:
            lines.append(joined)
    return lines


def detect_folio(lines: list[str]) -> str | None:
    """Guess the printed page number from a running head.

    18th-century running heads put the book/chapter title on one side of the
    folio line and the page number on the other, so the folio is a short token
    standing alone near the top of the page.  We only accept a match in the
    first three lines, which is where the head sits.
    """
    for line in lines[:3]:
        tokens = line.split()
        if len(tokens) != 1:
            continue
        token = tokens[0].strip(".,|-")
        if NUMERIC.match(token) or ROMAN.match(token):
            return token
    return None


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    src = Path(sys.argv[1])
    out_dir = Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    tree = ET.parse(src)
    root = tree.getroot()
    objects = list(root.iter("OBJECT"))

    pages: list[dict] = []
    for index, obj in enumerate(objects, start=1):
        lines = page_lines(obj)
        cleaned = [BOILERPLATE.sub("", line).strip() for line in lines]
        cleaned = [line for line in cleaned if line]
        pages.append(
            {
                "pdf": index,
                "folio_guess": detect_folio(cleaned),
                "lines": cleaned,
            }
        )

    ocr_path = out_dir / "euler-1755-ocr-paged.txt"
    with ocr_path.open("w", encoding="utf-8", newline="\n") as handle:
        handle.write(
            "# Leonhard Euler, Institutiones calculi differentialis, Petropolis 1755\n"
            "# Page-aligned OCR working text.  Delimiters are PDF page numbers of\n"
            "# the Internet Archive scan (bub_gb_sYE_AAAAcAAJ.pdf, 934 pages).\n"
            "# OCR IS A WORKING AID ONLY -- every page must be checked against the scan.\n"
        )
        for page in pages:
            handle.write(f"\n<<<PDF p{page['pdf']:04d}>>>\n")
            handle.write("\n".join(page["lines"]))
            handle.write("\n")

    map_path = out_dir / "euler-1755-folio-map.json"
    map_path.write_text(
        json.dumps(
            {
                "pdf_pages": len(pages),
                "pages": [
                    {"pdf": p["pdf"], "folio_guess": p["folio_guess"]} for p in pages
                ],
            },
            ensure_ascii=False,
            indent=1,
        ),
        encoding="utf-8",
    )

    print(f"pages parsed : {len(pages)}")
    print(f"ocr written  : {ocr_path}")
    print(f"folio map    : {map_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
