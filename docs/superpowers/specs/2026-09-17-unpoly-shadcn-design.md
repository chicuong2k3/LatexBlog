# LatexBlog → Unpoly.Blazor + Unpoly.Blazor.Shadcn — Design

Date: 2026-09-17. Approach: strangler shell-first (A). Status: approved §§1–4, specвитten, awaiting spec review + implementation plan.

Locked decisions: Sakura Neon stays, re-expressed as a shadcn theme · full conversion (all Alpine/htmx islands go) · dark mode migrates `data-theme` → `.dark` class + tokens · done = visual/behavioral parity + new Unpoly tests.

## §1 — Architecture

- `Program.cs`: `AddUnpoly(o => o.MainTargets = [".lb-main"])`, `UseUnpoly()` before `UseAntiforgery()`. Delete the three `HtmlRenderer` htmx fragment endpoints (`/posts`, `/tags`, `/search/results`). Every route stays a real bookmarkable page; Unpoly requests full pages and extracts fragments client-side.
- `App.razor`: wrap head assets in `UpChrome`, add `UnpolyHead` once inside `<head>` inside `UpChrome`; `HeadOutlet` stays OUTSIDE `UpChrome` or `PageTitle` breaks. Remove htmx script. Add `unpoly.min.js`, `ui.js` (must stay IIFE-wrapped), compat assets (safari15 shim, popover polyfill, `:has()` cover) before unpoly. Keep KaTeX CSS/JS, fonts, manifest, RSS.
- Styling: Tailwind v4 `app.css` imports `ui.css` (`Styles/ui.css`); `@source` for app `Components/**/*.razor`, library `Components/**/*.razor`, `ButtonVariants.cs`, and `ui.js` (Select panel/dropdown/confirm dialog are JS-built — missing `@source` = silently unstyled in prod only). Keep `ui.behavior.css`.
- `MainLayout.razor`: `UpChrome` around nav + footer with `Provides` listing every targetable selector inside chrome; `<main class="lb-main">` is the bare fragment target and is NEVER wrapped in `UpChrome`. Missing `Provides` = silent no-op swaps.
- Theme: Sakura palette (`bg/surface/ink/muted/neon/neon-2/neon-3/line`, light + dark) mapped onto shadcn tokens (`background/foreground/primary/border/...`) as a `[data-theme="sakura"]`/`:root` + `.dark` block set by the toggle (persisted, no-flash). Required: `@custom-variant dark (&:where(.dark, .dark *))` (else `dark:` utilities follow the OS, not the class) and `@layer base { * { border-color: var(--border) } }` (else Preflight hairlines render in text color). Two additive tokens kept: `--control-h`/`--control-text` (`h-control`/`text-control`).
- JS: KaTeX auto-render + TOC scrollspy + copy-code + lightbox become `up.compiler` compilers each returning a destructor; app scripts live in `<head defer>` (body scripts re-execute per swap). Supabase islands get `[up-keep]` until their conversion phase.

## §2 — Components (shadcn first)

- Nav/search/auth: `Button` (variants; `Href` instead of `asChild`), `Input`, `Badge`, `Avatar`, `DropdownMenu` (Trigger `Target` ↔ content `Id` must match twice), `Sheet` for mobile menu.
- Post list: `Card` + `Badge` + `Button` load-more via `up-target`/`up-fallback` on the real page route (no endpoints). Tag cloud → `Badge` family (four variants only; beyond that dot-plus-text, not invented variants).
- Tag/Search pages: GET forms with `Input` + `Select` (`SelectItem` = `<option>`; no `SelectTrigger`/`SelectValue`/`SelectContent`) + `up-autosubmit`/`up-validate`/`up-watch-delay`.
- Post page: TL;DR → `Alert`/`Card`; TOC stays semantic nav (scrollspy via compiler or `up-keep`); pandoc HTML renders inside a prose shell (unchanged markup, KaTeX spans intact); related posts → `Item`/`Card`; PostActions → `Button` + share via clipboard API.
- CommentSection: `Form`/`FormField` (Label/Description/Message params) + `Textarea` + `Button`; server guards `IsUpValidating()` BEFORE any write, answers 422 (never 200) on invalid.
- Highlights/notes/share-quote: `Dialog`/`AlertDialog` (native `<dialog>`, `DialogTrigger Target` ↔ `Id`) for page-owned content; `up-layer="new"` overlays for server routes (bookmarkable, `IsUpOverlay()` drops duplicate chrome). `Tooltip` per item (no provider — grouped instant-open behavior is absent by design). `Tabs` compiler hides panels with `hidden` so fields still post.
- Translation hygiene: params PascalCase (`Variant/Size/Class/Href`), HTML attrs lowercase splatted (`name/value/required/up-*`); `id="@($\"row-{x}\")"` (never `id="row-@x"` on components); `placeholder="@(\"you@acme.co\")"` (never raw `@@`); bools as `data-active="@(b ? \"true\" : null)"`; `Icon Name` from `tools/icons.txt` only; every non-submit `<button>` gets `type="button"`.

## §3 — Data flow

- Reads: `[CascadingParameter] HttpContext Ctx` per page; `IsUnpoly()` gates enhancements (never required — bookmarks/bots/no-JS must work); `UpTargets()` (never raw `==` on `UpTarget()` — targets are lists); `UpWantsAny()` skips expensive partials; `IsUpFragment()` rarely called directly (`UpChrome` owns it).
- Writes: `UpRetarget` (incl. `:none`), `UpTitle`, `UpLocation`/`UpMethodCookie` (non-GET full loads), `UpEmit` (accumulates), `UpOpenLayer`/`UpAcceptLayer` (NOT interchangeable with `UpDismissLayer`)/`UpSetContext` (Vary already covers context via `UseUnpoly()`).
- Skeletons: server `<Skeleton>` never seen (SSR completes first) — visible skeletons are `[up-placeholder]` `<template>`s in layout.
- Cache/poll: `[up-poll]` + `[up-etag]` + `UpNotModified()` guarded in markup (`@if (!NotModified)`); `UpExpireCache` (revalidate behind) vs `UpEvictCache` (drop — prices/permissions/balances) vs `UpKeepCache` (opt out of post-POST clear). GET handlers stay idempotent (15 s cache replays).
- Nav/history: `up-nav` → `.up-current`, `up-follow`, loading via `.up-active`/`.up-loading`, progress bar default (`lateDelay`), `[up-background]` to silence.

## §4 — Errors, tests, phases

- Errors: 422 invalid forms; 204/304 bodies guarded in markup (`UseUnpoly()` drops bytes so no crash, guards save work); chrome-target swaps need `Provides`; `up-on-accepted` is ONE expression → named function; `up.accept` JSON serialized server-side; layer closes via `up.layer.emit`, not `up.emit`; third-party widgets via compilers with destructors.
- Hard constraints kept: KaTeX math identical at all widths (display math scrolls); dark mode full parity; Vietnamese strings intact; LaTeX build (`tools/build_posts.py`) untouched; RSS/sitemap/robots/cover-SVG endpoints unchanged; PWA manifest + SW kept (SW precache list updated for new assets).
- Tests: existing Python `tools/test_build_posts.py` + repo suite stay green; NEW: header/protocol tests (Vary, 204/304 empty, CSRF via `UnpolyHead`), chrome tests (`Provides` coverage), Playwright swap tests (home load-more, tag filter, search results, comment post + validation 422, dialog/popover after swap, KaTeX re-render, dark toggle persist + no-flash, no-JS full-page pass).
- Phases: P1 Unpoly wiring (endpoints deleted, swaps live) → P2 Tailwind + Sakura theme (both modes pixel-faithful) → P3 pages to shadcn one by one → P4 islands (comments/auth/notifications/annotations/search) → P5 KaTeX compilers + PWA + a11y + new tests. Ship after each phase.

## Non-goals

No new blog features, no content invention, no English UI strings beyond existing i18n, no Blazor interactivity (`blazor.web.js` stays out), no `asChild`/controlled-props/render-props ports, no second design system of hand-rolled pills/buttons.
