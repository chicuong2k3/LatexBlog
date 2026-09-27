---
title: "Sách I, Phần III. Proposition XII"
summary: "Tìm quy luật lực hướng tâm hướng về tiêu điểm của hypebol."
slug: "sach-i-phan-iii-proposition-xii"
number: 22
---

![Hypebol, hai tiêu điểm và lực hướng tâm](../assets/proposition-12-hyperbola-focus.svg)

*Hình 12. Sơ đồ được dựng lại từ hình minh họa trong bản gốc; cần đối chiếu ký hiệu với scan.*

## Proposition XII. Bài toán VII

Giả sử một vật thể chuyển động trong một hypebol. Hãy tìm quy luật của lực hướng tâm hướng về tiêu điểm của hình ấy.

Gọi $CA$, $CB$ là hai bán trục của hypebol; $PG$, $KD$ là các đường kính liên hợp khác; $PF$ là đoạn vuông góc với đường kính $KD$; và $Qv$ là ordinate theo đường kính $GP$.

Kẻ $SP$, cắt đường kính $DK$ tại $E$, và cắt ordinate $Qv$ tại $x$, rồi hoàn thành hình bình hành $QRP.r$.

Rõ ràng $EP$ bằng bán trục ngang $AC$. Để thấy điều này, kẻ $HE$ từ tiêu điểm còn lại $H$ của hypebol song song với $EC$. Vì $CS$, $CH$ bằng nhau, $ES$, $EI$ cũng bằng nhau. Vì vậy, $EP$ bằng một nửa hiệu của $PS$ và $PI$; tức là, nhờ $IH$, $PR$ song song và các góc $IPR$, $HPZ$ bằng nhau, $EP$ bằng một nửa hiệu của $PS$ và $PH$. Hiệu ấy bằng toàn bộ trục $2AC$.

Kẻ $QT$ vuông góc với $SP$, và gọi $L$ là latus rectum chính của hypebol, tức là
$$
L = \frac{2BC^2}{AC}.
$$

Ta có
$$
\frac{L \times QR}{L \times Pv}
=
\frac{QR}{Pv}
=
\frac{Px}{Pv}
=
\frac{PE}{PC}
=
\frac{AC}{PC}.
$$

Ngoài ra,
$$
\frac{L \times Pv}{Gv \times Pv}
=
\frac{L}{Gv},
$$
và, theo các tính chất của các hình cắt conic,
$$
\frac{Gv^2}{Qv^2}
=
\frac{PC^2}{CD^2}.
$$

Khi $P$ và $Q$ trùng nhau, $Qv^2$ trở thành tỷ số bằng nhau theo Hệ quả 2 của Lemma VII. Và
$$
\frac{Qv^2}{QT^2}
=
\frac{EP^2}{PF^2}
=
\frac{CA^2}{PF^2}
=
\frac{CD^2}{CB^2}.
$$

Nhân các tỷ số ấy, ta có
$$
\frac{L \times QR}{QT^2}
\sim
AC \times L \times PC^2 \times CD^2.
$$

Khi $P$ và $Q$ trùng nhau, $2PC$ và $Gv$ bằng nhau. Vì vậy, các đại lượng $L \times QR$ và $QT^2$, tỷ lệ với chúng, cũng bằng nhau. Suy ra
$$
L \times SP^2
=
\frac{SP^2 \times QT^2}{QR}.
$$

Theo Hệ quả 1 và 5 của Proposition VI, lực hướng tâm tỷ lệ nghịch với $L \times SP^2$. Vì $L$ là hằng số, lực hướng tâm tỷ lệ nghịch với bình phương khoảng cách $SP$.

> **[Chú giải]**
>
> **Elip, parabol và hypebol là ba trường hợp của cùng một lực**
>
> Proposition XII lặp lại đúng cách dựng của Proposition XI, chỉ thay elip bằng hypebol, và thu được **cùng một quy luật**: lực tỷ lệ nghịch với bình phương khoảng cách tới tiêu điểm.
>
> Lực vẫn là $F \propto \dfrac{1}{L \cdot SP^2}$ với $L = \dfrac{2BC^2}{AC}$. Khác biệt giữa ba conic nằm hoàn toàn trong **dấu của năng lượng riêng** $\mathcal{E} = \dfrac{v^2}{2} - \dfrac{\mu}{r}$: âm thì quỹ đạo khép kín là elip, bằng không thì parabol, dương thì hypebol. Cùng một hằng số $\mu$ cho cả ba, không cần thay đổi gì.
>
> **Chứng minh tính phổ quát, không chỉ một trường hợp**
>
> Nếu chỉ làm elip, người đọc có thể nghi ngờ đó là đặc tính riêng của hình elip. Việc cùng một phép dựng cho ra cùng một số mũ trên một hình khác là bằng chứng rằng nghịch đảo bậc hai thuộc về bản thân lực, không thuộc về hình dạng quỹ đạo. Newton cũng nói trước chi phí của việc này: ở cuối chương trước ông đã viết rằng sẽ chứng minh các trường hợp còn lại bằng những lập luận riêng.
>
> Cùng một phương trình $F = -\mu m/r^2$ vừa giải thích vì sao Mặt Trăng quay quanh Trái Đất, vừa giải thích vì sao một sao chổi bay tới rồi quay đi. Khác biệt giữa bị giữ và thoát không nằm ở bản chất lực, chỉ nằm ở năng lượng mà vật thể mang theo khi đến.

Có thể chứng minh cùng kết quả ấy theo cách khác. Lực hướng về tâm $C$ của hypebol tỷ lệ với khoảng cách $CP$. Nhưng từ đó, theo Hệ quả 3 của Proposition VII, lực hướng về tiêu điểm $S$ sẽ tỷ lệ với $\frac{PE^3}{PT^3}$; tức là, vì $PE$ tỷ lệ nghịch với $SP^2$, lực ấy tỷ lệ nghịch với bình phương khoảng cách $SP$.

Cũng có thể chứng minh theo cùng cách rằng nếu lực hướng tâm của vật thể biến thành lực ly tâm, vật thể sẽ chuyển động trong hypebol liên hợp.

> **[Chú giải]**
>
> **Đảo dấu lực thì quỹ đạo hypebol thành hypebol liên hợp**
>
> Câu cuối cùng nói một điều ít ai để ý. Đây không phải chi tiết kỹ thuật, mà là cách hình học tự nói lên tính chất của lực.
>
> Hypebol ở tọa độ chuẩn có phương trình $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$, và hypebol liên hợp của nó là $\dfrac{y^2}{b^2} - \dfrac{x^2}{a^2} = 1$: chỉ đổi dấu trong phương trình, tức đổi vai trò của trục chính. Với quỹ đạo Kepler $r = \dfrac{p}{1 + e\cos\theta}$, việc đổi dấu lực biến biểu thức này thành $r = \dfrac{p}{e\cos\theta - 1}$, vẫn là một conic cùng họ.
>
> **Hình học không đủ để phân biệt lực hút với lực đẩy**
>
> Ông đang xử lý câu hỏi ngược: cho quỹ đạo đã biết, lực có nhất thiết là lực hướng tâm không? Ở Hệ quả 1 của Proposition III ở chương trước, ông đã cảnh báo rằng quy luật diện tích đều không chứng minh có lực hướng tâm. Ở đây ông trả lời thẳng: nếu lực là lực ly tâm, vật thể vẫn chạy trên một conic, chỉ là conic liên hợp. Chỉ dấu của lực mới làm được.
>
> Người đọc hôm nay gặp đúng cái bẫy này trong vật lí hạt: hai tương tác khác nhau về cơ chế nhưng có cùng phương trình quỹ đạo sẽ cho ra cùng một quỹ đạo, và chỉ quan sát quỹ đạo thì không phân biệt được. Đó là lý do vật lí thực nghiệm không bao giờ dừng ở phương trình chuyển động mà luôn đi tìm lực.
