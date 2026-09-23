import json
import os
import shutil
import tempfile
import unittest
from pathlib import Path

from build_posts import build_all, find_pandoc, parse_frontmatter, slugify_title, validate_meta, write_pygments_css

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

SAMPLE_TEX = """%---
% title: "Bài viết A"
% date: 2026-08-17
% tags: [toan]
% summary: "Tóm tắt A."
%---
\\section{Mở đầu}
Text $x^2$ here.
\\begin{verbatim}
def hi():
    return 1
\\end{verbatim}
"""

SAMPLE_MD = """---
title: "Bài viết Markdown"
date: 2026-09-23
tags: [meta, markdown]
summary: "Bài mẫu minh hoạ pipeline .md."
slug: markdown-post
---

# Heading 1

## Heading 2

### Heading 3

Inline math $E = mc^2$ và \\( \\sqrt{x} \\).

$$
\\begin{cases}
x + y = 3 \\\\
2x - y = 0
\\end{cases}
$$

```python
def hi():
    return 1
```

> Blockquote.

- Item 1
- Item 2
  1. Nested

| A | B |
|---|---|
| 1 | 2 |

Footnote.[^1]

[^1]: Nội dung footnote.
"""

SAMPLE_MD_DEFAULT_SLUG = """---
title: "Bài slug mặc định"
date: 2026-09-20
tags: [meta]
summary: "Không có slug."
---

# Nội dung
"""

pandoc = os.environ.get("PANDOC") or shutil.which("pandoc")
if not pandoc:
    for _cand in Path("tools/pandoc").rglob("pandoc.exe" if os.name == "nt" else "pandoc"):
        pandoc = str(_cand)
        break


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

    def test_parses_yaml_frontmatter(self):
        meta, body = parse_frontmatter(SAMPLE_MD)
        self.assertEqual(meta["title"], "Bài viết Markdown")
        self.assertEqual(meta["date"], "2026-09-23")
        self.assertEqual(meta["tags"], ["meta", "markdown"])
        self.assertEqual(meta["summary"], "Bài mẫu minh hoạ pipeline .md.")
        self.assertEqual(meta["slug"], "markdown-post")
        self.assertNotIn("---", body.splitlines()[0])

    def test_yaml_body_has_frontmatter_stripped(self):
        _, body = parse_frontmatter(SAMPLE_MD)
        self.assertTrue(body.startswith("# Heading 1"))
        self.assertNotIn("title:", body)
        self.assertIn("$E = mc^2$", body)

    def test_tex_regex_does_not_match_yaml_md(self):
        meta, body = parse_frontmatter(SAMPLE_MD)
        self.assertNotIn("%---", body)

    def test_yaml_regex_does_not_match_tex(self):
        meta, _ = parse_frontmatter(SAMPLE_TEX)
        self.assertEqual(meta["title"], "Bài viết A")


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


class FindPandocTest(unittest.TestCase):
    def test_returns_path(self):
        p = find_pandoc()
        self.assertTrue(p)
        self.assertTrue(Path(p).exists())


class BuildAllTest(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.posts = self.tmp / "posts"
        self.out = self.tmp / "out"
        self.index = self.tmp / "index.json"
        self.posts.mkdir()

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def _write_post(self, name, content):
        (self.posts / name).write_text(content, encoding="utf-8")

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_renders_html_and_writes_index_sorted_desc(self):
        self._write_post("b.tex", SAMPLE_TEX)
        self._write_post(
            "a.tex",
            SAMPLE_TEX.replace("2026-08-17", "2026-08-01").replace("Bài viết A", "Bài viết B"),
        )
        items = build_all(self.posts, self.out, self.index, pandoc)
        self.assertEqual([i["slug"] for i in items], ["b", "a"])
        html = (self.out / "b.html").read_text(encoding="utf-8")
        self.assertIn('class="math inline"', html)
        self.assertIn("<pre", html)
        data = json.loads(self.index.read_text(encoding="utf-8"))
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]["title"], "Bài viết A")

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_slug_collision_raises(self):
        self._write_post("a.tex", SAMPLE_TEX)
        self._write_post(
            "b.tex",
            SAMPLE_TEX.replace("Bài viết A", "Bài viết B")
                      .replace('tags: [toan]', 'tags: [toan]\n% slug: "a"'),
        )
        with self.assertRaises(ValueError) as ctx:
            build_all(self.posts, self.out, self.index, pandoc)
        self.assertIn("slug collision", str(ctx.exception))

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_pygments_css_extracted(self):
        css_path = self.tmp / "pygments.css"
        write_pygments_css(pandoc, css_path)
        css = css_path.read_text(encoding="utf-8")
        self.assertGreater(len(css), 100)
        self.assertIn("color", css)
        self.assertNotIn("<style>", css)

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_builds_md_post(self):
        self._write_post("markdown-post.md", SAMPLE_MD)
        items = build_all(self.posts, self.out, self.index, pandoc)
        self.assertEqual([i["slug"] for i in items], ["markdown-post"])
        html = (self.out / "markdown-post.html").read_text(encoding="utf-8")
        self.assertIn('<h1 id="heading-1"', html)
        self.assertIn('<h2 id="heading-2"', html)
        self.assertIn('<h3 id="heading-3"', html)
        self.assertIn('class="math display"', html)
        self.assertIn('class="math inline"', html)
        self.assertIn("<pre", html)
        self.assertIn("sourceCode python", html)
        self.assertIn("<blockquote>", html)
        self.assertIn("<table>", html)
        self.assertIn('id="footnotes"', html)
        self.assertNotIn("title:", html)
        self.assertNotIn("---", html.splitlines()[0])

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_md_default_slug_from_stem(self):
        self._write_post("bai-slug-mac-dinh.md", SAMPLE_MD_DEFAULT_SLUG)
        items = build_all(self.posts, self.out, self.index, pandoc)
        self.assertEqual([i["slug"] for i in items], ["bai-slug-mac-dinh"])
        self.assertTrue((self.out / "bai-slug-mac-dinh.html").exists())

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_mixed_tex_and_md_build_together(self):
        self._write_post("a.tex", SAMPLE_TEX)
        self._write_post("markdown-post.md", SAMPLE_MD)
        items = build_all(self.posts, self.out, self.index, pandoc)
        slugs = {i["slug"] for i in items}
        self.assertEqual(slugs, {"a", "markdown-post"})
        self.assertTrue((self.out / "a.html").exists())
        self.assertTrue((self.out / "markdown-post.html").exists())

    @unittest.skipUnless(pandoc, "pandoc not installed")
    def test_cross_extension_slug_collision_raises(self):
        self._write_post("same.tex", SAMPLE_TEX)
        self._write_post(
            "same.md",
            SAMPLE_MD.replace('slug: markdown-post', 'slug: same'),
        )
        with self.assertRaises(ValueError) as ctx:
            build_all(self.posts, self.out, self.index, pandoc)
        self.assertIn("slug collision", str(ctx.exception))


if __name__ == "__main__":
    unittest.main()
