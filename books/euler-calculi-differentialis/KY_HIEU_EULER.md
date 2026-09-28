# Ký hiệu của Euler trong bản dịch

Bản dịch **giữ nguyên ký hiệu Euler in**. Bảng này tồn tại để người đọc tra nhanh, không để
dùng thay bản dịch. Những chỗ ghi *(chưa đối chiếu)* là chỗ còn phải xác minh trên ảnh scan
khi tới chương chứa nó.

Quy ước: $V$ là hàm vô hướng, $v$ là vi phân của nó — viết $dV$ cho rõ.

## 1. Vi phân, sai lệch hữu hạn, và đạo hàm

| Bản in | Nghĩa | Ký hiệu hiện đại |
|---|---|---|
| `dx` | vi phân của $x$ | $dx$ |
| `dy` | vi phân của $y$ | $dy$ |
| `dV` | vi phân của hàm $V(x,y)$ | $dV$ |
| `Δy`, `ΔΔy`, `Δ³y` | sai lệch hữu hạn bậc 1, 2, 3 của $y$ | $\Delta^n y$ |
| `ω` | bước nhảy, một số tùy ý | $h$ hoặc $\Delta x$ |
| `y^I` | giá trị của $y$ khi $x$ được thay bằng $x+\omega$ (bản in dùng số La Mã, không phải `y¹`) | $y(x+h)$ |
| `p^I = p + Δp` | cũng vậy, cho một functio bất kỳ | |
| `y'x` | đạo hàm của hàm $y$ tại $x$ | $\frac{dy}{dx}$ |
| `y''x` | đạo hàm cấp hai | $\frac{d^2y}{dx^2}$ |
| `d²y`, `d³y` | vi phân cấp hai, cấp ba **của hàm** | $y'\,d^2x$ |
| `ddx` | vi phân của chính $dx$ | không có hằng cố định |
| `d³x` | vi phân cấp ba của $x$ | không có hằng cố định |

### Bước nhảy ω là tự do

Euler nói thẳng ở trang in 6: trong lý thuyết chuỗi người ta lấy $\omega = 1$, "verum hic ad
nostrum institutum, valore generali uti, qui pro arbitrio augeri diminuique queat" — ở đây
dùng một giá trị tổng quát, có thể tùy ý tăng lên hay giảm xuống. Cần nhớ điều này khi đọc
mọi công thức trong Chương I.

### Chỉ số trên ký hiệu: đều là số La Mã

~~Ở sơ đồ trang in 7, chỉ số trên $\Delta y$ là số Ả Rập ($\Delta y^1$, $\Delta y^2$,
$\Delta y^3$); ở §4 Euler trộn $\Delta y^1$ với $\Delta y^{\mathrm{II}}$.~~ → sửa ngày
2026-09-28: đối chiếu lại scan Chương I cho thấy chỉ số trên của các giá trị
($y^{\mathrm{I}}$, $y^{\mathrm{II}}$, …, $\Delta y^{\mathrm{I}}$, $x^{\mathrm{I}}$) **đều là
số La Mã**, kể cả chỗ chữ `I` nhìn giống số `1`. Chỉ số dưới ($y_{\mathrm{I}}$,
$y_{\mathrm{II}}$, §25) cũng là La Mã. Riêng câu cuối §15 in $y, y', y'', y'''$ (dấu phẩy
trên), giữ như in.

Chỉ số `I` đánh dấu "ở điểm kế tiếp", không phải đạo hàm. Ở trang in 11 Euler viết
$y^{\mathrm{I}} = p^{\mathrm{I}}q^{\mathrm{I}}$ với $p^{\mathrm{I}} = p + \Delta p$,
$q^{\mathrm{I}} = q + \Delta q$, rồi suy ra
$\Delta y = p\Delta q + q\Delta p + \Delta p\,\Delta q$. Đây là sai lệch hữu hạn của tích
$p q$, được tính đúng như tích vi phân.

### Sai lệch bậc hai: `ΔΔy` không phải `Δ²y`

Euler viết `ΔΔy` cho sai lệch bậc hai rồi chuyển sang `Δ³y`, `Δ⁴y` cho các bậc cao hơn.
Bản dịch giữ đúng cách viết này.

### Lỗi của Euler đã phát hiện

Ở trang in 11, dòng tính sai lệch bậc ba của $y = aq$ khi $a$ là hằng, bản in viết
`Δ³q = aΔ³q`; vế trái phải là `Δ³y`. Giữ nguyên như in, xem `TRANSLATION_LEDGER.md`.

~~Euler đảo chiều tỷ lệ ở hai trang liền kề trong lời tựa: trang in VII viết `1 ad 2x+ω`,
trang in VIII viết `2x ad 1`. Cùng một quan hệ, viết ngược. Cũng giữ nguyên.~~ → sửa ngày
2026-09-28: **ở đây không có lỗi.** Trang in VII viết cả hai chiều: lượng tăng của $x$ so với
lượng tăng của $xx$ là `1 ad 2x+ω`, còn lượng tăng của $xx$ so với lượng tăng của $x$ là
`2x+ω ad 1`. Trang in VIII viết theo chiều thứ hai (`2x ad 1`). Bản in không mâu thuẫn.

Euler viết `ddx` và `d²x` cho cùng một thứ, ngay trong cùng một công thức (trang in 205:
`ddV = V ddx + P dx²`, rồi `d³V = V d³x + 3P dx ddx + Q dx³`).


**Điểm cốt lõi, và là chỗ dễ hiểu sai nhất:** `ddx` **không phải** là $d^2x/dx^2$. Trong
Euler, $dx$ là một biến độc lập, nên vi phân của nó là một vi phân mới. Công thức
$d^3V = V\,d^3x + 3P\,dx\,ddx + Q\,dx^3$ là tổng vi phân toàn phần viết bằng các vi phân
của $x$, khác với $V'''\,dx^3 + 3V''\,dx\,d^2x + V'\,d^3x$ của ngày nay. Xem callout ở
Chương VIII.

## 2. Hàm và hằng

| Bản in | Nghĩa |
|---|---|
| `x`, `y`, `z` | biến, lượng biến thiên |
| `V`, `W` | hàm số |
| `P`, `Q`, `R`, `S` | các hàm liên tiếp phụ thuộc $x$ (xem Chương IV, §212) |
| `A`, `B`, `C`, `D` | hằng số, hoặc hệ số của một phương trình |
| `p`, `q` | hằng số tùy ý trong một hàm cụ thể |

Ở Chương IV, Euler đặt trước
$$y = y + Pw + Qw^2 + Rw^3 + Sw^4 + \cdots$$
và nói rõ *"P, Q, R, &c. denotant functionis ipsius x pendentes ab y"* — nghĩa là chúng là các
hàm của $x$, phụ thuộc $y$. Đó chính là hệ số của $\tfrac{d^k y}{dx^k}$ trong khai triển
Taylor, dưới dạng mà Euler dùng trước khi có ký hiệu $\frac{d^k y}{dx^k}$.

## 3. Lượng lượng giác, log, lũy thừa

| Bản in | Nghĩa | Hiện đại | Trạng thái |
|---|---|---|---|
| `l` (chữ l) | logarithmus hyperbolicus, log cơ số $e$ | $\ln$ | đã đối chiếu |
| `l'x` | đạo hàm của hàm $l$ tại $x$ | $\frac1x$ | đã đối chiếu |
| `lp` | $\ln p$ | $\ln p$ | đã đối chiếu |
| `e` | số mà $\ln e = 1$ | $e$ | đã đối chiếu, tr. 163 |
| `p^q` | lũy thừa | $p^q$ | đã đối chiếu, tr. 161 |
| `fin.` | sin | $\sin$ | đã đối chiếu, tr. 184 |
| `cofin.` | cos | $\cos$ | đã đối chiếu, tr. 185 |
| `tang.` | tan | $\tan$ | *(chưa đối chiếu)* |
| `cotang.` | cot | $\cot$ | *(chưa đối chiếu)* |

Euler ghi chữ viết tắt có dấu chấm: `fin.`, `cofin.`, `tang.`, `cotang.`, `log.`. Chấm là một
phần của ký hiệu, không phải dấu câu — bản dịch giữ cả dấu chấm.

Về hệ log: Euler chỉ xây một log duy nhất, `l`, và mọi hệ log khác là một hằng số nhân vào
(tr. 152):

> *"Si enim functionis $p$ logarithmus hyperbolicus fuerit $lp$, turn eiusdem functionis $p$
> logarithmus ex alio canone desumtus erit $m\,lp$."*

Nghĩa là $\log_b p = m\ln p$ với $m = 1/\ln b$. Cách này tương đương với $\log_b p =
\frac{\ln p}{\ln b}$, nhưng Euler không viết mẫu số.

## 4. Chuỗi, tổng, chỉ số

| Bản in | Nghĩa |
|---|---|
| `S.` | tổng của một chuỗi, $\sum$ |
| `S.x` | tổng cộng dồn đến $x$ |
| `n` | chỉ số hạng, số nguyên |
| `terminus generalis` | công thức của hạng thứ $n$ |
| `differentiae similes` | sai lệch có cùng bậc |

Euler phân biệt `S.` (tổng của chuỗi, một đại lượng hữu hạn) với `S` dùng như một chữ
cái hệ số. Đọc kỹ ngữ cảnh.

## 5. Đánh số đoạn

Euler đánh số các đoạn của mình bằng ký hiệu `§` (bản in: `§.`), chạy liên tục qua cả hai
phần, không đánh số lại theo chương. Vì vậy trích dẫn trong sổ đối chiếu và trong callout
viết `§<số>`, không viết "trang 212".

Các điểm dùng làm mốc đã đối chiếu:

| Chương | § mở đầu |
|---|---|
| Pars Prior I | §1 |
| Pars Prior IV | §212 |
| Pars Prior VI | §175 |
| Pars Prior VII | §217 |
| Pars Prior VIII | §242 |
| Pars Posterior XVIII | §404 |

## 6. Cạm bẫy OCR trong bản scan này

Lớp OCR của archive.org hỏng nặng ở đúng những chỗ cần đọc ký hiệu. Những mẫu này lặp đi
lặp lại suốt sách:

| OCR đọc ra | Thực ra | Vì sao |
|---|---|---|
| `fummere` | `sumere` | chữ s dài `ſ` bị đọc thành `f` |
| `fperanda` | `speranda` | như trên |
| `ft` | `st` | `ſt` → `ft` |
| `fin.`, `finus` | `sin.`, `sinus` | như trên |
| `cof.` | `cos.` | như trên |
| `q` | `g` | nét móc bị đọc đội |
| `l` | `1`, `I` | thanh chân `l` mỏng |
| `Sec.` | `§.` | ký hiệu đoạn |
| `conuicient` | `convincunt` | `nc` → `ui` |

Vì vậy: **mọi công thức phải đối chiếu bằng mắt với ảnh scan**, không được tin lớp OCR. Chỗ
không đọc được thì ghi `[OCR không rõ]`, không đoán.
