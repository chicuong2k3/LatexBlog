"""Build translated-book sources into a separate generated collection."""

from __future__ import annotations

import json
import re
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from build_posts import find_pandoc, parse_frontmatter, render_pandoc, slugify_title

BOOK_REQUIRED = ("title", "summary", "tags")
CHAPTER_REQUIRED = ("title", "summary")
SAFE_SEGMENT = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
CHAPTER_PREFIX = re.compile(r"^(\d+)")


class BookBuildError(ValueError):
    """A source or output error tied to a specific book file."""

    def __init__(self, path: Path, message: str) -> None:
        self.path = path
        self.message = message
        super().__init__(f"{path}: {message}")


@dataclass(frozen=True, slots=True)
class ChapterSource:
    path: Path
    slug: str
    number: int
    prefix: int
    title: str
    summary: str
    body: str


@dataclass(frozen=True, slots=True)
class BookSource:
    directory: Path
    manifest: Path
    slug: str
    title: str
    author: str | None
    original_title: str | None
    language: str
    summary: str
    tags: list[str]
    body: str
    chapters: tuple[ChapterSource, ...]


def _required_text(meta: dict[str, Any], key: str, path: Path) -> str:
    value = meta.get(key)
    if not isinstance(value, str) or not value.strip():
        raise BookBuildError(path, f"frontmatter field {key!r} must be non-empty text")
    return value.strip()


def _optional_text(meta: dict[str, Any], key: str, path: Path) -> str | None:
    value = meta.get(key)
    if value is None:
        return None
    if not isinstance(value, str) or not value.strip():
        raise BookBuildError(path, f"frontmatter field {key!r} must be non-empty text")
    return value.strip()


def _required_tags(meta: dict[str, Any], path: Path) -> list[str]:
    value = meta.get("tags")
    if not isinstance(value, list) or not value or not all(isinstance(tag, str) and tag.strip() for tag in value):
        raise BookBuildError(path, "frontmatter field 'tags' must be a non-empty list")
    return [tag.strip() for tag in value]


def _safe_slug(value: str, path: Path) -> str:
    if not SAFE_SEGMENT.fullmatch(value):
        raise BookBuildError(path, f"unsafe slug {value!r}; expected kebab-case")
    return value


def validate_book_meta(meta: dict[str, Any], path: Path) -> None:
    """Validate required book manifest fields at the source boundary."""
    missing = [key for key in BOOK_REQUIRED if key not in meta]
    if missing:
        raise BookBuildError(path, f"missing frontmatter field(s): {', '.join(missing)}")
    _required_text(meta, "title", path)
    _required_text(meta, "summary", path)
    _required_tags(meta, path)


def validate_chapter_meta(meta: dict[str, Any], path: Path) -> None:
    """Validate required chapter manifest fields at the source boundary."""
    missing = [key for key in CHAPTER_REQUIRED if key not in meta]
    if missing:
        raise BookBuildError(path, f"missing frontmatter field(s): {', '.join(missing)}")
    _required_text(meta, "title", path)
    _required_text(meta, "summary", path)


def _parse_source(path: Path, book: bool) -> tuple[dict[str, Any], str]:
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as exc:
        raise BookBuildError(path, f"could not read source: {exc}") from exc
    meta, body = parse_frontmatter(text)
    if book:
        validate_book_meta(meta, path)
    else:
        validate_chapter_meta(meta, path)
    return meta, body


def _chapter_number(meta: dict[str, Any], path: Path) -> int:
    raw = meta.get("number")
    if raw is None:
        match = CHAPTER_PREFIX.match(path.stem)
        return int(match.group(1)) if match else 0
    if isinstance(raw, bool):
        raise BookBuildError(path, "frontmatter field 'number' must be a positive integer")
    try:
        number = int(raw)
    except (TypeError, ValueError) as exc:
        raise BookBuildError(path, "frontmatter field 'number' must be a positive integer") from exc
    if number < 1:
        raise BookBuildError(path, "frontmatter field 'number' must be a positive integer")
    return number


def _manifest_path(directory: Path) -> Path:
    candidates = [directory / "book.md", directory / "book.tex"]
    found = [path for path in candidates if path.exists()]
    if len(found) != 1:
        raise BookBuildError(directory, "expected exactly one book.md or book.tex manifest")
    return found[0]


def _book_source(directory: Path, seen_book_slugs: dict[str, Path]) -> BookSource:
    manifest = _manifest_path(directory)
    meta, body = _parse_source(manifest, book=True)
    slug = _safe_slug(str(meta.get("slug") or directory.name), manifest)
    if slug in seen_book_slugs:
        raise BookBuildError(manifest, f"slug collision: {seen_book_slugs[slug]} and {manifest}")
    seen_book_slugs[slug] = manifest

    chapters_dir = directory / "chapters"
    chapter_files = sorted(chapters_dir.glob("*.md")) + sorted(chapters_dir.glob("*.tex"))
    chapters: list[ChapterSource] = []
    seen_chapter_slugs: dict[str, Path] = {}
    for chapter_path in chapter_files:
        chapter_meta, chapter_body = _parse_source(chapter_path, book=False)
        chapter_slug = _safe_slug(str(chapter_meta.get("slug") or chapter_path.stem), chapter_path)
        if chapter_slug in seen_chapter_slugs:
            raise BookBuildError(chapter_path, f"slug collision: {seen_chapter_slugs[chapter_slug]} and {chapter_path}")
        seen_chapter_slugs[chapter_slug] = chapter_path
        prefix_match = CHAPTER_PREFIX.match(chapter_path.stem)
        prefix = int(prefix_match.group(1)) if prefix_match else 0
        chapters.append(ChapterSource(
            path=chapter_path,
            slug=chapter_slug,
            number=_chapter_number(chapter_meta, chapter_path),
            prefix=prefix,
            title=_required_text(chapter_meta, "title", chapter_path),
            summary=_required_text(chapter_meta, "summary", chapter_path),
            body=chapter_body,
        ))

    chapters.sort(key=lambda chapter: (chapter.number, chapter.prefix, chapter.path.name))
    return BookSource(
        directory=directory,
        manifest=manifest,
        slug=slug,
        title=_required_text(meta, "title", manifest),
        author=_optional_text(meta, "author", manifest),
        original_title=_optional_text(meta, "original_title", manifest),
        language=_optional_text(meta, "language", manifest) or "vi",
        summary=_required_text(meta, "summary", manifest),
        tags=_required_tags(meta, manifest),
        body=body,
        chapters=tuple(chapters),
    )


def build_all(
    books_dir: Path,
    out_dir: Path,
    index_path: Path,
    pandoc: str,
) -> list[dict[str, Any]]:
    """Render all books and return their JSON index entries."""
    books_dir = Path(books_dir)
    out_dir = Path(out_dir)
    index_path = Path(index_path)
    seen_book_slugs: dict[str, Path] = {}
    sources = [
        _book_source(directory, seen_book_slugs)
        for directory in sorted(path for path in books_dir.iterdir() if path.is_dir())
    ]
    out_dir.mkdir(parents=True, exist_ok=True)
    index: list[dict[str, Any]] = []

    for book in sorted(sources, key=lambda source: source.title.casefold()):
        book_out = out_dir / book.slug
        book_out.mkdir(parents=True, exist_ok=True)
        assets_source = book.directory / "assets"
        assets_output = book_out / "assets"
        if assets_source.is_dir():
            if assets_output.exists():
                shutil.rmtree(assets_output)
            shutil.copytree(assets_source, assets_output)
        elif assets_output.exists():
            shutil.rmtree(assets_output)
        intro_path = ""
        if book.body:
            intro = book_out / "intro.html"
            render_pandoc(pandoc, book.manifest.name, book.body, intro)
            intro_path = "intro.html"

        chapters: list[dict[str, Any]] = []
        for chapter in book.chapters:
            chapter_path = book_out / "chapters" / f"{chapter.slug}.html"
            chapter_path.parent.mkdir(parents=True, exist_ok=True)
            render_pandoc(pandoc, chapter.path.name, chapter.body, chapter_path)
            chapters.append({
                "slug": chapter.slug,
                "number": chapter.number,
                "title": chapter.title,
                "summary": chapter.summary,
                "htmlPath": f"chapters/{chapter.slug}.html",
            })

        index.append({
            "slug": book.slug,
            "title": book.title,
            "author": book.author,
            "originalTitle": book.original_title,
            "language": book.language,
            "summary": book.summary,
            "tags": book.tags,
            "introPath": intro_path,
            "chapters": chapters,
        })

    index_path.parent.mkdir(parents=True, exist_ok=True)
    index_path.write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
    return index


build_books = build_all


def main() -> int:
    """Build the separate generated book collection."""
    try:
        pandoc = find_pandoc()
    except FileNotFoundError as exc:
        print(f"ERROR: {exc}", file=__import__("sys").stderr)
        return 2

    root = Path(__file__).resolve().parent.parent
    books_dir = root / "books"
    out_dir = root / "wwwroot" / "generated" / "books"
    index_path = out_dir / "index.json"
    try:
        items = build_all(books_dir, out_dir, index_path, pandoc)
    except (BookBuildError, OSError, RuntimeError) as exc:
        print(f"ERROR: {exc}", file=__import__("sys").stderr)
        return 1
    print(f"wrote {index_path} ({len(items)} books)")
    return 0


if __name__ == "__main__":
    import sys

    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    raise SystemExit(main())
