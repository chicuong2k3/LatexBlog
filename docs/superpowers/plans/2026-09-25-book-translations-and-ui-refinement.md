# Isolated Book Translations and UI Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. This plan is intentionally executed inline because the user requested no subagents.

**Goal:** Add a separate translated-books collection with its own source tree, build output, store, routes, navigation, and sitemap while preserving authored-post isolation, and apply the three approved screenshot corrections.

**Architecture:** Keep `posts/` and `PostStore` untouched as the authored-post pipeline. Add `books/`, `tools/build_books.py`, `Services/BookStore.cs`, and book-only Razor pages/components. Book pages reuse the existing CSS/reading shell and Pandoc output, but never call `PostStore`, never emit `/posts/...` links, and are excluded from post search/tag/RSS flows.

**Tech Stack:** .NET 10 Blazor Web App (Static SSR), Razor, Python 3 standard library, Pandoc, CSS, Playwright browser verification.

## Global Constraints

- Keep authored posts in `posts/` and `PostStore`; do not mix translated books into post indexes, tags, search, command palette, RSS, or post detail data.
- Use one book folder per book with `book.md` or `book.tex`, plus `chapters/*.md` or `chapters/*.tex`.
- Use a separate `wwwroot/generated/books/` output tree and `BookStore` service.
- Use `/books`, `/books/{slug}`, and `/books/{bookSlug}/{chapterSlug}` routes.
- Reuse existing reading/card CSS and Pandoc behavior; do not add a book search in the first slice.
- Apply the three approved UI changes: smaller post-card ordinals, outline navigation search trigger, and remove tags only from the authored-post detail header.
- Preserve existing uncommitted files in `posts/`, submodules, and `.omo/`; do not reset, stash, or commit.
- Do not add dependencies or broad unrelated refactors.

---

### Task 1: Add the isolated book build pipeline and tests

**Files:**
- Create: `tools/build_books.py`
- Create: `tools/test_build_books.py`
- Create: `books/README.md`
- Modify: `LatexBlog.csproj:23-26`

**Interfaces:**
- Produces `build_books(books_dir, out_dir, index_path, pandoc) -> list[dict]`.
- Consumes the existing `parse_frontmatter`, `render_pandoc`, and `find_pandoc` helpers from `tools/build_posts.py`.
- Produces `wwwroot/generated/books/index.json` and per-book HTML without touching `wwwroot/generated/index.json` or `wwwroot/generated/posts/`.

- [ ] **Step 1: Add the book source contract**

Create `books/README.md` with the exact authoring shape and frontmatter fields:

```text
books/<book-slug>/book.md
books/<book-slug>/chapters/01-<chapter-slug>.md
```

Document required book fields (`title`, `summary`, `tags`), optional fields (`slug`, `author`, `original_title`, `language`), required chapter fields (`title`, `summary`), optional chapter fields (`slug`, `number`), and the `/books/...` route boundary. State that an empty `books/` directory is valid before the first translation is added.

- [ ] **Step 2: Write failing build tests**

Create `tools/test_build_books.py` with a temporary `books/` tree and these cases:

```python
class BuildBooksTest(unittest.TestCase):
    def test_builds_book_manifest_chapters_and_index(self):
        items = build_all(self.books, self.out, self.index, pandoc)
        self.assertEqual([item["slug"] for item in items], ["the-prisoner"])
        self.assertEqual(items[0]["chapters"][0]["slug"], "chapter-one")
        self.assertTrue((self.out / "the-prisoner" / "chapters" / "chapter-one.html").exists())
        self.assertTrue((self.index).exists())

    def test_duplicate_book_slug_raises(self):
        with self.assertRaises(ValueError):
            build_all(self.books, self.out, self.index, pandoc)

    def test_unsafe_slug_raises(self):
        with self.assertRaises(ValueError):
            build_all(self.books, self.out, self.index, pandoc)
```

Use the existing `SAMPLE`-style frontmatter and skip Pandoc-dependent assertions only when Pandoc is unavailable. The tests must also assert that the post index path is not created or modified by the book builder.

- [ ] **Step 3: Implement the book builder**

Implement `tools/build_books.py` with these exact responsibilities:

```python
BOOK_REQUIRED = ("title", "summary", "tags")
CHAPTER_REQUIRED = ("title", "summary")
SAFE_SEGMENT = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

def validate_book_meta(meta, path): ...
def validate_chapter_meta(meta, path): ...
def chapter_number(path, meta): ...
def build_all(books_dir, out_dir, index_path, pandoc): ...
```

The implementation must:

- scan only immediate directories under `books/`;
- accept one `book.md` or `book.tex` manifest per directory;
- scan only `.md`/`.tex` files in that directory's `chapters/`;
- normalize slugs with the existing `slugify_title` for missing slugs and reject any explicit slug that does not match `SAFE_SEGMENT`;
- sort chapters by explicit `number`, then numeric filename prefix, then filename;
- reject duplicate book/chapter slugs;
- render the manifest body to `intro.html` when non-empty;
- render chapters to `chapters/<slug>.html`;
- write a UTF-8 `index.json` with the book and nested chapter metadata;
- create output directories but never inspect or write the post output tree.

Use `render_pandoc(pandoc, source_name, body, out_html)` from `build_posts.py` so KaTeX and syntax highlighting stay identical.

- [ ] **Step 4: Run the book tests**

Run:

```powershell
python tools/test_build_books.py
```

Expected: all book-builder tests pass; Pandoc-dependent tests skip cleanly if Pandoc is not installed, while validation and slug tests still pass.

- [ ] **Step 5: Wire the second build target**

Add a `BuildBooks` MSBuild target after the existing `BuildPosts` target in `LatexBlog.csproj`:

```xml
<Target Name="BuildBooks" AfterTargets="BuildPosts">
  <Exec Command="python tools/build_books.py" WorkingDirectory="$(MSBuildProjectDirectory)" />
</Target>
```

The post target remains unchanged. A `dotnet build` must run both scripts, and an empty `books/` tree must not fail the build.

---

### Task 2: Add the separate runtime book store

**Files:**
- Create: `Services/BookStore.cs`
- Modify: `Program.cs:9-12`

**Interfaces:**
- Produces `BookMeta` and `BookChapterMeta` records.
- Produces `BookStore.All`, `BookStore.GetBook(string slug)`, `BookStore.GetIntroHtml(string slug)`, and `BookStore.GetChapterHtml(string bookSlug, string chapterSlug)`.
- Never references `PostStore`, Supabase, `generated/index.json`, or `generated/posts/`.

- [ ] **Step 1: Define the data records**

Use records with JSON-friendly property names:

```csharp
public sealed record BookChapterMeta(
    string Slug, int Number, string Title, string Summary, string HtmlPath);

public sealed record BookMeta(
    string Slug, string Title, string? Author, string? OriginalTitle,
    string Language, string Summary, string[] Tags, string IntroPath,
    BookChapterMeta[] Chapters);
```

Keep the field names aligned with the JSON emitted by `build_books.py`.

- [ ] **Step 2: Implement safe generated-file access**

Add `BookStore` with a `GeneratedBooksDir`, a missing-index warning, `All` loading `generated/books/index.json`, and a `IsSafeSegment` check. `GetChapterHtml` must first resolve the book and chapter from the loaded manifest, then read only the manifest's relative HTML path under `GeneratedBooksDir`; it must not concatenate an unvalidated route parameter directly into a filesystem path.

Return `null`/empty collections for missing generated data, matching the existing `PostStore` fallback style.

- [ ] **Step 3: Register the service separately**

Add:

```csharp
builder.Services.AddSingleton<LatexBlog.Services.BookStore>();
```

next to the existing `PostStore` registration. Do not replace or wrap `PostStore`.

- [ ] **Step 4: Run static isolation checks**

Run:

```powershell
rg -n "BookStore|PostStore|generated/books|generated/posts|Supabase" "Services/BookStore.cs" "Program.cs"
```

Expected: `BookStore.cs` references only book output paths; `PostStore` remains the only service used by post search/RSS/tag code.

---

### Task 3: Add book routes and reading components

**Files:**
- Create: `Components/Shared/BookCard.razor`
- Create: `Components/Pages/Books.razor`
- Create: `Components/Pages/Book.razor`
- Create: `Components/Pages/BookChapter.razor`
- Modify: `Components/App.razor:67` only if route-level script/version wiring requires it

**Interfaces:**
- `BookCard` consumes `BookMeta` and links only to `/books/{slug}`.
- `Books.razor` lists `BookStore.All`.
- `Book.razor` resolves one `BookMeta` and renders the intro plus ordered chapters.
- `BookChapter.razor` resolves one chapter HTML fragment and renders previous/next book-chapter links.

- [ ] **Step 1: Add the book card**

Render the existing card visual language without the post-only tag list:

```razor
<Card Class="lb-post lb-book-card">
    <span class="lb-post-num" aria-hidden="true">@Number.ToString("00")</span>
    <div class="lb-post-body">
        <h3><a href="/books/@Book.Slug">@Book.Title</a></h3>
        <p>@Book.Summary</p>
    </div>
    <div class="lb-post-meta">
        <span class="lb-date">@Book.Chapters.Length chương</span>
    </div>
</Card>
```

Accept `[Parameter, EditorRequired] public BookMeta Book { get; set; }` and an integer `Number`.

- [ ] **Step 2: Add `/books`**

Create a page with `@page "/books"`, a `lb-page-head` heading `Dịch sách`, an explanatory paragraph, and an empty note when no books exist. Otherwise render `BookCard` in the existing `lb-post-list`/masonry container. Do not use `PostCard` or `PostStore`.

- [ ] **Step 3: Add `/books/{slug}`**

Create a page that loads `BookStore.GetBook(Slug)`, renders title, optional author/original title/language, summary, and the generated introduction with `MarkupString`. Render an ordered chapter list with links to `/books/{bookSlug}/{chapterSlug}`. If the slug is unknown, render the existing not-found block.

- [ ] **Step 4: Add `/books/{bookSlug}/{chapterSlug}`**

Create a chapter page that loads the book and chapter from `BookStore`, renders the chapter title and book context, then renders the generated fragment inside `.lb-prose`. Add previous/next links using the ordered `Chapters` array. Do not render `PostActions`, `CommentSection`, `PostStore`, or any `/posts/...` URL.

Reuse the existing `TableOfContents` component if the generated chapter HTML contains headings; if heading extraction is not yet available in the shared store, keep the chapter reading shell correct and add only the required local extraction without altering post behavior.

- [ ] **Step 5: Run Razor diagnostics**

Run `lsp_diagnostics` for all three new pages and `BookCard.razor`. Fix only errors caused by this feature.

---

### Task 4: Add navigation, home discoverability, and sitemap entries

**Files:**
- Modify: `Components/Layout/MainLayout.razor:20-24`
- Modify: `Components/Pages/Home.razor:49-86`
- Modify: `Program.cs:65-84`

**Interfaces:**
- Main navigation gains a separate `Dịch sách` link.
- Home gains a separate book call-to-action that links to `/books` and does not inject books into the post list.
- Sitemap includes `/books` and book/chapter URLs; post RSS remains unchanged.

- [ ] **Step 1: Add the navigation link**

Add a sibling list item in `MainLayout.razor`:

```razor
<li><Button Href="/books" Variant="link" Size="sm" Class="px-0">Dịch sách</Button></li>
```

Do not add book entries to `CommandGroup Heading="Bài viết"` or to the existing `PostStore` keyword loop.

- [ ] **Step 2: Add a separate home call-to-action**

Add a small section after the authored-post/tag sections using the existing `Card`, `Badge`, and `Button` primitives. It should say the section contains full Vietnamese translations and link to `/books`. Do not iterate `BookStore.All` in the home post list and do not place book cards inside `.lb-post-list`.

- [ ] **Step 3: Add book URLs to the sitemap only**

Inject `BookStore` into the existing `/sitemap.xml` handler. Append:

```csharp
sb.Append("<url><loc>").Append(baseUrl).Append("/books</loc></url>");
foreach (var book in books.All)
{
    sb.Append("<url><loc>").Append(baseUrl).Append("/books/").Append(book.Slug).Append("</loc></url>");
    foreach (var chapter in book.Chapters)
        sb.Append("<url><loc>").Append(baseUrl).Append("/books/").Append(book.Slug).Append('/').Append(chapter.Slug).Append("</loc></url>");
}
```

Do not modify `/rss.xml` to iterate `BookStore`.

- [ ] **Step 4: Verify boundary links**

Run:

```powershell
rg -n "Dịch sách|/books|CommandGroup|PostStore|BookStore" "Components/Layout/MainLayout.razor" "Components/Pages/Home.razor" "Program.cs"
```

Expected: book links and sitemap entries exist, while the command palette and post RSS still use `PostStore` only.

---

### Task 5: Apply the three approved UI refinements

**Files:**
- Modify: `wwwroot/css/site.css`
- Modify: `Components/Layout/MainLayout.razor:26-29`
- Modify: `Components/Pages/Post.razor:31-36`

**Interfaces:**
- Post cards keep their existing badge geometry and links; only ordinal font size changes.
- Search keeps `data-command-open="lb-search"` and its command dialog behavior while using an outline class.
- Post detail removes only the rendered header tag row; `PostMeta.Tags` remains available to JSON-LD and related-post logic.

- [ ] **Step 1: Add the scoped ordinal rule**

Append after the final post-card cascade:

```css
.lb-post-grid .lb-post-num,
.lb-post-list--masonry .lb-post-num { font-size: 1rem; }
```

Do not alter width, height, border, radius, or color.

- [ ] **Step 2: Make the search trigger outline-style**

Change the nav search button to `Variant="outline"` and `Class="lb-nav-icon lb-search-trigger"`. Guard the existing forced-filled selectors with `:not(.lb-search-trigger)`, then append:

```css
.lb-nav-icon.lb-search-trigger {
  background: transparent;
  color: var(--ink-soft);
  border: 1px solid var(--line-strong);
}
.lb-nav-icon.lb-search-trigger:hover,
.lb-nav-icon.lb-search-trigger:focus-visible {
  background: color-mix(in srgb, var(--neon) 8%, transparent);
  color: var(--neon);
  border-color: var(--neon);
}
```

Keep `data-command-open`, `aria-label`, icon name, and size unchanged.

- [ ] **Step 3: Remove only the post-detail tag block**

Delete the `lb-post-tags` markup from the `lb-post-head` in `Post.razor`. Leave the date/read-time line, `ArticleJsonLd`, `Related`, `TagBadge.razor`, `PostCard.razor`, and `Home.razor` tag rendering unchanged.

- [ ] **Step 4: Verify the UI boundary**

Run:

```powershell
rg -n "lb-post-num|lb-search-trigger|data-command-open|lb-post-tags|PostMeta\.Tags" "wwwroot/css/site.css" "Components/Layout/MainLayout.razor" "Components/Pages/Post.razor" "Components/Shared/PostCard.razor"
```

Expected: the ordinal override and search class exist, the post-detail header no longer contains the tag block, and card/JSON-LD tag consumers remain.

---

### Task 6: Run the full verification suite

**Files:**
- Verify: all files changed in Tasks 1-5

**Interfaces:**
- Consumes: the separate book pipeline and UI refinements.
- Produces: repeatable evidence that posts and books remain isolated and both collections render.

- [ ] **Step 1: Run Python tests**

Run:

```powershell
python tools/test_build_posts.py
python tools/test_build_books.py
```

Expected: both suites pass; Pandoc-dependent tests skip only when Pandoc is unavailable.

- [ ] **Step 2: Run .NET diagnostics**

Call `lsp_diagnostics(filePath="Services/BookStore.cs", severity="all")` and the same tool for each new/modified Razor component and `LatexBlog.csproj`. Expected: no new errors.

- [ ] **Step 3: Build the app**

Run:

```powershell
dotnet build
```

Expected: exit code `0`; both `build_posts.py` and `build_books.py` run successfully.

- [ ] **Step 4: Start the app and use Playwright**

Start after the build:

```powershell
dotnet run --urls http://localhost:5080
```

Use the Playwright skill/MCP against `http://localhost:5080` at 375px, 768px, and 1280px. Verify:

- `/` shows authored posts only, with smaller `01` numerals and the existing card tags.
- `/books` shows the separate book collection and no post cards mixed into it.
- `/books/{slug}` shows the book manifest and ordered chapters.
- `/books/{bookSlug}/{chapterSlug}` renders translated prose with math/code styling when present.
- `/posts/{slug}` still renders an authored post, but its detail header has no tag row.
- `/tags`, `/search`, and the command palette contain authored posts only.
- The search trigger is outline-style and still opens the command dialog by click and keyboard shortcut.
- `/sitemap.xml` contains `/books` and book/chapter URLs; `/rss.xml` remains post-only.

- [ ] **Step 5: Review the final diff without committing**

Run:

```powershell
git diff --stat
git diff -- tools/build_books.py tools/test_build_books.py Services/BookStore.cs Components/Pages/Books.razor Components/Pages/Book.razor Components/Pages/BookChapter.razor Components/Shared/BookCard.razor Components/Layout/MainLayout.razor Components/Pages/Home.razor Components/Pages/Post.razor Program.cs LatexBlog.csproj wwwroot/css/site.css
git status --short
```

Expected: only the intended feature/UI files plus the approved spec/plan are changed; pre-existing user modifications remain untouched. Do not commit.
