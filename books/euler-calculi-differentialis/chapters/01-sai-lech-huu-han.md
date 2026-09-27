---
title: "Chương I: Về sai lệch hữu hạn"
summary: "Mở đầu Pars Prior: khi lượng biến thiên x nhận lượng tăng ω, mọi functio của x đều biến đổi theo; từ đó dựng chuỗi các giá trị y, yᴵ, yᴵᴵ, … rồi định nghĩa sai lệch bậc một, hai, ba bằng hiệu của các giá trị liên tiếp."
tags: [dich-sach, toan, giai-tich]
slug: "sai-lech-huu-han"
number: 1
status: chua-hoan-thanh
---

<!-- Nguồn: PDF 31-35, tức trang in 3-7. Đã đọc trực tiếp ảnh scan ở PDF 31, 33, 35;
     phần văn xuôi ở PDF 32 và 34 lấy từ lớp OCR, xem TRANSLATION_LEDGER.md.
     Bản dịch đang được soạn; các đoạn chưa dịch được đánh dấu ở cuối từng trang. -->

# Caput I

## De Differentiis finitis

![Vignette mở đầu Chương I: vòng cột La Tinh đã đổ nát ở bên trái, trên bàn đá có bóng đổ, quả địa cầu và dụng cụ đo, phía sau là những tường đá vỡ và một cái cây.](../assets/cap01-vignette.png)

*Hình 1. Vignette khắc đồng trang mở đầu Chương I.*

<!-- PDF 31, trang in 3 -->

**1.** Những điều đã được trình bày trong Quyển trên về lượng biến thiên và functio thì hiển
nhiên, rằng tùy theo lượng biến thiên ấy thay đổi thế nào, mọi functio của nó cũng biến đổi
theo. Vậy nếu lượng biến thiên $x$ nhận lượng tăng $\omega$, sao cho ở chỗ của $x$ ta viết
$x + \omega$, thì mọi functio của $x$ — như $xx$, $x^3$, $\dfrac{a+x}{xx+aa}$ — đều nhận
những giá trị mới; cụ thể là $xx$ sẽ trở thành

$$
xx + 2x\omega + \omega\omega;
$$

$x^3$ sẽ trở thành

$$
x^3 + 3x^2\omega + 3x\omega\omega + \omega^3;
$$

$x^4$ sẽ trở thành

$$
x^4 + 4x^3\omega + 6x^2\omega\omega + 4x\omega^3 + \omega^4.
$$

Thế nên sự thay đổi như vậy luôn xảy ra, trừ khi functio chỉ có hình dạng của lượng biến thiên
mà không mang dấu hiệu của nó, tức là nó thật sự là một lượng constans, như $x^0$; trong
trường hợp đó một functio như vậy không đổi, dù $x$ tăng lên bao nhiêu.

**2.** Những điều vừa trình bày còn quá xa so với các hệ thống của functio mà toàn bộ Analysin
Infinitorum dựng trên đó. Vậy nếu $y$ là một functio bất kỳ của lượng biến thiên $x$, và ta
thay những giá trị liên tiếp trong cấp số cộng trước đó, nghĩa là lấy $x$, $x+\omega$,
$x+2\omega$, $x+3\omega$, $x+4\omega$, &c., thì functio $y$ sẽ cho ra những giá trị liên
tiếp tương ứng; cụ thể nếu ở chỗ của $x$ ta viết $x+\omega$, functio $y$ sẽ nhận giá trị
$y^1$; theo cùng cách ấy nếu ở chỗ của $x$ ta viết $x+2\omega$, nó sẽ nhận giá trị $y^2$;
và cứ thế, những giá trị $y$, $y^1$, $y^2$, $y^3$, &c., sinh ra khi lần lượt đặt
$x+\omega$, $x+2\omega$, $x+3\omega$, $x+4\omega$, &c., sẽ ứng với nhau theo kiểu này:

$$
\begin{array}{cccccc}
x & x+\omega & x+2\omega & x+3\omega & x+4\omega & \text{\&c.}\\
y & y^1 & y^2 & y^3 & y^4 & \text{\&c.}
\end{array}
$$

**3.** Cũng như cấp số cộng $x$, $x+\omega$, $x+2\omega$, &c. có thể kéo dài vô hạn, thì
chuỗi $y$, $y^1$, $y^2$, &c. sinh ra từ functio $y$ cũng tiến tới vô hạn, và bản chất của nó
phụ thuộc vào cái dạng của functio $y$. Vậy nếu chuỗi $y$, $y^1$, $y^2$, &c. sinh ra từ
$y = x$ hay từ $y = ax+b$ thì nó cũng là cấp số cộng; nếu sinh ra từ $y = \dfrac{a}{bx+c}$
thì chuỗi đó là điều hòa; còn nếu $y = a^x$ thì ta có một chuỗi nhân. Và không thể nghĩ ra
được một chuỗi nào mà không thể sinh ra theo cách ấy từ một functio xác định nào đó của
$x$. Thường thì một functio của $x$ như vậy, xét theo chuỗi sinh ra từ nó, được gọi là
*terminus generalis* của chuỗi; và vì mọi chuỗi lập theo một quy luật xác định đều có
*terminus generalis*, nên nó ngược lại sinh ra từ một functio xác định nào đó của $x$, như
đã được giải thích dài hơn trong lý thuyết chuỗi.

<!-- PDF 33, trang in 5 (tiếp) -->

**4.** Ở đây đáng chú ý nhất là những sai lệch qua đó các hạng của chuỗi $y$, $y^1$, $y^2$,
$y^3$, &c. khác nhau, và ta sẽ chú ý tới chúng. Để phục vụ cho bản chất của các vi phân, ta
biểu thị chúng bằng những dấu hiệu sau đây, sao cho

$$
y^1 - y = \Delta y; \quad y^2 - y^1 = \Delta y^1; \quad y^3 - y^2 = \Delta y^2; \quad \text{\&c.}
$$

Vậy $\Delta y$ biểu thị lượng tăng mà functio $y$ nhận lấy khi ở chỗ của $x$ ta đặt
$x+\omega$, với $\omega$ là một số bất kỳ tùy ý chọn. Trong lý thuyết chuỗi thường lấy
$\omega = 1$; nhưng ở đây, với mục đích của chúng ta, thì tiện hơn là dùng một giá trị
tổng quát, giá trị có thể tùy ý tăng lên hay giảm xuống. Lượng tăng $\Delta y$ này cũng
thường được gọi là *differentia* của functio $y$: giá trị kế tiếp $y^1$ vượt quá $y$ bao
nhiêu, và luôn được coi là một lượng tăng — dù nó thường xuyên thật ra là một lượng giảm,
điều mà ta nhận ra được từ giá trị âm của nó.

> **[Chú giải]**
>
> **Bước nhảy $\omega$ là tự do, không phải bằng 1**
>
> Khác với phần lớn sách giáo trình, Euler không cố định bước nhảy của cấp số cộng. Ông nói
> thẳng: trong lý thuyết chuỗi người ta lấy $\omega = 1$, còn ở đây ta dùng một giá trị tổng
> quát, có thể tùy ý tăng hay giảm.
>
> Lý do là ngay trong chương này, ở §8: với $y = x^2$ thì sai lệch bậc nhất là
> $\Delta y = 2x\omega + \omega^2$, sai lệch bậc hai là $\Delta\Delta y = 2\omega^2$. Nếu cố
> định $\omega = 1$ thì ngay từ đầu đã mất một thứ mà bài toán còn đang cần.
>
> Ngày nay đây là điều hiển nhiên với sai lệch hữu hạn. Nhưng nó còn là một lựa chọn có
> chủ đích: khi cho phép $\omega$ tùy ý, Euler đang giữ nguyên một đại lượng độc lập với
> $x$, và nhờ đó phép lấy sai lệch trở thành một phép *nhân* với hằng số $\omega$ thay vì
> một phép trừ đơn giản. Cùng cách đó, ở Chương VIII, ông còn để $\omega$ trở thành một
> biến độc lập và lấy vi phân của nó.
>
> $$
> \Delta x = \omega, \qquad \Delta\omega = 0
> $$
>
> Bước nhảy bằng 1 chỉ là trường hợp riêng của cái ấy.

<!-- PDF 34, trang in 6 -->

**5.** Vì $\Delta y$ sinh ra từ $y$, nếu ở chỗ của $x$ ta viết $x+2\omega$ thì rõ ràng
cũng chỉ là $y$ sinh ra; nhưng nếu trước hết ở chỗ của $x$ ta đặt $x+\omega$, rồi lại đặt
$x+\omega$ ở chỗ của $x$ lần nữa, thì $\Delta y$ sẽ sinh ra từ $\Delta y^1$: bởi nếu ở
chỗ của $x$ trong biểu thức ấy ta viết $x+\omega$ thì ta được đúng lượng tăng mà $y^2$ nhận
lấy khi $x+\omega$ được thay bằng $x+2\omega$, và nó được gọi cùng cách gọi như *differentia*
của $y^1$. Theo cùng lý do ấy, $\Delta y^2$ là *differentia* của $y^2$, tức là lượng tăng mà
nó nhận lấy khi ở chỗ của $x$ ta đặt $x+\omega$; và $\Delta y^3$ là *differentia* của
$y^3$, v.v. Như vậy, từ chuỗi những giá trị của nó là $y$, $y^1$, $y^2$, $y^3$, &c., ta có
được chuỗi những sai lệch $\Delta y$, $\Delta y^1$, $\Delta y^2$, &c. — chúng được tìm ra
bằng cách lấy mỗi hạng của chuỗi kia trừ đi hạng đứng ngay trước nó.

**6.** Đã tìm ra chuỗi các sai lệch, nếu ta lại lấy sai lệch của chính những sai lệch ấy, mỗi
sai lệch trừ đi cái đứng sau nó, thì sẽ có những sai lệch của các sai lệch, được gọi là
*differentiae secundae*, và thuận tiện nhất là biểu thị chúng bằng các ký tự sao cho:

$$
\begin{array}{rclcrcl}
\Delta\Delta y &=& \Delta y^1 - \Delta y, &\qquad& \Delta\Delta y^1 &=& \Delta y^2 - \Delta y^1,\\
\Delta\Delta y^2 &=& \Delta y^3 - \Delta y^2, && \Delta\Delta y^3 &=& \Delta y^4 - \Delta y^3,\\
&&\text{\&c.}
\end{array}
$$

Vậy $\Delta\Delta y$ là differentia secunda của $y$; $\Delta\Delta y^1$ là differentia secunda
của $y^1$; và cứ thế. Cũng theo cách ấy, nếu từ các differentia secunda lại lấy sai lệch,
thì sẽ có differentiae tertiae, viết

$$
\Delta^3 y = \Delta^3 y^1 = \text{\&c.}
$$

hàm ý là $\Delta^3 y = \Delta\Delta y^1 - \Delta\Delta y$. Từ đó, các differentiae quartae
là $\Delta^4 y$, $\Delta^4 y^1$, &c., và cứ tiến mãi cho tới bao giờ.

<!-- PDF 35, trang in 7 -->

**7.** Hãy biểu thị riêng từng chuỗi các sai lệch này theo cách sơ đồ mà trong đó mối liên
hệ giữa chúng dễ dàng lọt vào mắt hơn:

| | | | | | | |
|---|---|---|---|---|---|---|
| *Progressio arithmetica* | | | | | | |
| $x$ | $x+\omega$ | $x+2\omega$ | $x+3\omega$ | $x+4\omega$ | $x+5\omega$ | &c. |
| *Valores functionis* | | | | | | |
| $y$ | $y^{\mathrm{I}}$ | $y^{\mathrm{II}}$ | $y^{\mathrm{III}}$ | $y^{\mathrm{IV}}$ | $y^{\mathrm{V}}$ | &c. |
| *Differentiae primae* | | | | | | |
| $\Delta y$ | $\Delta y^1$ | $\Delta y^2$ | $\Delta y^3$ | $\Delta y^4$ | $\Delta y^5$ | &c. |
| *Differentiae secundae* | | | | | | |
| $\Delta\Delta y$ | $\Delta\Delta y^1$ | $\Delta\Delta y^2$ | $\Delta\Delta y^3$ | $\Delta\Delta y^4$ | $\Delta\Delta y^5$ | &c. |
| *Differentiae tertiae* | | | | | | |
| $\Delta^3 y$ | $\Delta^3 y^1$ | $\Delta^3 y^2$ | $\Delta^3 y^3$ | | | &c. |
| *Differentiae quartae* | | | | | | |
| $\Delta^4 y$ | $\Delta^4 y^1$ | $\Delta^4 y^2$ | | | | &c. |
| *Differentiae quintae* | | | | | | |
| $\Delta^5 y$ | $\Delta^5 y^1$ | | | | | &c. |
| &c. | | | | | | |

Trong đó mỗi hạng nào cũng sinh ra từ hạng trước nó, bằng cách lấy hạng kia trừ đi cái đứng
sau nó. Vậy nếu ta thay $y$ ở chỗ của nó bằng một functio bất kỳ nào của $x$, thì các giá
trị $y$, $y^1$, $y^2$, $y^3$, &c. sẽ dễ dàng tạo thành qua những phép cộng, và từ đó, với
một ít công sức, sẽ tìm ra những chuỗi sai lệch.

> **[Chú giải]**
>
> **Bảng này là cả phép tính, không chỉ là hình vẽ**
>
> Sơ đồ trên đưa ra tên gọi và ký hiệu, nhưng nó nói thêm một điều: mỗi hàng là kết quả của
> hàng ngay trên nó. Hàng giá trị lấy từ hàng cấp số cộng bằng cách thay $x$ vào functio;
> hàng sai lệch bậc nhất lấy từ hàng giá trị bằng phép trừ; hàng sai lệch bậc hai lấy từ
> hàng sai lệch bậc nhất, cứ thế.
>
> Đây là cách tính bằng thực hành mà thành phép tính giải tích: bắt đầu từ cấp số cộng, rồi
> liên tiếp trừ đi. Trong cách viết ngày nay, điều tương đương là lấy đạo hàm rồi tích phân,
> hoặc dùng một đa thức Taylor — cả hai đều là trường hợp riêng của bảng trên khi
> $\Delta y \approx \omega\,\frac{dy}{dx}$.
>
> Một chi tiết cần để mắt: chỉ số trên $y$ ở đây là số La Mã ($y^{\mathrm{I}}$,
> $y^{\mathrm{II}}$), còn chỉ số trên $\Delta y$ là số Ả Rập ($\Delta y^1$, $\Delta y^2$).
> Ở §4 ngay trên, Euler lại viết $\Delta y^1$ rồi $\Delta y^{\mathrm{II}}$, tức trộn lẫn hai
> kiểu trong cùng một công thức. Bản dịch giữ nguyên từng chỗ.
>
> Về $\Delta^3 y$ ở §6: bản in viết `Δ³y = Δ³y¹ = Δ³y² =` &c., mà lẽ ra phải là
> $\Delta^3 y = \Delta\Delta y^1 - \Delta\Delta y$. Giữ nguyên như in.

<!-- Chưa dịch: PDF 36-62, tức trang in 8-34, gồm §8-§34 và các EXEMPLUM I-IV. -->
