globalThis.QUESTION_PART_7 = [
  {
    "id": "c7-01",
    "chapter": 7,
    "topic": "Error, defect và failure",
    "level": "Cơ bản",
    "question": "Trong chuỗi Error → Defect → Failure của bài học Tuần 7, việc lập trình viên quên kiểm tra phép chia cho 0 khi viết code thuộc khái niệm nào?",
    "options": [
      "Error (sai sót của con người)",
      "Defect (lỗi trong mã nguồn)",
      "Failure (hành vi sai khi chạy)",
      "Regression (lỗi hồi quy)"
    ],
    "answer": 0,
    "explanation": "Error là nhầm lẫn của con người (the developer forgot the divide-by-zero check). Nhầm lẫn đó tạo ra Defect trong code và dẫn đến Failure '7 ÷ 0 hiện 0' khi chạy.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 6"
  },
  {
    "id": "c7-02",
    "chapter": 7,
    "topic": "Error, defect và failure",
    "level": "Cơ bản",
    "question": "Khi chạy SimpleCalculator.html, thao tác 7 ÷ 0 hiển thị kết quả '0' thay vì thông báo lỗi. Hiện tượng quan sát được trên màn hình đó gọi là gì?",
    "options": [
      "Error",
      "Defect",
      "Failure",
      "Triage"
    ],
    "answer": 2,
    "explanation": "Failure là hành vi sai lệch quan sát được khi hệ thống thực thi ('7 ÷ 0 shows 0 instead of an error'). Đoạn code giữ biến kết quả ở 0 mới là Defect.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 6"
  },
  {
    "id": "c7-03",
    "chapter": 7,
    "topic": "Anomaly trước khi báo lỗi",
    "level": "Cơ bản",
    "question": "Khi thấy kết quả chạy khác với kỳ vọng (anomaly), việc ĐẦU TIÊN tester cần làm trước khi viết bug report là gì?",
    "options": [
      "Mở mã nguồn tìm dòng lệnh sai để viết vào báo cáo",
      "Kiểm tra lại xem có sai test case, test data, môi trường hoặc đã có báo cáo trùng chưa",
      "Đổi Expected result trong test case cho khớp với màn hình",
      "Đặt ngay mức Critical và High để lập trình viên chú ý"
    ],
    "answer": 1,
    "explanation": "Không phải mọi anomaly đều là defect. Tester cần kiểm tra lại test case, test data, môi trường và tìm báo cáo trùng lặp trước khi báo lỗi.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 7 và 11"
  },
  {
    "id": "c7-04",
    "chapter": 7,
    "topic": "Triage trong quản lý lỗi",
    "level": "Cơ bản",
    "question": "Hoạt động 'Triage' trong vòng đời quản lý bug có ý nghĩa gì?",
    "options": [
      "Tester chạy lại test case vừa Fail sau khi đã sửa code",
      "Developer sửa lỗi trực tiếp trên máy người dùng",
      "Trưởng nhóm hoặc PM kiểm tra báo cáo mới, đặt Priority và phân công người xử lý",
      "Hệ thống tự động xóa các báo cáo không tái hiện được"
    ],
    "answer": 2,
    "explanation": "Triage là bước Lead hoặc PM xem xét bug report ở trạng thái New, đánh giá mức độ ưu tiên (Priority) và gán cho developer phù hợp.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 7 và 15"
  },
  {
    "id": "c7-05",
    "chapter": 7,
    "topic": "Vai trò tester và developer",
    "level": "Cơ bản",
    "question": "Trong quy trình báo cáo lỗi (Task 1), ai là người chịu trách nhiệm tìm nguyên nhân gốc trong mã nguồn (debugging)?",
    "options": [
      "Tester phải tìm đúng dòng code sai trước khi được phép gửi bug report",
      "Developer là người tìm nguyên nhân trong code và sửa lỗi; tester chỉ mô tả chính xác triệu chứng và các bước tái hiện",
      "Khách hàng cuối tự kiểm tra DevTools",
      "Chỉ PM mới được mở mã nguồn"
    ],
    "answer": 1,
    "explanation": "Slide 11 nêu rõ: 'Finding the cause in code is the developer's job'. Trong bug report, tester chỉ nêu sự thật quan sát được, không đoán nguyên nhân code.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 7 và 11"
  },
  {
    "id": "c7-06",
    "chapter": 7,
    "topic": "Nguồn gốc của defect",
    "level": "Vận dụng",
    "question": "Đặc tả không nêu rõ phép chia 7 ÷ 0 phải hiển thị gì, khiến mỗi thành viên hiểu một kiểu. Theo bảng nguồn gốc defect, đây là lỗi xuất phát từ đâu?",
    "options": [
      "Requirements (yêu cầu)",
      "Test cases (ca kiểm thử)",
      "Documents (tài liệu hướng dẫn)",
      "Performance (hiệu năng)"
    ],
    "answer": 0,
    "explanation": "Khi đặc tả thiếu quy định cho trường hợp biên như 7 ÷ 0, nguồn gốc defect nằm ở Requirements ('The spec does not say what 7 ÷ 0 should show').",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 9"
  },
  {
    "id": "c7-07",
    "chapter": 7,
    "topic": "Phân loại defect",
    "level": "Cơ bản",
    "question": "Trên SimpleCalculator.html, bấm chuột vào ô nhập số không tự động chọn toàn bộ văn bản bên trong. Đây thuộc loại defect nào?",
    "options": [
      "Security",
      "Performance",
      "UI, usability",
      "Data, calculation"
    ],
    "answer": 2,
    "explanation": "Theo bảng phân loại slide 10, 'Clicking a box does not select its text' là lỗi thuộc nhóm UI, usability (giao diện và tính khả dụng).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 10"
  },
  {
    "id": "c7-08",
    "chapter": 7,
    "topic": "Xử lý báo cáo trùng lặp",
    "level": "Cơ bản",
    "question": "Khi kiểm thử, bạn phát hiện một lỗi nhưng tìm thấy đồng đội đã tạo bug report cho chính lỗi đó rồi. Cách làm đúng nhất là gì?",
    "options": [
      "Tạo thêm một bug report mới để tăng số lượng báo cáo của bản thân",
      "Không tạo report trùng; bổ sung thông tin hoặc dữ liệu mới quan sát được vào report cũ",
      "Xóa report của đồng đội rồi viết lại bằng tên mình",
      "Đổi tên lỗi thành tên khác để không bị coi là trùng"
    ],
    "answer": 1,
    "explanation": "Slide 11 hướng dẫn: 'Search for duplicates before reporting. Already reported? Add new information to the old report.'",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 11 và 37"
  },
  {
    "id": "c7-09",
    "chapter": 7,
    "topic": "Vòng đời defect",
    "level": "Cơ bản",
    "question": "Trình tự các trạng thái chính (main path) của một defect từ lúc mới báo cáo đến khi kết thúc là gì?",
    "options": [
      "New → In progress → Assigned → Closed → Fixed",
      "New → Assigned → In progress → Fixed → Retest → Closed",
      "Assigned → New → Fixed → Deferred → Closed",
      "New → Retest → Fixed → In progress → Closed"
    ],
    "answer": 1,
    "explanation": "Luồng chính của vòng đời lỗi gồm: New (mới tạo) → Assigned (được gán) → In progress (đang sửa) → Fixed (đã sửa) → Retest (kiểm thử lại) → Closed (đóng).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 14–15"
  },
  {
    "id": "c7-10",
    "chapter": 7,
    "topic": "Đóng defect sau khi sửa",
    "level": "Cơ bản",
    "question": "Developer đánh dấu một lỗi là Fixed. Điều gì nên xảy ra tiếp theo?",
    "options": [
      "Developer tự đóng (Closed) lỗi đó ngay",
      "Tester chạy kiểm thử lại (retest), sau đó chuyển Closed nếu đạt hoặc Reopened nếu vẫn lỗi",
      "Hệ thống tự xóa bug report",
      "Giữ nguyên trạng thái Fixed đến khi kết thúc dự án"
    ],
    "answer": 1,
    "explanation": "Thông thường tester là người đóng bug sau khi tự chạy confirmation test (retest) xác nhận lỗi đã thực sự được khắc phục.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 15 và 17"
  },
  {
    "id": "c7-11",
    "chapter": 7,
    "topic": "Side exits của defect",
    "level": "Vận dụng",
    "question": "Nếu một bug report bị chuyển sang trạng thái 'Rejected' (bị từ chối), tester nên phản hồi như thế nào?",
    "options": [
      "Trích dẫn lại yêu cầu trong đặc tả; hỏi lại BA nếu yêu cầu chưa rõ",
      "Ghi '3 times out of 10' mà không cần giải thích gì thêm",
      "Tự ý đổi code để lỗi xuất hiện rõ hơn",
      "Chuyển sang trạng thái Duplicate"
    ],
    "answer": 0,
    "explanation": "Theo bảng slide 16, khi lỗi bị Rejected, tester đối chiếu và trích dẫn yêu cầu liên quan (Quote the requirement; ask the BA if unclear).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 16"
  },
  {
    "id": "c7-12",
    "chapter": 7,
    "topic": "Side exits của defect",
    "level": "Vận dụng",
    "question": "Developer trả lời 'Cannot reproduce' (không tái hiện được) cho một bug report bạn viết. Bạn cần bổ sung gì?",
    "options": [
      "Yêu cầu PM phạt developer",
      "Gắn link tới báo cáo của nhóm khác",
      "Thêm các bước chi tiết hơn, video quay màn hình, logs và tần suất xảy ra (vd: 3 times out of 10)",
      "Giảm mức Severity xuống Trivial"
    ],
    "answer": 2,
    "explanation": "Khi Cannot reproduce, tester cần bổ sung steps rõ ràng hơn, video, logs và frequency để developer có đủ ngữ cảnh tái hiện.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 16"
  },
  {
    "id": "c7-13",
    "chapter": 7,
    "topic": "Confirmation test và Regression test",
    "level": "Cơ bản",
    "question": "Sau khi sửa hàm btnTinh_Click trong SimpleCalculator.html, các test case từng Pass ở Tuần 4 (cộng, trừ, nhân, thoát) được chạy lại để chắc chắn không bị hỏng. Việc này gọi là gì?",
    "options": [
      "Confirmation test",
      "Regression test",
      "Exploratory charter",
      "Triage"
    ],
    "answer": 1,
    "explanation": "Chạy lại các test case từng Fail để xác nhận đã sửa là Confirmation test (retest). Chạy lại các test khác xem bản sửa có làm hỏng chức năng cũ không là Regression test.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 7 và 59"
  },
  {
    "id": "c7-14",
    "chapter": 7,
    "topic": "Severity và Priority",
    "level": "Cơ bản",
    "question": "Sự khác nhau cốt lõi giữa Severity và Priority là gì?",
    "options": [
      "Severity đo độ khẩn cấp về thời gian; Priority đo mức độ hỏng hóc kỹ thuật",
      "Severity nói về mức độ ảnh hưởng (impact) do tester đề xuất; Priority nói về độ gấp cần sửa (urgency) do PM/PO quyết định",
      "Cả hai đều do tester quyết định độc lập và luôn giống nhau",
      "Severity chỉ dùng cho lỗi giao diện, Priority chỉ dùng cho lỗi tính toán"
    ],
    "answer": 1,
    "explanation": "Slide 19 nhấn mạnh: 'Severity is about impact (proposed by the tester); priority is about urgency (decided by the PM or product owner).'",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 19"
  },
  {
    "id": "c7-15",
    "chapter": 7,
    "topic": "Quy tắc chọn Severity",
    "level": "Cơ bản",
    "question": "Theo bảng câu hỏi chọn Severity ở slide 23, khi gặp lỗi làm sai một chức năng chính và KHÔNG có cách lách (workaround), nhưng ứng dụng không bị crash hay mất dữ liệu, ta chọn mức nào?",
    "options": [
      "Critical",
      "Major",
      "Minor",
      "Trivial"
    ],
    "answer": 1,
    "explanation": "Câu 1 (Crash, lose data, unusable?): No -> sang Câu 2 (Main function wrong, with no workaround?): Yes -> dừng lại chọn Major.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 23"
  },
  {
    "id": "c7-16",
    "chapter": 7,
    "topic": "Quy tắc chọn Priority",
    "level": "Cơ bản",
    "question": "Trong bảng chọn Priority (slide 24), một lỗi chặn không cho chạy tiếp các test case khác hoặc làm gián đoạn công việc hiện tại thường được xếp Priority nào?",
    "options": [
      "High",
      "Medium",
      "Low",
      "Not planned"
    ],
    "answer": 0,
    "explanation": "Slide 21 & 24: 'A bug that blocks other tests often gets a high priority' (Câu 1: Does it block testing or work, or hurt customers now? → High).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 21 và 24"
  },
  {
    "id": "c7-17",
    "chapter": 7,
    "topic": "Đặt Severity & Priority cho Unhandled exception",
    "level": "Vận dụng",
    "question": "Khi bỏ trống ô 'Nhập số thứ nhất' rồi bấm 'Tính', hộp thoại 'Unhandled exception' hiện ra (bấm Quit làm đóng ứng dụng) và chặn mọi ca kiểm tra dữ liệu nhập. Mức nào hợp lý nhất?",
    "options": [
      "Minor / Low",
      "Major / Low",
      "Critical / High",
      "Trivial / Medium"
    ],
    "answer": 2,
    "explanation": "Theo ví dụ CALC-001 (slide 42): Quit đóng app -> Critical; mọi input test đều vướng hộp thoại này trước -> High.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 42"
  },
  {
    "id": "c7-18",
    "chapter": 7,
    "topic": "Đặt Severity & Priority cho chia 0",
    "level": "Vận dụng",
    "question": "Lỗi '7 ÷ 0 hiển thị 0 thay vì thông báo lỗi' (ứng dụng vẫn chạy, các phép tính khác vẫn test bình thường và sản phẩm chưa phát hành). Cặp Severity / Priority theo ví dụ slide 25 là gì?",
    "options": [
      "Critical / High",
      "Major / Medium",
      "Minor / Low",
      "Trivial / High"
    ],
    "answer": 1,
    "explanation": "Slide 25: Không crash -> không phải Critical; sai chức năng chính không có workaround -> Major; không chặn test khác -> sửa ở bản build tới (Medium).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 25"
  },
  {
    "id": "c7-19",
    "chapter": 7,
    "topic": "Severity thấp nhưng Priority cao",
    "level": "Vận dụng",
    "question": "Một ngày trước khi ra mắt sản phẩm, tên công ty bị viết sai chính tả ngay trên trang đăng nhập (login page). Cặp Severity và Priority phù hợp nhất là gì?",
    "options": [
      "High severity, high priority",
      "Low severity, high priority",
      "High severity, low priority",
      "Low severity, low priority"
    ],
    "answer": 1,
    "explanation": "Sai chính tả không làm hỏng chức năng nên Severity thấp (Low/Trivial), nhưng nằm ngay trang login trước ngày launch nên cần sửa gấp (High priority).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 22 và 27"
  },
  {
    "id": "c7-20",
    "chapter": 7,
    "topic": "Severity cao nhưng Priority thấp",
    "level": "Vận dụng",
    "question": "Tình huống nào minh họa rõ nhất cho 'High severity, low priority'?",
    "options": [
      "Không thể chuyển tiền ở bất kỳ giao dịch nào",
      "Sai chính tả tên ngân hàng ở màn hình đăng nhập",
      "Ứng dụng bị crash khi xuất báo cáo cho năm 2099",
      "Một tooltip ẩn sâu trong trang trợ giúp sai chính tả"
    ],
    "answer": 2,
    "explanation": "Crash là ảnh hưởng nặng (High severity), nhưng điều kiện 'năm 2099' cực hiếm/chưa cần ngay ở hiện tại nên Priority thấp (Low priority).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 22"
  },
  {
    "id": "c7-21",
    "chapter": 7,
    "topic": "Workaround và Severity",
    "level": "Vận dụng",
    "question": "Chức năng xuất sao kê ra PDF bị lỗi, nhưng người dùng vẫn xuất được ra file CSV để sử dụng tạm. Theo quy tắc slide 23 & 26, Severity phù hợp nhất là gì?",
    "options": [
      "Critical",
      "Major",
      "Minor",
      "Trivial"
    ],
    "answer": 2,
    "explanation": "Vì có workaround (xuất CSV thay cho PDF) và không làm app crash, dừng ở câu hỏi số 3: 'Is it a small problem, or is there a workaround?' → Minor.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 23 và 26"
  },
  {
    "id": "c7-22",
    "chapter": 7,
    "topic": "Lỗi thẩm mỹ và typo",
    "level": "Cơ bản",
    "question": "Tiêu đề cửa sổ hiện 'Tinh toan don gian 3' (không có dấu tiếng Việt) hoặc một tooltip bị sai chính tả nhỏ. Mức Severity phù hợp theo slide 20 là gì?",
    "options": [
      "Critical",
      "Major",
      "Minor",
      "Trivial"
    ],
    "answer": 3,
    "explanation": "Slide 20 lấy ví dụ 'Window title has no accents' và slide 26 lấy 'A tooltip has a spelling mistake' cho nhóm lỗi thuần túy thẩm mỹ/chữ viết → Trivial.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 20, 23 và 26"
  },
  {
    "id": "c7-23",
    "chapter": 7,
    "topic": "Lỗi tính toán tiền tệ",
    "level": "Vận dụng",
    "question": "Phí chuyển khoản liên ngân hàng bị tính thành 5,000 thay vì 2,000 cho số tiền 9,999,999 (sai tiền khách hàng trực tiếp). Cặp Severity / Priority hợp lý là:",
    "options": [
      "Major / High",
      "Trivial / Low",
      "Minor / Not planned",
      "Trivial / High"
    ],
    "answer": 0,
    "explanation": "Chức năng chính tính sai tiền và không có workaround → Major; gây thiệt hại trực tiếp cho khách hàng ngay khi sử dụng → High.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 23, 24 và 26"
  },
  {
    "id": "c7-24",
    "chapter": 7,
    "topic": "Công thức đặt Title",
    "level": "Cơ bản",
    "question": "Theo công thức ở slide 32, Title nào dưới đây đạt chuẩn một bug report tốt?",
    "options": [
      "Calculator bug!!!",
      "Division not working",
      "Calculator - 7 ÷ 0 shows 0 instead of an error",
      "Line 243 missing else branch in btnTinh_Click"
    ],
    "answer": 2,
    "explanation": "Công thức chuẩn là '[Module] - What goes wrong + when or where'. Chỉ đáp án C nêu đủ module (Calculator), hiện tượng (shows 0 instead of an error) và điều kiện (7 ÷ 0).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 32"
  },
  {
    "id": "c7-25",
    "chapter": 7,
    "topic": "Viết Steps to reproduce",
    "level": "Cơ bản",
    "question": "Quy tắc nào sau đây ĐÚNG khi viết mục 'Steps to reproduce'?",
    "options": [
      "Bắt đầu từ trạng thái bất kỳ để người đọc tự đoán",
      "Gộp 3–4 thao tác vào một dòng không cần đánh số",
      "Đánh số thứ tự, mỗi bước một hành động với dữ liệu cụ thể, bỏ bước thừa và tự chạy thử lại một lần",
      "Ghi thêm suy đoán nguyên nhân lỗi vào cuối bước cuối cùng"
    ],
    "answer": 2,
    "explanation": "Slide 33: Start from a known state; Numbered, one action per step, exact data; Facts only, no guesses; Follow your own steps once before sending; Remove steps that are not needed.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 33 và 47"
  },
  {
    "id": "c7-26",
    "chapter": 7,
    "topic": "Trích dẫn nhãn giao diện tiếng Việt",
    "level": "Cơ bản",
    "question": "Khi viết bug report bằng tiếng Anh cho ứng dụng có giao diện tiếng Việt (SimpleCalculator.html), tên các ô nhập và nút bấm phải viết thế nào?",
    "options": [
      "Dịch sang tiếng Anh như 'First number box', 'Calculate button'",
      "Giữ nguyên văn chữ hiển thị trên màn hình đặt trong ngoặc kép, vd: \"Nhập số thứ nhất\", \"Tính\"",
      "Chỉ viết tên biến ID trong code HTML như txtSo1, btnTinh",
      "Viết tắt thành Ô1, Ô2, Nút T"
    ],
    "answer": 1,
    "explanation": "Slide 40 và Phiếu thực hành Tuần 7 yêu cầu giữ nguyên văn nhãn trên màn hình trong dấu ngoặc kép (kể cả khi là tiếng Việt) để người tái hiện bấm đúng control.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 40; Phiếu thực hành Tuần 7 • mục 5"
  },
  {
    "id": "c7-27",
    "chapter": 7,
    "topic": "Expected result và Actual result",
    "level": "Cơ bản",
    "question": "Điểm khác biệt bắt buộc giữa Expected result và Actual result trong một bug report chuẩn là gì?",
    "options": [
      "Viết chung vào một đoạn Summary để tiết kiệm chỗ",
      "Expected lấy từ đặc tả kèm mã yêu cầu (vd: requirement R7); Actual mô tả đúng điều quan sát được và chép nguyên văn thông báo lỗi",
      "Expected viết bằng tiếng Việt, Actual viết bằng tiếng Anh",
      "Actual result phải đề xuất luôn đoạn code cần sửa"
    ],
    "answer": 1,
    "explanation": "Slide 34 & 46: Expected và Actual phải tách riêng; Expected trích mã yêu cầu từ spec (present simple), Actual ghi chính xác kết quả/chuỗi lỗi thấy được, không đoán và không viết cách sửa.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 34 và 46"
  },
  {
    "id": "c7-28",
    "chapter": 7,
    "topic": "Environment và Version",
    "level": "Cơ bản",
    "question": "Mục Environment và Version cần ghi đầy đủ thông tin gì để đáp ứng tiêu chí C2?",
    "options": [
      "Chỉ cần ghi 'Windows' là đủ",
      "Phiên bản phần mềm/build, hệ điều hành kèm phiên bản, trình duyệt/thiết bị kèm phiên bản",
      "Chỉ cần tên tác giả viết báo cáo",
      "Chỉ cần độ phân giải màn hình"
    ],
    "answer": 1,
    "explanation": "Slide 35: Một số lỗi chỉ xuất hiện ở một ngôn ngữ OS, vùng hoặc phiên bản trình duyệt nhất định nên phải ghi rõ Build/Version, OS và Browser/Device kèm version.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 35"
  },
  {
    "id": "c7-29",
    "chapter": 7,
    "topic": "Evidence cho Unhandled exception",
    "level": "Vận dụng",
    "question": "Khi chụp bằng chứng cho hộp thoại 'Unhandled exception' trên SimpleCalculator.html, ngoài ảnh chụp màn hình cần làm thêm gì?",
    "options": [
      "Bấm Quit rồi chụp lại màn hình desktop",
      "Bấm nút Details, sao chép phần văn bản stack trace dán vào ô Evidence để tìm kiếm được",
      "Sửa HTML cho hết lỗi rồi mới chụp ảnh",
      "Không cần dán text vì ảnh đã đủ"
    ],
    "answer": 1,
    "explanation": "Slide 36 & Phiếu thực hành mục 5: Với Unhandled exception, bấm Details và chép phần chữ dán vào ô Evidence ('Paste as text so it can be searched').",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 36; Phiếu thực hành Tuần 7 • mục 5"
  },
  {
    "id": "c7-30",
    "chapter": 7,
    "topic": "An toàn dữ liệu và dùng AI hỗ trợ",
    "level": "Cơ bản",
    "question": "Khi đính kèm bằng chứng hoặc nhờ AI kiểm tra ngữ pháp tiếng Anh cho bug report, quy tắc bảo mật nào cần tuân thủ?",
    "options": [
      "Gửi nguyên ảnh chụp chứa mật khẩu và dữ liệu khách hàng thật để developer dễ kiểm tra",
      "Che dữ liệu cá nhân/mật khẩu trước khi đính kèm và không dán dữ liệu thật của khách hàng vào AI",
      "Cho AI tự bịa thêm số liệu và bước thực hiện cho hay hơn",
      "Chỉ gửi link tài khoản nội bộ công khai"
    ],
    "answer": 1,
    "explanation": "Slide 36 & 52: Che dữ liệu cá nhân/mật khẩu trước khi đính kèm; khi dùng AI sửa ngữ pháp, không dán dữ liệu thật và kiểm tra để AI không làm sai lệch số liệu hay các bước.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 36 và 52"
  },
  {
    "id": "c7-31",
    "chapter": 7,
    "topic": "Ngữ pháp tiếng Anh trong bug report",
    "level": "Vận dụng",
    "question": "Câu tiếng Anh nào viết ĐÚNG ngữ pháp và tránh được các lỗi dịch word-by-word phổ biến của người Việt?",
    "options": [
      "Click to the Save button, then data is not save.",
      "System show error message when can not input number.",
      "Login to the system, click \"Save\", and the data is not saved.",
      "Log in to the system, click \"Save\", and the data is not saved."
    ],
    "answer": 3,
    "explanation": "Slide 48: Động từ là 'Log in to' (không phải Login to), 'Click \"Save\"' (không có 'to the'), 'the data is not saved' (dạng bị động có -ed).",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 48"
  },
  {
    "id": "c7-32",
    "chapter": 7,
    "topic": "Giọng văn trung lập",
    "level": "Cơ bản",
    "question": "Cách diễn đạt nào tuân thủ nguyên tắc giọng văn trung lập 'Describe the system, never the person' (C8)?",
    "options": [
      "\"The developer forgot to check empty input!\"",
      "\"This terrible bug happens again, please fix ASAP!!!\"",
      "\"No error message appears when the first number is empty.\"",
      "\"I think the programmer wrote wrong JavaScript.\""
    ],
    "answer": 2,
    "explanation": "Slide 44: Tránh cảm tính, dấu chấm than hoặc đổ lỗi lập trình viên; chỉ mô tả khách quan hành vi của hệ thống.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 44"
  },
  {
    "id": "c7-33",
    "chapter": 7,
    "topic": "Ghi Frequency cụ thể",
    "level": "Cơ bản",
    "question": "Ô Frequency trong bug report nên viết như thế nào để đạt chuẩn thay cho từ chung chung 'Sometimes'?",
    "options": [
      "Ghi 'Maybe'",
      "Ghi rõ số lần lỗi xảy ra trên tổng số lần thử, ví dụ '3 of 3' hoặc '3 times out of 10'",
      "Ghi 'Every day'",
      "Bỏ trống nếu lỗi xảy ra liên tục"
    ],
    "answer": 1,
    "explanation": "Slide 16 & 50: Thay vì 'Sometimes', cần ghi tỷ lệ tái hiện chính xác như '3 of 3', '5 of 5' hoặc '3 times out of 10'.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 16 và 50"
  },
  {
    "id": "c7-34",
    "chapter": 7,
    "topic": "Trạng thái và Assigned to khi mới tạo",
    "level": "Cơ bản",
    "question": "Khi tester vừa tạo mới một bug report trên mẫu BugReportTemplate.docx, hai trường Status và Assigned to nên điền thế nào?",
    "options": [
      "Status = Closed; Assigned to = tên tester",
      "Status = New; Assigned to = để trống để Lead phân công khi triage",
      "Status = Fixed; Assigned to = tất cả thành viên",
      "Status = Reopened; Assigned to = khách hàng"
    ],
    "answer": 1,
    "explanation": "Slide 31 & BugReportTemplate.docx: Khi mới báo cáo, Status luôn là 'New' và 'Assigned to' để trống cho Team Lead phân công.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 31"
  },
  {
    "id": "c7-35",
    "chapter": 7,
    "topic": "Checklist 8 điểm review bug report",
    "level": "Vận dụng",
    "question": "Một bug report mô tả cả lỗi '7 ÷ 0 hiện 0' lẫn lỗi 'bấm nút ✕ không hỏi xác nhận' trong cùng một bảng. Theo Checklist 8 điểm (slide 53), báo cáo này vi phạm tiêu chí nào trực tiếp nhất?",
    "options": [
      "C2: Environment and version are given",
      "C5: Evidence is attached",
      "C7: One bug only, no duplicates",
      "C8: Neutral tone, correct English"
    ],
    "answer": 2,
    "explanation": "Mỗi bug report chỉ được mô tả đúng 1 lỗi duy nhất (One bug per report, one problem per title) để gán xử lý và đóng/mở độc lập -> vi phạm C7.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 32 và 53"
  },
  {
    "id": "c7-36",
    "chapter": 7,
    "topic": "Quản lý defect theo ISTQB 5.5",
    "level": "Cơ bản",
    "question": "Theo ISTQB CTFL Syllabus v4.0.1 mục 5.5 và slide 12, mục tiêu tổng quát của việc quản lý defect (defect management) KHÔNG bao gồm điều nào?",
    "options": [
      "Cung cấp đủ thông tin giúp developer tái hiện và sửa lỗi",
      "Theo dõi xu hướng chất lượng (bao nhiêu lỗi mở, mức độ nghiêm trọng ra sao)",
      "Rút kinh nghiệm cải tiến quy trình để ngăn lỗi lọt vào tương lai",
      "Chứng minh lỗi hoàn toàn không tồn tại và phạt thành viên tạo nhiều lỗi"
    ],
    "answer": 3,
    "explanation": "Quản lý defect nhằm sửa lỗi, theo dõi chất lượng và cải tiến quy trình (Fix it, Track quality, Improve), tuyệt đối không nhằm đổ lỗi hay trừng phạt cá nhân.",
    "source": "SOTE_W07_Defects_and_Bug_Reports • trang 12 và 55; ISTQB CTFL v4.0.1 • mục 5.5"
  }
];
