# Nền tảng client và đối chiếu yêu cầu

## Quyết định kiến trúc

Giữ HTML + ES modules + AdminLTE 3 offline, kết nối `lms_server` Spring Boot hiện có.
Đây là lựa chọn đã xác nhận với người dùng. Không chuyển sang Next.js hoặc Python.
Server là nguồn quyết định session, quyền, dữ liệu và trạng thái nghiệp vụ; client chỉ
hiển thị và gửi thao tác qua HTTP/WebSocket cùng origin.

## Các tài liệu đã đối chiếu

- `readme (1).md`: mẫu Python nhận bài qua LAN, xem đề, upload multipart, nhiều kết nối,
  tên file duy nhất và giới hạn upload. Đây là bài toán đầu vào; không phải hợp đồng API
  của Spring. Không gửi form tới `/submit` trong base client Spring.
- `sercli.md` (tên thực tế, không phải `serclie.md`): kiến trúc mục tiêu modular monolith,
  numeric roles 0–6, MySQL, opaque session, CSRF, realtime presence/revoke, asset offline,
  import và roadmap course/submission/grading. Mô tả Python/Next là phương án cũ so với
  lựa chọn hiện tại; các ranh giới trách nhiệm và yêu cầu nghiệp vụ vẫn được giữ.
- `design.md`: dùng lớp CSS trên AdminLTE, token, focus, responsive và reduced motion.
  Base mới thêm nền tảng chung; chưa triển khai toàn bộ thiết kế chi tiết từng trang.
- `lms_server/README.md`, controller/DTO, enum `Role`, migration V2 và realtime hub:
  hợp đồng được dùng cho tích hợp hiện tại.

## Hiện trạng hai repo

`lms_server`: Java 17, Spring Boot 3.5, JPA/MySQL/Flyway; auth/session, user/import,
audit, realtime và student dashboard. Schema/permission do server quản lý. Python
`submission_server.py` là một chương trình riêng, chưa liên thông session LMS.

`lms_client`: giao diện nhiều trang, ES module cho từng trang, tài nguyên vendor local.
Client đã có màn hình course/content/exam và mock tương ứng, nhưng server Java chưa có
module này. Không xem một màn hình chạy được bằng mock là tính năng backend đã hoàn tất.

| Chức năng | Spring hiện tại | Base client |
|---|---|---|
| Login/logout/me/change-password | Có | API tập trung, cookie, CSRF, bắt đổi mật khẩu |
| Role/permission | 0–6, permission trong session | Đồng bộ role, chọn trang theo quyền |
| User search/lock/unlock/delete/kick | Có | Trang admin hiện có |
| Import text / `.txt` | Có | Trang import, multipart, báo cáo từng nhóm |
| Presence/revoke | `/ws`, close 4001 | Một socket, backoff, cleanup, dừng khi revoke |
| Student dashboard | Profile, courses rỗng | Profile và trạng thái rỗng |
| Tạo user thủ công | Chưa có POST `/admin/users` | Tắt mặc định, bật trong mock |
| Khóa học/ghi danh/tài liệu/đề | Chưa có | Giữ màn hình demo, guard bằng feature flag |
| Audit | Có API | Chưa có màn hình |
| Nộp bài/chấm điểm/progress/XP | Chưa có | Giai đoạn sau |

## Ranh giới mã nguồn

- `config.js`: cấu hình public không chứa secret; flags không phải quyền truy cập.
- `routing.js`: điều hướng theo permission, kiểm tra `next` trước khi redirect.
- `api.js`: HTTP/envelope/CSRF, lỗi tiếng Việt, timeout, cancellation và guard trang.
- `realtime.js`: một WebSocket theo trang, backoff, listener và thu hồi session.
- `ui.js`, `notifications.js`, `app.css`: tiện ích hiển thị, escape, trạng thái lỗi, token.
- `*-dashboard.js`, `*-course.js`, `admin-*.js`: nghiệp vụ của từng trang.
- `dev/`: gateway và mock, không triển khai như asset public.

Trang mới cần HTML với asset local, module JS riêng, `requirePage`, rồi gọi API dùng chung.
Không tự fetch/WebSocket trong module trang, không nhúng thông báo server thô vào HTML.
Trang chưa được cấp quyền không được mở lặp lại chính nó; tài khoản chưa có quyền nào
có thể đổi mật khẩu/đăng xuất ở `/account.html`.

## Kiểm tra tích hợp với Spring thật

Sau khi MySQL và Spring chạy, dùng `npm run dev`, mở cổng 8090:

1. Đăng nhập admin; xem user và presence.
2. Import `BASE001|01012003|Nguyễn Văn A`; đăng nhập bằng tài khoản mới ở trình duyệt khác.
3. Đổi mật khẩu lần đầu; kiểm tra dashboard, phiên và trạng thái online.
4. Ép logout hoặc khóa từ admin; client phải về login và không reconnect.
5. Tắt/bật backend; client báo mất kết nối và khôi phục với backoff.
6. Kiểm tra mobile 360px, bàn phím, tải lại trang và truy cập từ máy LAN thứ hai.

Kiểm thử Node tự động dùng mock/proxy, không xác nhận database, BCrypt, expiry hoặc
permission enforcement của Spring. Những mục đó cần chạy backend thật và integration test riêng.

## Kết quả xác minh base

- `npm test`: 8 test qua, gồm các luồng nền tảng và tích hợp mock + gateway.
- `npm run check`: cú pháp các module hợp lệ, HTML không nạp script/CSS CDN.
- Edge headless qua gateway: admin login, thống kê 24 sinh viên, danh sách user đủ 7
  role, ẩn tạo user thủ công, logout, student login/dashboard và ẩn form ghi danh.
- Dashboard sinh viên rộng 360px không cuộn ngang; không có lỗi JavaScript chưa xử lý
  trong các luồng trình duyệt đã kiểm tra.
- Chưa chạy kiểm thử với MySQL/Spring thật hoặc máy LAN thứ hai.
