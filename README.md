# Trạm ôn tập — nhiều môn học

Không gian ôn trắc nghiệm nhiều môn bằng tiếng Việt. Có sẵn môn Kiểm thử phần mềm với 168 câu và 12 đề để tiếp tục ôn tập.

## Chạy trên máy

1. Máy cần Node.js 20 trở lên. Không cần cài thư viện phụ thuộc.
2. Mở `start-local.cmd`, hoặc chạy `npm start` trong thư mục dự án.
3. Mở **http://127.0.0.1:4173** và giữ cửa sổ máy chủ mở khi dùng.

Xem [hướng dẫn bản local](LOCAL-SERVER.md) để đổi cổng, sao lưu và tìm vị trí tệp.

## Phần quản lý mới

- **Môn học & chương:** thêm, sửa, xóa môn; chia chương, mô tả và đặt ngày kiểm tra.
- **Ngân hàng câu hỏi:** quản lý nội dung, bốn lựa chọn, đáp án đúng, giải thích, nguồn và mức độ; tìm kiếm, lọc chương và phân trang.
- **Quản lý đề:** đặt tên, thời gian 1–180 phút và số câu từng chương. Kiểm tra đủ câu trước khi lưu.
- **Tệp tài liệu:** tải lên, liệt kê, tải xuống và xóa theo môn trên máy chủ local. Hỗ trợ PDF, Office, TXT, CSV, JSON, ảnh và ZIP; tối đa 25 MB mỗi tệp.
- **Sao lưu:** xuất/nhập JSON chứa môn, chương, câu hỏi và đề; kiểm tra dữ liệu và xác nhận trước khi thay thế.
- **Lịch sử:** bài đã làm giữ nguyên nội dung và đáp án dù ngân hàng được sửa hoặc xóa. Giữ 50 lượt gần nhất trong trình duyệt, gồm các môn.

Không có phần tài khoản theo yêu cầu. Máy chủ chỉ nhận kết nối từ chính máy này. Hai cửa sổ lưu cùng lúc sẽ được kiểm tra phiên bản để tránh ghi đè thay đổi mới hơn.

Bản local lưu môn/câu hỏi/đề ở `data/library.json`; tệp ở `data/uploads`, danh sách tệp ở `data/files.json`. Thư mục `data/` được bỏ qua khi đưa mã lên GitHub. Muốn sao lưu đầy đủ thư viện và tệp, dừng máy chủ rồi sao chép toàn bộ thư mục `data/`.

JSON xuất từ giao diện không chứa tệp đính kèm hay lịch sử trình duyệt. Bản website tĩnh lưu thư viện trong trình duyệt; phần tải tệp lên ổ đĩa cần bản chạy bằng `start-local.cmd`.

## Môn Kiểm thử có sẵn

- 168 câu tự biên soạn, có lời giải và nguồn tham chiếu.
- 12 đề cố định; 6 đề đầu của dữ liệu gốc bao phủ 168 câu. Sau khi chỉnh ngân hàng, độ phủ được tính lại từ nội dung hiện có.
- Mỗi đề 30 câu, mỗi bài đúng 6 câu, thời gian 45 phút. Hết giờ tự nộp; thời gian vẫn chạy khi rời trang.
- Đề ngẫu nhiên ưu tiên câu khác lượt thi thử gần nhất, đảo lựa chọn.
- Luyện riêng từng bài: 12 câu, không giới hạn giờ, giải thích sau lần trả lời đầu.
- Tự lưu bài đang làm và lịch sử trên trình duyệt hiện tại.

## Sử dụng trên máy

Mở `dist/index.html` bằng Chrome hoặc Edge. Toàn bộ logic và câu hỏi nằm trong thư mục `dist`; không cần cài thêm thư viện. Phông chữ trực tuyến là tùy chọn, mất mạng sẽ dùng phông hệ thống.

Trong bản ZIP mới, giải nén toàn bộ rồi mở `start-local.cmd` để dùng đầy đủ phần quản lý tệp.

Tiến độ không đồng bộ giữa thiết bị hoặc giữa bản ngoại tuyến và bản trực tuyến. Xóa dữ liệu trình duyệt sẽ xóa lịch sử. Bộ đề phủ các chủ đề chính; không bảo đảm mọi chi tiết của tài liệu và không phải đề thi chính thức.

## Kiểm tra

`npm test` chạy kiểm tra ngân hàng gốc, mô hình nhiều môn, chuyển dữ liệu cũ và API local thật. Kiểm tra trình duyệt bổ sung bằng `node browser-check.cjs` và `node browser-management-check.cjs` trong môi trường có Playwright/Chrome. Đường dẫn trình duyệt của hai công cụ này theo máy phát triển; bản ứng dụng không phụ thuộc chúng.

Các kiểm tra gồm phân bổ câu theo chương, thời lượng tùy chỉnh, lịch sử không đổi sau khi sửa đáp án, nhập/xuất JSON, dữ liệu nhập sai, chống ghi đè giữa hai cửa sổ, tải/xóa tệp, bảo toàn dữ liệu lỗi và bố cục 320–1440px.
