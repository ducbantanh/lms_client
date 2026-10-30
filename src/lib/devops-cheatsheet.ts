/**
 * Bảng tra cứu lệnh Git, Linux & Docker chuẩn hóa (DevOps & Tools Cheat Sheet).
 * Hỗ trợ sinh viên tra cứu nhanh cú pháp, cờ tham số và ví dụ thực hành môn Lập trình mạng & Hệ điều hành.
 */

export interface CommandEntry {
  command: string;
  syntax: string;
  category: 'Git' | 'Linux' | 'Docker' | 'Networking';
  description: string;
  example: string;
  flags: { flag: string; meaning: string }[];
}

export const DEVOPS_CHEATSHEET: CommandEntry[] = [
  // Git
  {
    command: 'git branch',
    syntax: 'git branch [options] <branch-name>',
    category: 'Git',
    description: 'Liệt kê, tạo mới hoặc xóa các nhánh trong kho lưu trữ Git.',
    example: 'git checkout -b feature/login',
    flags: [
      { flag: '-a', meaning: 'Liệt kê cả nhánh cục bộ và nhánh remote' },
      { flag: '-d', meaning: 'Xóa nhánh an toàn sau khi đã gộp (merged)' },
      { flag: '-D', meaning: 'Bắt buộc xóa nhánh ngay cả khi chưa gộp' },
    ],
  },
  {
    command: 'git rebase',
    syntax: 'git rebase <base-branch>',
    category: 'Git',
    description: 'Áp dụng lại các commit trên đỉnh của một commit cơ sở khác nhằm giữ lịch sử commit thẳng thớm.',
    example: 'git rebase main',
    flags: [
      { flag: '-i', meaning: 'Chế độ tương tác cho phép sửa, gộp hoặc xóa commit' },
      { flag: '--continue', meaning: 'Tiếp tục rebase sau khi đã giải quyết xung đột (conflict)' },
      { flag: '--abort', meaning: 'Hủy bỏ quá trình rebase và đưa nhánh về trạng thái ban đầu' },
    ],
  },
  {
    command: 'git stash',
    syntax: 'git stash [push|pop|list|drop]',
    category: 'Git',
    description: 'Tạm cất giữ các thay đổi chưa commit vào ngăn xếp để chuyển nhánh làm việc khẩn cấp.',
    example: 'git stash pop',
    flags: [
      { flag: '-u', meaning: 'Bao gồm cả các tệp chưa được theo dõi (untracked files)' },
      { flag: 'pop', meaning: 'Lấy lại thay đổi gần nhất từ ngăn xếp và xóa khỏi stash list' },
    ],
  },
  // Linux
  {
    command: 'systemctl',
    syntax: 'sudo systemctl [start|stop|restart|status] <service>',
    category: 'Linux',
    description: 'Kiểm soát và quản lý các tiến trình dịch vụ chạy ngầm của hệ thống init systemd.',
    example: 'sudo systemctl status nginx',
    flags: [
      { flag: 'start', meaning: 'Khởi động dịch vụ' },
      { flag: 'restart', meaning: 'Khởi động lại dịch vụ' },
      { flag: 'enable', meaning: 'Cho phép dịch vụ tự động chạy khi bật máy tính' },
    ],
  },
  {
    command: 'journalctl',
    syntax: 'journalctl [options]',
    category: 'Linux',
    description: 'Truy vấn và xem nhật ký hoạt động (logs) được ghi nhận bởi systemd-journald.',
    example: 'journalctl -u docker -f -n 50',
    flags: [
      { flag: '-u <unit>', meaning: 'Lọc log theo tên dịch vụ cụ thể' },
      { flag: '-f', meaning: 'Theo dõi log theo thời gian thực (follow mode)' },
      { flag: '-n <lines>', meaning: 'Chỉ định số dòng log gần nhất cần xem' },
    ],
  },
  {
    command: 'ss',
    syntax: 'ss [options]',
    category: 'Networking',
    description: 'Công cụ điều tra socket hiện đại thay thế cho lệnh netstat truyền thống.',
    example: 'ss -tulpn | grep 8080',
    flags: [
      { flag: '-t', meaning: 'Hiển thị các socket TCP' },
      { flag: '-u', meaning: 'Hiển thị các socket UDP' },
      { flag: '-l', meaning: 'Chỉ hiển thị các socket đang ở trạng thái lắng nghe (Listening)' },
      { flag: '-p', meaning: 'Hiển thị tên tiến trình và PID sử dụng socket' },
      { flag: '-n', meaning: 'Không phân giải tên miền hoặc tên cổng, hiện số IP/Port trực tiếp' },
    ],
  },
  // Docker
  {
    command: 'docker compose',
    syntax: 'docker compose [up|down|ps|logs] [options]',
    category: 'Docker',
    description: 'Quản lý ứng dụng đa container được định nghĩa trong tệp docker-compose.yml.',
    example: 'docker compose up -d',
    flags: [
      { flag: '-d', meaning: 'Chạy các container ở chế độ nền (detached mode)' },
      { flag: '--build', meaning: 'Bắt buộc build lại image trước khi khởi động' },
      { flag: 'down -v', meaning: 'Dừng container và xóa cả volumes dữ liệu gắn kèm' },
    ],
  },
];

export function searchCheatsheet(query: string, category?: string): CommandEntry[] {
  const q = query.trim().toLowerCase();
  return DEVOPS_CHEATSHEET.filter((entry) => {
    if (category && category !== 'all' && entry.category !== category) return false;
    if (!q) return true;
    return (
      entry.command.toLowerCase().includes(q) ||
      entry.description.toLowerCase().includes(q) ||
      entry.syntax.toLowerCase().includes(q)
    );
  });
}
