# Separate translated-books collection

**Date:** 2026-09-25
**Status:** Approved by continuation directive; source layout defaults to one folder per book with chapter files

## Goal

Add a first-class, isolated collection for full Vietnamese translations of foreign books. The collection should reuse the existing reading and card visual language, but it must have its own source tree, build output, data store, routes, listing, and navigation entry so translated books never appear in authored-post lists, tags, post search, or post data flows.

## Source layout

```text
books/
└── <book-slug>/
    ├── book.md
    └── chapters/
        ├── 01-<chapter-slug>.md
        └── 02-<chapter-slug>.md
```

`book.md` is the book manifest and optional introduction. Its frontmatter must contain:

- `title`: Vietnamese title shown in the UI.
- `summary`: short Vietnamese description.
- `tags`: non-empty list of book-level tags.
- `slug`: optional; defaults to the folder name.

Optional frontmatter:

- `author`: original author.
- `original_title`: original-language title.
- `language`: translation language, default `vi`.

Each chapter file uses the existing Pandoc-supported `.md` format and may use `.tex` as well. Its frontmatter must contain `title` and `summary`; `slug` is optional and defaults to the filename stem. The numeric filename prefix determines the default chapter order, but explicit `number` frontmatter may override it. Chapter slugs must be unique within their book.

The source folder is intentionally separate from `posts/`; the post builder must never scan `books/`, and the book builder must never scan `posts/`.

## Build pipeline

Add `tools/build_books.py` as a separate build entry point. Reuse the existing frontmatter and Pandoc rendering helpers from `build_posts.py`, but define book-specific metadata validation and output rules.

The book builder:

1. Scans immediate child directories under `books/`.
2. Reads one `book.md` or `book.tex` manifest per book.
3. Reads chapter files under that book's `chapters/` directory.
4. Validates required fields, unique book slugs, unique chapter slugs, safe path segments, and chapter ordering.
5. Renders the manifest introduction and every chapter through Pandoc.
6. Writes only to `wwwroot/generated/books/`.

Generated shape:

```text
wwwroot/generated/books/
├── index.json
└── <book-slug>/
    ├── intro.html
    └── chapters/
        └── <chapter-slug>.html
```

`index.json` contains one entry per book with title, slug, author/original title/language metadata, summary, tags, and an ordered chapter manifest containing chapter slug, number, title, summary, and relative HTML path. The generated directory is build output and remains ignored by source control.

The .csproj build target runs the existing post builder first and the new book builder second. A failure in either collection fails the build rather than silently serving a half-built collection.

## Runtime data boundary

Add `Services/BookStore.cs` with `BookMeta` and `BookChapterMeta` records. Register `BookStore` as a singleton separately from `PostStore`.

`BookStore` reads `wwwroot/generated/books/index.json`, exposes `All`, `GetBook(slug)`, and safe chapter HTML lookup, and validates route slugs before joining paths. It must not read `wwwroot/generated/index.json`, `wwwroot/generated/posts/`, Supabase post rows, or any post search method.

`PostStore` remains the only source for:

- `/` and post cards.
- `/posts/{slug}`.
- `/tags` and `/tags/{tag}`.
- `/search` and search results.
- The command-palette post group.
- Post RSS and post-related sitemap entries.

The book collection is intentionally excluded from post search and the global command palette in the first slice. This is the strongest boundary against accidental mixing. A future book search can be added under `/books/search` without changing post search semantics.

## Routes and components

Add:

- `Components/Pages/Books.razor` at `/books`: list book cards using the existing post-card visual language.
- `Components/Pages/Book.razor` at `/books/{slug}`: book metadata, optional introduction, and ordered chapter list.
- `Components/Pages/BookChapter.razor` at `/books/{bookSlug}/{chapterSlug}`: chapter title, book context, generated prose, chapter navigation, and the same `.lb-prose`/`.lb-post-page` reading shell as posts.
- `Components/Shared/BookCard.razor`: book-specific card that links to `/books/{slug}` and never emits `/posts/...` URLs.

The chapter page may omit post-only actions such as post likes, post comments, and post sharing because those actions are tied to the authored-post data model. It must retain the same typography, prose width, KaTeX, syntax highlighting, heading scroll behavior, and responsive reading layout.

Add a `Dịch sách` navigation link in `MainLayout.razor` as a separate destination from `Thẻ`. Add the same link to a lightweight home-page section or call-to-action so the collection is discoverable without inserting books into the authored-post list.

## Sitemap and feed boundary

Add `/books` and book/chapter URLs to the sitemap as a separate collection. Do not add translated books to the authored-post RSS feed. This keeps the existing post feed stable while making the new section discoverable to crawlers.

## Failure behavior

- Missing or malformed `book.md`/chapter frontmatter: fail the book build with the file and field in the error.
- Duplicate book or chapter slug: fail the book build.
- Unsafe slug containing path separators or traversal segments: fail the book build.
- Missing generated book index: `BookStore` logs a warning and returns an empty collection; the build path still fails before serving a normal build.
- Unknown book or chapter route: render the existing not-found page through the normal route fallback.

## Acceptance criteria

- Adding a book under `books/` makes it appear at `/books` without adding a row to the home post list.
- A book and its chapters receive `/books/...` URLs and never `/posts/...` URLs.
- `/posts`, `/tags`, `/search`, and the command palette show only authored posts.
- A book page shows the book title, metadata, introduction when present, and ordered chapters.
- A chapter page renders Pandoc HTML, math, code blocks, headings, and responsive prose styling.
- Existing posts, post search, post tags, RSS, and post routes continue to build and render unchanged.
- The three approved UI refinements remain part of the same delivery: smaller post-card ordinals, outline search trigger, and no tag row in the authored-post detail header.

## Out of scope for the first slice

- Book search or cross-collection search.
- Comments, likes, or sharing APIs for book chapters.
- A database-backed book editor or upload UI.
- Automatic downloading or copyright handling of source books.
- Mixing translated books into the existing tag cloud or post RSS.
