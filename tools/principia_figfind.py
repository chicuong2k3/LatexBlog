"""Locate the engraved figures of the 1846 Motte Principia on the scan, without looking.

The Internet Archive word layer says where TEXT is. Mask those boxes out of the page
raster and what is left as a sizeable cluster of ink is a figure.  Validated against
the three figures already extracted for chapter 02 (aspect ratio within 6 percent and
same page as the ledger records), but NOT a replacement for someone looking at the crop:
every box it proposes still has to be checked by a reader who can see images.

Needs numpy, scipy, lxml and PyMuPDF; the repo's own Python has none of them, so run it
from a scratch venv:

    python -m venv %TEMP%\\principia1846\\venv
    %TEMP%\\principia1846\\venv\\Scripts\\python -m pip install numpy scipy pillow pymupdf lxml

Inputs, downloaded into the work directory (default %TEMP%\\principia1846, or set
PRINCIPIA_WORKDIR):

    newton.pdf        https://archive.org/download/newtonspmathema00newtrich/newtonspmathema00newtrich.pdf
    newton_djvu.xml   https://archive.org/download/newtonspmathema00newtrich/newtonspmathema00newtrich_djvu.xml

Usage:
    python tools/principia_figfind.py scan OUT.json          # every page, about 25 minutes
    python tools/principia_figfind.py page 122               # one PDF page, prints boxes
    python tools/principia_figfind.py crop 122 3 OUT.png     # crop blob number 3 of page 122
"""

from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path

import fitz  # PyMuPDF
import numpy as np
from lxml import etree
from scipy import ndimage as ndi

WORK = Path(os.environ.get("PRINCIPIA_WORKDIR") or (Path(os.environ.get("TEMP", ".")) / "principia1846"))
PDF = WORK / "newton.pdf"
XML = WORK / "newton_djvu.xml"


def load_pages() -> list[dict]:
    pages = []
    for _, el in etree.iterparse(str(XML), tag="OBJECT", huge_tree=True):
        w, h = int(el.get("width")), int(el.get("height"))
        words = []
        for wd in el.iter("WORD"):
            # each WORD here is a whole printed line; coords = left,bottom,right,top
            c = [int(v) for v in wd.get("coords").split(",")]
            words.append((wd.text or "", c[0], c[3], c[2], c[1]))
        pages.append({"w": w, "h": h, "words": words})
        el.clear()
    return pages


def blobs(doc, pages, idx, pad=6, min_area=6000, gap=40):
    p = pages[idx]
    page = doc[idx]
    zoom = p["w"] / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), colorspace=fitz.csGRAY)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width)
    sx, sy = pix.width / p["w"], pix.height / p["h"]
    ink = img < 140
    m = int(0.04 * pix.width)  # scanner shadow and binding
    ink[:, :m] = False
    ink[:, -m:] = False
    ink[: int(0.03 * pix.height), :] = False
    ink[-int(0.03 * pix.height):, :] = False
    for t, l, tp, r, b in p["words"]:
        if len(t) >= 2:
            ink[max(0, int((tp - pad) * sy)): int((b + pad) * sy), max(0, int((l - pad) * sx)): int((r + pad) * sx)] = False
    lab, _ = ndi.label(ndi.binary_dilation(ink, iterations=gap // 4))
    out = []
    for k, sl in enumerate(ndi.find_objects(lab), start=1):
        ys, xs = sl
        area = (ys.stop - ys.start) * (xs.stop - xs.start)
        ink_px = int(ink[sl][lab[sl] == k].sum())
        if area >= min_area and ink_px >= 400:
            out.append({"x0": xs.start, "y0": ys.start, "x1": xs.stop, "y1": ys.stop,
                        "ink": ink_px, "wh": (xs.stop - xs.start, ys.stop - ys.start)})
    out.sort(key=lambda b: (b["y0"], b["x0"]))
    return out, (pix.width, pix.height)


def is_figure(b, page_w=2476):
    w, h = b["wh"]
    return w >= 280 and h >= 250 and b["ink"] >= 6000 and w < 0.95 * page_w


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2
    cmd = argv[1]
    pages = load_pages()
    doc = fitz.open(str(PDF))
    if cmd == "scan":
        out, t0 = {}, time.time()
        for idx in range(len(pages)):
            bl, size = blobs(doc, pages, idx, min_area=40000)
            out[idx] = {"raster": size,
                        "blobs": [{"box": [b["x0"], b["y0"], b["x1"], b["y1"]], "ink": b["ink"], "wh": b["wh"]}
                                  for b in bl if b["ink"] >= 2500]}
            if idx % 50 == 0:
                print("page", idx, "%.0fs" % (time.time() - t0), flush=True)
        Path(argv[2]).write_text(json.dumps(out), encoding="utf-8")
    elif cmd == "page":
        idx = int(argv[2]) - 1
        bl, size = blobs(doc, pages, idx)
        print("raster", size)
        for n, b in enumerate(bl):
            print(n, (b["x0"], b["y0"], b["x1"], b["y1"]), b["wh"], "ink", b["ink"], "FIGURE" if is_figure(b) else "")
    elif cmd == "crop":
        idx, n = int(argv[2]) - 1, int(argv[3])
        bl, _ = blobs(doc, pages, idx)
        b = bl[n]
        page = doc[idx]
        zoom = pages[idx]["w"] / page.rect.width
        pad = 30
        clip = fitz.Rect((b["x0"] - pad) / zoom, (b["y0"] - pad) / zoom, (b["x1"] + pad) / zoom, (b["y1"] + pad) / zoom)
        page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip, colorspace=fitz.csGRAY).save(argv[4])
        print("saved", argv[4])
    else:
        print(__doc__)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
