"""Kiểm tra lớp chú giải hiện đại trong các chương sách dịch.

Callout là blockquote bắt đầu bằng marker ``**[Chú giải]**``. Script này
kiểm tra cấu trúc từng callout, báo cáo mật độ theo từng chương, và (tuỳ chọn)
render lại từng chương bằng đúng tham số Pandoc mà ``tools/build_books.py`` dùng.

Dùng:
    python tools/check_book_callouts.py [books-dir] [--strict] [--render]

``--strict`` coi cả mật độ vượt ngưỡng trong ANNOTATION_GUIDE.md là lỗi.
``--render``  chạy Pandoc trên từng chương và báo chương nào không render được.
"""

from __future__ import annotations

import io
import re
import subprocess
import sys
import difflib
from dataclasses import dataclass, field
from pathlib import Path

# Windows: stdout mặc định là cp1252, không in được tiếng Việt.
for _stream in (sys.stdout, sys.stderr):
    if hasattr(_stream, "reconfigure"):
        _stream.reconfigure(encoding="utf-8", errors="replace")

MARKER = "**[Chú giải]**"
# Marker cũ, chỉ để _strip_callouts gỡ callout trong bản git HEAD khi so
# fidelity — bản đã commit còn nhãn cũ. _is_marker không dùng danh sách này.
LEGACY_MARKERS = ("**[Ghi chú hiện đại]**",)
# ANNOTATION_GUIDE.md muc 13: tieu de phai neu van de cu the, khong dung
# nhan chung chung. Danh sach nay chan nhan chung, khong ep co tieu de.
BANNED_HEADINGS = (
    "**Khái niệm tương ứng.**",
    "**Công thức.**",
    "**Vì sao Newton viết như vậy.**",
    "**Hiện nay thì sao.**",
    "**Lưu ý nguồn gốc.**",
)

# ANNOTATION_GUIDE.md muc 4: cau sao, va ten duoc them chi de co ve sau sac.
BANNED_PHRASES = (
    "Đây là mấu chốt",
    "Điều đáng chú ý",
    "Điều thú vị",
    "Đây chính là nền tảng",
    "Có thể thấy rằng",
    "Không chỉ",
    "Một ngõ ngách",
    "Điều này mở đường",
    "Vô tình đặt nền móng",
    "Hàng thế kỷ sau",
    "Theo một nghĩa nào đó",
    "là một minh chứng cho",
)

# Mật độ mục tiêu, theo bảng ở ANNOTATION_GUIDE.md mục 4.
DENSITY_BANDS = {
    "00": (0, 2),
    "69": (0, 2),
    "01": (8, 8),
    "03": (1, 1),
    "04": (1, 1),
    "05": (1, 1),
    "06": (1, 1),
    "07": (1, 1),
    "65": (2, 4),
    "66": (2, 4),
    "67": (2, 4),
    "68": (4, 8),
}
DEFAULT_BAND = (2, 6)

# Ngưỡng cảnh báo mỗi callout.
# ANNOTATION_GUIDE.md muc 11: do dai do do kho quyet dinh, khong can bang.
MIN_WORDS = 25
MAX_WORDS = 700

# Ký tự tiếng Việt + chữ Latin. Dùng để phát hiện câu tiếng Anh sót lọt.
_VN_CHARS = "ăâđêôơưĂÂĐÊÔƠƯàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ"
_NON_VN = re.compile(rf"[A-Za-z{' '.join(_VN_CHARS)}]")

# \w là Unicode-aware nên khớp cả chữ có dấu; regex chỉ-Latin sẽ đếm 0 từ với tiếng Việt.
_TOKEN = re.compile(r"\w+(?:['’-]\w+)*", re.UNICODE)

# Khớp $$...$$ trước, rồi $...$.
_MATH_SPAN = re.compile(r"\$\$.*?\$\$|\$[^$\n]*\$", re.DOTALL)


@dataclass
class Problem:
    where: str
    message: str


@dataclass
class ChapterReport:
    path: Path
    callouts: int = 0
    problems: list[Problem] = field(default_factory=list)
    words: list[int] = field(default_factory=list)

    @property
    def name(self) -> str:
        return self.path.name


def _is_marker(line: str) -> bool:
    return line.startswith("> ") and MARKER in line


def _is_any_marker(line: str) -> bool:
    return line.startswith("> ") and any(m in line for m in (MARKER, *LEGACY_MARKERS))


def _collect_callouts(lines: list[str]) -> list[list[str]]:
    """Trả về các callout, mỗi callout là list dòng (đã bỏ tiền tố '>')."""
    blocks: list[list[str]] = []
    current: list[str] | None = None
    for line in lines:
        if _is_marker(line):
            if current:
                blocks.append(current)
            current = [line.split(">", 1)[1].strip()]
        elif current is not None:
            if line.startswith(">"):
                current.append(line[1:].strip())
            else:
                # Dòng trống nằm ngay sau callout: callout kết thúc ở đây.
                if line.strip():
                    blocks.append(current)
                    current = None
    if current:
        blocks.append(current)
    return blocks


def _check_callout(report: ChapterReport, index: int, block: list[str]) -> None:
    where = f"{report.name} callout #{index}"
    body = "\n".join(block)
    stripped = [ln for ln in block if ln]
    if not stripped:
        report.problems.append(Problem(where, "callout rỗng"))
        return

    # Marker phải là dòng đầu, một mình.
    if stripped[0] != MARKER:
        report.problems.append(Problem(where, f"dòng đầu phải là {MARKER!r}, thực tế {stripped[0]!r}"))

    joined = " ".join(stripped)
    for line in stripped:
        for heading in BANNED_HEADINGS:
            if line.startswith(heading):
                report.problems.append(
                    Problem(where, f"tiêu đề chung chung {heading} — nêu vấn đề cụ thể")
                )
    for phrase in BANNED_PHRASES:
        if phrase in joined:
            report.problems.append(Problem(where, f"câu sáo {phrase!r}"))

    # Dấu $ phải cân.
    dollars = joined.count("$$") * 2 + len(re.findall(r"(?<!\$)\$(?!\$)", joined))
    if dollars % 2:
        report.problems.append(Problem(where, f"số dấu $ lẻ ({dollars}) — công thức hở"))

    # \begin{...} phải có \end{...} tương ứng.
    for env in re.findall(r"\\begin\{(\w+\*?)\}", joined):
        if f"\\end{{{env}}}" not in joined:
            report.problems.append(Problem(where, f"thiếu \\end{{{env}}}"))

    # Ngưỡng độ dài áp cho văn xuôi, nên phải bỏ math trước khi đếm:
    # nếu không, $m = \rho V$ sẽ tính thành 3 "từ" và callout nhiều công thức bị phạt oan.
    prose = _MATH_SPAN.sub(" ", joined)
    words = len(_TOKEN.findall(prose))
    report.words.append(words)
    if words < MIN_WORDS:
        report.problems.append(Problem(where, f"quá ngắn ({words} từ, cần >= {MIN_WORDS})"))
    if words > MAX_WORDS:
        report.problems.append(Problem(where, f"quá dài ({words} từ, cần <= {MAX_WORDS})"))

    # Câu tiếng Anh dài: một đoạn không dấu tiếng Việt nào và toàn chữ Latin.
    for para in re.split(r"\n\s*\n", body):
        for sentence in re.split(r"(?<=[.!?])\s+", para):
            letters = _TOKEN.findall(sentence)
            if len(letters) >= 8 and not _NON_VN.search(sentence):
                report.problems.append(Problem(where, f"câu tiếng Anh dài: {sentence[:70]!r}"))
                break

    # Bảng Markdown hoặc ảnh nằm trong callout.
    if "![" in body or re.search(r"(?m)^\s*\|.+\|\s*$", body):
        report.problems.append(Problem(where, "callout chứa ảnh hoặc bảng — không được phép"))


def _strip_callouts(text: str) -> str:
    """Bỏ mọi khối callout, trả về phần còn lại của văn bản.

    Dùng để so với git HEAD: nếu phần còn lại khác HEAD thì đã có chỉnh sửa
    vào bản dịch, không phải chỉ chèn callout.
    """
    out: list[str] = []
    in_callout = False
    for line in text.splitlines():
        if _is_any_marker(line):
            in_callout = True
            if out and not out[-1].strip():
                out.pop()
            continue
        if in_callout:
            if line.startswith(">"):
                continue
            in_callout = False
        out.append(line)
    return "\n".join(out).strip()


AUTHORIZED_MANIFESTS = ("AUTHORIZED_TEXT_FIXES.tsv", "EXTRACTED_FIGURES.tsv")


def _load_authorized(books_dir: Path) -> dict[str, list[tuple[str, str]]]:
    allowed: dict[str, list[tuple[str, str]]] = {}
    for name in AUTHORIZED_MANIFESTS:
        path = books_dir / name
        if not path.exists():
            continue
        for raw in path.read_text(encoding="utf-8").splitlines():
            if not raw.strip() or raw.lstrip().startswith("#"):
                continue
            parts = raw.split("\t")
            if len(parts) == 3:
                src, dst = (v.replace("\\n", "\n") for v in parts[1:])
                allowed.setdefault(parts[0].strip(), []).append((src, dst))
    return allowed


def check_fidelity(
    chapters: list[Path], repo_root: Path, books_dir: Path
) -> list[Problem]:
    """So phần không-phải-callout với git HEAD.

    Sửa đổi đã khai báo trong AUTHORIZED_TEXT_FIXES.tsv được áp lên bản HEAD
    trước khi so, nên chỉ còn lại sự lệch thật sự mới bị báo.
    """
    authorized = _load_authorized(books_dir)
    problems: list[Problem] = []
    for path in chapters:
        rel_repo = path.relative_to(repo_root).as_posix()
        rel_book = path.relative_to(books_dir).as_posix()
        proc = subprocess.run(
            ["git", "show", f"HEAD:{rel_repo}"],
            capture_output=True, text=True, encoding="utf-8",
            cwd=repo_root,
        )
        if proc.returncode != 0:
            continue
        old = _strip_callouts(proc.stdout)
        for src, dst in authorized.get(rel_book, []):
            old = old.replace(src, dst)
        new = _strip_callouts(path.read_text(encoding="utf-8"))
        if old == new:
            continue
        diff = [
            line for line in difflib.unified_diff(
                old.splitlines(), new.splitlines(), lineterm="", n=0
            )
            if line[:1] in "+-" and not line.startswith(("+++", "---"))
        ]
        problems.append(Problem(
            path.name,
            f"văn bản dịch khác HEAD ngoài callout ({len(diff)} dòng): "
            + " | ".join(d.strip()[:60] for d in diff[:4]),
        ))
    return problems


def _band_for(name: str) -> tuple[int, int]:
    return DENSITY_BANDS.get(name[:2], DEFAULT_BAND)


def render_chapters(chapters: list[Path]) -> list[Problem]:
    """Render từng chương bằng đúng tham số Pandoc của tools/build_books.py."""
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from build_posts import find_pandoc, parse_frontmatter  # noqa: PLC0415

    try:
        pandoc = find_pandoc()
    except FileNotFoundError as exc:
        return [Problem("pandoc", str(exc))]

    problems: list[Problem] = []
    for path in chapters:
        _, body = parse_frontmatter(path.read_text(encoding="utf-8"))
        proc = subprocess.run(
            [pandoc, "--from", "markdown", "--to", "html5", "--katex",
             "--highlight-style=pygments", "--wrap=none"],
            input=body, capture_output=True, text=True, encoding="utf-8",
        )
        if proc.returncode != 0:
            problems.append(Problem(path.name, f"pandoc exit {proc.returncode}: {proc.stderr[:300]}"))
            continue
        if "math display" not in proc.stdout and "$$" in body:
            problems.append(Problem(path.name, "có $$ nhưng HTML không sinh math display"))
    return problems


def check_chapter(path: Path) -> ChapterReport:
    report = ChapterReport(path=path)
    lines = path.read_text(encoding="utf-8").splitlines()
    for i, block in enumerate(_collect_callouts(lines), start=1):
        _check_callout(report, i, block)
    report.callouts = len(report.words)
    return report


def main(argv: list[str]) -> int:
    args = [a for a in argv[1:] if not a.startswith("--")]
    strict = "--strict" in argv[1:]
    render = "--render" in argv[1:]
    fidelity = "--fidelity" in argv[1:]
    books_dir = Path(args[0]).resolve() if args else Path("books/newton-principia").resolve()

    chapters = sorted((books_dir / "chapters").glob("*.md"))
    if not chapters:
        print(f"không tìm thấy chương nào trong {books_dir / 'chapters'}")
        return 2

    reports = [check_chapter(p) for p in chapters]
    total = sum(r.callouts for r in reports)
    problems = [p for r in reports for p in r.problems]
    density_notes: list[str] = []

    for r in reports:
        lo, hi = _band_for(r.name)
        if r.callouts and not lo <= r.callouts <= hi:
            density_notes.append(f"  {r.name}: {r.callouts} callout, ngưỡng {lo}–{hi}")
        if r.problems:
            print(f"\n{r.name}")
            for p in r.problems:
                print(f"  [{p.where}] {p.message}")

    print("\n=== Tổng hợp ===")
    print(f"chương có callout : {sum(1 for r in reports if r.callouts)}/{len(reports)}")
    print(f"tổng callout      : {total}")
    if total:
        lengths = sorted(w for r in reports for w in r.words)
        print(f"độ dài callout    : min {lengths[0]}, median {lengths[len(lengths)//2]}, max {lengths[-1]} (từ)")
    print(f"lỗi cấu trúc     : {len(problems)}")

    if render:
        render_problems = render_chapters(chapters)
        for p in render_problems:
            print(f"  [render:{p.where}] {p.message}")
        print(f"lỗi render       : {len(render_problems)}")
        problems.extend(render_problems)

    if fidelity:
        repo_root = Path(__file__).resolve().parent.parent
        fid_problems = check_fidelity(chapters, repo_root, books_dir)
        for p in fid_problems:
            print(f"  [fidelity:{p.where}] {p.message}")
        print(f"sai lệch bản dịch: {len(fid_problems)}")
        problems.extend(fid_problems)

    if density_notes:
        print("\n=== Ngoài ngưỡng mật độ (cảnh báo) ===")
        print("\n".join(density_notes))

    if problems:
        return 1
    if strict and density_notes:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
