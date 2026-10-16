# Kế hoạch xây dựng giao diện hệ thống LMS

Trạng thái: kế hoạch thiết kế và triển khai, chưa phải yêu cầu bắt đầu viết giao diện.

Mục tiêu: từ các màn hình hiện có, xây dựng một LMS thống nhất cho quản trị viên,
giảng viên và sinh viên, có luồng học → xem đề → nộp bài → nhận kết quả đầy đủ.
Giữ HTML/JavaScript ES modules + AdminLTE 3 và Spring Boot theo lựa chọn đã xác nhận.

Workspace có các thay đổi base do lượt làm việc trước. Tài liệu này không xem các thay đổi
đó là thiết kế giao diện đã được duyệt; trước khi triển khai cần rà lại để tái sử dụng phần
phù hợp. Trong lượt lập kế hoạch chỉ thêm tài liệu này, không sửa thêm mã ứng dụng.

## 1. Kết quả đọc hiểu source và tài liệu

### 1.1 Client hiện tại

Client là website nhiều trang, không có bước build. Các thư viện, font và icon nằm trong
`public/vendor/`, phù hợp phòng máy không có Internet. Mỗi trang có ES module riêng.

| Nhóm | File tiêu biểu | Đã có trong giao diện |
|---|---|---|
| Xác thực | `login.html`, `change-password.html`, `auth-pages.js` | Đăng nhập, đổi mật khẩu lần đầu, chuyển trang |
| Quản trị | `admin/index.html`, `admin-dashboard.js` | Thống kê tài khoản, danh sách online, ép logout, feed presence |
| Người dùng | `admin/users.html`, `admin-users.js` | Tìm kiếm, lọc role/status, phân trang, khóa/xóa/kick; form tạo user thuộc mock |
| Import | `admin/import.html`, `admin-import.js` | Dán text hoặc đọc `.txt` vào trình soạn thảo; gửi JSON; báo cáo tạo/trùng/lỗi |
| Giảng viên | `teacher/index.html`, `teacher-courses.js` | Danh sách và tạo khóa học |
| Quản lý khóa học | `teacher/course.html`, `teacher-course.js` | Mục/tuần, upload tài liệu, ẩn/hiện, ghi danh 3 cách, mã tham gia, metadata bài kiểm tra |
| Sinh viên | `student/index.html`, `student-dashboard.js` | Profile, khóa học, nhập mã tham gia, thông báo realtime |
| Học trong khóa | `student/course.html`, `student-course.js` | Tài liệu theo mục, xem đề, thời gian và trạng thái bài kiểm tra |
| Dùng chung | `api.js`, `realtime.js`, `ui.js`, `course-common.js`, `admin-layout.js` | HTTP/session, WS, escape/format, layout quản lý, hiển thị file |

Điểm cần phát triển về UX: dashboard sinh viên còn thiên về profile; chưa có màn hình
nộp bài, lịch sử nộp, kết quả hay tiến độ; trang quản lý khóa học tập trung nhiều việc vào
một file; navbar sinh viên và trạng thái realtime lặp ở nhiều trang. Chưa có hệ thống trạng
thái tải/rỗng/lỗi và thành phần xác nhận thống nhất cho toàn bộ sản phẩm.

### 1.2 Server hiện tại

Spring Boot modular monolith, MySQL/JPA và Flyway; package chia theo auth, user,
realtime, student, audit. API có prefix `/api/v1`, response envelope và mã lỗi.

- Đã có: login/logout/me/change-password, cookie session HttpOnly, CSRF, permission.
- Đã có: user search/filter/pagination, lock/unlock/delete/force-logout, import text/file.
- Đã có: `/admin/presence`, `/admin/audit`, WebSocket `/ws`.
- `/student/dashboard` hiện trả profile và `courses` rỗng.
- Migration hiện có bảng role/permission/user/session/audit; chưa có bảng khóa học,
  ghi danh, tài liệu, bài kiểm tra, bài nộp, điểm và tiến độ.
- Chưa có controller cho `/teacher/**`, `/student/courses/**`, `/files/**`,
  hoặc POST `/admin/users`. Các màn hình tương ứng chưa thể tích hợp thật chỉ bằng sửa UI.

### 1.3 Ý nghĩa hai tài liệu được yêu cầu

| Tài liệu | Yêu cầu mang vào thiết kế LMS | Điểm cần phân biệt |
|---|---|---|
| `readme (1).md` | Chạy LAN, xem đề, chọn file, gửi bài, báo kết quả, bảo toàn nhiều lần nộp | Là mẫu Python submission server độc lập, không phải API LMS Spring |
| `sercli.md` | Dashboard theo vai trò, course/week/lesson/activity, session/presence, import, submissions/grades/progress; roadmap judge và gamification | Mô tả Python + Next.js và một MVP khác; không dùng phần “đã triển khai” để kết luận repo hiện tại có đủ tính năng |

Đọc thêm `design.md` để tận dụng đề xuất màu, thành phần, responsive và micro-interaction
đã có trong repo. Đây là đầu vào thiết kế, không mặc định mọi hiệu ứng đều cần làm ở bản đầu.

### 1.4 Các khác biệt phải xử lý trong thiết kế/hợp đồng

- Role Spring là 0 Admin, 1 Teacher, 2 Mentor, 3 Supervisor, 4 Parent, 5 Student,
  6 Visitor. Quyền hiển thị lấy từ session; có role không đồng nghĩa mọi chức năng đã tồn tại.
- `courses.manage` đang có trong mock nhưng chưa có trong permission seed của Spring.
- Client tài liệu đang dùng giới hạn 20 MB; mẫu Python giới hạn cả request 50 MB;
  Spring multipart hiện 512 KB/file và 600 KB/request, phục vụ import. Không lấy một
  con số làm giới hạn chung cho tài liệu và bài nộp.
- Mẫu Python cho nhập MSSV tự do. LMS đã đăng nhập phải lấy danh tính từ session;
  không cho sinh viên nộp thay bằng sửa ô MSSV.
- `sercli.md` có chỗ nói mất socket thì kết thúc phiên, trong khi giao thức Spring
  yêu cầu reconnect khi lỗi mạng và dừng khi close 4001. Thiết kế theo hợp đồng Spring:
  mất kết nối → hiển thị đang kết nối lại; bị revoke/hết phiên → về đăng nhập.
- Thông báo trong client hiện là feed nhận event, chưa có API lưu lịch sử/đọc/chưa đọc.
  Không thể suy ra số thông báo chưa đọc bền vững sau tải lại trang.

## 2. Phạm vi sản phẩm và các luồng chính

MVP giao diện tập trung ba vai trò Admin, Teacher, Student. Giữ đủ mã role 0–6 nhưng
chưa thiết kế portal riêng cho Mentor/Supervisor/Parent khi chưa có use case và phạm vi
dữ liệu rõ ràng. Visitor tự luyện được đưa vào giai đoạn mở rộng.

| Vai trò | Việc cần hoàn thành | Luồng chính |
|---|---|---|
| Admin | Chuẩn bị tài khoản, theo dõi phòng máy | Import → kiểm tra kết quả → quản lý user → presence/kick → audit |
| Teacher | Tổ chức lớp và đánh giá | Tạo khóa → thêm sinh viên → đăng tài liệu → mở bài → xem bài nộp → chấm/nhận xét |
| Student | Học và hoàn thành bài | Đăng nhập/đổi mật khẩu → vào khóa → xem bài/tài liệu → nộp file → xác nhận đã nhận → xem kết quả |

Mốc hoàn thành MVP đầy đủ là một vòng học và nộp bài chạy được với server thật.
Hoàn thành các bản thiết kế với dữ liệu mẫu là một mốc riêng, có thể đạt trước backend.
Chấm code tự động, contest và XP/badge không nằm trên đường triển khai MVP đầu tiên.

## 3. Sơ đồ màn hình mục tiêu

Các đường dẫn mới dưới đây là đề xuất. Giữ đường dẫn hiện có để tránh làm hỏng liên kết.

```text
Chung
├── /login.html                      Đăng nhập
├── /change-password.html            Đổi mật khẩu
└── /account.html                    Tài khoản / chưa được cấp quyền

Admin — sidebar quản trị
├── /admin/                          Tổng quan phòng máy
├── /admin/users.html                Người dùng
├── /admin/import.html               Import sinh viên
├── /admin/audit.html                Nhật ký hoạt động [mới]
└── Quản lý khóa học                  Dùng màn hình quản lý với scope admin khi API có

Teacher — sidebar giảng dạy
├── /teacher/                        Khóa học đang phụ trách
├── /teacher/course.html?id=...       Không gian quản lý một khóa
│   ├── Tổng quan
│   ├── Nội dung / tuần
│   ├── Sinh viên / ghi danh
│   ├── Bài tập / bài kiểm tra
│   └── Bài nộp / điểm
└── /teacher/submission.html?id=...   Chi tiết bài nộp, chấm và nhận xét [mới]

Student — top-nav học tập
├── /student/                        Tổng quan học tập
├── /student/courses.html             Tất cả khóa học [mới]
├── /student/course.html?id=...       Nội dung và hoạt động trong khóa
├── /student/activity.html?id=...     Xem đề, nộp bài, lịch sử nộp [mới]
├── /student/results.html             Điểm / nhận xét [mới]
└── /student/schedule.html            Lịch học, hạn nộp và bài thi [mới, sau luồng nộp bài]
```

Thông báo nằm ở navbar và dashboard trước; chỉ thêm inbox riêng khi có lưu trữ lịch sử.
Nút “Tất cả khóa học” xuất hiện khi dashboard cần hiển thị một danh sách rút gọn.

## 4. Hướng giao diện và thành phần dùng chung

Phong cách: giao diện học tập rõ ràng, nền sáng, sidebar quản lý màu đậm, xanh coban làm
màu hành động. Tận dụng AdminLTE và token trong `design.md`; asset font/icon đều local.
Giữ tiếng Việt và tên LAN LMS làm mặc định tạm thời; `Cyb3rT1t@ns` trong tài liệu là một
lựa chọn nhận diện cần thống nhất trước khi hoàn thiện logo và copywriting.

| Thành phần | Quy tắc thiết kế |
|---|---|
| Khung quản lý | Sidebar theo quyền, navbar có tên người dùng và trạng thái kết nối; nội dung có tiêu đề/breadcrumb/hành động chính |
| Khung sinh viên | Top-nav gọn: Tổng quan, Khóa học, Lịch, Kết quả; tài khoản nằm trong menu phụ |
| Course card | Mã, tên, giảng viên, tiến độ nếu có dữ liệu, một hành động “Vào học” |
| Activity card | Loại bài, thời hạn, trạng thái mở/đóng và trạng thái đã/chưa nộp tách biệt |
| Bảng dữ liệu | Tìm/lọc/phân trang; hành động nguy hiểm qua modal; giữ ngữ cảnh sau thao tác |
| Form | Label rõ, lỗi cạnh trường, giữ dữ liệu nhập khi lỗi; ngăn gửi trùng trong lúc chờ |
| File/upload | Tên, loại, dung lượng; chọn hoặc kéo thả; tiến trình thật hoặc trạng thái “Đang gửi”, không dùng phần trăm giả |
| Trạng thái trang | Loading, empty, error có thử lại, forbidden, session expired, mất kết nối |
| Realtime | Luôn có nhãn chữ; chỉ cập nhật dữ liệu liên quan; tránh toast liên tục gây nhiễu |

Mobile 360px: một cột, sidebar thu gọn, bảng rộng có vùng cuộn riêng, bài sắp hết hạn lên
trước phần ít quan trọng. Desktop: nội dung chính + cột lịch/thông báo; không biến dashboard
thành một dãy thống kê không có hành động tiếp theo.

Mỗi màn hình phải dùng được bằng bàn phím; modal quản lý focus; thông báo có vùng live;
không truyền trạng thái chỉ bằng màu; hỗ trợ reduced motion. Các hiệu ứng chỉ thêm sau khi
luồng chính và trạng thái lỗi đã hoàn chỉnh.

## 5. Thiết kế cụ thể từng nhóm

### 5.1 Đăng nhập và tài khoản

Trang đăng nhập có nhận diện gọn, ô tài khoản/MSSV, mật khẩu, thông báo lỗi và hướng dẫn
đăng nhập lần đầu. Trang đổi mật khẩu có checklist và xác nhận mật khẩu. Không thêm đăng ký
hoặc quên mật khẩu tự phục vụ khi chưa có nghiệp vụ/backend tương ứng.

### 5.2 Dashboard sinh viên

Thứ tự ưu tiên: việc cần làm hôm nay → bài sắp đến hạn → khóa đang học → thông báo.
Profile chuyển thành phần nhỏ ở navbar; không chiếm cột lớn trên dashboard.
Khối “Tiếp tục học” và phần trăm tiến độ chỉ dùng dữ liệu thật từ server khi tích hợp.

```text
Navbar: LAN LMS | Tổng quan | Khóa học | Lịch | Kết quả | Tài khoản
Lời chào + ngày hiện tại
[Việc cần làm / bài sắp hết hạn]          [Lịch gần nhất]
[Khóa học A] [Khóa học B]                 [Thông báo]
[Xem tất cả khóa học]
```

### 5.3 Không gian khóa học của sinh viên

Header: tên/mã khóa, giảng viên, mô tả. Nội dung chia theo tuần/mục có thể thu gọn;
mỗi mục gồm tài liệu và hoạt động. Phân biệt “Mở PDF” với “Tải tài liệu”. Bài tập/thi
có thời gian và CTA rõ. Tách trang hoạt động riêng để không nhồi form nộp bài vào danh sách.

### 5.4 Trang hoạt động và nộp bài

Hiển thị yêu cầu, đề/tài liệu, thời gian mở/đóng, loại file, dung lượng và chính sách số lần
nộp do server cung cấp. Khu vực nộp bài gắn với danh tính đang đăng nhập.

Luồng: chọn file → xem lại file → gửi → server xác nhận → hiển thị mã lần nộp, tên file,
thời gian server nhận và trạng thái. Lịch sử giữ các lần nộp riêng biệt. Chỉ báo “Đã nộp”
khi có xác nhận; nếu timeout thì cho kiểm tra lịch sử trước khi gửi lại.

Các trạng thái phải có bản thiết kế: chưa mở, đang mở/chưa nộp, đang gửi, lỗi gửi,
đã nhận, hết hạn, đã chấm. “Chờ chấm/đang chấm/lỗi chấm” chỉ thêm khi có hàng đợi judge.
Đếm ngược hỗ trợ người dùng; quyền xem đề và nhận bài do server quyết định.

### 5.5 Không gian giảng viên

Trang `/teacher/` ưu tiên khóa đang phụ trách, nút tạo khóa và bộ lọc. Trong một khóa,
giữ các tab hiện có và bổ sung tổng quan, bài nộp/điểm khi đến giai đoạn tương ứng.

- Nội dung: thêm mục/tuần, tải tài liệu, xem trước, ẩn/hiện; thao tác sửa/sắp xếp cần API mới.
- Sinh viên: tìm kiếm, thêm từ danh sách, dán MSSV, mã tham gia; phân biệt xóa khỏi khóa
  với xóa tài khoản toàn hệ thống.
- Bài tập/thi: form cấu hình đề, lịch, quy tắc nộp; xem trước như sinh viên.
- Bài nộp: lọc theo bài/sinh viên/trạng thái, mở chi tiết, tải file, nhập điểm và nhận xét.
  Không tự thêm thực thi code hay trình chấm trong browser.

### 5.6 Quản trị

Dashboard: tổng tài khoản, sinh viên, bị khóa và đang online; bảng hiện diện và thao tác
kick. Số kết nối là số socket, không gắn nhãn thành tổng session đăng nhập.

Người dùng: filter và bảng dễ đọc, hành động theo quyền, modal xác nhận khóa/xóa/kick.
Import: nhập/chọn file → xem trước → gửi → kết quả tạo/trùng/lỗi theo dòng; không hiển thị
mật khẩu ngày sinh ở bảng kết quả thông thường. Audit: action, thời gian, người thao tác,
đối tượng; diễn giải dữ liệu cho người dùng, không đổ JSON/detail nội bộ trực tiếp ra màn hình.

## 6. Dữ liệu và API phụ thuộc

| Nhóm màn hình | Có thể nối API hiện tại | Phần cần backend bổ sung |
|---|---|---|
| Auth, user, import, presence | Có | Tạo/sửa user, reset password nếu đưa vào scope |
| Audit | Có GET phân trang | Filter nâng cao nếu thiết kế cần; không giả định API hỗ trợ sẵn |
| Dashboard sinh viên | Profile, courses rỗng | Việc cần làm, tiến độ, lịch, thông báo lưu trữ |
| Course/content/enrollment | Chưa; có mock tham khảo | Schema, API, quyền quản lý khóa, ownership/membership và file access |
| Activity/submission | Chưa | Quy tắc mở/đóng, upload policy, receipt, lịch sử, chống nhận trùng khi retry |
| Grade/progress | Chưa | API chấm tay/nhận xét, công bố điểm, tính tiến độ |
| Judge/XP/contest | Chưa | Worker/job/result, XP events và scope leaderboard |

Trước khi tích hợp một nhóm mới, thống nhất dữ liệu mà màn hình cần: trường bắt buộc,
phân trang, trạng thái nghiệp vụ, mã lỗi, thời gian server, audience của event. Dùng API
mock hiện có làm tham khảo; không coi đường dẫn/payload mock là hợp đồng đã được backend chấp thuận.

## 7. Thứ tự thực hiện và đầu ra

| Bước | Công việc | Đầu ra / tiêu chí hoàn tất |
|---|---|---|
| 0. Chốt thiết kế | Xác định sitemap, 3 luồng chính, danh sách màn hình MVP và phần mở rộng | Danh mục màn hình, quyền, trạng thái và API dependency thống nhất |
| 1. Wireframe | Vẽ login, dashboard student, course, activity/nộp bài, teacher course, admin dashboard | Thấy được đường đi trọn vẹn của cả 3 vai trò; chưa tập trung animation |
| 2. Hệ thành phần | Chốt token, 2 layout, form/table/modal/course/activity/upload states | Một trang tham chiếu thành phần ở desktop và 360px |
| 3. Prototype học tập | Dựng dashboard → course → activity/nộp bài → receipt/kết quả bằng fixture rõ ràng | Prototype có thể bấm qua toàn bộ luồng; có tải/rỗng/lỗi/hết hạn |
| 4. Prototype giảng dạy/quản trị | Dựng quản lý khóa, ghi danh, bài kiểm tra, bài nộp; hoàn thiện user/import/presence/audit | Luồng giao bài/chấm tay và quản trị liên kết với luồng sinh viên |
| 5. Tích hợp | Nối API có sẵn trước; nối course → content/enrollment → activity/submission → grade theo backend bàn giao | Mỗi nhóm có kiểm thử với Spring thật; không coi fixture là hoàn tất tích hợp |
| 6. Hoàn thiện | Responsive, bàn phím, lỗi mạng/revoke, hiệu năng, offline assets, nhiều máy LAN | Đạt checklist nghiệm thu bên dưới |
| 7. Mở rộng | Lịch nâng cao, notification inbox, judge, XP/badge/contest; portal các role còn lại | Thiết kế riêng sau khi có nghiệp vụ và API tương ứng |

Ở bước prototype, chế độ demo được ghi rõ và tách khỏi dữ liệu thật. Trong bản dùng thật,
chỉ mở chức năng có backend đáp ứng; không có nút trả thông báo thành công giả.

## 8. Cách tổ chức khi bắt đầu code

Tái sử dụng các trang/module hiện có. Giữ API và WebSocket tập trung; tách phần lặp của
layout sinh viên và trạng thái realtime; tạo component dùng chung cho card, bảng trạng thái,
confirm modal và upload. Chỉ tách `teacher-course.js` thành các module theo tab khi triển khai
tab tương ứng, tránh vừa đổi toàn bộ cấu trúc vừa đổi giao diện cùng lúc.

CSS bắt đầu từ `app.css` và design token; tách file khi kích thước thực tế cần thiết.
Không đưa thêm framework/build step chỉ để viết giao diện. Giữ `id` và các hook hiện tại
khi thay bố cục, hoặc sửa đồng bộ module trang khi phải thay đổi.

## 9. Tiêu chí nghiệm thu

- Có giao diện thống nhất cho ba vai trò và đường quay lại/ngữ cảnh rõ ràng.
- Student đi từ khóa học tới xem đề, nộp bài, receipt và kết quả mà không nhập lại danh tính.
- Teacher quản lý nội dung/ghi danh/giao bài và chấm tay trong đúng scope khóa học.
- Admin import thấy báo cáo chính xác; online và ép logout phản ánh trạng thái server.
- Mỗi trang có tải/rỗng/lỗi; mỗi thao tác có trạng thái chờ/thành công/thất bại.
- Phân biệt chưa mở/đã đóng với chưa nộp/đã nộp; phân biệt điểm học tập với XP.
- Không mất dữ liệu nhập khi lỗi có thể phục hồi; không tự gửi lại bài khi chưa biết kết quả lần trước.
- Dùng được ở 360px, tablet và desktop; bàn phím/focus/nhãn dễ hiểu; không có CDN.
- Không để UI tự quyết định quyền xem đề, deadline, điểm hoặc việc server đã nhận file.
- Kiểm thử đầu cuối với Spring/MySQL và ít nhất hai trình duyệt/máy LAN cho luồng realtime.

## 10. Các quyết định còn mở trước khi hoàn thiện thiết kế

Các mặc định này đủ để bắt đầu wireframe; chưa cần chặn việc lập kế hoạch:

| Quyết định | Mặc định đề xuất | Cần chốt khi nào |
|---|---|---|
| Nhận diện | LAN LMS theo giao diện hiện tại; cân nhắc Cyb3rT1t@ns | Trước thiết kế hình ảnh cuối |
| Ngôn ngữ | Tiếng Việt | Trước hoàn thiện nội dung UI |
| Bản đầu | Khóa học + tài liệu + bài nộp file + chấm tay | Trước triển khai activity/submission |
| Chính sách nộp | Thiết kế hỗ trợ nhiều lần, lịch sử tách biệt; chưa tự quy định số lần/hạn muộn | Khi chốt hợp đồng backend |
| Loại file/dung lượng | Theo từng loại tài liệu và bài; server cung cấp chính sách | Trước upload tích hợp |
| Mentor/Supervisor/Parent/Visitor | Giữ role, chưa tự tạo nghiệp vụ mới | Giai đoạn mở rộng |

Bước tiếp theo của kế hoạch là wireframe sáu màn hình cốt lõi ở bước 1, rồi mới triển khai
giao diện theo từng luồng đã mô tả.
