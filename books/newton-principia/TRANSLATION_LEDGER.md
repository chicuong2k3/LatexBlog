# Sổ đối chiếu bản dịch

Nguồn: `C:\Users\nguye\Downloads\Newton-Principia-English-1846.pdf` — 594 trang.
Bản OCR dùng để đối chiếu: [Internet Archive OCR](https://archive.org/download/newtonspmathema00newtrich/newtonspmathema00newtrich_djvu.txt).

| Trang nguồn | File đích | Trạng thái | Ghi chú |
|---|---|---|---|
| Front matter (PDF 1–16) và toàn bộ `LIFE OF SIR ISAAC NEWTON` (PDF 17–69, trang in 9–61) | `chapters/00-loi-dan-nhap.md` | Đã dịch, đang đối chiếu scan | Đã bổ sung đầy đủ lời tựa, lời giới thiệu, tiểu sử Isaac Newton, các trích dẫn và phần kết; cần rà soát đối chiếu từng trang với scan. |
| Definitions I–VIII | `chapters/01-dinh-nghia.md` | Đã dịch, đã sửa theo đối chiếu | Đã tách đoạn và đặt tiêu đề mô tả. Định nghĩa I sửa 2 chỗ sau khi đối chiếu Latin 1687 `Quantitas Materiæ est mensura ejusdem orta ex illius Densitate & Magnitudine conjunctim`: `mensura ejusdem` dịch thành "thước đo của chính lượng vật chất ấy" (trước đây là "đại lượng đo mức độ của nó"), và `Nive et Pulveribus` dịch thành "tuyết và các loại bột" (trước đây là "tuyết, bụi mịn hoặc bột" — "bụi mịn" là từ của bản Motte, không có trong Latin). `Magnitudo` giữ là "thể tích". Định nghĩa II sửa 1 câu: bản 1687 đọc `Motus totius est summa motuum in partibus singulis, adeoq; in corpore duplo majore æquali cum Velocitate duplus est, et dupla cum Velocitate quadruplus` — không có `si`; `in corpore duplo majore` mở khung và cả hai vế cùng nằm trong khung, nên vế sau kế thừa điều kiện "gấp đôi" của vế trước ($m'=2m,\ v'=2v \Rightarrow p'=4p$). Bản dịch cũ đọc vế sau là chỉ vận tốc tăng, dẫn tới nhận định sai rằng Newton mâu thuẫn với $p=mv$. Đã thêm chữ "cũng" và bỏ nhận định mâu thuẫn/$mv^2$; khớp với Motte/Cajori 1846 và Cohen–Whitman 2016, đều đọc tích luỹ. Xem `AUTHORIZED_TEXT_FIXES.tsv`. Sửa thêm 4 chỗ dịch `mensura` trong định nghĩa II, VI, VII, VIII: "đại lượng đo mức độ của nó / của lực ấy" → "thước đo của chính nó" (Latin 1687: `mensura ejusdem` ở II và VI, `ipsius mensura` ở VII và VIII). Lớp chú giải của định nghĩa I–II cũng được viết lại: bỏ nhận định "định nghĩa Newton vòng tròn", bỏ "1687 chưa có nguyên tử", bỏ phần phê bình cú pháp Latin, và bỏ hai đoạn bàn về cách dịch — theo `ANNOTATION_GUIDE.md` mục 5bis. |
| Laws I–III | `chapters/02-dinh-luat-van-dong.md` | Đã dịch | Đã tách đoạn và đặt tiêu đề mô tả. |
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
| Tổng số chú thích | 150 |
| Độ dài chú thích | 273–450 từ (trung vị 369) |
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
