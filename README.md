# LMS Client — Next.js + AdminLTE 3

Frontend chính nằm ngay tại thư mục `lms_client`, không cần vào project con.
Dùng Next.js App Router, TypeScript, AdminLTE 3.2 (đã bao gồm Bootstrap 4.6.1),
Font Awesome 5 và font local. Các biến quan trọng, hook và hàm có chú thích tiếng Việt.

## Chạy giao diện

Cần Node.js 22.13+:

```powershell
cd "D:\STUDY\SCHOOL\Lap Trinh Mang\lms_client"
npm ci
npm run dev
```

Mở **http://localhost:3000**. Client luôn kết nối server thật (không còn chế độ demo):
mở trang sẽ gọi `/auth/me`, chưa đăng nhập thì chuyển sang `/login/`. `npm run dev` không
proxy API nên chỉ dùng để sửa giao diện; muốn đăng nhập thật hãy dùng `npm run preview` (mục dưới).

## Cấu trúc gọn

```text
lms_client/
├── app/
│   ├── layout.tsx                 Root layout: session + CSS local (không có khung trang)
│   ├── globals.css                Toàn bộ CSS của ứng dụng
│   ├── (learn)/                   Khu học tập, dùng khung sidebar (layout.tsx → AppShell)
│   │   ├── page.tsx               Trang chủ: danh sách khóa học (course-overview.tsx)
│   │   ├── dashboard/             Tổng quan của sinh viên
│   │   └── course/                Chi tiết khóa học
│   ├── (auth)/                    Header + footer đơn giản
│   │   ├── login/                 Trang đăng nhập
│   │   └── change-password/       Trang đổi mật khẩu
│   ├── admin/                     Khu quản trị (tổng quan, người dùng, tạo tài khoản)
│   └── teacher/                   Khu giảng viên: danh sách khóa học + trang quản lý một khóa
├── components/                   Khung sidebar, header, card, icon, modal, form dùng chung
├── lib/                          API, session, hook, model, tiện ích
├── public/                       Font, icon, AdminLTE/Bootstrap và giấy phép
├── scripts/                      Gateway preview, hỗ trợ build Windows
├── tests/                        Kiểm thử bộ lọc khóa học và chuyển trang theo vai trò
├── docs/                         Kế hoạch và ảnh giao diện
├── archive/html-client/          Bản HTML cũ, giữ để tham khảo
├── package.json
└── next.config.ts
```

Bốn thư mục viết giao diện chính là **app, components, lib, public**.
Không còn các tầng `features/`, `hooks/`, `styles/` riêng. Code riêng của trang đặt cạnh
`page.tsx`; code dùng chung đặt trong `components/` hoặc `lib/`.

`node_modules/`, `.next/`, `out/` và `*.tsbuildinfo` do công cụ tự sinh, đã bỏ qua trong Git.
`.qa/`, `.browser-test/`, `.npm-cache/` là dữ liệu kiểm tra/cache local, không phải source ứng dụng.
Các tài liệu kế hoạch cũ trong `docs/` mô tả thời điểm trước khi gom thư mục; dùng cấu trúc
trong README này để tra đường dẫn hiện tại.

## Đọc source từ đâu?

- Quản trị: `app/admin/` (mỗi trang một file `*-view.tsx`), dùng chung `components/admin-ui.tsx`,
  kiểu dữ liệu API trong `lib/admin.ts`; quyền và chuyển trang theo role trong `lib/auth.ts`.
- Giảng viên: `app/teacher/teacher-courses.tsx` (danh sách, tạo khóa học) và `app/teacher/course/`
  (`course-manager.tsx` + 3 tab Nội dung / Sinh viên / Bài kiểm tra). Kiểu dữ liệu và nhãn trong
  `lib/teaching.ts`; dòng tài liệu và thẻ bài kiểm tra dùng chung với sinh viên ở `components/course-items.tsx`.
- Trang chủ theo vai trò: Admin → `/admin/`, Giảng viên → `/teacher/`, còn lại → `/`. Admin và giảng
  viên mở trang học tập của sinh viên sẽ được chuyển về khu của mình (`routeRedirect` trong `lib/auth.ts`).

- Khung sidebar dùng chung (khu học tập + quản trị): `components/app-shell.tsx`; menu theo khu
  vực nằm trong `navFor()`. Thư mục `(learn)`, `(auth)` là route group nên không xuất hiện trong URL.
- Trang chủ: `app/(learn)/page.tsx` → `app/(learn)/course-overview.tsx` →
  `components/course-card.tsx`; nút "Tham gia bằng mã" mở `components/join-course-dialog.tsx`.
- Chi tiết khóa học của sinh viên: `app/(learn)/course/course-detail.tsx` (gọi `/student/courses/{id}`).
- Hook dữ liệu: `lib/use-courses.ts`.
- Hook yêu thích/ẩn/kiểu hiển thị: `lib/use-course-preferences.ts`.
- Login, phiên và WebSocket: `components/auth-form.tsx`, `lib/session-provider.tsx`.
- API/CSRF: `lib/api.ts`. Token chỉ giữ trong RAM; session thật dùng cookie HttpOnly.
- Bảo vệ route (giống `requirePage` của client cũ): `lib/session-provider.tsx`. Chưa đăng nhập →
  `/login/?next=...`, phải đổi mật khẩu → `/change-password/`, bị thu hồi phiên → về login kèm lý do.

## CSS

- Toàn bộ style nằm trong `app/globals.css`, dùng token màu ở `:root` (một màu nhấn cam duy nhất).
- Không còn nạp AdminLTE/Bootstrap: Next xếp chunk vendor sau `globals.css` nên Bootstrap đè style
  riêng. File `public/vendor/adminlte/` vẫn giữ lại nhưng không được import.
- Class dùng chung: `button` (`primary`, `danger`, `small`), `input`, `select`, `panel`, `tabs`,
  `toolbar`, `stats/stat-card`, `badge`, `empty-state`.
- Font Awesome CSS/webfonts trong `public/vendor/fontawesome/`, không CDN.
- React/native dialog quản lý tương tác; không dùng jQuery để sửa DOM của React.

## Build static và kết nối backend

```powershell
npm run build
npm run preview
```

Mở **http://localhost:3100**. Gateway trong `scripts/` phục vụ `out/`, proxy `/api/**` và
`/ws` tới Spring Boot mặc định `http://127.0.0.1:8080`. Có thể đổi bằng PowerShell:

```powershell
$env:API_TARGET = 'http://127.0.0.1:8080'
$env:HOST = '0.0.0.0'
npm run preview
```

Login thật cần gateway preview hoặc webserver proxy API/WebSocket cùng origin. Spring hiện trả
danh sách khóa học rỗng; sau login, client hiển thị trạng thái rỗng.

`postbuild` chuẩn hóa file RSC segment của Next.js trên Windows. Chỉ sửa đầu ra `out/`,
không sửa `node_modules`. Tham khảo [upstream issue](https://github.com/vercel/next.js/issues/85374).
Đầu ra `out/` có thể phục vụ bằng webserver static trong LAN; không cần Next server.

## Bản cũ và kiểm thử

Bản HTML/JS, mock, test và package cũ được giữ trong `archive/html-client/`.
Chạy mock API + giao diện HTML cũ: `npm run mock` (cổng 8090).
Để thử Next với mock, chạy mock rồi mở terminal khác:

```powershell
$env:API_TARGET = 'http://127.0.0.1:8090'
npm run preview
```

Các lệnh kiểm tra của frontend chính:

```powershell
npm run typecheck
npm test
npm run build
npm run format
```

Đã có UI khóa học, bộ lọc, yêu thích, ẩn/hiện, grid/list, dashboard, chi tiết mẫu và login.
Đã có trang quản trị cho Admin (role 0, đăng nhập vào thẳng `/admin/`): `/admin/` tổng quan và
danh sách online realtime, `/admin/users/` quản lý tài khoản, `/admin/import/` import sinh viên.
Nội dung khóa học/nộp bài/chấm điểm thật và portal teacher Next.js chưa triển khai.
Kiểm tra trình duyệt dùng mock + gateway; chưa xác minh trực tiếp với MySQL/Spring thật.

[Xem desktop](docs/preview-desktop.png) · [Xem mobile](docs/preview-mobile.png).
