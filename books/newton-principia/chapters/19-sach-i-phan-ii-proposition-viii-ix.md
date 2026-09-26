---
title: "Sách I, Phần II. Proposition VIII–IX"
summary: "Quy luật lực hướng tâm cho nửa đường tròn và đường xoáy ốc, cùng các kết quả về quỹ đạo elip và hypebol."
slug: "sach-i-phan-ii-proposition-viii-ix"
number: 19
---

# Sách I, Phần II. Proposition VIII–IX

![Sơ đồ Proposition VIII–IX](../assets/propositions-7-9-diagrams.svg)

*Hình 9. Sơ đồ được dựng lại từ các hình trong bản gốc; cần đối chiếu với scan.*

## Proposition VIII. Bài toán III

Nếu một vật thể chuyển động trong nửa đường tròn $PQA$, hãy tìm quy luật của lực hướng tâm hướng về một điểm $S$ đủ xa, để mọi đường $PS$, $RS$ kẻ tới điểm ấy có thể coi là song song.

Từ $C$, tâm của nửa đường tròn, kẻ bán kính $CA$, cắt các đường song song ấy vuông góc tại $M$ và $N$, rồi nối $CP$.

Vì các tam giác $CPM$, $PZT$, $RZQ$ đồng dạng, ta có
$$
\frac{CP^2}{PM^2} = \frac{PR^2}{QT^2}.
$$

Theo tính chất của đường tròn, $PR^2$ bằng diện tích hình chữ nhật $QR \times RN + QN$, hoặc khi $P$, $Q$ trùng nhau, bằng $QR \times 2PM$. Vì vậy,
$$
\frac{CP^2}{PM^2} = \frac{QR \times 2PM}{QT^2},
$$
và do đó
$$
\frac{QT^2}{QR} = \frac{2PM^3}{CP^2},
\qquad
\frac{QT^2 \times SP^2}{QR} = \frac{2PM^3 \times SP^2}{CP^2}.
$$

Theo Hệ quả 1 và 5 của Proposition VI, lực hướng tâm tỷ lệ nghịch với $\frac{2PM^3 \times SP^2}{CP^2}$. Vì tỷ số $\frac{2SP^2}{CP^2}$ là hằng số đã cho, lực hướng tâm tỷ lệ nghịch với $PM^3$.

Điều này cũng có thể dễ dàng suy ra từ Proposition trước.

## Học luận

Lập luận tương tự cho thấy một vật thể sẽ chuyển động trong một elip, thậm chí trong một hypebol hoặc parabol, nhờ một lực hướng tâm tỷ lệ nghịch với lập thể củaordinate hướng về một tâm lực ở vô cùng xa.

> **[Ghi chú hiện đại]**
>
> **Khái niệm tương ứng.** Bài toán III là lần đầu tiên trong *Principia*, lực được mô tả bằng **lũy thừa nghịch đảo của một đại lượng hình học** thay vì bằng quan hệ với tâm. Với tâm lực ở vô cùng xa, các đường $PS$ trở thành đường song song, và đại lượng quyết định là khoảng cách $PM$. Học luận mở rộng: cùng cách dựng ấy cho ra một bảng tra đối chiếu giữa số mũ của lực và hình dạng quỹ đạo.
>
> **Công thức.** Kết quả là $F \propto \dfrac{1}{PM^3}$, với $\dfrac{2SP^2}{CP^2}$ là hằng số. Dạng tổng quát mà Học luận chỉ ra là $F \propto \dfrac{1}{y^n}$, và vì $F = -\dfrac{dU}{dy}$ nên thế năng tương ứng là $U \propto \dfrac{1}{y^{n-1}}$. Với $n = 2$ ta ra parabol, và lực hút vô cùng xa tỷ lệ nghịch với bình phương khoảng cách chính là gia tốc không đổi theo một phương — bài toán ném ngang quen thuộc.
>
> **Vì sao Newton viết như vậy.** Vì ông đang dựng một bảng tra mà ngành hấp dẫn vẫn dùng. Bằng cách hạ tâm lực ra vô cùng, ông giảm bài toán về trường hợp lực không đổi theo một hướng, làm ra một bài toán mà ông giải được. Tâm lực ở vô cùng xa là thủ phép quen thuộc để biến bài toán khó thành bài toán đã biết, và thủ phép này sẽ xuất hiện nhiều lần nữa trong Phần III.
>
> **Hiện nay thì sao.** Bảng tra ấy là tiền thân trực tiếp của phương pháp **thế năng hiệu dụng** trong cơ học thiên thể. Ngày nay ta viết $U_{\text{eff}} = \dfrac{L^2}{2mr^2} + U(r)$ và đọc ra toàn bộ hình dạng quỹ đạo chỉ từ đường của nó: một cực tiểu cho quỹ đạo tròn, hai cực tiểu cho elip, một yên ngựa và một cực tiểu cho hyperbol. Newton làm đúng việc ấy bằng hình học thuần tuý, chỉ khác là ông gọi nó là "ordinate".

## Proposition IX. Bài toán IV

Nếu một vật thể quay trong một đường xoáy ốc $PQS$, cắt tất cả các bán kính $SP$, $SQ$, v.v. theo một góc đã cho, hãy tìm quy luật của lực hướng tâm hướng về tâm của đường xoáy ốc.

Giả sử góc vô cùng nhỏ $PSQ$ đã cho. Vì tất cả các góc đã cho, hình $SPRQT$ cũng được xác định.

Vì vậy, tỷ số $\frac{QT}{QR}$ cũng đã cho, và $\frac{QT^2}{QR}$ tỷ lệ với $QT$, tức là, vì hình đã được xác định, tỷ lệ với $SP$.

Nếu góc $PSQ$ thay đổi, đường thẳng $QR$ chắn góc tiếp xúc $QPR$ sẽ thay đổi theo bình phương của $PR$ hoặc $QT$, theo Lemma XI. Vì vậy, tỷ số $\frac{QT^2}{QR}$ vẫn không đổi, tức là vẫn tỷ lệ với $SP$.

Do đó, $\frac{QT^2 \times SP^2}{QR}$ tỷ lệ với $SP^3$. Theo Hệ quả 1 và 5 của Proposition VI, lực hướng tâm tỷ lệ nghịch với lập thể của khoảng cách $SP$.

Có thể chứng minh điều tương tự theo cách khác. Hạ đoạn vuông góc $SY$ xuống tiếp tuyến. Dây cung $PY$ của đường tròn đồng tâm cắt đường xoáy ốc có những tỷ số đã cho với độ cao $SP$. Vì vậy, $SP^3$ tỷ lệ với $SY^2 \times PY$, tức là, theo Hệ quả 3 và 5 của Proposition VI, lực hướng tâm tỷ lệ nghịch với lượng ấy.

> **[Ghi chú hiện đại]**
>
> **Khái niệm tương ứng.** Bài toán IV trả lời một câu rất đẹp: vận tốc có thể tăng vô hạn theo quỹ đạo nào mà lực vẫn hướng về tâm và vẫn không để vật thể rơi vào tâm? Câu trả lời là **đường xoáy ốc logarit**, và lực cần dùng là lực nghịch đảo bậc ba.
>
> **Công thức.** Bài toán cho $F \propto \dfrac{1}{SP^3}$, tức đúng cái họ lực đã gặp ở Hệ quả 1 của Proposition II, nơi sai lệch của tốc độ quét diện tích sinh ra một lực tiếp tuyến $\propto 1/r^3$. Ở đây cùng số mũ ấy xuất hiện theo nghĩa thuần tuý là lực hướng tâm. Với đường xoáy ốc $r = ae^{b\theta}$ ta có $\kappa = \dfrac{1}{r\sqrt{1+b^2}}$, nên $F = mv^2\kappa \propto \dfrac{v^2}{r}$; cùng $F \propto 1/r^3$ suy ra $v \propto 1/r$.
>
> **Vì sao Newton viết như vậy.** Vì ông muốn biết quỹ đạo nào là **quỹ đạo tối thiểu**, tức là quỹ đạo mà lực cần dùng là nhỏ nhất để giữ vật thể ở đó. Với một lực hướng tâm bất kỳ, vận tốc lớn dần sẽ đưa vật thể ra xa tâm, vận tốc nhỏ dần sẽ kéo nó vào tâm; với lực nghịch đảo bậc ba có đúng một tốc độ cân bằng, và quỹ đạo ứng với nó là đường xoáy ốc. Đó là câu trả lời cho bài toán quỹ đạo tối thiểu mà ngành hấp dẫn vẫn dùng.
>
> **Hiện nay thì sao.** Cùng ý quỹ đạo tối thiểu nằm ngay sau khái niệm **quỹ đạo biên ổn định** trong nghiên cứu hệ động lực. Vì lực nghịch đảo bậc ba không bị chặn ở gần tâm, quỹ đạo của nó có thể tiến sát tâm tuỳ ý, và đó là điều kiện cần để có những quỹ đạo khí hành tinh dài ngày. Người đọc hôm nay nhận ra đây là họ lực mà cả Phần III đang hướng tới, chỉ khác là Newton lúc này vẫn chưa biết lực hút rơi vào họ nào.
