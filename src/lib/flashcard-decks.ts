/**
 * Bộ thẻ ghi nhớ học tập (Flashcard Decks) cho sinh viên ngành CNTT.
 * Được thiết kế theo phương pháp lặp lại ngắt quãng (Spaced Repetition System - SRS).
 */

export interface Flashcard {
  id: string;
  category: string;
  frontTerm: string;
  phonetic?: string;
  vietnameseMeaning: string;
  definition: string;
  codeOrExample: string;
  tags: string[];
}

export const FLASHCARD_DECKS: Flashcard[] = [
  {
    id: 'FC-001',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #2: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 1 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_2 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-002',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #3: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 2 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_3 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-003',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #4: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 3 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_4 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-004',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #5: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 4 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_5 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-005',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #6: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 5 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_6 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-006',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #7: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 6 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_7 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-007',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #8: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 7 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_8 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-008',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #9: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 8 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_9 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-009',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #10: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 9 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_10 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-010',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #11: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 10 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_11 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-011',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #12: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 11 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_12 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-012',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #13: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 12 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_13 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-013',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #14: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 13 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_14 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-014',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #15: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 14 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_15 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-015',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #16: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 15 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_16 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-016',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #17: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 16 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_17 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-017',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #18: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 17 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_18 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-018',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #19: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 18 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_19 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-019',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #20: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 19 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_20 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-020',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #21: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 20 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_21 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-021',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #22: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 21 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_22 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-022',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #23: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 22 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_23 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-023',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #24: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 23 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_24 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-024',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #25: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 24 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_25 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-025',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #26: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 25 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_26 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-026',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #27: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 26 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_27 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-027',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #28: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 27 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_28 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-028',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #29: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 28 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_29 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-029',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #30: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 29 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_30 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-030',
    category: 'Thuật toán & Cấu trúc Dữ liệu',
    frontTerm: 'Technical Term #31: Core concept of Thuật toán & Cấu trúc Dữ liệu',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 30 thuộc lĩnh vực Thuật toán & Cấu trúc Dữ liệu.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Thuật toán & Cấu trúc Dữ liệu, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_31 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Thuật toán & Cấu trúc Dữ liệu";\n};',
    tags: ['thuật toán & cấu trúc dữ liệu', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-031',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #32: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 1 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_32 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-032',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #33: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 2 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_33 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-033',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #34: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 3 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_34 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-034',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #35: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 4 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_35 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-035',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #36: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 5 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_36 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-036',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #37: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 6 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_37 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-037',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #38: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 7 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_38 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-038',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #39: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 8 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_39 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-039',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #40: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 9 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_40 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-040',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #41: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 10 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_41 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-041',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #42: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 11 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_42 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-042',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #43: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 12 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_43 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-043',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #44: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 13 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_44 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-044',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #45: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 14 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_45 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-045',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #46: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 15 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_46 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-046',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #47: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 16 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_47 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-047',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #48: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 17 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_48 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-048',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #49: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 18 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_49 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-049',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #50: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 19 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_50 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-050',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #51: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 20 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_51 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-051',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #52: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 21 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_52 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-052',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #53: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 22 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_53 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-053',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #54: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 23 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_54 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-054',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #55: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 24 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_55 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-055',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #56: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 25 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_56 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-056',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #57: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 26 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_57 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-057',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #58: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 27 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_58 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-058',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #59: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 28 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_59 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-059',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #60: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 29 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_60 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-060',
    category: 'Mạng Máy tính & Truyền thông',
    frontTerm: 'Technical Term #61: Core concept of Mạng Máy tính & Truyền thông',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 30 thuộc lĩnh vực Mạng Máy tính & Truyền thông.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Mạng Máy tính & Truyền thông, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_61 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Mạng Máy tính & Truyền thông";\n};',
    tags: ['mạng máy tính & truyền thông', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-061',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #62: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 1 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_62 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-062',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #63: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 2 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_63 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-063',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #64: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 3 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_64 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-064',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #65: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 4 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_65 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-065',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #66: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 5 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_66 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-066',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #67: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 6 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_67 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-067',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #68: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 7 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_68 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-068',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #69: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 8 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_69 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-069',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #70: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 9 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_70 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-070',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #71: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 10 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_71 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-071',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #72: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 11 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_72 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-072',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #73: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 12 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_73 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-073',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #74: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 13 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_74 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-074',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #75: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 14 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_75 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-075',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #76: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 15 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_76 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-076',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #77: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 16 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_77 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-077',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #78: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 17 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_78 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-078',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #79: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 18 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_79 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-079',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #80: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 19 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_80 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-080',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #81: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 20 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_81 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-081',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #82: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 21 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_82 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-082',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #83: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 22 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_83 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-083',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #84: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 23 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_84 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-084',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #85: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 24 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_85 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-085',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #86: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 25 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_86 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-086',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #87: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 26 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_87 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-087',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #88: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 27 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_88 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-088',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #89: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 28 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_89 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-089',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #90: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 29 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_90 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-090',
    category: 'Cơ sở Dữ liệu & Hệ phân tán',
    frontTerm: 'Technical Term #91: Core concept of Cơ sở Dữ liệu & Hệ phân tán',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 30 thuộc lĩnh vực Cơ sở Dữ liệu & Hệ phân tán.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Cơ sở Dữ liệu & Hệ phân tán, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_91 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Cơ sở Dữ liệu & Hệ phân tán";\n};',
    tags: ['cơ sở dữ liệu & hệ phân tán', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-091',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #92: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 1 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_92 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-092',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #93: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 2 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_93 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-093',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #94: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 3 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_94 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-094',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #95: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 4 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_95 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-095',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #96: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 5 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_96 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-096',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #97: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 6 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_97 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-097',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #98: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 7 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_98 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-098',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #99: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 8 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_99 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-099',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #100: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 9 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_100 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-100',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #101: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 10 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_101 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-101',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #102: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 11 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_102 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-102',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #103: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 12 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_103 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-103',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #104: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 13 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_104 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-104',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #105: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 14 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_105 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-105',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #106: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 15 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_106 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-106',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #107: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 16 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_107 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-107',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #108: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 17 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_108 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-108',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #109: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 18 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_109 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-109',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #110: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 19 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_110 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-110',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #111: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 20 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_111 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-111',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #112: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 21 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_112 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-112',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #113: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 22 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_113 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-113',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #114: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 23 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_114 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-114',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #115: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 24 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_115 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-115',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #116: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 25 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_116 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-116',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #117: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 26 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_117 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-117',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #118: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 27 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_118 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-118',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #119: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 28 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_119 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-119',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #120: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 29 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_120 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-120',
    category: 'Kiến trúc Máy tính & Hệ điều hành',
    frontTerm: 'Technical Term #121: Core concept of Kiến trúc Máy tính & Hệ điều hành',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 30 thuộc lĩnh vực Kiến trúc Máy tính & Hệ điều hành.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kiến trúc Máy tính & Hệ điều hành, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_121 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kiến trúc Máy tính & Hệ điều hành";\n};',
    tags: ['kiến trúc máy tính & hệ điều hành', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-121',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #122: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 1 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_122 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-122',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #123: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 2 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_123 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-123',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #124: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 3 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_124 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-124',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #125: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 4 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_125 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-125',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #126: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 5 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_126 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-126',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #127: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 6 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_127 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-127',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #128: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 7 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_128 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-128',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #129: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 8 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_129 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-129',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #130: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 9 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_130 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-130',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #131: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 10 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_131 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-131',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #132: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 11 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_132 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-132',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #133: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 12 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_133 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-133',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #134: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 13 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_134 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-134',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #135: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 14 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_135 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-135',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #136: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 15 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_136 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-136',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #137: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 16 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_137 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-137',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #138: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 17 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_138 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-138',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #139: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 18 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_139 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-139',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #140: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 19 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_140 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-140',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #141: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 20 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_141 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-141',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #142: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 21 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_142 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-142',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #143: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 22 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_143 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-143',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #144: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 23 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_144 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-144',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #145: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 24 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_145 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-145',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #146: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 25 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_146 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-146',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #147: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 26 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_147 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-147',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #148: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 27 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_148 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-148',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #149: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 28 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_149 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-149',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #150: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 29 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_150 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-150',
    category: 'Kỹ thuật Phần mềm & Clean Code',
    frontTerm: 'Technical Term #151: Core concept of Kỹ thuật Phần mềm & Clean Code',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 30 thuộc lĩnh vực Kỹ thuật Phần mềm & Clean Code.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Kỹ thuật Phần mềm & Clean Code, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_151 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Kỹ thuật Phần mềm & Clean Code";\n};',
    tags: ['kỹ thuật phần mềm & clean code', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-151',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #152: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 1 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_152 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-152',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #153: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 2 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_153 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-153',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #154: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 3 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_154 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-154',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #155: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 4 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_155 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-155',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #156: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 5 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_156 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-156',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #157: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 6 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_157 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-157',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #158: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 7 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_158 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-158',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #159: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 8 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_159 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-159',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #160: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 9 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_160 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-160',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #161: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 10 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_161 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-161',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #162: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 11 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_162 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-162',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #163: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 12 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_163 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-163',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #164: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 13 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_164 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-164',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #165: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 14 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_165 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-165',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #166: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 15 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_166 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-166',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #167: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 16 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_167 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-167',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #168: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 17 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_168 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-168',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #169: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 18 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_169 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-169',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #170: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 19 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_170 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-170',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #171: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 20 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_171 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-171',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #172: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 21 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_172 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-172',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #173: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 22 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_173 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-173',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #174: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 23 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_174 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-174',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #175: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 24 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_175 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-175',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #176: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 25 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_176 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-176',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #177: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 26 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_177 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-177',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #178: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 27 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_178 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-178',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #179: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 28 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_179 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-179',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #180: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 29 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_180 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-180',
    category: 'An toàn Thông tin & Mật mã học',
    frontTerm: 'Technical Term #181: Core concept of An toàn Thông tin & Mật mã học',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 30 thuộc lĩnh vực An toàn Thông tin & Mật mã học.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong An toàn Thông tin & Mật mã học, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_181 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý An toàn Thông tin & Mật mã học";\n};',
    tags: ['an toàn thông tin & mật mã học', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-181',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #182: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 1 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_182 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-182',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #183: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 2 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_183 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-183',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #184: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 3 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_184 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-184',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #185: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 4 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_185 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-185',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #186: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 5 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_186 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-186',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #187: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 6 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_187 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-187',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #188: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 7 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_188 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-188',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #189: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 8 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_189 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-189',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #190: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 9 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_190 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-190',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #191: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 10 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_191 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-191',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #192: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 11 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_192 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-192',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #193: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 12 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_193 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-193',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #194: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 13 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_194 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-194',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #195: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 14 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_195 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-195',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #196: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 15 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_196 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-196',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #197: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 16 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_197 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-197',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #198: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 17 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_198 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-198',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #199: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 18 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_199 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-199',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #200: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 19 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_200 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-200',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #201: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 20 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_201 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-201',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #202: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 21 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_202 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-202',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #203: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 22 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_203 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-203',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #204: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 23 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_204 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-204',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #205: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 24 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_205 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-205',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #206: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 25 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_206 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-206',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #207: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 26 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_207 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-207',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #208: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 27 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_208 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-208',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #209: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 28 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_209 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-209',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #210: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 29 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_210 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-210',
    category: 'Điện toán Đám mây & Container',
    frontTerm: 'Technical Term #211: Core concept of Điện toán Đám mây & Container',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 30 thuộc lĩnh vực Điện toán Đám mây & Container.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Điện toán Đám mây & Container, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_211 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Điện toán Đám mây & Container";\n};',
    tags: ['điện toán đám mây & container', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-211',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #212: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 1 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_212 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-212',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #213: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 2 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_213 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-213',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #214: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 3 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_214 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-214',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #215: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 4 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_215 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-215',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #216: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 5 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_216 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-216',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #217: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 6 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_217 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-217',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #218: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 7 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_218 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-218',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #219: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 8 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_219 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-219',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #220: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 9 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_220 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-220',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #221: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 10 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_221 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-221',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #222: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 11 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_222 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-222',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #223: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 12 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_223 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-223',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #224: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 13 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_224 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-224',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #225: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 14 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_225 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-225',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #226: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 15 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_226 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-226',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #227: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 16 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_227 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-227',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #228: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 17 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_228 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-228',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #229: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 18 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_229 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-229',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #230: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 19 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_230 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-230',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #231: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 20 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_231 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-231',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #232: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 21 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_232 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-232',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #233: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 22 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_233 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-233',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #234: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 23 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_234 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-234',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #235: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 24 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_235 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-235',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #236: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 25 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_236 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-236',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #237: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 26 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_237 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-237',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #238: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 27 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_238 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-238',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #239: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 28 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_239 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-239',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #240: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 29 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_240 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
  {
    id: 'FC-240',
    category: 'Trí tuệ Nhân tạo & Học máy',
    frontTerm: 'Technical Term #241: Core concept of Trí tuệ Nhân tạo & Học máy',
    phonetic: '/tɛkˈnɪkəl tɜːrm/',
    vietnameseMeaning: 'Khái niệm chuyên môn số 30 thuộc lĩnh vực Trí tuệ Nhân tạo & Học máy.',
    definition: 'Định nghĩa chi tiết: Đây là khái niệm cốt lõi trong Trí tuệ Nhân tạo & Học máy, mô tả cách thức tổ chức dữ liệu, trao đổi thông tin hoặc tối ưu hóa hiệu năng tính toán trong hệ thống phần mềm.',
    codeOrExample: '// Ví dụ minh họa\nconst exampleConcept_241 = () => {\n    return "Thực thi chuẩn mực theo nguyên lý Trí tuệ Nhân tạo & Học máy";\n};',
    tags: ['trí tuệ nhân tạo & học máy', 'thẻ ghi nhớ', 'ôn thi']
  },
];

export function getFlashcardsByCategory(category: string): Flashcard[] {
  return FLASHCARD_DECKS.filter((fc) => fc.category === category);
}
