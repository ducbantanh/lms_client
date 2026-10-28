/**
 * Cẩm nang chẩn đoán và khắc phục lỗi biên dịch & lỗi thực thi (Compiler Diagnostics Guide).
 * Tài liệu hỗ trợ sinh viên tự sửa lỗi khi làm bài thực hành lập trình tự động.
 */

export interface CompilerDiagnostic {
  errorCode: string;
  language: string;
  errorName: string;
  compilerMessageExample: string;
  rootCause: string;
  troubleshootingSteps: string[];
  buggyCodeSnippet: string;
  fixedCodeSnippet: string;
}

export const COMPILER_DIAGNOSTICS: CompilerDiagnostic[] = [
  {
    errorCode: 'DIAG-001',
    language: 'C/C++',
    errorName: 'Lỗi Cú pháp (Syntax Error / Parse Error) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_SYNTAX: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_2() {\n    // Thao tác phát sinh lỗi ERR_SYNTAX\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_2() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-002',
    language: 'C/C++',
    errorName: 'Con trỏ rỗng (NullPointerException / Segmentation Fault) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_NULL_POINTER: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_3() {\n    // Thao tác phát sinh lỗi ERR_NULL_POINTER\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_3() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-003',
    language: 'C/C++',
    errorName: 'Truy cập ngoài phạm vi mảng (Array Index Out Of Bounds) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_OUT_OF_BOUNDS: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_4() {\n    // Thao tác phát sinh lỗi ERR_OUT_OF_BOUNDS\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_4() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-004',
    language: 'C/C++',
    errorName: 'Sai lệch kiểu dữ liệu (Type Mismatch / TypeError) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_TYPE_MISMATCH: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_5() {\n    // Thao tác phát sinh lỗi ERR_TYPE_MISMATCH\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_5() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-005',
    language: 'C/C++',
    errorName: 'Biến chưa được định nghĩa (ReferenceError / Unresolved symbol) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_UNDEFINED_VAR: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_6() {\n    // Thao tác phát sinh lỗi ERR_UNDEFINED_VAR\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_6() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-006',
    language: 'C/C++',
    errorName: 'Tràn ngăn xếp do đệ quy vô hạn (StackOverflowError) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_STACK_OVERFLOW: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_7() {\n    // Thao tác phát sinh lỗi ERR_STACK_OVERFLOW\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_7() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-007',
    language: 'C/C++',
    errorName: 'Vượt quá giới hạn bộ nhớ (Out Of Memory / Memory Limit Exceeded) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_MEMORY_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_8() {\n    // Thao tác phát sinh lỗi ERR_MEMORY_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_8() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-008',
    language: 'C/C++',
    errorName: 'Vượt quá thời gian thực thi (Time Limit Exceeded - TLE) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_TIME_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_9() {\n    // Thao tác phát sinh lỗi ERR_TIME_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_9() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-009',
    language: 'C/C++',
    errorName: 'Bế tắc tài nguyên đồng thời (Deadlock Detected) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_DEADLOCK: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_10() {\n    // Thao tác phát sinh lỗi ERR_DEADLOCK\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_10() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-010',
    language: 'C/C++',
    errorName: 'Xung đột truy cập đồng thời (ConcurrentModificationException) trong C/C++',
    compilerMessageExample: '[COMPILER ERROR] ERR_CONCURRENCY: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của C/C++.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_11() {\n    // Thao tác phát sinh lỗi ERR_CONCURRENCY\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_11() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-011',
    language: 'Java',
    errorName: 'Lỗi Cú pháp (Syntax Error / Parse Error) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_SYNTAX: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_12() {\n    // Thao tác phát sinh lỗi ERR_SYNTAX\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_12() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-012',
    language: 'Java',
    errorName: 'Con trỏ rỗng (NullPointerException / Segmentation Fault) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_NULL_POINTER: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_13() {\n    // Thao tác phát sinh lỗi ERR_NULL_POINTER\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_13() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-013',
    language: 'Java',
    errorName: 'Truy cập ngoài phạm vi mảng (Array Index Out Of Bounds) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_OUT_OF_BOUNDS: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_14() {\n    // Thao tác phát sinh lỗi ERR_OUT_OF_BOUNDS\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_14() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-014',
    language: 'Java',
    errorName: 'Sai lệch kiểu dữ liệu (Type Mismatch / TypeError) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_TYPE_MISMATCH: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_15() {\n    // Thao tác phát sinh lỗi ERR_TYPE_MISMATCH\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_15() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-015',
    language: 'Java',
    errorName: 'Biến chưa được định nghĩa (ReferenceError / Unresolved symbol) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_UNDEFINED_VAR: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_16() {\n    // Thao tác phát sinh lỗi ERR_UNDEFINED_VAR\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_16() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-016',
    language: 'Java',
    errorName: 'Tràn ngăn xếp do đệ quy vô hạn (StackOverflowError) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_STACK_OVERFLOW: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_17() {\n    // Thao tác phát sinh lỗi ERR_STACK_OVERFLOW\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_17() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-017',
    language: 'Java',
    errorName: 'Vượt quá giới hạn bộ nhớ (Out Of Memory / Memory Limit Exceeded) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_MEMORY_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_18() {\n    // Thao tác phát sinh lỗi ERR_MEMORY_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_18() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-018',
    language: 'Java',
    errorName: 'Vượt quá thời gian thực thi (Time Limit Exceeded - TLE) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_TIME_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_19() {\n    // Thao tác phát sinh lỗi ERR_TIME_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_19() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-019',
    language: 'Java',
    errorName: 'Bế tắc tài nguyên đồng thời (Deadlock Detected) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_DEADLOCK: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_20() {\n    // Thao tác phát sinh lỗi ERR_DEADLOCK\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_20() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-020',
    language: 'Java',
    errorName: 'Xung đột truy cập đồng thời (ConcurrentModificationException) trong Java',
    compilerMessageExample: '[COMPILER ERROR] ERR_CONCURRENCY: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Java.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_21() {\n    // Thao tác phát sinh lỗi ERR_CONCURRENCY\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_21() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-021',
    language: 'Python',
    errorName: 'Lỗi Cú pháp (Syntax Error / Parse Error) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_SYNTAX: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_22() {\n    // Thao tác phát sinh lỗi ERR_SYNTAX\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_22() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-022',
    language: 'Python',
    errorName: 'Con trỏ rỗng (NullPointerException / Segmentation Fault) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_NULL_POINTER: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_23() {\n    // Thao tác phát sinh lỗi ERR_NULL_POINTER\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_23() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-023',
    language: 'Python',
    errorName: 'Truy cập ngoài phạm vi mảng (Array Index Out Of Bounds) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_OUT_OF_BOUNDS: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_24() {\n    // Thao tác phát sinh lỗi ERR_OUT_OF_BOUNDS\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_24() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-024',
    language: 'Python',
    errorName: 'Sai lệch kiểu dữ liệu (Type Mismatch / TypeError) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_TYPE_MISMATCH: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_25() {\n    // Thao tác phát sinh lỗi ERR_TYPE_MISMATCH\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_25() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-025',
    language: 'Python',
    errorName: 'Biến chưa được định nghĩa (ReferenceError / Unresolved symbol) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_UNDEFINED_VAR: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_26() {\n    // Thao tác phát sinh lỗi ERR_UNDEFINED_VAR\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_26() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-026',
    language: 'Python',
    errorName: 'Tràn ngăn xếp do đệ quy vô hạn (StackOverflowError) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_STACK_OVERFLOW: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_27() {\n    // Thao tác phát sinh lỗi ERR_STACK_OVERFLOW\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_27() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-027',
    language: 'Python',
    errorName: 'Vượt quá giới hạn bộ nhớ (Out Of Memory / Memory Limit Exceeded) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_MEMORY_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_28() {\n    // Thao tác phát sinh lỗi ERR_MEMORY_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_28() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-028',
    language: 'Python',
    errorName: 'Vượt quá thời gian thực thi (Time Limit Exceeded - TLE) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_TIME_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_29() {\n    // Thao tác phát sinh lỗi ERR_TIME_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_29() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-029',
    language: 'Python',
    errorName: 'Bế tắc tài nguyên đồng thời (Deadlock Detected) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_DEADLOCK: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_30() {\n    // Thao tác phát sinh lỗi ERR_DEADLOCK\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_30() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-030',
    language: 'Python',
    errorName: 'Xung đột truy cập đồng thời (ConcurrentModificationException) trong Python',
    compilerMessageExample: '[COMPILER ERROR] ERR_CONCURRENCY: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của Python.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_31() {\n    // Thao tác phát sinh lỗi ERR_CONCURRENCY\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_31() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-031',
    language: 'TypeScript',
    errorName: 'Lỗi Cú pháp (Syntax Error / Parse Error) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_SYNTAX: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_32() {\n    // Thao tác phát sinh lỗi ERR_SYNTAX\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_32() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-032',
    language: 'TypeScript',
    errorName: 'Con trỏ rỗng (NullPointerException / Segmentation Fault) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_NULL_POINTER: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_33() {\n    // Thao tác phát sinh lỗi ERR_NULL_POINTER\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_33() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-033',
    language: 'TypeScript',
    errorName: 'Truy cập ngoài phạm vi mảng (Array Index Out Of Bounds) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_OUT_OF_BOUNDS: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_34() {\n    // Thao tác phát sinh lỗi ERR_OUT_OF_BOUNDS\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_34() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-034',
    language: 'TypeScript',
    errorName: 'Sai lệch kiểu dữ liệu (Type Mismatch / TypeError) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_TYPE_MISMATCH: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_35() {\n    // Thao tác phát sinh lỗi ERR_TYPE_MISMATCH\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_35() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-035',
    language: 'TypeScript',
    errorName: 'Biến chưa được định nghĩa (ReferenceError / Unresolved symbol) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_UNDEFINED_VAR: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_36() {\n    // Thao tác phát sinh lỗi ERR_UNDEFINED_VAR\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_36() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-036',
    language: 'TypeScript',
    errorName: 'Tràn ngăn xếp do đệ quy vô hạn (StackOverflowError) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_STACK_OVERFLOW: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_37() {\n    // Thao tác phát sinh lỗi ERR_STACK_OVERFLOW\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_37() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-037',
    language: 'TypeScript',
    errorName: 'Vượt quá giới hạn bộ nhớ (Out Of Memory / Memory Limit Exceeded) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_MEMORY_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_38() {\n    // Thao tác phát sinh lỗi ERR_MEMORY_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_38() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-038',
    language: 'TypeScript',
    errorName: 'Vượt quá thời gian thực thi (Time Limit Exceeded - TLE) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_TIME_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_39() {\n    // Thao tác phát sinh lỗi ERR_TIME_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_39() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-039',
    language: 'TypeScript',
    errorName: 'Bế tắc tài nguyên đồng thời (Deadlock Detected) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_DEADLOCK: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_40() {\n    // Thao tác phát sinh lỗi ERR_DEADLOCK\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_40() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-040',
    language: 'TypeScript',
    errorName: 'Xung đột truy cập đồng thời (ConcurrentModificationException) trong TypeScript',
    compilerMessageExample: '[COMPILER ERROR] ERR_CONCURRENCY: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của TypeScript.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_41() {\n    // Thao tác phát sinh lỗi ERR_CONCURRENCY\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_41() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-041',
    language: 'SQL',
    errorName: 'Lỗi Cú pháp (Syntax Error / Parse Error) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_SYNTAX: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_42() {\n    // Thao tác phát sinh lỗi ERR_SYNTAX\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_42() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-042',
    language: 'SQL',
    errorName: 'Con trỏ rỗng (NullPointerException / Segmentation Fault) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_NULL_POINTER: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_43() {\n    // Thao tác phát sinh lỗi ERR_NULL_POINTER\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_43() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-043',
    language: 'SQL',
    errorName: 'Truy cập ngoài phạm vi mảng (Array Index Out Of Bounds) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_OUT_OF_BOUNDS: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_44() {\n    // Thao tác phát sinh lỗi ERR_OUT_OF_BOUNDS\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_44() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-044',
    language: 'SQL',
    errorName: 'Sai lệch kiểu dữ liệu (Type Mismatch / TypeError) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_TYPE_MISMATCH: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_45() {\n    // Thao tác phát sinh lỗi ERR_TYPE_MISMATCH\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_45() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-045',
    language: 'SQL',
    errorName: 'Biến chưa được định nghĩa (ReferenceError / Unresolved symbol) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_UNDEFINED_VAR: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_46() {\n    // Thao tác phát sinh lỗi ERR_UNDEFINED_VAR\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_46() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-046',
    language: 'SQL',
    errorName: 'Tràn ngăn xếp do đệ quy vô hạn (StackOverflowError) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_STACK_OVERFLOW: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_47() {\n    // Thao tác phát sinh lỗi ERR_STACK_OVERFLOW\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_47() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-047',
    language: 'SQL',
    errorName: 'Vượt quá giới hạn bộ nhớ (Out Of Memory / Memory Limit Exceeded) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_MEMORY_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_48() {\n    // Thao tác phát sinh lỗi ERR_MEMORY_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_48() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-048',
    language: 'SQL',
    errorName: 'Vượt quá thời gian thực thi (Time Limit Exceeded - TLE) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_TIME_LIMIT: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_49() {\n    // Thao tác phát sinh lỗi ERR_TIME_LIMIT\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_49() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-049',
    language: 'SQL',
    errorName: 'Bế tắc tài nguyên đồng thời (Deadlock Detected) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_DEADLOCK: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_50() {\n    // Thao tác phát sinh lỗi ERR_DEADLOCK\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_50() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
  {
    errorCode: 'DIAG-050',
    language: 'SQL',
    errorName: 'Xung đột truy cập đồng thời (ConcurrentModificationException) trong SQL',
    compilerMessageExample: '[COMPILER ERROR] ERR_CONCURRENCY: In function "solve()" - unexpected token or violation encountered.',
    rootCause: 'Nguyên nhân gốc rễ: Thao tác dữ liệu không tuân thủ quy tắc quản lý bộ nhớ hoặc kiểu dữ liệu của SQL.',
    troubleshootingSteps: [
      'Đọc kỹ số dòng và vị trí ký tự được chỉ định trong thông báo lỗi.',
      'Kiểm tra điều kiện biên và trường hợp mảng rỗng trước khi truy cập.',
      'Sử dụng công cụ debug hoặc in giá trị biến ra màn hình để theo dõi luồng thực thi.'
    ],
    buggyCodeSnippet: '// Mã lỗi ví dụ\nvoid test_51() {\n    // Thao tác phát sinh lỗi ERR_CONCURRENCY\n}',
    fixedCodeSnippet: '// Mã đã khắc phục\nvoid test_51() {\n    // Thao tác an toàn đã qua kiểm tra\n}'
  },
];

export function findDiagnosticsByLanguage(lang: string): CompilerDiagnostic[] {
  return COMPILER_DIAGNOSTICS.filter((d) => d.language.toLowerCase() === lang.toLowerCase());
}
