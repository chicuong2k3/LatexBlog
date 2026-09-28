---
title: "Lời tựa, mục lục và lỗi in"
summary: "Lời tựa của Euler giải thích vì sao Calculus Differentialis không thể bắt đầu bằng định nghĩa, dựng nên khái niệm lượng constans và lượng variabilis từ ví dụ quả cầu bắn ra từ khẩu pháo, rồi định nghĩa vi phân là sai lệch xuất hiện vô cùng nhỏ mà tỉ lệ giữa chúng vẫn xác định được. Kèm mục lục hai phần của sách và danh sách lỗi in do chính Euler ghi."
tags: [dich-sach, toan, giai-tich]
slug: "loi-tua-va-muc-luc"
status: chua-hoan-thanh
---

<!-- Nguồn: PDF 5-28, tức trang in i-xxiv. Bản dịch đã đối chiếu ảnh scan từng trang PDF 5-28;
     xem TRANSLATION_LEDGER.md, mục "Ghi chú dịch". -->

# Nền tảng phép tính vi phân

*Cùng ứng dụng của nó trong phân tích hữu hạn và lý thuyết chuỗi*

**Tác giả: LEONHARD EULER**

Giám đốc Viện Hàn lâm Khoa học và Văn chương Hoàng gia Phổ, giáo sư danh dự của Viện Hàn lâm Khoa học Đế quốc Petropolis, hội viên các Viện Hàn lâm Hoàng gia Paris và London.

Viện Hàn lâm Khoa học Đế quốc Petropolis (Sankt-Peterburg) chịu phí tổn in, năm 1755.

<!-- PDF 6: trang lót, chỉ có dấu thư viện BIBLIOTHECA REGIA MONACENSIS; không có chữ nào của sách. -->

# Lời tựa

<!-- PDF 7, trang in III -->

Calculus Differentialis là gì, và nói chung Analysis Infinitorum là gì? Với những ai chưa hề
có chút hiểu biết nào về nó thì điều ấy khó lòng giải thích được; và ở đây không thể, như
thường làm ở các môn học khác, lấy một định nghĩa làm điểm khởi đầu cho phần trình bày một
cách thuận tiện. Không phải là calculus này hoàn toàn không có định nghĩa; nhưng muốn hiểu
định nghĩa ấy thì cần tới những khái niệm ít quen dùng không chỉ trong đời sống thường ngày,
mà ngay cả trong chính Analysis finitorum, những khái niệm mà rốt cuộc chỉ được khai triển
và giải thích trong khi trình bày Calculus Differentialis; vì thế định nghĩa của nó không thể
nắm được trước khi các nguyên lý của nó đã được nhìn thấu đủ rõ ràng. Vậy trước hết, calculus
này xoay quanh các lượng variabiles: vì tuy mọi lượng, theo bản chất của nó, đều có thể tăng
và giảm tới vô hạn;

<!-- PDF 8, trang in IV -->

nhưng khi calculus được hướng tới một mục đích nhất định nào đó, thì có những lượng được hình
dung là luôn giữ nguyên một độ lớn, còn những lượng khác thì biến thiên qua mọi mức tăng và
giảm. Để đánh dấu sự phân biệt ấy, những lượng trước thường được gọi là *constantes*, những
lượng sau là *variabiles*; thành thử sự khác biệt này nằm không phải ở bản chất của sự vật cho
bằng ở tính chất của câu hỏi mà calculus được áp vào.

Vì sự khác biệt giữa lượng constans và lượng variabilis sẽ được minh họa rõ nhất bằng một ví
dụ, ta hãy xét cú bắn một quả cầu ra từ một khẩu pháo chiến nhờ sức nổ của thuốc súng; bởi ví
dụ này có vẻ đặc biệt thích hợp để làm sáng tỏ vấn đề. Vậy ở đây xuất hiện nhiều lượng mà
quan hệ giữa chúng phải được tính đến trong cuộc khảo sát này: thứ nhất là lượng thuốc súng;
rồi độ nâng của nòng pháo so với đường chân trời; thứ ba là tầm xa của cú bắn trên mặt phẳng
nằm ngang; thứ tư là thời gian quả cầu đã bắn ra còn ở trong không khí. Và nếu các thí nghiệm
không được tiến hành với cùng một khẩu pháo, thì còn phải đưa thêm vào tính toán chiều dài của
nó cùng trọng lượng quả cầu. Nhưng ở đây ta hãy gạt sang bên sự khác nhau về pháo và về quả
cầu, để khỏi rơi vào những câu hỏi quá rối rắm. Vậy nếu, giữ mãi cùng một

<!-- PDF 9, trang in V -->

lượng thuốc súng, độ nâng của pháo liên tục thay đổi, và cần tìm tầm xa của cú bắn cùng thời
gian quả cầu bay qua không khí, thì trong câu hỏi này lượng thuốc súng, hay lực đẩy, sẽ là một
lượng constans, còn độ nâng của pháo cùng tầm xa của cú bắn và thời gian của nó sẽ phải xếp
vào các lượng variabiles; bởi ta muốn xác định những điều này cho mọi mức độ nâng, để từ đó
biết được những thay đổi lớn đến đâu trong tầm xa và thời gian của cú bắn nảy sinh từ mọi biến
đổi của độ nâng. Nhưng sẽ là một câu hỏi khác nếu, giữ nguyên độ nâng của pháo, lượng thuốc
súng liên tục thay đổi, và phải xác định những thay đổi do đó dội sang cú bắn: vì khi ấy độ
nâng của pháo sẽ là lượng constans, còn ngược lại lượng thuốc súng, cùng tầm xa và thời gian
của cú bắn, là những lượng variabiles. Như vậy rõ ràng là khi trạng thái của câu hỏi thay đổi
thì cùng một lượng có thể lúc được kể vào hàng *constantes*, lúc vào hàng *variabiles*. Đồng
thời từ đây cũng hiểu được điều cần chú ý nhất trong việc này: các lượng variabiles phụ thuộc
vào nhau như thế nào, sao cho khi một lượng thay đổi thì những lượng còn lại tất yếu nhận lấy
những thay đổi. Chẳng hạn trong trường hợp trước, trong đó lượng thuốc súng

<!-- PDF 10, trang in VI -->

vẫn giữ nguyên, khi độ nâng của pháo thay đổi thì tầm xa và thời gian của cú bắn cũng thay
đổi; vậy tầm xa và thời gian của cú bắn là những lượng variabiles phụ thuộc vào độ nâng của
pháo, và khi độ nâng thay đổi thì chúng đồng thời chịu những thay đổi nhất định. Còn trong
trường hợp sau, chúng phụ thuộc vào lượng thuốc súng, mà sự thay đổi của lượng này phải sinh
ra những thay đổi nhất định nơi chúng.

Những lượng phụ thuộc vào các lượng khác theo cách này, tức là khi những lượng kia thay đổi
thì chính chúng cũng chịu thay đổi, thường được gọi là *functiones* của những lượng kia; danh
xưng ấy có phạm vi rất rộng, và bao hàm trong nó mọi cách mà một lượng có thể được xác định
qua các lượng khác. Vậy nếu $x$ biểu thị một lượng variabilis, thì mọi lượng phụ thuộc vào $x$
theo bất cứ cách nào, hay được xác định qua nó, đều gọi là *functiones* của nó. Thuộc loại
này là bình phương $xx$ của nó, hay bất kỳ lũy thừa nào khác, cũng như những lượng được ghép
từ chúng theo bất cứ cách nào; thậm chí cả những lượng *transcendentes*, và nói chung mọi lượng
phụ thuộc vào $x$ đến mức khi $x$ tăng hay giảm thì chính chúng cũng nhận lấy thay đổi. Từ đây
nảy sinh câu hỏi, trong đó người ta hỏi: nếu lượng $x$ được tăng hay giảm đi một lượng cho
trước, thì mỗi functio của nó do đó thay đổi bao nhiêu,

<!-- PDF 11, trang in VII -->

tức là nhận lấy một lượng tăng hay lượng giảm bao nhiêu. Trong những trường hợp đơn giản hơn,
câu hỏi này quả dễ giải: vì nếu lượng $x$ được tăng thêm lượng $\omega$, thì bình phương $xx$
của nó do đó nhận lượng tăng

$$
2x\omega + \omega\omega;
$$

và như vậy lượng tăng của $x$ sẽ có tỷ lệ với lượng tăng của $xx$ như $\omega$ với
$2x\omega + \omega\omega$, tức là như $1$ với $2x + \omega$. Tương tự, trong những trường hợp
khác người ta thường xét tỷ lệ giữa lượng tăng của $x$ với lượng tăng, hay lượng giảm, mà mỗi
functio của nó do đó nhận được. Mà việc khảo sát tỷ lệ của những lượng tăng như thế không chỉ
có tầm quan trọng lớn nhất, mà toàn bộ Analysis infinitorum còn dựa trên nó.

<!-- PDF 11, trang in VII (tiếp) -->

Để điều này hiện ra rõ hơn, ta hãy lấy ví dụ bình phương $xx$ ở trên: lượng tăng
$2x\omega + \omega\omega$ của nó, nhận được khi chính lượng $x$ tăng thêm lượng tăng $\omega$,
ta đã thấy là có tỷ lệ với lượng tăng ấy như $2x + \omega$ với $1$. Từ đó rõ ràng là lượng tăng
$\omega$ được lấy càng nhỏ thì tỷ lệ ấy càng tiến gần tới tỷ lệ $2x$ với $1$; tuy nhiên nó
không hoàn toàn chuyển thành tỷ lệ này trước khi lượng tăng $\omega$ ấy tan biến hẳn. Từ đây
ta hiểu rằng, nếu lượng tăng $\omega$ của lượng variabilis $x$ trở thành không, thì lượng tăng
của bình phương $xx$ của nó

<!-- PDF 12, trang in VIII -->

sinh ra từ đó tuy cũng tan biến, nhưng vẫn giữ với lượng tăng kia tỷ lệ như $2x$ với $1$; và
điều đã nói ở đây về bình phương phải được hiểu cho mọi functio khác của $x$: bởi các lượng
tăng tan biến mà chúng nhận được, khi chính lượng $x$ nhận một lượng tăng tan biến, sẽ giữ với
lượng tăng ấy một tỷ lệ nhất định và gán được.

Và theo cách ấy ta đã được dẫn tới định nghĩa của Calculus Differentialis: nó là **phương pháp
xác định tỷ lệ của các lượng tăng tan biến mà các functio bất kỳ nhận được, khi lượng
variabilis mà chúng là functio của nó được gán một lượng tăng tan biến**. Rằng định nghĩa này
chứa đựng, và hơn thế nữa vét cạn, bản chất thật của calculus differentialis, thì những ai không
phải là người lạ trong lĩnh vực này sẽ dễ dàng thấy rõ.

<!-- PDF 12, trang in VIII (tiếp) -->

Vậy calculus differentialis không bận tâm vào việc truy tìm chính những lượng tăng tan biến
ấy, vì chúng là không, cho bằng vào việc xem xét tỷ lệ và tỷ số giữa chúng với nhau; và vì
những tỷ lệ này được biểu thị bằng các lượng hữu hạn, nên cũng phải coi calculus này là xoay
quanh các lượng hữu hạn. Vì tuy các quy tắc, như chúng thường được truyền dạy, có vẻ được
thiết kế để xác định

<!-- PDF 13, trang in IX -->

những lượng tăng tan biến ấy, song chưa bao giờ các kết luận được rút ra từ chúng khi xét một
cách tuyệt đối, mà luôn luôn từ tỷ lệ giữa chúng.

Còn calculus integralis thì cũng có tình trạng tương tự; định nghĩa thích hợp nhất cho nó là
nói rằng nó là **phương pháp, từ tỷ lệ đã biết của các lượng tăng tan biến, tìm ra chính những
functio mà chúng là lượng tăng**. Nhưng để các tỷ lệ này dễ thu thập hơn và dễ biểu diễn trong
phép tính hơn, chính những lượng tăng tan biến ấy, dù là không, vẫn thường được ký hiệu bằng
những dấu nhất định; và khi đã dùng các dấu ấy thì chẳng có gì ngăn việc đặt cho chúng những
tên gọi nhất định. Vậy chúng được gọi là *differentialia*; và vì chúng không có độ lớn, chúng
cũng được gọi là *infinite parva*; do đó, theo bản chất của chúng, chúng phải được hiểu sao cho
được coi là hoàn toàn không, hay bằng không. Như vậy, nếu gán cho lượng $x$ lượng tăng $\omega$
để nó thành $x + \omega$, thì bình phương $xx$ của nó sẽ thành

$$
xx + 2x\omega + \omega\omega,
$$

và do đó nhận lượng tăng

$$
2x\omega + \omega\omega;
$$

vì thế lượng tăng của $x$, tức $\omega$, sẽ có tỷ lệ với lượng tăng của bình phương, tức
$2x\omega + \omega\omega$, như $1$ với $2x + \omega$; tỷ lệ này chuyển thành $1$ với $2x$ chỉ
khi $\omega$ tan biến. Vậy hãy cho

<!-- PDF 14, trang in X -->

$\omega = 0$, thì tỷ lệ của các lượng tăng tan biến ấy, là thứ duy nhất được xét trong calculus
differentialis, quả thật là như $1$ với $2x$; và ngược lại, tỷ lệ này sẽ không phù hợp với sự
thật nếu lượng tăng $\omega$ ấy không thật sự tan biến và trở nên hoàn toàn bằng không. Vậy nếu
cái không được chỉ bởi $\omega$ này biểu thị lượng tăng của lượng $x$, thì vì lượng tăng ấy có
tỷ lệ với lượng tăng của bình phương $xx$ như $1$ với $2x$, lượng tăng của bình phương $xx$ sẽ
là $= 2x\omega$, và do đó cũng bằng không; từ đó đồng thời thấy rõ rằng việc triệt tiêu các
lượng tăng này không ngăn cản tỷ lệ giữa chúng, là như $1$ với $2x$, được xác định. Cái không
mà ở đây được biểu diễn bằng chữ $\omega$ thì trong calculus differentialis, vì nó được xét như
lượng tăng của lượng $x$, thường được biểu diễn bằng dấu $dx$ và gọi là differentiale của nó;
và khi đặt $dx$ thay cho $\omega$, differentiale của $xx$ sẽ là $2x\,dx$. Tương tự, chứng minh
được rằng differentiale của lập phương $x^3$ sẽ là $= 3xx\,dx$, và nói chung differentiale của
mọi lũy thừa $x^n$ sẽ là $= nx^{n-1}\,dx$.

<!-- PDF 14, trang in X (tiếp) -->

Còn dù đưa ra những functio nào khác của $x$ đi nữa, trong calculus differentialis đều có
truyền dạy các quy tắc để tìm differentialia của chúng; nhưng phải luôn ghi nhớ rằng, vì những
differentialia này tuyệt đối là

<!-- PDF 15, trang in XI -->

không, nên từ chúng không kết luận được gì khác ngoài tỷ lệ giữa chúng với nhau, những tỷ lệ
quả thật quy về được các lượng hữu hạn.

Mà khi các nguyên lý của Calculus differentialis được xác lập theo cách này, là cách duy nhất
phù hợp với lý trí, thì mọi lời chê bai thường được đưa ra chống lại calculus này tự sụp đổ;
song chúng hẳn sẽ giữ nguyên toàn bộ sức nặng nếu các differentialia, hay infinite parva, không
bị triệt tiêu hoàn toàn.

> **[Chú giải]**
>
> **Vì sao tỷ lệ $1$ với $2x$ vẫn có nghĩa khi cả tử và mẫu đều bằng không**
>
> Đây là chỗ khó nhất của toàn bộ lời tựa, và cũng là chỗ tách calculus của Euler khỏi cách
> dạy vi phân ngày nay.
>
> Euler đặt $\omega = 0$ rồi nói tỷ lệ của các lượng tăng ấy là $1 : 2x$. Ở đây không có
> phép chia nào cả: tử số và mẫu số đều bằng không. Cái được xác định ở đây không phải tỷ lệ
> của hai số không, mà là **giới hạn của họ tỷ lệ** khi $\omega \to 0$:
>
> $$
> \lim_{\omega \to 0} \frac{\omega}{2x\omega + \omega^2} = \frac{1}{2x}
> $$
>
> Chính Euler đã viết lời này ở trang in VII, chỉ dùng chữ mà không dùng phép giới hạn: lượng
> tăng $\omega$ càng nhỏ thì tỷ lệ ấy càng gần $2x$ với $1$. Ông cũng nói thẳng rằng tỷ lệ
> ấy "không đi tới hẳn" cho tới khi $\omega$ tan biến — nghĩa là bản thân tỷ lệ $1 : 2x$ chỉ
> là cái được xác định *qua* quá trình đó.
>
> Khác biệt về sau nằm ở chỗ Euler không cần định nghĩa giới hạn, vì ông không dùng giới hạn ở
> đâu cả. Ông dựng cả calculus trên quan hệ thuần số học giữa những đại lượng hữu hạn, và coi
> tỷ lệ giữa hai lượng cùng tan biến là một vật thể hoàn toàn xác định. Đổi lại, ông phải
> trả lời bằng văn bản mọi phản biện, vì không có định nghĩa nào để đỡ — đó chính là
> ba trang in XI–XIII mà ta vừa dịch.

<!-- PDF 15, trang in XI (tiếp) -->

Tuy vậy, nhiều người đã truyền dạy các quy tắc của Calculus differentialis lại thấy nên tách
differentialia khỏi cái không tuyệt đối, và lập ra một hạng riêng những lượng infinite parva,
không tan biến hẳn mà giữ lại một độ lớn nào đó, tuy nhỏ hơn mọi lượng gán được. Vậy người ta
có lý khi phản bác họ rằng sự chặt chẽ hình học bị xem nhẹ, và các kết luận rút ra từ đó, vì đã
bỏ qua những infinite parva như thế, đáng bị ngờ vực: bởi dù những infinite parva ấy được hình
dung nhỏ bé đến đâu, thì khi không chỉ từng cái riêng lẻ mà cả nhiều, thậm chí vô số cái cùng
lúc bị vứt bỏ, rốt cuộc có thể sinh ra một sai số khổng lồ. Họ cố bẻ gãy phản bác này, nhưng
là sai lầm, bằng những ví dụ trong đó người ta rút ra bằng Calculus differentialis cùng những
kết luận như bằng Hình học

<!-- PDF 16, trang in XII -->

sơ cấp: vì nếu những infinite parva bị bỏ qua trong phép tính không phải là không, thì tất
yếu phải sinh ra sai số, và sai số càng lớn khi chúng càng dồn đống lại; và nếu điều ấy mà
không xảy ra, thì đúng hơn phải quy cho một khuyết tật của phép tính, khiến đôi khi các sai số
được bù trừ bởi những sai số khác, hơn là coi chính phép tính được giải thoát khỏi mối ngờ sai
số. Còn nếu sự bù trừ như thế diễn ra mà không nhờ một sai số mới nào, thì những ví dụ như vậy
chứng minh sáng tỏ chính điều tôi muốn nói: những gì đã bị bỏ qua phải được coi là hoàn toàn và
tuyệt đối bằng không; và những infinite parva được xử lý trong calculus differentialis không
khác gì cái không tuyệt đối.

<!-- PDF 16, trang in XII (tiếp) -->

Cũng chẳng giải quyết được gì khi một số người mô tả infinite parva sao cho chúng phải được xem
như những hạt bụi nhỏ so với một ngọn núi khổng lồ, hay thậm chí so với cả quả địa cầu: vì tuy
người nào nhận lấy việc xác định bằng tính toán độ lớn của cả quả địa cầu thường dễ được tha
thứ cho sai số không phải của một mà của nhiều nghìn hạt bụi, song sự chặt chẽ hình học ghê sợ
cả một sai số nhỏ đến thế, và phản bác này sẽ quá nặng nếu nó còn giữ chút sức nặng nào. Hơn
nữa cũng khó nói những người

<!-- PDF 17, trang in XIII -->

muốn phân biệt infinite parva với cái không hy vọng thu được lợi gì từ đó. Họ sợ rằng nếu
chúng tan biến hẳn thì cả sự so sánh giữa chúng, mà họ cảm thấy toàn bộ vấn đề được quy về,
cũng bị xóa bỏ: vì họ tuyên bố rằng không cách nào hình dung được những cái không tuyệt đối
có thể so sánh với nhau. Vậy họ cho là cần để lại cho chúng một độ lớn nào đó, để có cái gì đó
mà dựa vào đó thiết lập sự so sánh; nhưng họ buộc phải chấp nhận độ lớn ấy nhỏ tới mức có thể
được coi như không có, và được bỏ qua trong phép tính mà không sinh sai số. Tuy vậy họ không
dám gán cho nó một độ lớn nhất định và xác định, dù nhỏ tới mức không thể hình dung; vì nếu họ
giả thiết nó nhỏ hơn hai hay ba lần, thì các so sánh vẫn luôn y như cũ. Từ đó rõ ràng là chính
độ lớn ấy chẳng góp gì vào việc thiết lập sự so sánh, và vì thế sự so sánh không bị xóa bỏ, ngay
cả khi độ lớn ấy tan biến hoàn toàn. Mà từ những điều đã nói ở trên thì hiển nhiên sự so sánh
được xét trong calculus differentialis thậm chí không có chỗ đứng, trừ khi các lượng tăng ấy
tan biến hẳn: vì lượng tăng của lượng $x$, mà ta đã ký hiệu chung bằng $\omega$, với lượng tăng
của bình phương $xx$, tức $2x\omega + \omega\omega$, có tỷ lệ

<!-- PDF 18, trang in XIV -->

$$
\text{như } 1 \text{ với } 2x + \omega;
$$

tỷ lệ này luôn khác tỷ lệ $1$ với $2x$, trừ khi $\omega = 0$; còn nếu ta đặt $\omega = 0$ thì
khi ấy ta mới có thể khẳng định thật sự rằng tỷ lệ này đúng là như $1$ với $2x$. Tuy vậy, trong
khi đó ta cũng thấy rằng lượng tăng $\omega$ được lấy càng nhỏ thì càng tiến gần tới tỷ lệ này;
do đó không những được phép, mà còn hợp với bản chất sự vật, là trước hết xét các lượng tăng
này như hữu hạn, và cả trong các hình vẽ, nếu cần hình vẽ để minh họa vấn đề, cũng biểu diễn
chúng như hữu hạn; rồi sau đó hình dung trong ý nghĩ rằng các lượng tăng này liên tục trở nên
nhỏ hơn, và như vậy sẽ thấy tỷ lệ giữa chúng ngày càng tiến gần tới một giới hạn nhất định nào
đó, nhưng chỉ chạm tới nó khi chúng đã hoàn toàn trở thành không. Chính giới hạn này, cái như
thể tạo thành tỷ lệ cuối cùng của các lượng tăng ấy, là đối tượng thật sự của Calculus
differentialis; vì vậy phải coi người đã đặt những nền móng đầu tiên của nó là người đầu tiên
nảy ra ý chiêm nghiệm những tỷ lệ cuối cùng này, những tỷ lệ mà lượng tăng của các lượng
variabiles tiến gần tới khi chúng ngày càng giảm đi, và chỉ chạm tới khi chúng tan biến. Dấu
vết của sự chiêm nghiệm này ta bắt gặp ở những tác giả cổ xưa nhất,

<!-- PDF 19, trang in XV -->

những người vì thế không thể bị phủ nhận là đã có một ý niệm nào đó và một hiểu biết sơ sài về
Analysis infinitorum. Rồi dần dần môn khoa học này nhận được những bước tiến lớn hơn, và nó
không phải đột ngột được đưa lên tới đỉnh cao mà ngày nay người ta thấy; tuy thật ra trong nó
vẫn còn nhiều điều ẩn giấu hơn những điều đã được đưa ra ánh sáng.

Vì Calculus differentialis mở rộng tới các functio thuộc mọi loại, dù chúng được ghép lại thế
nào, nên phương pháp so sánh với nhau các lượng tăng tan biến của mọi functio không trở nên
được biết đến một cách đột ngột; mà phát minh này tiến dần tới những functio ngày càng phức tạp
hơn. Chẳng hạn, đối với các functio *rationales*, tỷ lệ cuối cùng mà các lượng tăng tan biến
của chúng giữ với nhau đã có thể được xác định từ rất lâu trước thời NEWTON và LEIBNIZ; thành
thử Calculus differentialis, xét trong chừng mực chỉ áp dụng cho các functio rationales, phải
được coi là đã được phát minh từ lâu trước thời ấy. Còn thì không có gì phải nghi ngờ rằng ta
phải ghi công cho NEWTON phần của Calculus differentialis xoay quanh các functio
*irrationales*; phần mà ông đã may mắn được dẫn tới nhờ Định lý xuất sắc của mình về khai triển
tổng quát các lũy thừa của nhị thức; và nhờ phát minh xuất sắc ấy, các giới hạn của calculus

<!-- PDF 20, trang in XVI -->

differentialis đã được mở rộng một cách tuyệt vời. Còn đối với LEIBNIZ, ta cũng mang ơn không
kém, vì ông đã đưa calculus này, trước đó chỉ được xem như một mẹo kỹ thuật riêng lẻ, vào hình
thức một môn học, gom các quy tắc của nó lại như thành một hệ thống, và giải thích chúng rõ
ràng. Bởi từ đó đã gợi ra những trợ lực lớn nhất để trau dồi calculus này thêm nữa, và để rút
ra từ những nguyên lý chắc chắn những gì cho tới lúc ấy còn thiếu. Vậy chẳng bao lâu, nhờ công
sức của chính LEIBNIZ, rồi của các BERNOULLI được ông khích lệ vào việc này, phạm vi của
Calculus differentialis được đẩy tới cả các functio *transcendentes*, phần cho tới lúc ấy còn
bỏ hoang, và đồng thời những nền móng vững chắc nhất của Calculus integralis cũng được xác
lập; dựa trên đó, những người về sau làm việc trong lĩnh vực này đã liên tục bổ sung những
bước tiến lớn hơn.

<!-- PDF 20, trang in XVI (tiếp) -->

NEWTON thì cũng đã đưa ra những mẫu mực rất phong phú về Calculus integralis; mà vì phát minh
đầu tiên của nó khó lòng tách khỏi nguồn gốc đầu tiên của calculus differentialis, nên không
thể xác định dứt khoát được như vậy; và vì phần lớn nhất của nó vẫn còn phải trau dồi, nên ngay
cả bây giờ calculus này cũng không thể coi là đã được phát minh trọn vẹn; mà đúng hơn, mỗi
người đã được góp phần bao nhiêu, theo sức mình, vào sự hoàn thiện của nó,

<!-- PDF 21, trang in XVII -->

thì ta phải ghi nhận điều đó với lòng biết ơn. Và đó là điều tôi cho rằng phải giữ về vinh
quang của việc phát minh ra calculus này, vinh quang mà trước đây quả đã bị tranh cãi dữ dội
đến thế.

Còn về những tên gọi khác nhau mà các nhà Toán học thuộc nhiều dân tộc khác nhau thường đặt cho
calculus này, thì tất cả đều quy về chỗ phù hợp tốt với định nghĩa đã nêu ở đây: vì dù những
lượng tăng tan biến ấy, mà người ta xét tỷ lệ giữa chúng, được gọi là *differentialia* hay
*fluxiones*, thì chúng luôn phải được hiểu là bằng không; và khái niệm đúng về infinite parva
phải được xác lập ở chính điều này.

Từ đây, mọi điều người ta đã tranh luận, tò mò hơn là hữu ích, về các differentialia bậc hai
và các bậc cao hơn cũng sẽ trở nên hết sức rõ ràng, vì tất cả chúng tự thân đều tan biến như
nhau, và người ta không bao giờ xét chúng tự thân, mà đúng hơn là xét quan hệ tương hỗ giữa
chúng. Vì khi tỷ lệ mà các lượng tăng tan biến của hai functio giữ với nhau lại được biểu thị
bằng một functio nào đó, nếu cả lượng tăng tan biến của functio này được đem so với các lượng
khác, thì vấn đề phải coi là quy về các differentialia bậc hai; và cứ thế, bước tiến tới các
differentialia bậc cao hơn phải được hiểu sao cho trong tâm trí thật ra luôn luôn là

<!-- PDF 22, trang in XVIII -->

các lượng hữu hạn, còn các dấu của differentialia chỉ được dùng để biểu diễn chúng cho tiện.

Thoạt nhìn, lối mô tả Analysis infinitorum như thế có vẻ với nhiều người là nhẹ nhõm và quá
cằn cỗi, dù cái vẻ bí ẩn kia của infinite parva thực chất cũng chẳng hứa hẹn gì hơn: nhưng nếu
ta nhận biết rõ các tỷ lệ tồn tại giữa những lượng tăng tan biến của bất kỳ functio nào, thì
hiểu biết này thường tự nó đã có tầm quan trọng lớn nhất; hơn nữa trong rất nhiều cuộc khảo
sát, mà lại là những cuộc khảo sát gian nan nhất, nó cần thiết tới mức không có sự trợ giúp của
nó thì hoàn toàn chẳng hiểu được gì. Chẳng hạn nếu câu hỏi là về chuyển động của một quả cầu
bắn ra từ khẩu pháo, và đồng thời phải tính tới sức cản của không khí, thì không cách nào xác
định ngay được chuyển động qua một quãng đường hữu hạn sẽ ra sao, vì cả hướng của đường đi mà
quả cầu theo lẫn tốc độ của nó, thứ mà sức cản phụ thuộc vào, đều thay đổi ở mọi khoảnh khắc.
Nhưng ta xét quãng đường mà chuyển động diễn ra càng nhỏ thì sự biến thiên ấy càng nhỏ, và càng
dễ đạt tới nhận thức về sự thật; còn nếu ta làm cho quãng đường ấy tan biến hẳn, thì vì mọi sự
không đều, cả về hướng đường đi lẫn về tốc độ, lúc ấy đều bị loại bỏ, ta sẽ có thể xác định
chính xác theo các quy luật chuyển động

<!-- PDF 23, trang in XIX -->

tác dụng của sức cản, và gán được sự thay đổi của chuyển động sinh ra trong một khoảnh khắc thời
gian. Mà khi đã biết những thay đổi tức thời này, hay đúng hơn, vì chính chúng là không, biết
quan hệ tương hỗ giữa chúng, thì ta đã thu được rất nhiều; và việc của calculus integralis là
từ đó suy ra chuyển động đã biến đổi qua một quãng đường hữu hạn. Tôi cho rằng hoàn toàn không
cần phải chỉ ra dài dòng hơn công dụng của Calculus differentialis và của Analysis infinitorum
nói chung; vì giờ đây đã đủ rõ rằng, nếu ta muốn tiến hành chính xác hơn dù là cuộc khảo sát
nhẹ nhàng nhất mà trong đó có chuyển động của các vật thể, cả rắn lẫn lỏng, thì việc ấy không
những không thể làm được nếu không có Analysis infinitorum, mà chính môn khoa học này nhiều khi
còn chưa được trau dồi đủ để ta có thể giải thích vấn đề đến tận cùng. Quả thật, công dụng của
môn Analysis cao cấp này lan tỏa qua mọi phần của Toán học tới mức mọi thứ mà cho tới nay có
thể giải quyết được không cần tới nó gần như phải coi là chẳng đáng gì.

Vậy tôi đã quyết định trong cuốn sách này rút ra toàn bộ Calculus differentialis từ những nguyên
lý đúng, và trình bày nó phong phú đến mức không bỏ sót điều gì trong số những điều thuộc về nó
đã được phát minh cho tới nay. Tôi chia tác phẩm làm hai phần; trong phần trước, sau khi đặt
nền móng

<!-- PDF 24, trang in XX -->

cho calculus differentialis, tôi đã trình bày phương pháp lấy vi phân các functio thuộc mọi
loại, và tìm không chỉ các differentialia bậc nhất mà cả các bậc cao hơn, dù các functio chỉ
chứa một lượng variabilis duy nhất hay chứa hai hay nhiều hơn. Còn trong phần kia, tôi đã trình
bày công dụng rất rộng của calculus này trong chính Analysis finitorum và lý thuyết chuỗi; ở đó
tôi cũng đặc biệt đã giải thích rõ ràng Lý thuyết cực đại và cực tiểu. Còn về công dụng của
calculus này trong Hình học các đường cong thì ở đây tôi chưa đưa ra gì cả; điều này sẽ ít bị
mong đợi hơn, vì trong những tác phẩm khác phần này đã được trình bày phong phú tới mức thậm chí
các nguyên lý đầu tiên của calculus differentialis gần như đã được lấy từ Hình học, và, khi
chúng còn chưa được khai triển đủ, đã được áp dụng vào môn khoa học này với sự chăm chút tối
đa. Còn ở đây mọi thứ đều nằm trong giới hạn của Analysis thuần túy, tới mức không cần tới một
hình vẽ nào để giải thích mọi quy tắc của calculus này.

<!-- PDF 25-27, trang in XXI-XXIII: mục lục. Số trang chép đúng như bản in; chỗ lệch so với
     trang mở đầu chương thực tế xem PAGE_MAP.md. -->

# Mục lục

## Phần thứ nhất

| Chương | Nhan đề | Trang |
|---|---|---:|
| I | *De Differentiis finitis* — Về các sai lệch hữu hạn | 3 |
| II | *De Usu Differentiarum in Doctrina serierum* — Về công dụng của các sai lệch trong lý thuyết chuỗi | 39 |
| III | *De Infinitis et infinite parvis* — Về các lượng vô cùng lớn và vô cùng nhỏ | 70 |
| IV | *De Differentialium cuiusque ordinis natura* — Về bản chất của các differentialia mọi bậc | 98 |
| V | *De Differentiatione functionum algebraicarum unicam variabilem involventium* — Về phép lấy vi phân các functio đại số chứa một lượng variabilis duy nhất | 124 |
| VI | *De Differentiatione functionum transcendentium* — Về phép lấy vi phân các functio transcendentes | 151 |
| VII | *De Differentiatione functionum duas pluresve variabiles involventium* — Về phép lấy vi phân các functio chứa hai hay nhiều lượng variabiles | 178 |
| VIII | *De Formularum Differentialium ulteriori differentiatione* — Về việc lấy vi phân tiếp các biểu thức vi phân | 204 |
| IX | *De Aequationibus Differentialibus* — Về các phương trình vi phân | 241 |

<!-- PDF 26, trang in XXII -->

## Phần thứ hai

| Chương | Nhan đề | Trang |
|---|---|---:|
| I | *De Transformatione Serierum* — Về phép biến đổi chuỗi | 281 |
| II | *De Investigatione serierum summabilium* — Về việc tìm các chuỗi tính được tổng | 304 |
| III | *De Inventione Differentiarum finitarum* — Về việc tìm các sai lệch hữu hạn | 332 |
| IV | *De Conversione Functionum in Series* — Về việc chuyển các functio thành chuỗi | 359 |
| V | *Investigatio summae Serierum ex Termino generali* — Tìm tổng của các chuỗi từ số hạng tổng quát | 403 |
| VI | *De Summatione Progressionum per Series Infinitas* — Về việc tính tổng các cấp số bằng chuỗi vô hạn | 441 |
| VII | *Methodus summandi superior ulterius promota* — Phương pháp tính tổng ở trên, được đẩy xa thêm | 479 |
| VIII | *De usu Calculi Differentialis in formandis seriebus* — Về công dụng của Calculus Differentialis trong việc lập chuỗi | 515 |
| IX | *De usu Calculi Differentialis in aequationibus resolvendis* — Về công dụng của Calculus Differentialis trong việc giải phương trình | 546 |
| X | *De Maximis & Minimis* — Về cực đại và cực tiểu | 578 |
| XI | *De Maximis & Minimis functionum multiformium pluresque variabiles complectentium* — Về cực đại và cực tiểu của các functio multiformes và các functio chứa nhiều lượng variabiles | 619 |
| XII | *De Usu differentialium in investigandis radicibus realibus aequationum* — Về công dụng của differentialia trong việc tìm các nghiệm thực của phương trình | 657 |

<!-- PDF 27, trang in XXIII -->

| Chương | Nhan đề | Trang |
|---|---|---:|
| XIII | *De Criteriis radicum imaginariarum* — Về các dấu hiệu nhận biết nghiệm ảo | 689 |
| XIV | *De Differentialibus functionum in certis tantum casibus* — Về differentialia của các functio chỉ trong những trường hợp nhất định | 712 |
| XV | *De Valoribus functionum, qui certis casibus videntur indeterminati* — Về các giá trị của functio, những giá trị trong một số trường hợp có vẻ bất định | 738 |
| XVI | *De Differentiatione Functionum inexplicabilium* — Về phép lấy vi phân các functio inexplicabiles | 769 |
| XVII | *De Interpolatione Serierum* — Về phép nội suy chuỗi | 808 |
| XVIII | *De Usu Calculi Differentialis in Resolutione Fractionum* — Về công dụng của Calculus Differentialis trong việc phân tích các phân thức | 843 |

<!-- PDF 28, trang in XXIV -->

# Lỗi in

*Errores Typographici*

1. Trang 509, dòng 3: thay $z = xx$, đọc là $z = xx + x$.
2. Trang 513, dòng 14: thay
   $$\frac{(z' - z)}{a^x (a-1)^2}$$
   đọc là
   $$\frac{(z' - az)}{a^x (a-1)^2}.$$

<!-- Hai lỗi này được giữ nguyên như bản in trong phần dịch thân sách, không sửa lặng lẽ, theo
     ANNOTATION_GUIDE.md. Số mũ của (a-1) ở vế "lege" in hơi mờ; đọc là 2, khớp với phép tính
     Q = a(P'-P)/(a-1) ở trang 513 (PDF 541). -->
