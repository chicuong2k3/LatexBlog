---
title: "Chương I: Về sai lệch hữu hạn"
summary: "Mở đầu Pars Prior: khi lượng biến thiên x nhận lượng tăng ω, mọi functio của x đều biến đổi theo; từ đó dựng chuỗi các giá trị y, yᴵ, yᴵᴵ, … rồi định nghĩa sai lệch bậc một, hai, ba bằng hiệu của các giá trị liên tiếp."
tags: [dich-sach, toan, giai-tich]
slug: "sai-lech-huu-han"
number: 1
status: chua-hoan-thanh
---

<!-- Nguồn: PDF 31-66, tức trang in 3-38, hết CAPUT I gồm §1-§36. Mọi trang đã đọc
     trực tiếp từ ảnh scan; lớp OCR chỉ dùng làm bản nháp để đối chiếu, và ở các
     vùng công thức nó hỏng nặng nên toàn bộ phân số phải đọc từ ảnh. Các chỗ đã
     soi kỹ, chỗ lỗi của bản in và chỗ đọc chưa chắc đều ghi ở TRANSLATION_LEDGER.md
     và trong các ghi chú dịch giả ngay tại chỗ. -->

# Caput I

## De Differentiis finitis

![Vignette mở đầu Chương I: vòng cột La Tinh đã đổ nát ở bên trái, trên bàn đá có bóng đổ, quả địa cầu và dụng cụ đo, phía sau là những tường đá vỡ và một cái cây.](../assets/cap01-vignette.png)

*Hình 1. Vignette khắc đồng trang mở đầu Chương I.*

<!-- PDF 31, trang in 3 -->

**1.** Từ những điều đã trình bày trong Quyển trước về lượng biến thiên và functio, rõ ràng
là khi lượng biến thiên thực sự biến đổi thì mọi functio của nó cũng chịu biến đổi theo.
Chẳng hạn, nếu lượng biến thiên $x$ nhận lượng tăng $\omega$, sao cho ở chỗ của $x$ ta viết
$x + \omega$, thì mọi functio của $x$, như $xx$; $x^3$; $\dfrac{a+x}{aa+xx}$, đều nhận
những giá trị khác: cụ thể là $xx$ sẽ chuyển thành

$$
xx + 2x\omega + \omega\omega;
$$

<!-- PDF 32, trang in 4 -->

$x^3$ sẽ chuyển thành

$$
x^3 + 3xx\omega + 3x\omega\omega + \omega^3;
$$

và $\dfrac{a+x}{aa+xx}$ sẽ biến thành

$$
\frac{a+x+\omega}{aa+xx+2x\omega+\omega\omega}.
$$

Vậy một sự biến đổi như thế sẽ luôn xảy ra, trừ khi functio chỉ mang giả dáng của một lượng
biến thiên, còn thực ra là một lượng constans, như $x^0$: trong trường hợp ấy functio như
vậy giữ nguyên không đổi, dù lượng $x$ thay đổi thế nào đi nữa.

**2.** Những điều ấy đã được trình bày đủ, nên ta hãy tiến lại gần hơn những tính chất của
functio mà toàn bộ giải tích vô hạn (analysis infinitorum) dựa vào. Vậy giả sử $y$ là một
functio bất kỳ của lượng biến thiên $x$; ở chỗ của $x$ ta lần lượt thay những giá trị tiến
theo cấp số cộng, cụ thể là: $x$; $x+\omega$; $x+2\omega$; $x+3\omega$; $x+4\omega$;
&c. Gọi $y^{\mathrm{I}}$ là giá trị mà functio $y$ nhận khi trong nó ở chỗ của $x$ ta thay
$x+\omega$; tương tự, gọi $y^{\mathrm{II}}$ là giá trị của chính $y$ khi ở chỗ của $x$ ta
viết $x+2\omega$; và theo cùng lẽ ấy, $y^{\mathrm{III}}$; $y^{\mathrm{IV}}$;
$y^{\mathrm{V}}$; &c. chỉ các giá trị của $y$ hiện ra khi ở chỗ của $x$ ta đặt $x+3\omega$;
$x+4\omega$; $x+5\omega$; &c., sao cho các giá trị khác nhau ấy của $x$ và $y$ tương ứng
với nhau theo cách sau:

$$
\begin{array}{ccccccc}
x; & x+\omega; & x+2\omega; & x+3\omega; & x+4\omega; & x+5\omega; & \text{\&c.}\\
y; & y^{\mathrm{I}}; & y^{\mathrm{II}}; & y^{\mathrm{III}}; & y^{\mathrm{IV}}; & y^{\mathrm{V}}; & \text{\&c.}
\end{array}
$$

**3.** Cũng như cấp số cộng $x$; $x+\omega$; $x+2\omega$; &c. có thể kéo dài vô hạn, chuỗi
$y$; $y^{\mathrm{I}}$; $y^{\mathrm{II}}$; &c. sinh ra từ functio $y$ cũng sẽ tiến ra vô hạn,
và bản chất của nó sẽ tùy thuộc vào tính cách của functio $y$. Chẳng hạn, nếu $y = x$ hoặc
$y = ax+b$, thì chuỗi $y$; $y^{\mathrm{I}}$; $y^{\mathrm{II}}$; &c. cũng sẽ là cấp số cộng;
nếu $y = \dfrac{a}{bx+c}$, chuỗi sinh ra sẽ là chuỗi điều hòa; còn nếu $y = a^x$, ta sẽ có
một cấp số nhân. Và không thể nghĩ ra được chuỗi nào lại không thể sinh ra theo cách ấy từ
một functio xác định của $y$; người ta thường gọi một functio như vậy của $x$, xét trong
quan hệ với chuỗi sinh ra từ nó, là TERMINUS GENERALIS của chuỗi ấy; vì vậy, do mọi chuỗi
lập theo một quy luật xác định đều có terminus generalis, nên ngược lại nó sinh ra từ một
functio xác định của $x$, như trong lý thuyết chuỗi người ta vẫn thường giải thích kỹ hơn.

<!-- Ghi chú dịch giả: ở §3 bản in viết "ex certa functione ipsius y oriri queat" (từ một
     functio xác định của y), trong khi ngay sau đó là "functio ipsius x" và cả câu nói về
     functio của x. Nhiều khả năng là lỗi sắp chữ, lẽ ra là "ipsius x". Đã giữ nguyên "của
     y" như bản in. -->

<!-- PDF 33, trang in 5 (tiếp) -->

**4.** Nhưng ở đây ta chủ yếu để ý tới những sai lệch mà các hạng của chuỗi $y$,
$y^{\mathrm{I}}$, $y^{\mathrm{II}}$, $y^{\mathrm{III}}$, &c. chênh nhau; và để cho chúng
khớp với bản chất của các vi phân, ta ký hiệu chúng bằng những dấu sau, sao cho

$$
y^{\mathrm{I}} - y = \Delta y; \quad y^{\mathrm{II}} - y^{\mathrm{I}} = \Delta y^{\mathrm{I}}; \quad y^{\mathrm{III}} - y^{\mathrm{II}} = \Delta y^{\mathrm{II}}; \quad \text{\&c.}
$$

Vậy $\Delta y$ sẽ biểu thị lượng tăng mà functio $y$ nhận khi trong nó ở chỗ của $x$ ta đặt
$x+\omega$, với $\omega$ là một số bất kỳ, lấy tùy ý. Trong lý thuyết chuỗi người ta thường
lấy $\omega = 1$; nhưng ở đây, cho mục đích của chúng ta, nên dùng một giá trị tổng quát, có
thể tùy ý tăng lên hay giảm xuống. Lượng tăng $\Delta y$ này của functio $y$ cũng thường
được gọi là DIFFERENTIA của nó, tức lượng mà giá trị kế tiếp $y^{\mathrm{I}}$ vượt giá trị
đầu $y$, và luôn được coi như một lượng tăng, dù thực ra nó thường biểu thị một lượng giảm,
điều nhận ra được từ giá trị âm của nó.

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

**5.** Vì $y^{\mathrm{II}}$ sinh ra từ $y$ khi ở chỗ của $x$ ta viết $x+2\omega$, rõ ràng
cũng chính lượng ấy sẽ sinh ra nếu trước hết ở chỗ của $x$ ta đặt $x+\omega$, rồi lại một lần
nữa đặt $x+\omega$ vào chỗ của $x$. Do đó $y^{\mathrm{II}}$ sẽ sinh ra từ $y^{\mathrm{I}}$ nếu
trong $y^{\mathrm{I}}$, ở chỗ của $x$, ta viết $x+\omega$; và vì thế $\Delta y^{\mathrm{I}}$ sẽ
là lượng tăng của $y^{\mathrm{I}}$ mà nó nhận khi đặt $x+\omega$ vào chỗ của $x$; và như vậy
$\Delta y^{\mathrm{I}}$, theo cách tương tự, được gọi là *Differentia* của $y^{\mathrm{I}}$.
Theo cùng lẽ ấy, $\Delta y^{\mathrm{II}}$ sẽ là differentia của $y^{\mathrm{II}}$, tức lượng
tăng mà nó nhận nếu ở chỗ của $x$ ta đặt $x+\omega$; và $\Delta y^{\mathrm{III}}$ sẽ là
differentia, tức lượng tăng, của $y^{\mathrm{III}}$, và cứ thế tiếp. Theo cách này, từ chuỗi
các giá trị của $y$, tức $y$; $y^{\mathrm{I}}$; $y^{\mathrm{II}}$; $y^{\mathrm{III}}$; &c., ta
sẽ có chuỗi các sai lệch $\Delta y$; $\Delta y^{\mathrm{I}}$; $\Delta y^{\mathrm{II}}$; &c.,
tìm được bằng cách lấy hạng đứng sau trừ đi mỗi hạng của chuỗi kia.

**6.** Tìm được chuỗi các sai lệch rồi, nếu từ nó ta lại lấy sai lệch, bằng cách lấy hạng đứng
sau trừ đi mỗi hạng, thì sẽ sinh ra những sai lệch của các sai lệch, được gọi là
*Differentiae secundae*; và theo cách sau, chúng được biểu thị bằng ký tự một cách tiện lợi
nhất, sao cho:

$$
\begin{array}{rcl}
\Delta\Delta y &=& \Delta y^{\mathrm{I}} - \Delta y\\
\Delta\Delta y^{\mathrm{I}} &=& \Delta y^{\mathrm{II}} - \Delta y^{\mathrm{I}}\\
\Delta\Delta y^{\mathrm{II}} &=& \Delta y^{\mathrm{III}} - \Delta y^{\mathrm{II}}\\
\Delta\Delta y^{\mathrm{III}} &=& \Delta y^{\mathrm{IV}} - \Delta y^{\mathrm{III}}\\
&\text{\&c.}&
\end{array}
$$

Vậy $\Delta\Delta y$ được gọi là differentia secunda của $y$; $\Delta\Delta y^{\mathrm{I}}$ là
differentia secunda của $y^{\mathrm{I}}$, và cứ thế tiếp. Tương tự, nếu từ các differentia
secunda ta lại lấy sai lệch của chúng, sẽ sinh ra các differentiae tertiae, viết theo cách
này: $\Delta^3 y$; $\Delta^3 y^{\mathrm{I}}$; &c.; rồi từ đó tiếp nữa là các differentiae
quartae $\Delta^4 y$; $\Delta^4 y^{\mathrm{I}}$; &c.; và cứ thế xa hơn, bao xa tùy thích.

<!-- PDF 35, trang in 7 -->

**5.** Ta hãy biểu thị từng chuỗi sai lệch này trong một sơ đồ, để mối liên hệ giữa chúng dễ
đập vào mắt hơn:

| | | | | | | |
|---|---|---|---|---|---|---|
| *Progressio arithmetica* | | | | | | |
| $x$; | $x+\omega$; | $x+2\omega$; | $x+3\omega$; | $x+4\omega$; | $x+5\omega$; | &c. |
| *Valores functionis* | | | | | | |
| $y$; | $y^{\mathrm{I}}$; | $y^{\mathrm{II}}$; | $y^{\mathrm{III}}$; | $y^{\mathrm{IV}}$; | $y^{\mathrm{V}}$; | &c. |
| *Differentiae primae* | | | | | | |
| $\Delta y$; | $\Delta y^{\mathrm{I}}$; | $\Delta y^{\mathrm{II}}$; | $\Delta y^{\mathrm{III}}$; | $\Delta y^{\mathrm{IV}}$; | &c. | |
| *Differentiae secundae* | | | | | | |
| $\Delta\Delta y$; | $\Delta\Delta y^{\mathrm{I}}$; | $\Delta\Delta y^{\mathrm{II}}$; | $\Delta\Delta y^{\mathrm{III}}$; | &c. | | |
| *Differentiae tertiae* | | | | | | |
| $\Delta^3 y$; | $\Delta^3 y^{\mathrm{I}}$; | $\Delta^3 y^{\mathrm{II}}$; | &c. | | | |
| *Differentiae quartae* | | | | | | |
| $\Delta^4 y$; | $\Delta^4 y^{\mathrm{I}}$; | &c. | | | | |
| *Differentiae quintae* | | | | | | |
| $\Delta^5 y$; | &c. | | | | | |
| &c. | | | | | | |

trong đó mỗi chuỗi sinh ra từ chuỗi đứng trước, bằng cách lấy các hạng đứng sau trừ đi từng
hạng. Vậy, bất kể functio nào của $x$ được thay vào chỗ của $y$, vì các giá trị
$y^{\mathrm{I}}$, $y^{\mathrm{II}}$, $y^{\mathrm{III}}$, &c. dễ dàng lập được bằng những phép
hợp thành đã biết, nên từ chúng sẽ tìm ra từng chuỗi sai lệch mà không tốn công.

<!-- Ghi chú dịch giả: đoạn này trên bản in mang số "5." (PDF 35, trang in 7), trùng với
     số của đoạn "Quoniam" ở trang 6; theo thứ tự thì đây là §7, và đoạn kế tiếp in là
     "8.". Đã giữ số "5." như bản in. -->

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
> hoặc dùng một đa thức Taylor - cả hai đều là trường hợp riêng của bảng trên khi
> $\Delta y \approx \omega\,\frac{dy}{dx}$.
>
> Một chi tiết cần để mắt: chỉ số trên $y$ và trên $\Delta y$ ở đây là số La Mã
> ($y^{\mathrm{I}}$, $\Delta y^{\mathrm{II}}$), chỉ vị trí của giá trị trong chuỗi, không
> phải số mũ. Còn chỉ số Ả Rập trên $\Delta$ ($\Delta^3 y$, $\Delta^4 y$) mới là bậc của
> sai lệch.

<!-- PDF 36, trang in 8 -->

**8.** Ta đặt $y = x$; khi ấy $y^{\mathrm{I}} = x^{\mathrm{I}} = x + \omega$;
$y^{\mathrm{II}} = x^{\mathrm{II}} = x + 2\omega$: và cứ thế tiếp. Từ đó, lấy các sai lệch, ta
sẽ có $\Delta x = \omega$; $\Delta x^{\mathrm{I}} = \omega$; $\Delta x^{\mathrm{II}} = \omega$;
&c.; vì vậy mọi differentia bậc nhất của $x$ sẽ là hằng, và do đó mọi differentia bậc hai
sẽ triệt tiêu; các differentia bậc ba, và mọi differentia của các bậc tiếp theo, cũng vậy.
Vậy vì $\Delta x = \omega$, nên theo phép tương tự, ở chỗ của chữ $\omega$ ta sẽ dùng ký tự
$\Delta x$ cho tiện. Như vậy, với lượng biến thiên $x$ mà các giá trị liên tiếp $x$,
$x^{\mathrm{I}}$, $x^{\mathrm{II}}$, $x^{\mathrm{III}}$, &c. được giả thiết lập thành một cấp
số cộng, các differentia $\Delta x$, $\Delta x^{\mathrm{I}}$, $\Delta x^{\mathrm{II}}$, &c. sẽ
là hằng và bằng nhau; và vì thế sẽ có

$$
\Delta\Delta x = 0, \qquad \Delta^3 x = 0, \qquad \Delta^4 x = 0,
$$

và cứ thế tiếp.

**9.** Ở đây, cho các giá trị lần lượt gán cho $x$, ta đã giả thiết một cấp số cộng, sao cho
các differentia bậc nhất của những giá trị ấy là hằng, còn các differentia bậc hai và mọi bậc
còn lại đều triệt tiêu. Dù điều này tùy thuộc vào ý muốn của ta, vì ta cũng có thể dùng bất
kỳ cấp số nào khác, nhưng cấp số cộng thường được dùng thuận tiện nhất, hơn mọi cấp số khác:
một là vì nó đơn giản nhất và dễ hiểu nhất, hai là, và đây là lý do chính, vì nó mở lối tới
mọi giá trị mà $x$ có thể nhận. Quả vậy, khi gán cho $\omega$ các giá trị âm cũng như dương,
thì trong chuỗi giá trị này của $x$ chứa đủ mọi lượng thực có thể thay vào chỗ của $x$:

<!-- PDF 37, trang in 9 -->

trái lại, nếu ta chọn một cấp số nhân, thì không có lối nào tới các giá trị âm. Vì lẽ ấy,
tính biến thiên của các functio $y$ được xét đoán thích đáng nhất từ những giá trị của $x$
lập thành cấp số cộng.

> **[Chú giải]**
>
> **"Chứa đựng mọi lượng thực" - câu này chỉ đúng nếu ω hiểu được là biến**
>
> Euler lập luận: cấp số cộng với $\omega$ thì nhận cả giá trị âm lẽ cả dương, nên nó chạm
> tới được mọi lượng thực, còn chuỗi nhân thì không. Lập luận ấy là lý do ông chọn cấp số
> cộng làm bước nhảy.
>
> Nhưng nếu $\omega$ là một số cố định thì các giá trị $x + n\omega$ với $n$ nguyên tạo thành
> một dãy rời rạc, không phải mọi số thực. Điều đó không thành vấn đề, vì Euler không bao giờ
> định $\omega$; ông nói ở §4 là $\omega$ "pro arbitrio augeri diminuique queat" - tùy ý tăng
> hay giảm. Chỉ khi đọc $\omega$ là một lượng biến thiên liên tục thì câu ấy mới thành lời.
>
> Điều cần chú ý về sau: chính vì $\omega$ phải tùy ý đi tới vô cùng nhỏ, thế giới hữu hạn ở
> đây mới không bị khóa cứng. Cấp số cộng với một bước cố định sẽ không đủ cho việc đó.

**10.** Cũng như $\Delta y = y^{\mathrm{I}} - y$, các differentia cao hơn cũng có thể được xác
định từ các hạng của chuỗi thứ nhất $y$, $y^{\mathrm{I}}$, $y^{\mathrm{II}}$,
$y^{\mathrm{III}}$, &c. Vì

$$
\Delta y^{\mathrm{I}} = y^{\mathrm{II}} - y^{\mathrm{I}}
$$

nên

$$
\Delta\Delta y = y^{\mathrm{II}} - 2y^{\mathrm{I}} + y
$$

và

$$
\Delta\Delta y^{\mathrm{I}} = y^{\mathrm{III}} - 2y^{\mathrm{II}} + y^{\mathrm{I}}
$$

và do đó

$$
\Delta^3 y = \Delta\Delta y^{\mathrm{I}} - \Delta\Delta y = y^{\mathrm{III}} - 3y^{\mathrm{II}} + 3y^{\mathrm{I}} - y;
$$

tương tự sẽ có

$$
\Delta^4 y = y^{\mathrm{IV}} - 4y^{\mathrm{III}} + 6y^{\mathrm{II}} - 4y^{\mathrm{I}} + y
$$

và

$$
\Delta^5 y = y^{\mathrm{V}} - 5y^{\mathrm{IV}} + 10y^{\mathrm{III}} - 10y^{\mathrm{II}} + 5y^{\mathrm{I}} - y;
$$

các hệ số bằng số của những công thức này theo cùng một quy luật như quy luật thấy ở các lũy
thừa của Nhị thức. Vậy cũng như differentia bậc nhất được xác định từ hai hạng của chuỗi
$y$; $y^{\mathrm{I}}$; $y^{\mathrm{II}}$; $y^{\mathrm{III}}$; &c., differentia bậc hai được xác
định từ ba hạng, bậc ba từ bốn hạng, và các bậc còn lại cũng thế. Còn khi đã biết các
differentia mọi bậc của $y$, thì theo cách tương tự các differentia mọi bậc của
$y^{\mathrm{I}}$; $y^{\mathrm{II}}$; &c. cũng sẽ được xác định.

<!-- PDF 38, trang in 10 -->

**11.** Vậy, cho một Functio $y$ bất kỳ, thì mọi differentia của nó, cả bậc nhất lẫn các bậc
tiếp theo, tức những differentia ứng với sai lệch $\omega$ mà theo đó các giá trị của $x$ tiến
lên, đều có thể tìm được. Và muốn vậy thì không cần phải kéo dài chuỗi giá trị của $y$ thêm
nữa: vì cũng như differentia bậc nhất $\Delta y$ tìm được nếu trong $y$, ở chỗ của $x$, ta viết
$x + \omega$, rồi lấy giá trị $y^{\mathrm{I}}$ vừa sinh ra trừ đi chính functio $y$; thì
differentia bậc hai $\Delta\Delta y$ sẽ có được nếu trong differentia bậc nhất $\Delta y$, ở
chỗ của $x$, ta đặt $x + \omega$ để sinh ra $\Delta y^{\mathrm{I}}$, rồi lấy
$\Delta y^{\mathrm{I}}$ trừ đi $\Delta y$. Tương tự, nếu lấy Differentia của differentia bậc
hai $\Delta\Delta y$, bằng cách lấy giá trị mà nó nhận khi ở chỗ của $x$ ta đặt $x + \omega$
trừ đi nó, thì sẽ ra differentia bậc ba $\Delta^3 y$; và từ đó, cũng theo cách ấy, là
differentia bậc bốn $\Delta^4 y$, &c. Vậy hễ ai biết cách tìm differentia bậc nhất của một
functio bất kỳ thì đồng thời cũng tìm được differentia bậc hai, bậc ba và mọi bậc tiếp theo:
bởi differentia bậc hai của $y$ chẳng gì khác hơn là differentia bậc nhất của $\Delta y$; và
differentia bậc ba của $y$ chẳng gì khác hơn là differentia bậc nhất của $\Delta\Delta y$; và
các bậc còn lại cũng thế.

**12.** Nếu functio $y$ gồm hai hay nhiều phần hợp lại, sao cho $y = p + q + r + \text{\&c.}$,
thì vì $y^{\mathrm{I}} = p^{\mathrm{I}} + q^{\mathrm{I}} + r^{\mathrm{I}} + \text{\&c.}$, ta
sẽ có differentia

$$
\Delta y = \Delta p + \Delta q + \Delta r + \text{\&c.},
$$

và tương tự, tiếp nữa,

$$
\Delta\Delta y = \Delta\Delta p + \Delta\Delta q + \Delta\Delta r + \text{\&c.};
$$

nhờ đó việc tìm các differentia, khi functio đã cho gồm nhiều phần hợp lại, trở nên dễ hơn
không ít. Còn nếu functio $y$ là tích của hai functio $p$ và $q$, tức là

<!-- PDF 39, trang in 11 -->

$y = pq$, thì vì $y^{\mathrm{I}} = p^{\mathrm{I}}q^{\mathrm{I}}$, và
$p^{\mathrm{I}} = p + \Delta p$ cùng $q^{\mathrm{I}} = q + \Delta q$, ta sẽ có

$$
p^{\mathrm{I}}q^{\mathrm{I}} = pq + p\Delta q + q\Delta p + \Delta p\,\Delta q,
$$

và từ đó $\Delta y = p\Delta q + q\Delta p + \Delta p\,\Delta q$. Do đó, nếu $p$ là một lượng
constans $= a$, thì vì $\Delta a = 0$, differentia bậc nhất của functio $y = aq$ sẽ là
$\Delta y = a\Delta q$, và tương tự differentia bậc hai là $\Delta\Delta y = a\Delta\Delta q$,
bậc ba là $\Delta^3 q = a\Delta^3 q$, và cứ thế tiếp.

<!-- Ghi chú dịch giả: vế trái "Δ³q" ở cuối §12 đúng như bản in (PDF 39); theo mạch hai
     dòng trước thì lẽ ra là Δ³y. Đã giữ nguyên như in. -->

**13.** Vì mọi functio rationalis nguyên là một tổng gồm vài lũy thừa của $x$, nên ta sẽ tìm
được mọi differentia của các functio rationalis nguyên, miễn là ta biết cách biểu thị
differentia của riêng các lũy thừa. Vì thế, trong các ví dụ sau, ta hãy khảo sát differentia
của từng lũy thừa của lượng biến thiên $x$.

Vì $x^0 = 1$, nên $\Delta x^0 = 0$; bởi $x^0$ không biến đổi, dù $x$ chuyển thành
$x + \omega$.

Còn ta đã thấy rằng $\Delta x = \omega$; và $\Delta\Delta x = 0$, đồng thời các differentia của
những bậc tiếp theo đều triệt tiêu. Những điều ấy đã rõ, nên ta hãy bắt đầu từ Lũy thừa bậc
hai:

### Exemplum I

*Tìm các differentia mọi bậc của lũy thừa $x^2$.*

Vì ở đây $y = x^2$, nên $y^{\mathrm{I}} = (x + \omega)^2$; và do đó
$\Delta y = 2\omega x + \omega\omega$; đó là differentia bậc nhất. Giờ vì $\omega$ là lượng
constans, nên $\Delta\Delta y = 2\omega\omega$, và $\Delta^3 y = 0$; $\Delta^4 y = 0$; &c.

### Exemplum II

*Tìm các differentia mọi bậc của lũy thừa $x^3$.*

Đặt $y = x^3$; và vì $y^{\mathrm{I}} = (x + \omega)^3$,

<!-- PDF 40, trang in 12 -->

ta sẽ có

$$
\Delta y = 3\omega xx + 3\omega^2x + \omega^3
$$

đó là differentia bậc nhất. Kế đó, vì

$$
\Delta.\,xx = 2\omega x + \omega\omega
$$

nên

$$
\Delta.\,3\omega xx = 6\omega\omega x + 3\omega^3
$$

và

$$
\Delta.\,3\omega^2x = 3\omega^3; \qquad \Delta.\,\omega^3 = 0:
$$

gộp những cái này lại, ta sẽ có

$$
\Delta\Delta y = 6\omega^2x + 6\omega^3: \qquad \Delta^3 y = 6\omega^3:
$$

Còn các differentia tiếp theo sẽ triệt tiêu.

### Exemplum III

*Tìm các differentia mọi bậc của lũy thừa $x^4$.*

Đặt $y = x^4$; vì $y^{\mathrm{I}} = (x + \omega)^4$, ta sẽ có

$$
\Delta y = 4\omega x^3 + 6\omega^2x^2 + 4\omega^3x + \omega^4;
$$

đó là differentia bậc nhất. Rồi từ những điều trước, ta có:

$$
\begin{aligned}
\Delta.\,4\omega x^3 &= 12\omega^2x^2 + 12\omega^3x + 4\omega^4\\
\Delta.\,6\omega^2x^2 &= \;.\;.\;.\;.\;\; 12\omega^3x + 6\omega^4\\
\Delta.\,4\omega^3x &= \;.\;.\;.\;.\;.\;.\;.\;.\;.\;\; + 4\omega^4\\
\Delta.\,\omega^4 &= \;.\;.\;.\;.\;.\;.\;.\;.\;.\;.\;\; 0
\end{aligned}
$$

Gộp những cái này lại, differentia bậc hai sẽ là:

$$
\Delta\Delta y = 12\omega^2x^2 + 24\omega^3x + 14\omega^4:
$$

Vì tiếp theo nữa ta có:

$$
\begin{aligned}
\Delta.\,12\omega^3x^2 &= 24\omega^3x + 12\omega^4\\
\Delta.\,24\omega^3x &= \;.\;.\;.\;\; 24\omega^4\\
\Delta.\,14\omega^4 &= \;.\;.\;.\;.\;.\;\; 0
\end{aligned}
$$

<!-- Ghi chú dịch giả: dòng đầu của khối này bản in ghi "Δ. 12ω³x²" (PDF 40, đã phóng to
     để kiểm), trong khi hạng tương ứng của ΔΔy ngay trên là 12ω²x² và vế phải
     24ω³x + 12ω⁴ đúng là differentia của 12ω²x². Đã giữ ω³ như bản in. -->

<!-- PDF 41, trang in 13 -->

sẽ sinh ra differentia bậc ba

$$
\Delta^3 y = 24\omega^3x + 36\omega^4
$$

và cuối cùng là differentia bậc tư

$$
\Delta^4 y = 24\omega^4,
$$

và vì nó là hằng, các differentia của những bậc tiếp theo sẽ triệt tiêu.

### Exemplum IV

*Tìm các differentia bậc bất kỳ của lũy thừa $x^n$.*

Đặt $y = x^n$; và vì $y^{\mathrm{I}} = (x + \omega)^n$; $y^{\mathrm{II}} = (x + 2\omega)^n$;
$y^{\mathrm{III}} = (x + 3\omega)^n$; &c., các Lũy thừa khai triển ra sẽ cho:

$$
\begin{aligned}
y &= x^n\\
y^{\mathrm{I}} &= x^n + \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\omega^2x^{n-2}
      + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\omega^3x^{n-3} + \text{\&c.}\\
y^{\mathrm{II}} &= x^n + \frac{n}{1}\,2\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,4\omega^2x^{n-2}
      + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,8\omega^3x^{n-3} + \text{\&c.}\\
y^{\mathrm{III}} &= x^n + \frac{n}{1}\,3\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,9\omega^2x^{n-2}
      + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,27\omega^3x^{n-3} + \text{\&c.}\\
y^{\mathrm{IV}} &= x^n + \frac{n}{1}\,4\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,16\omega^2x^{n-2}
      + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,64\omega^3x^{n-3} + \text{\&c.}
\end{aligned}
$$

<!-- PDF 42, trang in 14 -->

Từ đây, lấy các sai lệch, sẽ ra:

$$
\begin{aligned}
\Delta y &= \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\omega^2x^{n-2}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\omega^3x^{n-3} + \text{\&c.}\\
\Delta y^{\mathrm{I}} &= \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,3\omega^2x^{n-2}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,7\omega^3x^{n-3} + \text{\&c.}\\
\Delta y^{\mathrm{II}} &= \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,5\omega^2x^{n-2}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,19\omega^3x^{n-3} + \text{\&c.}\\
\Delta y^{\mathrm{III}} &= \frac{n}{1}\omega x^{n-1} + \frac{n(n-1)}{1\cdot 2}\,7\omega^2x^{n-2}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,37\omega^3x^{n-3} + \text{\&c.}
\end{aligned}
$$

lại lấy các sai lệch, và sẽ có:

$$
\begin{aligned}
\Delta\Delta y &= n(n-1)\omega^2x^{n-2} + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,6\omega^3x^{n-3}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\cdot\frac{(n-3)}{4}\,14\omega^4x^{n-4} + \text{\&c.}\\
\Delta\Delta y^{\mathrm{I}} &= n(n-1)\omega^2x^{n-2} + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,12\omega^3x^{n-3}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\cdot\frac{(n-3)}{4}\,50\omega^4x^{n-4} + \text{\&c.}\\
\Delta\Delta y^{\mathrm{II}} &= n(n-1)\omega^2x^{n-2} + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\,18\omega^{3}{}^{n-3}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\cdot\frac{(n-3)}{4}\,110\omega^4x^{n-4} + \text{\&c.}
\end{aligned}
$$

<!-- Ghi chú dịch giả: ở dòng ΔΔy^II, số hạng thứ hai bản in ghi "18 ω³ ⁿ⁻³", thiếu chữ x
     trước số mũ n−3 (PDF 42). Đã giữ như bản in. -->

<!-- PDF 43, trang in 15 -->

Từ những cái này, bằng phép trừ, rút ra tiếp:

$$
\begin{aligned}
\Delta^3 y &= n(n-1)(n-2)\omega^3x^{n-3}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\cdot\frac{(n-3)}{4}\,36\omega^4x^{n-4} + \text{\&c.}\\
\Delta^3 y^{\mathrm{I}} &= n(n-1)(n-2)\omega^3x^{n-3}
          + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\cdot\frac{(n-3)}{4}\,60\omega^4x^{n-4} + \text{\&c.}
\end{aligned}
$$

và tiếp nữa:

$$
\Delta^4 y = n(n-1)(n-2)(n-3)\omega^4x^{n-4} + \text{\&c.}
$$

**14.** Để quy luật mà theo đó các differentia này của lũy thừa $x^n$ tiến triển được thấy rõ
hơn, trước hết, cho gọn, ta đặt:

$$
\begin{aligned}
A &= \frac{n}{1}\\
B &= \frac{n(n-1)}{1\cdot 2}\\
C &= \frac{n(n-1)(n-2)}{1\cdot 2\cdot 3}\\
D &= \frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4}\\
E &= \frac{n(n-1)(n-2)(n-3)(n-3)}{1\cdot 2\cdot 3\cdot 4\cdot 5}\\
&\text{\&c.}
\end{aligned}
$$

<!-- Ghi chú dịch giả: thừa số cuối ở tử số của E bản in ghi (n−3) lần thứ hai (PDF 43);
     theo quy luật của A, B, C, D thì phải là (n−4). Đã giữ như bản in. -->

<!-- PDF 44, trang in 16 -->

Kế đó lập Bảng sau, dùng cho từng differentia:

| | | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|---|
| $y$ | 1; | 0; | 0; | 0; | 0; | 0; | 0; | 0; | 0; | &c. |
| $\Delta y$ | 0; | 1; | 1; | 1; | 1; | 1; | 1; | 1; | 1; | &c. |
| $\Delta^2 y$ | 0; | 0; | 2; | 6; | 14; | 30; | 62; | 126; | 254; | &c. |
| $\Delta^3 y$ | 0; | 0; | 0; | 6; | 36; | 150; | 540; | 1806; | 5796; | &c. |
| $\Delta^4 y$ | 0; | 0; | 0; | 0; | 24; | 240; | 1560; | 8400; | 40824; | &c. |
| $\Delta^5 y$ | 0; | 0; | 0; | 0; | 0; | 120; | 1800; | 16800; | 126000; | &c. |
| $\Delta^6 y$ | 0; | 0; | 0; | 0; | 0; | 0; | 720; | 15120; | 191520; | &c. |
| $\Delta^7 y$ | 0; | 0; | 0; | 0; | 0; | 0; | 0; | 5040; | 141120; | &c. |

trong Bảng này, một số của chuỗi bất kỳ tìm được bằng cách lấy số đứng trước nó trong cùng
chuỗi cộng với số đặt ở trên, rồi nhân tổng với chỉ số gắn vào ký tự $\Delta$. Chẳng hạn,
trong chuỗi ứng với differentia $\Delta^5 y$, số hạng 16800 tìm được nếu lấy số đứng trước là
1800 cộng với số 1560 viết ở trên, rồi nhân Tổng 3360 với 5.

> **[Chú giải]**
>
> **Bảng này là các số Stirling loại hai, nhân với giai thừa**
>
> Quy tắc Euler vừa nêu - cộng số đứng trước với số ở trên, rồi nhân với chỉ số $\Delta$ -
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

**15.** Vậy, khi đã lập Bảng này, từng differentia của Lũy thừa $x^n = y$ sẽ như sau:

$$
\begin{aligned}
\Delta y &= A\omega x^{n-1} + B\omega^2x^{n-2} + C\omega^3x^{n-3} + D\omega^4x^{n-4} + \text{\&c.}\\
\Delta^2 y &= 2B\omega^2x^{n-2} + 6C\omega^3x^{n-3} + 14D\omega^4x^{n-4} + \text{\&c.}\\
\Delta^3 y &= 6C\omega^3x^{n-3} + 36D\omega^4x^{n-4} + 150E\omega^5x^{n-5} + \text{\&c.}\\
\Delta^4 y &= 24D\omega^4x^{n-4} + 240E\omega^5x^{n-5} + 1560F\omega^6x^{n-6} + \text{\&c.}
\end{aligned}
$$

<!-- PDF 45, trang in 17 -->

Còn một cách tổng quát, differentia bậc $m$ của lũy thừa $x^n$, tức $\Delta^m y$, sẽ được biểu
thị theo cách sau. Đặt

$$
\begin{aligned}
I &= \frac{n(n-1)(n-2)\;.\;.\;.\;.\;.\;(n-m+1)}{1\cdot 2\cdot 3\;.\;.\;.\;.\;.\;.\;m};\\
K &= \frac{n-m}{m+1}\,I;\\
L &= \frac{n-m-1}{m+2}\,K;\\
M &= \frac{n-m-2}{m+3}\,L;\\
&\text{\&c.}
\end{aligned}
$$

Rồi đặt tiếp:

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

<!-- Ghi chú dịch giả: ở dòng β, số mũ của (m−2) trên bản in (PDF 45) nhòe, nét cuối
     trông gần như "2" hơn "1"; đã để m+1 theo các số hạng cùng dòng, nhưng chữ số này
     chưa đọc chắc được [OCR không rõ]. -->

Tìm được các giá trị ấy rồi, ta sẽ có

$$
\Delta^m y = \alpha I\omega^mx^{n-m} + \beta K\omega^{m+1}x^{n-m-1}
             + \gamma L\omega^{m+2}x^{n-m-2}\ \text{\&c.}
$$

lý do của biểu thức này tự nó suy ra từ cách mà từng differentia được rút ra từ các giá trị
$y$, $y'$, $y''$, $y'''$, &c.

<!-- Ghi chú dịch giả: ở câu cuối §15, bản in viết các giá trị bằng dấu phẩy trên
     (y, y′, y″, y‴), khác với chỉ số La Mã y^I, y^II dùng ở những chỗ khác. Đã giữ như
     bản in. -->

<!-- PDF 46, trang in 18 -->

**16.** Từ những điều này rõ ràng là, nếu số mũ $n$ là một số nguyên dương, thì cuối cùng
ta sẽ đi tới những differentia là hằng, và mọi differentia sau chúng đều $= 0$. Như thế ta
sẽ có

$$
\begin{aligned}
\Delta.\,x &= \omega\\
\Delta^2.\,x^2 &= 2\omega^2\\
\Delta^3.\,x^3 &= 6\omega^3\\
\Delta^4.\,x^4 &= 24\omega^4
\end{aligned}
$$

và cuối cùng

$$
\Delta^n.\,x^n = 1\cdot 2\cdot 3\;.\;.\;.\;n\cdot\omega^n.
$$

Vậy mọi functio rationalis nguyên cuối cùng sẽ dẫn tới những differentia là hằng. Cụ thể,
functio bậc nhất của $x$, $ax + b$, ngay differentia bậc nhất đã là hằng $= a\omega$.
Functio bậc hai $axx + bx + c$ sẽ có differentia bậc hai là hằng $= 2a\omega\omega$; còn
của functio bậc ba thì differentia bậc ba sẽ là hằng; của bậc bốn thì differentia bậc bốn,
và cứ thế tiếp.

**17.** Còn cách mà ta đã dùng để tìm các differentia của lũy thừa $x^n$ cũng áp dụng được
rộng hơn, và mở rộng tới những lũy thừa có số mũ $n$ là số âm, hay phân số, hay thậm chí vô
tỉ. Để điều đó hiện ra rõ hơn, ta sẽ chỉ nêu các differentia bậc nhất của những lũy thừa
chủ yếu thuộc loại này, vì quy luật của các differentia bậc hai và các bậc sau không dễ
nhận ra như thế. Vậy ta sẽ có

$$
\begin{aligned}
\Delta.\,x &= \omega\\
\Delta.\,x^2 &= 2\omega x + \omega^2\\
\Delta.\,x^3 &= 3\omega x^2 + 3\omega^2x + \omega^3\\
\Delta.\,x^4 &= 4\omega x^3 + 6\omega^2x^2 + 4\omega^3x + \omega^4 \quad \text{\&c.}
\end{aligned}
$$

<!-- PDF 47, trang in 19 -->

Còn theo cách tương tự sẽ có

$$
\Delta x^{-1} = -\frac{\omega}{x^2} + \frac{\omega^2}{x^3} - \frac{\omega^3}{x^4}
               + \text{\&c.}
$$

$$
\Delta x^{-2} = -\frac{2\omega}{x^3} + \frac{3\omega^2}{x^4} - \frac{4\omega^3}{x^5}
               + \text{\&c.}
$$

$$
\Delta x^{-3} = -\frac{3\omega}{x^4} + \frac{6\omega^2}{x^5} - \frac{10\omega^3}{x^6}
               + \text{\&c.}
$$

$$
\Delta x^{-4} = -\frac{4\omega}{x^5} + \frac{10\omega^2}{x^6} - \frac{20\omega^3}{x^7}
               + \text{\&c.}
$$

Và từ đó cho những lũy thừa còn lại. Cũng vậy, sẽ có

$$
\Delta x^{\frac{1}{2}} = \frac{\omega}{2x^{\frac{1}{2}}} - \frac{\omega^2}{8x^{\frac{3}{2}}}
                         + \frac{\omega^3}{16x^{\frac{5}{2}}} - \text{\&c.}
$$

$$
\Delta x^{\frac{1}{3}} = \frac{\omega}{3x^{\frac{2}{3}}} - \frac{\omega^2}{9x^{\frac{5}{3}}}
                         + \frac{5\omega^3}{81x^{\frac{8}{3}}} - \text{\&c.}
$$

$$
\Delta x^{-\frac{1}{2}} = -\frac{\omega}{2x^{\frac{3}{2}}} + \frac{3\omega^2}{8x^{\frac{5}{2}}}
                          - \frac{5\omega^3}{16x^{\frac{7}{2}}} + \text{\&c.}
$$

$$
\Delta x^{-\frac{1}{3}} = -\frac{\omega}{3x^{\frac{4}{3}}} + \frac{2\omega^2}{9x^{\frac{7}{3}}}
                          - \frac{14\omega^3}{81x^{\frac{10}{3}}} + \text{\&c.}
$$

<!-- PDF 48, trang in 20 -->

**18.** Vậy rõ là các differentia này, nếu số mũ của $x$ không phải là một số nguyên dương,
thì tiến ra vô hạn, tức gồm vô số số hạng. Tuy vậy, chính những differentia ấy cũng có thể
biểu thị bằng một biểu thức hữu hạn. Vì khi đặt $y = x^{-1} = \frac{1}{x}$, ta có
$y^{\mathrm{I}} = \frac{1}{x+\omega}$, nên

$$
\Delta.x^{-1} = \Delta.\frac{1}{x} = \frac{1}{x+\omega} - \frac{1}{x};
$$

từ đó, nếu chuyển phân số $\frac{1}{x+\omega}$ thành chuỗi, sẽ ra biểu thức ở trên. Tương tự
sẽ có

$$
\Delta.x^{-2} = \Delta.\frac{1}{xx} = \frac{1}{(x+\omega)^2} - \frac{1}{xx},
$$

và với các lượng vô tỉ sẽ có

$$
\Delta.\sqrt{x} = \sqrt{(x+\omega)} - \sqrt{x}, \qquad
\Delta.\frac{1}{\sqrt{x}} = \frac{1}{\sqrt{(x+\omega)}} - \frac{1}{\sqrt{x}};
$$

những công thức này, nếu khai triển thành chuỗi theo lối thường, sẽ cho các biểu thức ở trên.

**19.** Theo cách này cũng có thể tìm được differentia của các functio, dù là phân thức hay
vô tỉ: chẳng hạn, nếu cần tìm differentia bậc nhất của phân thức $\frac{1}{aa+xx}$, ta đặt

$$
y = \frac{1}{aa+xx}; \qquad \&, \quad \text{vì } y^{\mathrm{I}} = \frac{1}{aa+xx+2\omega x+\omega^2}
$$

nên

$$
\Delta y = \Delta.\frac{1}{aa+xx} = \frac{1}{aa+xx+2\omega x+\omega\omega} - \frac{1}{aa+xx},
$$

biểu thức này cũng có thể chuyển thành một chuỗi vô hạn.

<!-- PDF 49, trang in 21 -->

Đặt $aa+xx = P$ và $2\omega x + \omega\omega = Q$; ta sẽ có

$$
\frac{1}{P+Q} = \frac{1}{P} - \frac{Q}{P^2} + \frac{Q^2}{P^3} - \frac{Q^3}{P^4}
              + \text{\&c.}
$$

và

$$
\Delta y = -\frac{Q}{P^2} + \frac{Q^2}{P^3} - \frac{Q^3}{P^4} + \text{\&c.}
$$

Vậy thay lại các giá trị vào chỗ của $P$ và $Q$, ta sẽ có:

$$
\Delta y = \Delta.\frac{1}{aa+xx}
= -\frac{2\omega x+\omega\omega}{(aa+xx)^2}
  + \frac{4\omega\omega\,xx + 4\omega^3x + \omega^4}{(aa+xx)^3}
  - \frac{8\omega^3x^3 + 12\omega^4x^2 + 6\omega^5x + \omega^6}{(aa+xx^4}
  + \text{\&c.}
$$

nếu sắp các số hạng này theo lũy thừa của $\omega$, sẽ có:

$$
\Delta.\frac{1}{aa+xx}
= -\frac{2\omega x}{(aa+xx)^2}
  + \frac{3\omega^2(xx-aa)}{(aa+xx)^3}
  - \frac{4\omega^3(x^3-aax)}{(aa+xx)^4} + \text{\&c.}
$$

<!-- Ghi chú dịch giả: hai chỗ trên PDF 49 giữ như bản in. (1) Mẫu số của số hạng thứ ba ở
     dòng trên in là "(aa+xx⁴", thiếu dấu ngoặc đóng. (2) Ở dòng dưới, số hạng bậc ω² in
     là "…ω²(xx−aa)" với một chữ số nhỏ đứng trước ω²; chữ số này nhòe, đọc là 3 nhưng
     không chắc (có thể là 2). Khai triển đúng cho ω²(3xx−aa)/(aa+xx)³, nên dù đọc là 2
     hay 3 thì bản in cũng lệch với khai triển. -->

**20.** Bằng những chuỗi vô hạn tương tự, differentia của các functio vô tỉ cũng có thể được
biểu thị. Cho functio

$$
y = \sqrt{aa+xx};
$$

và, vì $y^{\mathrm{I}} = \sqrt{aa+xx+2\omega x+\omega\omega}$, đặt $aa+xx = P$ và
$2\omega x + \omega\omega = Q$, ta sẽ có

$$
\Delta v = \sqrt{P+Q} - \sqrt{P}
= \frac{Q}{2\sqrt{P}} - \frac{QQ}{8P\sqrt{P}} + \frac{Q^3}{16P^2\sqrt{P}}
- \text{\&c.}
$$

<!-- Ghi chú dịch giả: vế trái của dòng này bản in ghi "Δv" (PDF 49), không phải Δy như
     ở dòng tiếp theo. Đã giữ như bản in. -->

<!-- PDF 50, trang in 22 -->

từ đó sẽ có

$$
\Delta y = \Delta.\sqrt{aa+xx}
= \frac{2\omega x+\omega\omega}{2\sqrt{aa+xx}}
  - \frac{4\omega^2x^2 - 4\omega^3x - \omega^4}{8(aa+xx)\sqrt{aa+xx}}
  + \text{\&c.}
$$

hoặc

$$
= \frac{\omega x}{\sqrt{aa+xx}}
  + \frac{aa\omega^2}{2(aa+xx)\sqrt{aa+xx}}
  - \frac{aa\omega^3x}{2(aa+xx)^2\sqrt{aa+xx}}\ \text{\&c.}
$$

Và từ đây ta rút ra rằng differentia của một functio bất kỳ của $x$, gọi là $y$, có thể biểu
thị theo dạng sau, sao cho

$$
\Delta y = -P\omega + Q\omega^2 + R\omega^3 + S\omega^4 + \text{\&c.}
$$

trong đó $P$, $Q$, $R$, $S$, &c. là những functio xác định của $x$, mà trong mỗi trường hợp
đều có thể xác định từ functio $y$.

<!-- Ghi chú dịch giả: dấu trừ trước Pω là đúng như bản in (PDF 50); ở §22 cùng dạng này
     được in với +Pω. -->

**21.** Các differentia của những functio siêu việt cũng không bị loại khỏi dạng này; điều ấy
sẽ hiện ra rõ hơn qua các ví dụ sau.

### Exemplum I

*Tìm differentia bậc nhất của logarithmus hyperbolicus của $x$.*

Đặt $y = \ln x$; và vì $y^{\mathrm{I}} = \ln(x+\omega)$, ta sẽ có

$$
\Delta y = y^{\mathrm{I}} - y = \ln(x+\omega) - \ln x = \ln\left(1 + \frac{\omega}{x}\right).
$$

Mà ở trên ta đã chỉ cách biểu thị một logarithmus như thế bằng một chuỗi vô hạn; dùng chuỗi
ấy, ta sẽ có

$$
\Delta y = \Delta.\ln x = \frac{\omega}{x} - \frac{\omega^2}{2xx}
          + \frac{\omega^3}{3x^3} - \frac{\omega^4}{4x^4} + \text{\&c.}
$$

<!-- PDF 51, trang in 23 -->

### Exemplum II

*Tìm differentia bậc nhất của lượng exponentialis $a^x$.*

Đặt $y = a^x$, ta sẽ có $y^{\mathrm{I}} = a^{x+\omega} = a^x.a^\omega$:

nhưng ở trên ta đã chỉ ra rằng

$$
a^\omega = 1 + \frac{\omega\ln a}{1} + \frac{\omega^2(\ln a)^2}{1\cdot 2}
          + \frac{\omega^3(\ln a)^3}{1\cdot 2\cdot 3} + \text{\&c.}
$$

thay giá trị này vào, ta sẽ có

$$
\Delta.a^x = y^{\mathrm{I}} - y = \Delta y
= \frac{a^x\omega\ln a}{1} + \frac{a^x\omega^2(\ln a)^2}{1\cdot 2}
  + \frac{a^x\omega^3(\ln a)^3}{1\cdot 2\cdot 3} + \text{\&c.}
$$

### Exemplum III

*Trong đường tròn có bán kính $= 1$, tìm differentia của sin của cung $x$.*

Đặt $\sin x = y$, ta sẽ có $y^{\mathrm{I}} = \sin(x+\omega)$, từ đó

$$
\Delta y = y^{\mathrm{I}} - y = \sin(x+\omega) - \sin x.
$$

Mà $\sin(x+\omega) = \cos\omega.\sin x + \sin\omega.\cos x$, và bằng các chuỗi vô hạn ta đã
chỉ ra rằng

$$
\cos\omega = 1 - \frac{\omega^2}{1\cdot 2} + \frac{\omega^4}{1\cdot 2\cdot 3\cdot 4}
             - \frac{\omega^6}{1\cdot 2\cdot 3\cdot 4\cdot 5\cdot 6} + \text{\&c.}
$$

và

$$
\sin\omega = \omega - \frac{\omega^3}{1\cdot 2\cdot 3}
             + \frac{\omega^5}{1\cdot 2\cdot 3\cdot 4\cdot 5}
             - \frac{\omega^7}{1\cdot 2\cdot 3\cdot 4\cdot 5\cdot 6\cdot 7}
             + \text{\&c.}
$$

thay các chuỗi này vào, ta sẽ có:

$$
\Delta.\sin x = \omega.\cos x - \frac{\omega^2}{2}\sin x - \frac{\omega^3}{6}\cos x
             + \frac{\omega^4}{24}\sin x + \frac{\omega^5}{120}\cos x - \text{\&c.}
$$

<!-- PDF 52, trang in 24 -->

### Exemplum IV

*Trong đường tròn có bán kính $= 1$, tìm differentia của cosin của cung $x$.*

Đặt $y = \cos x$; vì $y^{\mathrm{I}} = \cos(x+\omega)$, ta sẽ có

$$
y^{\mathrm{I}} = \cos\omega.\cos x - \sin\omega.\sin x
$$

và

$$
\Delta y = \cos\omega.\cos x - \sin\omega.\sin x - \cos x
$$

Vậy dùng các chuỗi đã trình bày ở trên, sẽ ra:

$$
\Delta.\cos x = -\omega\sin x - \frac{\omega^2}{2}\cos x
             + \frac{\omega^3}{6}\sin x + \frac{\omega^4}{24}\cos x
             - \frac{\omega^5}{120}\sin x - \text{\&c.}
$$

**22.** Vậy vì, với một functio bất kỳ của $x$, dù đại số hay siêu việt, gọi là $y$,
differentia bậc nhất của nó có dạng sao cho

$$
\Delta y = P\omega + Q\omega^2 + R\omega^3 + S\omega^4 + \text{\&c.}
$$

nên nếu lại lấy differentia của nó, sẽ rõ là differentia bậc hai của $y$ sẽ có dạng như sau:

$$
\Delta\Delta y = P\omega^2 + Q\omega^3 + R\omega^4 + \text{\&c.}
$$

và tương tự, differentia bậc ba của $y$ sẽ có dạng

$$
\Delta^3 y = P\omega^3 + Q\omega^4 + R\omega^5 + \text{\&c.}
$$

và cứ thế tiếp.

> **[Chú giải]**
>
> **Cùng một chữ cách, khác nghĩa mỗi lần**
>
> Các công thức trên trông rất giống nhau, dễ khiến ta tưởng rằng $P$ trong
> $\Delta y$ và $P$ trong $\Delta^2 y$ là cùng một hàm số của $x$. Không phải vậy.
>
> Euler nói thẳng ở đây: các chữ $P, Q, R$, &c. không phải là những giá trị đã định,
> và cùng một chữ ở những differentia khác nhau không biểu thị cùng một functio của $x$.
> Ông chỉ dùng lại chữ ấy cho tiện, vì nếu mỗi bậc lại đặt một bộ chữ mới thì số chữ
> cái sẽ không đủ dùng.
>
> Nói cách khác, ký hiệu ở đây được dùng như chỗ trống để điền, chứ không phải như
> một hằng số cố định. Đọc theo cách của ký hiệu quen thuộc sẽ ra một kết quả sai.

Ở đây cần lưu ý rằng các chữ $P$, $Q$, $R$, &c. ở đây không được dùng cho những giá trị
xác định, và cùng một chữ trong những differentia khác nhau không biểu thị cùng một functio
của $x$: tôi dùng cùng những chữ ấy chỉ vì để khỏi thiếu đủ số chữ cái khác nhau.

Ngoài ra, *những dạng differentia này* cần được *ghi nhận kỹ*, vì chúng có công dụng rất lớn
trong Giải tích vô hạn.

<!-- PDF 53, trang in 25 -->

**23.** Vậy vì tôi đã trình bày cách tìm differentia bậc nhất của một functio bất kỳ, rồi từ
nó tìm tiếp các differentia của những bậc sau, là những differentia được tìm ra từ các giá
trị liên tiếp của functio $y$, tức $y^{\mathrm{I}}$, $y^{\mathrm{II}}$, $y^{\mathrm{III}}$,
$y^{\mathrm{IV}}$, &c., thì ngược lại, khi đã cho các differentia mọi bậc của $y$, cũng có
thể rút ra chính những giá trị biến đổi ấy của $y$. Vì ta sẽ có

$$
\begin{aligned}
y^{\mathrm{I}} &= y + \Delta y\\
y^{\mathrm{II}} &= y + 2\Delta y + \Delta\Delta y\\
y^{\mathrm{III}} &= y + 3\Delta y + 3\Delta\Delta y + \Delta^3y\\
y^{\mathrm{IV}} &= y + 4\Delta y + 6\Delta\Delta y + 4\Delta^3y + \Delta^4y\\
&\text{\&c.}
\end{aligned}
$$

trong đó các hệ số bằng số lại sinh ra từ khai triển của nhị thức. Vậy cũng như
$y^{\mathrm{I}}$, $y^{\mathrm{II}}$, $y^{\mathrm{III}}$, &c. là những giá trị của $y$ sinh ra
khi ở chỗ của $x$ ta lần lượt đặt các giá trị $x+\omega$, $x+2\omega$, $x+3\omega$, &c., ta
có thể lập tức chỉ ra giá trị của $y^{(n)}$, tức giá trị sinh ra khi ở chỗ của $x$ ta viết
$x+n\omega$; cụ thể, giá trị ấy sẽ là:

$$
y + \frac{n}{1}\Delta y + \frac{n(n-1)}{1\cdot 2}\Delta^2y
  + \frac{n(n-1)}{1\cdot 2}\cdot\frac{(n-2)}{3}\Delta^3y + \text{\&c.}
$$

Và từ đây cũng có thể cho được các giá trị của $y$ nếu $n$ là số âm. Chẳng hạn, nếu ở chỗ của
$x$ ta đặt $x-\omega$, functio $y$ sẽ chuyển thành dạng này:

$$
y - \Delta y + \Delta^2y - \Delta^3y + \Delta^4y - \text{\&c.}
$$

<!-- PDF 54, trang in 26 -->

còn nếu ở chỗ của $x$ ta đặt $x-2\omega$, functio $y$ sẽ chuyển thành:

$$
y - 2\Delta y + 3\Delta^2y - 4\Delta^3y + 5\Delta^4y - \text{\&c.}
$$

**24.** Ta hãy thêm vài điều về phương pháp ngược, theo đó, nếu đã cho một differentia, thì
từ nó phải tìm ra chính functio mà nó là differentia. Nhưng vì việc này rất khó và nhiều khi
đòi hỏi chính giải tích vô hạn, ta chỉ khai triển một vài trường hợp dễ hơn. Vậy trước hết,
đi ngược lại: nếu ta đã tìm được differentia của một functio nào đó, thì ngược lại, khi cho
differentia ấy, có thể chỉ ra chính functio đã sinh ra nó. Chẳng hạn, vì differentia của
functio $ax + b$ là $a\omega$, nếu hỏi $a\omega$ là differentia của functio nào, thì câu trả
lời có sẵn: functio ấy là $ax + b$. Vậy trong đó có một lượng constans $b$ vốn không có mặt
trong differentia, và vì thế tùy thuộc vào ý muốn của ta. Mà luôn luôn, nếu differentia của
một functio bất kỳ $P$ là $Q$, thì differentia của functio $P + A$ (với $A$ là một lượng
constans bất kỳ) cũng sẽ là $Q$. Do đó, nếu cho differentia $Q$ ấy, thì functio đã sinh ra
nó sẽ là $P + A$, và vì thế nó không có giá trị xác định, bởi hằng $A$ tùy ý.

**25.** Ta hãy gọi functio cần tìm, tức functio mà differentia của nó được cho, là
$\mathrm{SUMMAM}$; tên này dùng tiện, một là vì tổng thường được đặt đối lập với
differentia, hai là vì functio cần tìm thực sự là tổng của mọi giá trị đứng trước của
differentia. Vì cũng như

<!-- PDF 55, trang in 27 -->

$y^{\mathrm{I}} = y + \Delta y$, và $y^{\mathrm{II}} = y + \Delta y + \Delta y^{\mathrm{I}}$,
nếu ta kéo dài các giá trị của $y$ về phía sau, sao cho giá trị ứng với $x-\omega$ được viết là
$y_{\mathrm{I}}$, giá trị đứng trước nó là $y_{\mathrm{II}}$, và các giá trị đứng trước xa hơn
nữa là $y_{\mathrm{III}}$, $y_{\mathrm{IV}}$, $y_{\mathrm{V}}$, &c., rồi từ đó lập chuỗi đi
ngược, cùng với các differentia của nó:

$$
y_{\mathrm{V}}\,;\quad y_{\mathrm{IV}}\,;\quad y_{\mathrm{III}}\,;\quad y_{\mathrm{II}}\,;\quad y_{\mathrm{I}}\,;\quad y
$$

và

$$
\Delta y_{\mathrm{V}}\,;\quad \Delta y_{\mathrm{IV}}\,;\quad \Delta y_{\mathrm{III}}\,;\quad
\Delta y_{\mathrm{II}}\,;\quad \Delta y_{\mathrm{I}}
$$

thì sẽ có

$$
y = \Delta y_{\mathrm{I}} + y_{\mathrm{I}}
$$

&, vì $y_{\mathrm{I}} = \Delta y_{\mathrm{II}} + y_{\mathrm{II}}$, và tiếp nữa
$y_{\mathrm{II}} = \Delta y_{\mathrm{III}} + y_{\mathrm{III}}$, nên hẳn sẽ có

$$
y = \Delta y_{\mathrm{I}} + \Delta y_{\mathrm{II}} + \Delta y_{\mathrm{III}} + \Delta y_{\mathrm{IV}} + \Delta y_{\mathrm{V}}
\quad \text{\&c.}
$$

và như vậy functio $y$, có differentia là $\Delta y$, sẽ là tổng của mọi giá trị đứng trước
của differentia $\Delta y$, tức những giá trị sinh ra khi ở chỗ của $x$ ta viết các giá trị
đứng trước $x-\omega$; $x-2\omega$; $x-3\omega$; &c.

**26.** Cũng như để chỉ differentia ta đã dùng dấu $\Delta$, ta sẽ chỉ tổng bằng dấu
$\Sigma$: cụ thể, nếu differentia của functio $y$ là $z$, thì $z = \Delta y$; từ đó, nếu cho
$y$, ở trên ta đã chỉ cách tìm differentia $z$. Còn nếu cho differentia $z$ và phải tìm tổng
$y$ của nó, thì sẽ có $y = \Sigma z$; và như vậy, đi ngược từ phương trình $z = \Delta y$, ta
lập được phương trình $y = \Sigma z$; ở đó có thể cộng thêm một lượng constans bất kỳ, vì những

<!-- PDF 56, trang in 28 -->

lý do đã nêu ở trên; bởi thế phương trình $z = \Delta y$, nếu đảo lại, cũng sẽ cho
$y = \Sigma z + C$. Kế đó, vì differentia của lượng $ay$ là $a\Delta y = az$, nên sẽ có
$\Sigma az = ay$, miễn là $a$ là lượng constans. Vậy vì $\Delta x = \omega$, nên sẽ có
$\Sigma\omega = x + C$ và $\Sigma a\omega = ax + C$; và vì $\omega$ là lượng constans, sẽ có
$\Sigma\omega^2 = \omega x + C$; $\Sigma\omega^3 = \omega^2x + C$; và cứ thế tiếp.

**27.** Vậy nếu ta đảo ngược các differentia của các lũy thừa của $x$ đã tìm được ở trên, sẽ
có

$$
\Sigma\omega = x; \quad \text{hincque} \quad \Sigma 1 = \frac{x}{\omega};
$$

Kế đó ta có

$$
\Sigma(2\omega x + \omega^2) = x^2;
$$

từ đó thành

$$
\Sigma x = \frac{x^2}{2\omega} - \Sigma\frac{\omega}{2}
         = \frac{x^2}{2\omega} - \frac{x}{2}.
$$

Tiếp nữa ta có

$$
\Sigma(3\omega xx + 3\omega^2x + \omega^3) = x^3
$$

hay

$$
3\omega\Sigma x^2 + 3\omega^2\Sigma x + \omega^3\Sigma 1 = x^3
$$

vậy

$$
\Sigma x^2 = \frac{x^3}{3\omega} - \omega\Sigma x - \frac{\omega^2}{3}\Sigma 1
$$

hay

$$
\Sigma x^3 = \frac{x^3}{3\omega} - \frac{x^2}{2} + \frac{\omega x}{6}
$$

<!-- Ghi chú dịch giả: số mũ ở vế trái dòng "seu" này (PDF 56) nhòe; một lần soi trước đọc
     là 3, lần soi này không phân biệt chắc được 2 hay 3 [OCR không rõ]. Theo mạch thì
     phải là Σx². Đã giữ cách đọc x³ của lần soi trước. -->

tương tự sẽ có

$$
\Sigma x^3 = \frac{x^4}{4\omega} - \frac{3\omega}{2}\Sigma x^2
            - \omega^2\Sigma x - \frac{\omega^3}{4}\Sigma 1
$$

<!-- PDF 57, trang in 29 -->

trong đó, nếu thay $\Sigma x^2$, $\Sigma x$ và $\Sigma 1$ bằng những giá trị đã tìm ra ở trên,
ta sẽ được

$$
\Sigma x^3 = \frac{x^4}{4\omega} - \frac{x^3}{2} + \frac{\omega xx}{4}.
$$

Rồi, vì có

$$
\Sigma x^4 = \frac{x^5}{5\omega} - 2\omega\Sigma x^3 - 2\omega^2\Sigma x^2
            - \omega^3\Sigma x - \frac{\omega^4}{5}\Sigma 1
$$

nên, sau khi thay thế, ta sẽ có

$$
\Sigma x^4 = \frac{x^5}{5\omega} - \frac{1}{2}x^4 + \frac{1}{3}\omega x^3
            - \frac{1}{30}\omega^3x
$$

và theo cách tương tự, tiến triển thêm ta sẽ tìm được

$$
\Sigma x^5 = \frac{x^6}{6\omega} - \frac{1}{2}x^5 + \frac{5}{12}\omega x^4
            - \frac{1}{12}\omega^3x^2
$$

và

$$
\Sigma x^6 = \frac{x^7}{7\omega} - \frac{1}{2}x^6 + \frac{1}{2}\omega x^5
            - \frac{1}{6}\omega^3x^3 + \frac{1}{42}\omega^5x
$$

những biểu thức mà ở phần dưới ta sẽ chỉ cách tìm dễ hơn.

**28.** Vậy nếu differentia đã cho là một functio rationalis nguyên của $x$, thì tổng của nó
(tức functio mà nó là differentia) dễ dàng tìm được từ những công thức này. Vì differentia
gồm một vài lũy thừa của $x$, nên hãy tìm tổng của từng số hạng, rồi cộng tất cả các tổng ấy
lại.

### Exemplum I

*Hãy tìm functio mà differentia của nó là $= axx + bx + c$.*

Tìm tổng của từng số hạng nhờ các công thức đã tìm ra trước đây, ta sẽ có

<!-- PDF 58, trang in 30 -->

$$
\Sigma axx = \frac{ax^3}{3\omega} - \frac{axx}{2} + \frac{a\omega x}{6}
$$

và

$$
\Sigma bx = \quad\ldots\quad \frac{bxx}{2\omega} - \frac{bx}{2}
$$

rồi

$$
\Sigma c = \quad\ldots\quad\ldots\quad\ldots\quad \frac{cx}{\omega}
$$

Từ đó, cộng các tổng này lại, ta sẽ có

$$
\Sigma(axx+bx+c) = \frac{a}{3\omega}x^3 - \frac{(a\omega-b)}{2\omega}x^2
                 + \frac{(a\omega^2-3b\omega+6c)}{6\omega}x + C
$$

đó chính là functio đang tìm, có differentia là $axx+bx+c$.

### Exemplum II

*Hãy tìm functio mà differentia của nó là $x^4-2\omega^2xx+\omega^4$.*

Làm phép tính theo cách tương tự, sẽ có

$$
\Sigma x^4 = \frac{1}{5\omega}x^5 - \frac{1}{2}x^4 + \frac{1}{3}\omega x^3
            - \frac{1}{30}\omega x^3
$$

và

$$
- \Sigma 2\omega^2 x^2 = \quad\ldots - \frac{2\omega}{3}x^3 + \omega^2x^2
                      - \frac{\omega^3}{3}x
$$

rồi

$$
+ \Sigma\omega^4 = \quad\ldots\quad\ldots\quad\ldots\quad + \omega^3x
$$

nên functio đang tìm sẽ là

$$
\frac{1}{5\omega}x^5 - \frac{1}{2}x^4 - \frac{1}{3}\omega x^3 + \omega^2x^2
+ \frac{19}{30}\omega^3x + C
$$

Vì nếu ở đây, ở chỗ của $x$, ta đặt $x+\omega$, rồi lấy lượng thu được trừ đi biểu thức
vừa tìm ra này, thì sẽ còn lại differentia đã cho $x^4-2\omega^2x^2+\omega^4$.

<!-- PDF 59, trang in 31 -->

**29.** Nếu xem xét kỹ hơn những tổng mà ta đã tìm được cho các lũy thừa của $x$, thì ở các
số hạng thứ nhất, thứ hai và một số số hạng nữa, ta sẽ sớm nhận ra quy luật mà chúng tiến theo từng lũy
thừa một: còn quy luật của các số hạng còn lại thì không rõ đến mức từ đó có thể rút ra tổng
của lũy thừa $x^n$ nói chung. Tuy vậy, ở phần sau sẽ chỉ ra rằng:

$$
\Sigma x^n =
\frac{x^{n+1}}{(n+1)\omega}
- \frac{1}{2}x^n
+ \frac{1}{2}\cdot\frac{n\omega}{2\cdot 3}\,x^{n-1}
- \frac{1}{6}\cdot\frac{n(n-1)(n-2)\omega^3}{2\cdot 3\cdot 4\cdot 5}\,x^{n-3}
$$

$$
+ \frac{1}{6}\cdot\frac{n(n-1)(n-2)(n-3)(n-4)\omega^5}{2\cdot 3\cdot 4\cdot 5\cdot 6\cdot 7}\,x^{n-5}
- \frac{3}{10}\cdot\frac{n(n-1)\;.\;.\;.\;(n-6)\omega^7}{2\cdot 3\;.\;.\;.\;8\cdot 9}\,x^{n-7}
+ \frac{5}{6}\cdot\frac{n(n-1)\;.\;.\;.\;(n-8)\omega^9}{2\cdot 3\;.\;.\;.\;10\cdot 11}\,x^{n-9}
$$

$$
- \frac{691}{210}\cdot\frac{n(n-1)\;.\;.\;.\;(n-10)\omega^{11}}{2\cdot 3\;.\;.\;.\;12\cdot 13}\,x^{n-11}
+ \frac{35}{2}\cdot\frac{n(n-1)\;.\;.\;.\;n-12)\omega^{13}}{2\cdot 3\;.\;.\;.\;14\cdot 15}\,x^{n-13}
- \frac{3617}{30}\cdot\frac{n(n-1)\;.\;.\;.\;(n-14)\omega^{15}}{2\cdot 3\;.\;.\;.\;16\cdot 17}\,x^{n-15}
$$

$$
+ \frac{43867}{42}\cdot\frac{n(n-1)\;.\;.\;.\;(n-16)\omega^{17}}{2\cdot 3\;.\;.\;.\;18\cdot 19}\,x^{n-17}
- \frac{1222277}{110}\cdot\frac{n(n-1)\;.\;.\;.\;(n-18)\omega^{19}}{2\cdot 3\;.\;.\;.\;20\cdot 21}\,x^{n-19}
+ \frac{854513}{6}\cdot\frac{n(n-1)\;.\;.\;.\;(n-20)\omega^{21}}{2\cdot 3\;.\;.\;.\;22\cdot 23}\,x^{n-21}
$$

---

<!-- Ghi chú dịch giả: ở số hạng 35/2, bản in viết "n−12)" không có dấu mở ngoặc (PDF 59).
     Đã giữ như bản in. -->

<!-- PDF 60, trang in 32 -->

$$
- \frac{1181820455}{546}\cdot\frac{n(n-1)\;.\;.\;.\;(n-22)\omega^{23}}{2\cdot 3\;.\;.\;.\;24\cdot 25}\,x^{n-23}
+ \frac{76977927}{2}\cdot\frac{n(n-1)\;.\;.\;.\;(n-24)\omega^{25}}{2\cdot 3\;.\;.\;.\;26\cdot 27}\,x^{n-25}
$$

$$
- \frac{23749461029}{30}\cdot\frac{n(n-1)\;.\;.\;.\;(n-26)\omega^{27}}{2\cdot 3\;.\;.\;.\;28\cdot 29}\,x^{n-27}
+ \frac{8615841276005}{462}\cdot\frac{n(n-1)\;.\;.\;.\;(n-28)\omega^{29}}{2\cdot 3\;.\;.\;.\;30\cdot 31}\,x^{n-29}
$$

$$
\text{\&c.} + C
$$

trọng tâm của dãy này nằm ở các hệ số thuần túy bằng số; còn chúng được lập ra thế nào thì
đây chưa phải chỗ có thể trình bày.

<!-- Ghi chú dịch giả: bốn hệ số của trang này cũng khớp quy luật đã ghi ở trang 59.
     1181820455/546 = B24·25, 76977927/2 = B26·27, 23749461029/30 = B28·29,
     8615841276005/462 = B30·31. Quy luật vậy là hệ số in ra bằng |B2m|·(2m+1), dấu
     luân phiên; Euler không nói tới số Bernoulli. -->

**30.** Còn rõ là, nếu $n$ không phải số nguyên dương, thì biểu thức này của tổng tiến ra vô
hạn, và theo cách này không thể biểu thị tổng ở dạng hữu hạn. Ngoài ra, cần lưu ý ở đây rằng
không phải mọi lũy thừa của $x$ thấp hơn lũy thừa đã cho $x^n$ đều xuất hiện; vì thiếu các số
hạng $x^{n-2}$, $x^{n-4}$, $x^{n-6}$, $x^{n-8}$, &c., bởi hệ số của chúng $= 0$, dù hệ số của
số hạng thứ hai $x^n$ không theo quy luật ấy mà $= -\frac{1}{2}$. Vậy nhờ biểu thức này, tổng
của những lũy thừa có số mũ âm hoặc phân số có thể được biểu thị ở dạng vô hạn, chỉ trừ
trường hợp $n = -1$, vì khi ấy số hạng $\frac{x^{n+1}}{(n+1)\omega}$ trở thành vô hạn do
$n + 1 = 0$. Chẳng hạn, đặt $n = -2$; sẽ có

<!-- PDF 61, trang in 33 -->

$$
\Sigma\frac{1}{xx} = C - \frac{1}{\omega x} - \frac{1}{2xx} - \frac{1}{2}\cdot\frac{\omega}{3x^3} + \frac{1}{6}\cdot\frac{\omega^3}{5x^5}
$$

$$
- \frac{1}{6}\cdot\frac{\omega^5}{7x^7} + \frac{3}{10}\cdot\frac{\omega^7}{9x^9} - \frac{5}{6}\cdot\frac{\omega^9}{11x^{11}} + \frac{691}{210}\cdot\frac{\omega^{11}}{13x^{13}}
$$

$$
- \frac{35}{2}\cdot\frac{\omega^{13}}{15x^{15}} + \frac{3617}{30}\cdot\frac{\omega^{15}}{17x^{17}} - \text{\&c.}
$$

<!-- Ghi chú dịch giả: tám hệ số của trang này cũng theo đúng quy luật |B2m|·(2m+1) đã
     ghi ở trang 59: 1/2 = B2·3, 1/6 = B4·5, 1/6 = B6·7, 3/10 = B8·9, 5/6 = B10·11,
     691/210 = B12·13, 35/2 = B14·15, 3617/30 = B16·17. Nét chữ các phân số nhỏ ở đây
     rất mờ, dễ đọc nhầm 1/2 thành 1/4. -->

**31.** Vậy nếu differentia đã cho là một lũy thừa bất kỳ của $x$, thì từ đây luôn có thể chỉ
ra tổng của nó, tức có thể biểu thị functio mà nó là differentia. Còn nếu differentia đã cho
có dạng khác, đến mức không thể chia nó thành các lũy thừa của $x$ như thành các phần, thì
tổng rất khó tìm, và nhiều khi hoàn toàn không thể tìm được: trừ khi tình cờ thấy rõ nó sinh
ra từ một functio nào đó. Vì lẽ ấy, nên khảo sát differentia của nhiều functio và ghi nhận
chúng cẩn thận, để hễ khi nào một differentia như thế được cho, thì tổng của nó, tức functio
đã sinh ra nó, có thể được chỉ ra ngay. Tuy vậy, phương pháp vô hạn sẽ cung cấp nhiều quy
tắc, nhờ đó việc tìm tổng sẽ được trợ giúp một cách lạ lùng.

**32.** Còn tổng cần tìm thường tìm được dễ hơn nếu differentia đã cho gồm những thừa số đơn
giản lập thành một cấp số cộng có công sai chính là lượng $\omega$. Chẳng hạn, cho functio
$(x+\omega)(x+2\omega)$ và cần tìm differentia của nó: vì khi đặt $x+\omega$ vào chỗ của $x$,
functio này chuyển thành $(x+2\omega)$

<!-- PDF 62, trang in 34 -->

$(x+3\omega)$, differentia của nó sẽ là $2\omega(x+2\omega)$. Vì thế ngược lại, nếu cho
differentia $2\omega(x+2\omega)$, thì tổng của nó sẽ là $(x+\omega)(x+2\omega)$, và vậy nên sẽ
có

$$
\Sigma(x+2\omega) = \frac{1}{2\omega}(x+\omega)(x+2\omega).
$$

Tương tự, nếu cho functio $(x+n\omega)(x+(n+1)\omega)$, thì vì differentia của nó là
$2\omega(x+(n+1)\omega)$, sẽ có

$$
\Sigma(x+(n+1)\omega) = \frac{1}{2\omega}(x+n\omega)(x+(n+1)\omega)
$$

và

$$
\Sigma(x+n\omega) = \frac{1}{2\omega}(x+(n-1)\omega)(x+n\omega).
$$

**33.** Nếu functio gồm nhiều thừa số, sao cho
$y = (x+(n-1)\omega)(x+n\omega)(x+(n+1)\omega)$, thì vì

$$
y^{\mathrm{I}} = (x+n\omega)(x+(n+1)\omega)(x+(n+2)\omega),
$$

sẽ có

$$
\Delta y = 3\omega(x+n\omega)(x+(n+1)\omega)
$$

và do đó

$$
\Sigma(x+n\omega)(x+(n+1)\omega) = \frac{1}{3\omega}(x+(n-1)\omega)(x+n\omega)(x+(n+1)\omega)
$$

Theo cùng cách sẽ tìm được:

$$
\Sigma(x+n\omega)(x+(n+1)\omega)(x+(n+2)\omega) = \frac{1}{4\omega}(x+(n-1)\omega)(x+n\omega)(x+(n+1)\omega)(x+(n+2)\omega).
$$

từ đó quy luật tìm tổng, khi differentia gồm nhiều thừa số loại này, tự nó hiện ra. Còn
mặc dù

<!-- Ghi chú dịch giả: ở dòng định nghĩa y của §33 (PDF 62), chỗ giữa "(x+nω)" và
     "(n+1)ω)" bị in chồng/nhòe, trông như một dấu nhân; nhưng dấu ngoặc đóng kép ở cuối
     và dòng y^I ngay dưới cho thấy đó là thừa số (x+(n+1)ω). Đã ghi theo cách đọc ấy. -->

<!-- Ghi chú dịch giả: đã tự kiểm các công thức của trang này bằng phép lấy sai lệch.
     Với F = (1/(2ω))(x+(n-1)ω)(x+nω) thì ΔF = (x+nω); với
     F = (1/(3ω))(x+(n-1)ω)(x+nω)(x+(n+1)ω) thì ΔF = (x+nω)(x+(n+1)ω); với
     F = (1/(4ω))(x+(n-1)ω)(x+nω)(x+(n+1)ω)(x+(n+2)ω) thì
     ΔF = (x+nω)(x+(n+1)ω)(x+(n+2)ω). -->

<!-- PDF 63, trang in 35 -->

các differentia này là những functio rationalis nguyên, tổng của chúng tìm theo cách này vẫn
dễ hơn là theo phương pháp trước.

**34.** Từ đây cũng mở ra lối tìm tổng của các differentia dạng phân thức. Cho phân thức

$$
y = \frac{1}{x+n\omega};
$$

vì $y^{\mathrm{I}} = \frac{1}{x+(n+1)\omega}$, nên sẽ có

$$
\Delta y = \frac{1}{x+(n+1)\omega} - \frac{1}{x+n\omega} = \frac{-\omega}{(x+n\omega)(x+(n+1)\omega)}
$$

và do đó

$$
\Sigma\frac{1}{(x+n\omega)(x+(n+1)\omega)} = -\frac{1}{\omega}\cdot\frac{1}{x+n\omega}
$$

Lại cho

$$
y = \frac{1}{(x+n\omega)(x+(n+1)\omega)}
$$

vì $y^{\mathrm{I}} = \frac{1}{(x+(n+1)\omega)(x+(n+2)\omega)}$, nên sẽ có

$$
\Delta y = \frac{-2\omega}{(x+n\omega)(x+(n+1)\omega)(x+(n+2)\omega)}
$$

Vì thế sẽ thành

$$
\Sigma\frac{1}{(x+n\omega)(x+(n+1)\omega)(x+(n+2)\omega)} = \frac{-1}{2\omega}\cdot\frac{1}{(x+n\omega)(x+(n+1)\omega)}
$$

<!-- PDF 64, trang in 36 -->

Tương tự, tiếp nữa sẽ có

$$
\Sigma\frac{1}{(x+n\omega)(x+(n+1)\omega)(x+(n+2)\omega)(x+(n+3)\omega)} = \frac{-1}{3\omega}\cdot\frac{1}{(x+n\omega)(x+(n+1)\omega)(x+(n+2)\omega)}.
$$

**35.** Cách lấy tổng này cần được nắm vững, vì tổng của những differentia loại này không thể
tìm được bằng phương pháp trước. Còn nếu differentia lại có thêm tử số, hoặc các thừa số của
mẫu số không tiến theo cấp số cộng, thì cách chắc chắn nhất để tìm tổng là phân tích
differentia đã cho thành các phân thức đơn giản của nó; từng phân thức ấy tuy không lấy tổng
được, nhưng ghép chúng từng đôi một thì tìm được tổng bao nhiêu lần việc ấy làm được; vì chỉ
cần xét xem tổng có tìm được nhờ công thức này hay không:

$$
\Sigma\frac{1}{x+(n+1)\omega} - \Sigma\frac{1}{x+n\omega} = \frac{1}{x+n\omega}
$$

bởi tuy không tổng nào trong hai tổng này tự nó biểu thị được, nhưng hiệu của chúng thì biết.

**36.** Vậy trong những trường hợp này, công việc quy về việc phân tích mỗi phân thức thành
các phân thức đơn giản của nó, điều đã được trình bày kỹ hơn ở quyển trước. Còn nhờ đó mà tìm
được tổng như thế nào, ta sẽ chỉ ra bằng vài ví dụ.

<!-- PDF 65, trang in 37 -->

**EXEMPLUM I.**

*Tìm tổng mà differentia của nó là*

$$
\frac{3x+2\omega}{x(x+\omega)(x+2\omega)}.
$$

Phân tích differentia đã cho thành các phân thức đơn giản của nó, chúng sẽ là

$$
\frac{1}{\omega}\cdot\frac{1}{x} + \frac{1}{\omega}\cdot\frac{1}{x+\omega} - \frac{2}{\omega}\cdot\frac{1}{x+2\omega}.
$$

Giờ vì theo công thức ở trên ta có:

$$
\Sigma\frac{1}{x+n\omega} = \Sigma\frac{1}{x+(n+1)\omega} - \frac{1}{x+n\omega}
$$

nên sẽ có

$$
\Sigma\frac{1}{x} = \Sigma\frac{1}{x+\omega} - \frac{1}{x}.
$$

Do đó tổng cần tìm sẽ là

$$
\frac{1}{\omega}\Sigma\frac{1}{x} + \frac{1}{\omega}\Sigma\frac{1}{x+\omega} - \frac{2}{\omega}\Sigma\frac{1}{x+2\omega} = \frac{2}{\omega}\Sigma\frac{1}{x+\omega} - \frac{2}{\omega}\Sigma\frac{1}{x+2\omega} - \frac{1}{\omega x},
$$

mà

$$
\Sigma\frac{1}{x+\omega} = \Sigma\frac{1}{x+2\omega} - \frac{1}{x+\omega};
$$

nên tổng cần tìm sẽ là

$$
-\frac{1}{\omega x} - \frac{2}{\omega(x+\omega)} = \frac{-3x-\omega}{\omega x(x+\omega)}.
$$

<!-- Ghi chú dịch giả: đã tự kiểm ví dụ này: với A = 1/ω, B = 1/ω, C = -2/ω thì
     (3x+2ω)/(x(x+ω)(x+2ω)) = A/x + B/(x+ω) + C/(x+2ω); và với
     F = -1/(ωx) - 2/(ω(x+ω)) thì ΔF đúng bằng differentia đã cho (thử số với ω = 1,
     x = 10: ΔF = 4/165). Mọi bước trung gian, kể cả dòng "at est", đều khớp với công
     thức của §35. -->

<!-- PDF 66, trang in 38 -->

**EXEMPLUM II.**

*Tìm tổng mà differentia của nó là*

$$
\frac{3\omega}{x(x+3\omega)}.
$$

Đặt differentia này $= z$, sẽ có $z = \frac{1}{x} - \frac{1}{x+3\omega}$, và do đó

$$
\Sigma z = \Sigma\frac{1}{x} - \Sigma\frac{1}{x+3\omega} = \Sigma\frac{1}{x+\omega} -
\Sigma\frac{1}{x+3\omega} - \frac{1}{x} = \Sigma\frac{1}{x+2\omega} - \Sigma\frac{1}{x+3\omega} - \frac{1}{x} - \frac{1}{x+\omega}
$$

$$
= -\frac{1}{x} - \frac{1}{x+\omega} - \frac{1}{x+2\omega}.
$$

đó là tổng cần tìm. Vậy hễ khi nào theo cách này các dấu tổng $\Sigma$ cuối cùng triệt tiêu
lẫn nhau, thì khi ấy tổng của differentia đã cho có thể biểu thị được; còn nếu sự triệt tiêu
ấy không thành, thì đó là dấu hiệu cho thấy tổng không thể tìm được.

<!-- Ghi chú dịch giả: đã tự kiểm: với F = -1/x - 1/(x+ω) - 1/(x+2ω) thì
     ΔF = 1/x - 1/(x+3ω) = 3ω/(x(x+3ω)), đúng differentia đã cho. -->

<!-- Ghi chú dịch giả: đây là trang cuối của CAPUT I. Dưới đoạn cuối có hai gạch ngang
     trang trí; mép phải có catchword CAPUT, báo hiệu trang tiêu đề của CAPUT II ở trang kế
     (PDF 67, tr. 39: DE VSV DIFFERENTIARVM IN DOCTRINA SERIERVM). -->

<!-- Hết CAPUT I. Đã dịch đủ PDF 31-66, tức trang in 3-38, §1-§36. -->

<!-- Ghi chú dịch giả: ý ở §30 rằng các số hạng bậc chẵn bị thiếu (x^(n-2), x^(n-4), ...)
     vì hệ số bằng 0 - đúng với công thức: số mũ của các số hạng là n+1, n, n-1, n-3,
     n-5, ... nên không có số mũ n-2, n-4, n-6. -->
<!-- Ghi chú dịch giả: các hệ số 691/210, 35/2, 3617/30, 43867/42, 1222277/110,
     854513/6 đúng là các số Bernoulli B12, B14, B16, B18, B20, B22 nhân với hệ số
     (2m+1) và dấu luân phiên. Cụ thể, chia mỗi hệ số in ra cho (2m)(2m+1) thì thu được
     đúng 1/6, 1/30, 1/42, 1/30, 5/66, 691/2730, 7/6, 3617/510, 43867/798, 174611/330,
     854513/138, tức |B2|, |B4|, ..., |B22|. Nhận xét này là của người dịch; ở §29 Euler
     không nói tới số Bernoulli. -->

<!-- Ghi chú dịch giả: đã thử công thức §29 với n = 3, 4, 5, 6 và thấy khớp đúng những
     dòng đã in ở §27 (PDF 57), kể cả hệ số 1/12 của số hạng cuối dòng Σx⁵. -->
<!-- Ghi chú dịch giả: ở dòng trung gian của EXEMPLUM II của §28, số hạng cuối in ra là
     -(1/30)ωx³, trong khi phải là -(1/30)ω³x. Cùng công thức ở trang 57 đã in đúng là
     -(1/30)ω³x. Giữ nguyên như in. Dòng kết quả cuối cùng thì đúng, nên sự sai chỉ nằm ở
     dòng trung gian. -->

<!-- Ghi chú dịch giả: đã tự kiểm dòng kết quả của EXEMPLUM II của §28: lấy sai lệch của
     F = x⁵/(5ω) - x⁴/2 - (ω/3)x³ + ω²x² + (19/30)ω³x cho đúng x⁴ - 2ω²x² + ω⁴. Ba dòng
     tổng ở EXEMPLUM I cũng đã kiểm và đều khớp với các tổng đã tìm ở §27. -->

<!-- Ghi chú dịch giả: các dòng Σx³, Σx⁴, Σx⁵, Σx⁶ ở trang 57 đã tự kiểm và đều đúng, tức
     lấy sai lệch cho đúng x³, x⁴, x⁵, x⁶. -->

<!-- Ghi chú dịch giả: bảng ở §14: số 150 ở hàng Δ³y đọc trên scan là 150, không phải 510
     như lớp OCR gợi ý. Số 5796 ở hàng Δ³y và 40824 ở hàng Δ⁴y đã đối chiếu bằng quy tắc
     truy hồi của chính Euler: 5·(1800+1560) = 16800 khớp đúng. -->

<!-- Ghi chú dịch giả: danh sách ở cuối trang 46 chỉ nêu số mũ dương; phần mở rộng sang
     số mũ âm và phân số mà §17 hứa ở phần dẫn nằm ngay ở trang 47. Các dòng ở trang 47
     (kể cả x⁻⁴ với 10ω²/x⁶ và dòng cuối x^(−1/3)) đều khớp với khai triển nhị thức. -->

<!-- Ghi chú dịch giả: ở §19, Euler viết ω² ở dòng y^I (aa+xx+2ωx+ω²) rồi lại viết ωω
     ở dòng Δy ngay dưới (aa+xx+2ωx+ωω), dù hai chỗ này cùng một biểu thức. Giữ nguyên,
     không thống nhất hoá. -->

<!-- Ghi chú dịch giả: ở trang 50, dòng đầu của phần nối §20, tử số in ra là
     4ω²x² - 4ω³x - ω⁴, tức hai số hạng sau mang dấu trừ. Nhưng -(2ωx+ω²)²
     = -(4ω²x² + 4ω³x + ω⁴), nên hai dấu ấy phải là dấu cộng. Dòng "hoặc" ngay dưới thì
     đúng. Đã chép nguyên như in. -->
