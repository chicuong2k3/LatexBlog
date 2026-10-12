"""Stage candidate figures from the 1846 scan for review, one contact sheet per chapter.

For chapters 43 to 67 of the Vietnamese Principia (Book II and Book III), find the page
range of each chapter in the scan, crop every figure candidate found there by
principia_figfind.py, and lay the crops out on one numbered contact sheet per chapter.

Nothing is inserted into a chapter. This only prepares what a reader who can SEE images has
to check: whether each crop is the figure its proposition describes, and which point letters
it carries.  The page ranges are approximate; a chapter's sheet may include a figure that
belongs to the neighbouring chapter, and Book II is decoded from 51 of its 53 headings.

Needs the same scratch venv and inputs as principia_figfind.py.

Usage:
    python tools/principia_stage.py OUT_DIR
Produces OUT_DIR/crops/p<pdf>-<n>.png, OUT_DIR/sheets/ch<NN>.jpg and OUT_DIR/index.md.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import fitz
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
import principia_figfind as ff  # noqa: E402

RX_PROP = re.compile(r"PROPOSITION\s+([IVXLC1l|]+(?:\s+[IVXLC]+)?)[.,]?\s+(THEOREM|PROBLEM)\s+([IVXLC1l|]+(?:\s+[IVXLC]+)?)", re.I)

# chapter -> (first, last) proposition of its book, from the chapter titles in the ledger
BOOK2 = {43: (1, 4), 44: (5, 7), 45: (8, 10), 46: (11, 14), 47: (15, 18), 48: (19, 23), 49: (24, 31),
         50: (32, 37), 51: (38, 39), 52: (40, 40), 53: (41, 50), 54: (51, 53)}
BOOK3 = {55: (1, 6), 56: (7, 8), 57: (9, 10), 58: (11, 13), 59: (14, 16), 60: (17, 20), 61: (21, 24),
         62: (25, 28), 63: (29, 32), 64: (33, 36), 65: (37, 40), 66: (41, 41), 67: (42, 42)}


def roman_values(s: str) -> list[int]:
    """Every reading of an OCR roman numeral, treating a stray L as a misread I."""
    s = s.upper().replace("1", "I").replace("|", "I")
    s = re.sub(r"[^IVXLC]", "", s)
    variants = {s}
    for i, ch in enumerate(s):
        if ch == "L":
            variants.add(s[:i] + "I" + s[i + 1:])
    out = []
    for v in variants:
        tot, prev = 0, 0
        for ch in reversed(v):
            val = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100}[ch]
            tot += -val if val < prev else val
            prev = max(prev, val)
        out.append(tot)
    return out


def decode(seq):
    """Assign proposition numbers in page order, trusting monotonic order over the OCR."""
    prev, res = 0, {}
    for page, rom in seq:
        cands = [c for c in roman_values(rom) if c > prev]
        n = min(cands, key=lambda c: abs(c - (prev + 1))) if cands else prev + 1
        if n - prev > 3:
            n = prev + 1
        res.setdefault(n, page)
        prev = n
    return res


def main() -> int:
    out = Path(sys.argv[1])
    (out / "crops").mkdir(parents=True, exist_ok=True)
    (out / "sheets").mkdir(parents=True, exist_ok=True)
    pages = ff.load_pages()
    doc = fitz.open(str(ff.PDF))

    seq, starts = [], []
    for i, p in enumerate(pages):
        text = re.sub(r"\s+", " ", " ".join(w[0].strip() for w in p["words"]))
        for m in RX_PROP.finditer(text):
            seq.append((i, m.group(1)))
            if re.fullmatch(r"[Il1]", m.group(1).strip()) and re.fullmatch(r"[Il1]", m.group(3).strip()):
                starts.append(i)
    b2s, b3s = starts[1], starts[2]
    book2 = decode([s for s in seq if b2s <= s[0] < b3s])
    book3 = decode([s for s in seq if s[0] >= b3s])
    book3_end = max(book3.values()) + 6

    def span(table, pg, last_end, first_pre):
        res = {}
        for ch, (lo, hi) in table.items():
            start = pg.get(lo, None)
            if start is None:
                continue
            if lo == 1:
                start -= first_pre
            nxt = pg.get(hi + 1)
            end = nxt if nxt is not None else last_end
            if ch == 66:           # lemmas precede Proposition XLI
                start = pg.get(41, start) - 6
                end = pg.get(42, last_end)
            res[ch] = (start, end)
        return res

    ranges = {**span(BOOK2, book2, b3s, 2), **span(BOOK3, book3, book3_end, 8)}

    index = ["# Principia: figure candidates staged for review (chapters 43 to 67)\n",
             "Page numbers are PDF pages of `newtonspmathema00newtrich.pdf`. Ranges are approximate; "
             "a crop at a boundary page may belong to the neighbouring chapter. **Nothing here has been looked at.**\n",
             "| Ch | PDF pages | candidates | sheet |\n|---:|---|---:|---|"]
    font = ImageFont.load_default(size=28)
    total = 0
    for ch in sorted(ranges):
        a, b = ranges[ch]
        crops = []
        for idx in range(a, b + 1):
            bl, _ = ff.blobs(doc, pages, idx, min_area=40000)
            figs = [x for x in bl if ff.is_figure(x)]
            page = doc[idx]
            zoom = pages[idx]["w"] / page.rect.width
            for k, x in enumerate(figs, start=1):
                pad = 30
                clip = fitz.Rect((x["x0"] - pad) / zoom, (x["y0"] - pad) / zoom, (x["x1"] + pad) / zoom, (x["y1"] + pad) / zoom)
                name = f"p{idx+1}-{k}.png"
                page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip, colorspace=fitz.csGRAY).save(str(out / "crops" / name))
                crops.append((idx + 1, k, out / "crops" / name))
        total += len(crops)
        sheet = f"sheets/ch{ch:02d}.jpg"
        if crops:
            cols, tw = 3, 560
            thumbs = []
            for pg, k, path in crops:
                im = Image.open(path).convert("L")
                im.thumbnail((tw, tw))
                canvas = Image.new("L", (tw, im.height + 40), 255)
                canvas.paste(im, (0, 40))
                ImageDraw.Draw(canvas).text((4, 4), f"ch{ch} p{pg} #{k}", fill=0, font=font)
                thumbs.append(canvas)
            rows = (len(thumbs) + cols - 1) // cols
            rh = [max(t.height for t in thumbs[r * cols:(r + 1) * cols]) for r in range(rows)]
            sh = Image.new("L", (cols * tw, sum(rh)), 255)
            y = 0
            for r in range(rows):
                for c, t in enumerate(thumbs[r * cols:(r + 1) * cols]):
                    sh.paste(t, (c * tw, y))
                y += rh[r]
            sh.save(str(out / sheet), quality=70)
        index.append(f"| {ch} | {a+1} to {b+1} | {len(crops)} | {sheet if crops else '-'} |")
        print("ch", ch, "pages", a + 1, "-", b + 1, "candidates", len(crops), flush=True)
    index.append(f"\nTotal candidates: {total}")
    (out / "index.md").write_text("\n".join(index) + "\n", encoding="utf-8")
    json.dump({str(k): v for k, v in ranges.items()}, open(out / "ranges.json", "w"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
