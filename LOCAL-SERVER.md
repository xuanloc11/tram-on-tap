# Dùng Trạm ôn tập trên máy của bạn

1. Cài Node.js 20 trở lên nếu máy chưa có.
2. Mở `start-local.cmd`, hoặc mở cửa sổ lệnh trong thư mục dự án và chạy `npm start`.
3. Vào `http://127.0.0.1:4173` bằng Chrome hoặc Edge. Giữ cửa sổ máy chủ mở trong lúc dùng.

Nếu cổng 4173 đã được dùng, có thể chọn cổng khác bằng biến môi trường `PORT` trước khi chạy. Máy chủ chỉ nhận kết nối từ chính máy này, không mở ra mạng LAN hoặc Internet.

## Dữ liệu và tệp

- Môn học, chương, câu hỏi và đề thi được lưu tại `data/library.json`.
- Tệp đã tải lên nằm trong `data/uploads`; danh sách tệp nằm tại `data/files.json`.
- Hỗ trợ PDF, DOCX, PPTX, XLSX, TXT, CSV, JSON, PNG, JPG và ZIP; tối đa 25 MB mỗi tệp.
- Tệp được tải xuống dưới dạng tệp đính kèm. Hệ thống không chạy hoặc tự chuyển tệp thành câu hỏi.
- Muốn xóa một môn có tệp, hãy xóa các tệp của môn đó trước. Việc thay thế thư viện cũng giữ nguyên quy tắc này để tránh mất liên kết tệp.
- Thư mục `data` không được đưa lên GitHub. Để sao lưu đầy đủ, dừng máy chủ và sao chép toàn bộ thư mục `data`; file JSON xuất từ giao diện chỉ chứa môn, chương, câu hỏi và đề thi, không chứa tệp đính kèm hoặc lịch sử cá nhân của trình duyệt.

Không có chức năng tài khoản theo yêu cầu. Bất kỳ ai sử dụng trình duyệt trên máy này khi máy chủ đang mở đều có thể quản lý dữ liệu. Bản website được lưu trữ trên Internet không có quyền ghi tệp vào máy bạn; muốn dùng phần quản lý tệp, hãy mở bản chạy ở địa chỉ localhost bên trên.

## Giao tiếp với giao diện

Các phản hồi JSON lỗi có dạng `{ "error": "Thông báo tiếng Việt" }`.

| Yêu cầu | Dữ liệu | Kết quả |
| --- | --- | --- |
| `GET /api/library` | Không có | `{ library, revision }`; cả hai bằng `null` khi chưa có file thư viện |
| `PUT /api/library` | JSON `{ library: ..., expectedRevision: ... }`, tối đa 5 MB | `{ saved: true, revision }`; kiểm tra toàn bộ dữ liệu và phiên bản trước khi ghi |
| `GET /api/files?subjectId=...` | Bỏ `subjectId` để lấy toàn bộ | `{ files: [...] }` |
| `POST /api/files?subjectId=...&name=...` | Nội dung nhị phân trực tiếp, tên được mã hóa URL | HTTP 201 `{ file: ... }` |
| `GET /api/files/<id>` | Mã tệp từ danh sách | Tải xuống nội dung gốc; có hỗ trợ HEAD |
| `DELETE /api/files/<id>` | Mã tệp từ danh sách | `{ deleted: true }` |

Metadata của một tệp gồm `id`, `subjectId`, `name`, `size` (byte), `type` và `createdAt`. Máy chủ tự sinh mã tệp, không dùng tên do người dùng nhập làm đường dẫn lưu trữ. Thư viện không hợp lệ trả 422, tệp quá lớn trả 413, xóa môn có tệp trả 409; dữ liệu hiện có bị lỗi trả 500 và được giữ nguyên để khôi phục.

Mỗi phản hồi có header `X-Tram-Local: 1` để giao diện nhận diện đúng máy chủ này. `revision` là mã SHA-256 của nội dung thư viện. Khi lưu, giao diện gửi lại mã đã đọc gần nhất trong `expectedRevision`; nếu cửa sổ khác đã sửa, máy chủ trả 409 và giữ nguyên dữ liệu mới hơn. File thư viện đã tồn tại nhưng chứa JSON `null` cũng được xem là lỗi dữ liệu và không bị ghi đè tự động.
