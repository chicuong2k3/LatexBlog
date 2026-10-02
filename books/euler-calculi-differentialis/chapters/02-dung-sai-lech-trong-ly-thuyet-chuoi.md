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
\frac{1}{4}(x-1)(x-2)(x-3)\left(\frac{a^{\mathrm{II}}}{x-3} - \frac{2a^{\mathrm{I}}}{x-2} + \frac{a}{x-1}\right);
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

<!-- Ghi chú dịch giả: dạng "aut denique" ở trên có **một lỗi in của Euler**, đã chép
     nguyên văn; đồng thời bản dịch cũ đã đọc nhầm một chữ trong ngoặc.

     Soi bằng mắt trên ảnh scan (PDF 71, trang in 43), render thẳng từ file PDF ở độ
     phóng cao: bản in ghi **1/4** ở tiền tố và **a^II** trong phân thức đầu trong ngoặc.
     Mũ là hai nét, khớp với a^I ở phân thức kế; không phải ba nét.

     Như vậy có hai việc khác nhau:
     - Chữ a trong ngoặc: bản dịch cũ ghi a^III, đó là lỗi đọc, đã sửa thành a^II.
     - Tiền tố 1/4: bản in đúng là 1/4, giữ nguyên. Về toán thì 1/4 là sai, phải là
       1/2 mới khớp dạng "vel etiam" ngay dòng trên.

     Lý do 1/4 không khớp, không cần thử nghiệm: khai triển dạng "vel etiam"
     a^II/2 (x-1)(x-2) - a^I (x-1)(x-3) + a/2 (x-2)(x-3), rồi đặt (x-1)(x-2) = 1,
     (x-1)(x-3) = 2, (x-2)(x-3) = 3 thì hệ số của ba số hạng lần lượt là 1/2, -1 và 1/2.
     Dạng "aut denique" với tiền tố 1/4 cho 1/4, -1/2, 1/4: hai số hạng sau lệch đúng
     một nửa, còn số hạng đầu thì khớp với a^II/2. Dạng này chỉ ra một chỗ sai duy nhất
     là tiền tố, và câu ngay dưới ("ideoque ex tribus terminis ipsius seriei definitur",
     tức xác định bởi ba số hạng của chính chuỗi) cũng đòi phải là a^II chứ không
     phải a^III, vì a^III sẽ làm dạng này phụ thuộc bốn số hạng. -->

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

<!-- PDF 80, trang in 52 -->

…số hạng tổng quát ấy, những số hạng mà chỉ số của chúng là phân số, cũng được định nghĩa;
và trong đó có chứa phép INTERPOLATIO của các chuỗi.

**53.** Đã được thông tri về số hạng tổng quát của các chuỗi, ta hãy tiến tới tổng, tức là
việc tìm số hạng tổng kết của các chuỗi thuộc mọi bậc. Đã cho trước một chuỗi bất kỳ thì
**TERMINUS** *summatorius* là một functio của chính $x$, bằng với tổng của những số hạng
trong chuỗi mà số $x$ chứa bao nhiêu đơn vị. Vậy số hạng tổng kết được so sánh như sau: nếu
đặt $x = 1$ thì ra số hạng thứ nhất của chuỗi; còn nếu đặt $x = 2$ thì ra tổng của số hạng
thứ nhất và thứ hai; đặt $x = 3$ thì ra tổng của ba số hạng đầu; và cứ thế. Do đó, nếu từ
chuỗi đã cho lập ra một chuỗi mới, mà số hạng thứ nhất của nó bằng số hạng thứ nhất của chuỗi
kia, số hạng thứ hai bằng tổng của hai số hạng đầu, số hạng thứ ba bằng tổng của ba số hạng
đầu, và cứ thế nữa, thì chuỗi mới ấy được gọi là *summatrix* của chuỗi kia, và số hạng tổng
quát của chuỗi *summatrix* ấy chính là số hạng tổng kết của chuỗi đã cho: từ đó, việc tìm
số hạng tổng kết quy về việc tìm số hạng tổng quát.

**54.** Giả sử chuỗi đã cho là

$$
a,\quad a^{\mathrm{I}},\quad a^{\mathrm{II}},\quad a^{\mathrm{III}},\quad a^{\mathrm{IV}},\quad a^{\mathrm{V}},\quad \&c.
$$

và *summatrix* của chuỗi ấy là

$$
A,\quad A^{\mathrm{I}},\quad A^{\mathrm{II}},\quad A^{\mathrm{III}},\quad A^{\mathrm{IV}},\quad A^{\mathrm{V}},\quad \&c.
$$

thì, theo bản chất của nó như vừa trình bày:

$$
A =
$$

<!-- Ghi chú dịch giả: đầu trang nối từ chữ "gene-" và chữ bắt "rali" ở cuối trang 51, nên
     câu đầu trang này là "Quin etiam ex termino generali ii termini, quorum indices sunt
     fracti, definiuntur". Bản in viết "ii" bằng hai chữ i có dấu chấm riêng; đã soi ở độ
     phóng 4 và xác nhận đúng là "ii", không phải chữ "in" bị mòn. Cụm "generali ii
     termini" không cho nghĩa rõ ràng, nhưng đây là chỗ đọc chắc chắn về hình thức, nên
     giữ nguyên như in và ghi sự nghi vấn thay vì tự sửa. -->

<!-- Ghi chú dịch giả: hai dòng số hạng ở §54 đã soi và xác nhận đều có đủ sáu số hạng với
     số mũ I, II, III, IV, V rõ ràng, không chỗ nào mòn. Cả hai dòng cùng dài, đúng như
     lập luận ở §53 rằng chuỗi mới lấy số hạng thứ nhất của chuỗi cũ làm số hạng thứ nhất. -->

<!-- Ghi chú dịch giả: trang 52 kết thúc giữa chừng một công thức, chỉ mới in được "A =", nên
     vế phải nằm ở trang kế. Vì trang kết thúc bằng công thức chứ không phải bằng chữ của
     văn xuôi nên trang này không có chữ bắt, cũng không có dấu hiệu chữ ở giữa chân
     trang; đã kiểm bằng cách dò dải chữ in trên ảnh, không có dải nào nữa dưới dòng "A =".
     Số trang 52 đặt bên trái đầu trang. -->

<!-- PDF 81, trang in 53 -->

$$
A = a
$$

$$
A^{\mathrm{I}} = a + a^{\mathrm{I}}
$$

$$
A^{\mathrm{II}} = a + a^{\mathrm{I}} + a^{\mathrm{II}}
$$

$$
A^{\mathrm{III}} = a + a^{\mathrm{I}} + a^{\mathrm{II}} + a^{\mathrm{III}}
$$

$$
A^{\mathrm{IV}} = a + a^{\mathrm{I}} + a^{\mathrm{II}} + a^{\mathrm{III}} + a^{\mathrm{IV}}
$$

$$
\&c.
$$

Nên differentia của chuỗi *summatrix* sẽ là:

$$
A^{\mathrm{I}} - A = a^{\mathrm{I}};\quad A^{\mathrm{II}} - A^{\mathrm{I}} = a^{\mathrm{II}};\quad A^{\mathrm{III}} - A^{\mathrm{II}} = a^{\mathrm{III}};\quad \&c.
$$

Từ đó, chuỗi đã cho, bớt đi số hạng thứ nhất, chính là chuỗi differentia bậc nhất của chuỗi
*summatrix* ấy. Nếu ta gán cho chuỗi *summatrix* một số hạng đầu $= 0$ để có được

$$
0,\quad A,\quad A^{\mathrm{I}},\quad A^{\mathrm{II}},\quad A^{\mathrm{III}},\quad A^{\mathrm{IV}},\quad A^{\mathrm{V}},\quad \&c.
$$

thì chuỗi differentia bậc nhất của nó chính là chuỗi đã cho:

$$
a,\quad a^{\mathrm{I}},\quad a^{\mathrm{II}},\quad a^{\mathrm{III}},\quad a^{\mathrm{IV}},\quad a^{\mathrm{V}},\quad \&c.
$$

**55.** Vì thế, differentia bậc nhất của chuỗi đã cho chính là differentia bậc hai của chuỗi
*summatrix*; còn differentia bậc hai của nó là differentia bậc ba của chuỗi đã cho; và
differentia bậc ba của nó là bậc bốn của chuỗi đã cho, và cứ thế. Vậy nếu chuỗi đã cho
cuối cùng có differentia hằng, thì *summatrix* của nó cũng sẽ dẫn tới differentia hằng,
và do đó là một chuỗi cùng bản chất, chỉ ở bậc cao hơn một bậc. Với loại chuỗi như thế, số
hạng tổng kết sẽ luôn có thể được trình bày bằng một biểu thức hữu hạn. Vì số hạng tổng quát
của chuỗi

$$
0,\quad A,\quad A^{\mathrm{I}},\quad A^{\mathrm{II}},\quad A^{\mathrm{III}},\quad A^{\mathrm{IV}},\quad \&c.
$$

tức là số hạng ứng với chỉ số $x$, sẽ trình bày tổng của $x - 1$

<!-- Ghi chú dịch giả: năm dòng định nghĩa A, A^I, A^II, A^III, A^IV ở đầu trang đã soi và
     xác nhận đủ số mũ, không chỗ nào mòn. Dòng differentia ở giữa trang cũng đã soi ở độ
     phóng 2.2 và xác nhận đủ số mũ: A^I - A = a^I, A^II - A^I = a^II, A^III - A^II =
     a^III. Trang này không có lỗi in. -->

<!-- Ghi chú dịch giả: toàn bộ lập luận đã tự kiểm và đúng. Từ định nghĩa A = a và
     A^I = a + a^I thì A^I - A = a^I; tương tự A^II - A^I = a^II và A^III - A^II = a^III,
     đúng như dòng in. Với dãy 0, A, A^I, ..., A^V, lấy hiệu bậc nhất cho a, a^I, a^II,
     a^III, a^IV, a^V, tức chính là chuỗi đã cho, đúng như Euler nói. Dãy bậc nhất ấy có sáu
     số hạng cùng số lượng với chuỗi đã cho, còn dãy gốc có bảy số hạng, đúng vì mỗi lần
     lấy hiệu mất một số hạng. -->

<!-- Ghi chú dịch giả: trang 53 kết thúc giữa chừng câu, ở chữ "x - 1", và mép phải chân
     trang mang chữ bắt "ter-", nối sang trang kế thành "terminorum". Dấu hiệu trang ở giữa
     chân trang là "G 3". Số trang 53 đặt bên phải đầu trang. -->

<!-- PDF 82, trang in 54 -->

…số hạng của chuỗi này là $a,\ a^{\mathrm{I}},\ a^{\mathrm{II}},\ a^{\mathrm{III}},\ a^{\mathrm{IV}},\ \&c.$;
và nếu thay $x$ bằng $x+1$ thì sẽ có tổng của $x$ số hạng, tức là chính số hạng tổng kết.

**56.** Giả sử chuỗi đã cho là

**Seriei propositae**

$$
a,\quad a^{\mathrm{I}},\quad a^{\mathrm{II}},\quad a^{\mathrm{III}},\quad a^{\mathrm{IV}},\quad a^{\mathrm{V}},\quad a^{\mathrm{VI}},\quad \&c.
$$

**Series differentiarum primarum**

$$
b,\quad b^{\mathrm{I}},\quad b^{\mathrm{II}},\quad b^{\mathrm{III}},\quad b^{\mathrm{IV}},\quad b^{\mathrm{V}},\quad b^{\mathrm{VI}},\quad \&c.
$$

**Series differentiarum secundarum**

$$
c,\quad c^{\mathrm{I}},\quad c^{\mathrm{II}},\quad c^{\mathrm{III}},\quad c^{\mathrm{IV}},\quad c^{\mathrm{V}},\quad c^{\mathrm{VI}},\quad \&c.
$$

**Series differentiarum tertiarum**

$$
d,\quad d^{\mathrm{I}},\quad d^{\mathrm{II}},\quad d^{\mathrm{III}},\quad d^{\mathrm{IV}},\quad d^{\mathrm{V}},\quad d^{\mathrm{VI}},\quad \&c.
$$

và cứ thế cho tới khi tới differentia hằng. Sau đó hãy lập chuỗi *summatrix*, mà khi đã gán
cho nó số hạng đầu là $0$ thay cho số hạng thứ nhất, sẽ cùng với các chuỗi differentia liên
tiếp của nó có dạng sau đây:

**INDICES.**

$$
1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad 7,\quad \&c.
$$

**SUMMATRIX.**

$$
0,\quad A,\quad A^{\mathrm{I}},\quad A^{\mathrm{II}},\quad A^{\mathrm{III}},\quad A^{\mathrm{IV}},\quad A^{\mathrm{V}},\quad \&c.
$$

**SERIES PROPOSITA.**

$$
a,\quad a^{\mathrm{I}},\quad a^{\mathrm{II}},\quad a^{\mathrm{III}},\quad a^{\mathrm{IV}},\quad a^{\mathrm{V}},\quad a^{\mathrm{VI}},\quad \&c.
$$

**DIFFER. I.**

$$
b,\quad b^{\mathrm{I}},\quad b^{\mathrm{II}},\quad b^{\mathrm{III}},\quad b^{\mathrm{IV}},\quad b^{\mathrm{V}},\quad b^{\mathrm{VI}},\quad \&c.
$$

**DIFFER. II.**

$$
c,\quad c^{\mathrm{I}},\quad c^{\mathrm{II}},\quad c^{\mathrm{III}},\quad c^{\mathrm{IV}},\quad c^{\mathrm{V}},\quad c^{\mathrm{VI}},\quad \&c.
$$

**DIFFER. III.**

$$
d;\quad d^{\mathrm{I}},\quad d^{\mathrm{II}},\quad d^{\mathrm{III}},\quad d^{\mathrm{IV}},\quad d^{\mathrm{V}},\quad d^{\mathrm{VI}},\quad \&c.
$$

<!-- Ghi chú dịch giả: trong dòng DIFFER. III. bản in dùng dấu chấm phẩy trên sau chữ d đầu
     tiên, trong khi các dấu còn lại trong dòng đều là phẩy. Đã soi ở độ phóng 6: dấu ấy có
     chấm trên rõ ràng, khác hẳn phẩy thường chỉ có đuôi, nên đây là dấu chấm phẩy thật, giữ
     nguyên như in. -->

<!-- Ghi chú dịch giả: số số hạng ở bảng cuối trang đáng để lưu ý, chép nguyên văn. Dòng
     INDICES in bảy chỉ số 1 tới 7; dòng SUMMATRIX in bảy số hạng (0, A, A^I, A^II, A^III,
     A^IV, A^V); dòng SERIES PROPOSITA in bảy số hạng (a tới a^VI); và cả ba dòng DIFFER.
     I, II, III. cũng in bảy số hạng, tức bằng đúng số số hạng của dòng ngay trên. Nhưng lấy
     hiệu một lần thì số số hạng phải giảm đi một, nên về hình thức các dòng DIFFER. ở đây
     dài hơn số lẽ ra phải có. Bảng tương ứng ở trang 43 lại rút ngắn dần (dòng cuối chỉ
     còn ba chữ d), nên hai chỗ không cùng một cách làm. Có thể đây chỉ là cách sắp bố trí
     để các dòng nhìn thẳng nhau, nhưng chưa đủ căn cứ để khẳng định, nên ở đây chỉ ghi
     nhận xét chứ không sửa. -->

<!-- Ghi chú dịch giả: trang 54 kết thúc ở đúng dòng DIFFER. III., mép phải chân trang mang
     chữ bắt "erit". Trang này không có dấu hiệu chữ ở giữa chân trang. Số trang 54 đặt
     bên trái đầu trang. -->

<!-- PDF 83, trang in 55 -->

…sẽ là số hạng tổng quát của chuỗi *summatrix*, tức là số hạng ứng với chỉ số $x$:

$$
0 + (x-1)a + \frac{(x-1)(x-2)}{1\cdot 2}b + \frac{(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3}c + \&c.
$$

Công thức này đồng thời trình bày tổng của $x - 1$ số hạng của chuỗi đã cho, tức là
$a,\ a^{\mathrm{I}},\ a^{\mathrm{II}},\ a^{\mathrm{III}},\ a^{\mathrm{IV}},\ \&c.$

**57.** Vậy nếu trong tổng ấy, thay $x - 1$ bằng $x$, thì sẽ có số hạng tổng kết của chuỗi đã
cho, bao gồm tổng của $x$ số hạng:

$$
= xa + \frac{x(x-1)}{1\cdot 2}b + \frac{x(x-1)(x-2)}{1\cdot 2\cdot 3}c + \frac{x(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3\cdot 4}d + \&c.
$$

Do đó, nếu các chữ $b,\ c,\ d,\ e$ giữ nguyên những giá trị đã gán cho chúng, thì:

**SERIEI.**

$$
a,\quad a^{\mathrm{I}},\quad a^{\mathrm{II}},\quad a^{\mathrm{III}},\quad a^{\mathrm{IV}},\quad a^{\mathrm{V}},\quad \&c.
$$

**TERMINUS GENERALIS.**

$$
a + (x-1)b + \frac{(x-1)(x-2)}{1\cdot 2}c + \frac{(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3}d + \frac{(x-1)(x-2)(x-3)(x-4)}{1\cdot 2\cdot 3\cdot 4}e + \&c.
$$

**ET TERMINUS SUMMATORIUS.**

$$
xa + \frac{x(x-1)}{1\cdot 2}b + \frac{x(x-1)(x-2)}{1\cdot 2\cdot 3}c + \frac{x(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3\cdot 4}d + \&c.
$$

Vậy, khi đã biết số hạng tổng quát của một chuỗi thuộc bậc nào, chẳng khó gì tìm được số
hạng tổng kết từ đó, vì số hạng tổng kết ấy cũng dựng được từ chính những differentia ấy.

**58.** Hic

<!-- Ghi chú dịch giả: ba công thức ở trang này đã tự kiểm và cả ba đều đúng. Với
     a=5, b=2, c=3, d=7 thì số hạng tổng quát là 5, 7, 12, 27, 59, &c. Công thức ở §56 cho
     tổng của x-1 số hạng: với x=5 cho 51, đúng bằng 5+7+12+27. Công thức ở §57 cho tổng
     của x số hạng: với x=5 cho 110, đúng bằng 5+7+12+27+59. Công thức TERMINUS
     GENERALIS cho số hạng có chỉ số x: công thức này có **năm** số hạng, kết bằng
     số hạng (x-1)(x-2)(x-3)(x-4)/(1·2·3·4) * e, nên với x=5 nó cho 59 + e, ra 59
     khi lấy e = 0; bốn số hạng đầu cho đúng 5 + 8 + 18 + 28 = 59. Cũng đã thử lặp lại
     với mười chỉ số khác, đều khớp.

     Đính chính một chỗ đọc trước đây: câu văn xưa "si litterae b, c, d, e, valores ipsis
     assignatos retineant" liệt kê **bốn** chữ b, c, d, e, và TERMINUS GENERALIS thật sự
     kết bằng số hạng *e. Lớp OCR đọc trang này nuốt mất chữ e trong cả hai chỗ, nên từng
     có thể nghi ngờ là thêm số hạng thừa. Đã soi lại bằng mắt trên ảnh scan (PDF 83,
     trang in 55) render thẳng từ file PDF ở độ phóng cao: cả hai đều có chữ e, bản dịch
     chép đúng, không có số hạng thừa nào. -->

<!-- Ghi chú dịch giả: các mẫu số trên trang này cũng viết theo kiểu "1." trên "2", "1. 2. 3"
     như ở các trang trước; ở đây đã viết thành 1·2, 1·2·3, 1·2·3·4 cho rõ. -->

<!-- Ghi chú dịch giả: trang 55 kết thúc ở chữ "58. Hic", tức số mục và chữ đầu tiên của §58
     được đặt sẵn ở mép phải chân trang, đúng chỗ của chữ bắt, rồi §58 nối tiếp ở trang
     kế. Trang này không có dấu hiệu chữ ở giữa chân trang. Số trang 55 đặt bên phải đầu
     trang. -->

<!-- PDF 84, trang in 56 -->

**58.** Cách tìm số hạng tổng kết qua differentia của chuỗi này, trước hết thích hợp với
những chuỗi cuối cùng dẫn tới differentia hằng; vì ở những trường hợp khác thì không tìm
được biểu thức hữu hạn. Nhưng nếu ta xét kỹ những điều đã nói ở trước về bản chất của số hạng
tổng kết, thì có một cách khác để tìm trực tiếp số hạng tổng kết từ số hạng tổng quát, cách
này rộng hơn nhiều, và trong vô số trường hợp dẫn tới biểu thức hữu hạn, trong khi cách trước
dẫn tới vô hạn. Giả sử cho một chuỗi bất kỳ:

$$
a,\quad b,\quad c,\quad d,\quad e,\quad f,\quad \&c.
$$

mà số hạng tổng quát của nó, tức là số hạng ứng với chỉ số $x$, là $X$; còn số hạng tổng kết
là $S$, thì vì $S$ trình bày tổng của tất cả những số hạng tính từ đầu mà số $x$ chứa bao
nhiêu đơn vị, nên tổng của $x - 1$ số hạng sẽ là $S - X$; và do đó $X$ chính là differentia
của biểu thức $S - X$, vì biểu thức này còn lại khi lấy $S$ ở trên trừ nó đi.

**59.** Vậy, vì $X = \Delta(S - X)$ là differentia lấy theo đúng cách đã dạy ở chương trước,
chỉ khác ở một điểm là đại lượng hằng $\omega$ ở đây được đặt bằng $1$. Do đó, nếu trở lại với
các tổng, ta có $\Sigma X = S - X$, và do đó số hạng tổng kết cần tìm là

$$
S = \Sigma X + X + C.
$$

Vậy cần tìm tổng của functio $X$ theo cách đã dạy trước đây, rồi cộng thêm chính số hạng tổng
quát $X$ vào đó, và tổng ấy chính là số hạng tổng kết. Nhưng vì

<!-- Ghi chú dịch giả: bản in dính chữ "offterminum", thiếu khoảng trắng giữa "offert" và
     "terminum". Đã soi và xác nhận: trong cùng dòng đó, các cặp "modus se", "terminum
     summatorium", "summatorium immediate", "immediate ex" đều có khoảng trắng rõ, chỉ riêng
     "offterminum" dính liền. Giữ nguyên như in. -->

<!-- Ghi chú dịch giả: đẳng thức ở §59 đã tự kiểm và đúng. Với a=5, b=2, c=3, d=7 thì số
     hạng tổng quát X là 5, 7, 12, 27, 59, &c. và số hạng tổng kết S là 5, 12, 24, 51, 110,
     &c. Kiểm S - X với tổng của x-1 số hạng đầu, cả hai cho 0, 5, 12, 24, 51 ở các chỉ số
     1 tới 5, đều khớp. Còn C thì bằng không, vì ở §56 chuỗi summatrix được lập với số hạng
     đầu bằng 0, tức đã chọn sẵn hằng số của nguyên hàm; với chuẩn hóa ấy thì S =
     SigmaX + X + 0. C là hằng số tùy ý của nguyên hàm, nên vẫn được giữ trong công thức. -->

<!-- Ghi chú dịch giả: trang 56 kết thúc giữa chữ ở "Quoniam autem", mép phải chân trang mang
     chữ bắt "in". Trang này không có dấu hiệu chữ ở giữa chân trang. Số trang 56 đặt bên trái
     đầu trang. -->

<!-- PDF 85, trang in 57 -->

…trong các tổng phải lấy có một đại lượng hằng ở đó, hoặc phải cộng vào hoặc phải trừ đi; và
nó phải được điều chỉnh cho trường hợp đang xét. Nhưng rõ ràng là, nếu đặt $x = 0$ thì trong
trường hợp ấy số số hạng phải cộng bằng không, và tổng cũng bằng không; từ đó đại lượng hằng
$C$ ấy phải được xác định sao cho khi đặt $x = 0$ thì $S$ cũng bằng $0$. Đặt cả $S = 0$ lẫn
$x = 0$ vào phương trình $S = \Sigma X + X + C$ ấy, ta sẽ tìm được giá trị của $C$.

**60.** Vậy cả công việc này còn dễ hơn nữa, vì toàn bộ đã quy về việc cộng các functio như đã
chỉ ra ở trên; do đó, khi đặt $\omega = 1$, ta lấy ra được những công thức cộng đã biết. Trước
hết, với các lũy thừa của chính $x$, ta có

$$
\Sigma x^{0} = \Sigma 1 = x
$$

$$
\Sigma x = \frac{1}{2}x^{2} - \frac{1}{2}x
$$

$$
\Sigma x^{2} = \frac{1}{2}x^{3} - \frac{1}{2}x^{2} + \frac{1}{2}x
$$

$$
\Sigma x^{3} = \frac{1}{4}x^{4} - \frac{1}{2}x^{3} + \frac{1}{4}x^{2}
$$

$$
\Sigma x^{4} = \frac{1}{5}x^{5} - \frac{1}{2}x^{4} + \frac{1}{3}x^{3} - \frac{1}{30}x
$$

$$
\Sigma x^{5} = \frac{1}{6}x^{6} - \frac{1}{2}x^{5} + \frac{5}{12}x^{4} - \frac{1}{12}x^{2}
$$

$$
\Sigma x^{6} = \frac{1}{7}x^{7} - \frac{1}{2}x^{6} + \frac{1}{2}x^{5} - \frac{1}{6}x^{3} + \frac{1}{42}x
$$

cộng thêm công thức chung cho lũy thừa bậc $x^{n}$ đã dạy ở § 29, với điều kiện ở đó phải viết
$\omega$ thành đơn vị ở mọi chỗ. Nhờ vậy, nhờ những công thức này, số hạng tổng kết của mọi
chuỗi mà số hạng tổng quát là functio phân thức nguyên của chính $x$ đều có thể tìm được mau
chóng.

<!-- Ghi chú dịch giả: cả bảy công thức ở trang này đã soi lại từng dòng bằng cách cắt vùng
     và render thẳng từ file PDF ở độ phóng 30, cho ảnh sắc hơn hẳn ảnh nền 1900 pixel.
     Kết quả như chép ở trên. -->

<!-- Ghi chú dịch giả: TRONG BẢY CÔNG THỨC ẤY CHỈ CÓ HAI CÔNG THỨC IN SAI, đã chép nguyên văn.
     Quy ước của bảng là tổng của các số hạng từ 1 tới x-1, quy ước này do chính dòng
     Sigma x = 1/2 x^2 - 1/2 x xác định, vì nó đúng với 1 + 2 + ... + (x-1). Lấy quy ước ấy
     để kiểm thì:

     (i)  Sigma x^0 in ra x, đúng phải là x-1. Lệch đúng một đơn vị.
     (ii) Sigma x^2 in ra 1/2 x^3 - 1/2 x^2 + 1/2 x, đúng phải là 1/3 x^3 - 1/2 x^2 + 1/6 x.
          Sai cả hệ số của x^3 (1/2 thay vì 1/3) lẫn của x (1/2 thay vì 1/6).

     Năm công thức còn lại, tức Sigma x, Sigma x^3, Sigma x^4, Sigma x^5 và Sigma x^6, in
     đúng hoàn toàn. -->

<!-- Ghi chú dịch giả: SAI LẦM CỦA CHÍNH NGƯỜI DỊCH, ĐÃ SỬA. Lần đọc đầu tiên trên ảnh nền
     1900 pixel cho ra tới bốn dòng sai, gồm cả Sigma x^3 và Sigma x^5. Khi render lại từ PDF
     ở độ phóng 30 thì hai dòng ấy hoá ra đúng: Sigma x^3 in ra 1/4 x^4 - 1/2 x^3 + 1/4 x^2,
     và Sigma x^5 in ra 1/6 x^6 - 1/2 x^5 + 5/12 x^4 - 1/12 x^2. Trong lần đọc sai, mẫu số 4
     bị đọc thành 2, và hệ số 5/12 bị đọc thành 2/5. Bài học: ảnh nền 1900 pixel quá thô đối
     với các phân số xếp chồng cỡ này, và phải soi lại bằng ảnh render từ PDF mỗi khi cách
     đọc không khớp với giá trị tính được. -->

<!-- Ghi chú dịch giả: cách kiểm đã dùng, để nêu lại thì gồm ba bước. (1) Kiểm tại x=1: tổng
     của không số hạng nào phải bằng không, mà hai công thức sai ở trên cho lần lượt 1 và
     1/2, đều khác không, còn năm công thức đúng cho bằng không. (2) So trực tiếp với tổng
     thật 1^n + 2^n + ... + (x-1)^n với x từ 2 tới 8: năm công thức đúng khớp ở cả bảy chỉ
     số, còn hai công thức sai lệch ở cả bảy chỉ số. (3) Dựng lại hệ số bằng cách khớp đa
     thức với các giá trị của tổng thật, cho đúng những hệ số đã nêu ở trên. -->

<!-- Ghi chú dịch giả: với bốn hệ số dài gồm nhiều chữ số, việc cách đọc ở độ phóng thấp đã
     khớp ngay với giá trị tính được, nên không cần soi lại: một lần đọc nhầm mà vẫn trùng
     với một con số dài mười chữ số thì gần như không thể xảy ra. Chỉ những chỗ lệch mới đáng
     soi kỹ. -->

<!-- Ghi chú dịch giả: chỗ "siue addenda siue subtractrahenda" ở đầu trang đã soi ở độ phóng
     2.1 và xác nhận có đủ chữ t trong "subtrahenda", tức không có lỗi ở đây. -->

<!-- Ghi chú dịch giả: trang 57 kết thúc ở câu "...termini summatorii expedite inveniri
     poterunt.", rồi mép phải chân trang mang chữ bắt "61. De-" mở đầu §61. Dấu hiệu trang
     ở giữa chân trang là H. Số trang 57 đặt bên phải đầu trang. -->

<!-- PDF 86, trang in 58 -->

**61.** Hãy gọi $S.X$ là số hạng tổng kết của chuỗi mà số hạng tổng quát là $X$; thì, như đã
thấy, $S.X = \Sigma X + X + C$, với điều kiện hằng số $C$ được chọn sao cho số hạng tổng kết
$S.X$ bằng không khi đặt $x = 0$. Vậy hãy trình bày các số hạng tổng kết của những chuỗi
lũy thừa, tức là những chuỗi mà số hạng tổng quát có dạng $x^{n}$. Đặt

$$
S.x^{n} = 1 + 2^{n} + 3^{n} + 4^{n} + \ldots + x^{n}
$$

thì ta có

$$
\begin{aligned}
S.x^n =\;& \frac{1}{n+1}x^{n+1} + 1 + \frac{1}{2}x^{n} \\
&+ \frac{1}{2}\cdot\frac{n}{2\cdot 3}x^{n-1} - \frac{1}{6}\cdot\frac{n(n-1)(n-2)}{2\cdot 3\cdot 4\cdot 5}x^{n-3} \\
&+ \frac{1}{6}\cdot\frac{n(n-1)(n-2)(n-3)(n-4)}{2\cdot 3\cdot 4\cdot 5\cdot 6\cdot 7}x^{n-5} \\
&- \frac{3}{10}\cdot\frac{n(n-1)}{2\cdot 3}\cdot\frac{\ldots}{4\cdot 5\cdot 6\cdot 7}\cdot\frac{n-6}{8\cdot 9}x^{n-7} \\
&+ \frac{5}{6}\cdot\frac{n(n-1)}{2\cdot 3}\cdot\frac{\ldots}{4\cdot 5\cdot 6\cdot 7\cdot 8\cdot 9}\cdot\frac{n-8}{10\cdot 11}x^{n-9} \\
&- \frac{691}{210}\cdot\frac{n(n-1)}{2\cdot 3}\cdots\frac{n-10}{12\cdot 13}x^{n-11} \\
&+ \frac{35}{2}\cdot\frac{n(n-1)}{2\cdot 3}\cdots\frac{n-12}{14\cdot 15}x^{n-13} \\
&- \frac{3617}{30}\cdot\frac{n(n-1)}{2\cdot 3}\cdots\frac{n-14}{16\cdot 17}x^{n-15} \\
&+ \frac{43867}{42}\cdot\frac{n(n-1)}{2\cdot 3}\cdots\frac{n-16}{18\cdot 19}x^{n-17} \\
&- \frac{1222277}{110}\cdot\frac{n(n-1)}{2\cdot 3}\cdots\frac{n-18}{20\cdot 21}x^{n-19} \\
&+ \frac{854513}{6}\cdot\frac{n(n-1)}{2\cdot 3}\cdots\frac{n-20}{22\cdot 23}x^{n-21} \\
&- \frac{11818204555}{546}\cdot\frac{n(n-1)}{2\cdot 3}\cdots\frac{n-22}{24\cdot 25}x^{n-23} \\
&+ \frac{76977927}{2}\cdot\frac{n(n-1)}{2\cdot 3}\cdots\frac{n-24}{26\cdot 27}x^{n-25}
\end{aligned}
$$

<!-- Ghi chú dịch giả: mười ba hệ số của công thức trên đã tự kiểm và MƯỜI HAI TRONG SỐ ĐÓ ĐÚNG
     với giá trị toán học. Cách kiểm: khai triển đa thức tổng 1^n + 2^n + ... + x^n bằng
     cách nội suy tại mười một điểm nguyên rồi so hệ số của từng lũy thừa, rồi chia cho
     tích lùi n(n-1)...(n-2k+2) và mẫu (2k+1)!. Kết quả, hệ số phải bằng B(2k)·(2k+1), và
     các giá trị đúng là:

     1/2, -1/6, 1/6, -3/10, 5/6, -691/210, 35/2, -3617/30, 43867/42, -1222277/110,
     854513/6, -1181820455/546, 76977927/2

     Mười hai hệ số đầu trong bản in khớp đúng danh sách này. -->

<!-- Ghi chú dịch giả: hệ số thứ mười hai in SAI, đã chép nguyên văn. Bản in cho tử số
     11818204555 gồm mười một chữ số, đúng phải là 1181820455 gồm mười chữ số; tức bản in
     thừa đúng một chữ số 5 ở cuối, làm tử số lớn gấp mười lần giá trị đúng. Đã soi ở độ
     phóng 40 trên ảnh sắc nét, cả mười một chữ số hiện rõ và đếm được. -->

<!-- Ghi chú dịch giả: bản in có một hạt "+ 1" đứng giữa x^(n+1) và (1/2)x^n, tức là một hằng
     số không có trong khai triển. Đã soi ở độ phóng 60 và xác nhận đúng là "+ 1" với dấu cộng
     và chữ số một riêng, không phải chữ số tử của phân số kế bên. Cũng như vậy, hạt này không
     cần cho lập luận ở §59, nơi S = SigmaX + X + C. Đã chép nguyên văn. -->

<!-- Ghi chú dịch giả: BÀI HỌC VỀ CÁCH SOI. Lần đọc đầu tiên ở độ phóng thấp cho ra năm hệ số
     sai, lần lượt là -1/56, 1/24, -5/96, 1/48 và -3/56, nên tưởng bản in sai ở cả năm chỗ.
     Khi render thẳng từ file PDF ở độ phóng 40 tới 150, cả năm hoá ra đúng: lần lượt là
     -3/10, 5/6, -691/210, 35/2 và -3617/30. Ảnh nền rộng 1900 pixel quá thô đối với các
     phân số xếp chồng cỡ này; phải cắt vùng và render lại từ PDF thì mới đọc được. -->

<!-- Ghi chú dịch giả: dấu chấm phẩy ở các mẫu số được in thành dạng "1. 2. 3. 4. 5" như
     những trang trước; ở đây đã viết thành 1·2·3·4·5 cho rõ. -->

<!-- Ghi chú dịch giả: trang 58 kết thúc ở chữ "&c." dưới cùng công thức, mép phải chân trang
     mang chữ bắt "62." mở đầu §62. Trang này không có dấu hiệu chữ ở giữa chân trang. Số
     trang 58 đặt bên trái đầu trang. -->

<!-- PDF 87, trang in 59 -->

**62.** Vậy thì các tổng ấy, ứng với những giá trị khác nhau của chính $n$, sẽ có dạng sau đây:

$$
S.x^{0} = x
$$

$$
S.x^{1} = \frac{1}{2}x^{2} + \frac{1}{2}x
$$

$$
S.x^{2} = \frac{1}{3}x^{3} + \frac{1}{2}x^{2} + \frac{1}{6}x
$$

$$
S.x^{3} = \frac{1}{4}x^{4} + \frac{1}{2}x^{3} + \frac{1}{4}x^{2}
$$

$$
S.x^{4} = \frac{1}{5}x^{5} + \frac{1}{2}x^{4} + \frac{1}{3}x^{3} - \frac{1}{30}x
$$

$$
S.x^{5} = \frac{1}{6}x^{6} + \frac{1}{2}x^{5} + \frac{5}{12}x^{4} - \frac{1}{12}x^{2}
$$

$$
S.x^{6} = \frac{1}{7}x^{7} + \frac{1}{2}x^{6} + \frac{1}{2}x^{5} - \frac{1}{6}x^{3} + \frac{1}{42}x
$$

$$
S.x^{7} = \frac{1}{8}x^{8} + \frac{1}{2}x^{7} + \frac{7}{12}x^{6} - \frac{7}{4}x^{4} + \frac{1}{2}x^{2}
$$

$$
S.x^{8} = \frac{1}{9}x^{9} + \frac{1}{2}x^{8} + \frac{2}{3}x^{7} - \frac{7}{15}x^{5} + \frac{2}{9}x^{3} - \frac{1}{30}x
$$

$$
S.x^{9} = \frac{1}{10}x^{10} + \frac{1}{2}x^{9} + \frac{3}{4}x^{8} - \frac{7}{10}x^{6} + \frac{1}{2}x^{4} - \frac{3}{20}x^{2}
$$

$$
S.x^{10} = \frac{1}{11}x^{11} + \frac{1}{2}x^{10} + \frac{5}{6}x^{9} - x^{7} + x^{5} - \frac{1}{2}x^{3} + \frac{5}{66}x
$$

$$
S.x^{11} = \frac{1}{12}x^{12} + \frac{1}{2}x^{11} + \frac{11}{12}x^{10} - \frac{11}{8}x^{8} + \frac{11}{6}x^{6} - \frac{11}{8}x^{4} + \frac{5}{12}x^{2}
$$

$$
S.x^{12} = \frac{1}{13}x^{13} + \frac{1}{2}x^{12} + x^{11} - \frac{11}{6}x^{9} + \frac{22}{7}x^{7} - \frac{33}{10}x^{5} + \frac{5}{3}x^{3} - \frac{691}{2730}x
$$

$$
S.x^{13} = \frac{1}{14}x^{14} + \frac{1}{2}x^{13} + \frac{13}{12}x^{12} - \frac{143}{60}x^{10} + \frac{143}{28}x^{8} - \frac{143}{20}x^{6} + \frac{65}{12}x^{4} - \frac{691}{420}x^{2}
$$

$$
S.x^{14} = \frac{1}{15}x^{15} + \frac{1}{2}x^{14} + \frac{7}{6}x^{13} - \frac{91}{30}x^{11} + \frac{143}{18}x^{9} - \frac{143}{10}x^{7} + \frac{91}{6}x^{5} - 691x^{3} + \frac{7}{6}x
$$

$$
S.x^{15} = \frac{1}{16}x^{16} + \frac{1}{2}x^{15} + \frac{5}{4}x^{14} - \frac{91}{24}x^{12} + \frac{143}{12}x^{10} - \frac{429}{16}x^{8} + \frac{455}{12}x^{6} - \frac{691}{24}x^{4} + \frac{35}{4}x^{2}
$$

$$
S.x^{16} = \frac{1}{17}x^{17} + \frac{1}{2}x^{16} + \frac{4}{3}x^{15} - \frac{14}{3}x^{13} + \frac{52}{3}x^{11} - \frac{143}{3}x^{9} + \frac{260}{3}x^{7} - \frac{1382}{15}x^{5} + \frac{140}{3}x^{3} - \frac{3617}{510}x
$$

&c.

<!-- Ghi chú dịch giả: bảng này dùng quy ước TỔNG TỚI x, khác hẳn bảng ở trang trước (trang 57) dùng
     quy ước tổng tới x-1. Hai bảng ấy không mâu thuẫn, chúng là hai bảng khác nhau. Quy ước của
     bảng này do chính dòng S.x^0 = x xác định, và đã kiểm cả hai mươi mối số hạng đầu của các
     dòng từ S.x^1 tới S.x^6 với tổng thật 1 + 2 + ... + x, đều khớp. -->

<!-- Ghi chú dịch giả: CÓ BA LỖI IN TRONG BẢNG NÀY, đã chép nguyên văn.

     (i)  Dòng S.x^7 in ra - 7/4 x^4 + 1/2 x^2. Đúng phải là - 7/24 x^4 + 1/12 x^2. Cả hai
          mẫu số đều mất chữ số theo cùng một kiểu, 24 thành 4 và 12 thành 2. Đã soi dòng này
          ở độ phóng 46, cắt làm hai nửa, và mẫu số đọc ra là 12, 4, 2, sắc và tách bạch.

     (ii) Dòng S.x^14 in ra - 691 x^3, trần không có mẫu số. Đúng phải là - 691/90 x^3.
          Đã soi bằng cách quét ngưỡng mực trên vùng (156.0, 171.0) x (208.0, 215.0): không có
          thanh phân số nào dưới chữ 691, và vị trí mẫu số trống ở mọi ngưỡng. Vệt mực duy
          nhất bên dưới là nét dưới của chữ 9 ở chữ số 691, không phải mẫu số.

     Ba sai lầm của chính người dịch, đã sửa, ghi lại vì chúng lặp lại đúng cái bài học ở
     trang 57 và trang 58. Ở độ phóng thấp, các lần đọc cho ra S.x^7 có số hạng cuối là
     - 1/3 x^4 + 1/2 x^2, S.x^8 có - 7/3 x^5, S.x^9 có - 7/6 x^6 + 1/4 x^4, và S.x^14 có
     - 143/18 x^7. Cả bốn đều sai. Khi cắt vùng và render thẳng từ file PDF ở độ phóng 40
     tới 110 thì chúng hoá ra là - 7/4 x^4 + 1/2 x^2, - 7/15 x^5, - 7/10 x^6 + 1/2 x^4 và
     - 143/10 x^7. Ảnh nền rộng 1900 pixel và cả các mức phóng thấp hơn 40 đều quá thô đối với
     phân số xếp chồng cỡ này. -->

<!-- Ghi chú dịch giả: cách kiểm đã dùng cho cả mười bảy dòng, để nêu lại thì gồm ba bước.
     (1) Tính tổng thật 1^n + 2^n + ... + x^n với x từ 2 tới 9 rồi khớp đa thức bậc n+1 để
     dựng lại từng hệ số. (2) So từng hệ số dựng được với từng hệ số đọc được từ ảnh. (3) Chỗ
     nào lệch thì soi lại ô đó ở độ phóng cao hơn trước khi kết luận là lỗi in. Sau bước (3),
     cả bảng còn đúng ba chỗ sai, đã nêu ở trên. -->

<!-- Ghi chú dịch giả: hệ số bằng một ở một số nơi được in trần, không ghi chữ số một, và đã
     giữ nguyên như vậy: dòng S.x^10 có - x^7 + x^5, dòng S.x^12 có + x^11. -->

<!-- Ghi chú dịch giả: mỗi dòng của bảng tràn trên hai dòng in, dòng thứ hai thụt vào lề phải.
     Vì vậy số hạng cuối của dòng S.x^8, là - 1/30 x, nằm ở dòng in thứ hai, tức dưới bên
     phải dòng thứ nhất, chứ không nằm cùng hàng với các số hạng kia. -->

<!-- Ghi chú dịch giả: vài số mũ trong bảng bị lem thành một vệt mực nhỏ, đã đọc theo quy luật
     đi xuống hai đơn vị và nhờ đối chiếu với giá trị tính được. Cụ thể là số mũ 8 và số mũ 2 ở
     dòng S.x^13, và tử số 5 trong 5/4 ở dòng S.x^15. Ba chỗ ấy đã ghi ở đây vì độ tin cậy
     thấp hơn các ô còn lại, dù cả ba đều khớp giá trị đúng. -->

<!-- Ghi chú dịch giả: tiêu đề §62 in là "Hinc ergo summae pro variis ipsius n valori-bus ica se
     habebunt:", có ngắt dòng giữa chữ tại valori và bus. -->

<!-- Ghi chú dịch giả: dấu ở chân trang. Đầu trang mang chữ CAPUT II. ở giữa và số trang 59 ở
     bên phải. Cuối trang có "&c." ở giữa và chữ bắt "quae" ở bên phải. -->

<!-- Chưa dịch: PDF 88-97, tức trang in 60-69, gồm §63 trở đi và các EXEMPLUM của CAPUT II.
     Chữ bắt ở cuối trang 87 là "quae". -->
