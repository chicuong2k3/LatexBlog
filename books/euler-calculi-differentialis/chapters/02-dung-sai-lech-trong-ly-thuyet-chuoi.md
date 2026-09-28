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

<!-- Ghi chú dịch giả: trang in 42 kết thúc giữa chữ ở "vti ex na-", mép phải chân trang mang
     chữ catchword "tura" nối sang trang kế, nơi câu đó mở đầu bằng "tura differentiarum
     (§. 10.) intelligitur". Mẫu số của số hạng cuối trong bản in viết bằng "1." trên "2",
     tức 1·2; ở đây đã viết thành 1·2 cho rõ. Dòng DIFFER. II. chỉ in đúng năm chữ c, khớp
     với năm chỉ số ở dòng INDICES. Số trang 42 đặt bên trái đầu trang. -->

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

tức là số hạng tổng quát cũng được xác định bởi ba số hạng của chính chuỗi ấy.

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

<!-- Ghi chú dịch giả: hai dạng đầu ở §42 đã tự kiểm và đúng: khai triển biểu thức với
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

<!-- Ghi chú dịch giả: trong câu mở đầu §43, bản in viết "d, d^I, d, &c.": chữ d thứ ba
     không có số mũ, trong khi hai dòng ngay trên có đủ (b, b^I, b^II, b^III và
     c, c^I, c^II, c^III). Đã soi ở độ phóng 22 để chắc chắn. Đúng phải là d^II. Giữ
     nguyên như in. -->

<!-- Ghi chú dịch giả: ở dòng DIFFER. III. trong bảng, số mũ trên cả ba chữ d đều mòn đến
     mức không đọc được; ở đây chép ba chữ d trần, và đã ghi chú ở trên rằng chỗ này có
     lẽ phải là d, d^I, d^II. Dòng INDICES ở trang này chỉ liệt kê sáu chỉ số, 1 tới 6,
     trong khi các dòng TERMINI, DIFFER. I. và DIFFER. II. lại chứa bảy số hạng; đã giữ
     nguyên sáu như in. Số trang 43 đặt bên phải đầu trang; dấu hiệu trang ở giữa chân
     trang là F 2; mép phải chân trang mang chữ catchword Quia, mở đầu câu của trang kế. -->

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

<!-- PDF 76, trang in 48 -->

…trong khi $n$ là một số nguyên lớn hơn số chỉ bậc ấy. Vậy chuỗi này cũng sinh ra từ khai
triển của một phân số mà mẫu số là $(1-y)^n$, như đã trình bày đầy đủ hơn trong cuốn trước
về những chuỗi truy hồi.

**48.** Như đã thấy, số hạng tổng quát của mọi chuỗi thuộc lớp này, thuộc bậc nào bất kỳ,
đều là những functio phân thức nguyên của chính $x$; ngược lại, ta sẽ thấy mọi chuỗi mà
số hạng tổng quát là những functio thuộc dạng ấy đều thuộc về lớp này, và cuối cùng dẫn
tới differentia hằng. Và rõ ràng là: nếu số hạng tổng quát là functio bậc nhất $ax + b$,
thì chuỗi sinh ra từ đó sẽ là chuỗi bậc nhất, tức cấp số cộng, và sẽ có differentia bậc
nhất là hằng. Còn nếu số hạng tổng quát là functio bậc hai ở dạng $axx + bx + c$ thì chuỗi
sinh ra từ nó, khi lần lượt thay $x$ bằng các số $1, 2, 3, 4, 5$, &c., sẽ là chuỗi bậc hai,
và sẽ có differentia bậc hai là hằng. Cũng thế, số hạng tổng quát bậc ba
$ax^3 + bx^2 + cx + d$ sẽ cho một chuỗi bậc ba, và cứ thế.

**49.** Bởi từ số hạng tổng quát, không chỉ mọi số hạng của chuỗi tìm được, mà cả các
chuỗi differentia, cả bậc nhất lẫn những bậc kế tiếp, cũng đều suy ra được. Bởi nếu
lấy số hạng thứ nhất của chuỗi trừ đi số hạng thứ hai thì thu được số hạng thứ nhất của
chuỗi differentia; còn lấy số hạng thứ hai của chính chuỗi ấy trừ đi số hạng thứ ba thì
số hạng ấy của chuỗi differentia cũng sẽ thu được,...

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

…trừ đi, mà chỉ số của nó là $x$; tức lấy số hạng của chuỗi có chỉ số là $x$ trừ đi số hạng
kế tiếp có chỉ số là $x+1$. Vậy nếu trong số hạng tổng quát của chuỗi, thay $x$ bằng $x+1$,
rồi lấy số hạng tổng quát ấy trừ đi số hạng tổng quát đã cho, thì còn lại số hạng tổng quát
của chuỗi differentia. Nếu $X$ là số hạng tổng quát của chuỗi, thì differentia của nó là
$\Delta X$ (điều vừa tìm thấy ở chương trước, khi đặt $\omega = 1$), tức là số hạng tổng quát
của chuỗi differentia bậc nhất. Cũng theo cách ấy, $\Delta\Delta X$ là số hạng tổng quát
của chuỗi differentia bậc hai; $\Delta^3X$ là của bậc ba, và cứ thế.

**50.** Nhưng nếu số hạng tổng quát $X$ là một functio phân thức nguyên, trong đó số mũ lớn
nhất của lũy thừa của chính $x$ là $n$; thì từ chương trước ta suy ra differentia $\Delta X$
của nó sẽ là một functio thấp hơn một bậc, tức là bậc $n-1$. Và do đó $\Delta\Delta X$ sẽ là
functio bậc $n-2$, còn $\Delta^3X$ là functio bậc $n-3$, và cứ thế. Vậy nếu $X$ là functio
bậc nhất, như $ax + b$, thì differentia $\Delta X$ của nó sẽ là hằng $= a$; mà đó chính là
số hạng tổng quát của chuỗi differentia bậc nhất, nên thấy rõ rằng chuỗi có số hạng tổng
quát $X$ là functio bậc nhất sẽ là cấp số cộng, tức là chuỗi bậc nhất. Cũng thế, nếu số hạng
tổng quát $X$ là functio bậc hai, tức là $\Delta\Delta X$ không đổi, thì chuỗi sinh ra từ nó
sẽ có differentia bậc hai là hằng, và do đó thuộc bậc hai; và cứ như vậy mãi mãi: chuỗi
sinh ra từ functio $X$ nào làm số hạng tổng quát sẽ thuộc cùng bậc với nó.

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
     trang ở giữa chân trang là G. Mép phải chân trang mang chữ bắt "§1. Hanc"; đã soi ở độ
     phóng 8 và xác nhận đúng là "§1. Hanc", không có chữ số 5 mất mà chỉ là "§1.", dù
     mục tiếp theo hợp lý ra phải là §51. Số trang 49 đặt bên phải đầu trang. -->

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

Vậy những điều đã dạy ở chương trước về cách tìm differentia của mọi bậc, nay được áp dụng
vào đây để tìm các số hạng tổng quát của differentia bậc thứ tư, vốn sinh ra từ các chuỗi.

**52.** Nếu số hạng tổng quát của một chuỗi bất kỳ đã biết, thì nhờ đó không chỉ mọi số
hạng của nó vô hạn đều tìm được, mà còn có thể kéo dài chuỗi ngược lại, và trình bày được
cả những số hạng mà số mũ của chúng là những số âm, bằng cách thay $x$ bằng các số âm.
Chẳng hạn, nếu số hạng tổng quát là

$$
\frac{xx + 3x}{2},
$$

thì khi lấy $x$ làm chỉ số, vừa âm vừa dương, chuỗi sẽ được kéo dài cả hai phía như sau.

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

Vì vậy, khi số hạng tổng quát được lập ra từ các differentia, thì bất kỳ chuỗi nào cũng có
thể kéo dài ngược lại từ các differentia ấy; tuy vậy, nếu các differentia cuối cùng là
hằng thì những số hạng ấy chỉ có thể được trình bày hữu hạn, còn trong trường hợp ngược
lại thì chúng có thể được gán bằng một biểu thức vô hạn. Hơn nữa, từ số hạng tổng quát

<!-- Ghi chú dịch giả: bản in viết "differentiarum quartumus", đáng lẽ phải là
     "differentiarum quartorum" để chữ quảng hòa với "differentiarum". Đã soi và xác nhận
     đúng là "quartumus", không phải chữ mòn. Giữ nguyên như in. -->

<!-- Ghi chú dịch giả: bản in viết "loco x numeros negatius substituendo", đáng lẽ phải là
     "negativos" để chữ quảng hòa với "numeros". Đã soi ở độ phóng 11 và xác nhận chỉ có
     bảy chữ negatius, không có chữ v. Giữ nguyên như in. -->

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
     GENERALIS cho số hạng có chỉ số x: với x=5 cho 59, đúng. Cũng đã thử lặp lại với mười
     chỉ số khác, đều khớp. -->

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

<!-- Chưa dịch: PDF 87-97, tức trang in 59-69, gồm phần còn lại của §61, rồi §62 trở đi
     và các EXEMPLUM của CAPUT II. Catchword ở cuối trang 86 là "62.". -->










