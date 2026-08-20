# Thiết kế: Home page dùng `pretext` (masonry + hero auto-fit)

- **Ngày**: 2026-08-20
- **Trạng thái**: đã duyệt (brainstorming)
- **Phạm vi**: prototype trên 1 trang — trang chủ (`/`). Mục tiêu: **thử nghiệm công nghệ** `@chenglou/pretext`, giữ nguyên bản sắc Sakura Neon.

## Bối cảnh

- **LatexBlog**: .NET 10 Blazor Web App (Static SSR — không WASM, không SignalR). Interactivity bằng htmx (fragments, load-more) + Alpine.js. Style bằng `wwwroot/css/site.css` (toàn bộ design system "Sakura Neon": token CSS `[data-theme]`, Bricolage Grotesque / Space Grotesk, KaTeX từ CDN).
- **`@chenglou/pretext`** (v0.0.8, MIT, ~50k★): **không phải framework CSS** — là engine đo & layout văn bản thuần JS. API: `prepare(text, font)` + `layout(prepared, width, lineHeight)` → `{ height, lineCount }`; `prepareWithSegments` / `layoutWithLines` / `layoutNextLineRange` cho line-routing thủ công. Dựa trên `Intl.Segmenter` + Canvas `measureText`. Không đọc DOM (không `getBoundingClientRect`, không `offsetHeight`).
- **Trang chủ hiện tại** (`Components/Pages/Home.razor`): hero (quote Newton 2 dòng + lead + công thức KaTeX + featured card) → danh sách bài (3 bài/trang, "Xem thêm" qua htmx) → tag cloud. `PostCard.razor` là hàng ngang: số outline + title + summary + meta.

## Mục tiêu

1. **Masonry grid bài viết** do pretext tính chiều cao chính xác (không đo DOM).
2. **Hero title auto-fit**: quote Newton luôn vừa đúng 2 dòng mọi viewport bằng binary search cỡ chữ qua pretext.
3. Không phá design system; không đổi server-side rendering; fallback an toàn khi tắt JS.

## Kiến trúc

- **Không đổi server-side**: Blazor SSR, htmx, `PostCard` render y nguyên.
- **Một ES module mới**: `wwwroot/js/home-layout.js` — thuần JS, không bundler, chỉ import pretext.
- **Vendor pretext**: copy ESM build của `@chenglou/pretext` vào `wwwroot/js/vendor/pretext.esm.js` (offline-friendly; CDN là phương án dự phòng).
- **Nạp module chỉ ở trang chủ** qua `<HeadContent>` trong `Home.razor` (`<script type="module" src="/js/home-layout.js"></script>`).
- **Fallback khi tắt JS / font fail**: giữ nguyên `.lb-post-list` flow layout + hero clamp hiện tại.

## A — Masonry grid bài viết

1. `.lb-post-list` giữ nguyên làm fallback; JS thêm class `.lb-post-list--masonry` khi kích hoạt.
2. Với mỗi card, JS đo text bằng pretext:
   - Title: `prepare(title, '700 <size>px "Bricolage Grotesque"')`
   - Summary: `prepare(summary, '16px "Space Grotesk"')`
   - `layout(prepared, colWidth, lineHeight)` → `height` / `lineCount` cho từng khối (thuần số học).
3. Chiều cao card = tổng khối text + meta (1 dòng) + padding/border (đọc `computed style` một lần, cache).
4. Xếp cột: **greedy shortest-column**. Số cột theo breakpoint: `<560px` = 1, `560–900px` = 2, `>900px` = 3 (tham chiếu breakpoint 720px sẵn có).
5. Định vị: `position: absolute` + inline `left/top/width`; JS set `min-height` cho container sau khi xếp.
6. **htmx "Xem thêm"**: hook `htmx:afterSwap` → chạy lại toàn bộ masonry (card cũ + mới).
7. **Resize**: debounce 150ms → đo lại + xếp lại.
8. Card quá hẹp (colWidth dưới ngưỡng) → bỏ qua đo, để CSS tự nhiên.

## B — Hero title auto-fit

1. Quote Newton trong `h1`: target **đúng 2 dòng** mọi viewport.
2. `prepare(quoteText, '800 <size>px "Bricolage Grotesque"')` → **binary search cỡ chữ** trong khoảng clamp hiện tại để `lineCount == 2`.
3. Ghi đè `font-size` inline lên `h1`; không có JS thì clamp cũ giữ nguyên.
4. Re-run khi resize (debounce chung với masonry).

## Điểm kỹ thuật bắt buộc

- Chờ `document.fonts.ready` + `document.fonts.load()` cho đúng 2 face (Bricolage Grotesque 800, Space Grotesk 400) **trước khi đo**.
- **Không dùng `system-ui`** (macOS đo sai) — luôn dùng font có tên.
- Summary rỗng: `layout` trả `lineCount: 0` → clamp `Math.max(1, lineCount)` (gotcha README pretext).
- Đồng bộ font + `letterSpacing` với CSS thật — nếu không, số đo lệch.

## Xác minh

- `dotnet run` → kiểm trang chủ ở 390px / 720px / 1440px (chuẩn DESIGN.md: không tràn ngang).
- "Xem thêm" nạp card mới → xếp đúng cột ngắn nhất.
- Hero quote luôn đúng 2 dòng, không nhảy layout.
- Tắt JS → trang đọc được bình thường (fallback).

## Ngoài phạm vi

- Không đổi màu sắc/typography/design system.
- Không đổi các trang khác (Post, Tag, Search, About…).
- Không đổi server-side rendering / htmx / Alpine.
- Không thêm bundler, build step, hay dependency npm mới ngoài pretext đã vendor.