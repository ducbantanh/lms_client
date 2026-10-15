# Cyb3rT1t@ns — Server/Client Architecture

This document describes the current **Cyb3rT1t@ns** LAN Client/Server architecture. The platform is a modular Python server with a Next.js static client, MySQL persistence, role-based permissions, and a separate worker boundary for untrusted code execution.

Current scaffold:

- `server/`: Python modular monolith.
- `client-next/`: Next.js student/admin client with static export and English UI.
- `server/auth/`, `server/domain/`, `server/realtime/`, `server/storage/`: boundary cho các module tương lai.
- `ARCHITECTURE.md`: ghi chú ngắn về cấu trúc source.
- `pyproject.toml`: metadata và entry point `cyb3rt1tans`.

Tên thương hiệu được hiển thị bằng chữ `Cyb3rT1t@ns`; logo đồ họa có thể được bổ sung sau mà không thay đổi domain hoặc giao thức.

## 1. Design principles

1. **One server, one deployment:** use a modular Python monolith before introducing microservices.
2. **Thin client:** the browser displays state and sends actions; authorization and valid state are decided by the server.
3. **Offline-first assets:** CSS, JavaScript, and icons are served locally without a CDN.
4. **Domain-first:** tổ chức mã theo miền nghiệp vụ thay vì theo loại file HTTP.
5. **Có hợp đồng giao tiếp:** API và sự kiện WebSocket có version, schema và mã lỗi ổn định.
6. **Database-only persistence:** application data is stored in MySQL through repositories; no file-store fallback exists.
7. **An toàn mặc định:** deny by default, kiểm tra quyền ở mọi mutation, giới hạn kích thước và tốc độ request.

## 2. Topology tối giản

```text
┌────────────────────────┐       HTTP/HTTPS + WebSocket       ┌──────────────────────────┐
│ Browser sinh viên      │◄──────────────────────────────────►│ Python LAN Server        │
│ Tailwind + FontAwesome │                                     │ API + AdminLTE + WS     │
└────────────────────────┘                                     └────────────┬─────────────┘
                                                                             │
                                               ┌─────────────────────────────┼─────────────────────┐
                                               │                             │                     │
                                       MySQL database                Content/submissions    Judge worker
                                       users/roles/sessions          courses/results        isolated sandbox
```

Ở bản đầu, API, WebSocket, Admin và domain service có thể chạy trong cùng một Python process. Worker chấm bài nên chạy process riêng khi bắt đầu thực thi code không tin cậy; không dùng thread web server để chạy code sinh viên.

## 3. Phân lớp Server

| Lớp | Trách nhiệm |
|---|---|
| HTTP/WebSocket adapter | Routing, parse request, giới hạn request, phục vụ asset local |
| Authentication | Login, session opaque, logout, timeout, CSRF và re-auth cho thao tác nhạy cảm |
| Authorization | Role, permission, course membership, ownership, and policy |
| Application services | Use case: import sinh viên, ép logout, tạo khóa học, mở bài thi, nộp bài |
| Domain | User, Course, Lesson, Activity, Exam, Submission, Progress, Reward |
| Repository | MySQL access for users, roles, permissions, sessions, courses, and submissions |
| Realtime hub | Theo dõi socket theo user/session và phát sự kiện có kiểm soát |
| Worker boundary | Nhận job chấm bài và trả kết quả; sandbox hóa độc lập |

Không để handler HTTP tự sửa file hoặc tự tính điểm. Handler chỉ xác thực request rồi gọi application service.

## 4. Cấu trúc module đề xuất

Tên thư mục có thể điều chỉnh, nhưng ranh giới nên giữ ổn định:

```text
server/
  app/                 # bootstrap và cấu hình
  transport/http/      # API và static assets
  transport/ws/        # WebSocket protocol
  auth/                # session, password, permission
  users/               # accounts, import, presence
  courses/             # khóa học, đăng ký, lịch học
  content/             # tuần, bài học, tài liệu
  activities/          # luyện tập, thực hành, quiz, exam
  submissions/         # nộp bài và trạng thái
  grading/             # job, worker adapter, result
  gamification/        # XP, badge, rank, leaderboard
  storage/              # MySQL repositories
  security/             # validation, rate limit, audit
client-next/
  app/                 # App Router và route entry
  components/          # UI dùng chung
  features/            # auth, admin, student
  lib/                 # API, WebSocket, security helpers
  styles/              # design tokens và CSS offline
  public/              # file public
```

Đây là cấu trúc logic; bản đầu vẫn có thể đóng gói thành một project Python duy nhất.

## 5. Giao diện và asset offline

### Admin

Admin dùng AdminLTE 3 được lưu local cùng các dependency của nó. Tailwind dùng cho các thành phần tùy biến, form, trạng thái và responsive utility; không tải từ CDN. Font Awesome được bundling local, gồm CSS và webfont cần thiết, không gọi kit hoặc URL bên ngoài. Scaffold hiện mới tạo boundary; bundle AdminLTE 3/Font Awesome đầy đủ sẽ được thêm trước khi đưa vào production.

Dashboard nên có:

- số client online và tổng session;
- danh sách hoạt động realtime;
- ép logout, khóa/mở khóa, thu hồi toàn bộ session;
- quản lý sinh viên và import danh sách;
- quản lý khóa học, tuần học, bài luyện tập, thực hành và kỳ thi;
- hàng đợi chấm bài, lỗi worker và audit log.

### Client sinh viên

Dashboard nên có:

- khóa học đang tham gia;
- phần trăm tiến độ và bài tiếp theo;
- lịch học, bài thi sắp mở;
- XP, rank, badge và bảng xếp hạng trong phạm vi cho phép;
- thông báo realtime;
- danh sách bài học theo tuần.

Mỗi khóa học có thể chia thành:

1. Giới thiệu và mục tiêu.
2. Tuần học.
3. Bài học và tài liệu.
4. Bài luyện tập tự chấm hoặc tự kiểm tra.
5. Bài thực hành có nộp kết quả.
6. Bài thi/cuộc thi có thời gian và luật riêng.
7. Điểm, nhận xét và tiến độ.

## 6. Giao thức Client/Server

### HTTP API

API nên dùng prefix version, ví dụ `api/v1`, trả response envelope thống nhất gồm trạng thái thành công hoặc mã lỗi nghiệp vụ. JSON chỉ là format trao đổi nội bộ giữa client và server; không hiển thị JSON, traceback, đường dẫn file, hash hoặc dữ liệu nội bộ trong giao diện người dùng.

Các nhóm endpoint:

- auth và session;
- profile và presence;
- courses và enrollment;
- weekly content;
- activities, exams và contests;
- submissions và grading result;
- admin users, sessions, courses và audit.

ID nội bộ không nên dùng trực tiếp trong URL nếu có thể dùng slug hoặc public reference. Nếu cần truyền identifier, dùng public ID ngẫu nhiên/opaque; mã hóa hoặc encode chỉ là lớp che giấu, không thay thế authorization.

### WebSocket

Client mở một socket sau login. Server xác thực cookie session trước khi nâng cấp kết nối, gắn socket với user và session, sau đó chỉ phát event đúng audience.

Event tối thiểu:

- `session.revoked`: client reload về login;
- `presence.changed`: dashboard cập nhật online/offline;
- `notification.created`: thông báo mới;
- `submission.updated`: trạng thái bài nộp;
- `exam.started` và `exam.ended`: thay đổi trạng thái kỳ thi.

Socket phải có ping/pong khi proxy production yêu cầu keepalive, giới hạn frame và xử lý reconnect có backoff. Trong MVP, client không gửi heartbeat HTTP định kỳ. Trạng thái `online` của dashboard được xác định trực tiếp từ socket WebSocket đang mở, không phải chỉ từ session còn hạn. Vì vậy student login nhưng chưa hoàn tất WebSocket sẽ là offline; khi socket đóng, Admin nhận `presence.changed` ngay và bảng được cập nhật. Session expiry vẫn là lớp bảo vệ authorization, không phải nguồn duy nhất của presence.

## 7. MySQL persistence

MySQL is the only application datastore. All schema changes are ordered migrations and all access goes through repositories; the server does not fall back to a private file store.

The current schema separates:

- users and credential metadata;
- roles, permissions, and role-permission assignments;
- sessions and revoked sessions;
- courses and weekly content;
- submissions and grading state.

The first migration creates `users`, `sessions`, `courses`, and `submissions`. The second migration creates numeric roles, numeric `0/1` status fields, `roles`, `permissions`, and `role_permissions`.

Future file uploads may use object or filesystem storage with metadata in MySQL, but uploads must never become the source of truth for application records. Backups, restore testing, least-privilege database accounts, and migration review are operational requirements.

## 8. Authentication and authorization

Platform roles are numeric and start at zero:

- `0` Admin: full system administration;
- `1` Teacher: course and content management within scope;
- `2` Mentor;
- `3` Supervisor;
- `4` Parent;
- `5` Student: learning, practice, exams, and personal results;
- `6` Visitor: self-practice without a school or course affiliation.

`users.role` references `roles.id`. `users.status` is `TINYINT(1)` with `1` active and `0` inactive. Session tokens are opaque and stored in MySQL. Cookies use `HttpOnly`, suitable `SameSite`, and `Secure` under HTTPS. Passwords use a slow KDF; a plain SHA-256 password hash is not sufficient for production.

Permissions are stored in `permissions` and assigned through `role_permissions`. The current permission codes are `users.manage`, `courses.view`, `submissions.create`, and `submissions.manage`. Admin endpoints check permissions rather than trusting client-supplied role labels.

Reversible application strings use `server.auth.crypto.encrypt_string()` and
`decrypt_string()`. These helpers use authenticated AES-GCM and the private
`CYB3RT1TANS_ENCRYPTION_KEY`; a different key cannot decrypt the ciphertext.
This mechanism is for values that must be recovered by the server, not for
passwords, which remain one-way hashes.

Mọi thao tác phải kiểm tra:

- user đã đăng nhập;
- role/permission;
- user có thuộc course hoặc activity không;
- resource có đúng owner/scope không;
- session có bị revoke không.

### Quick student account import

In the **User management** dashboard, an Admin can paste text or choose a `.txt` file to create multiple accounts. Each valid line uses:

```text
student_id|ddmmyyyy|Full name
```

Ví dụ:

```text
STU001|01012005|Alex Smith
STU002|15022005|Taylor Brown
```

The student ID becomes the username and the `ddmmyyyy` birth date is the initial password. Blank lines and lines beginning with `#` are ignored. The server validates dates, length, and ID characters, reports errors, duplicates, and created accounts separately, and never overwrites an existing account.

Thêm CSRF protection cho request cookie-based, rate limit login/import, khóa tạm thời sau nhiều lần sai, audit log cho admin action và thông báo lỗi không làm lộ user tồn tại.

## 9. Bảo vệ dữ liệu và execution sandbox

- Chạy HTTPS trong LAN nếu có thể; certificate có thể do lớp học tự quản lý.
- Chỉ bind server vào interface LAN cần thiết khi triển khai thực tế.
- Giới hạn kích thước request, upload, WebSocket frame và số kết nối.
- Chuẩn hóa filename, chặn traversal và symbolic link.
- Never expose database backups, logs, or source through a static route.
- Tách quyền process web, worker và thư mục dữ liệu.
- Code sinh viên chạy trong sandbox process/container với read-only base filesystem, network disabled, CPU/RAM/time limit, syscall policy và output limit.
- Không triển khai auto-grader thực thi code trong cùng process với API.

Mã hóa ID chỉ ngăn đoán ID ở mức giao diện. Quyền truy cập phải được kiểm tra bằng object-level authorization ở server cho mọi request.

## 10. LMS domain và gamification

Các thực thể cốt lõi:

- User, Role, Permission;
- Course, Enrollment, Week;
- Lesson, Resource, Practice, Lab;
- Exam, Contest, Attempt;
- Submission, TestResult, Grade;
- Progress, XPEvent, Badge, Rank;
- Notification, AuditEvent.

XP nên được ghi dưới dạng event bất biến thay vì chỉ lưu một tổng số. Điểm thi và XP là hai khái niệm riêng; việc sửa điểm cần audit và quyền rõ ràng. Leaderboard nên có scope course/contest, không mặc định công khai toàn bộ dữ liệu sinh viên.

## 11. Trạng thái triển khai theo giai đoạn

### Giai đoạn 1 — nền tảng LAN

- Python server và static frontend offline.
- Login, numeric roles, opaque sessions, and MySQL persistence.
- Admin dashboard AdminLTE 3.
- Client dashboard sinh viên.
- WebSocket presence và ép logout.
- Import sinh viên và quản lý client.

### Giai đoạn 2 — LMS tối thiểu

- Course, enrollment, week, lesson và resource.
- Practice, lab, exam metadata.
- Nộp bài, điểm thủ công và progress.
- Notification, audit log và backup/restore.

### Giai đoạn 3 — chấm bài an toàn

- Worker process riêng.
- Queue nội bộ đơn giản trước, sau đó mới cân nhắc broker.
- Sandbox theo ngôn ngữ.
- Kết quả chấm realtime qua WebSocket.
- Test case, retry, timeout và báo cáo.

### Giai đoạn 4 — gamification và competition

- XP event, badge, rank và leaderboard theo scope.
- Contest window, scoreboard và anti-cheat policy.
- Skill tree, prerequisite và unlock.
- Peer review và achievement.

### Giai đoạn 5 — nâng cấp storage

- Repository contract giữ nguyên.
- Keep the MySQL repository contract stable as the system grows.
- Consider PostgreSQL/Redis only when multiple servers, workers, or measurable load requires them.

## 12. Nguyên tắc không mở rộng quá sớm

Không bắt đầu bằng microservices, Kubernetes, RabbitMQ, Redis hoặc database phân tán khi hệ thống chỉ chạy một máy trong LAN. Những thành phần đó chỉ nên xuất hiện khi có dấu hiệu đo được: nhiều worker, nhiều server, hàng đợi dài, concurrent write cao hoặc nhu cầu HA.

Bản gọn nhẹ nên là **modular monolith + worker sandbox**, vì dễ cài, dễ backup, dễ debug và vẫn giữ ranh giới để tách dịch vụ sau này.

## 13. Tiêu chí hoàn thành phiên bản đầu

- Admin và student login hoạt động offline.
- Admin nhìn thấy presence gần realtime và ép logout tức thì.
- Client tự kết thúc phiên khi socket mất hoặc session bị revoke.
- Không có asset CDN.
- Không trả JSON nội bộ hoặc traceback trực tiếp trong giao diện.
- `.env`, database backups, and internal files must never be served as static files.
- Mọi mutation có authorization và audit.
- Có test cho login, import, revoke session, WebSocket, file traversal và permission boundary.

## 14. Trạng thái MVP đã triển khai

Bản MVP hiện tại đã có luồng chạy thực tế để kiểm thử:

- Entry point `server.py` ở thư mục gốc.
- Login bằng tài khoản `admin/admin` và `student/student` trong môi trường test.
- `.env` được đọc tự động; `.env.example` là mẫu để triển khai máy mới.
- MySQL là nguồn dữ liệu duy nhất của server.
- Client dashboard có danh sách khóa học mẫu, tuần học, lesson, practice, lab và exam.
- Client có form nộp bài thử.
- Admin có dashboard phong cách AdminLTE 3: sidebar, navbar, thống kê, bảng client.
- Admin có thể xem online/offline và ép logout.
- Admin có trang quản lý người dùng, import danh sách sinh viên từ text hoặc `.txt`, khóa/mở khóa và xóa tài khoản.
- WebSocket gửi sự kiện logout và presence realtime; client không polling HTTP định kỳ.
- Client được xây dựng bằng Next.js static export trong `client-next/`; Python vẫn là nơi duy nhất xử lý session, quyền, MySQL và WebSocket.

Next.js không lưu token, mật khẩu hoặc khóa mã hóa trong `localStorage`, query string hay biến `NEXT_PUBLIC_*`. Session vẫn nằm trong cookie `HttpOnly`, `SameSite` và `Secure` khi chạy HTTPS. Không mã hóa dữ liệu ở phía client để thay thế phân quyền: mọi API mutation vẫn phải được Python kiểm tra role, session và object ownership. Bản export được phục vụ cùng origin bởi Python để tránh CORS và chia sẻ cookie không cần thiết.

## 15. Kiến trúc Client Next.js

```text
client-next/
  app/                 # App Router, layout, route entry
  components/          # UI dùng chung, không chứa nghiệp vụ
  features/
    auth/              # login và xác thực phía giao diện
    admin/             # dashboard, import và quản lý user
    student/           # khóa học và nộp bài
  lib/                 # API client, realtime, security helpers
  styles/              # design tokens và CSS nền tảng
  public/              # asset public offline
```

`app/` chỉ điều phối route; nghiệp vụ giao diện nằm trong `features/`; gọi API và WebSocket tập trung trong `lib/`; component dùng chung không được truy cập database hoặc tự quyết định quyền. Next.js được export tĩnh vào `client-next/out/` và Python phục vụ thư mục này cùng origin. Không chạy Next dev server trong production.
- CSS và icon subset được phục vụ local, không dùng CDN.

AdminLTE 3 và Font Awesome đầy đủ nên được vendored vào asset local trước khi phát hành production. Scaffold hiện tại dùng lớp giao diện AdminLTE-style và icon subset để giữ project không phụ thuộc Internet.

## 15. Chạy sau reverse proxy trên webserver thật

Không nên expose Python development server trực tiếp ra Internet. Mô hình production đề xuất:

```text
Browser ── HTTPS ── Nginx/Caddy/Apache ── localhost:8000 ── Python Cyb3rT1t@ns
                                      └── WebSocket upgrade /ws
```

Reverse proxy chịu trách nhiệm TLS certificate, redirect HTTP sang HTTPS, giới hạn request ở edge và chuyển tiếp WebSocket. Python chỉ bind vào `127.0.0.1` khi proxy chạy cùng máy; nếu cần nhận LAN trực tiếp thì dùng firewall giới hạn subnet.

Thiết lập production tối thiểu trong `.env`:

- `CYB3RT1TANS_HOST=127.0.0.1`
- `CYB3RT1TANS_PORT=8000`
- `CYB3RT1TANS_SECURE_COOKIE=true`
- `CYB3RT1TANS_BEHIND_PROXY=true`
- `CYB3RT1TANS_PASSWORD_KEY` là secret ngẫu nhiên dài, không dùng giá trị mẫu.
- Mật khẩu Admin/Student không dùng giá trị test.

Proxy phải giữ các header `Upgrade` và `Connection` cho `/ws`, không cache API hoặc WebSocket, giới hạn body upload, và chỉ forward tới upstream nội bộ. Khi dùng HTTPS, client phải kết nối `wss://` tự động theo origin; không trộn nội dung HTTP/HTTPS.

## 16. Checklist production

### Identity và session

- Đổi toàn bộ credential test.
- Dùng secret riêng cho từng môi trường và backup secret theo quy trình an toàn.
- Bật `Secure` cookie khi chạy HTTPS.
- Thêm CSRF token cho toàn bộ mutation cookie-based trước khi mở Internet.
- Bật rate limit, lockout và audit log cho login/admin.
- Do not log cookies, passwords, password keys, or sensitive submission content.

### Webserver

- Chạy Python bằng service manager với user không có quyền root/Administrator.
- Bind Python vào loopback sau reverse proxy.
- Dùng TLS hiện đại, HSTS sau khi xác nhận domain ổn định.
- Giới hạn `client_max_body_size`, timeout và số connection tại proxy.
- Chuyển tiếp WebSocket `/ws` với timeout dài hơn HTTP request.
- Do not serve `.env`, source, database backups, or logs through static routes.

### Dữ liệu

- Backup khi Python đã dừng hoặc repository có snapshot nhất quán.
- Kiểm tra restore định kỳ.
- Use MySQL backups, restore tests, least-privilege accounts, and migration review as the data safety baseline.
- Encrypt data at rest when the deployment threat model requires it.

### Code execution

- Không bật chấm code bằng cách chạy subprocess trong web process.
- Worker phải có sandbox, timeout, memory/CPU limit, output limit, read-only filesystem và network disabled.
- Tách quyền service account, thư mục upload và thư mục execute.
