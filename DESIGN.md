# Design — LatexBlog

<!-- impeccable:design-schema 1 -->

Thế giới **Sakura Neon**: một blog toán học nơi công thức là thứ phát sáng
nhất trên trang, còn mọi thứ khác giữ trật tự và đọc được. Chọn từ vòng
gieo xúc xắc (seed `47ba06f1`, phương án 7) — hai phương án còn lại lưu ở
`mocks/`.

## Identity

- **Thông điệp:** toán học không chỉ đúng — mà còn phát sáng. Công thức là
  công dân hạng nhất, xuất hiện ngay trong featured card ở viewport đầu.
- **Từ chối:** kiểu "doc-site" cột thẻ xám; thay bằng năng lượng phố đêm
  Nhật Bản.
- **Vật mang:** hoa sakura vẽ nét (stroke), scanline mảnh phủ toàn trang,
  số bài viết dạng outline.

## Palette

Một bộ token sáng duy nhất (đã bỏ chế độ tối):

| Vai trò | Giá trị |
|---|---|
| Nền `--bg` | `#fdf1f6` |
| Bề mặt `--surface` | `#ffffff` |
| Mực `--ink` / mờ `--muted` | `#231726` / `#7a4a68` |
| Neon chính `--neon` | `#e63e8f` |
| Neon phụ `--neon-2` | `#7a5cff` |
| Neon thứ ba `--neon-3` | `#0ea5c4` |
| Kẻ `--line` | `#f0d8e4` |

Chiến lược màu: **Committed** — một màu bão hòa (hồng sakura) đảm nhận
30–60% bề mặt; tím và cyan là các vai phụ, không tranh chấp.

## Type

- **Display:** Bricolage Grotesque (800/700/600) — thương hiệu, h1, tiêu đề
  bài, số bài viết, heading trong prose. Mang cá tính chữ Nhật-street, hỗ
  trợ tiếng Việt đầy đủ.
- **Body:** Space Grotesk — mọi văn xuôi, code, điều khiển. Workhorse face
  cho Read surface; chấp nhận cảnh báo "overused" của detector vì cá tính
  nằm ở display face, không ở body.
- **Mật độ:** heading `letter-spacing: -0.03em` (h1 hero) → `-0.015em`
  (prose); body `line-height 1.7–1.78`; độ dài dòng prose ~72ch
  (`.lb-post-page max-width: 780px`).

## Composition

- **Hero (home):** h1 hai dòng với hai từ phát sáng (`--neon`, `--neon-2`),
  lead thật từ I18n, featured card viền neon chứa bài mới nhất + ma trận
  xoay làm vật minh họa toán học. Không có eyebrow/kicker phía trên heading.
- **Danh sách bài:** hàng ngang với số outline (`01, 02…`), tiêu đề, tóm
  tắt, ngày + thẻ; hover = tint nền, không dịch layout.
- **Trang bài:** tiêu đề + ngày + thẻ; TOC scrollspy (active = nền tint,
  không border-side); prose pandoc với heading `h1` (pandoc ánh xạ
  `\section → h1`).
- **404:** "Không tìm thấy trang." với dấu chấm neon.

## Components & States

- **Hoa sakura:** SVG stroke 5 cánh (`#lb-blossom`), logo nav + footer.
- **Thẻ (`lb-tag`):** chip 1px viền, `#` màu neon; hover chuyển viền+sáng.
- **Nút (`lb-button`):** viền neon, hover tint + glow, active nhấn xuống 1px.
- **Ô tìm kiếm (`lb-field`):** focus viền neon + glow.
- **Copy code (`lb-copy`):** trên góc phải code panel; "Sao chép" → "Đã chép!".
- **Focus:** outline 2px neon; selection hồng nền trắng chữ; scrollbar themed.

## Motion

Một khoảnh khắc chủ đạo mỗi trang: **đường quét sáng** (`lb-sweep`) lướt
qua hero 7s ease-in-out, vô hạn. Hover chuyển màu/transform nhẹ. Layout
properties không animate (post hover không đẩy padding). `prefers-reduced-motion`
tắt sweep và mọi transition.

## Responsive

- `≤720px`: nav gập menu Alpine, hero giảm padding, featured xếp cột, hàng
  bài xếp dọc (số `01` nhỏ lại), heading scale bằng clamp.
- Không tràn ngang ở 390px và 1440px (kiểm chứng bằng DOM đo scrollWidth).

## Accessibility

- Tương phản: văn xuôi `--ink` trên `--surface`; text phụ `--muted` ≥ 4.5:1.
- KaTeX render thật (không thay bằng hình); toán display cuộn ngang khi dài.
- Toàn bộ tương tác dùng bàn phím; aria-label cho toggle menu.

## Tech notes

- Không còn DAUB CSS; `site.css` tự chứa toàn bộ hệ thống.
- Font Google (Bricolage Grotesque + Space Grotesk), KaTeX/htmx/Alpine từ CDN.
- `Program.cs`: `UseStaticFiles` thay `MapStaticAssets` — MapStaticAssets
  trả body rỗng cho client chấp nhận `gzip` (variant nén khai báo nhưng
  file không tồn tại trong dev), làm mất toàn bộ CSS/JS.
