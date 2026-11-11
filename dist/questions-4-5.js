globalThis.QUESTION_PART_45 = [
  {
    "id": "c4-01",
    "chapter": 4,
    "topic": "Test case mức thấp",
    "level": "Cơ bản",
    "question": "Điểm nào làm một test case trở thành test case mức thấp có thể thực thi ngay?",
    "options": [
      "Có dữ liệu cụ thể, các bước rõ ràng và kết quả mong đợi quan sát được",
      "Chỉ nêu tên chức năng cần kiểm thử",
      "Chỉ liệt kê các rủi ro của sản phẩm",
      "Chỉ ghi tên người thiết kế và ngày tạo"
    ],
    "answer": 0,
    "explanation": "Test case mức thấp phải cho người khác đủ dữ liệu, các bước và kết quả mong đợi để chạy mà không cần hỏi thêm.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 6–10"
  },
  {
    "id": "c4-02",
    "chapter": 4,
    "topic": "Kết quả mong đợi",
    "level": "Cơ bản",
    "question": "Khi thiết kế test case cho máy tính đơn giản, nên xác định Expected result từ đâu?",
    "options": [
      "Từ kết quả chương trình đang hiển thị khi chạy thử",
      "Từ đặc tả và những giả định đã được ghi rõ",
      "Từ kết quả phổ biến nhất trong các lần chạy",
      "Từ ý kiến của người lập trình sau khi test đã Fail"
    ],
    "answer": 1,
    "explanation": "Expected result lấy từ đặc tả. Lấy chính kết quả của chương trình làm chuẩn có thể hợp thức hóa lỗi của chương trình.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 14"
  },
  {
    "id": "c4-03",
    "chapter": 4,
    "topic": "Giả định khi đặc tả chưa rõ",
    "level": "Vận dụng",
    "question": "Đặc tả chưa rõ có chấp nhận dấu phẩy thập phân hay không. Cách ghi test case phù hợp với bài thực hành là gì?",
    "options": [
      "Tự chọn một cách hiểu và không ghi lại",
      "Bỏ toàn bộ các test case liên quan đến số thực",
      "Ghi giả định trong Notes và liên kết mã anomaly đã phát hiện",
      "Chạy thử rồi coi cách chương trình xử lý là yêu cầu chính thức"
    ],
    "answer": 2,
    "explanation": "Phần chưa rõ cần được ghi thành giả định kèm mã anomaly, để kết quả kiểm thử có cơ sở và có thể điều chỉnh khi yêu cầu được làm rõ.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 58; SOTE_W04_Practice • Task 1a"
  },
  {
    "id": "c4-04",
    "chapter": 4,
    "topic": "Phạm vi một test case",
    "level": "Vận dụng",
    "question": "Một test case vừa kiểm tra chia cho 0, vừa kiểm tra hủy thoát chương trình. Cách cải thiện phù hợp nhất là gì?",
    "options": [
      "Thêm kiểm tra phép nhân để tăng độ bao phủ",
      "Bỏ Expected result để người chạy linh hoạt",
      "Chỉ chạy test case khi cả hai chức năng đã đúng",
      "Tách thành hai test case, mỗi test case gắn với một test condition"
    ],
    "answer": 3,
    "explanation": "Mỗi test case nên tập trung vào một condition, giúp xác định rõ kết quả và nguyên nhân khi thất bại.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 17"
  },
  {
    "id": "c4-05",
    "chapter": 4,
    "topic": "Truy vết test case",
    "level": "Cơ bản",
    "question": "Trong bài thực hành Tuần 4, hai thông tin nào liên kết trực tiếp một test case với cơ sở thiết kế của nó?",
    "options": [
      "Req ID và Test condition ID",
      "Written by và Date",
      "Status và Actual result",
      "Owner và Risk level"
    ],
    "answer": 0,
    "explanation": "Req ID chỉ yêu cầu liên quan; Test condition ID chỉ điều kiện kiểm thử mà test case được thiết kế để kiểm tra.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 10 và 58"
  },
  {
    "id": "c4-06",
    "chapter": 4,
    "topic": "Trạng thái Pass",
    "level": "Vận dụng",
    "question": "Test case yêu cầu hiện kết quả 12 và ô kết quả không cho chỉnh sửa. Chương trình đáp ứng đầy đủ hai điều này. Trạng thái nào phù hợp?",
    "options": [
      "Blocked",
      "Pass",
      "Fail",
      "Not covered"
    ],
    "answer": 1,
    "explanation": "Pass khi kết quả thực tế phù hợp đầy đủ với kết quả mong đợi, bao gồm cả hành vi không cho sửa ô kết quả.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 19; Specifications for the Simple Calculator program"
  },
  {
    "id": "c4-07",
    "chapter": 4,
    "topic": "Trạng thái Fail",
    "level": "Vận dụng",
    "question": "Khi chia 7 cho 0, chương trình hiện thông báo lỗi nhưng focus vẫn ở nút Tính thay vì ô số thứ hai như đặc tả. Test case nên có trạng thái gì?",
    "options": [
      "Pass vì đã hiện lỗi",
      "Blocked vì phép chia không thực hiện được",
      "Fail vì một phần kết quả mong đợi không được đáp ứng",
      "Not covered vì chưa có số hợp lệ"
    ],
    "answer": 2,
    "explanation": "Đặc tả yêu cầu cả thông báo lỗi và focus ở ô số thứ hai. Thiếu một hành vi đã đủ để đánh dấu Fail.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 19; Specifications for the Simple Calculator program"
  },
  {
    "id": "c4-08",
    "chapter": 4,
    "topic": "Trạng thái Blocked",
    "level": "Vận dụng",
    "question": "Một test case chưa thể thực thi vì môi trường kiểm thử không khởi động được. Chưa quan sát được hành vi cần kiểm tra. Trạng thái nào phù hợp?",
    "options": [
      "Pass vì chưa tìm thấy lỗi",
      "Fail vì chức năng chắc chắn sai",
      "Passed ở mức yêu cầu",
      "Blocked"
    ],
    "answer": 3,
    "explanation": "Blocked dùng khi không thể chạy test case do yếu tố bên ngoài hoặc lỗi khác chặn việc thực thi, nên chưa thể so sánh hành vi mục tiêu.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 19"
  },
  {
    "id": "c4-09",
    "chapter": 4,
    "topic": "Giữ độc lập kết quả mong đợi",
    "level": "Vận dụng",
    "question": "Chạy test case cho kết quả khác Expected result. Người chạy nên làm gì trước tiên?",
    "options": [
      "Ghi chính xác Actual result và đánh dấu Fail nếu không khớp",
      "Sửa Expected result cho giống chương trình",
      "Xóa test case để không ảnh hưởng báo cáo",
      "Đánh dấu Pass nếu kết quả trông hợp lý"
    ],
    "answer": 0,
    "explanation": "Phải giữ chuẩn từ đặc tả, ghi lại điều quan sát được và xác định trạng thái theo sự khác biệt. Không sửa chuẩn chỉ để test Pass.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 19"
  },
  {
    "id": "c4-10",
    "chapter": 4,
    "topic": "Actual result",
    "level": "Vận dụng",
    "question": "Expected result là hiện thông báo lỗi và chuyển focus vào ô số thứ hai. Thực tế chỉ hiện lỗi. Cách ghi Actual result nào hữu ích nhất?",
    "options": [
      "Không đúng",
      "Hiện thông báo lỗi; focus vẫn ở nút Tính, không chuyển vào ô số thứ hai",
      "As expected",
      "Có vấn đề ở phần giao diện"
    ],
    "answer": 1,
    "explanation": "Khi kết quả khác mong đợi, Actual result cần mô tả cụ thể thông báo, giá trị hoặc vị trí focus để người khác tái hiện và phân tích.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 11 và 14"
  },
  {
    "id": "c4-11",
    "chapter": 4,
    "topic": "Tiền điều kiện và cô lập test",
    "level": "Cơ bản",
    "question": "Vì sao bài thực hành yêu cầu tải lại SimpleCalculator.html trước mỗi test case?",
    "options": [
      "Để tự động sửa mọi lỗi tính toán",
      "Để thay đổi Expected result theo lần chạy mới",
      "Để đưa chương trình về trạng thái ban đầu và giảm ảnh hưởng từ test trước",
      "Để mọi test case luôn có trạng thái Pass"
    ],
    "answer": 2,
    "explanation": "Khởi tạo lại trạng thái giúp các test case ít phụ thuộc lẫn nhau và kết quả có thể tái hiện ổn định hơn.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 59"
  },
  {
    "id": "c4-12",
    "chapter": 4,
    "topic": "Ngoại suy ước lượng",
    "level": "Vận dụng",
    "question": "Nhóm mất 4 giờ để thiết kế 20 test case có độ phức tạp tương tự. Nếu dùng ngoại suy đơn giản, thiết kế thêm 60 test case như vậy cần khoảng bao lâu?",
    "options": [
      "4 giờ",
      "8 giờ",
      "12 giờ",
      "60 giờ"
    ],
    "answer": 2,
    "explanation": "Tốc độ đo được là 20 test case / 4 giờ = 5 test case mỗi giờ. Ngoại suy cho 60 test case: 60 / 5 = 12 giờ, với giả định độ phức tạp và tốc độ tương tự.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 37–38"
  },
  {
    "id": "c4-13",
    "chapter": 4,
    "topic": "RTM và trạng thái yêu cầu",
    "level": "Vận dụng",
    "question": "Yêu cầu R3 có ba test case: hai Pass và một Fail. Theo quy tắc RTM trong bài thực hành, trạng thái R3 là gì?",
    "options": [
      "Failed",
      "Passed",
      "Not covered",
      "Pass vì đa số test case đã Pass"
    ],
    "answer": 0,
    "explanation": "Một yêu cầu có ít nhất một test case Fail được ghi Failed, không quyết định theo đa số test case.",
    "source": "SOTE_W04_Practice • Task 1b, cập nhật RTM"
  },
  {
    "id": "c4-14",
    "chapter": 4,
    "topic": "Test procedure và test suite",
    "level": "Cơ bản",
    "question": "Phân biệt nào đúng giữa test procedure và test suite?",
    "options": [
      "Procedure gom nhóm test; suite chỉ lưu lỗi",
      "Procedure nêu thứ tự thực thi; suite gom các test chạy cùng nhau",
      "Procedure chỉ dùng cho unit test; suite chỉ dùng cho UI test",
      "Hai thuật ngữ đều chỉ một kết quả mong đợi"
    ],
    "answer": 1,
    "explanation": "Procedure quy định thứ tự chạy các test; suite nhóm những test thường thực hiện cùng nhau, như smoke suite hoặc regression suite.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 7"
  },
  {
    "id": "c4-15",
    "chapter": 4,
    "topic": "Khoảng trống bao phủ",
    "level": "Vận dụng",
    "question": "Trong RTM, R8 chưa được liên kết với bất kỳ test case nào. Theo bài thực hành, nên ghi trạng thái gì?",
    "options": [
      "Passed vì chưa có test case Fail",
      "Failed vì chắc chắn có lỗi",
      "Not covered",
      "Pass tạm thời"
    ],
    "answer": 2,
    "explanation": "Not covered thể hiện yêu cầu chưa có test case. Không có bằng chứng kiểm thử không đồng nghĩa với yêu cầu đã đạt.",
    "source": "SOTE_W04_Practice • Task 1b, cập nhật RTM"
  },
  {
    "id": "c4-16",
    "chapter": 4,
    "topic": "Exit criteria",
    "level": "Vận dụng",
    "question": "Điều kiện nào là exit criterion phù hợp để đánh giá kết thúc kiểm thử?",
    "options": [
      "Máy kiểm thử đã được cài đặt",
      "Bản build vừa vượt qua smoke test",
      "Đã phân công người viết test case",
      "Đã đạt mục tiêu bao phủ, chạy các test đã lên kế hoạch và không còn lỗi nghiêm trọng mở"
    ],
    "answer": 3,
    "explanation": "Exit criteria trả lời việc kiểm thử đã đủ để kết thúc chưa. Độ bao phủ, test đã thực thi, lỗi nghiêm trọng và rủi ro còn lại là các tiêu chí trong slide.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 29–30"
  },
  {
    "id": "c4-17",
    "chapter": 4,
    "topic": "Kiểm thử tiêu cực",
    "level": "Vận dụng",
    "question": "Test case nào là kiểm thử tiêu cực cho máy tính đơn giản?",
    "options": [
      "Nhập chữ abc vào ô số thứ nhất rồi chuyển focus",
      "Cộng hai số dương hợp lệ",
      "Trừ hai số âm hợp lệ",
      "Nhân hai số thực hợp lệ"
    ],
    "answer": 0,
    "explanation": "Nhập ký tự không phải số kiểm tra khả năng từ chối dữ liệu không hợp lệ. Các trường hợp tính toán với dữ liệu hợp lệ là kiểm thử tích cực.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 16"
  },
  {
    "id": "c4-18",
    "chapter": 4,
    "topic": "Kiểm thử ô kết quả",
    "level": "Vận dụng",
    "question": "Sau khi tính đúng 8 + 4 = 12, người dùng sửa trực tiếp ô kết quả thành 99 được. Nhận xét nào đúng theo đặc tả?",
    "options": [
      "Pass vì phép cộng đã đúng",
      "Fail vì ô kết quả phải không thể sửa đổi",
      "Blocked vì người dùng đã thay đổi dữ liệu",
      "Không thuộc phạm vi kiểm thử chức năng"
    ],
    "answer": 1,
    "explanation": "Ngoài tính toán đúng, đặc tả còn yêu cầu ô kết quả không thể sửa đổi trong bất kỳ trường hợp nào.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 58; Specifications for the Simple Calculator program"
  },
  {
    "id": "c4-19",
    "chapter": 4,
    "topic": "Preconditions và test data",
    "level": "Vận dụng",
    "question": "Với test chuyển tiền, thông tin nào là precondition thay vì test data?",
    "options": [
      "Số tài khoản nhận sẽ nhập",
      "Số tiền chuyển sẽ nhập",
      "Khách hàng đã đăng nhập và có số dư 10.000.000 đồng",
      "Mã OTP sẽ nhập ở bước xác nhận"
    ],
    "answer": 2,
    "explanation": "Precondition là trạng thái phải có trước khi bắt đầu. Tài khoản nhận, số tiền và OTP là các giá trị đưa vào khi thực thi.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 10 và 13"
  },
  {
    "id": "c4-20",
    "chapter": 4,
    "topic": "Entry criteria",
    "level": "Vận dụng",
    "question": "Điều kiện nào là entry criterion cho việc bắt đầu một vòng kiểm thử?",
    "options": [
      "Mọi test dự kiến đều đã thực thi",
      "Không còn lỗi Critical đang mở sau vòng test",
      "Rủi ro còn lại đã được chấp nhận để phát hành",
      "Môi trường, công cụ và con người đã sẵn sàng; build đã qua smoke test"
    ],
    "answer": 3,
    "explanation": "Entry criteria xác định đã có thể bắt đầu chưa. Slide đưa ra sự sẵn sàng của môi trường, nguồn lực, test case và build qua smoke test.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 29"
  },
  {
    "id": "c4-21",
    "chapter": 4,
    "topic": "Definition of Ready và Done",
    "level": "Cơ bản",
    "question": "Theo slide, Definition of Ready và Definition of Done tương ứng với điều gì ở mức user story?",
    "options": [
      "Ready tương ứng entry criteria; Done tương ứng exit criteria",
      "Ready là Actual result; Done là Expected result",
      "Ready là rủi ro sản phẩm; Done là rủi ro dự án",
      "Ready là test suite; Done là test data"
    ],
    "answer": 0,
    "explanation": "DoR xác định story đã rõ, nhỏ và kiểm thử được để bắt đầu; DoD xác định story hoàn thành khi đã review, test đạt và đáp ứng tiêu chí.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 31"
  },
  {
    "id": "c4-22",
    "chapter": 4,
    "topic": "Thiết kế Expected result cụ thể",
    "level": "Vận dụng",
    "question": "Với test data số thứ nhất = 7, số thứ hai = 0, phép chia, Expected result nào phù hợp nhất?",
    "options": [
      "Chương trình chạy đúng",
      "Hiện thông báo lỗi và đặt focus vào ô số thứ hai để nhập lại",
      "Ô kết quả hiển thị vô cực",
      "Chương trình tự đổi phép chia thành phép cộng"
    ],
    "answer": 1,
    "explanation": "Kết quả mong đợi phải quan sát được và đúng đặc tả: có thông báo lỗi khi số chia bằng 0, đồng thời chuyển focus về ô số thứ hai.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 14 và 58; Specifications for the Simple Calculator program"
  },
  {
    "id": "c4-23",
    "chapter": 4,
    "topic": "Ước lượng theo tỷ lệ",
    "level": "Vận dụng",
    "question": "Theo dữ liệu lịch sử của nhóm, công sức kiểm thử bằng 40% công sức phát triển. Nếu phát triển được ước lượng 50 ngày công, công sức kiểm thử ước tính là bao nhiêu?",
    "options": [
      "10 ngày công",
      "40 ngày công",
      "50 ngày công",
      "20 ngày công"
    ],
    "answer": 3,
    "explanation": "Ước lượng theo tỷ lệ: 50 × 40% = 20 ngày công. Tỷ lệ này là giả định dựa trên dữ liệu của nhóm trong tình huống, không phải hằng số cho mọi dự án.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 38"
  },
  {
    "id": "c4-24",
    "chapter": 4,
    "topic": "Ước lượng ba điểm",
    "level": "Vận dụng",
    "question": "Ước lượng ba điểm có a = 4, m = 6 và b = 14 ngày công. Theo E = (a + 4m + b) / 6, công sức kỳ vọng là bao nhiêu?",
    "options": [
      "6 ngày công",
      "8 ngày công",
      "4 ngày công",
      "7 ngày công"
    ],
    "answer": 3,
    "explanation": "E = (4 + 4 × 6 + 14) / 6 = 42 / 6 = 7 ngày công. Độ lệch chuẩn theo slide là (14 − 4) / 6 ≈ 1,67 ngày công.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 39–40"
  },
  {
    "id": "c4-25",
    "chapter": 4,
    "topic": "Wideband Delphi",
    "level": "Cơ bản",
    "question": "Quy trình nào mô tả đúng Wideband Delphi trong ước lượng kiểm thử?",
    "options": [
      "Các chuyên gia ước lượng riêng, thảo luận rồi lặp lại để điều chỉnh",
      "Chọn ngẫu nhiên một số ngày và không được sửa",
      "Lấy thời hạn bàn giao làm công sức thực hiện",
      "Chỉ nhân số test case với số lỗi đã phát hiện"
    ],
    "answer": 0,
    "explanation": "Wideband Delphi dựa trên ý kiến chuyên gia: ước lượng độc lập, trao đổi chênh lệch và lặp lại. Slide xem Planning Poker là một hình thức của phương pháp này.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 38"
  },
  {
    "id": "c4-26",
    "chapter": 4,
    "topic": "Phạm vi test plan",
    "level": "Cơ bản",
    "question": "Phần Scope của test plan trong bài thực hành cần có nội dung nào?",
    "options": [
      "Chỉ liệt kê phần sẽ kiểm thử",
      "Liệt kê phần kiểm thử, phần không kiểm thử và lý do cho phần ngoài phạm vi",
      "Chỉ ghi tên thành viên của nhóm",
      "Chỉ nêu mục tiêu đạt 100% test case Pass"
    ],
    "answer": 1,
    "explanation": "Scope phải rõ cả phần trong và ngoài phạm vi; nội dung ngoài phạm vi cần có lý do để các bên hiểu giới hạn của kế hoạch.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 24–26; SOTE_W04_Practice • Task 2, Scope"
  },
  {
    "id": "c4-27",
    "chapter": 4,
    "topic": "Chiến lược kiểm thử",
    "level": "Cơ bản",
    "question": "Một dòng trong phần Test levels and test types của bản nháp test plan nên mô tả gì?",
    "options": [
      "Chỉ tên công cụ muốn học trong tương lai",
      "Chỉ kết quả thực tế của test case gần nhất",
      "Mục đích, người kiểm thử, cách kiểm thử và thời điểm cho cấp độ hoặc loại kiểm thử sẽ thực hiện",
      "Chỉ danh sách yêu cầu bị lỗi"
    ],
    "answer": 2,
    "explanation": "Bài thực hành yêu cầu lấy cấp độ và loại kiểm thử từ ma trận Tuần 2, rồi ghi rõ mục đích, ai làm, làm thế nào và khi nào.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 27–28"
  },
  {
    "id": "c4-28",
    "chapter": 4,
    "topic": "Rủi ro sản phẩm và dự án",
    "level": "Vận dụng",
    "question": "Nội dung nào thuộc rủi ro sản phẩm thay vì rủi ro dự án?",
    "options": [
      "Thành viên kiểm thử nghỉ việc",
      "Nhóm nộp bài trễ hạn",
      "Máy kiểm thử chưa được mua đúng lịch",
      "Chương trình tính sai số tiền phải thanh toán"
    ],
    "answer": 3,
    "explanation": "Tính sai tiền là vấn đề chất lượng và hành vi của sản phẩm. Thiếu người, trễ hạn hoặc thiếu thiết bị theo lịch là các rủi ro liên quan việc thực hiện dự án.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 43"
  },
  {
    "id": "c4-29",
    "chapter": 4,
    "topic": "Tính mức rủi ro",
    "level": "Vận dụng",
    "question": "Một rủi ro có khả năng xảy ra L = 2 và tác động I = 3. Theo công thức trong bài thực hành, Level bằng bao nhiêu?",
    "options": [
      "6",
      "5",
      "3",
      "2"
    ],
    "answer": 0,
    "explanation": "Level = L × I = 2 × 3 = 6. Không cộng hai giá trị với nhau.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 42 và 48"
  },
  {
    "id": "c4-30",
    "chapter": 4,
    "topic": "Ưu tiên theo rủi ro",
    "level": "Vận dụng",
    "question": "Nếu ưu tiên chỉ theo Level = L × I, rủi ro nào cần được chú ý trước trong bốn rủi ro sau?",
    "options": [
      "L = 1, I = 3",
      "L = 3, I = 3",
      "L = 2, I = 2",
      "L = 3, I = 1"
    ],
    "answer": 1,
    "explanation": "Các mức lần lượt là 3, 9, 4 và 3. Rủi ro L = 3, I = 3 có Level cao nhất là 9.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 42 và 49"
  },
  {
    "id": "c4-31",
    "chapter": 4,
    "topic": "Đáp ứng rủi ro bằng kiểm thử",
    "level": "Vận dụng",
    "question": "Rủi ro là chức năng chia không xử lý số chia bằng 0. Test response nào cụ thể và phù hợp nhất?",
    "options": [
      "Test kỹ hơn khi có thời gian",
      "Nhắc cả nhóm cẩn thận",
      "Chạy phép chia với số chia bằng 0, kiểm tra thông báo lỗi và focus ở ô số thứ hai",
      "Tăng số người họp nhưng không thay đổi hoạt động kiểm thử"
    ],
    "answer": 2,
    "explanation": "Đáp ứng rủi ro cần chỉ ra cách kiểm thử nhắm trực tiếp vào rủi ro, thay vì viết chung chung như “test kỹ”.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 47–48; Specifications for the Simple Calculator program"
  },
  {
    "id": "c4-32",
    "chapter": 4,
    "topic": "Tháp kiểm thử",
    "level": "Cơ bản",
    "question": "Cấu trúc nào phù hợp với test pyramid trong slide?",
    "options": [
      "Nhiều UI test chậm ở đáy, rất ít unit test ở đỉnh",
      "Chỉ có API test và không có mức nào khác",
      "Mọi loại test đều phải có số lượng bằng nhau",
      "Nhiều unit test nhanh ở đáy, một số service/API test và ít UI/end-to-end test ở đỉnh"
    ],
    "answer": 3,
    "explanation": "Tháp kiểm thử ưu tiên nhiều test nhanh ở mức unit, một số test service/API và ít test UI/end-to-end vốn chậm hơn.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 51"
  },
  {
    "id": "c4-33",
    "chapter": 4,
    "topic": "Các bước và kết quả mong đợi",
    "level": "Cơ bản",
    "question": "Cách trình bày nào giúp đối chiếu hành vi trong một test case rõ nhất?",
    "options": [
      "Đánh số Steps và đánh số Expected result khớp với từng bước cần kiểm tra",
      "Ghi mọi bước trong Title và để trống các cột còn lại",
      "Chỉ ghi một kết quả chung là “đúng”",
      "Đặt Test data vào cột Executed by"
    ],
    "answer": 0,
    "explanation": "Đánh số tương ứng giúp người chạy biết kết quả cần quan sát ở mỗi bước và báo lại chính xác bước bị lỗi.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 10 và 14; SOTE_W04_Practice • Task 1a"
  },
  {
    "id": "c4-34",
    "chapter": 4,
    "topic": "Trạng thái Not run",
    "level": "Vận dụng",
    "question": "Test case đã được viết đủ dữ liệu và Expected result nhưng chưa thực thi lần nào. Trạng thái phù hợp là gì?",
    "options": [
      "Pass",
      "Not run",
      "Fail",
      "Blocked vì mọi test chưa chạy đều bị chặn"
    ],
    "answer": 1,
    "explanation": "Not run nghĩa là chưa thực thi. Blocked chỉ dùng khi không thể chạy do môi trường hoặc lỗi khác; không thể kết luận Pass chỉ từ thiết kế test case.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 19"
  },
  {
    "id": "c4-35",
    "chapter": 4,
    "topic": "Testing quadrants",
    "level": "Cơ bản",
    "question": "Theo testing quadrants trong slide, nhóm hoạt động nào thuộc Q3: hướng nghiệp vụ và đánh giá sản phẩm?",
    "options": [
      "Unit test và integration test trong CI",
      "Đo số câu lệnh đã được thực thi",
      "Exploratory testing, usability testing và UAT",
      "Chỉ kiểm tra cấu trúc cơ sở dữ liệu"
    ],
    "answer": 2,
    "explanation": "Slide đặt exploratory, usability và UAT ở Q3, hướng nghiệp vụ để đánh giá sản phẩm. Q1 hỗ trợ nhóm về mặt công nghệ, như unit và integration test trong CI.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 52"
  },
  {
    "id": "c4-36",
    "chapter": 4,
    "topic": "Đặt tên test case",
    "level": "Vận dụng",
    "question": "Title nào mô tả mục tiêu test case rõ nhất?",
    "options": [
      "Test chức năng",
      "Kiểm tra chương trình",
      "Test 01",
      "Chia cho 0 hiển thị thông báo lỗi"
    ],
    "answer": 3,
    "explanation": "Title cụ thể nêu tình huống và hành vi mong đợi, giúp hiểu mục tiêu test case ngay khi đọc danh sách.",
    "source": "SOTE_W04_Test_Cases_and_Test_Plans • trang 12"
  },
  {
    "id": "c5-01",
    "chapter": 5,
    "topic": "Kỹ thuật hộp đen",
    "level": "Cơ bản",
    "question": "Kỹ thuật kiểm thử hộp đen chủ yếu dựa trên cơ sở nào?",
    "options": [
      "Đặc tả và hành vi mong đợi của hệ thống",
      "Cấu trúc câu lệnh bên trong mã nguồn",
      "Số lần một vòng lặp được thực thi",
      "Sơ đồ gọi hàm nội bộ duy nhất"
    ],
    "answer": 0,
    "explanation": "Hộp đen dùng đặc tả và hành vi quan sát được để chọn test; kỹ thuật hộp trắng dựa trên mã và cấu trúc nội bộ.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 7"
  },
  {
    "id": "c5-02",
    "chapter": 5,
    "topic": "Các họ kỹ thuật kiểm thử",
    "level": "Cơ bản",
    "question": "Nhận xét nào đúng về ba họ kỹ thuật hộp đen, hộp trắng và dựa trên kinh nghiệm?",
    "options": [
      "Chỉ được chọn một họ cho toàn bộ dự án",
      "Chúng bổ sung cho nhau và có thể dùng trong cùng dự án",
      "Hộp đen thay thế hoàn toàn hai họ còn lại",
      "Hộp trắng chỉ dựa vào sự phỏng đoán của tester"
    ],
    "answer": 1,
    "explanation": "Mỗi họ khai thác một cơ sở khác nhau. Tài liệu nhấn mạnh chúng bổ sung cho nhau trong các dự án thực tế.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 7"
  },
  {
    "id": "c5-03",
    "chapter": 5,
    "topic": "Phân lớp tương đương",
    "level": "Cơ bản",
    "question": "Giả định cốt lõi của phân lớp tương đương là gì?",
    "options": [
      "Mọi giá trị đầu vào đều cần một test riêng",
      "Chỉ dữ liệu hợp lệ mới có khả năng gây lỗi",
      "Các giá trị trong cùng một lớp được kỳ vọng có hành vi xử lý tương đương",
      "Mọi lỗi đều xuất hiện đúng tại giá trị giữa khoảng"
    ],
    "answer": 2,
    "explanation": "EP gom các giá trị có hành vi kỳ vọng tương đương và chọn đại diện. Đây là giả định, nên có thể bổ sung BVA để kiểm tra các biên.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 10"
  },
  {
    "id": "c5-04",
    "chapter": 5,
    "topic": "Chất lượng phân lớp",
    "level": "Cơ bản",
    "question": "Một tập lớp tương đương được thiết kế đúng cần thỏa điều kiện nào?",
    "options": [
      "Mọi lớp đều phải chứa cùng số lượng giá trị",
      "Chỉ có đúng một lớp không hợp lệ",
      "Các lớp được phép chồng lấn tùy ý",
      "Các lớp không chồng lấn và không rỗng"
    ],
    "answer": 3,
    "explanation": "Một giá trị không nên rơi vào nhiều lớp mâu thuẫn; mỗi lớp phải có ít nhất một giá trị có thể dùng làm đại diện.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 11"
  },
  {
    "id": "c5-05",
    "chapter": 5,
    "topic": "Lớp hợp lệ",
    "level": "Vận dụng",
    "question": "Quy tắc tuyển dụng quy định tuổi 0–15: không thuê; 16–17: bán thời gian; 18–54: toàn thời gian; 55–99: không thuê. Vì sao lớp 0–15 vẫn là lớp hợp lệ?",
    "options": [
      "Vì đây là đầu vào thuộc miền đặc tả và hệ thống có hành vi hợp lệ là từ chối tuyển",
      "Vì mọi ứng viên trong lớp này đều được thuê",
      "Vì lớp hợp lệ chỉ xét tuổi có phải số chẵn hay không",
      "Vì không thuê luôn có nghĩa là chương trình bị lỗi"
    ],
    "answer": 0,
    "explanation": "Hợp lệ của đầu vào không có nghĩa là kết quả phải chấp thuận người dùng. Đặc tả có thể xử lý hợp lệ bằng quyết định không thuê.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 11–12"
  },
  {
    "id": "c5-06",
    "chapter": 5,
    "topic": "Chọn đại diện EP",
    "level": "Vận dụng",
    "question": "Ô số lượng chỉ nhận số nguyên từ 1 đến 8. Nếu chỉ xét ba lớp: nhỏ hơn 1, từ 1 đến 8, lớn hơn 8, bộ nào đạt đủ EP với ít test nhất?",
    "options": [
      "1 và 8",
      "0, 4 và 9",
      "1, 2, 3 và 4",
      "0, 1, 8 và 9"
    ],
    "answer": 1,
    "explanation": "Ba lớp cần ít nhất ba đại diện. 0 đại diện lớp thấp hơn miền, 4 đại diện miền hợp lệ và 9 đại diện lớp cao hơn miền.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 14 và 17"
  },
  {
    "id": "c5-07",
    "chapter": 5,
    "topic": "Độ bao phủ EP",
    "level": "Vận dụng",
    "question": "Tester xác định 8 lớp tương đương, gồm 6 lớp hợp lệ và 2 lớp không hợp lệ. Test chỉ đi qua cả 6 lớp hợp lệ. EP coverage bằng bao nhiêu?",
    "options": [
      "100%",
      "25%",
      "75%",
      "80%"
    ],
    "answer": 2,
    "explanation": "EP coverage = số lớp đã kiểm tra / tổng số lớp = 6/8 = 75%. Phải tính cả các lớp không hợp lệ.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 17 và 52"
  },
  {
    "id": "c5-08",
    "chapter": 5,
    "topic": "Each Choice",
    "level": "Cơ bản",
    "question": "Tiêu chí Each Choice yêu cầu điều gì khi có nhiều đầu vào?",
    "options": [
      "Kiểm tra mọi tổ hợp của mọi giá trị đầu vào",
      "Chỉ chọn một lớp hợp lệ cho cả hệ thống",
      "Chỉ dùng các giá trị tại biên",
      "Mỗi lớp của từng đầu vào phải được sử dụng ít nhất một lần"
    ],
    "answer": 3,
    "explanation": "Each Choice bảo đảm từng lớp của từng trường được chạm tới, nhưng không yêu cầu bao phủ mọi tổ hợp giữa các trường.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 17"
  },
  {
    "id": "c5-09",
    "chapter": 5,
    "topic": "Tránh che khuất lỗi đầu vào",
    "level": "Vận dụng",
    "question": "Một test nạp tiền có số điện thoại sai, mệnh giá sai và chưa chọn phương thức thanh toán. Ứng dụng dừng ngay ở lỗi số điện thoại. Cách thiết kế nào giúp kiểm tra riêng hai lỗi còn lại?",
    "options": [
      "Mỗi test chỉ làm sai một đầu vào, giữ các đầu vào còn lại hợp lệ",
      "Làm sai thêm tên người nhận trong cùng test",
      "Lặp lại đúng test này nhiều lần",
      "Chỉ kiểm tra số điện thoại vì đó là lỗi xuất hiện trước"
    ],
    "answer": 0,
    "explanation": "Một giá trị không hợp lệ có thể chặn các kiểm tra sau. Tách từng đầu vào sai giúp quan sát phản ứng đối với từng lớp không hợp lệ.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 16"
  },
  {
    "id": "c5-10",
    "chapter": 5,
    "topic": "Danh sách giá trị hợp lệ",
    "level": "Vận dụng",
    "question": "Mệnh giá nạp tiền chỉ được chọn trong 6 giá trị cố định. Theo hướng dẫn trong slide về danh sách hợp lệ ngắn, nên kiểm tra thế nào?",
    "options": [
      "Chỉ thử giá trị nhỏ nhất",
      "Thử cả 6 giá trị hợp lệ, đồng thời có test cho giá trị không được hỗ trợ",
      "Chỉ thử trung bình cộng của 6 giá trị",
      "Chỉ thử một giá trị ngoài danh sách"
    ],
    "answer": 1,
    "explanation": "Slide khuyến nghị kiểm tra toàn bộ nếu danh sách giá trị hợp lệ ngắn. Cũng cần xem phản ứng khi nhận giá trị không hợp lệ.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 14 và 16"
  },
  {
    "id": "c5-11",
    "chapter": 5,
    "topic": "EP cho phương trình",
    "level": "Vận dụng",
    "question": "Với phương trình Ax² + Bx + C = 0, đầu vào A = 1, B = 2, C = 1 thuộc lớp kết quả nào?",
    "options": [
      "Vô số nghiệm",
      "Không có nghiệm thực",
      "Có một nghiệm kép",
      "Có hai nghiệm thực phân biệt"
    ],
    "answer": 2,
    "explanation": "A khác 0 và Δ = B² − 4AC = 4 − 4 = 0, nên phương trình có một nghiệm kép.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 13"
  },
  {
    "id": "c5-12",
    "chapter": 5,
    "topic": "Phạm vi áp dụng BVA",
    "level": "Cơ bản",
    "question": "Loại phân lớp nào phù hợp để áp dụng phân tích giá trị biên?",
    "options": [
      "Các màu không có thứ tự như đỏ, xanh, vàng",
      "Các nhãn phòng ban không có thứ tự",
      "Các mã quốc gia được xem như danh mục thuần túy",
      "Các lớp có thứ tự như số lượng, ngày tháng hoặc độ dài"
    ],
    "answer": 3,
    "explanation": "BVA dựa vào biên và giá trị lân cận, nên cần các lớp có thứ tự để xác định gần biên là gì.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 20 và 26"
  },
  {
    "id": "c5-13",
    "chapter": 5,
    "topic": "BVA 2 giá trị",
    "level": "Vận dụng",
    "question": "Tuổi hợp lệ là các số nguyên từ 18 đến 60. Theo quy ước 2-value BVA trong slide, bộ nào đủ bao phủ các biên của khoảng này?",
    "options": [
      "17, 18, 60, 61",
      "18, 19, 59, 60",
      "16, 19, 59, 62",
      "0, 30, 100"
    ],
    "answer": 0,
    "explanation": "Cần hai cặp hai phía biên: 17–18 ở đầu dưới và 60–61 ở đầu trên.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 21–22 và 50"
  },
  {
    "id": "c5-14",
    "chapter": 5,
    "topic": "BVA 3 giá trị theo slide",
    "level": "Vận dụng",
    "question": "Theo quy ước 3-value BVA của slide Tuần 5, khoảng số nguyên hợp lệ 100–500 cần bộ giá trị nào khi xét biên của cả lớp hợp lệ và không hợp lệ?",
    "options": [
      "99, 100, 500, 501",
      "98, 99, 100, 101, 499, 500, 501, 502",
      "99, 100, 101, 499, 500, 501",
      "100, 300, 500"
    ],
    "answer": 1,
    "explanation": "Slide xét các biên 99, 100, 500, 501 và lân cận hai phía, gộp trùng thành 8 giá trị. Đây là quy ước của tài liệu môn học.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 22 và 51"
  },
  {
    "id": "c5-15",
    "chapter": 5,
    "topic": "Sức mạnh của BVA 3 giá trị",
    "level": "Vận dụng",
    "question": "Đặc tả chấp nhận x ≤ 10 nhưng mã chỉ chấp nhận x == 10. Test x = 10 và x = 11 đều chưa lộ lỗi. Giá trị nào bổ sung trực tiếp làm lộ lỗi này?",
    "options": [
      "12",
      "20",
      "9",
      "11.5"
    ],
    "answer": 2,
    "explanation": "x = 9 phải được chấp nhận theo x ≤ 10, nhưng mã x == 10 lại từ chối. Đây là ví dụ cho thấy thêm láng giềng phía trong có thể phát hiện lỗi.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 23"
  },
  {
    "id": "c5-16",
    "chapter": 5,
    "topic": "Bước lân cận BVA",
    "level": "Vận dụng",
    "question": "Một trường tiền tệ dùng độ chính xác 0,01 và chấp nhận tối đa 100,00. Giá trị ngay phía ngoài biên trên là gì?",
    "options": [
      "100,10",
      "101,00",
      "99,99",
      "100,01"
    ],
    "answer": 3,
    "explanation": "Láng giềng phụ thuộc độ chia nhỏ hợp lệ. Với bước 0,01, ngay trên 100,00 là 100,01.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 21"
  },
  {
    "id": "c5-17",
    "chapter": 5,
    "topic": "Số test Robust BVA",
    "level": "Vận dụng",
    "question": "Áp dụng công thức Robust BVA = 6n + 1 trong slide cho 4 đầu vào độc lập. Cần bao nhiêu test?",
    "options": [
      "25",
      "17",
      "24",
      "625"
    ],
    "answer": 0,
    "explanation": "Thay n = 4 vào 6n + 1: 6 × 4 + 1 = 25 test.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 27"
  },
  {
    "id": "c5-18",
    "chapter": 5,
    "topic": "Số test Normal BVA",
    "level": "Vận dụng",
    "question": "Theo công thức Normal BVA = 4n + 1 trong slide, 3 đầu vào độc lập cần bao nhiêu test?",
    "options": [
      "12",
      "13",
      "19",
      "125"
    ],
    "answer": 1,
    "explanation": "4 × 3 + 1 = 13. Công thức này thay đổi từng đầu vào trong khi các đầu vào còn lại giữ ở giá trị danh định.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 27"
  },
  {
    "id": "c5-19",
    "chapter": 5,
    "topic": "Số test Worst-case BVA",
    "level": "Vận dụng",
    "question": "Theo công thức worst-case BVA là 5ⁿ, nếu có 3 đầu vào thì số tổ hợp cần xét là bao nhiêu?",
    "options": [
      "15",
      "25",
      "125",
      "243"
    ],
    "answer": 2,
    "explanation": "Có 5 lựa chọn cho mỗi đầu vào và kết hợp mọi lựa chọn: 5³ = 125 test.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 27"
  },
  {
    "id": "c5-20",
    "chapter": 5,
    "topic": "Làm rõ độ chính xác của đặc tả",
    "level": "Vận dụng",
    "question": "Đặc tả điểm số chấp nhận 0–10 nhưng chưa nói có cho nhập hai chữ số thập phân hay không. Với giá trị 9,95, tester nên làm gì?",
    "options": [
      "Tự kết luận không hợp lệ vì slide có ví dụ bước 0,1",
      "Tự kết luận luôn hợp lệ vì nằm giữa 0 và 10",
      "Dùng hành vi hiện tại của chương trình làm quy tắc chính thức",
      "Yêu cầu làm rõ độ chính xác được hỗ trợ trước khi chốt Expected result"
    ],
    "answer": 3,
    "explanation": "Bước lân cận phải dựa trên miền và độ chính xác trong đặc tả. Ví dụ trong slide cũng nhắc phải hỏi đặc tả về trường hợp 9,95.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 24"
  },
  {
    "id": "c5-21",
    "chapter": 5,
    "topic": "Biên kích thước tệp",
    "level": "Vận dụng",
    "question": "Đặc tả cho tải lên tệp tối đa 5 MB, đo chính xác theo byte. Cặp nào kiểm tra tại biên trên và ngay sát phía ngoài biên đó?",
    "options": [
      "Đúng 5 MB và 5 MB + 1 byte",
      "1 MB và 2 MB",
      "4 MB và 4,5 MB",
      "5 MB và 10 MB"
    ],
    "answer": 0,
    "explanation": "Tệp đúng giới hạn phải được chấp nhận, còn tệp lớn hơn giới hạn một đơn vị byte nằm ngay bên ngoài miền cho phép.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 26"
  },
  {
    "id": "c5-22",
    "chapter": 5,
    "topic": "BVA lương nhân viên",
    "level": "Vận dụng",
    "question": "Lương phải là số nguyên từ 5.000.000 đến 100.000.000 đồng. Bộ 2-value BVA nào phù hợp?",
    "options": [
      "5.000.000; 50.000.000; 100.000.000",
      "4.999.999; 5.000.000; 100.000.000; 100.000.001",
      "4.000.000; 6.000.000; 99.000.000; 101.000.000",
      "5.000.001; 99.999.999"
    ],
    "answer": 1,
    "explanation": "Với số nguyên, bước lân cận là 1 đồng. Cần cặp 4.999.999–5.000.000 và cặp 100.000.000–100.000.001.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 21–22 và 60"
  },
  {
    "id": "c5-23",
    "chapter": 5,
    "topic": "Độ bao phủ BVA",
    "level": "Vận dụng",
    "question": "Bộ mục tiêu BVA có 8 giá trị biên cần kiểm tra. Các test đã thực thi đúng 6 giá trị khác nhau trong bộ này. BVA coverage là bao nhiêu?",
    "options": [
      "60%",
      "80%",
      "75%",
      "100%"
    ],
    "answer": 2,
    "explanation": "BVA coverage = số mục biên đã được thực thi / tổng số mục biên = 6/8 = 75%.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 22"
  },
  {
    "id": "c5-24",
    "chapter": 5,
    "topic": "Bảng quyết định đầy đủ",
    "level": "Vận dụng",
    "question": "Có 4 điều kiện Boolean độc lập và không có tổ hợp bất khả thi. Bảng quyết định đầy đủ có bao nhiêu luật trước khi rút gọn?",
    "options": [
      "4",
      "8",
      "12",
      "16"
    ],
    "answer": 3,
    "explanation": "Mỗi điều kiện có hai giá trị đúng/sai, nên số tổ hợp là 2⁴ = 16 luật.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 36–37"
  },
  {
    "id": "c5-25",
    "chapter": 5,
    "topic": "Luật ưu tiên kiểm tra",
    "level": "Vận dụng",
    "question": "MiniBank kiểm tra theo ưu tiên: số dư, hạn mức, rồi OTP. Khi không đủ số dư, vượt hạn mức và OTP sai cùng lúc, bảng rút gọn trong slide cho kết quả gì?",
    "options": [
      "Báo E103 do không đủ số dư",
      "Báo E102 do vượt hạn mức",
      "Báo E107 do OTP sai",
      "Vẫn thực hiện chuyển tiền"
    ],
    "answer": 0,
    "explanation": "Trong bảng rút gọn, khi Enough balance = F thì hai điều kiện còn lại là không quan trọng và kết quả là E103.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 38–39"
  },
  {
    "id": "c5-26",
    "chapter": 5,
    "topic": "Áp dụng bảng quyết định",
    "level": "Vận dụng",
    "question": "Theo bảng MiniBank, tài khoản đủ số dư nhưng giao dịch vượt hạn mức trong ngày và OTP sai. Kết quả ưu tiên là gì?",
    "options": [
      "Chuyển tiền vì đã đủ số dư",
      "Báo E102 do vượt hạn mức",
      "Báo E107 do OTP sai",
      "Báo E103 do không đủ số dư"
    ],
    "answer": 1,
    "explanation": "Khi đủ số dư nhưng không trong hạn mức, bảng trả E102; giá trị OTP không ảnh hưởng luật này.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 39"
  },
  {
    "id": "c5-27",
    "chapter": 5,
    "topic": "Rút gọn bảng quyết định",
    "level": "Cơ bản",
    "question": "Vì sao bảng MiniBank với 3 điều kiện có thể rút từ 8 luật xuống 4 luật mà vẫn giữ hành vi được mô tả?",
    "options": [
      "Vì luôn bỏ mọi luật có kết quả lỗi",
      "Vì số điều kiện tự giảm từ 3 còn 2",
      "Vì một số điều kiện không còn ảnh hưởng khi điều kiện ưu tiên trước đã quyết định kết quả",
      "Vì chỉ cần kiểm thử trường hợp thành công"
    ],
    "answer": 2,
    "explanation": "Chẳng hạn, không đủ số dư đã quyết định E103, nên hạn mức và OTP không cần phân biệt. Các luật tương đương được gộp bằng ký hiệu không quan trọng.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 37 và 39"
  },
  {
    "id": "c5-28",
    "chapter": 5,
    "topic": "Ký hiệu bảng quyết định",
    "level": "Cơ bản",
    "question": "Trong bảng quyết định của slide, ký hiệu “-” và “N/A” lần lượt có ý nghĩa gì?",
    "options": [
      "Sai và đúng",
      "Hành động xảy ra và hành động không xảy ra",
      "Chưa chạy và đã chạy",
      "Không quan trọng và tổ hợp bất khả thi"
    ],
    "answer": 3,
    "explanation": "Dấu “-” cho biết giá trị điều kiện không làm đổi hành động trong luật; N/A dùng cho tổ hợp không thể xảy ra.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 35"
  },
  {
    "id": "c5-29",
    "chapter": 5,
    "topic": "Độ bao phủ bảng quyết định",
    "level": "Vận dụng",
    "question": "Sau khi loại tổ hợp bất khả thi, bảng còn 8 luật khả thi. Đã kiểm thử 6 luật khác nhau. Độ bao phủ bảng quyết định là bao nhiêu?",
    "options": [
      "75%",
      "60%",
      "80%",
      "100%"
    ],
    "answer": 0,
    "explanation": "DT coverage = số luật khả thi đã kiểm thử / tổng số luật khả thi = 6/8 = 75%.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 41"
  },
  {
    "id": "c5-30",
    "chapter": 5,
    "topic": "Loại trừ luật bất khả thi",
    "level": "Vận dụng",
    "question": "Bảng đầy đủ có 8 cột nhưng 2 cột là bất khả thi. Tester đã chạy đủ 6 luật khả thi. DT coverage bằng bao nhiêu?",
    "options": [
      "75% vì luôn chia cho 8",
      "100% vì 6 trên 6 luật khả thi đã được kiểm thử",
      "25% vì có 2 cột bị loại",
      "Không thể tính nếu chưa kiểm thử cột bất khả thi"
    ],
    "answer": 1,
    "explanation": "Các luật bất khả thi không nằm trong mẫu số tính coverage. Có 6 luật khả thi và đã kiểm thử đủ cả 6.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 37 và 41"
  },
  {
    "id": "c5-31",
    "chapter": 5,
    "topic": "Luật miễn phí giao hàng",
    "level": "Vận dụng",
    "question": "Quy tắc: VIP luôn được miễn phí giao hàng; người khác chỉ được miễn phí nếu đơn từ 500.000 đồng và có mã vận chuyển. Khách không phải VIP, đơn 600.000 đồng nhưng không có mã sẽ thế nào?",
    "options": [
      "Được miễn phí vì đơn trên 500.000 đồng",
      "Được miễn phí vì không phải VIP",
      "Không được miễn phí theo quy tắc đã cho",
      "Không cần xét vì mọi khách đều miễn phí"
    ],
    "answer": 2,
    "explanation": "Khách không phải VIP phải thỏa đồng thời cả ngưỡng giá trị đơn và điều kiện có mã. Thiếu mã nên không đủ điều kiện miễn phí.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 42"
  },
  {
    "id": "c5-32",
    "chapter": 5,
    "topic": "Khoảng trống trong đặc tả",
    "level": "Vận dụng",
    "question": "Khi lập bảng quyết định, nhóm tìm được một tổ hợp điều kiện khả thi nhưng đặc tả không nêu hành động tương ứng. Nên làm gì?",
    "options": [
      "Tự chọn kết quả dễ lập trình nhất",
      "Xóa tổ hợp để bảng ngắn hơn",
      "Coi tổ hợp đó là bất khả thi mà không kiểm tra",
      "Ghi nhận khoảng trống đặc tả và yêu cầu làm rõ hành động"
    ],
    "answer": 3,
    "explanation": "Một lợi ích của bảng quyết định là phát hiện các tổ hợp bị bỏ sót. Hành động chưa biết là khoảng trống đặc tả, không phải lý do tự bịa quy tắc.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 34 và 37"
  },
  {
    "id": "c5-33",
    "chapter": 5,
    "topic": "Chọn bảng quyết định",
    "level": "Vận dụng",
    "question": "Tình huống nào phù hợp nhất để dùng bảng quyết định?",
    "options": [
      "Mức giảm giá phụ thuộc đồng thời vào hạng thành viên, mã ưu đãi và giá trị đơn",
      "Chỉ kiểm tra độ dài tối đa của một chuỗi",
      "Đếm số câu lệnh đã thực thi trong mã nguồn",
      "Đo một vòng lặp đã chạy bao nhiêu lần"
    ],
    "answer": 0,
    "explanation": "Bảng quyết định phù hợp khi hành động phụ thuộc vào tổ hợp nhiều điều kiện nghiệp vụ. Giới hạn độ dài thường phù hợp với BVA.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 34, 47 và 54"
  },
  {
    "id": "c5-34",
    "chapter": 5,
    "topic": "Phân tích miền",
    "level": "Vận dụng",
    "question": "Quy tắc tuyển sinh là 10 × GPA + ACT ≥ 71. Với GPA = 3,5 và ACT = 35, kết quả nào đúng?",
    "options": [
      "Đạt vì 3,5 là GPA hợp lệ",
      "Không đạt vì 10 × 3,5 + 35 = 70 < 71",
      "Đạt vì điểm nằm đúng trên biên 71",
      "Không thể tính vì luôn phải xét từng đầu vào riêng rẽ"
    ],
    "answer": 1,
    "explanation": "Hai đầu vào liên kết qua một bất đẳng thức: 35 + 35 = 70. Điểm này ở ngay phía không đạt so với điểm trên biên GPA = 3,5, ACT = 36.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 30–32"
  },
  {
    "id": "c5-35",
    "chapter": 5,
    "topic": "Đồ thị nhân quả",
    "level": "Cơ bản",
    "question": "Trình tự nào đúng khi dùng đồ thị nhân quả theo slide?",
    "options": [
      "Viết test case rồi suy ngược để thay đổi đặc tả",
      "Đếm câu lệnh, vẽ đồ thị, bỏ bảng quyết định",
      "Vẽ đồ thị nhân quả, chuyển thành bảng quyết định, rồi tạo test case",
      "Chỉ vẽ đồ thị và không cần xác định kết quả mong đợi"
    ],
    "answer": 2,
    "explanation": "Đồ thị thể hiện các điều kiện nhị phân và quan hệ logic; bảng quyết định giúp liệt kê luật trước khi sinh test case.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 44–46"
  },
  {
    "id": "c5-36",
    "chapter": 5,
    "topic": "EP với quy tắc mã nhân viên",
    "level": "Vận dụng",
    "question": "Mã nhân viên phải có tiền tố NV và đúng 4 chữ số, đồng thời không trùng mã đã có. Test nào cô lập riêng lớp “mã bị trùng” tốt nhất?",
    "options": [
      "Nhập AB12, chưa từng tồn tại",
      "Để trống mã và nhập sai cả họ tên",
      "Nhập NV123, đã tồn tại",
      "Nhập NV0001 đã tồn tại, các trường còn lại đều hợp lệ"
    ],
    "answer": 3,
    "explanation": "NV0001 thỏa định dạng nhưng vi phạm tính duy nhất; giữ các trường khác hợp lệ giúp cô lập phản ứng với lỗi mã trùng.",
    "source": "SOTE_W05_Black_Box_Techniques_1 • trang 16 và 60"
  }
];
