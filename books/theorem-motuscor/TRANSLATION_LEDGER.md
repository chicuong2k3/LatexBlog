# Sổ đối chiếu bản dịch

Nguồn: `C:\Users\nguye\Downloads\theoriamotuscor00gausgoog.pdf` — 271 trang PDF.
Bản OCR đối chiếu: [Internet Archive OCR](https://archive.org/download/theoriamotuscor00gausgoog/theoriamotuscor00gausgoog_djvu.txt).
Tác giả: Carl Friedrich Gauss.
Ngôn ngữ nguồn: Latin.
Bản dịch đang được soạn theo từng trang scan; chưa được xem là hoàn tất khi còn trang chưa dịch hoặc chưa đối chiếu.

| Trang PDF | File đích | Trạng thái | Ghi chú |
|---|---|---|---|
| 1–5 | Không có file dịch | Đã rà soát | Trang giới thiệu quyền sử dụng của Google, trang bìa và trang trắng; không phải nội dung sách cần dịch. |
| 6 | `book.md` | Đã dịch | Trang tiêu đề: *Theoria motus corporum coelestium in sectionibus conicis solem ambientium*. |
| 7 | Không có file dịch | Đã rà soát | Trang trắng. |
| 8–16 | `chapters/00-loi-tua-va-muc-luc.md` | Đang dịch | Đã dịch PDF 8–16; còn một số chi tiết Latin và câu nối chuyển trang cần đối chiếu lại. |
| 17 | `chapters/00-loi-tua-va-muc-luc.md` | Đã dịch | Đã dịch mục lục Liber Primus, Liber Secundus và các Section; số trang in giữ theo scan. |
| 18–29 | `chapters/01-liber-primus-phan-i.md` | Đang dịch | Đã dịch mở đầu Liber Primus, Phần I, các định luật I–IV, hằng số $k$, §3–§13, anomalia thật/tâm sai/trung bình, công thức apsid, hyperbol, các quan hệ lượng giác, hai ví dụ tính và phương pháp hiệu chỉnh bài toán Kepler; còn một số số liệu bảng của PDF 29 được giữ `[OCR không rõ]`. |
| 30–44 | `chapters/02-liber-primus-phan-i-tiep.md` | Đã dịch và đối chiếu scan | Đã dịch các phương pháp §14–§32, phương trình vi phân, cực đại phương trình tâm, chuyển động parabol, bảng Barker, các đại lượng phụ và ảo của hyperbol, ước lượng sai số bảng; đã đối chiếu PDF 41–44 với scan, §32 tiếp tục ở PDF 45. |
| 45–61 | `chapters/02-liber-primus-phan-i-tiep.md` | Chưa dịch | Phần còn lại của Section I của Liber Primus, bắt đầu bằng phần tiếp theo của §32. |
| 148–? | `chapters/02-liber-secundus.md` | Chưa xác định đầy đủ | Liber Secundus bắt đầu theo mục lục tại trang in 131; cần xác định chính xác điểm chuyển PDF và dịch từng Section. |
| ?–271 | Chưa phân loại | Chưa rà soát | Các phần còn lại của PDF, gồm phần cuối Liber Secundus và phụ lục nếu có; không được coi là đã đối chiếu. |

## Quy tắc hoàn tất

Một cuốn chỉ được đánh dấu hoàn tất khi:

- từng trang PDF có một mục trong sổ này;
- mỗi câu, công thức, chú thích, bảng, caption và hình đã được đối chiếu với scan;
- hình ảnh đã được trích hoặc dựng lại bằng TeX/TikZ hoặc nguồn vector tương đương;
- các trang chưa xác minh được ghi rõ, không thay bằng suy đoán.
