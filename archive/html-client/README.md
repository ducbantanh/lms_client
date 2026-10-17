> Bản HTML cũ được lưu để tham khảo. Frontend chính và hướng dẫn hiện tại ở ../../README.md. Các đường dẫn trong nội dung dưới đây là tài liệu lịch sử.

# LMS Client — giao diện LAN LMS (beta)

> Giao diện Next.js mới theo ảnh tham chiếu nằm trong [`client-next/`](client-next/README.md).
> Chạy `cd client-next` rồi `npm run dev` để xem ở cổng 3000.
> Nội dung phía dưới mô tả bản HTML/JavaScript hiện có.

Giao diện cho admin và sinh viên, viết bằng **HTML + JavaScript thuần** (ES module) trên nền **AdminLTE 3**.

- Không có bước build.
- Không dùng CDN: AdminLTE 3, Bootstrap 4, jQuery, Font Awesome 5 và font Source Sans Pro (có tiếng Việt) đều nằm sẵn trong `public/vendor/`. Phòng máy không có Internet vẫn chạy được.
- Chỉ những gì nằm trong `public/` mới được đưa ra mạng. README, mock server và `node_modules` nằm ngoài nên không bị lộ.

## 1. Chạy

### Cách 1: kết nối Spring Boot hiện tại

Khởi động MySQL và Spring Boot theo `../lms_server/README.md` (mặc định cổng 8080).
Trong `lms_client`, cần Node.js 18+:

```powershell
npm ci
npm run dev
```

Mở http://localhost:8090/. Dev gateway chỉ phục vụ `public/`, chuyển `/api/**` và `/ws`
tới Spring Boot. Browser dùng cùng origin cho cookie HttpOnly, CSRF và WebSocket.
Gateway không cần dependency ngoài; `npm ci` cài `ws` để chạy mock và kiểm thử.

Nếu backend dùng địa chỉ khác, cấu hình trước khi chạy (PowerShell):

```powershell
$env:API_TARGET = 'http://127.0.0.1:8080'
$env:PORT = '8090'
npm run dev
```

Mặc định chỉ bind loopback. Để thử từ máy khác trong LAN, đặt `$env:HOST = '0.0.0.0'`
và mở URL bằng IP máy chạy gateway. Sửa HTML/JS/CSS rồi F5, không cần build.

**Lưu ý:** Spring Boot hiện chỉ phục vụ `classpath:/static/`, chưa tự đọc repo client bên cạnh.
Khi triển khai, dùng webserver phục vụ `public/` với directory index `index.html` và proxy
`/api/`, `/ws` tới Spring Boot trên cùng origin. Dev gateway dành cho phát triển.

### Cách 2: mock server (khi chưa chạy được Java + MySQL)

Cần Node.js 18 trở lên.

```bash
npm ci
npm run mock
```

Mở http://localhost:8090/.

| Tài khoản | Mật khẩu | Ghi chú |
|---|---|---|
| `admin` | `admin12345` | quản trị viên |
| `teacher01` | `teacher12345` | giảng viên |
| `student01` | `student12345` | sinh viên |
| `B21DCCN001` … `B21DCCN023` | `01012003` | bị bắt đổi mật khẩu lần đầu |

Gửi thử một thông báo realtime: mở `http://localhost:8090/__broadcast?m=Noi+dung`.

Mock giữ dữ liệu trong RAM, tắt là mất. Mock còn có API demo khóa học, ghi danh, tài liệu,
bài kiểm tra và tạo user thủ công mà Spring Boot hiện chưa triển khai. Các màn hình này
chỉ bật ở `npm run mock`. Mã role luôn khớp server; mock không thay thế kiểm thử backend thật.

## 2. Các trang

| URL | Trang | Quyền |
|---|---|---|
| `/` | Tự chuyển tới login hoặc trang chủ theo quyền | — |
| `/login.html` | Đăng nhập | public |
| `/change-password.html` | Đổi mật khẩu (bắt buộc ở lần đầu với tài khoản import) | login |
| `/account.html` | Tài khoản chưa có quyền chức năng, đổi mật khẩu/đăng xuất | login |
| `/admin/` | Thống kê, danh sách online realtime, ép đăng xuất | `presence.view` |
| `/admin/users.html` | Tìm kiếm, phân trang, khóa/mở khóa, xóa, ép đăng xuất | `users.manage` |
| `/admin/import.html` | Import sinh viên từ text hoặc file `.txt` | `users.manage` |
| `/teacher/` | Danh sách khóa học, tạo khóa học (admin thấy mọi khóa) | `courses.manage` |
| `/teacher/course.html?id=` | Tài liệu theo mục/tuần, ghi danh 3 cách, bài kiểm tra | `courses.manage` |
| `/student/` | Profile, khóa học đã tham gia, tham gia bằng mã, thông báo realtime | `courses.view` |
| `/student/course.html?id=` | Tài liệu, bài kiểm tra, xem đề khi tới giờ | `courses.view` |

Role chuẩn: **0 Admin, 1 Teacher, 2 Mentor, 3 Supervisor, 4 Parent, 5 Student, 6 Visitor**.
Điều hướng dựa vào `user.permissions` trong phiên, không suy đoán quyền từ role.
Với seed Spring hiện tại: Admin/Teacher → `/admin/`, Mentor/Student/Visitor → `/student/`,
Supervisor/Parent chưa có quyền → `/account.html`. Trong mock, Teacher có thêm
`courses.manage` và vào `/teacher/`. Các trang khóa học chỉ mở khi `features.courses` bật.

## 3. Cấu trúc

```
lms-client/
├── README.md
├── package.json              dev gateway, mock và kiểm thử
├── dev/server.js             static public + HTTP/WebSocket proxy tới Spring
├── dev/static.js             phục vụ static, chặn truy cập ngoài public
├── tests/                    kiểm thử nền tảng và tích hợp mock/proxy
├── dev/mock-server.js        mock API + WebSocket (không đưa lên server)
└── public/                   ← server phục vụ thư mục này
    ├── index.html            chuyển hướng theo trạng thái đăng nhập
    ├── login.html
    ├── change-password.html
    ├── favicon.svg
    ├── admin/                index.html, users.html, import.html
    ├── teacher/              index.html, course.html
    ├── student/              index.html, course.html
    ├── vendor/               thư viện ngoài (không sửa tay)
    └── assets/
        ├── css/app.css       CSS dùng chung
        └── js/
            ├── api.js              MỌI lời gọi API đi qua đây (CSRF, 401, lỗi tiếng Việt)
            ├── config.js           API base, timeout, cờ tính năng public
            ├── routing.js          trang chủ theo quyền, kiểm tra URL next
            ├── realtime.js         MỌI kết nối WebSocket đi qua đây (reconnect, bị kick)
            ├── messages-vi.js      bảng dịch mã lỗi / lý do sang tiếng Việt
            ├── notifications.js    toast
            ├── ui.js               esc(), định dạng ngày giờ, debounce...
            ├── admin-layout.js     navbar + sidebar admin (trang mới: thêm vào MENU)
            ├── auth-pages.js       login + đổi mật khẩu
            ├── index-redirect.js
            ├── admin-dashboard.js
            ├── admin-users.js
            ├── admin-import.js
            ├── course-common.js    icon file, nhóm file theo mục, nhãn trạng thái bài kiểm tra
            ├── teacher-courses.js
            ├── teacher-course.js
            ├── student-dashboard.js
            └── student-course.js
```

## 4. Quy tắc viết trang

1. **Mỗi trang một file JS riêng:** `<script type="module" src="/assets/js/<trang>.js">`. Không viết script inline, không dùng `onclick=""`, để sau này bật được Content-Security-Policy.
2. **Sau các import**, JS của trang gọi `const user = await requirePage({ permission: '...' })`. Hàm này xử lý chưa đăng nhập, bắt đổi mật khẩu, thiếu quyền và lỗi tải phiên. Trang của tính năng chưa có server dùng thêm `feature: 'courses'`.
3. **Gọi API chỉ qua `api.js`:** dùng `api.get / post / patch / del`. Không tự viết `fetch`, vì sẽ thiếu header CSRF.
4. **Nhận realtime chỉ qua `realtime.js`:** `connectRealtime().on('presence.changed', fn)`. Không tự mở `new WebSocket`.
5. **Mọi dữ liệu từ server phải qua `esc()`** trước khi chèn vào `innerHTML` (tên sinh viên do admin import, có thể chứa ký tự HTML).
6. Báo lỗi bằng `notify.error(err.message)`; `err.message` đã là tiếng Việt. Mã lỗi mới thì thêm vào `messages-vi.js`.
7. `<body>` có class `app-loading` để ẩn nội dung cho tới khi kiểm tra đăng nhập xong.
8. Icon trạng thái dùng class `status-dot`, **không** dùng `small`. Class `small` làm Font Awesome hiện hình tròn rỗng.

### Khung một trang admin mới

```html
<body class="hold-transition sidebar-mini layout-fixed app-loading">
<div class="wrapper">
  <nav class="main-header navbar navbar-expand navbar-white navbar-light" id="app-navbar"></nav>
  <aside class="main-sidebar sidebar-dark-primary elevation-4" id="app-sidebar"></aside>
  <div class="content-wrapper"> ... </div>
</div>
<script src="/vendor/jquery/jquery.min.js"></script>
<script src="/vendor/bootstrap/bootstrap.bundle.min.js"></script>
<script src="/vendor/adminlte/adminlte.min.js"></script>
<script type="module" src="/assets/js/admin-xxx.js"></script>
</body>
```

```js
import { api, requirePage } from './api.js';
import { connectRealtime } from './realtime.js';
import { initAdminLayout } from './admin-layout.js';

const user = await requirePage({ permission: 'users.manage' });
const layout = initAdminLayout({ active: 'xxx', user });
connectRealtime().on('status', (s) => layout.setWsStatus(s));
```

## 5. Giới hạn của bản beta

- Chưa có các trang audit, gửi thông báo.
- Chưa có nộp bài / chấm điểm (mới có đề và thời gian mở/đóng).
- Chưa sửa được tên mục, chưa sắp xếp lại thứ tự file.
- Chưa có form sửa user và reset mật khẩu (đợi API của P4).
- Hộp xác nhận đang dùng `window.confirm`; có thể thay bằng modal AdminLTE sau.
- Trình duyệt cần hỗ trợ ES module và top-level await (Chrome/Edge 89+, Firefox 89+).

## 6. Base và kiểm thử

```powershell
npm run check
npm test
```

`check` kiểm tra cú pháp JS và không có script/CSS CDN trong HTML.
`test` kiểm tra role/routing, chặn open redirect, CSRF JSON/multipart, timeout/hủy request,
lỗi HTTP/envelope, phiên hết hạn, singleton WebSocket và thu hồi phiên. Bài tích hợp tự
khởi động mock + gateway trên cổng tạm, kiểm tra login/import/đổi mật khẩu/presence/kick,
cookie và phạm vi static; tự tắt process sau khi xong. Không kết nối hay thay đổi MySQL.

`config.js` mặc định tắt `courses` và `createUser` theo API Spring hiện có. Mock phục vụ
bản config riêng bật demo. Cờ này chỉ điều khiển UI; mọi phân quyền vẫn do server quyết định.
API client giữ CSRF trong RAM, có timeout (15 giây mặc định) và `AbortSignal`, không tự
retry mutation. Lỗi khởi tạo có màn hình thử lại. Không lưu mật khẩu/token trong storage.
Realtime dùng một socket mỗi trang, có `on/off/close`, backoff và dừng khi revoke hoặc rời trang.

Đối chiếu chi tiết yêu cầu và các phần chưa có backend: [docs/BASE.md](docs/BASE.md).

