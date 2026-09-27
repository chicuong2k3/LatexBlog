---
title: "Thí nghiệm với dòng điện xoay chiều thế cao và tần số cao"
summary: "Bản dịch tiếng Việt đang được soạn từng chương từ bài giảng Experiments with Alternate Currents of High Potential and High Frequency của Nikola Tesla, trình bày trước Viện Kỹ sư Điện London năm 1892, gồm tiểu sử tóm tắt của tác giả và toàn văn bài giảng."
tags: [dich-sach, vat-ly, dien-tu, hien-dien]
slug: "tesla-alternate-currents-1892"
author: "Nikola Tesla"
original_title: "Experiments with Alternate Currents of High Potential and High Frequency"
language: "vi"
---

## Ấn phẩm nào đang được dịch

Bản dịch này theo **ấn phẩm New York: The W. J. Johnston Company, Ltd., 167–176
Times Building, 1892** — đúng bản gốc của bài giảng, không phải ấn phẩm in lại
sau này. Trang quyền (PDF 9) ghi:

> With a Portrait and Biographical Sketch of the Author.
>
> NEW YORK: The W. J. Johnston Company, Ltd., 167–176 Times Building. 1892.

Đây là **bài giảng** Tesla đọc trước Viện Kỹ sư Điện London
(*Institution of Electrical Engineers*), nên toàn văn là một mạch văn xuôi liên
tục, không chia thành mục đánh số. Chính Tesla nói ở đầu bài rằng bài này **giả
định người đọc đã biết bài giảng trước đó**:

> The present lecture presupposes a knowledge of the former, but it may be read
> and understood by any one even though he has not read the earlier one. It forms
> a sort of continuation of the latter.

### Đừng nhầm với tuyển tập năm 1909

Bản dịch này **không phải** cuốn *Experiments of Nikola Tesla* do Doubleday,
Page & Co. xuất bản năm 1909, in tại London — tuyển tập sáu bài giảng mà nhiều
người quen thuộc hơn. Sáu bài ấy gồm "Experiments with Alternate Currents of
High Potential and High Frequency" **cùng năm 1892**, nhưng bản in ở đây chỉ có
**một** bài giảng đó, không kèm năm bài còn lại, và không có phần tiểu sử dài
của tuyển tập. Khi tra cứu hoặc trích dẫn, phải phân biệt hai ấn phẩm này.

## Nguồn

- Nguồn chính: bản scan
  `C:\Users\nguye\Downloads\tesla-src\experimentswitha00tesl_0.pdf` — **177 trang
  PDF**.
- Bản scan gốc: [Internet Archive,
  `experimentswitha00tesl_0`](https://archive.org/details/experimentswitha00tesl_0),
  quét năm 2019 bởi University of Illinois Urbana-Champaign.
- Lớp OCR nằm sẵn trong PDF (và bản `_djvu.txt` riêng) chỉ là **bản nháp để đối
  chiếu, không phải nguồn chuẩn**. Nó hỏng nặng ở ba chỗ:
  1. **Dấu gạch nối cuối dòng** bị giữ thành ký tự lạ (`pro¬ duced`, `insulat¬
     ing`, `cir¬ cuit`). Phải bỏ và nối lại thành từ.
  2. **Số trang in đọc sai** — `folio=182` ở PDF 149 là trang in 132; `Fig. 83`
     ở PDF 150 là `Fig. 33`; `Fig. 12` ở PDF 118 là `Fig. 25`. Số trang in phải
     đọc lại từ scan, không tin lớp OCR.
  3. **Chữ và ký hiệu hỏng không phát hiện được bằng mắt**: `CUBRENTS` (Currents),
     `ELEGTR1CAL` (Electrical), `Wlien` (When), `tlie` (the), `turb` (tube),
     `form cf` (form of). Chỗ nào có ký hiệu toán hoặc danh từ riêng phải đọc lại
     trên ảnh scan.

**File EPUB `experimentswitha00tesl_0.epub` trong Downloads không dùng được.** Đó là
một lần số hóa hỏng: 177 trang vỏ bọc nhưng chỉ 43 trang có ảnh, và **mọi ảnh đều là
ảnh chụp bìa vải và tem thư viện**, không có trang trong nào; lớp chữ rỗng, mục lục
`<ol/>` rỗng, OPF không có `dc:title` lẫn `dc:creator`. Không thể dịch từ file đó.

## Cấu trúc nguồn

PDF có **176 trang**. Số trang trong bảng dưới là số thứ tự trang PDF (1-based),
khớp với số trang mà `pdftoppm -f N` dùng.

| PDF | Trang in | Nội dung |
|---|---|---|
| 1–10 | — | Lớp thư viện, trang tựa, quảng cáo nhà xuất bản, trang trắng lưu trữ |
| 11–17 | III–IX | **Tiểu sử tóm tắt của Nikola Tesla** (7 trang, đánh số La Mã) |
| 18–163 | 1–146 | **Bài giảng** `EXPERIMENTS WITH Alternate Currents of High Potential and High Frequency` |
| 164–167 | — | Quảng cáo sách khác của nhà xuất bản ở cuối sách |
| 168–176 | — | Trang trắng |

Bản dịch chia theo **18 chương**: chương 0 là lời dẫn nhập cộng tiểu sử, chương
01–17 là bài giảng. Bản in không có mục lục, nên **ranh giới chương do người dịch
đặt**, theo dải chủ đề và bám theo ranh giới trang in; mọi ranh giới đều ghi ở
`TRANSLATION_LEDGER.md`. Bốn trang quảng cáo cuối sách được dịch ở chương 17 vì
chúng là trang in của sách.

Các chương đã dịch:

| Chương | File | Trang in | Nội dung |
|---|---|---|---|
| 00 | `chapters/00-loi-dan-nhap-va-tieu-de-khoi.md` | —, III–IX | Lời dẫn nhập + tiểu sử tóm tắt tác giả. **Đã dịch, đã đối chiếu scan.** |
| 01 | `chapters/01-mo-dau-ke-hoach-cong-trinh.md` | 1–3 | Mở đầu: Crookes và kế hoạch của buổi nói chuyện. **Đã dịch, đã đối chiếu scan.** |
| 02 | `chapters/02-dong-xoay-chieu-nhu-song.md` | 4–10 | Dòng xoay chiều như một sóng, nguồn cao tần. **Đã dịch, đã đối chiếu scan.** |
| 03 | `chapters/03-nhung-dang-phong-dien.md` | 11–15 | Những dạng phóng điện. **Đã dịch, đã đối chiếu scan.** |
| 04 | `chapters/04-cau-tao-bo-phong-dien.md` | 16–21 | Cấu tạo bộ phóng điện và nam châm. **Đã dịch, đã đối chiếu scan.** |
| 05 | `chapters/05-khoang-cach-phong-dien-va-day-phat-sang.md` | 22–27 | Khoảng cách phóng điện và những dây phát sáng. **Đã dịch, đã đối chiếu scan.** |
| 06 | `chapters/06-tam-sang-lien-tuc-cuc-quang-va-luong-sang-ma.md` | 28–35 | Tấm sáng liên tục, cực quang và luồng sáng ma. **Đã dịch, đã đối chiếu scan.** |
| 07 | `chapters/07-cach-dien-bang-dau-phong-dien-choi-long-va-tu-cam.md` | 36–43 | Cách điện bằng dầu, phóng điện chổi lông và tự cảm. **Đã dịch, đã đối chiếu scan.** |
| 08 | `chapters/08-choi-long-quay-sen-nhay-cam-tinh-dien-va-tu-tinh.md` | 44–48 | Chổi lông quay, sự nhạy cảm tĩnh điện và từ tính. **Đã dịch, đã đối chiếu scan.** |
| 09–17 | — | 49–146 | Còn lại của bài giảng. **Chưa dịch.** |

### Trang in trong bài giảng

`trang in = PDF − 18`. Công thức đã kiểm trên 146 trang bằng lớp bbox của
`pdftotext -bbox-layout`: 114 trang khớp, 8 trang lệch do lớp OCR đọc sai chữ số
(xem `TRANSLATION_LEDGER.md`), 24 trang lớp OCR không cho dòng số trang sạch.
Tiểu sử nằm ngoài công thức này, dùng số La Mã I–IX ở PDF 11–17.

## Quy ước dịch

- Dịch **từng trang**, giữ nguyên mọi câu, công thức, chú thích, nhãn hình, tiêu đề
  đang chạy và số trang in.
- Mỗi trang nguồn mở đầu bằng dấu hiệu `<!-- PDF N · trang in M -->`; tiêu đề đang
  chạy và số trang in nằm trong dấu hiệu đó. Dấu hiệu cũng đóng vai trò ranh giới
  trang khi một câu bị cắt giữa hai trang.
- Chú thích dùng footnote Markdown (`[^…]`), nhãn mang số trang nguồn (`[^p27n1]` là
  chú thích 1 ở PDF trang 27).
- **Sách có 35 hình được đánh số** (`Fig. 1` … `Fig. 35`), kèm nhãn chữ. Hình trích
  từ scan sang `assets/`. Xem bảng hình trong `TRANSLATION_LEDGER.md`. Khi dò hình
  bằng regex, phải bỏ qua hai lỗi OCR đã biết: `Fig. 83` (thực ra `Fig. 33`) và
  `Fig. 12` ở PDF 118 (thực ra `Fig. 25`).
- Vì phần thân sách là vật lý kỹ thuật, công thức được viết bằng LaTeX. Ký hiệu
  giữ nguyên quy ước của sách: `Fig.`, ký hiệu cơ (`C`, `C'`, `L`, `T`, `S`, `R`, `s`,
  `a`, `b`, `m`, `r`), đơn vị (`cm`, `mm`, `volts`, `amperes`).
- Bản in dùng chữ nghiêng cho ký hiệu; giữ bằng `*…*`. Sai số lịch sử của tác giả
  giữ nguyên, chỉ ghi chú ở chỗ cần — không sửa trong bản dịch.
- Chỗ scan hoặc OCR không đủ rõ sẽ được ghi `[không rõ trong scan]`; không tự suy
  đoán số liệu hoặc ký hiệu chưa kiểm chứng.
- Trạng thái đối chiếu từng trang nằm trong `TRANSLATION_LEDGER.md`.
