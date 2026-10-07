---
title: "Sách I, Phần III. Proposition XI"
summary: "Tìm quy luật lực hướng tâm hướng về tiêu điểm của elip."
slug: "sach-i-phan-iii-proposition-xi"
number: 21
---

![Elip, tiêu điểm và lực hướng tâm](../assets/proposition-11-ellipse-focus.svg)

*Hình 11. Sơ đồ được dựng lại từ hình minh họa trong bản gốc; cần đối chiếu ký hiệu với scan.*

## Phần III

Về chuyển động của các vật thể trong những hình cắt conic lệch tâm.

## Proposition XI. Bài toán VI

Nếu một vật thể quay trong một elip, hãy tìm quy luật của lực hướng tâm hướng về tiêu điểm của elip.

Gọi $S$ là tiêu điểm của elip. Kẻ $SP$, cắt đường kính $DK$ của elip tại $E$, và cắt ordinate $Qv$ tại $x$; rồi hoàn thành hình bình hành $QvPR$.

Rõ ràng $EP$ bằng bán trục lớn $AC$. Để thấy điều này, kẻ $HI$ từ tiêu điểm còn lại $H$ của elip song song với $EC$. Vì $CS$, $CH$ bằng nhau, $ES$, $EI$ cũng bằng nhau. Vì vậy, $EP$ bằng một nửa tổng $PS$ và $PI$; tức là, nhờ $HI$, $PR$ song song và các góc $IPR$, $HPZ$ bằng nhau, $EP$ bằng một nửa tổng $PS$ và $PH$. Tổng ấy bằng toàn bộ trục $2AC$.

Kẻ $QT$ vuông góc với $SP$, và gọi $L$ là latus rectum chính của elip, tức là
$$
L = \frac{2BC^2}{AC}.
$$

Từ các tính chất của các hình cắt conic và các tam giác đồng dạng, ta có các tỷ số:
$$
\frac{L \times QR}{L \times Pv}
=
\frac{QR}{Pv}
=
\frac{Px}{Pv}
=
\frac{PE}{PC}
=
\frac{AC}{PC},
$$
$$
\frac{L \times Pv}{Gv \times Pv}
=
\frac{L}{Gv},
$$
và
$$
\frac{GvP}{Qv^2}
=
\frac{PC^2}{CD^2}.
$$

Khi $Q$ và $P$ trùng nhau, $Qv^2$ tỷ lệ bằng với $Qv^2$ theo Hệ quả 2 của Lemma VII. Ngoài ra,
$$
\frac{Qv^2}{QT^2}
=
\frac{EP^2}{PF^2}
=
\frac{CA^2}{PF^2}
=
\frac{CD^2}{CB^2}.
$$

Nhân tất cả các tỷ số ấy, ta có
$$
\frac{L \times QR}{QT^2}
\sim
AC \times L \times PC^2 \times CD^2.
$$

Mặt khác, khi $P$ và $Q$ trùng nhau, $2PC$ và $Gv$ bằng nhau. Vì vậy, các đại lượng $L \times QR$ và $QT^2$, tỷ lệ với những đại lượng này, cũng bằng nhau. Do đó,
$$
L \times SP^2
=
\frac{SP^2 \times QT^2}{QR}.
$$

Theo Hệ quả 1 và 5 của Proposition VI, lực hướng tâm tỷ lệ nghịch với $L \times SP^2$. Vì $L$ là hằng số, lực hướng tâm tỷ lệ nghịch với bình phương khoảng cách $SP$.

> **[Chú giải]**
>
> **Lực hướng về tiêu điểm, không phải về tâm hình học**
>
> Đây là định lý trụ cột của toàn bộ *Principia*: lực hướng về **tiêu điểm** của một elip tỷ lệ nghịch với bình phương khoảng cách. Mọi phần còn lại của Phần III chỉ là hệ quả của nó.
>
> Kết quả là $F \propto \dfrac{1}{L \cdot SP^2}$, và vì $L$ là hằng số nên $F \propto \dfrac{1}{r^2}$. Với lực nghịch đảo bậc hai $F = -\dfrac{\mu m}{r^2}$, các đại lượng của elip liên hệ với hằng số chuyển động $h = r^2\dot{\theta}$ và năng lượng riêng $\mathcal{E}$ theo $p = \dfrac{h^2}{\mu}$ và $a = \dfrac{\mu}{2|\mathcal{E}|}$, với $p = L/2$ là **bán tham số tiêu cự** (semi-latus rectum) và $a = AC$ là bán trục lớn.
>
> **Vì sao chọn $L$ làm đại lượng xuất hiện trong kết quả**
>
> Ông cần một kết quả đủ mạnh để giải thích cả ba định luật Kepler cùng lúc. Lực nghịch đảo bậc hai vừa cho quy luật diện tích đều, vừa cho quỹ đạo là conic, vừa cho $T^2 \propto a^3$. $L$ là **thang đo tự nhiên** của elip, đặt tại tiêu điểm, và là thang đo duy nhất không phụ thuộc vào điểm đang xét - nên phương trình quỹ đạo viết được dưới dạng $r = \dfrac{p}{1 + e\cos\theta}$ với mọi hằng số đều gắn với tâm thay vì với vị trí.
>
> $p = h^2/\mu$ tách bạch hai thứ quyết định quỹ đạo: **hình dạng** do moment động lượng quyết định, còn **khoảng cách** do tổng năng lượng quyết định. Vì $a = \mu/(2|\mathcal{E}|)$, một hệ không mất năng lượng sẽ bay ra xa vô hạn, và cùng một lực vẫn cho những quỹ đạo khác nhau - đó là lý do một hệ nghiêng lệch phải có năng lượng riêng khác đi mới quay được quanh sao trung tâm.

Có thể chứng minh cùng kết quả ấy theo cách khác. Lực hướng về tâm $C$ của elip, nhờ đó vật thể $P$ có thể quay trong elip, tỷ lệ với khoảng cách $CP$. Kẻ $CE$ song song với tiếp tuyến $PR$ của elip. Nếu $CE$ và $PS$ cắt nhau tại $E$, lực để vật thể $P$ quay quanh điểm bất kỳ khác $S$ sẽ tỷ lệ với $\frac{PE^3}{PT^3}$, theo Hệ quả 3 của Proposition VII.

Nếu $S$ là tiêu điểm của elip, $PE$ được cho là tỷ lệ nghịch với $SP^2$. Vì vậy, lực hướng tâm tỷ lệ nghịch với bình phương khoảng cách $SP$.

Vì tính quy trọng của bài toán này và việc sử dụng nó trong phần sau, tôi sẽ chứng minh các trường hợp còn lại bằng những lập luận riêng.

> **[Chú giải]**
>
> **Bằng chứng thứ hai là bài học về tiết kiệm bằng chứng**
>
> Thay vì dựng lại toàn bộ hình học, Newton lấy kết quả đã có ở Proposition VII cho một tâm lực bất kỳ, rồi chỉ cần dùng đẳng thức riêng của elip. Chính đẳng thức hình học đó mới là nội dung thật của bài toán: nó là chỗ mà **vị trí tiêu điểm** khác vị trí tâm hình học buộc quy luật lực phải là nghịch đảo bậc hai.
>
> Với $CE \parallel PR$ và $E = CE \cap PS$, Hệ quả 3 của Proposition VII cho lực quanh một điểm bất kỳ dưới dạng một lũy thừa bậc ba của tỷ số các đoạn thẳng dựng trên tiếp tuyến. Khi $S$ là tiêu điểm, đẳng thức $PE \propto \dfrac{1}{SP^2}$ mà Newton nêu ở đây là mắt xích quyết định: nó biến lũy thừa bậc ba ấy thành đúng nghịch đảo bình phương khoảng cách, khớp với kết quả bằng chứng đầu tiên.
>
> **Ông tự đánh dấu đây là điểm mấu chốt**
>
> Ông muốn cho thấy kết quả không phụ thuộc vào cách dựng, và ông đang tiết kiệm sứ lực cho những chứng minh còn lại. Câu cuối chương còn là một chỉ dẫn đọc được cài vào trong văn bản: ông nói trước bằng chứng nào là đắt để tái sử dụng.
>
> Cách hiện đại để đi tới cùng kết quả ngắn hơn nhiều: từ $F = -\mu m/r^2$ và định luật bảo toàn moment động lượng, phương trình chuyển động tích phân được một lần, và ra ngay $r = \dfrac{p}{1 + e\cos\theta}$. Còn cách của Newton dài hơn nhưng chứa một điều mà cách hiện đại không nói: nó cho thấy nghịch đảo bậc hai không phải là điều kiện duy nhất mà một lực phải thỏa mãn, mà là điều kiện đủ để quỹ đạo là conic.
