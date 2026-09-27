"""Build the definitive PDF-page <-> printed-page map for the Euler 1755 scan.

archive.org ships a ``scandata.xml`` per item whose ``<pageData>`` lists every
scan leaf with its printed ``pageNumber``.  That mapping is far more reliable
than guessing folios out of the OCR running heads, so we use it as the index
the translation ledger cites.

Usage:
    python books/tools/build_euler_pagemap.py <scandata.xml> <out.json>
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from xml.etree import ElementTree as ET

# ``pageNumber`` is sometimes absent, sometimes an empty string, and on plates
# and blank leaves it holds a decorative value rather than a folio.
PAGE_DATA = re.compile(r"pageNumber\s*=\s*\"(?P<v>[^\"]*)\"")


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    src = Path(sys.argv[1])
    dest = Path(sys.argv[2])

    root = ET.parse(src).getroot()
    pages = root.find("pageData")

    rows: list[dict] = []
    for leaf, page in enumerate(pages.findall("page")):
        number = page.get("pageNumber", "")
        rows.append(
            {
                "leaf": leaf,
                # archive.org counts leaves from 0; the downloadable PDF has a
                # 1-based page index, so pdf = leaf + 1.
                "pdf": leaf + 1,
                "printed": number.strip() or None,
                "page_type": page.get("pageType", "").strip() or None,
                "add_to_access_formats": page.get("addToAccessFormats", ""),
            }
        )

    payload = {
        "source": src.name,
        "leaf_count": len(rows),
        "pages": rows,
    }
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")

    numbered = [r for r in rows if r["printed"]]
    print(f"leaves        : {len(rows)}")
    print(f"with folio    : {len(numbered)}")
    print(f"first numbered: {numbered[0] if numbered else None}")
    print(f"last numbered : {numbered[-1] if numbered else None}")
    print(f"written       : {dest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
