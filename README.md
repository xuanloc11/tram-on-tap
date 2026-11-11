# Trạm ôn tập — Kiểm thử phần mềm

Website bằng tiếng Việt, theo Bài 1–5 trong tài liệu môn học đã cung cấp; có cập nhật PDF Bài 4.

- 168 câu tự biên soạn, có lời giải và nguồn tham chiếu.
- 12 đề cố định; 6 đề đầu bao phủ toàn bộ ngân hàng câu hỏi. Các đề sau phối hợp lại câu hỏi để củng cố.
- Mỗi đề 30 câu, mỗi bài đúng 6 câu, thời gian 45 phút. Hết giờ tự nộp; thời gian vẫn chạy khi rời trang.
- Đề ngẫu nhiên ưu tiên câu khác lượt thi thử gần nhất, đảo lựa chọn.
- Luyện riêng từng bài: 12 câu, không giới hạn giờ, giải thích sau lần trả lời đầu.
- Tự lưu bài đang làm và 30 kết quả gần nhất trên trình duyệt hiện tại.

## Sử dụng trên máy

Mở `dist/index.html` bằng Chrome hoặc Edge. Toàn bộ logic và câu hỏi nằm trong thư mục `dist`; không cần cài thêm thư viện. Phông chữ trực tuyến là tùy chọn, mất mạng sẽ dùng phông hệ thống.

Trong bản ZIP dùng ngoại tuyến, mở `index.html` ngay sau khi giải nén toàn bộ thư mục.

Tiến độ không đồng bộ giữa thiết bị hoặc giữa bản ngoại tuyến và bản trực tuyến. Xóa dữ liệu trình duyệt sẽ xóa lịch sử. Bộ đề phủ các chủ đề chính; không bảo đảm mọi chi tiết của tài liệu và không phải đề thi chính thức.

## Kiểm tra

`node test.cjs` kiểm tra cấu trúc câu hỏi, phân bổ 6 câu/bài, 12 đề riêng biệt, 6 đề đầu phủ toàn bộ câu hỏi, đảo đáp án, chấm điểm, đồng hồ và dữ liệu lưu.

`browser-check.cjs` là bài kiểm tra trình duyệt cho môi trường máy đang xây dựng. Đã kiểm tra luồng thi thử 30 câu, chấm 10/10, khôi phục bài, đánh dấu, nộp/hủy, tự nộp khi popup mở, luyện bài, lịch sử, xem lại và bố cục 320–1440px.
