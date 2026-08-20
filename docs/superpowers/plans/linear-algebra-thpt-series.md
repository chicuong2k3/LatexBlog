# Kế hoạch loạt bài: "Đại số tuyến tính cho bài toán THPT"

> **Ý tưởng cốt lõi**: Dùng kiến thức đại số tuyến tính (ĐSTT) ở đại học làm *hệ thống tư duy thống nhất* để giải các bài toán trong kì thi THPT Việt Nam — thay vì hàng trăm công thức rời rạc và mẹo vặt.
>
> **Đối tượng**: Giáo viên THPT (người dạy) và học sinh cấp 3 (người học). Mỗi khái niệm ĐSTT phải được kéo ngay về một bài THPT thật, ở mức học sinh hiểu được.

---

## 0. Nguyên tắc thiết kế chuỗi bài

1. **Không dạy toàn bộ ĐSTT đại học.** Cắt bỏ: Jordan form, dual space, tensor, spectral theorem tổng quát, exterior algebra, representation theory, module theory, không gian vô hạn chiều…
2. **Không dạy theo thứ tự sách Linear Algebra.** Dạy theo chuỗi *ứng dụng*:
   `Vector → Inner Product → Projection → Determinant → Matrix → Rank → Affine Geometry → Quadratic Form → Eigenvalue`.
3. **Mỗi khái niệm mới lập tức quay về một bài THPT thật** (projection → câu Oxyz; determinant → thể tích tứ diện; inner product → góc/khoảng cách; rank → hệ tham số; quadratic form → cực trị; eigenvalue → truy hồi).
4. **Hai lộ trình song song**:
   - **Lộ trình Core (15 chủ đề, bắt buộc)** — đủ để tạo phương pháp giải mạnh cho đại số + hình học Oxyz.
   - **Lộ trình Advanced (9 chủ đề, học sinh giỏi)** — cực trị, bất đẳng thức, truy hồi, tối ưu hình học.
5. **Mỗi bài viết là một tệp `.tex`** trong `posts/`, có frontmatter `%---` (title, date, tags, summary), render bằng Pandoc + KaTeX. Công thức toán phải đẹp — đây là giá trị cốt lõi của blog.
6. **Phân loại mức độ** cho từng phần: ★ (mức ưu tiên) và tag đối tượng (bắt buộc / giỏi / nâng cao).

---

## 1. Tổng quan chuỗi bài

Chia **14 chủ đề** thành **5 module** theo mạch tư duy, mỗi module kết thúc bằng một bài *tổng hợp giải đề*:

| Module | Tên | Chủ đề | Bài THPT gắn kết | Mức |
|---|---|---|---|---|
| 1 | Ngôn ngữ vector | Vector, tổ hợp tuyến tính, span, độc lập, cơ sở, chiều | Vectơ hình học, tọa độ, song song, đồng phẳng | ★★★★★ |
| 2 | Đo đạc: tích vô hướng | Inner product, norm, trực giao, projection | Góc, khoảng cách, hình chiếu, chân đường vuông góc, mặt cầu | ★★★★★ |
| 3 | Công cụ đại số: hệ & định thức | Matrix, Gaussian elimination, rank, determinant | Hệ phương trình, biện luận tham số, diện tích/thể tích | ★★★★★ |
| 4 | Hình học affine | Affine geometry (đường thẳng = P + span{v}, mặt phẳng = P + span{u,v}) | Toàn bộ Oxyz: giao, song song, khoảng cách | ★★★★★ |
| 5 | Nâng cao: biến đổi & tối ưu | Linear transformation, kernel/image, quadratic form, eigenvalue, Rayleigh | Cực trị, bất đẳng thức, dãy truy hồi, tối ưu | ★★★–★★★★ |

> Mỗi module = 2–4 bài viết + 1 bài "tổng hợp & giải đề thật". Tổng cộng khoảng **18–20 bài viết**.

---

## 2. MODULE 1 — Ngôn ngữ vector (nền tảng)

**Mục tiêu lớn**: Biến `v = a₁v₁ + ⋯ + aₙvₙ` thành tư duy tự nhiên. Học sinh hiểu "một vector không phải là mũi tên, mà là một *cách biểu diễn* một đối tượng hình học".

### Bài 1.1 — Vector là gì, và tại sao nó là "ngôn ngữ"
- **ĐSTT**: Vector trong ℝ², ℝ³; phép cộng, nhân vô hướng; tọa độ.
- **Cầu nối**: `u + v` và `cv` tương ứng với phép tịnh tiến / phóng đại trong hình học.
- **Bài THPT**: Cộng/trừ vector, phân tích một vector theo hai vector cho trước (dạng `AM = xAB + yAC`), quy tắc hình bình hành, trọng tâm tam giác.

### Bài 1.2 — Tổ hợp tuyến tính & Span
- **ĐSTT**: `span{v₁,…,vₖ} = {Σaᵢvᵢ}`; ý nghĩa "tất cả những gì có thể tổ hợp được".
- **Cầu nối**: Một điểm nằm trên đường thẳng ⇔ tọa độ của nó thuộc `span` của vector chỉ phương.
- **Bài THPT**: Biểu diễn điểm trên đoạn thẳng, điểm chia tỉ lệ, chứng minh 3 điểm thẳng hàng qua tổ hợp tuyến tính (`C = (1−t)A + tB`).

### Bài 1.3 — Độc lập tuyến tính & Cơ sở & Chiều
- **ĐSTT**: Độc lập tuyến tính, basis, dimension; ý nghĩa "số chiều = số vector tối thiểu để sinh ra mọi thứ".
- **Cầu nối**: 2 vector không cùng phương sinh ra một mặt phẳng; 3 vector không đồng phẳng sinh ra không gian.
- **Bài THPT**: Đồng phẳng của 4 điểm, sự phụ thuộc tuyến tính của các vector trong không gian, chứng minh 3 vector đồng phẳng.

### Bài 1.4 — Tổng hợp: Giải đề phần vectơ
- Tuyển chọn các câu trắc nghiệm/luận về vectơ từ đề THPT, giải lại bằng ngôn ngữ "tổ hợp tuyến tính".

---

## 3. MODULE 2 — Đo đạc: Tích vô hướng (cốt lõi nhất)

**Mục tiêu lớn**: Tích vô hướng `⟨u,v⟩ = uᵀv` là cầu nối mạnh nhất giữa *hình học* và *đại số*. Mọi thứ đo được (góc, khoảng cách, vuông góc) đều quy về một phép nhân.

### Bài 2.1 — Tích vô hướng, chuẩn, và góc
- **ĐSTT**: `⟨u,v⟩ = uᵀv`, `‖u‖ = √⟨u,u⟩`, `cosθ = (uᵀv)/(‖u‖‖v‖)`, `u⊥v ⇔ uᵀv = 0`.
- **Bài THPT**: Góc giữa hai vector, góc giữa hai đường thẳng, góc giữa đường thẳng và mặt phẳng, góc giữa hai mặt phẳng — **tất cả đều là một công thức `cosθ`**.

### Bài 2.2 — Khoảng cách và Cauchy–Schwarz
- **ĐSTT**: `d(u,v) = ‖u−v‖`; Bất đẳng thức Cauchy–Schwarz `|uᵀv| ≤ ‖u‖‖v‖`.
- **Bài THPT**: Khoảng cách giữa hai điểm; dùng Cauchy–Schwarz để giải bài cực trị khoảng cách (tìm min/max của một biểu thức vector).

### Bài 2.3 — Projection (hình chiếu) — chủ đề "vàng"
- **ĐSTT**: `proj_u(v) = ((vᵀu)/(uᵀu)) u`; phân tích `v = proj_u(v) + v⊥` (vector = thành phần song song + thành phần vuông góc).
- **Cầu nối**: Hình chiếu chính là *cách hỏi "điểm gần nhất trên một đường/mặt"*.
- **Bài THPT**: Hình chiếu vuông góc của điểm lên đường thẳng/mặt phẳng, chân đường vuông góc, khoảng cách điểm–đường, khoảng cách điểm–mặt, khoảng cách giữa đường thẳng và mặt phẳng song song.

### Bài 2.4 — Tổng hợp: Giải đề phần góc & khoảng cách
- Giải một cụm câu Oxyz (góc + khoảng cách + hình chiếu) bằng một hệ thống duy nhất: tọa độ → tích vô hướng → projection.

---

## 4. MODULE 3 — Công cụ đại số: Hệ phương trình & Định thức

**Mục tiêu lớn**: `Ax = b` không phải "một hệ phương trình" mà là `T(x) = b` — và tập nghiệm là *một không gian affine*.

### Bài 3.1 — Ma trận & Gaussian elimination
- **ĐSTT**: Ma trận, ma trận bổ sung (augmented matrix), phép biến đổi hàng, khử Gauss.
- **Bài THPT**: Giải hệ phương trình bậc nhất 2–3 ẩn, hệ phương trình chứa tham số, biện luận số nghiệm.

### Bài 3.2 — Hạng (Rank) & Kernel
- **ĐSTT**: Rank; kernel/null space; "nghiệm = một affine space" khi hệ có nghiệm.
- **Cầu nối**: Rank quyết định *số ràng buộc độc lập* — chính là cách biện luận hệ tham số.
- **Bài THPT**: Biện luận hệ phương trình theo tham số, tìm điều kiện để hệ vô nghiệm/có nghiệm duy nhất/vô số nghiệm.

### Bài 3.3 — Định thức & diện tích/thể tích
- **ĐSTT**: `det` 2×2, 3×3; `det = 0 ⇔` các vector phụ thuộc tuyến tính; `|det(v₁,v₂)|` = diện tích hình bình hành; `|det(v₁,v₂,v₃)|` = thể tích hình hộp.
- **Bài THPT**:
  - `S△ = ½|det(u,v)|`
  - `V_tứ diện = ⅙|det(u,v,w)|`
  - Điều kiện đồng phẳng (det = 0), thể tích khối tứ diện, diện tích tam giác trong Oxyz.

### Bài 3.4 — Tổng hợp: Giải đề phần hệ & thể tích
- Giải các câu hệ tham số và thể tích tứ diện bằng rank + determinant.

---

## 5. MODULE 4 — Hình học affine (trái tim của Oxyz)

**Mục tiêu lớn**: Gộp toàn bộ hình học tọa độ Oxyz vào hai khái niệm:
- Đường thẳng = `P + span{v}` → `x = P + tv`
- Mặt phẳng = `P + span{u,v}` → `x = P + su + tv`

### Bài 4.1 — Đường thẳng & mặt phẳng như không gian affine
- **ĐSTT**: Khái niệm affine space; `x = P + tv`, `x = P + su + tv`.
- **Bài THPT**: Phương trình tham số đường thẳng, phương trình mặt phẳng, vector chỉ phương / pháp vector.

### Bài 4.2 — Giao nhau & Song song
- **ĐSTT**: Giải `P + tv = Q + su` (một hệ tuyến tính); so sánh các subspace sinh bởi vector chỉ phương.
- **Bài THPT**: Giao điểm đường–mặt, giao tuyến hai mặt phẳng, vị trí tương đối (cắt/song song/trùng/chéo), điều kiện song song & vuông góc.

### Bài 4.3 — Quy mọi thứ về một hệ thống
- Kết hợp Module 2 (projection) + Module 3 (rank) + Module 4 (affine) để giải **trọn vẹn** các dạng Oxyz: khoảng cách, góc, hình chiếu, mặt cầu, quỹ tích.

### Bài 4.4 — Tổng hợp: Giải đề Oxyz toàn phần
- Một bộ câu Oxyz từ đề thật, giải bằng một "hệ điều hành" duy nhất.

---

## 6. MODULE 5 — Nâng cao: Biến đổi tuyến tính & Tối ưu (học sinh giỏi)

**Mục tiêu lớn**: Nâng tầm từ "giải bài" lên "nhìn thấy cấu trúc". Dành cho học sinh khá/giỏi, Olympic.

### Bài 5.1 — Phép biến đổi tuyến tính & Kernel/Image
- **ĐSTT**: `T(u+v) = T(u) + T(v)`, `T(cv) = cT(v)`, `T(x) = Ax`; ma trận = biểu diễn của ánh xạ tuyến tính.
- **Bài THPT**: Biến đổi tọa độ, đối xứng, quay, co giãn trong hình học.

### Bài 5.2 — Quadratic forms & Cực trị
- **ĐSTT**: `ax² + 2bxy + cy² = xᵀAx` với `A = [[a,b],[b,c]]`.
- **Bài THPT**: Cực trị của hàm bậc hai nhiều biến, bất đẳng thức, ellipse, bài tối ưu.

### Bài 5.3 — Eigenvalue & Dãy truy hồi
- **ĐSTT**: `Av = λv`, characteristic polynomial, diagonalization `A = PDP⁻¹`; `A = Aᵀ` có eigenvector trực giao.
- **Bài THPT**: Dãy truy hồi `a_{n+2} = pa_{n+1} + qa_n` đưa về `v_{n+1} = M v_n` → `v_n = Mⁿ v₀`; bài truy hồi nâng cao, công thức tổng quát.

### Bài 5.4 — Rayleigh quotient & Bất đẳng thức (Olympic)
- **ĐSTT**: `R(x) = (xᵀAx)/(xᵀx)`; với A đối xứng, `λ_min ≤ R(x) ≤ λ_max`.
- **Bài THPT**: Cực trị, bất đẳng thức, bài tham số, quadratic optimization.

### Bài 5.5 — (Tùy chọn) Đa thức như không gian vector
- **ĐSTT**: `P₃ = {a + bx + cx² + dx³}`, cơ sở `{1,x,x²,x³}`, đạo hàm là phép biến đổi tuyến tính.
- **Bài THPT**: Minh họa "ĐSTT không chỉ là vector hình học" — mở rộng tư duy trừu tượng.

---

## 7. Lộ trình đề xuất (thứ tự dạy & viết bài)

**Giai đoạn A — Nền tảng (bắt buộc, mọi học sinh):**
1. Bài 1.1 → 1.4 (Module 1)
2. Bài 2.1 → 2.4 (Module 2)
3. Bài 3.1 → 3.4 (Module 3)
4. Bài 4.1 → 4.4 (Module 4)

**Giai đoạn B — Nâng cao (học sinh khá/giỏi):**
5. Bài 5.1 → 5.4 (Module 5)

**Giai đoạn C — Mở rộng (tùy chọn, Olympic):**
6. Bài 5.5

> Khuyến nghị viết: bắt đầu từ **Module 2 (projection)** và **Module 4 (affine)** trước vì ROI cao nhất cho Oxyz, sau đó quay lại Module 1 và 3 cho đủ mạch.

---

## 8. Danh sách bài viết (đầu ra `.tex`)

Mỗi bài là một tệp `posts/<slug>.tex` với frontmatter:

```latex
%---
% title: "..."
% date: YYYY-MM-DD
% tags: [dai-so-tuyen-tinh, thpt, oxyz]
% summary: "..."
%---
```

| # | Slug gợi ý | Tiêu đề | Module |
|---|---|---|---|
| 1 | `la-vector-language` | Vector — ngôn ngữ của hình học | 1 |
| 2 | `la-linear-combination-span` | Tổ hợp tuyến tính & Span | 1 |
| 3 | `la-basis-dimension` | Độc lập tuyến tính, Cơ sở, Chiều | 1 |
| 4 | `la-vector-review` | Tổng hợp: Giải đề phần vectơ | 1 |
| 5 | `la-inner-product` | Tích vô hướng, góc & chuẩn | 2 |
| 6 | `la-distance-cauchy-schwarz` | Khoảng cách & Cauchy–Schwarz | 2 |
| 7 | `la-projection` | Projection — chìa khóa khoảng cách & hình chiếu | 2 |
| 8 | `la-angle-distance-review` | Tổng hợp: Góc & khoảng cách | 2 |
| 9 | `la-matrix-gaussian` | Ma trận & Khử Gauss | 3 |
| 10 | `la-rank-kernel` | Hạng & biện luận hệ tham số | 3 |
| 11 | `la-determinant` | Định thức — diện tích & thể tích | 3 |
| 12 | `la-system-volume-review` | Tổng hợp: Hệ & thể tích | 3 |
| 13 | `la-affine-line-plane` | Đường thẳng & mặt phẳng như không gian affine | 4 |
| 14 | `la-intersection-parallel` | Giao nhau & song song | 4 |
| 15 | `la-oxyz-unified` | Quy toàn bộ Oxyz về một hệ thống | 4 |
| 16 | `la-oxyz-review` | Tổng hợp: Giải đề Oxyz toàn phần | 4 |
| 17 | `la-linear-transformation` | Phép biến đổi tuyến tính & Kernel/Image | 5 |
| 18 | `la-quadratic-forms` | Quadratic forms & Cực trị | 5 |
| 19 | `la-eigenvalue-recurrence` | Eigenvalue & Dãy truy hồi | 5 |
| 20 | `la-rayleigh-quotient` | Rayleigh quotient & Bất đẳng thức | 5 |
| 21 | `la-polynomial-vector-space` | (Tùy chọn) Đa thức như không gian vector | 5 |

---

## 9. Nội dung KHÔNG dạy (tránh lan man)

Cắt bỏ hoàn toàn vì ROI gần như bằng 0 với THPT:
- Jordan canonical form, minimal polynomial
- Dual space, tensor product, exterior algebra
- General spectral theory, operator theory
- Abstract module theory, infinite-dimensional linear algebra
- Representation theory, determinant theo cách tiên đề tổng quát

---

## 10. Tiêu chí thành công của mỗi bài

Mỗi bài viết được coi là hoàn thành khi:
- [ ] Có một khái niệm ĐSTT được giới thiệu **bằng trực giác hình học**, không phải định nghĩa khô khan.
- [ ] Có **ít nhất một bài THPT thật** được giải hoàn toàn bằng khái niệm đó.
- [ ] Công thức toán hiển thị đẹp qua KaTeX (ràng buộc cứng của blog).
- [ ] Đọc được trọn mạch trên điện thoại lẫn máy tính.
- [ ] Kết thúc bằng "bài học tư duy" — học sinh hiểu *tại sao* cách này mạnh hơn học thuộc công thức.

---

*File kế hoạch: `docs/superpowers/plans/linear-algebra-thpt-series.md`*
*Định dạng bài viết: `posts/*.tex` (frontmatter + LaTeX → Pandoc → KaTeX)*
