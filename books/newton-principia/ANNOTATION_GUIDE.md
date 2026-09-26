# Quy ước lớp chú giải hiện đại

Lớp chú giải này **không thuộc bản dịch**. Nó là lớp chú thích dành cho người đọc biết vật lí
hiện đại, do người dịch/ biên tập viết thêm, nằm tách biệt khỏi văn bản Newton.

## 1. Nguyên tắc bất di bất dịch

Bản dịch phải trung thành nguyên văn. Vì vậy:

- **Không sửa, xóa, hay viết lại ý nghĩa** của bất kỳ câu nào đang có trong file.
  Không tóm tắt, không làm rõ, không sửa thuật ngữ, không bổ sung câu.
- **Ngoại lệ — lỗi chính tả được phép sửa.** Sai dấu, sai chính tả rõ ràng
  (ví dụ `chổm` → `chổi`) thì sửa thẳng, không cần hỏi. Mỗi lần sửa phải ghi
  vào `TRANSLATION_LEDGER.md` để truy vết. Đây là chỉ đạo của người dùng.
- **Không tự sửa những chỗ nghi ngờ là lỗi OCR.** Marker `[OCR không rõ]`,
  chỗ còn nghi vấn về công thức hay số liệu thì để nguyên và ghi vào ledger.
  Sửa lỗi rõ và sửa lỗi đoán là hai việc khác nhau.
- Ngoài ra, chỉ được **CHÈN** callout mới.
- Callout phải nằm **sau** khối văn bản mà nó giải thích, và **trước** tiêu đề kế tiếp.
- Callout luôn bắt đầu bằng dòng trống `>` riêng, kết thúc bằng một dòng trống.
- Nếu một định nghĩa nằm giữa chương, callout đi ngay sau đoạn cuối của định nghĩa đó,
  không chen vào giữa các đoạn của cùng một định nghĩa.
- Nếu phần văn bản tiếp theo là một `###`/`##` khác, chèn callout trước dòng tiêu đề đó.

## 2. Cú pháp callout

Callout là **blockquote Markdown** bắt đầu bằng marker cố định. Marker này là chuỗi
được grep: `**[Ghi chú hiện đại]**`.

````markdown
> **[Ghi chú hiện đại]**
>
> **Khái niệm tương ứng.** Khái niệm Newton định nghĩa tương ứng với khái niệm nào trong
> vật lí hiện nay, gọi tên tiếng Anh và tiếng Việt, và khác ở chỗ nào.
>
> **Công thức.** Công thức hiện đại, bằng LaTeX trong `$$...$$`.
>
> **Vì sao Newton viết như vậy.** Bối cảnh thế kỷ XVII giải thích cách diễn đạt của
> Newton, và điều đó dẫn tới hệ quả gì khi đọc bằng vật lí hiện đại.
````

Nhãn thứ tư và thứ năm là tùy chọn, chỉ dùng khi thật sự cần, và không thay
thế ba nhãn bắt buộc:

> **Hiện nay thì sao.** Kết luận của vật lí đương đại về khái niệm đó, kèm
> công thức hiện đại nếu có, và mức độ đúng/sai của Newton.

> **Lưu ý nguồn gốc.** Ghi rõ điều gì Newton **không** có, hoặc mắc lỗi/đơn giản
> hóa gì so với cách hiểu hiện đại (ví dụ: Newton dùng "trọng lực tương đối" như
> một vật thể, dù ông không đề cập tới trường hấp dẫn).

Không được tự đặt nhãn nào khác ngoài năm nhãn trên.

### Quy tắc công thức

- Công thức viết **một dòng**: `$$m = \rho V$$`. Đây là dạng an toàn nhất trong blockquote.
- Công thức nhiều dòng dùng `aligned`, **mỗi dòng có tiền tố `>`**:

  ````
  > $$
  > \begin{aligned}
  > F &= ma \\
  > W &= mg
  > \end{aligned}
  > $$
  ````

- Chỉ dùng lệnh KaTeX an toàn: `\frac`, `\sqrt`, `\sum`, `\int`, `\begin{aligned}`,
  `\begin{cases}`, `\vec`, `\hat`, `\mathrm`, `\text`, `\cdot`, `\times`, `\approx`,
  `\propto`, `\partial`. **Không** dùng môi trường `\begin{align}`, `\label`, `\eqref`,
  `\newcommand`, `\begin{figure}`.
- Trong callout **không** nhúng hình (`![](...)`) và **không** nhúng bảng Markdown.
  Nếu cần hình, mô tả bằng lời và dẫn tới `assets/` hiện có.

## 3. Chọn khái niệm nào để chú giải

Bắt buộc có callout:

1. Mỗi **Định nghĩa** (Definition).
2. Mỗi **Định luật** (Law).
3. Mỗi **Quy tắc suy luận** (Rule of Reasoning).
4. Mỗi định nghĩa đưa ra giữa văn bản cho một thuật ngữ kỹ thuật.
5. Thuật ngữ kỹ thuật mà Newton **đặt ra hoặc định nghĩa lại**, ở lần xuất hiện đầu tiên
   trong chương: *vis insita*, *vis inertiae*, *centripetency*, *plenum*, *uniform
   plenum*, *quantity of motion*, *absolute/accelerating/motive quantity*, *relative
   gravity*, *compression*, *oscillation*, *swing*, *resistance*, *centrifugal*,
   *apsis*, *node*, *eccentricity*, *true/mean anomaly*, *nutation*, *sidereal*,
   *synodic*...
6. Định lý trụ cột mà ngày nay mang tên một định luật hoặc định luật nổi tiếng — ví dụ
   định lý điểm tâm đẳng thức, luật bảo toàn moment diện tích, định lý lực hướng tâm,
   luật hấp dẫn phổ quát, định lý tốc độ truyền âm thanh.

Không cần callout:

- Định lý/bổ đề thường lệ, kết quả trung gian, bài toán hình học thuần tuý.
- Bảng số liệu thiên văn, danh sách sao chổi, phép hiệu chỉnh thủy triều.
- Lặp lại khái niệm đã được chú giải ở chương trước — trừ khi nó quay lại với nghĩa khác.

## 4. Mật độ

Mỗi callout **80–450 từ**, tính theo bộ đếm của `tools/check_book_callouts.py` (đã loại trừ phần công thức LaTeX). Mỗi chương:

| Chương | Số callout |
|---|---|
| `00`, `69` — lời dẫn nhập, mục lục | 0–2 |
| `01` | 8 |
| `03`–`07` | 1 |
| `65`, `66`, `67` — thiên văn công thức dày | 2–4 |
| `68-he-thong-thoi-gioi.md` — rất dài | 4–8 |
| Còn lại: định nghĩa / định luật / hệ quả / học luận | 2–6 |

Nếu chương có **nhiều hơn** ngưỡng trên, hãy chọn những khái niệm quan trọng nhất. Chặt,
tốt hơn là dàn đều và nông.

## 5. Chất lượng nội dung

Mỗi callout phải trả lời được ba câu hỏi, và phải trả lời ** riêng biệt**:

- **Khái niệm tương ứng là gì?** Tên tiếng Anh, tên tiếng Việt, định nghĩa ngắn. Chỉ ra
  chỗ nào khác với cách Newton dùng từ đó.
- **Công thức là gì?** Công thức hiện đại, dùng ký hiệu chuẩn SI. Kèm số thức khi
  cần để chỉ tỉ lệ (ví dụ $W = mg$, $g \approx 9{,}81\ \mathrm{m/s^2}$ ở Trái Đất,
  $g_{\text{Trăng}} \approx 1{,}62\ \mathrm{m/s^2}$).
- **Vì sao Newton hiểu như vậy?** Bối cảnh triết học/khoa học thế kỷ XVII giải thích cách
  ông định nghĩa. Chỉ ra mâu thuẫn logic **thật sự**, và chỉ sau khi đã kiểm tra phép đo
  thời đó. Định nghĩa I trông như vòng tròn nếu áp $\rho = m/V$, nhưng mật độ thời
  Newton được đo bằng *specific gravity* — tỉ số với một vật liệu tham chiếu — nên nó
  không lặp vòng. Một mâu thuẫn chỉ được ghi vào callout khi nó còn đứng vững sau bước
  kiểm tra đó.

### Ba lớp phải tách bạch

Dễ nhất là vô tình gán khái niệm thế kỷ XIX–XX ngược trở lại cho Newton. Vì vậy mỗi
callout phải giữ ba lớp này ở ba chỗ khác nhau, không trộn:

1. **Newton thực sự nói gì** — ở nhãn *Vì sao Newton viết như vậy*. Chỉ nêu bối cảnh
   triết học/khoa học thế kỷ XVII và lý do ông dựng khái niệm đó. **Không** phê bình
   văn bản nguồn như một văn bản — xem mục 5bis.
2. **Ký hiệu hiện đại tương ứng là gì** — ở nhãn *Công thức*.
3. **Vật lí đương đại nhìn nhận nó thế nào** — ở nhãn *Hiện nay thì sao*, kèm mức độ
   đúng/sai của Newton.

Cùng một nguyên tắc này cũng quyết định lúc nào được dùng nhãn *Lưu ý nguồn gốc*:
chỉ dùng để nêu thứ Newton thật sự **không** có. Đừng dùng nó để kể những gì đã có
sẵn trong khoa học thời đó — các ý tưởng nguyên tử và lý thuyết corpuscular đã phổ biến
từ lâu trước 1687, nên "thời đó chưa có nguyên tử" là sai. Trường theo nghĩa Maxwell
thì mới thật sự chưa có.

### 5bis. Ranh giới giữa sửa dịch và ghi chú

Callout chỉ làm hai việc: **giải nghĩa** và **so sánh với vật lí hiện tại**. Ngoài ra
không được làm gì cả. Cụ thể:

- **Không phê bình văn bản nguồn.** Cấm bàn về cú pháp Latin, về elíp, về biến thể giữa
  các ấn phẩm, về việc một vế có "mang theo" điều kiện của vế trước hay không. Đó là
  việc của tầng bản dịch. Muốn giải thích nghĩa của một cấu trúc câu thì giải thích
  **ý nghĩa** của nó, không giải thích cấu trúc.
- **Không bàn về bản dịch tiếng Việt.** Cấm giải thích, bào chữa hoặc xin lỗi vì một
  cách dùng từ của người dịch ("vì sao bản dịch dùng chữ 'cũng'", "không nên vá nó bằng
  cách đọc bản dịch cho qua"). Chọn từ đúng là việc của bản dịch.
- **Không để lại một cách hiểu sai rồi ghi chú lại thay vì sửa.** Nếu bản dịch sai,
  sửa bản dịch. Nếu bản dịch đúng mà câu chữ gốc dễ gây hiểu nhầm, đó cũng là việc
  của người dịch xử lý bằng cách diễn đạt lại cho đúng — không phải viết callout để
  cảnh báo người đọc.
- Mọi sửa đổi văn bản dịch đều phải khai trong `AUTHORIZED_TEXT_FIXES.tsv` theo mục 7.

Nói cách khác: callout đừng bao giờ là nơi chứa lời xin lỗi về bản dịch. Đọc xong
callout, người đọc phải hiểu rõ hơn về **vật lí**, không phải hiểu rõ hơn về **bản dịch**.

Dùng số liệu thật, đơn vị SI, năm đo có ghi. **Không bịa** số liệu, hằng số, tên người
hay năm. Khi không chắc về một đẳng thức, bỏ dòng công thức đó thay vì đoán.

## 6. Cấm tuyệt đối

Văn phong callout phải là của người viết có chuyên môn, không phải của chatbot. Cấm:

- Mở đầu kiểu "Trong vật lí hiện đại...", "Hãy tưởng tượng...", "Điều thú vị là...".
- Vế so sánh rỗng kiểu "không chỉ X mà còn Y", "không đơn giản chỉ là X".
- Câu kết lời động viên kiểu "Đó là lý do...", "Và đó chính là điều làm nên vĩ mô".
- Câu một vế kết luận chung chung không mang thông tin mới.
- Liệt kê danh sách dài không dẫn tới ví dụ cụ thể.
- Cụm từ "một cách đẹp đẽ", "thật thú vị", "cực kỳ quan trọng", "điều này thay đổi tất cả".
- Văn bản tiếng Anh đọc được lẫn vào phần tiếng Việt (trừ thuật ngữ chuyên ngành).

Nếu không viết được câu nào thêm nghĩa thì **bỏ câu đó**, đừng để dạng đệm.


## 7. Hình minh họa và hai manifest khai báo

Cổng kiểm tra `--fidelity` so phần **không phải callout** của mỗi chương với `git HEAD`.
Mọi thay đổi trong văn bản dịch vì vậy phải được khai, nếu không sẽ bị báo là sai lệch.

### Sửa văn bản dịch — `AUTHORIZED_TEXT_FIXES.tsv`

Dùng cho lỗi chính tả và cho ô `[OCR không rõ]` đã đối chiếu được với ảnh scan:

```text
chapters/<tên chương>.md<TAB>chuỗi_cũ<TAB>chuỗi_mới
```

Ranh giới giữa hai cột phải là **tab thật**, mỗi dòng một khai báo.

### Hình trích từ scan — `EXTRACTED_FIGURES.tsv`

Cùng định dạng, nhưng dành riêng cho việc thay một placeholder hình bằng khối
hình + chú thích. Khối hình gồm 3 dòng (ảnh, dòng trống, chú thích `*Hình N. …*`),
nên **xuống dòng được mã hoá bằng ký tự `\n`** trong cột giá trị:

```text
chapters/68-he-thong-thoi-gioi.md<TAB><!-- Hình … --><TAB>![…](../assets/x.png)\n\n*Hình 1. …*
```

### Quy trình khi gặp placeholder hình

1. **Tìm hình trong bản scan**, đừng tin số trang ghi trong placeholder. Số trang trong
   comment từng sai; phải định vị lại bằng nội dung, ví dụ tìm trang chứa nhãn
   `$ABCD$` trong lớp text rồi xem hình nằm ở đầu hay cuối trang đó.
2. **Trích ảnh** vào `assets/` với tên kebab-case dạng `<chương>-<nội dung>.png`.
3. **Chèn** vào thân chương theo dạng: dòng ảnh `![mô tả](../assets/tên.png)`, dòng
   trống, rồi chú thích `*Hình N. …*`. Ảnh nằm ngoài callout.
4. **Khai** trong `EXTRACTED_FIGURES.tsv`.
5. Nếu đã xác nhận bản gốc **không có hình** ở vị trí đó, thay placeholder bằng ghi
   chú nói rõ đã đối chiếu và không tìm thấy hình, thay vì giữ chỗ trống.

### Đối chiếu ô `[OCR không rõ]`

Chỉ điền khi đã **đọc được trực tiếp trên ảnh scan**. Lớp OCR của bản 1846 rất nhiễu
(`Stitrnnj` là `Sturmy`, `71 J` là $71\frac{2}{3}$), nên phải soi ảnh chứ không tin
lớp text. Mỗi ô điền đều khai trong `AUTHORIZED_TEXT_FIXES.tsv`.