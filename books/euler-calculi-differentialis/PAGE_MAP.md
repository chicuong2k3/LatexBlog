# Cách tra số trang giữa bản scan và sách in

Bản scan này là của Internet Archive, mã `bub_gb_sYE_AAAAcAAJ`, 934 trang PDF. Sổ đối chiếu dùng **cả hai** loại số: số trang PDF (để mở đúng tờ giấy) và số trang in (để đối chiếu với ấn phẩm in). Trang in được lấy từ `page_numbers` của metadata archive.org, không phải đoán từ OCR.

## 1. Quan hệ giữa PDF và trang in

| Khoảng PDF | Trang in | Quan hệ |
|---|---|---|
| 1–4 | — | Bốn trang bìa/số trang của Google Books, không thuộc sách |
| 5 | (không đánh số) | Trang tiêu đề |
| 6–28 | i–xxiv | Lời tựa, mục lục, danh sách lỗi in |
| 29–860 | 1–832 | Thân sách, `PDF = trang in + 28` |
| 861–870 | 833–842 | **Bản in sao lặp — xem mục 2** |
| 871–934 | 833–896 | `PDF = trang in + 38` |

Nói gọn: phần lớn sách dùng `PDF = trang in + 28`.

## 2. Cảnh báo: khối 10 trang bị lặp trong bản scan

Trang in 833–842 xuất hiện **hai lần**:

- lần đầu ở PDF 861–870 (theo quy tắc `+28`)
- lần thứ hai ở PDF 871–880 (theo quy tự `+38`)

Đây là lỗi quét của Google Books, không phải lỗi của ấn phẩm. Cả hai bản đều nằm trong Chương XVII (*De interpolatione serierum*). Khi dịch, mỗi lần dẫn PDF phải ghi rõ đang dùng bản nào, và **đối chiếu chéo hai bản**: nếu hai bản khác nhau ở chỗ nào thì đó là lỗi scan, ghi vào `TRANSLATION_LEDGER.md` và dùng bản đọc được.

## 3. Chạy lại bản đồ trang khi cần

```bash
python tools/archive_pagemap_report.py --json /tmp/euler-pagemap.json
```

Script tải metadata của archive.org, in ra mọi chỗ độ lệch `PDF − trang in` bị nhảy, và ghi bản đồ đầy đủ ra JSON.

## 4. Dựng lại bản OCR theo trang

`_djvu.txt` của archive.org có khoảng trắng giữa từ đúng nhưng **không** có dấu phân trang, nên không dùng để tra số trang được. Bản OCR theo trang dựng từ `_djvu.xml`:

```bash
python tools/build_djvu_paged_ocr.py <đường-dẫn>_djvu.xml <thư-mục-đích>
python tools/euler_page.py <ocr-paged.txt> <pdf-lo> <pdf-hi>
```

## 5. Mục lục in của Euler khớp ranh giới chương

Mục lục in ở PDF 25–27 (trang in xxi–xxiii) **không** sai ở chỗ nào đã kiểm. Bản trước của mục
này có bảng "Mục lục ghi / Thực tế" với bốn số 35, 121, 149, 341; bốn số ấy lấy từ lớp OCR đọc
hỏng, không phải từ bản in. Đối chiếu lại bằng mắt ngày 2026-09-28 (xem mục lời tựa trong
`TRANSLATION_LEDGER.md`), mục lục in đúng như trang mở đầu chương:

| Chương | OCR cũ đọc ra (sai) | Mục lục in | Trang mở đầu chương thật |
|---|---|---|---|
| Pars Prior II | ~~35~~ | 39 | 39 (PDF 67) |
| Pars Prior IV | ~~121~~ | 98 | 98 (PDF 126) |
| Pars Prior VI | ~~149~~ | 151 | 151 (PDF 179) |
| Pars Prior IX | ~~341~~ | 241 | 241 (PDF 269) |

Các số khác mà bản dịch cũ của mục lục chép sai (Phần I: 184 thay cho 178; Phần II: 548, 615,
617, 680 thay cho 546, 619, 657, 689, cùng vài tên chương) cũng là lỗi chép, bản in đúng.
Hiện không còn dòng nào của mục lục được biết là sai so với trang mở đầu chương. Dù vậy, ranh
giới chương vẫn **lấy từ chính trang mở đầu chương**, không lấy từ mục lục.
