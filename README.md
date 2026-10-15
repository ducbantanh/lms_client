# LMS Client — giao diện LAN LMS (beta)

Giao diện cho admin và sinh viên, viết bằng **HTML + JavaScript thuần** (ES module) trên nền **AdminLTE 3**.

- Không có bước build.
- Không dùng CDN: AdminLTE 3, Bootstrap 4, jQuery, Font Awesome 5 và font Source Sans Pro (có tiếng Việt) đều nằm sẵn trong `public/vendor/`. Phòng máy không có Internet vẫn chạy được.
- Chỉ những gì nằm trong `public/` mới được đưa ra mạng. README, mock server và `node_modules` nằm ngoài nên không bị lộ.

## 1. Chạy

### Cách 1: cùng server thật (chuẩn)

Đặt `lms-client` cạnh `lms-server` rồi chạy server:

```
lms/
├── lms-server/   ← mvn spring-boot:run
└── lms-client/
```

Mở http://localhost:8080/. Server tự phục vụ thư mục `lms-client/public/`, cùng origin với API, nên cookie, CSRF và WebSocket chạy luôn mà không cần cấu hình gì.

Sửa file HTML, JS hay CSS xong chỉ cần **F5**, không phải khởi động lại server.

### Cách 2: mock server (khi chưa chạy được Java + MySQL)

Cần Node.js 18 trở lên.

```bash
npm install
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

Mock giữ dữ liệu trong RAM, tắt là mất. Hợp đồng API **chuẩn** nằm trong README của `lms-server` (mục 4–5). Nếu mock và server thật khác nhau thì server thật đúng; cần sửa mock cho khớp.

## 2. Các trang

| URL | Trang | Quyền |
|---|---|---|
| `/` | Tự chuyển tới login hoặc trang chủ theo quyền | — |
| `/login.html` | Đăng nhập | public |
| `/change-password.html` | Đổi mật khẩu (bắt buộc ở lần đầu với tài khoản import) | login |
| `/admin/` | Thống kê, danh sách online realtime, ép đăng xuất | `presence.view` |
| `/admin/users.html` | Tìm kiếm, phân trang, khóa/mở khóa, xóa, ép đăng xuất | `users.manage` |
| `/admin/import.html` | Import sinh viên từ text hoặc file `.txt` | `users.manage` |
| `/teacher/` | Danh sách khóa học, tạo khóa học (admin thấy mọi khóa) | `courses.manage` |
| `/teacher/course.html?id=` | Tài liệu theo mục/tuần, ghi danh 3 cách, bài kiểm tra | `courses.manage` |
| `/student/` | Profile, khóa học đã tham gia, tham gia bằng mã, thông báo realtime | `courses.view` |
| `/student/course.html?id=` | Tài liệu, bài kiểm tra, xem đề khi tới giờ | `courses.view` |

Sau khi đăng nhập, mỗi role vào trang chủ riêng: **0 Admin → `/admin/`, 1 Teacher → `/teacher/`, 2 Student và 3 Visitor → `/student/`**.

## 3. Cấu trúc

```
lms-client/
├── README.md
├── package.json              chỉ dùng cho mock server
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
2. **Dòng đầu tiên** trong JS của trang là `const user = await requirePage({ permission: '...' })`. Hàm này lo hết việc chưa đăng nhập, bắt đổi mật khẩu và thiếu quyền.
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
