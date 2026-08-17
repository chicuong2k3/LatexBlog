#!/usr/bin/env python3
"""Build blog posts from LaTeX sources (stdlib only).

Part 1: frontmatter parsing, slugification, validation.
Part 2 (Task 5): pandoc rendering + index.json.
"""
import re
import unicodedata
from datetime import date
from pathlib import Path

FRONTMATTER_RE = re.compile(
    r"^%\s*---\s*\n(?P<body>(?:^%.*$\n?)*?)^%\s*---\s*$",
    re.MULTILINE,
)

REQUIRED_FIELDS = ("title", "date", "tags", "summary")


def parse_frontmatter(text):
    """Extract YAML-ish frontmatter from a %--- comment block.

    Returns (meta: dict, body: str). Meta keys are lowercased.
    Supports: title: "string", date: YYYY-MM-DD, tags: [a, b],
    summary: "string", slug: "string".
    """
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text.strip()
    meta = {}
    for raw_line in m.group("body").splitlines():
        line = raw_line.strip().lstrip("%").strip()
        if not line or ":" not in line:
            continue
        key, _, value = line.partition(":")
        key = key.strip().lower()
        value = value.strip()
        if not key or not value:
            continue
        if value.startswith("[") and value.endswith("]"):
            items = [v.strip().strip("'\"") for v in value[1:-1].split(",")]
            meta[key] = [i for i in items if i]
        else:
            meta[key] = value.strip("'\"")
    body = text[m.end():].strip()
    return meta, body


def slugify_title(title):
    """Vietnamese diacritic-stripped kebab-case URL slug."""
    # D-with-stroke (Đ/đ) has no combining marks; map it explicitly.
    s = title.replace("Đ", "D").replace("đ", "d")
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or "untitled"


def validate_meta(meta, slug, path):
    """Raise ValueError with file+field context on invalid frontmatter."""
    missing = [f for f in REQUIRED_FIELDS if f not in meta]
    if missing:
        raise ValueError(
            f"{path.name}: missing frontmatter field(s): {', '.join(missing)}"
        )
    try:
        date.fromisoformat(meta["date"])
    except ValueError:
        raise ValueError(
            f"{path.name}: invalid date {meta['date']!r}, expected YYYY-MM-DD"
        )
    if not isinstance(meta["tags"], list) or not meta["tags"]:
        raise ValueError(f"{path.name}: tags must be a non-empty list")
