"""Extract the archive.org page-number map for a scan and report the
PDF-page <-> printed-page offset, plus every place the offset jumps.

archive.org exposes a ``page_numbers`` block on the metadata endpoint mapping
each scan leaf to its printed folio.  Offsets are *not* constant in 18th-century
Google Books scans -- inserted plates, blank leaves and one out-of-order section
in this copy all move it -- so the ledger needs the jumps listed explicitly
rather than a single arithmetic rule.

Usage:
    python books/tools/euler_pagemap_report.py [--json OUT] [IDENTIFIER]
"""

from __future__ import annotations

import argparse
import json
import sys
import urllib.request

DEFAULT_ID = "bub_gb_sYE_AAAAcAAJ"


def fetch(identifier: str) -> dict:
    url = f"https://archive.org/metadata/{identifier}"
    with urllib.request.urlopen(url, timeout=120) as response:
        return json.load(response)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("identifier", nargs="?", default=DEFAULT_ID)
    parser.add_argument("--json", dest="json_out")
    args = parser.parse_args()

    meta = fetch(args.identifier)
    block = meta.get("page_numbers") or {}
    pages = block.get("pages") or []
    if not pages:
        print("metadata carries no page_numbers block", file=sys.stderr)
        return 1

    rows = []
    for entry in pages:
        leaf = entry.get("leafNum")
        printed = entry.get("pageNumber")
        if leaf is None:
            continue
        rows.append(
            {
                # archive.org numbers leaves from 0; the downloadable PDF is
                # 1-based, so pdf = leaf + 1.
                "pdf": int(leaf) + 1,
                "printed": str(printed).strip() or None,
                "confidence": entry.get("confidence"),
            }
        )
    rows.sort(key=lambda r: r["pdf"])

    def as_int(value: str | None) -> int | None:
        try:
            return int(value)  # type: ignore[arg-type]
        except (TypeError, ValueError):
            return None

    offsets: list[dict] = []
    previous = None
    for row in rows:
        printed = as_int(row["printed"])
        if printed is None:
            row["offset"] = None
            continue
        offset = row["pdf"] - printed
        row["offset"] = offset
        if previous is None or offset != previous:
            offsets.append(
                {
                    "pdf": row["pdf"],
                    "printed": row["printed"],
                    "offset": offset,
                    "change": "start" if previous is None else previous - offset,
                }
            )
            previous = offset

    print(f"identifier    : {args.identifier}")
    print(f"leaves        : {len(rows)}")
    print(f"overall conf. : {block.get('confidence')}")
    print(f"offset jumps  : {len(offsets)}")
    print()
    for jump in offsets:
        if jump["change"] == "start":
            note = "(start)"
        else:
            note = f"({jump['change']:+d} vs previous)"
        print(
            f"  pdf {jump['pdf']:>4} = printed {jump['printed']:>4}"
            f"   offset {jump['offset']:+d}   {note}"
        )

    if args.json_out:
        payload = {
            "identifier": args.identifier,
            "confidence": block.get("confidence"),
            "offset_jumps": offsets,
            "pages": rows,
        }
        with open(args.json_out, "w", encoding="utf-8") as handle:
            json.dump(payload, handle, ensure_ascii=False, indent=1)
        print(f"\nwritten: {args.json_out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
