# Post UI Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the post-card index less visually dominant, change the navigation search trigger to an outline treatment, and remove tags only from the article-detail header.

**Architecture:** Keep the existing Blazor component boundaries. Make the visible changes in the existing `MainLayout.razor` search trigger, the existing `Post.razor` article header, and the final cascade of `wwwroot/css/site.css`; do not alter the shared `TagBadge` component or post data model. The CSS changes use a dedicated `lb-search-trigger` class and a final scoped cascade so existing card and tag behavior remains intact.

**Tech Stack:** .NET 10 Blazor Web App (Static SSR), Razor, CSS, Playwright/browser verification.

## Global Constraints

- Keep the search command-dialog behavior, keyboard shortcuts, and result data unchanged.
- Remove tags only from the article-detail header; preserve post-card tags, home tag cloud, tag pages, related-post matching, and structured-data keywords.
- Do not change unrelated theme tokens, generated dependencies, or the existing uncommitted files in `posts/` and `external/`.
- Do not commit changes; leave the working tree for the user to review.
- Do not add dependencies or broad refactors.

---

### Task 1: Reduce the post-card ordinal typography

**Files:**
- Modify: `wwwroot/css/site.css` (append the scoped ordinal rule after the existing post-card cascade; keep the existing dimension rules)

**Interfaces:**
- Consumes: the existing `.lb-post-num` markup emitted by `Components/Shared/PostCard.razor` and the existing `.lb-post-grid`/`.lb-post-list--masonry` containers.
- Produces: a smaller but centered ordinal label in both home-card layouts.

- [ ] **Step 1: Add a final scoped font-size override**

Add the following rule after the existing post-card cascade in `wwwroot/css/site.css`:

```css
.lb-post-grid .lb-post-num,
.lb-post-list--masonry .lb-post-num { font-size: 1rem; }
```

Keep the existing width, height, border, radius, color, and background rules unchanged. The rule must come after the earlier `1.5rem` masonry rule and the base `1.9rem` rule so the cascade resolves to `1rem` on the home page.

- [ ] **Step 2: Run CSS-focused static checks**

Run:

```powershell
rg -n "lb-post-num|font-size: 1rem" "wwwroot/css/site.css"
```

Expected: the new selector is present after the existing ordinal declarations, and no selector removes the card number from the layout.

---

### Task 2: Make the navigation search trigger outline-style

**Files:**
- Modify: `Components/Layout/MainLayout.razor:26-29`
- Modify: `wwwroot/css/site.css:988-989, 1034-1040` plus the final cascade

**Interfaces:**
- Consumes: the existing `data-command-open="lb-search"` hook used by the command-dialog behavior and the existing `Button` component API.
- Produces: a search trigger that retains the same click/keyboard behavior but renders with a transparent background and neutral border.

- [ ] **Step 1: Add a dedicated class and semantic button variant**

Change the search trigger declaration in `Components/Layout/MainLayout.razor` to:

```razor
<Button Type="button" Variant="outline" Size="icon-sm" Class="lb-nav-icon lb-search-trigger"
        data-command-open="lb-search" aria-label="Tìm kiếm (Ctrl+K)">
    <Icon Name="search" />
</Button>
```

Do not change the `data-command-open`, `aria-label`, icon name, or command-dialog markup.

- [ ] **Step 2: Exclude the new class from the legacy filled-search rules**

Update the existing search-specific selectors so they target only non-dedicated command triggers:

```css
.lb-nav-icon[data-command-open]:not(.lb-search-trigger) { background: var(--gradient); color: #fff; }
.lb-nav-icon[data-command-open]:not(.lb-search-trigger):hover { background: linear-gradient(115deg, #4458d7, #128a8a); color: #fff; }
```

Update the later `!important` declarations with the same `:not(.lb-search-trigger)` guard, preserving the legacy fallback without letting it override the outline trigger.

- [ ] **Step 3: Add the outline rules at the end of the stylesheet**

Append:

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

The rules must use the existing semantic CSS variables and must not hard-code a new color palette.

- [ ] **Step 4: Verify the search hook and class statically**

Run:

```powershell
rg -n "lb-search-trigger|data-command-open|Variant=\"outline\"" "Components/Layout/MainLayout.razor" "wwwroot/css/site.css"
```

Expected: the button has both `Variant="outline"` and `lb-search-trigger`, and the original command-open hook remains.

---

### Task 3: Remove tags from the article-detail header only

**Files:**
- Modify: `Components/Pages/Post.razor:31-36`

**Interfaces:**
- Consumes: `PostMeta.Tags` for structured data, related-post matching, and search keywords.
- Produces: an article header with title, date, and reading time, but no rendered tag pill row.

- [ ] **Step 1: Remove only the header tag markup**

Delete this block from `Post.razor`:

```razor
<div class="lb-post-tags">
    @foreach (var tag in PostMeta.Tags)
    {
        <TagBadge Tag="@tag" />
    }
</div>
```

Leave `ArticleJsonLd`, `Related`, and all other uses of `PostMeta.Tags` unchanged. Do not remove `TagBadge.razor` or any home-page tag markup.

- [ ] **Step 2: Verify the remaining tag consumers statically**

Run:

```powershell
rg -n "PostMeta\.Tags|TagBadge|lb-post-tags" "Components/Pages/Post.razor" "Components/Pages/Home.razor" "Components/Shared/PostCard.razor" "Components/Shared/TagBadge.razor"
```

Expected: `Post.razor` still contains tag data for JSON-LD/related logic, while the rendered `lb-post-tags` block is absent from its header; the home and card components still render tags.

---

### Task 4: Build and visually verify the approved changes

**Files:**
- Verify: `wwwroot/css/site.css`
- Verify: `Components/Layout/MainLayout.razor`
- Verify: `Components/Pages/Post.razor`
- Verify: `Components/Shared/PostCard.razor` (unchanged behavior)

**Interfaces:**
- Consumes: the three changes from Tasks 1–3.
- Produces: build and browser evidence that the requested visual changes work without affecting search or unrelated tag surfaces.

- [ ] **Step 1: Run diagnostics on changed source files**

Call the `lsp_diagnostics` tool for each changed source file:

```text
lsp_diagnostics(filePath="Components/Layout/MainLayout.razor", severity="all")
lsp_diagnostics(filePath="Components/Pages/Post.razor", severity="all")
lsp_diagnostics(filePath="wwwroot/css/site.css", severity="all")
```

Expected: no new diagnostics attributable to these changes. Record unrelated pre-existing diagnostics without changing them.

- [ ] **Step 2: Build the application**

Run from the repository root:

```powershell
dotnet build
```

Expected: exit code `0`. If the build reports a pre-existing failure, distinguish it from failures in the three changed surfaces before proceeding.

- [ ] **Step 3: Start the app and inspect the home page**

Start the existing Blazor app after the build with `dotnet run --urls http://localhost:5080`, then use Playwright at a desktop viewport and a mobile viewport. Confirm:

- `01` and subsequent ordinals remain centered in their badges but use the smaller type size.
- Card titles, summaries, dates, and card tags remain visible.
- The search trigger is transparent with a visible outline, and hovering/focusing it changes only its subtle accent state.

- [ ] **Step 4: Inspect the search interaction**

Open the search trigger with a click and with the documented keyboard shortcut. Confirm the command dialog still opens, filters as before, and that no other navigation icon changed to the outline treatment.

- [ ] **Step 5: Inspect an article detail page and a tag surface**

Open a post page and confirm the header contains the title, date, reading time, and no tag pills. Then open a tag page or return home and confirm tag links still render outside the article-detail header.

- [ ] **Step 6: Review the final diff**

Run:

```powershell
git diff -- Components/Layout/MainLayout.razor Components/Pages/Post.razor wwwroot/css/site.css
git status --short
```

Expected: only the intended files/sections are part of this work; the pre-existing `posts/khu-gauss-jordan.tex`, submodule changes, and continuation metadata remain untouched. Do not commit.
