# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Sinh viên và người tự học toán / lập trình nói tiếng Việt, đọc trên điện
thoại lẫn máy tính, tự nhịp độ học. Tác giả (chủ blog) là người viết duy
nhất.

## Product Purpose

Blog cá nhân xuất bản các bài hướng dẫn toán học và lập trình được viết
dưới dạng LaTeX, render thành HTML tĩnh tại thời điểm build. Thành công là
một độc giả tìm được bài, đọc được công thức toán rõ ràng và theo dõi trọn
mạch từ đầu tới cuối.

## Positioning

Toán học là công dân hạng nhất: nguồn bài là `.tex` hoặc `.md`, Pandoc
chuyển thành HTML, KaTeX render công thức phía client. Một blog mà công
thức toán đẹp và nhất quán là lý do tồn tại — không phải tính năng phụ.

## Operating Context

Đọc trong hai cảnh sáng/tối (chế độ tối là ràng buộc bắt buộc), trên màn
hình hẹp lẫn rộng. Độc giả học theo bài, đôi khi tra cứu lại qua tìm kiếm
và thẻ.

## Capabilities and Constraints

- Nguồn bài là `posts/*.{tex,md}` (frontmatter + Pandoc) → `wwwroot/generated/`.
- Kiến trúc: .NET 10 Blazor Web App (Static SSR), htmx (load-more, search,
  tag filter) + Unpoly.Blazor.Shadcn, JS thuần qua `up.compiler` (TOC
  scrollspy, menu, copy-code). Chỉ có giao diện sáng.
- **Hiển thị công thức toán (KaTeX) phải được giữ nguyên** — ràng buộc cứng.
- Các trang hiện có: Trang chủ, Bài viết, Thẻ, Tìm kiếm, NotFound.
- I18n hiện chỉ có chuỗi tiếng Việt; cơ chế đa ngôn ngữ tồn tại để mở rộng.
- Khi offline (CDN): công thức hiển thị LaTeX thô, văn xuôi vẫn đọc được.

## Brand Commitments

- Tên sản phẩm: **LatexBlog**.
- Ngôn ngữ mặc định: tiếng Việt.
- Ràng buộc thẩm mỹ được chủ sở hữu ghim: **giao diện mang chất anime hoa
  anh đào (sakura)**. Ghi nhận nguyên văn, không mở rộng.

## Evidence on Hand

- Bài viết thật trong `posts/` (`.tex` hoặc `.md`): "Chào mừng đến với
  LatexBlog", "Ma trận và phép biến đổi tuyến tính", "Python cơ bản cho
  người mới", "Đạo hàm và ý nghĩa hình học" — kèm date, tags, summary thật.

## Product Principles

- Toán học phải luôn hiển thị đẹp và nhất quán ở mọi kích thước màn hình.
- Mạch đọc là trên hết: cấu trúc và điều hướng phục vụ sự lĩnh hội.
- Hoạt động ổn định ở cả hai chế độ sáng/tối.
- Không phát minh nội dung hay tuyên bố sự thật giả.

## Accessibility & Inclusion

- Văn bản và chỗ trống đạt tương phản đủ.
- Toàn bộ điều khiển dùng được bằng bàn phím.
