import json
import os
import re
import shutil
import tempfile
import unittest
from pathlib import Path

from build_books import (
    STATUS_COMPLETE,
    STATUS_INCOMPLETE,
    build_all,
    chapter_status,
    validate_book_meta,
    validate_chapter_meta,
)

pandoc = os.environ.get("PANDOC") or shutil.which("pandoc")
if not pandoc:
    for candidate in Path("tools/pandoc").rglob("pandoc.exe" if os.name == "nt" else "pandoc"):
        pandoc = str(candidate)
        break


BOOK = """---
title: "The Prisoner"
summary: "Một cuốn sách dịch thử nghiệm."
tags: [dich-sach, toan]
author: "Jane Doe"
original_title: "The Prisoner"
---

Đây là phần giới thiệu ngắn.
"""

CHAPTER = """---
title: "Chương Một"
summary: "Nội dung chương đầu tiên."
slug: chapter-one
---

# Mở đầu

Nội dung $x^2$.

$$
a+b
$$
"""

CHAPTER_INVALID_PADDED_INLINE_MATH = CHAPTER.replace("$x^2$", "$ x^2 $")

CHAPTER_INVALID_DISPLAY_CLOSER = """---
title: "Chương Một"
summary: "Nội dung chương đầu tiên."
slug: chapter-one
---

$$
a+b
\\]
"""

CHAPTER_INVALID_DOLLAR_IN_COMMENT = """---
title: "Chương Một"
summary: "Nội dung chương đầu tiên."
slug: chapter-one
---

<!-- Ghi chú dịch giả: sai số là $2a$ -->
"""

CHAPTER_COMPLETE = CHAPTER.replace(
    'slug: chapter-one', 'slug: chapter-one\nstatus: hoan-thanh'
)


class ValidateBookMetaTest(unittest.TestCase):
    def test_required_fields_are_validated(self):
        with self.assertRaisesRegex(ValueError, "missing"):
            validate_book_meta({"title": "x"}, Path("book.md"))

    def test_tags_must_be_non_empty(self):
        with self.assertRaisesRegex(ValueError, "tags"):
            validate_book_meta(
                {"title": "x", "summary": "s", "tags": []}, Path("book.md")
            )

    def test_book_manifest_status_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "not allowed on a book manifest"):
            validate_book_meta(
                {"title": "x", "summary": "s", "tags": ["t"], "status": "hoan-thanh"},
                Path("book.md"),
            )


class ChapterStatusTest(unittest.TestCase):
    def test_absent_status_is_incomplete(self):
        self.assertEqual(chapter_status({}, Path("chapter.md")), STATUS_INCOMPLETE)

    def test_complete_status_is_kept(self):
        self.assertEqual(
            chapter_status({"status": "hoan-thanh"}, Path("chapter.md")),
            STATUS_COMPLETE,
        )

    def test_incomplete_status_is_kept(self):
        self.assertEqual(
            chapter_status({"status": "chua-hoan-thanh"}, Path("chapter.md")),
            STATUS_INCOMPLETE,
        )

    def test_unknown_status_raises(self):
        with self.assertRaisesRegex(ValueError, "status"):
            chapter_status({"status": "xong"}, Path("chapter.md"))

    def test_non_string_status_raises(self):
        with self.assertRaisesRegex(ValueError, "status"):
            chapter_status({"status": True}, Path("chapter.md"))


class ValidateChapterMetaTest(unittest.TestCase):
    def test_required_fields_are_validated(self):
        with self.assertRaisesRegex(ValueError, "missing"):
            validate_chapter_meta({"title": "x"}, Path("chapter.md"))


class BuildBooksTest(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.books = self.tmp / "books"
        self.out = self.tmp / "out"
        self.index = self.tmp / "books-index.json"
        self.books.mkdir()

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def _write_book(self, folder="the-prisoner", book=BOOK, chapter=CHAPTER):
        root = self.books / folder
        chapters = root / "chapters"
        chapters.mkdir(parents=True)
        (root / "book.md").write_text(book, encoding="utf-8")
        (chapters / "01-chapter-one.md").write_text(chapter, encoding="utf-8")
        return root

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_builds_book_manifest_chapter_and_index(self):
        self._write_book()

        items = build_all(self.books, self.out, self.index, pandoc)

        self.assertEqual([item["slug"] for item in items], ["the-prisoner"])
        self.assertEqual(items[0]["chapters"][0]["slug"], "chapter-one")
        self.assertTrue(
            (self.out / "the-prisoner" / "chapters" / "chapter-one.html").exists()
        )
        self.assertTrue((self.out / "the-prisoner" / "intro.html").exists())
        data = json.loads(self.index.read_text(encoding="utf-8"))
        self.assertEqual(data[0]["author"], "Jane Doe")

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_unmarked_chapter_and_its_book_are_incomplete(self):
        self._write_book()

        items = build_all(self.books, self.out, self.index, pandoc)

        self.assertEqual(items[0]["status"], STATUS_INCOMPLETE)
        self.assertEqual(items[0]["chapters"][0]["status"], STATUS_INCOMPLETE)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_book_is_complete_only_when_every_chapter_is_sealed(self):
        root = self._write_book(chapter=CHAPTER_COMPLETE)
        (root / "chapters" / "02-chapter-two.md").write_text(
            CHAPTER.replace("chapter-one", "chapter-two"), encoding="utf-8"
        )

        items = build_all(self.books, self.out, self.index, pandoc)

        self.assertEqual(
            [chapter["status"] for chapter in items[0]["chapters"]],
            [STATUS_COMPLETE, STATUS_INCOMPLETE],
        )
        self.assertEqual(items[0]["status"], STATUS_INCOMPLETE)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_book_is_complete_when_all_chapters_are_sealed(self):
        root = self._write_book(chapter=CHAPTER_COMPLETE)
        (root / "chapters" / "02-chapter-two.md").write_text(
            CHAPTER_COMPLETE.replace("chapter-one", "chapter-two"), encoding="utf-8"
        )

        items = build_all(self.books, self.out, self.index, pandoc)

        self.assertEqual(items[0]["status"], STATUS_COMPLETE)
        data = json.loads(self.index.read_text(encoding="utf-8"))
        self.assertEqual(data[0]["status"], STATUS_COMPLETE)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_book_with_no_chapters_is_not_complete(self):
        root = self._write_book()
        (root / "chapters" / "01-chapter-one.md").unlink()

        items = build_all(self.books, self.out, self.index, pandoc)

        self.assertEqual(items[0]["status"], STATUS_INCOMPLETE)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_unknown_chapter_status_fails_the_build(self):
        self._write_book(chapter=CHAPTER.replace("slug: chapter-one", "slug: chapter-one\nstatus: xong"))

        with self.assertRaisesRegex(ValueError, "status"):
            build_all(self.books, self.out, self.index, pandoc)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_copies_book_assets_to_generated_output(self):
        root = self._write_book()
        assets = root / "assets"
        assets.mkdir()
        (assets / "figure.svg").write_text("<svg xmlns=\"http://www.w3.org/2000/svg\" />", encoding="utf-8")

        build_all(self.books, self.out, self.index, pandoc)

        copied = self.out / "the-prisoner" / "assets" / "figure.svg"
        self.assertTrue(copied.exists())
        self.assertIn("<svg", copied.read_text(encoding="utf-8"))

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_math_becomes_katex_spans_with_no_literal_dollars(self):
        self._write_book()

        build_all(self.books, self.out, self.index, pandoc)

        html = (self.out / "the-prisoner" / "chapters" / "chapter-one.html").read_text(
            encoding="utf-8"
        )
        self.assertIn('class="math inline"', html)
        self.assertIn('class="math display"', html)
        self.assertNotIn("$", html)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_padded_inline_math_fails_the_build(self):
        self._write_book(chapter=CHAPTER_INVALID_PADDED_INLINE_MATH)

        with self.assertRaisesRegex(RuntimeError, "unparsed math"):
            build_all(self.books, self.out, self.index, pandoc)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_display_block_closed_with_bracket_fails_the_build(self):
        self._write_book(chapter=CHAPTER_INVALID_DISPLAY_CLOSER)

        with self.assertRaisesRegex(RuntimeError, "unparsed math"):
            build_all(self.books, self.out, self.index, pandoc)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_dollar_inside_html_comment_fails_the_build(self):
        self._write_book(chapter=CHAPTER_INVALID_DOLLAR_IN_COMMENT)

        with self.assertRaisesRegex(RuntimeError, "HTML comment"):
            build_all(self.books, self.out, self.index, pandoc)

    def test_duplicate_book_slug_raises(self):
        duplicate = BOOK.replace(
            "tags: [dich-sach, toan]",
            "tags: [dich-sach, toan]\nslug: the-prisoner",
        )
        self._write_book("first", book=duplicate)
        self._write_book("second", book=duplicate)

        with self.assertRaisesRegex(ValueError, "slug collision"):
            build_all(self.books, self.out, self.index, pandoc or "pandoc")

    def test_unsafe_slug_raises(self):
        self._write_book(book=BOOK.replace("tags: [dich-sach, toan]", "tags: [dich-sach]\nslug: ../escape"))

        with self.assertRaisesRegex(ValueError, "unsafe slug"):
            build_all(self.books, self.out, self.index, pandoc or "pandoc")

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_does_not_touch_post_output(self):
        self._write_book()
        post_output = self.tmp / "post-output"
        post_output.mkdir()
        sentinel = post_output / "index.json"
        sentinel.write_text("post-data", encoding="utf-8")

        build_all(self.books, self.out, self.index, pandoc)

        self.assertEqual(sentinel.read_text(encoding="utf-8"), "post-data")


class BookSourceIntegrityTest(unittest.TestCase):
    """Lint the real translated sources, not a fixture.

    Pandoc silently drops a footnote definition that no reference points at, and
    silently swallows ``[^x]: text`` written as ``[x]: text`` by reading it as a
    link reference definition. Either mistake loses a citation with no build
    error, so the repo sources are checked directly.
    """

    BOOKS = Path(__file__).resolve().parent.parent / "books"
    LABEL = r"[A-Za-z0-9_-]+"

    def _chapters(self):
        return sorted(self.BOOKS.glob("*/chapters/*.md"))

    def _split_footnotes(self, text):
        definitions = dict(re.findall(rf"^\[\^({self.LABEL})\]:[ \t]*(.*)$", text, re.M))
        references = set(re.findall(rf"\[\^({self.LABEL})\]", re.sub(rf"^\[\^({self.LABEL})\]:.*$", "", text, flags=re.M)))
        return definitions, references

    def test_every_footnote_reference_has_a_definition(self):
        for chapter in self._chapters():
            with self.subTest(chapter=chapter):
                definitions, references = self._split_footnotes(chapter.read_text(encoding="utf-8"))
                self.assertEqual(
                    sorted(references - set(definitions)), [],
                    f"{chapter}: referenced but never defined",
                )

    def test_no_footnote_definition_is_orphaned(self):
        for chapter in self._chapters():
            with self.subTest(chapter=chapter):
                definitions, references = self._split_footnotes(chapter.read_text(encoding="utf-8"))
                self.assertEqual(
                    sorted(set(definitions) - references), [],
                    f"{chapter}: defined but never referenced",
                )

    def test_footnote_definitions_are_not_bare_link_references(self):
        """`[x]: text` is a Pandoc link reference; `[^x]: text` is a footnote."""
        for chapter in self._chapters():
            with self.subTest(chapter=chapter):
                text = chapter.read_text(encoding="utf-8")
                bare = set(re.findall(rf"^\[({self.LABEL})\]:", text, re.M))
                self.assertEqual(sorted(bare), [], f"{chapter}: bare link reference definition")


if __name__ == "__main__":
    unittest.main()
