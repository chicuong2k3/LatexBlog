import json
import os
import shutil
import tempfile
import unittest
from pathlib import Path

from build_books import build_all, validate_book_meta, validate_chapter_meta

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
"""


class ValidateBookMetaTest(unittest.TestCase):
    def test_required_fields_are_validated(self):
        with self.assertRaisesRegex(ValueError, "missing"):
            validate_book_meta({"title": "x"}, Path("book.md"))

    def test_tags_must_be_non_empty(self):
        with self.assertRaisesRegex(ValueError, "tags"):
            validate_book_meta(
                {"title": "x", "summary": "s", "tags": []}, Path("book.md")
            )


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
    def test_copies_book_assets_to_generated_output(self):
        root = self._write_book()
        assets = root / "assets"
        assets.mkdir()
        (assets / "figure.svg").write_text("<svg xmlns=\"http://www.w3.org/2000/svg\" />", encoding="utf-8")

        build_all(self.books, self.out, self.index, pandoc)

        copied = self.out / "the-prisoner" / "assets" / "figure.svg"
        self.assertTrue(copied.exists())
        self.assertIn("<svg", copied.read_text(encoding="utf-8"))

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


if __name__ == "__main__":
    unittest.main()
