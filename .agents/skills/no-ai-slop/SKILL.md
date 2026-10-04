---
name: no-ai-slop
description: Detect and edit AI-sounding prose in Vietnamese mathematical posts, preserving every proof, fact, example, equation, code block, and LaTeX command. Use for posts/*.tex or posts/*.md before delivery.
---

# No AI slop for LatexBlog

Project-local workflow composed from the vendored `humanizer`, `story-deslop`, and `claude-blog` editorial-pattern guides. This is a LOCAL skill, not an upstream copy.

1. Read the entire post and project `CLAUDE.md`. Mark vague announcements, repeated explanations, formulaic contrast, repetitive paragraph openings, unearned conclusions, and untranslated English fragments. For the diagnostic checklist read `../humanizer/SKILL.md` and `../claude-blog/skills/blog/references/ai-slop-detection.md`. When useful, run `node ../oh-story/story-deslop/scripts/check-ai-patterns.js --check <absolute-post-path>` **only as a read-only advisory**; it targets Chinese web fiction and can misclassify mathematical exposition and Vietnamese punctuation.
   **Before touching any post in the linear-algebra series, read [references/van-phong-chuan.md](references/van-phong-chuan.md)** — the table of words and sentence frames drawn from kì 1, 2, 3, which the owner polished by hand. That table wins over `humanizer` and `stop-slop` defaults.
2. Check that **every object in the post has a reason to exist** (see the mandatory rule below). Fix the argument, not the wording, when an object appears only because a syllabus says so.
3. Edit the flagged **prose**, not the mathematics. Preserve all facts, arguments, proofs, examples, quoted words, glossary terms, figures, commands, code, YAML, and LaTeX structure. Never remove a reasoning step that answers why a mathematical operation works. Do not add SEO filler, novel-story dialogue, or fake human mistakes. Improve the argument's flow instead of replacing individual trigger words mechanically.
4. Re-read the entire post, compare the facts and mathematical notation with the original, scan for repeated transitions, and run the project's post-rendering tests. Run the vendored `stop-slop` quick checks and score the five dimensions; revise if the total is below 35/50. The project's Vietnamese punctuation and bilingual-gloss rules override external defaults.
5. For Vietnamese language QA, run the vendored skill `../vietnamese-education-copy/scripts/validate_copy.py <post> --register edu-k12`. See the false-positive note below before acting on its output.

---

## Validator dùng chung với `vietnamese-education-copy`

`.agents/skills/vietnamese-education-copy/` là skill ngoài (MIT, trussary/vietnamese-language-skill) đã vendor vào repo. Phần dùng được cho blog toán:

- `scripts/validate_copy.py` — bắt lỗi calque, Unicode NFD, trộn kiểu dấu thanh, định dạng số/ngày.
- `references/unicode-and-tone.md` — NFC, và một kiểu dấu thanh cho mỗi tệp.
- `references/locale-formatting.md` — dấu thập phân là phẩy, hàng nghìn là chấm.
- `references/register-matrix.md` — `bạn` gọi học sinh THCS/THPT là lỗi register (`edu-k12` dùng `em`). Blog này dùng ngôi kể `ta`, không gọi trực tiếp, nên không thuộc register đó.

**Dương tính giả đã xác nhận — đừng "sửa" những thứ này:**

- `LAW001` bắt chữ `duy nhất`. Trong văn toán, `nghiệm duy nhất` là thuật ngữ bắt buộc, không phải lời quảng cáo. Giữ nguyên.
- `NUM004` bắt chuỗi `m2` trong LaTeX, thực chất là chỉ số dưới `a_{m2}`. Không phải đơn vị `m²`. Giữ nguyên.
- `PRO002`/`PRO001` chỉ có nghĩa với văn bản quảng cáo/EdTech có gọi người đọc; bài giảng dùng `ta` thì không áp dụng.

Validator chỉ dùng LaTeX như văn bản thường, nên mọi cảnh báo của nó phải được đọc lại trong ngữ cảnh toán học trước khi sửa.

---

## Mọi khái niệm phải có lý do tồn tại (MANDATORY)

Chủ dự án yêu cầu: mọi thứ trong bài phải có ý nghĩa. Người đọc phải thấy được vì sao đối tượng này cần đến, chứ không chỉ biết nó là gì.

Với mỗi đối tượng được đưa vào bài, câu trả lời phải nằm trong chính văn bản:

- Bài toán nào buộc đối tượng này phải xuất hiện?
- Có việc gì làm được với nó mà ký hiệu cũ không làm được?
- Nếu bỏ nó đi thì việc gì trở nên bất khả hoặc rối?

**"Ghi cho gọn" không đủ.** Một cách viết tắt chỉ đáng thành đối tượng riêng khi chính nó trở thành thứ đem ra tính toán.

### Cách trả lời: cho thấy việc làm được, đừng tuyên bố khái niệm là cần thiết

Đây là chỗ dễ sinh văn AI nhất. Người viết hay biến câu trả lời thành một lời tuyên bố *về* khái niệm thay vì đưa ra việc làm cụ thể với nó.

**Sai (văn AI):**

> Nhưng nếu công dụng của ma trận chỉ dừng ở đó thì ta chẳng cần coi nó là một đối tượng riêng: hệ phương trình vẫn viết được mà không cần bảng nào.
>
> Lý do thật để ma trận tách ra thành một đối tượng riêng là ta còn phải làm việc với những bảng số không sinh ra từ hệ phương trình nào cả.

**Đúng:**

> Hai kì trước, ta dùng ma trận để giải hệ phương trình tuyến tính. Hồi đó ma trận chỉ là chỗ ghi các hệ số cho gọn, khỏi phải chép lại tên ẩn sau mỗi bước.
>
> Nhưng còn những bảng số khác, không phải hệ số của hệ phương trình nào. Số giờ một học sinh dành cho ba môn trong tuần, chẳng hạn:

Khác biệt: bản sai nói *về* ma trận; bản đúng đưa ra một bảng số và việc làm với nó. Người đọc tự rút ra kết luận.

Cấm các khuôn sau, vì chúng tuyên bố tầm quan trọng thay vì chứng minh:

- `Nếu X chỉ là Y thì ta chẳng cần Z` — dựng điều kiện rồi lật, chỉ để tạo kịch tính.
- `Lý do thật để ... là ...`, `Sự thật là ...`, `Đây mới là lý do ...` — nhấn mạnh rỗng.
- `X không phải là A, mà là B` / `không chỉ A mà còn B` — đối lập máy móc; nói thẳng B.
- `đối tượng riêng`, `tầm quan trọng`, `vai trò`, `bản chất` khi câu chỉ nhằm khen khái niệm.
- `Đây chính là ...`, `Và đây chính là ...` — mở màn kèn trống.

### Cấm dấu hai chấm kiểu tiết lộ ý (MANDATORY)

Chủ dự án đã nói rõ: **không dùng dấu hai chấm** để dẫn dắt rồi tiết lộ ý. Đây là một trong những dấu hiệu văn AI rõ nhất, và nó xuất hiện rất dày trong bản nháp đầu.

Khuôn sai:

- `Kì trước dừng ở chỗ: nhìn vào dạng bậc thang là biết ngay ...`
- `nhưng giấu mất một chuyện: cột của AB được dựng từ cột của A`
- `Cách tự nhiên nhất là cộng từng ô ở cùng vị trí: ô thứ hai của hàng Toán ...`
- `không phải một quy tắc mới để học thuộc: nó chỉ là cách viết gọn ...`
- `Thứ tự bị đảo: phải viết BᵀAᵀ ...`

Cách sửa: tách thành hai câu, hoặc đổi dấu hai chấm thành dấu phẩy / `gồm` / `tức là` / `nghĩa là`, hoặc bỏ hẳn vế dẫn.

- `Kì trước dừng ở chỗ: nhìn vào ...` → `Kì trước kết thúc bằng việc khử đã thành quy trình, và nhìn vào dạng bậc thang rút gọn là biết ngay ...`
- `giấu mất một chuyện: cột của AB ...` → `giấu mất một chuyện. Cột của AB ...`
- `Thứ tự bị đảo: phải viết ...` → `Thứ tự bị đảo. Phải viết ...`

Dấu hai chấm chỉ còn được dùng cho **nhãn thư mục** (`Nguồn:`, `Chú thích:`) và cho **dòng dẫn ngay trước một công thức hiển thị**, và ngay cả ở đó nên ưu tiên dấu chấm nếu câu đọc xuôi được. Mật độ dấu hai chấm trong một bài phải rất thấp.

Nếu một câu chỉ nói khái niệm này quan trọng, hãy xóa nó và để phép toán ngay cạnh tự nói.

### Trường hợp bắt buộc: ma trận không được biện minh chỉ bằng giải hệ phương trình

Một bài về ma trận **không được** để người đọc hiểu rằng ma trận tồn tại để giải hệ phương trình. Phải cho thấy ít nhất một việc làm được với bảng số mà không dính tới hệ phương trình nào:

- lưu một bảng dữ liệu (ví dụ bảng số giờ học theo môn và theo ngày);
- cộng hai bảng cùng cỡ;
- nhân cả bảng với một số;
- nhân bảng với một vector trọng số để lấy tổng có trọng số trên từng hàng.

Viết các việc ấy ra và làm luôn, đừng kèm câu tuyên bố rằng nhờ vậy ma trận mới đáng là một đối tượng riêng.

Áp dụng cùng tiêu chuẩn này cho mọi khái niệm khác: định thức, vector, không gian con, trị riêng. Không có bài toán nào cần nó thì chưa được định nghĩa nó.
