"""Render a page (or a crop of a page) of the Euler scan to PNG, so a doubtful
formula can be read off the paper instead of guessed at from the OCR.

The ABBYY/Google text layer in this scan is badly damaged precisely where the
mathematics is -- ``ſ`` comes through as ``f`` so *sumere* reads *fummere*, and
superscripts routinely collapse.  Reading the page is the only reliable fix,
and the working text is a page-dense 18th-century setting, so a full page at
screen resolution is not enough either; hence the zoom and crop controls.

Usage:
    python tools/euler_scan.py PDF_FILE PAGE_NUMBER [options]

Options:
    --width PX        render the full page to PX pixels wide (default 1700)
    --zoom N          ignore --width and render at N times the PDF's own scale
    --crop T,L,B,R    crop, in fractions of the page (0..1), before rendering
    --out PATH        output PNG (default: temp dir, euler-pNNN.png)
    --pages A,B,C     render several pages at once into the same directory
"""

from __future__ import annotations

import argparse
import sys
import tempfile
from pathlib import Path

import fitz  # PyMuPDF


def parse_crop(value: str) -> list[float] | None:
    if not value:
        return None
    parts = [float(p) for p in value.split(",")]
    if len(parts) != 4:
        raise argparse.ArgumentTypeError("--crop needs T,L,B,R")
    if not all(0.0 <= p <= 1.0 for p in parts):
        raise argparse.ArgumentTypeError("--crop fractions must lie in 0..1")
    return parts


def render(
    doc: fitz.Document,
    page_number: int,
    out: Path,
    width: int | None,
    zoom: float | None,
    crop: list[float] | None,
) -> None:
    page = doc[page_number - 1]
    rect = page.rect
    if crop:
        top, left, bottom, right = crop
        if bottom <= top or right <= left:
            raise SystemExit("--crop must satisfy bottom>top and right>left")
        clip = fitz.Rect(
            rect.x0 + left * rect.width,
            rect.y0 + top * rect.height,
            rect.x0 + right * rect.width,
            rect.y0 + bottom * rect.height,
        )
    else:
        clip = rect

    if zoom:
        matrix = fitz.Matrix(zoom, zoom)
    else:
        target = width or 1700
        matrix = fitz.Matrix(target / clip.width, target / clip.width)

    pix = page.get_pixmap(matrix=matrix, clip=clip, colorspace=fitz.csGRAY)
    out.parent.mkdir(parents=True, exist_ok=True)
    pix.save(out)
    print(f"{out}  {pix.width}x{pix.height}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("page", type=int, nargs="?")
    parser.add_argument("--width", type=int)
    parser.add_argument("--zoom", type=float)
    parser.add_argument("--crop", type=parse_crop)
    parser.add_argument("--out", type=Path)
    parser.add_argument("--pages", type=str, help="comma-separated page numbers")
    args = parser.parse_args()

    doc = fitz.open(args.pdf)
    if args.pages:
        numbers = [int(n) for n in args.pages.split(",") if n.strip()]
    elif args.page is not None:
        numbers = [args.page]
    else:
        parser.error("give a page number or --pages")

    for number in numbers:
        if args.out and len(numbers) == 1:
            out = args.out
        else:
            suffix = "-crop" if args.crop else ""
            out = Path(tempfile.gettempdir()) / f"euler-p{number:04d}{suffix}.png"
        render(doc, number, out, args.width, args.zoom, args.crop)

    doc.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
