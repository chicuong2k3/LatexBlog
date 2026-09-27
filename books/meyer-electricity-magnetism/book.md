---
title: "Lịch sử điện và từ"
summary: "Bản dịch tiếng Việt đang được soạn từng chương từ tác phẩm A History of Electricity and Magnetism của Herbert W. Meyer, cuốn sử liệu ngắn về quãng trình khám phá điện và từ từ thời cổ đại đến hạt nhân nguyên tử, xuất bản năm 1972 dưới dạng Burndy Library Publication No. 27."
tags: [dich-sach, vat-ly, lich-su-vat-ly, dien-tu]
slug: "meyer-electricity-magnetism"
author: "Herbert W. Meyer"
original_title: "A History of Electricity and Magnetism"
language: "vi"
---

## Ấn phẩm nào đang được dịch

Bản dịch này theo đúng bản in:

- **Burndy Library Publication No. 27**, Norwalk, Connecticut, **1972**.
- Thiết kế bởi *The MIT Press Design Department*, đóng chữ *IBM Composer Bodoni*
  bởi Science Press, in trên giấy Mohawk Neotext Offset và khắc số LCCN
  **70-137473**, ISBN **0-262-13070-X** (bìa cứng) — xem trang quyền ở PDF 4.
- Lời tựa do **Bern Dibner** viết (PDF 11–14, trang in xi–xiv).

Đây là cuốn sử liệu viết tay, không phải giáo trình: Meyer kể lịch sử khám phá
theo trình tự thời gian, dành nhiều chỗ cho những cá nhân và xưởng thí nghiệm
cụ thể, và chú thích nguồn bằng thư mục ở cuối sách. Vì vậy bản dịch phải giữ
nguyên tên riêng, năm, tên xưởng, tên tạp chí và số trang trích dẫn.

Tóm lược về nguồn:

- Nguồn chính: bản scan trong
  `C:\Users\nguye\Downloads\A History of Electricity and Magnetism (Herbert W. Meyer) (z-library.sk, 1lib.sk, z-lib.sk).pdf`
  — **343 trang PDF**.
- Lớp OCR trong PDF là **bản nháp để đối chiếu, không phải nguồn chuẩn**. Nó
  hỏng nặng ở ba chỗ: dấu nháy đơn (`?` thay cho `'`), chữ `g`/`q` trong tên
  riêng và nơi xuất xứ (`Burndy` → `Bumdy`, `Gilbert` → `Gịlbert`), và số hiệu
  hình (`F@ure 2.1`). Chỗ nào có tên riêng, năm, số đo hay chú thích nguồn phải
  đọc lại trực tiếp trên ảnh scan trước khi chấp nhận.
- Quy đổi trang: **trang in = trang PDF − 18** trong toàn bộ phần thân sách, thư
  mục và tra cứu. Đã kiểm trên các trang mở đầu chương, thư mục và tra cứu.
  Phần đầu sách dùng số La Mã: PDF 5 = trang v, PDF 11 = trang xi, PDF 15 = xv.

## Quy ước dịch

- Dịch **từng trang**, giữ nguyên mọi câu, chú thích, công thức, bảng, chú thích
  hình, tiêu đề đang chạy (running head) và số trang in.
- Mỗi trang nguồn mở đầu bằng dấu hiệu `<!-- PDF N · trang in M -->`; tiêu đề
  đang chạy và số trang in nằm trong dấu hiệu đó, để không làm nhiễu văn xuôi.
  Dấu hiệu cũng là ranh giới trang khi một câu bị cắt giữa hai trang.
- Sách **không có chú thích chân trang** (footnotes). Thông tin nguồn nằm ở
  *Bibliography* (PDF 317–324) và được tác giả nói tới bằng tên tác giả trong
  văn xuôi. Vì vậy **không được tự thêm chú thích Markdown** trong các chương;
  `tools/test_build_books.py` kiểm tra không có chú thích nào bị bỏ rơi.
- Hình minh họa được đánh số theo chương (`Figure 3.5`, `Table 14.1`). Hình đã
  trích từ scan sang `assets/`, đặt tên `pNNN-fK.png` (NNN = trang PDF, K = thứ tự
  hình trên trang). Chú thích hình phải dịch và đặt ngay dưới ảnh.
- Bảng (`Table 7.1`, `Table 7.2`, `Table 7.3`, `Table 14.1`) được dựng lại thành
  bảng Markdown, giữ nguyên **tất cả** hàng và cột, kể cả hàng mà bản in ghi
  không rõ — ghi `[không rõ trong scan]` thay vì tự bịa.
- Công thức và ký hiệu viết bằng LaTeX. Trong sách chỉ có vài chỗ (định luật
  Coulomb, định luật Ampère, định luật Ohm, đơn vị đo, `h`, `c`, `e`) — không
  có phép tính dài. Chỉ số dưới phải đọc lại trên scan: lớp OCR hay trải phẳng
  chỉ số.
- Văn bản lịch sử khoa học: tên riêng, năm, kết quả thực nghiệm và trích dẫn thư
  mục giữ nguyên. Chỗ bản in tự mâu thuẫn thì giữ theo bản in và ghi chú trong
  file, không tự sửa.
- Chỗ scan không đủ rõ sẽ ghi `[không rõ trong scan]`; không tự suy đoán số liệu
  hoặc danh tánh chưa kiểm chứng.
- Tra cứu (PDF 325–343) giữ nguyên mọi số trang trích dẫn, vì chúng trỏ về số
  trang in của bản gốc chứ không phải số trang trên trang web.
- Trạng thái đối chiếu từng trang nằm trong `TRANSLATION_LEDGER.md`.
