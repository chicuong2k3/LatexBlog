---
title: "Sách I, Phần I (tiếp): Phương pháp và công thức truy hồi"
summary: "Tiếp nối Phần I của Liber Primus: phương pháp xác định anomalia, các ví dụ số, phương trình vi phân, phương trình tâm cực đại, chuyển động parabol và các đại lượng phụ của hyperbol."
slug: "liber-primus-phan-i-tiep"
number: 2
---

# Liber Primus, Phần I (tiếp)

<!-- Nguồn: PDF 30–44, bắt đầu tại trang in 13. Bản dịch đang được soạn; phần tiếp theo của Phần I bắt đầu ở PDF 45. -->

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

<!-- Phần tiếp theo của §32 bắt đầu từ PDF 45. -->
