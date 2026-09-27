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

<!-- PDF 36, trang in 8 -->

**8.** Hãy đặt $y = x$; khi ấy $y^1 = x^1 = x + \omega$, $y^2 = x^2 = x + 2\omega$, và cứ thế.
Khi lấy sai lệch, ta sẽ có $\Delta x = \omega$, $\Delta x^1 = \omega$, $\Delta x^2 = \omega$, &c.
Do đó mọi differentia bậc nhất của $x$ đều là hằng, và hệ quả là mọi differentia bậc hai đều
tan biến; cũng như vậy, mọi differentia bậc ba và của các bậc cao hơn. Vậy, vì
$\Delta x = \omega$, nên theo cách tương tự, thay cho chữ $\omega$, ký tự $\Delta x$ được
dùng một cách tiện lợi. Do đó, với lượng biến thiên $x$ mà các giá trị liên tiếp $x$,
$x^1$, $x^2$, $x^3$, &c. được giả thiết lập thành một cấp số cộng, các differentia
$\Delta x$, $\Delta x^1$, $\Delta x^2$, &c. sẽ là hằng và bằng nhau; và hệ quả là

$$
\Delta\Delta x = 0, \qquad \Delta^3 x = 0, \qquad \Delta^4 x = 0,
$$

và cứ thế.

**9.** Với các giá trị của chính $x$, lần lượt được ban cho, ta ở đây giả thiết một cấp số
cộng, sao cho differentia bậc nhất của chúng là hằng, còn differentia bậc hai và tất cả
những bậc còn lại đều tan biến. Điều này còn tuỳ thuộc vào ý chúng ta, vì lẽ ra ta có thể
dùng bất kỳ cấp số nào khác; dù vậy, cấp số cộng được dùng thuận lợi hơn tất cả những
cái khác, vì nó vừa đơn giản nhất và dễ hiểu nhất, vừa — điều này mới là tối đa — vì nó
mở ra được mọi giá trị mà $x$ nói chung có thể nhận. Quả thật, khi ban cho $\omega$ cả những
giá trị âm lẫn dương, thì trong chuỗi giá trị của $x$ này chứa đựng mọi lượng thực có thể
đứng ở chỗ của $x$; trái lại, nếu ta chọn một chuỗi nhân, thì sẽ không có lối nào tới các giá
trị âm. Vì lý do đó, tính biến thiên của các functio $y$ được phán đoán chính xác nhất khi
chúng được thiết lập từ các giá trị của $x$ theo cấp số cộng.

> **[Chú giải]**
>
> **"Chứa đựng mọi lượng thực" — câu này chỉ đúng nếu ω hiểu được là biến**
>
> Euler lập luận: cấp số cộng với $\omega$ thì nhận cả giá trị âm lẽ cả dương, nên nó chạm
> tới được mọi lượng thực, còn chuỗi nhân thì không. Lập luận ấy là lý do ông chọn cấp số
> cộng làm bước nhảy.
>
> Nhưng nếu $\omega$ là một số cố định thì các giá trị $x + n\omega$ với $n$ nguyên tạo thành
> một dãy rời rạc, không phải mọi số thực. Điều đó không thành vấn đề, vì Euler không bao giờ
> định $\omega$; ông nói ở §4 là $\omega$ "pro arbitrio augeri diminuique queat" — tùy ý tăng
> hay giảm. Chỉ khi đọc $\omega$ là một lượng biến thiên liên tục thì câu ấy mới thành lời.
>
> Điều cần chú ý về sau: chính vì $\omega$ phải tùy ý đi tới vô cùng nhỏ, thế giới hữu hạn ở
> đây mới không bị khóa cứng. Cấp số cộng với một bước cố định sẽ không đủ cho việc đó.

**10.** Vì $\Delta y = y^1 - y$, nên những sai lệch cao hơn cũng có thể được định nghĩa từ
các hạng đầu tiên của chuỗi $y$, $y^1$, $y^2$, $y^3$, &c. Vì $\Delta y^1 = y^2 - y^1$, ta có

$$
\Delta\Delta y = y^2 - 2y^1 + y
$$

và

$$
\Delta\Delta y^1 = y^3 - 2y^2 + y^1,
$$

nên

$$
\Delta^3 y = \Delta\Delta y^1 - \Delta\Delta y = y^3 - 3y^2 + 3y^1 - y.
$$

Cũng theo cách ấy,

$$
\Delta^4 y = y^4 - 4y^3 + 6y^2 - 4y^1 + y
$$

và

$$
\Delta^5 y = y^5 - 5y^4 + 10y^3 - 10y^2 + 5y^1 - y,
$$

trong những công thức ấy các hệ số thuần số tuân theo cùng một quy luật, quy luật quan
sát được trong các lũy thừa của Nhị thức. Như vậy, cũng như differentia bậc nhất được xác
định từ hai hạng ($y$, $y^1$, $y^2$, $y^3$, &c.), differentia bậc hai được xác định từ ba
hạng, bậc ba từ bốn hạng, và cứ thế. Và khi đã biết các differentia của mọi bậc của $y$ thì
theo cùng cách ấy, các differentia của mọi bậc của $y^1$, $y^2$, &c. cũng được xác định.

<!-- PDF 38, trang in 10 -->

**11.** Vậy, khi một functio $y$ bất kỳ được đưa ra, thì từng differentia của nó — cả bậc
nhất lẫn những bậc sau, ít nhất là những cái ứng với bước nhảy $\omega$ mà các giá trị của
$x$ tiến theo — đều có thể được tìm ra. Và việc này không đòi hỏi phải kéo dài chuỗi giá
trị của $y$ đi xa hơn nữa. Quả thật, differentia bậc nhất $\Delta y$ được tìm ra bằng cách
viết $x + \omega$ ở chỗ của $x$ trong $y$, rồi lấy functio $y$ trừ đi cái giá trị $y^1$ sinh
ra; và cũng theo cách ấy, differentia bậc hai $\Delta\Delta y$ được tìm ra nếu trong
differentia bậc nhất $\Delta y$ ta đặt $x + \omega$ ở chỗ của $x$, để sinh ra $\Delta y^1$,
rồi lấy $\Delta y^1$ trừ $\Delta y$. Cũng theo cách ấy, nếu lấy sai lệch của differentia
bậc hai $\Delta\Delta y$, rồi lấy nó trừ đi cái giá trị mà nó sinh ra khi ở chỗ của $x$ ta
đặt $x + \omega$, thì sẽ có differentia bậc ba $\Delta^3 y$; và từ đó, theo cùng cách ấy, là
differentia bậc tư $\Delta^4 y$, &c. Vậy chỉ cần biết cách tìm differentia bậc nhất của
mỗi functio là ta cũng có thể tìm được differentia bậc hai, bậc ba, và tất cả những bậc
sau nó; bởi vì differentia bậc hai của $y$ chẳng qua là differentia bậc nhất của $\Delta y$;
và differentia bậc ba của $y$ chẳng qua là differentia bậc nhất của $\Delta\Delta y$; và cứ
thế cho những cái còn lại.

**12.** Nếu functio $y$ được ghép từ hai hay nhiều thành phần, như là
$y = p + q + r + \text{\&c.}$, thì vì $y^1 = p^1 + q^1 + r^1 + \text{\&c.}$, ta có
differentia

$$
\Delta y = \Delta p + \Delta q + \Delta r + \text{\&c.},
$$

và cũng theo cách ấy

$$
\Delta\Delta y = \Delta\Delta p + \Delta\Delta q + \Delta\Delta r + \text{\&c.};
$$

nên việc tìm các differentia, khi functio đã cho là sự ghép của các thành phần, trở nên
không khó hơn là bao. Nhưng nếu functio $y$ lại là tích của hai functio $p$ và $q$, tức là
$y = pq$, thì vì $y^1 = p^1q^1$, $p^1 = p + \Delta p$ và $q^1 = q + \Delta q$, ta có

$$
p^1q^1 = pq + p\Delta q + q\Delta p + \Delta p\,\Delta q,
$$

nên $\Delta y = p\Delta q + q\Delta p + \Delta p\,\Delta q$. Vậy nếu $p$ là một lượng
constans $a$, thì $\Delta a = 0$, và differentia bậc nhất của functio $y = aq$ là
$\Delta y = a\Delta q$; cũng theo cách ấy differentia bậc hai là
$\Delta\Delta y = a\Delta\Delta q$, và bậc ba — bản in viết `Δ³q = aΔ³q`, xem sổ đối chiếu.

<!-- PDF 39, trang in 11 -->

**13.** Vì mọi functio rationalis nguyên là sự tổng hợp từ vài lũy thừa của chính $x$, nên
ta sẽ có thể tìm được mọi differentia của các functio rationalis nguyên, nếu ta biết hiển
thị differentia của các lũy thừa. Vì vậy, trong những ví dụ sau ta sẽ nghiên cứu differentia
của từng lũy thừa của lượng biến thiên $x$. Và vì $x^0 = 1$ thì $\Delta x^0 = 0$;
bởi vì $x^0$ không biến thiên, ngay cả khi $x$ trở thành $x + \omega$. Còn như ta đã thấy thì
$\Delta x = \omega$ và $\Delta\Delta x = 0$, đồng thời các differentia của những bậc kế tiếp
đều tan biến. Vì những điều ấy đã rõ ràng, ta bắt đầu từ bậc hai.

### Exemplum I

*Tìm các differentia của mọi bậc của lũy thừa $x^2$.*

Vì ở đây $y = x^2$, nên $y^1 = (x + \omega)^2$, và do đó

$$
\Delta y = 2\omega x + \omega\omega;
$$

đây là differentia bậc nhất. Rồi vì $\omega$ là một lượng constans, ta có
$\Delta\Delta y = 2\omega\omega$ và $\Delta^3 y = 0$, $\Delta^4 y = 0$; &c.

### Exemplum II

*Tìm các differentia của mọi bậc của lũy thừa $x^3$.*

Hãy đặt $y = x^3$, và vì $y^1 = (x + \omega)^3$, ta có

$$
\Delta y = 3\omega x^2 + 3\omega^2x + \omega^3,
$$

đây là differentia bậc nhất. Rồi, vì

$$
\Delta.\omega x^2 = 2\omega^2x + \omega^3,
$$

ta có

$$
\Delta.3\omega x^2 = 6\omega^2x + 3\omega^3
$$

và

$$
\Delta.3\omega^2x = 3\omega^3; \qquad \Delta.\omega^3 = 0;
$$

gộp lại ta được

$$
\Delta\Delta y = 6\omega^2x + 6\omega^3
$$

và

$$
\Delta^3 y = 6\omega^3.
$$

Còn những differentia kế tiếp thì tan biến.

<!-- PDF 40, trang in 12 -->

### Exemplum III

*Tìm các differentia của mọi bậc của lũy thừa $x^4$.*

Đặt $y = x^4$; vì $y^1 = (x + \omega)^4$, ta có

$$
\Delta y = 4\omega x^3 + 6\omega^2x^2 + 4\omega^3x + \omega^4;
$$

đây là differentia bậc nhất. Rồi, từ những cái trước:

$$
\begin{aligned}
\Delta.4\omega x^3 &= 12\omega^2x^2 + 12\omega^3x + 4\omega^4\\
\Delta.6\omega^2x^2 &= 12\omega^3x + 6\omega^4\\
\Delta.4\omega^3x &= 4\omega^4\\
\Delta.\omega^4 &= 0
\end{aligned}
$$

Gộp lại, differentia bậc hai là

$$
\Delta\Delta y = 12\omega^2x^2 + 24\omega^3x + 14\omega^4.
$$

Vì tiếp đó nữa,

$$
\begin{aligned}
\Delta.12\omega^3x^2 &= 24\omega^3x + 12\omega^4\\
\Delta.24\omega^3x &= 24\omega^4\\
\Delta.14\omega^4 &= 0
\end{aligned}
$$

<!-- PDF 41, trang in 13 -->

sẽ sinh ra differentia bậc ba

$$
\Delta^3 y = 24\omega^3x + 36\omega^4
$$

và cuối cùng là differentia bậc tư

$$
\Delta^4 y = 24\omega^4,
$$

vì nó là constans, nên những differentia của các bậc tiếp theo tan biến.

### Exemplum IV

*Tìm các differentia của mọi bậc của lũy thừa bất kỳ $x^n$.*

Hãy đặt $y = x^n$; và vì $y^1 = (x + \omega)^n$, $y^2 = (x + 2\omega)^n$,
$y^3 = (x + 3\omega)^n$, &c. Các lũy thừa khai triển sẽ cho ta:

$$
\begin{aligned}
y &= x^n\\
y^1 &= x^n + \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\omega^2x^{n-2}
      + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\omega^3x^{n-3} + \text{\&c.}\\
y^2 &= x^n + \frac{n}{1}\,2\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,4\omega^2x^{n-2}
      + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,8\omega^3x^{n-3} + \text{\&c.}\\
y^3 &= x^n + \frac{n}{1}\,3\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,9\omega^2x^{n-2}
      + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,27\omega^3x^{n-3} + \text{\&c.}\\
y^4 &= x^n + \frac{n}{1}\,4\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,16\omega^2x^{n-2}
      + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,64\omega^3x^{n-3} + \text{\&c.}
\end{aligned}
$$

<!-- PDF 42, trang in 14 -->

Từ đây, khi lấy sai lệch, ta được:

$$
\begin{aligned}
\Delta y &= \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\omega^2x^{n-2}
          + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\omega^3x^{n-3} + \text{\&c.}\\
\Delta y^1 &= \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,3\omega^2x^{n-2}
          + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,7\omega^3x^{n-3} + \text{\&c.}\\
\Delta y^2 &= \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,5\omega^2x^{n-2}
          + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,19\omega^3x^{n-3} + \text{\&c.}\\
\Delta y^3 &= \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,7\omega^2x^{n-2}
          + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,37\omega^3x^{n-3} + \text{\&c.}
\end{aligned}
$$

Lại lấy sai lệch một lần nữa, ta sẽ được:

$$
\begin{aligned}
\Delta\Delta y &= n(n-1)\omega^2x^{n-2} + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,6\omega^3x^{n-3}
          + \frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4}\,14\omega^4x^{n-4} + \text{\&c.}\\
\Delta\Delta y^1 &= n(n-1)\omega^2x^{n-2} + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,12\omega^3x^{n-3}
          + \frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4}\,50\omega^4x^{n-4} + \text{\&c.}\\
\Delta\Delta y^2 &= n(n-1)\omega^2x^{n-2} + \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\,18\omega^3x^{n-3}
          + \frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4}\,110\omega^4x^{n-4} + \text{\&c.}
\end{aligned}
$$

<!-- PDF 43, trang in 15 -->

Từ những cái ấy, lấy sai lệch thêm nữa:

$$
\begin{aligned}
\Delta^3 y &= n(n-1)(n-2)\omega^3x^{n-3}
          + \frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4}\,36\omega^4x^{n-4} + \text{\&c.}\\
\Delta^3 y^1 &= n(n-1)(n-2)\omega^3x^{n-3}
          + \frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4}\,60\omega^4x^{n-4} + \text{\&c.}
\end{aligned}
$$

và tiếp nữa:

$$
\Delta^4 y = n(n-1)(n-2)(n-3)\omega^4x^{n-4} + \text{\&c.}
$$

**14.** Nhờ đó, quy luật thứ hai theo đó những differentia này tiến triển, sẽ dễ dàng thấy
hơn. Hãy lập trước, vì lý do ngắn gọn:

$$
\begin{aligned}
A &= \frac{n}{1}\\
B &= \frac{n(n-1)}{1\cdot 2}\\
C &= \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\\
D &= \frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4}\\
E &= \frac{n(n-1)(n-2)(n-3)(n-4)}{1\cdot 2\cdot 3\cdot 4\cdot 5}
\end{aligned}$$

và &c.

<!-- PDF 44, trang in 16 -->

Tiếp theo hãy lập Bảng sau, sẽ trích ra từng differentia:

| | | | | | | | | |
|---|---|---|---|---|---|---|---|---|
| $y$ | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | &c. |
| $\Delta y$ | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | &c. |
| $\Delta^2 y$ | 0 | 0 | 2 | 6 | 14 | 30 | 62 | 126 | 254 &c. |
| $\Delta^3 y$ | 0 | 0 | 0 | 6 | 36 | 150 | 540 | 1806 | 5796 &c. |
| $\Delta^4 y$ | 0 | 0 | 0 | 0 | 24 | 240 | 1560 | 8400 | 40824 &c. |
| $\Delta^5 y$ | 0 | 0 | 0 | 0 | 0 | 120 | 1800 | 16800 | 126000 &c. |
| $\Delta^6 y$ | 0 | 0 | 0 | 0 | 0 | 0 | 720 | 15120 | 191520 &c. |
| $\Delta^7 y$ | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 5040 | 141120 &c. |

Trong Bảng này, số của mỗi chuỗi được tìm ra bằng cách lấy số đứng trước trong cùng chuỗi
cộng với số ở trên, rồi nhân tổng ấy với chỉ số của ký tự $\Delta$. Vậy, trong chuỗi
differentiae $\Delta^5 y$ ứng với, số 16800 được tìm ra khi ta lấy số đứng trước là 1800
cộng với số 1560 đã viết ở trên, thành tổng 3360, rồi nhân với 5.

> **[Chú giải]**
>
> **Bảng này là các số Stirling loại hai, nhân với giai thừa**
>
> Quy tắc Euler vừa nêu — cộng số đứng trước với số ở trên, rồi nhân với chỉ số $\Delta$ —
> chính là truy hồi mà ngày nay dùng cho các số Stirling loại hai, chỉ khác ở chỗ các số
> Stirling được nhân thêm $k!$ mỗi hàng.
>
> Kiểm lại bằng chính ví dụ của Euler ở ngay trên: ông lấy $1800$ (ở hàng $\Delta^5$) cộng
> $1560$ (ở hàng $\Delta^4$) rồi nhân với 5, thu được $16800$. Cột thứ tư của hàng $\Delta^3$
> cũng thỏa: $3!\cdot\left\{4 \atop 3\right\} = 6 \cdot 1 = 6$, và cột thứ năm
> $3!\cdot\left\{5 \atop 3\right\} = 6 \cdot 10 = 60$, đúng như hàng ấy in ra.
>
> Nói cách khác, hàng $\Delta^2$ gồm $2, 6, 14, 30, 62, 126, 254$, tức là hai lần dãy
> $1, 3, 7, 15, 31, 63, 127$; hàng $\Delta^4$ gồm $24, 240, 1560, \dots$, tức là $4!$ lần dãy
> $1, 10, 65, 350, \dots$.
>
> Việc nhận diện này là của người viết chú giải, không phải điều Euler nói. Ông không đặt tên
> cho bảng, chỉ nói nó là Bảng và cho quy tắc điền. Cũng nên nói thêm: bảng này được Euler in
> năm 1755, còn bài báo của Stirling về dãy này ra năm 1733.

**15.** Vậy, khi Bảng đã lập, từng differentia của lũy thừa $x^n = y$ sẽ có dạng sau:

$$
\begin{aligned}
\Delta y &= A\omega x^{n-1} + B\omega^2x^{n-2} + C\omega^3x^{n-3} + D\omega^4x^{n-4} + \text{\&c.}\\
\Delta^2 y &= 2B\omega^2x^{n-2} + 6C\omega^3x^{n-3} + 14D\omega^4x^{n-4} + \text{\&c.}\\
\Delta^3 y &= 6C\omega^3x^{n-3} + 36D\omega^4x^{n-4} + 150E\omega^5x^{n-5} + \text{\&c.}\\
\Delta^4 y &= 24D\omega^4x^{n-4} + 240E\omega^5x^{n-5} + 1560F\omega^6x^{n-6} + \text{\&c.}
\end{aligned}
$$

<!-- PDF 45, trang in 17 -->

Tổng quát hơn, differentia bậc $m$ của lũy thừa $x^n$ sẽ được biểu thị theo cách sau.
Đặt

$$
I = \frac{n(n-1)(n-2)\cdots(n-m+1)}{1\cdot 2\cdot 3\cdots m};
$$

rồi

$$
K = \frac{n-m}{m+1}\,I; \qquad
L = \frac{n-m-1}{m+2}\,K; \qquad
M = \frac{n-m-2}{m+3}\,L; \qquad \text{\&c.}
$$

Tiếp theo hãy đặt:

$$
\begin{aligned}
\alpha &= (m+1)^m - \frac{m}{1}m^m + \frac{m(m-1)}{1\cdot 2}(m-1)^m
          - \frac{m(m-1)(m-2)}{1\cdot 2\cdot 3}(m-2)^m + \text{\&c.}\\
\beta &= (m+1)^{m+1} - \frac{m}{1}m^{m+1} + \frac{m(m-1)}{1\cdot 2}(m-1)^{m+1}
          - \frac{m(m-1)(m-2)}{1\cdot 2\cdot 3}(m-2)^{m+1} + \text{\&c.}\\
\gamma &= (m+1)^{m+2} - \frac{m}{1}m^{m+2} + \frac{m(m-1)}{1\cdot 2}(m-1)^{m+2}
          - \frac{m(m-1)(m-2)}{1\cdot 2\cdot 3}(m-2)^{m+2} + \text{\&c.}
\end{aligned}
$$

Với những giá trị đã tìm ra ấy, ta sẽ có

$$
\Delta^m y = \alpha I\omega^mx^{n-m} + \beta K\omega^{m+1}x^{n-m-1}
             + \gamma L\omega^{m+2}x^{n-m-2} + \text{\&c.},
$$

và tỉ lệ của biểu thức này tự nhiên đi theo từ cách mà từng differentia riêng lẻ được rút ra
từ các giá trị $y$, $y^1$, $y^2$, $y^3$, &c.

<!-- PDF 46, trang in 18 -->

**16.** Từ những điều trên dễ thấy rằng, nếu số mũ $n$ là một số nguyên dương, thì ta
cuối cùng sẽ đi tới những differentia là hằng số, và mọi differentia bậc cao hơn đều bằng
$0$. Như thế ta sẽ có

$$
\begin{aligned}
\Delta x &= \omega\\
\Delta^2 x^2 &= 2\omega^2\\
\Delta^3 x^3 &= 6\omega^3\\
\Delta^4 x^4 &= 24\omega^4
\end{aligned}
$$

và cuối cùng là

$$
\Delta^n x^n = 1\cdot 2\cdot 3\cdots n\cdot\omega^n.
$$

Vì thế mọi functio rationalis nguyên cuối cùng sẽ quy được về những differentia là hằng số.
Cụ thể, functio bậc nhất của chính $x$, $ax+b$, đã có differentia bậc nhất là hằng số
$= a\omega$. Functio bậc hai $ax^2+bx+c$ sẽ có differentia bậc hai là hằng số $= 2a\omega\omega$.
Còn differentia bậc ba của một functio bậc ba sẽ là hằng số; bậc bốn thì bậc bốn, &c. cứ
như vậy.

**17.** Cách ta đã dùng để tìm differentia của lũy thừa $x^n$ cũng còn mở rộng xa hơn nữa,
và trải được tới cả những lũy thừa mà số mũ $n$ là số âm, là phân số, hay thậm chí là số vô
tỉ. Để việc ấy hiện ra rõ ràng hơn, ta chỉ trích ra những differentia bậc nhất của loại
lũy thừa quan trọng nhất, bởi vì quy luật của những differentia bậc hai và các bậc tiếp theo
thì không dễ nhận ra bằng mắt. Ta sẽ có:

$$
\begin{aligned}
\Delta x &= \omega\\
\Delta x^2 &= 2\omega x + \omega^2\\
\Delta x^3 &= 3\omega x^2 + 3\omega^2x + \omega^3\\
\Delta x^4 &= 4\omega x^3 + 6\omega^2x^2 + 4\omega^3x + \omega^4 \quad \text{\&c.}
\end{aligned}
$$

<!-- Chưa dịch: PDF 47-62, tức trang in 19-34, gồm §18-§33. Câu mở đầu của mục kế tiếp
     bắt đầu ngay cuối trang 46 bằng chữ "Si-", nối sang trang 47. -->

<!-- Ghi chú dịch giả: số 16 của bảng ở §14 (hàng Δ³y) đọc trên scan là 150, không phải
     510 như lớp OCR gợi ý. Số 5796 ở hàng Δ³y và 40824 ở hàng Δ⁴y đã đối chiếu bằng
     quy tắc truy hồi của chính Euler: 5·(1800+1560) = 16800 khớp đúng cột bảy. -->

<!-- Ghi chú dịch giả: ở §17, phần dẫn nói phép tính trải tới cả số mũ âm, phân số và
     vô tỉ, nhưng danh sách Euler in ra ngay dưới chỉ liệt kê differentia bậc nhất của
     x, x², x³, x⁴, tức là số mũ dương. Đã phóng to cột số mũ trên bản scan để kiểm:
     không có dấu trừ nào, và các biểu thức bên phải (2ωx + ω², 3ωx² + 3ω²x + ω³,
     4ωx³ + 6ω²x² + 4ω³x + ω⁴) đúng là differentia bậc nhất của các lũy thừa dương ấy.
     Chép đúng như in, không sửa theo phần dẫn. -->
