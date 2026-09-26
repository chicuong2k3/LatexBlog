---
title: "Sách I, Phần I (tiếp): Phương pháp và công thức truy hồi"
summary: "Tiếp nối Phần I của Liber Primus: phương pháp xác định anomalia, các ví dụ số, phương trình vi phân, phương trình tâm cực đại, chuyển động parabol và các đại lượng phụ của hyperbol."
slug: "liber-primus-phan-i-tiep"
number: 2
---

# Liber Primus, Phần I (tiếp)

<!-- Nguồn: PDF 30–61, bắt đầu tại trang in 13. Bản dịch đang được soạn; Section I kết thúc ở PDF 61, Section II bắt đầu ở PDF 62. -->

<!-- PDF 30, trang in 13, §14 -->

## §14

Để suy ra anomalia thật và bán kính vectơ từ anomalia tâm sai, phương trình của Điều 8 cung cấp nhiều phương pháp. Ta sẽ trình bày những phương pháp tốt nhất.

### Phương pháp I

Theo phương pháp thông thường, $\nu$ được xác định bằng phương trình VII, rồi $r$ được xác định bằng phương trình II. Với ví dụ ở Điều trước, nếu lấy lại giá trị $p$ đã nêu, ta có:

```text
E/2 = 162° 8' 14'',75
log tan(E/2) .............. 9,5082198 n
log tan(45° − φ/2) ........ 9,8912427
log tan(ν/2) .............. 9,6169771 n
ν/2 = 157°30'41'',50
ν = 315° 1'23'',00
```

Mặt khác,

```text
log e ..................... 9,5897262
log cos ν ................. 9,8496597
                         9,2393859
e cos ν = 0,1753545
log p ..................... 0,3954837
log(1 + e cos ν) .......... 0,0694959
log r ..................... 0,3259878
```

### Phương pháp II

Phương pháp sau ngắn hơn, nhất là khi cần tính nhiều vị trí: chỉ phải tính một lần các logarithm không đổi của $\sqrt{a(1+e)}$ và $\sqrt{a(1-e)}$. Từ phương trình V và VI:

   $$
   \sin\frac{\nu}{2}\sqrt r
   =\sin\frac E2\sqrt{a(1+e)},
   $$

   $$
   \cos\frac{\nu}{2}\sqrt r
   =\cos\frac E2\sqrt{a(1-e)}.
   $$

   Từ đó nhanh chóng xác định được $\nu$ và $\log\sqrt r$.

Nói chung, nếu có

   $$
   P\sin Q=A,\qquad P\cos Q=B,
   $$

   thì $Q$ được xác định bằng

   $$
   \tan Q=\frac AB.
   $$

   Sau đó có thể lấy

   $$
   P=\frac A{\sin Q}
   $$

   hoặc

   $$
   P=\frac B{\cos Q}.
   $$

   Nên dùng công thức trước khi $\sin Q$ lớn hơn $\cos Q$, và dùng công thức sau khi $\cos Q$ lớn hơn $\sin Q$.

Trong phần lớn các bài toán dẫn đến những phương trình như vậy, có điều kiện ngầm rằng $P$ phải dương. Khi ấy, việc phải chọn $Q$ giữa $0^\circ$ và $180^\circ$, hay giữa $180^\circ$ và $360^\circ$, tự động được giải quyết. Nếu không có điều kiện ấy, việc xác định còn phụ thuộc vào lựa chọn của ta.

Trong ví dụ của chúng ta:

```text
e = 0,2453162
log sin(E/2) .............. 9,4867652
log cos(E/2) .............. 9,9785454 n
log √(a(1+e)) ............. 0,2588595
log √(a(1−e)) ............. 0,1501020
```

<!-- PDF 31, trang in 14, tiếp theo §14-§15 -->

Từ đó:

```text
log sin(ν/2)√r ............ 9,7456225
log tan(ν/2) .............. 9,6169771 n
log cos(ν/2)√r ............ 0,1286454 n
ν/2 = 157°30'41'',50
ν = 315° 1'23'',00
log √r .................... 0,1629939
log r ..................... 0,3259878
```

### Phương pháp III

Ta có thể thêm một phương pháp thứ ba, cũng gần như nhanh bằng phương pháp thứ hai, nhưng nếu cần độ chính xác cao thì thường được ưu tiên. Trước hết xác định $r$ bằng phương trình III, rồi xác định $\nu$ bằng phương trình X.

```text
log e ..................... 9,5897262
log cos E ................. 9,9094637
                         9,2991899
e cos E = 0,1991544
log a ..................... 0,4224389
log(1 − e cos E) .......... 9,9035488
log r ..................... 0,3259877
log sin E ................. 9,7663366 n
log √(1 − e cos E) ........ 9,9517744
                         9,8145632 n
log sin(φ/2) .............. 9,0920395
log sin((ν−E)/2) .......... 8,9066017 n
(ν−E)/2 = −4°37'35'',24
ν−E = −9°15'6'',48
ν = 315° 1'23'',02
```

Để xác nhận phép tính, công thức VIII hoặc IX rất thuận tiện, nhất là khi $\nu$ và $r$ đã được xác định bằng phương pháp thứ ba.

```text
log(a/r) sin E ........... 9,8627878 n
log cos φ ............... 9,9865224
                         9,8493102 n
log sin(ν−E) ............ 9,8493102 n
log sin E √(a/r) ........ 9,8145632 n
log cos(φ/2) ............ 9,9966567
                         9,8112189 n
log sin((ν+E)/2) ........ 9,8112189 n
```

## §15

Khi anomalia trung bình $M$ đã được xác định, và do đó $\nu$ cùng $\varphi$ cũng đã được xác định hoàn toàn, vì $\nu$ là hàm của $M$ và $\varphi$; nếu xem cả ba đại lượng là biến thiên, giữa các biến thiên vi phân của chúng phải tồn tại một phương trình có điều kiện. Việc nghiên cứu phương trình ấy không thừa.

Vi phân hóa phương trình VII của Điều 8, ta được

   $$
   \frac{dE}{\sin E}
   =\frac{d\nu}{\sin\nu}
   \frac{d\varphi}{\cos\varphi}.
   $$

   Vi phân hóa phương trình XII:

   $$
   dM=(1-e\cos E)\,dE-\sin E\cos\varphi\,d\varphi.
   $$

   Khửa $dE$ giữa hai phương trình này, ta được

   $$
   dM=
   \frac{\sin E(1-e\cos E)}{\sin\nu}\,d\nu
   -
   \left(
   \sin E\cos\varphi+
   \frac{\sin E(1-e\cos E)}{\cos\varphi}
   \right)d\varphi.
   $$

Thay $\sin E$, $1-e\cos E$ bằng các giá trị của chúng từ phương trình VIII và III:

   $$
   dM=
   \frac{rr}{aa\cos\varphi}\,d\nu
   -
   \frac{r(r+p)\sin\nu}{aa\cos^2\varphi}\,d\varphi.
   $$

Nếu biểu thị hệ số của $\nu$ và $\varphi$ theo cách khác, ta có

   $$
   dM=
   \frac{\cos^2\varphi}{(1+e\cos\nu)^2}\,d\nu
   -
   \frac{(2+e\cos\nu)\sin\nu\cos^2\varphi}
        {(1+e\cos\nu)^2}\,d\varphi.
   $$

Ngược lại, nếu xem $\nu$ là hàm của $M$ và $\varphi$, ta được

   $$
   d\nu=
   \frac{aa\cos\varphi}{rr}\,dM
   +
   \frac{(2+e\cos\nu)\sin\nu}{\cos\varphi}\,d\varphi.
   $$

Đưa $E$ vào thay cho $\nu$, ta có

   $$
   d\nu=
   \frac{aa\cos\varphi}{rr}\,dM+
   \frac{aa}{rr}(2-e\cos E-ee)\sin E\,d\varphi.
   $$

<!-- PDF 32, trang in 15, tiếp theo §15-§16 -->

## §16

Bán kính vectơ $r$ chưa được xác định hoàn toàn qua $\nu,\varphi$, hay qua $M,\varphi$, vì nó còn phụ thuộc vào $p$ hoặc $a$. Vì vậy, vi phân của nó sẽ có ba thành phần.

Vi phân hóa phương trình II của Điều 8:

   $$
   \frac{dr}{r}
   =
   \frac{dp}{p}
   +
   \frac{e\sin\nu}{1+e\cos\nu}\,d\nu
   -
   \frac{\cos\varphi\cos\nu}{1+e\cos\nu}\,d\varphi.
   $$

Đặt

   $$
   \frac{dp}{p}=\frac{da}{a}-2\tan\varphi\,d\varphi,
   $$

   rồi thay $d\nu$ bằng biểu thức theo $dM,d\varphi$, sau khi rút gọn, ta được

   $$
   \frac{dr}{r}
   =
   \frac{da}{a}
   +
   \frac{a}{r}\tan\varphi\sin\nu\,dM
   -
   \frac{a}{r}\cos\varphi\cos\nu\,d\varphi.
   $$

   Do đó

   $$
   dr=\frac{r}{a}\,da+a\tan\varphi\sin\nu\,dM
   -a\cos\varphi\cos\nu\,d\varphi.
   $$

Các công thức này, cũng như các công thức ở Điều trước, giả thiết rằng $\nu,\varphi,M$ được biểu thị bằng $d\nu,d\varphi,dM$ tính theo bán kính. Nếu biến thiên của các góc $\nu,\varphi,M$ được biểu thị bằng giây, thì phải chia các thành phần chứa $d\nu,d\varphi$ cho $206264{,}7$, hoặc nhân các thành phần chứa $dr,dp,da$ với cùng số ấy. Vì vậy, các công thức trước, vốn đồng nhất theo nghĩa này, không cần sửa đổi.

<!-- PDF 33, trang in 16, §17 -->

## §17

Sẽ không tiếc nếu ta dành ít chút thời gian để nghiên cứu phương trình tâm cực đại.

Trước hết, dễ dàng thấy hiệu giữa anomalia tâm sai và anomalia trung bình lớn nhất tại $E=90^\circ$, khi ấy

   $$
   e\sin E=e.
   $$

   Bán kính vectơ tại điểm ấy là $a$, nên $\nu=90^\circ+\varphi$. Vì vậy, toàn bộ phương trình tâm là $\varphi+e$, nhưng đây chưa phải giá trị lớn nhất, vì hiệu giữa $\nu$ và $E$ còn có thể tăng quá $\varphi$.

Hiệu giữa ấy đạt cực đại khi

   $$
   d(\nu-E)=0,
   $$

   tức là $d\nu=dE$, với tâm sai được xem là không đổi. Vì nói chung

   $$
   \frac{d\nu}{\sin\nu}=\frac{dE}{\sin E},
   $$

   nên tại điểm mà hiệu giữa $\nu$ và $E$ lớn nhất, ta phải có

   $$
   \sin\nu=\sin E.
   $$

Theo phương trình VIII và III:

   $$
   r=a\cos\varphi,\qquad e\cos E=1-\cos\varphi,
   $$

   và do đó

   $$
   \cos E=1+\tan\frac\varphi2.
   $$

   Suy ra

   $$
   \cos\nu=-\tan\frac\varphi2.
   $$

   Vì thế, theo chú thích của nguồn, $\nu=90^\circ+\arcsin\tan(\varphi/2)$ và

   $$
   E=90^\circ-\arcsin\tan(\varphi/2).
   $$

Khi đó

   $$
   \sin E
   =\sqrt{1-\tan^2\frac\varphi2}
   =\frac{\sqrt{\cos\varphi}}{\cos\frac\varphi2},
   $$

   nên toàn bộ phương trình tâm tại điểm ấy là

   $$
   2\arcsin\left(
   \tan\frac\varphi2
   +2\sin\frac\varphi2\sqrt{\cos\varphi}
   \right),
   $$

   với phần thứ hai biểu thị bằng độ.

Tại điểm mà bản thân phương trình tâm đạt cực đại, ta phải có $d\nu=dM$. Theo Điều 15, $r=a\sqrt{\cos\varphi}$. Suy ra

   $$
   \cos\nu
   =-\frac{1-\cos^2\varphi}{e}
   =-\frac{1-\cos^2\varphi}{\sqrt{1-\cos^2\varphi}},
   $$

   và

   $$
   \cos E
   =\frac{1-\sqrt{\cos\varphi}}{1+\sqrt{\cos\varphi}}.
   $$

   Do đó, theo phương trình IV, có thể xác định $E$ với độ chính xác cao nhất. Khi đã biết $E$, phương trình tâm theo phương trình X và XII là

   $$
   2\arcsin\left(
   \frac{\sin(\varphi/2)\sin E}{\sqrt{\cos\varphi}}
   +e\sin E
   \right).
   $$

Chúng ta không dừng lại ở đây với biểu thức bằng chuỗi lũy thừa của tâm sai mà nhiều tác giả đã đưa ra. Để có ví dụ, ta thêm bảng ba cực đại mà chúng ta đã tính, với tâm sai theo các thành phần mới nhất được giả là $0{,}2554996$.

| Cực đại | $E$ | $E-M$ | $\nu-E$ | $\nu-M$ |
|---|---:|---:|---:|---:|
| $E-M$ | $90^\circ00'00''$ | $14^\circ38'20'',57$ | $14^\circ48'11'',48$ | $29^\circ26'32'',05$ |
| $\nu-E$ | $82^\circ32'09''$ | $14^\circ30'54'',01$ | $14^\circ55'41'',79$ | $29^\circ26'35'',80$ |
| $\nu-M$ | $86^\circ14'40''$ | $14^\circ36'27'',39$ | $14^\circ55'49'',57$ | $29^\circ30'16'',96$ |

> **) Không cần xét những cực đại nằm giữa aphelium và perihelium, vì rõ ràng chúng chỉ khác những cực đại nằm giữa perihelium và aphelium ở dấu của chúng.**

<!-- PDF 34, trang in 17, §18-§19 -->

## §18

Trong parabol, anomalia tâm sai, anomalia trung bình và chuyển động trung bình đều bằng $0$. Vì vậy, các khái niệm ấy không thể được dùng để so sánh chuyển động với thời gian trong trường hợp này.

Tuy nhiên, để tích phân $rr\,d\nu$, ta vẫn cần dùng một góc phụ. Ta có

   $$
   rr\,d\nu
   =
   \frac{pp\,d\nu}{4\cos^2\frac\nu2}
   =
   \frac{pp}{2\cos^2\frac\nu2}\,d\tan\frac\nu2
   $$

   và

   $$
   \int rr\,d\nu
   =
   \frac12pp\left(
   \tan\frac\nu2+\frac12\tan\frac\nu2\tan^2\frac\nu2
   \right)+\text{Const.}
   $$

Nếu thời gian bắt đầu từ lúc đi qua perihelium, hằng số bằng $0$, và ta có

   $$
   \tan\frac\nu2+\frac12\tan^3\frac\nu2
   =
   \frac{2tk\sqrt{1+\mu}}{p^{3/2}}.
   $$

Từ đây có thể suy ra $t$ từ $\nu$, hoặc $\nu$ từ $t$, ngay khi $p$ và $\mu$ đã biết. Trong các thành phần parabol, bán kính vectơ tại perihelium là $\frac12p$, còn khối lượng $\mu$ thường được bỏ qua hoàn toàn.

Khó có thể xác định khối lượng của vật thể mà quỹ đạo được tính như một parabol. Từ những quan sát tốt nhất và mới nhất, mọi sao chổi dường như có mật độ và khối lượng nhỏ đến mức có thể coi là không đáng kể và bỏ qua an toàn.

## §19

Lời giải bài toán suy ra thời gian từ anomalia thật, và đặc biệt là lời giải bài toán nghịch đảo, có thể được rút ngắn đáng kể bằng một bảng trợ giúp như những bảng thường thấy trong nhiều sách thiên văn. Thuận tiện nhất là **bảng Barker**, được kèm theo công trình xuất sắc của Olbers, *Abhandlung über die leichteste und bequemste Methode die Bahn eines Cometen zu berechnen*, Weimar, 1797.

Bảng chứa, cho mọi anomalia thật từ $0$ đến $180^\circ$, cứ mỗi năm phút, giá trị của biểu thức

   $$
   \frac32\tan\frac\varphi2+\frac52\tan^3\frac\varphi2
   $$

   dưới tên **chuyển động trung bình**.

Nếu cần tìm thời gian ứng với anomalia thật $\nu$, ta chia chuyển động trung bình lấy từ bảng theo đối số

   $$
   \frac{150k}{p^{3/2}},
   $$

   trong đó $\frac{150k}{p^{3/2}}$ là chuyển động trung bình mỗi ngày. Ngược lại, nếu thời gian đã biết và cần tính anomalia thật, ta nhân thời gian ấy, biểu thị bằng ngày, với $\frac{150k}{p^{3/2}}$ để lấy chuyển động trung bình, rồi tra bảng để tìm anomalia tương ứng.

Rõ ràng, giá trị âm của $\nu$ cũng nhận một chuyển động trung bình và một thời gian cùng có dấu âm; vì vậy, cùng một bảng phục vụ cho các anomalia âm và dương như nhau.

Nếu $\frac12p=q$ là khoảng cách tại perihelium, thì chuyển động trung bình mỗi ngày được biểu thị bằng

   $$
   \frac{k\sqrt2}{q^{3/2}},
   $$

   trong đó hằng số $\frac{k\sqrt2}{q^{3/2}}$ có giá trị $0{,}912279061$ và logarithm của nó là $9{,}9601277069$. Khi đã biết anomalia $\nu$, bán kính vectơ được xác định bằng công thức đã nêu:

   $$
   r=\frac{q}{\cos^2\frac\nu2}.
   $$

<!-- PDF 35, trang in 18, §20 -->

## §20

Vi phân hóa phương trình

   $$
   \tan\frac\nu2+\frac12\tan^3\frac\nu2
   =2tkp^{-3/2},
   $$

   với $\nu,t,p$ đều là biến thiên, ta được

   $$
   \frac{d\nu}{2\cos^2\frac\nu2}
   =
   2kp^{-3/2}\,dt
   -
   3tkp^{-1/2}\,dp,
   $$

   hay

   $$
   d\nu=
   \frac{k\sqrt p}{rr}\,dt
   -
   \frac{3tk}{2rr\sqrt p}\,dp.
   $$

Nếu biến thiên của các góc được biểu thị bằng giây, cả hai vế phải được xử lý như ở Điều 6; khi ấy $k$ phải lấy giá trị $5548'',188$. Nếu đặt $\frac12p=q$, công thức trở thành

   $$
   d\nu=
   \frac{k\sqrt{2q}}{rr}\,dt
   -
   \frac{3kt}{rr\sqrt{2q}}\,dq.
   $$

Các logarithm không đổi cần dùng ở đây là

   $$
   \log(k\sqrt2)=3{,}7005215724,
   $$

   $$
   \log(3k\sqrt{1/2})=3{,}8766128315.
   $$

Từ việc vi phân hóa

   $$
   r=\frac{p}{2\cos^2\frac\nu2},
   $$

   ta được

   $$
   \frac{dr}{r}
   =
   -\frac{dp}{p}
   +
   \tan\frac\nu2\,d\nu,
   $$

   sau khi thay $d\nu$ bằng $dt,dp$. Do đó

   $$
   \frac{dr}{r}
   =
   \left(
   \frac1p-\frac{3kt\tan(\nu/2)}{2rr\sqrt{2q}}
   \right)dp
   +
   \frac{k\sqrt p\tan(\nu/2)}{rr}\,dt.
   $$

Thay $t$ bằng giá trị biểu thị bằng $\nu$ ở trên, hệ số của $dt$ trở thành

   $$
   -\frac{1}{r\sqrt p}.
   $$

Do đó

   $$
   dr=\frac12\cos\nu\,dq
   +\frac{k\sin\nu}{\sqrt p}\,dt.
   $$

<!-- PDF 36, trang in 19, §21 -->

## §21

Trong hyperbol, $\varphi$ và $E$ trở thành các đại lượng ảo; thay vào đó, ta đưa vào những đại lượng phụ khác. Ta đã gọi $\psi$ là góc có $\cos\psi=\frac1e$. Bán kính vectơ là

   $$
   r=
   \frac{p}
   {2e\cos\frac12(\nu-\psi)\cos\frac12(\nu+\psi)}.
   $$

   Đặt

   $$
   u=
   \frac{\cos\frac12(\nu-\psi)}
        {\cos\frac12(\nu+\psi)}.
   $$

Khi ấy $u=0$ tại perihelium và tăng vô hùng khi $\nu$ tiến tới $180^\circ-\psi$; nó giảm vô hùng khi $\nu$ tiến tới $-(180^\circ-\psi)$. Vì vậy, các giá trị đối xứng của $\nu$ cho những giá trị đối ứng của $u$, và các logarithm của chúng có dấu đối.

Góc phụ thuận tiện cho hyperbol là $F$, thỏa mãn

   $$
   \tan\frac F2
   =
   \sqrt{\frac{e-1}{e+1}}.
   $$

Nó tương ứng với $\frac12\varphi$ trong elip. Từ đó dễ dàng thiết lập các quan hệ giữa $u,r,u,F$; nếu đặt $a=-b$, thì $b$ luôn dương.

1. $b=p\cot\varphi$.
2. $r=\frac{p}{1+e\cos\nu}=\frac{p\cos\psi}{2\cos\frac12(\nu-\psi)\cos\frac12(\nu+\psi)}$.
3. $\tan\frac F2=\tan\frac\nu2\sqrt{\frac{e-1}{e+1}}=\tan\frac\nu2\tan\frac\psi2=\frac{u-1}{u+1}$.
4. $u=\frac{\cos\frac12(\nu-\psi)}{\cos\frac12(\nu+\psi)}=\frac{1+\tan\frac F2}{1-\tan\frac F2}=\tan(45^\circ+\frac F2)$.
5. $\frac1{\cos F}=\frac12\left(u+\frac1u\right)=\frac{(1+\cos\psi)\cos\nu}{2\cos\frac12(\nu-\psi)\cos\frac12(\nu+\psi)}=\frac{e+\cos\nu}{1+e\cos\nu}$.

Trừ phương trình V vào phương trình I, ta được [phần tiếp theo ở PDF 37].

<!-- PDF 37, trang in 20, tiếp theo §21-§22 -->

Từ các phương trình trên:

$$
\sin\frac\nu2\sqrt r
=
\sin\frac F2\sqrt{\frac{p}{(e-1)\cos F}}
=
\sin\frac F2\sqrt{\frac{(e+1)b}{\cos F}}
=
\frac12(u-1)\sqrt{\frac{p}{(e-1)u}}
=
\frac12(u-1)\sqrt{\frac{(e+1)b}{u}}.
$$

Tương tự,

$$
\cos\frac\nu2\sqrt r
=
\cos\frac F2\sqrt{\frac{p}{(e+1)\cos F}}
=
\frac12(u+1)\sqrt{\frac{(e+1)b}{u}}.
$$

Từ VI và VII, cũng như III, ta có

$$
r\sin\nu
=
p\cot\psi\tan F
=
b\tan\psi\tan F
=
\frac12b\cot\psi\left(u-\frac1u\right)
=
\frac12b\tan\psi\left(u-\frac1u\right).
$$

Từ cách kết hợp phương trình II và V, ta suy ra

$$
r\cos\nu
=
b\left(e-\frac1{\cos F}\right)
=
\frac12b\left(2e-u-\frac1u\right),
$$

và

$$
r=b\left(\frac e{\cos F}-1\right)
=\frac12b\left(e\left(u+\frac1u\right)-2\right).
$$

## §22

Vi phân hóa phương trình IV, xem $\psi$ là hằng số, ta được

$$
\frac{du}{u}
=
\frac12\left(
\tan\frac{\nu+\psi}{2}
-
\tan\frac{\nu-\psi}{2}
\right)d\nu
=
\frac{r\tan\psi}{p}\,d\nu.
$$

Do đó

$$
rr\,d\nu=\frac{pr}{u\tan\psi}\,du.
$$

Thay giá trị của $r$ từ phương trình X, rồi tích phân với tích phân bằng $0$ tại perihelium, ta được

$$
\int rr\,d\nu
=
bb\tan\psi
\left(
\frac e2\left(u-\frac1u\right)-\log u
\right)
=
kt\sqrt p\sqrt{1+\mu}
=
kt\tan\psi\sqrt b\sqrt{1+\mu}.
$$

Ở đây các logarithm là logarithm hyperbol. Nếu dùng hệ logarithm Brigg, ta có thể lấy $\log\lambda=9{,}6377843113$ và $\log(\lambda kt)=7{,}8733657527$. Muốn có độ chính xác cao hơn một chút, phải dùng trực tiếp các logarithm hyperbol. Các logarithm hyperbol của tiếp tuyến có trong nhiều tập bảng, chẳng hạn các bảng do Schulze biên soạn, và còn được mở rộng nhiều hơn trong *Magnus Canon Triangulorum logarithmicus* của Ursini tại Bern, Koln, 1624; các bảng ấy tiến triển theo từng $10'$.

Công thức XI còn chỉ ra rằng các giá trị nghịch đảo của $u$, hay các giá trị đối xứng của $F$ và $\nu$, sẽ ứng với các giá trị đối xứng của $t$. Vì vậy, các phần bằng nhau của hyperbol, ở hai phía perihelium và cách perihelium những khoảng thời gian bằng nhau, sẽ được mô tả trong những khoảng thời gian bằng nhau.

<!-- PDF 38, trang in 21, §23-§24 -->

## §23

Nếu dùng đại lượng phụ $u$ để tìm thời gian từ anomalia thật, giá trị của nó được xác định thuận tiện nhất bằng phương trình IV. Sau đó, phương trình II cho ta $p$ theo $r$, hoặc $r$ theo $p$, mà không cần phép tính mới. Khi đã biết $u$, phương trình XI cho ta đại lượng

   $$
   \frac{\lambda kt}{b^{3/2}},
   $$

   là đại lượng tương ứng với anomalia trung bình trong elip. Ta ký hiệu nó là $N$; từ đó suy ra thời gian đã trôi qua kể từ lúc đi qua perihelium.

Nếu gọi phần trước của $N$ là

   $$
   \frac{\lambda e(u^2-1)}{2u},
   $$

   thì theo phương trình VIII, phần này bằng

   $$
   \frac{\lambda r\sin\nu}{b\sin\psi}.
   $$

   Có thể kiểm tra độ chính xác bằng cách tính hai lần đại lượng này; nếu muốn, $N$ cũng có thể được trình bày mà không cần dùng $u$:

   $$
   N=
   \frac{\lambda\tan\psi\sin\nu}
        {2\cos\frac{\nu+\psi}{2}\cos\frac{\nu-\psi}{2}}
   -
   \log\frac{\cos\frac{\nu-\psi}{2}}
              {\cos\frac{\nu+\psi}{2}}.
   $$

Ví dụ. Cho

   $$
   e=1{,}2618820,\qquad
   \psi=37^\circ35'0'',\qquad
   \nu=18^\circ51'0'',\qquad
   \log r=0{,}0333585.
   $$

Khi đó, phép tính $u,p,b,N,t$ diễn ra như sau:

```text
log cos((ν−ψ)/2) ......... 9,9941706
log cos((ν+ψ)/2) ......... 9,9450577
log r ..................... 0,0333585
log 2e ................... 0,4020488
log p ..................... 0,5746356
log cot(ψ/2) ............. 0,2274244
log b ..................... 0,6020600
log u .................... 0,0491129
u ........................ 1,1197289
uu ....................... 1,2537928
```

<!-- PDF 39, trang in 22, tiếp theo §23-§24 -->

Phép tính thay thế cho $N$ cho:

```text
log(r/b) .................. 9,4398985
log sin ν ................. 9,5093258
log λ ..................... 9,6377843
Compl. log sin ψ .......... 0,2147509
                            8,7951395
```

Phần đầu của $N$ là

```text
N = 0,0621069
log u ..................... 0,0491129
log(N) .................... 0,0129910
log λkt ................... 7,8735658
½ log b ................... 0,9030900
```

Một phép tính khác:

```text
log(u²−1) ................. 9,4044795
Compl. log u .............. 9,9508871
log λ ..................... 9,6377843
log(½e) .................... 9,7999888
                            8,7931395
log N ...................... 8,1137429
Differentia ............... 6,9702758
log t ..................... 1,1434671
t ........................ 15,91448
```

## §24

Nếu phép tính được thực hiện bằng các logarithm hyperbol, nên dùng đại lượng phụ $F$, xác định bằng phương trình III; từ đó $N$ xác định bằng phương trình XI. Nửa tham số và bán kính vectơ, hoặc ngược lại, có thể được tính từ đây bằng công thức VIII. Phần thứ hai của $N$ có thể nhân đôi nếu cần, tức là dùng

   $$
   \log\operatorname{hyp}\tan\left(45^\circ+\frac F2\right)
   $$

   và

   $$
   \log\operatorname{hyp}\cos\frac{\nu-\psi}{2}
   -
   \log\operatorname{hyp}\cos\frac{\nu+\psi}{2}.
   $$

Dễ dàng thấy rằng, nếu dùng các logarithm Brigg, đại lượng $N$ ở đây lớn hơn theo tỷ lệ $1:2$ so với trường hợp dùng modulus $\lambda=1$.

Ví dụ được tính theo cách này như sau:

```text
log tan(ψ/2) .............. 9,5518179
log tan(ν/2) .............. 9,2201009
                         9,7719188
log tan(F/2) .............. 8,7519188
log e ..................... 0,1010188
log tan F ................. 9,0543366
                         9,1555554
e tan F ................... 0,14300638
log hyp tan(45°+F/2) ...... 0,11508666
N ........................ 0,02991972
log k ..................... 8,2555814
½ log b ................... 0,9030900
```

Và:

```text
F/2 = 5°15'58'',12
C. log hyp cos((ν−ψ)/2) .. 0,01342966
C. log hyp cos((ν+ψ)/2) .. 0,12650950
Differentia ............... 0,11308664
log N .................... 8,4759575
Differentia ............... 7,5524914
log t .................... 1,1454661
t ........................ 15,91445
```

<!-- PDF 40, trang in 23, §25-§27 -->

## §25

Để giải bài toán nghịch đảo, tức là xác định anomalia thật và bán kính vectơ từ thời gian, trước hết phải từ

   $$
   N=\frac{\lambda kt}{b^{3/2}}
   $$

   theo phương trình XI tìm ra đại lượng phụ $u$ hoặc $F$. Lời giải phương trình siêu bộ này phải được thực hiện bằng cách thử; có thể rút ngắn bằng những thủ thuật tương ứng với những gì đã trình bày ở Điều 11.

Ta sẽ không trình bày đi chi tiết hơn. Không có lý do để trau chuốt kỹ một trường hợp chuyển động hyperbol trên bầu trời, vì có lẽ nó rất hiếm khi xảy ra, và càng không nên làm như vậy so với chuyển động elip. Hơn nữa, mọi trường hợp có thể xảy ra đều có thể được giải bằng một phương pháp khác sẽ trình bày dưới đây.

Khi đã tìm được $F$ hoặc $u$, ta xác định $\nu$ bằng phương trình III, rồi xác định $r$ bằng phương trình II hoặc VIII. Có thể thuận tiện hơn nếu dùng phương trình VI và VII để xác định đồng thời $\nu$ và $r$; nếu muốn, có thể dùng một trong các công thức còn lại để xác nhận phép tính.

## §26

Ví dụ. Giữ nguyên $e$ và $b$ của ví dụ trước, cho

   $$
   t=65{,}41256.
   $$

   Hãy tìm $\nu$ và $r$. Với các logarithm Brigg:

```text
log t ..................... 1,8156598
log(λkt/b^{3/2}) ........... 6,9702768
log N .................... 8,7859356
N ........................ 0,06108514
```

Do đó phương trình

   $$
   \lambda e\tan F-\log\tan\left(45^\circ+\frac F2\right)
   $$

   được thỏa mãn bởi

   $$
   F=25^\circ94'27'',66.
   $$

Từ đó, theo phương trình III:

```text
log tan(F/2) .............. 9,3550120
log tan(ψ/2) .............. 9,5318179
log tan(ν/2) .............. 9,8211941
ν/2 = 33°31'29'',89
ν = 67°2'59'',78
```

Tiếp theo:

```text
C. log cos((ν+ψ)/2) ...... 0,02157476
C. log cos((ν−ψ)/2) ...... 0,01451971
log p/(2e) ................ 9,9735868
log r ..................... 0,2008541
```

## §27

<!-- PDF 41, trang in 24, tiếp theo §27-§28 -->

Nếu vi phân hóa phương trình IV theo cách xem $u,\nu,\psi$ đồng thời là các biến thiên, ta được

$$
\frac{du}{u}
=
\frac{\sin\psi\,d\nu+\sin\nu\,d\psi}
     {2\cos\frac12(\nu-\psi)\cos\frac12(\nu+\psi)}
=
\frac{r\tan\psi}{p}\,d\nu
+
\frac{r\sin\nu}{p\cos\psi}\,d\psi.
$$

Vi phân hóa phương trình XI theo cùng cách, xét các biến thiên vi phân của $u,\psi,N$, ta thu được quan hệ

$$
\frac{dN}{\lambda}
=
\left(
\frac12 e\left(1+\frac1{uu}\right)-\frac1u
\right)du
+
\frac{(uu-1)\sin\psi}{2u\cos\psi^2}\,d\psi,
$$

vì

$$
\frac{dN}{\lambda}
=
\frac{r}{bu}\,du
+
\frac{r\sin\nu}{b\cos\psi}\,d\psi.
$$

Khửa $du$ giữa phương trình này và phương trình trước, ta được

$$
\frac{dN}{\lambda}
=
\frac{rr}{bb\tan\psi}\,d\nu
+
\left(1+\frac rp\right)
\frac{r\sin\nu}{b\cos\psi}\,d\psi.
$$

Do đó

$$
\begin{aligned}
d\nu
&=
\frac{bb\tan\psi}{\lambda rr}\,dN
-
\left(\frac br+\frac bp\right)
\frac{\sin\nu\tan\psi}{\cos\psi}\,d\psi\\
&=
\frac{bb\tan\psi}{\lambda rr}\,dN
-
\left(1+\frac pr\right)
\frac{\sin\nu}{\sin\psi}\,d\psi.
\end{aligned}
$$

## §28

Vi phân hóa phương trình X, xem tất cả $r,b,e,u$ là biến thiên, thay $d e$ bằng

$$
d e=\frac{\sin\psi}{\cos\psi^2}\,d\psi
$$

và khửa $du$ bằng phương trình nói về $dN,du,d\psi$ ở trên, ta được

$$
\begin{aligned}
dr
&=
\frac rb\,db
+
\frac{bb e(uu-1)}{2\lambda ur}\,dN\\
&\quad+
\frac{b}{2\cos\psi^2}
\left\{
\left(u+\frac1u\right)\sin\psi
-
\left(u-\frac1u\right)\sin\nu
\right\}d\psi.
\end{aligned}
$$

Hệ số của $dN$ chuyển thành

$$
\frac{b\sin\nu}{\lambda\sin\psi}
$$

theo phương trình VIII. Hệ số của $d\psi$, sau khi dùng phương trình IV và các đẳng thức

$$
u(\sin\psi-\sin\nu)=\sin(\psi-\nu),
$$

$$
\frac1u(\sin\psi+\sin\nu)=\sin(\psi+\nu),
$$

trở thành

$$
\frac{b\sin\psi\cos\nu}{\cos\psi^2}
=
\frac{p\cos\nu}{\sin\psi}.
$$

Vì vậy,

$$
dr
=
\frac rb\,db
+
\frac{b\sin\nu}{\lambda\sin\psi}\,dN
+
\frac{p\cos\nu}{\sin\psi}\,d\psi.
$$

Vì $N$ được xem là hàm của $b$ và $t$, ta có

$$
dN=\frac Nt\,dt-\frac12\frac Nb\,db.
$$

Thay giá trị này, ta sẽ biểu thị được $dr$, và do đó cả $d\nu$ ở Điều trước, bằng $dt,db,d\psi$.

<!-- PDF 42, trang in 25, tiếp theo §28-§29 -->

Điều đã nêu trước đây cũng cần được nhắc lại ở đây: nếu các biến thiên của các góc $\nu$ và $\psi$ được biểu thị bằng giây thay vì bằng các phần của bán kính, thì hoặc mọi số hạng chứa $d\nu,d\psi$ phải được chia cho $206264{,}7$, hoặc mọi số hạng còn lại phải được nhân với số ấy.

## §29

Các đại lượng phụ $\varphi,E,M$ dùng cho elip sẽ nhận những giá trị ảo trong hyperbol. Vì vậy, không nên bỏ qua việc nghiên cứu mối liên hệ giữa chúng với các đại lượng thực đã dùng ở đây. Ta sẽ nêu những quan hệ chủ yếu, dùng $i$ để biểu thị đại lượng ảo $\sqrt{-1}$:

$$
\sin\varphi=e=\frac1{\cos\psi},
$$

$$
\tan\left(45^\circ-\frac12\varphi\right)
=
\sqrt{\frac{1-e}{1+e}}
=
i\sqrt{\frac{e-1}{e+1}}
=
i\tan\frac12\psi,
$$

$$
\tan\varphi
=
\frac12\cot\left(45^\circ-\frac12\varphi\right)
-
\frac12\tan\left(45^\circ-\frac12\varphi\right)
=
-\frac{i}{\sin\psi},
$$

$$
\cos\varphi=i\tan\psi,
$$

$$
\varphi
=
90^\circ+i\log(\sin\varphi+i\cos\varphi)
=
90^\circ-i\log\tan\left(45^\circ+\frac12\psi\right),
$$

$$
\tan\frac E2
=
i\tan\frac F2
=
\frac{i(uu-1)}{u+1},
$$

$$
\frac1{\sin E}
=
\frac12\cot\frac E2+\frac12\tan\frac E2
=
-i\cot F
$$

hoặc

$$
\sin E
=
i\tan F
=
\frac{i(uu-1)}{2u},
$$

$$
\cot E
=
\frac12\cot\frac E2-\frac12\tan\frac E2
=
-\frac{i}{\sin F}
$$

hoặc

$$
\tan E
=
i\sin F
=
\frac{i(uu-1)}{uu+1},
$$

$$
\cos E
=
\frac1{\cos F}
=
\frac{uu+1}{2u},
$$

$$
iE
=
\log(\cos E+i\sin E)
=
\log\frac1u
$$

hoặc

$$
E
=
i\log u
=
i\log\tan\left(45^\circ+\frac12F\right),
$$

$$
M
=
E-e\sin E
=
i\log u-\frac{ie(uu-1)}{2u}
=
-\frac{iN}{\lambda}.
$$

Các logarithm trong những công thức này là logarithm hyperbol.

<!-- PDF 43, trang in 26, §30-§31 -->

## §30

Mọi số ta lấy từ các bảng logarithm và lượng giác đều không có độ chính xác tuyệt đối, mà chỉ gần đúng ở một mức độ xác định. Vì thế, mọi phép tính dựa vào chúng chỉ cho những kết quả gần với sự thật. Trong nhiều trường hợp, các bảng thông thường chính xác đến chữ số thập phân thứ bảy; nghĩa là chúng không bao giờ lệch khỏi sự thật, dù theo chiều dương hay chiều âm, quá nửa đơn vị ở chữ số ấy. Chúng cung cấp độ chính xác hơn mức cần thiết, đến nỗi những sai số không tránh khỏi hoàn toàn không đáng kể. Tuy vậy, rất có thể các sai số của bảng trong những trường hợp riêng biệt gây ảnh hưởng đến mức buộc ta phải hoàn toàn từ bỏ một phương pháp tối ưu và thay bằng phương pháp khác.

Trường hợp ấy cũng có thể xảy ra trong các phép tính mà ta đã trình bày cho đến nay. Miễn là việc xác định mức độ chính xác mà các bảng thông thường cho phép còn thích hợp với mục đích của ta, ta cũng nên đưa ra ở đây một vài nghiên cứu về vấn đề ấy. Dù đây là một đề tài vô cùng trọng đối với người tính toán thực hành và nơi đây không thích hợp để trình bày đầy đủ, chúng ta sẽ đi xa trong việc nghiên cứu ấy đến mức đủ cho mục đích hiện tại; kẻ nào cần thì có thể nghiên cứu sâu thêm và mở rộng nó thành những phép toán khác.

## §31

Bất kỳ logarithm, sin, tan v.v., hay nói chung là bất kỳ đại lượng vô lý nào lấy từ bảng, đều có thể mắc sai số bằng nửa đơn vị ở chữ số cuối cùng. Ta sẽ gọi giới hạn sai số ấy là $\omega$; trong các bảng thông thường, nó bằng

$$
\omega=0{,}00000005.
$$

Nếu một logarithm v.v. không thể lấy trực tiếp từ bảng mà phải dùng nội suy, sai số còn có thể lớn hơn đôi vì hai nguyên nhân.

Trước hết, phần tỷ lệ, tức số lần lấy phần thập phân cuối làm đơn vị, thường không phải là số nguyên, nên người ta thường lấy số nguyên lớn hơn hoặc nhỏ hơn nó một cách gần nhất. Ta thấy sai số vì lý do này có thể tăng, nhưng không đến tận hai lần.

Ta hoàn toàn không tính đến sự tăng sai số theo nguyên nhân này. Không có trở ngại nào cản ta thêm một hoặc hai chữ số thập phân vào phần tỷ lệ ấy. Dễ dàng thấy rằng nếu phần tỷ lệ được biểu thị tuyệt đối chính xác, logarithm nội suy sẽ không mắc sai số lớn hơn các logarithm lấy trực tiếp từ bảng, với điều kiện có thể coi các biến thiên của chúng là đều đặn.

Sai số còn tăng theo một nguyên nhân khác: giả định vừa nêu không hoàn toàn đúng. Ta cũng bỏ qua nguyên nhân ấy, vì tác dụng của sai số bậc hai và các sai số khác trong hầu hết các trường hợp hoàn toàn không đáng kể, nhất là khi dùng những bảng lượng giác xuất sắc do Taylor biên soạn. Hơn nữa, khi sai số ấy tình cờ lớn hơn một chút, ta vẫn có thể dễ dàng tính đến nó.

Ta hãy quy ước rằng trong mọi trường hợp lấy từ bảng, sai số lớn nhất không tránh khỏi bằng $\omega$, và mỗi lượng cần tra cứu, tức là số mà ta cần logarithm của nó, hoặc góc mà ta cần sin, v.v., được xem là chính xác tuyệt đối. Nhưng nếu chính lượng ấy cũng chỉ được biết gần đúng, và biến thiên $\omega'$ của logarithm v.v. được giả sử tương ứng với sai số lớn nhất mà lượng ấy có thể mắc phải, trong đó $\omega'$ có thể được định nghĩa bằng tỷ số vi phân, thì sai số lớn nhất của logarithm tính theo bảng có thể lên tới

<!-- PDF 44, trang in 27, tiếp theo §31-§32 -->

$$
\omega+\omega'.
$$

Ngược lại, nếu lượng cần tra cứu được tính từ một logarithm đã cho bằng sự trợ giúp của các bảng, sai số lớn nhất của nó bằng biến thiên của chính logarithm đó. Biến thiên ấy tương ứng với biến thiên $\omega$ của logarithm nếu logarithm được cho chính xác, hoặc tương ứng với biến thiên $\omega+\omega'$ nếu bản thân logarithm có thể sai đến $\omega'$.

Khó cần phải nhắc rằng $\omega$ và $\omega'$ phải mang cùng dấu.

Nếu nhiều đại lượng được cộng tuyệt đối chính xác trong những giới hạn nhất định, sai số lớn nhất của tổng bằng tổng các sai số lớn nhất của từng số hạng, với cùng dấu. Vì vậy, ngay cả trong phép trừ các đại lượng gần như tuyệt đối chính xác, sai số lớn nhất của hiệu cũng bằng tổng các sai số lớn nhất của các số hạng. Trong phép nhân hoặc chia, sai số lớn nhất của một đại lượng không tuyệt đối chính xác sẽ tăng hoặc giảm theo cùng tỷ số với bản thân đại lượng ấy.

## §32

Bây giờ ta chuyển sang áp dụng những nguyên lý này vào các phép toán hữu ích nhất đã trình bày ở trên.

I. Dùng phương trình VII ở Điều 8 để tính anomalia thật từ anomalia tâm sai trong chuyển động elip, và giả sử $\varphi$ cùng $E$ đã được biết tuyệt đối chính xác, trong hai logarithm

$$
\log\tan\left(45^\circ-\frac12\varphi\right)
\qquad\text{và}\qquad
\log\tan\frac E2
$$

có thể xảy ra sai số $\omega$. Do đó, sai số trong

$$
\log\tan\frac{\nu}{2}
=
\log\tan\left(45^\circ-\frac12\varphi\right)
-
\log\tan\frac E2
$$

bằng $3\omega$. Vì thế, sai số lớn nhất trong việc xác định góc $\frac12\nu$ là

$$
\frac{3\omega\,d\frac12\nu}
     {d\log\tan\frac12\nu}
=
\frac{3\omega\sin\nu}{2\lambda},
$$

trong đó $\lambda$ là modulus của các logarithm dùng trong phép tính này. Do đó, sai số của anomalia thật $\nu$ là

$$
\frac{3\omega\sin\nu}{\lambda}\,206265
=
0{,}0712''\sin\nu
$$

khi được biểu thị bằng giây và dùng các logarithm Brigghi ở bảy chữ số thập phân.

<!-- PDF 45, trang in 28, tiếp theo §32-§33 -->

khi dùng các logarithm Brigghi ở bảy chữ số thập phân, ta luôn có thể chắc chắn về giá trị của $\nu$ trong khoảng $0^\circ{,}07$; nếu dùng các bảng nhỏ chỉ đến năm chữ số, sai số có thể lên tới $7',12$.

II. Nếu $e\cos E$ được tính bằng sự trợ giúp của các logarithm, sai số có thể mắc phải tới

$$
\frac{3\omega e\cos E}{\lambda}.
$$

Vì thế, đại lượng $1-e\cos E$, tức là $\frac ra$, cũng chịu cùng sai số ấy. Do đó, khi tính logarithm của đại lượng này, sai số có thể lên tới $(1+\delta)\omega$, nếu đặt

$$
\delta=\frac{3e\cos E}{1-e\cos E}
$$

và lấy giá trị dương. Nếu $\log a$ được cho tuyệt đối chính xác, sai số trong $\log r$ cũng có thể lên tới giới hạn $(1+\delta)\omega$.

Khi tâm sai nhỏ, $\delta$ luôn bị giữ trong những giới hạn hẹp. Nhưng nếu $e$ chỉ khác $1$ một chút, $1-e\cos E$ vẫn rất nhỏ miễn là $E$ còn nhỏ; khi ấy $\delta$ có thể tăng đến một giá trị không thể xem nhẹ. Vì vậy, trong trường hợp ấy, công thức III ở Điều 8 kém phù hợp hơn. Ta cũng có thể biểu thị

$$
\delta
=
\frac{3(a-r)}{r}
=
\frac{3e(\cos\nu+e)}{1-ee},
$$

công thức này còn cho thấy rõ hơn khi nào có thể bỏ qua sai số $(1+\delta)\omega$.

III. Dùng công thức X ở Điều 8 để tính anomalia thật từ anomalia tâm sai, $\log\sqrt{a/r}$ sẽ chịu sai số

$$
\left(\frac12+\frac12\delta\right)\omega,
$$

và do đó

$$
\log\sin\frac{\varphi}{2}\,\sin E\,\sqrt{\frac ar}
$$

cũng chịu sai số ấy. Từ đó, sai số lớn nhất có thể xảy ra khi xác định góc $\nu-E$, hoặc $\nu$, là

$$
\frac{\omega}{\lambda}(7+\delta)\tan\frac{\nu-E}{2}.
$$

Nếu biểu thị bằng giây và dùng bảy chữ số thập phân, sai số ấy bằng

$$
(0'',166+0'',024\delta)\tan\frac{\nu-E}{2}.
$$

Khi tâm sai vừa phải, $\delta$ và $\tan\frac{\nu-E}{2}$ đều nhỏ. Vì thế, phương pháp này cho độ chính xác cao hơn phương pháp đã xét trong I. Ngược lại, khi tâm sai rất lớn và gần $1$, $\delta$ cùng $\tan\frac{\nu-E}{2}$ trở nên đáng kể; khi đó phương pháp trong I lại tốt hơn. Với các công thức của ta, luôn có thể dễ dàng quyết định phương pháp nào nên dùng.

IV. Khi xác định anomalia trung bình từ anomalia tâm sai bằng công thức XII ở Điều 8, sai số của đại lượng $e\sin E$ được tính bằng logarithm, và do đó cả sai số của chính anomalia trung bình $M$, có thể lên tới

$$
\frac{3\omega e\sin E}{\lambda}.
$$

Nếu muốn biểu thị giới hạn ấy bằng giây, phải nhân với $206265''$. Do đó, dễ dàng kết luận rằng trong bài toán nghịch đảo, nơi $E$ được xác định bằng cách thử từ $M$, chính $E$ có thể sai lệch một lượng

<!-- PDF 46, trang in 29, tiếp theo §32 -->

$$
\frac{3\omega e\sin E}{\lambda}
\frac{dE}{dM}\,206265''
=
\frac{3\omega ea\sin E}{\lambda r}\,206265'',
$$

ngay cả khi phương trình

$$
E-e\sin E=M
$$

đã được thỏa mãn với mọi độ chính xác mà bảng cho phép.

Vì vậy, anomalia thật tính từ anomalia trung bình có thể sai theo hai lý do. Nếu ta xem anomalia trung bình là tuyệt đối chính xác, lý do thứ nhất là sai số trong việc tính $\nu$ từ $E$; như đã thấy, sai số này luôn nhỏ. Lý do thứ hai là chính giá trị của anomalia tâm sai $E$ đã có thể sai.

Tác dụng của lý do thứ hai được xác định bằng tích của sai số trong $E$ với $\frac{d\nu}{dE}$. Tích ấy bằng

$$
\frac{3\omega e\sin E}{\lambda}
\frac{d\nu}{dM}\,206265''
=
\frac{3\omega ea\sin\nu}{\lambda r}\,206265''
=
\left(
\frac{e\sin\nu+\frac12ee\sin2\nu}{1-ee}
\right)0'',0712,
$$

nếu dùng bảy chữ số thập phân. Với các giá trị nhỏ của $e$, sai số này luôn vừa phải, nhưng khi $e$ chỉ khác $1$ một chút thì có thể trở nên rất lớn. Bảng sau cho thấy giá trị lớn nhất của biểu thức ấy đối với một số giá trị của $e$:

| $e$ | Sai số lớn nhất | $e$ | Sai số lớn nhất | $e$ | Sai số lớn nhất |
|---:|---:|---:|---:|---:|---:|
| $0{,}90$ | $0'',42$ | $0{,}94$ | $0'',73$ | $0{,}98$ | $2'',28$ |
| $0{,}91$ | $0'',48$ | $0{,}95$ | $0'',89$ | $0{,}99$ | $4'',59$ |
| $0{,}92$ | $0'',54$ | $0{,}96$ | $1'',12$ | $0{,}999$ | $46'',23$ |
| $0{,}93$ | $0'',62$ | $0{,}97$ | $1'',50$ |  |  |

V. Trong chuyển động hyperbol, nếu $\nu$ được xác định từ $F$ và $\psi$ đã biết chính xác bằng công thức III ở Điều 21, sai số có thể lên tới

$$
\frac{3\omega\sin\nu}{\lambda}\,206265''.
$$

Nếu $\nu$ được tính bằng công thức

$$
\tan\frac{\nu}{2}
=
\frac{(u-1)\cot\frac{\psi}{2}}{u+1},
$$

khi $u$ và $\psi$ đã biết chính xác, giới hạn sai số lớn hơn một phần ba, tức là

$$
\frac{4\omega\sin\nu}{\lambda}\,206265''
=
0'',09\sin\nu
$$

khi dùng bảy chữ số thập phân.

VI. Nếu đại lượng

$$
\frac{\lambda kt}{b^{3/2}}=N
$$

được tính bằng các logarithm Brigghi theo công thức XI ở Điều 22, và giả sử $e$ cùng $u$, hoặc $e$ cùng $F$, đã biết chính xác, thì số hạng đầu của $N$ sẽ chịu sai số

$$
\frac{5(uu-1)e\omega}{2u}
$$

nếu được tính ở dạng

$$
\frac{\lambda e(uu-1)}{2u},
$$

hoặc chịu sai số

$$
\frac{3(uu+1)e\omega}{2u}
$$

nếu được tính ở dạng

$$
\frac12\lambda eu
$$

<!-- PDF 47, trang in 30, tiếp theo §32 -->

$$
-\frac{\lambda e}{2u},
$$

hoặc chịu sai số

$$
3e\omega\tan F
$$

nếu được tính ở dạng $\lambda e\tan F$. Ở đây ta bỏ qua sai số phát sinh trong $\log\lambda$ hoặc $\log\frac12\lambda$.

Trong trường hợp thứ nhất, sai số còn có thể biểu thị bằng $5e\omega\tan F$; trong trường hợp thứ hai, bằng

$$
\frac{3e\omega}{\cos F}.
$$

Do đó, trong trường hợp thứ ba, sai số luôn nhỏ nhất; trong hai trường hợp đầu nó lớn hơn, tuỳ theo $u$ hoặc $\frac1u$ lớn hay nhỏ hơn $2$, tức là tuỳ theo $\pm F$ lớn hơn hay nhỏ hơn $36^\circ52'$. Số hạng thứ hai của $N$ luôn chịu sai số $\omega$.

VII. Ngược lại, nếu $u$ hoặc $F$ được xác định bằng cách thử từ $N$, ta thấy $u$ chịu sai số

$$
\left(1\pm5e\omega\tan F\right)\frac{du}{dN},
$$

hoặc

$$
\left(1+\frac{3e\omega}{\cos F}\right)\frac{du}{dN},
$$

tùy theo số hạng thứ nhất của $N$ được dùng trực tiếp, hay được phân rã thành các thừa số hoặc các phần. Còn $F$ chịu sai số

$$
\left(1\pm3e\omega\tan F\right)\frac{dF}{dN}.
$$

Dấu trên có hiệu lực sau perihelium, dấu dưới có hiệu lực trước perihelium. Nếu ở đây thay $\frac{du}{dN}$ hoặc $\frac{dF}{dN}$ bằng $\frac{d\nu}{dN}$, tác dụng của sai số này đối với việc xác định $\nu$ sẽ là

$$
\frac{bb\tan\psi(1\pm5e\tan F)\omega}{\lambda rr}
$$

hoặc

$$
\frac{bb\tan\psi(1+5e\sec F)\omega}{\lambda rr},
$$

nếu dùng đại lượng phụ $u$. Ngược lại, nếu dùng $F$, tác dụng ấy bằng

$$
\frac{bb\tan\psi(1\pm5e\tan F)\omega}{\lambda rr}
=
\frac{\omega}{\lambda}
\left\{
\frac{(1+e\cos\nu)^2}{\tan^3\psi}
\ \pm\
\frac{3e\sin\nu(1+e\cos\nu)}{\tan^2\psi}
\right\}.
$$

Nếu muốn biểu thị sai số bằng giây, phải thêm thừa số $206265''$. Sai số này chỉ trở nên đáng kể khi $\psi$ là một góc nhỏ, tức là khi $e$ lớn hơn $1$ một chút. Dưới đây là các giá trị lớn nhất của biểu thức thứ ba ấy đối với một số giá trị của $e$, khi dùng bảy chữ số thập phân:

| $e$ | Sai số lớn nhất |
|---:|---:|
| $1{,}3$ | $0'',34$ |
| $1{,}2$ | $0'',54$ |
| $1{,}1$ | $1'',31$ |
| $1{,}05$ | $3'',03$ |
| $1{,}01$ | $34'',41$ |
| $1{,}001$ | $1064'',65$ |

<!-- PDF 48, trang in 31, tiếp theo §32-§33 -->

Với sai số này, còn phải cộng thêm sai số xác định ở mục V phát sinh từ giá trị sai của chính $F$ hoặc $u$, để có được sự bất định tổng thể của $\nu$.

VIII. Nếu phương trình XI ở Điều 22 được giải bằng các logarithm hyperbol, và dùng $F$ làm đại lượng phụ, tác dụng của sai số trong phép toán này đối với việc xác định $\nu$, theo lập luận tương tự, là

$$
\frac{(1+e\cos\nu)^2\lambda\omega'}{\tan^3\psi}
\ \pm\
\frac{3e\sin\nu(1+e\cos\nu)\omega}
     {\lambda\tan^2\psi}.
$$

Ở đây $\omega'$ là sai số lớn nhất trong các bảng logarithm hyperbol. Số hạng thứ hai của biểu thức này giống số hạng thứ hai trong biểu thức ở VII; còn số hạng thứ nhất nhỏ hơn số hạng thứ nhất ở đó theo tỷ lệ $\lambda\omega':\omega$, tức là theo tỷ lệ $1:23$, nếu ta giả sử bảng Vrsini chính xác ở tám chữ số, hay

$$
\omega'=0{,}000000005.
$$

## §33

Trong những mặt cắt conic có tâm sai chỉ khác $1$ một chút, tức là trong các elip và hyperbol gần parabol, các phương pháp đã trình bày ở trên không thể đạt được mọi độ chính xác có thể mong muốn, cả khi dùng chúng để xác định anomalia thật từ thời gian lẫn thời gian từ anomalia thật. Những sai số không tránh khỏi còn tăng lên khi quỹ đạo càng giống parabol, cho đến khi vượt qua mọi giới hạn.

Các bảng lớn hơn, được lập với nhiều hơn bảy chữ số thập phân, có thể làm giảm sự bất định này, nhưng không thể xóa bỏ nó, cũng không ngăn được nó vượt qua mọi giới hạn ngay khi quỹ đạo tiến quá gần parabol. Hơn nữa, các phương pháp đã nêu trở nên khá phiền phức trong trường hợp ấy, vì phần gián tiếp của chúng phải lặp lại những lần thử nhiều lần; sự phiền này càng trở nên nặng nề hơn nếu ta dùng các bảng lớn. Vì vậy, việc phát triển một phương pháp đặc biệt để tránh sự bất định ấy, chỉ với sự trợ giúp của các bảng thông thường mà vẫn đạt độ chính xác đủ, rõ ràng không phải là việc thừa.

> **\*)** Vì thời gian chứa thừa số $a^{3/2}$ hoặc $b^{3/2}$, sai số phát sinh trong $M$ hoặc $N$ càng lớn khi $a=\frac{p}{1-ee}$ hoặc $b=\frac{p}{ee-1}$ càng lớn.

<!-- PDF 49, trang in 32, §34-§35 -->

## §34

Phương pháp thông thường, thường được dùng để khắc phục những bất tiện ấy, dựa trên các nguyên lý sau. Giả sử có một elip hoặc hyperbol với tâm sai $e$, nửa tham số $p$, và do đó khoảng cách tại perihelium là

$$
\frac{p}{1+e}=q.
$$

Sau khoảng thời gian $t$ kể từ perihelium, anomalia thật của vật thể là $\nu$. Giả sử cùng thời điểm ấy, trong một parabol có nửa tham số bằng $2q$, khoảng cách tại perihelium bằng $q$, anomalia thật là $w$; khối lượng $\mu$ được bỏ qua ở cả hai hoặc giả sử bằng nhau. Khi ấy, các tích phân sau bắt đầu từ $\nu=0$ và $w=0$ thỏa mãn

$$
\int\frac{pp\,d\nu}{(1+e\cos\nu)^2}
:
\int\frac{4qq\,dw}{(1+\cos w)^2}
=
\sqrt p:\sqrt{2q},
$$

vì

$$
\int
\frac{(1+e)^{1/2}\,d\nu}
     {(1+e\cos\nu)^2\sqrt2}
=
\int
\frac{2\,dw}{(1+\cos w)^2}.
$$

Đặt

$$
\alpha=\frac{1-e}{1+e},
\qquad
\theta=\tan\frac{\nu}{2}.
$$

Tích phân thứ nhất trở thành

$$
\sqrt{1+\alpha}
\left(
\theta
+\frac12\theta^3(1-2\alpha)
-\frac12\theta^5(2\alpha-3\alpha^2)
+\frac12\theta^7(5\alpha^2-4\alpha^3)
-\cdots
\right),
$$

còn tích phân thứ hai là

$$
\tan\frac{w}{2}
+\frac12\tan^3\frac{w}{2}.
$$

Từ phương trình này, dễ dàng xác định $w$ theo $\alpha,\nu$, hoặc $\nu$ theo $\alpha,w$, bằng sự trợ giúp của các chuỗi vô hạn. Nếu thuận tiện hơn, ta có thể thay $\alpha$ bằng

$$
1-e=\frac{2\alpha}{1+\alpha}=\delta.
$$

Rõ ràng khi $\alpha=0$, tức $\delta=0$, ta có $\nu=w$. Do đó, chuỗi trên có dạng

$$
w=\nu+\delta\nu'+\delta^2\nu''+\delta^3\nu'''+\cdots,
$$

$$
\nu=w+\delta w'+\delta^2w''+\delta^3w'''+\cdots,
$$

trong đó $\nu',\nu'',\nu'''$ v.v. là các hàm của $\nu$, còn $w',w'',w'''$ v.v. là các hàm của $w$.

Khi $\delta$ nhỏ, chuỗi này hội tụ nhanh, và chỉ vài số hạng cũng đủ để xác định $w$ từ $\nu$, hoặc $\nu$ từ $w$. Từ $w$ có thể tìm ra $t$, hoặc từ $t$ có thể tìm ra $w$ theo cách đã trình bày ở trên cho chuyển động parabol.

## §35

Bessel đã phát triển các biểu thức giải tích của ba hệ số đầu tiên $w',w'',w'''$ trong chuỗi thứ hai, đồng thời lập một bảng các giá trị số của hai hệ số đầu $w',w''$ cho từng độ của w, được công bố trong *Von Zach, Monatliche Correspondenz*, vol. XII, p. 197. Với hệ số đầu tiên $w'$, bảng

<!-- PDF 50, trang in 33, tiếp theo §35-§36 -->

đã được Simpson tính từ trước, và được đính kèm vào công trình xuất sắc của ông Olbers đã khen ngợi ở trên.

Trong nhiều trường hợp, phương pháp này với sự trợ giúp của bảng Bessel cho phép xác định anomalia thật từ thời gian với độ chính xác đủ. Điều còn mong muốn được có thể rút gọn về hai điểm sau.

I. Trong bài toán nghịch đảo, khi thời gian đã được xác định từ anomalia thật, cần trở về một phương pháp gần như gián tiếp và suy ra $w$ từ $\nu$ bằng cách thử. Để tránh bất tiện ấy, chuỗi trước phải được xử lý giống chuỗi thứ hai. Ta dễ dàng nhận thấy $\nu'$ là cùng một hàm của $\nu$ như $w'$ là hàm của $w$; vì vậy, bảng của $w'$ chỉ cần đổi dấu là có thể dùng cho $\nu'$. Sau đó, chỉ còn cần bảng của $\nu''$, khi ấy có thể giải cả hai bài toán với cùng độ chính xác.

II. Cũng có thể xảy ra những trường hợp mà tâm sai chỉ khác $1$ một chút, đến mức các phương pháp tổng quát đã nêu trên không còn cho độ chính xác đủ, nhưng sai số cũng chưa lớn đến mức cần phải dùng một phương pháp riêng để kiểm soát chắc chắn tác dụng của lũy thừa bậc ba của $\delta$ và các đại lượng nhỏ khác. Trong chuyển động hyperbol, những trường hợp như vậy có thể xảy ra: nếu dùng phương pháp ấy theo dạng riêng nhưng vẫn dùng các bảng thông thường chỉ có bảy chữ số, ta không thể tránh được sai số vài giây. Tuy những trường hợp như vậy hiếm gặp trong thực hành, vẫn có thể thấy rằng còn thiếu một điều gì đó nếu không thể xác định anomalia thật trong mọi trường hợp với độ chính xác $0',1$, hoặc ít nhất là $0'',2$, nếu không tra cứu các bảng lớn hơn; nhưng những bảng lớn ấy phải tìm trong các sách hiếm.

Vì vậy, ta hy vọng rằng việc trình bày phương pháp riêng mà ta đã sử dụng từ lâu sẽ không bị xem là thừa. Phương pháp ấy cũng có ưu điểm là không bị giới hạn chỉ ở những tâm sai khác $1$ một chút; ít nhất trong phương diện này, nó cho phép áp dụng một cách tổng quát.

## §36

Trước khi trình bày phương pháp này, cần lưu ý rằng sự bất định của các phương pháp tổng quát đã nêu trên tự thân dừng lại trong những quỹ đạo tiến gần parabol, ngay khi $E$ hoặc $F$ đạt một giá trị đáng kể; điều này dù chỉ xảy ra ở những khoảng cách lớn từ Mặt Trời.

Để chứng minh điều đó, sai số lớn nhất có thể xảy ra trong elip, mà ta đã tìm thấy ở Điều 32, IV, là

$$
\frac{3\omega ea\sin\nu}{\lambda r}\,206265'',
$$

ta có thể biểu thị bằng

$$
\frac{3\omega e\sqrt{1-ee}\sin E}
     {\lambda(1-e\cos E)^2}\,206265'',
$$

<!-- PDF 51, trang in 34, tiếp theo §36 -->

từ đó, sai số luôn bị giới hạn trong những biên hẹp, ngay khi $E$ có giá trị đáng kể, hoặc khi $\cos E$ càng xa $1$ hơn, dù tâm sai lớn đến đâu. Điều này sẽ rõ hơn trong bảng sau, nơi ta tính giá trị số lớn nhất của công thức ấy cho một số giá trị xác định, với bảy chữ số thập phân:

| $E$ | Sai số lớn nhất |
|---:|---:|
| $1^\circ$ | $3'',04$ |
| $20^\circ$ | $0'',76$ |
| $30^\circ$ | $0'',34$ |
| $40^\circ$ | $0'',19$ |
| $50^\circ$ | $0'',12$ |
| $60^\circ$ | $0'',08$ |

Trong hyperbol cũng xảy ra tương tự. Ta thấy ngay nếu biểu thức ở Điều 32, VII được viết thành

$$
\frac{
\omega\cos F(\cos F+3e\sin F)\sqrt{ee-1}
}
{\lambda(e-\cos F)^2}\,206265'',
$$

thì các giá trị lớn nhất của biểu thức này, theo một số giá trị xác định của $F$, được bảng sau cho thấy:

| $F$ | $u$ | $1/u$ | Sai số lớn nhất |
|---:|---:|---:|---:|
| $1^\circ$ | $1{,}192$ | $0{,}839$ | $8'',66$ |
| $2^\circ$ | $1{,}428$ | $0{,}700$ | $1'',38$ |
| $3^\circ$ | $1{,}752$ | $0{,}571$ | $0'',47$ |
| $4^\circ$ | $2{,}144$ | $0{,}466$ | $0'',22$ |
| $5^\circ$ | $2{,}747$ | $0{,}364$ | $0'',11$ |
| $6^\circ$ | $3{,}732$ | $0{,}268$ | $0'',06$ |
| $7^\circ$ | $5{,}671$ | $0{,}176$ | $0'',02$ |

Vì vậy, nếu $E$ hoặc $F$ vượt quá $40^\circ$ hoặc $50^\circ$, không có lý do để từ bỏ phương pháp tổng quát. Tuy nhiên, trong trường hợp ấy, chuỗi ở Điều 34 cũng hội tụ quá chậm. Vì thế, không thể coi đó là khiếm khuyết của phương pháp đang trình bày, bởi nó được thiết kế đặc biệt cho những trường hợp mà $E$ hoặc $F$ chưa vượt quá những giá trị vừa phải.

<!-- PDF 52, trang in 35, §37 -->

## §37

Ta xét lại phương trình giữa anomalia tâm sai và thời gian trong chuyển động elip:

$$
E-e\sin E
=
\frac{kt\sqrt{1+\mu}}{a^{3/2}},
$$

trong đó $E$ được biểu thị bằng các phần của bán kính. Từ đây ta bỏ qua thừa số $\sqrt{1+\mu}$. Nếu có trường hợp cần giữ lại thừa số này, khi ấy $t$ không còn biểu thị thời gian thực sau perihelium, mà biểu thị thời gian ấy đã nhân với $\sqrt{1+\mu}$.

Ta đặt $q$ là khoảng cách tại perihelium, và thay $E,\sin E$ bằng các đại lượng

$$
x=E-\sin E,
\qquad
x'=\frac12(E+\sin E).
$$

Lý do chọn hai đại lượng này sẽ dần hiện ra trong những dòng tiếp theo. Bằng cách đó, phương trình trên trở thành

$$
(1-e)(x^2E+x'\sin E)
+
(x+x'e)(E-\sin E)
=
kt\left(\frac{1-e}{q}\right)^{3/2}.
$$

Khi $E$ được xem là một đại lượng nhỏ bậc nhất, các biểu thức trên có dạng [OCR không rõ] và

$$
E-\sin E
=
\frac16E^3-\frac1{120}E^5+\cdots,
$$

là một đại lượng bậc ba. Đặt

$$
\frac{6(E-\sin E)}{xE+x'\sin E}=4A,
\qquad
\frac{xE+x'\sin E}{2\sqrt A}=B.
$$

Khi đó, $4A$ là một đại lượng bậc hai, còn $B$ lệch khỏi đơn vị ở bậc bốn. Phương trình của ta trở thành

$$
B\left(
2(1-e)A^{3/2}
+
[\,\text{OCR không rõ}\,](1+[\,\text{OCR không rõ}\,]e)A^{1/2}
\right)
=
kt\left(\frac{1-e}{q}\right)^{3/2}
\tag{1}.
$$

Với các bảng lượng giác thông thường, $xE+x'\sin E$ có thể được tính với độ chính xác đủ, nhưng $E-\sin E$ thì không thể, khi $E$ là một góc nhỏ. Vì vậy, người ta khó xác định chính xác $E$ chỉ bằng $A$ và $B$. Một bảng đặc biệt sẽ giúp giải quyết khó khăn này: khi đối số là $E$, ta có thể lấy trực tiếp logarithm của $B$. Những trợ giúp cần thiết để lập bảng ấy đều dễ dàng thu được trong phân tích hoặc ở mức trung bình. Ngoài ra, còn có

$$
\frac{9E+\sin E}{20B}=\sqrt A,
$$

để tìm $\sqrt A$; từ đó, theo phương trình (1), có thể xác định $t$ với mọi độ chính xác có thể mong muốn.

<!-- PDF 53, trang in 36, §38 -->

Đây là một mẫu của bảng như vậy; nó chỉ cho thấy sự tăng chậm của chính $\log B$. Sẽ là thừa nếu làm bảng này dài hơn, bên dưới ta sẽ trình bày những bảng có dạng thuận tiện hơn nhiều:

| $E$ | $\log B$ | $E$ | $\log B$ | $E$ | $\log B$ |
|---:|---:|---:|---:|---:|---:|
| $0^\circ$ | $0{,}0000000$ | $25^\circ$ | $0{,}0000168$ | $50^\circ$ | $0{,}0002675$ |
| $5$ | $00$ | $30$ | $0349$ | $55$ | $3910$ |
| $10$ | $04$ | $35$ | $0645$ | $60$ | $5526$ |
| $15$ | $22$ | $40$ | $1099$ |  |  |
| $20$ | $69$ | $45$ | $1758$ |  |  |

## §38

Không vô ích khi minh họa những điều đã trình bày trong Điều trước bằng một ví dụ. Giả sử anomalia thật bằng $100^\circ$, tâm sai bằng $0{,}96764567$, và $\log q=9{,}765650$. Ta hãy tính $E,B,A$ và $t$:

$$
\begin{aligned}
\log\tan\frac12\nu&=0{,}0761865,\\
\log\sqrt{\frac{1-e}{1+e}}&=9{,}1079927.
\end{aligned}
$$

Do đó

$$
\log\tan\frac12E=9{,}1841792,
$$

từ đó

$$
\frac12E=8^\circ41'19'',3,
\qquad
E=17^\circ22'38'',6.
$$

Ứng với giá trị này của $E$, ta có $\log B=0{,}0000040$. Ngoài ra, tính được

$$
E=0{,}3032928,
\qquad
\sin E=0{,}2986643,
$$

và

$$
\frac12E'+\frac12\sin E'=0{,}1514150.
$$

Logarithm của đại lượng cuối là $9{,}1801689$, nên

$$
\log A=9{,}1801649.
$$

Từ đây, theo công thức (1) ở Điều trước, ta tính được

$$
\begin{aligned}
\log\frac{2Bq^{3/2}}{k\sqrt{1-e}}&=2{,}4589614,\\
\log\frac{2B(1+9e)}{15k}
\left(\frac{q}{1-e}\right)^{3/2}&=3{,}7601038,\\
\log A^{3/2}&=9{,}1801649,\\
\log A^{1/2}&=7{,}5404947.
\end{aligned}
$$

Các dòng logarithm còn lại được in như sau:

$$
\begin{aligned}
\log 45{,}56386&=1{,}6591263,\\
\log 19{,}98014&=1{,}3005985,
\end{aligned}
$$

và

$$
\frac{19{,}98014}{63{,}54400}=t.
$$

Nếu xử lý cùng ví dụ này bằng phương pháp thông thường, ta cũng tìm được $E$ trong các đơn vị tương ứng:

$$
5^\circ10'',79=16^\circ53'30'',79,
$$

do đó anomalia trung bình là

$$
49^\circ7'',85=29^\circ47'',85.
$$

Từ đó, cùng với

$$
\log k\left(\frac{1-e}{q}\right)^{1/2}
=1{,}6664302,
$$

ta suy ra $t=63{,}54410$. Khác biệt,

<!-- PDF 54, trang in 37, tiếp theo §38-§39 -->

Khác biệt ấy, [OCR không rõ] một phần nhỏ của một ngày; nếu các sai số cùng phối hợp, sai số ấy có thể dễ dàng trở thành lớn gấp ba hoặc gấp bốn.

Dù vậy, chỉ với sự trợ giúp của bảng $\log B$ như trên, bài toán nghịch đảo cũng có thể được giải với mọi độ chính xác mong muốn: xác định $E$ bằng những lần thử lặp lại, sao cho giá trị của $t$ tính được từ đó khớp với giá trị đã cho. Tuy nhiên, phép tính ấy sẽ khá phiền. Vì vậy, ta sẽ chỉ ra cách trang trí bảng phụ thuận tiện hơn nhiều, tránh hoàn toàn những lần thử mơ hồ, và đưa toàn bộ phép tính về một thuật toán thật dứt khoát và nhanh gọn, không bỏ sót điều gì cần thiết.

## §39

Gần một nửa công sức mà những lần thử ấy đòi hỏi có thể được bỏ qua ngay lập tức, nếu ta có một bảng được trang trí sao cho có thể suy ra trực tiếp $\log B$. Khi ấy chỉ còn ba phép tính. Phép thứ nhất là phép gián tiếp: xác định $A$ để thỏa mãn phương trình (1) ở Điều 37. Phép thứ hai là xác định $E$ từ $A$ và $B$; có thể làm trực tiếp, hoặc qua các phương trình

$$
E=2B\left(A^{1/2}+\frac12A^{3/2}\right),
$$

hay

$$
\sin E=2B\left(A^{1/2}-\frac12A^{3/2}\right).
$$

Phép thứ ba là xác định $t$ từ $E$ theo phương trình VII ở Điều 8. Ta sẽ đưa phép thứ nhất về một thuật toán nhanh và không còn lần thử mơ hồ; hai phép sau sẽ được gộp lại thành một, bằng cách đưa một đại lượng mới $C$ vào bảng của ta. Khi ấy, ta không cần đến $E$ nữa, đồng thời cũng thu được một công thức ngắn gọn và thuận tiện cho bán kính vectơ. Ta sẽ lần lượt trình bày những điều ấy.

Trước hết, hãy biến đổi phương trình (1) sao cho có thể dùng bảng Barker để giải. Đặt

$$
A^{1/2}
=
\tan\frac12w\sqrt{\frac{5-5e}{1+9e}}.
$$

Khi đó

$$
75\tan\frac12w
+
25\tan^3\frac12w
=
\frac{75kt\sqrt{\frac12+\frac32e}}{2Bq^{3/2}}
=
\frac{\alpha t}{B}.
$$

Ta gọi

$$
\alpha=
\frac{75kt\sqrt{\frac12+\frac32e}}{2q^{3/2}}.
$$

Nếu đã biết $B$, có thể lấy ngay $w$ từ bảng Barker, vì đó là anomalia thập, ứng với với nó là chuyển động trung bình

$$
\frac{\alpha t}{B}.
$$

Từ $w$, ta suy ra $A$ theo công thức

$$
A=\beta\tan^2\frac12w,
$$

trong đó

$$
\beta=\frac{5-5e}{1+9e}.
$$

<!-- PDF 55, trang in 38, tiếp theo §39-§40 -->

Phần còn lại không khó nhận ra; tuy nhiên, vì sự khác biệt giữa chúng phức tạp, có thể trước hết dự đoán rằng $w$ và $A$ chỉ chịu sai số nhỏ nếu bỏ qua hoàn toàn ước số $B$ ngay từ đầu.

Ta sẽ xác định trước $w$ và $A$ bằng phép tính nhẹ, đặt $B=1$. Với giá trị xấp xỉ của $A$ và bảng phụ, ta tìm $B$, rồi lặp lại cùng phép tính ấy một cách chính xác. Thường thì sau khi sửa $A$, giá trị của $B$ sẽ đúng bằng giá trị đã tìm được trong lần xấp xỉ, nên phép lặp lại là thừa; chỉ phải trừ ra những trường hợp mà giá trị của $E$ đã trở nên đáng kể.

Cũng cần nhắc rằng nếu ngay từ đầu đã tìm được giá trị xấp xỉ của $B$ ở một nơi khác, thì nên dùng ngay giá trị ấy trong lần xấp xỉ đầu tiên. Điều này thường xảy ra khi ta tính nhiều giá trị gần nhau và đã có một hoặc hai giá trị tuyệt đối. Như vậy, người tính toán thường không cần lặp lại dù chỉ một lần. Ta chọn lần xấp xỉ nhanh hơn này vì $B$ chỉ khác $1$ ở bậc bốn, và sau khi nhân với một hệ số số cố định, sự thuận tiện của việc chuẩn bị sẽ càng lộ rõ khi đưa vào các đại lượng

$$
E-\sin E,
\qquad
\frac12E+\frac12\sin E
$$

thay cho chính $E$ và $\sin E$.

## §40

Đối với phép thứ ba, tức là xác định anomalia thật, ta không cần chính góc $E$, mà chỉ cần $\tan\frac12E$, hay đúng hơn là $\log\tan\frac12E$. Vì vậy, có thể nối phép ấy với phép thứ hai một cách thuận tiện nếu bảng của ta cung cấp trực tiếp logarithm của đại lượng

$$
\frac{\tan\frac12E}{\sqrt A},
$$

đại lượng này chỉ khác $1$ ở bậc hai. Tuy nhiên, ta vẫn muốn trang trí bảng hơi khác một chút, để đổi lấy việc nội suy thuận tiện hơn nhiều, dù phạm vi của bảng chỉ thu hẹp một chút.

Vì lý do tiện lợi, đặt \(T=\tan\frac12E\). Giá trị của \(A\) đã cho ở Điều 37,

$$
\frac{15(E-\sin E)}{9E+\sin E},
$$

dễ dàng biến đổi thành

$$
A=
\frac{
T-\frac12T^2+\frac23T^3-\text{[OCR không rõ]}T^4+\text{[OCR không rõ]}T^5-\cdots
}{
1-\frac12T+\frac25T^2-\frac13T^3+\frac27T^4-\cdots
},
$$

theo quy luật tiến triển rõ ràng. Từ đây, bằng phép đảo các chuỗi, ta suy ra

$$
\frac{A}{T}
=
1-\frac12A
+\text{[OCR không rõ]}A^2
+\text{[OCR không rõ]}A^3
+\text{[OCR không rõ]}A^4
+\text{[OCR không rõ]}A^5
+\cdots.
$$

<!-- PDF 56, trang in 39, tiếp theo §40-§42 -->

Đặt

$$
\frac{A}{T}=1-\frac12A+C.
$$

Khi ấy $C$ là đại lượng bậc bốn, được nhận vào bảng của ta. Ta có thể chuyển ngay từ $A$ sang $\nu$ theo công thức

$$
\tan\frac12\nu
=
\sqrt{\frac{1+e}{1-e}}
\sqrt{\frac{A}{1-\frac12A+C}}
=
\frac{\gamma\tan\frac12w}
{\sqrt{1-\frac12A+C}},
$$

trong đó

$$
\gamma=\sqrt{\frac{5+5e}{1+9e}}.
$$

Như vậy, ta còn thu được một phép tính rất thuận tiện cho bán kính vectơ. Theo Điều 8, VI,

$$
r
=
\frac{q\cos^2\frac12E}{\cos^2\frac12\nu}
=
\frac{q}{(1+T)\cos^2\frac12\nu}
=
\frac{(1-\frac12A+C)q}
{(1+\frac12A+C)\cos^2\frac12\nu}.
$$

## §41

Không còn gì phải làm, trừ việc đưa cả bài toán nghịch đảo, tức là xác định thời gian từ anomalia thật, về một thuật toán nhanh hơn. Vì thế, ta thêm một cột mới $T$ vào bảng của mình. Trước tiên, $T$ được tính từ $\nu$ theo công thức

$$
T=\frac{1-e}{1+e}\tan\frac12\nu.
$$

Sau đó, từ cột $T$ của bảng, ta lấy ra $A$ và $\log B$, hoặc, chính xác hơn và cũng thuận tiện hơn, lấy $C$ và $\log B$. Từ đó, ta suy ra \(A\) theo công thức

$$
A=\frac{(1+C)T}{1+\frac12T},
$$

rồi tính $t$ từ $A$ và $B$ theo công thức (1) ở Điều 37.

Nếu ở đây cũng muốn dùng bảng Barker, thì trong bài toán nghịch đảo này, lợi ích của việc ấy ít hơn, nên không cần xét đến \(A\), mà có thể dùng ngay

$$
\tan\frac12w
=
\tan\frac12\nu
\sqrt{\frac{1+C}{\gamma(1+\frac12T)}}.
$$

Từ đó, ta nhân chuyển động trung bình của anomalia thật \(w\), lấy từ bảng Barker, với \(B/\alpha\), để có \(t\).

## §42

Ta đã dựng bảng như đã mô tả, mở rộng nó đủ để phục vụ công việc này, và đã bổ sung nó vào danh sách bảng của sách. Với elip, chỉ phần trước của bảng là liên quan; phần sau, bao gồm chuyển động hyperbol, sẽ được giải thích dưới đây. Đối số của bảng là đại lượng \(A\), tiến triển theo các phần nghìn từ \(0\) đến \(0{,}300\); sau đó là \(\log B\) và \(C\), được tính theo các phần \(10000000\)-thứ, tức là

<!-- PDF 57, trang in 40, tiếp theo §42-§43 -->

Phần bảng đã được viết đến bảy chữ số thập phân; các chữ số có nghĩa đã bị bỏ đi. Cột thứ tư cho ta các giá trị của $T$, trước hết tính đến năm rồi đến sáu chữ số. Độ chính xác này là đủ, vì cột ấy chỉ cần dùng để lấy các giá trị tương ứng của $\log B$ và $C$ khi ta muốn xác định $t$ từ $\nu$ theo quy cách ở Điều trước.

Vì bài toán nghịch đảo, tức là xác định $\nu$ và $r$ từ $t$, dùng thường xuyên hơn nhiều và có thể giải hoàn toàn mà không cần đến $T$, ta chọn $A$ làm đối số của bảng, thay vì chọn $T$. T khi ấy cũng gần như thích hợp không kém, thậm chí còn làm việc dựng bảng thuận tiện hơn một chút.

Không cần nhắc rằng mọi số trong bảng đều được tính từ đầu đến mười chữ số, nên bảy chữ số ở đây có thể được xem là đủ ở mọi nơi. Ta không thể dừng lại ở đây để giải thích các phương pháp giải tích được dùng cho công việc này, vì như vậy sẽ xa cách quá nhiều so với mục đích hiện tại. Tuy nhiên, phạm vi của bảng trong mọi trường hợp mà ta có thể làm theo phương pháp đã trình bày là đủ; khi đi xa hơn giới hạn $A=0{,}3$, ứng với $T=0{,}392374$ và $E=64^\circ7'$, có thể dừng lại, như trên đã chỉ ra.

## §43

Để minh họa rõ hơn các điều đã bàn, ta thêm một ví dụ về phép tính đầy đủ, xác định anomalia thật và bán kính vectơ từ thời gian. Ta dùng lại các số ở Điều 38. Đặt

$$
e=0{,}96764567,
\qquad
\log q=9{,}7656500,
\qquad
t=63{,}54400.
$$

Trước tiên, ta suy ra các hằng số

$$
\log\alpha=0{,}3052357,
\qquad
\log\beta=8{,}2217564,
\qquad
\log\gamma=0{,}0028755.
$$

Từ đó

$$
\log(\alpha t)=2{,}1083102.
$$

Trong bảng Barker, giá trị xấp xỉ tương ứng là

$$
w=99^\circ6',
$$

từ đó

$$
A=0{,}022926,
\qquad
\log B=0{,}0000040.
$$

Lập luận đúng để đưa vào bảng Barker là

$$
\log\frac{\alpha t}{B}=2{,}1085062,
$$

ứng với

$$
w=99^\circ6'13'',14.
$$

Phép tính tiếp theo được trình bày như sau.

<!-- PDF 58, trang in 41, tiếp theo §43-§44 -->

$$
\begin{aligned}
\log\tan^2\frac12w&=0{,}1385934,\\
\log\beta&=8{,}2217564,\\
\log A&=8{,}3603298,\\
A&=0{,}02292608,\\
C&=0{,}0000242,\\
1-\frac12A+C&=0{,}9886833,\\
1+\frac12A+C&=1{,}0046004.
\end{aligned}
$$

Ở phía bên kia,

$$
\begin{aligned}
\log\tan\frac12w&=0{,}0692967,\\
\log\gamma&=0{,}0028755,\\
\frac12\operatorname{Comp.log}\left(1-\frac12A+C\right)&=0{,}0040143,\\
\log\tan\frac12\nu&=0{,}0761865,\\
\frac12\nu&=50^\circ0'0'',\\
\nu&=100^\circ0'0'',\\
\log q&=9{,}7656500,\\
\operatorname{Comp.log}\cos\frac12\nu&=0{,}3838650,\\
\log\left(1+\frac12A+C\right)&=9{,}9919714,\\
C.\log\left(1+\frac12A+C\right)&=9{,}9980028,\\
\log r&=0{,}1594892.
\end{aligned}
$$

Nếu trong phép tính này hoàn toàn bỏ qua hệ số $B$, anomalia thật cũng chỉ bị ảnh hưởng bởi sai số nhỏ, khoảng $0'',1$, và sai số ấy thuộc về phía dư.

## §44

Chuyển động hyperbol cũng có thể trình bày ngắn gọn hơn, vì nó được xử lý bằng phương pháp hoàn toàn tương tự với chuyển động elip. Ta trình bày phương trình giữa thời gian \(t\) và đại lượng phụ \(u\) bằng dạng sau:

$$
(e-1)
\left(
x_0\left(u-\frac1u\right)+x'_0\log u
\right)
+
(x_0+x'_0e)
\left(
\frac12\left(u-\frac1u\right)-\log u
\right)
=
kt\left(\frac{e-1}{q}\right)^{3/2}.
$$

Ở đây các logarithm là logarithm hyperbol, và

$$
x_0\left(u-\frac1u\right)+x'_0\log u
$$

là một đại lượng bậc nhất, còn

$$
\frac12\left(u-\frac1u\right)-\log u
$$

là đại lượng bậc ba; đồng thời, \(\log u\) được xem là một đại lượng nhỏ bậc nhất. Đặt

$$
\frac{
6\left(\frac12\left(u-\frac1u\right)-\log u\right)
}{
x_0\left(u-\frac1u\right)+x'_0\log u
}
=4A,
\qquad
\frac{
x_0\left(u-\frac1u\right)+x'_0\log u
}{
2\sqrt A
}
=B.
$$

Khi ấy $A$ là đại lượng bậc hai, còn $B$ lệch khỏi đơn vị ở bậc bốn. Phương trình của ta có dạng

$$
B\left(
2(e-1)A^{3/2}
+
x'_0(1+9e)A^{1/2}
\right)
=
kt\left(\frac{e-1}{q}\right)^{3/2}
\tag{2},
$$

hoàn toàn tương tự phương trình (1) ở Điều 37. Đặt

$$
\left(\frac{u-1}{u+1}\right)^{3/2}=T,
$$

<!-- PDF 59, trang in 42, tiếp theo §44-§45 -->

thì $T$ là đại lượng bậc hai. Theo phương pháp các chuỗi vô hạn, ta tìm được

$$
\frac{A}{T}
=
1+\frac12A
+\text{[OCR không rõ]}A^2
-\text{[OCR không rõ]}A^3
+\text{[OCR không rõ]}A^4
-\text{[OCR không rõ]}A^5
+\cdots.
$$

Vì vậy, nếu đặt

$$
\frac{A}{T}=1+\frac12A+C,
$$

thì $C$ là đại lượng bậc bốn, và

$$
A=\frac{(1+C)T}{1-\frac12T}.
$$

Cuối cùng, theo phương trình VII ở Điều 21, bán kính vectơ có dạng

$$
r
=
\frac{q}{(1-T)\cos^2\frac12\nu}
=
\frac{(1+\frac12A+C)q}
{(1-\frac12A+C)\cos^2\frac12\nu}.
$$

## §45

Phần sau của bảng thứ nhất, được nối thêm vào công trình này, dành cho chuyển động hyperbol, như đã nói ở trên. Với đối số \(A\), cũng là phần chung của hai bảng, bảng cho logarithm của \(B\) và đại lượng \(C\) đến bảy chữ số thập phân, bỏ các chữ số có nghĩa ở trước, còn \(T\) được cho đến năm, rồi đến sáu chữ số. Phần này cũng được kéo dài, giống phần trước, đến \(A=0{,}300\), ứng với

$$
T=0{,}241207,
\qquad
u=2{,}980
\quad\text{hoặc}\quad
0{,}341,
\qquad
F=\pm58^\circ19'.
$$

Mở rộng thêm sẽ là thừa, như đã nêu ở Điều 36.

Bây giờ ta trình bày thứ tự phép tính, vừa để xác định thời gian từ anomalia thật, vừa để xác định anomalia thật từ thời gian. Trong bài toán trước, ta đã có

$$
T=\frac{e-1}{e+1}\tan\frac12\nu.
$$

Từ \(T\), bảng của ta cho \(\log B\) và \(C\), rồi

$$
A=\frac{(1+C)T}{1-\frac12T},
$$

và cuối cùng, theo công thức (2) ở Điều trước, ta tìm được \(t\).

Trong bài toán sau, trước tiên tính các logarithm của các hằng số

$$
\alpha=\frac{75kt\sqrt{\frac12+\frac32e}}{2q^{3/2}},
\qquad
\beta=\frac{5e-5}{1+9e},
\qquad
\gamma=\sqrt{\frac{5e+5}{1+9e}}.
$$

Khi ấy, \(A\) được xác định từ \(t\) theo cùng cách như trong chuyển động elip: chuyển động trung bình \(\alpha t/B\) trong bảng Barker ứng với anomalia thật \(w\), và ta đặt

$$
A=\beta\tan^2\frac12w.
$$

Trước tiên, ta tìm giá trị xấp xỉ của \(A\), bỏ qua hệ số \(B\), hoặc dùng hệ số ấy nếu đã có; bảng của ta cung cấp giá trị xấp xỉ của \(B\), rồi ta lặp lại phép tính. Giá trị mới của \(B\) hầu như không cần hiệu chỉnh đáng kể, nên không cần lặp lại phép tính thêm lần nữa. Khi đã sửa xong giá trị của \(A\), ta lấy \(C\) từ bảng, và do đó có

$$
\tan\frac12\nu
=
\frac{\gamma\tan\frac12w}{\sqrt{1+\frac12A+C}},
\qquad
r=
\frac{(1+\frac12A+C)q}
{(1-\frac12A+C)\cos^2\frac12\nu}.
$$

Như vậy, không có sự khác biệt nào giữa các công thức cho chuyển động elip và hyperbol, nếu ta coi \(\beta,A,T\) trong chuyển động hyperbol là những đại lượng âm.

## §46

Chuyển động hyperbol cũng nên được minh họa bằng vài ví dụ. Ta dùng lại các số ở các Điều 23 và 26.

### I

Cho

$$
e=1{,}2618820,
\qquad
\log q=0{,}0201657,
\qquad
\nu=18^\circ51'0''.
$$

Ta cần tìm \(t\).

$$
\begin{aligned}
2\log\tan\frac12\nu&=8{,}4402018,\\
\log\frac{e-1}{e+1}&=9{,}0636557,\\
\log T&=7{,}5038575,\\
T&=0{,}00319054,\\
\log B&=0{,}0000001,\\
C&=0{,}0000005.
\end{aligned}
$$

Tiếp theo,

$$
\begin{aligned}
\log\frac{2Bq^{3/2}}{k\sqrt{e-1}}&=2{,}3866444,\\
\log\frac{2B(1+9e)}{15k}
\left(\frac{q}{e-1}\right)^{3/2}&=2{,}8843582,\\
\log A^{3/2}&=8{,}7594738,\\
\log A^{1/2}&=7{,}5049476,\\
\log 13{,}77584&=1{,}1391182,\\
\log 0{,}138605&=9{,}1417796,
\end{aligned}
$$

và

$$
\frac{0{,}13861}{13{,}91445}=t.
$$

### II

Giữ nguyên \(e\) và \(q\) như trên, cho

$$
t=65{,}41256,
$$

ta cần tìm \(\nu\) và \(r\). Các logarithm của các hằng số là

$$
\log\alpha=9{,}9758545,
\qquad
\log\beta=9{,}0251649,
\qquad
\log\gamma=9{,}9807046.
$$

Từ đó

$$
\log(\alpha t)=1{,}7914943.
$$

Bảng Barker cho giá trị xấp xỉ

$$
w=70^\circ31'44'',
$$

và do đó

$$
A=0{,}052983.
$$

Giá trị này của \(A\), tra trong bảng của ta, cho

$$
\log B=0{,}0000207,
$$

nên

$$
\log\frac{\alpha t}{B}=1{,}7914736.
$$

Giá trị đúng của \(w\) là

$$
w=70^\circ31'36'',86.
$$

Các phép tính còn lại được trình bày như sau.

<!-- PDF 60, trang in 43, tiếp theo §46 -->

$$
\begin{aligned}
2\log\tan^2\frac12w&=9{,}6989398,\\
\log\beta&=9{,}0251649,\\
\log A&=8{,}7241047,\\
A&=0{,}05297911,\\
C&=0{,}0001252,\\
1+\frac12A+C&=1{,}0425085,\\
1-\frac12A+C&=0{,}9895294.
\end{aligned}
$$

Ở phía bên kia,

$$
\begin{aligned}
\log\tan\frac12w&=9{,}8494699,\\
\log\gamma&=9{,}9807046,\\
\frac12\operatorname{Comp.log}\left(1+\frac12A+C\right)&=9{,}9990602,\\
\log\tan\frac12\nu&=9{,}8211947,\\
\frac12\nu&=33^\circ31'30'',02,\\
\nu&=67^\circ3'0'',04,\\
\log q&=0{,}0201657,\\
\operatorname{Comp.log}\cos\frac12\nu&=0{,}1580578,\\
\log\left(1+\frac12A+C\right)&=0{,}0180796,\\
C.\log\left(1-\frac12A+C\right)&=0{,}0004573,\\
\log r&=0{,}2008544.
\end{aligned}
$$

<!-- PDF 61, trang in 44, kết thúc Section I -->

Những giá trị tìm được ở trên, theo Điều 26, là

$$
\nu=67^\circ2'59'',78,
\qquad
\log r=0{,}2008541.
$$

Như vậy, các sai số nằm ở phía dư. Lẽ ra \(\nu\) phải bằng

$$
67^\circ3'0'',00.
$$

Khi lấy giá trị ấy làm giả định, giá trị của \(t\) tính bằng những bảng lớn hơn sẽ đúng như mong muốn.

<!-- Section I kết thúc ở PDF 61; Section II bắt đầu từ PDF 62. -->
