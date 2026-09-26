# Sổ đối chiếu bản dịch

Nguồn: `C:\Users\nguye\Downloads\Newton-Principia-English-1846.pdf` — 594 trang.
Bản OCR dùng để đối chiếu: [Internet Archive OCR](https://archive.org/download/newtonspmathema00newtrich/newtonspmathema00newtrich_djvu.txt).

| Trang nguồn | File đích | Trạng thái | Ghi chú |
|---|---|---|---|
| Front matter (PDF 1–16) và toàn bộ `LIFE OF SIR ISAAC NEWTON` (PDF 17–69, trang in 9–61) | `chapters/00-loi-dan-nhap.md` | Đã dịch, đang đối chiếu scan | Đã bổ sung đầy đủ lời tựa, lời giới thiệu, tiểu sử Isaac Newton, các trích dẫn và phần kết; cần rà soát đối chiếu từng trang với scan. |
| Definitions I–VIII | `chapters/01-dinh-nghia.md` | Đã dịch, đã sửa theo đối chiếu | Đã tách đoạn và đặt tiêu đề mô tả. **Bản dịch theo ấn phẩm thứ ba 1726, qua Motte 1846** (xem `book.md`). Định nghĩa I sửa 2 chỗ: `mensura ejusdem` dịch "thước đo của chính lượng vật chất ấy" (trước đây là "đại lượng đo mức độ của nó"), và `Nive et Pulveribus` dịch "tuyết và các loại bột" (trước đây là "tuyết, bụi mịn hoặc bột" — "bụi mịn" là từ của bản Motte, không có trong Latin). `Magnitudo` giữ là "thể tích". Định nghĩa II sửa 1 câu: bản 1687 đọc `Motus totius est summa motuum in partibus singulis, adeoq; in corpore duplo majore æquali cum Velocitate duplus est, et dupla cum Velocitate quadruplus` — không có `si`; `in corpore duplo majore` mở khung và cả hai vế cùng nằm trong khung, nên vế sau kế thừa điều kiện "gấp đôi" của vế trước ($m'=2m,\ v'=2v \Rightarrow p'=4p$). Bản dịch cũ đọc vế sau là chỉ vận tốc tăng, dẫn tới nhận định sai rằng Newton mâu thuẫn với $p=mv$. Đã thêm chữ "cũng"; khớp với Motte/Cajori 1846 và Cohen–Whitman 2016, đều đọc tích luỹ. Sửa thêm 4 chỗ dịch `mensura` ở định nghĩa II, VI, VII, VIII: "đại lượng đo mức độ của nó / của lực ấy" → "thước đo của chính nó". Định nghĩa III sửa 4 chỗ, định nghĩa IV sửa 3 chỗ: `actio` dịch "tác động" thay "hành động", `ex ictu` dịch "va đập" thay "đụng va". **Chênh lệch ấn phẩm đã kiểm chứng**: định nghĩa V trong bản 1687 chỉ có hai câu định nghĩa rồi tới câu "lượng của một lực hướng tâm xét theo ba loại"; toàn bộ phần hòn đá trên dây, quả đạn bắn từ đỉnh núi, các mốc 10/30/90 độ và Mặt Trăng không có trong 1687, có trong 1726. Định nghĩa VI cũng đổi ("lớn hơn hoặc nhỏ hơn theo hiệu lực" ở 1687 → "tỉ lệ với hiệu lực" ở 1726). **Chưa kiểm được** ấn phẩm 1713 đã có phần bổ sung của định nghĩa V hay chưa. **Định nghĩa VI–VIII sửa thêm 2 chỗ dịch**: (1) `efficacia causæ` dịch "mức độ hiệu quả của nguyên nhân" thay "hiệu lực của nguyên nhân", vì `efficacia` không phải một đại lượng đã định nghĩa trong vật lí hiện đại; giữ "tỉ lệ với" vì 1726 đọc `proportional to`, khác `major vel minor pro` của 1687. (2) Câu cuối định nghĩa VIII trước đây dịch sai theo hai điểm: Latin 1726 `juxta Superficiem Terræ… gravitas motrix seu pondus est ut corpus` nói **gần mặt đất** (không phải "gần tâm") và nói trọng lượng **tỉ lệ với vật thể** nhân lực gia tốc, chứ không nói "lực động chỉ thay đổi theo khoảng cách" — vế đó không có trong nguồn và tự mâu thuẫn với vế trước. Đối chiếu Motte 1846: "near the surface of the earth, where the accelerative gravity … is the same, the motive gravity or weight is as the body". **Ba ghi chú VI–VIII viết lại** theo phản hồi rà soát: bỏ "lượng tuyệt đối là nguồn của trường" và mọi công thức từ trường cực từ (nam châm thật là lưỡng cực, trường xa giảm $1/r^3$); bỏ ví dụ $20\ \mathrm{N}$ trên hai vật ở định nghĩa VII vì nó trái ý Newton; bỏ hoàn toàn Menelaus (nhà toán học cổ đại, không liên quan) và thay bằng Jean Richer trên đảo Cayenne — **năm 1672**, không phải 1671; xem mục "Nguồn ngoài đã đối chiếu" bên dưới.; bỏ claim "mọi lực hướng tâm tỉ lệ nghịch đảo bình phương và quỹ đạo là conic" ở định nghĩa VIII. Xem `AUTHORIZED_TEXT_FIXES.tsv`. |
| Laws I–III + Học luận | `chapters/02-dinh-luat-van-dong.md` | Đã dịch, đang đối chiếu scan | Đã tách đoạn và đặt tiêu đề mô tả. Bổ sung **Học luận sau các định luật**, trước đây bị bỏ sót: đây là toàn bộ phần trình bày bằng chứng thực nghiệm của Newton cho ba định luật. Dịch từ bản 1846, đối chiếu với Latin 1687 (`la.wikisource.org/.../Axiata,_sive_Leges_Motus`) cho phần trùng nhau. **Còn phải đối chiếu scan**: số trang nguồn, và hình sơ đồ hai vật thể cầu A, B với hai nửa đường tròn EAF, GBH (đã để placeholder, chưa trích được). Bản 1846 có thêm đoạn lập luận lực hút hai chiều giữa các bộ phận Trái Đất, đoạn này **không có** trong Latin 1687 và được thêm ở ấn phẩm sau; bản Motte dựa trên ấn phẩm thứ ba 1726. Ba ghi chú mới theo `ANNOTATION_GUIDE.md` mục 5ter. |
| Hệ quả I | `chapters/03-he-qua-dinh-luat.md` | Đã dịch | Đã dựng lại sơ đồ hình bình hành tại `assets/corollary-1-parallelogram.svg`; cần đối chiếu hình với scan. |
| Hệ quả II | `chapters/04-he-qua-ii-hop-phan-tich-luc.md` | Đang rà soát | Đã dịch lời chứng minh và dựng `assets/corollary-2-force-resolution.svg`; cần đối chiếu ký hiệu và hình với scan. |
| Hệ quả III | `chapters/05-he-qua-iii.md` | Đã dịch, đã đối chiếu số liệu | Đã sửa lỗi OCR: chuyển động của A trước bật lại là 6 phần, không phải 0. |
| Hệ quả IV | `chapters/06-he-qua-iv-trong-tam-chung.md` | Đã dịch | Đã đối chiếu trang scan 87–88. |
| Hệ quả V–VI | `chapters/07-he-qua-v-vi-chuyen-dong-tuong-doi.md` | Đã dịch | Đã đối chiếu trang scan 89. |
| Học luận: thời gian, không gian, nơi chốn, chuyển động | `chapters/08-hoc-luan-thoi-gian-khong-gian-noi-chon-chuyen-dong.md` | Đã dịch | Đã dịch và đối chiếu các định nghĩa I–IV và ví dụ con tàu. |
| Học luận: tính bất biến của thời gian và không gian | `chapters/09-hoc-luan-bat-bien-thoi-gian-khong-gian.md` | Đã dịch | Đã dịch phần tiếp theo về nơi chốn tuyệt đối, chuyển động tương đối và nguyên nhân phân biệt chúng. |
| Học luận: lực hướng tâm và chuyển động thật | `chapters/10-hoc-luan-luc-huong-tam-chuyen-dong-that.md` | Đã dịch | Đã dịch thí nghiệm bình nước, lực rời trục và phần định nghĩa chuyển động thật. |
| Sách I, Phần I: tỷ số giới hạn | `chapters/11-sach-i-phan-i-ty-so-gioi-han.md` | Đã dịch | Đã dịch Lemma I–II và dựng hình `assets/lemma-2-inscribed-circumscribed.svg`. |
| Sách I, Phần I: Lemma III–V | `chapters/12-sach-i-phan-i-lemma-iii-v.md` | Đã dịch | Đã dịch các hệ quả hình giới hạn, Lemma IV–V. |
| Sách I, Phần I: Lemma VI–X | `chapters/13-sach-i-phan-i-lemma-vi-x.md` | Đã dịch, đang rà soát hình | Đã dịch Lemma VI–X, các hệ quả và học luận; đã dựng `assets/lemmas-vi-x-diagrams.svg`. |
| Sách I, Phần II: Proposition I | `chapters/14-sach-i-phan-ii-dinh-ly-ve-dien-tich.md` | Đã dịch, đang rà soát hình | Đã dịch định lý về diện tích và Hệ quả 1–6; đã dựng `assets/proposition-1-equal-areas.svg`. |
| Sách I, Phần II: Proposition II–III | `chapters/15-sach-i-phan-ii-proposition-ii-iii.md` | Đã dịch | Đã dịch các định lý về lực hướng tâm, các trường hợp, hệ quả và học luận. |
| Sách I, Phần II: Proposition IV | `chapters/16-sach-i-phan-ii-proposition-iv.md` | Đã dịch, đang rà soát hình | Đã dịch định lý và Hệ quả 1–9; đã dựng `assets/proposition-4-centripetal-forces.svg`. |
| Sách I, Phần II: Proposition V–VI | `chapters/17-sach-i-phan-ii-proposition-v-vi.md` | Đã dịch, đang rà soát hình | Đã dịch bài toán tìm tâm và công thức lực hướng tâm; đã dựng `assets/propositions-5-6-centripetal-law.svg`. |
| Sách I, Phần II: Proposition VII | `chapters/18-sach-i-phan-ii-proposition-vii.md` | Đã dịch, đang rà soát hình | Đã dịch bài toán quỹ đạo tròn, công thức lực và Hệ quả 1–3; đã dựng `assets/propositions-7-9-diagrams.svg`. |
| Sách I, Phần II: Proposition VIII–IX | `chapters/19-sach-i-phan-ii-proposition-viii-ix.md` | Đã dịch, đang rà soát hình | Đã dịch bài toán nửa đường tròn, đường xoáy ốc và học luận; đã dựng bảng sơ đồ `assets/propositions-7-9-diagrams.svg`. |
| Sách I, Phần II: Proposition X | `chapters/20-sach-i-phan-ii-proposition-x.md` | Đã dịch, đang rà soát hình | Đã dịch quy luật lực cho elip, Hệ quả 1–2 và học luận parabol/hypebol; đã dựng `assets/proposition-10-ellipse.svg`. |
| Sách I, Phần III: Proposition XI | `chapters/21-sach-i-phan-iii-proposition-xi.md` | Đang rà soát công thức | Đã dịch bài toán lực hướng về tiêu điểm elip; đã dựng `assets/proposition-11-ellipse-focus.svg`, cần đối chiếu ký hiệu với scan. |
| Sách I, Phần III: Proposition XII | `chapters/22-sach-i-phan-iii-proposition-xii.md` | Đang rà soát công thức | Đã dịch bài toán lực hướng về tiêu điểm hypebol; đã dựng `assets/proposition-12-hyperbola-focus.svg`. |
| Sách I, Phần III: Lemma XIII–XV | `chapters/23-sach-i-phan-iii-lemma-xiii-xv.md` | Đã dịch, đang rà soát công thức | Đã dịch parabol, lực hướng tiêu điểm, hình cắt conic và chu kỳ quỹ đạo; đã dựng `assets/lemmas-13-14-parabola-focus.svg`. |
| Sách I, Phần III: Proposition XVI–XVII | `chapters/24-sach-i-phan-iii-proposition-xvi-xvii.md` | Đang rà soát công thức | Đã dịch vận tốc hình cắt conic, cách xác định quỹ đạo và các hệ quả; dùng lại sơ đồ parabol. |
| Sách I, Phần IV: Lemma XV; Proposition XVIII–XX | `chapters/25-sach-i-phan-iv-lemma-xv-proposition-xviii-xx.md` | Đã dịch, đang rà soát ký hiệu dựng hình | Đã dịch cách dựng quỹ đạo từ tiêu điểm, các điểm và tiếp tuyến; đã dựng `assets/propositions-18-20-orbit-construction.svg`. |
| Sách I, Phần IV: Lemma XVI; Proposition XXI | `chapters/26-sach-i-phan-iv-lemma-xvi-proposition-xxi.md` | Đã dịch, đang rà soát ký hiệu | Đã dịch bài toán ba điểm, tiêu điểm còn lại và học luận quỹ đạo chính/liên hợp. |
| Sách I, Phần V: Lemma XVII–XXI; Proposition XXII | `chapters/27-sach-i-phan-v-lemma-xvii-xxi.md` | Đã dịch, đang rà soát công thức | Đã dịch quỹ tích conic, các phép biến đổi hình và bài toán năm điểm; đã dựng `assets/section-v-conic-locus.svg`. |
| Sách I, Phần V: Proposition XXIII–XXVI; Lemma XXII–XXV | `chapters/28-sach-i-phan-v-proposition-xxiii-xxvi-lemma-xxii-xxv.md` | Đã dịch, đang rà soát công thức | Đã dịch dựng quỹ đạo qua điểm/tiếp tuyến, phép biến đổi đường cong và các mối quan hệ hình bình hành; đã dựng `assets/section-v-propositions-23-24.svg`. |
| Sách I, Phần V: Proposition XXVII–XXVIII; Lemma XXVI | `chapters/29-sach-i-phan-v-proposition-xxvii-xxviii-lemma-xxvi.md` | Đã dịch, đang rà soát công thức | Đã dịch dựng quỹ đạo từ năm tiếp tuyến, đặt tam giác theo các đường thẳng và phép biến đổi hình. |
| Sách I, Phần V–VI: Lemma XXVII; Proposition XXIX–XXX | `chapters/30-sach-i-phan-v-vi-lemma-xxvii-proposition-xxix-xxx.md` | Đã dịch, đang rà soát công thức | Đã dịch cách dựng quỹ đạo từ các phần đường cong, bắt đầu Phần VI và cách xác định vị trí trên parabol; đã dựng `assets/section-vi-parabolic-motion.svg`. |
| Sách I, Phần VI–VII: Proposition XXXI–XXXIII | `chapters/31-sach-i-phan-vi-vii-proposition-xxxi-xxxiii.md` | Đã dịch, đang rà soát công thức | Đã dịch vị trí vật thể trên elip, phép tính gần đúng và chuyển động rơi thẳng; đã dựng `assets/section-vi-elliptic-motion.svg`. |
| Sách I, Phần VII: Proposition XXXIV–XXXVI | `chapters/32-sach-i-phan-vii-proposition-xxxiv-xxxvi.md` | Đã dịch, đang rà soát công thức | Đã dịch vận tốc vật thể rơi trên parabol, diện tích tương đương và thời gian rơi; đã dựng `assets/section-vii-rectilinear-motion.svg`. |
| Sách I, Phần VII–VIII: Proposition XXXVII–XXXIX | `chapters/33-sach-i-phan-vii-viii-proposition-xxxvii-xxxix.md` | Đã dịch, đang rà soát công thức | Đã dịch thời gian lên/xuống, lực tỷ lệ với độ cao, quỹ tích vận tốc và thời gian; dùng lại `assets/section-vii-rectilinear-motion.svg`. |
| Sách I, Phần VIII: Proposition XL–XLII | `chapters/34-sach-i-phan-viii-proposition-xl-xlii.md` | Đã dịch, đang rà soát công thức | Đã dịch so sánh vận tốc ở độ cao bằng nhau, dựng quỹ đạo dưới lực bất kỳ và thời gian chuyển động; dùng lại sơ đồ chuyển động thẳng. |
| Sách I, Phần IX: Proposition XLIII–XLV | `chapters/35-sach-i-phan-ix-proposition-xliii-xlv.md` | Đã dịch, đang rà soát công thức | Đã dịch quỹ đạo quay quanh tâm lực, lực quyết định apsis, các ví dụ gần đường tròn; đã dựng `assets/section-ix-moving-orbits.svg`. |
| Sách I, Phần X: Proposition XLVI–LII | `chapters/36-sach-i-phan-x-proposition-xlvi-lii.md` | Đã dịch, đang rà soát công thức | Đã dịch chuyển động trên mặt phẳng lệch tâm, cycloid, con lắc và chuyển động các vật thể hút nhau; đã dựng `assets/section-x-cycloid.svg`. |
| Sách I, Phần XI: Proposition LXIII–LXVI | `chapters/37-sach-i-phan-xi-proposition-lxiii-lxvi.md` | Đã dịch, đang rà soát công thức | Đã dịch chuyển động hai và nhiều vật thể hút nhau, quỹ đạo gần elip, nhiễu loạn và ảnh hưởng của lực bên ngoài; đã dựng `assets/section-xi-mutual-attraction.svg`. |
| Sách I, Phần XI–XII: Hệ quả XI–XXII; Proposition LXVII–LXXI | `chapters/38-sach-i-phan-xi-xii-he-qua-xii-xxii-proposition-lxvii-lxxxi.md` | Đã dịch, đang rà soát công thức | Đã dịch node, inclination, apsis, lực hút vật thể cầu và các hệ quả của chúng; đã dựng `assets/section-xii-spherical-attraction.svg`. |
| Sách I, Phần XII: Proposition LXXII–LXXVIII; Lemma XXIX | `chapters/39-sach-i-phan-xii-proposition-lxxii-lxxviii-lemma-xxix.md` | Đã dịch, đang rà soát công thức | Đã dịch lực hút quả cầu đồng nhất, vật thể bên trong/bên ngoài, các tỷ lệ lực và Lemma XXIX; đã dùng `assets/section-xii-spherical-attraction.svg`. |
| Sách I, Phần XII–XIII: Proposition LXXIX–LXXXVI | `chapters/40-sach-i-phan-xii-xiii-proposition-lxxix-lxxxvi.md` | Đã dịch, đang rà soát công thức | Đã dịch lực hút lớp cầu, đo diện tích lực hút, vật thể bên trong quả cầu, spheroid, mặt phẳng vô hạn và Phần XIII; đã dùng `assets/section-xii-spherical-attraction.svg`. |
| Sách I, Phần XIII: Proposition LXXXVII–XCIII | `chapters/41-sach-i-phan-xiii-proposition-lxxxvii-xciii.md` | Đã dịch, đang rà soát công thức | Đã dịch vật thể tương tự, trọng tâm chung, lực hút đường tròn, vật thể tròn, spheroid và mặt phẳng vô hạn; đã dùng `assets/section-xii-spherical-attraction.svg`. |
| Sách I, Phần XIV: Proposition XCIV–XCVIII | `chapters/42-sach-i-phan-xiv-proposition-xciv-xcviii.md` | Đã dịch, đang rà soát công thức | Đã dịch chuyển động qua các môi trường, góc tới/lỗm, tốc độ, phản xạ và các bài toán dựng mặt khúc xạ; đã dùng `assets/section-xii-spherical-attraction.svg`. |
| Sách II, Phần I: Proposition I–IV | `chapters/43-sach-ii-phan-i-chuyen-dong-luc-can-tuy-le-van-toc.md` | Đã dịch, đang rà soát công thức | Đã dịch chuyển động với lực cản tỷ lệ vận tốc, hyperbola quỹ tích, chuyển động vật thể lên/xuống và vật thể bắn; đã dựng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần II: Proposition V–VII và Lemma II | `chapters/44-sach-ii-phan-ii-proposition-v-vii-lemma-ii.md` | Đã dịch, đang rà soát công thức | Đã dịch lực cản tỷ lệ bình phương vận tốc, quả cầu đồng nhất, moment của các đại lượng sinh ra; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần II: Proposition VIII–X | `chapters/45-sach-ii-phan-ii-proposition-viii-x.md` | Đã dịch, đang rà soát công thức | Đã dịch thời gian lên/rơi, diện tích cung tròn và hyperbola, bài toán mật độ môi trường, các ví dụ và quy tắc dựng hyperbola; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần III: Proposition XI–XIV | `chapters/46-sach-ii-phan-iii-proposition-xi-xiv.md` | Đã dịch, đang rà soát công thức | Đã dịch lực cản hỗn hợp, thời gian lên/rơi, diện tích cung tròn/hyperbola và hệ quả về quãng đường; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần IV: Proposition XV–XVIII | `chapters/47-sach-ii-phan-iv-lemma-iii-proposition-xv-xviii.md` | Đã dịch, đang rà soát công thức | Đã dịch Lemma III, chuyển động spiral, mật độ môi trường thay đổi, lực hướng tâm và lực cản; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần V: Proposition XIX–XXIII | `chapters/48-sach-ii-phan-v-mat-do-va-nen-chat-long-thuy-tinh.md` | Đã dịch, đang rà soát công thức | Đã dịch định nghĩa chất lỏng, áp suất, trọng lực tương đối, nén chất lỏng, thủy tĩnh và chất lỏng đàn hồi; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần VI: Proposition XXIV–XXXI | `chapters/49-sach-ii-phan-vi-proposition-xxiv-xxxi.md` | Đã dịch, đang rà soát công thức | Đã dịch chuyển động con lắc, lực cản theo thời gian, vận tốc và bình phương vận tốc, các bài toán hyperbola và Nhận xét chung; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần VII: Proposition XXXII–XXXVII | `chapters/50-sach-ii-phan-vii-chuyen-dong-cua-chat-long-va-luc-can.md` | Đã dịch, đang rà soát công thức | Đã dịch hệ thống hạt tương tự, lực cản trong môi trường hiếm, bài toán nước chảy qua lỗ, Lemma IV và Proposition XXXVII; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần VII: Proposition XXXVIII–XXXIX | `chapters/51-sach-ii-phan-vii-proposition-xxxviii-xxxix.md` | Đã dịch, đang rà soát công thức | Đã dịch lực cản của quả cầu trong chất lỏng nén vô hạn, lực cản trong kênh trụ, các hệ quả về vận tốc và mật độ; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần VII: Proposition XL | `chapters/52-sach-ii-phan-vii-proposition-xl.md` | Đã dịch, đang rà soát công thức | Đã dịch bài toán xác định lực cản qua thí nghiệm, bảng vận tốc rơi, các thí nghiệm trong nước và không khí, cùng kết luận về mật độ chất lỏng; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần VIII: Proposition XLI–L | `chapters/53-sach-ii-phan-viii-proposition-xli-l.md` | Đã dịch, đang rà soát công thức | Đã dịch truyền áp suất, chuyển động trong chất lỏng, sóng, mạch đàn hồi, vận tốc âm thanh và các bài toán liên quan; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách II, Phần IX: Proposition LI–LIII | `chapters/54-sach-ii-phan-ix-proposition-li-liii.md` | Đã dịch, đang rà soát công thức | Đã dịch chuyển động tròn quanh hình trụ và quả cầu, vortex, các hệ quả và phần bàn về chuyển động hành tinh; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách III: Phần mở đầu | `chapters/55-sach-iii-mo-dau-quy-tac-hien-tuong-proposition-i-vi.md` | Đã dịch, đang rà soát công thức | Đã dịch Quy tắc suy luận, sáu Hiện tượng thiên văn và Proposition I–VI về lực hướng tâm, Mặt Trăng, trọng lực và hành tinh; đã dùng `assets/book-ii-section-i-motion.svg`. |
| Sách III: Proposition VII–VIII | `chapters/56-sach-iii-proposition-vii-viii.md` | Đã dịch, đang rà soát công thức | Đã dịch lực hút giữa các vật thể, các hệ quả về khối lượng và mật độ các hành tinh; đã đối chiếu số liệu Hệ quả 1–3 với scan trang 398–399, còn hình và các đoạn liên hệ cần rà soát riêng. |
| Sách III: Proposition IX–X và Giả thuyết I | `chapters/57-sach-iii-proposition-ix-x.md` | Đã dịch, đang rà soát công thức | Đã dịch suy giảm lực trọng lực dưới bề mặt hành tinh, sự bền vững của chuyển động hành tinh và Giả thuyết I; đã đối chiếu số liệu với scan trang 400–401. |
| Sách III: Proposition XI–XIII | `chapters/58-sach-iii-proposition-xi-xiii.md` | Đã dịch, đang rà soát công thức | Đã dịch tâm trọng lực chung, chuyển động của Mặt Trời và quỹ đạo elip của các hành tinh; đã đối chiếu các tỷ lệ của Proposition XIII với scan trang 402–403. |
| Sách III: Proposition XIV và Proposition XV–XVI | `chapters/59-sach-iii-proposition-xiv.md` | Đã dịch, đang rà soát công thức | Đã dịch aphel, node, Học luận, và hai bài toán xác định đường kính chính, độ lệch tâm và aphel; đã đối chiếu số liệu Học luận với scan trang 403–404. |
| Sách III: Proposition XVII–XX | `chapters/60-sach-iii-proposition-xvii-xx.md` | Đã dịch, đang rà soát công thức | Đã dịch dao động Mặt Trăng, trục và dạng hành tinh, tỷ lệ trục–đường kính, các phép đo con lắc và bảng số liệu; nhiều số OCR còn cần đối chiếu scan. |
| Sách III: Proposition XXI–XXIV | `chapters/61-sach-iii-proposition-xxi-xxiv.md` | Đã dịch, đang rà soát công thức | Đã dịch nutation, các bất đẳng thức chuyển động Mặt Trăng, chuyển động vệ tinh và thủy triều; nhiều công thức và sơ đồ OCR còn cần đối chiếu scan. |
| Sách III: Proposition XXV–XXVIII | `chapters/62-sach-iii-proposition-xxv-xxviii.md` | Đã dịch, đang rà soát công thức | Đã dịch lực Mặt Trời làm nhiễu Mặt Trăng, moment diện tích, khoảng cách Mặt Trăng và quỹ đạo không lệch tâm; nhiều công thức và sơ đồ OCR còn cần đối chiếu scan. |
| Sách III: Proposition XXIX–XXXII | `chapters/63-sach-iii-proposition-xxix-xxxii.md` | Đã dịch, đang rà soát công thức | Đã dịch biến thiên Mặt Trăng, chuyển động node trong quỹ đạo tròn và elip, cùng chuyển động trung bình hằng năm; nhiều công thức và sơ đồ OCR còn cần đối chiếu scan. |
| Sách III: Proposition XXXIII–XXXVI | `chapters/64-sach-iii-proposition-xxxiii-xxxvi.md` | Đã dịch, đang rà soát công thức | Đã dịch chuyển động thật của node, các bài viết của Machin, biến thiên nghiêng quỹ đạo, các phương trình Mặt Trăng và lực Mặt Trời gây thủy triều; nhiều công thức và sơ đồ OCR còn cần đối chiếu scan. |
| Sách III: Proposition XXXVII–XL | `chapters/65-sach-iii-proposition-xxxvii-xl.md` | Đã dịch, đang rà soát công thức | Đã dịch lực Mặt Trăng, dạng thân Mặt Trăng, Lemmas I–IV, Giả thuyết II, tiến động điểm xuân phân, sao chổi và Proposition XL; nhiều công thức, tên địa danh và sơ đồ OCR còn cần đối chiếu scan. |
| Sách III: Proposition XLI; Lemma V–XI | `chapters/66-sach-iii-lemma-v-xi-proposition-xli.md` | Đã dịch, đang rà soát công thức | Đã dịch Lemmas V–XI, Proposition XLI, các phép dựng quỹ đạo từ quan sát, bảng số liệu Halley/Coburg và phần giải thích nhiệt, đuôi sao chổi, khí quyển; nhiều công thức, tên địa danh và số liệu OCR còn cần đối chiếu scan. |
| Sách III: Proposition XLII và phần cuối Sách III | `chapters/67-sach-iii-proposition-xlii.md` | Đã dịch, đang rà soát công thức | Đã dịch Proposition XLII, các phép hiệu chỉnh quỹ đạo, bảng sao chổi 1664–1665 và 1683, các sao mới, Học luận chung về xoáy, trọng lực và Thần; nhiều công thức, bảng, tên địa danh và chữ Hy Lạp còn cần đối chiếu scan. |
| `THE SYSTEM OF THE WORLD` (PDF 515–578) | `chapters/68-he-thong-thoi-gioi.md` | Đã dịch, đang đối chiếu scan | Đã dịch PDF 517–578, gồm lịch sử vũ trụ, lực hướng tâm, hành tinh, Mặt Trăng, thủy triều, sao cố định, sao chổi, Bảng I–II, các Lemma và Bài toán I–II. Có các marker hình cần trích/dựng lại; các số/phân số khó đọc giữ `[OCR không rõ]`; cần đối chiếu từng trang với scan. |
| Mục lục Hệ thống thế giới và chỉ mục Principia (PDF 579–587, trang in 573–581) | `chapters/69-muc-luc-va-chi-muc.md` | Đã dịch, đang đối chiếu scan | Đã dịch mục lục và các mục chỉ mục; giữ số trang tham chiếu. PDF 588–594 được ghi nhận riêng là trang trắng/thư viện. |
| PDF 588–594 | Không có file dịch | Đã rà soát | Các trang trắng hoặc chỉ chứa dấu thư viện, không có nội dung sách cần dịch. |

## Lớp chú thích vật lí hiện đại (lớp chồng, không thuộc bản dịch)

Lớp chú thích dùng marker `> **[Ghi chú hiện đại]**`, quy ước tại `ANNOTATION_GUIDE.md`.

| Mục | Trạng thái |
|---|---|
| Số chương có chú thích | 70/70 |
| Tổng số chú thích | 153 |
| Độ dài chú thích | 273–450 từ (trung vị 373) |
| Lỗi cấu trúc nhãn / render / sai lệch bản dịch | 0 / 0 / 0 |
| Cảnh báo mật độ ngoài ngưỡng | 0 |

Kiểm tra lại bằng:

```
python tools/check_book_callouts.py "books\newton-principia" --render --fidelity
```

### Sửa bản dịch đã được duyệt

| File | Vị trí | Trước | Sau | Căn cứ |
|---|---|---|---|---|
| `chapters/02-dinh-luat-van-dong.md` | trong văn bản | `sao chổm` | `sao chổi` | lỗi chính tả hiển nhiên |
| `chapters/65-sach-iii-proposition-xxxvii-xl.md` | dòng 837 | `hành tình` | `hành tinh` | lỗi chính tả hiển nhiên |
| `chapters/66-sach-iii-lemma-v-xi-proposition-xli.md` | dòng 1508 | `hành tình` | `hành tinh` | lỗi chính tả hiển nhiên |
| `chapters/68-he-thong-thoi-gioi.md` | dòng 351 | `hành tình` | `hành tinh` | lỗi chính tả hiển nhiên |
| `chapters/68-he-thong-thoi-gioi.md` | dòng 673 | `hành tình` | `hành tinh` | lỗi chính tả hiển nhiên |
| `chapters/69-muc-luc-va-chi-muc.md` | dòng 40 | `hành tình` | `hành tinh` | lỗi chính tả hiển nhiên |
| `chapters/68-he-thong-thoi-gioi.md` | dòng 751 | `vận tốc của sao chổi xấp xỉ bằng.` | `vận tốc của sao chổi xấp xỉ bằng cùng.` | khôi phục từ nguyên văn bản 1846 |
| `chapters/01-dinh-nghia.md` | định nghĩa VI | `hiệu lực của nguyên nhân` | `mức độ hiệu quả của nguyên nhân` | `efficacia causæ` không phải một đại lượng đã định nghĩa trong vật lí hiện đại; giữ "tỉ lệ với" vì 1726 đọc `proportional to` |
| `chapters/01-dinh-nghia.md` | định nghĩa VIII, câu cuối | `Vì thế, gần tâm, lực gia tốc lớn hơn, nhưng lực động có thể vẫn không đổi, và trong trường hợp ấy, lực động chỉ thay đổi theo khoảng cách.` | `Vì vậy, gần mặt đất Trái Đất, nơi lực gia tốc trọng trường — tức lực sinh ra trọng lực — là như nhau ở mọi vật thể, thì lực động hay trọng lượng tỉ lệ với vật thể; nhưng nếu ta lên tới những vùng cao hơn, nơi lực gia tốc nhỏ hơn, trọng lượng sẽ giảm tương ứng, và sẽ luôn bằng tích của vật thể với lực gia tốc ấy.` | Latin 1726 `juxta Superficiem Terræ… gravitas motrix seu pondus est ut corpus`; Motte 1846 "near the surface of the earth, where the accelerative gravity … is the same, the motive gravity or weight is as the body". Bản dịch cũ ghi "gần tâm" thay "gần mặt đất" và thêm vế "lực động chỉ thay đổi theo khoảng cách" không có trong nguồn |

Câu ở dòng 751 của `68-he-thong-thoi-gioi.md` bị thiếu chữ "cùng" do đánh dấu
câu. Đối chiếu nguyên văn bản 1846 (trang "THE SYSTEM OF THE WORLD", đoạn bàn về
tốc độ sao chổi): "by my computation, the velocity of comets is found to be much
about the same." Vế bổ sung lấy nguyên từ nguồn, không suy đoán.

Nhật ký máy đọc: `AUTHORIZED_TEXT_FIXES.tsv`.

### Đã đối chiếu nguồn — không sửa

| File | Vị trí | Kết luận |
|---|---|---|
| `chapters/00-loi-dan-nhap.md` | dòng 473 | Không phải lỗi dịch |

Câu về cây táo dịch đúng nguyên văn bản 1846: "The celebrated apple-tree ... was
destroyed by the wind about twenty years ago; but it has been preserved in the form
of a chair." Chênh lệch về mốc thời gian nằm ở dữ kiện lịch sử, không nằm ở bản
dịch: Newton năm 1727 viết cây bị gió phá từ "khoảng hai mươi năm trước", tức quanh
1707, còn mốc thường được viện dẫn cho vụ đổ cây là khoảng năm 1900. Chênh lệch này
đã được nêu trong chú thích của chính chương đó, thay vì sửa văn bản dịch.

### Rà soát toàn diện Definitions I–VIII

Rà lại cả chương như một chỉnh thể sau khi định nghĩa VI–VIII viết xong. Bốn lỗi nội
dung đã sửa, một sự nhầm lẫn **không** phải lỗi file:

| Vị trí | Trước | Sau | Căn cứ |
|---|---|---|---|
| Định nghĩa I, ghi chú "Hiện nay thì sao" | "thứ tỉ lệ theo vị trí là tỉ số giữa hai loại khối lượng, không phải giữa trọng lượng và khối lượng" | "Cái đổi theo vị trí là $g$, nên trọng lượng đổi theo. Còn tỉ số $m_i/m_g$ là **hằng số của vật liệu**…" | Sai. Tỉ số $m_i/m_g$ là thuộc tính của vật, không đổi khi vật đi từ Trái Đất sang Mặt Trăng. Chính định nghĩa I nói lượng vật chất "được biết đến qua trọng lượng của mỗi vật thể, vì nó tỉ lệ với trọng lượng" — tức tỉ lệ đó là giữa **vật thể và trọng lượng** (và đó là lý do con lắc dùng để đo nó), không phải giữa hai loại khối lượng |
| Định nghĩa II, ghi chú "Vì sao Newton viết như vậy" | "phe Cartesian đếm bậc hai, còn Leibniz bảo vệ phép đo bậc nhất" | "Descartes gắn nó với tích của khối lượng và vận tốc, còn Leibniz bảo vệ phép đo bậc hai $mv^2$ — tức năng lượng, *vis viva*. Newton đứng về phe bậc nhất." | Đảo ngược. Descartes gắn *quantity of motion* với $mv$ (bậc nhất); Leibniz bảo vệ $mv^2$ (bậc hai, *vis viva*). Newton theo phe $mv$ — chính là định nghĩa II của chính sách này |
| Định nghĩa VI, ghi chú "Khái niệm tương ứng" | "không phải ba đại lượng khác nhau, cũng không đơn thuần là cùng một lực nhìn từ ba nơi" | "không phải ba lực độc lập, mà là ba cách định lượng có quan hệ với nhau" | Diễn đạt quá mạnh. Chính Newton đang **phân biệt** ba measures ấy suốt định nghĩa VI–VIII; điều cần nói chỉ là chúng không phải ba lực riêng biệt |
| Định nghĩa VII, ghi chú "Khái niệm tương ứng" | "đây là đại lượng phụ thuộc vị trí mà không phụ thuộc vật thể" | "**trong ví dụ hấp dẫn mà Newton đang xét**, đây là đại lượng phụ thuộc vị trí…" | Quá tổng quát nếu áp cho mọi *vis centripeta*. Tính chất "không phụ thuộc vật thể" là của trường hấp dẫn, không phải của lực hướng tâm nói chung |

**Không phải lỗi file.** Báo cáo cho rằng công thức tốc độ thoát bị mất căn
($v_{\mathrm{esc}} = 2GM/r$) là không đúng với file nguồn: `chapters/01-dinh-nghia.md:160`
viết đúng `$v_{\mathrm{esc}} = \sqrt{2GM/r}$`. Dạng hỏng quan sát được là dấu hiệu
renderer làm mất `\sqrt` và các ngoặc, **không** phải lỗi nội dung. Sửa file ở chỗ này
sẽ là sửa sai. Xem mục "Lỗi renderer toàn cục" bên dưới.

### Lỗi renderer toàn cục — đã dò pipeline, không phải lỗi KaTeX

**Kết luận: KaTeX có nối vào và chạy tốt. Vấn đề nằm ở tầng Pandoc _đọc_ toán,
không phải tầng hiển thị.** Sửa file theo dạng hỏng quan sát được sẽ là sửa sai.

**Đường đi (xác minh bằng cách đọc mã):**

- `LatexBlog.csproj:27-29` → `python tools/build_books.py` → `build_books.py:12` import
  `render_pandoc` từ `build_posts` → `build_books.py:229` gọi cho từng chương.
- Hệt một bước: chuyển đổi Markdown→HTML xảy ra **lúc build bằng tiến trình Pandoc
  ngoài** (`tools/pandoc/pandoc-3.6.4/pandoc.exe`), cờ `--katex` tại `build_posts.py:154`,
  reader `markdown+tex_math_single_backslash+tex_math_double_backslash` tại
  `build_posts.py:133`.
- Về phía C# **không** có chuyển đổi nào. `Services/BookStore.cs` chỉ
  `File.ReadAllText` HTML đã dựng sẵn (`ReadGeneratedHtml`, L92-105), tiêm vào
  `BookChapter.razor:26` qua `(MarkupString)Html`. Không có thư viện Markdown C# nào
  trong `.csproj`.
- KaTeX nạp ở `Components/App.razor:11` (CSS), `:36` (`katex.min.js`), `:37`
  (`auto-render.min.js`). MathJax **không có** trong repo.
- `auto-render.min.js` được nạp nhưng **không dùng**: Pandoc để TeX thô trong
  `<span class="math inline|display">` không kèm `\(...\)` nên bộ quét của auto-render
  không thấy. `site.js:253-261` tự gọi `katex.render()` trên mọi `.math`.
  Selector `up.compiler(".lb-prose, .lb-matrix", ...)` tại `site.js:97` **có** khớp
  `BookChapter.razor:26`, nên sách vẫn được render toán. Comment "Post page" ở
  `site.js:96` và `:227` là **stale**, gây hiểu nhầm; không phải rào chắn.
- Blazor Web App **static SSR**: `Program.cs:10` `AddRazorComponents()`,
  `Program.cs:160` `MapRazorComponents<App>()` không có `AddInteractiveServerRenderMode`.
  Toán render hoàn toàn bằng JS phía client, có tải `katex.min.js` ở `App.razor:15`.
- `books/` và `posts/` dùng **cùng một** `render_pandoc()`; chỉ khác ở phần mở rộng tệp.
  Claim trong `books/README.md` là đúng.
- Đã loại trừ: không có sanitizer nào trên prose sách (DOMPurify chỉ dùng cho
  comments, `comments.js`), không có CSS nào ẩn toán (`site.css:311` chỉ
  `overflow-x:auto`).

**Nguyên nhân thật.** Pandoc **không nhận** một số span toán làm toán, nên TeX thô rơi
xuống phân tích Markdown thường và bị ăn mất (`_` thành `<em>`, `\vec`/`\to`/`\text`
biến mất, `$` còn lại). Đây chính là dạng "GMmgr2", "1−v2/c2", "2GM/r" quan sát được.
Hai lớp lỗi, đã đối chiếu source với HTML sinh ra:

1. **Toán inline có khoảng trắng trong dấu** — 29 trường hợp. Ví dụ đã kiểm chứng
   `chapters/02-dinh-luat-van-dong.md:68`: nguồn `$ \vec{F}_{A \to B} = -\vec{F}_{B \to A} $`
   (có khoảng trắng sau `$`) → `dinh-luat-van-dong.html:36` ra
   `$ <em>{A B} = -</em>{B A} $`. Cùng file, dòng 42 `$\vec{F} \cdot \vec{v} = 0$`
   (không khoảng trắng) thì **có** nhận. Trong file này, số span toán (181) bằng đúng
   số span không có khoảng trắng (181): span chèn khoảng trắng là span duy nhất hỏng.
2. **Khối `$$` không cặp được** — lớp lớn hơn. Ví dụ đã kiểm chứng
   `chapters/65-sach-iii-proposition-xxxvii-xl.md:216-220`:
   `$$ \n 1158268534\text{ feet}. \n $$` → HTML ra `<p>$$ 1158268534:147706353. ]</p>`,
   tức `$$` còn nguyên, `\text{ feet}` bị mất, và khối ở dòng 243 bị **gộp vào**.
   File này có **0** toán inline chèn khoảng trắng nhưng vẫn 19 `$` thô, nên lớp lỗi
   này độc lập với lớp 1.

**Phạm vi thiệt hại (đếm trên HTML đã sinh):** 24/75 file chương chứa `$` chưa phân tích,
tổng 108 ký tự `$` thô đang được phát ra. File tệ nhất:
`sach-iii-proposition-xxxvii-xl` (19), `sach-iii-lemma-v-xi-proposition-xli` (17),
`sach-ii-phan-iii-proposition-xi-xiv` (10), `sach-ii-phan-ii-proposition-viii-x` (8).

`chapters/01-dinh-nghia.md` **sạch** vì mọi span ở đó đều không chèn khoảng trắng — đó
lý do dòng 30 nhìn đúng và dễ làm tưởng pipeline ổn.

**Lỗ hổng kiểm thử — đây là lý do 24 file hỏng lọt qua im lặng:**

- `tools/test_build_posts.py` **có** kiểm thử toán: L29 `$x^2$`, L50
  `$E = mc^2$`, L217 assert `class="math inline"`, L253-254 assert `class="math display"`.
- `tools/test_build_books.py` **không có** assertion nào về toán.
- E2E: `tests/e2e/tests/post.spec.js:4-7` assert `.lb-prose .katex` hiển thị — chỉ trên
  trang **post**. `home.spec.js:175` chỉ mở `/books` (trang danh sách).
  **Không test nào mở một chương sách và kiểm tra toán.**

### Đã sửa hàng loạt — toán sạch trên toàn bộ 75 chương

Sửa xong, kiểm chứng bằng chính HTML sinh ra. **Trước: 24/75 file chương chứa `$` chưa
phân tích, 108 ký tự `$` thô. Sau: 0 file, 0 ký tự.**

Cơ chế đã **kiểm chứng thực nghiệm**, không còn là suy luận: ba loại lỗi delimiter đã
xác định, sửa đúng loại đó thì `$` thô biến mất hoàn toàn. (Bản ghi trước đó ghi "suy
luận, chưa kiểm chứng" vì lúc đó chỉ đọc artifact, chưa sửa thử.)

| Lớp | Số | Dạng | Ví dụ đã kiểm chứng |
|---|---|---|---|
| 1. Khối `$$` đóng bằng `\]` | 48 | `\]` → `$$` | `65-sach-iii-proposition-xxxvii-xl.md`, khối mở ở dòng 242 bị `\]` đóng, kéo theo khối ở dòng 248 bị gộp |
| 2. Dấu đóng `$` bị gõ thành `\)` hoặc backtick | 13 | `\)`/`` ` `` → `$` | `50-...:259` lỗ $EF\)`, `68-...:384` ở $F\`` |
| 3. Toán inline chèn khoảng trắng | 1 | `$ ... $` → `$...$` | `02-dinh-luat-van-dong.md:68` |

**Không phải mọi `\]` đều sai.** Reader là
`markdown+tex_math_single_backslash+tex_math_double_backslash`, nên `\[`…`\]` là dạng
hiển thị hợp lệ. Chỉ `\]` **không đóng được** một `\[` nào, trong lúc có khối `$$`
đang mở, mới là lỗi. Áp dụng quy tắc sai lần đầu đã phá 5 khối `\[`…`\]` đang đúng ở
`sach-ii-phan-ii-proposition-v-vii-lemma-ii.md`; phát hiện qua việc số `$` thô **tăng**
từ 6 lên 12, nên đã `git checkout` toàn bộ rồi làm lại với hai trạng thái độc lập
(`$$` và `\[`). Lần hai cho 48 sửa đúng, không phá gì.

Tiêu chí đo là **HTML đã sinh**, không phải đếm trong nguồn: bộ dò đầu tiên của tôi báo
5860 lỗi vì regex khớp chéo giữa các span, toàn là báo động giả. Chỉ đếm `$` còn sốngng
trong HTML mới là đất chân đáng tin.

**Khai báo thay đổi.** 97 hunk được sinh tự động từ `git diff` và ghi vào
`AUTHORIZED_TEXT_FIXES.tsv`, mỗi hunk một dòng với ngữ cảnh mở rộng cho tới khi chuỗi
cũ duy nhất trong HEAD. Hai lớp guard đã bắt được lỗi nghiêm trọng: hunk có `old` rỗng làm
`str.replace("", x)` chèn giữa mọi ký tự (một lần gây diff 1.529.019 dòng), và hàng đảo
ngược `$$` → `\]`. Trước khi ghi, script mô phỏng đúng phép biến đổi của checker và xác
nhận **25/25 file tái tạo khớp từng byte**.

**Kiểm tra bổ sung, không chỉ đếm `$`.** Một khối `$$` hở có thể nuốt văn xuôi vào
toán mà **không** để lại dấu `$` nào, nên đếm `$` sẽ bỏ sót. Đã quét toàn bộ span
`math inline|display` trong HTML tìm tiếng Việt nằm ngoài `\text{...}`: 297 kết quả, và
tất cả đều hợp lệ (đơn vị "ngày", "giờ", "phút", "phần", "năm" bọc trong `\text{}`, và
placeholder `[OCR không rõ]`). Không có văn xuôi nào bị nuốt.

**Còn tồn đọng, không gây lỗi nhìn thấy:** `chapters/68-he-thong-thoi-gioi.md` có 35 dòng
`$$` — lẻ, tức một khối không đóng. Pandoc tự hồi phục: "Bài toán II" vẫn ra `<h3>` + văn
xuôi `<p>` bình thường. Để ngỏ, cần đối chiếu scan.

**Chưa đóng lại (việc ngoài phạm vi sửa hàng loạt):** chưa thêm chốt chặn build, chưa
thêm assertion toán vào `test_build_books.py`, chưa có e2e test mở chương sách, và hai
comment stale ở `site.js:96` và `site.js:227` vẫn ghi "Post page" dù toán áp dụng cho cả
sách.

**Đã loại trừ giả thuyết "renderer nuốt `\sqrt`":** `01-dinh-nghia.md:160` có
`\sqrt{2GM/r}` và file đó sạch. `\sqrt` mất ở chỗ khác là vì span toán ấy không được
nhận, nên TeX rơi xuống Markdown — không phải vì KaTeX hay CSS.

### Nguồn ngoài đã đối chiếu

Dùng cho các khẳng định lịch sử trong ghi chú hiện đại mà bản dịch không tự chứa. Mọi
dòng dưới đây đã được mở và đọc, không dựa vào trí nhớ.

| Khẳng định | Nguồn | Kết luận |
|---|---|---|
| Nguyên văn Newton về chuyến đo Cayenne: đồng hồ quả lắc chạy chậm hơn ở gần xích đạo, **năm 1672**, chậm hơn $2'29''$ mỗi ngày, con lắc đồng pha ngắn hơn $1\frac12$ line | `chapters/60-sach-iii-proposition-xvii-xx.md` dòng 175 (Học luận sau Proposition XX, Sách III) | **Nguồn chính** cho ghi chú định nghĩa VII — nằm trong chính cuốn sách, không cần ra ngoài |
| Năm, địa điểm, độ dài con lắc và kết luận về hình dạng Trái Đất | J. J. O'Connor & E. F. Robertson, "Jean Richer", *MacTutor History of Mathematics*, Đại học St Andrews — <https://mathshistory.st-andrews.ac.uk/Biographies/Richer/> | Khớp: rời Paris 15/11/1671, khởi hành từ La Rochelle 08/02/1672, **tới Cayenne 22/04/1672**, rời đi 25/05/1673. Báo cáo *Observations astronomiques et physiques faites en l'isle de Caïenne* (1679) |
| Trích nguyên văn Newton trong bản Motte | Cùng nguồn: "in the year 1672, M. Richer took notice of it in the island of Cayenne … at the rate of 2m 28s a day" | Xác nhận năm **1672** |
| Giá trị $g$ hiện đại: Cayenne ($4^\circ57'$) $\approx 9{,}7807$, Paris ($48^\circ50'$) $\approx 9{,}8094$ m/s² | ENS de Lyon, "Jean Richer à Cayenne (1672-1673)" — <http://eaae.ens-lyon.fr/groupspace/longitudes/pendulum/ens-inrp/ch/richer.pdf/download> | Chỉ để đối chiếu chéo, **không** đưa con số này vào ghi chú |
| Kết luận "Trái Đất dẹt ở hai cực" là cách hiểu của Newton; Huygens quy cho lực ly tâm, Cassini (1720) thì cho Trái Đất dài ở hai cực | Cùng nguồn MacTutor và Encyclopaedia Britannica, "Jean Richer" — <https://www.britannica.com/biography/Jean-Richer> | Ghi chú chỉ nêu kết luận của Newton, không tranh luận Huygens/Cassini để tránh tràn độ dài |

**Lỗi đã phát hiện và sửa trong phiên này.** Ghi chú định nghĩa VII trước đó ghi Richer
"sang Cayenne năm 1671". Sai. Cả nguyên văn chương 60 lẫn nguồn ngoài đều cho **1672**;
1671 chỉ là năm cấp hộ chiếu và rời Paris. Đã sửa thành 1672 và bỏ phần "người đầu tiên
đo được" vì nguyên văn Newton chỉ xếp Richer là "trước hết" (first of all), không phải
tuyên bố tuyệt đối về đệ nhất.

**Còn phải đối chiếu scan.** Con số $2'29''$ trong bản dịch chương 60 lệch với $2'28''$
mà MacTutor trích từ bản Motte. Ghi chú định nghĩa VII dùng con số của bản dịch nên
tự nhất quán nội bộ, nhưng cần đối chiếu lại với trang scan trước khi chốt.

### Hình ảnh — đã trích từ scan

Toàn bộ hình trong `chapters/68-he-thong-thoi-gioi.md` đã được trích trực tiếp từ bản
scan 1846 và lưu vào `assets/`. Khai báo từng hình: `EXTRACTED_FIGURES.tsv`.

| Hình | Nội dung | Trang scan |
|---|---|---|
| 1 | Mặt cầu Trái Đất $AFB$ và các đường cong $VD$, $VE$, $VF$ | PDF 519 |
| 2 | Mật độ ánh sáng: $ABD$, $PQ$, $C$, $FG$, trục chân trời $H$ | PDF 529 |
| 3 | Quả cầu $ABCD$ cắt bởi mặt phẳng $AC$ | PDF 533 |
| 4 | Trái Đất $ADEP$, hai cực, xích đạo, đường vĩ độ | PDF 543 |
| 5 | Hình bầu dục mặt biển $EADB$ | PDF 547 |
| 6 | Sơ đồ phân tích lực tại Mặt Trăng | PDF 548 |
| 7 | Mặt cầu $ADBE$ và mặt nước $aDbE$ | PDF 549 |
| 8 | Dựng tuyến tính Lemma I | PDF 573 |
| 9 | Dựng tuyến tính Lemma II | PDF 574 |
| 10 | Biểu diễn chuyển động theo giờ, Lemma III | PDF 575 |
| 11 | Bài toán I: quỹ đạo sao chổi | PDF 576 |

Một vị trí đánh dấu hình trong bản dịch là **placeholder ảo**: đã đối chiếu PDF
515–519, thảo luận giả thuyết quả cầu rắc của Eudoxus, Callippus và Aristotle trong bản
gốc là văn xuôi thuần, không kèm sơ đồ. Đã thay bằng ghi chú nói rõ điều đó.

### Ô [OCR không rõ] — đã đối chiếu và điền

Toàn bộ 11 ô `[OCR không rõ]` trong `chapters/68-he-thong-thoi-gioi.md` đã được điền
từ ảnh scan, mỗi ô khai trong `AUTHORIZED_TEXT_FIXES.tsv`:

- Bảng vệ tinh sao Mộc (PDF 523): độ giãn dài lớn nhất $1^\circ48'=108''$,
  $3^\circ01'=181''$, $4^\circ46'=286''$, $8^\circ13\frac12'=493\frac12''$; thời
  gian quay $1$d $18$h $28$m $36$s, $3$d $13$h $17$m $54$s, $7$d $3$h $59$m $36$s,
  $16$d $15$h $5$m $13$s.
- Tên hình thoi trên PDF 543 là $HPKhpk$ theo scan, không phải $HPKkh\lambda$ như bản
  dịch ghi.
- Tên nhà quan sát trên PDF 544 là Colepress và Sturmy; lớp OCR cho ra
  `Qvleptvss` và `Stitrnnj`.
- Khoảng cách góc của hai sao chổi trên PDF 570 là $71\frac23^\circ$ và
  $79\frac23^\circ$; chuyển động quận chiều của sao chổi 1680 là
  $4\frac23^\circ$, không phải $4^\circ$.

### Bảng — đã đối chiếu

Bảng I và Bảng II trong `chapters/68-he-thong-thoi-gioi.md` đã đối chiếu với ảnh scan
PDF 569: khớp toàn bộ 44 số của Bảng I và 40 số của Bảng II.

## Quy tắc hoàn tất

Một cuốn chỉ được đánh dấu hoàn tất khi:

- từng trang PDF có một mục trong sổ này;
- mỗi câu, công thức, chú thích, bảng, caption và hình đã được đối chiếu;
- hình ảnh đã được trích hoặc dựng lại bằng TeX/TikZ và kiểm tra hình ảnh;
- các trang chưa xác minh được ghi rõ, không thay bằng suy đoán.
