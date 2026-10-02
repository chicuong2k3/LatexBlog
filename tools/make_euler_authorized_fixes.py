"""Sinh AUTHORIZED_TEXT_FIXES.tsv cho sách Euler.

Cổng --fidelity đọc manifest bằng `tools/check_book_callouts.py::_load_authorized`,
vốn giải mã **chỉ** ký tự hai chữ `\n` thành xuống dòng. Vì thế chuỗi trong manifest
được ghi với dấu gạch chéo nguyên văn, và chỉ xuống dòng thật mới được mã hoá.

Chuỗi_cũ lấy thẳng từ `git show HEAD:...` để khớp tuyệt đối với bản mà cổng so.
Chuỗi_mới lấy từ file đang làm việc. Trước khi ghi, script áp toàn bộ cặp lên bản HEAD
rồi so với file đang làm y như cổng làm; lệch dù một dòng thì dừng, vì khi đó
manifest sai.

Usage:
    python tools/make_euler_authorized_fixes.py
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_book_callouts import _strip_callouts  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
BOOK = ROOT / "books/euler-calculi-differentialis"
OUT = BOOK / "AUTHORIZED_TEXT_FIXES.tsv"

CH1 = "chapters/01-sai-lech-huu-han.md"
CH2 = "chapters/02-dung-sai-lech-trong-ly-thuyet-chuoi.md"


def head_of(rel: str) -> str:
    proc = subprocess.run(
        ["git", "show", f"HEAD:books/euler-calculi-differentialis/{rel}"],
        capture_output=True, text=True, encoding="utf-8", cwd=ROOT, check=True,
    )
    return proc.stdout


def note_around(text: str, marker: str) -> str:
    """Trả về nguyên khối comment <!-- ... --> bắt đầu tại marker.

    Marker đã bắt đầu bằng ``<!--`` nên lấy thẳng vị trí của nó; không dùng
    ``rindex("<!--", 0, start)`` vì Python loại trừ chính ``start`` khỏi khoảng tìm
    và sẽ nhảy về khối comment liền trước đó.
    """
    start = text.index(marker)
    return text[start : text.index("-->", start) + len("-->")]


# (file, mô tả, chuỗi_cũ, chuỗi_mới)
FIXES = [
    (
        CH1,
        "§1: phân số có mẫu (aa+xx) như bản in, thứ tự trước đây bị đảo",
        "\\dfrac{a+x}{xx+aa}",
        "\\dfrac{a+x}{aa+xx}",
    ),
    (
        CH1,
        "§29: 'ac certis' là 'và một số số hạng nữa', không phải số thứ ba",
        "số hạng thứ nhất, thứ hai và thứ ba, ta sẽ sớm nhận ra",
        "số hạng thứ nhất, thứ hai và một số số hạng nữa, ta sẽ sớm nhận ra",
    ),
    (
        CH1,
        "Dấu '&' trần (chữ et của bản in) nối hai công thức liền nhau, 8 chỗ",
        "$$\n\n&\n\n$$",
        "$$\n\nvà\n\n$$",
    ),
    (
        CH2,
        "§42 dạng 'aut denique': bản in in a^II, bản dịch cũ đọc nhầm a^III; tiền tố "
        "1/4 giữ nguyên vì đúng bản in",
        "\\frac{1}{4}(x-1)(x-2)(x-3)\\left(\\frac{a^{\\mathrm{III}}}{x-3}",
        "\\frac{1}{4}(x-1)(x-2)(x-3)\\left(\\frac{a^{\\mathrm{II}}}{x-3}",
    ),
]


def esc(value: str) -> str:
    """Chỉ mã hoá xuống dòng — cổng không giải mã gì khác."""
    if "\t" in value:
        raise SystemExit("chuỗi trong manifest không được chứa TAB")
    return value.replace("\n", "\\n")


rows: list[tuple[str, str, str, str]] = []

for rel, desc, old, new in FIXES:
    if old not in head_of(rel):
        raise SystemExit(f"KHÔNG THẤY trong HEAD: {rel} :: {desc}")
    rows.append((rel, desc, old, new))

# Hai ghi chú dịch giả viết lại: lấy cũ từ HEAD, mới từ file đang làm.
head2 = head_of(CH2)
work2 = (BOOK / CH2).read_text(encoding="utf-8")
for desc, marker in [
    ("§42: viết lại ghi chú sau khi soi scan, xác nhận a^II và tiền tố 1/4",
     '<!-- Ghi chú dịch giả: dạng "aut denique"'),
    ("§57: đính chính ghi chú kiểm công thức, ghi nhận lớp OCR đã nuốt chữ e",
     "<!-- Ghi chú dịch giả: ba công thức ở trang này"),
]:
    old, new = note_around(head2, marker), note_around(work2, marker)
    if old == new:
        raise SystemExit(f"ghi chú không đổi, bỏ khai: {desc}")
    rows.append((CH2, desc, old, new))

header = [
    "# Sửa văn bản dịch đã khai cho cổng --fidelity (tools/check_book_callouts.py).",
    "# Mỗi dòng khai: file <TAB> chuỗi_cũ <TAB> chuỗi_mới",
    "# chuỗi_cũ lấy từ `git show HEAD:books/euler-calculi-differentialis/<file>`,",
    "# nên khớp tuyệt đối với bản mà cổng so.",
    "# Cổng chỉ giải mã ký tự hai chữ dạng newline thành xuống dòng; dấu gạch chéo",
    "# trong LaTeX được giữ nguyên. Nội dung không được chứa TAB.",
    "#",
    "# Sinh lại: python tools/make_euler_authorized_fixes.py",
    "",
]

lines = list(header)
for rel, desc, old, new in rows:
    lines.append(f"# {desc}")
    lines.append("\t".join((rel, esc(old), esc(new))))
OUT.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")

# Tự kiểm: áp manifest lên HEAD rồi so với file đang làm, y như cổng làm.
for rel in (CH1, CH2):
    head = head_of(rel)
    for r, _, old, new in rows:
        if r == rel:
            head = head.replace(old, new)
    if _strip_callouts(head) != _strip_callouts((BOOK / rel).read_text(encoding="utf-8")):
        raise SystemExit(f"TỰ KIỂM THẤT BẠI: manifest chưa tái tạo đúng {rel}")
    print(f"  tự kiểm {rel}: khớp")

print(f"wrote {OUT}")
for rel, desc, _, _ in rows:
    print(f"  {rel}: {desc}")