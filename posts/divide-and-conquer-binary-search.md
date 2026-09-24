---
title: "Chia để trị và binary search"
date: 2026-09-23
tags: [thuat-toan, thiet-ke-thuat-toan, functional, csharp]
summary: "Từ phép chia để trị đến binary search một chiều và hai chiều, với ví dụ C#, lỗi tràn số, saddleback search, cây tìm kiếm nhị phân cân, cận Fibonacci, cận dưới Ω(n log n) và các phép xóa, ghép, tách tập hợp động."
slug: divide-and-conquer-binary-search
---

# Chia để trị

Cùng là thu nhỏ một bài toán có $n$ phần tử, nhưng bớt từng phần tử và bỏ một nửa ở mỗi bước là hai chuyện khác nhau. Nếu bài toán lớn chưa giải được ngay, ta thử giải những bài nhỏ hơn cùng dạng. Thu nhỏ mỗi lần bao nhiêu mới thực sự giúp ta bớt việc? Bớt từng phần tử thì vẫn phải đi qua khoảng $n$ bài toán, chẳng khác mấy làm tuần tự.

Giả sử thay vào đó, mỗi lần ta chỉ cần giải tiếp một bài bằng khoảng một nửa bài trước. Kích thước giảm theo chuỗi

$$
n,\quad \frac n2,\quad \frac n4,\quad \frac n8,\quad \ldots
$$

So với việc mỗi lần bớt một phần tử, dãy này ngắn hơn hẳn. Đặt hai cách cạnh nhau, ta đếm được số bước của từng cách.

Trong tiếng Latin, *divide et impera* nghĩa là “chia để trị”. Vốn là một phương châm chính trị, cụm từ này được mượn để gọi cách giải bài toán bằng các bài nhỏ hơn rồi ghép kết quả lại. Bài con phải cùng dạng với bài ban đầu thì mới áp dụng tiếp được cách giải ấy. Đến trường hợp đủ nhỏ để xử lý trực tiếp, ta dừng đệ quy. Trường hợp dừng này gọi là *base case*.

Nhưng chia nhỏ không nhất thiết là chia đôi. Một `fold` cũng xử lý một phần tử rồi làm tiếp với $n-1$ phần tử còn lại. Kích thước khi ấy giảm theo

$$
n\to n-1\to n-2\to\cdots\to1.
$$

Đường này dài khoảng $n$ bước, còn nếu liên tục chỉ phải giải một bài bằng nửa bài trước thì đi theo

$$
n\to n/2\to n/4\to\cdots\to1
$$

và sau khoảng $\log_2 n$ lần chia đã xuống tới $1$. Đây là số bước **dọc một nhánh**. Nếu mỗi lần tách ra hai bài con rồi giải cả hai, tổng thời gian còn tính cả công việc ở nhánh kia và chi phí ghép kết quả.

Không nhất thiết phải chia đôi. Có thuật toán tạo bài con cỡ $n/4$; có thuật toán tạo hai bài con cỡ $n/5$ và $7n/10$. Các bài con đều nhỏ đi theo một tỉ lệ cố định, nên một đường đệ quy không thể kéo dài mãi.

Hai nhánh có thể gặp cùng một bài con và tính lại nó. Khi đó, memoization hoặc dynamic programming lưu kết quả của lần tính trước. Nếu các bài con độc lập, ta còn có thể chạy song song bằng `Parallel.For` hoặc PLINQ. Nhưng trước khi tính chuyện lưu hay chạy song song, ta vẫn phải đếm số bài con mà thuật toán tạo ra.

# Binary search

Ta vừa xét trường hợp mỗi lần chia có thể còn nhiều bài con. Tìm một giá trị trong dãy đã sắp xếp thì khác. So với phần tử giữa, nếu nó lớn hơn mục tiêu, ta bỏ nửa bên phải; nếu nó nhỏ hơn, ta bỏ nửa bên trái. Thứ tự của dãy bảo đảm nửa bị bỏ không chứa đáp án. Từ $n$ ứng viên, chỉ còn khoảng $n/2$.

Chỉ một nửa còn cần tìm tiếp. Nếu mỗi phép so sánh tốn thời gian hằng số, thời gian tìm kiếm thỏa hệ thức

$$
T(n)=T(n/2)+O(1)
$$

thay vì $2T(n/2)+O(1)$.

Dãy đã sắp xếp không nhất thiết phải được lưu sẵn. Nếu muốn biết giá trị ở vị trí $x$, ta có thể tính $f(x)$. Khi nào phép bỏ nửa vẫn đúng?

## Bài toán tìm kiếm một chiều

Nó đúng khi hàm cho các giá trị theo đúng thứ tự tăng. Xét một hàm chặt tăng

$$
f:\mathbb N\to\mathbb N,
$$

nghĩa là nếu $x<y$ thì $f(x)<f(y)$. Với một giá trị mục tiêu $t$, ta muốn tìm $x$ sao cho

$$
f(x)=t.
$$

Có thể không tồn tại $x$ như vậy, nhưng nếu tồn tại thì nó chỉ có một. Giả sử có hai giá trị $x_1<x_2$ cùng cho kết quả $t$, tính chặt tăng lại buộc $f(x_1)<f(x_2)$, mâu thuẫn với việc cả hai đều bằng $t$.

Miền $\mathbb N$ vô hạn. Vậy lấy đâu ra đoạn để tìm? Vì $f(0)\ge 0$ và mỗi lần $x$ tăng $1$ thì $f(x)$ tăng ít nhất $1$, ta có $f(x)\ge x$. Nếu $f(x)=t$, nhất định $x\le t$. Vậy chỉ cần xét

$$
0\le x\le t.
$$

Đến đây ta có thể thử lần lượt mọi $x$ trong đoạn, chưa cần dùng tính đơn điệu.

```csharp
static IEnumerable<int> Search(Func<int, int> f, int t)
    => Enumerable.Range(0, t + 1)
                 .Where(x => f(x) == t);
```

Dãy kết quả rỗng hoặc có một phần tử vì nghiệm, nếu có, là duy nhất. Đoạn mã mới dùng thông tin rằng nghiệm nằm trong $[0,t]$; nó vẫn tính $f(x)$ ở mọi vị trí, dù $f$ tăng chặt.

Giữ đoạn đang xét là $[a,b]$ rồi chọn điểm $m$ ở giữa. Nếu $t=f(m)$ thì xong. Nếu $t<f(m)$ thì mọi $x>m$ đều cho giá trị lớn hơn $t$ (vì $f$ chặt tăng), nên nửa phải vô dụng. Ngược lại, nếu $t>f(m)$ thì nửa trái vô dụng. Mỗi phép so sánh loại được khoảng một nửa số ứng viên còn lại. Mã C# thực hiện phép loại ấy.

```csharp
static IEnumerable<int> Search(Func<int, int> f, int t)
    => Seek(f, t, 0, t);

static IEnumerable<int> Seek(Func<int, int> f, int t, int a, int b)
{
    if (a > b) return [];
    int m = a + (b - a) / 2;
    int fm = f(m);
    return t < fm  ? Seek(f, t, a, m - 1)
         : t == fm ? [m]
         : Seek(f, t, m + 1, b);
}
```

Mỗi lần chỉ giữ nửa đoạn còn có khả năng chứa nghiệm. Đó là **binary search**. Trên $[0,t]$, cần $O(\log(t+1))$ lần gọi $f$ nếu phép tính và so sánh đều có chi phí hằng số.

Không tính điểm giữa bằng $(a+b)/2$. Tổng có thể tràn `int` dù hai đầu mút hợp lệ. Ở đây $0\le a\le b\le t$, nên cách tính $a+(b-a)/2$ tránh được lỗi ấy.

Nhưng chương trình C# chưa thực hiện đúng bài toán trên $\mathbb N$. Kiểu `int` không phải số tự nhiên có độ chính xác vô hạn. Với một số hàm, chương trình **trả `[]` dù nghiệm tồn tại**.

## Bug tràn số

Thử $f(n) = 2^n$, $t = 1024$. Đáp án đúng là $[10]$. `Search` trả `[]`.

Lần đầu `Seek(f, t, 0, t)` lấy $m=512$. Về toán học, phép so sánh phải là $1024<2^{512}$. Nhưng `F(512)` dưới đây trả $0$ khi dùng `int`, nên mã lại so $1024<0$.

```csharp
static int F(int n)
{
    int result = 1;
    for (int i = 0; i < n; i++)
        result = unchecked(result * 2);
    return result;
}
```

`unchecked` im lặng bọc vòng modulo $2^{32}$, mà $2^{512} \equiv 0 \pmod{2^{32}}$ vì $512 \ge 32$. `F(512)` trả $0$. So sánh $1024 < 0$ sai, $1024 = 0$ sai, đệ quy đi nhầm nửa và không bao giờ gặp $x=10$. (`checked` thì ném exception ngay dòng `result * 2`.)

Dùng `BigInteger` tránh tràn số, nhưng lần hỏi $f(512)$ vẫn tốn công trong khi nghiệm là $10$. Với một hàm $f$ đắt hơn phép lũy thừa, khoản này càng lớn.

Nếu viết điều kiện trực tiếp thành $t<f(m)$ rồi $t=f(m)$, ta còn gọi $f$ hai lần khi nhánh đầu sai. Đoạn `Seek` ở trên đã tránh lỗi này bằng biến `fm`.

```csharp
static IEnumerable<int> Seek(Func<int, int> f, int t, int a, int b)
{
    if (a > b) return [];
    int m = a + (b - a) / 2;
    int fm = f(m);
    return t < fm  ? Seek(f, t, a, m - 1)
         : t == fm ? [m]
         : Seek(f, t, m + 1, b);
}
```

Biến `fm` giúp mỗi bước chỉ gọi $f$ một lần, dù có thể phải so sánh hai lần. Vẫn còn lần hỏi $f(512)$ không cần thiết. Thử lần lượt $b=1,2,4,8,\ldots$ đến khi $t\le f(b)$, rồi tìm trong $(a,b]$ với $f(a)<t$. Vì $f(t)\ge t$, không phải thử quá $t$. Đó là **exponential search** (hay galloping search). Trường hợp $t\le f(0)$ cần xử lý riêng. Cặp $(-1,0)$ chỉ là hai mốc giả để dùng lại phép tìm vị trí đầu tiên, không có nghĩa là gọi $f(-1)$.

```csharp
static (int A, int B) Bound(Func<int, int> f, int t)
{
    if (t <= f(0)) return (-1, 0);
    int b = 1;
    while (t > f(b))
        b = b > t / 2 ? t : b * 2;
    return (b / 2, b);
}
```

Điều kiện $b>t/2$ chặn trước khi phép nhân đôi có thể vượt $t$ hoặc tràn `int`. Vì $f(t)\ge t$, vòng lặp dừng chậm nhất ở $b=t$. Khi vòng lặp còn chạy, mốc cũ có $f(b)<t$; mốc mới là $2b$ hoặc $t$. Trong cả hai trường hợp, $\lfloor b_{\rm mới}/2\rfloor\le b_{\rm cũ}$, nên ở cuối hàm $a=b/2$ vẫn thỏa $f(a)<t$, còn $f(b)\ge t$. Nếu $t\le f(0)$, hàm trả $(-1,0)$ và chỉ số $-1$ đóng vai trò mốc giả. Mã giả sử $t\ge0$ và $f$ được tính không tràn; với $t=0$, nhánh đầu dừng ngay.

Nếu $f(x)=x$, `Bound` thử các mốc đến gần $t$, cần $O(\log(t+1))$ lần gọi $f$. Với $f(x)=2^x$, điều kiện dừng xảy ra khi $b$ mới vào khoảng $\log_2 t$, nên cần $O(1+\log\log(t+2))$ mốc thử. Các cận này đếm lần gọi, chưa tính chi phí tính lũy thừa ở mỗi mốc.

Giờ chỉ cần trong $[a{+}1..b]$ tìm $x$ **nhỏ nhất** sao cho $t\le f(x)$. Vị trí ấy tồn tại vì $t\le f(b)$. Trước tiên, thử tìm tuần tự.

```csharp
static int Smallest(int a, int b, Func<int, int> f, int t)
    => Enumerable.Range(a + 1, b - a).First(x => t <= f(x));
```

Điều kiện $t\le f(x)$ sai ở đầu đoạn và đúng từ một vị trí nào đó trở đi. Ta tìm vị trí đầu tiên nó đúng bằng binary search.

```csharp
static IEnumerable<int> Search(Func<int, int> f, int t)
{
    var (a, b) = Bound(f, t);
    int x = Smallest(a, b, f, t);
    return f(x) == t ? [x] : [];
}

static int Smallest(int a, int b, Func<int, int> f, int t)
{
    // seek x nhỏ nhất trong (a, b] với t <= f(x); nếu không có, trả b
    while (a + 1 < b)
    {
        int m = a + (b - a) / 2;
        if (t <= f(m)) b = m;
        else a = m;
    }
    return b;
}
```

Vòng `while` giữ nguyên đoạn $(a,b]$ có thể chứa vị trí đầu tiên đạt $t\le f(x)$. Khi $f(m)\ge t$, mọi $x\ge m$ không thể là vị trí đầu tiên nếu còn $m$, nên thay $b$ bằng $m$; khi $f(m)<t$, mọi $x\le m$ đều chưa đạt ngưỡng, nên thay $a$ bằng $m$. Mỗi bước giảm $b-a$, và lúc $b=a+1$ chỉ còn $b$ để trả. Trong lời gọi từ `Bound`, ta biết $f(b)\ge t$, nên đó thật là vị trí đầu tiên. Trong các lời gọi trên một hàng hoặc cột về sau, nếu không ô nào đạt ngưỡng, hàm vẫn trả $b$; vì vậy mã phải hỏi lại $f(b)$ để nhận ra trường hợp ấy. Vòng lặp có thể viết bằng đệ quy; tách `Smallest` ra vì phần tìm kiếm hai chiều sẽ dùng lại.

Phiên bản cuối có những điểm sau.

- mỗi vòng của `Smallest` gọi $f$ **một lần** và so sánh một lần với $t$; sau đó `Search` gọi thêm $f(x)$ để kiểm tra dấu bằng;
- không gọi $f(-1)$, cũng không cần ký hiệu $-\infty$ làm giá trị giả; nhưng `f` vẫn phải trả kết quả chính xác để các so sánh giữ được tính đơn điệu;
- không gọi $f(a)$.

Mã dùng `int` còn một giới hạn độc lập. Nếu $t=\texttt{int.MaxValue}$, phép tính $b-a$ trong `Smallest(-1,t,...)` và $t+1$ trong `Enumerable.Range` có thể tràn. Cần kiểu chỉ số rộng hơn hoặc xử lý riêng biên này trước khi gọi phiên bản đó; đổi cách tính midpoint một mình chưa đủ.

## Đếm số lần gọi

Lỗi tràn số thuộc về kiểu dữ liệu; còn với các phép tính chính xác, `Smallest` hỏi $f$ bao nhiêu lần? Gọi $T(n)$ là số lần gọi $f$ trên đoạn có $n=b-a$ ứng viên, tức số phần tử trong $(a,b]$. Khi $n=1$ thì `while (a + 1 < b)` không chạy, nên $T(1)=0$.

Sau một lần hỏi ở $m=a+\lfloor(b-a)/2\rfloor$, nếu đáp án nằm bên trái thì đoạn mới có $\lfloor n/2\rfloor$ ứng viên; nếu nằm bên phải thì có $\lceil n/2\rceil$. Vì vậy **số lần gọi lớn nhất** $T(n)$ thỏa

$$
T(1)=0,\qquad T(n)=1+T(\lceil n/2\rceil)\quad(n>1).
$$

Để thấy lời giải chính xác, đặt $k=\lceil\log_2 n\rceil$. Khi $n>1$, ta có $2^{k-1}<n\le2^k$, nên $2^{k-2}<\lceil n/2\rceil\le2^{k-1}$ nếu $k>1$; với $k=1$ thì $\lceil n/2\rceil=1$. Bởi vậy số mũ trần giảm đúng một sau mỗi bước ở nhánh dài nhất. Sau $k$ bước đoạn còn một ứng viên, nên

$$
T(n)=\lceil\log_2 n\rceil.
$$

Nếu chỉ cần bậc tăng, có thể bỏ dấu làm tròn để viết gọn quá trình khai triển

$$
T(n)\approx1+T(n/2)\approx2+T(n/4)\approx\dots\approx k+T(n/2^k).
$$

Đây là phép **ước lượng**, không dùng để suy ra số lần gọi chính xác. Mỗi vòng gọi $f$ một lần; nếu tính $f(x)$ mất $\Theta(1)$ thì thời gian xấu nhất của `Smallest` là $\Theta(\log n)$.

Binary search chỉ giải một nửa. Nếu phải giải cả hai nửa và gộp chúng với chi phí $\Theta(n)$, như merge sort, ta có hệ thức sau.

$$
T(n)=2T(n/2)+cn,\qquad T(1)=0
$$

Giả sử $n=2^k$ để khi khai triển không phải dùng dấu làm tròn.

$$
\begin{aligned}
T(n) &= cn + 2T(n/2) \\
     &= cn + 2\bigl(cn/2 + 2T(n/4)\bigr) = 2cn + 4T(n/4) \\
     &= \dots = kcn + 2^k T(1) = kn c
\end{aligned}
$$

$k=\log_2 n$ nên $T(n)=cn\log_2 n=\Theta(n\log n)$ nếu $c>0$. Bậc này gọi là **linearithmic** (linear + logarithmic, tuyến tính nhân logarit); viết $\Theta(n)$ thay $cn$ ở mỗi tầng vẫn cho cùng bậc.

# Bài toán tìm kiếm hai chiều

Trên dãy một chiều, so một giá trị là biết nên tìm bên trái hay bên phải. Nếu các giá trị nằm trong một lưới, một ô ở giữa còn có thể giúp ta bỏ phần nào? Xét $f$ nhận hai tọa độ và tăng chặt theo từng tọa độ.

$$
x < x' \Rightarrow f(x,y) < f(x',y),
\qquad
y < y' \Rightarrow f(x,y) < f(x,y').
$$

Bài toán là tìm **tất cả** cặp $(x,y)$ có $f(x,y)=t$. Tăng một tọa độ trong khi giảm tọa độ kia có thể giữ nguyên giá trị, nên không còn lý do để chỉ có một nghiệm.

Xếp các giá trị $f(x,y)$ thành lưới, cột mang chỉ số $x$ và hàng mang chỉ số $y$. Góc dưới-trái là $(0,0)$; chẳng hạn một ô ở góc trên-phải có tọa độ $(11,13)$. Sang phải hoặc đi lên thì số trong ô tăng. Bài toán là tìm mọi ô chứa $472$.

Vì $f(0,0)\ge0$, đi từ $(0,0)$ đến $(x,y)$ đòi $x$ bước sang phải và $y$ bước lên; mỗi bước làm giá trị tăng ít nhất $1$. Do đó $f(x,y)\ge x+y$. Nếu $f(x,y)=t$ thì $x,y\le t$, nên quét $[0,t]^2$ sẽ không sót nghiệm.

```csharp
static IEnumerable<(int X, int Y)> Search(Func<int, int, int> f, int t)
    => from x in Enumerable.Range(0, t + 1)
       from y in Enumerable.Range(0, t + 1)
       where f(x, y) == t
       select (x, y);
```

Có $(t+1)^2$ ô, tức $\Theta(t^2)$ lần gọi $f$ nếu mỗi lần tính là hằng số. Ngay trong một cột cũng có thể dừng sớm. Sau khi gặp $f(x,y)\ge t$, mọi ô phía trên đều lớn hơn $t$; ô hiện tại chỉ giữ nếu bằng $t$.

Dừng sớm ở từng cột mới dùng tính tăng theo $y$. Muốn loại cả hàng bằng tính tăng theo $x$, ta bắt đầu từ góc trên-trái.

## Saddleback search

Để bắt đầu từ góc trên-trái, trước hết đổi cách quét cũ thành đi từ trái sang phải và từ trên xuống dưới trong từng cột. Chỉ đảo thứ tự thì vẫn phải hỏi đủ mọi ô.

```csharp
static IEnumerable<(int X, int Y)> Search(Func<int, int, int> f, int t)
    => from x in Enumerable.Range(0, t + 1)
       from y in Enumerable.Range(0, t + 1).Reverse()
       where f(x, y) == t
       select (x, y);
```

Từ góc trên-trái $(a,b)$, sang phải làm $f$ tăng còn đi xuống làm $f$ giảm. Hai hướng ngược nhau ấy cho phép xét $f(a,b)$ rồi bỏ hẳn một hàng hoặc một cột.

- Nếu $f(a,b) < t$, mọi ô trong cột $a$ có $y \le b$ đều cho giá trị $\le f(a,b) < t$ (vì $f$ tăng theo $y$), nên **toàn bộ cột $a$** loại được. Chuyển sang cột $a+1$.
- Nếu $f(a,b) > t$, mọi ô trong hàng $b$ có $x \ge a$ đều cho giá trị $\ge f(a,b) > t$ (vì $f$ tăng theo $x$), nên **toàn bộ hàng $b$** loại được. Chuyển sang hàng $b-1$.
- Nếu $f(a,b) = t$, cả cột $a$ và hàng $b$ đều loại được, vì $f(a,b') < f(a,b)$ khi $b' < b$ và $f(a',b) > f(a,b)$ khi $a' > a$. Chỉ trong trường hợp cuối này ta cần $f$ **chặt** tăng. Nếu $f$ chỉ không giảm, trên cùng hàng hoặc cột có thể có ô khác cũng bằng $t$.

Gộp các trường hợp, đổi tên $(a,b)$ thành $(x,y)$, ta viết được chương trình sau.

```csharp
static IEnumerable<(int X, int Y)> Search(Func<int, int, int> f, int t)
    => SearchIn(0, t, f, t);

static IEnumerable<(int X, int Y)> SearchIn(int x, int y, Func<int, int, int> f, int t)
{
    if (x > t || y < 0) return [];
    int z = f(x, y);
    return z < t  ? SearchIn(x + 1, y, f, t)
         : z == t ? [(x, y), .. SearchIn(x + 1, y - 1, f, t)]
         : SearchIn(x, y - 1, f, t);
}
```

Cách đi dọc mép vùng còn lại gọi là **saddleback search**. Trên hình chữ nhật $p\times q$, nếu chưa gặp nghiệm, ta tăng chỉ số cột hoặc giảm chỉ số hàng; khi gặp nghiệm, cả hai cùng đổi. Để ra khỏi hình, cần nhiều nhất $p$ lần tăng cột và $q$ lần giảm hàng. Bước cuối đã ra khỏi hình nên ta hỏi $f$ nhiều nhất $p+q-1$ lần. Nếu lần nào cũng gặp $t$, mỗi bước đi chéo và cần $\min(p,q)$ lần; có đầu vào cho phép dừng sớm hơn cả thế. Trên $[0,t]^2$, đây là cận trên $O(t+1)$, không phải thời gian của mọi lần chạy.

Với $f(x,y)=x^2+3^y$ và $t=20259$, phép đếm cho $20402$ lần tính $f$ và đáp án $[(24,9)]$. Muốn chạy ví dụ này đúng như toán học, phải dùng số nguyên đủ lớn, vì `int` tràn khi tính $3^y$ ở nhiều ô trên đường đi.

Trên lưới $[0,t]^2$, số lần hỏi đã giảm từ $(t+1)^2$ xuống không quá $2t+1$. Mã đệ quy có thể làm tràn call stack của C# khi $t$ lớn; vòng lặp giữ hai biến $x,y$ sẽ đi qua đúng những ô đó mà không cần ngăn xếp lời gọi.

## Dùng binary search tìm góc khởi động

Saddleback đã bỏ được cả hàng hoặc cột sau mỗi phép hỏi, nhưng bắt đầu ở $(0,t)$ thì vẫn có thể phải đi qua nhiều hàng không chứa nghiệm. Trên cột $x=0$, nếu $f(0,y)>t$, cả hàng $y$ và mọi hàng phía trên đều quá lớn. Hàng $y=0$ cho một giới hạn tương tự ở phía phải. Ta tìm trên mỗi cạnh vị trí đầu tiên có giá trị ít nhất $t$ bằng `Smallest`.

$$
\begin{aligned}
p &= \texttt{smallest}\,(-1,t)\,(\lambda y.\,f(0,y))\, t, \\
q &= \texttt{smallest}\,(-1,t)\,(\lambda x.\,f(x,0))\, t,
\end{aligned}
$$

Trên cột $x=0$, vì $p$ là hàng đầu tiên có $f(0,p)\ge t$, mọi $y>p$ đều cho $f(0,y)>t$; tăng $x$ chỉ làm giá trị lớn hơn nữa, nên toàn bộ phần phía trên $p$ bị loại. Tương tự, nếu $q$ là cột đầu tiên có $f(q,0)\ge t$ thì toàn bộ phần bên phải $q$ bị loại. Nếu không có vị trí đạt ngưỡng trên một cạnh, `Smallest` trả đầu mút $t$, vẫn là mốc hợp lệ vì ta vốn chỉ xét $[0,t]^2$. Saddleback giờ chỉ cần xét hình chữ nhật có hai góc $(0,p)$ và $(q,0)$.

```csharp
static IEnumerable<(int X, int Y)> Search(Func<int, int, int> f, int t)
{
    int p = Smallest(-1, t, y => f(0, y), t);
    int q = Smallest(-1, t, x => f(x, 0), t);
    return SearchIn(0, p, f, t, q);
}

static IEnumerable<(int X, int Y)> SearchIn(int x, int y, Func<int, int, int> f, int t, int xmax)
{
    if (x > xmax || y < 0) return [];
    int z = f(x, y);
    return z < t  ? SearchIn(x + 1, y, f, t, xmax)
         : z == t ? [(x, y), .. SearchIn(x + 1, y - 1, f, t, xmax)]
         : SearchIn(x, y - 1, f, t, xmax);
}
```

Tìm hai biên cần $O(\log(t+1))$ lần gọi $f$, rồi saddleback cần nhiều nhất $p+q+1$ lần. Khi $p,q$ nhỏ, số lần gọi có thể ở bậc $O(\log(t+1))$. Với $f(x,y)=x^2+3^y$ và $t=20259$, ta có $f(0,9)=19683<t<f(0,10)=59049$, nên $p=10$. Tương tự, $f(142,0)=20165<t<f(143,0)=20450$, nên $q=143$. Hai lượt tìm biên gọi $f$ $28$ lần, đường saddleback trong hình nhỏ gọi thêm $153$ lần. Tổng là **$181$**, so với $20402$ khi bắt đầu ở $(0,t)$.

Hai biên vừa tìm giúp saddleback bắt đầu gần nghiệm hơn, nhưng từ đó thuật toán vẫn đi từng hàng hoặc từng cột. Nếu hỏi một ô ở giữa hình chữ nhật còn lại, liệu ta có bỏ được nhiều ô hơn trong một lần? Câu trả lời phụ thuộc vị trí của ô ấy so với mục tiêu.

## Chia để trị ở giữa lưới

Giả sử ta chỉ tìm trong hình chữ nhật có góc trên-trái $(x_1,y_1)$ và góc dưới-phải $(x_2,y_2)$. Thử so sánh trước giá trị $f(x,y)$ với $x = \lfloor(x_1+x_2)/2\rfloor$ và $y = \lfloor(y_1+y_2)/2\rfloor$.

Nếu $f(x,y)<t$, mọi ô có $x'\le x$ và $y'\le y$ đều nhỏ hơn $t$, nên bỏ hình dưới-trái. Nếu $f(x,y)>t$, mọi ô có $x'\ge x$ và $y'\ge y$ đều lớn hơn $t$, nên bỏ hình trên-phải. Nếu bằng $t$, ghi nhận ô giữa rồi bỏ cả hai vùng ấy (các ô khác cùng hàng hoặc cùng cột cũng không thể bằng $t$).

Sau trường hợp $f(x,y)<t$, phần chưa loại có dạng chữ L. Cắt nó theo hàng $y$ thành vùng **phía trên** gồm mọi cột với $y'>y$, và vùng **dưới-phải** với $x'>x$, $y'\le y$. Nếu $f(x,y)>t$, làm đối xứng, giữ vùng dưới và vùng trên-trái. Khi bằng $t$, ghi nhận $(x,y)$ rồi chỉ còn vùng trên-trái và dưới-phải. Hai vùng được chọn không giao nhau, nên không hỏi trùng ô.

Gọi $T(m,n)$ là số lần hỏi $f$ nhiều nhất trên hình chữ nhật $m\times n$. Nếu $m=0$ hoặc $n=0$, không còn ô để hỏi nên $T(m,n)=0$. Cách chia hình chữ L ở trên sẽ cho hệ thức truy hồi trước khi ta viết mã.

Nếu $m=1$ hoặc $n=1$, bài toán thu về binary search một chiều.

$$
\begin{aligned}
T(1,n) &= 1 + T(1,n/2), \\
T(m,1) &= 1 + T(m/2,1).
\end{aligned}
$$

Còn khi $m \ge 2$ và $n \ge 2$, ta vứt được hình chữ nhật kích thước ít nhất $m/2 \times n/2$. Nếu cắt ngang như vừa mô tả, vùng phía trên cao tối đa $\lceil m/2\rceil$ và rộng $n$; vùng dưới-phải cao tối đa $\lceil m/2\rceil$, rộng tối đa $\lceil n/2\rceil$. Hai vùng sau trường hợp $f(x,y)>t$ hoặc $f(x,y)=t$ không lớn hơn hai vùng này. Vì thế, **cận trên** số lần hỏi thỏa

$$
T(m,n)\le 1+T(\lceil m/2\rceil,n)+T(\lceil m/2\rceil,\lceil n/2\rceil).
$$

Nếu cắt dọc thay vì ngang, đổi vai trò hai chiều để có

$$
T(m,n)\le 1+T(m,\lceil n/2\rceil)+T(\lceil m/2\rceil,\lceil n/2\rceil).
$$

Dấu $\le$ quan trọng, vì ở các trường hợp so sánh khác nhau ta có thể bỏ thêm ô; đây không phải một công thức đếm chính xác.

Khi $m\le n$, cắt ngang để giảm chiều $m$; khi $m>n$, cắt dọc để giảm chiều $n$.

Để giải **cận trên**, tạm bỏ dấu làm tròn, giả sử $m=2^i$, $n=2^j$, $i\le j$, rồi xét hệ thức bằng nhau của bài toán lý tưởng hóa. Gọi số lần theo mô hình ấy là $U(i,j)$. Trên một hàng có $2^j$ ô, binary search cần tối đa $j+1$ lần hỏi; để phép tính dưới đây gọn hơn, tạm không đếm lần hỏi ở ô cuối và lấy $U(0,j)=j$. Với thuật toán thực, các trường hợp biên và dấu làm tròn thay đổi hằng số, không biến hệ thức cận trên thành đẳng thức.

$$
\begin{aligned}
U(0,j) &= j, \\
U(i{+}1,j{+}1) &= 1 + U(i,j) + U(i,j{+}1).
\end{aligned}
$$

Với quy ước ấy, thử đặt $U(i,j)=2^i g(i,j)-1$; thế vào được

$$
\begin{aligned}
g(0,j) &= j + 1, \\
2g(i{+}1,j{+}1) &= g(i,j) + g(i,j{+}1).
\end{aligned}
$$

Thử $g(i,j)=ai+bj+c$ để khớp điều kiện biên và phép truy hồi.

$$
\begin{aligned}
bj + c &= j + 1, \\
2(a(i{+}1) + b(j{+}1) + c) &= ai + bj + c + ai + b(j{+}1) + c.
\end{aligned}
$$

Từ $bj+c=j+1$ suy ra $b=c=1$. So hệ số của $i,j$ trong phương trình còn lại, ta được $2a+2b=a+b$, tức $a=-1/2$. Công thức phỏng đoán là

$$
U(i,j) = 2^i(j - i/2 + 1) - 1.
$$

Có thể kiểm tra bằng quy nạp theo $i$. Với $i=0$, vế phải bằng $j$. Giả sử công thức đúng cho $U(i,j)$ và $U(i,j+1)$, thay cả hai vào $1+U(i,j)+U(i,j+1)$ sẽ cho đúng $2^{i+1}((j+1)-(i+1)/2+1)-1$. Như vậy nó giải hệ thức lý tưởng hóa ở trên.

Thay $i=\log_2 m$ và $j=\log_2 n$, ta được

$$
T(m,n) = O\bigl(m(1+\log_2 n - (\log_2 m)/2)\bigr).
$$

Nếu $m\ge n$, cắt dọc và đổi vai trò $m,n$, được $O\bigl(n(1+\log_2 m-(\log_2 n)/2)\bigr)$ lần gọi $f$. Trên hình chữ nhật rất dài và hẹp, cận này khác cận $O(m+n)$ của saddleback; muốn biết cách nào tốt hơn phải thay kích thước cụ thể vào, không thể chỉ nhìn chữ “chia đôi”.

Với $f(x,y)=x^2+3^y$ và $t=20259$, con số **$96$** lần gọi $f$ được nêu cho cách chia ở ô giữa, so với $181$ lần của bản tìm biên rồi chạy saddleback. Nhưng ở đây chưa có mã cho cách chia ấy. Hệ thức truy hồi chỉ cho cận xấu nhất, không thể kiểm tra con số $96$; nó còn phụ thuộc cách chọn ô giữa và xử lý biên.

## Binary search ở hàng giữa

Một ô giữa chỉ cho ta biết chắc một góc quá nhỏ hoặc quá lớn; phần chưa loại vẫn có dạng chữ L. Trên hàng giữa $r$, các giá trị tăng từ trái sang phải. Thay vì hỏi riêng ô giữa, ta có thể dùng binary search tìm chỗ $f(x,r)$ chuyển từ $<t$ sang $\ge t$. Chỗ chuyển ấy xác định luôn biên của hai hình chữ nhật cần tìm tiếp.

Giả sử ta chỉ tìm trong hình chữ nhật có góc trên-trái $(x_1,y_1)$, góc dưới-phải $(x_2,y_2)$. Giả sử $y_1 - y_2 \le x_2 - x_1$, tức có ít nhất nhiều cột như hàng. Thực hiện binary search dọc theo hàng giữa $r = \lfloor(y_1+y_2)/2\rfloor$.

$$
x = \texttt{smallest}\,(x_1{-}1,x_2)\,(\lambda x.\,f(x,r))\, t.
$$

`Smallest` trả vị trí đầu tiên đạt $t\le f(x,r)$ trong hàng; nếu cả hàng nhỏ hơn $t$, nó vẫn trả $x_2$. Bởi vậy phải tính thêm $z=f(x,r)$ để phân biệt hai trường hợp, nhất là khi $x=x_2$.

Nếu $z<t$, ngay cả ô cuối $x_2$ cũng nhỏ hơn $t$, nên **cả hàng** $r$ đều nhỏ hơn $t$. Vì $f$ tăng theo $y$, mọi hàng dưới cũng nhỏ hơn $t$ theo từng cột. Chỉ còn vùng phía trên $((x_1,y_1),(x_2,r{+}1))$.

Nếu $z>t$, trên hàng $r$ các ô từ $x$ sang phải đều quá lớn. Mọi ô phía trên chúng cũng quá lớn; phía dưới, các cột bên trái $x$ quá nhỏ vì hàng $r$ ở đó còn nhỏ hơn $t$. Chỉ còn hai hình chữ nhật $((x_1,y_1),(x{-}1,r{+}1))$ và $((x,r{-}1),(x_2,y_2))$.

Nếu $z=t$, ghi nhận $(x,r)$. Tính tăng chặt loại luôn các ô còn lại cùng hàng, cùng cột; hai vùng cần tìm là $((x_1,y_1),(x{-}1,r{+}1))$ và $((x{+}1,r{-}1),(x_2,y_2))$.

Khi $z>t$ và $x=x_1$, cả hàng $r$ đều lớn hơn $t$. Hình trên-trái rỗng; chỉ còn $((x_1,r{-}1),(x_2,y_2))$.

Nếu vùng cao hơn rộng, đổi vai trò hàng và cột. Trên cột giữa $c$, `Smallest` tìm hàng thấp nhất $y$ có $f(c,y)\ge t$. Nếu $f(c,y)<t$ thì ngay cả ô cao nhất của cột cũng nhỏ hơn $t$; mọi cột bên trái càng nhỏ hơn, nên chỉ tìm phía phải $c$. Nếu $f(c,y)>t$, các ô ở trên-phải $(c,y)$ quá lớn, còn các ô ở dưới-trái quá nhỏ. Chỉ giữ hình trên-trái $((x_1,y_1),(c{-}1,y))$ và hình dưới-phải $((c{+}1,y{-}1),(x_2,y_2))$. Khi bằng $t$, ghi nhận ô $(c,y)$, bỏ hàng và cột của nó, rồi thay biên dưới của hình trên-trái từ $y$ thành $y+1$. Những giới hạn ấy là các lời gọi trong mã dưới đây.

```csharp
static IEnumerable<(int X, int Y)> Search(Func<int, int, int> f, int t)
{
    int p = Smallest(-1, t, y => f(0, y), t);
    int q = Smallest(-1, t, x => f(x, 0), t);
    return From(0, p, q, 0, f, t);
}

static IEnumerable<(int X, int Y)> From(
    int x1, int y1, int x2, int y2, Func<int, int, int> f, int t)
{
    if (x2 < x1 || y1 < y2) return [];

    int c = x1 + (x2 - x1) / 2;
    int r = y2 + (y1 - y2) / 2;

    if (y1 - y2 <= x2 - x1)
    {
        int x = Smallest(x1 - 1, x2, xx => f(xx, r), t);
        int z = f(x, r);
        return z < t  ? From(x1, y1, x2, r + 1, f, t)
             : z == t ? [(x, r), .. From(x1, y1, x - 1, r + 1, f, t),
                                   .. From(x + 1, r - 1, x2, y2, f, t)]
             : [.. From(x1, y1, x - 1, r + 1, f, t),
                .. From(x, r - 1, x2, y2, f, t)];
    }
    else
    {
        int y = Smallest(y2 - 1, y1, yy => f(c, yy), t);
        int z = f(c, y);
        return z < t  ? From(c + 1, y1, x2, y2, f, t)
             : z == t ? [(c, y), .. From(x1, y1, c - 1, y + 1, f, t),
                                   .. From(c + 1, y - 1, x2, y2, f, t)]
             : [.. From(x1, y1, c - 1, y, f, t),
                .. From(c + 1, y - 1, x2, y2, f, t)];
    }
}

static int Smallest(int a, int b, Func<int, int> f, int t)
{
    // x nhỏ nhất trong (a, b] với t <= f(x); nếu không có, trả b
    while (a + 1 < b)
    {
        int m = a + (b - a) / 2;
        if (t <= f(m)) b = m;
        else a = m;
    }
    return b;
}
```

Gọi $T(m,n)$ là số lần tính $f$ để tìm trên hình chữ nhật $m\times n$. Giả sử $m \le n$.

Nếu mỗi lần cắt chỉ còn một hình chữ nhật, ta trả khoảng $O(\log n)$ lần dò trên hàng cho mỗi tầng, với khoảng $\log m$ tầng, cộng lần tìm ở hàng cuối. Vì vậy cận trong tình huống này là $O((1+\log m)(1+\log n))$, không phải công thức đếm chính xác. Cách cắt gần biên có thể cần ít lần dò hơn.

Khi mỗi lần chia tạo hai vùng gần bằng nhau, cận trên thỏa dạng

$$
T(m,n) = O(1+\log n) + 2T(m/2,n/2).
$$

Đặt $m=2^i$, $n=2^j$, $i\le j$. Ở tầng $k<i$ có tối đa $2^k$ vùng; mỗi lần dò tốn $O(1+j-k)$, và ở tầng cuối còn tối đa $2^i$ hàng cần kiểm tra, mỗi hàng tốn $O(1+j-i)$. Cộng các chi phí được

$$
T(m,n) = O\!\left(\sum_{k=0}^{i-1}2^k(1+j-k)+2^i(1+j-i)\right)
       = O\bigl(2^i(1+j-i)\bigr).
$$

Đẳng thức cận trên cuối được kiểm tra bằng cách đổi biến $d=i-k$. Khi ấy tổng thành $2^i\sum_{d=1}^{i}2^{-d}(1+j-i+d)$; hai tổng $\sum_{d\ge1}2^{-d}=1$ và $\sum_{d\ge1}d2^{-d}=2$ đều hữu hạn. Vì $2^i=m$, $j-i=\log_2(n/m)$, ta được $O(m\log_2(1+n/m))$; với $n/m\ge1$, hai cách viết $1+\log_2(n/m)$ và $\log_2(1+n/m)$ cùng bậc. Nếu $n<m$, đổi vai trò hàng và cột, được $O(n\log_2(1+m/n))$. Phần cận dưới ngay sau đây kiểm tra cận này có đúng bậc xấu nhất hay không.

Với $f(x,y)=x^2+3^y$, $t=20259$, đếm theo đúng mã `Smallest` và `From` ở trên được **$77$** lần gọi $f$ (gồm $28$ lần tìm hai biên), so với $96$ lần được nêu cho cách hỏi ô giữa. Cũng như trên, phép đếm chỉ có nghĩa nếu tính $f$ không bị tràn số.

## Cận dưới trên lưới

Tìm trên hàng giữa đã cho một cận trên theo kích thước hình chữ nhật. Có thể giảm bậc ấy nữa không, hay chỉ cải thiện vài lần hỏi như trong ví dụ? Ta xét mô hình mỗi lần hỏi một ô chỉ trả một trong ba quan hệ $f(x,y)<t$, $f(x,y)=t$ hoặc $f(x,y)>t$. Trong mô hình này, số lần hỏi trong trường hợp xấu nhất có cận dưới

$$
\Omega\bigl(m\log(1+n/m) + n\log(1+m/n)\bigr).
$$

Nếu một lần hỏi trả về cả giá trị số và thuật toán có thể khai thác các chữ số của nó, lập luận đếm ba kết quả dưới đây không tự chứng minh cận ấy.

Khi $m=n$, cận dưới là $\Omega(m+n)$. Saddleback dùng $O(m+n)$ lần hỏi, nên tối ưu về bậc trên lưới vuông; không có nghĩa là lần chạy nào của nó cũng phải hỏi từng ấy ô.

Khi $m\le n$, biểu thức cận dưới cùng bậc với $m\log_2(1+n/m)$; khi $n<m$, đổi vai trò $m,n$. Không được thay $\log(1+n/m)$ bằng $\log(n/m)$ cho mọi trường hợp. Nếu $m=n$, vế sau bằng $0$ dù vẫn phải tìm trên lưới.

### Vì sao có cận dưới

Để chứng minh cận dưới, xét hình chữ nhật gồm $m$ hàng, $n$ cột, và chọn $t\ge m+n$ để có đủ giá trị tự nhiên cho mọi cách đặt nghiệm. Ta đếm số tập nghiệm khả dĩ rồi xét cây quyết định (*decision tree*). Tại mỗi lần hỏi, ta chỉ dùng một trong ba quan hệ $f(x,y)<t$, $f(x,y)=t$, $f(x,y)>t$. Nếu có $A(m,n)$ tập nghiệm khác nhau, cây phải có ít nhất $A(m,n)$ lá, vì hai tập nghiệm khác nhau không thể cho cùng một đáp án ở một lá. Chẳng hạn $A(1,1)=2$ (rỗng hoặc một ô); $A(2,2)=6$ (rỗng, bốn cách chọn một ô, một cách chọn hai ô không cùng hàng hay cột). Đây là cận dưới cho **trường hợp xấu nhất trên các đầu vào**; với $t=0$, phần lớn tập nghiệm ấy không thể xuất hiện.

Cây cao $h$ có nhiều nhất $3^h$ lá, nên $h\ge\log_3 A(m,n)$. Để chặn $h$, ta đếm các tập nghiệm có thể xuất hiện.

Vì $f$ tăng chặt theo từng tọa độ, hai ô bằng $t$ không thể cùng hàng hay cùng cột. Nếu ô thứ hai nằm bên phải ô thứ nhất, nó còn phải nằm thấp hơn; nếu vừa sang phải vừa đi lên thì giá trị buộc tăng. Gọi tập ô không ô nào nằm vừa sang phải vừa lên so với ô khác là một **phản xích**. Ta đã chứng minh mọi tập nghiệm là một phản xích, nhưng muốn đếm đáp án còn phải biết phản xích nào cũng thực sự là tập nghiệm của một hàm hợp lệ.

Có thể dựng hàm như sau. Với một phản xích $E$, gọi $D$ là tập mọi ô nằm dưới-trái (kể cả chính ô ấy) của ít nhất một ô $a\in E$. Với $u\in D$, đặt $d(u)$ bằng số bước đi sang phải và đi lên **lớn nhất** cần để tới một ô của $E$ ở trên-phải $u$. Lấy $f(u)=t-d(u)$ trong $D$ và $f(x,y)=t+1+x+y$ ngoài $D$. Khi đi sang phải hoặc đi lên trong $D$, các đích $a$ còn tới được chỉ bớt đi và khoảng cách đến mỗi đích giảm một, nên $d$ giảm ít nhất một; vì thế $f$ tăng chặt. Không có bước từ ngoài $D$ vào $D$, còn bước ra khỏi $D$ thì $f$ nhảy từ không quá $t$ lên lớn hơn $t$. Ở ô thuộc $E$, $d=0$ vì không ô nào của $E$ nằm trên-phải nó; ở mọi ô khác trong $D$, $d\ge1$. Do $d\le m+n-2<t$, hàm nhận giá trị tự nhiên và nghiệm đúng là $E$. Nếu $E$ rỗng, lấy $f(x,y)=t+1+x+y$.

Giờ đếm phản xích. Chọn $k$ trong $m$ hàng và $k$ trong $n$ cột. Sắp cột từ trái sang phải, ta **buộc** ghép chúng với các hàng từ trên xuống dưới; ghép cách khác sẽ có hai ô so sánh được. Vì thế số tập có $k$ nghiệm là $\binom{m}{k}\binom{n}{k}$. Một cách hình dung khác là mã hóa tập ấy thành một đường bậc thang từ góc trên-trái đến góc dưới-phải, gồm $m$ bước xuống và $n$ bước sang phải; các nghiệm ở những góc quay vào trong. Đường đi dùng để đếm, không phải đường chạy của `Search`. Số đường đi là

$$
A(m,n)=\binom{m+n}{n}=\binom{m+n}{m}.
$$

Đếm cùng các tập đó theo số nghiệm cho ta **đồng nhất thức Vandermonde**

$$
\sum_{k=0}^{\min(m,n)}\binom{m}{k}\binom{n}{k}=\binom{m+n}{n}.
$$

Hai cách đếm giải thích vì sao tổng bằng hệ số nhị thức, thay vì chỉ viện dẫn tên đồng nhất thức. Để thấy bậc của logarit, viết

$$
\binom{m+n}{m}=\prod_{j=1}^{m}\left(1+\frac nj\right)\ge\left(1+\frac nm\right)^m.
$$

Đổi vai trò $m,n$ cũng được $\log A(m,n)\ge n\log(1+m/n)$. Logarit lớn hơn từng vế thì ít nhất bằng nửa tổng của chúng. Do đó

$$
\log A(m,n)=\Omega\bigl(m\log(1+n/m)+n\log(1+m/n)\bigr).
$$

Mỗi lần hỏi phân cây quyết định thành nhiều nhất ba nhánh, nên cây cao ít nhất $\log_3 A(m,n)$. Đó là cận dưới đã nêu.

# Binary search trees

Các cách tìm trên lưới vừa rồi tính $f$ tại những ô cần hỏi. Với một tập giá trị phải tìm đi tìm lại, ta có thể lưu sẵn các giá trị. Dãy đã sắp xếp cho phép tìm nhanh, nhưng chèn hoặc xóa một giá trị thì phải dời các phần tử. Cây tìm kiếm cho một cách lưu khác. Mỗi nút giữ một giá trị; giá trị nhỏ hơn nằm bên trái, lớn hơn nằm bên phải. Mỗi phép so sánh đưa ta xuống một nhánh. Tuy vậy, nếu cây bị lệch, nhánh ấy có thể chứa gần hết số nút.

## Cây

Để viết phép tìm kiếm trên cây, trước hết phải biết một nút chứa gì. Ngoài nhãn, nó cần giữ nhánh trái và nhánh phải; cây rỗng thì không có nút nào. Ký hiệu Haskell ghi đúng hai trường hợp ấy, trước khi ta chuyển sang C#.

```
data Tree a = Null | Node (Tree a) a (Tree a)
```

Một cây là `Null` hoặc một nút chứa nhánh trái, nhãn (*label*) và nhánh phải. Trong kiểu cây của random-access list, nhãn nằm ở lá; ở đây nó nằm ngay tại nút. Các kiểu cây còn có thể khác nhau ở số nhánh, thông tin lưu thêm và quan hệ giữa các nhánh. Chương sau sẽ gặp vài kiểu như thế.

Kích thước cây bằng số nhãn trong cây.

```csharp
static int Size<T>(Tree<T> t) => t switch
{
    Null<T> => 0,
    Node<T>(var l, _, var r) => 1 + Size(l) + Size(r)
};
```

Duyệt cây theo thứ tự trái, gốc, phải (*inorder*) bằng `Flatten` để lấy các nhãn.

```csharp
static IReadOnlyList<T> Flatten<T>(Tree<T> t) => t switch
{
    Null<T> => [],
    Node<T>(var l, var x, var r) => [.. Flatten(l), x, .. Flatten(r)]
};
```

Biểu thức C# `[.. Flatten(l), x, .. Flatten(r)]` chép kết quả của hai nhánh vào một danh sách mới tại mỗi nút. Với cây lệch, một nhãn có thể bị chép qua nhiều nút, khiến tổng số phần tử được chép lên tới $\Theta(n^2)$. Để đạt $O(n)$, duyệt theo thứ tự trái, gốc, phải và thêm từng nhãn vào một danh sách duy nhất. Bài tập 3.8 gọi cách truyền danh sách ấy là *accumulating parameter* (tham số tích lũy).

## Điều kiện tìm kiếm trong cây

`Flatten` đi qua cây theo thứ tự trái, gốc, phải, nhưng thứ tự ấy chỉ cho danh sách tăng nếu các nhãn được đặt đúng chỗ. Muốn đi trái khi khóa cần tìm nhỏ hơn nhãn gốc, mọi nhãn ở nhánh trái phải nhỏ hơn nhãn gốc; nhánh phải thì ngược lại. Giữ điều kiện ấy tại từng nút, `Flatten` sẽ trả danh sách chặt tăng. Ta gọi đó là **cây tìm kiếm nhị phân** (*binary search tree*).

Nếu cho phép các khóa trùng nhau, danh sách inorder chỉ cần không giảm; khi ấy phải quy định rõ cách xử lý khóa bằng nhau. Còn với một từ điển, mỗi nhãn có thể là một record gồm khóa duy nhất và thông tin gắn với khóa. Chẳng hạn khóa là từ, phần còn lại là nghĩa. Cây sắp theo khóa, nên inorder trả record theo thứ tự từ.

Việc tìm theo khóa giống binary search một chiều.

```csharp
static T? Search<T, K>(Func<T, K> key, K k, Tree<T> t) where T : class
    => t switch
    {
        Null<T> => null,
        Node<T>(var l, var x, var r) =>
            Compare(key(x), k) < 0 ? Search(key, k, r) :
            Equal(key(x), k)         ? x :
                                       Search(key, k, l)
    };
```

Không thấy khóa `k`, hàm trả `null` (trong Haskell là `Nothing`); tìm thấy thì trả record tương ứng. Mỗi lần so sánh chỉ đi xuống một nhánh, nên số bước nhiều nhất bằng **chiều cao** cây.

```csharp
static int Height<T>(Tree<T> t) => t switch
{
    Null<T> => 0,
    Node<T>(var l, _, var r) => 1 + Math.Max(Height(l), Height(r))
};
```

Muốn bảo đảm tìm trong $O(\log n)$ bước, ta cần giữ chiều cao cây ở bậc $O(\log n)$. Ta sẽ chặn chiều cao bằng cách cân bằng cây.

## Chiều cao và kích thước

Cây tìm kiếm ở trên đi xuống một nhánh mỗi lần so sánh. Một cây $n$ nút có thể chỉ cao cỡ $\log n$, nhưng nếu mọi nút nằm trên cùng một đường thì cao tới $n$. Trước khi đặt điều kiện cân, ta chặn hai giới hạn ấy. Với chiều cao $h$ và kích thước $n$, ta có

$$
h \le n < 2^h.
$$

Thật vậy, đường từ gốc tới một lá dài $h$ nút, nên $n\ge h$. Còn cận trên chứng minh theo chiều cao. Với $h=0$, cây rỗng có $n=0<2^0$. Nếu cây cao $h>0$, cả hai cây con đều cao không quá $h-1$; theo giả thiết quy nạp, mỗi cây con có nhiều nhất $2^{h-1}-1$ nút. Tính thêm gốc được $n\le1+2(2^{h-1}-1)=2^h-1$. Do đó $2^h\ge n+1$, hay $h\ge\lceil\log_2(n+1)\rceil$.

Một cây có thể cao gần bằng số nút của nó. Để tránh trường hợp ấy, ta gọi cây **cân** (*balanced*) khi tại mọi nút, chiều cao hai nhánh lệch không quá một. Đây là một trong nhiều cách định nghĩa cây cân. Với $n$ nút, chiều cao của nó không nhất thiết đạt mức thấp nhất $\lceil\log_2(n+1)\rceil$, nhưng thỏa cận

$$
h \le 1.441\log_2(n+1)+O(1).
$$

Chặn chiều cao trực tiếp từ số nút hơi khó, vì một cây cao vẫn có thể khá thưa. Gọi $H(n)$ là chiều cao lớn nhất của cây cân có $n$ nút. Thay vì chặn trực tiếp $H(n)$, gọi $S(h)$ là **số nút ít nhất** của một cây cân cao $h$. Với cây cao $H(n)$ và có $n$ nút, ta có $S(H(n))\le n$. Chứng minh $S(h)$ tăng nhanh theo $h$ sẽ chặn ngược lại $H(n)$. Với một hàm tăng $g$, từ $S(h)\ge g(h)$ suy ra $H(n)\le g^{-1}(n)$.

$S(0)=0$ (cây rỗng) và $S(1)=1$. Để một cây cân cao $h+2$, ít nhất một nhánh phải cao $h+1$. Nhánh kia phải cao từ $h$ đến $h+1$ vì cây cân; chọn chiều cao $h$ và số nút ít nhất ở mỗi nhánh mới làm cây ít nút nhất. Bởi vậy

$$
S(h+2) = S(h+1) + S(h) + 1.
$$

Đặt $Q(h)=S(h)+1$. Hệ thức trên trở thành $Q(h+2)=Q(h+1)+Q(h)$, với $Q(0)=1$, $Q(1)=2$. Vì dãy Fibonacci có $\mathrm{fib}(2)=1$, $\mathrm{fib}(3)=2$, nên quy nạp cho $S(h)=\mathrm{fib}(h+2)-1$. Để chặn dãy này, lấy hai nghiệm của $u^2-u-1=0$, là $\varphi=(1+\sqrt5)/2$ và $\psi=(1-\sqrt5)/2$. Chúng thỏa $u^{k+2}=u^{k+1}+u^k$; biểu thức sau có đúng hai giá trị đầu $0,1$, nên cũng thỏa hệ thức Fibonacci.

$$
\mathrm{fib}(n) = \frac{\varphi^n - \psi^n}{\sqrt5}.
$$

Vì $|\psi|<1$ nên $\psi^k<1$ với $k\ge1$. Suy ra $\mathrm{fib}(k)>(\varphi^k-1)/\sqrt5$. Lấy $k=H(n)+2$ và dùng $S(H(n))\le n$,

$$
\frac{\varphi^{H(n)+2} - 1}{\sqrt5} - 1 < \mathrm{fib}(H(n)+2) - 1 = S(H(n)) \le n.
$$

Lấy logarit cơ số $2$ ở hai vế, ta được

$$
(H(n)+2)\log_2\varphi < \log_2(n+1) + O(1).
$$

Chia cho $\log_2\varphi>0$ rồi trừ $2$, ta được $H(n)\le(\log_2(n+1))/\log_2\varphi+O(1)$. Vì $1/\log_2\varphi\approx1.44042<1.441$, cận đã nêu ở đầu mục theo ngay. Số $1.4404$ là giá trị làm tròn của hệ số chính xác, không đủ lớn để làm hệ số chặn trên.

## Dựng cây từ danh sách

Cận chiều cao vừa chứng minh chỉ đúng với cây đã cân. Nhưng nếu đầu vào là một danh sách các giá trị **phân biệt** theo thứ tự bất kỳ, liệu cách dựng đơn giản nhất có giữ được cây cân? Có thể lấy phần tử đầu làm gốc. Đưa các giá trị nhỏ hơn nó vào cây trái, các giá trị lớn hơn vào cây phải. Cách này giữ thứ tự tìm kiếm, nhưng chưa bảo đảm cây cân. Trong Haskell, ta viết

```
mktree []       = Null
mktree (x:xs)   = Node (mktree ys) x (mktree zs)
  where (ys,zs) = partition (<x) xs
```

Trong trường hợp tốt nhất, `partition` chia $n$ phần tử còn lại thành hai nửa bằng nhau. Mỗi lần chia phải duyệt cả $n$ phần tử để phân nhóm; ở mỗi tầng của cây đệ quy có tổng cộng $\Theta(n)$ phần tử được duyệt và có $\Theta(\log n)$ tầng.

$$
T(n+1) = 2T(n/2) + \Theta(n) \quad\Rightarrow\quad T(n) = \Theta(n\log n).
$$

Trong trường hợp xấu nhất, một phía rỗng còn phía kia có cả $n$ phần tử. `partition` lần lượt duyệt $n,n-1,\ldots,1$ phần tử, tổng cộng $n(n+1)/2$.

$$
T(n+1) = T(n) + \Theta(n) \quad\Rightarrow\quad T(n) = \Theta(n^2).
$$

Muốn chèn liên tiếp mà cây vẫn cân, ta cần biết chiều cao hai nhánh tại mỗi nút để quyết định có xoay cây hay không. Nếu tính lại chiều cao bằng cách duyệt toàn bộ nhánh ở mỗi lần chèn, cận $O(\log n)$ cho một lần chèn không còn đúng. Vì vậy phải lưu chiều cao. Sửa kiểu Tree thành

```
data Tree a = Null | Node Nat (Tree a) a (Tree a)
```

Trường `Nat` mới lưu chiều cao. Trong mã C# bên dưới, `NodeTree<T>` là dạng nút tương ứng; `Height` đọc trường chiều cao đã lưu, chứ không duyệt lại cả cây. Hàm dựng đầu tiên tự tính trường đó.

```csharp
static Tree<T> Node<T>(Tree<T> l, T x, Tree<T> r)
    => new NodeTree<T>(1 + Math.Max(Height(l), Height(r)), l, x, r);
```

Hàm `Node` chỉ tính chiều cao. Hai hàm dựng khác sẽ cân bằng cây sau khi thêm nút hoặc ghép hai nhánh.

Cây cân dựng bằng cách **insert từng phần tử** vào cây rỗng ban đầu.

```csharp
static Tree<T> MkTree<T>(IEnumerable<T> xs) where T : IComparable<T>
    => xs.Reverse().Aggregate(Null<T>.Instance, Insert);
```

`Insert` trước hết tìm vị trí của nhãn mới.

```csharp
static Tree<T> Insert<T>(T x, Tree<T> t) where T : IComparable<T>
    => t switch
    {
        Null<T> => Node(Null<T>.Instance, x, Null<T>.Instance),
        Node<T>(var h, var l, var y, var r) =>
            x.CompareTo(y) < 0 ? Balance(Insert(x, l), y, r) :
            x.Equals(y)        ? new NodeTree<T>(h, l, y, r) :
                                 Balance(l, y, Insert(x, r))
    };
```

Khóa đã có thì giữ nguyên nút; khóa mới được chèn vào nhánh trái hoặc phải. Chèn xong, chiều cao hai nhánh ở một nút có thể lệch hai đơn vị. `Node` chỉ tính chiều cao, nên trường hợp này cần `Balance` xoay cây trước khi trả về.

## Cân bằng bằng phép xoay

Tại sao chỉ cần xoay ở những nút có hai nhánh lệch hai? Khi chèn vào cây đã cân, chiều cao nhánh nhận phần tử tăng nhiều nhất một. Hai nhánh của nút cha trước đó lệch tối đa một, nên sau phép chèn chúng lệch tối đa hai. `Balance` xử lý độ lệch 0 hoặc 1 bằng cách dựng nút, còn hai trường hợp lệch 2 bằng các phép xoay đối xứng.

Nếu chiều cao hai nhánh lệch không quá một, `Node` là đủ. Khi lệch hai, xét trước trường hợp nhánh trái cao hơn, $h_l=h_r+2$. Gọi hai cây con của $l$ là $ll$ và $rl$.

**Trường hợp 1.** $h_{rl}\le h_{ll}$. Vì $l$ cân nên

$$
h_r = h_l - 2 = h_{ll} - 1 \le h_{rl} \le h_{ll}.
$$

Xoay phải để đổi nút gốc.

```csharp
// balance l x r = rotr (node l x r)
// rotr (Node (Node ll y rl) x r) = node ll y (node rl x r)
```

Trước khi xoay, thứ tự inorder là các nhãn của $ll$, rồi $y$, rồi $rl$, rồi $x$, rồi $r$. Sau khi xoay, thứ tự ấy không đổi, nên cây vẫn là cây tìm kiếm. Nhánh phải mới có chiều cao $1+\max(h_{rl},h_r)=1+h_{rl}$ vì $h_r\le h_{rl}$. Nhánh trái mới là $ll$, có chiều cao $h_{ll}$. Từ $h_{ll}-1\le h_{rl}\le h_{ll}$ ta được

$$
\bigl|h_{ll}-(1+h_{rl})\bigr|\le1.
$$

Bản thân các cây $ll$, $rl$ và $r$ đã cân, nên nút mới dựng bên phải và cả gốc mới đều cân.

**Trường hợp 2.** $h_{ll}<h_{rl}$. Vì $l$ cân nên

$$
h_{ll} + 1 = h_{rl}.
$$

Cây con $rl$ có hai nhánh $lrl$ và $rrl$. Khi đó

$$
h_r = h_l - 2 = h_{rl} - 1 = h_{ll} = \max(h_{lrl}, h_{rrl}).
$$

Xoay trái rồi xoay phải (xoay kép).

```csharp
// balance l x r = rotr (node (rotl l) x r)
// rotl (Node ll y (Node lrl z rrl)) = node (node ll y lrl) z rrl
// => node (node ll y lrl) z (node rrl x r)
```

Thứ tự inorder $ll,y,lrl,z,rrl,x,r$ vẫn giữ nguyên sau hai lần xoay. Còn chiều cao thì sao? Vì $h_{rl}=1+\max(h_{lrl},h_{rrl})$ và $h_{ll}=h_r=h_{rl}-1$, ta có $h_{lrl},h_{rrl}\le h_r$. Hai nút con mới có chiều cao đúng bằng nhau,

$$
\begin{aligned}
h(\texttt{node}\;ll\;y\;lrl)&=1+\max(h_{ll},h_{lrl})=1+h_r,\\
h(\texttt{node}\;rrl\;x\;r)&=1+\max(h_{rrl},h_r)=1+h_r.
\end{aligned}
$$

Mỗi nút con cũng cân vì hai nhánh của nó có chiều cao lệch tối đa một. Chẳng hạn $h_{lrl}\ge h_{rl}-2=h_r-1$, do $rl$ cân; tương tự $h_{rrl}\ge h_r-1$. Gốc mới có hai nhánh cao bằng nhau.

Nếu nhánh phải cao hơn nhánh trái hai đơn vị, ta dùng hai phép xoay đối xứng. Để quyết định xoay đơn hay xoay kép, đo độ lệch chiều cao ở gốc nhánh cao hơn.

```csharp
static int Bias<T>(Tree<T> t) => t switch
{
    Node<T>(_, var l, _, var r) => Height(l) - Height(r),
    _ => 0
};
```

```csharp
// rotr (Node (Node ll y rl) x r) = node ll y (node rl x r)
static Tree<T> RotR<T>(Tree<T> t) => t switch
{
    Node<T>(_, Node<T>(_, var ll, var y, var rl), var x, var r)
        => Node(ll, y, Node(rl, x, r)),
    _ => throw new InvalidOperationException()
};

// rotl (Node ll y (Node lrl z rrl)) = node (node ll y lrl) z rrl
static Tree<T> RotL<T>(Tree<T> t) => t switch
{
    Node<T>(_, var ll, var y, Node<T>(_, var lrl, var z, var rrl))
        => Node(Node(ll, y, lrl), z, rrl),
    _ => throw new InvalidOperationException()
};
```

Ghép các trường hợp trên thành `Balance`.

```csharp
static Tree<T> Balance<T>(Tree<T> t1, T x, Tree<T> t2)
{
    int h1 = Height(t1), h2 = Height(t2);
    return Math.Abs(h1 - h2) <= 1 ? Node(t1, x, t2)
         : h1 == h2 + 2          ? RotateR(t1, x, t2)
         : h2 == h1 + 2          ? RotateL(t1, x, t2)
         : throw new InvalidOperationException();
}

static Tree<T> RotateR<T>(Tree<T> t1, T x, Tree<T> t2)
    => Bias(t1) >= 0 ? RotR(Node(t1, x, t2))
                     : RotR(Node(RotL(t1), x, t2));

static Tree<T> RotateL<T>(Tree<T> t1, T x, Tree<T> t2)
    => Bias(t2) <= 0 ? RotL(Node(t1, x, t2))
                     : RotL(Node(t1, x, RotR(t2)));
```

`Balance` chỉ dùng sau một lần thêm hoặc xóa nút và từ chối hai nhánh lệch quá hai. Nhưng khi ghép hai cây có kích thước rất khác nhau ở phần tập hợp động, ta cần `GBalance` xử lý độ lệch lớn hơn. Khi $h_1>h_2+2$, đi xuống **nhánh phải liên tiếp** (*right spine*) của $t_1$ để tìm cây con $r$ thỏa

$$
0 \;\le\; h_r - h_2 \;\le\; 1.
$$

Tại một nút cân, nhánh phải có chiều cao ít nhất bằng chiều cao nút ấy trừ $2$; dọc theo nhánh phải, chiều cao vì vậy giảm một hoặc hai mỗi lần. `BalanceR` đi tiếp khi $h_r\ge h_2+2$. Ở điểm dừng, ta có $h_r\le h_2+1$. Mặt khác, tại nút ngay trước điểm dừng, chiều cao nhánh phải còn ít nhất $h_2+2$, nên sau một bước giảm nhiều nhất hai, chiều cao $r$ không dưới $h_2$. Vậy $0\le h_r-h_2\le1$ như cần tìm.

Dựng `Node(r,x,t2)` ở đó cho cây cao $1+h_r$ hoặc $2+h_2$; vì $h_r$ và $h_2$ lệch không quá một, cây này cân. Cây $l$ là nhánh trái của nút cân đang xét, nên $|h_l-h_r|\le1$. Chiều cao cây vừa dựng hơn $h_r$ nhiều nhất hai, do đó hai nhánh mới lệch không quá hai và gọi được `Balance`. Trên đường quay về gốc, nhánh vừa ghép cao hơn nhánh cũ không quá một, nên mỗi nút tổ tiên cũng còn lệch tối đa hai. Đó là lý do có thể tiếp tục gọi `Balance` khi đi ngược lên.

```csharp
static Tree<T> BalanceR<T>(Tree<T> t1, T x, Tree<T> t2) => t1 switch
{
    Node<T>(_, var l, var y, var r) =>
        Height(r) >= Height(t2) + 2
            ? Balance(l, y, BalanceR(r, x, t2))
            : Balance(l, y, Node(r, x, t2)),
    _ => throw new InvalidOperationException()
};
```

Khi $h_2>h_1+2$, đi xuống nhánh trái của $t_2$ và xoay đối xứng; đó là `BalanceL`, để bài tập. Trên mỗi bước đi xuống trong `BalanceR`, chiều cao giảm ít nhất một, nên từ $h_1$ xuống sát $h_2$ cần không quá $O(1+h_1-h_2)$ bước. Mỗi nút trên đường về chỉ xoay một hoặc hai lần, tốn $O(1)$ nhờ chiều cao đã lưu. `BalanceL` có cận $O(1+h_2-h_1)$ tương tự. Gộp hai trường hợp vào `GBalance`.

```csharp
static Tree<T> GBalance<T>(Tree<T> t1, T x, Tree<T> t2)
{
    int h1 = Height(t1), h2 = Height(t2);
    return Math.Abs(h1 - h2) <= 2 ? Balance(t1, x, t2)
         : h1 > h2 + 2            ? BalanceR(t1, x, t2)
         : h1 + 2 < h2            ? BalanceL(t1, x, t2)
         : throw new InvalidOperationException();
}
```

Mỗi lần `Balance` chỉ đọc vài chiều cao đã lưu rồi xoay tối đa hai lần, nên tốn $O(1)$. `Insert` đi theo một đường từ gốc đến lá; cây cân cao $O(\log n)$ như đã chứng minh, nên mỗi lần chèn tốn $O(\log n)$. Cộng cận trên cho $n$ lần chèn được $O(n\log n)$; phần cận dưới bên dưới cho biết vì sao đây cũng là bậc xấu nhất của phép dựng cây trong mô hình so sánh.

## Cận dưới cho phép dựng cây

Chèn từng phần tử giữ cây cân và tốn $O(n\log n)$ cho cả danh sách. Liệu có cách dựng nào nhanh hơn về bậc, nếu ta chỉ được so sánh các khóa?

Với kiểu khóa chỉ hỗ trợ thứ tự, thuật toán phải so sánh hai khóa để biết khóa nào đứng trước. Nếu mọi cách dựng cây đều cần ít nhất $\Omega(g(n))$ phép so sánh trong trường hợp xấu nhất, tổng thời gian cũng có cận dưới ấy. Với khóa là số nguyên hoặc chuỗi thuộc một bảng chữ cái đã biết, có thể dùng cách sắp xếp không dựa hoàn toàn vào so sánh, như radix sort; chứng minh dưới đây không áp dụng cho những cách đó.

Gọi $B(n)$ là số phép so sánh nhiều nhất mà `MkTree` dùng trên danh sách $n$ phần tử **phân biệt**. Sau khi dựng cây, duyệt inorder không cần so sánh thêm, nên có thể sắp xếp bằng

```csharp
static IEnumerable<T> Sort<T>(IEnumerable<T> xs) where T : IComparable<T>
    => Flatten(MkTree(xs));
```

Giả sử khóa chỉ có thể được phân biệt bằng so sánh. Mỗi lần so sánh có nhiều nhất hai kết quả trên các khóa phân biệt, nên quá trình sắp xếp là một cây quyết định (*decision tree*) nhị phân. Dọc một nhánh, các kết quả so sánh xác định thứ tự đầu ra. Hai cách hoán vị khác nhau của $n$ khóa phải đưa tới hai lá khác nhau; nếu tới cùng một lá, thuật toán sẽ xuất cùng một thứ tự cho cả hai và sai ít nhất một. Có $n!$ hoán vị nên cây có ít nhất $n!$ lá. Cây cao $h$ có nhiều nhất $2^h$ lá, do đó

$$
n!\le2^h\quad\Longrightarrow\quad h\ge\log_2(n!).
$$

Không cần dùng ngay xấp xỉ Stirling (Answer 2.5) để thấy bậc này. Trong $n!$, ít nhất $\lfloor n/2\rfloor$ thừa số cuối không nhỏ hơn $n/2$, còn mọi thừa số đều không quá $n$. Vì vậy

$$
(n/2)^{\lfloor n/2\rfloor}\le n!\le n^n,
\qquad \log_2(n!)=\Theta(n\log n).
$$

Chiều cao lớn nhất của cây quyết định là số phép so sánh trong trường hợp xấu nhất. Nếu `MkTree` dùng ít hơn số đó, `Sort` cũng thế, trái với cận dưới vừa chứng minh. Bởi vậy

$$
B(n)=\Omega(n\log n).
$$

`MkTree` đạt cận trên $O(n\log n)$. Nếu dựng cây nhanh hơn bậc ấy trên mọi đầu vào phân biệt, `Sort` cũng sẽ sắp xếp nhanh hơn cận dưới vừa chứng minh. Bởi vậy thời gian xấu nhất của phép dựng là $\Theta(n\log n)$ trong mô hình so sánh.

# Tập hợp động

Dựng được cây cân mới giải quyết việc chèn và tìm. Khi các phần tử tiếp tục được thêm hoặc xóa theo thời gian, ta cần giữ điều kiện cân sau mỗi thao tác. Tập hợp thay đổi như thế gọi là **tập hợp động** (*dynamic set*). Các thao tác cơ bản gồm kiểm tra phần tử có thuộc tập hay không, thêm và xóa. Ta cũng có thể muốn hợp hai tập, hoặc tách một tập theo mốc $x$ thành phần chứa các giá trị $\le x$ và phần chứa các giá trị $>x$. Một trường hợp riêng của phép hợp là ghép hai tập khi mọi phần tử của tập thứ nhất đều nhỏ hơn mọi phần tử của tập thứ hai. Tách một tập rồi ghép hai phần theo đúng thứ tự sẽ khôi phục các phần tử ban đầu, dù hình dạng cây có thể khác.

Ta biểu diễn tập hợp bằng `Tree<T>`, một cây tìm kiếm nhị phân cân. Kiểm tra phần tử thuộc tập bằng cách sửa `Search` để trả về `bool`.

```csharp
static bool Member<T>(T x, Tree<T> t) where T : IComparable<T>
    => t switch
    {
        Null<T> => false,
        Node<T>(_, var l, var y, var r) =>
            x.CompareTo(y) < 0 ? Member(x, l) :
            x.Equals(y)        ? true :
                                 Member(x, r)
    };
```

Thêm phần tử đã có `Insert`. Khi xóa một nút, nếu tìm thấy nó, ta phải nối hai cây con mà vẫn giữ thứ tự; phần ấy do `Combine` xử lý.

```csharp
static Tree<T> Delete<T>(T x, Tree<T> t) where T : IComparable<T>
    => t switch
    {
        Null<T> => Null<T>.Instance,
        Node<T>(_, var l, var y, var r) =>
            x.CompareTo(y) < 0 ? Balance(Delete(x, l), y, r) :
            x.Equals(y)        ? Combine(l, r) :
                                 Balance(l, y, Delete(x, r))
    };
```

Nếu không tìm thấy $x$, đường đi ngược lên không đổi chiều cao. Nếu tìm thấy, xóa nút ở lá hoặc thay nút bằng cây ghép từ hai nhánh sẽ làm chiều cao cây tại chỗ giảm nhiều nhất một; tại mỗi tổ tiên, nhánh kia giữ nguyên, nên độ lệch mới tối đa hai và có thể gọi `Balance`. Trường hợp xóa ngay nút đang xét cần `Combine(l,r)`, vì muốn nối hai nhánh phải chọn một nhãn gốc nằm giữa chúng, chứ không thể gọi `Balance` khi chưa có nhãn đó. Cận giảm chiều cao của `Combine` được kiểm tra ngay dưới đây.

## Combine

Khi `Delete` bỏ một nút có cả hai nhánh, nó không thể chỉ đặt hai cây con cạnh nhau. Cây mới cần một nhãn gốc nằm giữa mọi nhãn của cây trái và cây phải. Nhãn nhỏ nhất ở cây phải đáp ứng điều ấy. `DeleteMin` lấy nhãn đó ra; `Combine` dùng nó để ghép hai cây con cân vốn có chiều cao lệch tối đa một. Nếu một cây rỗng, trả luôn cây kia.

```csharp
static (T Min, Tree<T> Rest) DeleteMin<T>(Tree<T> t)
    => t switch
    {
        Node<T>(_, Null<T>, var x, var r) => (x, r),
        Node<T>(_, var l, var x, var r) =>
            DeleteMin(l) is var (y, tree)
                ? (y, Balance(tree, x, r)),
        _ => throw new InvalidOperationException()
    };
```

Trong cây tìm kiếm, nút ngoài cùng bên trái chứa nhãn nhỏ nhất. Nếu cây trái rỗng, trả ngay nhãn gốc cùng cây phải; chiều cao cây còn lại không thể vượt cây ban đầu. Nếu cây trái không rỗng, `DeleteMin` đi tiếp bên trái, rồi dựng lại gốc bằng `Balance`. Theo quy nạp, nhánh trái sau khi xóa vẫn cân và chiều cao giảm tối đa một; nhánh phải không đổi, nên hai nhánh ở gốc lệch tối đa hai. `Balance` làm cây kết quả cân và không tăng chiều cao so với cây trước khi xóa. Bởi vậy `DeleteMin` trả đúng nhãn nhỏ nhất, phần cây còn lại cân và cao không quá cây cũ. Dùng nó để định nghĩa `Combine`.

```csharp
static Tree<T> Combine<T>(Tree<T> l, Tree<T> r)
    where T : IComparable<T>
    => r is Null<T> ? l
     : l is Null<T> ? r
     : DeleteMin(r) is var (x, t)
         ? Balance(l, x, t)
         : throw new InvalidOperationException();
```

Với `Combine` ở đoạn mã, đầu vào là hai nhánh của nút bị xóa nên chiều cao ban đầu lệch tối đa một. `DeleteMin(r)` làm chiều cao nhánh phải giảm nhiều nhất một; do đó $l$ và phần còn lại $t$ lệch tối đa hai, đủ tiền điều kiện của `Balance(l,x,t)`. Phần tử $x$ lấy từ nhánh phải lớn hơn mọi nhãn ở $l$ và nhỏ hơn mọi nhãn còn lại ở $t$, nên thứ tự tìm kiếm cũng được giữ. Cây sau ghép cao không quá cây có gốc bị xóa, như bước quy nạp trên cần.

Nếu hai cây đầu vào có chiều cao bất kỳ, thay `Balance(l,x,t)` bằng `GBalance(l,x,t)`, vẫn với điều kiện mọi nhãn bên trái nhỏ hơn mọi nhãn bên phải. `DeleteMin` đi qua tối đa $O(\log n)$ nút của cây phải; `GBalance` đi qua tối đa $O(1+|h_l-h_t|)$ nút. Vì $h_l=O(\log(m+1))$, $h_t=O(\log(n+1))$, tổng thời gian là $O(\log(m+1)+\log(n+1))$. Dạng này cũng áp dụng nếu một trong hai cây rỗng.

## Split

`Combine` ghép hai cây khi toàn bộ nhãn bên trái nhỏ hơn toàn bộ nhãn bên phải. Để chia một cây theo mốc $x$, ta cần thao tác ngược lại. Gọi nó là `Split`.

```csharp
static (Tree<T> Le, Tree<T> Gt) Split<T>(T x, Tree<T> t)
    where T : IComparable<T>;
```

`Split(x, t)` trả hai tập. Tập thứ nhất chứa các phần tử của $t$ **tối đa** $x$, tập kia chứa các phần tử $>x$. Combine hai cây trả lại tập phần tử ban đầu (không nhất thiết cùng hình dạng cây).

$$
\texttt{split}\;x\;xs = (ys, zs) \;\Rightarrow\; \texttt{combine}\;ys\;zs = xs.
$$

Theo nghĩa bằng nhau của tập phần tử, ta có $\operatorname{uncurry}(\mathrm{combine})\circ\mathrm{split}_x=\mathrm{id}$.

Ví dụ, bản *Shorter Oxford English Dictionary* năm 1973 gồm hai quyển. Nếu `soed` chứa mọi từ trong từ điển và “Markworthy” là mốc chia, `Split("Markworthy", soed)` trả hai tập từ cho hai phía của mốc ấy; từ đúng bằng mốc thuộc tập đầu.

`Split` lần theo nhánh tìm $x$. Ở nút có nhãn $y>x$, toàn bộ cây phải cùng $y$ thuộc tập `Gt`, nhưng cây trái có thể còn phải tách. Nếu $y\le x$, làm đối xứng. Giữ lại ở mỗi bước nhánh đã biết chắc thuộc một phía, rồi ghép những mảnh đó từ lá trở lên.

```csharp
// split x t = sew (pieces x t)
```

Một mảnh giữ lại nhãn của nút và một trong hai cây con.

```csharp
abstract record Piece<T>;
record LP<T>(Tree<T> L, T X) : Piece<T>;  // thiếu right subtree
record RP<T>(T X, Tree<T> R) : Piece<T>;  // thiếu left subtree
```

```csharp
static IReadOnlyList<Piece<T>> Pieces<T>(T x, Tree<T> t)
    where T : IComparable<T>
{
    var ps = new List<Piece<T>>();
    void Go(Tree<T> node)
    {
        switch (node)
        {
            case Null<T>:
                return;
            case Node<T>(_, var l, var y, var r):
                if (x.CompareTo(y) < 0) { ps.Add(new RP<T>(y, r)); Go(l); }
                else                     { ps.Add(new LP<T>(l, y)); Go(r); }
                return;
        }
    }
    Go(t);
    ps.Reverse();  // từ lá lên gốc, để Sew gấp lần lượt
    return ps;
}
```

`Pieces` đảo đường đi để mảnh gần lá được xử lý trước. Khi may lại, mảnh `LP(l,x)` bổ sung vào phía `Le`, còn `RP(x,r)` bổ sung vào phía `Gt`; dùng `GBalance` vì chiều cao các mảnh có thể khác xa nhau.

```csharp
static (Tree<T> Le, Tree<T> Gt) Sew<T>(IEnumerable<Piece<T>> ps)
    where T : IComparable<T>
    => ps.Aggregate(
        (Le: Null<T>.Instance, Gt: Null<T>.Instance),
        (acc, p) => p switch
        {
            LP<T>(var l, var x) => (GBalance(l, x, acc.Le), acc.Gt),
            RP<T>(var x, var r) => (acc.Le, GBalance(acc.Gt, x, r)),
            _ => acc
        });
```

`Pieces(x,t)` đi theo một đường từ gốc tới lá, nên tốn $O(h)$. Tại mỗi nút trên đường ấy, một cây con đã biết chắc thuộc một phía của $x$, còn cây con kia vẫn cần tách. `Sew` đảo đường đi để ghép từ lá lên. Quy nạp theo số mảnh cho thấy cặp `(Le,Gt)` luôn chứa đúng những nhãn đã xử lý ở hai phía. Khi gặp `LP(l,y)`, mọi nhãn của $l$ và $y$ đều $\le x$, lại nhỏ hơn mọi nhãn đang có trong `Le`, nên `GBalance(l,y,acc.Le)` ghép đúng phía trái; `RP(y,r)` làm đối xứng. Do đó `Sew(Pieces(x,t))` trả đúng hai tập của `Split`.

Còn cận thời gian của `Sew` cần xét chiều cao cây đang ghép, không thể chỉ đếm mảnh. Gọi $s_1,\ldots,s_k$ là chiều cao **cây con được giữ nguyên** ở các mảnh, theo thứ tự từ lá lên gốc. Chúng không giảm, nhưng có thể bằng nhau. Thật vậy, tại nút cha của hai mảnh liên tiếp, cây con chứa mảnh trước cao ít nhất $s_{i-1}+1$; cây cân buộc cây con còn lại cao ít nhất $s_{i-1}$. Mọi $s_i$ đều không vượt chiều cao $h$ của cây gốc.

Khi may tới một mảnh, chiều cao phần `Le` hoặc `Gt` đã may không vượt chiều cao của cây con gốc mà ta vừa đi lên từ đó. Có thể kiểm tra điều này bằng quy nạp. Ở lá, hai phần đều rỗng; tại mỗi nút, `GBalance(l,y,r)` trả cây cao không quá $1+\max(h_l,h_r)$, trong khi hai cây đầu vào của nó không cao hơn hai nhánh của nút gốc tương ứng. Cây gốc cân, nên chiều cao phần đã may ở mảnh hiện tại cao hơn $s_i$ nhiều nhất một.

Xét riêng các mảnh `LP`. Lần trước loại này dùng cây giữ nguyên cao $s_{\mathrm{trước}}$; vì `GBalance` giữ nguyên nhãn, phần `Le` hiện tại cao ít nhất $s_{\mathrm{trước}}$. Bởi vậy ở lần `LP` tiếp theo, chênh lệch chiều cao của hai đối số `GBalance` không quá $\max(1,s_i-s_{\mathrm{trước}})$. Các hiệu $s_i-s_{\mathrm{trước}}$ của riêng mảnh `LP` cộng lại không quá $h$. Tính tương tự cho `RP`, ta được tổng thời gian $O(h+k)=O(h)$ vì $k\le h$. Cây cân có $h=O(\log(n+1))$, nên cả `Pieces`, `Sew` và `Split` đều tốn $O(\log(n+1))$. Phần 14 sẽ dùng lại `Combine` và một biến thể của `Split`.
