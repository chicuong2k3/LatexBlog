"""Regenerate the page-level table inside TRANSLATION_LEDGER.md for the Euler
translation.

The ledger has to account for every source page, and the plan is the thing that
decides which chapter a page belongs to, so the table is generated rather than
hand-typed.  Two inputs are read and nothing else is invented:

* ``CHAPTER_PLAN.json``  -- which chapter owns which PDF page range.
* the archive.org page map -- which printed folio each PDF page carries.

Per-page status is read back out of each chapter's frontmatter, so a chapter the
owner seals flips all of its rows at once and the ledger can never quietly claim
a page is done when the chapter is not.

Everything outside the generated markers is left untouched, so the hand-written
notes below the table survive a re-run.

Usage:
    python tools/euler_ledger.py [--plan PLAN] [--pagemap MAP] [--ledger PATH]
"""

from __future__ import annotations

import argparse
import io
import json
import re
import sys
from pathlib import Path

BEGIN = "<!-- BEGIN GENERATED PAGE TABLE -->"
END = "<!-- END GENERATED PAGE TABLE -->"

# Same rule tools/build_posts.py uses for chapter frontmatter.
FRONTMATTER = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.DOTALL)

STATUS_LABEL = {
    "hoan-thanh": "Đã dịch, đã niêm phong",
    "chua-hoan-thanh": "Đang dịch",
}
UNTRANSLATED = "Chưa dịch"


def read_status(chapter_path: Path) -> str | None:
    """Return the chapter's declared ``status``, or None when unmarked."""
    if not chapter_path.exists():
        return None
    match = FRONTMATTER.match(chapter_path.read_text(encoding="utf-8"))
    if not match:
        return None
    for line in match.group(1).splitlines():
        key, sep, value = line.partition(":")
        if sep and key.strip() == "status":
            return value.strip().strip("'\"") or None
    return None


def build_rows(plan: dict, folios: dict[int, str | None], book_dir: Path) -> list[dict]:
    rows: list[dict] = []

    for entry in plan.get("front_matter", []):
        status = read_status(book_dir / "chapters" / entry["file"])
        lo, hi = entry["pdf"]
        for pdf in range(lo, hi + 1):
            rows.append(
                {
                    "pdf": pdf,
                    "printed": entry["printed"][0] if pdf == lo else str(folios.get(pdf) or ""),
                    "file": f"chapters/{entry['file']}",
                    "status": status,
                }
            )

    for group in ("pars_prior", "pars_posterior"):
        for entry in plan.get(group, []):
            status = read_status(book_dir / "chapters" / entry["file"])
            lo, hi = entry["pdf"]
            for pdf in range(lo, hi + 1):
                rows.append(
                    {
                        "pdf": pdf,
                        "printed": str(folios.get(pdf) or ""),
                        "file": f"chapters/{entry['file']}",
                        "status": status,
                    }
                )

    for entry in plan.get("unattributed", []):
        lo, hi = entry["pdf"]
        for pdf in range(lo, hi + 1):
            is_first = pdf == lo
            rows.append(
                {
                    "pdf": pdf,
                    "printed": str(folios.get(pdf) or ""),
                    "file": "—",
                    "status": "ngoai-sach",
                    "note": entry["note"] if is_first else "",
                }
            )

    rows.sort(key=lambda r: r["pdf"])
    return rows


def render(rows: list[dict]) -> str:
    out = [BEGIN, ""]
    out.append("| PDF | Trang in | File dịch | Trạng thái | Ghi chú |")
    out.append("|---:|---:|---|---|---|")
    for row in rows:
        if row["status"] == "ngoai-sach":
            state = "Ngoài sách"
        elif row["status"] is None:
            state = UNTRANSLATED
        else:
            state = STATUS_LABEL.get(row["status"], row["status"])
        out.append(
            f"| {row['pdf']} | {row['printed'] or '—'} | `{row['file']}` | {state} "
            f"| {row.get('note', '')} |"
        )
    out.append("")
    out.append(END)
    return "\n".join(out)


def main() -> int:
    here = Path(__file__).resolve().parent.parent
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--plan", type=Path,
        default=here / "books/euler-calculi-differentialis/CHAPTER_PLAN.json")
    parser.add_argument("--pagemap", type=Path, required=True)
    parser.add_argument(
        "--ledger", type=Path,
        default=here / "books/euler-calculi-differentialis/TRANSLATION_LEDGER.md")
    args = parser.parse_args()

    plan = json.loads(args.plan.read_text(encoding="utf-8"))
    pagemap = json.loads(args.pagemap.read_text(encoding="utf-8"))
    folios = {int(r["pdf"]): r["printed"] for r in pagemap["pages"]}

    book_dir = args.plan.parent
    rows = build_rows(plan, folios, book_dir)
    table = render(rows)

    text = args.ledger.read_text(encoding="utf-8")
    if BEGIN not in text or END not in text:
        print(
            f"ledger has no generated-table markers; add\n{BEGIN}\n{END} first",
            file=sys.stderr,
        )
        return 1
    pattern = re.compile(
        re.escape(BEGIN) + r".*?" + re.escape(END), re.DOTALL)
    args.ledger.write_text(pattern.sub(table, text), encoding="utf-8")

    done = sum(1 for r in rows if r["status"] == "hoan-thanh")
    partial = sum(1 for r in rows if r["status"] == "chua-hoan-thanh")
    print(f"rows written : {len(rows)}")
    print(f"sealed       : {done}")
    print(f"in progress  : {partial}")
    print(f"untranslated : {len(rows) - done - partial}")
    print(f"ledger       : {args.ledger}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
