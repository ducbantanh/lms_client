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

Mở **http://localhost:3000**. Mặc định là bản demo có 12 khóa học; không cần backend.
Nếu đã cài dependencies, chỉ cần `npm run dev`.

## Cấu trúc gọn

```text
lms_client/
├── app/
│   ├── layout.tsx                 Layout chung + thư viện CSS local
│   ├── globals.css                CSS tùy chỉnh trên AdminLTE/Bootstrap
│   ├── page.tsx                   Trang chủ
│   ├── course-overview.tsx        Giao diện/lọc khóa học
│   ├── course/                   Trang và nội dung chi tiết khóa học
│   ├── dashboard/                Trang và nội dung dashboard
│   ├── login/                    Trang đăng nhập
│   └── change-password/          Trang đổi mật khẩu
├── components/                   Header, footer, card, icon, modal, form dùng chung
├── lib/                          API, session, hook, model, dữ liệu demo, tiện ích
├── public/                       Font, icon, AdminLTE/Bootstrap và giấy phép
├── scripts/                      Gateway preview, hỗ trợ build Windows
├── tests/                        Kiểm thử bộ lọc khóa học
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

- Trang chủ: `app/page.tsx` → `app/course-overview.tsx` → `components/course-card.tsx`.
- Hook dữ liệu: `lib/use-courses.ts`.
- Hook yêu thích/ẩn/kiểu hiển thị: `lib/use-course-preferences.ts`.
- Login, phiên và WebSocket: `components/auth-form.tsx`, `lib/session-provider.tsx`.
- API/CSRF: `lib/api.ts`. Token chỉ giữ trong RAM; session thật dùng cookie HttpOnly.
- Dữ liệu minh họa: `lib/demo-data.ts`; không dùng mock thay dữ liệu thật khi API lỗi.

## Bootstrap và AdminLTE

- `app/layout.tsx` import bundle `public/vendor/adminlte/adminlte.min.css` trước `app/globals.css`.
- Bundle AdminLTE 3.2 đã chứa Bootstrap 4.6.1; không nạp trùng Bootstrap.
- Layout dùng `layout-top-nav`, `wrapper`, `main-header`, `content-wrapper`, `main-footer`.
- Khóa học dùng `row/col`, `card/card-body`; form dùng `form-control`, `custom-select`, `btn`.
- Dashboard dùng `info-box`; tiến độ dùng `progress/progress-bar`.
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

`npm run dev` phục vụ phát triển UI/demo. Login thật cần gateway preview hoặc webserver
proxy API/WebSocket cùng origin. Spring hiện trả danh sách khóa học rỗng; sau login thật,
client hiển thị trạng thái rỗng, không ghép dữ liệu demo vào.

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
Nội dung khóa học/nộp bài/chấm điểm thật và portal admin/teacher Next.js chưa triển khai.
Kiểm tra trình duyệt dùng mock + gateway; chưa xác minh trực tiếp với MySQL/Spring thật.

[Xem desktop](docs/preview-desktop.png) · [Xem mobile](docs/preview-mobile.png).
