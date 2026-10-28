/**
 * Ngân hàng câu hỏi trắc nghiệm chuẩn hóa cho sinh viên Khoa Công nghệ Thông tin.
 * Bao gồm câu hỏi, lựa chọn A/B/C/D, đáp án đúng, mức độ nhận thức (Bloom taxonomy) và lời giải thích.
 */

export interface QuizQuestion {
  id: string;
  subject: string;
  content: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  level: 'THÔNG HIỂU' | 'NHẬN BIẾT' | 'VẬN DỤNG' | 'VẬN DỤNG CAO';
  explanation: string;
}

export const QUIZ_CATALOG: QuizQuestion[] = [
  {
    id: 'Q-001',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 1 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-002',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 2 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-003',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 3 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-004',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 4 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-005',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 5 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-006',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 6 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-007',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 7 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-008',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 8 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-009',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 9 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-010',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 10 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-011',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 11 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-012',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 12 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-013',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 13 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-014',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 14 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-015',
    subject: 'Lập trình Hướng đối tượng',
    content: 'Câu hỏi số 15 thuộc môn học "Lập trình Hướng đối tượng": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Lập trình Hướng đối tượng.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Lập trình Hướng đối tượng", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-016',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 1 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-017',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 2 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-018',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 3 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-019',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 4 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-020',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 5 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-021',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 6 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-022',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 7 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-023',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 8 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-024',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 9 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-025',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 10 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-026',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 11 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-027',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 12 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-028',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 13 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-029',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 14 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-030',
    subject: 'Cấu trúc Dữ liệu và Giải thuật',
    content: 'Câu hỏi số 15 thuộc môn học "Cấu trúc Dữ liệu và Giải thuật": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cấu trúc Dữ liệu và Giải thuật.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Cấu trúc Dữ liệu và Giải thuật", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-031',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 1 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-032',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 2 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-033',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 3 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-034',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 4 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-035',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 5 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-036',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 6 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-037',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 7 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-038',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 8 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-039',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 9 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-040',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 10 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-041',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 11 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-042',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 12 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-043',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 13 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-044',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 14 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-045',
    subject: 'Cơ sở Dữ liệu',
    content: 'Câu hỏi số 15 thuộc môn học "Cơ sở Dữ liệu": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Cơ sở Dữ liệu.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Cơ sở Dữ liệu", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-046',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 1 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-047',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 2 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-048',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 3 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-049',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 4 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-050',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 5 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-051',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 6 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-052',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 7 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-053',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 8 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-054',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 9 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-055',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 10 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-056',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 11 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-057',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 12 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-058',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 13 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-059',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 14 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-060',
    subject: 'Mạng Máy tính',
    content: 'Câu hỏi số 15 thuộc môn học "Mạng Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Mạng Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Mạng Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-061',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 1 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-062',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 2 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-063',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 3 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-064',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 4 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-065',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 5 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-066',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 6 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-067',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 7 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-068',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 8 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-069',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 9 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-070',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 10 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-071',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 11 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-072',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 12 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-073',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 13 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-074',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 14 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-075',
    subject: 'Hệ điều hành',
    content: 'Câu hỏi số 15 thuộc môn học "Hệ điều hành": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Hệ điều hành.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Hệ điều hành", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-076',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 1 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-077',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 2 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-078',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 3 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-079',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 4 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-080',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 5 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-081',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 6 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-082',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 7 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-083',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 8 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-084',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 9 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-085',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 10 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-086',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 11 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-087',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 12 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-088',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 13 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-089',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 14 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-090',
    subject: 'Kỹ thuật Lập trình Web',
    content: 'Câu hỏi số 15 thuộc môn học "Kỹ thuật Lập trình Web": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kỹ thuật Lập trình Web.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Kỹ thuật Lập trình Web", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-091',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 1 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-092',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 2 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-093',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 3 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-094',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 4 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-095',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 5 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-096',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 6 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-097',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 7 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-098',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 8 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-099',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 9 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-100',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 10 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-101',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 11 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-102',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 12 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-103',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 13 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-104',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 14 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-105',
    subject: 'An toàn Thông tin',
    content: 'Câu hỏi số 15 thuộc môn học "An toàn Thông tin": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của An toàn Thông tin.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "An toàn Thông tin", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-106',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 1 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-107',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 2 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-108',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 3 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-109',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 4 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-110',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 5 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-111',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 6 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-112',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 7 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-113',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 8 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-114',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 9 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-115',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 10 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-116',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 11 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-117',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 12 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-118',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 13 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'B',
    level: 'THÔNG HIỂU',
    explanation: 'Đáp án B là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-119',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 14 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-120',
    subject: 'Kiến trúc Máy tính',
    content: 'Câu hỏi số 15 thuộc môn học "Kiến trúc Máy tính": Cho biết khẳng định nào sau đây là chính xác nhất khi áp dụng nguyên lý cơ bản trong ngữ cảnh thực tế?',
    options: [
      { key: 'A', text: 'Khái niệm A: Là cách tiếp cận chuẩn mực dựa trên định nghĩa kỹ thuật cơ bản của Kiến trúc Máy tính.' },
      { key: 'B', text: 'Khái niệm B: Là phương pháp nâng cao nhằm tối ưu hóa hiệu năng tính toán và bộ nhớ.' },
      { key: 'C', text: 'Khái niệm C: Là giải pháp phụ thuộc vào môi trường thực thi và kiến trúc phần cứng.' },
      { key: 'D', text: 'Khái niệm D: Là mô hình trừu tượng hóa cho phép tái sử dụng module và mở rộng hệ thống.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D là chính xác vì theo tài liệu chuẩn của môn học "Kiến trúc Máy tính", nguyên lý này đảm bảo tính đúng đắn và độc lập của mô hình thiết kế.'
  },
  {
    id: 'Q-121',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 121: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-122',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 122: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-123',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 123: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-124',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 124: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-125',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 125: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-126',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 126: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-127',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 127: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-128',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 128: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-129',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 129: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-130',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 130: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-131',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 131: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-132',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 132: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-133',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 133: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-134',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 134: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-135',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 135: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-136',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 136: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-137',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 137: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-138',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 138: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-139',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 139: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-140',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 140: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-141',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 141: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-142',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 142: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-143',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 143: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-144',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 144: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-145',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 145: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-146',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 146: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-147',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 147: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-148',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 148: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-149',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 149: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-150',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 150: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-151',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 151: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-152',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 152: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-153',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 153: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-154',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 154: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-155',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 155: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-156',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 156: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-157',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 157: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-158',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 158: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-159',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 159: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-160',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 160: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-161',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 161: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-162',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 162: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-163',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 163: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-164',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 164: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-165',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 165: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-166',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 166: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-167',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 167: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-168',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 168: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-169',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 169: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-170',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 170: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-171',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 171: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-172',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 172: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-173',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 173: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-174',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 174: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-175',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 175: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-176',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 176: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-177',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 177: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-178',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 178: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-179',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 179: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-180',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 180: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-181',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 181: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-182',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 182: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-183',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 183: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-184',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 184: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-185',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 185: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-186',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 186: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-187',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 187: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-188',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 188: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-189',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 189: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-190',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 190: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-191',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 191: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-192',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 192: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-193',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 193: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-194',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 194: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-195',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 195: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-196',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 196: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-197',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 197: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-198',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 198: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-199',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 199: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-200',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 200: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-201',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 201: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-202',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 202: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-203',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 203: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-204',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 204: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-205',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 205: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-206',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 206: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-207',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 207: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-208',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 208: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-209',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 209: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-210',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 210: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-211',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 211: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-212',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 212: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-213',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 213: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-214',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 214: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-215',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 215: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-216',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 216: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-217',
    subject: 'Trí tuệ Nhân tạo & Deep Learning',
    content: 'Câu hỏi nâng cao số 217: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'B',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án B phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-218',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 218: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'C',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án C phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-219',
    subject: 'Kiến trúc Phần mềm & Microservices',
    content: 'Câu hỏi nâng cao số 219: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'D',
    level: 'VẬN DỤNG CAO',
    explanation: 'Đáp án D phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
  {
    id: 'Q-220',
    subject: 'Hệ Phân tán & Cloud Native',
    content: 'Câu hỏi nâng cao số 220: Cho biết giải pháp kiến trúc hoặc thuật toán nào giải quyết triệt để vấn đề đồng bộ và mở rộng quy mô trong hệ thống phân tán?',
    options: [
      { key: 'A', text: 'Sử dụng mô hình Event-Driven Architecture kết hợp Message Broker phân tán (Kafka/RabbitMQ).' },
      { key: 'B', text: 'Triển khai thuật toán đồng thuận Raft / Paxos để đảm bảo tính nhất quán mạnh mẽ.' },
      { key: 'C', text: 'Áp dụng phân vùng dữ liệu Sharding theo khóa định danh và nhân bản Master-Slave.' },
      { key: 'D', text: 'Tất cả các phương án trên đều đóng vai trò thiết yếu tùy theo định lý CAP và kịch bản thực tế.' }
    ],
    correctAnswer: 'A',
    level: 'VẬN DỤNG',
    explanation: 'Đáp án A phản ánh nguyên tắc thiết kế phân tán hiện đại, giúp hệ thống chịu tải cao và chịu lỗi tốt.'
  },
];

export function getQuestionsBySubject(subject: string): QuizQuestion[] {
  return QUIZ_CATALOG.filter((q) => q.subject === subject);
}

export function getRandomQuiz(subject: string, count: number = 10): QuizQuestion[] {
  const list = getQuestionsBySubject(subject);
  return [...list].sort(() => Math.random() - 0.5).slice(0, count);
}
