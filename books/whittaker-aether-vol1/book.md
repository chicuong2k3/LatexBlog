---
title: "Lịch sử các thuyết về ether và điện, Tập I: Các thuyết cổ đạiển"
summary: "Bản dịch tiếng Việt đang được soạn từng chương từ tác phẩm A History of the Theories of Aether and Electricity của Edmund Taylor Whittaker, kể lại mười ba thuyết lý về ether và điện từ Descartes tới khoảng 1900."
tags: [dich-sach, vat-ly, lich-su-vat-ly, dien-tu]
slug: "whittaker-aether-vol1"
author: "Edmund Taylor Whittaker"
original_title: "A History of the Theories of Aether and Electricity, Vol. I: The Classical Theories"
language: "vi"
---

## Ấn phẩm nào đang được dịch

Bản dịch này theo **ấn phẩm đã sửa đổi và mở rộng năm 1951** của Sir Edmund
Whittaker, in lại trong *Harper Torchbooks* (TB/531), New York, Harper &
Brothers, 1960.

Đây **không phải** ấn phẩp đầu tiên năm 1910 của Thomas Nelson and Sons. Theo
trang quyền bản quyền ở PDF 8:

> This volume was originally published by Thomas Nelson and Sons Ltd., London,
> in 1910, revised and enlarged in 1951; and is here reprinted by arrangement.

Vì vậy: **không được ghi trong ghi chú rằng một đoạn thuộc ấn phẩm 1910** trừ khi
đã đối chiếu đúng ấn phẩm đó. Tác giả viết lời tựa ở PDF 9 xác nhận trực tiếp
điều này: *"The volume of 1910 has been to a considerable extent rewritten, with
the incorporation of much additional material"*. Phần thân sách vì thế phản ánh
tình hình vật lý tính đến khoảng 1951 - các mục như điện tử của Lorentz, lý thuyết
tương đối hạn và lý thuyết lượng tử đều được viết theo cách chỉ có thể có sau
1900.

Tóm lược về nguồn:

- Nguồn chính: bản scan trong `C:\Users\nguye\Downloads\A History of the Theories
  of Aether  Electricity, Vol. 1 The Classical Theories (Edmund Taylor Whittaker)
  (z-library.sk, 1lib.sk, z-lib.sk).pdf` - 452 trang PDF.
- Bản scan gốc: [Internet Archive, `historyoftheorie0001edmu`](https://archive.org/details/historyoftheorie0001edmu).
- Lớp OCR trong PDF là bản nháp để đối chiếu, **không** phải nguồn chuẩn. Nó
  làm hỏng nặng ký hiệu toán: chỉ số dưới bị trải phẳng, mũ trên bị mất, và các
  ma trận thành phần của `curl`/`grad` bị vỡ hoàn toàn (xem PDF 10, trang
  *Memorandum on Notation*). Chỗ nào có ký hiệu toán phải đọc lại trực tiếp trên
  bản scan ở mức phóng lớn trước khi chấp nhận.

## Quy ước dịch

- Dịch **từng trang**, giữ nguyên mọi câu, chú thích footnote, công thức, danh
  sách chương, tiêu đề đang chạy (running head) và số trang in.
- Mỗi trang nguồn mở đầu bằng một dấu hiệu
  `<!-- PDF N · trang in M -->`; tiêu đề đang chạy và số trang in được ghi kèm
  trong dấu hiệu đó, để không làm nhiễu văn xuôi. Dấu hiệu cũng đóng vai trò ranh
  giới trang khi một câu bị cắt giữa hai trang.
- Chú thích dùng footnote Markdown (`[^…]`), vì sách có hàng trăm chú thích trích
  dẫn thư mục. Nhãn mang số trang nguồn, ví dụ `[^p27n1]` là chú thích 1 ở PDF
  trang 27, để còn truy vết được về bản in. `tools/test_build_books.py` kiểm tra
  rằng mọi chú thích đều có định nghĩa và không định nghĩa nào bị bỏ rơi - Pandoc
  im lặng bỏ cả hai lỗi đó.
- **Sách có hình minh họa, nhưng không hình nào được đánh số.** Chúng được gọi tới
  bằng danh từ trần ("the figure"). Vì vậy không được dò hình bằng cách tìm
  `Fig.`/`figure` kèm số - cách đó báo nhầm rằng sách không có hình. Phải dò theo
  nhãn chữ cái cạnh nhau và các cụm `the figure` / `in the first Figure`. Hình
  trích từ scan sang `assets/`. Xem bảng hình trong `TRANSLATION_LEDGER.md`.
- Vì phần thân sách là toán vật lý, công thức được viết bằng LaTeX. Ký hiệu
  dùng **chữ đậm** cho vectơ (ví dụ \(\mathbf{E}\)), giữ nguyên quy ước của sách.
- **Lớp OCR không được tin dùng cho ký hiệu toán và chữ Hy Lạp.** Cả hai đều bị
  hỏng không thể phát hiện bằng mắt trên lớp OCR: một từ Hy Lạp hỏng trông y
  hệt một từ tiếng Anh sai chính tả. Mọi trang có ký hiệu toán, chữ Hy Lạp hoặc
  trích dẫn thư mục phải đọc lại trên ảnh scan. Bảng lỗi OCR đã xác minh nằm
  trong `TRANSLATION_LEDGER.md`.
- Các thuật ngữ tiếng Anh quan trọng được giữ lại kèm chú thích khi cần, để bản
  dịch vẫn truy vết được về nguyên bản.
- Văn bản lịch sử khoa học: tên riêng, năm, kết quả thực nghiệm và trích dẫn thư
  mục giữ nguyên. Chỗ bản in hoặc OCR tự mâu thuẫn thì giữ nguyên theo bản in và
  ghi chú trong file, không tự sửa.
- Chỗ scan hoặc OCR không đủ rõ sẽ được ghi `[không rõ trong scan]`; không tự
  suy đoán số liệu hoặc ký hiệu chưa kiểm chứng.
- Trạng thái đối chiếu từng trang nằm trong `TRANSLATION_LEDGER.md`.
