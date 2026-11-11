globalThis.QUESTION_PART_3 = [
  {
    id: 'c3-01', chapter: 3, topic: 'Khái niệm yêu cầu', level: 'Cơ bản',
    question: 'Phát biểu nào mô tả một yêu cầu của phần mềm?',
    options: ['Nhóm dự kiến họp vào sáng thứ Hai.', 'Hệ thống phải cho khách hàng xem số dư tài khoản.', 'Lập trình viên dự kiến dùng hai lớp xử lý.', 'Tester sẽ chạy bộ kiểm thử vào thứ Sáu.'],
    answer: 1, explanation: 'Yêu cầu mô tả dịch vụ hệ thống phải cung cấp hoặc ràng buộc hệ thống phải thỏa mãn. Kế hoạch làm việc và chi tiết thiết kế không phải yêu cầu phần mềm.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 6'
  },
  {
    id: 'c3-02', chapter: 3, topic: 'Tài liệu yêu cầu', level: 'Cơ bản',
    question: 'Sau khi được phê duyệt, tài liệu nào trong Bài 3 được dùng làm đường cơ sở cho kiểm thử?',
    options: ['Biên bản chấm công của nhóm.', 'Danh sách công cụ lập trình.', 'Đặc tả yêu cầu phần mềm (SRS).', 'Kế hoạch nghỉ phép của khách hàng.'],
    answer: 2, explanation: 'SRS mô tả những gì phần mềm phải làm cho lập trình viên và tester; bản đã phê duyệt là đường cơ sở cho kiểm thử.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 8'
  },
  {
    id: 'c3-03', chapter: 3, topic: 'Phân loại yêu cầu', level: 'Cơ bản',
    question: 'Yêu cầu nào sau đây chủ yếu mô tả chức năng của hệ thống ngân hàng?',
    options: ['Khách hàng có thể xuất sao kê thành tệp PDF.', 'Trang sao kê tải trong vòng 2 giây.', 'Hệ thống có độ sẵn sàng 99,9%.', 'Ứng dụng hoạt động trên Chrome, Safari và Edge.'],
    answer: 0, explanation: 'Xuất sao kê PDF mô tả hệ thống làm gì. Thời gian đáp ứng, độ sẵn sàng và tương thích mô tả mức chất lượng hoặc ràng buộc.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 9–10'
  },
  {
    id: 'c3-04', chapter: 3, topic: 'Phân loại yêu cầu', level: 'Vận dụng',
    question: '“95% giao dịch chuyển tiền hoàn tất trong 3 giây khi có 1.000 người dùng đồng thời” chủ yếu thuộc loại yêu cầu nào?',
    options: ['Chức năng xuất dữ liệu.', 'Kế hoạch thực hiện dự án.', 'Thiết kế cấu trúc dữ liệu.', 'Phi chức năng về hiệu năng.'],
    answer: 3, explanation: 'Phát biểu quy định mức hiệu năng cần đạt, cùng ngưỡng và điều kiện đo cụ thể.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 9, 14'
  },
  {
    id: 'c3-05', chapter: 3, topic: 'Yêu cầu phi chức năng', level: 'Vận dụng',
    question: 'Ngân hàng quy định mọi ứng dụng nội bộ phải dùng máy chủ đăng nhập chung của ngân hàng. Theo cách phân loại trong Bài 3, đây là yêu cầu phi chức năng thuộc nhóm nào?',
    options: ['Bên ngoài, vì mọi chính sách đều là luật.', 'Tổ chức, vì xuất phát từ chính sách của ngân hàng.', 'Sản phẩm, vì chỉ đo thời gian phản hồi.', 'Chức năng, vì mọi yêu cầu đăng nhập đều được xếp cùng một nhóm.'],
    answer: 1, explanation: 'Yêu cầu tổ chức bắt nguồn từ quy định, chính sách của tổ chức; ví dụ trong slide là phải dùng máy chủ đăng nhập của ngân hàng.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 10'
  },
  {
    id: 'c3-06', chapter: 3, topic: 'Chất lượng yêu cầu', level: 'Cơ bản',
    question: 'Một yêu cầu chỉ có một cách hiểu thể hiện đặc tính chất lượng nào?',
    options: ['Đầy đủ (complete).', 'Truy vết được (traceable).', 'Không mơ hồ (unambiguous).', 'Nhất quán (consistent).'],
    answer: 2, explanation: 'Không mơ hồ nghĩa là chỉ có một nghĩa có thể hiểu. Đầy đủ là không thiếu nội dung; nhất quán là không mâu thuẫn; truy vết được là có mã và nguồn.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 12'
  },
  {
    id: 'c3-07', chapter: 3, topic: 'Yêu cầu kiểm thử được', level: 'Vận dụng',
    question: 'Cách sửa nào giúp yêu cầu “Tìm giao dịch phải nhanh” trở nên kiểm thử được rõ nhất?',
    options: ['“95% lượt tìm kiếm trả kết quả trong 2 giây khi có 500 người dùng đồng thời trên bộ dữ liệu 100.000 giao dịch.”', '“Tìm giao dịch phải thật nhanh và hiện đại.”', '“Hệ thống thường tìm giao dịch nhanh khi có thể.”', '“Nhóm sẽ cố gắng tối ưu việc tìm giao dịch.”'],
    answer: 0, explanation: 'Yêu cầu kiểm thử được cần xác định đại lượng đo, giới hạn và điều kiện đo để kết luận đạt hay không đạt.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 13–14'
  },
  {
    id: 'c3-08', chapter: 3, topic: 'Review đặc tả', level: 'Vận dụng',
    question: 'Đặc tả máy tính ghi “hỗ trợ số tối đa 30 chữ số” nhưng không nói có tính phần thập phân hay không. Vấn đề được minh họa trong review log là gì?',
    options: ['Lỗi tính toán đã được chứng minh bằng chạy chương trình.', 'Vi phạm quy tắc đặt tên biến.', 'Lỗi giao tiếp giữa hai hàm.', 'Yêu cầu mơ hồ, cần làm rõ cách đếm chữ số.'],
    answer: 3, explanation: 'Cụm “30 chữ số” có thể được hiểu theo nhiều cách. Tester cần ghi anomaly và hỏi khách hàng, chưa tự quyết định cách hiểu.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 60, 63'
  },
  {
    id: 'c3-09', chapter: 3, topic: 'Phân loại anomaly', level: 'Vận dụng',
    question: 'Đặc tả chuyển tiền không nêu hệ thống xử lý thế nào sau khi người dùng nhập sai OTP ba lần. Loại anomaly phù hợp nhất là gì?',
    options: ['Mâu thuẫn (contradiction).', 'Thiếu sót (omission).', 'Không khả thi (infeasible).', 'Sai thứ tự tham số (interface).'],
    answer: 1, explanation: 'Một trường hợp xử lý quan trọng chưa được quy định là thiếu sót. Chưa có hai yêu cầu trái nhau để kết luận mâu thuẫn.',
    source: 'SOTE_W03_Practice • mục 4.2 Các loại anomaly'
  },
  {
    id: 'c3-10', chapter: 3, topic: 'Phân loại anomaly', level: 'Vận dụng',
    question: 'R1 quy định hạn mức chuyển tiền mỗi ngày là 50 triệu đồng; R2 quy định cũng chính hạn mức đó là 100 triệu đồng cho cùng nhóm khách hàng và cùng điều kiện. Đây là vấn đề gì?',
    options: ['Chỉ thiếu mã định danh.', 'Một yêu cầu hiệu năng chưa đo được.', 'Mâu thuẫn giữa các yêu cầu.', 'Một lỗi chỉ có thể tìm bằng phân tích tĩnh mã nguồn.'],
    answer: 2, explanation: 'Hai quy định không thể cùng đúng trong cùng tình huống nên chúng không nhất quán và cần được làm rõ.',
    source: 'SOTE_W03_Practice • mục 4.2 Các loại anomaly'
  },
  {
    id: 'c3-11', chapter: 3, topic: 'Test condition', level: 'Vận dụng',
    question: 'Mô tả nào là test condition thay vì các bước của một test case?',
    options: ['Sau lỗi chia cho 0, focus nằm ở ô nhập số thứ hai.', 'Nhập 5 vào ô thứ nhất rồi nhấn phím Tab.', 'Nhập 0, chọn Chia và nhấn Tính.', 'Mở trình duyệt, tải trang máy tính và ghi phiên bản.'],
    answer: 0, explanation: 'Test condition xác định điều cần kiểm thử. Dữ liệu cụ thể và chuỗi thao tác chi tiết thuộc test case.',
    source: 'SOTE_W03_Practice • mục 5 Test condition và RTM'
  },
  {
    id: 'c3-12', chapter: 3, topic: 'Use case', level: 'Vận dụng',
    question: 'Use case chuyển tiền có luồng ngoại lệ “số dư không đủ: hiện thông báo lỗi”. Khi rút kiểm thử từ use case, cần làm gì với luồng này?',
    options: ['Bỏ qua vì đã có kiểm thử luồng thành công.', 'Chỉ kiểm tra cấu trúc cơ sở dữ liệu.', 'Gộp vào ghi chú và không cần kết quả mong đợi.', 'Thiết kế ít nhất một kiểm thử tiêu cực cho luồng ngoại lệ.'],
    answer: 3, explanation: 'Mỗi luồng ngoại lệ cung cấp ít nhất một kiểm thử tiêu cực; chỉ kiểm tra happy path sẽ bỏ sót hành vi lỗi.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 17–18'
  },
  {
    id: 'c3-13', chapter: 3, topic: 'Use case', level: 'Cơ bản',
    question: 'Trong use case chuyển tiền, hậu điều kiện “số dư của hai tài khoản được cập nhật” giúp tester xác định điều gì?',
    options: ['Ai điều phối cuộc review.', 'Những gì cần kiểm tra sau khi thực hiện xong.', 'Ngôn ngữ lập trình bắt buộc phải dùng.', 'Thời gian bắt đầu cuộc họp nhóm.'],
    answer: 1, explanation: 'Hậu điều kiện mô tả trạng thái cần đạt sau use case, vì vậy nó là cơ sở cho các kiểm tra ở cuối ca kiểm thử.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 17–18'
  },
  {
    id: 'c3-14', chapter: 3, topic: 'User story và INVEST', level: 'Cơ bản',
    question: 'Chữ T trong INVEST nhắc người viết user story chú ý điều gì?',
    options: ['Story phải có công cụ tự động hóa riêng.', 'Story phải viết bằng thuật ngữ kỹ thuật.', 'Story phải kiểm thử được.', 'Story phải mô tả bảng dữ liệu.'],
    answer: 2, explanation: 'T là Testable. Tiêu chí chấp nhận phải đủ rõ để xác định việc thực hiện story đạt hay không đạt.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 19; SOTE_W03_Practice • mục 8'
  },
  {
    id: 'c3-15', chapter: 3, topic: 'Tiêu chí chấp nhận', level: 'Vận dụng',
    question: 'Trong “Given đã chuyển tiền đến tài khoản X; When chọn Lưu người nhận; Then X có trong danh sách sau khi giao dịch hoàn tất”, phần Then đóng vai trò gì?',
    options: ['Kết quả quan sát được cần đạt.', 'Điều kiện ban đầu trước thao tác.', 'Tên người chịu trách nhiệm lập trình.', 'Mô tả thiết kế máy chủ.'],
    answer: 0, explanation: 'Given nêu bối cảnh, When nêu hành động và Then nêu kết quả mong đợi có thể xác minh.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 20'
  },
  {
    id: 'c3-16', chapter: 3, topic: 'RTM và độ bao phủ', level: 'Vận dụng',
    question: 'Trong RTM, REQ-09 chưa có test condition và chưa có test case nào. Kết luận đúng nhất là gì?',
    options: ['Yêu cầu đã Passed vì chưa có kiểm thử nào thất bại.', 'Yêu cầu chắc chắn không có lỗi.', 'Yêu cầu đã được kiểm thử động đầy đủ.', 'Yêu cầu chưa được bao phủ bởi kiểm thử.'],
    answer: 3, explanation: 'Không có kiểm thử truy vết đến yêu cầu là thiếu bao phủ. Không thể suy ra Passed hoặc chất lượng tốt chỉ từ việc chưa chạy kiểm thử.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 25–26'
  },
  {
    id: 'c3-17', chapter: 3, topic: 'RTM và phân tích ảnh hưởng', level: 'Vận dụng',
    question: 'Hạn mức trong REQ-05 đổi từ 50 triệu thành 80 triệu đồng. RTM hỗ trợ trực tiếp việc nào?',
    options: ['Tự sửa toàn bộ mã nguồn mà không cần xem lại.', 'Tìm các test condition và test case liên quan để cập nhật.', 'Chứng minh mọi kiểm thử cũ đều còn đúng.', 'Thay thế việc hỏi rõ yêu cầu mới.'],
    answer: 1, explanation: 'Các liên kết truy vết từ yêu cầu đến kiểm thử giúp phân tích ảnh hưởng khi yêu cầu thay đổi.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 26'
  },
  {
    id: 'c3-18', chapter: 3, topic: 'Kiểm thử tĩnh và động', level: 'Cơ bản',
    question: 'Điểm phân biệt cốt lõi giữa kiểm thử tĩnh và kiểm thử động là gì?',
    options: ['Kiểm thử tĩnh chỉ dành cho tài liệu giấy.', 'Kiểm thử động không cần kết quả mong đợi.', 'Kiểm thử tĩnh không thực thi sản phẩm đang kiểm tra; kiểm thử động cần chạy phần mềm.', 'Kiểm thử tĩnh luôn dùng công cụ, kiểm thử động luôn làm thủ công.'],
    answer: 2, explanation: 'Kiểm thử tĩnh gồm review bởi con người và phân tích tĩnh bằng công cụ, không cần thực thi sản phẩm. Kiểm thử động quan sát phần mềm khi chạy.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 28'
  },
  {
    id: 'c3-19', chapter: 3, topic: 'Đối tượng kiểm thử tĩnh', level: 'Cơ bản',
    question: 'Nhóm muốn kiểm thử tĩnh trước khi phần mềm chạy được. Sản phẩm công việc nào có thể được review?',
    options: ['Kế hoạch kiểm thử và các test case đã viết.', 'Chỉ tệp thực thi đang chạy trong bộ nhớ.', 'Chỉ số đo độ trễ thu được khi chạy tải thực tế.', 'Chỉ ảnh chụp lỗi sau khi triển khai.'],
    answer: 0, explanation: 'Yêu cầu, thiết kế, mã nguồn, kế hoạch, test case và nhiều tài liệu khác đều có thể được kiểm thử tĩnh.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 29'
  },
  {
    id: 'c3-20', chapter: 3, topic: 'Giá trị của kiểm thử tĩnh', level: 'Cơ bản',
    question: 'Phát biểu nào mô tả đúng cách kiểm thử tĩnh và động phát hiện vấn đề?',
    options: ['Kiểm thử tĩnh chỉ tìm lỗi chính tả, không tìm lỗi logic.', 'Kiểm thử động trực tiếp nhìn thấy mọi dòng code bị lỗi.', 'Kiểm thử tĩnh thay thế hoàn toàn kiểm thử động.', 'Kiểm thử tĩnh có thể tìm khuyết tật trực tiếp; kiểm thử động bộc lộ thất bại rồi mới tìm nguyên nhân.'],
    answer: 3, explanation: 'Review có thể phát hiện trực tiếp yêu cầu mâu thuẫn hoặc code sai. Kiểm thử động cho thấy hành vi thất bại; hai cách bổ sung cho nhau.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 28, 31'
  },
  {
    id: 'c3-21', chapter: 3, topic: 'Quy trình review', level: 'Cơ bản',
    question: 'Theo quy trình review trong Bài 3, hoạt động nào diễn ra trước bước thảo luận và phân tích chung?',
    options: ['Tác giả tự xóa mọi anomaly khỏi log.', 'Mỗi reviewer đọc riêng và ghi lại anomaly, câu hỏi.', 'Nhóm bắt buộc sửa toàn bộ code ngay trong cuộc họp.', 'Manager xếp hạng năng lực từng người.'],
    answer: 1, explanation: 'Sau lập kế hoạch và khởi động là review cá nhân; các phát hiện được đưa vào bước thảo luận và phân tích.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 35; SOTE_W03_Practice • mục 4.1'
  },
  {
    id: 'c3-22', chapter: 3, topic: 'Anomaly và khuyết tật', level: 'Vận dụng',
    question: 'Một reviewer ghi rằng cách tính phí “có vẻ sai”, nhưng đặc tả còn chưa rõ. Nhóm nên xử lý phát hiện này thế nào?',
    options: ['Kết luận ngay tác giả viết sai và sửa theo ý reviewer.', 'Bỏ khỏi log vì chưa chứng minh được lỗi.', 'Ghi anomaly rồi cùng phân tích hoặc làm rõ để xác định có phải khuyết tật không.', 'Đánh dấu mọi test case liên quan là Passed.'],
    answer: 2, explanation: 'Anomaly là điều bất thường hoặc câu hỏi cần xem xét, không tự động là khuyết tật. Nhóm cần phân tích bằng cơ sở phù hợp.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 35'
  },
  {
    id: 'c3-23', chapter: 3, topic: 'Vai trò trong review', level: 'Cơ bản',
    question: 'Ai chịu trách nhiệm ghi nhận anomaly và các quyết định trong cuộc review?',
    options: ['Scribe (người ghi chép).', 'Author (tác giả), chỉ khi đang sửa code.', 'Manager, chỉ khi phê duyệt ngân sách.', 'Khách hàng, dù không tham dự cuộc họp.'],
    answer: 0, explanation: 'Scribe ghi các phát hiện và quyết định; moderator điều phối, reviewer tìm anomaly, còn tác giả tạo và sửa sản phẩm.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 37'
  },
  {
    id: 'c3-24', chapter: 3, topic: 'Vai trò trong review', level: 'Cơ bản',
    question: 'Một cuộc review bắt đầu tranh luận cá nhân và kéo dài quá giờ. Vai trò nào trực tiếp điều phối để cuộc họp an toàn và đúng thời gian?',
    options: ['Người dùng cuối.', 'Người triển khai hệ thống.', 'Người viết yêu cầu nghiệp vụ.', 'Moderator (người điều phối).'],
    answer: 3, explanation: 'Moderator điều hành cuộc họp, giữ môi trường trao đổi phù hợp và quản lý thời gian.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 37'
  },
  {
    id: 'c3-25', chapter: 3, topic: 'Các loại review', level: 'Vận dụng',
    question: 'Tác giả dẫn dắt nhóm đi qua một đặc tả mới để chia sẻ hiểu biết và thống nhất cách hiểu. Loại review phù hợp nhất là gì?',
    options: ['Inspection do moderator được đào tạo dẫn dắt.', 'Walkthrough do tác giả dẫn dắt.', 'Kiểm thử tải do tester hiệu năng dẫn dắt.', 'Phân tích tĩnh tự động bằng trình biên dịch.'],
    answer: 1, explanation: 'Walkthrough do tác giả dẫn dắt, thường hướng đến chia sẻ kiến thức và đạt hiểu biết chung.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 38–39'
  },
  {
    id: 'c3-26', chapter: 3, topic: 'Các loại review', level: 'Cơ bản',
    question: 'Trong bốn loại review của Bài 3, loại nào có mức hình thức cao nhất và được dẫn dắt bởi moderator đã được đào tạo?',
    options: ['Informal review.', 'Walkthrough.', 'Inspection.', 'Desk-checking bởi tác giả.'],
    answer: 2, explanation: 'Inspection là loại review có mức hình thức cao nhất trong danh sách, tập trung tìm nhiều khuyết tật và có moderator được đào tạo.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 38'
  },
  {
    id: 'c3-27', chapter: 3, topic: 'Lựa chọn review', level: 'Vận dụng',
    question: 'Nhóm cần thảo luận để quyết định giữa hai phương án thiết kế cơ sở dữ liệu. Theo ví dụ trong bài, loại review nào phù hợp nhất?',
    options: ['Technical review.', 'Walkthrough chỉ để giới thiệu tài liệu.', 'Chạy kiểm thử chấp nhận với dữ liệu sản xuất.', 'Desk-checking chỉ do một tác giả tự làm.'],
    answer: 0, explanation: 'Technical review hướng đến giải quyết và quyết định các vấn đề kỹ thuật, như lựa chọn thiết kế cơ sở dữ liệu.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 38–39'
  },
  {
    id: 'c3-28', chapter: 3, topic: 'Checklist review', level: 'Vận dụng',
    question: 'Reviewer phát hiện lỗi không có trong checklist. Cách xử lý đúng là gì?',
    options: ['Bỏ qua vì checklist quyết định toàn bộ phạm vi lỗi.', 'Chỉ ghi nếu lỗi khiến chương trình không biên dịch.', 'Sửa checklist rồi hủy review log cũ.', 'Vẫn ghi nhận lỗi, dùng nhóm Other khi phù hợp và cân nhắc bổ sung checklist.'],
    answer: 3, explanation: 'Checklist không bao giờ đầy đủ. Phát hiện ngoài checklist vẫn cần ghi lại; loại lỗi mới có thể giúp cải tiến checklist.',
    source: 'SOTE_W03_Code_Inspection_Checklist • Cách dùng; SOTE_W03_Requirements_and_Static_Testing • trang 40'
  },
  {
    id: 'c3-29', chapter: 3, topic: 'Review hiệu quả', level: 'Cơ bản',
    question: 'Cách làm nào hỗ trợ một cuộc review hiệu quả?',
    options: ['Dùng số lỗi tìm thấy để xếp hạng con người.', 'Chuẩn bị trước, tập trung phát hiện vấn đề và để tác giả sửa sau cuộc họp.', 'Đọc càng nhiều tài liệu càng tốt mà không cần thời gian chuẩn bị.', 'Dành toàn bộ cuộc họp để viết lại code ngay.'],
    answer: 1, explanation: 'Review cần mục tiêu rõ, phần việc nhỏ, thời gian chuẩn bị và sự trao đổi về sản phẩm. Cuộc họp tìm lỗi; việc sửa được thực hiện sau.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 45'
  },
  {
    id: 'c3-30', chapter: 3, topic: 'Cảnh báo phân tích tĩnh', level: 'Vận dụng',
    question: 'Công cụ phân tích tĩnh cảnh báo một đoạn code có thể có lỗi. Tester nên làm gì trước khi kết luận?',
    options: ['Coi mọi cảnh báo là lỗi đã được xác nhận.', 'Tắt toàn bộ quy tắc để không còn cảnh báo.', 'Đọc quy tắc và ngữ cảnh, đánh giá lỗi thật hay báo nhầm; ghi lý do nếu là false positive.', 'Chỉ quan tâm cảnh báo đặt tên biến và bỏ qua cảnh báo bảo mật.'],
    answer: 2, explanation: 'Cảnh báo là anomaly và có thể là báo nhầm. Cần đánh giá ngữ cảnh, ưu tiên vấn đề nghiêm trọng và giải thích khi đánh dấu false positive.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 54; SOTE_W03_Practice • mục 7.2'
  },
  {
    id: 'c3-31', chapter: 3, topic: 'Bất thường luồng dữ liệu', level: 'Cơ bản',
    question: 'Trong ký hiệu luồng dữ liệu của Bài 3, ~u biểu thị tình huống nào?',
    options: ['Biến được sử dụng trước khi được định nghĩa giá trị.', 'Giá trị được định nghĩa rồi dùng đúng một lần.', 'Biến được giải phóng sau khi dùng.', 'Hai biến khác tên có cùng giá trị.'],
    answer: 0, explanation: '~ là chưa tồn tại giá trị được định nghĩa, u là sử dụng. ~u cảnh báo sử dụng biến trước khi nó có giá trị.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 49–51'
  },
  {
    id: 'c3-32', chapter: 3, topic: 'Bất thường luồng dữ liệu', level: 'Vận dụng',
    question: 'Đoạn lệnh “x = 1; x = 2; print(x);” minh họa bất thường nào theo Bài 3?',
    options: ['~u, vì x chưa từng được định nghĩa.', 'dk, vì x bị hủy trước khi sử dụng.', 'Lỗi giao tiếp do truyền sai đơn vị.', 'dd, vì giá trị đầu bị định nghĩa đè trước khi được sử dụng.'],
    answer: 3, explanation: 'Hai phép gán liên tiếp tạo mẫu dd; giá trị 1 không được sử dụng trước khi bị ghi đè bởi 2.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 49, 55'
  },
  {
    id: 'c3-33', chapter: 3, topic: 'Độ phức tạp chu trình', level: 'Vận dụng',
    question: 'Một hàm có ba câu lệnh if đơn giản, mỗi if là một quyết định, không có quyết định khác. Theo công thức trong Bài 3, V(G) bằng bao nhiêu?',
    options: ['3.', '4.', '6.', '8.'],
    answer: 1, explanation: 'Theo công thức V(G) = số quyết định + 1, ba quyết định cho V(G) = 3 + 1 = 4.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 52, 55'
  },
  {
    id: 'c3-34', chapter: 3, topic: 'Review luồng điều khiển', level: 'Vận dụng',
    question: 'Hàm tính phí có “if amount >= 10_000_000: return 5_000; elif amount >= 50_000_000: return 10_000”. Với amount = 50_000_000, vấn đề nào được phát hiện khi lần vết bằng tay?',
    options: ['Nhánh elif trả về 10.000 trước nhánh if.', 'Hai nhánh cùng được thực thi và phí là 15.000.', 'Nhánh đầu đã trả về 5.000 nên nhánh phí 10.000 không thể được chọn.', 'Không thể đánh giá nếu chưa chạy công cụ kiểm thử tải.'],
    answer: 2, explanation: 'Mọi giá trị từ 50 triệu trở lên cũng thỏa điều kiện từ 10 triệu. Nhánh đầu return ngay nên nhánh elif không thể tới được.',
    source: 'SOTE_W03_Requirements_and_Static_Testing • trang 41'
  },
  {
    id: 'c3-35', chapter: 3, topic: 'Checklist thanh tra mã nguồn', level: 'Vận dụng',
    question: 'Hàm khai báo transfer(from, to, amount) nhưng nơi gọi lại truyền transfer(to, from, amount). Nhóm checklist phù hợp nhất là gì?',
    options: ['Interface: thứ tự tham số khi gọi không khớp ý nghĩa khai báo.', 'Data declaration: độ dài chuỗi chưa đủ.', 'Computation: phép chia có thể chia cho 0.', 'Input/output: tệp chưa được đóng.'],
    answer: 0, explanation: 'Kiểm tra interface xem số lượng, thứ tự, kiểu và đơn vị tham số có khớp giữa lời gọi với khai báo hay không.',
    source: 'SOTE_W03_Code_Inspection_Checklist • phần B6 Interface'
  },
  {
    id: 'c3-36', chapter: 3, topic: 'Checklist tính toán', level: 'Vận dụng',
    question: 'Lập trình viên muốn chia toàn bộ tử số cho 2a nhưng viết “(-b - sqrt(delta)) / 2 * a”. Theo checklist, cần chú ý vấn đề nào?',
    options: ['Số tham số truyền cho sqrt luôn bị thiếu.', 'Biến a chắc chắn chưa khai báo.', 'Tệp đầu vào chắc chắn chưa mở.', 'Thứ tự ưu tiên và kết hợp phép toán: cần mẫu số được nhóm thành (2 * a).'],
    answer: 3, explanation: 'Phép nhân và chia cùng mức ưu tiên, được kết hợp từ trái sang phải. Biểu thức hiện tại chia cho 2 rồi nhân a, khác với chia cho (2 * a).',
    source: 'SOTE_W03_Code_Inspection_Checklist • phần B3 Computation'
  }
];
