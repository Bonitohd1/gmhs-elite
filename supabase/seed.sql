-- =================================================================
-- GMHS Elite — Seed Data (chạy sau migration 001)
-- 6 domains, 27 skills, 31 docs, 150 questions
-- =================================================================

-- 6 Skill Domains
INSERT INTO skill_domains (id, name, color) VALUES ('D1', 'Hành nghề chuyên nghiệp & đạo đức', '#5B8DEF') ON CONFLICT (id) DO NOTHING;
INSERT INTO skill_domains (id, name, color) VALUES ('D2', 'Chăm sóc & quản lý người bệnh', '#10B981') ON CONFLICT (id) DO NOTHING;
INSERT INTO skill_domains (id, name, color) VALUES ('D3', 'Kỹ thuật chuyên khoa GMHS', '#F59E0B') ON CONFLICT (id) DO NOTHING;
INSERT INTO skill_domains (id, name, color) VALUES ('D4', 'An toàn người bệnh & KSNK', '#EF4444') ON CONFLICT (id) DO NOTHING;
INSERT INTO skill_domains (id, name, color) VALUES ('D5', 'Cấp cứu & xử trí khẩn cấp', '#DC2626') ON CONFLICT (id) DO NOTHING;
INSERT INTO skill_domains (id, name, color) VALUES ('D6', 'Hệ thống & quản trị chuyên môn', '#8B5CF6') ON CONFLICT (id) DO NOTHING;

-- 27 Skills
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S1.1', 'D1', 'Tuân thủ đạo đức nghề nghiệp ĐD', '', 'all', ARRAY['VB06']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S1.2', 'D1', 'Hiểu phạm vi hành nghề theo TT32', '', 'all', ARRAY['VB01','VB02']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S1.3', 'D1', 'Thực hiện quy chế khoa PTGMHS', '', 'all', ARRAY['VB08']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S2.1', 'D2', 'Chuẩn bị bệnh nhân trước phẫu thuật', '', 'all', ARRAY['CS01','CS02']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S2.2', 'D2', 'Chăm sóc bệnh nhân sau mổ', '', 'all', ARRAY['CS03']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S2.3', 'D2', 'Đánh giá bệnh nhân hồi tỉnh (cấp cứu)', '+', 'all', ARRAY['CS07']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S2.4', 'D2', 'Chăm sóc bệnh nhân thở máy', '*', 'university+', ARRAY['CS04']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S2.5', 'D2', 'Bàn giao người bệnh & ca trực', '', 'all', ARRAY['CS05','CS06']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S2.6', 'D2', 'Dinh dưỡng cho NB phẫu thuật', '', 'all', ARRAY['CS08']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S3.1', 'D3', 'Định nhóm máu ABO trên giấy (KHC)', '*', 'university+', ARRAY['KT01']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S3.2', 'D3', 'Định nhóm máu HT/TC/Tủa', '*', 'university+', ARRAY['KT02']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S3.3', 'D3', 'Truyền máu & xử trí tai biến', '+', 'all', ARRAY['KT03']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S3.4', 'D3', 'Rút ống nội khí quản', '*', 'university+', ARRAY['KT04']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S3.5', 'D3', 'Trợ giúp phẫu thuật', '', 'all', ARRAY['KT05']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S3.6', 'D3', 'Chuẩn bị dụng cụ phụ mổ', '', 'all', ARRAY['KT06']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S3.7', 'D3', 'Đặt sonde dẫn lưu tiểu', '', 'all', ARRAY['BK02']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S3.8', 'D3', 'Hỗ trợ gây mê nội khí quản', '*', 'university+', ARRAY['BK03']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S4.1', 'D4', 'Phòng ngừa chuẩn (Standard Precautions)', '', 'all', ARRAY['DT03','VB09']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S4.2', 'D4', 'Kiểm soát nhiễm khuẩn theo QĐ 3916', '', 'all', ARRAY['VB09']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S4.3', 'D4', 'Đánh giá an toàn phẫu thuật theo QĐ 7482', '', 'all', ARRAY['VB10']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S4.4', 'D4', 'Quản lý vật tư y tế', '', 'all', ARRAY['KT07']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S5.1', 'D5', 'Sơ cứu - cấp cứu cơ bản', '+', 'all', ARRAY['VB02']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S5.2', 'D5', 'Xử trí tai biến truyền máu', '+', 'all', ARRAY['KT03']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S5.3', 'D5', 'Xử trí biến cố hồi tỉnh', '+', 'all', ARRAY['CS07']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S6.1', 'D6', 'Hoạt động ĐD trong BV theo TT31', '', 'all', ARRAY['VB04']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S6.2', 'D6', 'Hướng dẫn công tác GMHS', '', 'all', ARRAY['VB07']) ON CONFLICT (id) DO NOTHING;
INSERT INTO skills (id, domain_id, name, tt32_tag, level_required, source_doc_ids) VALUES ('S6.3', 'D6', 'Sử dụng bảng kiểm đánh giá thực hành', '', 'all', ARRAY['BK01']) ON CONFLICT (id) DO NOTHING;

-- 31 Documents (with excerpts where available)
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB01', '01_VB_TT_32_2023', 'Thông tư 32/2023/TT-BYT - Quy định chi tiết Luật KCB', '01_Van_Ban_Phap_Quy', 'pdf', 'P0', 'legal_core', '', 'BỘ Y TẾ             CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
__________
________________________________________________
Số: 32 /2023/TT-BYT                 Hà Nội, ngày 31 tháng 12 năm 2023
2:3
9:1
31            THÔNG TƯ
2/2
Quy định chi tiết một số điều của Luật Khám bệnh, chữa bệnh
1/1
___________________
Căn cứ Luật Khám bệnh, chữa bệnh số 15/2023/QH15 ngày 09 tháng 01
năm 2023;
Căn cứ Nghị định số 95/2022/NĐ-CP ngày 15 tháng 11 năm 2022 của
Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của
.kc
Bộ Y tế;
Theo đề nghị của Cục trưởng Cục Quản lý Khám, chữa bệnh và Cục
trưởng Cục Khoa học Công nghệ và đào tạo, Vụ trưởng Vụ Tổ chức cán bộ;
Bộ trưởng Bộ Y tế ban hành Thông tư quy định chi tiết một số điều của
Luật Khám bệnh, chữa bệnh.
Chương I
QUY ĐỊNH CHUNG
Điều 1. Phạm vi điều chỉnh
Thông tư này quy định về:
1. Cập nhật kiến thức y khoa liên tục trong khám bệnh, chữa bệnh quy
định tại khoản 14 Điều 2 và khoản 4 Điều 22 của Luật Khám bệnh, chữa bệnh.
2. Phạm vi hành nghề khám bệnh, chữa bệnh đối với các chức danh chuyên
môn quy định tại khoản 3 Điều 26 của Luật Khám bệnh, chữa bệnh.
3. Mẫu giấy phép hành nghề khám bệnh, chữa bệnh quy định tại khoản 5
Điều 27 của Luật Khám bệnh, chữa bệnh.
4. Thừa nhận tiêu chuẩn chất lượng cơ sở khám bệnh, chữa bệnh do tổ
chức trong nước, tổ chức nước ngoài ban hành quy định tại điểm d khoản 1 và
khoản 4 Điều 57 của Luật Khám bệnh, chữa bệnh.
5. Hồ sơ bệnh án và bản tóm tắt hồ sơ bệnh án quy định tại khoản 1 Điều
69 của Luật Khám bệnh, chữa bệnh.
6. Trực khám bệnh, chữa bệnh quy định tại khoản 3 Điều 70 của Luật
Khám bệnh, chữa bệnh.
7. Tiêu chuẩn và việc khám sức khỏe quy định tại khoản 2 Điều 83 của
Luật Khám bệnh, chữa bệnh.
8. Thực hành tốt thử kỹ thuật mới, phương pháp mới hoặc thử thiết bị y tế trên
2:3
lâm sàng quy định tại điểm d khoản 4 Điều 99 của Luật Khám bệnh, chữa bệnh.
9:1
9. Quy chế tổ chức, hoạt động của Hội đồng chuyên môn và trình tự, thủ
tục giải quyết tranh chấp khi xảy ra tai biến y khoa quy định tại khoản 6 Điều
2/2
101 của Luật Khám bệnh, chữa bệnh.
31/1
10. Huy động, điều động, phân công nhiệm vụ đối với các đối tượng tham
gia khám bệnh, chữa bệnh trong trường hợp xảy ra thiên tai, thảm họa, dịch
bệnh truyền nhiễm thuộc nhóm A hoặc tình trạng khẩn cấp quy định tại khoản
4 Điều 115 của Luật Khám bệnh, chữa bệnh.
.kc
Điều 2. Giải thích từ ngữ
1. Cơ sở cập nhật kiến thức y khoa liên tục trong khám bệnh, chữa bệnh
là cơ sở khám bệnh, chữa bệnh, cơ sở giáo dục tham gia đào tạo nhân lực y tế,
tổ chức xã hội - nghề nghiệp về khám bệnh, chữa bệnh đáp ứng yêu cầu tổ chức
cập nhật kiến thức y khoa liên tục theo quy định tại Thông tư này.
2. Giờ tín chỉ trong cập nhật kiến thức y khoa liên tục là đơn vị tính thời
gian người hành nghề tham gia một trong các hình thức cập nhật kiến thức
y khoa liên tục với công thức quy đổi theo quy định tại Phụ lục số I ban
hành kèm theo Thông tư này.
3. Thử nghiệm lâm sàng kỹ thuật mới, phương pháp mới và thiết bị y tế là
') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB02', '01_VB_PL_12_TT32', 'Phụ lục 12 - TT32 (Danh mục kỹ thuật điều dưỡng)', '01_Van_Ban_Phap_Quy', 'pdf', 'P0', 'scope_matrix', '', 'Phụ lục số XII
Danh mục kỹ thuật chuyên môn khám bệnh, chữa bệnh
của Người hành nghề chức danh điều dưỡng
(Ban hành kèm theo Thông tư số 32/2023/TT-BYT ngày 31 tháng 12 năm 2023
của Bộ trưởng Bộ Y tế)
5:5
9:1
TT           Mã TT         02   Danh mục kỹ thuật                          BS chỉ định    ĐD ra chỉ
2/2
43, 21                                                          và điều       định và
1/1
dưỡng thực     thực hiện
hiện độc lập    độc lập
u Ha
I. Chương chung
ran
Băng ép bất động xử trí rắn độc cắn+
1                                                                               X            X
2                               Băng ép cầm máu+                                X            X
tt.k
3           1.65                Bóp bóng Ambu qua mặt nạ+                       X            X
4                               Cai thở máy bằng thở T-tube ngắt                X            X
quãng*
5                               Cạo râu                                                      X
6                               Cắt chỉ                                         X
7                               Cắt lọc - khâu vết thương da đầu mang           X
tóc đơn giản*
8                               Cắt lọc - khâu vết thương vùng trán đơn         X            X
giản*
9                               Cắt lọc tổ chức hoại tử hoặc cắt lọc vết        X
thương
10                              Cắt móng chân, chăm sóc móng chân                            X
11                              Cắt móng tay/chân                                            X
12                              Cắt/cạo tóc                                                  X
13          9.6                 Cấp cứu cao huyết áp+                           X
14          9.8                 Cấp cứu ngừng tim+                              X            X
15                              Cấp cứu ngừng tuần hoàn hô hấp cơ                            X
bản+
16          1.158               Cấp cứu ngừng tuần hoàn hô hấp cơ               X            X
bản+
17          1.159               Cấp cứu ngừng tuần hoàn hô hấp nâng             X            X
cao*
18          9.7                 Cấp cứu ngừng thở+                              X            X
19          9.10                Cấp cứu tụt huyết áp+                           X            X
20          1.157               Cố định lồng ngực do chấn thương gãy            X            X
xương sườn*
21          22.511              Chăm sóc bệnh nhân điều trị trong phòng                      X
vô trùng*
22          22.509              Chăm sóc catheter cố định                     X
23          1.11                Chăm sóc catheter động mạch                   X
24          1.10                Chăm sóc catheter tĩnh mạch                   X
25          1.323               Chăm sóc catheter tĩnh mạch trung tâm         X
5:5
26          2.169               Chăm sóc catheter TMTT trong lọc máu          X
9:1
27                              Chăm sóc da sau xạ trị*    ') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB03', '01_VB_PL_TT32_2023', 'Phụ lục TT32 (toàn bộ)', '01_Van_Ban_Phap_Quy', 'zip', 'P1', 'reference', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB04', '01_VB_TT_31_2021_DIEU_DUONG', 'Thông tư 31/2021 - Hoạt động điều dưỡng trong bệnh viện', '01_Van_Ban_Phap_Quy', 'pdf', 'P0', 'legal_core', '', 'BỘ Y TẾ            CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
Số:       /2021/TT-BYT              Hà Nội, ngày     tháng     năm 2021
THÔNG TƯ
Quy định hoạt động điều dưỡng trong bệnh viện
Căn cứ Luật Khám bệnh, chữa bệnh số 40/2009/QH12 ngày 23 tháng 11
năm 2009;
Căn cứ Nghị định số 75/2017/NĐ-CP ngày 20 tháng 6 năm 2017 của Chính
phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Y tế;
Theo đề nghị của Cục trưởng Cục Quản lý Khám, chữa bệnh,
Bộ trưởng Bộ Y tế ban hành Thông tư quy định hoạt động điều dưỡng
trong bệnh viện
Chương I
QUY ĐỊNH CHUNG
Điều 1. Phạm vi điều chỉnh
1.        t       u       nhiệm vụ chuyên môn c ăm sóc iều d ỡng, tổ
chức hoạt ộ       iều d ỡng và nhiệm vụ của các chức danh chuyên môn trong
c ăm sóc      ời bệnh trong bệnh viện, trung tâm y tế huyện, quận, th xã, thành
phố thuộc tỉnh, thành phố thuộc thành phố trực thuộc tru    ơ có ơ v         ợc
cấp giấy phép hoạt ộng khám bệnh, chữa bệ v có ủ iều kiện cung cấp các
d ch vụ khám bệnh, chữa bệnh (sau â ọi là bệnh viện).
2. Các cơ sở khám bệnh, chữa bệ k ác că cứ u         nh tại       t
ể triển khai các hoạt ộ   iều d ỡng phù hợp với thực tế của cơ sở.
Điều 2. Giải thích từ ngữ
1. Chăm sóc điều dưỡng là việc nhậ      nh, can thiệp c ăm sóc, theo dõi
nhằm á ứ các u c u cơ                 của m i   ời bệnh về: hô hấp, tu n hoàn,
di d ỡng, bài tiết, vậ ộ v t t ế, ngủ và nghỉ ơi, mặc v t a ồ v i,
thân nhiệt, vệ si cá â , m i tr ờng an toàn, giao tiế , tí     ỡng, hoạt ộng,
gi i trí và kiến thức b o vệ sức khỏe.
2. Nhận định lâm sàng hoặc chẩn đoán điều dưỡng là việc nhậ   nh về á
ứng của cơ t ể    ời bệnh với tình trạng sức khỏe. Việc chẩ oá iều d ỡng là
cơ sở ể lựa chọn các can thiệ c ăm sóc iều d ỡng nhằm ạt kết qu mong
muốn trong phạm vi chuyên môn của iều d ỡng.
Điều 3. Nguyên tắc thực hiện chăm sóc điều dưỡng
1. Việc nhậ   nh lâm sàng, phân cấ c ăm sóc v t ực hiện các can thiệp
c ăm sóc iều d ỡng cho      ời bệnh ph i ú c u ê m , to diệ , iê tục,
an toàn, chất ợng, công bằng giữa các    ời bệnh và phù hợp với nhu c u của
m i      ời bệnh.
2. Việc thực hiện hoạt ộ  iều d ỡng trong bệnh viện ph i b o m có sự
tham gia, phối hợp của các ơ v và các chức danh chuyên môn khác trong bệnh
viện.
Điều 4. Phân cấp chăm sóc người bệnh
1. C ăm sóc cấ I:    ời bệnh trong tình trạng nặng, nguy k ch không tự
thực hiện các hoạt ộng cá nhân hằng ngày hoặc do yêu c u chuyên môn không
ợc vậ ộng ph i phụ thuộc hoàn toàn vào sự t eo dõi, c ăm sóc to diện và
liên tục của iều d ỡng.
2. C ăm sóc cấp II:    ời bệnh trong tình trạng nặng, có hạn chế vậ ộng một
ph n vì tình trạng sức khỏe hoặc do yêu c u chuyên môn ph i hạn chế vậ ộng,
phụ thuộc ph n nhiều vào sự t eo dõi, c ăm sóc của iều d ỡng khi thực hiện các
hoạt ộng cá nhân hằng ngày.
3. C ăm sóc cấp III:   ời bệnh có thể vậ ộ , i ại không hạn chế và tự
thực hiệ    ợc tất c hoặc h u hết các hoạt ộng cá nhân hằ        d ới sự
ớng dẫn của iều d ỡng.
Chương II
NHIỆM VỤ CHUYÊN MÔN CHĂM SÓC ĐIỀU DƯỠNG
Điều 5. T') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB05', '01_VB_CNL_DIEU_DUONG_VN', 'Chuẩn năng lực điều dưỡng Việt Nam', '01_Van_Ban_Phap_Quy', 'docx', 'P0', 'competency_framework', '', 'Điều dưỡng là lực lượng tạo sự thay đổi tích cực trong hệ thống y tế. Theo Tổ chức y tế thế giới “dịch vụ điều dưỡng là một trong những trụ cột của hệ thống chăm sóc y tế”. Dịch vụ chăm sóc điều dưỡng vừa mang tính phổ biến vừa mang tính thiết yếu. Các dịch vụ điều dưỡng diễn ra liên tục tại các cơ sở khám chữa bệnh 24 giờ/ngày tác động đến hiệu quả việc điều trị và phòng bệnh cho người dân.
Các nước trên thế giới và trong khu vực ASEAN có xu thế cao đẳng và đại học hóa ngành điều dưỡng, nhiều nước 100% điều dưỡng có trình độ từ đại học trở lên. Tổ chức Y tế Thế giới (WHO) khuyến cáo trình độ điều dưỡng tối thiểu phải là cao đẳng. Theo thỏa thuận giữa các quốc gia khu vực ASEAN chỉ công nhận điều dưỡng cao đẳng trở lên. Như vậy, cao đẳng và đại học hóa đang trở thành yêu cầu tối thiểu để được đăng ký hành nghề và được công nhận là điều dưỡng chuyên nghiệp giữa các quốc gia khu vực ASEAN và trên toàn Thế giới.
Theo báo cáo “Thực trạng Điều dưỡng Thế giới năm 2020”của WHO điều dưỡng chiếm hơn một nửa số nhân viên y tế trên thế giới, có khoảng 28 triệu điều dưỡng trên toàn thế giới. Từ năm 2013 đến 2018, số lượng điều dưỡng tăng 4,7 triệu nhưng vẫn còn thiếu hụt 5,9 triệu điều dưỡng trên toàn cầu với những khoảng trống lớn nhất được tìm thấy ở các quốc gia Châu Phi, Đông Nam Á và khu vực Đông Địa Trung Hải cũng như một số khu vực của Mỹ Latinh. Bên cạnh đó hơn 80% các điều dưỡng trên thế giới làm việc tại các quốc gia là nơi cư trú của một nửa dân số thế giới, có 1/8 điều dưỡng hành nghề ở một quốc gia không phải là nơi họ sinh ra hoặc được đào tạo. Già hóa cũng đe dọa lực lượng lao động điều dưỡng khi 1/6 số điều dưỡng trên thế giới sẽ nghỉ hưu trong 10 năm tới. Có thể thấy khủng hoảng thiếu nhân lực điều dưỡng đang diễn ra trên toàn cầu và đặc biệt ở các quốc gia phát triển, vì vậy các nước phát triển đang đưa ra chính sách thu hút về lương và gia hạn thị thực để tuyển điều dưỡng viên có trình độ ở các quốc gia đang phát triển[1].
Di cư điều dưỡng đang diễn ra trên phạm vi toàn cầu. Các dòng di cư điều dưỡng viên từ những nước kém phát triển sang nước đang phát triển và từ nước đang phát triển sang nước phát triển. Các Thỏa thuận thừa nhận lẫn nhau (Mutual Recognition Agreement-MRA) để hỗ trợ cho sự di cư điều dưỡng trên phạm vi khu vực và toàn cầu đã trở thành mối quan tâm của các chính phủ, được đặt ra trong tiến trình hội nhập và đã trở thành cam kết của các chính phủ. Mười quốc gia ở khu vực Đông Nam Á đã ký kết các thỏa thuận khung về công nhận dịch vụ Điều dưỡng, theo đó tiến tới cho phép công dân của các nước thành viên có chứng chỉ hành nghề hợp pháp được hành nghề Điều dưỡng ở các nước thành viên. Chuẩn năng lực là tiêu chí quan trọng thừa nhận lẫn nhau.
Tại Việt Nam, cả nước có 108.113 điều dưỡng, chiếm 22,9% nhân lực chuyên môn của ngành y tế [2]. Dịch vụ chăm sóc do điều dưỡng cung cấp đóng vai trò rất quan trọng trong việc nâng cao chất lượng dịch vụ y tế. Ngành Điều dưỡng đã có sự phát triển nhanh chóng trên các lĩnh vực quản lý, đào') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB06', '01_VB_CDD_DIEU_DUONG_VN', 'Chuẩn đạo đức nghề nghiệp của điều dưỡng', '01_Van_Ban_Phap_Quy', 'pdf', 'P1', 'ethics', '', 'HỘI ĐIỀU DƯỠNG            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
VIỆT NAM                      Độc lập - Tự do - hạnh phúc
Số: 20 /QĐ – HĐD                     Hà Nội, ngày 10 tháng 09 năm 2012
QUYẾT ĐỊNH
Về việc ban hành Chuẩn đạo đức nghề nghiệp
của điều dưỡng viên Việt Nam
CHỦ TỊCH HỘI ĐIỀU DƯỠNG VIỆT NAM
Căn cứ Quyết định 375-CT ngày 26 tháng 10 năm 1990 của Chủ tịch Hội đồng Bộ
trưởng về việc thành lập Hội Điều dưỡng Việt Nam;
Căn cứ Điều 42 Luật Phòng chống tham nhũng;
Căn cứ văn bản hiệp y số 5747/BYT-TCCB ngày 29 tháng 8 năm 2012 của Bộ Y
tế và văn bản hiệp y số 282/2012/CV-THYH ngày 10 tháng 9 năm 2012 của Tổng hội Y
học Việt Nam;
Căn cứ Điều lệ Hội Điều dưỡng Việt Nam được phê duyệt tại Quyết định số
627/2008/QĐ-BNV ngày 26 tháng 5 năm 2008 của Bộ trưởng Bộ Nội vụ;
QUYẾT ĐỊNH
Điều 1. Ban hành Chuẩn đạo đức nghề nghiệp của điều dưỡng viên Việt Nam;
Điều 2. Quyết định này có hiệu lực kể từ ngày ký, ban hành;
Điều 3: Các ông bà Phó chủ tịch, Tổng thư ký, Chánh văn phòng, uỷ viên Ban
chấp hành Hội Điều dưỡng Việt Nam, Chủ tịch tỉnh/thành hội, Chi hội trưởng các chi hội
chịu trách nhiệm tổ chức thực hiện và hội viên của Hội Điều dưỡng Việt Nam có trách
nhiệm thi hành Quyết định này.
Nơi nhận:                                      TM.BAN CHẤP HÀNH
- Như Điều 3;                                      CHỦ TỊCH
- Ban Tuyên giáo TƯ (để báo cáo);
- Bộ Y tế (để báo cáo);
- Bộ Nội Vụ (để báo cáo);
- Tổng Hội Y Học Việt Nam (để báo cáo);
- Lưu: Văn phòng Hội.
Vi Nguyệt Hồ
LỜI GIỚI THIỆU
Nghề Y nói chung, nghề điều dưỡng nói riêng được phân biệt với các nghề khác bởi
nghĩa vụ đạo đức nghề nghiệp mang tính đặc thù, đó là: chăm sóc, điều trị, cứu người,
làm giảm nhẹ sự đau đớn của con người do bệnh tật và do các can thiệp y tế. Để hoàn
thành nghĩa vụ nghề nghiệp đối với sự ủy thác của xã hội điều dưỡng viên phải vừa giỏi
chuyên môn và vừa phải có đạo đức nghề nghiệp. Tính chuyên nghiệp và đạo đức nghề
nghiệp là nền tảng của nghề điều dưỡng.
Chuẩn đạo đức nghề nghiệp của điều dưỡng viên Việt Nam được xây dựng dựa trên
các cơ sở: (1) Pháp lý: dựa vào Điều 42 Luật Phòng chống tham nhũng; (2) Nghĩa vụ
nghề nghiệp của điều dưỡng viên được quy định bởi: các mối quan hệ với người bệnh,
đồng nghiệp, nghề nghiệp và xã hội; (3) Những thách thức của y đức trong cơ chế thị
trường: nảy sinh những mâu thuẫn trong việc thực thi nghĩa vụ nghề nghiệp của điều
dưỡng viên; (4) Trên cơ sở hội nhập quốc tế: tham khảo Chuẩn đạo đức nghề nghiệp điều
dưỡng viên của Hội đồng Điều dưỡng quốc tế (The ICN Code of Ethics for Nurses; 2000)
và Quy tắc đạo đức y học của Hiệp hội Y học thế giới (Medical Ethics manual of the
World Medical Asociation; 2005).
Chuẩn đạo đức nghề nghiệp của điều dưỡng viên là những nguyên tắc, những giá trị
nghề nghiệp, những khuôn mẫu để hướng dẫn điều dưỡng viên đưa ra các quyết định có
đạo đức trong quá trình hành nghề. Chuẩn đạo đức nghề nghiệp cũng là cơ sở để người
bệnh, người dân và người quản lý giám sát, đánh giá việc thực hiện của hội viên trên
phạm vi c') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB07', '01_VB_HD_GAY_ME_HOI_SUC', 'Hướng dẫn công tác gây mê hồi sức', '01_Van_Ban_Phap_Quy', 'docx', 'P0', 'specialty_core', '', 'Quy định chung
Khoa gây mê - hồi sức hoàn chỉnh gồm các bộ phận sau:
a) Hành chính;
b) Khám trước gây mê;
c) Phẫu thuật;
d) Hồi tỉnh;
đ) Hồi sức ngoại khoa;
e) Chống đau.
2. Bệnh viện hạng đặc biệt, hạng I phải tổ chức khoa gây mê - hồi sức hoàn chỉnh theo quy định tại Khoản 1 Điều này.
3. Bệnh viện hạng II phải tổ chức khoa gây mê - hồi sức với tối thiểu gồm 04 bộ phận theo quy định tại Điểm a, Điểm c, Điểm d và Điểm đ Khoản 1 Điều này.
4. Bệnh viện hạng III, hạng IV hoặc chưa phân hạng nếu chưa có khoa gây mê - hồi sức phải bố trí tối thiểu 02 bộ phận quy định tại Điểm c và Điểm d Khoản 1 Điều này thuộc một khoa lâm sàng có thực hiện phẫu thuật, thủ thuật.
5. Các cơ sở khám bệnh, chữa bệnh khác ngoài quy định tại Khoản 2, Khoản 3 và Khoản 4 Điều này nếu được phép thực hiện phẫu thuật, thủ thuật thì phải bảo đảm hoạt động gây mê - hồi sức theo đúng quy định chuyên môn kỹ thuật được quy định tại Thông tư này.
Điều 5. Các chức danh chuyên môn thực hiện việc gây mê - hồi sức
1. Bác sỹ gây mê - hồi sức là bác sỹ đã được đào tạo về chuyên khoa gây mê - hồi sức từ 18 tháng trở lên và được cấp chứng chỉ hành nghề theo quy định của pháp luật về khám bệnh, chữa bệnh.
2. Điều dưỡng viên gây mê - hồi sức là điều dưỡng viên có văn bằng chuyên khoa gây mê - hồi sức và được cấp chứng chỉ hành nghề theo quy định của pháp luật về
khám bệnh, chữa bệnh.
3. Kỹ thuật viên gây mê - hồi sức là kỹ thuật viên có văn bằng chuyên khoa gây mê - hồi sức và được cấp chứng chỉ hành nghề theo quy định của pháp luật về khám bệnh, chữa bệnh.
4. Điều dưỡng bộ phận phẫu thuật là điều dưỡng viên có giấy xác nhận đã được đào tạo về điều dưỡng phẫu thuật và được cấp chứng chỉ hành nghề theo quy định của pháp luật về khám bệnh, chữa bệnh.
Điều 6. Bố trí nhân lực
Nhân lực của khoa gây mê - hồi sức được bố trí ở các bộ phận như sau:
1. Hành chính: gồm điều dưỡng viên trưởng của khoa và nhân viên hành chính. Số lượng nhân viên hành chính do giám đốc cơ sở khám bệnh, chữa bệnh quyết định trên cơ sở đề nghị của trưởng khoa gây mê - hồi sức.
2. Khám trước gây mê: tối thiểu gồm 01 (một) bác sỹ gây mê - hồi sức, 01 (một) điều dưỡng viên gây mê - hồi sức và 01 (một) hộ lý.
3. Phẫu thuật: nhân lực cho mỗi ca phẫu thuật tối thiểu gồm 01 (một) bác sỹ gây mê - hồi sức, 01 (một) điều dưỡng viên gây mê - hồi sức, 01 (một) điều dưỡng viên làm nhiệm vụ dụng cụ, 01 (một) điều dưỡng viên làm nhiệm vụ vòng ngoài và 01 (một) hộ lý.
4. Hồi tỉnh: tối thiểu gồm 01 (một) bác sỹ gây mê - hồi sức, điều dưỡng viên (số lượng điều dưỡng viên tuỳ thuộc vào số giường hồi tỉnh với tỷ lệ 02 (hai) điều dưỡng viên phụ trách 05 giường bệnh) và 01 (một) hộ lý.
5. Hồi sức ngoại khoa: tối thiểu gồm 01 (một) bác sỹ gây mê - hồi sức phụ trách 03 giường bệnh, 1,5 điều dưỡng viên phụ trách 01 giường bệnh và 01 (một) hộ lý.
6. Chống đau: tối thiểu gồm 01 (một) bác sĩ gây mê - hồi sức, điều dưỡng viên (số lượng điều dưỡng tùy thuộc vào số giường bệnh, tỷ lệ 01 (một) (điều dưỡng viên phụ trách 02 giường bệnh) và 01 (một) hộ lý.
7') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB08', '01_VB_QC_NV_KHOA_PTGMHS', 'Quy chế chức năng nhiệm vụ khoa PTGMHS (756)', '01_Van_Ban_Phap_Quy', 'docx', 'P1', 'department_charter', '', 'BỆNH VIỆN K            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
ĐƠN VỊ:……….Độc lập - Tự do - Hạnh phúc
CHỨC NĂNG, NHIỆM VỤ, quyền hạn, CƠ CẤU TỔ CHỨC,
QUY CHẾ HOẠT ĐỘNG CỦA ……….
THUỘC BỆNH VIỆN K.
(Ban hành kèm theo Quyết định số      /QĐ-BV ngày ......
của Giám đốc Bệnh viện K)
1. Chức năng
Khoa Phẫu thuật-Gây mê hồi sức cấp cứu cơ sở Quán Sứ là khoa lâm sàng chịu sự lãnh đạo trực tiếp của Giám đốc bệnh viện và chịu trách nhiệm trước Giám đốc về:
Thực hiện công tác Phẫu thuật-Gây mê hồi sức điều trị ngoại khoa bệnh ung bướu.
Hỗ trợ chuyên môn và phối hợp điều trị cho các khoa lâm sàng, cận lâm sàng khác trong viện.
Tham gia đào tạo cán bộ, công tác chỉ đạo tuyến.
Nghiên cứu khoa học, triển khai ứng dụng khoa học, công nghệ kĩ thuật hiện đại trong công tác phẫu thuật-gây mê hồi sức.
2. Nhiệm vụ, quyền hạn
2-1. Nhiệm vụ
2.1.1. Khám, chữa bệnh
Phối hợp với các khoa ngoại thực hiện phẫu thuật, thủ thuật, gây mê và hồi sức, giảm đau sau mổ cho bệnh nhân.
Tổ chức thực hiện kế hoạch phẫu thuật đã được duyệt. Thực hiện gây mê hồi sức, phụ mổ và săn sóc hậu phẫu cho người bệnh trong quá trình tiến hành phẫu thuật, thủ thuật đến khi bàn giao người bệnh về khoa lâm sàng.
Thực hiện đúng các quy trình kĩ thuật bệnh viện trong khám, phẫu thuật-gây mê hồi sức cho bệnh nhân trước, trong, sau phẫu thuật.
Tiếp nhận, tổ chức hồi sức cấp cứu và điều trị tích cực tại khoa khi chức năng sống bị đe dọa cần phải chăm sóc cho các bệnh nhân điều trị nội trú, ngoại trú các khoa thuộc khối nội, xạ trị. Hồi sức giai đoạn tiếp theo cho các bệnh nhân nặng thuộc lĩnh vực ngoại khoa sau khi đã được phẫu thuật.
Ngoài nhiệm vụ chính là phẫu thuật-gây mê hồi sức khoa  Phẫu thuật-Gây mê hồi sức còn được giao nhiệm vụ quản lý và tổ chức thực hiện  điều trị trong ngày gồm:
+Thực hiện vô cảm và theo dõi các bệnh nhân làm thủ thuật sinh thiết: Tiền liệt tuyến, gan, phổi, chụp phim cắt lớp, cộng hưởng từ, trên cơ sở phối hợp với khoa chẩn đoán hình ảnh và các khoa khác.
+ Thực hiện gây mê cho các bệnh nhân thăm dò chức năng: Nội soi dạ dày, đại tràng… phối hợp tốt với khoa Nội soi- thăm dò chức năng.
+ Đặt buồng tiêm truyền  dưới da phối hợp với khoa nội trong điều trị bệnh nhân hóa chất.
Thực hiện đúng qui trình chống nhiễm khuẩn, công tác vô trùng phòng mổ.
Tham gia hội chẩn phẫu thuật, hội chẩn tiểu ban, hội chẩn bệnh viện, hội chẩn liên khoa, hội chẩn liên bệnh viện về công tác phẫu thuật-gây mê hồi sức trong phẫu thuật bệnh nhân ung bướu.
2.1.2. Đào tạo cán bộ
Tư vấn cho Giám đốc bệnh viện và tham gia đào tạo, đào tạo lại và đào tạo nâng cao trình độ cho bác sĩ, điều dưỡng trong khoa và các cán bộ y tế tuyến dưới được gửi đến học tập và thực hành khi có yêu cầu.
Tham gia đào tạo cán bộ y tế ở bậc sau đại học, đại học, cao đẳng và trung học do bệnh viện phân công.
2.1.3. Nghiên cứu khoa học
Đề xuất và triển khai các đề tài nghiên cứu khoa học kĩ thuật xuất phát từ nhu cầu thực tế liên quan đến công tác phẫu thuật-gây mê hồi sức tại bệnh viện theo xu hướng phát triển của nền y học hiện đại') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB09', '01_VB_QD_3916_BYT_KSNK', 'Quyết định 3916/QĐ-BYT về kiểm soát nhiễm khuẩn', '01_Van_Ban_Phap_Quy', 'pdf', 'P0', 'infection_control', '', 'BỘ Y TẾ                 CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
-------                      Độc lập - Tự do - Hạnh phúc
---------------
Số: 3916/QĐ-BYT                                Hà Nội, ngày 28 tháng 8 năm 2017
QUYẾT ĐỊNH
VỀ VIỆC PHÊ DUYỆT CÁC HƯỚNG DẪN KIỂM SOÁT NHIỄM KHUẨN TRONG CÁC CƠ SỞ
KHÁM BỆNH, CHỮA BỆNH
BỘ TRƯỞNG BỘ Y TẾ
Căn cứ Nghị định số 75/2017/NĐ-CP ngày 20 tháng 6 năm 2017 của Chính phủ quy định chức năng,
nhiệm vụ, quyền hạn về cơ cấu tổ chức của Bộ Y tế;
Căn cứ Thông tư số 18/2009/TT-BYT ngày 14 tháng 10 năm 2009 của Bộ trưởng Bộ Y tế Hướng dẫn thực
hiện công tác kiểm soát nhiễm khuẩn trong các cơ sở khám bệnh, chữa bệnh;
Theo đề nghị của Ông Cục trưởng Cục Quản lý Khám, chữa bệnh, Bộ Y tế,
QUYẾT ĐỊNH:
Điều 1. Ban hành kèm theo Quyết định này các Hướng dẫn kiểm soát nhiễm khuẩn trong các cơ sở khám
bệnh, chữa bệnh bao gồm:
1. Hướng dẫn giám sát nhiễm khuẩn bệnh viện trong các cơ sở khám bệnh, chữa bệnh.
2. Hướng dẫn kiểm soát nhiễm khuẩn tại khoa gây mê hồi sức trong các cơ sở khám bệnh, chữa bệnh.
3. Hướng dẫn phòng ngừa nhiễm khuẩn tiết niệu liên quan đến đặt thông tiểu trong các cơ sở khám bệnh,
chữa bệnh.
4. Hướng dẫn xử lý dụng cụ phẫu thuật nội soi và xử lý ống nội soi mềm trong các cơ sở khám bệnh,
chữa bệnh.
5. Hướng dẫn thực hành vệ sinh tay trong các cơ sở khám bệnh, chữa bệnh.
Điều 2. Quyết định này có hiệu lực kể từ ngày ký, ban hành.
Điều 3. Các Ông, Bà: Chánh văn phòng Bộ: Chánh Thanh tra Bộ: Vụ trưởng, Cục trưởng các Vụ, Cục
thuộc Bộ Y tế; Giám đốc Sở Y tế các tỉnh, thành phố trực thuộc Trung ương; Giám đốc Bệnh viện, Viện
nghiên cứu có giường bệnh trực thuộc Bộ Y tế: Thủ trưởng Y tế các Bộ, ngành; Thủ trưởng các đơn vị có
liên quan chịu trách nhiệm thi hành Quyết định này./.
KT. BỘ TRƯỞNG
Nơi nhận:                                                THỨ TRƯỞNG
- Như Điều 3;
- Bộ trưởng (để báo cáo);
- Các Thứ trưởng (để biết);
- Cổng TTĐT Bộ Y tế, Website Cục QLKCĐ;
- Lưu: VT, KCB.
Nguyễn Viết Tiến
HƯỚNG DẪN
GIÁM SÁT NHIỄM KHUẨN BỆNH VIỆN TRONG CÁC CƠ SỞ KHÁM BỆNH, CHỮA BỆNH
(Ban hành theo Quyết định số: 3916/QĐ-BYT ngày 28/8/2017 của Bộ trưởng Bộ Y tế)
MỤC LỤC
DANH MỤC CÁC CHỮ VIẾT TẮT .......................................................................
I. Đặt vấn đề ..............................................................................................................
II. Một số nội dung cơ bản về giám sát nhiễm khuẩn bệnh viện ..............................
1. Khái niệm về giám sát nhiễm khuẩn bệnh viện ....................................................
2. Tiêu chuẩn và nguyên tắc xác định ca bệnh nhiễm khuẩn bệnh viện ...................
3. Mục đích, ý nghĩa của giám sát nhiễm khuẩn bệnh viện ......................................
4. Lựa chọn phương pháp giám sát nhiễm khuẩn bệnh viện .....................................
5. Xác định quần thể, đối tượng, nội dung và mục tiêu giám sát ..............................
6. Thu thập dữ liệu giám sát .............................................................') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('VB10', '01_VB_QD_7482_2018_ATPT', 'Quyết định 7482/2018 - Đánh giá an toàn phẫu thuật', '01_Van_Ban_Phap_Quy', 'docx', 'P0', 'surgical_safety', '', 'BỘ Y TẾ-------
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAMĐộc lập - Tự do - Hạnh phúc ---------------
Số: 7482/QĐ-BYT
Hà Nội, ngày 18 tháng 12 năm 2018
QUYẾT ĐỊNH
BAN HÀNH BỘ TIÊU CHÍ CHẤT LƯỢNG ĐÁNH GIÁ MỨC ĐỘ AN TOÀN PHẪU THUẬT
BỘ TRƯỞNG BỘ Y TẾ
Căn cứ Luật Khám bệnh, chữa bệnh ngày 23 tháng 11 năm 2009;
Căn cứ Nghị định số 75/2017/NĐ-CP ngày 20 tháng 6 năm 2017 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Y tế;
Căn cứ Quyết định số 4518/QĐ-BYT ngày 16 tháng 7 năm 2018 của Bộ trưởng Bộ Y tế quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Cục Quản lý Khám, chữa bệnh thuộc Bộ Y tế;
Theo đề nghị của Cục trưởng Cục Quản lý Khám, chữa bệnh, Bộ Y tế,
QUYẾT ĐỊNH:
Điều 1. Ban hành kèm theo Quyết định này Bộ tiêu chí chất lượng đánh giá mức độ an toàn phẫu thuật.
Điều 2. Bộ tiêu chí chất lượng đánh giá mức độ an toàn phẫu thuật được triển khai thực hiện tại các cơ sở khám bệnh, chữa bệnh có thực hiện phẫu thuật để tự đánh giá và cải tiến bảo đảm an toàn phẫu thuật và để cơ quan quản lý kiểm tra, đánh giá, giám sát bảo đảm an toàn phẫu thuật đối với các cơ sở khám bệnh, chữa bệnh trực thuộc.
Điều 3. Giao Cục Quản lý Khám, chữa bệnh làm đầu mối hướng dẫn các đơn vị có liên quan triển khai thực hiện “Bộ tiêu chí chất lượng đánh giá mức độ an toàn phẫu thuật”.
Điều 4. Quyết định này có hiệu lực kể từ ngày ký, ban hành.
Điều 5. Các Ông, Bà: Chánh Văn phòng Bộ, Cục trưởng Cục Quản lý Khám, chữa bệnh, Chánh Thanh tra Bộ và các Vụ trưởng, Cục trưởng, Giám đốc các bệnh viện trực thuộc Bộ Y tế, Giám đốc Sở Y tế các tỉnh, thành phố trực thuộc Trung ương, Y tế các Bộ, Ngành và Thủ trưởng các đơn vị có liên quan chịu trách nhiệm thi hành Quyết định này./.
Nơi nhận: - Như Điều 5;- Bộ trưởng (để báo cáo);- Lưu: VT, KCB.
KT. BỘ TRƯỞNGTHỨ TRƯỞNGNguyễn Viết Tiến
BỘ TIÊU CHÍ CHẤT LƯỢNG ĐÁNH GIÁ MỨC ĐỘ AN TOÀN PHẪU THUẬT
(Ban hành kèm theo Quyết định số 7482/QĐ-BYT ngày 18/12/2018 của Bộ trưởng Bộ Y tế về việc ban hành Bộ tiêu chí chất lượng đánh giá mức độ an toàn phẫu thuật)
TIÊU CHÍ CHẤT LƯỢNG
SỐ TIỂU MỤC THIẾT YẾU
SỐ TIỂU MỤC MỞ RỘNG
SỐ ĐIỂM CHÍNH
SỐ ĐIỂM THƯỞNG
TC1. Bảo đảm phẫu thuật đúng người bệnh và đúng vị trí cần phẫu thuật.
TC2. Bảo đảm trang bị và chuẩn bị đầy đủ khả năng về chuyên môn kỹ thuật hiện có, để phòng ngừa nguy cơ tai biến trong gây mê và phẫu thuật cho người bệnh.
TC3. Bảo đảm phát hiện và sẵn sàng ứng phó với các tình huống mất kiểm soát đường thở và suy chức năng hô hấp đe dọa đến tính mạng người bệnh.
TC4. Bảo đảm nhận định sớm và phòng ngừa kịp thời với nguy cơ mất máu cấp trong phẫu thuật.
1,5
TC5. Bảo đảm phòng ngừa và giảm thiểu tối đa nguy cơ dị ứng và các phản ứng có hại của thuốc.
1,5
TC6. Bảo đảm ngăn ngừa để quên dụng cụ phẫu thuật, vật tư tiêu hao tại vị trí phẫu thuật.
TC7. Bảo đảm bảo quản và xác định chính xác tất cả các mẫu bệnh phẩm phẫu thuật.
TC8. Bảo đảm các thành viên trong nhóm phẫu thuật có sự trao đổi và chia sẻ thông tin quan trọng hiệu quả trong suốt quá trình phẫu thuật.
TỔNG ĐIỂM
1') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('KT01', '02_KT_QT_DINH_NHOM_ABO_KHC', 'Quy trình định nhóm ABO trên giấy - Khối hồng cầu', '02_Quy_Trinh_Ky_Thuat', 'pdf', 'P0', '', '*', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('KT02', '02_KT_QT_DINH_NHOM_MAU_HT_TC', 'Quy trình định nhóm máu - Huyết tương, tiểu cầu, tủa', '02_Quy_Trinh_Ky_Thuat', 'pdf', 'P0', '', '*', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('KT03', '02_KT_QT_TRUYEN_MAU_XTTBTM', 'Quy trình truyền máu & xử trí tai biến truyền máu', '02_Quy_Trinh_Ky_Thuat', 'pdf', 'P0', '', '+', 'BOYTE                         CQNG HOA XA HQI CHU NGHIA VIET NAM
BENH VIEN K                               DQc lQp - Tqr do - Hgnh phric
s6:814 /QD-BVK                              HdNAi, ngdy 0L thdng Q ndm 2021
QUYET DINH .
vti viQc ban hirnh quy trinh Truy6n m6u l6m sirng
vir quy trinh Xfi''tri tai bi6n truYon miu
GIAM DOC BENH VIPN K
BQ Y tii
Cdn cir quy6t Oinn so z t t I BYT-QD ngiry 17 17 11969 cta BQ truong
vC viQc thdnh lQp BQnh vien K;
cdn  cir Th6ng tu    sttzofittl-BYT ngdy 2gll2l 2ol7 cta BQ Y t€ v€ viQc
Hudng d5n chAn do6n mirc d0 Phin vq;
C6n cu Thong tu s(, ZOtZOtZttt-BYT ngdy 1610912013 cria Bo
Y tii v0 vi6c
Huong ddn ho4t dQng truYAn m6u;
Cin cir Quy6t dinh sO t+l+lqO-eYT ngdy 22l4l2\l5 cira BQ truong BQ Y tC
,d ,i9. rf"*gi6" .nA" do6n vd didu tri c6c b.6nh l1i huv6t hoc;
Kii
X6t d6 ngh! cia Chr]r tich Hoi d6ng truyen m6u b€nh viQn, Trutrng phdng
ho4ch t6ng fr". p         Tru&ng khoa Huy6t hgc - Vi sinh,
QUYET D!NH:
Dii,u 1. Ban hdnh kdm theo Quy6t dinh ndy:
1. Quy trinh TruYAn m6u l6m sdng''
2. Quy trinh Xir tri tai bi6n truyAn m6u''
..Quy trinh Truy.n m6u lam sdng vir quy trinh Xir tri tai bi6n truy6n
Didu 2.
m6u" duoc 6p dr;ng tai B€nh vi6n K.
dlnh
Di6u 3'' Quyilt dintr niry c6 hiQu luc kC tu ngdy k1i, ban hirnh'' C6c quytlt
truoc dAy trdi voi Quy6t dinh ndy ddu bi bai bo''
Diiu 4. C6c 6ng/bd Tru0ng phdng: KHTH, HH-VS, HC; HD Truydn m6u
benh vi€n, c6c don v! vd c6 nfran & iien {uan chlu tr6ch nhigm
thi hdnh Quyiit dlnh
ndy./.
Noi nhQn:                                                            DOC
- Nhu Di6u 4;
- C6c tlon v! trong bQnh viQn (d6 thlrc hiQn);
oi BiN
- Luu: VT, HDTM, KHTH, HH-VS.
uang
Quv trinh x* tri tai biAn tuye n mitu                                 QT.KHTH. I6.01
BQYTE
BENH VIEN K
Trto hy vgng - NhQn niim tin
QUY TRINH
xt, TRi TAI BIEN TRUYEN VTAU
(Ban hdnh theo Quyiit dinh sogtilQD-BVK ng4.Al./.4.//ar:tia Gidm d6c B€nh
viQn K)
Hg vir t6n                  Chri''c vg             che ki
Trudng khoa Huy6t
Ngu''di vi5t        BSCKII. Ld Phuong Anh              hqc - Vi sinh
Trudng phong
Ngudi ki6m tra     PGS. TS. L0 Vdn Hoi
hoach t6ng o.P
Ngudi phO          PGS. TS. L0 Vdn Quing           Gidm d6c B nh vlen
duy$t
Cdc dcrn v     h6i h
Ho vir t6n                  Chric vg             Chir kf
,-1.   ,   L
TS. BS. Nguy5n Ti6n Dftc
htol suc cap cru                                      Truong khoa
.KHTH. 16.01
Quv lrinh xt? tri tai bi€n truY€n mdu
QUY TRINH                   Ma s5: QT.KHTH.l6.0l
BENH VIEN K                     XU''TRi TAI BIEN               Ngdy ban hdnh: .../ ...12021
TRUYEN MAU
LAn ban hdnh:
l Ngtrdi co I e t''t qua pha i nghi e n ctnt va th ltc h e dilnc ca /l o dung cua
t1                                  t1            C
quy dlnh ndy.
2. NQi dung trong quy dlnh ndy c6 hi€u lvc thi hdnh nhu sv chi dao cia
Gidm d6c b€nh vi€n.
3. Mdi don vi daqc phdt 0 1 bdn (c6 d6ng diiu kiAm sodtl
NO''I NHAN (ghi rd no''i nhan r6i ddnh dau X o bAn canh)
THEO DoI SUA DOI rAl LIEU
Ngnv           V!tri                   NQi dung') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('KT04', '02_KT_QT_RUT_NOI_KHI_QUAN', 'Quy trình kỹ thuật rút ống nội khí quản', '02_Quy_Trinh_Ky_Thuat', 'docx', 'P0', '', '*', 'QUY TRÌNH KỸ THUẬT RÚT ÔNG NỘI KHÍ QUẢN
ĐẠI CƯƠNG
Là quy trình thường xuyên áp dụng trong khoa Hồi sức - Cấp cứu
Giúp giảm nguy cơ viêm phổi bệnh viện đặc biệt viêm phổi liên quan đến thở máy
CHỈ ĐỊNH
Người bệnh hết chỉ định thông khi nhân tạo xâm nhập
Người bệnh tự thở tốt, không còn tỉnh trạng suy hô hấp.
Người bệnh có chỉ định mở khí quản
CHỐNG CHỈ ĐỊNH
Người bệnh không có khả năng bảo vệ đường thở, bỏ khạc kém
Người bệnh chưa tự thở tốt, còn nguy cơ suy hô hấp.
CHUẨN BỊ
Người thực hiện
02 điều dưỡng đã được đào tạo chuyên khoa Hồi sức - Cấp cứu.
01 bác sĩ đã được đào tạo chuyên khoa Hồi sức - Cấp cứu
Dụng cụ, vật tư tiêu hao
Máy hút áp lực âm.
Dây hút silicon.
Máy thở không xâm nhập nếu cần.
Ông hút kích cỡ phù hợp : 1-2 cái.
Găng vô khuẩn: 1-2 đôi.
Găng tay sạch: 02 đôi
Bộ dụng cụ đặt ống nội khí quản.
Bình làm ẩm.
Nước cất làm ẩm.
Dây oxy kính: 01 cái.
Chụp mặt nạ thở oxy: 01 cái
Máy khí dung.
Bộ mặt nạ khi dung (dùng cho từng người bệnh).
Bồng Ambu (đứng 50 lần). Mặt nạ oxy: 01 cái
Bơm tiêm 5ml: 01 cái
Kim tiêm nhưa: 1-2 cái
Ông câm panh
Túi nylon
Ống nghe
Huyết áp
Natriclorua 0,9% chai 250 ml
Khẩu trang.
Dung dịch sát khuẩn tay nhanh
Xà phòng rửa tay diệt khuẩn
Dung dịch khử khuẩn sơ bộ
Máy theo dõi
Cáp điện tim
Cáp theo đôi SpO2 Cáp đo huyết áp liên tục
Bao đo huyết áp
Thuốc khi dung theo chỉ định.
Người bệnh
Thông báo, giải thích cho người bệnh hoặc gia đình người bênh về việc sắp làm.
Cho người bệnh nhịn ăn trước 4 giờ.
Hút sạch đờm dãi trong ông nội khí quản và vùng mũi, miệng họng
Hồ sơ bệnh án
Phiếu theo dõi người bệnh sau rút ống nội khí quân, phiếu chăm sóc
CÁC BƯỚC TIẾN HÀNH
Thông báo và hướng dẫn người bệnh cũng phối hợp.
Bác sĩ, điều dưỡng rửa tay xà phòng diệt khuẩn đưới vòi nước đội mũ, đeo Khẩu trang
Đánh giá lại các thông số: ý thức, mạch, SpO,, huyết áp, nhịp thở ghi vào phiều theo đôi
Đặt người bệnh tư thế 45 - 90 độ
Điều dưỡng 1 sát khuẩn tay nhanh, đi găng tay sạch, điều dưỡng (bác sĩ) găng vô trùng lấy ông thông hút nổi với máy hút
Điều dưỡng 1 thảo dây cố định ống nội khí quản. Tháo cuft hoàn toàn.
Điều đương 2: luồn ống thông hút vào ống nội khí quản, bào người bệnh hít sâu vửa bịt van hút vừa từ từ rút ống nội khí quản ra
Hút lại mũi họng cho người bệnh.
Điều dưỡng 1 cho người bệnh thở oxy
Khi dùng thuốc theo y lệnh
Hướng dẫn người bệnh ho khạc khi có đờm hoặc về rung cho người bệnh và hút đờm họng miệng nều người bệnh ho khạc kém.
Thu dọn dụng cụ, bác sĩ và điều dưỡng tháo găng, rửa tay bằng Savondouz dưới vòi nước.
Theo dõi sát tình trạng người bệnh ý thức, mạch, huyết áp, SpO2, nhịp thở trong 1 giờ đầu 15 phút/1 lần theo đối đầu hiệu cơ thật thanh quản (khó thở có tiếng rit khó thở vào, thở chậm) tình trạng thở (thở ngắng sức, có kẻo cơ hô hấp, mệt cơ), sự ho khạc của người bệnh 1 giờ tiếp theo 30 phút một lần theo dõi nhịp thở, SpO2, mạch, huyết áp, tình trạng thở. Các giờ sau theo dõi 1 giờ 1 lần trong 3 giờ tiếp
Sau rút ống nội khí quân 6 giờ đánh giá lại tình trạng và cho người bệnh ăn.
THEO DÕI: tất cả các t') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('KT05', '02_KT_QT_TRO_GIUP_PHAU_THUAT', 'Quy trình trợ giúp phẫu thuật (BV Bạch Mai)', '02_Quy_Trinh_Ky_Thuat', 'docx', 'P0', '', '', 'BỘ Y TẾ
BỆNH VIỆN BẠCH MAI
CHƯƠNG TRÌNH ĐÀO TẠO KĨ THUẬT CHUYÊN MÔN
KHÁM BỆNH, CHỮA BỆNH
TRỢ GIÚP PHẪU THUẬT
(Ban hành kèm theo Quyết định số ….…../QĐ-BM ngày …./…./2024 của Bệnh viện Bạch Mai)
Hà Nội, 2024
GIỚI THIỆU CHƯƠNG TRÌNH
Chương trình điều dưỡng trợ giúp phẫu thuật (TGPT) là chương trình đào tạo kĩ thuật chuyên môn khám bệnh, chữa bệnh của bệnh viện Bạch Mai. Với chương trình đào tạo này, dưới sự hướng dẫn trực tiếp của cán bộ giảng dạy, các học viên có thể trang bị cho mình kiến thức và kỹ năng cơ bản trong thực hành trợ giúp phẫu thuật như phẫu thuật tiêu hóa, tiết niệu, chấn thương, sản khoa…
Chương trình đào tạo có thời lượng 3 tháng, bao gồm những nội dung cơ bản về phụ giúp bác sĩ trong phẫu thuật mổ sản, sau phẫu thuật mổ bệnh lý tiêu hóa, ....
Hoàn thành chương trình đào tạo, học viên được cấp chứng chỉ “Trợ giúp phẫu thuật” theo quy định của Thông tư 22/2013/TT-BYT, Thông tư 26/2020/TT-BYT của Bộ Y tế về đào tạo liên tục, Thông tư 32/2023/TT-BYT của Bộ Y tế quy định chi tiết một số điều của Luật Khám bệnh, chữa bệnh, Nghị định 96/2023/NĐ-CP của Chính phủ quy định chi tiết một số điều của Luật Khám bệnh, chữa bệnh.
1. Tên chương trình đào tạo kĩ thuật chuyên môn khám bệnh, chữa bệnh: Trợ giúp phẫu thuật
2. Thời lượng: 03 tháng (thời lượng 528 tiết học)
3. Đối tượng, yêu cầu đầu vào đối với học viên: Điều dưỡng
4. Mục tiêu đào tạo:
Mục tiêu chung:
Kết thúc khóa học, học viên có thể thực hiện được kĩ thuật trợ giúp phẫu thuật phòng mổ
Mục tiêu cụ thể
Mục tiêu kiến thức:
Trình bày được các kiến thức cơ bản của các loại dụng cụ sử dụng trong phẫu thuật hệ Ngoại.
Trình bày được kiến thức vô khuẩn Ngoại khoa
Trình bày được quy trình kiểm tra an toàn - đối chiếu dụng cụ, vật tư sử dụng trước, trong và sau phẫu thuật
Mục tiêu kỹ năng:
Thực hiện thành thạo quy trình vô khuẩn Ngoại khoa, quy trình kiểm tra an toàn, đối chiếu dụng cụ trước, trong sau phẫu thuật.
Phối hợp thành thạo với phẫu thuật viên trong một số phẫu thuật hệ Ngoại.
Mục tiêu thái độ:
Hiểu được công việc và vai trò của dụng cụ viên trong phòng mổ.
Trung thực trong nghề nghiệp.
5.  Chương trình chi tiết
Nội dung
Mục tiêu học tập
Số tiết
Tổng
Cấu trúc chung của khu phẫu thuật.
Vẽ được sơ đồ thể hiện vị trí của khu phẫu thuật trong bệnh viện.
Vẽ được sơ đồ chung khu phẫu thuật.
Trình bày tiêu chuẩn thiết kế phòng mổ, các khu vực vô khuẩn khác trong khu phẫu thuật.
Kể tên, phân biệt các khu vực vô khuẩn, khu vực sạch và các khu vực phụ trợ khác.
Trình bày tiêu chuẩn vi khuẩn trong không khí buồng phẫu thuật.
Thực hiện được nguyên tắc thiết kế và xây dựng khu phẫu thuật.
Nhiễm trùng sau mổ.
Trình bày định nghĩa nhiễm trùng sau mổ.
Biết được dịch tễ học tình trạng nhiễm trùng sau mổ: tỷ lệ, các yếu tố nguy cơ.
Trình bày hậu quả của nhiễm trùng sau mổ.
Xử trí được nhiễm trung sau mổ
Các nguyên tắc đảm bảo vô khuẩn khu phẫu thuật và trong phòng mổ.
Trình bày các nguyên tắc chung đảm bảo vô trùng trong ngoại khoa.
Trình bày các nguyên tắc trước phẫu thuật đảm bảo vô trùng trong ngo') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('KT06', '02_KT_QT_CHUAN_BI_DUNG_CU_PHU_MO', 'Quy trình chuẩn bị dụng cụ phụ mổ', '02_Quy_Trinh_Ky_Thuat', 'docx', 'P1', '', '', 'Quy trình chuẩn bị dụng cụ phụ mổ
1. Trước khi phẫu thuật
a. Tiếp nhận yêu cầu và kiểm tra
- Nhận danh sách dụng cụ .
- Kiểm tra kế hoạch phẫu thuật để xác định loại dụng cụ cần thiết (ví dụ: phẫu thuật u não, nội soi, chỉnh hình).
- Xác nhận dụng cụ đã được tiệt trùng, còn hạn sử dụng, không hư hỏng.
b. Chuẩn bị dụng cụ
- Lấy dụng cụ từ khu vực vô trùng, đảm bảo túi/két đựng còn nguyên .
- Sắp xếp dụng cụ trên bàn phụ mổ theo thứ tự sử dụng:
- Nhóm dụng cụ rạch da (dao, kẹp cầm máu).
- Dụng cụ chuyên biệt (kẹp clip, kéo mổ, máy cắt khâu).
- Dụng cụ kết thúc (chỉ khâu, gạc, bấm kim).
- Chuẩn bị dụng cụ dự phòng cho các tình huống bất ngờ (ví dụ: kẹp cầm máu thêm, gạc lớn).
c. Chuẩn bị bàn phụ mổ
- Trải khăn vô trùng lên bàn phụ mổ.
- Đặt dụng cụ theo nguyên tắc **"gần nhất – dùng trước"**, phân khu vực rõ ràng:
- Khu vực dao, kéo.
- Khu vực kẹp, ghim.
- Khu vực gạc, chỉ khâu.
- Đặt sẵn khay đựng dụng cụ đã qua sử dụng.
d. Phối hợp với ê-kíp
- Thống nhất ký hiệu chuyển dụng cụ với bác sĩ (ví dụ  "dao số 11").
- Kiểm tra lại danh sách dụng cụ với điều dưỡng chạy ngoài
2. Trong khi phẫu thuật
a. Hỗ trợ chuyển dụng cụ
- Đứng ở vị trí thuận tiện để quan sát thao tác của bác sĩ.
- Chuyển dụng cụ **đúng loại, đúng thời điểm**, cầm phần tay cầm hướng về phía bác sĩ.
- Giữ dụng cụ sắc nhọn (dao, kim) trong khay an toàn khi chưa dùng.
b. Duy trì vô khuẩn
- Đảm bảo dụng cụ rơi xuống đất *không được nhặt lên sử dụng lại*.
- Thay găng tay nếu vô tình chạm vào vật dụng không vô trùng.
- Lau sạch máu/dịch trên dụng cụ bằng gạc vô trùng khi cần.
c. Quản lý dụng cụ
- Đếm dụng cụ *trước, trong và sau mổ* để tránh bỏ sót trong cơ thể bệnh nhân.
- Ghi chú dụng cụ đặc biệt đã sử dụng (ví dụ: clip cầm máu, mesh ghép).
- Chuẩn bị ngay dụng cụ dự phòng nếu bác sĩ yêu cầu.
d. Xử lý tình huống khẩn cấp
- Nhanh chóng cung cấp dụng cụ cầm máu (kẹp Bulldog, gạc ép) nếu chảy máu ồ ạt.
- Hỗ trợ dụng cụ hút dịch, mở rộng vết mổ khi cần.
3. Sau khi phẫu thuật
a. Thu dọn dụng cụ
- Phân loại dụng cụ ngay sau khi kết thúc:
- Dụng cụ sắc nhọn → Bỏ vào hộp cứng an toàn.
- Dụng cụ tái sử dụng → Ngâm dung dịch khử khuẩn.
- Rác thải lây nhiễm → Đựng túi màu vàng.
- Đối chiếu số lượng dụng cụ trước/sau mổ để đảm bảo không thiếu.
b. Báo cáo và bàn giao
- Thông báo với điều dưỡng trưởng nếu có dụng cụ hư hỏng hoặc bất thường.
- Ghi chép lại loại dụng cụ đã sử dụng vào hồ sơ phẫu thuật.
c. Vệ sinh và tái chuẩn bị
- Lau dọn bàn phụ mổ bằng dung dịch sát khuẩn.
- Chuyển dụng cụ đã qua sử dụng đến khu vực làm sạch để tái tiệt trùng.
4. Lưu ý quan trọng
- Luôn đeo găng tay, khẩu trang khi sắp xếp/chuyển dụng cụ.
- **Không quay lưng vào bàn mổ** để tránh làm nhiễm khuẩn khu vực vô trùng.
- **Giao tiếp rõ ràng** với ê-kíp về tên dụng cụ và vị trí đặt.
- **Thực hành nguyên tắc "không chạm"**: Chỉ chạm vào dụng cụ bằng găng tay vô trùng.
Quy trình này giúp đảm bảo ca mổ diễn ra suôn sẻ, giảm thiểu rủi ro nhiễm khuẩn và sai sót y khoa. Điều dưỡng phụ mổ cần thành thạo kỹ năng, nhận biết dụng cụ nhan') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('KT07', '02_KT_QT_QUAN_LY_TEM_VTYT', 'Quy trình quản lý tem vật tư y tế', '02_Quy_Trinh_Ky_Thuat', 'doc', 'P2', '', '', 'bjbj
& & & .
FfN,
Ff	)
*	#v
ytn/
ytn/
kdG!
kd[.
[Content_Types].xml
_rels/.rels
theme/theme/themeManager.xml
sQ}#
theme/theme/theme1.xml
$O})
Xp90
+PHI|
9xu5
fs+W
VF7H
q=.
8}d-
qyI@
j!Q_
jyV`
|PZ+
O&x$
A8>v
;EUC
*~P(5
/,EE\}
theme/theme/_rels/themeManager.xml.rels
6?$Q
K(M&$R(.1
[Content_Types].xmlPK
_rels/.relsPK
theme/theme/themeManager.xmlPK
theme/theme/theme1.xmlPK
theme/theme/_rels/themeManager.xml.relsPK
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:clrMap xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
datngt123@gmail.com
Normal
datngt123@gmail.com
Microsoft Office Word
Title
Microsoft Word 97-2003 Document
MSWordDoc
Word.Document.8') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('CS01', '03_CS_QT_CHUAN_BI_BN_TRUOC_PT', 'Quy trình chuẩn bị BN trước phẫu thuật (slide)', '03_Quy_Trinh_Cham_Soc', 'pptx', 'P0', '', '', '---SLIDE---
QUY TRÌNH CHUẨN BỊ BỆNH NHÂN
TRƯỚC PHẪU THUẬT
Bs.
Trịnh
Thị
Yến
---SLIDE---
Hướng dẫn chế độ ăn trước phẫu thuật
06/11/2023
---SLIDE---
Hướng dẫn chế độ ăn trước phẫu thuật
06/11/2023
Các
trường
hợp
đặc
biệt
khác
tuân
theo
hướng
dẫn
của
Bác
gây
---SLIDE---
Tháo bỏ tư trang, làm sạch móng, lau sạch trang điểm
06/11/2023
---SLIDE---
06/11/2023
Tiếp nhận vào khoa nội trú
---SLIDE---
06/11/2023
Tiếp nhận vào khoa nội trú
---SLIDE---
Tiếp nhận vào khoa nội trú
06/11/2023
---SLIDE---
Tiếp nhận vào khoa nội trú
06/11/2023
---SLIDE---
Tiếp nhận vào khoa nội trú
Chuẩn
vùng
phẫu
thuật
vùng
mắt: Vệ sinh xung quanh
mắt
vùng
mũi:
sinh sạch hai lỗ mũi.
Cắt tỉa lông vùng phẫu
thuật
Thay băng nếu có vết thương
Thụt
tháo
sinh
thể
06/11/2023
---SLIDE---
Tiếp nhận vào khoa nội trú
Thực
hiện
các
chỉ
định
khác
Kiểm
tra
đánh
dấu
trí
vết
theo
chỉ
định
Đặt
đường
truyền
nếu
chỉ
định
dùng
thuốc
Với
trước
ghép
tạng
thực
hiện
chuẩn
theo
phác
riêng
Động
viên
tinh
thần
Hoàn thiện HSBA:
Hoàn thiện “
Bảng kiểm chuẩn bị người bệnh trước mổ
Hoàn thiện các giấy tờ trong HSBA theo
“Hướng dẫn ghi chép và sắp xếp HSBA
06/11/2023
---SLIDE---
CHUẨN BỊ BỆNH NHÂN MỔ CẤP CỨU
06/11/2023
---SLIDE---
MỤC TIÊU HỌC TẬP
Nắm được và thống nhất quy trình chuẩn bị NB phẫu thuật được thực hiện bởi điều dưỡng khoa Ngoại trong toàn bệnh viện
---SLIDE---
CHUẨN BỊ BỆNH NHÂN MỔ CẤP CỨU
Sau
khi
thăm
khám
chỉ
định
cấp
cứu
BS phẫu thuật giải thích
các
vấn
liên
quan
ý “cam kết đồng ý phẫu thuật/ thủ thuật”
Thông báo chi phí dự kiến
NB nước ngoài cần có phiên dịch
chỉ
định
các
dịch
phẫu
thuật
các
cận
lâm
sang
cần
làm
kháng
sinh
phòng
nếu
Thông
báo
gây
khám
Hoàn
thành
bệnh
biên
bản
thông
qua
Thông
báo
trù
đặc
biệt
Truyền
máu
dụng
, VTTH
đặc
biệt
06/11/2023
---SLIDE---
CHUẨN BỊ BỆNH NHÂN MỔ CẤP CỨU
Chuẩn bị xét nghiệm và CĐHA:
Lấy máu xét nghiệm (bổ sung các xét nghiệm còn thiếu nếu NB đã làm xét nghiệm cấp cứu),
đóng dấu “Cấp cứu”
Đưa NB đi chụp X-quang tim phổi (nếu có
Làm điện tim đồ (nếu có)
Các
cận
lâm
sang
khác
theo
chỉ
định
bác
06/11/2023
---SLIDE---
CHUẨN BỊ BỆNH NHÂN MỔ CẤP CỨU
Chuẩn bị NB
Thông báo NB nhịn ăn
uống
Thay quần áo/ váy mổ cho NB.
Làm sạch phấn trang điểm, tháo bỏ các tư trang, răng giả, trang sức cá nhân cất giữ bàn giao cho người thân nếu có, niêm phong báo an ninh kiểm kê nếu không có người thân đi cùng.
BS đánh dấu vết mổ (nếu cần)
Cho NB hoặc người nhà ký yêu cầu dịch vụ.
ĐD hoàn thiện phiếu chuẩn bị người bệnh trước mổ
Hướng dẫn người nhà thanh toán các chi phí phát sinh và tạm ứng viện phí nhập viện
06/11/2023
---SLIDE---
CHUẨN BỊ BỆNH NHÂN MỔ CẤP CỨU
Thông báo phòng mổ chuẩn bị
Gọi điện
Hotline phòng mổ
báo thông tin về cuộc phẫu thuật
Gọi điện xác nhận lần 2 trước khi chuyển NB.
Các thuốc điều trị, kháng sinh dự phòng (nếu có)
- Lập phiếu lĩnh thuốc, lấy thuốc tủ trực,
- ĐD dùng thuốc theo y lệnh của BS:
Thực hiện thuốc kháng sinh: Hỏi lại tiền sử dị ứng, dùng thuốc, thực hiện theo 7 đúng
Bàn giao thuốc cho phòng mổ nếu dùng thuốc tại phòng mổ
06/11/2023
---SLIDE---
C') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('CS02', '03_CS_QT_CHUAN_BI_BN_TRUOC_PT_DETAILS', 'Quy trình chuẩn bị BN trước phẫu thuật (chi tiết)', '03_Quy_Trinh_Cham_Soc', 'docx', 'P0', '', '', 'Kế hoạch dạy học
Tên môn học: Đào tạo liên tục kiến thức và kỹ thuật chăm sóc người bệnh ung thư
Tên bài : Quy trình chuẩn bị bệnh nhân trước phẫu thuật
Loại bài: Lý thuyết
Thời gian: 2 tiết
Đối tượng học tập: Điều dưỡng viên đang công tác tại các khoa lâm sàng Bệnh viện K
Số lượng học viên : 100
Nơi giảng: Hội trường A – Bệnh viện K
QUY TRÌNH CHUẨN BỊ BỆNH NHÂN TRƯỚC PHẪU THUẬT
MỤC TIÊU HỌC TẬP
Nắm được và thống nhất quy trình chuẩn bị NB phẫu thuật được thực hiện bởi điều dưỡng khoa Ngoại trong toàn bệnh viện
NỘI DUNG
Đại cương
Mục đích:
Đảm bảo người bệnh được chuẩn bị đầy đủ và an toàn trước khi thực hiện phẫu thuật.
Thống nhất quy trình chuẩn bị NB phẫu thuật được thực hiện bởi điều dưỡng khoa Ngoại của bệnh viện.
NB và người nhà hiểu rõ lý do và mục đích phẫu thuật để hợp tác trong suốt quá trình thực hiện chuẩn bị phẫu thuật.
Phân loại:
Theo mức độ cấp bách của can thiệp phẫu thuật, hiện nay phẫu thuật chia làm 3 loại chính:
Mổ khẩn (hay còn gọi là mổ cấp cứu).
Mổ bán khẩn.
Mổ chương trình (mổ phiên).
Trường hợp áp dụng: NB phẫu thuật có kế hoạch/cấp cứu.
Trường hợp không áp dụng:
NB tình trạng quá nặng không di chuyển được
NB phải hồi sức tích cực trước
NB không đồng ý phẫu thuật
Quy trình thực hiện
Khoảng thời gian tiền phẫu được xác định từ lúc BN có chỉ định phẫu thuật đến khi BN được phẫu thuật.
2.1. Chuẩn bị BN mổ chương trình:
Các bước và cách thức thực hiện
Yêu câu
Chuẩn bị hồ sơ bệnh án
- Tất cả NB có chỉ định phẫu thuật đều được bác sĩ chỉ định, thông báo, giải thích (mục đích, phương pháp phẫu thuật…) và hoàn thiện các giấy tờ hành chính liên quan đến cuộc mổ.
- Bác sĩ lên lịch mổ, thông báo và thống nhất với NB và người nhà NB.
- Bác sỹ hoàn thiện toàn giấy tờ theo đúng checklist.
- Điều dưỡng phòng khám kiểm tra, chuẩn bị hồ sơ, hoàn thiện và bàn giao lên khoa Nội trú theo chỉ định BS.
- Thực hiện hướng dẫn GDSK theo chuyên khoa
- Hướng dẫn tắm tại nhà trước phẫu thuật bằng xà phòng trung tính, xà phòng khử khuẩn (dung dịch có chứa Chlorhexidine 2% hoặc Povidine Scrub 4%...)
- NB ký đầy đủ các giấy thờ cam kết: Đồng ý phẫu thuật, dịch vụ, khám gây mê…
- Lịch mổ có ngày giờ tên phiếu hẹn mổ.
- Đúng theo checklist
- HSBA đầy đủ các biểu mẫu cần ghi chép và bàn giao theo SBAR theo quy định
- Điều dưỡng phòng khám hướng dẫn cụ thể
Hướng dẫn chế độ ăn trước phẫu thuật
- Trước khi phẫu thuật theo chương trình, thời gian tối thiểu nhịn ăn và nhịn uống như sau:
8 giờ sau bữa ăn bao gồm thực phẩm là thịt, đồ rán và mỡ.
6 giờ sau bữa ăn nhẹ (như là bánh mì nướng và dịch trong), sau khi uống sữa công thức hoặc sữa không lấy từ mẹ đối với trẻ em.
4 giờ sau bú sữa mẹ (không cho phép uống thêm sữa mẹ hút vào bình).
2 giờ sau khi uống dịch trong.
- Các trường hợp đặc biệt khác tuân theo hướng dẫn của Bác sĩ gây mê.
Người bệnh tuân thủ nhịn ăn theo đúng hướng dẫn để cuộc mổ có thể thực hiện theo đúng kế hoạch.
Tháo bỏ tư trang, làm sạch móng, lau sạch trang điểm
Hướng dẫn NB:
Tháo bỏ tư trang. Nếu có đồ không thể tháo được thì dán cố định lạ') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('CS03', '03_CS_QT_CHAM_SOC_NB_SAU_MO', 'Quy trình chăm sóc người bệnh sau mổ', '03_Quy_Trinh_Cham_Soc', 'docx', 'P0', '', '', 'QUY TRÌNH CHĂM SÓC NGƯỜI BỆNH SAU MỔ
5 vấn đề cần chú ý:
1-    Hô Hấp.
2-    Tim Mạch
3-    Nhiệt Độ
4-    Thần Kinh
5-    Tiết Niệu
Hô hấp: Tại phòng HSSM ĐD cần theo dõi phát hiện các sự cố về hô hấp BN sau mổ như:
- Tắc đường thở do tụt lưỡi, do nghẹt đàm, co thắt thanh quản, phù nề thanh quản do nội khí quản.
- Thiếu oxy do xẹp phổi, phù phổi, tắc mạch phổi, co thắt phế quản.
- Giảm thông khí do ức chế thần kinh hô hấp, liệt hô hấp do thuốc giãn cơ, thuốc mê, hạn chế thở do đau.
Nhận định tình trạng hô hấp: nhịp thở, kiểu thở, tần số thở, thở sâu, độ căng giãn lồng ngực, da niêm, thở có kèm cơ hô hấp phụ như co kéo cơ liên sườn, cánh mũi phập phồng,... Người bệnh tự thở, thở oxy qua canule, người bệnh có nội khí quản, mở khí quản, người bệnh đang thở máy.
* Nhiệm vụ ĐD:
- Theo dõi sát hô hấp của người bệnh, đánh giá tần số, tính chất nhịp thở, các dấu hiệu khó thở: Nếu nhịp thở nhanh hơn 30 lần/phút hay chậm dưới 15 lần/phút thì báo cáo ngay cho BS.
- Theo dõi chỉ số oxy trên máy monitor, khí máu động mạch. Nếu BN có dấu hiệu thiếu oxy, người bệnh tím tái, thở co kéo, di động của lồng ngực kém hay chỉ số Oxy SaO2 < 90% (oxygen saturation) và/hoặc PaO2 < 70mmHg (partial pressure of oxygen): Báo cáo BS.
- Chăm sóc: Cung cấp đủ oxy, luôn luôn phòng ngừa nguy cơ thiếu oxy cho người bệnh. Làm sạch đường thở, hút đàm nhớt và chất nôn ói (hút cần cẩn thận khi người bệnh cắt amygdal). Nghe phổi trước và sau khi hút đàm.
Tư thế người bệnh cũng ảnh hưởng đến khả năng thông khí. Nếu người bệnh còn mê: cho nằm đầu bằng, mặt nghiêng sang một bên, kê gối sau lưng với cằm duỗi ra, đầu gối gấp, kê gối giữa 2 chân. Nếu người bệnh tỉnh, cho người bệnh nằm tư thế Fowler. Trong trường hợp người bệnh khó thở hay thiếu oxy, điều dưỡng thực hiện y lệnh cung cấp oxy qua thở máy, bóp bóng. Nếu người bệnh tỉnh cần hướng dẫn người bệnh tham gia vào tập thở, cách hít thở sâu.
Tim mạch:Theo dõi diễn biến Mạch, HA, Tim.
* Nguyên nhân:
- Hạ huyết áp: có thể do mất máu, giảm thể tích dịch do mất dịch qua dẫn lưu, nôn ói, nhịn ăn uống trước mổ, do bệnh lý về tim, do thuốc ảnh hưởng đến tưới máu cho mô và các cơ quan, đặc biệt là tim, não, thận, do tư thế…
- Tăng huyết áp: do đau sau giải phẫu, vật vã do bàng quang căng chướng, kích thích, khó thở, nhiệt độ cao, người bệnh mổ tim,…
- Rối loạn nhịp tim: tổn thương cơ tim, hạ kali máu, thiếu oxy, mạch nhanh, nhiễm toan – kiềm, bệnh lý tim mạch, hạ nhiệt độ…
* Nhận định tình trạng người bệnh:
Nhận định tình trạng tim mạch: da niêm, dấu hiệu chảy máu, dấu hiệu thiếu máu, Hct, tìm hiểu  về bệnh lý tim mạch của người bệnh. Dấu hiệu mất nước, nước xuất nhập, áp lực tĩnh mạch trung tâm, nước tiểu, điện tim.
* Nhiệm vụ ĐD:
- Ngay sau mổ, điều dưỡng phải đo mạch, huyết áp và ghi thành biểu đồ để dễ so sánh. Để phát hiện sớm dấu hiệu tụt huyết áp do chảy máu điều dưỡng luôn thăm khám, phát hiện chảy máu qua vết mổ, qua dẫn lưu, các dấu hiệu biểu hiện thiếu máu trên lâm sàng như: mạch nhanh, huyết áp giảm, da niêm tái.
- Nhận định tình t') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('CS04', '03_CS_QT_CHAM_SOC_NB_THO_MAY', 'Quy trình chăm sóc người bệnh thở máy', '03_Quy_Trinh_Cham_Soc', 'docx', 'P0', '', '*', 'QUY TRÌNH CHĂM SÓC NGƯỜI BỆNH THỞ MÁY
MỤC TIÊU BÀI HỌC:
1. Trình bày được chỉ định, chống chỉ định cho bệnh nhân thở máy.
2. Lập được kế hoạch chăm sóc bệnh nhân thở máy.
Thở máy là thông khí nhân tạo, hoạt động hỗ trợ quá trình hô hấp cho bệnh nhân.
Nguyên lý dùng máy có áp lực dương đưa vào phổi bệnh nhân một thể tích khí để quá trình trao đổi khí trở về mức bình thường.
CHỈ ĐỊNH, CHỐNG CHỈ ĐỊNH THỞ MÁY
1.Chỉ định: Hai nhóm bệnh có chỉ định thở máy:
Giảm thông khí phế nang
Tổn thương thần kinh trung ương: đột qụy não, viêm não, giập não,...
Liệt dây thần kinh ngoại biên, liệt cơ hô hấp: hội chứng Guillain Barce, ngộ độc nọc rắn, bệnh nhân nhược cơ,...
Bệnh phổi và phế quản mãn tính: khi PaO2 < 60mmHg (bình thường >95mmHg), PaCO2 > 40mmHg ( bình thường <40mmHg).
Các bệnh có tăng trương lực cơ có cơn co giật toàn thân kéo dài: uốn ván toàn thân, sốt rét ác tính thể não, cơn động kinh liên tục, ngộ độc hoá chất, ngộ độc Strychmin.
Thiếu oxy máu nặng
Bệnh phổi có tổn thương lan toả.
Phù phổi cấp có tổn thương phổi.
Suy hô hấp cấp.
Bệnh nhân hôn mê sâu có ứ đọng đờm dãi, suy hô hấp.
Bệnh nhân phẫu thuật tim, phổi mất máu nhiều.
Chết lâm sàng, bệnh nhân trong giai đoạn cuối.
Chống chỉ định:
Tràn khí màng phổi.
Tràn dịch màng phổi: phải chọc hút dẫn lưu dịch màng phổi trước khi thở máy.
Tổn thương não không kèm suy hô hấp cấp.
QUY TRÌNH CHĂM SÓC NGƯỜI BỆNH THỞ MÁY
1. Nhận định bệnh nhân thở máy
Theo dõi bệnh nhân.
Dấu hiệu sống: mạch, nhiệt độ, huyết áp, nhịp thở .
Các triệu chứng giảm oxy máu: tím tái, vã mồ hôi, ý thức lơ mơ, vật vã.
Các triệu chứng của suy tuần hoàn, suy hô hấp.
Tình trạng tinh thần của bệnh nhân.
Phát hiện sớm các biến chứng do thở máy gây nên.
2. Chẩn đoán điều dưỡng
Thông khí nhân tạo liên quan đến suy hô hấp, thiếu oxy trầm trọng.
Những nhu cầu thiết yếu của bệnh nhân và nguyên nhân như: vệ sinh răng miệng, vệ sinh cá nhân, dinh dưỡng…
Những nguy cơ do biến chứng của thở máy, biến chứng của bệnh gây nên.Những dấu hiệu của bệnh: cơn co giật, rối loạn thần kinh thực vật, trướng bong, tăng giảm thân nhiệt…
Nguy cơ loét liên quan đến bệnh nhân nằm lâu.
3. Kế hoạch chăm sóc
Hỗ trợ hô hấp cho bệnh nhân.
Phòng chống nhiễm khuẩn, loét ép.
Nuôi dưỡng cho bệnh nhân, vận động thể lực.
Phát hiện biến chứng của thở máy, diễn biến bệnh.
Tăng cường giao tiếp giáo dục sức khoẻ cho bệnh nhân và gia đình.
Hướng dẫn bệnh nhân cai thở máy và thôi thở máy khi đã ổn định về hô hấp và tuần hoàn.
Thực hiện y lệnh nhanh chóng và chính xác.
4. Thực hiện kế hoạch chăm sóc
Hỗ trợ hô hấp:
Phụ giúp bác sĩ đặt nội khí quản hoặc mở khí quản.
Kiểm tra máy thở, phụ giúp bác sĩ nối máy thở với bệnh nhân.
Phát hiện hiện tượng chống máy.
Hút thông đường hô hấp.
Phòng chống nhiễm khuẩn, loét ép:
Rửa tay đúng quy trình kỹ thuật.
Chăm sóc ống nội khí quản hoặc canuyn mở khí quản, kiểm tra, thay nước bình làm ẩm sau 8 -12 giờ chạy máu.
Vệ sinh răng miệng cho bệnh nhân.
Phòng tránh sặc, hít vào phổi.
Thay đổi tư thế cho bệnh nhân 2 giờ/lần
Nuôi dưỡng, vận động thể lực:') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('CS05', '03_CS_QT_BAN_GIAO_NB', 'Quy trình bàn giao người bệnh (slide)', '03_Quy_Trinh_Cham_Soc', 'pptx', 'P1', '', '', '---SLIDE---
QUY TRÌNH BÀN GIAO NGƯỜI BỆNH
TẠI PHÒNG MỔ
Bs.
Trịnh
Thị
Yến
---SLIDE---
Hậu
quả
thất
bại
trong
bàn
giao
06/11/2023
---SLIDE---
NHỮNG NỘI DUNG CẦN BÀN GIAO
Bác sỹ/ điều dưỡng/ kỹ thuật viên bàn giao thông tin của bệnh nhân phải bao gồm và không giới hạn các nội dung
theo
hình
ISBAR:
---SLIDE---
ISBAR
Trao đổi thông tin khi  cần có
Sự chú ý &  Hành động dựa trên  những mối quan tâm  tình trạng người bệnh
06/11/2023
---SLIDE---
ISBAR
SBAR
: Phương pháp trao đổi thông tin khi cần sự
chú ý và hành động khẩn cấp;
SBAR
: Cải thiện trao đổi thông tin trong việc trao  đổi diến biến tình trạng bệnh, tăng sự an toàn;
SBAR
: Được ứng dụng trong môi trường làm việc  như hàng không, quân đội và môi trường y khoa
06/11/2023
---SLIDE---
SBAR
– ƯU ĐIỂM
Dễ nhớ
- Làm rõ khi cung cấp những thông tin cần  thiết khi trao đổi nhanh
-Trọng điểm vào hành động (points to action)
06/11/2023
---SLIDE---
SBAR
– áp dụng khi nào?
Nội trú
Cấp cứu hoặc không cấp cứu;
Hội thoại:
Rất hữu ích: Điều dưỡng – Bác sĩ
Tham vấn BS – BS
Thảo luận: với các chuyên khoa
Hội thoại với các cấp ngang nhau: báo cáo khi đổi  ca trực
Bàn giao bệnh từ cấp cứu ngoại viện
với
nhân viên
06/11/2023
---SLIDE---
SBAR
Diễn
giải
ituation:
tình
trạng
tình
huống
Tình
huống
đang
xảy
thời
điểm
này
đâu
ackground:
bệnh
Thông
tin
bệnh
liên
quan
ssessment:
đánh
giá
Vấn   đề/
biến   chứng/
tình
trạng  của người báo
cáo
ecommendation:
xuất
xuất
việc
cần
làm hay
người nhận
thông
tin
hình
SBAR
---SLIDE---
Situation
Mô tả vấn đề bạn quan tâm/ băn khoăn trước tiên mô tả về  vấn đề cụ thể, là lý do mà bạn gọi điện (bao gồm: tên NB, BS  tham vấn, khoa & phòng NB nằm, tình trạng hồi sức, dấu hiệu  sinh tồn)
06/11/2023
BN A
SP02 88%, mạch 24 lần/ phút,  nhịp 110, huyết áp 85/50
---SLIDE---
Background
Nêu lý do NB nhập viện giải thích lưu ý quan trọng  tiền sử bệnh
Tóm tắt bệnh sử NB: chẩn đoán khi nhập viện, ngày  nhập viện, thủ thuật đã được làm, sử dụng thuốc, dị  ứng, kết quả XN, chẩn đoán hiện tại
06/11/2023
BN nữ A 69 tuổi, nhập viện từ nhà các đây  3 ngày & được chẩn đoán nhiễm trùng
phổi
BN được chỉ định dùng kháng sinh tiêm tĩnh  mạch. Đáp ứng tốt, tỉnh táo và vận độn
…..
---SLIDE---
Assessment
06/11/2023
Dấu hiệu quan
trọng
Diễn tiến lâm sàng
bất
thường/
lắng
Đưa
ra những
nguyên  nhân
bạn nghĩ đến,
nếu trong
trường hợp  không
biết
lý do
thì...
Từ khi
nhập
viện, dấu
hiệu sinh tồn ổn  định nhưng
giảm
xuống đột ngột.
than đau
ngực
và trong đờm
máu
NB chưa
được dự phòng
huyết
khối  tĩnh
mạch
---SLIDE---
MỤC TIÊU HỌC TẬP
1. Trình bày được các bước quản lý
bàn giao NB tại khoa PT- GMHS cho người bệnh
điều
trị tại Bệnh viện
2. Thực hiện được đầy đủ đúng quy định các bước bàn giao người bệnh.
3. Cẩn trọng và chính xác trong công tác bàn giao người bệnh.
---SLIDE---
Recommendation
Giải
thích
những
bạn
cần:
thể về
yêu
cầu,
khung
thời
gian
Đưa
ra đề
xuất
vọng
ràng
Cuối
cùng, những
bạn
đề xuất
=> mong muốn
hành
động
làm trước
khi
kết
thúc
trao
đổi/
xin y lệnh. Những y lệnh qua  điện
thoại
hỏi lại – viết xuống –
xá') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('CS06', '03_CS_QT_BAN_GIAO_TRUC_NB', 'Quy trình bàn giao trực và người bệnh', '03_Quy_Trinh_Cham_Soc', 'docx', 'P1', '', '', 'BỆNH VIỆN K
Khoa PT-GMHS
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập – Tự do – Hạnh Phúc
QUY TRÌNH NHẬN BỆNH PHẨM
Mục đích :
Quy trình này xây dựng nhằm mục đích quy định trình tự các công việc lấy bệnh phẩm và giao bệnh phẩm  nhằm đảm bảo  bệnh phẩm  lấy và giao đúng quy cách và đúng người bệnh để đảm bảo chất lượng kết quả xét nghiệm tốt nhất.
Phạm vi áp dụng :
Công việc lấy và giao nhận bệnh phẩm tại khoa phẫu thuật gây mê hồi sức
Nội dung :
Bệnh phẩm : Bao gồm tổ chức, bộ phận  của cơ thể người bệnh hoặc là mủ,  dịch  … trong cơ thể  người bệnh được lấy trong quá trình phẫu  thuật, thủ thuật.
Bệnh nhân mổ phiên bệnh phẩm của bệnh nhân được thực hiện theo quy trình sau :
Kiểm tra đối chiếu thông tin ghi trên tem bệnh phẩm xem có trùng khớp tên,tuổi,giới tính, chẩn đoán,  địa chỉ và loại bệnh phẩm  người bệnh mổ không.
Kiểm tra và đối chiếu phiếu yêu cầu xét nghiệm : đúng các thông tin : Họ tên người bệnh, tuổi giới, chẩn đoán, địa chỉ và loại bệnh phẩm ,chữ ký bác sỹ yêu cầu xét nghiệm.
Điều dưỡng lấy bệnh  phẩm  vào  lọ đựng bệnh phẩm phù hợp và ghi tem ( nhãn) bệnh phẩm  kiểm tra đối chiếu thông tin ghi trên tem bệnh phẩm xem có trùng khớp tên,tuổi,giới tính, chẩn đoán,  địa chỉ và loại bệnh phẩm  người bệnh mổ không.
Vào sổ giao nhận bệnh phẩm, chuyển giáy yêu cầu xét nghiệm và mẫu bệnh phẩm  cho khoa  GPB ( yêu cầu gửi ngay hoặc cố định  bệnh phẩm sau khi  lấy  ký xác nhận và ghi mã code của bệnh phẩm).
Đối với bệnh phẩm gửi xét nghiệm tức thì  phải có sổ trả kết quả và thêm giấy xét nghiệm ( nếu cần)
Đối với bệnh nhân mổ cấp cứu  và mổ phiên ngoài giờ hành chính thì bệnh phẩm  phải cố định Formon  và bảo quản khi chưa bàn giao cho khoa GPB.
Cuối  ngày hoặc ca mổ phải kiểm tra và đối chiếu sổ bàn giao bệnh phẩm  xem đúng số lượng tên người bệnh phải lấy bệnh phẩm xét nghiệm.
QUY TRÌNH NHẬN DẠNG ĐÚNG NGƯỜI BỆNH
Mục đích : Quy trình xây dựng nhằm mục đích quy định trình tự các công việc xác định đúng người bệnh trước khi cung cấp dịch vụ y tế . Nhận dạng đúng người bệnh khi cung cấp dịch vụ y tế là quy trình cơ bản và quan trọng đối với nhân viên y tế khi cung cấp các dịch vụ y tế cho người bệnh.
ĐỐI VỚI NGƯỜI BỆNH NỘI TRÚ CÓ KHẢ NĂNG GIAO TIẾP HOẶC CÓ NGƯỜI NHÀ BÊN CẠNH.
BƯỚC 1 :
YÊU CẦU NGƯỜI BỆNH TỰ NÓI HỌ VÀ TÊN, NĂM SINH, CHẨN ĐOÁN BỆNH, ĐỊA CHỈ  NHÀ VÀ THẺ CỦA NGƯỜI BỆNH.
NHÂN VIÊN Y TẾ ĐỐI  CHIẾU THÔNG TIN NGƯỜI BỆNH TRẢ LỜI VỚI THÔNG TIN TRONG HỒ SƠ BỆNH ÁN, THẺ NGƯỜI BỆNH, PHIẾU CHỈ ĐỊNH HOẶC Y LỆNH
BƯỚC 2 ;
NHÂN VIÊN Y TẾ ĐỌC LẠI CÁC THÔNG TIN  - NGƯỜI BỆNH XÁC ĐỊNH LẠI  ĐÚNG ( SAI).
SAU KHI XÁC ĐỊNH ĐÚNG THÔNG TIN  NGƯỜI BỆNH NHÂN VIÊN Y TẾ TIẾN HÀNH CUNG CẤP DỊCH VỤ Y TẾ.
CÁC TRƯỜNG HỢP ĐẶC BIỆT KHÁC ;
ĐỐI VỚI NGƯỜI BỆNH KHÔNG GIAO TIẾP ĐƯỢC VÀ KHÔNG CÓ THÂN NHÂN  THÌ  CẢNH BÁO ĐẶC BIỆT CHO CÁC NHÂN VIÊN TRONG KHOA BIẾT.
NẾU CÙNG MỘT LÚC MỘT NHÂN VIÊN Y TẾ THỰC HIỆN  NHIỀU CHỈ ĐỊNH LIÊN TIẾP TRÊN MỘT NGƯỜI BỆNH THÌ CHỈ CẦN XÁC ĐỊNH NGƯỜI BỆNH MỘT LẦN.
TRƯỜNG HỢP NGƯỜI BỆNH THỰC HIỆN NHIỀU CHỈ ĐỊNH BỞI NHIỀU NHÂN VIÊN Y TẾ Ở NHIỀU ') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('CS07', '03_CS_TC_DANH_GIA_NB_HOI_TINH', 'Tiêu chuẩn đánh giá người bệnh hồi tỉnh', '03_Quy_Trinh_Cham_Soc', 'docx', 'P0', '', '+', 'Bảng điểm Aldrete sửa đổi
Tiêu chí
Điểm
1, Hô hấp
Có khả năng thở sâu và ho
Khó thở hoặc thở nông
Ngừng thở
Độ bão hòa Oxy ngoại vi
Duy trì trên 92% với thở khí trời
Cung cấp oxy để duy trì  SPO2 ≥ 90%
SPO2 < 90 % mặc dù đang thở oxy
Tri giác
Tỉnh hoàn toàn
Gọi tỉnh
Không đáp ứng
Tuần hoàn
Huyết áp +/- 20 mmHg so với giá trị trước phẫu thuật
Huyết áp +/- 20  - 50 mmHg so với giá trị trước phẫu thuật
Huyết áp +/-  50mmHg so với giá trị trước phẫu thuật
Vận động
Cử động 2 tay , 2 chân
Cử động 2 chi
Không cử động chi nào
Tổng ≥ 9 điểm đủ điều kiện chuyển
Thời gian theo dõi hồi tỉnh phụ thuộc vào mức độ hồi phục của người bệnh sau gây mê thể hiện qua bảng điểm Aldrete, mỗi mức độ hồi phục sẽ thể hiện bằng điểm số từ 0 đến 2 điểm.
Điểm Aldrete lớn hơn hoặc bằng 9 sau 2 lần đánh giá liên tiếp cách nhau 15 phút thì người bệnh đủ tiêu chuẩn ra khỏi phòng hồi tỉnh.Ngoài ra không có dấu hiệu của chảy máu : vết mổ khô, dẫn lưu ít màu hồng nhạt, người bệnh
* Điều kiện rút ống nội khí quản : khi người bệnh đạt được các tiêu chuẩn sau :
+ Về hô hấp : Người bệnh tự thở tốt qua ống nội khí quản : Tần số và biên độ thở đạt yêu cầu , môi và chi hồng, SPO2 đạt 96 – 100%.
+ Tuần hoàn : Mạch và huyết áp ổn định biên độ giao động +/- 20 so với giá trị trước phẫu thuật.
+ Về thần kinh và vận động: Gọi và hỏi người bệnh biết, mắt mở tự nhiên, người bệnh há mồm và lè lưỡi , nhấc đầu được 30 giây, các phản xạ nuốt tốt.') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('CS08', '03_CS_QT_DINH_DUONG_NB_PT_UNG_THU', 'Dinh dưỡng cho NB phẫu thuật ung thư (GS Lê Thị Hương)', '03_Quy_Trinh_Cham_Soc', 'docx', 'P1', '', '', 'DINH DƯỠNG CHO NGƯỜI BỆNH PHẪU THUẬT UNG THƯ
GS.TS. Lê Thị Hương – Bộ môn Dinh dưỡng và An toàn thực phẩm
Đại học Y Hà Nội
MỤC TIÊU BÀI HỌC
Sau khi học xong học viên có khả năng:
Mô tả được bộ công cụ sàng lọc và đánh giá tình trạng dinh dưỡng cho bệnh nhân phẫu thuật ung thư.
Trình bày được một số khuyến cáo về dinh dưỡng cho người bệnh trước phẫu thuật ung thư.
Trình bày nguyên tắc dinh dưỡng, nguyên tắc lựa chọn thực phẩm cho người bệnh trước và sau phẫu thuật ung thư.
1. ĐẶT VẤN ĐỀ
Suy dinh dưỡng là yếu tố ảnh hưởng quan trọng đến tỷ lệ biến chứng và tử vong trong phẫu thuật ở bệnh nhân ung thư. Vai trò của liệu pháp hỗ trợ dinh dưỡng (bao gồm cả nuôi dưỡng đường tiêu hoá và nuôi dưỡng tĩnh mạch) trong phòng và điều trị suy dinh dưỡng ở bệnh nhân phẫu thuật ung thư đã được nhiều nghiên cứu chứng minh. Các nghiên cứu dựa vào bằng chứng đã làm sáng tỏ lợi ích và rủi ro đối với các can thiệp trị liệu này. Chương này thảo luận về vai trò của các liệu pháp hỗ trợ dinh dưỡng ở bệnh nhân ung thư chủ yếu là phẫu thuật đường tiêu hóa.
2. HẬU QUẢ CỦA SUY DINH  DƯỠNG Ở BỆNH NHÂN PHẪU THUẬT UNG THƯ
Giảm cân ở bệnh nhân ung thư là dấu hiệu thường gặp, tỷ lệ dao động từ 31% đến 100%, tùy thuộc vào vị trí khối u, giai đoạn và phương pháp điều trị. Giảm cân khoảng 5% có liên quan tới tăng tỷ lệ tử vong và tiên lượng xấu cho bệnh nhân ung thư. Nhiều yếu tố góp phần làm cho bệnh nhân ung thư bị sụt cân đó là các biến chứng phát sinh từ chính khối u như: tắc nghẽn hoặc chán ăn do khối u; các biến chứng do điều trị gây ra như triệu chứng tiêu hóa (GI), mệt mỏi hoặc mất các đoạn ống tiêu hoá (trong phẫu thuật cắt bán phần dạ dày, cắt toàn bộ dạ dày, cắt đoạn đại tràng…); và tâm lý căng thẳng.
Hội chứng suy mòn do ung thư (Cancer’s Cachexia Symptom - CCS) là một nguyên nhân phổ biến gây sụt cân ở bệnh nhân ung thư. Hội chứng này có khả năng đe dọa tính mạng; nguyên nhân là do rối loạn sinh lý và chuyển hóa dẫn đến cạn kiệt năng lượng và dự trữ protein ở bệnh nhân ung thư. Ngược lại với tình trạng đói, hội chứng suy mòn do ung thư dẫn đến mất cả khối mỡ và cơ xương, trong khi khối cơ nội tạng được bảo tồn và gan tăng khối lượng.
Chẩn đoán hội chứng suy mòn và hỗ trợ dinh dưỡng đầy đủ là rất cần thiết ở bệnh nhân phẫu thuật ung thư. Suy dinh dưỡng trước phẫu thuật có mối tương quan với tỷ lệ biến chứng sau phẫu thuật. Cung cấp không đủ năng lượng cho cơ thể sẽ tạo ra những thay đổi trong chuyển hóa trung gian, chức năng mô và thành phần cơ thể. Ngoài ra, chính các cuộc phẫu thuật lớn gây suy giảm tình trạng dinh dưỡng do có liên quan đến nguy cơ biến chứng cao hơn, thời gian nằm viện lâu hơn, chán ăn kéo dài và suy dinh dưỡng protein năng lượng.
3. Sàng lọc nguy cơ, đánh giá tình trạng dinh dưỡng bệnh nhân phẫu thuật ung thư.
3.1. Sàng lọc nguy cơ dinh dưỡng
Sàng lọc dinh dưỡng là bước đầu tiên giúp xác định nhanh những bệnh nhân bị suy dinh dưỡng hoặc có nguy cơ về dinh dưỡng. Các công cụ sàng lọc giúp cán bộ y tế, chuyên gia dinh dưỡng đánh giá và can thiệp kịp th') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('BK01', '04_BK_DANH_GIA_THUC_HANH', 'Bảng kiểm đánh giá thực hành (23.8)', '04_Bang_Kiem_Danh_Gia', 'docx', 'P0', 'assessment_template', '', 'Bảng kiểm đánh giá thực hành
BẢNG KIỂMKỸ THUẬT VỆ SINH TAY NGOẠI KHOA BẰNG DUNG DỊCH XÀ PHÒNG KHỬ KHUẨN
Các bước tiến hành
Đạt
Không đạt
Không làm
* Chuẩn bị người điều dưỡng: đội mũ, đeo khẩu trang, tháo bỏ trang sức, không sơn và có móng tay, kéo tay áo lên trước khuỷu tay, mở vòi nước.
* Chuẩn bị phương tiện (vệ sinh tay): Bồn rửa tay, nước sạch, xà phòng, dung dịch sát khuẩn tay, khăn lau tay vô khuẩn, thùng đựng chất thải.
* Kỹ thuật tiến hành
3.1
Bước 1. Đánh kẽ móng tay:
3.1.1
Làm ướt bàn tay. Lấy 3ml-5ml dung dịch xà phòng khử khuẩn vào lòng bàn tay.
3.1.2
Chà sạch kẽ móng tay của từng bàn tay bằng bàn chải trong 30 giây
3.2
Bước 2. Rửa tay lần 1 trong 1 phút 30 giây:
3.2.1
Làm ướt bàn tay tới khuỷu tay. Lấy 3ml-5ml dung dịch xà phòng khử khuẩn vào lòng bàn tay.
3.2.2
Chà bàn tay như quy trình rửa tay thường quy (chà lòng bàn tay, mu bàn tay, kẽ ngón, mu ngón, ngón cái), sau đó chà tay tới cổ tay, cẳng tay và khuỷu tay.
3.3.3
Tráng tay dưới vòi nước theo trình tự từ đầu ngón tay tới khuỷu tay, loại bỏ hoàn toàn dung dịch khử khuẩn trên tay.
3.3
Bước 3. Rửa tay lần 2: Tương tự rửa tay lần 1.
3.3.1
Làm ướt bàn tay tới khuỷu tay. Lấy 3ml-5ml dung dịch xà phòng khử khuẩn vào lòng bàn tay.
3.3.2
Chà bàn tay như quy trình rửa tay thường quy (chà lòng bàn tay, mu bàn tay, kẽ ngón, mu ngón, ngón cái), sau đó chà tay tới cổ tay, cẳng tay và khuỷu tay.
3.3.3
Tráng tay dưới vòi nước theo trình tự từ đầu ngón tay tới khuỷu tay, loại bỏ hoàn toàn dung dịch khử khuẩn trên tay.
3.4
Bước 4. Làm khô tay: Làm khô toàn bộ bàn tay, cổ tay, cẳng tay tới khuỷu tay bằng khăn vô khuẩn dùng 1 lần.
TỔNG
BẢNG KIỂMKỸ THUẬT VỆ SINH TAY NGOẠI KHOA BẰNG DUNG DỊCH CHỨA CỒN
Các bước tiến hành
Đạt
Không đạt
Không làm
* Chuẩn bị người điều dưỡng đội mũ, đeo khẩu trang, tháo bỏ trang sức, không sơn và có móng tay, kéo tay áo lên trước khuỷu tay, mở vòi nước.
* Chuẩn bị phương tiện (vệ sinh tay): Bồn rửa tay, nước sạch, xà phòng, dung dịch sát khuẩn tay, khăn lau tay vô khuẩn, thùng đựng chất thải.
* Kỹ thuật tiến hành
3.1
Bước 1. Rửa tay bằng xà phòng thường, không dùng bàn chải, 1 phút
3.1.1
Mở vòi nước, làm ướt bàn tay tới khuỷu tay
3.1.2
Lấy 3ml-5ml dung dịch xà phòng thường vào lòng bàn tay.
3.1.3
Chà bàn tay như quy trình rửa tay thường quy (lưu ý chà kỹ các kẽ móng tay), sau đó chà cổ tay, cẳng tay lên tới khuỷu tay.
3.1.4
Rửa tay dưới vòi nước, theo trình tự từ đầu ngón tay tới khuỷu tay, loại bỏ hoàn toàn xà phòng trên tay.
3.1.5
Lau khô tay bằng khăn tiệt khuẩn hoặc khăn giấy sạch theo trình tự từ bàn tay tới khuỷu tay.
3.2
Bước 2. Chà tay bằng dung dịch vệ sinh tay chứa cồn trong thời gian tối thiểu 3 phút
3.2.1
Lấy 3ml-5ml dung dịch vệ sinh tay chứa cồn vào lòng bàn tay trái, nhúng 5 đầu ngón tay của bàn tay phải ngập trong cồn trong 5 giây, sau đó chà cổ tay, cẳng tay tới khuỷu tay của tay phải (chà cho tới khi tay khô).
3.2.2
Lấy tiếp 3ml-5ml dung dịch vệ sinh tay chứa cồn vào lòng bàn tay phải, nhúng 5 đầu ngón tay của bàn tay trái ngập trong cồn trong 5 giây,') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('BK02', '04_BK_DAT_SONDE_DL_TIEU', 'Bảng kiểm GS QT đặt sonde dẫn lưu tiểu', '04_Bang_Kiem_Danh_Gia', 'docx', 'P1', 'assessment_template', '', 'BỆNH VIỆN K
KHOA KSNK
BẢNG GIÁM SÁT QUY TRÌNH ĐẶT ỐNG THÔNG TIỂU
Tên đơn vị: …………………………………..Ngày đánh giá: ………./…./….…
Đối tượng đánh giá: □ Điều dưỡng       □ Học viên       □Khác: ………
Nội dung kiểm tra: Điền dấu (x) vào ô Đúng/Sai/Không trong bảng dưới đây
Bước
Các bước thực hiện
Điểm
Vệ sinh tay, đội mũ, đeo khẩu trang
Chuẩn bị phương tiện: Ống thông tiểu, túi đựng nước tiểu, săng, gạc đã được tiệt khuẩn, dung dịch sát khuẩn povidone iodine, dầu bôi trơn.
Chuẩn bị NB
a. Với NB nặng: Trải tấm nilon dưới mông NB, đặt sẵn bô dẹt dưới mông NB, để NB nằm ngửa co đầu gối chống chân xuống giường và hơi dạng. Rửa bộ phận sinh dục ngoài bằng nước xà phòng loãng hoặc nước đun sôi để nguội, rửa từ trên xuống dưới, từ trong ra ngoài, khi xong đổ nước bẩn đi, rửa bô dẹt. Vệ sinh tay.
b. đặt ống Với NB nhẹ: Hướng dẫn NB tự làm vệ sinh bộ phận sinh dục ngoài bằng nước sạch và xà phòng trước khi thông tiểu.
Với NB nữ, đặt NB ở tư thế nằm ngửa, 2 chân trống và 2 đùi ngả ra, Với NB nam, nằm ngửa, 2 chân duỗi thẳng. Dùng vải sạch che phủ phần chân của NB.
Vệ sinh tay đúng quy trình.
Mở gói dụng cụ vô khuẩn, trải săng vô khuẩn có lỗ bộc lộ bộ phận sinh dục của NB, mở gói đựng ống thông tiểu, mở túi đựng nước tiểu bằng kỹ thuật vô khuẩn (không chạm vào mặt trong bao).
Đổ dung dịch povidone iodine vào bát inox.
Mang găng vô khuẩn.
Nối ống thông với túi đựng nước tiểu, dùng bơm tiêm vô khuẩn bơm khí qua cổng bơm bóng để kiểm tra bóng của ống thông tiểu, bôi trơn đầu ống thông tiểu
Với NB nữ: Dùng ngón cái và ngón trỏ của tay không thuận vạch môi lớn và môi nhỏ ra, tay thuận dùng kẹp gắp bông cầu (gạc củ ấu) thấm dung dịch sát khuẩn povidone idodine từ lỗ niệu đạo sang bên phải/trái và từ trên xuống dưới của môi lớn, sử dụng bông cầu (gạc củ ấu) riêng cho mỗi lần sát khuẩn.
Với NB nam: Tay không thuận kéo bao da quy đầu xuống để lộ lỗ niệu đạo, tay thuận dùng kẹp gắp bông cầu (gạc củ ấu) thấm dung dịch sát khuẩn povidone idodine lên quy đầu từ lỗ niệu ra ngoài.
Sử dụng tay thuận đưa ống thông tiểu qua lỗ niệu đạo tới khi thấy nước tiểu chảy ra. Tiếp tục đẩy ống thông tiểu tới chạc đôi tại cổng bơm bóng để bảo đảm ống thông vào trong niệu đạo trước khi bơm bóng. Nếu không thấy nước tiểu chảy ra ở NB nữ, giữ nguyên ống thông tiểu tại vị trí đang đặt, mở bao ống thông và bao găng vô khuẩn mới để đặt ống thông mới, chỉ loại bỏ ống thông cũ khi ống thông tiểu mới được đặt đúng vào niệu đạo.
Dùng xy lanh vô khuẩn bơm căng bóng. Kiểm tra vị trí ống thông tiểu bằng cách kéo nhẹ ống thông tới khi có cảm giác chặn lại.
Kiểm tra chỗ nối giữa ống thông và đường ống dẫn gắn với túi đựng nước tiểu để bảo đảm kín, túi dẫn lưu luôn thấp so với bàng quang, ống thông và túi đựng nước tiểu không gấp, xoắn vặn.
Thu dọn dụng cụ.
Tháo găng, vệ sinh tay.
Tổng điểm: ………….                                                  Điểm đạt…………..
Nhận xét:...............................................................................................................................................
.....') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('BK03', '04_BK_GAY_ME_NKQ', 'Bảng kiểm gây mê NKQ (12.01.2021 rút gọn)', '04_Bang_Kiem_Danh_Gia', 'doc', 'P0', 'assessment_template', '', 'bjbj
kd2
h4P(
h7*X
h7*X
h4P(
gd7*X
f):V
f):V
f):V
f):V
sE<(
sE<(
IHDR
sRGB
gAMA
pHYs
IDATx^
$Im.
"Z4Zq
b0SI_}
s0uNS
n.&Oo
M\:0
|tXh3q
[\0s
~>%_
\GDL
:oyvX
\TjJ-d
LRyHL
{/27n
''+/yT
86){
7u.}
~s5y:Q
N1GO^
`$|
YgT''
z+_O
{=YJs
\{x+
W6(L
.LJ|
/	xO
#&I_
]=B^
FVDT
KD8g
N@1g
d9H!Wn8c
GG@v
N34lH4c
p6-r
#/$p
9 $QJm,
};o/!
uvx&E
^w)y:
6=[ysEH
Eo#yZ
dWR.x_
pW4-Z
e#fn
8|cwo(:{
d''/
>&0
q|.z<
@Bqy
&*=p
dcD^
bLo&
:GuLv
nNUq
K|L[
x"(>
@hT~;
[L2[
*zIxf
&m4q
xy0q
%XZL
Z4co*
LYiPC
"''n''
j2N;2
u=ND
Wn>h
T8~&$
}}_ar{d
o?pB
il(=
5\#*
%q9n
8{I})
I*o"
?9?7
(A> FQ_3v
|''ml
.NYn
R^%\
ua:KY):
LwLX
}_D.
a*u_d
;D_P
Wo?j>
D>Od
=3Sy
XRK7
K6''
kDM-
2<|s
xwyf
fp2OS
/|\e\D
&gHts
mu>5
i?9r
59r4
q[+9
bj~<S
0xqD|
2m;m
r+Y''-
"p e
n((L
v]8?
E<,X
"*Xh
A+u]
6|Mq
9_i%
m<nC
p%A)
q:''^8
&,2$<
|8EcY
?q$"
UH<?M
q\;f
EjY-P)%
_t`9
9(YY
m:;O
j3Yg
CMl1s
LEyv~i
3Cgm1Yk
{JUyh
=/,U
!1s)
a=7N
=<"$
e7F(
$4A0
A:(J
>kw]x
zzN:
:*F"
e"&ks
}DTN
38n!
5)ky
2rd0F
0P:mZ
VuOB
''kw>*H
.pY=g
`cP6:
j6;f
(R32{E
GYwL
8xiK=>
&S.W
$6u8UV
7K2{
mrrT
8K_d)e
Y$f}
A@g`8
mN''{
@''p"
;ALQ{
>WCQ
b;$;
U{?
d6.f
w~<@
;8b<6
~><D
yZxx
u`G+
K	<l;
"!so
z!NRsk
5vY''k
yI	M
p<{>
Ncfw
1=5QY
B&|2W
t#m2c
Cku}1
[DO@
0My.
];AI
5La2
qyWT
pv;\
b01s
KaVb
[f!>
L39>P
G''L:
@m$&
;ZC+
K~P=
r=X:
CLKt
*bp%
H&53X
eP#j
o0.m
?N]~
Fnp]
LI_m
/h1hyL
2~2|
lG8OB
uMYq
1_m=
0O n
YwXj
L{a22
j \Y
#ZDB
|+_/M
_CDP
UZ$(
\Uba
(69D
>(K6
?iQ>
HjG`2u
Z}j9
XE}og
OfU)
xv5I#
31=XX
BPT!~OL
Uh?JsP
W>0AI
L"B4
"eA*
nV	C
h!VKs=.D "
Vo=,
DL"m
iHUV
p?mg
cU8Up	?
d`#C
4w/_
[:)T
4S7v<&
#$}*
y+o/
O4@k
7s|f
\~b2
uG%|
4~F>q
B|Ab~
5+!v&
HmA[c{
Q:POz?&
^Wxp
O8|	ajf
<3Jg
VHk"
De6"5o
z=OL
Lh.y
b9$(
%_l1
&Kg~O
C%Ni~
/`Lp
xv15?
5&v
&WInGPOB
i	Q.
p,<z
e-q0
i.\~
8I<r
{^g''
$q#,
MS@L
9I=b
IY&J
~+Yja
.^l!/$
,T'',
EL.}
T;`2
nMUy
C_6B q
dVf,a
M+6y*A
@zD&a
+=''+
E!6B
: W-]
fWR''
oe3zhQ%
>D>
''OcK8
b{bv
J#Qf
Mz-(!
ZKwL
,3Pp
"~OJ
2''RfV
%/h*6
`PIBs
,5E@R
4LZ&H
64G5
;IS(
"s+bO
g-ov
x,e6
& g-sA
#tA]+6v9p
|(UvS
]iotg
`1P8
flyi
js)I
%"UHX
Y[uO
g&O\eNx
s1G~
>-bg
Z?"<
}7 v
VKX>
M^6NY
)s9K.s,0
L_lf
k@dQ
UbSQ/$U&s1WAs
BkPj2{>s
Y;&X
#k6A
_=2V
''IV>hr\
eeA[
tkw$
<nrW
Mz.
j5Yw
+_oS
j:/Z
})@h
Z]fkQ1
avYZ
:V "t(S
4~!Kk
B-[L
qlw+R
`{]f
},ye
1lETl
<d r
Nf9
I61R
mHUa
*~!+''i
vd[%
$\~#>
%_h+f
>##!
`/fr]
;Kk0
X}p@
|I"R
fQ-q`
c~Mg
i+1{6
!nL1
21&P9!p4
K5+DL
<2q\
[Nn+
Vf}G
1{.P]
*1{x6u
m0gs
30<L
-OOq
b-&N+
m:al
''rEU>"F
TsD9
fAs@t
q~9f=
N%-7
!W2W
*C~M_u
IEND
[Content_Types].xml
_rels/.rels
theme/theme/themeManager.xml
sQ}#
theme/theme/theme1.xml
$O})
Xp90
+PHI|
9xu5
fs+W
VF7H
q=.
8}d-
qyI@
j!Q_
jyV`
|PZ+
O&x$
A8>v
;EUC
*~P(5
/,EE\}
theme/theme/_rels/themeManager.xml.rels
6?$Q
K(M&$R(.1
[Content_Types].xmlPK
_rels/.relsPK
theme/theme/themeManager.xmlPK
theme/theme/theme1.xmlPK
theme/theme/_rels/themeManager.xml.relsPK
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:clrMap xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
Dr. Ho
ng T') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('DT01', '05_DT_CTDT_DD_PHONG_MO_CO_BAN', 'Tài liệu CTĐT - Điều dưỡng phòng mổ cơ bản', '05_Tai_Lieu_Dao_Tao', 'docx', 'P0', 'curriculum', '', 'BỘ Y TẾ
BỆNH VIỆN K
CHỦ BIÊN
ĐỒNG CHỦ BIÊN
PGS. TS. Phạm Văn Bình
TS. Phan Thị Dung
TS. BS. Trần Đức Thọ
TÀI LIỆU ĐÀO TẠO
CẬP NHẬT KIẾN THỨC Y KHOA LIÊN TỤC
ĐIỀU DƯỠNG PHÒNG MỔ CƠ BẢN
Hà Nội - Năm 2025
CHỈ ĐẠO BIÊN SOẠN
CHỦ BIÊN
PGS. TS Phạm Văn Bình
ĐỒNG CHỦ BIÊN
TS. Phan Thị Dung
TS. BS. Trần Đức Thọ
NHÓM BIÊN SOẠN
ThS. ĐD Nguyễn Thu Hương
ThS. ĐD Trần Đắc Thành
CNĐD. Phạm Thị Ngoan
CNĐD. Thái Nhật Lệ
LỜI NÓI ĐẦU
Ngoại khoa trên thế giới nói chung và ở Việt Nam nói riêng ngày càng phát triển về số lượng và chất lượng. Các phẫu thuật phức tạp hơn và người bệnh cũng nặng hơn. Một số chuyên khoa sâu của ngoại khoa đã ra đời và phát triển mạnh mẽ như ghép tạng, phẫu thuật nội soi, vi phẫu... Góp phần không nhỏ vào những tiến bộ đó là khoa học công nghệ phát triển cho ra đời các trang thiết bị, dụng cụ và vật tư tiêu hao đáp ứng nhu cầu phẫu thuật.
Bên cạnh đó, nhiễm khuẩn bệnh viện cũng đang là một vấn đề đáng lo ngại do sự xuất hiện của nhiều vi khuẩn đa kháng thuốc và tăng tỷ lệ tử vong. Phòng mổ là vùng sinh học có nguy cơ nhiễm khuẩn bệnh viện rất cao. Do vậy, công tác vô khuẩn phòng mổ đóng một vai trò quan trọng trong phòng tránh nhiễm khuẩn bệnh viện.
Điều dưỡng viên phòng mổ, qua các công việc thường ngày của mình đã góp phần đáng kể vào sự thành công của mỗi ca phẫu thuật, sự hiệu quả của các trang thiết bị cũng như dụng cụ và vật tư tiêu hao, vào sự giảm thiểu nguy cơ nhiễm khuẩn sau phẫu thuật và nhiễm khuẩn bệnh viện. Hầu hết điều dưỡng viên phòng mổ hiện nay được đào tạo một cách lẻ tẻ tự phát, không hệ thống, không có chương trình thống nhất. Kết quả khảo sát nhu cầu đào tạo liên tục của điều dưỡng phòng mổ tại bệnh viện K tháng 3 năm 2025 cho thấy nhu cầu đào tào liên tục là rất cần thiết. Vì vậy chúng tôi biên soạn Tài liệu đào tạo liên tục “Điều dưỡng phòng mổ cơ bản”, bao gồm 3 chương với 24 bài.
Với những cố gắng của tập thể các tác giả, chúng tôi mong muốn cuốn tài liệu này có thể cơ bản đáp ứng được nhu cầu trong học tập và chăm sóc người bệnh. Trong quá trình biên soạn cuốn tài liệu còn những hạn chế, thiếu sót. Nhóm biên soạn rất mong nhận được sự góp ý của các quý đồng nghiệp để cuốn giáo trình này ngày một hoàn thiện hơn.
Xin chân thành cảm ơn!
Nhóm tác giả
CHỮ VIẾT TẮT
Viết tắt
Ý nghĩa đầy đủ
AIDET
Acknowledge - Introduce - Duration - Explanation - Thank you
CDC
Trung tâm kiểm soát và phòng ngừa dịch bệnh Hoa Kỳ (Centers for Disease Control and Prevention)
Điều dưỡng
ĐDPM
Điều dưỡng phòng mổ
FDA
Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ (Food and Drug Administration)
GĐNB
Gia đình người bệnh
GRASE
Được công nhận chung là an toàn và hiệu quả (Generally Recognized As Safe and Effective)
HSBA
Hồ sơ bệnh án
KSNK
Kiểm soát nhiễm khuẩn
NICE
Viện Y tế & Chất lượng điều trị Quốc gia Anh (National Institute for Health and Care Excellence)
NKVM / SSI
Nhiễm khuẩn vết mổ (Surgical Site Infection)
NSX
Nhà sản xuất
Người bệnh
PTV
Phẫu thuật viên
SHEA
Hiệp hội Dịch tễ học Chăm sóc Sức khỏe Hoa Kỳ (The Society for Healthcare Epidemiology ') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('DT02', '05_DT_TLTK_AN_TOAN_PHAU_THUAT', 'Tài liệu tham khảo - An toàn phẫu thuật', '05_Tai_Lieu_Dao_Tao', 'docx', 'P0', 'reference', '', 'Tài liệu Tham khảo Đề xuất cho Bài Giảng An toàn Phẫu thuật theo Quy định của Bộ Y tế Việt Nam
I. Giới thiệu và Cơ sở Pháp lý cho Tài liệu Đào tạo Y tế
An toàn phẫu thuật là một trụ cột không thể thiếu trong thực hành y khoa hiện đại, không chỉ là một yêu cầu chuyên môn mà còn là một khía cạnh pháp lý quan trọng nhằm bảo vệ người bệnh. Tại Việt Nam, tầm quan trọng này được thể hiện rõ ràng trong các quy định của Bộ Y tế, đặc biệt tại điểm b khoản 1 điều 7 của Thông tư 19/2013/TT-BYT, trong đó quy định "An toàn phẫu thuật, thủ thuật" là một yêu cầu cốt lõi của an toàn người bệnh.1 Điều này khẳng định sự cần thiết phải đảm bảo an toàn trong mọi thủ thuật xâm lấn, từ những ca phẫu thuật lớn đến các thủ thuật can thiệp nhỏ.
Thực tiễn lâm sàng cho thấy, mặc dù đã có nhiều nỗ lực, các sự cố y khoa liên quan đến phẫu thuật vẫn còn xảy ra, đòi hỏi sự tuân thủ nghiêm ngặt các quy trình an toàn.3 Điều này nhấn mạnh nhu cầu cấp thiết về giáo dục và đào tạo liên tục về an toàn phẫu thuật để nâng cao năng lực và nhận thức của đội ngũ y tế. Trên bình diện quốc tế, Tổ chức Y tế Thế giới (WHO) đã khởi xướng chương trình "Safe Surgery Saves Lives" vào năm 2009, khuyến cáo thực hành "3 ĐÚNG" (đúng người bệnh, đúng phương pháp, đúng bên phẫu thuật) như một chuẩn mực toàn cầu.1 Việt Nam đã tích cực triển khai và tái cấu trúc các chương trình an toàn phẫu thuật để phù hợp với khuyến cáo của WHO và yêu cầu thực tiễn trong nước, điển hình như việc áp dụng quy trình "Time-out" và bảng kiểm an toàn phẫu thuật tại nhiều bệnh viện.1
Tổng quan về các quy định của Bộ Y tế Việt Nam đối với tài liệu đào tạo liên tục
Các quy định của Bộ Y tế Việt Nam đóng vai trò trung tâm trong việc định hình nội dung và chất lượng của tài liệu đào tạo y tế, bao gồm cả lĩnh vực an toàn phẫu thuật. Mặc dù người yêu cầu đề cập đến quy định của Bộ Giáo dục và Đào tạo, đối với ngành y tế, Bộ Y tế là cơ quan chủ quản ban hành các hướng dẫn chi tiết về đào tạo chuyên môn. Điều này phản ánh một hệ sinh thái pháp lý được xác định rõ ràng, trong đó Bộ Y tế đóng vai trò như "Bộ Giáo dục" cho đào tạo y khoa, đảm bảo rằng an toàn người bệnh, bao gồm an toàn phẫu thuật, được lồng ghép sâu rộng vào chương trình giảng dạy. Sự cần thiết phải có phần "Tài liệu tham khảo" ở cuối tài liệu đào tạo 6 cũng nhấn mạnh tầm quan trọng của việc trích dẫn các nguồn thông tin có thẩm quyền và đáng tin cậy.
Thông tư 26/2020/TT-BYT là văn bản quan trọng sửa đổi, bổ sung Thông tư 22/2013/TT-BYT, đặc biệt nhấn mạnh các yêu cầu đối với tài liệu đào tạo liên tục trong ngành y tế.6 Theo Thông tư này, tài liệu phải được xây dựng dựa trên chương trình đào tạo liên tục đã được cơ sở đào tạo ban hành và tuân thủ hướng dẫn tại Mục B Phụ lục số 01 của Thông tư. Nội dung cần được rà soát, cập nhật liên tục để đảm bảo tính khoa học và phù hợp với nhu cầu thực tiễn, một yếu tố đặc biệt quan trọng trong lĩnh vực y tế nơi kiến thức và kỹ thuật thay đổi nhanh chóng. Về cấu trúc, mỗi bài học trong tài liệu đào tạo y khoa liên tục cần có Tên ') ON CONFLICT (id) DO NOTHING;
INSERT INTO documents (id, code, title, category, format, priority, role, tt32_tag, excerpt) VALUES ('DT03', '05_DT_BAI_GIANG_PHONG_NGUA_CHUAN', 'Bài giảng phòng ngừa chuẩn 2023', '05_Tai_Lieu_Dao_Tao', 'ppt', 'P1', 'lecture', '', 'JFIF
$3br
%&''()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz
#3R
&''()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz
&9wv
=S_M[
5R]n
I5SB
#qo;D
!h!dm
,d*/
`sEz
u<f]F
X}HQZ
W:)%f
u!f&5
OJ	P
*>lc
-BYg
]jr#
gw}O
{q{o
9|-om
cUl=
$*}
3\>z
V< =
oRNy
/$Yn
mio,n
O{Qq
veXP|
ER$-o$
r^gP
w3O4X
00Ld)n
/dyn
InG
Et{&
cZZXxG
f"nm
]j>R
By&5
@O=~V
Rr?@
1P}k
(cTRI
sb0J
h}%k
?S^eO
WRH%
yl-u+
KQwu1
zT[w
{YaC
xj[k
#Cof
MIRi
^66Q
#(Z,
=1XR(
(#`L1
5,~N
5}H,
I^0N
menW
RA+2
iva}0?
"g,[
Mpi1
<Woa
o `~
U(\.
#X-g(
rn#?
~Xcn
6y1["FP
l}Ev
>by<
b%r~
"?0Ry9
RmCP
rEh}
<;so%
/eRC
ui.-!;
mV;m
;@b/
|mx*
BYr3
H{jN
\>*I
~zE<
u4*xi
Lcp>
w_}M
;}sZ
b?SX?
&Q3I)
;pI=
4WO
r~c^
aQFm#
n`3
x=G?
frZY
4}H=
z`6ps
u-WM
Ese<
JFIF
Ducky
Adobe
r3$C
%Ss4&
+o;r
>+y|
Zo/i
{h]=
~Q}>I
fGgq%w9
|fKv
.Qc#
[y4|
.{[.
n_SM
9./M
Z\mh
''ih$9
r[$X
[SJj
.3am,
9!c-cqn
<U0eX?U
eUT$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Ak
''/ao
.W!em
9yn''
cNN+
\r80
tQbeL
5.r]
Uq{q
kkGj(hz+
.:i@
~?[}
{\zt
1G;@
brXkK
I{]M
@G]5U
U,_]
m^77h4{
?c2v
Y(''ou6"l
4kA:
k-wus
K{-$
mkW?Rh
q[dM
J_g!"
a{%@,o
cIRE+
[m:)
Wg"q"9&n
{j=C@
''[#V
1[q+v
r^Kg
~M8gI
^~LO
S(B {
i,t?
$4v=j
_^%6
^o6<
=TU6
k\&E
ZAkm
u#_E\
?uGu
p:~`,
LEZK.
BzjJ
y9<g
RvHa
~3w$-
t\c)#$0l
,/s6
Cj(Z*z(
y{Ai
tZF[!q
Bu^G
+Ky6
7<n%
y$"6	$.s
HH,?k
V[\-
4WeV
(*O`4Qd
ia''{
Xm1Qw
l\WH
d-b.
z+:
0_M+
f4m|T
Mc^cZ
gcYS
<<{t%%E
{-#*
KMc#al
_PkA
nF8K
tx,i:
WBHu4
CMOe[kI"x
%\7_
Gdgm
X. l
q?5\
I7K5
cq#c7o
5k~0MA
I_Q#O
3\[*
o-eI6
OU	V:
@@@@@@@@@@@@@AD
n-y5
sp^=
MV;K;
|#=9
8#g@
3`:V
=VMW
}~O|
.=<x
iofF
T$@@@@@@@@@@@@A
Q@z+
Ba}5
dS:1
-{^C
}ZZ>
pGso#''
8TQyn
J7TJ!
g/mcn
J-=~+
KzFJ
6m=M
EmQ@M)
mM-p
p5^o.
98w&
/q4h
fJKcm+
[VWR
5uh"
_:f8
K+[F
@@@@@@@@@@@@@@@@@@@@@("y5
UenV
c$nx
|26H
/>ro
KIob
Z$Q[H
&/wO
#i=]
5.ap
v6:E
]skkg
I339
q5dQ5
f3pq?1
s>0@
6hp\
Tf/l
k)]k
}{.ny
r;_?x
.^_eM
{(&kY
lnmh
9`,d
Q@#n
;ULEH
.=o4
@@@@@
@@@@@@@@@@@@@@@@A
GykI
EE+U
=PQ!
[OPV
/y_4
[ZN-
Pu?E;m
@@@@@@@@@@@@@@@@@@(("
)b"
<|&[
MjkZ,
ykWWk5
si1R7Mi
q4PE
4Da[dx&
S2t1l
I	kA
Xr>C
EThWc
>	>[Z
\j\N
U)HC=
GdBX\
T+yU<"@
$-m{1
c_g7
74msM?
+nLf
I#kF
.{z^
<yquz
|RSq
HduC
imcw
0G	~
y W@
Da}g%
uuS2
v-kr
#CF8
>''H:
KgWP
.2^/c#{]sxe
<|s_
0|Bh
wl>2I:
HwPA
mkZ=
>?a-
n7#.
Bzt\
$,uA#
gU?3
gks#
?oIY
61$v
I\j*
/L.0Oh
jj=>
,@@@@@@@@@@@@@@@@@@@@@@@@@@!
YhKw
8s^5
yvYq_y
F]d-M
]GJt
owk+v
K\|-&
k3\c
z\|?
Pv?N
I(>X
!/V3
f`;C
RYqF^
?5Oc
kj\u
Q|=c
uIDK
)@]A
?$KB
hwI]\
G*oS
O-\:[
O$f[f9
qrYv
74WCQ
K,^:
xyg6
q^Go%
.11''N
h>Y~
0@pu
hmz
"Zu=
~KN=
,n&3S
z{\w4
si95
2:I\
9lm!
+E9d
Y%ak
BDQF*I
Yec~
p tuV~
sss]
q=k]J
J(eq
TNS674
;"{\d
O1?#
_U2''~[
q:F1
C[.F]n
t*@@@@@@@@@@@@@@@@@@@@@@@@@@A
i#sd
18Y1~n
(wH(t''
TgR6
_DE\A
c]GO
g/\EPb
>,?r
!kcp
xln$w
jzuT
U7[V
&[e8g(
v,&^
<Imt
`oX_
]4Yqq]
cfz}c~-
P+]*
v_e|i
}[f^_7
-_g<
9C&c
s7-e
]z/q
Hbq5a=j
Q=-s
@4]z
,%aox
X__.
=/YXr
]7SU
S1os
^ce0
faoig
hh5kw8n
T@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Amuh
2h{j
iUmb-m*
fBQ.W
IHDR
PLTE
""")))UUUMMMBBB999
33333f33
f33f3ff3
3f33ff3f
ff3fffff
!___www
bKGD
cmPPJCmp0712
IDATx^
?^GRR8
oMf
6][3k
d-Bn
BCu2q
AW4hv
^a:qJl(D
Wgx!s
e>hw
Yswo
s^:#^
@BSA
DE/]
G h(
):0(O
fK!f
}ZIzD
e\\dk
j1wV(
Z	:*
\DLi
+deM
9$lK
90Sov
') ON CONFLICT (id) DO NOTHING;

-- 150 Questions
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0001', 'S1.2', 1, 'single_choice', 'Theo Thông tư 32/2023/TT-BYT, kỹ thuật được đánh dấu (*) chỉ được điều dưỡng nào thực hiện và xác nhận ''Làm đúng''?', '["Tất cả điều dưỡng từ Trung cấp trở lên", "Điều dưỡng Cao đẳng có chứng chỉ", "Điều dưỡng trình độ Đại học trở lên có đào tạo bổ sung hoặc có văn bằng chuyên khoa", "Chỉ điều dưỡng trưởng khoa"]'::jsonb, 2, 'TT32/2023/TT-BYT quy định kỹ thuật đánh dấu (*) là kỹ thuật chuyên khoa, chỉ ĐD trình độ ĐH trở lên (có đào tạo bổ sung) hoặc có văn bằng chuyên khoa mới được thực hiện và chỉ định.', '*', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0002', 'S1.2', 1, 'single_choice', 'Kỹ thuật được đánh dấu (+) trong Phụ lục 12 - TT32 thuộc nhóm nào?', '["Sơ cứu, cấp cứu - tất cả cấp được thực hiện", "Kỹ thuật chuyên khoa", "Kỹ thuật điều dưỡng cơ bản", "Chỉ định riêng cho điều dưỡng trưởng"]'::jsonb, 0, 'Kỹ thuật (+) là sơ cứu/cấp cứu, cho phép tất cả các cấp độ điều dưỡng thực hiện và chỉ định.', '+', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0003', 'S1.2', 2, 'single_choice', 'Kỹ thuật điều dưỡng KHÔNG đánh dấu trong Phụ lục 12 thuộc loại nào?', '["Bị cấm", "Cần thẩm quyền chuyên khoa", "Kỹ thuật cơ bản, tất cả cấp được thực hiện và chỉ định", "Cần phê duyệt từng ca"]'::jsonb, 2, 'Kỹ thuật không đánh dấu là kỹ thuật điều dưỡng cơ bản, tất cả cấp độ ĐD được thực hiện/chỉ định.', '', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0004', 'S1.1', 1, 'single_choice', 'Theo Chuẩn đạo đức nghề nghiệp ĐD Việt Nam, nguyên tắc đầu tiên trong chăm sóc người bệnh là gì?', '["Tăng năng suất công việc", "Bảo đảm an toàn cho người bệnh", "Hoàn thành thủ tục hành chính", "Tuân thủ y lệnh tuyệt đối"]'::jsonb, 1, 'An toàn người bệnh là nguyên tắc cốt lõi trong Chuẩn đạo đức nghề nghiệp điều dưỡng.', '', ARRAY['VB06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0005', 'S1.1', 2, 'single_choice', 'Khi phát hiện sai sót trong y lệnh có thể gây hại cho NB, điều dưỡng nên?', '["Bỏ qua nếu không nghiêm trọng", "Thực hiện theo y lệnh để tránh tranh cãi", "Trao đổi lại với bác sĩ và ghi nhận", "Tự ý điều chỉnh"]'::jsonb, 2, 'ĐD có trách nhiệm trao đổi và ghi nhận, không tự ý thay đổi y lệnh; ưu tiên an toàn NB.', '', ARRAY['VB06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0006', 'S1.3', 2, 'single_choice', 'Theo Quy chế 756 về khoa PTGMHS, khoa thực hiện chức năng nào?', '["Chỉ phẫu thuật", "Chỉ gây mê", "Khám, điều trị, cấp cứu liên quan PT-GM-HS theo phân tuyến", "Đào tạo sinh viên là chính"]'::jsonb, 2, 'Quy chế 756 quy định khoa PTGMHS thực hiện đầy đủ chức năng KCB liên quan PT-GM-HS theo phân tuyến.', '', ARRAY['VB08'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0007', 'S2.1', 1, 'single_choice', 'Trước phẫu thuật theo lịch, thời gian nhịn ăn dạng đặc tối thiểu khuyến cáo là?', '["2 giờ", "4 giờ", "6 giờ", "12 giờ"]'::jsonb, 2, 'Hướng dẫn nhịn ăn trước GM: dạng đặc ≥ 6h, sữa mẹ ≥ 4h, dịch trong ≥ 2h.', '', ARRAY['CS01','CS02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0008', 'S2.1', 1, 'single_choice', 'Bước nào KHÔNG thuộc ''WHO Surgical Safety Checklist'' trước rạch da?', '["Xác nhận danh tính NB", "Xác nhận vị trí phẫu thuật", "Đánh giá nguy cơ chảy máu", "Tính phí phẫu thuật"]'::jsonb, 3, 'Time-Out trước rạch da gồm xác nhận NB, vị trí, kíp mổ, kháng sinh dự phòng, nguy cơ chảy máu - không gồm tài chính.', '', ARRAY['CS01','CS02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0009', 'S2.2', 2, 'single_choice', 'Sau phẫu thuật, dấu hiệu nào ưu tiên theo dõi đầu tiên trong giờ vàng?', '["Cân nặng", "Đường thở - thở - tuần hoàn (ABC)", "Lượng nước tiểu 24h", "Khẩu phần ăn"]'::jsonb, 1, 'Theo nguyên tắc ABC: Airway-Breathing-Circulation, ưu tiên trong chăm sóc hậu phẫu.', '', ARRAY['CS03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0010', 'S2.3', 1, 'single_choice', 'Tiêu chuẩn Aldrete đánh giá NB hồi tỉnh KHÔNG bao gồm yếu tố nào?', '["Hoạt động (Activity)", "Hô hấp", "SpO2", "Đường huyết"]'::jsonb, 3, 'Aldrete: Activity, Respiration, Circulation, Consciousness, SpO2 - không gồm đường huyết.', '+', ARRAY['CS07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0011', 'S2.3', 2, 'single_choice', 'Điểm Aldrete tối thiểu thường để chuyển NB ra khỏi phòng hồi tỉnh là?', '["≥ 5", "≥ 7", "≥ 9", "Tròn 10"]'::jsonb, 2, 'Thường yêu cầu Aldrete ≥ 9/10 (hoặc theo phác đồ đơn vị).', '+', ARRAY['CS07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0012', 'S2.4', 2, 'single_choice', 'Khi chăm sóc NB thở máy, mục tiêu áp lực bóng chèn ống NKQ thường là?', '["5-10 cmH2O", "20-30 cmH2O", "40-50 cmH2O", "Càng cao càng tốt"]'::jsonb, 1, 'Áp lực cuff khuyến cáo 20-30 cmH2O để giảm rò rỉ và tránh thiếu máu niêm mạc khí quản.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0013', 'S2.4', 3, 'single_choice', 'Biện pháp nào sau đây KHÔNG nằm trong gói VAP bundle phòng ngừa viêm phổi liên quan thở máy?', '["Nâng đầu giường 30-45 độ", "Vệ sinh răng miệng bằng chlorhexidine", "Đánh giá rút máy hàng ngày", "Truyền dịch khối lượng lớn để bù nước"]'::jsonb, 3, 'VAP bundle gồm: nâng đầu giường, vệ sinh răng miệng, đánh giá weaning, dự phòng loét dạ dày, dự phòng huyết khối; không gồm truyền dịch khối lượng lớn.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0014', 'S2.5', 1, 'single_choice', 'Khi bàn giao ca trực, thông tin nào BẮT BUỘC?', '["Sở thích cá nhân của NB", "Tình trạng cấp tính, y lệnh chưa hoàn thành, nguy cơ", "Tin tức trong ngày", "Lịch ăn của bệnh viện"]'::jsonb, 1, 'Bàn giao tập trung vào tình trạng cấp tính, y lệnh tồn, nguy cơ NB để đảm bảo liên tục chăm sóc.', '', ARRAY['CS05','CS06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0015', 'S2.6', 2, 'single_choice', 'Đối với NB phẫu thuật ung thư đường tiêu hóa, can thiệp dinh dưỡng nào được khuyến cáo trước mổ?', '["Nhịn ăn hoàn toàn", "Sàng lọc và bổ sung dinh dưỡng nếu suy dinh dưỡng", "Truyền albumin thường quy", "Ăn 5000 kcal/ngày"]'::jsonb, 1, 'Khuyến cáo sàng lọc dinh dưỡng (NRS-2002/MUST) và bổ sung khi có nguy cơ trước mổ.', '', ARRAY['CS08'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0016', 'S3.1', 2, 'single_choice', 'Khi định nhóm máu ABO trên giấy với KHC, mẫu chứng phải gồm?', '["Chỉ anti-A", "Chỉ anti-B", "Anti-A, anti-B, anti-AB và mẫu hồng cầu chứng A1, B", "Chỉ anti-AB"]'::jsonb, 2, 'Phương pháp huyết thanh mẫu yêu cầu đầy đủ anti-A, anti-B, anti-AB và HC chứng A1, B để đối chứng.', '*', ARRAY['KT01'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0017', 'S3.1', 3, 'single_choice', 'Trên giấy định nhóm ABO, ngưng kết xảy ra ở giếng anti-A và anti-AB nhưng KHÔNG ngưng kết với anti-B → nhóm máu là?', '["A", "B", "AB", "O"]'::jsonb, 0, 'Ngưng kết với anti-A và anti-AB, không với anti-B → nhóm A.', '*', ARRAY['KT01'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0018', 'S3.3', 1, 'single_choice', 'Trước truyền máu, bước đối chiếu ''5 đúng'' KHÔNG bao gồm yếu tố nào?', '["Đúng người bệnh", "Đúng nhóm máu", "Đúng số lượng", "Đúng giá thành"]'::jsonb, 3, '5 đúng: đúng NB, đúng chế phẩm, đúng nhóm máu, đúng số lượng, đúng thời gian; không gồm giá.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0019', 'S3.3', 2, 'single_choice', 'Phản ứng truyền máu cấp do tan máu (AHTR) có triệu chứng điển hình nào?', '["Sốt nhẹ đơn thuần", "Sốt cao, đau lưng, nước tiểu đỏ, tụt HA", "Ngứa nhẹ", "Buồn nôn không kèm dấu khác"]'::jsonb, 1, 'AHTR điển hình: sốt cao, đau lưng/ngực, hemoglobin niệu, tụt HA, có thể DIC. Cần ngừng truyền ngay.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0020', 'S3.3', 1, 'single_choice', 'Khi nghi ngờ phản ứng truyền máu cấp, hành động ĐẦU TIÊN của ĐD là?', '["Tăng tốc độ truyền để xong nhanh", "Ngừng truyền ngay, giữ đường truyền với NaCl 0.9%, báo bác sĩ", "Cho thuốc giảm đau", "Chờ theo dõi 30 phút"]'::jsonb, 1, 'Nguyên tắc xử trí cấp: ngừng truyền, duy trì đường truyền với NaCl 0.9%, báo BS, theo dõi sinh hiệu.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0021', 'S3.4', 2, 'single_choice', 'Tiêu chuẩn tối thiểu trước rút ống NKQ KHÔNG bao gồm?', '["NB tỉnh, hợp tác", "Phản xạ ho/nuốt tốt", "SpO2 ≥ 92% với FiO2 ≤ 40%", "Đường huyết < 5 mmol/L"]'::jsonb, 3, 'Tiêu chuẩn rút NKQ: tỉnh, phản xạ bảo vệ, thông số khí máu/SpO2 đạt, không tăng tiết quá nhiều - không liên quan đường huyết.', '*', ARRAY['KT04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0022', 'S3.4', 3, 'single_choice', 'Sau rút NKQ, dấu hiệu nào gợi ý phù thanh quản cần xử trí khẩn cấp?', '["Ho khan thoáng qua", "Khàn tiếng nhẹ", "Thở rít, co kéo cơ hô hấp phụ, SpO2 tụt", "Đau họng nhẹ"]'::jsonb, 2, 'Stridor + co kéo + tụt SpO2 = phù thanh quản → cần adrenalin khí dung, có thể đặt lại ống.', '*', ARRAY['KT04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0023', 'S3.5', 1, 'single_choice', 'Điều dưỡng dụng cụ KHÔNG có nhiệm vụ nào sau đây?', '["Đếm gạc, kim, dụng cụ", "Phối hợp đưa dụng cụ cho phẫu thuật viên", "Đảm bảo vô khuẩn dụng cụ", "Ký y lệnh điều trị thay bác sĩ"]'::jsonb, 3, 'ĐD dụng cụ thuộc kíp mổ, không có thẩm quyền ký y lệnh điều trị.', '', ARRAY['KT05'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0024', 'S3.6', 1, 'single_choice', 'Nguyên tắc đếm gạc trong phẫu thuật được thực hiện?', '["Chỉ trước mổ", "Chỉ sau mổ", "Trước mổ, trước đóng khoang, sau khi đóng da", "Khi cần thiết"]'::jsonb, 2, 'Đếm 3 thời điểm tối thiểu để phòng ngừa sót dụng cụ/gạc.', '', ARRAY['KT06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0025', 'S3.7', 2, 'single_choice', 'Khi đặt sonde dẫn lưu tiểu cho nữ giới, tư thế khuyến cáo là?', '["Sấp", "Nằm ngửa, gối gấp, hai chân dang", "Đứng", "Ngồi xổm"]'::jsonb, 1, 'Tư thế chuẩn cho đặt sonde tiểu nữ: nằm ngửa gối gấp dang chân để bộc lộ niệu đạo.', '', ARRAY['BK02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0026', 'S3.8', 2, 'single_choice', 'Trong gây mê NKQ, ĐD phụ KHÔNG cần chuẩn bị thiết bị nào sau đây?', '["Máy gây mê đã kiểm tra", "Đèn đặt NKQ + ống NKQ các size", "Bóng Ambu, oxy", "Máy chụp X-quang"]'::jsonb, 3, 'Bộ chuẩn bị gây mê NKQ không bao gồm máy X-quang (trừ chỉ định riêng).', '*', ARRAY['BK03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0027', 'S4.1', 1, 'single_choice', 'Phòng ngừa chuẩn (Standard Precautions) áp dụng khi nào?', '["Chỉ với NB có HIV", "Chỉ với NB có viêm gan", "Với MỌI người bệnh, mọi tình huống tiếp xúc dịch cơ thể", "Chỉ trong khu vực mổ"]'::jsonb, 2, 'Phòng ngừa chuẩn áp dụng phổ quát cho mọi NB, mọi loại dịch tiết, không phụ thuộc chẩn đoán.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0028', 'S4.1', 1, 'single_choice', '5 thời điểm rửa tay (WHO) bao gồm?', '["Chỉ trước khi ăn", "Trước khi tiếp xúc NB, trước thủ thuật vô khuẩn, sau khi tiếp xúc dịch cơ thể, sau tiếp xúc NB, sau tiếp xúc môi trường xung quanh NB", "Mỗi giờ một lần", "Khi tay nhìn thấy bẩn"]'::jsonb, 1, '5 moments của WHO bao quát các thời điểm có nguy cơ lây nhiễm chéo.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0029', 'S4.2', 2, 'single_choice', 'Theo QĐ 3916, đối với chất thải sắc nhọn (kim, lưỡi dao mổ) phải bỏ vào loại thùng nào?', '["Thùng đen thông thường", "Thùng vàng có biểu tượng nguy hại sinh học", "Thùng cứng kháng thủng màu vàng có nắp", "Thùng tái chế xanh"]'::jsonb, 2, 'Chất thải sắc nhọn cần thùng cứng kháng thủng, thường màu vàng, không vượt quá 3/4 dung tích.', '', ARRAY['VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0030', 'S4.3', 2, 'single_choice', 'Bộ checklist an toàn phẫu thuật theo QĐ 7482 gồm bao nhiêu giai đoạn?', '["1", "2", "3", "5"]'::jsonb, 2, '3 giai đoạn: Sign-In (trước GM), Time-Out (trước rạch da), Sign-Out (trước rời phòng mổ).', '', ARRAY['VB10'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0031', 'S4.3', 1, 'single_choice', 'Mục đích của Time-Out trong an toàn phẫu thuật?', '["Để nghỉ giải lao", "Xác nhận đúng NB - đúng vị trí - đúng thủ thuật trước rạch da", "Ghi biên bản hành chính", "Chuẩn bị thanh toán"]'::jsonb, 1, 'Time-Out là điểm dừng để toàn kíp xác nhận đúng NB/vị trí/thủ thuật, kháng sinh dự phòng và nguy cơ.', '', ARRAY['VB10'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0032', 'S4.4', 2, 'single_choice', 'Quản lý tem vật tư y tế nhằm mục đích gì?', '["Trang trí dụng cụ", "Truy xuất nguồn gốc, hạn sử dụng và sử dụng đúng VTYT", "Tăng giá trị bảo hiểm", "Phân loại theo màu"]'::jsonb, 1, 'Quản lý tem giúp truy xuất nguồn gốc, hạn dùng, đảm bảo sử dụng đúng và an toàn.', '', ARRAY['KT07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0033', 'S5.1', 1, 'single_choice', 'Tỷ lệ ép tim/thổi ngạt ở người lớn (1 cấp cứu viên) theo khuyến cáo CPR?', '["15:2", "30:2", "5:1", "10:1"]'::jsonb, 1, 'Khuyến cáo: 30 lần ép tim : 2 lần thổi ngạt cho người lớn.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0034', 'S5.1', 2, 'single_choice', 'Tần số ép tim người lớn khuyến cáo theo AHA mới nhất?', '["60-80/phút", "80-100/phút", "100-120/phút", "Trên 140/phút"]'::jsonb, 2, 'AHA khuyến cáo 100-120/phút và độ sâu 5-6cm cho người lớn.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0035', 'S5.2', 2, 'single_choice', 'Khi xảy ra phản ứng truyền máu cấp do tan máu, biến chứng nghiêm trọng nào cần dự phòng?', '["Sỏi mật", "Suy thận cấp do hemoglobin niệu", "Trĩ", "Loãng xương"]'::jsonb, 1, 'Hemoglobin tự do từ HC vỡ → suy thận cấp; cần bù dịch và lợi tiểu duy trì cung lượng nước tiểu.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0036', 'S5.3', 2, 'single_choice', 'Sau gây mê, NB có dấu hiệu thở rít sau rút NKQ. Xử trí cấp cứu KHÔNG phù hợp?', '["Cho thở oxy", "Adrenalin khí dung", "Chuẩn bị bộ đặt NKQ lại", "Cho NB ăn ngay để hồi sức"]'::jsonb, 3, 'Tuyệt đối không cho ăn khi đường thở chưa ổn định.', '+', ARRAY['CS07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0037', 'S6.1', 1, 'single_choice', 'Theo TT31/2021, hoạt động chăm sóc ĐD trong BV được thực hiện theo nguyên tắc?', '["Chỉ thụ động chờ y lệnh", "Chăm sóc lấy NB làm trung tâm, có kế hoạch và đánh giá", "Theo yêu cầu hành chính", "Tự do theo kinh nghiệm"]'::jsonb, 1, 'TT31/2021 nhấn mạnh chăm sóc lấy NB làm trung tâm, có kế hoạch, đánh giá liên tục.', '', ARRAY['VB04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0038', 'S6.1', 2, 'single_choice', 'TT31/2021 quy định mô hình phân công chăm sóc nào được khuyến khích?', '["Phân công theo công việc", "Phân công theo NB (case method) hoặc theo nhóm", "Phân công theo phòng", "Tự sắp xếp"]'::jsonb, 1, 'TT31 khuyến khích mô hình theo NB hoặc theo nhóm để đảm bảo tính liên tục.', '', ARRAY['VB04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0039', 'S6.2', 1, 'single_choice', 'Hướng dẫn công tác GMHS quy định ĐD GM phải có?', '["Tự học là đủ", "Đào tạo phù hợp và được phân công bởi trưởng khoa", "Chỉ cần kinh nghiệm 1 tháng", "Không yêu cầu"]'::jsonb, 1, 'Đòi hỏi đào tạo phù hợp và phân công chính thức để đảm bảo năng lực thực hiện kỹ thuật GMHS.', '', ARRAY['VB07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0040', 'S6.3', 2, 'single_choice', 'Bảng kiểm đánh giá thực hành dùng để?', '["Trừng phạt nhân viên", "Chuẩn hóa quy trình, đánh giá khách quan, làm cơ sở cải tiến chất lượng", "Giảm lương", "Thay thế đào tạo"]'::jsonb, 1, 'Bảng kiểm là công cụ chuẩn hóa, đánh giá khách quan, hỗ trợ đào tạo - cải tiến.', '', ARRAY['BK01'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0041', 'S1.2', 2, 'single_choice', 'NB cần định nhóm máu ABO bằng phương pháp huyết thanh mẫu trên giấy. ĐD trình độ Trung cấp được phép?', '["Thực hiện và xác nhận", "Chỉ thực hiện dưới giám sát của ĐD ĐH+ hoặc CK", "Chỉ định độc lập", "Không liên quan"]'::jsonb, 1, 'Định nhóm máu (*) thuộc kỹ thuật chuyên khoa - ĐD TC chỉ được phụ giúp, không xác nhận ''Làm đúng''.', '*', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0042', 'S1.2', 3, 'single_choice', 'NB ngừng tuần hoàn ngay tại phòng mổ. ĐD Cao đẳng đang trực một mình. Theo TT32, ĐD này được làm gì?', '["Chờ ĐD ĐH đến rồi mới ép tim", "Tiến hành CPR ngay (kỹ thuật cấp cứu +)", "Gọi BS rồi ngồi yên", "Không được can thiệp"]'::jsonb, 1, 'CPR là kỹ thuật cấp cứu (+), tất cả cấp ĐD được thực hiện và chỉ định.', '+', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0043', 'S2.1', 2, 'single_choice', 'Trước phẫu thuật, vị trí dự kiến rạch da phải được?', '["Để bệnh nhân tự đánh dấu", "Đánh dấu bởi phẫu thuật viên có sự đồng thuận của NB", "Bỏ qua nếu rõ ràng", "Đánh dấu bởi điều dưỡng trưởng"]'::jsonb, 1, 'WHO Surgical Safety: PTV đánh dấu vị trí có sự đồng thuận NB tỉnh táo trước GM.', '', ARRAY['CS01','CS02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0044', 'S2.1', 1, 'single_choice', 'Mục đích kiểm tra đường thở trước GM là?', '["Tăng phí dịch vụ", "Dự đoán đặt NKQ khó (Mallampati, há miệng, cổ)", "Để NB thoải mái", "Yêu cầu hành chính"]'::jsonb, 1, 'Đánh giá đường thở khó là bước chuẩn bị bắt buộc trước GM.', '', ARRAY['CS01','CS02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0045', 'S2.2', 2, 'single_choice', 'Đánh giá đau sau mổ bằng thang VAS, mức nào cần can thiệp giảm đau?', '["VAS = 0", "VAS 1-2", "VAS ≥ 4", "Không cần đo"]'::jsonb, 2, 'VAS ≥ 4/10 thường là ngưỡng cần can thiệp giảm đau theo guidelines.', '', ARRAY['CS03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0046', 'S2.2', 1, 'single_choice', 'Phòng ngừa huyết khối tĩnh mạch sau mổ KHÔNG bao gồm?', '["Vận động sớm", "Tất áp lực", "Heparin trọng lượng phân tử thấp theo chỉ định", "Bất động hoàn toàn 7 ngày"]'::jsonb, 3, 'Bất động kéo dài làm tăng nguy cơ huyết khối; cần vận động sớm.', '', ARRAY['CS03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0047', 'S2.3', 1, 'single_choice', 'Sau GM, dấu hiệu báo động cần báo BS ngay?', '["NB ngủ ngon", "SpO2 < 90% kéo dài, mạch chậm < 50, tụt HA", "NB hỏi giờ", "Đói nhẹ"]'::jsonb, 1, 'Bộ ba SpO2/mạch/HA bất thường là dấu hiệu nguy hiểm trong hồi tỉnh.', '+', ARRAY['CS07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0048', 'S2.4', 2, 'single_choice', 'Chăm sóc miệng cho NB thở máy nên dùng dung dịch nào để giảm VAP?', '["Nước muối thường", "Chlorhexidine 0.12-0.2%", "Nước lọc", "Cồn 70%"]'::jsonb, 1, 'Chlorhexidine 0.12-0.2% là khuyến cáo trong VAP bundle.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0049', 'S2.5', 1, 'single_choice', 'Khi giao ca, dùng phương pháp SBAR là gì?', '["Sờ-Bóp-Áp-Rút", "Situation-Background-Assessment-Recommendation", "Sạch-Bẩn-An toàn-Riêng tư", "Một loại y lệnh"]'::jsonb, 1, 'SBAR là khung giao tiếp chuẩn quốc tế trong giao ca và báo cáo lâm sàng.', '', ARRAY['CS05','CS06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0050', 'S2.6', 2, 'single_choice', 'Đường nuôi dưỡng ưu tiên sau phẫu thuật khi đường tiêu hóa còn chức năng?', '["Tĩnh mạch hoàn toàn", "Đường ruột (oral/enteral) sớm khi an toàn", "Nhịn ăn 5-7 ngày", "Truyền glucose 5%"]'::jsonb, 1, 'Khuyến cáo ERAS: dinh dưỡng đường ruột sớm khi an toàn (often <24-48h).', '', ARRAY['CS08'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0051', 'S3.1', 1, 'single_choice', 'Khi đọc kết quả ngưng kết, ngưng kết được định nghĩa là?', '["Tan biến", "Hồng cầu kết tụ thành đám lớn nhìn thấy", "Đổi màu", "Không thay đổi"]'::jsonb, 1, 'Ngưng kết = HC kết tụ thành đám đại thể, là dấu hiệu dương tính.', '*', ARRAY['KT01'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0052', 'S3.2', 2, 'single_choice', 'Định nhóm trên KHC ≠ định nhóm trên huyết tương/tiểu cầu vì?', '["Cùng quy trình", "Cơ chế đối chứng kháng nguyên/kháng thể khác nhau theo chế phẩm", "Không khác biệt", "Chỉ khác giá"]'::jsonb, 1, 'Mỗi loại chế phẩm có quy trình riêng theo TT cấp máu lâm sàng.', '*', ARRAY['KT02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0053', 'S3.3', 2, 'single_choice', 'Tốc độ truyền KHC khởi đầu cho NB ổn định không xuất huyết cấp?', '["Tốc độ nhanh nhất có thể", "1-2 mL/phút trong 15 phút đầu, sau đó theo chỉ định", "100 mL/phút", "Truyền đẩy bằng tay"]'::jsonb, 1, '15 phút đầu truyền chậm để phát hiện sớm phản ứng truyền máu.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0054', 'S3.3', 3, 'single_choice', 'Sau truyền máu, ĐD phải lưu túi máu và bộ dây trong bao lâu?', '["Vứt ngay", "Lưu 24h theo dõi phản ứng muộn", "1 tuần", "1 tháng"]'::jsonb, 1, 'Lưu túi máu/bộ dây 24h tại tủ riêng để truy xuất khi có phản ứng muộn.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0055', 'S3.4', 2, 'single_choice', 'Trước rút NKQ, ĐD cần hút đờm vùng nào?', '["Chỉ miệng", "Chỉ ống NKQ", "Trên cuff (subglottic) và trong ống NKQ", "Không cần hút"]'::jsonb, 2, 'Hút trên cuff và trong ống để tránh hít chất tiết khi rút.', '*', ARRAY['KT04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0056', 'S3.5', 1, 'single_choice', 'Khi mở bộ dụng cụ vô khuẩn, vùng vô khuẩn được tính từ?', '["Toàn bàn", "Cách mép bàn 2.5 cm trở vào, trên mặt bàn", "Toàn phòng", "Sàn nhà"]'::jsonb, 1, 'Theo nguyên tắc vô khuẩn cổ điển: mép bàn 2.5 cm coi là vùng nhiễm.', '', ARRAY['KT05'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0057', 'S3.6', 2, 'single_choice', 'Khi đếm gạc bị thiếu sau đóng da, hành động nào ĐÚNG?', '["Bỏ qua", "Thông báo PTV ngay, kiểm tra lại trường mổ và xem xét chụp X-quang", "Tự ghi đủ rồi đi", "Đợi sáng mai báo"]'::jsonb, 1, 'An toàn NB trên hết: thông báo, tìm kiếm và xem xét chẩn đoán hình ảnh.', '', ARRAY['KT06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0058', 'S3.7', 1, 'single_choice', 'Sonde Foley dẫn lưu tiểu nên thay sau bao lâu (theo guideline KSNK)?', '["Mỗi ngày", "Mỗi 7 ngày bất kể lâm sàng", "Theo chỉ định lâm sàng và nguy cơ, không thay theo lịch cứng", "Không bao giờ thay"]'::jsonb, 2, 'CDC khuyến cáo không thay theo lịch cứng; thay theo lâm sàng để giảm CAUTI.', '', ARRAY['BK02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0059', 'S3.8', 1, 'single_choice', 'Trong khởi mê, ĐD theo dõi sinh hiệu tối thiểu nào?', '["Chỉ HA", "ECG, SpO2, HA, nhịp thở, EtCO2 (nếu có)", "Chỉ mạch", "Không cần theo dõi"]'::jsonb, 1, 'Theo dõi đa thông số là chuẩn tối thiểu trong khởi mê.', '*', ARRAY['BK03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0060', 'S4.1', 1, 'single_choice', 'Phương tiện PPE tối thiểu khi tiếp xúc NB nguy cơ giọt bắn?', '["Chỉ găng", "Khẩu trang y tế + găng + tạp dề + kính", "Chỉ kính", "Không cần"]'::jsonb, 1, 'Phòng ngừa giọt bắn: khẩu trang y tế + găng + tạp dề + bảo vệ mắt khi có nguy cơ.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0061', 'S4.1', 2, 'single_choice', 'Khi tiếp xúc NB nguy cơ khí dung (như đặt NKQ NB COVID), khẩu trang khuyến cáo?', '["Khẩu trang vải", "Khẩu trang y tế thường", "Khẩu trang N95/FFP2 trở lên", "Không cần"]'::jsonb, 2, 'Thủ thuật khí dung yêu cầu N95/FFP2 trở lên + đầy đủ PPE.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0062', 'S4.2', 1, 'single_choice', 'Theo QĐ 3916, chất thải lây nhiễm sắc nhọn được mã hóa màu?', '["Đen", "Xanh", "Vàng", "Trắng"]'::jsonb, 2, 'Màu vàng = chất thải lây nhiễm; thùng cứng cho sắc nhọn.', '', ARRAY['VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0063', 'S4.3', 2, 'single_choice', 'Sign-Out (sau ca mổ) bao gồm xác nhận gì?', '["Tên phẫu thuật, đếm dụng cụ-gạc-kim, gắn nhãn bệnh phẩm, vấn đề cần lưu ý cho hồi sức", "Chỉ thanh toán", "Chỉ kế hoạch ăn uống", "Không cần"]'::jsonb, 0, 'Sign-Out theo WHO: xác nhận tên ca, đếm gạc/kim/dụng cụ, nhãn bệnh phẩm, vấn đề chuyển tiếp.', '', ARRAY['VB10'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0064', 'S4.4', 2, 'single_choice', 'Hạn dùng dụng cụ tiệt khuẩn trong bao bì giấy thường là?', '["1 ngày", "Theo quy định cơ sở (thường 30-180 ngày tùy bao bì và bảo quản)", "Vĩnh viễn", "Không cần ghi"]'::jsonb, 1, 'Hạn dùng phụ thuộc bao bì và điều kiện bảo quản, theo quy định nội bộ.', '', ARRAY['KT07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0065', 'S5.1', 1, 'single_choice', 'Sau khi xác nhận NB ngừng tim, hành động đầu tiên?', '["Tìm thân nhân", "Ép tim ngoài lồng ngực ngay", "Truyền dịch", "Chụp X-quang"]'::jsonb, 1, 'CPR sớm là yếu tố quyết định tiên lượng.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0066', 'S5.1', 2, 'single_choice', 'Sốc điện không đồng bộ (defibrillation) chỉ định trong nhịp gì?', '["Vô tâm thu", "VF/pVT (rung thất / nhịp nhanh thất vô mạch)", "Block nhĩ thất hoàn toàn", "Nhịp xoang"]'::jsonb, 1, 'Defib chỉ áp dụng cho VF/pVT; vô tâm thu cần CPR + epinephrine.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0067', 'S5.2', 2, 'single_choice', 'Liều adrenalin tiêm bắp ban đầu cho phản vệ độ II ở người lớn?', '["0.01 mg", "0.5 mg (1:1000) tiêm bắp đùi ngoài", "5 mg tĩnh mạch", "Không dùng"]'::jsonb, 1, 'Adrenalin 0.5 mg IM mặt ngoài đùi giữa, có thể nhắc lại sau 5-15 phút.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0068', 'S5.3', 1, 'single_choice', 'NB tỉnh sau GM bỗng tím, SpO2 80%. Hành động đầu tiên?', '["Quan sát thêm 10 phút", "Cho oxy, kiểm tra đường thở, gọi giúp đỡ", "Cho ăn", "Cho NB ngồi dậy đi lại"]'::jsonb, 1, 'ABC: oxy hóa, thông đường thở, gọi hỗ trợ ngay.', '+', ARRAY['CS07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0069', 'S6.1', 2, 'single_choice', 'TT31/2021 quy định ĐD chính thực hiện kế hoạch chăm sóc dựa trên?', '["Cảm tính", "Chẩn đoán điều dưỡng và y lệnh", "Yêu cầu thân nhân", "Lịch hành chính"]'::jsonb, 1, 'Kế hoạch chăm sóc dựa trên chẩn đoán ĐD và y lệnh, theo dõi - đánh giá liên tục.', '', ARRAY['VB04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0070', 'S6.2', 1, 'single_choice', 'Trước ca GM, ĐD GM phải kiểm tra máy gây mê theo?', '["Cảm tính", "Checklist chuẩn của hãng + nội bộ", "Không cần", "Khi có sự cố mới kiểm"]'::jsonb, 1, 'Pre-use check máy GM là bắt buộc, theo checklist nhà sản xuất + nội bộ.', '', ARRAY['VB07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0071', 'S6.3', 1, 'single_choice', 'Bảng kiểm đánh giá thực hành thường có thang điểm?', '["Đúng/Sai", "Đạt/Không đạt hoặc thang 0-1-2 theo từng bước", "Chỉ ghi chú", "Số điểm bất kỳ"]'::jsonb, 1, 'Thang đánh giá phổ biến: Đạt/Không đạt hoặc 0-1-2 cho từng bước cụ thể.', '', ARRAY['BK01'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0072', 'S5.2', 3, 'single_choice', 'Trong khi truyền KHC, NB sốt 39°C, lạnh run, đau lưng. Bước nào KHÔNG nên làm?', '["Ngừng truyền", "Giữ đường truyền với NaCl 0.9%", "Tăng tốc độ truyền để truyền hết", "Báo BS, theo dõi sinh hiệu, gửi mẫu xét nghiệm"]'::jsonb, 2, 'Tuyệt đối không tăng tốc khi nghi phản vệ/truyền máu cấp.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0073', 'S2.4', 3, 'single_choice', 'NB thở máy có Pmax tăng đột ngột, SpO2 tụt. Nguyên nhân nhanh cần loại trừ (DOPE)?', '["Dental, Operating, Pulse, Ear", "Displacement, Obstruction, Pneumothorax, Equipment", "Doctor, Order, Plan, Evaluate", "Không có"]'::jsonb, 1, 'DOPE: Dislodgement (lệch ống), Obstruction (tắc), Pneumothorax (TKMP), Equipment (máy).', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0074', 'S2.4', 2, 'single_choice', 'Khi cần hút đờm cho NB thở máy, thời gian mỗi lần hút tối đa?', '["≤ 10-15 giây", "1 phút", "5 phút", "Không giới hạn"]'::jsonb, 0, 'Hút ≤ 10-15s/lần, oxy hóa trước-sau, tránh thiếu oxy.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0075', 'S1.1', 2, 'single_choice', 'Khi NB từ chối thủ thuật đã có đồng thuận, ĐD nên?', '["Vẫn làm", "Tôn trọng quyền tự quyết, ghi nhận, báo BS", "Khuyên dụ NB", "Không cần ghi"]'::jsonb, 1, 'Tôn trọng quyền tự quyết là nguyên tắc đạo đức cơ bản.', '', ARRAY['VB06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0076', 'S1.3', 1, 'single_choice', 'Khoa PTGMHS phối hợp với khoa nào trong an toàn NB?', '["Chỉ ngoại", "Tất cả khoa lâm sàng và cận lâm sàng liên quan", "Chỉ KSNK", "Không phối hợp"]'::jsonb, 1, 'PTGMHS là điểm giao cắt, cần phối hợp đa chuyên khoa và cận lâm sàng.', '', ARRAY['VB08'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0077', 'S2.1', 1, 'single_choice', 'Đêm trước mổ chương trình, NB cần?', '["Uống nhiều bia", "Tắm bằng dung dịch sát khuẩn theo chỉ định, ngủ đủ", "Ăn no", "Tự ý dùng thuốc an thần"]'::jsonb, 1, 'Tắm sát khuẩn (chlorhexidine) đêm trước mổ làm giảm SSI; nghỉ ngơi đủ.', '', ARRAY['CS01','CS02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0078', 'S2.2', 1, 'single_choice', 'Đánh giá Ramsay dùng để đánh giá?', '["Đau", "Mức độ an thần", "Tri giác hôn mê", "Hô hấp"]'::jsonb, 1, 'Ramsay đánh giá mức an thần (1-6).', '', ARRAY['CS03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0079', 'S3.5', 2, 'single_choice', 'Khi ĐD dụng cụ rời bàn mổ trong lúc đang phẫu thuật?', '["Không có vấn đề", "Phải giao cho ĐD khác và bàn giao chính xác đếm dụng cụ", "Tắt đèn rồi đi", "Không cần báo"]'::jsonb, 1, 'An toàn NB: bàn giao kèm đếm dụng cụ chính xác.', '', ARRAY['KT05'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0080', 'S3.6', 1, 'single_choice', 'Mục đích đếm dụng cụ-gạc-kim ở 3 thời điểm?', '["Tăng thủ tục", "Phòng sót dụng cụ trong cơ thể NB", "Tăng chi phí", "Không có ý nghĩa"]'::jsonb, 1, 'Mục đích chính: an toàn NB, phòng sót dị vật trong cơ thể.', '', ARRAY['KT06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0081', 'S2.3', 3, 'single_choice', 'NB hồi tỉnh có Aldrete = 7 sau 30 phút, mạch chậm 45, HA 85/50, SpO2 92%. Hành động?', '["Chuyển ngay về phòng thường", "Giữ lại theo dõi, oxy hỗ trợ, báo BS, tìm nguyên nhân", "Cho ăn", "Cho ra viện"]'::jsonb, 1, 'Aldrete chưa đạt, có dấu hiệu nguy hiểm → giữ lại, oxy, báo BS, đánh giá thêm.', '+', ARRAY['CS07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0082', 'S3.4', 3, 'single_choice', 'Sau rút NKQ 30 phút, NB khàn tiếng, SpO2 90%, không stridor rõ. Bước hợp lý?', '["Bỏ qua", "Cho oxy, theo dõi sát, báo BS đánh giá", "Cho ăn lỏng ngay", "Tập đi lại"]'::jsonb, 1, 'Khàn tiếng + SpO2 thấp cần theo dõi sát; chưa cấp cứu nhưng không thể bỏ qua.', '*', ARRAY['KT04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0083', 'S5.1', 3, 'single_choice', 'Trong CPR, ĐD nên đổi vai trò ép tim mỗi bao lâu?', '["Mỗi 30 phút", "Mỗi 2 phút (sau mỗi chu kỳ)", "Mỗi 10 phút", "Không cần đổi"]'::jsonb, 1, 'Đổi vai mỗi 2 phút để duy trì chất lượng ép tim.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0084', 'S4.3', 2, 'single_choice', 'Theo QĐ 7482, mục tiêu chính của bộ checklist an toàn phẫu thuật?', '["Hành chính", "Giảm tử vong và biến chứng phẫu thuật", "Tăng năng suất", "Tiết kiệm chi phí thuốc"]'::jsonb, 1, 'WHO/QĐ 7482: giảm tử vong và biến chứng nhờ chuẩn hóa các bước an toàn.', '', ARRAY['VB10'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0085', 'S2.6', 1, 'single_choice', 'Nguyên tắc ''enhanced recovery after surgery'' (ERAS) bao gồm?', '["Nhịn ăn lâu", "Vận động sớm, dinh dưỡng sớm, giảm đau đa mô thức", "Bất động lâu", "Truyền dịch nhiều"]'::jsonb, 1, 'ERAS: vận động sớm, dinh dưỡng đường ruột sớm, giảm đau đa mô thức, hạn chế dịch thừa.', '', ARRAY['CS08'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0086', 'S1.2', 2, 'single_choice', 'Đối với kỹ thuật được đánh dấu (*) trong Phụ lục 12, ĐD trình độ Cao đẳng có được phép thực hiện không?', '["Có, không điều kiện", "Chỉ phụ giúp; chưa đủ thẩm quyền xác nhận ''Làm đúng''", "Có nếu trưởng khoa cho", "Không bao giờ"]'::jsonb, 1, 'TT32 yêu cầu ĐD ĐH+ có đào tạo bổ sung hoặc CK để xác nhận thực hiện kỹ thuật (*).', '*', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0087', 'S1.2', 3, 'single_choice', 'Một ĐD ĐH có chứng chỉ CK Hồi sức được phân công thực hiện kỹ thuật (*) trong khoa GMHS - hồ sơ năng lực có được gắn ''Làm đúng'' không?', '["Không", "Có, nếu chứng chỉ và đào tạo phù hợp với kỹ thuật được đối soát", "Tùy ý", "Cần đợi 5 năm"]'::jsonb, 1, 'AI đối soát hồ sơ năng lực + chứng chỉ phù hợp + được phân công → đủ điều kiện.', '*', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0088', 'S1.2', 1, 'single_choice', 'Cấp cứu ngừng tuần hoàn được đánh dấu gì trong Phụ lục 12?', '["(*)", "(+)", "Không dấu", "(#)"]'::jsonb, 1, 'Cấp cứu = (+).', '+', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0089', 'S1.2', 2, 'single_choice', 'Khi NB đang truyền máu xảy ra phản ứng cấp, ĐD trình độ Trung cấp được làm gì?', '["Chỉ đứng nhìn", "Ngừng truyền, giữ đường truyền NaCl 0.9%, báo BS - đây là cấp cứu (+)", "Đợi ĐD ĐH", "Đi gọi người nhà"]'::jsonb, 1, 'Xử trí phản ứng truyền máu thuộc nhóm cấp cứu (+) - mọi cấp được thực hiện.', '+', ARRAY['VB01','VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0090', 'S4.1', 1, 'single_choice', 'Sau khi rửa tay, ưu tiên dùng?', '["Khăn vải dùng chung", "Khăn giấy dùng một lần hoặc khô tay tự nhiên", "Áo blouse", "Quần áo thường"]'::jsonb, 1, 'Khăn giấy dùng một lần giảm lây nhiễm chéo.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0091', 'S4.1', 1, 'single_choice', 'Cồn rửa tay nhanh hiệu quả với?', '["Bào tử Clostridium difficile", "Hầu hết vi khuẩn dạng dinh dưỡng và một số virus có vỏ", "Mọi vi sinh", "Chỉ nấm"]'::jsonb, 1, 'Cồn không diệt được bào tử C. difficile - cần rửa với xà phòng và nước.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0092', 'S4.1', 2, 'single_choice', 'Khi tháo PPE, thứ tự đúng là?', '["Khẩu trang → găng → áo choàng", "Găng → áo choàng → kính → khẩu trang → rửa tay", "Tùy ý", "Khẩu trang trước"]'::jsonb, 1, 'CDC: găng và áo choàng nhiễm nhất tháo trước, khẩu trang và kính sau cùng, kết thúc bằng rửa tay.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0093', 'S4.2', 1, 'single_choice', 'Vệ sinh tay là biện pháp KSNK quan trọng vì?', '["Tốn ít thời gian", "Đơn giản, hiệu quả nhất trong phòng nhiễm khuẩn liên quan chăm sóc", "Để đẹp", "Không quan trọng"]'::jsonb, 1, 'Vệ sinh tay được WHO/CDC xác nhận là biện pháp đơn giản, hiệu quả nhất.', '', ARRAY['VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0094', 'S4.2', 2, 'single_choice', 'Theo QĐ 3916, đối với chất thải nguy hại không lây nhiễm, mã màu?', '["Vàng", "Đen", "Xanh", "Trắng"]'::jsonb, 1, 'Đen = chất thải nguy hại không lây nhiễm (hóa chất, dược phẩm).', '', ARRAY['VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0095', 'S4.2', 1, 'single_choice', 'Phòng cách ly tiếp xúc dùng cho?', '["NB nhiễm vi sinh đa kháng (MRSA, CRE)", "NB phẫu thuật", "NB ung thư", "NB tiểu đường"]'::jsonb, 0, 'Phòng cách ly tiếp xúc cho NB có nguy cơ lây qua tiếp xúc trực tiếp/gián tiếp.', '', ARRAY['VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0096', 'S2.4', 2, 'single_choice', 'Tiêu chuẩn weaning ban đầu cho NB thở máy?', '["NB hôn mê sâu", "NB tỉnh, oxy hóa đạt, huyết động ổn, nguyên nhân nền cải thiện", "Bất kỳ ai", "Không có tiêu chuẩn"]'::jsonb, 1, 'Tiêu chuẩn ABCDEF + thông số khí máu/hô hấp đủ điều kiện thử cai máy.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0097', 'S2.4', 3, 'single_choice', 'Test SBT (Spontaneous Breathing Trial) thường kéo dài?', '["1 phút", "30-120 phút", "8 giờ", "24 giờ"]'::jsonb, 1, 'SBT thường 30-120 phút với T-piece hoặc CPAP/PS thấp.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0098', 'S2.4', 1, 'single_choice', 'Vị trí đầu giường khuyến cáo cho NB thở máy?', '["Phẳng", "30-45 độ trừ chống chỉ định", "90 độ", "Đầu thấp"]'::jsonb, 1, 'Nâng đầu giường 30-45° giảm trào ngược và VAP.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0099', 'S5.1', 1, 'single_choice', 'Vị trí ép tim người lớn?', '["Mỏm tim", "Nửa dưới xương ức", "Xương đòn", "Bụng"]'::jsonb, 1, 'Đặt gót tay ở nửa dưới xương ức, đường giữa.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0100', 'S5.1', 2, 'single_choice', 'Khi sốc điện trong VF, năng lượng đầu tiên với máy hai pha?', '["360 J", "120-200 J theo nhà sản xuất", "50 J", "Tùy ý"]'::jsonb, 1, 'Máy biphasic: 120-200 J theo khuyến cáo nhà sản xuất; sau đó tăng dần.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0101', 'S5.1', 3, 'single_choice', 'Sau ROSC, mục tiêu SpO2 và EtCO2?', '["SpO2 100%", "SpO2 92-98%, EtCO2 35-45 mmHg", "SpO2 < 80%", "Không đo"]'::jsonb, 1, 'Tránh tăng oxy quá mức; duy trì EtCO2 trong khoảng sinh lý.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0102', 'S5.2', 1, 'single_choice', 'Phản vệ độ III biểu hiện?', '["Chỉ nổi mày đay", "Có nguy hiểm tính mạng: tụt HA nặng/co thắt thanh quản nặng", "Buồn nôn", "Đau đầu nhẹ"]'::jsonb, 1, 'Độ III có nguy cơ tử vong: cần adrenalin tiêm bắp ngay theo phác đồ BYT.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0103', 'S5.2', 2, 'single_choice', 'Liều adrenalin tiêm bắp cho trẻ em phản vệ?', '["0.5 mg/kg", "0.01 mg/kg, tối đa 0.5 mg/lần", "10 mg", "Theo cân nặng x 1"]'::jsonb, 1, 'Trẻ: 0.01 mg/kg IM, tối đa 0.5 mg/lần.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0104', 'S4.3', 1, 'single_choice', 'Sign-In thực hiện vào thời điểm?', '["Trước rạch da", "Trước khởi mê (entry to OR)", "Cuối ca", "Sáng hôm sau"]'::jsonb, 1, 'Sign-In ở trước khởi mê - kiểm tra danh tính, vị trí, dị ứng, đường thở khó, nguy cơ chảy máu.', '', ARRAY['VB10'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0105', 'S4.3', 2, 'single_choice', 'Trong Time-Out, ai bắt đầu phát biểu giới thiệu?', '["NB", "Bất kỳ thành viên nào của kíp được chỉ định, thường là PTV/GM trưởng", "Người nhà", "Bảo vệ"]'::jsonb, 1, 'Time-Out là quy trình toàn kíp; người chỉ định bắt đầu, mọi thành viên xác nhận.', '', ARRAY['VB10'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0106', 'S4.3', 1, 'single_choice', 'Bộ checklist WHO khuyến cáo dán/in ở đâu?', '["Ngoài hành lang", "Trong phòng mổ, dễ thấy", "Tủ bảo quản", "Phòng thay đồ"]'::jsonb, 1, 'Đặt nơi dễ thấy trong phòng mổ để kíp đọc và xác nhận.', '', ARRAY['VB10'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0107', 'S4.2', 2, 'single_choice', 'Khử khuẩn dụng cụ tiếp xúc niêm mạc (semi-critical) yêu cầu mức?', '["Khử khuẩn mức cao (HLD) hoặc tiệt khuẩn", "Lau cồn", "Để khô", "Chỉ rửa nước"]'::jsonb, 0, 'Spaulding: dụng cụ semi-critical → HLD; critical → tiệt khuẩn.', '', ARRAY['VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0108', 'S4.2', 1, 'single_choice', 'Dụng cụ phẫu thuật xuyên qua da/niêm mạc thuộc loại?', '["Critical", "Semi-critical", "Non-critical", "Không phân loại"]'::jsonb, 0, 'Critical: tiếp xúc mô vô khuẩn → bắt buộc tiệt khuẩn.', '', ARRAY['VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0109', 'S6.2', 1, 'single_choice', 'Năng lực cốt lõi của ĐD phòng mổ KHÔNG bao gồm?', '["Vô khuẩn", "Truyền thông trong kíp", "Kế toán bệnh viện", "An toàn người bệnh"]'::jsonb, 2, 'ĐD phòng mổ tập trung vô khuẩn, an toàn NB, kỹ thuật, truyền thông kíp.', '', ARRAY['VB07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0110', 'S6.2', 2, 'single_choice', 'Trước nhận ca mổ, ĐD phòng mổ cần kiểm tra?', '["Hồ sơ NB, đối chiếu danh tính, vị trí mổ, đồng thuận, dị ứng", "Chỉ tên NB", "Không cần", "Chỉ giấy tờ hành chính"]'::jsonb, 0, 'Bộ kiểm tra trước ca: hồ sơ, danh tính, vị trí, đồng thuận, dị ứng, kết quả XN cần.', '', ARRAY['VB07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0111', 'S2.5', 2, 'single_choice', 'Bàn giao NB từ phòng mổ về hồi tỉnh dùng phương pháp nào?', '["Tự do", "SBAR hoặc theo bộ tiêu chuẩn nội bộ - đầy đủ thông tin GMHS", "Chỉ ký nhận", "Không cần"]'::jsonb, 1, 'Bàn giao có cấu trúc giúp tránh sót thông tin, an toàn NB.', '', ARRAY['CS05','CS06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0112', 'S2.5', 1, 'single_choice', 'Trong bàn giao trực, ai ký xác nhận?', '["Chỉ ĐD trực", "Cả ĐD trực ra và ĐD trực vào", "Chỉ trưởng khoa", "Người nhà"]'::jsonb, 1, 'Bàn giao 2 chiều: cả người ra và vào ký để minh bạch trách nhiệm.', '', ARRAY['CS05','CS06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0113', 'S3.7', 2, 'single_choice', 'Để giảm CAUTI, nguyên tắc đặt sonde tiểu là?', '["Đặt thường quy", "Chỉ đặt khi có chỉ định, rút sớm khi không còn cần", "Để 1 tháng", "Đặt cho NB nằm viện"]'::jsonb, 1, 'Chỉ đặt khi cần và rút sớm là nguyên tắc cốt lõi giảm CAUTI.', '', ARRAY['BK02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0114', 'S3.7', 1, 'single_choice', 'Khi đặt sonde Foley, bơm bóng chèn bao nhiêu mL?', '["1-2 mL", "Theo số ghi trên sonde (thường 5-10 mL nước cất)", "20 mL", "Càng nhiều càng tốt"]'::jsonb, 1, 'Bơm theo dung tích ghi trên sonde, dùng nước cất.', '', ARRAY['BK02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0115', 'S3.3', 2, 'single_choice', 'Trước khi treo túi máu, kiểm tra trên nhãn KHÔNG bao gồm?', '["Mã NB, nhóm máu", "Hạn dùng", "Số lô, kiểm tra rò rỉ - màu sắc", "Hãng sản xuất túi nhựa"]'::jsonb, 3, 'Hãng sản xuất túi không phải tiêu chí tiền truyền; ưu tiên đối chiếu NB-nhóm máu-hạn-tình trạng túi.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0116', 'S3.3', 2, 'single_choice', 'Tốc độ truyền KHC tối đa thường không quá?', '["10 mL/phút", "Hoàn thành trong 4 giờ kể từ lúc xuất kho", "Tùy ý", "30 mL/phút bất kể NB"]'::jsonb, 1, 'Truyền hoàn thành ≤ 4h tránh nhiễm khuẩn và tan máu.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0117', 'S3.1', 2, 'single_choice', 'Lý do bắt buộc đối chứng huyết thanh khi định nhóm ABO?', '["Tăng phí", "Phát hiện sai sót & các nhóm bất thường", "Trang trí", "Không có lý do"]'::jsonb, 1, 'Đối chứng huyết thanh giúp phát hiện sai và các nhóm hiếm/bất thường.', '*', ARRAY['KT01'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0118', 'S3.2', 2, 'single_choice', 'Định nhóm máu cho chế phẩm tiểu cầu/huyết tương khác KHC vì?', '["Cùng quy trình", "Yêu cầu kỹ thuật và đối chứng kháng nguyên/kháng thể khác", "Không khác", "Để giảm chi phí"]'::jsonb, 1, 'Mỗi loại chế phẩm có quy trình định nhóm riêng theo TT cấp máu.', '*', ARRAY['KT02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0119', 'S3.4', 1, 'single_choice', 'Trước rút NKQ, NB cần nằm tư thế?', '["Sấp", "Đầu cao 30-45°", "Trendelenburg", "Bất động cố định"]'::jsonb, 1, 'Tư thế đầu cao thuận lợi rút ống và phòng trào ngược.', '*', ARRAY['KT04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0120', 'S3.4', 2, 'single_choice', 'Sau rút NKQ, theo dõi sát trong tối thiểu?', '["5 phút", "30-60 phút", "Vài giây", "Không cần"]'::jsonb, 1, 'Theo dõi sát ít nhất 30-60 phút - thời gian dễ xuất hiện biến chứng.', '*', ARRAY['KT04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0121', 'S2.2', 1, 'single_choice', 'Đánh giá tình trạng vết mổ ưu tiên các dấu hiệu?', '["Màu áo NB", "Sưng nóng đỏ đau, dịch tiết bất thường, mép vết mổ", "Mùi thức ăn", "Tâm trạng"]'::jsonb, 1, 'Dấu hiệu nhiễm khuẩn vết mổ: SREDA + dịch tiết.', '', ARRAY['CS03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0122', 'S2.2', 2, 'single_choice', 'Sau mổ ổ bụng, vận động sớm trong 24h đầu giúp?', '["Tăng đau", "Giảm huyết khối, liệt ruột, viêm phổi - phục hồi nhanh", "Không có tác dụng", "Tăng nhiễm khuẩn"]'::jsonb, 1, 'ERAS khuyến nghị vận động sớm để giảm biến chứng và rút ngắn ngày nằm viện.', '', ARRAY['CS03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0123', 'S1.1', 1, 'single_choice', 'Bảo mật thông tin NB là?', '["Quyền của ĐD", "Nghĩa vụ pháp lý và đạo đức của nhân viên y tế", "Tùy chọn", "Không cần"]'::jsonb, 1, 'Bảo mật là nghĩa vụ theo Luật KCB và Chuẩn đạo đức.', '', ARRAY['VB06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0124', 'S1.1', 2, 'single_choice', 'Khi NB tỉnh nhưng không hợp tác thủ thuật cấp cứu cứu sinh?', '["Thực hiện luôn", "Đánh giá năng lực ra quyết định, hội chẩn, ghi nhận, tuân thủ pháp lý", "Bỏ qua NB", "Trừng phạt NB"]'::jsonb, 1, 'Quyết định lâm sàng phức tạp - cần hội chẩn và tuân thủ Luật KCB.', '', ARRAY['VB06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0125', 'S6.2', 2, 'single_choice', 'Trong CTĐT ĐD phòng mổ cơ bản, mục tiêu kiến thức KHÔNG bao gồm?', '["Vô khuẩn", "Vai trò ĐD phòng mổ", "Quản lý dụng cụ", "Marketing dịch vụ y tế"]'::jsonb, 3, 'Marketing không thuộc CTĐT ĐD phòng mổ cơ bản.', '', ARRAY['VB07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0126', 'S6.2', 1, 'single_choice', 'Vai trò ĐD lưu động (circulating nurse) trong phòng mổ?', '["Phẫu thuật", "Hỗ trợ kíp mổ ngoài vùng vô khuẩn, đếm dụng cụ, giấy tờ", "Gây mê", "Người ngoài"]'::jsonb, 1, 'Lưu động hỗ trợ ngoài vùng vô khuẩn, đảm bảo cung ứng và an toàn.', '', ARRAY['VB07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0127', 'S4.1', 2, 'single_choice', 'Khi xảy ra phơi nhiễm với máu NB qua kim đâm, ĐD cần?', '["Bỏ qua", "Rửa vùng phơi nhiễm, báo cáo, đánh giá nguồn, cân nhắc PEP theo phác đồ", "Chỉ rửa nước", "Tự xử"]'::jsonb, 1, 'Quy trình xử trí phơi nhiễm: rửa, ép, báo cáo, đánh giá nguồn, PEP nếu cần.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0128', 'S4.1', 1, 'single_choice', 'PPE chuẩn khi đặt NKQ?', '["Chỉ găng", "Khẩu trang chống giọt bắn (N95 nếu khí dung), kính/face shield, găng, áo choàng", "Không cần", "Chỉ áo choàng"]'::jsonb, 1, 'Đặt NKQ là thủ thuật khí dung → cần PPE đầy đủ.', '', ARRAY['DT03','VB09'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0129', 'S4.4', 1, 'single_choice', 'Tem dán VTYT phải có thông tin?', '["Tên người dùng", "Tên VTYT, lô, hạn dùng, đơn vị nhập", "Giá bán", "Không có"]'::jsonb, 1, 'Tem chuẩn gồm tên-lô-hạn-đơn vị để truy xuất.', '', ARRAY['KT07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0130', 'S4.4', 2, 'single_choice', 'VTYT hết hạn cần?', '["Sử dụng nốt", "Loại bỏ theo quy trình KSNK và ghi nhận", "Đem cho khoa khác", "Bỏ qua"]'::jsonb, 1, 'Phải loại bỏ và ghi nhận theo quy định KSNK.', '', ARRAY['KT07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0131', 'S2.3', 1, 'single_choice', 'Đánh giá hồi tỉnh thường mỗi?', '["Mỗi giờ", "Mỗi 5-15 phút trong giai đoạn đầu", "Mỗi 4 giờ", "Khi có triệu chứng"]'::jsonb, 1, 'Theo dõi sát trong giai đoạn hồi tỉnh.', '+', ARRAY['CS07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0132', 'S2.3', 2, 'single_choice', 'Run sau gây mê (post-anesthetic shivering) - xử trí?', '["Bỏ qua", "Ủ ấm chủ động + theo dõi, xem xét pethidine theo chỉ định", "Cho ăn", "Lạnh thêm"]'::jsonb, 1, 'Ủ ấm chủ động + thuốc theo chỉ định BS.', '+', ARRAY['CS07'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0133', 'S2.6', 2, 'single_choice', 'NRS-2002 dùng để?', '["Đánh giá đau", "Sàng lọc nguy cơ dinh dưỡng", "Đánh giá tri giác", "Đo nhiệt độ"]'::jsonb, 1, 'NRS-2002 là công cụ sàng lọc nguy cơ dinh dưỡng cho NB nội trú.', '', ARRAY['CS08'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0134', 'S2.6', 1, 'single_choice', 'Dinh dưỡng cho NB phẫu thuật ung thư cần?', '["Bỏ đói", "Cá thể hóa theo loại ung thư, giai đoạn, dung nạp", "Truyền nhiều", "Không cần đánh giá"]'::jsonb, 1, 'Cá thể hóa theo lâm sàng và dung nạp.', '', ARRAY['CS08'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0135', 'S6.3', 2, 'single_choice', 'Khi đánh giá thực hành theo bảng kiểm, người đánh giá cần?', '["Kiêm thủ thuật", "Quan sát khách quan, ghi điểm theo từng bước, có phản hồi", "Đoán mò", "Trừng phạt"]'::jsonb, 1, 'Đánh giá khách quan + phản hồi xây dựng giúp cải tiến.', '', ARRAY['BK01'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0136', 'S6.3', 1, 'single_choice', 'Bảng kiểm chuẩn hóa giúp?', '["Giảm chất lượng", "Đồng bộ thực hành giữa các ĐD", "Tăng phí", "Không có ý nghĩa"]'::jsonb, 1, 'Đồng bộ thực hành là mục đích chính của bảng kiểm.', '', ARRAY['BK01'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0137', 'S6.1', 1, 'single_choice', 'Theo TT31, ĐD trưởng khoa có nhiệm vụ?', '["Chỉ ký giấy tờ", "Tổ chức, điều hành công tác chăm sóc, đào tạo, kiểm tra", "Phẫu thuật", "Mua thuốc"]'::jsonb, 1, 'ĐD trưởng khoa: tổ chức - điều hành - đào tạo - giám sát chăm sóc.', '', ARRAY['VB04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0138', 'S6.1', 2, 'single_choice', 'Hồ sơ chăm sóc ĐD bao gồm?', '["Chỉ y lệnh", "Phiếu chăm sóc, kế hoạch, theo dõi sinh hiệu, đánh giá - đầy đủ theo TT31", "Thư cá nhân", "Bảng lương"]'::jsonb, 1, 'Hồ sơ chăm sóc đầy đủ theo TT31 là yêu cầu pháp lý.', '', ARRAY['VB04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0139', 'S5.2', 3, 'single_choice', 'NB sau rút NKQ 5 phút, đột ngột phù mặt, tụt HA, mày đay - chẩn đoán ưu tiên?', '["Hạ đường huyết", "Phản vệ", "Đột quỵ", "Nhồi máu cơ tim"]'::jsonb, 1, 'Tam chứng phù-tụt HA-mày đay sau thuốc → nghi phản vệ; xử trí adrenalin IM ngay.', '+', ARRAY['KT03'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0140', 'S2.4', 3, 'single_choice', 'NB thở máy, đột nhiên SpO2 70%, áp lực đường thở tăng, không nghe rì rào phế nang bên phải. Nghĩ đến?', '["Tràn khí màng phổi áp lực", "Tắc đờm thông thường", "Sốt cao", "Đau đầu"]'::jsonb, 0, 'Mất rì rào + Pmax tăng + tụt SpO2 → TKMP áp lực; cần dẫn lưu cấp cứu.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0141', 'S3.5', 1, 'single_choice', 'Vùng vô khuẩn quanh trường mổ phải?', '["Tự do qua lại", "Hạn chế tối đa người và lưu thông không khí", "Mở cửa thường xuyên", "Không quan trọng"]'::jsonb, 1, 'Hạn chế người + lưu thông không khí giảm SSI.', '', ARRAY['KT05'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0142', 'S3.6', 1, 'single_choice', 'Dụng cụ rơi xuống sàn được xử lý?', '["Nhặt lên dùng tiếp", "Coi là nhiễm; thay bằng dụng cụ vô khuẩn khác", "Lau cồn rồi dùng", "Không xử lý"]'::jsonb, 1, 'Dụng cụ rơi sàn = nhiễm; phải thay.', '', ARRAY['KT06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0143', 'S2.1', 2, 'single_choice', 'Trước mổ chương trình, NB hút thuốc lá nên?', '["Hút thêm", "Ngừng càng lâu càng tốt trước mổ (≥4-8 tuần lý tưởng)", "Không liên quan", "Hút trước mổ 1h"]'::jsonb, 1, 'Ngừng hút thuốc trước mổ giảm biến chứng hô hấp và làm lành vết thương tốt hơn.', '', ARRAY['CS01','CS02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0144', 'S1.1', 1, 'single_choice', 'Khi gặp xung đột với đồng nghiệp, ĐD nên?', '["Phớt lờ NB", "Đặt an toàn NB lên trên hết, giải quyết xung đột qua kênh chuyên môn", "Bỏ ca trực", "Cãi nhau giữa NB"]'::jsonb, 1, 'An toàn NB là nguyên tắc đầu tiên; xung đột giải quyết qua kênh chính thức.', '', ARRAY['VB06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0145', 'S4.3', 2, 'single_choice', 'Dấu hiệu nguy hiểm cần tạm ngưng phẫu thuật KHÔNG bao gồm?', '["Sai vị trí mổ phát hiện trong Time-Out", "Mất tín hiệu monitor sinh hiệu", "Phản ứng dị ứng nặng", "Thanh toán hóa đơn chậm"]'::jsonb, 3, 'Vấn đề thanh toán không liên quan an toàn ca mổ.', '', ARRAY['VB10'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0146', 'S5.1', 2, 'single_choice', 'Trong CPR, đường truyền nào được ưu tiên khi không có TM ngoại biên?', '["Tủy xương (intraosseous)", "Đợi đặt TM trung tâm", "Tiêm bắp adrenalin", "Không truyền"]'::jsonb, 0, 'IO line được ưu tiên khi không có TM ngoại biên trong CPR.', '+', ARRAY['VB02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0147', 'S2.4', 2, 'single_choice', 'Khi ngừng an thần để đánh giá weaning, cần?', '["Để máy chạy bình thường", "Đánh giá sẵn sàng theo tiêu chí, theo dõi sát", "Tăng an thần", "Bỏ NB"]'::jsonb, 1, 'Daily awakening + đánh giá weaning là chuẩn hồi sức.', '*', ARRAY['CS04'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0148', 'S2.5', 2, 'single_choice', 'Sau ca mổ, hồ sơ chuyển hồi tỉnh KHÔNG bắt buộc gồm?', '["Sinh hiệu cuối ca", "Diễn biến gây mê và xử trí", "Thuốc đã dùng", "Sở thích âm nhạc"]'::jsonb, 3, 'Hồ sơ tập trung an toàn lâm sàng, không gồm sở thích cá nhân.', '', ARRAY['CS05','CS06'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0149', 'S3.7', 2, 'single_choice', 'Sonde Foley 2 nhánh và 3 nhánh khác nhau ở?', '["Vật liệu", "Số đường dẫn (3 nhánh có thêm đường rửa bàng quang)", "Màu sắc", "Giá thành"]'::jsonb, 1, '3 nhánh có thêm đường rửa bàng quang dùng sau phẫu thuật tiết niệu.', '', ARRAY['BK02'], 'approved') ON CONFLICT (id) DO NOTHING;
INSERT INTO questions (id, skill_id, difficulty, type, question, options, correct_index, explanation, tt32_tag, source_doc_ids, status) VALUES ('Q0150', 'S6.1', 1, 'single_choice', 'Theo TT31, đánh giá ĐD bao gồm?', '["Tự đánh giá", "Đánh giá đa nguồn: tự, ngang hàng, người quản lý", "Chỉ trưởng khoa", "Bệnh nhân"]'::jsonb, 1, 'Đánh giá ĐD nên đa nguồn để khách quan.', '', ARRAY['VB04'], 'approved') ON CONFLICT (id) DO NOTHING;
