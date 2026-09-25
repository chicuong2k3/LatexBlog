# Dịch sách

Thư mục này chứa bản dịch tiếng Việt của các cuốn sách nước ngoài. Nội dung ở đây là một collection riêng: nó không được trộn vào `posts/`, danh sách bài viết, thẻ hoặc RSS của bài viết. Tìm kiếm toàn cục vẫn bao gồm sách, nhưng kết quả sách phải được hiển thị trong nhóm **Sách dịch** riêng biệt với **Bài viết**.

## Quy tắc dịch sách

Khi được yêu cầu dịch một cuốn sách, phải dịch đầy đủ từng trang và từng câu, không bỏ sót, không tóm tắt và không tự thêm nội dung. Công thức, chú thích, bảng, chú thích hình, tiêu đề, sơ đồ và mọi hình minh họa đều phải được giữ lại. Nếu không thể trích xuất hình, phải dựng lại bằng TeX/TikZ hoặc nguồn vector tương đương và đánh dấu để kiểm tra. OCR chỉ là bản nháp để đối chiếu, không thay thế việc kiểm tra bản scan. Mỗi cuốn phải có sổ đối chiếu từng trang nguồn; chỉ gọi là hoàn tất khi mọi trang đều được kiểm tra.

## Cấu trúc

```text
books/
└── <book-slug>/
    ├── book.md
    └── chapters/
        ├── 01-<chapter-slug>.md
        └── 02-<chapter-slug>.md
```

Mỗi cuốn có một `book.md` (hoặc `book.tex`) làm manifest và phần giới thiệu tùy chọn. Mỗi chương là một file `.md` hoặc `.tex` trong `chapters/`. Có thể để thư mục `books/` trống trước khi bắt đầu bản dịch đầu tiên.

## Frontmatter của `book.md`

Bắt buộc:

```yaml
title: "Tên sách bằng tiếng Việt"
summary: "Mô tả ngắn về cuốn sách."
tags: [dich-sach, toan]
```

Tùy chọn:

```yaml
slug: "the-prisoner"
author: "Tên tác giả gốc"
original_title: "Original title"
language: "vi"
```

`slug` mặc định là tên thư mục. Mỗi slug phải là chuỗi kebab-case an toàn, không chứa dấu gạch chéo hoặc `..`.

## Frontmatter của chương

Bắt buộc:

```yaml
title: "Chương Một"
summary: "Tóm tắt chương."
```

Tùy chọn:

```yaml
slug: "chapter-one"
number: 1
```

Thứ tự chương được xác định bởi `number`, sau đó đến số thứ tự ở đầu tên file, rồi tên file. Mỗi chương có URL riêng:

```text
/books/<book-slug>/<chapter-slug>
```

Các file được render bằng Pandoc giống bài viết, nên có thể dùng Markdown, LaTeX, math và code block.
