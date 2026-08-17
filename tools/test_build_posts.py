import unittest
from pathlib import Path

from build_posts import parse_frontmatter, slugify_title, validate_meta

SAMPLE = """%---
% title: "Đạo hàm và ý nghĩa hình học"
% date: 2026-08-17
% tags: [math, latex]
% summary: "Tìm hiểu đạo hàm qua góc nhìn hình học."
%---
\\section{Giới thiệu}
\\begin{equation}
f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}
\\end{equation}
"""


class ParseFrontmatterTest(unittest.TestCase):
    def test_parses_all_fields(self):
        meta, body = parse_frontmatter(SAMPLE)
        self.assertEqual(meta["title"], "Đạo hàm và ý nghĩa hình học")
        self.assertEqual(meta["date"], "2026-08-17")
        self.assertEqual(meta["tags"], ["math", "latex"])
        self.assertEqual(meta["summary"], "Tìm hiểu đạo hàm qua góc nhìn hình học.")
        self.assertNotIn("slug", meta)

    def test_body_has_frontmatter_stripped(self):
        _, body = parse_frontmatter(SAMPLE)
        self.assertNotIn("%---", body)
        self.assertIn("\\section{Giới thiệu}", body)

    def test_no_frontmatter_returns_empty_meta_and_full_text(self):
        meta, body = parse_frontmatter("\\section{X}\nplain text\n")
        self.assertEqual(meta, {})
        self.assertIn("\\section{X}", body)

    def test_optional_slug(self):
        meta, _ = parse_frontmatter("%---\n% slug: \"my-post\"\n%---\nbody\n")
        self.assertEqual(meta["slug"], "my-post")

    def test_key_lowercased(self):
        meta, _ = parse_frontmatter("%---\n% Title: \"X\"\n%---\nbody\n")
        self.assertEqual(meta["title"], "X")


class SlugifyTitleTest(unittest.TestCase):
    def test_vietnamese_diacritics_stripped(self):
        self.assertEqual(
            slugify_title("Đạo hàm và ý nghĩa hình học"),
            "dao-ham-va-y-nghia-hinh-hoc",
        )

    def test_empty_title_falls_back(self):
        self.assertEqual(slugify_title("   "), "untitled")


class ValidateMetaTest(unittest.TestCase):
    def _meta(self, **overrides):
        m = {"title": "x", "date": "2026-01-01", "tags": ["a"], "summary": "s"}
        m.update(overrides)
        return m

    def test_valid_passes(self):
        validate_meta(self._meta(), "x", Path("x.tex"))  # must not raise

    def test_missing_field_raises(self):
        for field in ("title", "date", "tags", "summary"):
            with self.subTest(field=field):
                meta = self._meta()
                del meta[field]
                with self.assertRaises(ValueError) as ctx:
                    validate_meta(meta, "x", Path("x.tex"))
                self.assertIn(field, str(ctx.exception))
                self.assertIn("x.tex", str(ctx.exception))

    def test_bad_date_raises(self):
        with self.assertRaises(ValueError):
            validate_meta(self._meta(date="2026/08/17"), "x", Path("x.tex"))

    def test_empty_tags_raises(self):
        with self.assertRaises(ValueError):
            validate_meta(self._meta(tags=[]), "x", Path("x.tex"))


if __name__ == "__main__":
    unittest.main()
