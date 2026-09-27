# AIM: rebrand to AIM and rebuild the About page

**Date:** 2026-09-27
**Status:** Approved in chat (brand name `AIM`; `/about` added to nav; brand
centralised into one constant; blossom mark retained)

## Goal

Replace the reader-facing brand **"Alternative World"** with **AIM**, and rewrite
`/about` so the page carries the origin of the name instead of being an orphaned
route that nothing links to.

Two deliverables, one rename. The brand change is mechanical once the surface is
known; the About page is the only place with real writing in it.

## Premise correction — read this before touching anything

**`LatexBlog` is not the brand.** It appears **zero** times in any reader-visible
location. A repo-wide case-insensitive sweep returns 20 hits in 10 files, and every
one is internal: npm package names, a local MCP server name, the reserved seed
domain `test@latexblog.dev`, one admin CSV export filename, and the C# namespace.

The live brand is `Alternative World` — 28 hits across 18 files, **14 of them
reader-facing**. Anyone who "fixes the LatexBlog name" will produce a green build
that changes nothing a reader sees.

This section exists so the premise is not re-derived later.

## Why AIM

In *A Certain Magical Index* (魔法禁書目录), an esper (能力者) is **defined by the
field they emit**, not by what they believe. That field is the AIM diffuse field,
and its character reflects the character of the ability — a pyrokinet's field heats
the room.

Three properties of that mechanism, verified against the Toaru wiki:

1. **It is a leak, not a choice.** Nobody switches their AIM diffuse field on. It
   radiates whether or not the host wants it to, and the surroundings are affected
   regardless.
2. **It states what you are, not what you hold true.** It is a signature, not a
   declaration.
3. **It cannot be faked.** What leaks out is what you are actually thinking.

That is a precise description of a blog that publishes how its author actually
understands something and does not claim authority. The site already makes the
same claim in its own words — the home-page lead line reads *"Nhìn thế giới qua
một lăng kính khác"* (see the world through a different lens). `AIM` names that
instead of leaving it unclaimed.

The old name was already reaching for the same thing — a "different world" — just
badly. `Alternative World` is two common English words that say nothing specific,
and it is 17 characters in a wordmark. `AIM` is three.

### Names that were considered and rejected

- **`Personal Reality`** — the exact Toaru term for an esper's private lens. Rejected
  because its mechanism is *ego*: an esper's ability is a delusion projected over
  reality, and Touma's whole function in the series is breaking other people's
  delusions. Naming a blog after "impose your personal delusion on the world"
  directly contradicts the project's stated values (rule 12, do not turn intuition
  into proof; rule 51, trust the reader).
- **`Phase`** — a layer applied over the world that acts as a veil. A defensible
  second choice and semantically good, but it names the *thing to be removed*,
  while the site is the record of what was found. `AIM` names the act of leaking.
- **`Esper`**, **`Realia`**, **`Marginalia`**, **`Gloss`**, **`Hư Cảnh`** — all
  dropped, for reasons recorded in the chat history. None survive the user's
  instruction to keep the Toaru register.
- **`Phantasia`** — a false lead. The assistant asserted it was a Toaru term; a
  domain-restricted search found no such page. It belongs to Western esoterica
  (Greek *phantasia* = image + imagination, per Kotobank), not to Kamachi. It is
  recorded here only so it is not re-proposed.

## Scope

### In scope

| File | Change |
|---|---|
| `Services/SiteInfo.cs` | **New.** Single `Brand` constant + `Title()` helper |
| `Components/Layout/MainLayout.razor:11` | Wordmark text → `AIM` |
| `Components/Layout/MainLayout.razor:20-24` | Fourth nav item → `/about` |
| `Components/App.razor:10` | Global meta description |
| `Components/App.razor:21` | RSS discovery `title` attribute |
| `Components/Pages/Home.razor:6` | PageTitle |
| `Components/Pages/About.razor` | Full rewrite (below) + PageTitle |
| `Components/Pages/Books.razor:4` | PageTitle |
| `Components/Pages/Book.razor:4` | PageTitle |
| `Components/Pages/BookChapter.razor:6` | PageTitle (three-part) |
| `Components/Pages/Post.razor:14` | PageTitle |
| `Components/Pages/Search.razor:4` | PageTitle |
| `Components/Pages/Tag.razor:5` | PageTitle |
| `Components/Pages/Profile.razor:5` | PageTitle |
| `Components/Pages/User.razor:3` | PageTitle |
| `Program.cs:51` | RSS `<channel><title>` |
| `Program.cs:132,153` | Cover-SVG fallback brand text |
| `Components/Pages/Home.razor:134,138` | JSON-LD `WebSite.name`, `publisher.name` |
| `Components/Pages/Post.razor:124,129` | JSON-LD `BlogPosting.author.name`, `publisher.name` |
| `wwwroot/manifest.webmanifest:2,3` | `name` **and** `short_name` |
| `wwwroot/favicon.svg:1` | `aria-label` |
| `wwwroot/sw.js:1` | Brand in file header comment |
| `wwwroot/sw.js:2` | Cache name `lb-v19` → `lb-v20` |
| `wwwroot/css/site.css:2` | Brand in file header comment |
| `PRODUCT.md` | `Tên sản phẩm: LatexBlog` → `AIM` |

### Out of scope

- **C# namespace, `.csproj` filename, `Dockerfile` entrypoint.** `LatexBlog` stays
  as the assembly identity. Renaming it touches `Dockerfile:15` (`COPY
  LatexBlog.csproj`) and `Dockerfile:29` (`ENTRYPOINT ["dotnet", "LatexBlog.dll"]`)
  and the self-hosted deploy workflow, for a token no reader can observe. High
  risk, zero benefit. Deferred, not forgotten.
- **npm package names** (`package.json`, `tools/mcp`, `tests/e2e`), the **MCP
  server name**, the **`test@latexblog.dev` seed domain**, and the **CSV export
  filename** at `wwwroot/js/comments.js:1042`. All internal.
- **The `lb-` CSS class prefix.** It is a legacy LatexBlog abbreviation across the
  whole stylesheet and layout. Purely cosmetic, ~200 call sites, no reader impact.
- **URL redirects.** None are needed: no route contains the brand. Routes are `/`,
  `/posts/{slug}`, `/about`, `/books`, `/books/{slug}`,
  `/books/{bookSlug}/{chapterSlug}`, `/tags`, `/tags/{tag}`, `/search`,
  `/profile`, `/u/{id}`, `/not-found`, `/Error`.
- **Base URL configuration.** Pre-existing defect, not caused by this change: the
  base URL is computed per-request in five places (`Program.cs:47,68,97`,
  `Home.razor:127-129`, `Post.razor:138-140`) with no configured value, so
  `og:url` and the RSS `<link>` will emit the internal host behind a reverse proxy.
- **The stale page list in `PRODUCT.md`** ("Trang chủ, Bài viết, Thư, Tìm kiếm,
  NotFound") — no Letters page exists; `Books`, `About` and `Profile` do. Flagged,
  not fixed, to keep this diff single-purpose.
- **The orphaned `.lb-footer` CSS** at `site.css:642-644`. No `<footer>` exists in
  the layout; the rules are dead.
- **`Error.razor` localisation.** It is entirely English while the rest of the site
  is Vietnamese. Pre-existing.
- **A new .NET test project.** None exists. `SiteInfo.Title` has real branching
  (null filtering, trimming, empty-input fallback) and would normally be unit
  tested, but standing one up means a new project, a new package reference and CI
  wiring — too much for a six-line helper. Its observable contract is covered by
  the e2e assertions below instead.
- **A `tools/` grep script for the brand.** The e2e assertions already cover every
  reader-visible surface; a source-scanning script would duplicate them. YAGNI.

## The two things a text search will miss

Recorded separately because both survive a naive find-and-replace of
`Alternative World`.

**1. `AltWorld`** — `wwwroot/manifest.webmanifest:3`. The PWA `short_name` is a
distinct token that does not contain the long form as a substring. It becomes
`AIM`.

**2. `Program.cs:153`** — the cover SVG bakes the brand into `<text>` which the
renderer converts to glyphs at request time. The literal string in the source is
easy to change and easy to forget; the failure is invisible in a text search and
only shows up in the social card for any post without a title match.

## Brand centralisation

The brand is currently typed by hand in ten `<PageTitle>` strings, in **two
inconsistent separator styles** (` - ` on six pages, ` — ` on four). That is ten
edits per rename and no guard against a miss.

New file `Services/SiteInfo.cs`:

```csharp
namespace LatexBlog.Services;

public static class SiteInfo
{
    public const string Brand = "AIM";

    public static string Title(params string?[] parts)
    {
        var list = parts
            .Where(p => !string.IsNullOrWhiteSpace(p))
            .Select(p => p!.Trim())
            .ToList();
        if (list.Count == 0) return Brand;
        list.Add(Brand);
        return string.Join(" — ", list);
    }
}
```

`Components/_Imports.razor` already has `@using LatexBlog.Services`, so no new
import is needed on any page.

Call sites become:

| Page | Call | Result |
|---|---|---|
| `Home.razor:6` | `SiteInfo.Title()` | `AIM` |
| `About.razor:3` | `SiteInfo.Title("Về tôi")` | `Về tôi — AIM` |
| `Books.razor:4` | `SiteInfo.Title("Dịch sách")` | `Dịch sách — AIM` |
| `Book.razor:4` | `SiteInfo.Title(BookItem?.Title ?? "Dịch sách")` | `<book> — AIM` |
| `BookChapter.razor:6` | `SiteInfo.Title(Chapter?.Title ?? "Dịch sách", Book?.Title)` | `<chapter> — <book> — AIM` |
| `Post.razor:14` | `SiteInfo.Title(PostMeta.Title)` | `<post> — AIM` |
| `Search.razor:4` | `SiteInfo.Title("Tìm kiếm")` | `Tìm kiếm — AIM` |
| `Tag.razor:5` | `SiteInfo.Title(string.IsNullOrEmpty(CurrentTag) ? "Thẻ" : "#" + CurrentTag)` | `#tag — AIM` |
| `Profile.razor:5` | `SiteInfo.Title("Trang cá nhân")` | `Trang cá nhân — AIM` |
| `User.razor:3` | `SiteInfo.Title("Trang cá nhân")` | `Trang cá nhân — AIM` |

Three deliberate consequences:

- **The home page keeps a bare title.** It becomes `AIM`, three characters. The
  long description already lives in the meta description; repeating it in the tab
  wastes the tab.
- **The separator becomes the em dash everywhere.** Six pages move from ` - ` to
  ` — `. This normalises a pre-existing inconsistency rather than introducing a
  new style.
- **`BookChapter` gains a consistent three-part shape** it did not previously have
  (its third segment was already `Alternative World`, just glued on by hand).

Non-`<PageTitle>` brand sites (wordmark, meta description, RSS, manifest, favicon,
JSON-LD, cover SVG) read `SiteInfo.Brand` directly, so the constant is the single
source of truth and the one-line wordmark change happens in exactly one place.

## The About page

`/about` already exists (`Components/Pages/About.razor`, 24 lines), is fully styled
(`.lb-about` at `site.css:622-626`), and **is linked from nowhere**. The nav has
exactly three items — Trang chủ, Thẻ, Dịch sách. So this is a rewrite of an
existing page, not the addition of a new one.

It is a **rewrite by addition, not by replacement.** The page already carries real
content that must survive verbatim: the Newton quotation, the method sentence
(*"hỏi lại định nghĩa, thử lại giả thiết, và tìm cách hiểu khác cho những thứ
tưởng đã hiểu rồi"*), the LaTeX/Pandoc/KaTeX fact (*"công thức là toán thật, không
phải ảnh chèn"*), and the comment/like/profile sentence. The three new tiers are
laid around them. **Nothing existing is dropped** — the same discipline the project
applies to the Vietnamese posts.

The three-tier structure the user chose is:

1. **What AIM is** — self-contained, readable by someone who has never heard of
   Toaru.
2. **Where the name came from** — the lore, in the middle, skippable.
3. **What this site is for** — the two jobs, carrying the original prose forward.

### Copy draft

Vietnamese. Subject to the normal editorial pass at implementation time; the draft
is here so the spec is decision-complete, not to be pasted verbatim.

The Newton quotation is reproduced **exactly** as it stands at
`About.razor:12`. It is not paraphrased, trimmed, or replaced.

```razor
<section class="lb-about">
    <h1>Về tôi</h1>

    <p class="lb-about__lead">"Tôi không biết mình xuất hiện trước thế giới ra sao,
    nhưng với bản thân, tôi chỉ như một cậu bé chơi đùa trên bờ biển… trong khi cả
    đại dương chân lý mênh mông vẫn nằm đó, chưa được khám phá." — Isaac Newton</p>

    <h2>AIM là gì</h2>

    <p>AIM là tên của trang này, và cũng là cách trang này được viết.</p>

    <p>Trang này không tuyên bố điều gì về mình. Nó không bảo bạn phải học theo
    cách nào. Nó chỉ ghi lại cách tôi thật sự hiểu một vấn đề toán học, và chỉ
    những chỗ tôi thật sự tới nơi. Chỗ nào chưa hiểu, tôi để trống thay vì đoán
    bừa.</p>

    <p>Series hiện tại gọi nó là <em>Forget School. Learn Mathematics.</em></p>

    <h2>Tên đến từ đâu</h2>

    <p>Trong <em>A Certain Magical Index</em> (魔法禁書目录), người có năng lực
    được định nghĩa bằng thứ họ toả ra, chứ không phải thứ họ tin. Cái đó gọi là
    AIM diffuse field. Ba điều ở đó giống cách trang này viết:</p>

    <ul>
      <li>Bạn không bật được nó. Nó tự toả ra, và người xung quanh bị ảnh hưởng
      dù bạn có muốn hay không.</li>
      <li>Nó nói bạn là ai, không nói bạn tin gì. Nó là chữ ký, không phải tuyên
      ngôn.</li>
      <li>Nó không giả được. Thứ đập ra thành thứ bạn đang thật sự nghĩ.</li>
    </ul>

    <p>Một trang toán học cũng vậy. Viết ra là toả ra, và không có cách nào viết
    mà không lộ cách mình nghĩ. Tôi không viết để tỏ ra đúng. Tôi viết để ghi
    lại chỗ mình đã hiểu.</p>

    <p>Nếu bạn không đọc Toaru, bỏ qua mục này cũng được. Mục trên đã đủ.</p>

    <h2>Trang này sẽ làm gì</h2>

    <p>Viết về toán học và lập trình theo hướng ngược lại với thói quen: hỏi lại
    định nghĩa, thử lại giả thiết, và tìm cách hiểu khác cho những thứ tưởng đã
    hiểu rồi. Không mở đầu bằng định nghĩa — mở đầu bằng một bài toán, một chỗ
    vướng, một cách nhìn mới, rồi mới đặt tên cho nó.</p>

    <p>Mỗi bài viết bắt đầu từ một tệp LaTeX, biên dịch sang HTML bằng Pandoc —
    công thức là toán thật, render bằng KaTeX, không phải ảnh chèn.</p>

    <p>Phần Dịch sách là bản dịch và chú thích sách cổ:
    <a href="/books">Principia</a> của Newton, <em>Aether</em> của Whittaker,
    <em>De Motu</em> — kèm chú thích so với cách hiểu hiện đại.</p>

    <p>Bạn có thể bình luận bằng Google account, thích những bài mình ưng, rồi xem
    lại chúng trong trang cá nhân.</p>

    <p><Button Href="/" Variant="link" Class="lb-cta px-0">Về trang chủ</Button></p>
</section>
```

### Content preservation checklist

The rewrite is only correct if all five of these survive, character for character
where quoted:

| Must survive | Source |
|---|---|
| The full Newton quotation and the ellipsis | `About.razor:12` |
| `lb-about__lead` class on the quotation | `About.razor:12` |
| *"hỏi lại định nghĩa, thử lại giả thiết, và tìm cách hiểu khác cho những thứ tưởng đã hiểu rồi"* | `About.razor:14-18` |
| *"Mỗi bài viết bắt đầu từ một tệp LaTeX, biên dịch sang HTML bằng Pandoc — công thức là toán thật, render bằng KaTeX, không phải ảnh chèn"* | `About.razor:16-18` |
| *"Bạn có thể bình luận bằng Google account, thích những bài mình ưng, rồi xem lại chúng trong trang cá nhân"* | `About.razor:20-21` |
| The trailing `Về trang chủ` button | `About.razor:23` |

An existing e2e test already pins the `h1` to `Về tôi`
(`tests/e2e/tests/page-layout.spec.js:35-38`); it must keep passing.

### About page mechanics

- **The `<HeadContent>` scrollspy block stays.** It currently reads
  `data-heading=".lb-about h1"`. Because the page now carries three `<h2>`, the
  selector must widen to `.lb-about h1, .lb-about h2` or the table of contents will
  not track sections.
- **No heading contains a colon.** The page carries four: `Về tôi` (h1), and the
  h2s `AIM là gì`, `Tên đến từ đâu`, `Trang này sẽ làm gì`.
- **The `Principia` mention is a real anchor** to `/books`, not plain text. The
  draft leaves it unclassed on purpose: the sweep found no prose-link class in the
  design system, and the correct treatment is whatever links inside post prose
  already use. Read it off an existing post at implementation time rather than
  borrowing `.lb-cta`, which is a button style used on the trailing `Về trang
  chủ` control. The trailing `<Button Href="/" Variant="link" Class="lb-cta
  px-0">Về trang chủ</Button>` stays exactly as it is.
- **One `h1` only** — `Về tôi`.

### Nav change

`MainLayout.razor:20-24` gains a fourth item, after `Dịch sách`, matching the markup
of the three existing siblings exactly (same `<li>` wrapper, same `<Button Href>`
form, same classes — read them off lines 21-23 rather than inventing a class):

```razor
<li><Button Href="/about">Về tôi</Button></li>
```

The label matches the page's existing `<h1>` so the two do not disagree. The list
sits inside a collapsible `.lb-nav-panel`, so four items must be checked at mobile
width — a verification step below, not an assumption.

## Data flow

No data flow changes. The brand is a compile-time constant consumed at render time;
there is no config load, no database row, no request-time lookup. The RSS channel
title, the sitemap, `robots.txt` and the cover SVG are all built in `Program.cs`
from the live request as they are today — only the brand literal inside them
changes.

## Error handling

No new failure modes. One risk is specific: if `SiteInfo.Brand` were ever used to
build a URL, a typo would produce a silently wrong `og:url`. It is not used that
way — `Brand` only ever reaches titles, meta, and text. The base-URL defect is
pre-existing and explicitly not addressed here.

## Testing

There is **no .NET test project.** The only suite is Playwright e2e at
`tests/e2e` (CommonJS `require`, Vietnamese test names, `BASE_URL` defaults to
`http://127.0.0.1:5080`), and `.github/workflows/deploy.yml` is a deploy workflow —
**e2e is not a CI gate.** These tests are a local regression net, and must be run
with the app up.

New file `tests/e2e/tests/brand.spec.js` pins the observable contract, and is
written before the code it guards:

- **Titles** — home `<title>` is exactly `AIM`; every other routed page's
  `<title>` ends with ` — AIM`.
- **Surfaces** — `.lb-brand` text is `AIM`; the meta description names AIM;
  `GET /rss.xml` has `<channel><title>AIM</title>`; the manifest `name` *and*
  `short_name` are both `AIM`; the favicon is served; JSON-LD `name` and
  `publisher.name` are `AIM`.
- **About** — the three `h2` tiers are present, the Newton quotation is still in
  `.lb-about__lead`, and the nav contains a `Về tôi` link to `/about`.

## Verification

1. `dotnet build` exits 0.
2. Grep the repo, case-insensitively, for `Alternative World` and `AltWorld`.
   Expected: **zero hits, repo-wide, with no exceptions.** Unlike `LatexBlog`,
   nothing on this list is being intentionally retained — every occurrence is
   renamed, including the CSS and service-worker comments. Any surviving hit is a
   bug in this change, not a deliberate hold.
3. Start the app (`dotnet run --urls http://127.0.0.1:5080`) and run
   `npx playwright test` from `tests/e2e`. Expected: all specs pass, including the
   pre-existing `trang về tôi: heading hiển thị, không lỗi` in
   `page-layout.spec.js:35-38`, which pins the `h1` to `Về tôi`.
4. Confirm by hand what e2e cannot see:
   - the blossom glyph still renders beside the `AIM` wordmark;
   - `GET /cover/{slug}.svg` for a post with no title match — the rendered image
     reads `AIM` (visually; the source string is unchanged by glyph conversion);
   - `/about` — the three tiers render, the scrollspy tracks the new `h2`s, the
     `Principia` link is clickable and styled like other in-prose links;
   - nav shows four items, and at a mobile viewport the About item is reachable
     inside the collapsible `.lb-nav-panel`.
5. `PRODUCT.md` reads `Tên sản phẩm: AIM`.

## Risks

| Risk | Severity | Handling |
|---|---|---|
| `AltWorld` short_name missed | High | Called out explicitly above; verified in step 3 |
| Cover-SVG glyph text missed | High | Called out explicitly above; verified visually in step 3 |
| Six pages change separator from ` - ` to ` — ` | Low | Intentional normalisation; a visible but purely cosmetic diff |
| Home `<title>` shortens to `AIM` | Low | Intentional; the description already carries the long form |
| Service-worker cache serves stale brand | Medium | `lb-v19` → `lb-v20` in scope |
| A tenth hardcoded brand string exists somewhere unmapped | Low | The sweep was file-type exhaustive; step 2 is the regression net |
