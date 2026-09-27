# Quy ước lớp chú giải hiện đại

Lớp chú giải này **không thuộc bản dịch**. Nó là lớp chú thích dành cho người đọc biết toán
hiện đại, do người dịch/biên tập viết thêm, nằm tách biệt khỏi văn bản Euler. Mọi quy tắc ở
`../newton-principia/ANNOTATION_GUIDE.md` còn hiệu lực, trừ chỗ dưới đây được viết lại cho
Euler.

## 1. Vì sao lớp chú giải này nặng hơn với Euler

Bản dịch giữ nguyên ký hiệu của Euler. Điều đó đúng, nhưng nó đặt gánh nặng lên người đọc
hiện đại: năm 1755 không có `dy/dx`, không có `∂`, không có `\log`, không có `e`. Người đọc
Việt Nam học THPT chắc chắn sẽ vướng. Việc của lớp chú giải là **giải nghĩa ký hiệu**, để
bản dịch được giữ nguyên mà vẫn đọc được.

Bảng tra nhanh ký hiệu nằm ở `KY_HIEU_EULER.md`. Callout **không** lặp lại cả bảng ấy; nó
chỉ giải thích cái mà đoạn đang dùng, tại chỗ.

## 2. Nguyên tắc bất di bất dịch

- **Không sửa, xóa, hay viết lại ý nghĩa** của bất kỳ câu nào đang có trong file. Không tóm
  tắt, không làm rõ, không sửa thuật ngữ, không bổ sung câu.
- **Ngoại lệ — lỗi chính tả được phép sửa.** Sai dấu, sai chính tả rõ ràng thì sửa thẳng.
  Mỗi lần sửa phải ghi vào `TRANSLATION_LEDGER.md`.
- **Không tự sửa những chỗ nghi ngờ là lỗi OCR.** Marker `[OCR không rõ]`, chỗ còn nghi vấn
  về công thức hay số liệu thì để nguyên và ghi vào ledger.
- Ngoài ra, chỉ được **CHÈN** callout mới, đặt sau khối văn bản nó giải thích và trước tiêu
  đề kế tiếp.
- Callout luôn bắt đầu bằng dòng trống `>` riêng, kết thúc bằng một dòng trống.

### 2bis. Lỗi của chính tác giả

Euler in nhiều chỗ sai, và ông tự liệt kê một danh sách ở trang *Errores Typographici* (trang
in xxiv):

```text
pag. 509. lin 3. loco 2ZZxx lege 2xx+2x
pag. 513. lin 14. loco (x^4−a) lege …
```

Cách xử lý:

- **Giữ nguyên** những chỗ sai mà Euler không tự ghi trong danh sách. Người đọc cần thấy đúng
  bản in.
- Chỗ nào Euler **có** ghi là lỗi in, vẫn giữ nguyên bản in trong phần dịch, rồi ghi vào
  ledger, và **có thể** chú giải trong callout rằng tác giả đã tự thừa nhận chỗ đó sai.
- Không bao giờ tự sửa một chỗ sai vì "chắc chắn tác giả muốn viết thế này".

## 3. Cú pháp callout

Callout là blockquote Markdown bắt đầu bằng marker cố định `**[Chú giải]**`, và dòng đầu
phải đúng bằng marker ấy.

````markdown
> **[Chú giải]**
>
> **Chỗ `dx` của Euler không phải một phân số**
>
> Ngày nay ta viết $\frac{dy}{dx}$. Euler không có khái niệm phân số vi phân: $dy$ và $dx$ là
> hai vi phân, còn tỉ số $\frac{dy}{dx}$ là một *hàm* của $x$, được dùng đúng như một đại
> lượng mới.
>
> $$
> \frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x}
> $$
>
> Việc coi tỉ số ấy là một đại lượng riêng, chứ không phải phép chia, chính là điều cho
> phép chuỗi Taylor dạng hàm số.
````

- Tiêu đề con (in đậm) phải **nêu ra vấn đề cụ thể** của đoạn đó, hoặc bỏ hẳn tiêu đề nếu
  ghi chú ngắn.
- Cấm các nhãn chung chung ở vị trí tiêu đề: `**Khái niệm tương ứng.**`, `**Công thức.**`,
  `**Vì sao Euler viết như vậy.**`, `**Hiện nay thì sao.**`, `**Lưu ý nguồn gốc.**`.
- Câu hỏi để quyết định có cần ghi chú: **bỏ ghi chú này đi, người đọc hiện đại có hiểu sai
  hoặc bỏ lỡ điều gì không?** Nếu không, bỏ.
- Cấm câu sáo: *“Đây là mấu chốt”*, *“Điều đáng chú ý”*, *“Điều thú vị”*, *“Có thể thấy
  rằng”*, *“Một ngõ ngách dẫn tới”*, *“Vô tình đặt nền móng cho”*, *“Hàng thế kỷ sau”*...
- Chỉ dùng lệnh KaTeX an toàn: `\frac`, `\sqrt`, `\sum`, `\int`, `\begin{aligned}`,
  `\begin{cases}`, `\vec`, `\hat`, `\mathrm`, `\text`, `\cdot`, `\times`, `\approx`,
  `\propto`, `\partial`, `\qquad`, `\Rightarrow`. **Không** dùng `\begin{align}`, `\label`,
  `\eqref`, `\newcommand`, `\begin{figure}`.
- Trong callout **không** nhúng hình và **không** nhúng bảng Markdown.

## 4. Ba lớp phải tách bạch

Dễ nhất là vô tình gán khái niệm thế kỷ XIX–XX ngược trở lại cho Euler. Mỗi callout giữ ba
lớp này ở ba chỗ khác nhau:

1. **Euler thực sự nói gì** — bối cảnh toán học thế kỷ XVIII. Chỉ ra mâu thuẫn logic **thật
   sự** sau khi đã kiểm tra định nghĩa mà thời đó dùng.
2. **Ký hiệu hiện đại tương ứng là gì** — công thức hiện đại, kèm điều kiện cần thiết mà
   Euler không nói.
3. **Toán học đương đại nhìn nhận nó thế nào** — kèm mức độ đúng/sai của Euler.

Dễ gặp nhất với Euler là chỗ ông coi vi phân là "vô cùng nhỏ bằng 0" rồi tự hủy bỏ các lý
lẽ hình học. Lớp 1 phải nói rõ: Euler *không* dùng giới hạn, ông dùng quan hệ tỉ lệ thuần
số học, và chính vì vậy ông cần một lý thuyết dựng lên từ đó. Lớp 3 mới nói đến việc sau
này người ta chọn cách khác.

## 5. Mọi khẳng định phải có dấu vết

Mỗi khẳng định trong callout phải thuộc một trong bốn loại:

1. **Trích văn bản nguồn.** Euler tự nói gì thì trích nguyên văn, kèm trích dẫn tới chương
   và số đoạn (ví dụ "§212" trong Chương IV).
2. **Euler tự tuyên bố.** Ông nói phép tính này do ai phát minh, ông đã "tự thử" cái gì.
3. **Nghiên cứu hiện đại nói.** Khi dẫn sách bài hay bài báo, nêu rõ tên tác giả và công
   trình.
4. **Suy luận của người viết.** Phải đánh dấu là suy luận.

Cấm tuyệt đối: nói Euler "có lẽ", "hẳn là" mà không kèm nguồn; ghi một năm, một tên, một
con số mà không truy được về chỗ cụ thể. Chưa kiểm được mà chưa có cơ hội kiểm thì bỏ câu
đó.

## 6. Chọn cái gì để chú giải

Ứng viên nên có callout — vẫn phải qua câu hỏi ở mục 3:

1. Mỗi **định nghĩa** (Definition) và **định luật** (Lex, Theorema).
2. Mỗi thuật ngữ kỹ thuật Euler **đặt ra hoặc định nghĩa lại**, ở lần xuất hiện đầu tiên
   trong chương: *differentia*, *incrementum*, *differentiale*, *infinite paruum*,
   *functio*, *variabilis*, *constans*, *series*, *differentiae similes*, *terminus
   generalis*, *summa seriei*, *infinitas*, *criteria radicum imaginariarum*, *status
   functionis*...
3. Định lý trụ cột mà ngày nay mang tên khác — định lý Taylor, quy tắc chuỗi, tiêu chuẩn
   các nghiệm, định lý Rolle.
4. Chỗ Euler nói ngược với cách dạy hiện nay.

Không cần callout: đại lượng trung gian, ví dụ luyện tay không có ý nghĩa lý thuyết, bảng số
liệu, và lặp lại khái niệm đã chú giải ở chương trước.

## 7. Mật độ

**Độ dài do độ khó quyết định.** Hai ngưỡng cứng do `tools/check_book_callouts.py` kiểm:
**25–700 từ** (đã loại trừ phần công thức LaTeX). Ngưỡng số callout theo từng chương nằm
trong `TRANSLATION_LEDGER.md`; chương nào vượt ngưỡng thì chọn những khái niệm quan trọng nhất.

## 8. Hình minh họa và hai manifest khai báo

Cổng kiểm tra `--fidelity` so phần **không phải callout** của mỗi chương với `git HEAD`. Mọi
thay đổi văn bản dịch phải được khai, nếu không sẽ bị báo là sai lệch.

### Sửa văn bản dịch — `AUTHORIZED_TEXT_FIXES.tsv`

```text
chapters/<tên chương>.md<TAB>chuỗi_cũ<TAB>chuỗi_mới
```

Ranh giới giữa hai cột phải là **tab thật**, mỗi dòng một khai báo.

### Hình trích từ scan — `EXTRACTED_FIGURES.tsv`

Cùng định dạng, dành riêng cho việc thay một placeholder hình bằng khối hình + chú thích. Khối
hình gồm 3 dòng (ảnh, dòng trống, chú thích `*Hình N. …*`), nên **xuống dòng được mã hoá
bằng ký tự `\n`** trong cột giá trị.

### Quy trình khi gặp placeholder hình

1. **Tìm hình trong bản scan**, đừng tin số trang ghi trong placeholder.
2. **Trích ảnh** vào `assets/` với tên kebab-case dạng `<chương>-<nội dung>.png`.
3. **Chèn** vào thân chương: dòng ảnh `![mô tả](../assets/tên.png)`, dòng trống, rồi chú thích
   `*Hình N. …*`. Ảnh nằm ngoài callout.
4. **Khai** trong `EXTRACTED_FIGURES.tsv`.

### Đối chiếu ô `[OCR không rõ]`

Chỉ điền khi đã **đọc trực tiếp trên ảnh scan**. Lớp OCR của bản này rất nhiễu: chữ `ſ` (s
dài) thành `f` nên `fummere` là `sumere`, `ſt` thành `ft` nên `fperanda` là `speranda`, `q`
thành `g`, `v` thành `u`. Mỗi ô điền đều khai trong `AUTHORIZED_TEXT_FIXES.tsv`.
