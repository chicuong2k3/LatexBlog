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

## 5. Những chỗ mục lục của chính Euler sai

Mục lục in ở PDF 25–27 có vài số trang sai. Mục lục chỉ dùng làm gợi ý; **ranh giới chương lấy từ chính trang mở đầu chương**, đã đối chiếu bản scan:

| Chương | Mục lục ghi | Thực tế |
|---|---|---|
| Pars Prior II | 35 | 39 |
| Pars Prior IV | 121 | 98 |
| Pars Prior VI | 149 | 151 |
| Pars Prior IX | 341 | 241 |
