# LatexBlog — Danh sách tính năng (đề xuất & trạng thái)

Cập nhật: 2026-08-18.

## Đã có

Sakura Neon design (chỉ giao diện sáng) · search popup (kính lúp, 2 chế độ
bài viết/bình luận) · tags trên trang chủ · comments (editor markdown + toán
KaTeX, reply 2 cấp kiểu Facebook, prefill @tên, edit trong 5 phút, phân trang
cursor + "Xem thêm", avatar theo profile, admin xoá) · @mention → **thông báo**
(chuông nav) · like + lượt xem · chia sẻ (copy + mạng xã hội) · trang cá nhân
(đổi tên, upload avatar, bài đã like, thống kê, export
JSON) · back-to-top · KaTeX ·
htmx load-more · **i18n vi/en** (switcher) · **bài viết liên quan** · **RSS +
sitemap + ping Google** · **Open Graph + bìa SVG tự sinh** · **print CSS** ·
**chế độ đọc** (A−/A+, focus) + progress bar + reading time · **phím tắt**
(`/` search, `t` top) · **lightbox ảnh** · **PWA offline** (manifest + SW).

## Đã implement (cả đợt đề xuất)

- [x] **Viết bài không cần deploy** — `/write` (admin), editor markdown + preview,
  lưu bảng `posts` (Supabase), PostStore gộp bài file + DB (TTL 60s), bài DB
  render client-side (marked + KaTeX + DOMPurify).
- [x] **Moderation comment** — admin xoá comment bất kỳ (RPC `admin_delete_comment`).
- [x] **i18n thật (vi/en)** — toàn bộ chuỗi UI qua `I18n.Pick`, switcher
  `?lang=`, cookie, AsyncLocal. (Chuỗi JS toast/copy vẫn vi.)
- [x] **Chế độ đọc** — A−/A+ (lưu localStorage), focus mode, progress bar, reading time.
- [x] **Trang "Về tôi"** — `/about`.
- [x] **Thống kê profile** — like/comment count.
- [x] **Export dữ liệu** — tải comments JSON.
- [x] **Sitemap lastmod + ping Google** — `/ping-sitemap`, nút ở `/write`.
- [x] **Phím tắt** — `/` mở search, `t` lên đầu, `Esc` đóng popup.
- [x] **Bìa bài viết** — `/cover/{slug}.svg` tự sinh + `og:image`.
- [x] **PWA/offline** — manifest + service worker (cache static + generated posts).
- [x] **Progress + reading time** — thanh tiến trình đọc + "N phút đọc".
- [x] **Lightbox ảnh** — bấm ảnh trong bài → xem toàn màn hình.
- [x] **Tìm kiếm full-text bình luận** — chế độ "Bình luận" trong search popup.

## Cần làm sau khi chạy migration

1. Chạy `supabase/setup.sql` (mới thêm: `posts`, `profiles.is_admin`,
   `admin_delete_comment`, `post_views`, `increment_views`).
2. Cấp admin cho tài khoản của bạn:
   ```sql
   update public.profiles set is_admin = true
   where id = (select id from auth.users where email = 'EMAIL-CUA-BAN@gmail.com');
   ```
3. Restart server. Test luồng: `/write` tạo bài → bài hiện trên trang chủ
   (≤60s) → `/posts/{slug}` render markdown + toán → xoá/sửa.

## Ghi chú

- Mọi tính năng mới cần Supabase: chạy lại `supabase/setup.sql` (idempotent).
- Cấu trúc: `Components/` (Blazor SSR) + `wwwroot/js/` (Alpine + supabase-js) +
  `supabase/setup.sql` (schema + RLS + trigger + RPC).
