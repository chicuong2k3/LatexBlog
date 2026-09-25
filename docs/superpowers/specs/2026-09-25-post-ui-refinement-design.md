# UI refinement design: card index, search trigger, and post tags

**Date:** 2026-09-25
**Status:** Approved by the user's continuation directive

## Goal

Make three targeted visual changes shown in the supplied screenshots without changing the blog's information architecture:

1. Reduce the visual weight of the ordinal number in post cards.
2. Render the navigation search trigger as an outline button instead of a filled blue button.
3. Remove the tag row from the article detail header only.

## Scope

### In scope

- `Components/Shared/PostCard.razor` styling hooks already used by the home page.
- `wwwroot/css/site.css` rules for the post-card ordinal and the search trigger.
- `Components/Pages/Post.razor` article header.
- `Components/Layout/MainLayout.razor` search trigger markup.

### Out of scope

- Removing tags from post cards.
- Removing the home-page tag cloud.
- Removing or changing the shared `TagBadge` component.
- Changing search behavior, keyboard shortcuts, or the command-dialog content.
- Refactoring unrelated theme values or generated dependencies.

## Design decisions

### Ordinal number

Keep the existing outlined/filled number badge shape and grid geometry. Only reduce the inherited font size for the post-grid/masonry number to approximately `1rem` so `01`, `02`, etc. read as metadata rather than a headline. Preserve the existing accent treatment and responsive dimensions.

### Search trigger

Use a dedicated search-trigger class in `MainLayout.razor` and add targeted CSS overrides at the end of `site.css`. The default state must have a transparent background, visible neutral border, and muted icon color. The hover/focus state may use the existing neon accent tint. Do not alter notification, user, login, or back-to-top controls.

### Article detail tags

Remove only the `lb-post-tags` block from `Post.razor`'s `lb-post-head`. The post metadata line (date and reading time) remains. Article data, related-post matching, structured-data keywords, card tags, and the home tag cloud remain unchanged.

## Verification

- Build the Blazor project successfully.
- Check the home page at desktop and mobile widths: ordinal numbers are smaller but remain centered and legible.
- Check the navigation at desktop and mobile widths: search is outline-style, remains discoverable, and still opens the command dialog; no unrelated icon button changes.
- Open a post detail page: its header has no tag pills, while the date/read-time metadata remains; card and tag-page tag links still render.
- Inspect diagnostics for the changed Razor and CSS files and record any pre-existing warnings separately.
