/**
 * Ngân hàng bài tập lập trình chuyên sâu của hệ thống F LMS.
 * Cung cấp mô tả kỹ thuật, ràng buộc dữ liệu, test cases mẫu và test cases ẩn,
 * kèm template code cho C++, Java và Python.
 */

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
  isHidden?: boolean;
}

export interface ProgrammingProblem {
  id: string;
  code: string;
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
  points: number;
  timeLimitMs: number;
  memoryLimitMb: number;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  starterCode: {
    cpp: string;
    java: string;
    python: string;
  };
  sampleTestCases: TestCase[];
  hiddenTestCases: TestCase[];
  tags: string[];
}

export const PROGRAMMING_PROBLEMS: ProgrammingProblem[] = [
  {
    id: 'p01',
    code: 'PROG-01',
    title: 'Tính tổng dãy số Fibonacci',
    difficulty: 'EASY',
    category: 'Thuật toán cơ bản',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Tính tổng dãy số Fibonacci". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['thuật toán cơ bản', 'lập trình', 'thuật toán']
  },
  {
    id: 'p02',
    code: 'PROG-02',
    title: 'Tìm kiếm nhị phân trên mảng đã sắp',
    difficulty: 'EASY',
    category: 'Tìm kiếm',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Tìm kiếm nhị phân trên mảng đã sắp". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['tìm kiếm', 'lập trình', 'thuật toán']
  },
  {
    id: 'p03',
    code: 'PROG-03',
    title: 'Kiểm tra chuỗi đối xứng (Palindrome)',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Kiểm tra chuỗi đối xứng (Palindrome)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['xử lý chuỗi', 'lập trình', 'thuật toán']
  },
  {
    id: 'p04',
    code: 'PROG-04',
    title: 'Sắp xếp trộn (Merge Sort)',
    difficulty: 'MEDIUM',
    category: 'Sắp xếp',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Sắp xếp trộn (Merge Sort)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['sắp xếp', 'lập trình', 'thuật toán']
  },
  {
    id: 'p05',
    code: 'PROG-05',
    title: 'Sắp xếp nhanh (Quick Sort)',
    difficulty: 'MEDIUM',
    category: 'Sắp xếp',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Sắp xếp nhanh (Quick Sort)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['sắp xếp', 'lập trình', 'thuật toán']
  },
  {
    id: 'p06',
    code: 'PROG-06',
    title: 'Bài toán cái túi 0/1 (Knapsack Problem)',
    difficulty: 'HARD',
    category: 'Quy hoạch động',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Bài toán cái túi 0/1 (Knapsack Problem)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['quy hoạch động', 'lập trình', 'thuật toán']
  },
  {
    id: 'p07',
    code: 'PROG-07',
    title: 'Dãy con tăng dài nhất (LIS)',
    difficulty: 'MEDIUM',
    category: 'Quy hoạch động',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Dãy con tăng dài nhất (LIS)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['quy hoạch động', 'lập trình', 'thuật toán']
  },
  {
    id: 'p08',
    code: 'PROG-08',
    title: 'Tìm đường đi ngắn nhất Dijkstra',
    difficulty: 'HARD',
    category: 'Đồ thị',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Tìm đường đi ngắn nhất Dijkstra". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['đồ thị', 'lập trình', 'thuật toán']
  },
  {
    id: 'p09',
    code: 'PROG-09',
    title: 'Duyệt đồ thị theo chiều rộng (BFS)',
    difficulty: 'MEDIUM',
    category: 'Đồ thị',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Duyệt đồ thị theo chiều rộng (BFS)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['đồ thị', 'lập trình', 'thuật toán']
  },
  {
    id: 'p10',
    code: 'PROG-10',
    title: 'Duyệt đồ thị theo chiều sâu (DFS)',
    difficulty: 'MEDIUM',
    category: 'Đồ thị',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Duyệt đồ thị theo chiều sâu (DFS)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['đồ thị', 'lập trình', 'thuật toán']
  },
  {
    id: 'p11',
    code: 'PROG-11',
    title: 'Đảo ngược danh sách liên kết đơn',
    difficulty: 'MEDIUM',
    category: 'Cấu trúc dữ liệu',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Đảo ngược danh sách liên kết đơn". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['cấu trúc dữ liệu', 'lập trình', 'thuật toán']
  },
  {
    id: 'p12',
    code: 'PROG-12',
    title: 'Kiểm tra tính hợp lệ của dấu ngoặc',
    difficulty: 'EASY',
    category: 'Ngăn xếp (Stack)',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Kiểm tra tính hợp lệ của dấu ngoặc". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['ngăn xếp (stack)', 'lập trình', 'thuật toán']
  },
  {
    id: 'p13',
    code: 'PROG-13',
    title: 'Tìm cây khung nhỏ nhất Kruskal',
    difficulty: 'HARD',
    category: 'Đồ thị',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Tìm cây khung nhỏ nhất Kruskal". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['đồ thị', 'lập trình', 'thuật toán']
  },
  {
    id: 'p14',
    code: 'PROG-14',
    title: 'Tìm chu trình trong đồ thị có hướng',
    difficulty: 'MEDIUM',
    category: 'Đồ thị',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Tìm chu trình trong đồ thị có hướng". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['đồ thị', 'lập trình', 'thuật toán']
  },
  {
    id: 'p15',
    code: 'PROG-15',
    title: 'Nhân hai ma trận kích thước N x N',
    difficulty: 'EASY',
    category: 'Mảng 2 chiều',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Nhân hai ma trận kích thước N x N". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['mảng 2 chiều', 'lập trình', 'thuật toán']
  },
  {
    id: 'p16',
    code: 'PROG-16',
    title: 'Cây nhị phân tìm kiếm (BST Insert & Search)',
    difficulty: 'MEDIUM',
    category: 'Cây nhị phân',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Cây nhị phân tìm kiếm (BST Insert & Search)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['cây nhị phân', 'lập trình', 'thuật toán']
  },
  {
    id: 'p17',
    code: 'PROG-17',
    title: 'Thuật toán tìm kiếm xâu KMP',
    difficulty: 'HARD',
    category: 'Xử lý chuỗi',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Thuật toán tìm kiếm xâu KMP". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['xử lý chuỗi', 'lập trình', 'thuật toán']
  },
  {
    id: 'p18',
    code: 'PROG-18',
    title: 'Tính luồng cực đại Ford-Fulkerson',
    difficulty: 'HARD',
    category: 'Mạng luồng',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Tính luồng cực đại Ford-Fulkerson". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['mạng luồng', 'lập trình', 'thuật toán']
  },
  {
    id: 'p19',
    code: 'PROG-19',
    title: 'Xếp hậu (N-Queens Problem)',
    difficulty: 'HARD',
    category: 'Quay lui (Backtracking)',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Xếp hậu (N-Queens Problem)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['quay lui (backtracking)', 'lập trình', 'thuật toán']
  },
  {
    id: 'p20',
    code: 'PROG-20',
    title: 'Mã hóa và giải mã Huffman',
    difficulty: 'HARD',
    category: 'Nén dữ liệu',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Mã hóa và giải mã Huffman". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['nén dữ liệu', 'lập trình', 'thuật toán']
  },
  {
    id: 'p21',
    code: 'PROG-21',
    title: 'Ước số chung lớn nhất & Bội số chung nhỏ nhất',
    difficulty: 'EASY',
    category: 'Toán học',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Ước số chung lớn nhất & Bội số chung nhỏ nhất". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['toán học', 'lập trình', 'thuật toán']
  },
  {
    id: 'p22',
    code: 'PROG-22',
    title: 'Sàng nguyên tố Eratosthenes',
    difficulty: 'EASY',
    category: 'Toán học',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Sàng nguyên tố Eratosthenes". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['toán học', 'lập trình', 'thuật toán']
  },
  {
    id: 'p23',
    code: 'PROG-23',
    title: 'Lũy thừa ma trận nhị phân O(log N)',
    difficulty: 'MEDIUM',
    category: 'Toán học',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Lũy thừa ma trận nhị phân O(log N)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['toán học', 'lập trình', 'thuật toán']
  },
  {
    id: 'p24',
    code: 'PROG-24',
    title: 'Cây chỉ số nhị phân (Fenwick Tree / BIT)',
    difficulty: 'HARD',
    category: 'Cấu trúc dữ liệu nâng cao',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Cây chỉ số nhị phân (Fenwick Tree / BIT)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['cấu trúc dữ liệu nâng cao', 'lập trình', 'thuật toán']
  },
  {
    id: 'p25',
    code: 'PROG-25',
    title: 'Cây phân đoạn (Segment Tree with Lazy Propagation)',
    difficulty: 'HARD',
    category: 'Cấu trúc dữ liệu nâng cao',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Cây phân đoạn (Segment Tree with Lazy Propagation)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['cấu trúc dữ liệu nâng cao', 'lập trình', 'thuật toán']
  },
  {
    id: 'p26',
    code: 'PROG-26',
    title: 'Tập hợp các phần tử không giao nhau (Disjoint Set Union - DSU)',
    difficulty: 'MEDIUM',
    category: 'Cấu trúc dữ liệu',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Tập hợp các phần tử không giao nhau (Disjoint Set Union - DSU)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['cấu trúc dữ liệu', 'lập trình', 'thuật toán']
  },
  {
    id: 'p27',
    code: 'PROG-27',
    title: 'Xoay ma trận 90 độ theo chiều kim đồng hồ',
    difficulty: 'MEDIUM',
    category: 'Mảng 2 chiều',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Xoay ma trận 90 độ theo chiều kim đồng hồ". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['mảng 2 chiều', 'lập trình', 'thuật toán']
  },
  {
    id: 'p28',
    code: 'PROG-28',
    title: 'Tìm phần tử lớn thứ K trong mảng (Quickselect)',
    difficulty: 'MEDIUM',
    category: 'Sắp xếp & Tìm kiếm',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Tìm phần tử lớn thứ K trong mảng (Quickselect)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['sắp xếp & tìm kiếm', 'lập trình', 'thuật toán']
  },
  {
    id: 'p29',
    code: 'PROG-29',
    title: 'Hàng đợi ưu tiên (Binary Min-Heap Implementation)',
    difficulty: 'MEDIUM',
    category: 'Cấu trúc dữ liệu',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Hàng đợi ưu tiên (Binary Min-Heap Implementation)". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['cấu trúc dữ liệu', 'lập trình', 'thuật toán']
  },
  {
    id: 'p30',
    code: 'PROG-30',
    title: 'Thuật toán tìm bao lồi Graham Scan',
    difficulty: 'HARD',
    category: 'Hình học tính toán',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: 'Cho bài toán "Thuật toán tìm bao lồi Graham Scan". Yêu cầu sinh viên lập trình giải quyết bài toán với độ phức tạp tối ưu nhất. Đọc kỹ định dạng đầu vào và đầu ra để tránh lỗi định dạng (Presentation Error).',
    inputFormat: 'Dòng đầu chứa số lượng test cases T hoặc kích thước dữ liệu N.\nCác dòng tiếp theo chứa các phần tử của dữ liệu đầu vào.',
    outputFormat: 'In ra kết quả của từng truy vấn trên một dòng riêng biệt.',
    constraints: [
      '1 <= N <= 100,000',
      'Thời gian chạy tối đa: 1.0 giây',
      'Bộ nhớ tối đa: 256 MB',
      'Định dạng đầu ra phải đúng từng khoảng trắng và ký tự xuống dòng'
    ],
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    // Viết code xử lý ở đây\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}',
      java: 'import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Viết code xử lý ở đây\n    }\n}',
      python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    # Viết code xử lý ở đây\n    pass\n\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [
      {
        input: '5\n1 2 3 4 5',
        expectedOutput: '15',
        explanation: 'Tổng của các phần tử là 1+2+3+4+5=15.'
      },
      {
        input: '3\n10 20 30',
        expectedOutput: '60',
        explanation: 'Tổng của các phần tử là 10+20+30=60.'
      }
    ],
    hiddenTestCases: [
      { input: '1\n0', expectedOutput: '0', isHidden: true },
      { input: '4\n-5 -2 0 10', expectedOutput: '3', isHidden: true },
      { input: '10\n1 1 1 1 1 1 1 1 1 1', expectedOutput: '10', isHidden: true }
    ],
    tags: ['hình học tính toán', 'lập trình', 'thuật toán']
  },
  {
    id: 'p31',
    code: 'PROG-31',
    title: 'Bài toán chuyên sâu số 31: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 31.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 31\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 31\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 31\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p32',
    code: 'PROG-32',
    title: 'Bài toán chuyên sâu số 32: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Quy hoạch động',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 32.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 32\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 32\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 32\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p33',
    code: 'PROG-33',
    title: 'Bài toán chuyên sâu số 33: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 33.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 33\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 33\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 33\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p34',
    code: 'PROG-34',
    title: 'Bài toán chuyên sâu số 34: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Xử lý chuỗi',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 34.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 34\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 34\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 34\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p35',
    code: 'PROG-35',
    title: 'Bài toán chuyên sâu số 35: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 35.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 35\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 35\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 35\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p36',
    code: 'PROG-36',
    title: 'Bài toán chuyên sâu số 36: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Quy hoạch động',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 36.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 36\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 36\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 36\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p37',
    code: 'PROG-37',
    title: 'Bài toán chuyên sâu số 37: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 37.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 37\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 37\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 37\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p38',
    code: 'PROG-38',
    title: 'Bài toán chuyên sâu số 38: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Xử lý chuỗi',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 38.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 38\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 38\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 38\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p39',
    code: 'PROG-39',
    title: 'Bài toán chuyên sâu số 39: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 39.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 39\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 39\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 39\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p40',
    code: 'PROG-40',
    title: 'Bài toán chuyên sâu số 40: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Quy hoạch động',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 40.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 40\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 40\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 40\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p41',
    code: 'PROG-41',
    title: 'Bài toán chuyên sâu số 41: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 41.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 41\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 41\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 41\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p42',
    code: 'PROG-42',
    title: 'Bài toán chuyên sâu số 42: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 42.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 42\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 42\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 42\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p43',
    code: 'PROG-43',
    title: 'Bài toán chuyên sâu số 43: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 43.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 43\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 43\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 43\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p44',
    code: 'PROG-44',
    title: 'Bài toán chuyên sâu số 44: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Quy hoạch động',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 44.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 44\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 44\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 44\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p45',
    code: 'PROG-45',
    title: 'Bài toán chuyên sâu số 45: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 45.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 45\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 45\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 45\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p46',
    code: 'PROG-46',
    title: 'Bài toán chuyên sâu số 46: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Xử lý chuỗi',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 46.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 46\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 46\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 46\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p47',
    code: 'PROG-47',
    title: 'Bài toán chuyên sâu số 47: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 47.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 47\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 47\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 47\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p48',
    code: 'PROG-48',
    title: 'Bài toán chuyên sâu số 48: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Quy hoạch động',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 48.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 48\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 48\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 48\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p49',
    code: 'PROG-49',
    title: 'Bài toán chuyên sâu số 49: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 49.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 49\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 49\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 49\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p50',
    code: 'PROG-50',
    title: 'Bài toán chuyên sâu số 50: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Xử lý chuỗi',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 50.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 50\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 50\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 50\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p51',
    code: 'PROG-51',
    title: 'Bài toán chuyên sâu số 51: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 51.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 51\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 51\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 51\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p52',
    code: 'PROG-52',
    title: 'Bài toán chuyên sâu số 52: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Quy hoạch động',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 52.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 52\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 52\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 52\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p53',
    code: 'PROG-53',
    title: 'Bài toán chuyên sâu số 53: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 53.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 53\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 53\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 53\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p54',
    code: 'PROG-54',
    title: 'Bài toán chuyên sâu số 54: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 54.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 54\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 54\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 54\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p55',
    code: 'PROG-55',
    title: 'Bài toán chuyên sâu số 55: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 55.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 55\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 55\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 55\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p56',
    code: 'PROG-56',
    title: 'Bài toán chuyên sâu số 56: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Quy hoạch động',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 56.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 56\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 56\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 56\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p57',
    code: 'PROG-57',
    title: 'Bài toán chuyên sâu số 57: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 57.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 57\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 57\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 57\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p58',
    code: 'PROG-58',
    title: 'Bài toán chuyên sâu số 58: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Xử lý chuỗi',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 58.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 58\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 58\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 58\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p59',
    code: 'PROG-59',
    title: 'Bài toán chuyên sâu số 59: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 59.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 59\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 59\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 59\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p60',
    code: 'PROG-60',
    title: 'Bài toán chuyên sâu số 60: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Quy hoạch động',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 60.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 60\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 60\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 60\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p61',
    code: 'PROG-61',
    title: 'Bài toán chuyên sâu số 61: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 61.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 61\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 61\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 61\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p62',
    code: 'PROG-62',
    title: 'Bài toán chuyên sâu số 62: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Xử lý chuỗi',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 62.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 62\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 62\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 62\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p63',
    code: 'PROG-63',
    title: 'Bài toán chuyên sâu số 63: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 63.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 63\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 63\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 63\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p64',
    code: 'PROG-64',
    title: 'Bài toán chuyên sâu số 64: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Quy hoạch động',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 64.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 64\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 64\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 64\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p65',
    code: 'PROG-65',
    title: 'Bài toán chuyên sâu số 65: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 65.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 65\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 65\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 65\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p66',
    code: 'PROG-66',
    title: 'Bài toán chuyên sâu số 66: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 66.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 66\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 66\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 66\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p67',
    code: 'PROG-67',
    title: 'Bài toán chuyên sâu số 67: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'EASY',
    category: 'Xử lý chuỗi',
    points: 10,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 67.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 67\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 67\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 67\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p68',
    code: 'PROG-68',
    title: 'Bài toán chuyên sâu số 68: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Quy hoạch động',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 68.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 68\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 68\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 68\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p69',
    code: 'PROG-69',
    title: 'Bài toán chuyên sâu số 69: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'HARD',
    category: 'Đồ thị nâng cao',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 69.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 69\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 69\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 69\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
  {
    id: 'p70',
    code: 'PROG-70',
    title: 'Bài toán chuyên sâu số 70: Thuật toán tối ưu hóa trong đồ thị và quy hoạch động',
    difficulty: 'MEDIUM',
    category: 'Xử lý chuỗi',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 512,
    description: 'Cho cấu trúc dữ liệu đồ thị hoặc mảng N phần tử. Yêu cầu tính toán giá trị tối ưu theo điều kiện bài toán số 70.',
    inputFormat: 'Dòng đầu chứa N và M. M dòng tiếp theo chứa các liên kết hoặc trọng số.',
    outputFormat: 'In ra một số nguyên duy nhất là kết quả tối ưu.',
    constraints: ['1 <= N <= 200,000', '1 <= M <= 500,000', 'Thời gian chạy <= 1.5s'],
    starterCode: {
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Giải thuật bài 70\n    return 0;\n}',
      java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Giải thuật bài 70\n    }\n}',
      python: 'import sys\ninput = sys.stdin.read\ndef solve():\n    # Giải thuật bài 70\n    pass\nif __name__ == "__main__":\n    solve()',
    },
    sampleTestCases: [{ input: '4 4\n1 2\n2 3\n3 4\n4 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: '2 1\n1 2', expectedOutput: '0', isHidden: true }],
    tags: ['thuật toán', 'nâng cao', 'olympic']
  },
];

export function getProblemById(id: string): ProgrammingProblem | undefined {
  return PROGRAMMING_PROBLEMS.find((p) => p.id === id || p.code === id);
}

export function filterProblems(params: {
  category?: string;
  difficulty?: string;
  search?: string;
}): ProgrammingProblem[] {
  return PROGRAMMING_PROBLEMS.filter((p) => {
    if (params.category && params.category !== 'all' && p.category !== params.category) return false;
    if (params.difficulty && params.difficulty !== 'all' && p.difficulty !== params.difficulty) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });
}
