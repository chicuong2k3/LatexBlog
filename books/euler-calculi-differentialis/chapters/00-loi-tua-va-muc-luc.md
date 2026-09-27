---
title: "Lời tựa, mục lục và lỗi in"
summary: "Lời tựa của Euler giải thích vì sao Calculus Differentialis không thể bắt đầu bằng định nghĩa, dựng nên khái niệm lượng constans và lượng variabilis từ ví dụ quả cầu bắn ra từ khẩu pháo, rồi định nghĩa vi phân là sai lệch xuất hiện vô cùng nhỏ mà tỉ lệ giữa chúng vẫn xác định được. Kèm mục lục hai phần của sách và danh sách lỗi in do chính Euler ghi."
tags: [dich-sach, toan, giai-tich]
slug: "loi-tua-va-muc-luc"
status: chua-hoan-thanh
---

<!-- Nguồn: PDF 5-28, tức trang in i-xxiv. Bản dịch đã đối chiếu ảnh scan ở mọi chỗ mang
     công thức tỉ lệ; xem TRANSLATION_LEDGER.md, mục "Ghi chú dịch". -->

# Nền tảng phép tính vi phân

*Cùng ứng dụng của nó trong phân tích hữu hạn và lý thuyết chuỗi*

**Tác giả: LEONHARD EULER**

Giám đốc Viện Hàn lọm Khoa học và Hệ nữ văn lớn vực Vương quốc Phổ, giáo sư danh dực Viện
Hàn lọm Khoa học Đế quốc thiên vĩ, ủy viên của các học viện danh tiếng ở Paris và London.

In tại Viện Hàn lọm Khoa học Đế quốc thiên vĩ, Sankt-Pêtêrbơng. Năm 1755.

# Praefatio

<!-- PDF 7, trang in III -->

Cho nên Calculus Differentialis, và nói chung là cả Analysin Infinitorum, việc trình bày cho
những ai chưa được trang bị đủ về kiến thức này là điều khó khăn đến mức gần như không thể
làm được: cho đến tận đây, như thường thấy ở những môn học khác, người ta vẫn có thể tiện lợi
bắt đầu phần trình bày bằng các định nghĩa. Không phải là calculus này hoàn toàn không có
định nghĩa nào; nhưng vì để hiểu được định nghĩa ấy thì cần tới những khái niệm vừa không
quen thuộc trong đời sống thường, vừa ít được dùng ngay cả trong Analysi finitorum, mà
chỉ được khai triển và giải thích dần trong phần trình bày Calculus Differentialis. Do đó
định nghĩa của nó không thể thấy rõ trước khi các nguyên lý của nó đã được trình bày thật sự
rõ ràng. Trước hết, calculus này xoay quanh các lượng biến thiên: dù cho mọi lượng theo bản
chất đều có thể tăng và giảm vô hạn.

<!-- PDF 8, trang in IV -->

tuy nhiên, vì calculus hướng tới một cái vô cùng nhất định nào đó, người ta hình dung rằng có
những lượng giữ nguyên một độ lớn không đổi, còn những lượng khác thì biến thiên qua mọi bậc
tăng và giảm. Để gọi tên sự phân biệt này, những lượng trước gọi là *constantes*, những lượng
sau gọi là *variabiles*; và thế sự phân biệt ấy không nằm ở bản chất của sự vật, mà ở bản chất
của câu hỏi mà calculus ám tới.

Vì sự phân biệt giữa lượng constans và lượng variabilis được minh họa rõ nhất bằng một ví
dụ, ta hãy xét việc một quả cầu bắn ra từ một khẩu pháo chiến đánh bằng thuốc nổ; và ví dụ
này có vẻ đặc biệt thích hợp để làm sáng vẻn đẹp ở đây. Có nhiều lượng xuất hiện trong đó,
và tỷ lệ giữa chúng là điều cần giữ trong cuộc nghiên cứu này: thứ nhất là lượng thuốc nổ;
thứ hai là độ cao của khẩu pháo trên mặt phẳng ngang; thứ ba là chiều dài đạn trên mặt
phẳng ngang; thứ tư là thời gian trong suốt quá trình quả cầu bay trong không khí. Và nếu
không thực hiện thí nghiệm với chính cái khẩu pháo ấy, còn phải tính thêm chiều dài của nó
cùng trọng lượng quả cầu vào nữa. Nhưng ở đây ta hãy tránh bận tâm tới sự khác nhau giữa
các loại pháo và các loại cầu, kẻo rơi vào những câu hỏi quá rắc rối. Vậy nếu giữ mãi không
đổi

<!-- PDF 9, trang in V -->

lượng thuốc nổ, còn độ cao của khẩu pháo thì liên tục thay đổi, và độ dài phóng tới cùng với
thời gian quả cầu đi qua không khí đều phải xác định; trong câu hỏi này, lượng thuốc nổ hay
lực xung kích sẽ là một lượng constans, còn độ cao của khẩu pháo, cùng độ dài phóng tới và
thời lượng của nó, thì phải quy về những lượng variabiles. Nếu ta muốn định nghĩa những điều
này ở mọi bậc độ cao, thì từ đó sẽ thấy rõ những biến đổi lớn nhỏ nào trong độ dài và thời
lượng phóng tới phát sinh ra từ mọi sự biến thiên của độ cao. Sẽ có một câu hỏi khác nữa, nếu
giữ nguyên độ cao của khẩu pháo, còn lượng thuốc nổ thì liên tục thay đổi, và những biến đổi
do đó mà sinh ra trong phóng tới thì phải xác định: ở đây độ cao của khẩu pháo là một lượng
constans, trái lại lượng thuốc nổ, cùng độ dài và thời lượng phóng tới, là những lượng
variabiles. Như vậy thấy rõ, khi cách đặt câu hỏi thay đổi thì cùng một lượng ấy lại được
xếp vào *constantes* lúc này, vào *variabiles* lúc khác. Đồng thời, từ đây cũng hiểu ra điều
đáng chú ý nhất trong việc này, là các lượng variabiles phải phụ thuộc vào nhau như thế nào, để
khi một lượng thay đổi thì những lượng còn lại tất yếu phải chịu biến đổi theo. Chẳng hạn
trong trường hợp trước, khi lượng thuốc nổ

<!-- PDF 10, trang in VI -->

giữ nguyên không đổi, thì độ dài và thời lượng phóng tới thay đổi theo khi độ cao của khẩu
pháo thay đổi; do đó chúng là những lượng variabiles phụ thuộc vào độ cao của khẩu pháo, và
khi lượng này thay đổi thì chúng cũng chịu những biến đổi nhất định. Còn trong trường hợp
sau, chúng phụ thuộc vào lượng thuốc nổ, và sự thay đổi của lượng này phải sinh ra trong chúng
những biến đổi tương ứng.

Những lượng mà theo cách này phụ thuộc vào những lượng khác, tức là phải nhận lấy những biến
đổi khi những lượng kia thay đổi, thường được gọi là *functiones* của chúng. Danh xưng ấy rất
phổ biến và bao hàm mọi cách, theo đó một lượng có thể được xác định bởi những lượng khác.
Vậy nếu $x$ biểu thị một lượng variabilis, thì mọi lượng nào tùy thuộc vào $x$, hay được
$x$ xác định, đều gọi là các *functiones* của nó. Những thứ thuộc loại ấy là bình phương của nó
$xx$, mọi lũy thừa bất kỳ của nó, cũng như những lượng tùy thuộc vào những lượng này. Thậm
chí cả những lượng *transcendentes* nữa, nói chung là mọi thứ gì tùy thuộc vào $x$ theo cách
mà khi $x$ tăng hay giảm thì chúng cũng biến đổi theo. Từ đây sinh ra câu hỏi, điều cần tìm
là: nếu lượng $x$ đã cho được tăng hoặc giảm bởi một lượng nào đó, thì mỗi functio của nó
nhận lấy tăng hay giảm bao nhiêu.

<!-- PDF 11, trang in VII -->

Ở những trường hợp đơn giản, câu hỏi này dễ giải ngay: nếu lượng $x$ được tăng bởi lượng
$\omega$, thì bình phương của nó $xx$ sẽ nhận lấy tăng thêm

$$
2x\omega + \omega^2;
$$

do đó lượng tăng của chính $x$ sẽ có tỷ lệ với lượng tăng của $xx$ là $\omega$ với
$2x\omega + \omega\omega$, tức là $1$ với $2x + \omega$. Cũng theo cách ấy, trong những
trường hợp khác, tỷ lệ giữa lượng tăng của $x$ với lượng tăng hay giảm mà functio nào đó nhận
lấy từ đó thường được xem là đã biết. Nhưng việc nghiên cứu tỷ lệ của những lượng tăng như
thế không chỉ có tầm quan trọng lớn nhất, mà còn là nền tảng của toàn bộ Analysin
Infinitorum.

<!-- PDF 11, trang in VII (tiếp) -->

Để điều này hiện ra rõ hơn, hãy lấy ví dụ bình phương $xx$ đã nói trên, lượng tăng của nó
là $2x\omega + \omega^2$; lượng này, như ta đã thấy khi bản thân lượng $x$ tăng thêm $\omega$,
tuân theo tỷ lệ $\omega + \omega$ với $1$. Từ đó thấy rõ, lượng tăng $\omega$ càng nhỏ thì tỷ
lệ ấy càng tiến gần tới tỷ lệ $2x$ với $1$; dù vậy nó không đi tới hẳn tỷ lệ ấy trước khi
chính lượng tăng $\omega$ hoàn toàn tan biến. Như vậy ta hiểu rằng nếu lượng tăng $\omega$
của lượng variabilis $x$ đi tới không, thì lượng tăng do đó sinh ra ở bình phương $xx$ của nó
cũng tan biến, và lượng tăng ấy giữ với độ lớn vô cùng nhỏ một tỷ lệ nhất định, tức là $2x$
với $1$; và điều đã nói ở đây về bình phương thì cũng phải hiểu là nói về mọi functio khác
của $x$. Quả thật, lượng tăng xuất hiện trong chúng, khi bản thân lượng $x$ nhận lấy một lượng
tăng tan biến, sẽ giữ một tỷ lệ nhất định và ấn định đối với chính lượng tăng ấy.

<!-- PDF 12, trang in VIII -->

Và chính theo cách ấy ta được dẫn tới định nghĩa của Calculus Differentialis, tức là phương
pháp xác định tỷ lệ của các lượng tăng tan biến mà các functio bất kỳ nhận lấy, khi cho lượng
biến thiên — lượng mà chúng là các functio của nó — nhận lấy một lượng tăng tan biến. Như
vậy, sau khi có định nghĩa ấy thì bản chất đích thực của calculus differentialis sẽ dễ dàng
bộc lộ, và sẽ dễ dàng lắp ghép lại cho tất cả những ai không lạ gì trong lĩnh vực này, để
những người ấy dễ dàng nhận ra điều đó.

<!-- PDF 12, trang in VIII (tiếp) -->

Vậy calculus differentialis không phải bận tâm tới việc tìm kiếm chính những lượng tăng tan
biến ấy, dù chúng bằng không, mà bận tâm tới tỷ lệ và tỷ số giữa chúng. Và vì những tỷ lệ
ấy được biểu thị bằng các lượng hữu hạn, nên ở đây calculus cũng phải xét tới các lượng
hữu hạn. Dù sao, dù theo thói lệ thường được truyền tụng, các lượng tăng tan biến ấy tưởng
như

<!-- PDF 13, trang in IX -->

phải được xác định và đã được cho trước, chúng thì chưa bao giờ được xét một cách tuyệt đối,
mà các kết luận luôn luôn được suy ra từ tỷ lệ giữa chúng.

Cũng theo cách tương tự, calculus integralis được so sánh như sau, và sẽ thuận lợi hơn nếu
định nghĩa rằng nó là phương pháp tìm các functio mà lượng tăng tan biến của chúng đã biết.
Nhưng để những tỷ lệ ấy dễ thu thập hơn, và dễ được biểu thị trong calculus, chính những lượng
tăng tan biến đó, dù bằng không, vẫn thường được biểu thị bằng những dấu hiệu nhất định; và
khi đã dùng chúng thì không còn lý do gì để không đặt cho chúng những cái tên nhất định. Vậy
chúng được gọi là *differentialia*; chúng cũng được gọi là *infinite parua* khi cùng đi với
lượng mà chúng được lấy ra. Chúng vì thế phải được hiểu theo bản chất là không, để bị xem
ngang bằng với không hay với cái rỗng. Vậy nếu lượng $x$ được ban cho lượng tăng $\omega$ để
trở thành $x + \omega$, thì bình phương của nó $xx$ sẽ trở thành

$$
xx + 2x\omega + \omega\omega,
$$

và do đó lượng tăng mà nó nhận lấy là

$$
2x\omega + \omega\omega;
$$

nên lượng tăng của chính $x$, tức là $\omega$, sẽ có tỷ lệ với lượng tăng bậc hai ấy, tức là
$2x\omega + \omega^2$, như $1$ với $2x + \omega$; tỷ lệ này đi tới tỷ lệ $1$ với $2x$, và
chỉ khi $\omega$ tan biến thì mới đi tới. Vậy hãy đặt

<!-- PDF 14, trang in X -->

$\omega = 0$; thì tỷ lệ của những lượng tăng tan biến ấy, mà calculator differentialis nhắm
tới, chắc chắn là $1$ với $2x$; và ngược lại, tỷ lệ này cũng sẽ không tương ứng với sự thật,
nếu lượng tăng ấy là $\omega$ thật sự không tan biến, mà hoàn toàn trở nên ngang bằng với
không. Vậy cái rỗng ấy mà ký hiệu bằng $\omega$, vì nó biểu thị lượng tăng của lượng $x$ (nó
có tỷ lệ với lượng tăng của bình phương $xx$ là $1$ với $2x$), thì nó là lượng tăng của bình
phương $xx$ ấy, và do đó cũng ngang bằng không; từ đó cùng lúc thấy rõ việc triệt tiêu những
lượng tăng này không ngăn cản việc tỷ lệ giữa chúng — vốn là $1$ với $2x$ — được xác định.
Cái rỗng ấy, giờ đã được biểu thị bằng chữ $\omega$ trong calculus differentialis, vì ở đó nó
được nhắm tới như lượng tăng của lượng $x$, thì được gọi là $dx$, và differentiale của nó
được gọi như vậy; và do đó, thay $\omega$ bằng $dx$, differentiale của $xx$ sẽ là $2x\,dx$. Cũng
theo cách ấy, chứng minh được rằng differentiale của lũy thừa ba $x^3$ là $3x^2\,dx$, và
nói chung differentiale của lũy thừa bậc $n$ là $nx^{n-1}\,dx$.

<!-- PDF 14, trang in X (tiếp) -->

Còn những functio khác bất kỳ của $x$ nào được đưa ra, thì trong calculus differentialis
người ta theo đúng quy tắc đã dạy để tìm differentialia của chúng; nhưng phải nhớ rằng, vì
những differentia này tuyệt đối

<!-- PDF 15, trang in XI -->

bằng không, nên không thể suy ra từ chúng điều gì khác, trừ khi bằng tỷ lệ giữa chúng, tỷ lệ
mà dĩ dẩu rằng luôn quy về được với các lượng hữu hạn.

Vậy, khi các nguyên lý của Calculus differentialis đã được xác lập theo cách này — cách duy
nhất tương ứng với lý trí — thì mọi phản biện thường được đưa ra chống lại calculus này tự
động sụp đổ. Dù vậy chúng vẫn giữ được toàn bộ sức lực, nếu các differentialia hay các lượng
vô cùng nhỏ không bị hủy hoàn toàn.

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
> Chính Euler đã viết lời này ở trang in IX, chỉ dùng chữ mà không dùng phép giới hạn: lượng
> tăng $\omega$ càng nhỏ thì tỷ lệ ấy càng gần $2x$ với $1$. Ông cũng nói thẳng rằng tỷ lệ
> ấy "không đi tới hẳn" cho tới khi $\omega$ tan biến — nghĩa là bản thân tỷ lệ $1 : 2x$ chỉ
> là cái được xác định *qua* quá trình đó.
>
> Khác biệt về sau nằm ở chỗ Euler không cần định nghĩa giới hạn, vì ông không dùng giới hạn ở
> đâu cả. Ông dựng cả calculus trên quan hệ thuần số học giữa những đại lượng hữu hạn, và coi
> tỷ lệ giữa hai lượng cùng tan biến là một vật thể hoàn toàn xác định. Đổi lại, ông phải
> trả lời bằng văn bản mọi phản biện, vì không có định nghĩa nào để đỡ — đó chính là hai
> trang trang in XI–XIII mà ta vừa dịch.

<!-- PDF 15, trang in XI (tiếp) -->

Nhiều người đã trước đây trình bày về Calculus differentialis thì thấy rằng nên tách
differentialia khỏi cái rỗng tuyệt đối, và lập ra một thứ tự riêng biệt của các lượng vô cùng
nhỏ, vốn không hoàn toàn tan biến, mà giữ lại một lượng nào đó tuy nhỏ đến mức nhỏ hơn mọi
lượng có thể gán được. Vậy thì có lý do mà nên bỏ qua sự chặt chẽ hình học, và coi những kết
luận ở đây là đáng ngờ, bởi vì những lượng vô cùng nhỏ dạng ấy đã bị bỏ qua. Quả thật, dù
những lượng vô cùng nhỏ tưởng chừng nhỏ đến mức tốt xa kia, thì khi bị loại bỏ, không chỉ
riêng lẻ mà cả nhiều lượng, thậm chí vô số lượng cùng lúc, sai số từ đó cuối cùng có thể trở
nên khổng lồ.

<!-- PDF 16, trang in XII -->

Còn phản biện này thì những ví dụ mà ta dùng để dựng cùng kết luận ấy qua Calculus
differentialis và qua hình học đều cố ý làm sai lệch nó: vì nếu những lượng vô cùng nhỏ mà
trong calculus bị bỏ qua không phải là cái rỗng, thì sai số tất yếu phải sinh ra, và lớn dần
theo những gì bị bỏ qua. Điều này còn xảy ra nữa, thì sai số phải quy cho lỗi của chính
calculus, vì đôi khi các sai số này được các sai số khác bù lại; và như vậy thì chính calculus
đó mới được giải thoát khỏi mọi nghi ngờ về sai số. Nhưng nếu sự bù lẫn nhau thành lập bởi
một sai số mới thuộc loại ấy, thì chính những ví dụ dạng đó đã chứng minh rõ điều tôi muốn
nói: những gì đã bị bỏ qua phải được coi là hoàn toàn và tuyệt đối bằng cái rỗng. Vậy những
lượng vô cùng nhỏ mà được truyền qua trong calculus differentialis không khác gì cái rỗng
tuyệt đối.

<!-- PDF 16, trang in XII (tiếp) -->

Người ta cũng còn bàn một việc nữa, khi nhiều người mô tả những lượng vô cùng nhỏ sao cho
chúng như những hạt bụi nhỏ của các tia sáng, hoặc thậm chí như cả quả địa cầu; dù người
ta có xác định được trong calculus độ lớn của cả quả địa cầu, thì sai số ấy không phải
của một hạt bụi mà của hàng triệu hạt bụi, nên có thể dễ dàng bỏ qua được. Dù vậy, sự chặt
chẽ hình học cũng ghê tởm một sai số dù nhỏ đến đâu, và phản biện này sẽ rất nặng nếu còn
giữ lại bất cứ điều gì. Do đó cũng khó nói xem người ta mong đợi điều gì ở những người muốn

<!-- PDF 17, trang in XIII -->

phân biệt lượng vô cùng nhỏ với cái rỗng. Họ hãy sợ rằng, nếu những lượng ấy hoàn toàn tan
biến, thì cả việc so sánh chúng với các lượng đã biết cũng sẽ bị loại bỏ, và mọi so sánh
như vậy sẽ bị dẫn tới cực hạn, bởi vì hai cái rỗng tuyệt đối không thể so sánh với nhau
theo bất cứ cách nào. Vậy họ buộc phải để lại cho những lượng ấy một độ lớn nào đó, để
chúng có cái gì đó mà so sánh; nhưng họ lại buộc phải thừa nhận độ lớn ấy nhỏ đến mức như
thể nó bằng không, có thể bị nghi ngờ và bị bỏ qua trong calculus mà không sợ sai số nào.
Dù vậy họ không dám chỉ định một độ lớn nhất định và xác định cho nó, dù nhỏ đến mức không
thể nắm bắt được; vì luôn luôn nếu họ lấy độ lớn ấy nhỏ hơn hai ba lần, thì các so sánh sẽ
hoàn toàn giống hệt nhau. Từ đó thấy rõ rằng bản thân độ lớn ấy không đủ để thiết lập sự
so sánh, và độ lớn ấy thậm chí không bị loại bỏ, ngay cả khi nó hoàn toàn tan biến. Còn như
đã nói ở trên thì rõ ràng, sự so sánh mà calculator differentialis nhắm tới, không thể tồn tại
ngay cả khi chưa cho lượng tăng của nó tan biến hẳn: lượng tăng của lượng $x$, mà nói chung
ta đã thấy nó bằng $\omega$, có tỷ lệ

<!-- PDF 18, trang in XIV -->

với lượng tăng của bình phương $xx$, tức là $2x\omega + \omega^2$, tỷ lệ

$$
\omega \text{ với } 2x\omega + \omega^2;
$$

tỷ lệ này luôn khác với tỷ lệ $1$ với $2x$, trừ khi $\omega$ bằng không. Nhưng nếu ta đặt nó
bằng không, thì chỉ khi đó mới thật sự khẳng định được rằng tỷ lệ ấy chính xác là $1$ với $2x$.
Nhưng dù sao cũng thấy rõ, lượng tăng $\omega$ càng nhỏ thì tỷ lệ ấy càng gần tới tỷ lệ này.
Do đó không chỉ được phép, mà còn đúng với bản chất của sự vật, là trước hết xét những lượng
tăng như những lượng hữu hạn, và ngay cả trong những hình vẽ mà việc làm sáng vẻn đẹp đòi
hỏi, cũng biểu thị chúng thành những lượng hữu hạn; và do đó những lượng tăng này, khi được
hình dung là liên tục nhỏ đi, thì tỷ lệ giữa chúng sẽ liên tục tiến gần hơn nữa tới một giới
hạn xác định nào đó, mà chúng sẽ chỉ chạm tới khi đã hoàn toàn đi tới cái rỗng. Và giới hạn
này, tức là cái cấu thành tỷ lệ sau cùng của những lượng tăng ấy, đúng là đối tượng của
Calculus differentialis. Vậy nền tảng đầu tiên phải có của nó, là người đầu tiên nghĩ tới,
đã suy ngẫm về những tỷ lệ cuối cùng mà các lượng tăng của các lượng biến thiên tiến tới khi
liên tục nhỏ đi, và chỉ khi chúng tan biến thì mới chạm tới. Và dấu vết của sự suy ngẫm ấy
thì ta tìm thấy ở những nhà toán học cổ đại

<!-- PDF 19, trang in XV -->

mà vì thế không thể phủ nhận rằng họ đã có một ý tưởng nào đó, dù nhẹ, về Analysin
Infinitorum. Rồi dần dần môn học này nhận được những mức tăng lớn hơn, cho tới khi bất ngờ
đạt tới đỉnh cao mà ngày nay ta thấy, dù trong đó vẫn còn nhiều khuất mờ hơn những gì đã
được kéo ra ánh sáng.

Vì Calculus differentialis được trang bị cho mọi loại functio, dù chúng phức tạp đến đâu, đã
có từ lâu một phương pháp không mới lắm để so sánh các lượng tăng tan biến của mọi functio
với nhau; nhưng sự phát minh ấy dần dần đã tiến tới những functio ngày càng phức tạp hơn.
Xét riêng các functio *rationales*: tỷ lệ cuối cùng mà lượng tăng tan biến của chúng giữ với
nhau có thể gán cho một thời đại xa trước thời Newton và Leibniz; nên Calculus differentialis,
xét theo nghĩa chỉ áp dụng cho các functio rationales, phải được coi là đã phát minh ra từ
trước thời đại ấy khá lâu. Còn không có nghi ngờ gì phải nói rằng phần của Calculus
differentialis mà Newton xử lý các functio *irrationales* thì phải quy cho ông; và phần
đó, nhờ định lý nổi tiếng của ông về khai triển tổng quát các lũy thừa nhị thức, đã được
suy ra dễ dàng. Qua phát minh xuất sắc ấy, các ranh giới của calculus differentialis đã được
mở rộng, và

<!-- PDF 20, trang in XVI -->

Leibniz cũng không phải ít công, vì ông đã đưa calculus này — dù xét như một kỹ thuật riêng
biệt — vào một môn học trở thành, thu thập các mệnh đề của nó như thể thành một hệ thống,
và giải thích chúng rõ ràng. Từ đó mới có thể thấy ra những trợ giúp lớn nhất còn thiếu
để nghiên cứu sâu hơn môn này, và những gì từ trước tới nay còn mong muốn đều phải rút ra
từ các nguyên lý đã vững. Với sự cố gắng lớn nhất của chính Leibniz, và của những
Bernoulli mà ông đã thuê mướn cho việc này, các thành tựu của Calculus differentialis đã
lan sang cả những functio *transcendentes*, phần trước đây còn chưa được khai phá, và từ đó
cả những nền tảng vững nhất của Calculus integralis cũng đã được xác lập. Và những người sau
đó bám lấy những nền tảng ấy để lao tới trong lĩnh vực này đã liên tục thêm vào những mức
tăng lớn hơn nữa.

<!-- PDF 20, trang in XVI (tiếp) -->

Newton cũng đã phát triển những ý tưởng rất lớn về phần đầu của Calculus integralis, mà
phần khởi đầu ấy, vì khó tách rời khỏi nguồn gốc đầu tiên của calculus differentialis, không
thể nói là đã hoàn tất một cách tuyệt đối; và vì phần lớn nhất của nó vẫn còn để mở rộng,
nên calculus này, ngay cả giờ, cũng không thể được coi là đã phát minh ra một cách tuyệt
đối; mà chỉ nên thừa nhận với lòng biết ơn rằng mỗi người đã góp phần xứng đáng với sự hoàn
tất của nó, theo sức mình. Và đây cũng là điều tôi cho rằng phải ghi nhận là vinh dựng của
phát minh calculus này — vinh dựng mà trước đây đã bị tranh luận gay gắt đến mức ấy.

<!-- PDF 21, trang in XVII -->

Còn về những cái tên khác nhau mà các nhà toán học từng đặt cho calculus này, thì tất cả
đều quy về điều này, là chúng phải hòa hợp tốt đẹp với định nghĩa đã nêu ở đây. Bởi vì
chính những lượng tăng tan biến ấy, mà tỷ lệ giữa chúng là điều được xét đến, dù được gọi
là *differentialia* hay *fluxiones*, thì vẫn luôn phải được hiểu là bằng không; và trong ấy
chính là nơi cần dựng lên khái niệm đúng đắn về những lượng vô cùng nhỏ.

Từ đó, mọi điều tò mò nhưng ít hữu ích được nói về các differentialia bậc hai và các bậc cao
hơn trở nên hoàn toàn rõ ràng, khi biết rằng tất cả chúng đều bằng không theo bản thân chúng,
và không bao giờ có thể bằng không theo bản thân chúng, mà chỉ có thể xét tới trong mối quan
hệ giữa chúng với nhau. Vì nếu tỷ lệ mà lượng tăng tan biến của hai functio giữ được lại
được biểu thị nữa bằng một functio nào đó, và nếu lượng tăng tan biến của functio ấy lại được
so với các functio khác, thì việc ấy phải được quy về các differentialia bậc hai; và như thế
tiến thêm nữa, sự đi xa lên các differentialia bậc cao hơn được hiểu ra, sao cho các lượng
hữu hạn luôn luôn được bảo toàn, và dấu hiệu của chúng chỉ được dùng để biểu thị cho chúng.

<!-- PDF 22, trang in XVIII -->

Trong cái nhìn đầu tiên, cách mô tả Analysin Infinitorum này có vẻ nhẹ nhàng và gần như
không sinh kết quả gì cho nhiều người, dù nó giải thích rất nhiều điều huyền diệu của các
lượng vô cùng nhỏ. Nhưng nếu ta hiểu rõ những tỷ lệ nằm giữa các lượng tăng tan biến của
mọi functio bất kỳ, thì kiến thức này thường tự nó đã có tầm quan trọng lớn nhất; và trong
phần lớn những cuộc nghiên cứu khó khăn nhất, nó lại là điều cần thiết, không có nó thì không
thể hiểu được điều gì. Chẳng hạn, nếu có một functio nào đó về chuyển động của quả cầu bắn
từ khẩu pháo, đồng thời phải biết tỷ lệ sức cản của không khí, thì chuyển động trong một
khoảng thời gian hữu hạn không thể nào xác định được, bởi cả hướng đi của quả cầu lẫn tốc
độ của nó, mà tốc độ thì lại phụ thuộc vào sức cản, đều thay đổi ở mọi khoảnh khắc. Nhưng
càng xét khoảng thời gian mà chuyển động xảy ra càng nhỏ, thì sự biến thiên ấy càng nhỏ, và
càng dễ đi tới nhận thức về sự thật; và nếu ta coi khoảng ấy là hoàn toàn tan biến, vì mọi
sự bất bình đẳng, dù về hướng đi hay về tốc độ, đều đã bị loại bỏ, thì sức cản sẽ được xác
định chính xác theo các quy tắc về chuyển động, và sự biến thiên của chuyển động sẽ có thể
gán cho một khoảng thời gian bất kỳ.

<!-- PDF 23, trang in XIX -->

Đã biết những biến thiên tức thời ấy, hay đúng hơn là đã biết chúng bằng không, cùng với
tỷ lệ giữa chúng với nhau, thì ta thu được lợi ích rất lớn; và đó chính là công trình của
calculus integralis, từ đó suy ra chuyển động trong một khoảng không gian hữu hạn từ độ đi
đã thay đổi. Tôi không cho là cần thiết phải chỉ ra thêm nữa công dụng của Calculus
differentialis và của Analysin Infinitorum nói chung; bởi vì ngay bây giờ, khi ta muốn tiến
hành ngay cả một cuộc nghiên cứu nhẹ nhất mà chuyển động của các vật thể, cứng hay chất lỏng,
đều có mặt, thì điều đó không chỉ không nằm ngoài khả năng của Analysin Infinitorum, mà
còn thường là chưa được khai phá đủ, để có thể giải thích trọn vẹn vấn đề. Bởi vì trong tất
cả các phần của Toán học, môn Toán học cấp cao này đã lan tỏa rộng đến mức mọi thứ mà
không có nó thì ngày nay đã dễ dàng làm được, gần như phải coi như không tồn tại.

Vậy tôi dự định trong cuốn sách này dựng một Calculus differentialis toàn diện từ những nguyên
lý đúng đắn, rồi trình bày nó một cách phong phú, sao cho không bỏ sót điều gì thuộc về nó
mà từ trước tới nay đã được phát minh. Cuốn sách chia làm hai phần. Ở phần trước, trên nền
tảng

<!-- PDF 24, trang in XX -->

của calculus differentialis, tôi đã trình bày phương pháp khai triển mọi loại functio theo
nguyên lý lượng biến thiên, không chỉ các differentialia bậc nhất mà cả các bậc cao hơn; dù
functio liên quan tới một lượng biến thiên, hay tới hai hay nhiều lượng biến thiên. Còn ở
phần kia, tôi đã trình bày công dụng rộng nhất của calculus này ngay trong Analysi
finitorum và trong lý thuyết chuỗi; ở đó tôi cũng đã giải thích rõ ràng nhất Lý thuyết các
cực trị và cực tiểu. Còn về công dụng của calculus này trong Hình học các đường thẳng cong
thì tôi chưa nói gì ở đây, và sẽ càng cần đến nó hơn nữa, vì trong những tác phẩm lớn
hơn, phần ấy đã được trình bày đầy đủ đến mức chính những nguyên lý đầu tiên của Calculus
differentialis dường như đã được mượn từ Hình học, và lĩnh vực ấy, vì nó vừa mới được
khai triển tới mức chưa đủ, lại đang đòi hỏi sự chú ý tối đa. Ở đây mọi thứ đều nằm trong
giới hạn của Analysin thuần túy, tới mức không cần tới bất kỳ hình vẽ nào để giải thích
mọi mệnh đề của calculus này.

<!-- PDF 25-27, trang in XXI-XXIII: mục lục -->

# Mục lục

## Phần thứ nhất

| Chương | Nhan đề | Trang |
|---|---|---:|
| I | *De Differentiis finitis* — Về sai lệch hữu hạn | 3 |
| II | *De Usu Differentiarum in Doctrina serierum* — Về công dụng của sai lệch trong lý thuyết chuỗi | 35 |
| III | *De Infinitis et infinite parvis* — Về cái vô cùng và lượng vô cùng nhỏ | 70 |
| IV | *De Differentialium cuiusque ordinis natura* — Về bản chất của vi phân mọi bậc | 121 |
| V | *De Differentiatione functionum algebraicarum unamque variabilem involventium* — Về đạo hàm các functio đại số có một lượng biến thiên | 124 |
| VI | *De Differentiatione functionum transcendentium* — Về đạo hàm các functio transcendentes | 149 |
| VII | *De Differentiatione functionum duas pluresque variabiles involventium* — Về đạo hàm các functio có hai hay nhiều lượng biến thiên | 184 |
| VIII | *De Formularum Differentialium ulteriori differentiatione* — Về đạo hàm tiếp trên các biểu thức vi phân | 204 |
| IX | *De Aequationibus Differentialibus* — Về các phương trình vi phân | 341 |

## Phần thứ hai

| Chương | Nhan đề | Trang |
|---|---|---:|
| I | *De Transformationibus Serierum* — Về các phép biến đổi chuỗi | 281 |
| II | *De Investigatione serierum summabilium* — Về nghiên cứu các chuỗi có thể tổng | 304 |
| III | *De Inventione Differentiarum similarium* — Về tìm ra các sai lệch tương tự | 333 |
| IV | *De Conversione Functionum in Series* — Về chuyển các functio thành chuỗi | 359 |
| V | *Investigatio summae seriei ex termino generali* — Nghiên cứu tổng của một chuỗi từ công thức tổng quát của hạng tổng quát | 403 |
| VI | *De Summatione Progressionum per Series Infinitas* — Về tính tổng các cấp số nhân bằng các chuỗi vô hạn | 441 |
| VII | *Methodus summandi superior suggesta* — Phương pháp tính tổng ở mức cao hơn được gợi ý | 479 |
| VIII | *De Usu Calculi Differentialis in formandis seriebus* — Về công dụng của Calculus differentialis trong việc lập các chuỗi | 515 |
| IX | *De Usu Calculi Differentialis in aequationibus resolvendis* — Về công dụng của Calculus differentialis trong việc giải các phương trình | 548 |
| X | *De Maximis et Minimis* — Về cực trị và cực tiểu | 578 |
| XI | *De Maximis & Minimis functionum multiformium pluresque variabiles complectentium* — Về cực trị và cực tiểu các functio nhiều dạng, chứa nhiều lượng biến thiên | 615 |
| XII | *De Usu differentialium in investigandis radicibus realibus aequationum* — Về công dụng của differentialia trong việc tìm các nghiệm thật của phương trình | 617 |
| XIII | *De Criteriis radicum imaginariarum* — Về các tiêu chuẩn của nghiệm ảo | 680 |
| XIV | *De Differentialibus functionum incertarum statum* — Về vi phân của các functio có trạng thái không xác định | 714 |
| XV | *De Determinatione numerorum et summarum in aequationibus, quae certis casibus videntur* — Về xác định các con số và các tổng trong những phương trình dường như chỉ xuất hiện ở những trường hợp nhất định | 738 |
| XVI | *De Differentiatione Functionum implicitarum* — Về đạo hàm các functio ẩn | 769 |
| XVII | *De Interpolatione Serierum* — Về nội suy chuỗi | 808 |
| XVIII | *De Usu Calculi Differentialis in Rejunctione Fractionum* — Về công dụng của Calculus differentialis trong việc ghép các phân thức | 843 |

<!-- PDF 28, trang in XXIV -->

# Lỗi in

*Errores Typographici*

1. Trang 509, dòng 3: thay $z \equiv xx$ bằng $z \equiv xx + x$.
2. Trang 513, dòng 14: thay
   $$\frac{x^7 - x}{a^x (a-1)^2}$$
   bằng
   $$\frac{x^7 - ax}{a^x (a-1)^3}.$$

Hai lỗi này được giữ nguyên trong phần dịch, không sửa lặng lẽ, theo `ANNOTATION_GUIDE.md`.
