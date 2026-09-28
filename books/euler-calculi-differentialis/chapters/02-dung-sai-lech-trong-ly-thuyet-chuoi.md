---
title: "Chương II: Dùng sai lệch trong lý thuyết chuỗi"
summary: "Các loại chuỗi theo bậc của differentia: chuỗi bậc nhất là cấp số cộng, bậc hai là chuỗi có differentia bậc hai bằng nhau, và cứ thế; đồng thời chỉ ra rằng không phải chuỗi nào cũng quy về được các loại ấy, vì các cấp số nhân không bao giờ cho differentia hằng."
tags: [dich-sach, toan, giai-tich]
slug: "dung-sai-lech-trong-ly-thuyet-chuoi"
number: 2
status: chua-hoan-thanh
---

<!-- Nguồn: PDF 67-97, tức trang in 39-69, CAPUT II gồm DE VSV DIFFERENTIARVM IN DOCTRINA
     SERIERUM. Mọi trang đã đọc trực tiếp từ ảnh scan; lớp OCR chỉ dùng làm bản nháp để
     đối chiếu, và ở các vùng công thức nó hỏng nặng nên toàn bộ phân số phải đọc từ
     ảnh. Các chỗ đã soi kỹ, chỗ lỗi của bản in và chỗ đọc chưa chắc đều ghi ở
     TRANSLATION_LEDGER.md và trong các ghi chú dịch giả ngay tại chỗ. -->

# Caput II

## DE VSV DIFFERENTIARVM IN DOCTRINA SERIERUM

**37.** Ngay từ những điều sơ khai nhất, người ta đã biết khá rõ rằng bản chất của các chuỗi
được soi sáng nhiều nhất nhờ differentia. Bởi đặc tính chủ yếu của cấp số cộng, thứ thường
được xét đến trước tiên, nằm ở chỗ các differentia bậc nhất của nó bằng nhau; do đó các
differentia bậc hai và mọi bậc còn lại sẽ đều bằng không. Kế đến có những chuỗi mà phải tới
differentia bậc hai mới bằng nhau; vì lý do ấy người ta tiện gọi chúng là những chuỗi *bậc
hai*, còn các cấp số cộng thì gọi là các chuỗi *bậc nhất*. Vậy tiếp theo, chuỗi *bậc ba* sẽ
là những chuỗi mà các differentia bậc ba là hằng; và vào *bậc bốn* cùng các bậc sau sẽ được
xếp những chuỗi mà phải tới các differentia bậc bốn, và các bậc xa hơn nữa, mới là hằng.

**38.** Cách phân chia này bao hàm vô số loại chuỗi, nhưng không phải chuỗi nào cũng quy về
được những loại ấy. Bởi ta gặp vô số chuỗi mà lấy differentia mãi cũng không bao giờ dẫn tới
những số hạng hằng: thuộc loại ấy, ngoài vô số chuỗi khác, có các cấp số nhân, chúng không
bao giờ cho ra differentia hằng, như ta thấy được từ ví dụ sau đây.

<!-- Ghi chú dịch giả: trang mở đầu chương, trang in 39. Đầu trang có hoa văn trang trí
     (❦ ° ❦) và số trang 39 đặt bên phải; dưới tiêu đề có một dấu trang trí nhỏ. Mép phải
     chân trang mang chữ catchword "1, 2,", sẽ nối sang trang kế. -->

<!-- PDF 68, trang in 40 -->

$$
1,\ 2,\ 4,\ 8,\ 16,\ 32,\ 64,\ 128,\ \&c.
$$

$$
1,\ 2,\ 4,\ 8,\ 16,\ 32,\ 64,\ \&c.
$$

$$
1,\ 2,\ 4,\ 8,\ 16,\ 32,\ \&c.
$$

Bởi vì chuỗi các differentia thuộc bậc nào cũng bằng chính chuỗi đã cho, nên sự bằng nhau
của các differentia bị loại trừ hoàn toàn. Vì thế sẽ phải lập ra nhiều lớp chuỗi, trong đó
chỉ một lớp được chia nhỏ thành những bậc này, tức những bậc rốt cuộc quy về differentia
hằng; và trong chương này ta sẽ chủ yếu xét lớp ấy.

**39.** Để nhận biết bản chất của các chuỗi, người ta thường cần trước hết hai thứ: *Số hạng
tổng quát* và *Tổng*, tức *Số hạng tổng kết*. Số hạng tổng quát là một biểu thức bất định
bao quát mọi số hạng của chuỗi, và vì thế nó là một functio của lượng biến thiên $x$ sao
cho khi đặt $x = 1$ thì nó cho số hạng thứ nhất của chuỗi; còn đặt $x = 2$ thì cho số hạng
thứ hai; đặt $x = 3$ thì số hạng thứ ba; đặt $x = 4$ thì số hạng thứ tư; và cứ thế. Vậy khi
đã biết số hạng tổng quát thì tìm được số hạng thứ bao nhiêu tùy ý của chuỗi, dù không cần
để ý tới quy luật nối các số hạng riêng lẻ với nhau. Chẳng hạn, đặt $x = 1000$ thì biết ngay
số hạng thứ một nghìn. Như với chuỗi này

$$
1,\ 6,\ 15,\ 28,\ 45,\ 66,\ 91,\ 120,\ \&c.
$$

số hạng tổng quát là $2xx - x$; bởi đặt $x = 1$ thì công thức ấy cho số hạng thứ nhất là $1$;
đặt $x = 2$ thì ra số hạng thứ hai là $6$; nếu đặt $x = 3$ thì ra số hạng thứ ba là $15$; &c.
Từ đó rõ rằng số hạng thứ một trăm của chuỗi này, khi đặt $x = 100$, sẽ là
$= 2.10000 - 100 = 19900$.

<!-- Ghi chú dịch giả: ba dãy ở đầu trang này là ví dụ mà §38 báo trước: dòng đầu là cấp
     số nhân 1, 2, 4, 8, ..., dòng thứ hai và thứ ba là các chuỗi differentia bậc nhất và
     bậc hai của nó, in ngắn dần (dừng ở 64 rồi 32) vì mỗi lần lấy differentia mất một
     số hạng. Chúng trùng với chính chuỗi đã cho, đúng như câu ngay sau nói. -->

<!-- Ghi chú dịch giả: bản in viết "terminum centesimum", tức số hạng thứ một trăm, không
     phải số hạng tổng kết. 2xx - x tại x = 100 cho 2·10000 - 100 = 19900, đúng. -->

<!-- Ghi chú dịch giả: câu "Ita huius seriei 1, 6, 15, ... Terminus generalis est 2xx - x"
     của bản in bắt đầu bằng "Ita" và viết hoa "Terminus" sau dãy số; bản dịch nối thành
     một câu. -->

<!-- Ghi chú dịch giả: trang 68 kết thúc giữa chữ, câu cuối bị cắt ở "40. In-"; mép
     phải mang chữ catchword In-. Số trang 40 đặt bên trái đầu trang. -->

<!-- PDF 69, trang in 41 -->

**40.** Trong một chuỗi bất kỳ, chỉ số hay số mũ là tên gọi những số chỉ ra mỗi số hạng
đứng thứ mấy theo thứ tự: như vậy chỉ số của số hạng thứ nhất sẽ là $1$, của số hạng thứ
hai là $2$, của số hạng thứ ba là $3$, và cứ thế. Vì thế người ta thường ghi chỉ số lên
từng số hạng của mỗi chuỗi, theo cách sau

**INDICES.**

$$
1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad 7,\quad \&c.
$$

**TERMINI.**

$$
A,\quad B,\quad C,\quad D,\quad E,\quad F,\quad G,\quad \&c.
$$

từ đó thấy ngay $G$ là số hạng thứ bảy của chuỗi đã cho, vì chỉ số của nó là $7$. Do đó số
hạng tổng quát chẳng qua là số hạng của chuỗi mà chỉ số hay số mũ của nó là một số bất định
$x$. Vậy trước hết ta sẽ chỉ ra phải tìm số hạng tổng quát như thế nào trong mỗi bậc chuỗi,
tức những chuỗi mà differentia hoặc bậc nhất, hoặc bậc hai, hoặc các bậc tiếp theo khác là
hằng; rồi sau đó ta sẽ tiến sang việc tìm tổng.

**41.** Ta bắt đầu từ bậc thứ nhất, bậc chứa các cấp số cộng, mà differentia bậc nhất của
chúng là hằng; gọi $a$ là số hạng thứ nhất của chuỗi, và $b$ là số hạng thứ nhất của chuỗi
differentia, mà mọi số hạng tiếp theo đều bằng nó: vậy chuỗi sẽ có dạng như sau.

**INDICES.**

$$
1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,
$$

**TERMINI.**

$$
a,\quad a+b,\quad a+2b,\quad a+3b,\quad a+4b,\quad a+5b,\quad \&c.
$$

**DIFFERENTIAE.**

$$
b,\quad b,\quad b,\quad b,\quad b,\quad \&c.
$$

<!-- Ghi chú dịch giả: đã soi phóng to bảng cuối trang. Dòng INDICES in đúng sáu chỉ số
     1 tới 6 (có dấu phẩy sau 6, không có 7 và không có &c.); dòng TERMINI có sáu số hạng
     a tới a+5b rồi &c.; dòng DIFFERENTIAE in năm chữ b rồi &c. Giữ nguyên như in. Giữa
     chân trang có dấu hiệu trang F; mép phải chân trang có chữ catchword Ex, mở đầu câu
     "Ex qua statim patet" ở trang kế. Số trang 41 đặt bên phải. -->

<!-- PDF 70, trang in 42 -->

Từ đó thấy ngay rằng số hạng có chỉ số $= x$ sẽ là $a + (x-1)b$, và vậy số hạng tổng quát sẽ
là $= bx + a - b$, được lập từ các số hạng đầu, cả của chính chuỗi lẫn của chuỗi differentia.
Còn nếu số hạng thứ hai $a+b$ của chuỗi được gọi là $a^{\mathrm{I}}$, thì vì $b = a^{\mathrm{I}} - a$,
số hạng tổng quát sẽ là

$$
(a^{\mathrm{I}} - a)x + 2a - a^{\mathrm{I}} = a^{\mathrm{I}}(x-1) - a(x-2)
$$

từ đó, khi đã biết số hạng thứ nhất và thứ hai của cấp số cộng, số hạng tổng quát của nó sẽ
được lập ra.

**42.** Giả sử trong một chuỗi bậc hai, các số hạng thứ nhất là: của chính chuỗi $= a$; của
các differentia bậc nhất $= b$; của các differentia bậc hai $= c$; khi ấy chính chuỗi cùng
các differentia của nó sẽ có dạng như sau.

**INDICES.**

$$
1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad 7,
$$

**TERMINI.**

$$
a;\ a+b;\ a+2b+c;\ a+3b+3c;\ a+4b+6c;\ a+5b+10c;\ a+6b+15c;\quad \&c.
$$

**DIFFER. I.**

$$
b;\ b+c;\quad b+2c;\quad b+3c;\quad b+4c;\quad b+5c;\quad \&c.
$$

**DIFFER. II.**

$$
c,\quad c,\qquad c,\qquad c,\qquad c,
$$

Xét bảng này thì thấy rõ số hạng có chỉ số $= x$ sẽ là

$$
a + (x-1)b + \frac{(x-1)(x-2)}{1\cdot 2}c
$$

vậy đó là số hạng tổng quát của chuỗi đã cho. Còn nếu đặt số hạng thứ hai của chính chuỗi
$= a^{\mathrm{I}}$, số hạng thứ ba $= a^{\mathrm{II}}$, thì vì $b = a^{\mathrm{I}} - a$ và
$c = a^{\mathrm{II}} - 2a^{\mathrm{I}} + a$, như hiểu được từ bản chất của các differentia (§. 10.),

<!-- Ghi chú dịch giả: trang in 42 kết thúc giữa chữ ở "vti ex na-", mép phải chân trang mang
     chữ catchword "tura" nối sang trang kế, nơi câu đó mở đầu bằng "tura differentiarum
     (§. 10.) intelligitur". Mẫu số của số hạng cuối trong bản in viết bằng "1." trên "2",
     tức 1·2; ở đây đã viết thành 1·2 cho rõ. Dòng DIFFER. II. chỉ in đúng năm chữ c (dòng
     INDICES có bảy chỉ số); chữ "&c." của dòng TERMINI in lệch xuống, ngang dòng tiêu đề
     DIFFER. I. Số trang 42 đặt bên trái đầu trang. -->

<!-- PDF 71, trang in 43 -->

số hạng tổng quát sẽ là

$$
a + (x-1)(a^{\mathrm{I}} - a) + \frac{(x-1)(x-2)}{1\cdot 2}(a^{\mathrm{II}} - 2a^{\mathrm{I}} + a)
$$

mà rút gọn lại thành dạng sau

$$
\frac{a^{\mathrm{II}}(x-1)(x-2)}{1\cdot 2} - \frac{2a^{\mathrm{I}}(x-1)(x-3)}{1\cdot 2} + \frac{a(x-2)(x-3)}{1\cdot 2}
$$

hoặc cũng thành dạng

$$
\frac{a^{\mathrm{II}}}{2}(x-1)(x-2) - \frac{2a^{\mathrm{I}}}{2}(x-1)(x-3) + \frac{a}{2}(x-2)(x-3)
$$

hay cuối cùng thành dạng

$$
\frac{1}{4}(x-1)(x-2)(x-3)\left(\frac{a^{\mathrm{III}}}{x-3} - \frac{2a^{\mathrm{I}}}{x-2} + \frac{a}{x-1}\right);
$$

và vì thế nó được xác định bởi ba số hạng của chính chuỗi.

**43.** Giả sử có chuỗi bậc ba $a,\ a^{\mathrm{I}},\ a^{\mathrm{II}},\ a^{\mathrm{III}},\ a^{\mathrm{IV}},\ \&c.$;
các differentia bậc nhất của nó là $b,\ b^{\mathrm{I}},\ b^{\mathrm{II}},\ b^{\mathrm{III}},\ \&c.$; các differentia
bậc hai là $c,\ c^{\mathrm{I}},\ c^{\mathrm{II}},\ c^{\mathrm{III}},\ \&c.$; và bậc ba là
$d,\ d,\ d,\ \&c.$, vì chúng là hằng.

**INDICES.**

$$
1\qquad 2,\qquad 3,\quad 4,\qquad 5,\qquad 6,
$$

**TERMINI.**

$$
a,\quad a^{\mathrm{I}},\quad a^{\mathrm{II}},\quad a^{\mathrm{III}},\quad a^{\mathrm{IV}},\quad a^{\mathrm{V}},\quad \&c.
$$

**DIFFER. I.**

$$
b,\quad b^{\mathrm{I}},\quad b^{\mathrm{II}},\quad b^{\mathrm{III}},\quad b^{\mathrm{IV}},\quad \&c.
$$

**DIFFER. II.**

$$
c,\quad c^{\mathrm{I}},\quad c^{\mathrm{II}},\quad c^{\mathrm{III}},\quad \&c.
$$

**DIFFER. III.**

$$
d,\qquad d,\qquad d,\quad \&c.
$$

<!-- Ghi chú dịch giả: hai dạng đầu ở §42 đã tự kiểm và đúng: khai triển biểu thức với
     b = a^I - a, c = a^II - 2a^I + a thì thu được đúng dạng "qui reducitur", còn "vel
     etiam" chỉ là cách viết lại cùng một biểu thức. -->

<!-- Ghi chú dịch giả: dạng "aut denique" nằm ở giới hạn đọc được của bản scan. Hệ số
     đứng đầu là một phân số in rất nhỏ, còn số mũ trên chữ a ở phân thức đầu trong ngoặc
     có nét giống số mũ III ở các trang lân cận; bản dịch giữ cách đọc 1/4 và a^III, nhưng
     cả hai chưa xác nhận được bằng mắt. Nếu đúng như vậy thì dạng này sai ở hai chỗ:
     trong ngoặc phải là a^II (số hạng tổng quát chỉ phụ thuộc a, a^I, a^II, đúng như câu
     ngay dưới nói), và hệ số phải là 1/2. Kiểm với chuỗi 1, 4, 9, 16, 25, &c. (a=1,
     b=3, c=2): số hạng thứ 4 đúng là 16, dạng "vel etiam" cho 16, dạng 1/4 với a^III
     cho 37/2; chỉ khi có cả 1/2 lẫn a^II mới ra 16. -->

<!-- Ghi chú dịch giả: trong câu mở đầu §43 và trong dòng DIFFER. III. của bảng, bản in
     đều viết ba chữ d trần "d, d, d, &c." (đã soi phóng to). Điều này đúng ý Euler: câu
     nói rõ "quippe quae sunt constantes", các differentia bậc ba là hằng nên đều bằng d.
     Không có lỗi in ở đây. Dòng INDICES in sáu chỉ số, 1 tới 6 (không có dấu phẩy sau số 1),
     khớp với sáu số hạng a tới a^V ở dòng TERMINI. Số trang 43 đặt bên phải đầu trang;
     dấu hiệu trang ở giữa chân trang là F 2; mép phải chân trang mang chữ catchword Quia,
     mở đầu câu của trang kế. -->

<!-- PDF 72, trang in 44 -->

Vì $a^{\mathrm{I}} = a + b$, $a^{\mathrm{II}} = a + 2b + c$, $a^{\mathrm{III}} = a + 3b + 3c + d$,
$a^{\mathrm{IV}} = a + 4b + 6c + 4d$, &c., nên số hạng tổng quát, tức số hạng có chỉ số là $x$, sẽ là

$$
a + \frac{(x-1)}{1}b + \frac{(x-1)(x-2)}{1\cdot 2}c + \frac{(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3}d
$$

thế là số hạng tổng quát lập được từ các differentia.

Hơn nữa, vì

$$
b = a^{\mathrm{I}} - a;\qquad c = a^{\mathrm{II}} - 2a^{\mathrm{I}} + a;\qquad d = a^{\mathrm{III}} - 3a^{\mathrm{II}} + 3a^{\mathrm{I}} - a
$$

nên nếu thay các giá trị ấy vào, số hạng tổng quát sẽ là

$$
a^{\mathrm{III}}\frac{(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3} - 3a^{\mathrm{II}}\frac{(x-1)(x-2)(x-4)}{1\cdot 2\cdot 3} + 3a^{\mathrm{I}}\frac{(x-1)(x-3)(x-4)}{1\cdot 2\cdot 3} - a\frac{(x-2)(x-3)(x-4)}{1\cdot 2\cdot 3}
$$

mà cũng có thể biểu thị theo cách sau, để thành

$$
= \frac{(x-1)(x-2)(x-3)(x-4)}{1\cdot 2\cdot 3}\left(\frac{a^{\mathrm{III}}}{x-4} - \frac{3a^{\mathrm{II}}}{x-3} + \frac{3a^{\mathrm{I}}}{x-2} - \frac{a}{x-1}\right).
$$

<!-- Ghi chú dịch giả: mọi công thức của trang này đã tự kiểm và đều đúng, không có lỗi in.
     Với a=1, b=2, c=3, d=4 thì dựng chuỗi từ differentia bậc ba hằng cho
     1, 3, 8, 20, 43, 81, &c., đúng như a^I = a+b, a^II = a+2b+c, a^III = a+3b+3c+d,
     a^IV = a+4b+6c+4d mà bản in nêu. Cả hai dạng rút gọn của số hạng tổng quát cũng khớp
     số hạng tổng quát a + (x-1)b + (x-1)(x-2)/2·c + (x-1)(x-2)(x-3)/6·d. Lưu ý dạng
     có nhân tử ở chỉ đúng khi x khác 1, 2, 3, 4, vì các mẫu x-1, x-2, x-3, x-4 nằm ở
     mẫu số. Cũng lưu ý khác với bậc hai: ở bậc ba, differentia bậc hai không hằng mà
     lập thành một cấp số cộng, nên số hạng thứ năm là a+4b+6c+4d chứ không phải a+4b+6c+2d. -->

**44.** Bây giờ giả sử đã cho một chuỗi thuộc bậc bất kỳ:

**INDICES**

$$
1,\qquad 2,\qquad 3,\quad 4,\qquad 5,\qquad 6,
$$

**TERMINI.**

$$
a,\quad a^{\mathrm{I}},\quad a^{\mathrm{II}},\quad a^{\mathrm{III}},\quad a^{\mathrm{IV}},\quad a^{\mathrm{V}},\quad \&c.
$$

**DIFFER. I.**

$$
b,\quad b^{\mathrm{I}},\quad b^{\mathrm{II}},\quad b^{\mathrm{III}},\quad b^{\mathrm{IV}},\quad \&c.
$$

**DIFFER. II.**

$$
c,\quad c^{\mathrm{I}},\quad c^{\mathrm{II}},\quad c^{\mathrm{III}},\quad \&c.
$$

<!-- Ghi chú dịch giả: trang 72 kết thúc ở đây, mép phải chân trang mang chữ catchword DIF,
     nối sang dòng DIFFER. III. ở trang kế. Số trang 44 đặt bên trái đầu trang. -->

<!-- PDF 73, trang in 45 -->

**DIFFER. III.**

$$
d,\quad d^{\mathrm{I}},\quad d^{\mathrm{II}},\quad \&c.
$$

**DIFFER. IV.**

$$
e,\quad e^{\mathrm{I}},\quad \&c.
$$

**DIFFER. V.**

$$
f,\quad \&c.
$$

thì từ số hạng thứ nhất của chính chuỗi, cùng từ các số hạng thứ nhất của các differentia
$b,\ c,\ d,\ e,\ f,\ \&c.$, số hạng tổng quát sẽ được biểu thị sao cho nó là:

$$
a + \frac{(x-1)}{1}b + \frac{(x-1)(x-2)}{1\cdot 2}c + \frac{(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3}d + \frac{(x-1)(x-2)(x-3)(x-4)}{1\cdot 2\cdot 3\cdot 4}e + \&c.
$$

cho tới khi đi tới những differentia hằng. Từ đó thấy rằng, nếu các differentia hằng
không bao giờ xuất hiện, thì số hạng tổng quát được trình bày bằng một biểu thức vô hạn.

**45.** Vì các differentia được lập thành từ chính các số hạng của chuỗi, nên nếu thay các
giá trị ấy vào, ta sẽ thu được số hạng tổng quát ở dạng tương tự như dạng đã trình bày cho
các chuỗi bậc nhất, bậc hai và bậc ba. Cụ thể, với các chuỗi thuộc bậc bốn, số hạng tổng
quát sẽ là

$$
\frac{(x-1)(x-2)(x-3)(x-4)(x-5)}{1\cdot 2\cdot 3\cdot 4}\times\left(\frac{a^{\mathrm{IV}}}{x-5} - \frac{4a^{\mathrm{III}}}{x-4} + \frac{6a^{\mathrm{II}}}{x-3} - \frac{4a^{\mathrm{I}}}{x-2} + \frac{a}{x-1}\right)
$$

<!-- Ghi chú dịch giả: trong bảng các bậc, dòng DIFFER. III. ở đây in chữ d thứ hai và thứ
     ba đều có số mũ, nhưng mực mờ; số mũ trên chữ d thứ hai trông gần giống số mũ trên chữ
     d thứ ba (II), nên cách đọc d^I cho chữ thứ hai chưa chắc chắn. Bản dịch giữ d, d^I,
     d^II theo quy luật các dòng bên trên. Ở dòng DIFFER. V. bản in chỉ có f, &c. -->

<!-- Ghi chú dịch giả: số hạng tổng quát viết bằng dãy differentia ở đầu trang này đã tự
     kiểm và đúng: với a=1, b=2, c=3, d=4, e=0 thì dựng chuỗi cho 1, 3, 8, 20, 43, 81, &c.,
     đúng với công thức a + (x-1)b + (x-1)(x-2)/2·c + (x-1)(x-2)(x-3)/6·d + (x-1)(x-2)(x-3)(x-4)/24·e. -->

<!-- Ghi chú dịch giả: dạng có nhân tử ở cuối §45 in mẫu số 1. 2. 3. 4 (bốn thừa số, đã soi
     phóng to; không có thừa số 5) và dấu nhân × ở cuối dòng tử số. Dạng này đúng: với
     a=5, b=2, c=d=e=0 (chuỗi 5, 7, 9, 11, 13, 15, &c.) nó cho số hạng thứ 6 đúng bằng 15,
     và trọng số của a^IV là (x-1)(x-2)(x-3)(x-4)/24, khớp với số hạng tổng quát viết theo
     các differentia. -->

<!-- Ghi chú dịch giả: trang 73 kết thúc ở chữ "vnde", vốn là catchword ở mép phải chân
     trang, nối sang trang kế. Dấu hiệu trang ở giữa chân trang là F 3. Số trang 45 đặt
     bên phải đầu trang. -->

<!-- PDF 74, trang in 46 -->

từ đó dễ nhận ra quy luật theo đó các số hạng tổng quát của những bậc kế tiếp được lập nên.
Còn từ những điều này thấy rõ rằng, với bậc bất kỳ, số hạng tổng quát sẽ là một functio
phân thức nguyên của chính $x$, trong đó số chiều lớn nhất của $x$ trùng với bậc mà chuỗi
ấy thuộc về. Như vậy số hạng tổng quát của các chuỗi bậc nhất sẽ là functio bậc nhất, của
các chuỗi bậc hai là functio bậc hai, và cứ thế.

**46.** Còn các differentia, như ta đã thấy ở trên, thì phát sinh từ chính các số hạng của
chuỗi sao cho:

$$
b = a^{\mathrm{I}} - a
$$

$$
b^{\mathrm{I}} = a^{\mathrm{II}} - a^{\mathrm{I}}
$$

$$
b^{\mathrm{II}} = a^{\mathrm{III}} - a^{\mathrm{II}}
$$

&c.

$$
c = a^{\mathrm{II}} - 2a^{\mathrm{I}} + a
$$

$$
c^{\mathrm{I}} = a^{\mathrm{III}} - 2a^{\mathrm{II}} + a^{\mathrm{I}}
$$

$$
c^{\mathrm{II}} = a^{\mathrm{IV}} - 2a^{\mathrm{III}} + a^{\mathrm{II}}
$$

&c.

$$
d = a^{\mathrm{III}} - 3a^{\mathrm{II}} + 3a^{\mathrm{I}} - a
$$

$$
d^{\mathrm{I}} = a^{\mathrm{IV}} - 3a^{\mathrm{III}} + 3a^{\mathrm{II}} - a^{\mathrm{I}}
$$

$$
d^{\mathrm{II}} = a^{\mathrm{V}} - 3a^{\mathrm{IV}} + 3a^{\mathrm{III}} - a^{\mathrm{II}}
$$

&c.

Vì thế, do trong các chuỗi bậc nhất mọi giá trị của $c$ đều bằng $0$, ta sẽ có

$$
a^{\mathrm{II}} = 2a^{\mathrm{I}} - a;\quad a^{\mathrm{III}} = 2a^{\mathrm{II}} - a^{\mathrm{I}};\quad a^{\mathrm{IV}} = 2a^{\mathrm{III}} - a^{\mathrm{II}};\quad \&c.
$$

từ đó rõ rằng các chuỗi này đồng thời là chuỗi truy hồi, và thang quan hệ là
$2,\ -1$. Tiếp theo, vì trong các chuỗi bậc hai...

<!-- Ghi chú dịch giả: cả chín công thức ở trang này đã đối chiếu với định nghĩa differentia
     đã dùng ở §42 và §43 và đều đúng; đây là hiệu sai hữu hạn tiêu chuẩn. Dòng
     a^II = 2a^I - a cũng đúng: khi differentia bậc hai bằng 0 thì a^II = 2a^I - a, đúng
     với cấp số cộng. -->

<!-- Ghi chú dịch giả: trang 74 kết thúc giữa chữ ở "in seriebus secundi ordi-"; mép phải
     mang chữ catchword ordi-. Số trang 46 đặt bên trái đầu trang. -->

<!-- PDF 75, trang in 47 -->

…bậc hai thì mọi giá trị của $d$ đều bằng $0$, ta sẽ có

$$
a^{\mathrm{III}} = 3a^{\mathrm{II}} - 3a^{\mathrm{I}} + a;\quad a^{\mathrm{IV}} = 3a^{\mathrm{III}} - 3a^{\mathrm{II}} + a^{\mathrm{I}};\quad \&c.
$$

và vì thế chúng cũng sẽ là chuỗi truy hồi, với thang quan hệ là $3,\ -3,\ +1$.

Cũng theo cách ấy sẽ thấy rằng mọi chuỗi thuộc lớp này, dù thuộc bậc nào, đồng thời cũng
thuộc về lớp các chuỗi truy hồi, và cụ thể là thang quan hệ gồm các hệ số của lũy thừa nhị
thức có số mũ cao hơn một bậc so với bậc mà chuỗi ấy thuộc về.

**47.** Nhưng vì với các chuỗi bậc nhất, mọi giá trị của $d$ và $e$, và của tất cả các
differentia tiếp theo, cũng đều $= 0$, nên trong những chuỗi ấy cũng sẽ có

$$
a^{\mathrm{III}} = 3a^{\mathrm{II}} - 3a^{\mathrm{I}} + a
$$

$$
a^{\mathrm{IV}} = 3a^{\mathrm{III}} - 3a^{\mathrm{II}} + a^{\mathrm{I}}
$$

&c.

hoặc

$$
a^{\mathrm{IV}} = 4a^{\mathrm{III}} - 6a^{\mathrm{II}} + 4a^{\mathrm{I}} - a
$$

$$
a^{\mathrm{V}} = 4a^{\mathrm{IV}} - 6a^{\mathrm{III}} + 4a^{\mathrm{II}} - a^{\mathrm{I}}
$$

&c.

Vậy từ đây chúng cũng thuộc về các chuỗi truy hồi, và thuộc theo vô hạn cách, vì thang quan
hệ có thể là

$$
3,\ -3,\ +1;\quad 4,\ -6,\ +4,\ -1;\quad 5,\ -10,\ +10,\ -5,\ +1;
$$

&c.

Cũng theo cách ấy, ta hiểu rằng mỗi chuỗi thuộc lớp mà ta đang bàn đồng thời là một chuỗi
truy hồi theo vô số cách: bởi thang quan hệ sẽ là

$$
\frac{n}{1},\quad -\frac{n(n-1)}{1\cdot 2},\quad +\frac{n(n-1)(n-2)}{1\cdot 2\cdot 3},\quad -\frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4},
$$

&c.

miễn là...

<!-- Ghi chú dịch giả: ba thang quan hệ Euler liệt kê ở §47 đã tự kiểm và đều đúng với các
     hệ số nhị thức C(n,k) mang dấu luân phiên: n=3 cho 3, -3, +1; n=4 cho 4, -6, +4, -1;
     n=5 cho 5, -10, +10, -5, +1. Dãy công thức chung ở cuối trang cũng đúng, vì
     n/1 = C(n,1), n(n-1)/(1·2) = C(n,2), n(n-1)(n-2)/(1·2·3) = C(n,3),
     n(n-1)(n-2)(n-3)/(1·2·3·4) = C(n,4). Các quan hệ truy hồi ở đầu trang cũng đúng:
     a^III = 3a^II - 3a^I + a là hiệu bậc ba bằng 0, còn a^IV = 4a^III - 6a^II + 4a^I - a
     là hiệu bậc bốn bằng 0. -->

<!-- Ghi chú dịch giả: trang 75 kết thúc ở chữ "dum", vốn là catchword ở mép phải chân
     trang, nối sang trang kế. Số trang 47 đặt bên phải đầu trang. -->

<!-- PDF 76, trang in 48 -->

…miễn là $n$ là một số nguyên lớn hơn số chỉ bậc. Vậy chuỗi này cũng sẽ sinh ra từ khai
triển của một phân số mà mẫu số là $(1-y)^n$, như đã trình bày đầy đủ hơn trong cuốn trước,
ở phần về các chuỗi truy hồi.

**48.** Như ta đã thấy số hạng tổng quát của mọi chuỗi thuộc lớp này, dù thuộc bậc nào,
đều là những functio phân thức nguyên của $x$, thì ngược lại cũng sẽ thấy mọi chuỗi mà
số hạng tổng quát là những functio như thế của $x$ đều thuộc về lớp này, và rốt cuộc được
đưa tới differentia hằng. Thật vậy, nếu số hạng tổng quát là functio bậc nhất $ax + b$,
thì vì chuỗi sinh ra từ đó sẽ là chuỗi bậc nhất, tức cấp số cộng, nó sẽ có differentia bậc
nhất là hằng. Còn nếu số hạng tổng quát là functio bậc hai ở dạng $axx + bx + c$ thì chuỗi
sinh ra từ nó, khi lần lượt thay $x$ bằng các số $1, 2, 3, 4, 5$, &c., sẽ là chuỗi bậc hai,
và sẽ có differentia bậc hai là hằng. Cũng thế, số hạng tổng quát bậc ba
$ax^3 + bx^2 + cx + d$ sẽ cho một chuỗi bậc ba, và cứ thế.

**49.** Bởi từ số hạng tổng quát không chỉ tìm được mọi số hạng của chuỗi, mà còn suy ra
được các chuỗi differentia, cả bậc nhất lẫn các bậc tiếp theo. Thật vậy, vì nếu lấy số
hạng thứ hai của chuỗi trừ đi số hạng thứ nhất thì ra số hạng thứ nhất của chuỗi
differentia, còn số hạng thứ hai thì ra khi lấy số hạng thứ ba của chính chuỗi trừ đi số
hạng thứ hai, nên cũng thế, số hạng của chuỗi differentia...

<!-- Ghi chú dịch giả: ba dạng functio ở §48 đã tự kiểm bằng phép lấy hiệu sai hữu hạn và
     cả ba đều đúng như Euler nói. (i) Với số hạng tổng quát ax + b, các số hạng là
     a+b, 2a+b, 3a+b, &c.; hiệu bậc nhất bằng a, hằng. (ii) Với axx + bx + c, các số hạng
     là a+b+c, 4a+2b+c, 9a+3b+c, 16a+4b+c, &c.; hiệu bậc nhất là 3a+b, 5a+b, 7a+b, 9a+b,
     tức một cấp số cộng sai 2a, nên hiệu bậc hai bằng 2a và không đổi. (iii) Với
     ax^3 + bx^2 + cx + d, hiệu bậc ba bằng 6a và không đổi. Kiểm số với a=3, b=5, c=7,
     d=11: trường hợp (ii) cho các số hạng 15, 29, 49, 75, 107, 145 với hiệu bậc hai đều
     bằng 6; trường hợp (iii) cho hiệu bậc ba đều bằng 18. -->

<!-- Ghi chú dịch giả: trang 76 kết thúc ở chữ "minus,", vốn là catchword ở mép phải chân
     trang; trang này mở đầu bằng chính chữ đó nên câu nối liền, không có dấu phẩy báo
     trang trước. Số trang 48 đặt bên trái đầu trang. -->

<!-- PDF 77, trang in 49 -->

…mà chỉ số là $x$ sẽ thu được nếu lấy số hạng kế tiếp của chính chuỗi, có chỉ số là $x+1$,
trừ đi số hạng có chỉ số là $x$. Vì vậy, nếu trong số hạng tổng quát của chuỗi đặt $x+1$ vào
chỗ $x$, rồi lấy giá trị ấy trừ đi số hạng tổng quát, thì còn lại số hạng tổng quát của chuỗi
differentia: vậy nếu $X$ là số hạng tổng quát của chuỗi, thì differentia $\Delta X$ của nó
(differentia này sẽ tìm được theo cách đã chỉ ra ở chương trước, nếu ở đó đặt $\omega = 1$)
sẽ là số hạng tổng quát của chuỗi differentia bậc nhất. Vậy cũng theo cách ấy,
$\Delta\Delta X$ sẽ là số hạng tổng quát của chuỗi differentia bậc hai; $\Delta^3X$ của
chuỗi differentia bậc ba, và cứ thế tiếp theo.

**50.** Còn nếu số hạng tổng quát $X$ là một functio phân thức nguyên, trong đó số mũ lớn
nhất của lũy thừa của $x$ là $n$, thì từ chương trước ta suy ra differentia $\Delta X$ của
nó sẽ là một functio thấp hơn một bậc, tức bậc $n-1$. Và từ đó tiếp theo, $\Delta\Delta X$
sẽ là functio bậc $n-2$, còn $\Delta^3X$ là functio bậc $n-3$, và cứ thế. Vì vậy nếu $X$ là
functio bậc nhất, như $ax + b$, thì differentia $\Delta X$ của nó sẽ là hằng $= a$; và vì
đó là số hạng tổng quát của chuỗi các differentia bậc nhất, nên thấy rõ rằng chuỗi có số
hạng tổng quát $X$ là functio bậc nhất sẽ là cấp số cộng, tức chuỗi bậc nhất. Cũng thế, nếu
số hạng tổng quát $X$ là functio bậc hai, thì vì $\Delta\Delta X$ là hằng, chuỗi sinh ra từ
nó sẽ có differentia bậc hai là hằng, và do đó sẽ thuộc bậc hai; và cứ thế mãi: functio $X$
làm số hạng tổng quát thuộc bậc nào thì chuỗi sinh ra từ nó cũng thuộc cùng bậc ấy.

<!-- Ghi chú dịch giả: luận điểm ở §50 đã tự kiểm và đúng. Với X bậc nhất ax+b thì ΔX = a,
     hằng. Với X bậc hai axx+bx+c thì ΔX là bậc nhất còn ΔΔX = 2a, hằng. Với X bậc ba
     ax^3+bx^2+cx+d thì ΔX bậc hai, ΔΔX = 6ax+3b+2c bậc nhất, Δ^3X = 6a, hằng. Cứ thế,
     mỗi lần lấy hiệu thì bậc giảm đúng một. Kiểm số với a=3, b=5, c=7, d=11 cho Δ^3X = 18
     = 6a, đúng bằng hằng. Cũng đã kiểm câu "số mũ lớn nhất của lũy thừa của chính x là n"
     với một functio phân thức nguyên tổng quát, bằng cách dựng hiệu bằng hệ số nhị thức:
     nếu X = c_n x^n + ... thì ΔX = n c_n x^(n-1) + ..., nên hệ số dẫn đầu là n c_n, khác
     không khi c_n khác không, và bậc vì thế giảm đúng một. Đã thử với sáu functio ngẫu nhiên
     bậc 1, 3 và 4, đều cho đúng bậc n-1 và đúng hệ số n c_n. -->

<!-- Ghi chú dịch giả: trang 49 kết thúc ở đúng câu cuối "erit series ex eo nata." Dấu hiệu
     trang ở giữa chân trang là G. Mép phải chân trang mang chữ bắt "51. Hanc": chữ số 5 in
     kiểu cổ, trông giống chữ s dài, nên dễ đọc nhầm thành "§1."; đó là số 51, đúng số mục
     ở trang kế. Số trang 49 đặt bên phải đầu trang. -->

<!-- PDF 78, trang in 50 -->

**51.** Vì thế mà các chuỗi lũy thừa của những số tự nhiên dẫn tới differentia hằng, như
có thể thấy rõ từ bảng sau đây.

**POTEST. I.**

$$
1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad 7,\quad 8,\quad \&c.
$$

**DIFFER. I.**

$$
1,\qquad 1,\qquad 1,\qquad 1,\qquad 1,\qquad 1,\qquad 1,\quad \&c.
$$

**POTEST. II.**

$$
1,\quad 4,\quad 9,\quad 16,\quad 25,\quad 36,\quad 49,\quad 64,\quad \&c.
$$

**DIFFER. I.**

$$
3,\quad 5,\quad 7,\quad 9,\quad 11,\quad 13,\quad 15,\quad \&c.
$$

**DIFFER. II.**

$$
2,\qquad 2,\qquad 2,\qquad 2,\qquad 2,\qquad 2,\quad \&c.
$$

**POTEST. III.**

$$
1,\quad 8,\quad 27,\quad 64,\quad 125,\quad 216,\quad 343,\quad \&c.
$$

**DIFFER. I.**

$$
7,\quad 19,\quad 37,\quad 61,\quad 91,\quad 127,\quad \&c.
$$

**DIFFER. II.**

$$
12,\quad 18,\quad 24,\quad 30,\quad 36,\quad \&c.
$$

**DIFFER. III.**

$$
6,\qquad 6,\qquad 6,\qquad 6,\quad \&c.
$$

**POTEST. IV.**

$$
1,\quad 16,\quad 81,\quad 256,\quad 625,\quad 1296,\quad 2401,\quad \&c.
$$

**DIFFER. I.**

$$
15,\quad 65,\quad 175,\quad 369,\quad 671,\quad 1105,\quad \&c.
$$

**DIFFER. II.**

$$
50,\quad 110,\quad 194,\quad 302,\quad 434,\quad \&c.
$$

**DIFFER. III.**

$$
60,\quad 84,\quad 108,\quad 132,\quad \&c.
$$

**DIFFER. IV.**

$$
24,\qquad 24,\qquad 24,\quad \&c.
$$

<!-- Ghi chú dịch giả: toàn bộ hai mươi dòng số ở trang này đã tự kiểm bằng cách dựng
     chuỗi 1^k, 2^k, 3^k, ... rồi lấy hiệu từng bậc, và cả hai mươi dòng đều khớp đúng
     với bản in, không riêng số hạng nào sai. Chẳng hạn với k=2, hiệu bậc nhất là
     3, 5, 7, 9, 11, 13, 15 và hiệu bậc hai là 2, 2, 2, 2, 2, 2; với k=3, hiệu bậc nhất là
     7, 19, 37, 61, 91, 127, hiệu bậc hai là 12, 18, 24, 30, 36 và hiệu bậc ba là
     6, 6, 6, 6; với k=4, hiệu bậc nhất là 15, 65, 175, 369, 671, 1105, hiệu bậc hai là
     50, 110, 194, 302, 434, hiệu bậc ba là 60, 84, 108, 132, và hiệu bậc bốn là
     24, 24, 24. Chuỗi POTEST. I. là 1, 2, 3, ... nên hiệu bậc nhất là dãy toàn một. -->

<!-- Ghi chú dịch giả: mỗi dòng DIFFER. mất đúng một số hạng so với dòng ngay trên, vì
     lấy hiệu một lần thì số số hạng giảm đi một; các dòng ở đây đều bị cắt cụt ở cùng
     chỗ nên không thấy rõ điều đó, nhưng vẫn khớp với cách in. Số trang 50 đặt bên trái
     đầu trang. Trang này không có dấu hiệu chữ ở giữa chân trang, khác với các trang
     trước. Mép phải chân trang mang chữ bắt Quae, mở đầu câu của trang kế. -->

<!-- PDF 79, trang in 51 -->

Vậy những quy tắc đã dạy ở chương trước về cách tìm differentia của mọi bậc sẽ dùng ở đây
để tìm số hạng tổng quát của bất kỳ differentia nào sinh ra từ các chuỗi.

**52.** Nếu số hạng tổng quát của một chuỗi bất kỳ đã biết, thì nhờ nó không chỉ tìm được
mọi số hạng của chuỗi cho tới vô hạn, mà còn có thể kéo dài chuỗi ngược lại và trình bày
được các số hạng mà số mũ là những số âm, bằng cách thay $x$ bằng các số âm. Như vậy, nếu
số hạng tổng quát là

$$
\frac{xx + 3x}{2},
$$

thì khi đặt vào chỗ $x$ các chỉ số cả âm lẫn dương, chuỗi kéo dài về cả hai phía sẽ như
sau.

**INDICES.**

$$
\&c.\ -5,\ -4,\ -3,\ -2,\ -1,\quad 0,\quad 1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad \&c.
$$

**SERIES.**

$$
\&c.\ +5,\ +2,\quad 0,\ -1,\ -1,\quad 0,\quad 2,\quad 5,\quad 9,\ 14,\ 20,\ 27,\quad \&c.
$$

**DIFFER. I.**

$$
-3,\ -2,\ -1,\quad 0,\quad 1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad 7,\quad \&c.
$$

**DIFFER. II.**

$$
1,\qquad 1,\qquad 1,\qquad 1,\qquad 1,\qquad 1,\qquad 1,\qquad 1,\qquad 1,\qquad 1\quad \&c.
$$

Vậy vì số hạng tổng quát được lập ra từ các differentia, nên chuỗi nào cũng có thể kéo dài
ngược lại nhờ các differentia; cụ thể là nếu các differentia rốt cuộc trở thành hằng thì
những số hạng ấy trình bày được ở dạng hữu hạn, còn trong trường hợp ngược lại thì có thể
gán cho chúng một biểu thức vô hạn. Hơn thế nữa, từ số hạng tổng quát

<!-- Ghi chú dịch giả: câu đầu trang 51 in là "ad terminos generales differentiarum
     quarumuis" (quarumvis, "bất kỳ"), không phải một chữ chỉ "bậc bốn"; và "loco x
     numeros negatiuos substituendo" in đầy đủ "negatiuos" (negativos, với u thay v theo
     lối in thời ấy). Cả hai đã soi trên ảnh scan, không có lỗi in. -->

<!-- Ghi chú dịch giả: hai mươi số hạng ở bốn dòng bảng của trang này đã tự kiểm và đều
     đúng. Với số hạng tổng quát (x^2+3x)/2, các chỉ số -5, -4, -3, -2, -1, 0, 1, 2, 3,
     4, 5, 6 cho các số hạng 5, 2, 0, -1, -1, 0, 2, 5, 9, 14, 20, 27, đúng như dòng
     SERIES. Hiệu bậc nhất là -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, đúng như dòng DIFFER. I.
     Hiệu bậc hai là toàn một, đúng như dòng DIFFER. II., cho thấy differentia bậc hai của
     số hạng tổng quát bậc hai này là hằng, tức chuỗi thuộc bậc hai, đúng như §50 nói.
     Dòng DIFFER. II. có mười chữ 1, ít hơn dòng SERIES mười hai số hạng đúng hai, và ít
     hơn dòng DIFFER. I. mười một số hạng đúng một, khớp với quy luật mỗi bậc mất một
     số hạng. -->

<!-- Ghi chú dịch giả: trang 51 kết thúc giữa chữ ở "ex termino gene-", mép phải chân trang
     mang chữ bắt "rali" nối sang trang kế, nơi câu đó mở đầu bằng "rali". Dấu hiệu trang
     ở giữa chân trang là "G 2". Số trang 51 đặt bên phải đầu trang. -->

<!-- Chưa dịch: PDF 80-97, tức trang in 52-69, gồm phần còn lại của §52, rồi §53 trở đi
     và các EXEMPLUM của CAPUT II. Catchword ở cuối trang 79 là "rali". -->




