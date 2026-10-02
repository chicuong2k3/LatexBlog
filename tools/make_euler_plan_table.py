"""Dựng lại "Bảng kế hoạch" trong TRANSLATION_LEDGER.md từ CHAPTER_PLAN.json.

Bảng này trước đây gõ tay nên trôi khỏi CHAPTER_PLAN.json. Ở đây mọi dòng đều lấy
từ ba nguồn, không có gì tự định nghĩa:

* ``CHAPTER_PLAN.json`` — chương nào giữ PDF nào, nhan đề, số callout mong muốn
* bản đồ trang của archive.org — cột "Trang in", để không phải tự trừ 28 (đoạn cuối
  sách đã lệch sang +38 vì khối 10 trang bị lặp trong bản scan)
* frontmatter của từng chương — cột "Trạng thái", cùng cách ghi mà
  ``tools/euler_ledger.py`` dùng cho bảng đối chiếu từng trang

Sau khi sửa CHAPTER_PLAN.json thì chạy lại script này.

Usage:
    python tools/archive_pagemap_report.py --json /tmp/euler-pagemap.json
    python tools/make_euler_plan_table.py --pagemap /tmp/euler-pagemap.json
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BOOK = ROOT / "books/euler-calculi-differentialis"
LEDGER = BOOK / "TRANSLATION_LEDGER.md"
PLAN = BOOK / "CHAPTER_PLAN.json"

HEADER = (
    "| Chương | Tác phẩm | Tác giả viết | PDF | Trang in | File | Số callout | Trạng thái |"
)
SEPARATOR = "|---|---|---|---:|---:|---|---:|---|"
OLD_CAPTION = "`Trang in` tính theo quan hệ `PDF = trang in + 28` (xem `PAGE_MAP.md`)."
CAPTION = (
    "`Trang in` lấy từ `page_numbers` của metadata archive.org, **không** tự trừ 28: "
    "từ PDF 871 trở đi quan hệ là `+38` vì bản scan lặp khối 10 trang in 833–842 "
    "(xem `PAGE_MAP.md` §2)."
)
UNTRANSLATED = "Chưa dịch"
STATUS_LABEL = {
    "hoan-thanh": "Đã dịch, đã niêm phong",
    "chua-hoan-thanh": "Đang dịch",
}

FRONTMATTER = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.DOTALL)


def roman(n: int) -> str:
    table = [(10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
    out = ""
    for value, glyph in table:
        while n >= value:
            out += glyph
            n -= value
    return out


def status_of(entry: dict) -> str:
    path = BOOK / "chapters" / entry["file"]
    if not path.exists():
        return UNTRANSLATED
    match = FRONTMATTER.match(path.read_text(encoding="utf-8"))
    if not match:
        return UNTRANSLATED
    for line in match.group(1).splitlines():
        key, sep, value = line.partition(":")
        if sep and key.strip() == "status":
            raw = value.strip().strip("'\"")
            return STATUS_LABEL.get(raw, raw)
    return UNTRANSLATED


def range_cell(values: list[str | None], fallback: str = "—") -> str:
    if not values or values[0] is None or values[-1] is None:
        return fallback
    return f"{values[0]}–{values[-1]}"


def row(chapter: str, work: str, title: str, pdf: list[int],
        printed: str, file_cell: str, callouts: str, state: str) -> str:
    return (
        f"| {chapter} | {work} | *{title}* | {pdf[0]}–{pdf[1]} | {printed} "
        f"| {file_cell} | {callouts} | {state} |"
    )


def build(plan: dict, folios: dict[int, str | None]) -> list[str]:
    lines: list[str] = [HEADER, SEPARATOR]

    for entry in plan["front_matter"]:
        # CHAPTER_PLAN.json để `title` của front_matter là tiêu đề tiếng Việt, còn
        # cột "Tác giả viết" của bảng này xin nhãn Latin.
        lines.append(row(
            "—", "Lời tựa, mục lục, lỗi in", "Praefatio", entry["pdf"],
            range_cell([entry["printed"][0], entry["printed"][-1]]),
            f"`chapters/{entry['file']}`", str(entry["callouts"]), status_of(entry),
        ))

    for entry in plan["pars_prior"]:
        lines.append(row(
            roman(entry["chapter"]), entry["vn"], entry["title"], entry["pdf"],
            range_cell([folios.get(entry["pdf"][0]), folios.get(entry["pdf"][1])]),
            f"`chapters/{entry['file']}`", str(entry["callouts"]), status_of(entry),
        ))

    for entry in plan["unattributed"]:
        lo, hi = entry["pdf"]
        if (lo, hi) == (307, 308):
            lines.append(row(
                "—", "Nửa tên Pars Posterior", "Pars Posterior", entry["pdf"],
                range_cell([folios.get(lo), folios.get(hi)]),
                "—", "—", "Ngoài sách",
            ))

    for entry in plan["pars_posterior"]:
        lines.append(row(
            roman(entry["chapter"]), entry["vn"], entry["title"], entry["pdf"],
            range_cell([folios.get(entry["pdf"][0]), folios.get(entry["pdf"][1])]),
            f"`chapters/{entry['file']}`", str(entry["callouts"]), status_of(entry),
        ))

    return lines


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pagemap", type=Path, required=True)
    parser.add_argument("--ledger", type=Path, default=LEDGER)
    args = parser.parse_args()

    plan = json.loads(PLAN.read_text(encoding="utf-8"))
    pagemap = json.loads(args.pagemap.read_text(encoding="utf-8"))
    folios = {int(p["pdf"]): p["printed"] for p in pagemap["pages"]}

    table = "\n".join(build(plan, folios))

    lines = args.ledger.read_text(encoding="utf-8").split("\n")
    out: list[str] = []
    seen_table = False
    for line in lines:
        if line == OLD_CAPTION:
            out.append(CAPTION)
            continue
        if line == HEADER:
            out.append(table)
            seen_table = True
            continue
        if seen_table:
            # bỏ các dòng dữ liệu cũ của bảng, tới khi gặp dòng trống
            if line.startswith("|") or line.startswith(SEPARATOR[:3]):
                continue
            seen_table = False
        out.append(line)

    if table not in out:
        raise SystemExit("không tìm thấy bảng kế hoạch để thay")

    args.ledger.write_text("\n".join(out), encoding="utf-8", newline="\n")
    print(f"plan table rows : {table.count(chr(10)) + 1}")
    print(f"ledger         : {args.ledger}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())