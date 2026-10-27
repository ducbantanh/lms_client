# LMS Client — Next.js

Frontend chính nằm ngay tại thư mục `lms_client`, không cần vào project con.
Dùng Next.js App Router, TypeScript, Font Awesome 5 và font local. Các biến quan trọng, hook và hàm có chú thích tiếng Việt.

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

## Cấu trúc thư mục

Theo quy ước của Next.js (App Router + thư mục `src/`): code ứng dụng nằm trong `src/`,
`public/` và file cấu hình nằm ở thư mục gốc.

```text
lms_client/
├── src/
│   ├── app/                       Chỉ chứa route (page, layout, not-found) và code riêng của route
│   │   ├── layout.tsx             Root layout: session + CSS local (không có khung trang)
│   │   ├── globals.css            Tailwind: thứ tự layer, token (@theme), hiệu ứng chung
│   │   ├── base.css               Reset thẻ HTML (thay preflight của Tailwind)
│   │   ├── ui.css                 Thành phần dùng chung (@apply): nút, ô nhập, panel, bảng, badge, tab…
│   │   ├── code.css               Bài lập trình (CodeMirror, bộ test, ma trận kết quả, kho bài)
│   │   ├── schedule.css           Lịch học và đơn xin nghỉ
│   │   ├── exam.css               Thi có giám sát (chế độ thi, mã phòng thi, bảng giám sát)
│   │   ├── fonts/                 Source Sans Pro (woff2 + @font-face), import trong layout.tsx
│   │   ├── (learn)/               Khu học tập, dùng khung sidebar (layout.tsx → AppShell)
│   │   │   ├── page.tsx           Trang chủ: danh sách khóa học
│   │   │   ├── _components/       Code riêng của trang chủ (course-overview, course-card...)
│   │   │   ├── dashboard/         Tổng quan của sinh viên
│   │   │   ├── course/            Chi tiết khóa học, làm bài (assessment/)
│   │   │   ├── notifications/     Thông báo
│   │   │   └── settings/          Cài đặt
│   │   ├── (auth)/                Header + footer đơn giản: login/, change-password/
│   │   ├── admin/                 Khu quản trị: tổng quan, users/, import/, audit/, settings/
│   │   └── teacher/               Khu giảng viên: courses/, course/ (quản lý một khóa), settings/
│   ├── components/                Component dùng chung nhiều route
│   │   ├── layout/                Khung trang: app-shell, site-header, site-footer, menu tài khoản, chuông
│   │   ├── ui/                    Thành phần cơ bản: icon, modal, stat-card, view-toggle...
│   │   └── *.tsx                  Component nghiệp vụ dùng chung: admin-ui, auth-form, course-items...
│   ├── hooks/                     Hook dữ liệu và tùy chọn hiển thị (use-*.ts)
│   ├── providers/                 Context provider: session, thông báo
│   └── lib/                       API, quyền, kiểu dữ liệu, hàm tiện ích (không có React)
├── public/                        favicon, pdf.js (tự chép khi npm install)
├── scripts/                       Gateway preview, hỗ trợ build Windows
├── tests/                         Kiểm thử các hàm trong src/lib/
├── docs/                          Kế hoạch, thiết kế, kiến trúc tham khảo và ảnh giao diện
├── next.config.ts
├── tsconfig.json                  Alias `@/*` → `src/*`
└── package.json
```

Quy ước đặt file:

- Mỗi thư mục trong `src/app/` là một đoạn URL; chỉ `page.tsx` tạo ra route. Code chỉ một route
  dùng đặt trong thư mục private `_components/` cạnh `page.tsx` (Next bỏ qua thư mục bắt đầu bằng `_`).
- Code dùng ở từ hai route trở lên đặt trong `src/components/`, `src/hooks/`, `src/providers/`
  hoặc `src/lib/`. Import bằng alias `@/`, ví dụ `@/components/ui/icon`, `@/lib/api`.
- `src/lib/` chỉ chứa TypeScript thuần nên test chạy trực tiếp bằng Node, không cần build.

`node_modules/`, `.next/`, `out/`, `next-env.d.ts` và `*.tsbuildinfo` do công cụ tự sinh, đã bỏ qua
trong Git. `.qa/`, `.browser-test/`, `.npm-cache/` là dữ liệu kiểm tra/cache local.
Các tài liệu kế hoạch cũ trong `docs/` mô tả thời điểm trước khi sắp xếp lại thư mục; dùng cấu trúc
trong README này để tra đường dẫn hiện tại.

## Đọc source từ đâu?

- Quản trị: `src/app/admin/` (mỗi trang một file `_components/*-view.tsx`), dùng chung
  `src/components/admin-ui.tsx`, kiểu dữ liệu API trong `src/lib/admin.ts`; quyền và chuyển trang
  theo role trong `src/lib/auth.ts`.
- Giảng viên: `src/app/teacher/_components/teacher-courses.tsx` (danh sách, tạo khóa học) và
  `src/app/teacher/course/_components/` (`course-manager.tsx` + tab Nội dung / Sinh viên / Bài tập /
  Bài thực hành / Bài kiểm tra; ba tab bài dùng chung `assessments-tab.tsx`, mỗi tab một loại).
  Kiểu dữ liệu và nhãn trong `src/lib/teaching.ts` (`groupContent` gom bài học + tài liệu theo mục);
  dòng tài liệu, bài học (`LessonItem`) và thẻ bài kiểm tra dùng chung với sinh viên ở
  `src/components/course-items.tsx`.
- Trang chủ theo vai trò: Admin → `/admin/`, Giảng viên → `/teacher/`, còn lại → `/`. Admin và giảng
  viên mở trang học tập của sinh viên sẽ được chuyển về khu của mình (`routeRedirect` trong `src/lib/auth.ts`).

- Khung sidebar dùng chung (khu học tập + quản trị): `src/components/layout/app-shell.tsx`; menu theo
  khu vực nằm trong `navFor()`. Thư mục `(learn)`, `(auth)` là route group nên không xuất hiện trong URL.
- Trang chủ: `src/app/(learn)/page.tsx` → `src/app/(learn)/_components/course-overview.tsx` →
  `course-card.tsx`; nút "Tham gia bằng mã" mở `join-course-dialog.tsx` (cùng thư mục `_components/`).
- Chi tiết khóa học của sinh viên: `src/app/(learn)/course/_components/course-detail.tsx`
  (gọi `/student/courses/{id}`).
- Hook dữ liệu: `src/hooks/use-courses.ts`.
- Hook yêu thích/ẩn/kiểu hiển thị: `src/hooks/use-course-preferences.ts`, `src/hooks/use-view-mode.ts`,
  cùng đọc/ghi localStorage qua `src/hooks/use-local-storage.ts` (`useSyncExternalStore`).
- Giám sát bài kiểm tra (chống gian lận), kiểu dữ liệu và hàm thuần ở `src/lib/proctor.ts`:
  - Sinh viên: trang làm bài `src/app/(learn)/course/assessment/_components/assessment-view.tsx` chuyển sang
    `exam-gate.tsx`. `ExamEntry` là màn vào phòng thi (quy định, mã phòng thi, toàn màn hình). `ExamShell` là chế
    độ thi phủ kín màn hình.
  - Theo dõi trình duyệt: `src/hooks/use-exam-guard.ts` (rời trang, thoát toàn màn hình, chặn chép / dán, phím
    tắt, nhịp 15 giây). Ô soạn code có `data-exam-allow-copy` nên vẫn chép / dán bên trong được.
  - Đang thi mà mở trang khác: server trả `PROCTOR_IN_EXAM`, `src/lib/api.ts` phát sự kiện
    `PROCTOR_ERROR_EVENT`, `src/components/layout/in-exam-notice.tsx` đưa về trang làm bài.
  - Giảng viên: form cài đặt `src/components/proctor-settings.tsx` (trang Tạo bài thi và trang Giám sát). Trang
    `/teacher/course/proctor/` (`proctor-board.tsx`) có mã phòng thi để chiếu, bảng sinh viên cập nhật qua
    WebSocket `proctor.updated`, nhật ký, khóa / mở khóa / cho đổi máy.
- Login, phiên và WebSocket: `src/components/auth-form.tsx`, `src/providers/session-provider.tsx`.
- API/CSRF: `src/lib/api.ts`. Token chỉ giữ trong RAM; session thật dùng cookie HttpOnly.
- Bảo vệ route (giống `requirePage` của client cũ): `src/providers/session-provider.tsx`. Chưa đăng nhập →
  `/login/?next=...`, phải đổi mật khẩu → `/change-password/`, bị thu hồi phiên → về login kèm lý do.
- Tự đăng xuất khi không hoạt động: server quyết định theo thời gian chờ của vai trò; `session-provider.tsx`
  gửi `{"type":"activity"}` qua socket (tối đa 1 lần/15 giây) khi người dùng thao tác chuột, phím, cuộn, chạm.
  Admin chỉnh số phút cho sinh viên / giảng viên ở `/admin/settings/`
  (`src/app/admin/settings/_components/idle-timeout-panel.tsx`). Sinh viên đang làm bài kiểm tra
  (bài đang mở, chưa nộp) và còn mở trang thì server giữ phiên, không tự đăng xuất.

## CSS (Tailwind CSS v4)

- Tailwind v4 build sẵn qua PostCSS (`postcss.config.mjs`), không CDN, chạy offline. `src/app/globals.css`
  khai báo thứ tự layer, bộ token (`@theme`: màu `canvas`, `ink`, `line`, `primary-*`, `chart-*`, `sidebar`;
  bo góc `rounded-card` (8px) / `--radius-control` (4px); bóng `shadow-card` / `shadow-lift`; chuyển động
  `animate-fade-in`, `animate-grow-x`…) và vài hiệu ứng chung (trang vào hiện mờ dần, hộp thoại phóng nhẹ).
- Giao diện viết bằng class Tailwind trong JSX. Phần dùng lại ở nhiều trang là class viết bằng `@apply`:
  - `ui.css` (layer `ui`): `button` (`primary`, `danger`, `small`), `icon-button`, `input`, `select`,
    `form-field`, `panel`, `panel-title`, `page-heading`, `tabs`, `toolbar`, `segmented`, `admin-table`,
    `badge`, `notice`, `empty-state`, `info-list`, danh sách tệp (`file-list`, `file-row`), `pick-list`,
    câu hỏi trắc nghiệm (`question-card`, `option-letter`), `time-left`, `grade-box`, màu bìa `cover-*`…
  - `code.css`, `schedule.css`, `exam.css` (layer `features`): các cụm nhiều quy tắc lồng nhau (bài lập trình,
    lịch học, thi có giám sát), giữ tên class cũ.
  - Bộ class cho JSX: `src/components/ui/tile.ts` (thẻ khóa học / ngân hàng câu hỏi), `course-items.tsx`
    (`LESSON_LIST`, `SECTION_GRID`…), `notification-row.tsx` (dòng thông báo dùng chung),
    `app/teacher/course/submissions/_components/grader.ts` (khung chấm bài).
- Thứ tự layer `theme, base, ui, features, components, utilities`: class Tailwind trong JSX luôn thắng.
  Không nạp preflight: `base.css` giữ cỡ chữ tiêu đề và kiểu danh sách mặc định; danh sách mới tự thêm
  `list-none p-0` khi cần.
- Class Tailwind cỡ chữ (`text-sm`…) kèm chiều cao dòng chuẩn; cần cỡ chữ lẻ thì dùng `text-[13px]`.
- Thành phần React dùng chung: `src/components/ui/card.tsx` (`Card`, `PageHeading`, `Skeleton`), `charts.tsx`,
  `ratio-card.tsx`, `stat-card.tsx`, `modal.tsx`. Hàm thuần của trang Tổng quan ở `src/lib/dashboard.ts`.
- Chuyển động tôn trọng cài đặt "giảm chuyển động" của hệ điều hành (`prefers-reduced-motion`).
- Không dùng AdminLTE/Bootstrap.
- Font Awesome 5 lấy từ gói npm `@fortawesome/fontawesome-free`, font Inter (`@fontsource-variable/inter`) và
  Source Sans Pro dự phòng trong `src/app/fonts/`; cả hai được `import` trong `src/app/layout.tsx` và đóng gói vào `out/`, không CDN.
- Đề PDF ở trang làm bài vẽ bằng pdf.js (`src/components/pdf-viewer.tsx`). Worker và dữ liệu font/wasm
  được `npm install` chép vào `public/vendor/pdfjs/` (`scripts/copy-pdf-worker.mjs`, đã bỏ qua trong Git);
  nếu thư mục này thiếu, chạy `node scripts/copy-pdf-worker.mjs`.
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

## Kiểm thử

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
Đã kiểm tra trình duyệt với mock API cũ + gateway; chưa xác minh trực tiếp với MySQL/Spring thật.

[Xem desktop](docs/preview-desktop.png) · [Xem mobile](docs/preview-mobile.png).
