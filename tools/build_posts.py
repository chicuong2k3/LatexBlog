#!/usr/bin/env python3
"""Build blog posts from LaTeX or Markdown sources (stdlib only).

Part 1: frontmatter parsing, slugification, validation.
Part 2 (Task 5): pandoc rendering + index.json.

Supports two authoring formats in posts/:
- *.tex  → Pandoc LaTeX reader, frontmatter in %--- comment block.
- *.md   → Pandoc Markdown reader, frontmatter as standard YAML ---...--- block.
"""
import re
import unicodedata
from datetime import date
from pathlib import Path

# LaTeX frontmatter: %--- comment block (existing format).
FRONTMATTER_RE = re.compile(
    r"^%\s*---\s*\n(?P<body>(?:^%.*$\n?)*?)^%\s*---\s*$",
    re.MULTILINE,
)

# Markdown frontmatter: standard YAML ---...--- block at the very start.
YAML_FRONTMATTER_RE = re.compile(
    r"\A---\s*\n(?P<body>.*?)\n---\s*\n",
    re.DOTALL,
)

REQUIRED_FIELDS = ("title", "date", "tags", "summary")


def parse_frontmatter(text):
    """Extract YAML-ish frontmatter.

    Tries the LaTeX %--- comment block first, then the standard YAML
    ---...--- block (used by .md posts). Returns (meta: dict, body: str).
    Meta keys are lowercased.
    Supports: title: "string", date: YYYY-MM-DD, tags: [a, b],
    summary: "string", slug: "string".
    """
    m = FRONTMATTER_RE.match(text)
    if not m:
        m = YAML_FRONTMATTER_RE.match(text)
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


BLOGFIG_RE = re.compile(
    r"\\blogfig\{\s*(\\includegraphics(?:\[[^\]]*\])?\{[^}]*\})\s*\}"
)


def _pandoc_reader(source_name):
    """Pick Pandoc --from reader based on file extension."""
    if source_name.endswith(".md"):
        # markdown: default extensions + explicit \( \) and \[ \] math.
        return "markdown+tex_math_single_backslash+tex_math_double_backslash"
    return "latex"


UNPARSED_MATH_HINT_LINES = 12


def _surviving_dollars(body_text, html):
    """Count dollars in the HTML that no source construct accounts for.

    An escaped ``\\$`` is meant to reach the reader as a literal dollar sign --
    a price in a library notice, say -- so it is not a sign of dropped math.
    Only the surplus over those escapes indicates a math span Pandoc gave up
    on.
    """
    return html.count("$") - body_text.count("\\$")


def _unparsed_math_report(source_name, body_text, html):
    """Explain why a dollar sign survived into the rendered HTML.

    Pandoc drops a math span it cannot parse, then lets ordinary Markdown eat
    the raw TeX, so the failure is invisible in the output: no error, just a
    wrong formula. An unaccounted '$' reaching the HTML is therefore the
    signature.

    Posts legitimately contain '$' (shell variables inside code blocks), so
    this is opt-in per call site rather than always on.
    """
    count = _surviving_dollars(body_text, html)
    lines = [
        f"  {i}: {line.strip()[:90]}"
        for i, line in enumerate(body_text.split("\n"), 1)
        if "$" in line
    ]
    hint = "\n".join(lines[:UNPARSED_MATH_HINT_LINES])
    if len(lines) > UNPARSED_MATH_HINT_LINES:
        hint += f"\n  ... and {len(lines) - UNPARSED_MATH_HINT_LINES} more"
    return (
        f"unparsed math in {source_name}: {count} '$' survived into the HTML.\n"
        f"Pandoc did not treat every math span as math, so the raw TeX was "
        f"parsed as Markdown and mangled. Usual causes: a display block "
        f"closed with '\\]' instead of '$$'; a closing '$' typed as '\\)' or a "
        f"backtick; inline math padded with spaces; an odd number of '$$'.\n"
        f"Lines containing '$':\n{hint}"
    )


def render_pandoc(
    pandoc, source_name, body_text, out_html, reject_literal_dollars=False
):
    """Convert one post body (.tex or .md) to an HTML fragment.

    ``source_name`` picks the Pandoc reader (``*.tex`` → latex, ``*.md``
    → markdown). ``body_text`` is the post with frontmatter already
    stripped by ``parse_frontmatter``.

    For LaTeX sources, ``\\blogfig{\\includegraphics{...}}`` marks
    blog-only illustrations: direct pdfLaTeX builds expand \\blogfig to
    nothing (macro defined empty in the post preamble), while this build
    unwraps the wrapper so Pandoc turns the \\includegraphics into a
    real <img> for the web.

    ``reject_literal_dollars`` turns a surviving '$' into a hard error. Books
    want it: every '$' there is meant as math. Posts must leave it off, since
    shell snippets legitimately contain '$env:'-style variables.
    """
    cmd = [
        pandoc,
        "--from", _pandoc_reader(source_name),
        "--to", "html5",
        "--katex",
        "--highlight-style=pygments",
        "--wrap=none",
    ]
    text = BLOGFIG_RE.sub(r"\1", body_text)
    proc = subprocess.run(
        cmd, input=text, capture_output=True, text=True,
        encoding="utf-8", errors="replace",
    )
    if proc.returncode != 0:
        raise RuntimeError(
            f"pandoc failed for {source_name}:\n{proc.stderr[:2000]}"
        )
    if reject_literal_dollars and _surviving_dollars(body_text, proc.stdout) > 0:
        raise RuntimeError(
            _unparsed_math_report(source_name, body_text, proc.stdout)
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
    """Render all .tex + .md posts; return metadata list sorted by date desc."""
    posts_dir = Path(posts_dir)
    posts = sorted(list(posts_dir.glob("*.tex")) + list(posts_dir.glob("*.md")))
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    index = []
    seen_slugs = {}
    for post in posts:
        text = post.read_text(encoding="utf-8")
        meta, body = parse_frontmatter(text)
        slug = meta.get("slug", post.stem)
        if slug in seen_slugs:
            raise ValueError(
                f"slug collision: {post.name} and {seen_slugs[slug]} "
                f"both map to '{slug}'"
            )
        seen_slugs[slug] = post.name
        validate_meta(meta, slug, post)
        out_html = out_dir / f"{slug}.html"
        render_pandoc(pandoc, post.name, body, out_html)
        index.append({
            "slug": slug,
            "title": meta["title"],
            "date": meta["date"],
            "tags": meta["tags"],
            "summary": meta["summary"],
            "tldr": meta.get("tldr", ""),
        })
        print(f"  rendered {post.name} -> {out_html}")
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
    # Windows consoles default to cp1252; paths like "Ảnh" crash print().
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    sys.exit(main())
