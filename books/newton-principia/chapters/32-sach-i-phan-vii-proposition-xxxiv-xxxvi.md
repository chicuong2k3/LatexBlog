---
title: "Sách I, Phần VII. Proposition XXXIV–XXXVI"
summary: "Tốc độ vật thể rơi trên parabol, sự tương đương với chuyển động tròn, và cách xác định thời gian rơi."
slug: "sach-i-phan-vii-proposition-xxxiv-xxxvi"
number: 32
---

![Chuyển động rơi thẳng và so sánh với đường tròn](../assets/section-vii-rectilinear-motion.svg)

*Hình 20. Sơ đồ được dựng lại từ các hình bản gốc; cần đối chiếu ký hiệu với scan.*

## Proposition XXXIV. Định lý X

Nếu hình $BED$ là parabol, tôi nói rằng vận tốc của vật thể rơi tại một nơi $C$ bằng vận tốc mà một vật thể có thể mô tả đều một đường tròn quanh tâm $B$ tại nửa khoảng cách $BC$.

Theo Hệ quả 7 của Proposition XVI, vận tốc của vật thể mô tả parabol $RPB$ quanh tâm $S$ tại một nơi $P$ bằng vận tốc của một vật thể mô tả đều đường tròn quanh cùng tâm $S$ tại nửa khoảng cách $SP$.

Cho bề rộng $CP$ của parabol giảm vô hạn, để cung parabol $PB$ trùng với đường thẳng $CB$, tâm $S$ trùng với đỉnh $B$, và khoảng cách $SP$ trùng với khoảng cách $BC$. Khi đó Proposition trở thành hiển nhiên.

## Proposition XXXV. Định lý XI

Với cùng điều kiện ấy, tôi nói rằng diện tích của hình $DES$, được bán kính không xác định $SD$ mô tả, bằng diện tích mà một vật thể có bán kính bằng một phần hai latus rectum của hình $DES$, quay đều quanh tâm $S$, có thể mô tả trong cùng thời gian.

Giả sử trong khoảnh khắc nhỏ nhất, vật thể $C$ rơi mô tả đoạn vô cùng nhỏ $Cc$, còn vật thể $K$ quay đều quanh tâm $S$ trong đường tròn $OKA$ và mô tả cung $KA$.

Dựng các đường vuông góc $CD$, $cd$ cắt hình $DES$ tại $D$, $d$. Nối $SD$, $SK$, $SA$, rồi kẻ $Dd$ cắt trục $AS$ tại $T$, và hạ vuông góc $SY$ xuống $T$.

### Trường hợp 1

Nếu hình $DES$ là đường tròn hoặc hypebol chữ nhật, chia đôi đường kính ngang $AS$ tại $O$. Khi ấy $SO$ bằng nửa latus rectum.

Vì
$$
TC:TD = Cc:Dd
$$
và
$$
TD:TS = CD:SY,
$$
ta có
$$
TC:TS = CD\cdot Cc:SY\cdot Dd.
$$

Theo Hệ quả 1 của Proposition XXXIII,
$$
TC:TS = AC:AO.
$$
Khi lấy các tỷ số giới hạn khi $D$, $d$ trùng nhau, ta có
$$
AC:AO = CD\cdot Cc:SY\cdot Dd.
$$

Vận tốc vật thể rơi tại $C$ tỷ lệ với vận tốc vật thể mô tả đường tròn quanh $S$ tại khoảng cách $SC$, theo căn bậc hai của
$$
AC:AO
\quad\text{hoặc}\quad SK.
$$

Vận tốc ấy lại tỷ lệ với vận tốc vật thể mô tả đường tròn $OKA$, theo căn bậc hai của
$$
SK:SC.
$$

Suy ra vận tốc đầu tiên tỷ lệ với vận tốc cuối cùng, tức là đoạn $Cc$ tỷ lệ với cung $KA'$, theo căn bậc hai của
$$
AC:SC,
$$
tức là theo tỷ số
$$
AC:CD.
$$

Do đó
$$
CD\cdot Cc = AC\cdot KA'.
$$

Từ đó
$$
AC:SK = AC\cdot KA':SY\cdot Dd,
$$
và vì thế
$$
SK\cdot KA' = SY\cdot Dd.
$$

Vì $Dd=DC$, ta có
$$
SK\cdot KA' = SY\cdot DC,
$$
tức là diện tích $KSA'$ bằng diện tích $SDd$.

Trong mỗi khoảnh khắc, hai phần diện tích bằng nhau $KSA'$ và $SDd$ được tạo ra. Nếu làm cho chúng nhỏ đi và số lượng tăng vô hạn, chúng tiến đến tỷ số bằng nhau. Theo Hệ quả của Lemma IV, tổng các diện tích được tạo ra luôn bằng nhau.

### Trường hợp 2

Nếu hình $DES$ là parabol, ta tìm được
$$
CD\cdot Cc:SY\cdot Dd = TC:TS = 2:1.
$$

Vì vậy
$$
CD\cdot Cc = \frac12 SY\cdot Dd.
$$

Vận tốc vật thể rơi tại $C$ bằng vận tốc mà đường tròn mô tả đều tại khoảng cách $\frac12 SC$, theo Proposition XXXIV.

Vận tốc ấy tỷ lệ với vận tốc mô tả đường tròn bán kính $SK$, tức là đoạn $Cc$ với cung $KA'$, theo căn bậc hai của
$$
SK:\frac12 SC,
$$
hay
$$
SK:CD.
$$

Do đó
\[
\frac12 SK\cdot KA' = CD\cdot Cc
= \frac12 SY\cdot Dd.
\]
Vì thế diện tích $KSA'$ bằng diện tích $SDd$, như trên.

> **[Chú giải]**
>
> **Rơi thẳng vào tâm, thay bằng một vòng tròn ở bán kính bằng nửa latus rectum**
>
> Với lực $\mu/r^2$, vận tốc rơi từ vô cùng ở khoảng cách $r$ là $v^2 = \dfrac{2\mu}{r}$; vận tốc quay tròn ở bán kính $r/2$ là $v_c^2 = \dfrac{\mu}{r/2} = \dfrac{2\mu}{r}$. Hai vế bằng nhau chính xác, nhưng đó mới là phần dễ.
>
> Phần khó nằm ở Proposition XXXV, phát biểu bằng **tốc độ quét diện tích** thay vì bằng vận tốc: rơi thẳng và quay đều cùng quét một diện tích bằng nhau trong cùng một khoảng thời gian. Vì mọi quỹ đạo quanh một tâm đều có $\tfrac{1}{2}h$ không đổi, với $h$ là moment động lượng riêng, nên tương đương này độc lập với việc lực có nghịch đảo bậc hai hay không. Bán kính của vòng tròn tương đương là nửa latus rectum $p/2$, với $p = h^2/\mu$ - còn chuyển động thuần túy đi thẳng thì $h = 0$, nên cả $p$ lẫn bán kính đều bằng không, và phép thay thế quy về đúng trường hợp suy biên của nó.
>
> Ông cần cái này vì mọi thứ ông đã chứng minh từ Proposition I trở đi đều nói về quỹ đạo khép kín. Chuyển động thẳng không có tiếp tuyến, không có tiêu điểm, không có hình học. Thay nó bằng một cung tròn thì toàn bộ kho vũ khí cũ dùng lại được.
>
> Người đọc hôm nay gặp đúng phép thay thế này khi lập quỹ đạo cho một cú đẩy xuyên tâm: đoạn rơi thẳng được thay bằng một cung tròn có cùng tốc độ quét diện tích, nhờ đó tính được bằng công thức lượng giác thay vì phải tích phân. Và con số $p/2$ không phải ngẫu nhiên: với areal rate cố định $h$, năng lượng riêng là $E = \dfrac{h^2}{2r^2} - \dfrac{\mu}{r}$, và $E = 0$ khi và chỉ khi $r = p/2$. Đó là bán kính lớn nhất tàu có thể đạt bằng đúng lực hút của hành tinh, nên một cú hãm tối đặt ở đó là rẻ nhất khi muốn nâng điểm xa nhất.

## Proposition XXXVI. Bài toán XXV

Xác định thời gian rơi của một vật thể rơi từ nơi $A$.

Trên đường kính $AS$, khoảng cách của vật thể từ tâm lúc bắt đầu, dựng nửa đường tròn $ADS$. Đồng thời dựng nửa đường tròn $OKH$ bằng nó, tâm $S$.

Từ một nơi $C$ bất kỳ của vật thể, dựng ordinate $CD$. Nối $SD$, rồi làm cho hình quạt $OSK$ có diện tích bằng $ASD$.

Theo Proposition XXXV, vật thể khi rơi mô tả không gian $AC$ trong cùng thời gian với một vật thể quay đều quanh tâm $S$ mô tả cung $OK$.

> **[Chú giải]**
>
> **Thời gian rơi đọc ra từ một cung tròn, chứ không phải từ một tích phân**
>
> Cấu hình dựng: lấy $AS$ làm đường kính, dựng nửa đường tròn $ADS$, rồi dựng nửa đường tròn $OKH$ bằng nó - tức vòng tròn so sánh có bán kính $r_0/2$. Vị trí $C$ của vật thể sau một khoảng thời gian ứng với cung $OK$ trên vòng tròn ấy, nhờ Proposition XXXV. Thời gian vậy đọc ra như một cung tròn, chứ không như một tỷ lệ với một đại lượng khác.
>
> Tích phân cho cùng kết quả: $t = \int_0^{r_0}\dfrac{dr}{\sqrt{2\mu\left(\frac1r - \frac1{r_0}\right)}} = \dfrac{\pi}{2}\sqrt{\dfrac{r_0^3}{2\mu}} = \dfrac{\pi r_0^{3/2}}{2\sqrt{2\mu}}$. Với bề mặt Trái Đất, $r_0 = 6{,}371 \times 10^6\ \mathrm{m}$ và $\mu = 3{,}986 \times 10^{14}\ \mathrm{m^3/s^2}$, ta được $t \approx 895\ \mathrm{s}$, tức gần 15 phút. Hệ số $\pi$ ở đây đúng là $\pi$ của hình tròn: thời gian rơi luôn gắn với một nửa vòng quay, vì đó là cách duy nhất gắn được thời gian vào diện tích đã quét. Sự xuất hiện tất yếu của một số siêu hạt như thế chính là thứ Lemma XXVIII ở chương trước đã tiên đoán.
>
> Ông cần thời gian chứ không chỉ quãng đường, và thời gian là thứ khó nhất để lấy từ lực nghịch đảo bậc hai: vận tốc ở đây thay đổi không đều, không có hệ số tỷ lệ đơn giản nào để dùng. Quy về một hình quạt tròn đồng nghĩa với nó là cách duy nhất bằng hình học thuần tuý.
>
> Người đọc hôm nay vẫn dùng chính phép cân bằng diện tích này khi ước lượng thời gian bay của tàu thăm, và con số 15 phút từ bề mặt Trái Đất xuống tâm vẫn là một mốc tham khảo quen thuộc trong các bài toán quỹ đạo xuyên tâm.
