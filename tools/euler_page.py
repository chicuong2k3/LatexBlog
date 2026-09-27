"""Print the OCR text of a given inclusive range of PDF pages from the paged
Euler working text, so a boundary or a doubtful reading can be checked against
the scan."""

from __future__ import annotations

import argparse
import io
import re
import sys

PAGE_MARK = re.compile(r"^<<<PDF p(\d{4})>>>$")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("ocr")
    parser.add_argument("lo", type=int)
    parser.add_argument("hi", type=int, nargs="?")
    args = parser.parse_args()
    hi = args.hi if args.hi is not None else args.lo

    page = 0
    for raw in io.open(args.ocr, encoding="utf-8").read().splitlines():
        mark = PAGE_MARK.match(raw.strip())
        if mark:
            page = int(mark.group(1))
            continue
        if page and args.lo <= page <= hi and raw.strip():
            print(f"p{page:04d}| {raw.rstrip()}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
