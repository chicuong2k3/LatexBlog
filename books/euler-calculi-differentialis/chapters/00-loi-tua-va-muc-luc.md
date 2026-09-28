---
title: "Lời tựa, mục lục và lỗi in"
summary: "Lời tựa của Euler dẫn từ đại lượng biến thiên và hàm đến số gia tiêu biến, vi phân và các phép tính vi phân, tích phân; kèm mục lục hai phần cùng danh sách lỗi in."
tags: [dich-sach, toan, giai-tich]
slug: "loi-tua-va-muc-luc"
status: chua-hoan-thanh
---

<!-- Nguồn: PDF 5-28, tức trang in i-xxiv. Bản dịch đã đối chiếu ảnh scan từng trang PDF 5-28;
     xem TRANSLATION_LEDGER.md, mục "Ghi chú dịch". -->

# Cơ sở của Phép tính Vi phân

*Cùng ứng dụng của nó trong Phân tích Hữu hạn và Lý thuyết Chuỗi*

[Chú thích thuật ngữ: *Analysis finitorum* (Phân tích Hữu hạn) ở nhan đề không mang nghĩa “finite analysis” hiện đại; ở đây chỉ phép phân tích các biểu thức hữu hạn. *Analysis infinitorum* (Phân tích Vô hạn) là lĩnh vực rộng hơn, bao gồm chuỗi vô hạn và các phương pháp vi phân, tích phân.]

**Tác giả: LEONHARD EULER**

Giám đốc Viện Hàn lâm Khoa học và Văn chương Hoàng gia Phổ, giáo sư danh dự của Viện Hàn lâm Khoa học Đế quốc tại Sankt-Peterburg, hội viên các Viện Hàn lâm Hoàng gia Paris và London.

Sankt-Peterburg, do Viện Hàn lâm Khoa học Đế quốc xuất bản, năm 1755.

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
nắm được trước khi các nguyên lý của nó đã được nhìn thấu đủ rõ ràng. Vậy trước hết, phép tính này xoay quanh các đại lượng biến thiên (quantitates variabiles): tuy mọi đại lượng, về bản chất, đều có thể được tăng lên hoặc giảm xuống không giới hạn,

<!-- PDF 8, trang in IV -->

nhưng khi phép tính được hướng tới một mục đích nhất định, có những đại lượng được xem là luôn giữ nguyên độ lớn, còn những đại lượng khác thì thay đổi qua mọi mức tăng giảm. Để đánh dấu sự phân biệt ấy, các đại lượng trước thường được gọi là hằng lượng (*quantitates constantes*), các đại lượng sau là đại lượng biến thiên (*quantitates variabiles*). Vậy sự khác biệt này không nằm ở bản chất của sự vật, mà ở câu hỏi đang khảo sát.

Có thể thấy rõ nhất sự khác nhau giữa hằng lượng và đại lượng biến thiên qua một ví dụ. Xét một quả cầu được bắn ra từ đại bác nhờ sức nổ của thuốc súng; ví dụ này đặc biệt thích hợp để làm sáng tỏ vấn đề. Ta cần tính đến vài đại lượng có liên hệ với nhau: lượng thuốc súng, góc nâng nòng pháo so với đường chân trời, tầm bắn trên mặt phẳng ngang và thời gian quả cầu ở trên không. Nếu thí nghiệm dùng những khẩu pháo khác nhau, còn phải tính cả chiều dài nòng pháo và trọng lượng quả cầu. Nhưng tạm gác sự khác nhau giữa các khẩu pháo và quả cầu để khỏi sa vào những câu hỏi quá rắc rối. Giả sử ta giữ nguyên

<!-- PDF 9, trang in V -->

Giữ nguyên lượng thuốc súng và thay đổi góc nâng liên tục, ta muốn tìm tầm bắn cùng thời gian quả cầu bay trong không khí. Trong câu hỏi này, lượng thuốc súng, hay lực đẩy, là hằng lượng; góc nâng, tầm bắn và thời gian bay là các đại lượng biến thiên, vì ta muốn biết chúng thay đổi ra sao ở mọi góc nâng. Một câu hỏi khác là giữ nguyên góc nâng, thay đổi lượng thuốc súng và tìm xem cú bắn biến đổi thế nào. Khi ấy góc nâng là hằng lượng, còn lượng thuốc súng, tầm bắn và thời gian bay là các đại lượng biến thiên. Cùng một đại lượng có thể là hằng lượng trong câu hỏi này nhưng thành đại lượng biến thiên trong câu hỏi khác. Điều cần chú ý là các đại lượng biến thiên phụ thuộc vào nhau ra sao: một đại lượng thay đổi thì những đại lượng khác cũng thay đổi theo. Chẳng hạn, trong trường hợp đầu, lượng thuốc súng

<!-- PDF 10, trang in VI -->

vẫn giữ nguyên, góc nâng thay đổi thì tầm bắn và thời gian bay cũng thay đổi. Chúng là những hàm của góc nâng: khi góc nâng đổi, cả hai cũng đổi theo. Ở trường hợp sau, tầm bắn và thời gian bay phụ thuộc vào lượng thuốc súng, nên lượng thuốc súng thay đổi thì chúng cũng thay đổi.

Những đại lượng phụ thuộc vào đại lượng khác theo cách ấy, nghĩa là chúng cũng thay đổi khi đại lượng kia thay đổi, thường được gọi là hàm (*functiones*) của đại lượng kia. Tên gọi này có phạm vi rộng: nó bao gồm mọi cách một đại lượng được xác định qua những đại lượng khác. Theo cách hiểu của Euler, $x^2$, $x^3$, $\sqrt{x}$, $\sin x$ và $\log x$ đều là những hàm của $x$. Nếu $x$ là một đại lượng biến thiên, thì mọi đại lượng phụ thuộc vào $x$ hay được xác định qua $x$ theo bất kỳ cách nào đều là hàm của $x$. Chẳng hạn, bình phương $xx$, các lũy thừa khác, những biểu thức ghép từ chúng, cả các hàm siêu việt (*functiones transcendentes*), nói chung mọi đại lượng thay đổi theo $x$ khi $x$ tăng hoặc giảm, đều thuộc loại này. Euler viết $xx$ để chỉ $x^2$ (và $xxx$ để chỉ $x^3$); ký hiệu ấy được giữ lại ở đây theo nguyên bản. Vậy nếu tăng hoặc giảm $x$ một lượng cho trước, mỗi hàm của nó thay đổi bao nhiêu,

<!-- PDF 11, trang in VII -->

tức là tăng hay giảm bao nhiêu. Với những trường hợp đơn giản, câu hỏi này dễ trả lời. Nếu tăng $x$ thêm $\omega$, bình phương $xx$ tăng thêm

$$
2x\omega + \omega\omega;
$$

Do đó, số gia của $x$ và số gia của $xx$ có tỷ lệ $\omega:(2x\omega + \omega\omega)$, hay $1:(2x+\omega)$. Với các hàm khác, ta cũng xét tỷ lệ giữa số gia của $x$ với số gia mà mỗi hàm nhận được. Việc khảo sát những tỷ lệ ấy có ý nghĩa căn bản: toàn bộ Phân tích Vô hạn (Analysis infinitorum) dựa trên đó.

<!-- PDF 11, trang in VII (tiếp) -->

Xét lại bình phương $xx$. Khi $x$ tăng thêm số gia $\omega$, số gia của nó là $2x\omega+\omega\omega$, có tỷ lệ với $\omega$ là $(2x+\omega):1$. Số gia $\omega$ càng nhỏ, tỷ lệ ấy càng gần $2x:1$; nhưng chỉ khi $\omega$ tiêu biến hẳn thì tỷ lệ mới đạt đúng giá trị đó. Vì vậy, nếu số gia $\omega$ của đại lượng biến thiên $x$ trở thành không, số gia của bình phương $xx$

<!-- PDF 12, trang in VIII -->

cũng tiêu biến, nhưng vẫn giữ tỷ lệ $2x:1$ với số gia kia. Điều vừa nói về bình phương cũng đúng với mọi hàm khác của $x$: khi $x$ nhận một số gia tiêu biến, số gia mà mỗi hàm nhận được vẫn giữ với nó một tỷ lệ xác định.

Ta đến được định nghĩa của phép tính vi phân (Calculus Differentialis): đó là **phương pháp xác định tỷ lệ giữa các số gia tiêu biến của những hàm bất kỳ với số gia tiêu biến được gán cho đại lượng biến thiên mà chúng phụ thuộc vào**. Ai đã quen với lĩnh vực này sẽ thấy định nghĩa ấy bao hàm trọn vẹn bản chất của phép tính vi phân.

<!-- PDF 12, trang in VIII (tiếp) -->

Phép tính vi phân không nhằm tìm chính các số gia tiêu biến ấy, vì chúng bằng không; điều nó khảo sát là tỷ lệ giữa chúng. Những tỷ lệ này được biểu thị bằng các đại lượng hữu hạn, nên phép tính cũng phải được xem là xoay quanh các đại lượng hữu hạn. Dù các quy tắc thường được dạy có vẻ nhằm xác định những số gia tiêu biến ấy, kết luận không bao giờ dựa vào bản thân chúng mà luôn dựa vào tỷ lệ giữa chúng.

[Chú giải hiện đại: Với $y=f(x)$, cách viết hiện nay diễn đạt phép tính này bằng $dy=f'(x)\,dx$. Phép tính vi phân đi từ hàm $y$ tới vi phân $dy$; phép tính tích phân đi ngược lại, từ quan hệ giữa $dy$ và $dx$ để khôi phục hàm $y$, sai khác một hằng số.]

<!-- PDF 13, trang in IX -->

Phép tính tích phân cũng vậy. Euler định nghĩa nó là **phương pháp tìm những hàm mà các số gia tiêu biến ấy thuộc về, khi đã biết tỷ lệ giữa các số gia**. Để những tỷ lệ ấy dễ thu thập và biểu diễn hơn, ông ký hiệu các số gia tiêu biến, dù chúng bằng không, bằng những dấu riêng; từ đó có thể đặt tên cho chúng. Ông gọi chúng là vi phân (*differentialia*); vì không có độ lớn, chúng còn được gọi là đại lượng vô cùng bé (*infinite parva*). Theo bản chất, chúng phải được hiểu là hoàn toàn không, tức bằng không. Nếu gán cho $x$ số gia $\omega$, để nó thành $x+\omega$, thì bình phương $xx$ trở thành

$$
xx + 2x\omega + \omega\omega,
$$

nên số gia của nó là

$$
2x\omega + \omega\omega.
$$

Vì thế số gia của $x$, tức $\omega$, có tỷ lệ với số gia của bình phương như $1:(2x+\omega)$. Tỷ lệ ấy chỉ trở thành $1:2x$ khi $\omega$ tiêu biến. Theo Euler,

<!-- PDF 14, trang in X -->

Khi đặt $\omega=0$, tỷ lệ giữa các số gia tiêu biến ấy — đối tượng duy nhất mà phép tính vi phân khảo sát — quả thật là $1:2x$. Nếu $\omega$ không tiêu biến hoàn toàn, tỷ lệ đó sẽ không đúng. Vì $\omega$ biểu thị số gia của $x$, số gia của bình phương $xx$ theo tỷ lệ $1:2x$ là $2x\omega$, nên nó cũng bằng không. Việc cả hai số gia triệt tiêu không ngăn ta xác định tỷ lệ giữa chúng là $1:2x$. Trong phép tính vi phân, số không $\omega$ được ký hiệu là $dx$ khi biểu thị số gia của $x$, và được gọi là vi phân của $x$.
Khi thay $\omega$ bằng $dx$, vi phân của $xx$ là $2x\,dx$. Tương tự, vi phân của $x^3$ là $3xx\,dx$, và nói chung vi phân của $x^n$ là $nx^{n-1}\,dx$.

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
> Euler thật sự đặt $\omega=0$ rồi nói tỷ lệ giữa các số gia tiêu biến là $1:2x$. Ông không xem đây là phép chia số học $0/0$; theo lập luận của ông, dù hai số gia đều bằng không, tỷ lệ hình học giữa chúng vẫn xác định được. Đây là nền tảng mà Euler chủ trương cho phép tính vi phân, không phải một cách viết khác của định nghĩa đạo hàm hiện đại.
>
> Nếu diễn đạt phép tính ấy bằng giải tích hiện đại, ta không đặt $\omega=0$ bên trong phân thức mà lấy giới hạn:
>
> $$
> \lim_{\omega\to0}\frac{(x+\omega)^2-x^2}{\omega}
> =\lim_{\omega\to0}(2x+\omega)=2x.
> $$
>
> Euler chưa xây dựng lý thuyết giới hạn theo định nghĩa $\varepsilon$–$\delta$ của thế kỷ XIX. Tuy nhiên, ông có nói rõ đến một tỷ lệ tiến gần một giới hạn xác định: ngay trong lời tựa này, ông gọi giới hạn ấy là đối tượng thật sự của phép tính vi phân. Cách biện minh của ông và cách định nghĩa đạo hàm hiện đại cho kết quả tương ứng, nhưng không cùng một nền tảng logic.

<!-- PDF 15, trang in XI (tiếp) -->

Tuy vậy, một số người dạy phép tính vi phân lại tách các vi phân khỏi số không tuyệt đối, đặt chúng vào một hạng riêng gồm những đại lượng vô cùng bé không tiêu biến hẳn mà vẫn giữ một độ lớn nào đó, dù nhỏ hơn mọi đại lượng có thể chỉ ra. Euler cho rằng người ta có lý khi trách họ xem nhẹ tính nghiêm ngặt của hình học và nghi ngờ các kết luận của phép tính ấy: dù những đại lượng vô cùng bé được hình dung nhỏ đến đâu, việc bỏ qua không chỉ từng lượng riêng lẻ mà cả nhiều, thậm chí vô số lượng như thế vẫn có thể gây ra sai số rất lớn. Những người ấy tìm cách bác bỏ lời phê bình bằng cách nêu các ví dụ trong đó phép tính vi phân cho cùng kết luận với hình học sơ cấp, nhưng lập luận ấy sai.

<!-- PDF 16, trang in XII -->

Nếu các đại lượng vô cùng bé bị bỏ qua mà không thực sự bằng không, thì tất yếu phải sinh ra sai số; càng nhiều lượng bị gộp lại, sai số càng lớn. Nếu điều đó không xảy ra, ta nên quy cho khuyết điểm của phép tính, khiến sai số này đôi khi bù trừ sai số khác, chứ không thể cho rằng phép tính đã thoát khỏi nguy cơ sai lệch. Còn nếu sự bù trừ xảy ra mà không cần thêm một sai số mới nào, thì chính những ví dụ ấy chứng minh điều Euler muốn nói: những gì bị bỏ qua phải được coi là hoàn toàn, tuyệt đối bằng không. Các đại lượng vô cùng bé trong phép tính vi phân chẳng khác nào số không tuyệt đối.

<!-- PDF 16, trang in XII (tiếp) -->

Cũng chẳng ích gì khi mô tả các đại lượng vô cùng bé như hạt bụi so với một ngọn núi khổng lồ, thậm chí so với cả Trái Đất. Người tính toán kích thước Trái Đất có thể được tha thứ nếu sai số không chỉ bằng một mà bằng hàng nghìn hạt bụi; nhưng tính nghiêm ngặt của hình học không dung thứ ngay cả sai số nhỏ đến thế. Nếu lập luận này còn chút sức nặng nào thì nó cũng đủ bác bỏ cách biện hộ kia. Hơn nữa, khó hiểu những người

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
cả khi độ lớn ấy tan biến hoàn toàn. Từ những điều trên, rõ ràng tỷ lệ được xét trong phép tính vi phân chỉ có nghĩa khi các số gia tiêu biến hoàn toàn. Số gia $\omega$ của $x$ và số gia $2x\omega + \omega\omega$ của bình phương $xx$ có tỷ lệ

<!-- PDF 18, trang in XIV -->

$$
\text{như } 1 \text{ với } 2x + \omega;
$$

tỷ lệ này khác $1:2x$ nếu $\omega\ne0$; chỉ khi đặt $\omega=0$ ta mới có thể khẳng định tỷ lệ ấy đúng bằng $1:2x$. Ta cũng thấy số gia $\omega$ càng nhỏ thì tỷ lệ càng tiến gần giá trị đó. Vì vậy, trước hết có thể xét các số gia như những lượng hữu hạn và biểu diễn chúng như thế trong hình vẽ; sau đó hình dung chúng nhỏ dần. Khi ấy, tỷ lệ giữa chúng tiến gần tới một giới hạn xác định, giới hạn mà chúng chỉ đạt tới khi các số gia tiêu biến hoàn toàn. Euler gọi giới hạn này, như thể nó là tỷ lệ cuối cùng của các số gia tiêu biến, là đối tượng thật sự của phép tính vi phân. Người đầu tiên đặt nền móng cho phép tính ấy hẳn là người đầu tiên suy ngẫm về những tỷ lệ cuối cùng mà số gia của các đại lượng biến thiên tiến gần tới khi chúng ngày càng nhỏ đi và chỉ đạt tới khi tiêu biến. Dấu vết của cách suy ngẫm này đã có ở những tác giả cổ xưa nhất,

<!-- PDF 19, trang in XV -->

những người vì thế không thể bị phủ nhận là đã có một ý niệm nào đó và một hiểu biết sơ sài về
Analysis infinitorum. Rồi dần dần môn khoa học này nhận được những bước tiến lớn hơn, và nó
không phải đột ngột được đưa lên tới đỉnh cao mà ngày nay người ta thấy; tuy thật ra trong nó
vẫn còn nhiều điều ẩn giấu hơn những điều đã được đưa ra ánh sáng.

Phép tính vi phân áp dụng cho đủ loại hàm, nhưng phương pháp so sánh số gia tiêu biến của chúng không xuất hiện cùng một lúc; nó được phát triển dần cho những hàm ngày càng phức tạp. Với các hàm hữu tỷ (*functiones rationales*), tỷ lệ cuối cùng giữa các số gia tiêu biến đã được xác định từ lâu trước thời NEWTON và LEIBNIZ. Vì thế, phép tính vi phân trong phạm vi các hàm hữu tỷ hẳn đã được phát minh trước thời họ. Phần phép tính vi phân áp dụng cho các hàm vô tỷ (*functiones irrationales*) phải được ghi công cho NEWTON. Ông đã phát triển phần này nhờ định lý tổng quát khai triển lũy thừa của nhị thức; phát minh ấy mở rộng đáng kể phạm vi của phép tính vi phân.

<!-- PDF 20, trang in XVI -->

Ta cũng mang ơn LEIBNIZ: ông biến phép tính này, trước đó chỉ được xem như một kỹ thuật riêng biệt, thành một môn học, hệ thống hóa các quy tắc và giải thích chúng rõ ràng. Nhờ vậy, người ta có thêm phương tiện để phát triển phép tính và rút ra từ những nguyên lý chắc chắn những điều trước đó còn thiếu. Chẳng bao lâu, nhờ công của LEIBNIZ và các BERNOULLI mà ông khích lệ tham gia, phép tính vi phân mở rộng sang các hàm siêu việt (*functiones transcendentes*), lĩnh vực đến khi ấy còn bị bỏ ngỏ. Những nền tảng vững chắc nhất của phép tính tích phân cũng được xác lập; các nhà toán học về sau tiếp tục xây dựng trên đó.

<!-- PDF 20, trang in XVI (tiếp) -->

NEWTON cũng đưa ra nhiều mẫu mực phong phú về phép tính tích phân. Vì sự ra đời của phép tính này khó tách khỏi nguồn gốc của phép tính vi phân, không thể xác định rạch ròi ai là người phát minh đầu tiên. Hơn nữa, phần lớn phép tính tích phân vẫn còn cần được phát triển; ngay cả ngày nay cũng chưa thể xem nó đã hoàn thiện. Ta nên biết ơn tất cả những ai, tùy sức mình, góp phần hoàn thiện nó.

<!-- PDF 21, trang in XVII -->

Đó là điều cần ghi nhận về công lao phát minh phép tính này, vốn từng bị tranh cãi dữ dội.

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
