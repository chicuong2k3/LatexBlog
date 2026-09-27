# Quy ước lớp chú giải hiện đại

Lớp chú giải này **không thuộc bản dịch**. Nó là lớp thích dành cho người đọc biết
về vật lý hiện đại, do người dịch biên tập, tách bạch khỏi văn bản Tesla.

Bản dịch của cuốn này **không** có lớp chú giải dày đặc như `Principia`. Xem mục 6.

## 1. Nguyên tắc bất di bất dịch

Bản dịch phải trung thành nguyên văn:

- **Không sửa, xóa, hay viết lại ý nghĩa** của bất cứ câu nào đang trong file.
  Không tóm tắt, không làm rõ, không thêm ví dụ, không thêm công thức.
- **Ngoại trừ lỗi chính tả được phép sửa.** Sai dấu, sai chính tả rõ ràng thì sửa
  thẳng. Mỗi lần sửa phải ghi vào `TRANSLATION_LEDGER.md` để truy vết.
- **Không tự sửa những chỗ nghi ngờ là lỗi OCR.** Ghi `[không rõ trong scan]`, và
  ghi vào ledger.
- Ngoài ra, chỉ được **CHÈN** callout mới.
- Callout phải nằm **sau** khi văn bản mà nó giải thích, và **trước** tiêu đề kế
  tiếp.
- Callout luôn bắt đầu bằng dòng trống `>` riêng, kết thúc bằng một dòng trống.
- Trong callout **không** nhúng hình (`![](...)`) và **không** dùng bảng Markdown.
  Nếu cần hình, mô tả bằng lời dẫn tới `assets/`.

### Xử lý lỗi OCR cụ thể cho cuốn này

Lớp OCR của ấn bản 1892 lỗi theo kiểu ligature, rất dễ nhận ra. Sửa thẳng khi cách
đọc đúng không thể ngờ ngợn:

| OCR đọc được | Phải là |
|---|---|
| `hnd`, `Hnd` | `find`, `Find` |
| `tlie`, `tliat`, `Uie` | `the`, `that`, `We` |
| `M Tins`, `M tis` | `This` |
| `expeiimenting`, `expeiiment` | `experimenting`, `experiment` |
| `c/ moderate`, `c/ the`, `form cf` | `of moderate`, `of the`, `form of` |
| `slen[s]` | `slender` |
| `Kosovopjolje` | `Kosovo Polje` |
| `Jkolds`, `ac:ually` | `holds`, `actually` |
| `Wliat`, `wliat`, `Wlien` | `What`, `When` |
| `l.acks` | `lacks` |
| `wre realize` | `we realize` |
| `CUBRENTS`, `ELEGTR1CAL` | `CURRENTS`, `ELECTRICAL` |
| `turb` | `tube` |
| `pro¬ duced`, `insulat¬ ing` | `produced`, `insulating` |
| `i3i`, `I 8`, `IDS 0` | nhiễu OCR, xem ảnh scan |
| `Fig. 83` | `Fig. 33` |
| `Fig. 12` ở PDF 118 | `Fig. 25` |

Dấu `¬`, `¬` và `\u00ad` trong bản DjVu là dấu ngắt từ, **không** phải ký tự.

Khi sửa xong mà vẫn không chắc, dùng `[không rõ trong scan]` và ghi ledger. **Không**
bịa một từ hợp lý chỉ vì nó nghe hợp lý.

## 2. Cách phục chú thích chân trang của Tesla

Tesla dùng chú thích chân trang rất nhiều, và chúng **thuộc về bản dịch** — phải dịch
đầy đủ, không được bỏ.

- Dùng cú pháp footnote Markdown với **nhãn mang số trang nguồn**: `[^p27n1]` là
  chú thích thứ nhất ở PDF trang 27. Quy ước này giữ được dấu vết về nguồn khi số
  chú thích bị dịch khác với bản in.
- **Được** bỏ số thứ tự trên bản in và thay bằng số thứ tự trong chương, miễn là nhãn
  vẫn truy được về trang nguồn.
- **Không được** bỏ, gộp, hay tóm tắt chú thích.
- Chú thích có tham chiếu tới một bài báo hay một bài nói chuyện trước đó của
  Tesla. Giữ nguyên tên và ngày, **không** dịch tên tạp chí thành tiếng Việt.
- Chú thích chỉ là chú thích: không bình luận thêm vào.

## 3. Cách phục hình

Bản in có 35 hình toàn trang. Đã trích vào `assets/` với tên
`fig-p<trang in>-<số phụ>.jpg`.

- Mỗi hình chèn bằng: `![Hình N. <chú thích>](../assets/fig-p0NN-00.jpg)`
- **Giữ nguyên số hiệu hình của bản in** (Fig. 1 ... Fig. 35), không đánh số lại.
- Chú thích dịch từ chữ in trên hình. Chữ in còn giữ nguyên trong ảnh.
- Đặt hình ở lần đầu tiên văn bản **nhắc tới** hình đó, không phải ở cuối chương.
- Trong callout chú giải thì **không** nhúng hình.

## 4. Bảng thuật ngữ

Bảng này là ràng buộc. Mười tám chương được dịch không cùng lúc, nên thuật ngữ phải
cố định để không lệch.

| Tiếng Anh | Tiếng Việt dùng thống nhất |
|---|---|
| alternate / alternating current | dòng xoay chiều |
| continuous current | dòng một chiều |
| high potential | **điện áp cao** |
| potential | **điện áp** |
| high frequency | tần số cao |
| frequency | tần số |
| induction coil | cuộn cảm |
| primary / secondary | vế sơ cấp / vế thứ cấp |
| condenser | tụ điện |
| jar (Leyden jar) | bình (bình Leyden) |
| discharger | bộ phóng điện |
| brush discharge | phóng điện chổi |
| streamer | dòng điện tới |
| terminal | cực |
| bulb, globe | bóng, bóng kính cầu |
| exhausted, exhaustion | hút chân không |
| vacuum (noun) | chân không |
| vacuum pump | bơp chân không |
| carbon | than |
| filament | sợi filament |
| refractory (adj.) | chịu lửa |
| bombard, bombardment | va chạm, sự va chạm |
| radiant matter | vật chất phát quang |
| phosphorescence | phát quang |
| molecule / atom | phân tử / nguyên tử |
| mean free path | đường đi trung bình |
| impedance | trở kháng |
| self-induction | tự cảm |
| capacity | điện dung |
| dielectric | điện môi |
| disruptive strength | độ bền phá vỡ |
| electrostatic | tĩnh điện |
| motor | động cơ |
| iron core | lõi sắt |
| earth, ground | mặt đất |
| Ruhmkorff coil | cuộn Ruhmkorff |
| Geissler tube | ống Geissler |
| Crookes, Tesla, Westinghouse, Edison, Ferraris, Gramme | giữ nguyên tên |

### Về "potential" → "điện áp"

Trong vật lý, `potential` và `voltage` là hai đại lượng khác nhau, và người dịc sẽ bị
phê phán nếu gộp. Nhưng Tesla dùng `potential` và `voltage` thay nhau như một suốt
bài: ông nói "a high potential" rồi ngay sau đó "the potential of the coil". Với mức
độ dùng đó, "điện áp" là cách dịch trung thành và tự nhiên nhất. Chỗ nào cần phân
biệt về mặt kỹ thuật thì dùng "điện thế" và giải thích trong callout — không dùng
hai từ lẫn lộn trong cùng một câu.

### Cách viết số và đơn vị

- Giữ nguyên đơn vị gốc của bản in, nhưng thêm đơn vị SI hiện đại trong ngoặc khi có
  ích: `7 metres (7 m)`. Bản in dùng centimet, mét, inch, pound, ounce.
- Dấu phẩy thập phân theo kiểu Việt Nam: `2{,}5\ \mathrm{cm}`.
- Số đo của bản in là số đo thực nghiệm, giữ nguyên, không quy đổi ước lượng.

## 5. Giọng văn

Đây là một bài nói chuyện, nên văn bản phải **đọc như người đang nói trước đám kỹ
sư**, không như giáo trình.

- Giữ ngôi thứ nhất. Tesla nói "I" rất nhiều; dịch thành "tôi", không thành "người
  dịch" hay "chúng ta".
- Câu trong bản in thường dài và có mệnh đề nối tiếp bằng "và", "nhưng", "bởi vì".
  Giữ nhịp đó. Đây là văn xuôi, không phải danh sách gạch đầu dòng.
- Tesla có xu hướng nói về thí nghiệm của ông như một sự kiện đang xảy ra trước mắt
  người nghe ("I have here two circles", "I attach now to each of the terminals").
  Giữ cảm giác đó, dịch ở thì hiện tại.
- **Không** thêm lời dẫn dắt kiểu "Điều này cho thấy rằng...", "Có thể thấy
  rằng...", "Như vậy, ta thấy...". Bản in có sẵn nhịp riêng của nó.
- **Không** bịa lời giải thích, lịch sử hay so sánh hiện đại trong phần bản dịch.

## 6. Mật độ chú giải cho riêng cuốn này

`Principia` có định nghĩa và định luật rõ ràng nên chú giải dày được. Tesla thì khác:
ông **không phát biểu định nghĩa nào cả**. Bài giảng là một chuỗi thí nghiệm liên
tục, nhiều lần nói "chúng ta hãy thử xem" rồi đưa ra kết quả.

Vì vậy chỉ chú giải ở những chỗ sau, và giữ mặt độ thấp:

1. Chỗ Tesla dùng một từ theo nghĩa **khác với nghĩa thường ngày**, và người đọc Việt
   sẽ dịch sai nếu không có chú thích. Ví dụ "radiant matter" (chỉ thứ chất phát
   quang), "allotropic", hay cách ông nói về "độ bền của không khí".
2. Chỗ Tesla đưa ra một kết luận **trái với trực giác thời đại ông**, và cái trái ấy
   chính là điều đáng nói. Ví dụ chỗ ông bàn về việc tần số cao làm mất hiệu quả
   của bơp chân không.
3. Chỗ Tesla nói về một thí nghiệm mà kết quả **không còn tái lập được** ngày nay, và
   người đọc cần biết điều đó. Ví dụ các thí nghiệm nung nóng tinh thể kim cương.
4. Chỗ Tesla nói về một quan niệm **đã lỗi thời** mà người đọc dễ nhầm là đúng, ví dụ
   các thí nghiệm phát sáng do va đập phân tử.

Tuyệt đối không chú giải:

- Từ ngữ kỹ thuật thông thường trong ngành điện 1890: `alternator`, `commutator`,
  `Ruhmkorff coil`, `Leyden jar`. Người đọc quan tâm đã biết.
- Mọi công thức. Tesla gần như không dùng ký hiệu trong bài này; đừng tự thêm.
- Lịch sử về Tesla, về Westinghouse, về cuộc tranh cãi với Edison.

Dự kiến: **0-1 callout mỗi chương**, chương 00 (tiểu sử) có thể nhiều hơn vì đó là
văn bản tự sự, không phải kỹ thuật.

## 7. Quy ước callout

Dùng đúng cú pháp của `Principia`:

````markdown
> **[Chú giải]**
>
> **Tiêu đề con nêu ra vấn đề cụ thể**
>
> Nội dung giải thích.
````

Tiêu đề con phải nêu vấn đề cụ thể, hoặc hỏi một câu hỏi ngắn gọn. Tránh các nhãn
chung chung như `**Khái niệm tương ứng.**` — ở cuốn này nhãn đó gần như luôn vô dụng
vì không có "khái niệm tương ứng" nào đáng nói.
