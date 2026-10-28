/**
 * Danh mục các bài thực hành Lab tương tác chuyên sâu cho sinh viên CNTT.
 * Bao gồm mục tiêu, kịch bản thực thi, các bước tuần tự và tiêu chí đánh giá.
 */

export interface LabStep {
  stepNumber: number;
  title: string;
  commandOrCode: string;
  expectedOutput: string;
  explanation: string;
  troubleshootingTips: string[];
}

export interface InteractiveLab {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: 'CƠ BẢN' | 'TRUNG BÌNH' | 'NÂNG CAO';
  environment: string;
  prerequisites: string[];
  overview: string;
  steps: LabStep[];
}

export const INTERACTIVE_LABS: InteractiveLab[] = [
  {
    id: 'LAB-001',
    title: 'Lập trình Socket TCP/IP với C/C++',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'TRUNG BÌNH',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Lập trình Socket TCP/IP với C/C++" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Lập trình Socket TCP/IP với C/C++',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-002',
    title: 'Thiết kế CSDL Quan hệ Chuẩn 3NF',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'NÂNG CAO',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Thiết kế CSDL Quan hệ Chuẩn 3NF" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Thiết kế CSDL Quan hệ Chuẩn 3NF',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-003',
    title: 'Cấu hình Web Server Nginx & Reverse Proxy',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'TRUNG BÌNH',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Cấu hình Web Server Nginx & Reverse Proxy" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Cấu hình Web Server Nginx & Reverse Proxy',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-004',
    title: 'Quản trị Hệ thống Linux & Bash Shell Scripting',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'CƠ BẢN',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Quản trị Hệ thống Linux & Bash Shell Scripting" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Quản trị Hệ thống Linux & Bash Shell Scripting',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-005',
    title: 'Xây dựng RESTful API với Spring Boot',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'NÂNG CAO',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Xây dựng RESTful API với Spring Boot" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Xây dựng RESTful API với Spring Boot',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-006',
    title: 'Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'CƠ BẢN',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Truy vấn Dữ liệu Nâng cao với PostgreSQL & Indexing',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-007',
    title: 'Triển khai Container với Docker & Docker Compose',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'TRUNG BÌNH',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Triển khai Container với Docker & Docker Compose" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Triển khai Container với Docker & Docker Compose',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-008',
    title: 'Giám sát Hệ thống với Prometheus & Grafana',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'NÂNG CAO',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Giám sát Hệ thống với Prometheus & Grafana" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Giám sát Hệ thống với Prometheus & Grafana',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-009',
    title: 'Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'TRUNG BÌNH',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Bảo mật Ứng dụng Web chống tấn công OWASP Top 10" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Bảo mật Ứng dụng Web chống tấn công OWASP Top 10',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-010',
    title: 'Lập trình Đa luồng và Xử lý Đồng thời trong Java',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'CƠ BẢN',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Lập trình Đa luồng và Xử lý Đồng thời trong Java" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Lập trình Đa luồng và Xử lý Đồng thời trong Java',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-011',
    title: 'Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'NÂNG CAO',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Thuật toán Mã hóa Bất đối xứng RSA & Chữ ký số',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
  {
    id: 'LAB-012',
    title: 'Phân tích Lưu lượng Mạng với Wireshark',
    category: 'Thực hành Chuyên ngành',
    durationMinutes: 90,
    difficulty: 'CƠ BẢN',
    environment: 'Ubuntu 22.04 LTS / Docker Container',
    prerequisites: ['Kiến thức cơ bản về môn học', 'Kỹ năng sử dụng dòng lệnh Terminal'],
    overview: 'Bài lab "Phân tích Lưu lượng Mạng với Wireshark" hướng dẫn sinh viên từng bước thực hành trên môi trường mô phỏng thực tế. Yêu cầu sinh viên hoàn thành toàn bộ các bước và ghi lại kết quả thực nghiệm.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Cấu hình và thực thi giai đoạn 1 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 1\n$ sudo systemctl status service-1 || docker run -d --name lab-step-1 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 1 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Cấu hình và thực thi giai đoạn 2 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 2\n$ sudo systemctl status service-2 || docker run -d --name lab-step-2 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 2 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Cấu hình và thực thi giai đoạn 3 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 3\n$ sudo systemctl status service-3 || docker run -d --name lab-step-3 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 3 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Bước 4: Cấu hình và thực thi giai đoạn 4 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 4\n$ sudo systemctl status service-4 || docker run -d --name lab-step-4 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 4 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Bước 5: Cấu hình và thực thi giai đoạn 5 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 5\n$ sudo systemctl status service-5 || docker run -d --name lab-step-5 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 5 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Bước 6: Cấu hình và thực thi giai đoạn 6 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 6\n$ sudo systemctl status service-6 || docker run -d --name lab-step-6 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 6 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Bước 7: Cấu hình và thực thi giai đoạn 7 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 7\n$ sudo systemctl status service-7 || docker run -d --name lab-step-7 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 7 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 8,
        title: 'Bước 8: Cấu hình và thực thi giai đoạn 8 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 8\n$ sudo systemctl status service-8 || docker run -d --name lab-step-8 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 8 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Bước 9: Cấu hình và thực thi giai đoạn 9 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 9\n$ sudo systemctl status service-9 || docker run -d --name lab-step-9 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 9 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 10,
        title: 'Bước 10: Cấu hình và thực thi giai đoạn 10 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 10\n$ sudo systemctl status service-10 || docker run -d --name lab-step-10 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 10 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 11,
        title: 'Bước 11: Cấu hình và thực thi giai đoạn 11 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 11\n$ sudo systemctl status service-11 || docker run -d --name lab-step-11 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 11 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Bước 12: Cấu hình và thực thi giai đoạn 12 của Phân tích Lưu lượng Mạng với Wireshark',
        commandOrCode: '# Giai đoạn 12\n$ sudo systemctl status service-12 || docker run -d --name lab-step-12 alpine:latest',
        expectedOutput: '[SUCCESS] Giai đoạn 12 đã được khởi tạo thành công với mã trạng thái 200 OK.',
        explanation: 'Bước này thiết lập môi trường cần thiết để đảm bảo tính sẵn sàng của các thành phần dịch vụ trước khi sang bước tiếp theo.',
        troubleshootingTips: [
          'Kiểm tra quyền truy cập sudo trước khi thực hiện.',
          'Đảm bảo cổng kết nối không bị chiếm dụng bởi tiến trình khác.',
          'Xem lại tệp nhật ký hệ thống tại /var/log/app.log nếu phát sinh lỗi kết nối.'
        ]
      },
    ]
  },
];

export function getLabById(id: string): InteractiveLab | undefined {
  return INTERACTIVE_LABS.find((l) => l.id === id);
}
