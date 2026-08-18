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

import json
import os
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent


def find_pandoc():
    """Resolve pandoc: PANDOC env > tools/pandoc/** > PATH. Raise with hint."""
    env = os.environ.get("PANDOC")
    if env and Path(env).exists():
        return env
    exe = "pandoc.exe" if os.name == "nt" else "pandoc"
    local = sorted((ROOT / "tools" / "pandoc").rglob(exe))
    if local:
        return str(local[0])
    for dir_ in os.environ.get("PATH", "").split(os.pathsep):
        candidate = Path(dir_) / exe
        if candidate.exists():
            return str(candidate)
    # Windows installers (winget/msi) drop pandoc here and only update the user
    # PATH, which shells started before the install never see.
    for var in ("LOCALAPPDATA", "ProgramFiles"):
        base = os.environ.get(var)
        if base and (Path(base) / "Pandoc" / exe).exists():
            return str(Path(base) / "Pandoc" / exe)
    raise FileNotFoundError(
        "pandoc not found. Install it (see README or docs/Htmxor-verdict.md) "
        "or set PANDOC=/path/to/pandoc"
    )


def render_pandoc(pandoc, tex_path, out_html):
    """Convert one .tex to an HTML fragment with KaTeX + pygments spans."""
    cmd = [
        pandoc, str(tex_path),
        "--from", "latex",
        "--to", "html5",
        "--katex",
        "--highlight-style=pygments",
        "--wrap=none",
    ]
    proc = subprocess.run(
        cmd, capture_output=True, text=True,
        encoding="utf-8", errors="replace",
    )
    if proc.returncode != 0:
        raise RuntimeError(
            f"pandoc failed for {tex_path.name}:\n{proc.stderr[:2000]}"
        )
    out_html.write_text(proc.stdout, encoding="utf-8")


def write_pygments_css(pandoc, out_css):
    """Extract the pygments <style> block pandoc emits for standalone HTML."""
    probe = "```python\nprint('hi')\n```\n"
    proc = subprocess.run(
        [pandoc, "--from", "markdown", "--to", "html5", "--standalone",
         "--highlight-style=pygments"],
        input=probe, capture_output=True, text=True,
        encoding="utf-8", errors="replace",
    )
    if proc.returncode != 0:
        raise RuntimeError(f"pandoc css generation failed:\n{proc.stderr[:2000]}")
    m = re.search(r"<style>(.*?)</style>", proc.stdout, re.DOTALL)
    if not m:
        raise RuntimeError("could not extract pygments CSS from pandoc output")
    block = m.group(1).strip()
    # Keep only the syntax-highlighting part; pandoc's document template CSS
    # (html/body max-width, p/a/h1.. margins, ...) would fight our design.
    marker = "/* CSS for syntax highlighting */"
    idx = block.find(marker)
    if idx != -1:
        block = block[idx:]
    out_css.write_text(block, encoding="utf-8")


def build_all(posts_dir, out_dir, index_path, pandoc):
    """Render all .tex posts; return metadata list sorted by date desc."""
    posts = sorted(Path(posts_dir).glob("*.tex"))
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    index = []
    seen_slugs = {}
    for tex in posts:
        text = tex.read_text(encoding="utf-8")
        meta, _ = parse_frontmatter(text)
        slug = meta.get("slug", tex.stem)
        if slug in seen_slugs:
            raise ValueError(
                f"slug collision: {tex.name} and {seen_slugs[slug]} "
                f"both map to '{slug}'"
            )
        seen_slugs[slug] = tex.name
        validate_meta(meta, slug, tex)
        out_html = out_dir / f"{slug}.html"
        render_pandoc(pandoc, tex, out_html)
        index.append({
            "slug": slug,
            "title": meta["title"],
            "date": meta["date"],
            "tags": meta["tags"],
            "summary": meta["summary"],
        })
        print(f"  rendered {tex.name} -> {out_html}")
    index.sort(key=lambda p: p["date"], reverse=True)
    index_path = Path(index_path)
    index_path.parent.mkdir(parents=True, exist_ok=True)
    index_path.write_text(
        json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return index


def main():
    try:
        pandoc = find_pandoc()
    except FileNotFoundError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 2
    posts_dir = ROOT / "posts"
    out_dir = ROOT / "wwwroot" / "generated" / "posts"
    index_path = ROOT / "wwwroot" / "generated" / "index.json"
    css_path = ROOT / "wwwroot" / "generated" / "pygments.css"
    try:
        items = build_all(posts_dir, out_dir, index_path, pandoc)
        write_pygments_css(pandoc, css_path)
    except (ValueError, RuntimeError, OSError) as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1
    if not items:
        print("No posts found in posts/", file=sys.stderr)
        return 1
    print(f"wrote {index_path} ({len(items)} posts)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
