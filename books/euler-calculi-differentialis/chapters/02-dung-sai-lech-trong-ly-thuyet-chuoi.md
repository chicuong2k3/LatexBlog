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

**37.** Ngay từ những điều sơ khai nhất, người ta đã biết rằng bản chất của các chuỗi được
minh họa rõ nhất bằng differentia. Bởi đặc tính chủ yếu của cấp số cộng — thứ được xét đến
trước tiên — nằm ở chỗ các differentia bậc nhất của nó bằng nhau; từ đó các differentia
bậc hai và mọi bậc cao hơn nữa đều bằng không. Sau đó có những chuỗi mà chỉ các differentia
bậc hai mới bằng nhau; vì lý do ấy người ta tiện lợi gọi chúng là những chuỗi *bậc hai*,
còn cấp số cộng thì gọi là các chuỗi *bậc nhất*. Như vậy còn có những chuỗi *bậc ba*, tức
là những chuỗi mà các differentia bậc ba là hằng; và về tới bậc bốn cùng những bậc kế tiếp,
ta quy chúng về những chuỗi mà các differentia bậc bốn, và những bậc cao hơn nữa, mới là hằng.

**38.** Trong cách phân chia vô hạn ấy thì bao hàm được các loại chuỗi; nhưng không phải
chuỗi nào cũng quy về được những loại ấy. Bởi có vô số chuỗi mà, khi lấy differentia, không
bao giờ dẫn tới những hạng hằng: thuộc loại ấy, ngoài vô số trường hợp khác, có các cấp số
nhân, chúng không bao giờ cho ra differentia hằng, như ta thấy được từ ví dụ sau đây.

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

Bởi vậy, nếu chuỗi đã cho thì các differentia thuộc cùng một bậc sẽ bằng nhau, thì các
differentia của chuỗi ấy có thể bị loại bỏ. Vì thế người ta còn phân nhiều loại chuỗi, trong
đó chỉ có một loại thuộc về những bậc ấy, tức là những loại mà differentia của nó quy về
hằng; và chúng ta sẽ xét kỹ nhất những loại ấy trong chương này.

**39.** Nhưng có hai điều cần thiết cho việc nhận ra bản chất của các chuỗi, đó là *số hạng
tổng quát* và *số hạng tổng kết*. Số hạng tổng quát là một biểu thức vô hạn, xác định số hạng
thứ $n$ của bất kỳ chuỗi nào; và điều ấy còn đúng khi biểu thức ấy chứa bao nhiêu biến tuỳ ý
cũng được, chẳng hạn khi đặt $x = 1$ thì nó cho số hạng thứ nhất của chuỗi, đặt $x = 2$ thì
số hạng thứ hai, đặt $x = 3$ thì số hạng thứ ba, đặt $x = 4$ thì số hạng thứ bốn, và cứ
thế. Đã có số hạng tổng quát thì số hạng thứ $n$ của một chuỗi nào đó sẽ tìm được, dù quy
luật của một số hạng riêng lẻ có phức tạp đến đâu; số hạng ấy không cần phải lặp lại. Chẳng
hạn nếu đặt $x = 1000$ thì số hạng lớn nhất của chuỗi sẽ nhận ra. Ta thấy các số hạng của
chuỗi này là

$$
1,\ 6,\ 15,\ 28,\ 45,\ 66,\ 91,\ 120,\ \&c.
$$

Số hạng tổng quát là $2xx - x$; bởi đặt $x = 1$ thì công thức ấy cho số hạng thứ nhất là $1$;
đặt $x = 2$ thì số hạng thứ hai là $6$; nếu đặt $x = 3$ thì số hạng thứ ba là $15$, &c. Ta
thấy số hạng tổng kết của chuỗi này, khi đặt $x = 100$, sẽ là $2.10000 - 100 = 19900$.

<!-- Ghi chú dịch giả: dãy số hạng 1, 6, 15, 28, 45, 66, 91, 120, &c. in ở đầu trang này
     thuộc về cuộc bàn ở trang trước; dòng thứ hai và dòng thứ ba in ngắn hơn, lần lượt
     dừng ở 64 và 32, đúng như các cấp số nhân mà §38 vừa nhắc tới. Vì nằm ở mép trên
     trang, ba dãy này được giữ nguyên vị trí. -->

<!-- Ghi chú dịch giả: số hạng tổng kết 2.10000 - 100 = 19900 đúng với 2xx - x tại
     x = 100: 2·10000 - 100 = 19900. Tổng của chuỗi 1+6+15+...+19900 cũng đúng bằng
     2x³/3 - x²/2, kiểm bằng phép lấy sai khác cho ra x² - x, đúng differentia bậc hai
     của chuỗi các số bình phương. -->

<!-- Ghi chú dịch giả: trang 68 kết thúc giữa chữ, câu cuối bị cắt ở "40. In-"; mép
     phải mang chữ catchword In-. Số trang 40 đặt bên trái đầu trang. -->

<!-- PDF 69, trang in 41 -->

**40.** Các chỉ số, tức là số mũ, trong bất kỳ chuỗi nào cũng được gọi là *các số*, chúng
chỉ ra mỗi số hạng đứng ở vị trí thứ mấy: chẳng hạn số hạng thứ nhất có chỉ số là $1$, số hạng
thứ hai là $2$, số hạng thứ ba là $3$, và cứ thế. Vì thế chỉ số của từng số hạng của một
chuỗi cũng thường được viết vào, theo cách sau

**INDICES.**

$$
1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad 7,\quad \&c.
$$

**TERMINI.**

$$
A,\quad B,\quad C,\quad D,\quad E,\quad F,\quad G,\quad \&c.
$$

từ đó thấy ngay $G$ là số hạng thứ bảy của chuỗi đã cho, vì chỉ số của nó là $7$. Còn số hạng
tổng quát thì chẳng qua là số hạng của chuỗi mà chỉ số hay số mũ của nó là một số vô hạn $x$.
Như vậy, trong bậc nào của các chuỗi mà các differentia hoặc bậc nhất, hoặc bậc hai, hoặc
những bậc thường nào khác là hằng, thì số hạng tổng quát cần tìm trước; ta sẽ chỉ ra điều
đó sau. Còn về việc khảo sát tổng thì ta sẽ đi tiếp theo thứ tự.

**41.** Hãy bắt đầu từ bậc thứ nhất, tức là bậc gồm các cấp số cộng, mà differentia bậc
nhất của chúng là hằng; nếu $a$ là số hạng thứ nhất của chuỗi và $b$ là số hạng đầu tiên
của dãy differentia của nó, thì tất cả các differentia đều bằng nhau. Nhờ vậy chuỗi ấy sẽ
được so sánh như sau

**INDICES.**

$$
1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad \&c.
$$

**TERMINI.**

$$
a,\quad a+b,\quad a+2b,\quad a+3b,\quad a+4b,\quad a+5b,\quad \&c.
$$

**DIFFERENTIAE.**

$$
b,\quad b,\quad b,\quad b,\quad b,\quad b,\quad \&c.
$$

<!-- Ghi chú dịch giả: ở dòng INDICES cuối trang, số 7 bị bản in bào mòn gần hết, chỉ còn
     vỏ ngoài. Đã soi và vẫn đọc là 7, đúng với dòng TERMINI ngay dưới (a, a+b, a+2b,
     a+3b, a+4b, a+5b) và với dòng DIFFERENTIAE gồm toàn những b. Mép phải chân trang có
     chữ catchword Ex, báo sang EXEMPLUM ở trang kế. Số trang 41 đặt bên phải. -->

<!-- PDF 70, trang in 42 -->

Từ đó thấy ngay rằng số hạng có chỉ số $x$ sẽ là $a + (x-1)b$; và vậy số hạng tổng quát là
$bx + a - b$, tức gồm hai số hạng đầu của chính chuỗi ấy và của chuỗi differentia của nó.

Nhưng nếu số hạng thứ hai $a+b$ của chuỗi được gọi là $a^{\mathrm{I}}$, thì vì $b = a^{\mathrm{I}} - a$,
số hạng tổng quát sẽ là

$$
(a^{\mathrm{I}} - a)x + 2a - a^{\mathrm{I}} = a^{\mathrm{I}}(x-1) - a(x-2)
$$

từ đó, khi đã biết số hạng thứ nhất và thứ hai của cấp số cộng, ta lập được số hạng tổng quát
của nó.

**42.** Giả sử trong một chuỗi bậc hai, số hạng thứ nhất của chính chuỗi là $a$; số hạng đầu
tiên của dãy differentia bậc nhất là $b$; số hạng đầu tiên của dãy differentia bậc hai là $c$;
ta sẽ so sánh chính chuỗi ấy với các differentia của nó như sau.

**INDICES.**

$$
1,\quad 2,\quad 3,\quad 4,\quad 5,\quad 6,\quad 7,
$$

**TERMINI.**

$$
a;\ a+b;\ a+2b+c;\ a+3b+3c;\ a+4b+6c;\ a+5b+10c;\ a+6b+15c;
$$

**DIFFER. I.**

$$
b;\ b+c;\quad b+2c;\quad b+3c;\quad b+4c;\quad b+5c;\quad \&c.
$$

**DIFFER. II.**

$$
c,\quad c,\qquad c,\qquad c,\qquad c,
$$

Từ việc xét bảng này thấy rõ số hạng có chỉ số $x$ sẽ là

$$
a + (x-1)b + \frac{(x-1)(x-2)}{1\cdot 2}c
$$

vậy đó là số hạng tổng quát của chuỗi đã cho. Còn nếu đặt số hạng thứ hai của chính chuỗi là
$a^{\mathrm{I}}$, số hạng thứ ba là $a^{\mathrm{II}}$, vì $b = a^{\mathrm{I}} - a$ và
$c = a^{\mathrm{II}} - 2a^{\mathrm{I}} + a$, thì như đã hiểu từ bản chất của các differentia (§ 10),
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

tức là số hạng tổng quát cũng được xác định bởi ba số hạng của chính chuỗi ấy.

<!-- Ghi chú dịch giả: hai dạng đầu đã tự kiểm và đúng: khai triển biểu thức ở §42 với
     b = a^I - a, c = a^II - 2a^I + a thì thu được đúng dạng "qui reducitur", còn "vel
     etiam" chỉ là cách viết lại cùng một biểu thức. -->

<!-- Ghi chú dịch giả: dạng "aut denique" in ra SAI, đã chép nguyên văn. Sai ở hai chỗ.
     (i) Trong ngoặc phải dùng a^II chứ không phải a^III: số hạng tổng quát của chuỗi bậc
     hai chỉ liên quan tới ba số hạng đầu a, a^I, a^II, đúng như câu ngay dưới nói nó
     được định nghĩa bởi ba số hạng ấy. (ii) Hệ số 1/4 phải là 1/2. Đã kiểm bằng phân
     tỉch với chuỗi 1, 4, 9, 16, 25, &c. (tức a=1, b=3, c=2): số hạng thứ 4 đúng là 16,
     dạng "vel etiam" cho 16, còn dạng bản in cho 37/2. Nếu chỉ sửa 1/4 thành 1/2 mà
     vẫn để a^III thì ra 37, vẫn sai. Sửa cả hai mới ra đúng 16. Cùng phép ấy đã thử trên
     bốn chuỗi khác nhau và nhiều chỉ số: hai dạng đầu luôn khớp, dạng bản in luôn lệch. -->

<!-- Ghi chú dịch giả: trong câu về differentia bậc ba, bản in viết "d, d^I, d, &c.": chữ d
     thứ ba không có số mũ, trong khi hai dòng ngay trên có đủ (b, b^I, b^II, b^III và
     c, c^I, c^II, c^III). Đã soi ở độ phóng 22 để chắc chắn. Đúng phải là d^II. Giữ
     nguyên như in. -->

<!-- Ghi chú dịch giả: ở dòng DIFFER. III. trong bảng, số mũ trên cả ba chữ d đều mòn đến
     mức không đọc được; ở đây chép ba chữ d trần, và đã ghi chú ở trên rằng chỗ này có
     lẽ phải là d, d^I, d^II. Số trang 43 đặt bên phải; mép phải chân trang mang chữ
     catchword Quia, mở đầu câu của trang kế. -->

**43.** Giả sử có một chuỗi bậc ba $a,\ a^{\mathrm{I}},\ a^{\mathrm{II}},\ a^{\mathrm{III}},\ a^{\mathrm{IV}},\ \&c.$;
differentia bậc nhất của nó là $b,\ b^{\mathrm{I}},\ b^{\mathrm{II}},\ b^{\mathrm{III}},\ \&c.$; differentia bậc
hai là $c,\ c^{\mathrm{I}},\ c^{\mathrm{II}},\ c^{\mathrm{III}},\ \&c.$; và bậc ba là
$d,\ d^{\mathrm{I}},\ d,\ \&c.$ — bởi chúng đều là hằng.

**INDICES.**

$$
1\qquad 2,\qquad 3,\quad 4,\qquad 5,\qquad 6,
$$

**TERMINI.**

$$
a,\quad a^{\mathrm{I}},\quad a^{\mathrm{II}},\quad a^{\mathrm{III}},\quad a^{\mathrm{IV}},\quad \&c.
$$

**DIFFER. I.**

$$
b,\quad b^{\mathrm{I}},\quad b^{\mathrm{II}},\quad b^{\mathrm{III}},\quad \&c.
$$

**DIFFER. II.**

$$
c,\quad c^{\mathrm{I}},\quad c^{\mathrm{II}},\quad c^{\mathrm{III}},\quad \&c.
$$

**DIFFER. III.**

$$
d,\qquad d,\qquad d,\quad \&c,
$$

<!-- Chưa dịch: PDF 72-97, tức trang in 43-69, gồm phần còn lại của §43, rồi §44 trở đi
     và các EXEMPLUM của CAPUT II. Catchword ở cuối trang 71 là "Quia". -->

<!-- PDF 72, trang in 44 -->

Vì $a^{\mathrm{I}} = a + b$, $a^{\mathrm{II}} = a + 2b + c$, $a^{\mathrm{III}} = a + 3b + 3c + d$,
$a^{\mathrm{IV}} = a + 4b + 6c + 4d$, &c., nên số hạng tổng quát, tức số hạng có chỉ số là $x$, sẽ là

$$
a + \frac{(x-1)}{1}b + \frac{(x-1)(x-2)}{1\cdot 2}c + \frac{(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3}d
$$

thế là số hạng tổng quát lập được từ các differentia.

Còn khi đặt

$$
b = a^{\mathrm{I}} - a;\qquad c = a^{\mathrm{II}} - 2a^{\mathrm{I}} + a;\qquad d = a^{\mathrm{III}} - 3a^{\mathrm{II}} + 3a^{\mathrm{I}} - a
$$

thì thay các giá trị ấy vào, số hạng tổng quát sẽ là

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

**44.** Hãy giả sử đã cho một chuỗi thuộc bậc nào bất kỳ:

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

Từ số hạng thứ nhất của chính chuỗi, cùng từ các số hạng đầu tiên của các dãy differentia
$b,\ c,\ d,\ e,\ f,\ \&c.$, số hạng tổng quát sẽ biểu thị như sau:

$$
a + \frac{(x-1)}{1}b + \frac{(x-1)(x-2)}{1\cdot 2}c + \frac{(x-1)(x-2)(x-3)}{1\cdot 2\cdot 3}d + \frac{(x-1)(x-2)(x-3)(x-4)}{1\cdot 2\cdot 3\cdot 4}e + \&c.
$$

cho tới khi ta đi tới những differentia hằng. Từ đó thấy rằng, nếu các differentia hằng
không bao giờ xuất hiện, thì số hạng tổng quát phải được trình bày bằng một biểu thức vô
hạn.

**45.** Vì các differentia được lập thành từ chính các số hạng của chuỗi, nên nếu thay các
giá trị ấy vào, ta sẽ thu được số hạng tổng quát ở dạng tương tự như dạng đã trình bày cho
các chuỗi bậc nhất, bậc hai và bậc ba. Cụ thể, với các chuỗi thuộc bậc bốn, số hạng tổng
quát sẽ là

$$
\frac{(x-1)(x-2)(x-3)(x-4)(x-5)}{1\cdot 2\cdot 3\cdot 4\cdot 5}\left(\frac{a^{\mathrm{IV}}}{x-5} - \frac{4a^{\mathrm{III}}}{x-4} + \frac{6a^{\mathrm{II}}}{x-3} - \frac{4a^{\mathrm{I}}}{x-2} + \frac{a}{x-1}\right)
$$

<!-- Ghi chú dịch giả: trong bảng các bậc, dòng DIFFER. III. ở đây có đủ ba số mũ (d, d^I,
     d^II); số mũ II trên chữ d thứ ba rất mờ, đã soi và xác nhận là II, khớp với quy luật
     dãy số mũ La-tinh đã thấy ở các dòng bên trên. Ở dòng DIFFER. V. bản in chỉ có f, &c. -->

<!-- Ghi chú dịch giả: số hạng tổng quát viết bằng dãy differentia ở đầu trang này đã tự
     kiểm và đúng: với a=1, b=2, c=3, d=4, e=0 thì dựng chuỗi cho 1, 3, 8, 20, 43, 81, &c.,
     đúng với công thức a + (x-1)b + (x-1)(x-2)/2·c + (x-1)(x-2)(x-3)/6·d + (x-1)(x-2)(x-3)(x-4)/24·e. -->

<!-- Ghi chú dịch giả: dạng có nhân tử ở cuối §45 in SAI, đã chép nguyên văn; lỗi nằm ở
     mẫu số, phải là 1·2·3·4 chứ không phải 1·2·3·4·5. Cách xác định: trọng số đúng của
     từng số hạng trong ngoặc khi rút ra ngoài đã lập được trực tiếp từ số hạng tổng quát
     a + (x-1)b + (x-1)(x-2)/2·c + (x-1)(x-2)(x-3)/6·d + (x-1)(x-2)(x-3)(x-4)/24·e bằng
     cách thay b = a^I - a, c = a^II - 2a^I + a, d = a^III - 3a^II + 3a^I - a,
     e = a^IV - 4a^III + 6a^II - 4a^I + a rồi so trọng số của a, a^I, a^II, a^III, a^IV
     với trọng số mà bản in cho. Kết quả: cả năm trọng số của bản in đều nhỏ hơn đúng một
     lần 5, không riêng số hạng nào, ở mọi giá trị x đã thử. Chẳng hạn trọng số của a^IV
     phải là (x-1)(x-2)(x-3)(x-4)/24 còn bản in là (x-1)(x-2)(x-3)(x-4)/120, và 24/120 = 1/5.
     Vậy chỉ cần đổi mẫu số 120 thành 24 là cả năm trọng số cùng khớp. Kiểm số: với
     a=5, b=2, c=d=e=0 (chuỗi 5, 7, 9, 11, 13, 15, &c.) thì số hạng thứ 6 đúng là 15, còn
     dạng bản in cho 3; với mẫu 24 thì cho đúng 15. -->

<!-- Ghi chú dịch giả: trang 73 kết thúc ở chữ "vnde", vốn là catchword ở mép phải chân
     trang, nối sang trang kế. Dấu hiệu trang ở giữa chân trang là F 3. Số trang 45 đặt
     bên phải đầu trang. -->

<!-- Chưa dịch: PDF 74-97, tức trang in 46-69, gồm phần còn lại của §45, rồi §46 trở đi
     và các EXEMPLUM của CAPUT II. Catchword ở cuối trang 73 là "vnde". -->

<!-- PDF 74, trang in 46 -->

từ đó quy luật, theo đó các số hạng tổng quát của những bậc kế tiếp được lập ra, thì thấy
dễ dàng. Nhưng từ đây cũng thấy rằng, với bậc nào bất kỳ, số hạng tổng quát sẽ là một
functio phân thức nguyên của chính $x$, trong đó số chiều lớn nhất của $x$ phải ngang với
bậc mà chuỗi ấy thuộc về. Như vậy số hạng tổng quát của các chuỗi bậc nhất sẽ là functio
bậc nhất, của các chuỗi bậc hai sẽ là functio bậc hai, và cứ thế.

**46.** Còn các differentia, như đã thấy ở trên, thì phát sinh từ chính các số hạng của
chuỗi theo cách sau:

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

từ đó thấy các chuỗi này đồng thời là các chuỗi truy hồi, và thang quan hệ của chúng là
$2,\ -1$. Còn khi trong các chuỗi bậc hai...

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

Vậy chúng cũng là những chuỗi truy hồi, với thang quan hệ là $3,\ -3,\ +1$.

Cũng theo cách ấy, ta thấy mọi chuỗi thuộc loại này, thuộc bậc nào bất kỳ, đều cùng
thuộc về lớp các chuỗi truy hồi; và điều ấy đúng như vậy, tức là thang quan hệ gồm những
hệ số của lũy thừa nhị thức, mỗi hệ số cao hơn một bậc so với bậc mà chuỗi ấy thuộc về.

**47.** Vì trong các chuỗi bậc nhất, mọi giá trị của $d$ và $e$, và của tất cả các
differentia kế tiếp, đều bằng $0$, nên trong những chuỗi ấy ta cũng có

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

Vậy chúng cũng thuộc về các chuỗi truy hồi, và do đó theo vô hạn cách, khi các thang quan hệ
có thể là

$$
3,\ -3,\ +1;\quad 4,\ -6,\ +4,\ -1;\quad 5,\ -10,\ +10,\ -5,\ +1;
$$

&c.

Cũng theo cách ấy, ta hiểu rằng mỗi chuỗi trong loại mà ta đang bàn, đồng thời cũng là một
chuỗi truy hồi theo vô hạn cách: bởi thang quan hệ sẽ là

$$
\frac{n}{1},\quad \frac{n(n-1)}{1\cdot 2},\quad +\frac{n(n-1)(n-2)}{1\cdot 2\cdot 3},\quad -\frac{n(n-1)(n-2)(n-3)}{1\cdot 2\cdot 3\cdot 4},
$$

&c.

trong khi...

<!-- Ghi chú dịch giả: ba thang quan hệ Euler liệt kê ở §47 đã tự kiểm và đều đúng với các
     hệ số nhị thức C(n,k) mang dấu luân phiên: n=3 cho 3, -3, +1; n=4 cho 4, -6, +4, -1;
     n=5 cho 5, -10, +10, -5, +1. Dãy công thức chung ở cuối trang cũng đúng, vì
     n/1 = C(n,1), n(n-1)/(1·2) = C(n,2), n(n-1)(n-2)/(1·2·3) = C(n,3),
     n(n-1)(n-2)(n-3)/(1·2·3·4) = C(n,4). Các quan hệ truy hồi ở đầu trang cũng đúng:
     a^III = 3a^II - 3a^I + a là hiệu bậc ba bằng 0, còn a^IV = 4a^III - 6a^II + 4a^I - a
     là hiệu bậc bốn bằng 0. -->

<!-- Ghi chú dịch giả: trang 75 kết thúc ở chữ "dum", vốn là catchword ở mép phải chân
     trang, nối sang trang kế. Số trang 47 đặt bên phải đầu trang. -->

<!-- Chưa dịch: PDF 76-97, tức trang in 48-69, gồm phần còn lại của §47, rồi §48 trở đi
     và các EXEMPLUM của CAPUT II. Catchword ở cuối trang 75 là "dum". -->






<!-- Ghi chú dịch giả: mẫu số của số hạng cuối trong bản in viết là "1." trên "2", tức
     1·2; ở đây đã viết thành 1·2 cho rõ. Dòng DIFFER. II. chỉ in năm chữ c, đúng với
     năm chỉ số đã liệt kê ở dòng INDICES. Trang kết thúc giữa chữ ở "vti ex natura";
     mép phải mang chữ catchword tura. Số trang 42 đặt bên trái. -->



