---
title: "Sách III. Lemma V–XI. Proposition XLI"
summary: "Cách dựng parabol qua các điểm, nội suy quỹ đạo sao chổi, các phép đo độ dài đuôi sao chổi và phương pháp xác định quỹ đạo từ ba quan sát."
slug: "sach-iii-lemma-v-xi-proposition-xli"
number: 66
---

![Minh họa parabol, quỹ đạo sao chổi và phép dựng từ các quan sát](../assets/book-ii-section-i-motion.svg)

*Hình 54. Sơ đồ được dùng lại từ Phần I; các sơ đồ dựng parabol, các điểm trên cung, tiếp tuyến, đường chân trời, node, đuôi sao chổi và các bảng quan sát trong Lemma V–XI và Proposition XLI cần được đối chiếu riêng với scan.*

*Nguồn scan tương ứng: khoảng trang 466–495. Proposition XLI bị OCR đọc thành “XLL” ở một số chỗ. Các con số, ký hiệu và công thức có dấu `[OCR không rõ]` phải được đối chiếu với bản scan trước khi xem là đã kiểm tra.*

## Lemma V

Tìm một đường cong thuộc loại parabol đi qua bất kỳ số điểm nào đã cho.

Hãy để các điểm ấy là $A,B,C,D,E,F,\ldots$, và từ chúng hạ xuống một đường thẳng $HN$ đã cho các đường vuông góc $AH,BI,CK,DL,EM,FN,\ldots$.

Các sai số của những đường vuông góc này được sắp xếp thành bảng

| sai số thứ nhất | sai số thứ hai | sai số thứ ba | sai số thứ tư | sai số thứ năm |
|---|---|---|---|---|
| $b$ | $c$ | $d$ | $e$ | $f$ |
| $2b$ | $2c$ | $2d$ | $2e$ |  |
| $3b$ | $3c$ | $3d$ |  |  |
| $4b$ | $4c$ |  |  |  |
| $5b$ |  |  |  |  |

### Trường hợp 1

Nếu các khoảng $HI,IK,KL,\ldots$ giữa các điểm $H,I,K,L,M,N,\ldots$ bằng nhau, hãy lấy

$$
b,2b,3b,4b,5b,\ldots
$$

là các sai số thứ nhất của các đường vuông góc $AH,BI,CK,\ldots$; lấy

$$
c,2c,3c,4c,\ldots
$$

là các sai số thứ hai; lấy

$$
d,2d,3d,\ldots
$$

là các sai số thứ ba; và cứ tiếp tục như vậy. Nghĩa là

$$
AH-BI=b,
$$

$$
BI-CK=2b,
$$

$$
CK-DL=3b,
$$

$$
DL-EM=4b,
$$

$$
EM-FN=5b,
$$

và những sai số tiếp theo là $c,2c,\ldots$, $d,2d,\ldots$, cho đến sai số cuối cùng, ở đây là

$$
[OCR\ không\ rõ].
$$

Bây giờ hãy dựng một đường vuông góc bất kỳ $RS$, có thể xem là một tung độ của đường cong cần tìm. Để tìm độ dài của tung độ này, giả sử các khoảng $HI,IK,KL,LM,\ldots$ là các đơn vị, và đặt

$$
AH=a.
$$

Khoảng cách từ $S$ về phía $A$ là $p$, $S$ đến $I$ là $q$, $S$ đến $K$ là $r$, $S$ đến $L$ là $s$, $S$ đến $M$ là $t$, và cứ tiếp tục đến $ME$, tức đường vuông góc cuối cùng trước đường vuông góc cuối cùng. Đặt dấu âm trước các số hạng nằm từ $S$ về phía $A$, như $HS,IS,\ldots$, và dấu cộng trước các số hạm nằm ở phía bên kia $S$, như $SK,SL,\ldots$. Khi chú ý đúng các dấu ấy, ta có

$$
RS=a+bp+cq+dr+es+ft+\cdots.
$$

### Trường hợp 2

Nhưng nếu các khoảng $HI,IK,\ldots$ giữa $H,I,K,L,\ldots$ không bằng nhau, hãy lấy

$$
b,2b,3b,4b,5b,\ldots
$$

là các sai số thứ nhất của các đường vuông góc $AH,BI,CK,\ldots$, chia cho các khoảng giữa những đường vuông góc ấy; lấy

$$
c,2c,3c,4c,\ldots
$$

là các sai số thứ hai, chia cho các khoảng giữa mỗi hai đường; lấy

$$
d,2d,3d,\ldots
$$

là các sai số thứ ba, chia cho các khoảng giữa mỗi ba đường; lấy

$$
e,2e,\ldots
$$

là các sai số thứ tư, chia cho các khoảng giữa mỗi bốn đường; và cứ tiếp tục như vậy.

Nghĩa là, ta chọn $b,2b,3b,4b,\ldots$ sao cho

$$
b=\frac{AH-BI}{[OCR\ không\ rõ]},
$$

$$
2b=\frac{BI-CK}{[OCR\ không\ rõ]},
$$

$$
3b=\frac{CK-DL}{[OCR\ không\ rõ]},
$$

rồi chọn $c,2c,3c,\ldots$ sao cho

$$
c=\frac{[OCR\ không\ rõ]}{[OCR\ không\ rõ]},
$$

và tiếp tục theo cùng cách. Sau khi tìm được những sai số ấy, đặt

$$
AH=a,
$$

$$
HS=p,
$$

$$
p\text{ nhân với }[OCR\ không\ rõ]=q,
$$

$$
q\text{ nhân với }[OCR\ không\ rõ]+SK=r,
$$

và cứ tiếp tục đến $ME$. Khi đó

$$
RS=a+bp+cq+dr+es+ft+\cdots.
$$

### Hệ quả

Từ đây, ta có thể tìm gần đúng diện tích của mọi đường cong. Nếu đã biết một số điểm của đường cong cần lấy vuông, và giả sử vẽ một parabol đi qua những điểm ấy, thì diện tích của parabol sẽ gần bằng diện tích của hình giới hạn đường cong được đề xuất để lấy vuông. Nhưng parabol luôn có thể được lấy vuông bằng hình học, theo những phương pháp thông thường.

## Lemma VI

Đã cho một số vị trí quan sát được của sao chổi, tìm vị trí của nó tại một thời điểm bất kỳ nằm giữa các thời điểm ấy.

Trong hình trước, hãy để $HI,IK,KL,LM$ biểu thị các khoảng thời gian giữa những lần quan sát; $HA,IB,KC,LD,ME$ là năm kinh độ quan sát được của sao chổi; và $HS$ là thời gian đã cho từ lần quan sát đầu tiên đến kinh độ cần tìm.

Nếu giả sử một đường cong đều $ABODE$ được vẽ qua các điểm $A,B,C,D,E$, và tìm được tung độ $RS$ bằng Lemma trước, thì $RS$ sẽ là kinh độ cần tìm.

Theo cùng phương pháp, từ năm vĩ độ quan sát được, ta có thể tìm vĩ độ của sao chổi tại một thời điểm đã cho.

Nếu các hiệu số giữa những kinh độ quan sát được nhỏ, chẳng hạn $4$ hoặc $5$ độ, thì ba hoặc bốn lần quan sát sẽ đủ để tìm một kinh độ và vĩ độ mới. Nhưng nếu các hiệu số lớn hơn, chẳng hạn $10$ hoặc $20$ độ, phải dùng năm lần quan sát.

> **[Chú giải]**
>
> **Ba điểm đủ dựng quỹ đạo, nhưng độ chính xác thì phụ thuộc khoảng cách giữa các quan sát**
>
> Lemma VI giải một bài toán mà ta vẫn tưởng là hiển nhiên: đã biết vị trí của sao chổi ở năm thời điểm quan sát, làm sao biết nó ở một thời điểm bất kỳ ở giữa? Thời đó chưa ai làm được, và đây là bước chân đầu tiên của mọi lời dự đoán nghiêm túc về một sao chổi.
>
> Ông vẽ một đường cong đều đi qua năm điểm quan sát, rồi lấy vuông diện tích dưới nó bằng Lemma trước; thế là ra kinh độ cần tìm. Ông còn nói rõ lý do thực hành: nếu các kinh độ quan sát cách nhau nhỏ, chẳng hạn bốn hay năm độ, thì ba hoặc bốn lần quan sát là đủ; nhưng nếu cách xa hơn, chẳng hạn mười hay hai mươi độ, thì phải dùng đủ năm.
>
> Ông biết độ chính xác giảm rất nhanh khi cung quan sát ngắn lại. Càng chỉ quan sát trong một khoảng ngắn, càng dễ nhầm "nó đang đi thế này" với "tôi vừa tình cờ thấy". Ông nói thẳng con số phải dùng, tức là đang viết cho người thực hành chứ không phải cho lý thuyết. Và ông ghép vào đây một cách dựng để tạo ra quan sát mới khi dữ kiện chưa đủ, tức là ông chấp nhận nội suy từ dữ liệu thay vì ngồi chờ.
>
> Bài toán ấy ngày nay gọi là nội suy quỹ đạo, và nó vẫn là mắt xích đầu tiên của mọi lời dự đoán. Khác ở chỗ ta không nội suy trên một đường cong tự dựng, mà tích phương trình chuyển động thật rồi so với hàng trăm quan sát bằng bình phương ít nhất. Nhưng lời khuyên của ông vẫn đúng nguyên vẹn: cung quan sát càng ngắn, quỹ đạo càng không xác định, và đó là lý do người ta phải chờ sao chổi đi lâu hơn trước khi loan tin. Khi Halley dùng phép tính thuộc loại này để tiên đoán sao chổi của mình sẽ trở lại, ông đã biết mình đang đánh cược vào đúng độ chính xác ấy.

## Lemma VII

Qua một điểm $P$ đã cho, kẻ một đường thẳng $BC$ sao cho các phần $PB,PC$, bị hai đường thẳng $AB,AC$ đã cho cắt ra, tỷ lệ với nhau theo một tỷ lệ đã cho.

Từ điểm $P$ đã cho, hãy kẻ bất kỳ đường thẳng $PD$ nào tới một trong hai đường thẳng đã cho, ví dụ $AB$, rồi kéo dài nó về phía $AC$, đường thẳng đã cho còn lại, tới $E$, sao cho

$$
PE:PD
$$

bằng tỷ lệ đã cho. Hãy kẻ $EC$ song song với $AD$, rồi kẻ $CPB$. Khi ấy

$$
PC:PB=PE:PD.
$$

$\square$

## Lemma VIII

Hãy để $ABC$ là một parabol, có tiêu điểm tại $S$. Dây cung $AC$ bị chia đôi tại $I$ và cắt ra đoạn $ABCI$, có đường kính $Ip$ và đỉnh $p$.

Trên $Ip$ kéo dài, lấy $pO$ bằng một nửa $Ip$. Nối $OS$ và kéo dài nó tới $G$ sao cho

$$
SG=2SO.
$$

Bây giờ giả sử một sao chổi quay trên cung $CBA$. Kẻ $GB$, cắt $AC$ tại $E$. Tôi nói rằng điểm $E$ sẽ cắt ra từ dây cung $AC$ một đoạn $AE$ gần như tỷ lệ với thời gian.

Để chứng minh, hãy nối $EO$, cắt cung parabol $ABC$ tại $Y$, rồi kẻ $pX$ tiếp xúc với cung ấy tại đỉnh $p$ và cắt $EO$ tại $X$. Diện tích cong $AEXpA$ sẽ tỷ lệ với diện tích cong $ACYpA$ như $AE:AC$. Vì tam giác $ASE$ tỷ lệ với tam giác $ASC$ theo cùng tỷ lệ, toàn bộ diện tích $ASEXpA$ sẽ tỷ lệ với toàn bộ diện tích $ASCYpA$ như

$$
AE:AC.
$$

Nhưng vì $GO:SO=3:1$, và $EG:XC$ cũng theo cùng tỷ lệ ấy, nên $SX$ song song với $EB$. Vì vậy, nếu nối $BX$, tam giác $SEB$ sẽ bằng tam giác $XEB$. Do đó, nếu cộng tam giác $EXB$ vào diện tích $ASEXpA$ rồi trừ tam giác $SEB$, ta còn diện tích $ASBXpA$, bằng diện tích $ASEXpA$, và do đó tỷ lệ với diện tích $ASCYpA$ như $AE:AC$.

Nhưng diện tích $ASBYpA$ gần bằng diện tích $ASBXpA$, và diện tích này tỷ lệ với diện tích $ASCYpA$ như thời gian mô tả cung $AB$ với thời gian mô tả toàn bộ cung $AC$. Vì vậy, $AE:AC$ gần như tỷ lệ với các khoảng thời gian ấy. $\square$

### Hệ quả

Khi điểm $B$ rơi vào đỉnh $p$ của parabol, $AE:AC$ chính xác tỷ lệ với các khoảng thời gian.

### Học luận

Nếu ta nối $pG$, cắt $AC$ tại $d$, và trên đó lấy $Gn$ tỷ lệ với $pB$ như $27M:16M$, rồi kẻ $Bn$, đường $Bn$ sẽ cắt dây cung $AC$ theo tỷ lệ thời gian chính xác hơn trước. Nhưng điểm $n$ phải được lấy ở phía bên kia $G$, hoặc ở chính phía ấy, tùy theo điểm $B$ cách đỉnh chính của parabol nhiều hơn hay ít hơn điểm $p$.

## Lemma IX

Các đường thẳng $AI^2$ và $IM$, cùng độ dài $SM$, bằng nhau.

Vì $4SM$ là *latus rectum* của parabol thuộc về đỉnh $p$.

*[Ký hiệu $AI^2$ và một số nhãn điểm trong nguồn OCR không rõ; cần đối chiếu hình.]*

## Lemma X

Kéo dài $Su$ tới $N$ và $P$ sao cho

$$
SN=\frac13[OCR\ không\ rõ],
$$

và

$$
SP:SN=SN:S[OCR\ không\ rõ].
$$

Trong thời gian một sao chổi sẽ mô tả cung $ABC$, nếu giả sử nó luôn tiến về phía trước với vận tốc mà nó có ở độ cao bằng $SP$, nó sẽ vạch một độ dài bằng dây cung $AC$.

Để chứng minh, giả sử trong thời gian ấy sao chổi có vận tốc như ở đỉnh $p$ được giả sử chuyển động đều về phía trước trên đường thẳng tiếp xúc với parabol tại $p$. Diện tích mà nó sẽ mô tả bằng bán kính kẻ tới điểm $S$ sẽ bằng diện tích parabol $ASCpA$. Vì vậy, không gian nằm dưới độ dài được mô tả trên tiếp tuyến và độ dài $Sp$ sẽ tỷ lệ với không gian nằm dưới các độ dài $AC$ và $SM$ như diện tích $ASCpA$ so với tam giác $ASO$, tức là

$$
SN:SM.
$$

Do đó, $AC$ tỷ lệ với độ dài được mô tả trên tiếp tuyến là

$$
[OCR\ không\ rõ]:SN.
$$

Nhưng vì vận tốc của sao chổi ở độ cao $SP$, theo Hệ quả 6, Proposition XVI, Sách I, tỷ lệ với vận tốc của nó ở độ cao $S[OCR\ không\ rõ]$ theo tỷ lệ nghịch với căn bậc hai của $SP$ và $S[OCR\ không\ rõ]$, tức là theo tỷ lệ

$$
[OCR\ không\ rõ]:SN,
$$

độ dài được mô tả với vận tốc này sẽ tỷ lệ với độ dài được mô tả trong cùng thời gian trên tiếp tuyến là

$$
Su:SN.
$$

Vì vậy, vì $AC$ và độ dài được mô tả với vận tốc mới này tỷ lệ với độ dài được mô tả trên tiếp tuyến theo cùng một tỷ lệ, chúng phải bằng nhau. $\square$

### Hệ quả

Vì vậy, một sao chổi có vận tốc mà nó có ở độ cao

$$
[OCR\ không\ rõ]
$$

sẽ trong cùng thời gian ấy vạch gần bằng dây cung $AC$.

## Lemma XI

Nếu một sao chổi hoàn toàn không chuyển động được thả rơi từ độ cao $SN$, hoặc

$$
[OCR\ không\ rõ],
$$

về phía Mặt Trời, và vẫn bị thúc về phía Mặt Trời bởi cùng lực ấy, lực được duy trì đều như lúc đầu, thì trong một nửa thời gian mà nó có thể mô tả cung $AC$ trên quỹ đạo riêng, nó sẽ vạch trong lúc rơi một không gian bằng

$$
[OCR\ không\ rõ].
$$

Để chứng minh, trong thời gian mà sao chổi cần để mô tả cung parabol $AC$, theo Lemma trước, nó sẽ với vận tốc có ở độ cao $SP$ vạch dây cung $AC$. Vì vậy, theo Hệ quả 7, Proposition XVI, Sách I, nếu trong cùng thời gian ấy nó quay quanh Mặt Trời bằng lực trọng lực riêng trong một đường tròn bán kính $SP$, nó sẽ mô tả một cung dài bằng dây cung của cung parabol $AC$ theo tỷ lệ căn bậc hai của

$$
1:2.
$$

Vì vậy, nếu với trọng lực mà nó có hướng về Mặt Trời ở độ cao $SP$, nó rơi từ độ cao ấy về phía Mặt Trời, theo Hệ quả 9, Proposition XVI, Sách I, trong một nửa thời gian đã nói nó sẽ mô tả một không gian bằng bình phương nửa dây cung ấy chia cho bốn lần độ cao $SP$, tức là

$$
[OCR\ không\ rõ].
$$

Nhưng vì trọng lực của sao chổi hướng về Mặt Trời ở độ cao $SN$ tỷ lệ với trọng lực của nó hướng về Mặt Trời ở độ cao $SP$ là

$$
SP:S[OCR\ không\ rõ],
$$

nên sao chổi, với trọng lực mà nó có ở độ cao $SN$, khi rơi từ độ cao ấy về phía Mặt Trời, sẽ mô tả trong cùng thời gian một không gian bằng

$$
[OCR\ không\ rõ].
$$

Đó là một không gian bằng độ dài $IM$ hoặc

$$
[OCR\ không\ rõ].
$$

$\square$

## Proposition XLI. Bài toán XXI

Từ ba quan sát đã cho, xác định quỹ đạo của một sao chổi chuyển động trên một parabol.

Đây là một bài toán rất khó. Tôi đã thử nhiều phương pháp để giải nó; vài bài toán trong Sách I cũng dẫn đến mục đích ấy. Sau đó tôi tìm ra lời giải sau đây, đơn giản hơn.

Hãy chọn ba quan sát cách nhau những khoảng thời gian gần bằng nhau, nhưng hãy để khoảng thời gian mà sao chổi chuyển động chậm hơn dài hơn một chút; sao cho hiệu số của các thời gian tỷ lệ với tổng của chúng là

$$
\frac{\text{hiệu số của các thời gian}}{\text{tổng của các thời gian}}
=
\frac{\text{tổng của các thời gian}}{[OCR\ không\ rõ]\text{ ngày}},
$$

hoặc để điểm $E$ gần như rơi vào $M$, và sai lệch của nó về phía $I$ nhiều hơn về phía $A$. Nếu không có những quan sát trực tiếp như vậy, phải tìm một vị trí mới của sao chổi bằng Lemma VI.

Hãy để $S$ là Mặt Trời; $T,t,r$ là ba vị trí của Trái Đất trên *orbis magnus*; $TA,tB,rC$ là ba kinh độ quan sát được của sao chổi; $V$ là thời gian giữa lần quan sát thứ nhất và thứ hai; $W$ là thời gian giữa lần quan sát thứ hai và thứ ba; $X$ là độ dài mà trong toàn bộ thời gian $V+W$, sao chổi có thể vạch với vận tốc của nó ở khoảng cách trung bình của Trái Đất từ Mặt Trời. Độ dài này phải được tìm theo Hệ quả 3, Proposition XL, Sách III. Hãy kẻ $tV$ vuông góc với dây cung $Tt$.

Trong kinh độ quan sát trung bình $tB$, tùy ý lấy điểm $B$ làm vị trí của sao chổi trong mặt phẳng hoàng đạo. Từ đó, kẻ về phía Mặt Trời $S$ đường thẳng $BE$ sao cho nó tỷ lệ với đường vuông góc $tV$ như tích trong $SB$ và $St^2$ chia cho lập phương cạnh huyền của tam giác vuông có các cạnh $SB$ và tiếp tuyến của vĩ độ sao chổi trong lần quan sát thứ hai so với bán kính $tB$.

Qua điểm $E$, theo Lemma VII, kẻ đường thẳng $AEC$, sao cho các phần $AE$ và $EC$, kết thúc tại các đường thẳng $TA$ và $rC$, tỷ lệ theo các thời gian $V$ và $W$. Khi ấy, nếu $B$ là vị trí đúng của sao chổi trong lần quan sát thứ hai, $A$ và $C$ gần như là các vị trí của sao chổi trong mặt phẳng hoàng đạo tại các lần quan sát thứ nhất và thứ ba.

Trên $AC$, chia đôi tại $I$, rồi dựng đường vuông góc $Ii$. Qua $B$, kẻ đường $Bi$ song song với $AC$. Nối đường $Si$, cắt $AC$ tại $A$ [OCR không rõ], rồi hoàn thành hình bình hành $[OCR\ không\ rõ]$. Lấy $o$ bằng $3IA$. Qua Mặt Trời $S$, kẻ đường $[OCR\ không\ rõ]$ bằng

$$
[OCR\ không\ rõ].
$$

Từ điểm $B$ về phía điểm $[OCR\ không\ rõ]$, kẻ đường thẳng $BE$ mới, tỷ lệ với đường $BE$ cũ theo tỷ lệ bậc hai của khoảng cách $BS$ với lượng

$$
[OCR\ không\ rõ].
$$

Qua $E$, kẻ lại đường thẳng $AEC$ theo cùng quy tắc; tức là các phần $AE$ và $EC$ phải tỷ lệ với các thời gian $V$ và $W$ giữa các lần quan sát. Khi ấy $A$ và $C$ là các vị trí của sao chổi chính xác hơn.

Trên $AC$, chia đôi tại $I$, dựng các đường vuông góc $AM,CN,IO$, trong đó $AM$ và $CN$ là các tiếp tuyến của các vĩ độ trong lần quan sát thứ nhất và thứ ba so với các bán kính $TA$ và $TC$. Nối $MN$, cắt $IO$ tại $O$. Dựng hình bình hành vuông $[OCR\ không\ rõ]$ như trước. Trên $IA$ kéo dài, lấy $ID$ bằng

$$
[OCR\ không\ rõ].
$$

Trên $MN$, về phía $N$, lấy $MP$ tỷ lệ với độ dài $X$ đã tìm ở trên theo tỷ lệ căn bậc hai của khoảng cách trung bình Trái Đất từ Mặt Trời, tức bán kính của *orbis magnus*, với khoảng cách $OD$.

Nếu điểm $P$ rơi vào điểm $N$, thì $A,B,C$ là ba vị trí của sao chổi, qua đó phải dựng quỹ đạo của nó trong mặt phẳng hoàng đạo. Nhưng nếu $P$ không rơi vào $N$, trên đường thẳng $AC$ lấy $CG=NP$, sao cho $G$ và $P$ nằm cùng phía của đường thẳng $NC$.

Bằng cùng phương pháp đã tìm $E,A,C,G$ từ điểm giả thiết $B$, hãy chọn hai điểm giả thiết khác, $b$ và $\beta$, rồi tìm các điểm mới $e,a,c,g$ và $e,a,[OCR không rõ],y$. Qua $G,g,y$, kẻ đường tròn $Ggy$, cắt đường thẳng $rC$ tại $Z$. Khi ấy $Z$ là một vị trí của sao chổi trong mặt phẳng hoàng đạo.

Trên $AC,ac,[OCR không rõ]$, lấy lần lượt

$$
AF=CG,\qquad af=eg,\qquad [OCR\ không\ rõ].
$$

Qua $P,f,[OCR không rõ]$, kẻ đường tròn cắt đường thẳng $AT$ tại $X$. Khi ấy $X$ là một vị trí khác của sao chổi trong mặt phẳng hoàng đạo. Tại $X$ và $Z$, dựng các tiếp tuyến của vĩ độ sao chổi so với các bán kính $TX$ và $rZ$. Khi ấy, hai vị trí của sao chổi trên quỹ đạo riêng đã được xác định.

Cuối cùng, theo Proposition XIX, Sách I, dựng một parabol đi qua hai vị trí ấy, có tiêu điểm $S$. Parabol này sẽ là quỹ đạo của sao chổi. $\square$

Lời chứng minh phép dựng này làm từ các Lemma trước, vì đường thẳng $AC$ bị cắt tại $E$ theo tỷ lệ thời gian, theo Lemma VII, đúng như nó phải có theo Lemma VIII; và $BE$, theo Lemma X, là một phần của đường thẳng $BS$ hoặc $[OCR không rõ]$ trong mặt phẳng hoàng đạo, bị chặn giữa cung $ABC$ và dây cung $AEC$. $MP$, theo Hệ quả của Lemma X, là độ dài dây cung của cung ấy, tức độ dài mà sao chổi phải mô tả trên quỹ đạo thật giữa lần quan sát thứ nhất và thứ ba, và do đó bằng $MN$, nếu $B$ là vị trí thật của sao chổi trong mặt phẳng hoàng đạo.

Thật ra, có thể thuận tiện hơn nếu chọn $B,b,\beta$ không hoàn toàn ngẫu nhiên mà gần với đúng. Nếu góc $[OCR không rõ]$ mà hình chiếu của quỹ đạo trong mặt phẳng hoàng đạo cắt đường thẳng $[OCR không rõ]$ được biết đại khái, hãy dựng đường thẳng $AC$ với góc ấy tại $B[OCR không rõ]$, sao cho nó tỷ lệ với $TT$ theo tỷ lệ căn bậc hai của $SQ$ và $S[OCR không rõ]$. Sau đó kẻ đường thẳng $SEB$ sao cho phần $EB$ của nó bằng độ dài $[OCR không rõ]$; khi ấy $B$ được xác định và dùng cho lần đầu.

Sau đó hủy đường thẳng $AC$, dựng lại $AC$ theo phép dựng trước, đồng thời tìm độ dài $MP$. Trên $tB$, lấy điểm $b$ theo quy tắc: nếu $TA$ và $rC$ cắt nhau tại $Y$, thì khoảng cách $Yb$ phải tỷ lệ với khoảng cách $YB$ theo tỷ lệ tạo thành từ tỷ lệ $MP:MN$ và tỷ lệ căn bậc hai của $SB$ với $Sb$. Có thể tìm điểm thứ ba $\beta$ theo cùng phương pháp, nếu lặp lại phép tính lần thứ ba. Nhưng nếu làm như vậy, thường chỉ cần hai phép tính. Khi khoảng cách $Bb$ rất nhỏ, sau khi tìm được $F,f$ và $G,g$, hãy kẻ $Ff$ và $Gg$; chúng sẽ cắt $TA$ và $rC$ tại các điểm cần tìm là $X$ và $Z$.

> **[Chú giải]**
>
> **Dựng quỹ đạo sao chổi từ ba vị trí quan sát**
>
> Proposition XLI là câu hỏi mang tính thực hành nhất của cả sách: nếu chỉ có **ba** vị trí quan sát được của một sao chổi, liệu có thể dựng được quỹ đạo của nó không? Newton nói thẳng đây là bài toán rất khó, ông đã thử nhiều phương pháp và vài bài toán trong Sách I cũng dẫn tới cùng mục đích, trước khi tìm ra lời giải đơn giản hơn dưới đây.
>
> Có ba vị trí của Trái Đất trên *orbis magnus* và ba kinh độ quan sát được của sao chổi ở ba thời điểm. Từ đó ông dựng một hàng loạt cấu trúc hình học: điểm giả thiết, đường chia theo tỷ lệ thời gian dùng Lemma VII, hai tiếp tuyến tại các quan sát ngoài, rồi lấy điểm giao để có thêm hai vị trí nữa của sao chổi. Cuối cùng ông dựng một parabol đi qua hai điểm ấy với tiêu điểm là Mặt Trời, và parabol đó là quỹ đạo cần tìm.
>
> Ở thế kỷ XVII người ta không có máy tính, nên "giải" một bài toán hình học nghĩa là **dựng được** nó bằng thước và compa theo một trình tự xác định. Ông còn thêm một chi tiết rất thực dụng: thay vì chọn điểm giả thiết bừa, nên chọn gần đúng, rồi dùng đường tròn đi qua kết quả của ba lần dựng để chốt vị trí, và thường chỉ cần hai lần tính là đủ. Đó là hình thức thời đó của việc lặp lại cho tới khi kết quả hội tụ.
>
> Đây là nguồn gốc của cả ngành tính quỹ đạo. Nhờ có nó, quỹ đạo một sao chổi trở thành thứ có thể tính trước, rồi dùng để tiên đoán nó quay lại - điều mà Halley đã làm với chính sao chổi của mình, một trong những dự đoán nổi tiếng nhất trong lịch sử thiên văn. Phép dựng này ngày nay không còn dùng, nhưng nguyên lý thì nguyên vẹn: ba quan sát là mức tối thiểu lý thuyết để chốt một quỹ đạo, và mọi bản hiện đại cũng cần ít nhất ba điểm đó rồi mới thêm dữ liệu để tinh chỉnh. Chương này còn áp đúng phép tính ấy vào sao chổi năm 1680, từ các quan sát của Flamsted và các hiệu chỉnh của Halley.

### Ví dụ

Hãy lấy sao chổi năm $1680$ làm ví dụ. Bảng sau cho thấy chuyển động của nó, như Flamsted quan sát, như ông tính toán sau đó từ các quan sát của mình, và như bác sĩ Halley đã sửa từ chính những quan sát ấy.

| Thời gian | Kinh độ Mặt Trời | Kinh độ biểu kiến của sao chổi | Kinh độ thật | Vĩ độ Bắc |
|---|---:|---:|---:|---:|
| 1680, tháng 12, ngày 12, $4^h46^m$ | $4.46.0$ | $21.51.23$ | $6.32.30$ | $8.28.0$ |
| ngày 21, $6^h32^m$ | $6.32$ | $11.06.44$ | $6.36.59$ | $11.06.44$ |
| ngày 24, $5.08.12$ | $5.08.12$ | $21.42.13$ | $14.09.26$ | $18.49.23$ |
| ngày 25, $25.23.5$ | $5.20.44$ | $25.23.5$ | $16.09.22$ | $28.24.13$ |
| ngày 26, $5.14$ | $5.20.44$ | $27.00.52$ | $19.19.43$ | $28.09.58$ |
| ngày 29, $7.55$ | $8.03.02$ | $28.09.58$ | $20.21.09$ | $17.38.20$ |
| ngày 30, $8.02$ | $8.10.26$ | $28.11.53$ | $17.38.20$ | $28.11.53$ |
| 1681, tháng 1, ngày 5, $5.51$ | $6.01.38$ | $26.22.18$ | $[OCR\ không\ rõ]$ | $8.48.53$ |
| ngày 9, $5.54$ | $6.06.10$ | $1.27.43$ | $20.40.50$ | $23.43.52$ |
| ngày 10, $5.54$ | $6.06.10$ | $20.40.50$ | $23.43.52$ | $7.08.55$ |
| ngày 13, $6.56$ | $7.08.55$ | $25.59.48$ | $22.17.28$ | $25.59.48$ |
| ngày 25, $7.44$ | $7.58.42$ | $16.45.36$ | $9.35.0$ | $17.56.30$ |
| ngày 30, $8.07$ | $8.21.53$ | $21.49.58$ | $13.19.51$ | $16.42.18$ |
| tháng 2, ngày 2, $6.20$ | $6.34.51$ | $24.46.59$ | $15.13.53$ | $16.04.1$ |

*[Bảng OCR bị hỏng ở nhiều tiêu đề và số; cần đối chiếu trực tiếp với scan trước khi dùng làm dữ liệu.*

### Những quan sát bổ sung

Ta có thể thêm vào đó những quan sát của tôi.

| Thời gian | Kinh độ sao chổi | Vĩ độ Bắc |
|---|---:|---:|
| 1681, tháng 2, ngày 25, $8^h30^m$ | $26^\circ18'35''$ | $12^\circ46'46''$ |
| ngày 27, $8^h15^m$ | $27^\circ04'30''$ | $12^\circ36'12''$ |
| tháng 3, ngày 1, $11^h00^m$ | $27^\circ52'42''$ | $12^\circ23'40''$ |
| ngày 2, $8^h00^m$ | $28^\circ12'48''$ | $12^\circ19'38''$ |
| ngày 5, $11^h30^m$ | $29^\circ18'00''$ | $12^\circ03'16''$ |
| ngày 7, $9^h30^m$ | $0^\circ04'00''$ | $11^\circ57'00''$ |
| ngày 9, $8^h30^m$ | $0^\circ43'4''$ | $11^\circ45'52''$ |

Những quan sát này được thực hiện bằng một kính viễn dài $7$ feet, có micrometer và các sợi chỉ đặt ở tiêu điểm của kính. Bằng dụng cụ ấy, ta xác định được vị trí của các sao cố định đối với nhau, cũng như vị trí của sao chổi đối với các sao cố định.

Hãy để $A$ là ngôi sao cấp bốn ở gót chân trái của chòm sao Perseus, tức sao Bayer $\pi$; $B$ là ngôi sao kế tiếp cấp ba ở bàn chân trái, tức sao Bayer $\rho$; $C$ là ngôi sao cấp sáu ở gót bàn chân ấy, tức sao Bayer $\eta$; và $D,E,F,G,H,I,K,L,M,N,O,Z,a,\beta,\gamma,S$ là những ngôi sao nhỏ hơn ở cùng bàn chân ấy. Hãy để $p,P,Q,R,S,T,V,X$ là các vị trí của sao chổi trong những quan sát đã ghi trên.

Nếu lấy khoảng cách $AB$ là $80\frac34$ phần, thì

$$
AC=52\frac12,\quad BC=58\frac56,\quad AD=57\frac34,\quad BD=52\frac23,\quad CD=23\frac56,
$$

$$
AE=29\frac12,\quad CE=57\frac12,\quad DE=49\frac34,
$$

$$
AI=27\frac34,\quad BI=52\frac12,\quad OF=36\frac14,\quad DI=53\frac78,
$$

$$
AK=38\frac12,\quad BK=43,\quad OK=31\frac58,\quad FK=29,
$$

$$
FB=23,\quad FC=36\frac12,\quad AH=18\frac12,\quad DH=50,
$$

$$
BN=46\frac14,\quad ON=31\frac12,\quad BL=45\frac14,\quad NL=31.
$$

Các số ở trên vẫn cần đối chiếu với scan. Đường thẳng $HO$ tỷ lệ với $HI$ là $7:6$, kéo dài nó sẽ đi qua giữa các sao $D,E$, sao cho khoảng cách từ sao $D$ đến đường thẳng này là $\frac12 CD$. $LM:LN=2:9$, kéo dài nó sẽ đi qua sao $H$. Như vậy, các vị trí của các sao cố định đã được xác định đối với nhau.

Sau đó, ông Pound đã quan sát lần thứ hai các vị trí ấy và thu thập kinh độ, vĩ độ theo bảng sau.

| Sao | Kinh độ | Vĩ độ Bắc | Sao | Kinh độ | Vĩ độ Bắc |
|---|---:|---:|---|---:|---:|
| $A$ | $26.41.50$ | $12.8.36$ | $L$ | $29.33.34$ | $12.7.48$ |
| $B$ | $28.40.23$ | $11.17.54$ | $M$ | $29.18.54$ | $12.7.20$ |
| $C$ | $27.58.30$ | $12.40.25$ | $N$ | $28.48.29$ | $12.31.9$ |
| $E$ | $26.27.17$ | $12.52.7$ | $Z$ | $29.44.48$ | $11.57.13$ |
| $F$ | $28.28.37$ | $11.52.22$ | $a$ | $29.52.3$ | $11.55.48$ |
| $G$ | $26.56.8$ | $12.4.58$ | $\eta$ | $0.8.23$ | $11.48.56$ |
| $H$ | $27.11.45$ | $12.2.1$ | $\gamma$ | $0.40.10$ | $11.55.18$ |
| $I$ | $27.25.2$ | $11.53.11$ | $\iota$ | $3.20$ | $11.30.42$ |
| $K$ | $27.42.7$ | $11.53.26$ |  |  |  |

Các vị trí của sao chổi đối với những sao cố định này được quan sát như sau.

Thứ Sáu, ngày $25$ tháng Hai, lịch cũ, lúc $8\frac12$ giờ tối, khoảng cách của sao chổi ở $p$ với sao $E$ nhỏ hơn $\frac34AE$ và lớn hơn $\frac12AE$, vì vậy gần bằng $\frac58AE$; góc $ApE$ hơi tù, nhưng gần vuông. Nếu hạ từ $A$ một đường vuông góc xuống $pE$, khoảng cách của sao chổi với đường vuông góc ấy là $\frac12PE$.

Cùng đêm đó, lúc $9\frac12$ giờ, khoảng cách của sao chổi ở $P$ với sao $E$ lớn hơn $\frac12AE$ và nhỏ hơn $\frac23AE$, vì vậy gần bằng $\frac12AE$ hoặc $\frac59AE$. Nhưng khoảng cách của sao chổi với đường vuông góc hạ từ sao $A$ xuống đường thẳng $PE$ là $\frac12PE$.

Chủ Nhật, ngày $27$ tháng Hai, lúc $8\frac12$ giờ tối, khoảng cách của sao chổi ở $Q$ với sao $O$ bằng khoảng cách giữa hai sao $O,H$; đường thẳng $QO$ kéo dài đi giữa các sao $K,B$. Vì có mây che giữa, tôi không thể xác định vị trí của sao chính xác hơn.

Thứ Ba, ngày $1$ tháng Ba, lúc $11$ giờ tối, sao chổi ở $R$ nằm chính xác trên một đường thẳng giữa hai sao $K,C$; phần $CR$ của đường thẳng $CRK$ lớn hơn $\frac12CK$ một chút và nhỏ hơn $CK+\frac12CR$, nên bằng

$$
\frac12CK+\frac12CR
$$

hoặc $[OCR\ không\ rõ]$.

Thứ Tư, ngày $2$ tháng Ba, lúc $8\frac12$ giờ tối, khoảng cách của sao chổi ở $S$ với sao $C$ gần bằng $\frac12FC$; khoảng cách từ sao $F$ đến đường thẳng $OS$ kéo dài là $\frac14FC$; khoảng cách từ sao $B$ đến cùng đường thẳng gấp năm lần khoảng cách từ sao $F$; và đường thẳng $NS$ kéo dài đi giữa các sao $H,I$, gần sao $H$ hơn sao $I$ năm hoặc sáu lần.

Thứ Bảy, ngày $5$ tháng Ba, lúc $11\frac12$ giờ tối, khi sao chổi ở $T$, đường thẳng $MT$ bằng $\frac34ML$, và đường thẳng $LT$ kéo dài đi giữa $B,F$, gần $F$ hơn $B$ bốn hoặc năm lần, cắt từ $BF$ về phía $F$ một phần năm hoặc một phần sáu. Đường thẳng $MT$ kéo dài đi ở bên ngoài khoảng không gian $BF$ về phía sao $B$, gần $B$ hơn $F$ bốn lần. $M$ là một ngôi sao rất nhỏ, gần như không thể nhìn thấy bằng kính viễn, còn $L$ lớn hơn, ở khoảng cấp tám.

Thứ Hai, ngày $7$ tháng Ba, lúc $9\frac12$ giờ tối, khi sao chổi ở $V$, đường thẳng $Va$ kéo dài đi giữa $B,F$, cắt từ $BF$ về phía $F$ một phần tư, và tỷ lệ với đường thẳng $Y\beta$ là $5:4$. Khoảng cách của sao chổi với đường thẳng $a\beta$ là $\frac12V\beta$.

Thứ Tư, ngày $9$ tháng Ba, lúc $8\frac12$ giờ tối, khi sao chổi ở $X$, đường thẳng $yX$ bằng $\frac12yd$, và đường vuông góc hạ từ sao $\delta$ xuống đường thẳng $yX$ bằng $\frac13yd$.

Cùng đêm đó, lúc $12$ giờ, khi sao chổi ở $Y$, đường thẳng $yY$ bằng $\frac34yd$, hoặc hơi nhỏ hơn, chẳng hạn $\frac45yd$; đường vuông góc hạ từ sao $\delta$ xuống $yY$ xấp xỉ $\frac12yd$ hoặc $\frac13yd$. Khi ấy sao chổi ở rất gần đường chân trời, gần như không nhìn thấy, nên không thể xác định vị trí của nó chắc chắn bằng những quan sát trước.

Từ những quan sát này, bằng các phép dựng hình và tính toán, tôi suy ra kinh độ và vĩ độ của sao chổi. Ông Pound, sau khi sửa các vị trí của sao cố định, đã xác định chính xác hơn các vị trí của sao chổi, và những vị trí ấy được ghi trong bảng trên. Dù micrometer của tôi không phải loại tốt nhất, sai số của kinh độ và vĩ độ suy ra từ các quan sát của tôi hiếm khi vượt quá một phút. Theo các quan sát của tôi, vào cuối chuyển động, sao chổi lệch rõ về phía bắc khỏi đường song song mà nó mô tả vào cuối tháng Hai.

Để xác định quỹ đạo sao chổi từ các quan sát trên, tôi chọn ba quan sát Flamsted thực hiện ngày $21$ tháng Mười hai, ngày $5$ tháng Một và ngày $25$ tháng Một. Từ đó tôi tìm được

$$
[OCR\ không\ rõ]
$$

trong đó bán kính *orbis magnus* gồm $10000$ phần. Với lần quan sát đầu tiên, giả sử

$$
tE=[OCR\ không\ rõ]
$$

phần, tôi tìm được

$$
SB=9747,\quad BE=412,\quad S\mu=9503,\quad \mu=413,
$$

rồi

$$
BE=421,\quad OD=10186,\quad X=8528{,}4,\quad PM=8450,\quad MN=8475,\quad NP=25.
$$

Từ đó, sau phép tính thứ hai, tôi tìm được khoảng cách

$$
tb=5640,
$$

và cuối cùng suy ra

$$
TX=4775,\qquad rZ=11322.
$$

Từ những khoảng cách này, khi xác định quỹ đạo, tôi tìm được node đi xuống ở

$$
[OCR\ không\ rõ]
$$

và node đi lên ở

$$
[OCR\ không\ rõ].
$$

Góc nghiêng của mặt phẳng quỹ đạo so với mặt phẳng hoàng đạo là

$$
61^\circ20'.
$$

Đỉnh của nó, tức cận điểm Mặt Trời của sao chổi, cách node

$$
8^\circ38',
$$

và ở

$$
[OCR\ không\ rõ],
$$

với vĩ độ

$$
7^\circ34'\text{ nam}.
$$

*Latus rectum* của nó là

$$
236{,}8,
$$

và diện tích ngày mà bán kính kẻ từ Mặt Trời mô tả là

$$
93585,
$$

với giả thiết bình phương bán kính *orbis magnus* bằng

$$
100000000.
$$

Sao chổi chuyển động thuận theo thứ tự các chòm sao trên quỹ đạo này, và vào

$$
[OCR\ không\ rõ]
$$

nó ở đỉnh, tức cận điểm Mặt Trời của quỹ đạo. Tôi xác định những điều ấy bằng thước và compa, cùng các dây cung của các góc lấy từ bảng sin của các góc tự nhiên, trong một hình khá lớn, trong đó bán kính của *orbis magnus*, gồm $10000$ phần, bằng

$$
16\frac12\text{ inch}
$$

của một foot Anh.

Cuối cùng, để biết sao chổi có thật sự chuyển động trên quỹ đạo đã xác định hay không, tôi kiểm tra các vị trí của nó trên quỹ đạo ấy, một phần bằng phép tính số học và một phần bằng thước và compa, vào các thời điểm của một số quan sát như bảng sau.

| Ngày | Khoảng cách từ Mặt Trời | Kinh độ tính được | Vĩ độ tính được | Kinh độ quan sát | Vĩ độ quan sát | Sai số kinh độ | Sai số vĩ độ |
|---|---:|---:|---:|---:|---:|---:|---:|
| tháng 12, ngày 12 | $2792$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ | $8.26$ | $+1$ | $-7$ |
| tháng 2, ngày 5 | $8403$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ | $28.00$ | $+2$ | $-10$ |
| tháng 3, ngày 5 | $16669$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ | $15.27$ | $0$ | $+2$ |

*Do OCR hỏng, các số trong bảng chỉ giữ những gì đọc được; phải đối chiếu scan.*

Sau đó, bác sĩ Halley xác định quỹ đạo chính xác hơn bằng một phép tính số học, không thể làm bằng các mô tả đường thẳng. Ông giữ vị trí các node là

$$
[OCR\ không\ rõ]
$$

và độ nghiêng mặt phẳng quỹ đạo so với hoàng đạo là

$$
61^\circ20',
$$

cùng thời điểm sao chổi ở cận điểm Mặt Trời là ngày $8$ tháng Mười hai, lúc

$$
[OCR\ không\ rõ].
$$

Ông tìm được khoảng cách từ cận điểm Mặt Trời đến node đi lên, đo trong quỹ đạo sao chổi, là

$$
9^\circ20',
$$

và *latus rectum* của parabol là

$$
2430
$$

phần, với giả thiết khoảng cách trung bình của Trái Đất từ Mặt Trời là

$$
100000\text{ phần}.
$$

Từ những dữ liệu ấy, bằng phép tính số học chính xác, ông tính các vị trí của sao chổi vào các thời điểm quan sát như sau.

| Thời gian đúng | Khoảng cách từ Mặt Trời | Kinh độ tính được | Vĩ độ tính được | Sai số kinh độ | Sai số vĩ độ |
|---|---:|---:|---:|---:|---:|
| tháng 12, ngày 12, $4^h46^m$ | $28028$ | $29^\circ6'32''$ | $8^\circ26'$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ |
| ngày 21, $6^h37^m$ | $61076$ | $5^\circ56'30''$ | $21^\circ43'20''$ | $[OCR\ không\ rõ]$ | $+1.7$ |
| ngày 24, $6^h18^m$ | $70008$ | $18^\circ48'20''$ | $25^\circ22'40''$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ |
| ngày 26, $5^h20^m$ | $75576$ | $28^\circ22'45''$ | $27^\circ1'36''$ | $[OCR\ không\ rõ]$ | $+0.44$ |
| ngày 29, $8^h03^m$ | $84021$ | $13^\circ12'40''$ | $28^\circ10'10''$ | $+1.59$ | $+0.12$ |
| ngày 30, $8^h10^m$ | $86661$ | $17^\circ40'5''$ | $28^\circ11'20''$ | $+1.45$ | $-0.33$ |
| tháng 1, ngày 5, $6^h14^m$ | $101440$ | $8^\circ49'49''$ | $26^\circ15'15''$ | $+0.56$ | $+0.8$ |
| ngày 9, $7^h00^m$ | $110959$ | $18^\circ44'36''$ | $24^\circ12'54''$ | $+0.32$ | $+0.58$ |
| ngày 10, $6^h06^m$ | $113162$ | $20^\circ41'0''$ | $23^\circ44'10''$ | $+0.10$ | $+0.18$ |
| ngày 13, $7^h09^m$ | $120000$ | $26^\circ0'21''$ | $22^\circ17'30''$ | $[OCR\ không\ rõ]$ | $+0.2$ |
| ngày 25, $7^h59^m$ | $145370$ | $9^\circ33'40''$ | $17^\circ57'55''$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ |
| ngày 30, $8^h22^m$ | $155303$ | $13^\circ17'41''$ | $16^\circ42'7''$ | $[OCR\ không\ rõ]$ | $-0.11$ |
| tháng 2, ngày 2, $6^h35^m$ | $160951$ | $15^\circ11'11''$ | $16^\circ4'15''$ | $[OCR\ không\ rõ]$ | $+0.14$ |
| ngày 5, $7^h04^m$ | $166686$ | $16^\circ58'55''$ | $15^\circ29'13''$ | $[OCR\ không\ rõ]$ | $+2.0$ |
| ngày 25, $8^h41^m$ | $202570$ | $26^\circ15'46''$ | $12^\circ48'0''$ | $[OCR\ không\ rõ]$ | $+1.10$ |
| tháng 3, ngày 5, $11^h39^m$ | $216205$ | $29^\circ18'35''$ | $12^\circ5'40''$ | $+0.35$ | $+2.14$ |

Sao chổi này cũng xuất hiện vào tháng Mười một trước đó. Tại Coburg ở Saxony, ông Gottfried Kirch quan sát nó ngày $4$, ngày $6$ và ngày $11$ theo lịch cũ. Từ các vị trí của nó đối với những sao cố định gần nhất, được quan sát đủ chính xác bằng kính viễn dài hai feet hoặc mười feet, từ hiệu số kinh độ giữa Coburg và London là

$$
11^\circ,
$$

và từ các vị trí sao cố định do ông Pound quan sát, bác sĩ Halley xác định các vị trí của sao chổi như sau.

- Ngày $3$ tháng Mười một, $17^h02'$ theo thời gian biểu kiến tại London, sao chổi ở kinh độ

$$
[OCR\ không\ rõ]
$$

với vĩ độ Bắc

$$
1^\circ17'45''.
$$

- Ngày $5$ tháng Mười một, $15^h58'$, sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Bắc

$$
1^\circ6'.
$$

- Ngày $10$ tháng Mười một, $16^h31'$, sao chổi cách đều hai sao ở chòm sao $\Omega$, tức $\sigma$ và $\tau$ theo cách gọi của Bayer; nhưng nó chưa chạm hẳn vào đường thẳng nối hai sao ấy, mà chỉ rất gần. Trong danh mục của Flamsted, sao $\sigma$ lúc ấy ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Bắc gần

$$
1^\circ41',
$$

còn sao $\tau$ ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
0^\circ34'.
$$

Điểm giữa hai sao ấy ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Bắc

$$
0^\circ33\frac12'.
$$

Nếu khoảng cách từ sao chổi đến đường thẳng nối hai sao là khoảng

$$
10'\text{ hoặc }12',
$$

thì hiệu số kinh độ giữa sao chổi và điểm giữa là

$$
7',
$$

và hiệu số vĩ độ gần

$$
7'.
$$

Từ đó, sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Bắc khoảng

$$
26'.
$$

Lần quan sát đầu tiên, dựa trên vị trí của sao chổi đối với một số sao cố định nhỏ, có độ chính xác như mong muốn. Lần thứ hai cũng đủ chính xác. Trong lần quan sát thứ ba, kém chính xác hơn, sai số có thể là $6$ hoặc $7$ phút, nhưng khó có thể lớn hơn.

Khi tính kinh độ của sao chổi trong lần quan sát thứ nhất và chính xác nhất trên quỹ đạo parabol nói trên, ta được

$$
[OCR\ không\ rõ]
$$

với vĩ độ Bắc

$$
1^\circ25'7''
$$

và khoảng cách từ Mặt Trời

$$
115546.
$$

Ngoài ra, bác sĩ Halley, khi quan sát rằng một sao chổi đáng chú ý đã xuất hiện bốn lần ở những khoảng thời gian bằng nhau, mỗi khoảng $575$ năm, tức vào tháng Chín sau khi Julius Caesar bị giết, năm $531$ thời Công nghiệp Laimprotinus và Orestes; tháng Hai năm $1106$; và cuối năm $1680$; với một đuôi dài và đáng chú ý, ngoại trừ lần xuất hiện sau cái chết của Caesar, khi đuôi không nổi bật vì vị trí bất tiện của Trái Đất, đã tự tìm một quỹ đạo elip có trục lớn bằng

$$
1382957
$$

phần, với khoảng cách trung bình Trái Đất từ Mặt Trời gồm

$$
10000
$$

phần, trên đó một sao chổi có thể quay trong

$$
575\text{ năm}.
$$

Ông đặt node đi lên ở

$$
[OCR\ không\ rõ],
$$

góc nghiêng của mặt phẳng quỹ đạo với hoàng đạo là

$$
61^\circ6'48'',
$$

cận điểm Mặt Trời của sao chổi trong mặt phẳng ấy ở

$$
[OCR\ không\ rõ],
$$

thời điểm tương ứng của cận điểm Mặt Trời là

$$
\text{tháng 12, ngày }7,\ 23^h09',
$$

khoảng cách từ cận điểm Mặt Trời đến node đi lên trong mặt phẳng hoàng đạo là

$$
9^\circ17'35'',
$$

và trục liên hợp là

$$
18481{,}2.
$$

Ông tính chuyển động của sao chổi trên quỹ đạo elip ấy. Các vị trí suy ra từ quan sát và các vị trí suy ra từ phép tính có thể thấy trong bảng sau.

| Ngày và thời gian đúng | Kinh độ quan sát | Vĩ độ Bắc quan sát | Kinh độ tính được | Vĩ độ tính được | Sai số kinh độ | Sai số vĩ độ |
|---|---:|---:|---:|---:|---:|---:|
| tháng 11, ngày 3, $16^h47'$ | $29^\circ51'0''$ | $1^\circ17'45''$ | $29^\circ51'12''$ | $1^\circ17'32''$ | $-0.22$ | $-0.13$ |
| ngày 5, $15^h37'$ | $3^\circ23'0''$ | $1^\circ6'0''$ | $3^\circ24'32''$ | $1^\circ6'9''$ | $+1.32$ | $+0.9$ |
| ngày 10, $16^h18'$ | $15^\circ32'0''$ | $0^\circ27'0''$ | $15^\circ33'2''$ | $0^\circ25'7''$ | $+1.2$ | $-1.53$ |
| ngày 16, $17^h00'$ | $8^\circ16'45''$ | $0^\circ53'7''\text{ Nam}$ | $8^\circ21'34''$ | $0^\circ52'15''\text{ Nam}$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ |
| ngày 18, $20^h17'$ | $28^\circ10'36''$ | $1^\circ53'35''$ | $28^\circ10'36''$ | $1^\circ53'35''$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ |
| ngày 20, $23^h17'5''$ | $13^\circ22'42''$ | $2^\circ29'0''$ | $13^\circ22'42''$ | $2^\circ29'0''$ | $[OCR\ không\ rõ]$ | $[OCR\ không\ rõ]$ |
| tháng 12, ngày 12, $4^h46'$ | $6^\circ32'30''$ | $8^\circ28'0''$ | $6^\circ31'20''$ | $8^\circ29'6''$ | $-1.10$ | $+1.6$ |
| ngày 21, $6^h37'$ | $5^\circ8'12''$ | $21^\circ42'13''$ | $5^\circ6'14''$ | $21^\circ44'42''$ | $-1.58$ | $+2.29$ |
| ngày 24, $6^h18'$ | $18^\circ49'23''$ | $25^\circ23'5''$ | $18^\circ47'30''$ | $25^\circ23'35''$ | $-1.53$ | $+0.30$ |
| ngày 26, $5^h21'$ | $28^\circ24'13''$ | $27^\circ0'52''$ | $28^\circ21'42''$ | $27^\circ2'1''$ | $-2.31$ | $+1.9$ |
| ngày 29, $8^h03'$ | $13^\circ10'41''$ | $28^\circ9'58''$ | $13^\circ11'14''$ | $28^\circ10'38''$ | $+0.33$ | $+0.40$ |
| ngày 30, $8^h10'$ | $17^\circ38'0''$ | $28^\circ11'53''$ | $17^\circ38'27''$ | $28^\circ11'37''$ | $+0.7$ | $-0.16$ |
| tháng 1, ngày 5, $6^h14'$ | $8^\circ48'53''$ | $26^\circ15'7''$ | $8^\circ48'51''$ | $26^\circ14'57''$ | $-0.2$ | $-0.10$ |
| ngày 9, $7^h01'$ | $18^\circ44'4''$ | $24^\circ11'56''$ | $18^\circ43'51''$ | $24^\circ12'17''$ | $-0.13$ | $+0.21$ |
| ngày 10, $6^h06'$ | $20^\circ40'50''$ | $23^\circ43'32''$ | $20^\circ40'23''$ | $23^\circ43'25''$ | $-0.27$ | $-0.7$ |
| ngày 13, $7^h09'$ | $25^\circ59'48''$ | $22^\circ17'28''$ | $26^\circ0'8''$ | $22^\circ16'32''$ | $+0.20$ | $-0.56$ |
| ngày 25, $7^h59'$ | $9^\circ35'0''$ | $17^\circ56'30''$ | $9^\circ34'11''$ | $17^\circ56'6''$ | $-0.49$ | $-0.24$ |
| ngày 30, $8^h22'$ | $13^\circ19'51''$ | $16^\circ42'18''$ | $13^\circ18'28''$ | $16^\circ40'5''$ | $-1.23$ | $-2.13$ |
| tháng 2, ngày 2, $6^h35'$ | $15^\circ13'53''$ | $16^\circ4'1''$ | $15^\circ11'59''$ | $16^\circ2'17''$ | $-1.54$ | $-1.54$ |
| ngày 5, $7^h04'$ | $16^\circ59'6''$ | $15^\circ27'3''$ | $16^\circ59'17''$ | $15^\circ27'0''$ | $+0.11$ | $-0.3$ |
| ngày 25, $8^h41'$ | $26^\circ18'35''$ | $12^\circ46'46''$ | $26^\circ16'59''$ | $12^\circ45'22''$ | $-1.36$ | $-1.24$ |
| tháng 3, ngày 1, $11^h10'$ | $27^\circ52'42''$ | $12^\circ23'40''$ | $27^\circ51'47''$ | $12^\circ22'28''$ | $-0.55$ | $-1.12$ |
| ngày 5, $11^h39'$ | $29^\circ18'0''$ | $12^\circ3'16''$ | $29^\circ20'11''$ | $12^\circ2'50''$ | $+2.11$ | $-0.26$ |
| ngày 9, $8^h38'$ | $0^\circ43'4''$ | $11^\circ45'52''$ | $0^\circ42'43''$ | $11^\circ45'35''$ | $-0.21$ | $-0.17$ |

Những quan sát của sao chổi từ đầu đến cuối khớp hoàn toàn với chuyển động của nó trên quỹ đạo vừa mô tả, cũng như chuyển động của các hành tinh khớp với các lý thuyết từ đó chúng được tính. Sự khớp này rõ ràng chứng minh đây là cùng một sao chổi xuất hiện suốt khoảng thời gian ấy, đồng thời quỹ đạo của nó đã được xác định đúng.

Trong bảng trước, tôi đã bỏ qua các quan sát ngày $16$, $18$, $20$ và $23$ tháng Mười một, vì chúng không đủ chính xác; vào những thời điểm ấy, nhiều người đã quan sát sao chổi.

Ngày $17$ tháng Mười một, theo lịch cũ, lúc $6$ giờ sáng tại Rome, tức $5^h10'$ tại London, Ponthceus và những người đi cùng dùng các sợi chỉ hướng tới các sao cố định, quan sát sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
0^\circ40'.
$$

Các quan sát của ông có thể thấy trong một luận điểm mà Ponthceus đã xuất bản về sao chổi này. Cellius, người có mặt, đã truyền các quan sát của mình trong một bức thư gửi Cassini; ông thấy sao chổi cùng giờ ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
0^\circ30'.
$$

Galletius cũng thấy nó cùng giờ tại Avignon, tức $5^h42'$ sáng theo giờ London, ở

$$
[OCR\ không\ rõ]
$$

không có vĩ độ ghi được. Nhưng theo lý thuyết, vào thời điểm ấy sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
0^\circ53'7''.
$$

Ngày $18$ tháng Mười một, lúc $6^h30'$ sáng tại Rome, tức $5^h40'$ tại London, Ponthceus quan sát sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ20',
$$

còn Cellius thấy nó ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ00'.
$$

Nhưng lúc $5^h30'$ sáng tại Avignon, Galletius thấy nó ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ00'.
$$

Tại Đại học La Flèche ở Pháp, lúc $5$ giờ sáng, tức $5^h09'$ tại London, ông Ango thấy nó ở giữa hai ngôi sao nhỏ; một ngôi là ngôi giữa ba ngôi nằm trên một đường thẳng ở bàn tay phía nam của chòm sao Xử Nữ, theo tên Bayer $\mu$, còn ngôi kia là ngôi ngoài cùng của cánh, theo tên Bayer $\theta$. Vì vậy, sao chổi lúc ấy ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
50'.
$$

Bác sĩ Halley cho tôi biết rằng cùng ngày ấy, tại Boston ở New England, vĩ độ $42\frac12$ độ, lúc $5$ giờ sáng, tức $9^h44'$ theo giờ London, người ta thấy sao chổi gần

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ30'.
$$

Ngày $19$ tháng Mười một, lúc $4\frac12$ giờ tại Cambridge, theo quan sát của một người trẻ, sao chổi cách sao Spica khoảng

$$
2^\circ
$$

về phía tây bắc. Lúc ấy Spica ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
2^\circ1'59''.
$$

Cùng ngày, lúc $5$ giờ sáng tại Boston, sao chổi cách Spica

$$
[OCR\ không\ rõ]
$$

với hiệu số vĩ độ

$$
40'.
$$

Cùng ngày ở đảo Jamaica, nó cách Spica khoảng

$$
1^\circ.
$$

Cùng ngày, ông Arthur Storer, tại dòng sông Patuxent gần Hunting Creek ở Maryland, trong vùng biên giới Virginia, ở vĩ độ

$$
38\frac12^\circ,
$$

lúc $5$ giờ sáng, tức $10$ giờ tại London, thấy sao chổi ở phía trên Spica và gần như nối liền với nó; khoảng cách giữa hai vật khoảng

$$
\frac12^\circ.
$$

Từ các quan sát ấy được so sánh, tôi kết luận rằng lúc $9^h44'$ tại London, sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam khoảng

$$
1^\circ25'.
$$

Theo lý thuyết, lúc ấy nó ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ26'54''.
$$

Ngày $20$ tháng Mười một, Montenari, giáo sư thiên văn ở Padua, lúc $6$ giờ sáng tại Venice, tức $5^h10'$ tại London, thấy sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ30'.
$$

Cùng ngày tại Boston, nó cách Spica về phía đông khoảng

$$
4^\circ
$$

theo kinh độ, nên gần như ở

$$
[OCR\ không\ rõ].
$$

Ngày $21$ tháng Mười một, Ponthceus và những người đi cùng lúc $7\frac12$ giờ sáng quan sát sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ16'.
$$

Cellius thấy nó ở

$$
[OCR\ không\ rõ]
$$

ông Ango lúc $5$ giờ sáng thấy ở

$$
[OCR\ không\ rõ]
$$

còn Montenari thấy ở

$$
[OCR\ không\ rõ].
$$

Cùng ngày, tại đảo Jamaica, nó được nhìn thấy gần đầu chòm sao

$$
[OCR\ không\ rõ]
$$

với vĩ độ gần bằng vĩ độ của Spica, tức

$$
2^\circ2'.
$$

Cùng ngày, lúc $5$ giờ sáng tại Ballasore ở Đông Ấn, tức $11^h20'$ đêm trước theo giờ London, khoảng cách từ sao chổi đến Spica được lấy là

$$
7^\circ35'
$$

về phía đông. Nó nằm trên một đường thẳng giữa Spica và ngôi sao cân bằng, nên lúc ấy ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam khoảng

$$
1^\circ11'.
$$

Sau $5^h40'$, tức $5$ giờ sáng theo giờ London, nó ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ16'.
$$

Theo lý thuyết, lúc ấy nó ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
1^\circ53'35''.
$$

Ngày $22$ tháng Mười một, Montenari thấy sao chổi ở

$$
[OCR\ không\ rõ].
$$

Tại Boston ở New England, người ta tìm thấy nó ở khoảng

$$
[OCR\ không\ rõ],
$$

với vĩ độ gần như không đổi, tức

$$
1^\circ30'.
$$

Cùng ngày, lúc $5$ giờ sáng tại Ballasore, sao chổi được quan sát ở

$$
[OCR\ không\ rõ],
$$

nên lúc $5$ giờ sáng tại London nó ở gần

$$
[OCR\ không\ rõ].
$$

Cùng ngày, lúc $6$ giờ sáng tại London, bác sĩ Hook quan sát nó ở khoảng

$$
[OCR\ không\ rõ]
$$

trên đường thẳng đi qua Spica và Cor Leonis; không hoàn toàn chính xác, nhưng lệch một chút về phía bắc. Montenari cũng quan sát rằng trong ngày ấy và một số ngày sau đó, đường thẳng kẻ từ sao chổi qua Spica đi sát phía nam của Cor Leonis trong một khoảng cách rất nhỏ.

Đường thẳng qua Cor Leonis và Spica cắt hoàng đạo ở

$$
[OCR\ không\ rõ]
$$

với góc

$$
2^\circ51'.
$$

Nếu sao chổi nằm trên đường thẳng ấy và ở

$$
[OCR\ không\ rõ],
$$

vĩ độ của nó sẽ là

$$
2^\circ26'.
$$

Nhưng vì Hook và Montenari cùng xác nhận sao chổi cách đường thẳng ấy về phía bắc một khoảng nhỏ, vĩ độ của nó phải nhỏ hơn. Ngày $20$, theo quan sát của Montenari, vĩ độ của nó gần bằng vĩ độ của Spica, tức khoảng

$$
1^\circ30'.
$$

Nhưng theo sự thống nhất giữa Hook, Montenari và Ango, vĩ độ không ngừng tăng, nên ngày $22$ nó phải lớn hơn $1^\circ30'$ một cách đáng kể. Lấy trung bình giữa hai giới hạn $2^\circ26'$ và $1^\circ30'$, vĩ độ vào khoảng

$$
1^\circ58'.
$$

Hook và Montenari thống nhất rằng đuôi sao chổi hướng về phía Spica, lệch một chút khỏi ngôi sao ấy về phía nam theo Hook, nhưng về phía bắc theo Montenari. Vì vậy, độ lệch ấy khó nhận ra; và đuôi, gần như song song với xích đạo, lệch nhẹ khỏi điểm đối xứng với Mặt Trời về phía bắc.

Ngày $23$ tháng Mười một, lịch cũ, lúc $5$ giờ sáng tại Nuremberg, tức $4$ giờ tại London, ông Zimmerman thấy sao chổi ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Nam

$$
2^\circ31'.
$$

Vị trí của nó được xác định bằng cách lấy các khoảng cách từ các sao cố định.

Ngày $24$ tháng Mười một, trước khi Mặt Trời mọc, Montenari thấy sao chổi ở

$$
[OCR\ không\ rõ]
$$

về phía bắc của đường thẳng qua Cor Leonis và Spica, nên vĩ độ của nó nhỏ hơn

$$
2^\circ38'.
$$

Vì vĩ độ, như đã nói, không ngừng tăng theo các quan sát đồng thời của Montenari, Hook và quan sát viên ở New England, nên ngày $24$ nó phải lớn hơn

$$
1^\circ58'.
$$

Lấy giá trị trung bình, có thể tính là

$$
2^\circ18'
$$

mà không có sai số đáng kể. Ponthceus và Galletius cho rằng vĩ độ lúc ấy đang giảm; Cellius và quan sát viên ở New England cho rằng nó vẫn giữ nguyên, vào khoảng

$$
1^\circ
$$

hoặc

$$
1\frac12^\circ.
$$

Các quan sát của Ponthceus và Cellius thô sơ hơn, nhất là khi lấy góc phương vị và độ cao; các quan sát của Galletius cũng vậy. Những quan sát tốt hơn là những quan sát lấy vị trí của sao chổi so với các sao cố định của Montenari, Hook, Ango và quan sát viên ở New England, đôi khi còn có Ponthceus và Cellius.

Cùng ngày, lúc $5$ giờ sáng tại Ballasore, sao chổi được quan sát ở

$$
[OCR\ không\ rõ],
$$

nên lúc $5$ giờ sáng tại London nó ở gần

$$
[OCR\ không\ rõ].
$$

Theo lý thuyết, lúc ấy nó ở

$$
[OCR\ không\ rõ].
$$

Ngày $25$ tháng Mười một, trước khi Mặt Trời mọc, Montenari quan sát sao chổi ở gần

$$
[OCR\ không\ rõ].
$$

Cellius quan sát cùng thời điểm rằng sao chổi nằm trên một đường thẳng giữa ngôi sao sáng ở đùi phải của Xử Nữ và cái cân phía nam của Thiên Bình. Đường thẳng này cắt đường đi của sao chổi ở

$$
[OCR\ không\ rõ].
$$

Theo lý thuyết, sao chổi ở gần

$$
[OCR\ không\ rõ].
$$

Các quan sát ấy cùng khớp với lý thuyết, và sự khớp ấy cho thấy đây là cùng một sao chổi xuất hiện từ ngày $4$ tháng Mười một đến ngày $9$ tháng Ba.

Đường đi của sao chổi cắt mặt phẳng hoàng đạo hai lần, nên nó không phải một đường thẳng. Nó cắt hoàng đạo không ở hai phía đối diện của bầu trời, mà ở cuối chòm sao Xử Nữ và đầu chòm sao Ma Kết, với một cung dài khoảng

$$
98^\circ.
$$

Vì vậy, đường đi của sao chổi lệch rất xa khỏi đường đi của một đường tròn lớn. Trong tháng Mười một, nó lệch khỏi hoàng đạo về phía nam ít nhất

$$
3^\circ,
$$

và trong tháng Mười hai sau đó, nó lệch khỏi hoàng đạo về phía bắc

$$
29^\circ.
$$

Hai phần quỹ đạo, nơi sao chổi đi xuống phía Mặt Trời rồi lại đi lên khỏi Mặt Trời, lệch nhau về một phía với góc biểu kiến trên

$$
30^\circ,
$$

theo quan sát của Montenari.

Sao chổi này đã đi qua chín chòm sao, từ độ cuối cùng của

$$
[OCR\ không\ rõ]
$$

đến đầu

$$
[OCR\ không\ rõ],
$$

ngoài chòm sao

$$
[OCR\ không\ rõ]
$$

mà nó đã đi qua trước khi bắt đầu được nhìn thấy. Không có lý thuyết nào khác cho phép một sao chổi đi qua một phần lớn bầu trời như vậy với chuyển động đều.

Chuyển động của sao chổi rất không đều. Quanh ngày $20$ tháng Mười một, nó mô tả khoảng

$$
5^\circ
$$

mỗi ngày. Sau đó, trong khoảng từ ngày $26$ tháng Mười một đến ngày $12$ tháng Mười hai, tức trong

$$
15\text{ ngày},
$$

nó chỉ mô tả

$$
40'.
$$

Nhưng khi chuyển động sau đó tăng tốc, lại gần

$$
5^\circ
$$

mỗi ngày, cho đến khi nó bắt đầu chậm lại.

Lý thuyết ấy mô tả một chuyển động không đều như vậy, đi qua một phần lớn bầu trời, tuân theo cùng quy luật với lý thuyết các hành tinh và khớp chính xác với các quan sát thiên văn chính xác. Không thể nghi ngờ tính đúng của nó.

Tôi cho rằng không nên bỏ qua việc đã đưa vào hình đính kèm một hình học đúng của quỹ đạo mà sao chổi này đã mô tả, cũng như đuôi của nó tại một số vị trí, được kéo dài trong mặt phẳng của quỹ đạo.

Trong sơ đồ ấy, $ABC$ là quỹ đạo của sao chổi, $D$ là Mặt Trời, $DE$ là trục của quỹ đạo, $DF$ là đường node, $GH$ là giao của quả cầu *orbis magnus* với mặt phẳng quỹ đạo. $I$ là vị trí sao chổi ngày $4$ tháng Mười một năm $1680$; $K$ là vị trí ngày $11$ tháng Mười một; $L$ là vị trí ngày $19$ tháng Mười một; $M$ là vị trí ngày $12$ tháng Mười hai; $N$ là vị trí ngày $21$ tháng Mười hai; $O$ là vị trí ngày $29$ tháng Mười hai; $P$ là vị trí ngày $5$ tháng Một sau đó; $Q$ là vị trí ngày $25$ tháng Một; $R$ là vị trí ngày $5$ tháng Hai; $S$ là vị trí ngày $25$ tháng Hai; $T$ là vị trí ngày $5$ tháng Ba; và $V$ là vị trí ngày $9$ tháng Ba.

Khi xác định độ dài đuôi, tôi đã làm các quan sát sau.

| Ngày | Quan sát độ dài hoặc hướng đuôi |
|---|---|
| ngày 4 và 6 tháng Mười một | Đuôi chưa xuất hiện. |
| ngày 11 tháng Mười một | Đuôi vừa bắt đầu hiện ra, nhưng qua kính viễn dài $10$ feet không dài quá $\frac12$ độ. |
| ngày 17 tháng Mười một | Ponthceus thấy đuôi dài hơn $15^\circ$. |
| ngày 18 tháng Mười một | Tại New England, đuôi dài $30^\circ$, hướng thẳng về phía đối xứng Mặt Trời và kéo dài tới sao Hỏa, lúc ấy ở $[OCR\ không\ rõ]$. |
| ngày 19 tháng Mười một | Tại Maryland, đuôi dài $15^\circ$ hoặc $20^\circ$. |
| ngày 10 tháng Mười hai | Theo quan sát của Flamsted, đuôi đi qua giữa khoảng cách giữa đuôi Thiên Xà và sao $\delta$ ở cánh phía nam của Đại ưng, rồi kết thúc gần các sao $A,\omega,\nu$ trong bảng Bayer. Vì vậy, đầu đuôi ở $[OCR\ không\ rõ]$ với vĩ độ Bắc khoảng $34^\circ$. |
| ngày 11 tháng Mười hai | Đuôi vươn tới đầu chòm sao Mũi Sử, kết thúc ở $[OCR\ không\ rõ]$ với vĩ độ Bắc $38^\circ34'$. |
| ngày 12 tháng Mười hai | Đuôi đi qua giữa chòm sao Mũi Sử, không đi xa hơn nhiều, và kết thúc ở $[OCR\ không\ rõ]$ với vĩ độ Bắc gần $42^\circ$. |
| ngày 12 tháng Mười hai, Rome, $5^h40'$ | Với ánh sáng mờ hơn, có thể quan sát được trong trời trong, đuôi vươn lên $10^\circ$ phía trên phần hông của Thiên Nga. Phía tây và bắc của đuôi cách ngôi sao ấy $45'$. Đuôi rộng khoảng $3^\circ$ ở đầu trên, nên giữa đuôi cách sao $2^\circ15'$ về phía nam, còn đầu trên ở $[OCR\ không\ rõ]$ với vĩ độ Bắc $61^\circ$. Vì vậy, đuôi dài khoảng $70^\circ$. |
| ngày 21 tháng Mười hai | Đuôi gần như tới ghế của Cassiopeia, cách đều $\beta$ và Schedir, nên kết thúc ở $[OCR\ không\ rõ]$ với vĩ độ $47^\circ$. |
| ngày 29 tháng Mười hai | Đuôi chạm vào Scheat bên trái, lấp đầy khoảng không gian giữa hai ngôi sao ở chân phía bắc của Andromeda, dài $54^\circ$, và kết thúc ở $[OCR\ không\ rõ]$ với vĩ độ $35^\circ$. |
| ngày 5 tháng Một | Đuôi chạm ngôi sao ở ngực Andromeda bên phải và ngôi sao $\delta$ thuộc thắt lưng bên trái; theo các quan sát của chúng tôi, đuôi dài $40^\circ$, nhưng cong, với phần lõm hướng nam. Gần đầu sao chổi, nó tạo với đường tròn đi qua Mặt Trời và đầu sao một góc $4^\circ$; ở đầu kia, góc với đường tròn ấy khoảng $10^\circ$ hoặc $11^\circ$, và dây cung của đuôi tạo với đường tròn góc $8^\circ$. |
| ngày 13 tháng Một | Đuôi kết thúc giữa Alamech và Algol với ánh sáng đủ nhận ra; với ánh sáng mờ, nó kết thúc đối diện ngôi sao $\kappa$ ở phía Perseus. Khoảng cách từ đầu đuôi đến đường tròn qua Mặt Trời và sao chổi là $3^\circ50'$, và góc giữa dây cung đuôi với đường tròn ấy là $[OCR\ không\ rõ]$. |
| ngày 25 và 26 tháng Một | Đuôi sáng với ánh sáng mờ dài $6^\circ$ hoặc $7^\circ$; sau đó một hoặc hai đêm, khi trời rất trong, nó dài $12^\circ$ hoặc hơn, với ánh sáng rất mờ và khó nhìn thấy. Trục của đuôi hướng chính xác tới ngôi sao sáng ở vai phía đông của Auriga, nên lệch khỏi điểm đối xứng Mặt Trời về phía bắc một góc $10^\circ$. |
| ngày $10$ tháng Hai | Qua kính viễn, tôi thấy đuôi dài $2^\circ$; ánh sáng mờ hơn không hiện qua kính. Ponthceus viết rằng ngày $7$ tháng Hai ông thấy đuôi dài $12^\circ$. |
| ngày $25$ tháng Hai | Sao chổi không có đuôi, và tiếp tục không có đuôi cho đến khi biến mất. |

### Thân sao chổi và nhiệt

Nếu xét quỹ đạo đã mô tả và những hiện tượng khác của sao chổi này, ta dễ dàng nhận ra thân các sao chổi là rắn chắc, gọn, cố định và bền, giống thân các hành tinh. Nếu chúng chỉ là hơi nước hoặc khí thải của Trái Đất, Mặt Trời và các hành tinh khác, sao chổi này khi đi qua vùng lân cận Mặt Trời sẽ lập tức bị phân tán.

Nhiệt của Mặt Trời tỷ lệ với mật độ tia của nó, tức tỷ lệ nghịch với bình phương khoảng cách từ các vị trí tới Mặt Trời. Vì vậy, vào ngày $8$ tháng Mười hai, khi sao chổi ở cận điểm Mặt Trời, khoảng cách từ tâm Mặt Trời tới nó tỷ lệ với khoảng cách từ Mặt Trời tới Trái Đất là khoảng

$$
6:1000.
$$

Nhiệt Mặt Trời tác động lên sao chổi vào lúc ấy so với nhiệt Mặt Trời mùa hè ở chúng ta là

$$
1000000:36=28000:1.
$$

Nhưng nhiệt của nước sôi, theo thử nghiệm của tôi, lớn hơn khoảng ba lần nhiệt mà đất khô thu được từ Mặt Trời mùa hè; nhiệt của sắt nóng đỏ, nếu phỏng đoán của tôi đúng, lớn hơn khoảng ba hoặc bốn lần nhiệt của nước sôi. Vì vậy, nhiệt mà đất khô trên sao chổi có thể thu được từ tia Mặt Trời trong lúc ở cận điểm Mặt Trời lớn hơn khoảng

$$
2000
$$

lần nhiệt của sắt nóng đỏ. Với một nhiệt dữ dội như vậy, hơi nước và khí thải, cùng mọi vật chất bay hơi, chắc chắn đã bị tiêu tán ngay lập tức.

Vì vậy, sao chổi này phải đã thu được một lượng nhiệt khổng lồ từ Mặt Trời và giữ nhiệt ấy trong thời gian rất dài. Một quả cầu sắt đường kính một inch, để nóng đỏ trong không khí, cũng khó mất hết nhiệt trong một giờ. Một quả cầu lớn hơn sẽ giữ nhiệt lâu hơn theo tỷ lệ với đường kính, vì bề mặt, theo tỷ lệ mà nó bị làm nguội khi tiếp xúc với không khí xung quanh, nhỏ hơn tương đối so với lượng vật chất nóng bên trong.

Vì vậy, một quả cầu sắt nóng đỏ có đường kính bằng Trái Đất của ta, tức khoảng

$$
40000000\text{ feet},
$$

cũng khó nguội trong số ngày tương ứng, hoặc trong hơn

$$
50000\text{ năm}.
$$

Tôi nghi ngờ rằng, vì một số nguyên nhân tiềm ẩn, thời gian giữ nhiệt có thể tăng theo một tỷ lệ còn nhỏ hơn nữa so với thời gian tỷ lệ với đường kính. Tôi sẽ vui mừng nếu tỷ lệ đúng được kiểm tra bằng thí nghiệm.

Còn phải quan sát rằng sao chổi vào tháng Mười hai, ngay sau khi được Mặt Trời nung nóng, phát ra một đuôi dài hơn nhiều và rực rỡ hơn nhiều so với tháng Mười một trước đó, khi nó chưa tới cận điểm Mặt Trời. Nói chung, những đuôi dài và rực rỡ nhất luôn phát sinh từ sao chổi ngay sau khi nó đi qua vùng lân cận Mặt Trời. Vì vậy, nhiệt mà sao chổi thu được góp phần làm cho đuôi dài ra. Từ đó, tôi có thể suy ra rằng đuôi chỉ là một hơi nước rất mịn, mà đầu hoặc nhân của sao chổi phát ra nhờ nhiệt của nó.

### Ba cách giải thích đuôi sao chổi

Về đuôi sao chổi, người ta đã có ba ý kiến khác nhau. Người ta cho rằng chúng chỉ là các tia sáng Mặt Trời truyền qua những đầu sao chổi được giả sử là trong suốt. Người khác cho rằng chúng phát sinh từ sự khúc xạ mà ánh sáng chịu khi đi từ đầu sao chổi tới Trái Đất. Người khác nữa cho rằng chúng là những đám mây hoặc hơi nước liên tục bay lên từ đầu sao chổi và hướng về các phía đối xứng Mặt Trời.

Ý kiến thứ nhất thuộc về những người chưa quen thuộc với quang học. Trong một căn phòng tối, các tia Mặt Trời chỉ được nhìn thấy vì ánh sáng từ chúng phản chiếu trên những hạt bụi và khói nhỏ luôn bay trong không khí. Vì vậy, trong không khí nhiễm khói dày, các tia ấy xuất hiện rất sáng và khiến thị giác cảm nhận rõ; trong không khí mịn hơn, chúng mờ hơn và khó nhận ra hơn. Nhưng trên bầu trời, nơi không có vật chất để phản chiếu ánh sáng, chúng không thể được nhìn thấy.

Ánh sáng không được nhìn thấy như nó là trong tia, mà được nhìn thấy khi nó phản chiếu từ tia tới mắt ta. Thị giác không thể được tạo ra bằng cách khác ngoài những tia rơi vào mắt. Vì vậy, ở những vùng mà đuôi sao chổi xuất hiện phải có vật chất phản chiếu. Nếu không, vì mọi không gian thiên thể đều được Mặt Trời chiếu sáng như nhau, không vùng nào trên bầu trời có thể sáng rực hơn vùng khác.

Ý kiến thứ hai gặp nhiều khó khăn. Đuôi sao chổi không bao giờ có những màu sắc đa dạng không tách rời khỏi sự khúc xạ; và sự truyền ánh sáng rõ ràng của các sao cố định và hành tinh tới mắt ta chứng minh rằng aether hay môi trường thiên thể không có năng lực khúc xạ đáng kể.

Người ta nói rằng đôi khi người Ai Cập nhìn thấy các sao cố định được bao quanh bởi một quầng sáng hay một ánh sáng giống như mái nhà. Vì điều ấy rất hiếm xảy ra, ta nên quy nó cho sự khúc xạ tình cờ của các đám mây; và sự lan sáng, chớp sáng của các sao cố định cũng nên quy cho những sự khúc xạ của cả mắt lẫn không khí. Khi đặt một kính viễn vào mắt, sự lan sáng và chớp sáng ấy lập tức biến mất.

Do sự lay động không ổn định của không khí và hơi nước bay lên, các tia sáng lần lượt bị lệch khỏi khe hẹp của đồng tử mắt. Nhưng điều ấy không thể xảy ra trong khe rộng hơn nhiều của vật kính trong một kính viễn. Vì vậy, sự chớp sáng xuất hiện trong trường hợp thứ nhất, nhưng biến mất trong trường hợp thứ hai. Sự biến mất ấy ở trường hợp sau chứng minh ánh sáng truyền đều đặn qua các vùng trời, không chịu sự khúc xạ đáng kể.

Để tránh một phản biện có thể nêu rằng những sao chổi chỉ sáng yếu không có đuôi, như thể các tia thứ cấp khi ấy quá yếu để tác động lên mắt, và vì thế đuôi của các sao cố định không xuất hiện, ta hãy xét rằng bằng kính viễn, ánh sáng của các sao cố định có thể được tăng lên hơn một trăm lần mà vẫn không thấy đuôi. Ánh sáng của các hành tinh còn dồi dào hơn mà cũng không có đuôi. Nhưng sao chổi đôi khi có đuôi khổng lồ, trong khi ánh sáng đầu chúng chỉ yếu và mờ.

Điều ấy xảy ra với sao chổi năm $1680$. Vào tháng Mười hai, ánh sáng của nó chỉ ngang với các sao cấp hai, nhưng nó vẫn phát ra một đuôi đáng chú ý, dài

$$
40^\circ,\ 50^\circ,\ 60^\circ
$$

hoặc $70^\circ$ và hơn. Sau đó, ngày $27$ và $28$ tháng Một, khi đầu nó chỉ trông như một ngôi sao cấp bảy, đuôi vẫn kéo dài

$$
6^\circ\text{ hoặc }7^\circ
$$

với ánh sáng đủ nhận ra dù rất mờ, và với ánh sáng yếu hơn, khó nhìn thấy, nó còn dài tới

$$
12^\circ
$$

hoặc hơn. Nhưng ngày $9$ và $10$ tháng Hai, khi đầu sao chổi bằng mắt trần không còn hiện rõ, tôi vẫn nhìn qua kính viễn thấy đuôi dài

$$
2^\circ.
$$

Hơn nữa, nếu đuôi là do sự khúc xạ của vật chất thiên thể, và nó lệch khỏi điểm đối xứng Mặt Trời tùy theo hình dạng của bầu trời, thì ở cùng những vị trí ấy trên bầu trời, sự lệch phải luôn hướng về cùng một phía. Nhưng sao chổi năm $1680$, ngày $28$ tháng Mười hai lúc $8^h$ chiều tại London, được nhìn thấy ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Bắc

$$
28^\circ6',
$$

trong khi Mặt Trời ở

$$
[OCR\ không\ rõ].
$$

Sao chổi năm $1577$, ngày $29$ tháng Mười hai, cũng ở

$$
[OCR\ không\ rõ]
$$

với vĩ độ Bắc

$$
28^\circ40',
$$

và Mặt Trời, như trước, ở khoảng

$$
[OCR\ không\ rõ].
$$

Trong cả hai trường hợp, vị trí Trái Đất như nhau và sao chổi xuất hiện ở cùng một nơi trên bầu trời. Tuy nhiên, trong trường hợp đầu, đuôi sao chổi lệch khỏi điểm đối xứng Mặt Trời về phía bắc một góc

$$
4\frac12^\circ,
$$

theo các quan sát của tôi và của những người khác; còn trong trường hợp sau, theo các quan sát của Tycho Brahe, nó lệch về phía nam

$$
21^\circ.
$$

Như vậy, sự khúc xạ của bầu trời đã bị bác bỏ. Hiện tượng đuôi sao chổi phải được giải thích bằng một vật chất phản chiếu ánh sáng. Việc đuôi phát sinh từ đầu sao chổi và hướng về các phía đối xứng Mặt Trời còn được xác nhận bằng các quy luật mà đuôi tuân theo.

Vì đuôi nằm trong những mặt phẳng quỹ đạo sao chổi đi qua Mặt Trời, nên chúng luôn lệch khỏi điểm đối xứng Mặt Trời về những phía mà đầu sao chổi đã bỏ lại trong khi chuyển động dọc theo quỹ đạo. Với một người quan sát đặt trong những mặt phẳng ấy, chúng có vẻ nằm ở những phía đối xứng trực tiếp với Mặt Trời. Nhưng khi người quan sát rời khỏi những mặt phẳng ấy, sự lệch bắt đầu xuất hiện, rồi mỗi ngày lại lớn hơn.

Xét các trường hợp khác nhau, sự lệch trông nhỏ hơn khi đuôi chếch với quỹ đạo sao chổi nhiều hơn, và khi đầu sao chổi ở gần Mặt Trời hơn, nhất là khi góc lệch được ước lượng gần đầu sao chổi. Những đuôi không lệch trông thẳng, còn những đuôi có lệch thì cong thành một độ cong nào đó. Độ cong lớn hơn khi sự lệch lớn hơn, và dễ nhận ra hơn khi đuôi dài hơn, các điều kiện khác không thay đổi. Ở những đuôi ngắn, độ cong khó nhận ra.

Góc lệch nhỏ hơn gần đầu sao chổi và lớn hơn về phía đầu kia của đuôi, vì phần lõm của đuôi hướng về các phía tạo ra sự lệch, tức những phía nằm trên một đường thẳng kéo vô hạn từ Mặt Trời qua đầu sao chổi. Những đuôi dài, rộng và sáng mạnh trông rực rỡ và có ranh giới rõ hơn ở phần lõm hơn là ở phần lưng.

Do đó, hiện tượng đuôi sao chổi phụ thuộc vào chuyển động của đầu sao chổi, tuyệt đối không phụ thuộc vào những nơi trên bầu trời nơi ta nhìn thấy đầu ấy. Vì vậy, đuôi sao chổi không phát sinh từ sự khúc xạ của bầu trời, mà từ chính đầu sao chổi, đầu ấy cung cấp vật chất tạo thành đuôi.

Giống như khói của một vật thể nóng trong không khí của ta, khói ấy bay lên theo phương thẳng đứng nếu vật thể đứng yên, hoặc theo phương xiên nếu vật thể chuyển động xiên. Trên bầu trời, nơi mọi vật thể đều hướng về Mặt Trời, khói và hơi nước phải bay lên khỏi Mặt Trời, hoặc bay thẳng lên nếu vật thể phát khói đứng yên, hoặc bay xiên nếu trong toàn bộ chuyển động, vật thể liên tục rời khỏi những nơi mà phần trên của hơi nước trước đó đã bay lên.

Sự xiên ấy nhỏ nhất ở nơi hơi nước bay lên nhanh nhất, tức gần vật thể phát khói khi nó ở gần Mặt Trời. Nhưng vì sự xiên thay đổi, cột hơi nước sẽ cong. Hơi nước ở những phía trước đó mới hơn, tức đã bay lên muộn hơn, nên ở phía ấy nó đậm đặc hơn, do đó phản chiếu nhiều ánh sáng hơn và có ranh giới rõ hơn.

Tôi không nói gì thêm về sự lay động bất định, đột ngột của các đuôi sao chổi và những hình dạng không quy tắc mà các tác giả thỉnh thoảng mô tả. Chúng có thể phát sinh từ những biến đổi của không khí ta và chuyển động của các đám mây, khiến các đám mây che khuất một phần đuôi; hoặc có thể phát sinh từ những phần của [tên đường trời không rõ], những phần có thể bị nhầm với các phần của đuôi sao chổi khi chúng đi qua.

> **[Chú giải]**
>
> **Đuôi sao chổi là ánh sáng phản chiếu, và kính viễn đã dẹp lời giải thích bằng khúc xạ**
>
> Đuôi sao chổi là thứ khiến người đời bốn thế kỷ trước tranh luận, và ở đây Newton đang bác bỏ tận gốc hai lời giải thích phổ biến nhất trong ba lời được nêu. Lập luận của ông dựa trên một ý tưởng đơn giản nhưng chí mạng: ta không nhìn thấy ánh sáng, ta chỉ nhìn thấy ánh sáng phản chiếu.
>
> Trong phòng tối, tia Mặt Trời chỉ hiện ra vì ánh sáng phản chiếu trên bụi và khói trong không khí. Ngoài bầu trời không có gì để phản chiếu, nên đuôi sao chổi bắt buộc phải có vật chất. Lời giải thích bằng khúc xạ thì bị bác bằng kính viễn: sự chớp sáng quanh các sao cố định thấy bằng mắt thường biến mất ngay khi nhìn qua kính, vì khe rộng của vật kính không bị lay như khe hẹp của đồng tử, nghĩa là ngoài không gian không có môi trường khúc xạ đáng kể. Còn lời giải thích bằng hơi nước thì ông giữ lại, kiểm chứng bằng chính nhiệt: thân sao chổi ở cận điểm Mặt Trời nhận nhiệt gấp hai mươi tám nghìn lần nhiệt Mặt Trời mùa hè ở chúng ta, tức hơn hai nghìn lần nhiệt sắt nóng đỏ, nên mọi thứ bay hơi chắc chắn bị tiêu tán ngay. Vì thế sao chổi phải là khối rắn chắc giữ nhiệt rất lâu, và đuôi chính là hơi nước rất mịn mà nhân nó phát ra.
>
> Ông không chỉ chọn một lời giải thích mà **bác bỏ** từng lời bằng một phép thử có thể kiểm tra, rồi mới chỉ ra dữ kiện buộc phải chọn lời kia. Đối thủ ông cãi ở đây thường được nhận là Robert Burnett, tác giả một lý thuyết trời mới ra năm 1681.
>
> Kết luận của Newton gần như hoàn toàn đúng. Nhân sao chổi là một khối băng bụi bẩn chứ không phải khí; coma và đuôi là hơi nước cùng bụi bị Mặt Trời thăng cấp, rồi bị đẩy ra bởi áp lực bức xạ và gió Mặt Trời. Vì thế đuôi luôn hướng **ra xa** Mặt Trời, bất kể sao chổi đang đi vào hay đi ra, đúng như ông suy ra từ vị trí đuôi quan sát năm 1680. Riêng ý "ta chỉ nhìn thấy ánh sáng phản chiếu" ngày nay ai cũng dùng, nhưng chỗ sắc nhất là cách bác bỏ lời giải thích bằng khúc xạ: chính quan sát bằng kính viễn đã dẹp một lý thuyết thị giác thời đó.

### Tính loãng của hơi nước và thời gian bay lên

Việc khí quyển sao chổi có thể cung cấp một lượng hơi nước đủ lớn để lấp đầy những không gian rộng lớn ấy có thể dễ dàng hiểu từ tính loãng của chính không khí ta. Không khí gần bề mặt Trái Đất chiếm một thể tích lớn hơn nước có cùng khối lượng

$$
850\text{ lần}.
$$

Vì vậy, một hình trụ không khí cao $850$ feet có cùng khối lượng với một hình trụ nước cùng diện tích đáy và cao một foot. Nhưng một hình trụ không khí kéo tới đỉnh khí quyển có cùng khối lượng với một hình trụ nước cao khoảng

$$
33\text{ feet}.
$$

Nếu lấy phần dưới cao $850$ feet ra khỏi toàn bộ hình trụ không khí, phần không khí còn lại sẽ có cùng khối lượng với một hình trụ nước cao

$$
32\text{ feet}.
$$

Từ đó, cùng với giả thuyết đã được nhiều thí nghiệm xác nhận rằng sự nén của không khí tỷ lệ với trọng lượng của khí quyển phía trên, và lực trọng lực tỷ lệ nghịch với bình phương khoảng cách từ tâm Trái Đất, tôi đã lập một phép tính, theo Hệ quả Proposition XXII, Sách II, và tìm thấy rằng ở độ cao bằng một bán kính Trái Đất, tính từ bề mặt Trái Đất, không khí loãng hơn không khí ở chúng ta theo một tỷ lệ lớn hơn nhiều so với tỷ lệ giữa toàn bộ không gian bên trong quỹ đạo sao Thổ và một không gian cầu đường kính một inch.

Vì vậy, nếu một quả cầu không khí của ta chỉ dày một inch được loãng hóa đến mức không khí ở độ cao một bán kính Trái Đất tính từ bề mặt, nó sẽ lấp đầy tất cả các vùng của các hành tinh tới quỹ đạo sao Thổ, và còn xa hơn nữa. Vì không khí ở những khoảng cách lớn hơn bị loãng hóa vô cùng mạnh, còn quầng sáng hay khí quyển của sao chổi thường cao gấp khoảng mười lần, tính từ tâm của chúng, so với bề mặt của nhân, và đuôi còn vươn cao hơn nữa, chúng phải vô cùng loãng. Dù vì khí quyển sao chổi đặc hơn nhiều, thân chúng bị Mặt Trời hút với lực lớn, cũng như các hạt khí và hơi nước của chúng hút lẫn nhau, khiến không khí trong không gian thiên thể và trong đuôi sao chổi có thể không loãng bằng, phép tính này vẫn cho thấy một lượng rất nhỏ khí và hơi nước là đủ để tạo ra mọi hiện tượng của đuôi sao chổi.

Sự thật là chúng có độ loãng đáng chú ý, điều này có thể thấy từ việc các ngôi sao vẫn sáng xuyên qua chúng. Khí quyển Trái Đất, dù chỉ dày vài dặm và được Mặt Trời chiếu sáng, đã che khuất và làm tắt hoàn toàn ánh sáng của tất cả các ngôi sao, thậm chí cả ánh sáng của Mặt Trăng. Trong khi đó, những ngôi sao nhỏ nhất vẫn được nhìn thấy sáng xuyên qua độ dày lớn của đuôi sao chổi, dù chúng cũng được Mặt Trời chiếu sáng, mà không bị giảm chút sáng nào.

Độ sáng của đuôi phần lớn các sao chổi cũng không lớn hơn độ sáng của không khí ta dày một hoặc hai inch, phản chiếu trong một căn phòng tối ánh sáng của tia Mặt Trời lọt qua một lỗ trên cửa chớp.

Ta có thể xác định khá gần đúng thời gian mà hơi nước dùng để bay từ đầu sao chổi tới đầu đuôi. Hãy kẻ một đường thẳng từ đầu đuôi tới Mặt Trời, rồi đánh dấu điểm mà đường thẳng ấy cắt quỹ đạo sao chổi. Nếu hơi nước hiện ở đầu đuôi đã bay lên theo một đường thẳng từ Mặt Trời, nó phải bắt đầu bay lên khỏi đầu khi đầu sao ở điểm giao ấy.

Đúng là hơi nước không bay lên theo một đường thẳng từ Mặt Trời. Nó giữ chuyển động mà nó có từ sao chổi trước khi bay lên, rồi cộng chuyển động ấy với chuyển động bay lên, nên bay lên theo phương xiên. Vì vậy, lời giải của bài toán sẽ chính xác hơn nếu ta kẻ đường cắt quỹ đạo song song với độ dài của đuôi; hoặc đúng hơn, vì chuyển động của sao chổi là đường cong, kẻ nó lệch nhẹ khỏi đường hoặc độ dài của đuôi.

Bằng nguyên tắc ấy, tôi tìm thấy hơi nước ngày $25$ tháng Một đang ở đầu đuôi đã bắt đầu bay lên khỏi đầu trước ngày $11$ tháng Mười hai, nên toàn bộ thời gian bay lên của nó là

$$
45\text{ ngày}.
$$

Còn toàn bộ đuôi xuất hiện ngày $10$ tháng Mười hai đã hoàn thành hành trình bay lên trong khoảng hai ngày kể từ thời điểm sao chổi ở cận điểm Mặt Trời. Vì vậy, vào lúc bắt đầu và trong lân cận Mặt Trời, hơi nước bay lên với vận tốc lớn nhất, rồi tiếp tục bay lên với chuyển động không ngừng bị trọng lực riêng làm chậm lại. Nó càng bay lên cao, càng làm đuôi dài thêm.

Trong khi đuôi còn được nhìn thấy, nó gần như gồm toàn bộ hơi nước đã bay lên kể từ thời điểm sao chổi ở cận điểm Mặt Trời. Phần hơi nước đã bay lên trước và tạo thành đầu đuôi cũng không biến mất cho đến khi khoảng cách quá lớn, cả với Mặt Trời, nơi nó nhận ánh sáng, lẫn với mắt ta, khiến nó trở nên vô hình.

Điều ấy còn cho thấy các không gian thiên thể không có sức cản: các thân rắn của hành tinh và sao chổi vẫn chuyển động, và ngay cả hơi nước cực kỳ loãng trong đuôi cũng giữ chuyển động nhanh của mình trong thời gian rất dài.

### Cách giải thích sự bay lên của đuôi

Kepler quy việc đuôi sao chổi bay lên cho khí quyển của đầu chúng, còn hướng về các phía đối xứng Mặt Trời thì quy cho tác dụng của các tia sáng, vốn mang theo vật chất tạo thành đuôi. Không có sự bất hợp lý lớn nào nếu giả sử rằng, trong những không gian tự do ấy, vật chất mịn như aether có thể nhuừng với tác dụng của các tia sáng Mặt Trời, dù những tia ấy không thể làm di chuyển rõ ràng các vật chất thô trong phần không gian của chúng ta, vốn bị cản trở bởi một sức cản rất dễ nhận thấy.

Một tác giả khác cho rằng có thể tồn tại một loại hạt vật chất có nguyên lý nhẹ, cũng như có những hạt khác có năng lực trọng lực; vật chất của đuôi sao chổi có thể thuộc loại trước, và sự bay lên của nó khỏi Mặt Trời có thể là do tính nhẹ ấy. Nhưng vì trọng lực của các vật thể trên mặt đất tỷ lệ với vật chất của chúng, nên trong cùng một lượng vật chất, nó không thể lớn hơn hoặc nhỏ hơn, tôi nghiêng về ý kiến rằng sự bay lên này phát sinh từ sự loãng hóa vật chất trong đuôi sao chổi.

Khói bay lên trong ống khói là nhờ lực đẩy của không khí mà nó mắc vào. Không khí được nhiệt làm loãng bay lên, vì trọng lực riêng của nó giảm, và trong lúc bay lên, nó mang theo khói. Vì sao đuôi sao chổi lại không thể bay lên khỏi Mặt Trời theo cùng cách?

Các tia Mặt Trời không tác dụng lên những môi trường mà chúng xuyên qua, ngoài việc phản chiếu và khúc xạ. Những hạt phản chiếu, được nung nóng bởi tác dụng ấy, lại làm nóng vật chất aether đi cùng chúng. Vật chất ấy bị loãng hóa bởi nhiệt mà nó thu được. Vì trọng lực riêng mà trước đó nó có xu hướng hướng về Mặt Trời đã giảm đi, nó sẽ bay lên khỏi Mặt Trời và mang theo các hạt phản chiếu tạo thành đuôi sao chổi.

Sự bay lên của hơi nước còn được thúc đẩy bởi chuyển động quanh Mặt Trời. Vì chuyển động ấy, chúng cố rời khỏi Mặt Trời, trong khi khí quyển Mặt Trời và vật chất khác trên bầu trời hoặc hoàn toàn đứng yên, hoặc chỉ chuyển động quanh Mặt Trời chậm hơn, do quay của Mặt Trời sinh ra.

Đây là những nguyên nhân khiến đuôi sao chổi bay lên trong lân cận Mặt Trời, nơi quỹ đạo chúng cong mạnh hơn, còn sao chổi tiến vào những phần đậm đặc hơn, nặng hơn của khí quyển Mặt Trời. Vì vậy, chúng lúc ấy phát ra những đuôi có độ dài khổng lồ. Những đuôi vừa phát sinh, vì giữ chuyển động riêng và đồng thời bị hút về Mặt Trời, phải quay trong các elip quanh Mặt Trời giống như các đầu; bằng chuyển động ấy, chúng luôn đi cùng các đầu và tự do bám vào chúng.

Lực hút của hơi nước về phía Mặt Trời không thể buộc đuôi rời bỏ đầu và rơi xuống Mặt Trời, cũng như lực hút của các đầu không thể buộc chúng rơi khỏi đuôi. Vì lực hút chung, chúng hoặc cùng rơi về phía Mặt Trời, hoặc cùng bị làm chậm trong sự bay lên khỏi Mặt Trời. Vì vậy, dù do những nguyên nhân đã nêu hay do nguyên nhân khác, đầu và đuôi sao chổi có thể dễ dàng đạt và giữ bất kỳ vị trí nào tương đối với nhau, không bị lực hút chung làm nhiễu hay ngăn trở.

Những đuôi phát sinh tại các vị trí cận điểm Mặt Trời sẽ đi cùng đầu vào các vùng rất xa. Cùng với đầu, chúng sẽ hoặc trở lại với chúng ta sau một hành trình dài nhiều năm, hoặc được loãng hóa ở đó và dần dần hoàn toàn tan biến. Sau đó, khi các đầu đi xuống phía Mặt Trời, những đuôi ngắn mới lại phát ra từ đầu với chuyển động chậm; các đuôi ấy sẽ tăng lên rất nhiều, nhất là với những sao chổi mà ở cận điểm Mặt Trời chúng đi xuống thấp đến tận khí quyển Mặt Trời. Mọi hơi nước trong những không gian tự do ấy ở trạng thái loãng hóa và giãn nở vĩnh viễn. Vì vậy, đuôi của mọi sao chổi rộng hơn ở đầu trên so với gần đầu sao.

Không có gì bất khả nếu hơi nước, liên tục bị loãng hóa và giãn nở như vậy, cuối cùng bị khuếch tán và phân tán khắp bầu trời, rồi từ từ bị trọng lực hút về các hành tinh và trộn lẫn với khí quyển của chúng. Biển là cần thiết tuyệt đối cho cấu tạo Trái Đất ta; vì thế, Mặt Trời, nhờ nhiệt của nó, có thể thở ra một lượng hơi nước đủ. Hơi nước ấy, tụ lại thành mây, có thể rơi thành mưa để tưới Trái Đất, cũng như để tạo ra và nuôi dưỡng thực vật; hoặc, khi bị lạnh ngưng tụ trên đỉnh núi, như một số nhà triết học có lý do cho rằng, có thể chảy xuống thành suối và sông.

Vì vậy, để bảo toàn các biển và chất lỏng của các hành tinh, dường như cần tới sao chổi, để từ hơi thải và hơi nước ngưng tụ của chúng, các chất lỏng của hành tinh đã bị tiêu hao cho thực vật và sự thối rữa, rồi chuyển thành đất khô, luôn được bổ sung lại. Mọi thực vật hoàn toàn lấy sự tăng trưởng của mình từ chất lỏng, rồi sau đó, ở mức độ lớn, được biến thành đất khô bởi sự thối rữa; một loại nhầy luôn lắng đọng ở đáy chất lỏng đã thối rữa. Vì vậy, khối lượng đất rắn không ngừng tăng; còn nếu chất lỏng không được cung cấp từ bên ngoài, chúng sẽ giảm liên tục và cuối cùng hoàn toàn cạn.

Tôi còn nghi ngờ rằng phần lớn linh hồn đến từ sao chổi. Linh hồn là phần nhỏ nhất, nhưng tinh tế và hữu ích nhất của không khí ta, và cần thiết đến mức duy trì sự sống của mọi vật thể ở nơi chúng ta.

Khí quyển sao chổi, khi đi xuống phía Mặt Trời và tràn ra thành đuôi, bị tiêu hao, nhỏ đi và trở nên hẹp hơn, ít nhất ở phía hướng về Mặt Trời. Khi lùi khỏi Mặt Trời, chúng ít tràn ra thành đuôi hơn, nên lại nới rộng, nếu Hevelius đã mô tả đúng những hiện tượng ấy. Nhưng chúng ít được nhìn thấy nhất ngay sau khi bị Mặt Trời nung nóng mạnh nhất, và cũng chính lúc ấy chúng phát ra những đuôi dài và rực rỡ nhất. Có lẽ cùng lúc ấy, các nhân được bao quanh bởi một lớp khói đậm và đen hơn ở những phần thấp nhất của khí quyển, vì khói bị nhiệt lớn và mãnh liệt nâng lên thường đậm và đen hơn.

Vì vậy, đầu sao chổi mà chúng ta đang mô tả, ở những khoảng cách bằng nhau từ Mặt Trời và Trái Đất, trông tối hơn sau khi đi qua cận điểm Mặt Trời so với trước đó. Trong tháng Mười hai, nó thường được so với các sao cấp ba, nhưng trong tháng Mười một, nó được so với các sao cấp một hoặc hai; những người nhìn thấy cả hai hiện tượng ấy đã mô tả hiện tượng đầu tiên như một sao chổi khác và lớn hơn hiện tượng thứ hai.

Ngày $19$ tháng Mười một, một người trẻ ở Cambridge thấy sao chổi này, dù ánh sáng nhợt và mờ, nhưng còn bằng sao Spica ở Xử Nữ; lúc ấy nó sáng hơn sau đó. Montenari, ngày $20$ tháng Mười một và những ngày sau đó, quan sát nó lớn hơn các sao cấp một, khi đuôi dài khoảng

$$
2^\circ.
$$

Ông Storer, trong những bức thư đã đến tay tôi, viết rằng vào tháng Mười hai, khi đuôi có khối lượng và sự rực rỡ lớn nhất, đầu chỉ nhỏ và nhỏ hơn nhiều so với đầu đã thấy vào tháng Mười một trước khi Mặt Trời mọc. Ông đoán nguyên nhân của hiện tượng là lúc đầu có lượng vật chất lớn hơn, sau đó lượng ấy dần bị tiêu hao.

Tôi còn thấy rằng đầu những sao chổi khác, vốn phát ra những đuôi có khối lượng và sự rực rỡ lớn nhất, lại xuất hiện mờ và nhỏ. Tại Brazil, ngày $5$ tháng Ba năm $1668$, lúc $7$ giờ tối, Valentin Estatius thấy một sao chổi gần đường chân trời, ở phía tây nam, với đầu nhỏ đến mức gần như không thể nhận ra, nhưng có một đuôi rực rỡ vượt mức. Ánh sáng phản chiếu từ đuôi trên mặt biển dễ dàng được người đứng bờ nhìn thấy; nó trông như một tia lửa kéo dài

$$
23^\circ
$$

từ tây sang nam, gần như song song với đường chân trời.

Sự rực rỡ quá mức ấy chỉ kéo dài ba ngày, rồi giảm nhanh. Trong lúc sự rực rỡ giảm, khối lượng của đuôi lại tăng; vì vậy, người ta nói rằng ở Bồ Đào Nha đuôi chiếm một phần tư bầu trời, tức

$$
45^\circ,
$$

kéo dài từ tây sang đông với sự rực rỡ đáng chú ý, dù toàn bộ đuôi không nhìn thấy ở những phần ấy, vì đầu luôn bị đường chân trời che khuất. Từ việc khối lượng đuôi tăng và sự rực rỡ giảm, có thể thấy đầu lúc ấy đang rời xa Mặt Trời và trước đó đã ở rất gần Mặt Trời tại cận điểm, giống sao chổi năm $1680$.

Trong *Biên niên sử Saxony*, ta đọc về một sao chổi tương tự xuất hiện năm $1106$, có đầu nhỏ và mờ, như đầu sao chổi năm $1680$, nhưng đuôi rất sáng, giống một tia lửa khổng lồ kéo dài theo hướng giữa đông và bắc, như Hevelius cũng dẫn lại từ Simeon, nhà sư ở Durham. Sao chổi này xuất hiện vào đầu tháng Hai, vào khoảng buổi chiều, ở phía tây nam của bầu trời. Từ đó, và từ vị trí của đuôi, ta suy ra đầu nó ở gần Mặt Trời.

Matthew Paris viết rằng nó cách Mặt Trời khoảng một cubit, từ ba giờ, hoặc sáu giờ, cho tới chín giờ, và phát ra một đuôi dài. Sao chổi rực rỡ nhất mà Aristotle mô tả trong *Meteorologica*, Quyển I, chương $6$, cũng như vậy. Đầu nó không thể nhìn thấy, vì nó đã lặn trước Mặt Trời, hoặc ít nhất bị che khuất dưới tia Mặt Trời; nhưng ngày hôm sau nó được nhìn thấy, dù chỉ như một vật thể rất mờ, vì sau khi rời Mặt Trời chỉ một khoảng rất ngắn, nó lặn ngay sau Mặt Trời. Ánh sáng rải rác của đầu, bị che bởi sự rực rỡ quá lớn của đuôi, chưa xuất hiện.

Sau đó, theo Aristotle, khi sự rực rỡ của đuôi đã giảm, sao chổi lấy lại độ sáng vốn có; và độ rực rỡ của đuôi bây giờ đạt tới một phần ba bầu trời, tức

$$
60^\circ.
$$

Hiện tượng này xảy ra vào mùa đông, năm thứ $4$ Đại hội Olympic $101$, và khi nó lên tới thắt lưng Orion, nó biến mất ở đó.

Đúng là sao chổi năm $1618$, khi mới xuất hiện trực tiếp từ dưới tia Mặt Trời với một đuôi rất lớn, trông như ngang với, thậm chí vượt, các sao cấp một. Nhưng còn nhiều sao chổi khác xuất hiện còn lớn hơn, lại có đuôi ngắn hơn; có những sao được nói là lớn bằng sao Mộc, số khác lớn bằng sao Kim, thậm chí bằng Mặt Trăng.

Ta đã nói sao chổi là một loại hành tinh quay trong các quỹ đạo rất lệch tâm quanh Mặt Trời. Cũng như trong các hành tinh không có đuôi, những hành tinh quay trong các quỹ đạo nhỏ hơn và ở gần Mặt Trời hơn thường nhỏ hơn, với sao chổi, có thể nói những sao chổi tại cận điểm Mặt Trời tiến gần Mặt Trời hơn thường có cỡ lớn nhỏ hơn, để chúng không làm Mặt Trời bị khuấy động quá mạnh bởi lực hút của mình.

Còn các đường kính vuông góc của quỹ đạo chúng và thời gian tuần hoàn, tôi để người đọc xác định bằng cách so sánh các sao chổi với nhau, những sao chổi sau những khoảng thời gian dài lại trở về cùng một quỹ đạo. Trong lúc đó, Proposition tiếp theo có thể làm sáng ra điều ấy.