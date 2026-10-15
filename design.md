# LAN LMS: Thiết kế giao diện

Tài liệu này mô tả giao diện mục tiêu cho `lms-client`: hệ màu, chữ, thành phần dùng chung và thiết kế cho **từng trang trong `public/`**. Mọi đề xuất đều làm được trên nền hiện có (AdminLTE 3 + Bootstrap 4, HTML/JS thuần, không build, không CDN). Không cần viết lại trang, chỉ cần thêm một lớp CSS và vài tiện ích JS nhỏ.

---

## 0. Ý tưởng chủ đạo: "Phòng máy đang sống"

Hệ thống chạy trong **mạng LAN của phòng máy**. Đây là điểm khác biệt lớn nhất so với một LMS thông thường, nên giao diện kể đúng câu chuyện đó:

| Ý tưởng | Thể hiện trên giao diện |
|---|---|
| **Mạng lưới** | Họa tiết lưới chấm (dot-grid) và hình topo mạng (phát triển từ `favicon.svg`) xuất hiện ở trang đăng nhập, ảnh bìa khóa học, phần đầu trang. |
| **Tín hiệu realtime** | Trạng thái WebSocket là một "nhịp đập": chấm xanh phát sóng khi kết nối, vàng nhấp nháy khi đang nối lại, xám khi mất kết nối. Dữ liệu realtime (online, thông báo, đề mở) luôn có chuyển động nhẹ khi xuất hiện. |
| **Lớp học thật** | Có những tính năng phục vụ đúng ngữ cảnh phòng máy: **chiếu mã tham gia lên máy chiếu**, **đồng hồ đếm ngược tới giờ mở đề**, danh sách online cập nhật tức thì. |

**Ba nguyên tắc:**

1. **Đơn giản là mặc định, điểm nhấn là có chủ đích.** Mỗi trang có đúng **một khoảnh khắc ấn tượng** (bảng dưới mục 6), phần còn lại tối giản và dễ đọc.
2. **Màu mang ý nghĩa.** Xanh lá chỉ dùng cho "online / đang mở", đỏ cho "thi / nguy hiểm", vàng cho "chú ý / chờ". Không dùng màu chỉ để trang trí.
3. **Nhanh trên máy yếu.** Phòng máy thường có cấu hình thấp: chỉ animate `transform` và `opacity`, không dùng `backdrop-filter`, không có ảnh bitmap lớn, tôn trọng `prefers-reduced-motion`.

---

## 1. Ràng buộc kỹ thuật (bắt buộc giữ)

- **Offline 100%.** Không CDN, không Google Fonts. Font, icon, minh họa đều nằm trong `public/vendor/` hoặc là SVG/CSS viết tay.
- **Giữ nguyên `id` và class mà JS đang dùng** (`#app-navbar`, `#app-sidebar`, `#ws-status`, `#course-list`, `#online-body`, `#feed`, `#sections`, `#assessments`, `#key-box`…). Giao diện mới chỉ thêm class, không đổi tên.
- **Tương thích CSP:** không script inline, không `onclick=""`, **không chèn `style="..."` qua chuỗi HTML**. Màu động (ví dụ màu khóa học) dùng class `.hue-0` … `.hue-7` hoặc `data-*`. Gán `el.style.x` trong JS vẫn được.
- **HTTP trong LAN không phải secure context:** `navigator.clipboard`, Notification API, Service Worker có thể không chạy khi truy cập qua `http://192.168.x.x`. Nút "Sao chép" phải có phương án dự phòng `document.execCommand('copy')`. Fullscreen API vẫn chạy bình thường.
- **Không dùng class `small` cho icon** (README mục 4.8). Chấm trạng thái dùng `.status-dot`.
- Mọi dữ liệu từ server vẫn phải qua `esc()` kể cả trong các component mới.

---

## 2. Design tokens

Toàn bộ token khai báo bằng CSS custom properties ở **đầu `app.css`**. Các phần ghi đè AdminLTE bên dưới chỉ được dùng token, không viết mã màu trực tiếp.

### 2.1 Màu

```css
:root {
  /* Mực: nền sidebar, panel thương hiệu, chữ đậm */
  --ink-950: #0A1222;
  --ink-900: #0F1A2E;
  --ink-800: #17233B;
  --ink-700: #22304D;

  /* Màu chính: xanh coban */
  --primary-50:  #EEF3FF;
  --primary-100: #DCE6FF;
  --primary-300: #8FAEFF;
  --primary-500: #3B6BF0;
  --primary-600: #2457E6;   /* nút, link, tab đang chọn */
  --primary-700: #1B44B8;   /* hover / active */

  /* Màu ngữ nghĩa: chỉ dùng đúng ý nghĩa */
  --signal-500: #0FA968;  --signal-50: #E3F7EE;   /* online, đang mở, thành công */
  --warn-500:   #E8930C;  --warn-50:   #FFF4E0;   /* chờ, đang kết nối, MK mặc định */
  --danger-500: #E03E52;  --danger-50: #FDECEE;   /* thi, khóa, xóa, lỗi */
  --info-500:   #0E9AA7;  --info-50:   #E2F6F7;   /* luyện tập, thông tin */

  /* Trung tính */
  --bg:          #F4F6FB;  /* nền content-wrapper */
  --surface:     #FFFFFF;  /* card */
  --surface-2:   #F8FAFD;  /* hàng hover, vùng phụ */
  --border:      #E3E8F1;
  --border-strong: #CBD3E1;
  --text:        #18213A;
  --text-muted:  #5F6B85;
  --text-subtle: #8C96AD;
}
```

**Bảng màu khóa học (8 sắc).** Mỗi khóa học có một màu cố định, tính từ **mã học phần** (`INT1340` lúc nào cũng ra cùng một màu, ở cả trang giảng viên lẫn sinh viên). Nhờ vậy các danh sách trông sinh động mà vẫn nhất quán.

| Class | Màu | Tên |
|---|---|---|
| `.hue-0` | `#2457E6` | Coban |
| `.hue-1` | `#0E9AA7` | Mòng két |
| `.hue-2` | `#7A4FE0` | Tím |
| `.hue-3` | `#E5624A` | San hô |
| `.hue-4` | `#D9900A` | Hổ phách |
| `.hue-5` | `#2E9E5B` | Lá |
| `.hue-6` | `#D2457E` | Hồng sen |
| `.hue-7` | `#4A5878` | Đá phiến |

```css
.hue-0 { --hue: #2457E6; --hue-soft: #EEF3FF; }
.hue-1 { --hue: #0E9AA7; --hue-soft: #E2F6F7; }
/* … tới .hue-7 */
```

**Màu theo loại bài kiểm tra** (dùng trong `typeBadge()`):

| Loại | Màu | Lý do |
|---|---|---|
| Luyện tập (0) | `--info-500` | nhẹ nhàng, không áp lực |
| Thực hành (1) | `--primary-600` | công việc chính |
| Thi (2) | `--danger-500` | nghiêm túc, phải chú ý |

### 2.2 Chữ

- **Font chính:** Source Sans Pro (đã có sẵn, có tiếng Việt). Đủ dùng.
- **Font hiển thị (tùy chọn, nên có):** **Be Vietnam Pro** 600/700, giấy phép OFL, thiết kế riêng cho tiếng Việt nên dấu đẹp ở cỡ lớn. Tải file `woff2` (subset latin + vietnamese) về `public/vendor/fonts/` và khai báo `@font-face` như `source-sans-pro.css`. Chỉ dùng cho tiêu đề H1/H2, số thống kê và logo. Nếu không thêm font này thì để fallback về Source Sans Pro 700.
- **Font mono:** stack hệ thống hiện tại, dùng cho MSSV, mã học phần, mã tham gia.

| Token | Cỡ / dòng | Độ đậm | Dùng cho |
|---|---|---|---|
| `--fs-display` | 40 / 48 | 700 | Tiêu đề lớn trang đăng nhập, mã tham gia khi chiếu |
| `--fs-h1` | 28 / 36 | 700 | Tiêu đề trang (`.content-header h1`) |
| `--fs-h2` | 20 / 28 | 600 | Tiêu đề card lớn, tên khóa học trên card |
| `--fs-h3` | 16 / 24 | 600 | `.card-title` |
| `--fs-body` | 15 / 24 | 400 | Nội dung |
| `--fs-sm` | 13 / 20 | 400 | Chú thích, metadata |
| `--fs-overline` | 11 / 16 | 700, `letter-spacing: .08em`, IN HOA | Nhãn nhóm ("ĐANG ONLINE", "TUẦN 3") |

Số thống kê, đồng hồ đếm ngược và cột số trong bảng dùng `font-variant-numeric: tabular-nums` để không bị nhảy khi giá trị đổi.

### 2.3 Khoảng cách, bo góc, đổ bóng

```css
:root {
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px;
  --sp-5: 24px; --sp-6: 32px; --sp-7: 48px;

  --r-sm: 6px;     /* input, badge, nút nhỏ */
  --r-md: 10px;    /* nút, item */
  --r-lg: 14px;    /* card */
  --r-xl: 20px;    /* panel lớn, modal */
  --r-pill: 999px;

  --shadow-sm: 0 1px 2px rgba(15, 26, 46, .06);
  --shadow-md: 0 4px 14px rgba(15, 26, 46, .08);
  --shadow-lg: 0 18px 40px rgba(15, 26, 46, .16);
  --ring: 0 0 0 3px rgba(36, 87, 230, .25);   /* focus */
}
```

Card mặc định: nền `--surface`, viền `1px solid var(--border)`, `--shadow-sm`, bo `--r-lg`. **Bỏ** bóng mặc định của AdminLTE (`box-shadow: 0 0 1px …, 0 1px 3px …`) và thanh màu `card-outline` dày 3px, thay bằng viền mảnh, trông hiện đại và gọn hơn.

### 2.4 Chuyển động

```css
:root {
  --ease-out: cubic-bezier(.2, .8, .2, 1);
  --t-fast: 120ms;   /* hover, đổi màu */
  --t-base: 200ms;   /* mở dropdown, chuyển tab */
  --t-slow: 320ms;   /* xuất hiện card, modal */
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}
```

---

## 3. Nhận diện và họa tiết

### 3.1 Logo

Logo hiện tại là icon `fa-network-wired` cộng chữ "LAN LMS". Đề xuất thay bằng **dấu hiệu SVG lấy từ `favicon.svg`** (một nút trên nối xuống hai nút dưới), đặt trong ô vuông bo `--r-sm`, nền `--primary-600`. Chữ: **LAN** đậm 700 và **LMS** nhẹ 400, giãn chữ `.02em`.

- Sidebar: ô logo 28px và chữ trắng.
- Top-nav sinh viên: ô logo 28px và chữ `--text`.
- Trang đăng nhập: ô logo 48px, có vòng sóng tỏa ra một lần khi tải trang.

### 3.2 Họa tiết lưới chấm

```css
.bg-dotgrid {
  background-image: radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.5px);
  background-size: 18px 18px;
}
.bg-dotgrid-dark { /* trên nền sáng */
  background-image: radial-gradient(rgba(15,26,46,.08) 1px, transparent 1.5px);
  background-size: 18px 18px;
}
```

Dùng ở panel thương hiệu (đăng nhập), ảnh bìa khóa học, hero đầu trang khóa học. **Không** dùng trên vùng có nhiều chữ.

### 3.3 Hình topo mạng

Là một SVG viết tay, đặt inline trong `login.html` và `change-password.html` (SVG inline không vi phạm CSP). Hình gồm 7 đến 9 nút tròn nối bằng đường thẳng. Có 2 đến 3 "gói tin" (chấm sáng) chạy dọc các đường bằng `stroke-dasharray` + `stroke-dashoffset` animation, chu kỳ 3 đến 6 giây và lệch pha nhau. Nút trung tâm có vòng sóng nhịp đập. Đây là **điểm nhấn thị giác chính của cả hệ thống**.

### 3.4 Icon

Giữ Font Awesome 5 (Solid). Quy tắc:
- Icon trong nút: 14px, cách chữ `--sp-2`.
- Icon "ô màu" (icon tile): icon 18px nằm giữa ô vuông 40px bo `--r-md`, nền màu `-50`, icon màu `-500`. Dùng cho thẻ thống kê, đầu card, empty state.
- Icon loại file giữ mapping trong `course-common.js` (PDF đỏ, Word xanh, PowerPoint cam) nhưng hiển thị dạng **icon tile 36px** để danh sách tài liệu dễ quét.

### 3.5 Avatar chữ cái

Hệ thống không có ảnh đại diện, nên dùng **avatar chữ cái**:
- Chữ: chữ đầu của **tên** (từ cuối của họ tên), ví dụ "Nguyễn Văn **A**nh" thành **A**. Với tên tiếng Việt, cách này dễ nhận ra hơn lấy chữ đầu của họ.
- Màu nền: `--hue-soft`, chữ `--hue`, chọn theo hash của `username` vào `.hue-0…7`.
- Cỡ 32px trong bảng, 64px trong profile. Có thể gắn chấm online 10px ở góc phải dưới, viền trắng 2px.

---

## 4. Thành phần dùng chung

### 4.1 Nút

| Loại | Kiểu |
|---|---|
| `.btn-primary` | nền `--primary-600`, chữ trắng, bo `--r-md`, cao 38px (sm: 32px). Hover `--primary-700` + nâng `translateY(-1px)`. Active trả về 0. |
| `.btn-outline-*` / `.btn-default` | nền trắng, viền `--border-strong`, chữ `--text`. Hover nền `--surface-2`. |
| Nút nguy hiểm (`.btn-outline-danger`) | ở trạng thái thường giống nút phụ, **chỉ đổi sang đỏ khi hover**, để bảng không bị "đỏ rực". |
| `.btn-xs` icon trong bảng | 28×28px, chỉ icon, có `title` và `aria-label`. |
| Trạng thái bận (`withBusy`) | giữ spinner hiện có, thêm `opacity: .85` và con trỏ `progress`. |

Focus ở mọi nút và input dùng `box-shadow: var(--ring)`. Không xóa outline nếu không có focus ring thay thế.

### 4.2 Viên trạng thái realtime (`#ws-status`)

Thay badge chữ bằng **viên (pill) có chấm phát sóng**:

```
 ( ● Realtime )      open        chấm --signal-500, vòng sóng lan ra lặp 2s
 ( ● Đang kết nối )  connecting  chấm --warn-500 nhấp nháy opacity
 ( ○ Mất kết nối )   closed      chấm xám, chữ --text-muted
 ( ● Đã đăng xuất )  revoked     chấm --danger-500
```

```css
.live-pill { display:inline-flex; align-items:center; gap:6px; padding:3px 10px 3px 8px;
  border-radius:var(--r-pill); font-size:12px; font-weight:600; background:var(--surface-2); }
.live-pill .dot { width:8px; height:8px; border-radius:50%; position:relative; background:currentColor; }
.live-pill.is-open { color:var(--signal-500); background:var(--signal-50); }
.live-pill.is-open .dot::after { content:''; position:absolute; inset:0; border-radius:50%;
  background:currentColor; animation:ping 2s var(--ease-out) infinite; }
@keyframes ping { from { transform:scale(1); opacity:.6 } to { transform:scale(2.8); opacity:0 } }
```

JS cần sửa: `WS_STATUS` trong `admin-layout.js` và `WS` trong `student-dashboard.js`, `student-course.js` trả về class `live-pill is-<status>` thay cho `badge-*`. Nên gom thành một hàm `renderWsStatus(el, status)` trong `ui.js` để ba file dùng chung.

### 4.3 Badge và tag

- Badge trạng thái dạng **mềm**: nền `-50`, chữ `-500`, bo `--r-pill`, cỡ 12px, đậm 600. Ví dụ "Hoạt động" (signal), "Bị khóa" (danger), "MK mặc định" (warn).
- `badge-light text-mono` cho mã (mã học phần, MSSV) đổi thành **tag mã**: nền `--surface-2`, viền `--border`, font mono, bo `--r-sm`.
- `statusBadge()` của bài kiểm tra:
  - Chưa mở: xám, kèm icon khóa, kèm **đếm ngược** (mục 4.9).
  - Đang mở: xanh, có chấm phát sóng như live-pill.
  - Đã đóng: xám đậm, gạch mờ.

### 4.4 Card

- Header card không có nền xám. Tiêu đề `--fs-h3` đứng cạnh icon tile 28px. Viền dưới header chỉ xuất hiện khi body là bảng hoặc danh sách.
- `card-outline card-primary` (thanh màu trên) **chỉ giữ cho card cần nhận diện màu** (khóa học dùng `--hue`). Các card khác dùng viền mảnh trung tính.
- Card bấm được (`a.course-card`) khi hover: nâng 3px, `--shadow-md`, viền đổi sang `--hue`. Đã có sẵn một phần trong `app.css`.

### 4.5 Bảng

- Header bảng: chữ `--fs-overline` IN HOA màu `--text-subtle`, nền trong suốt, viền dưới `--border`.
- Hàng cao 52px (`table-sm`: 40px). Bỏ `table-striped`, chỉ giữ hover `--surface-2`.
- Cột đầu có **avatar và tên hai dòng** (username mono ở trên, họ tên mờ ở dưới). Cách này thay luôn kiểu "ẩn cột trên mobile" đang làm bằng `d-md-none`.
- Nút thao tác: trên desktop **chỉ hiện rõ khi hover hàng** (`opacity .35` lên 1). Trên thiết bị cảm ứng (`@media (hover: none)`) luôn hiện.
- Hàng mới chèn (realtime) có hiệu ứng `flash`: nền `--primary-50` mờ dần trong 1,2 giây.

### 4.6 Form

- Input cao 40px, bo `--r-sm`, viền `--border-strong`, focus viền `--primary-500` cộng `--ring`.
- Label 13px, đậm 600, màu `--text`. Gợi ý (`form-text`) 12px màu `--text-muted`.
- Lỗi: thay `alert-danger` to bản bằng **callout lỗi**: viền trái 3px `--danger-500`, nền `--danger-50`, icon. Khi xuất hiện, form **rung nhẹ** một lần (`translateX ±4px`, 300ms).
- `custom-radio` lựa chọn có mô tả (định dạng khóa học, loại bài kiểm tra, vai trò) hiển thị dạng **radio card** (mục 4.10).

### 4.7 Empty state

`.empty-state` hiện chỉ là icon xám và chữ. Nâng cấp thành:
- Một **minh họa nhỏ** bằng icon tile 56px cộng hai vòng tròn đồng tâm mờ phía sau (CSS `::before` / `::after`).
- Tiêu đề 15px đậm, mô tả 13px mờ, và **một hành động gợi ý** nếu có (ví dụ "Tạo khóa học", "Nhập mã tham gia").
- Giữ class `.empty-state` để JS hiện tại không phải sửa. Chỉ cần đổi markup trong các chuỗi HTML khi muốn thêm nút.

### 4.8 Skeleton thay cho "Đang tải..."

Các ô `<td class="empty-state">Đang tải...</td>` thay bằng 3 đến 5 **hàng skeleton**: thanh xám bo tròn có hiệu ứng shimmer (gradient trượt 1,4 giây). Course list dùng 3 card skeleton. Dữ liệu tới thì nội dung **fade-in + trượt lên 6px**, các phần tử lệch nhau 30ms.

### 4.9 Đồng hồ đếm ngược

Dùng ở bài kiểm tra "Chưa mở" có `opensAt` (cả trang giảng viên và sinh viên):
- Dưới 24 giờ: `Mở sau 02:15:30`, cập nhật mỗi giây, `tabular-nums`.
- Từ 24 giờ trở lên: `Mở sau 3 ngày`, cập nhật mỗi phút.
- Dưới 5 phút: chữ đổi `--warn-500`.
- Về 0: viên chuyển sang "Đang mở" với hiệu ứng **pop** (scale .9 → 1.05 → 1). `student-course.js` đã có `scheduleNextOpen()` tự tải lại nên chỉ cần thêm phần hiển thị.

Một `setInterval` 1 giây cho cả trang là đủ, cập nhật mọi phần tử có `data-countdown="<iso>"`.

### 4.10 Radio card / segmented control

```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ ▤▤▤  Theo tuần   │ │ 🗀  Mặc định      │ │ ≡   Chỉ file      │
│ Tuần 1, Tuần 2…  │ │ Chương, Bài đọc… │ │ Không chia mục    │
└──────────────────┘ └──────────────────┘ └──────────────────┘
   ▲ đang chọn: viền --primary-600 2px, nền --primary-50, dấu ✓ góc phải
```

Vẫn là `<input type="radio">` thật, chỉ ẩn bằng `.sr-only` và style `label` đi kèm. Bàn phím và JS (`input[name="format"]:checked`) không đổi.

Segmented control (3 đến 4 lựa chọn ngắn, ví dụ loại bài kiểm tra) là một dải pill liền, mục đang chọn có nền trắng và bóng `--shadow-sm` trên nền `--surface-2`.

### 4.11 Toast

Ghi đè style toast của AdminLTE (`.toasts-top-right .toast`):
- Nền **trắng**, viền trái 4px màu ngữ nghĩa, icon tile 28px, `--shadow-lg`, bo `--r-md`, rộng 340px.
- Vào: trượt từ phải 16px và fade. Ra: fade.
- Có thanh tiến trình mảnh 2px ở đáy, chạy theo `delay` (3,5 giây hoặc 6 giây với lỗi).
- `notifications.js` giữ API cũ. Chỉ cần đổi `class: s.cls` thành `toast-soft toast-<type>`.

### 4.12 Modal xác nhận (thay `window.confirm`)

README ghi `window.confirm` là việc chưa làm. Thêm `confirmDialog({ title, message, confirmText, danger })` vào `ui.js`, trả về `Promise<boolean>`, dùng modal Bootstrap tạo động:
- Icon tile lớn ở đầu (đỏ với thao tác xóa hoặc khóa, cam với đăng xuất).
- Thao tác **không thể hoàn tác** (xóa tài khoản, xóa khóa học) bắt **gõ lại tên** (username / mã học phần) thì nút đỏ mới bật.
- Phím Enter = xác nhận chỉ khi không phải thao tác nguy hiểm. Esc = hủy.

### 4.13 Lớp phủ "Phiên đã kết thúc" (`realtime.js`)

`.session-revoked-overlay` hiện chỉ là hộp trắng. Nâng cấp:
- Nền `rgba(10,18,34,.72)`.
- Hộp `--r-xl`, icon tile đỏ 56px (`fa-user-lock` khi bị khóa, `fa-sign-out-alt` khi bị đăng xuất), tiêu đề, lý do (`revokeReason`).
- **Thanh đếm ngược 2,5 giây** chạy ngang đáy hộp, khớp với `setTimeout(goLogin, 2500)`, kèm nút "Đăng nhập lại ngay".
- Vào: hộp scale .96 → 1 kết hợp fade.

---

## 5. Khung trang (layout shell)

### 5.1 Khung quản lý: admin và giảng viên (`admin-layout.js`)

```
┌────────────┬───────────────────────────────────────────────────────┐
│ [▲] LAN LMS│ ☰  Tổng quan                     ( ● Realtime )  (A)▾ │ ← navbar trắng, viền dưới
│────────────│───────────────────────────────────────────────────────│
│ (A) admin  │                                                       │
│ Quản trị   │   nội dung trang (nền --bg)                          │
│            │                                                       │
│ ▌Tổng quan │                                                       │
│  Người dùng│                                                       │
│  Import SV │                                                       │
│  Khóa học  │                                                       │
│            │                                                       │
│            │                                                       │
│ ─────────  │                                                       │
│ ● 12 online│                                                       │ ← chân sidebar: số người online (admin)
└────────────┴───────────────────────────────────────────────────────┘
```

- **Sidebar:** nền `--ink-900` (thay `sidebar-dark-primary`), rộng 248px. Mục menu cao 40px, bo `--r-md`, cách mép 12px. Mục **đang chọn**: nền `rgba(59,107,240,.16)`, chữ trắng, **thanh sáng 3px bên trái** màu `--primary-300`. Hover: nền `rgba(255,255,255,.05)`.
- **User panel:** avatar chữ cái 36px, username và vai trò (`roleName`) bên cạnh. Bỏ khối `.info` trống trải hiện tại.
- **Nhóm menu:** thêm nhãn overline "QUẢN LÝ" / "GIẢNG DẠY" phía trên nhóm mục tương ứng. Chỉ hiện nhóm khi nhóm có ít nhất một mục được quyền xem.
- **Navbar:** cao 60px, nền trắng, viền dưới `--border`. Bên trái là nút thu gọn và **tiêu đề trang dạng breadcrumb** (lấy từ `MENU[active].label`). Bên phải là live-pill và **menu người dùng** (avatar 32px mở dropdown gồm họ tên, vai trò, "Đổi mật khẩu", "Đăng xuất"), thay cho tên trần và nút đăng xuất to hiện tại.
- **Content header:** `h1` dùng `--fs-h1`, dưới là dòng mô tả 13px mờ, nút hành động chính căn phải.
- **Footer:** giữ "LAN LMS · beta", chữ `--text-subtle`, nền trong suốt, không viền.
- **Mobile (< 992px):** sidebar trượt ra đè lên nội dung (hành vi AdminLTE), có lớp nền tối phía sau.

### 5.2 Khung sinh viên: top-nav (`layout-top-nav`)

```
┌───────────────────────────────────────────────────────────────────┐
│ [▲] LAN LMS     Trang của tôi                ( ● Online )  🔔3 (A)▾│
└───────────────────────────────────────────────────────────────────┘
```

- Navbar trắng cao 64px, container 1140px.
- Thêm **chuông thông báo** có badge đếm số thông báo chưa xem trong phiên. Bấm vào thì cuộn tới card Thông báo (ở trang chủ) hoặc mở dropdown 5 thông báo mới nhất (ở trang khóa học).
- Menu avatar giống khung quản lý.
- Mobile: ẩn chữ "LAN LMS", chỉ còn logo; live-pill chỉ còn chấm.

---

## 6. Thiết kế từng trang

Mỗi trang ghi: **file liên quan**, **bố cục**, **chi tiết**, **trạng thái** (đang tải / rỗng / lỗi) và **khoảnh khắc ấn tượng**.

| Trang | Khoảnh khắc ấn tượng |
|---|---|
| `index.html` | Logo phát sóng trong lúc chuyển hướng |
| `login.html` | Hình topo mạng có gói tin chạy |
| `change-password.html` | Thanh độ mạnh mật khẩu và checklist tự tick |
| `admin/index.html` | Danh sách online và dòng hoạt động "sống" theo realtime |
| `admin/users.html` | Avatar có chấm online cập nhật realtime ngay trong bảng |
| `admin/import.html` | Xem trước kiểm tra từng dòng trước khi gửi, số đếm chạy khi có kết quả |
| `teacher/index.html` | Lưới khóa học với ảnh bìa màu riêng theo mã học phần |
| `teacher/course.html` | **Chiếu mã tham gia toàn màn hình** lên máy chiếu |
| `student/index.html` | Lời chào theo buổi trong ngày, nhập mã tham gia có hiệu ứng mở khóa |
| `student/course.html` | Đếm ngược tới giờ mở đề, đề "bật mở" đúng giờ |

---

### 6.1 `index.html`: chuyển hướng

**File:** `index.html`, `index-redirect.js`

Hiện tại trang trắng trơn trong lúc kiểm tra phiên. Đề xuất: thêm `<link rel="stylesheet" href="/assets/css/app.css">` và một khối splash:

```
                 ┌─────┐
                 │  ▲  │  ← logo 56px, 2 vòng sóng tỏa ra
                 └─────┘
                 LAN LMS
        Đang kết nối tới máy chủ trong phòng…
```

- Nền `--ink-900` có dot-grid, chữ trắng.
- Splash chỉ hiện nếu chuyển hướng mất hơn **300ms** (CSS `animation-delay: 300ms` trên opacity), để tránh nháy khi máy chủ phản hồi nhanh.
- Thẻ `<noscript>` giữ nguyên, style thành hộp thông báo giữa màn hình.

---

### 6.2 `login.html`: đăng nhập

**File:** `login.html`, `auth-pages.js` (`initLogin`)

**Desktop (≥ 992px): chia đôi màn hình**

```
┌──────────────────────────────────┬────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │                                │
│ ░ [▲] LAN LMS                  ░ │      Đăng nhập                 │
│ ░                              ░ │      Chào mừng trở lại 👋       │
│ ░        ●───────●             ░ │                                │
│ ░       ╱ ·→     ╲             ░ │   Tên đăng nhập / Mã SV        │
│ ░   ●──◉──────────●──●         ░ │   ┌──────────────────────┐ 👤  │
│ ░       ╲     ←·  ╱            ░ │   └──────────────────────┘     │
│ ░        ●───────●             ░ │   Mật khẩu                     │
│ ░                              ░ │   ┌──────────────────────┐ 👁  │
│ ░  Học tập trong mạng nội bộ.  ░ │   └──────────────────────┘     │
│ ░  Nhanh · Riêng tư ·          ░ │   ⚠ Caps Lock đang bật         │
│ ░  Không cần Internet.         ░ │                                │
│ ░                              ░ │   [        Đăng nhập        ]  │
│ ░  ▸ Tài liệu theo tuần        ░ │                                │
│ ░  ▸ Bài kiểm tra hẹn giờ      ░ │   ┌ ℹ Sinh viên lần đầu ──────┐│
│ ░  ▸ Thông báo tức thì         ░ │   │ Tên: [mã SV]              ││
│ ░                              ░ │   │ Mật khẩu: [ddmmyyyy]      ││
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   └───────────────────────────┘│
└──────────────────────────────────┴────────────────────────────────┘
       55% · nền --ink-900 + dot-grid           45% · nền trắng
```

**Panel trái (thương hiệu)**
- Nền `--ink-900` với dot-grid. Thêm một quầng sáng `radial-gradient` màu `--primary-500` ở góc trên phải, opacity .25.
- **Hình topo mạng SVG** (mục 3.3) chiếm khoảng 45% chiều cao, có gói tin chạy.
- Tagline dùng `--fs-display`, Be Vietnam Pro, trắng: "Học tập trong mạng nội bộ."
- Dòng phụ màu `--primary-300`: "Nhanh · Riêng tư · Không cần Internet."
- Ba điểm tính năng có icon tile mờ. Đây đúng là các tính năng đã có (tài liệu theo mục/tuần, bài kiểm tra hẹn giờ, realtime).

**Panel phải (form)**
- Form rộng tối đa 380px, căn giữa theo chiều dọc.
- Input có icon bên phải, giữ markup `input-group` hiện tại.
- **Nút hiện/ẩn mật khẩu** (icon mắt) thay cho icon khóa tĩnh. Cần thêm khoảng 8 dòng JS trong `auth-pages.js`.
- **Cảnh báo Caps Lock** dùng `e.getModifierState('CapsLock')` trên ô mật khẩu. Rất hữu ích vì sinh viên hay gõ sai MSSV và mật khẩu.
- Gợi ý cho sinh viên lần đầu: đổi đoạn `<p class="small">` thành **callout thông tin** nền `--info-50`, có hai "phím" mono `B21DCCN001` và `01012003` làm ví dụ.
- Lỗi đăng nhập (`#form-error`) dùng callout lỗi và hiệu ứng rung (mục 4.6). Lỗi `TOO_MANY_ATTEMPTS` dùng màu warn thay vì danger.
- Thành công: nút chuyển thành ✓ xanh trong 250ms trước khi chuyển trang. Cảm giác "được chấp nhận" như vậy rất đáng giá.

**Mobile (< 992px):** panel thương hiệu thu thành dải đầu trang cao 180px (logo, tagline ngắn, dot-grid, **không** có SVG topo). Form nằm trong card trắng đè lên mép dưới dải, `margin-top: -48px`.

**Animation khi tải trang:** panel trái fade vào. Form trượt lên 12px và fade, trễ 80ms. Logo phát một vòng sóng.

---

### 6.3 `change-password.html`: đổi mật khẩu

**File:** `change-password.html`, `auth-pages.js` (`initChangePassword`)

Dùng **cùng khung chia đôi** với đăng nhập để người dùng thấy hai trang liền mạch, nhất là sinh viên bị bắt đổi mật khẩu ngay sau lần đăng nhập đầu.

**Panel trái**
- Bắt buộc đổi (`mustChangePassword`): tiêu đề "Một bước nữa thôi", mô tả "Đặt mật khẩu riêng để bảo vệ tài khoản của bạn". Hình SVG là **ổ khóa** nằm trong mạng lưới, nút trung tâm của topo đổi thành biểu tượng khóa.
- Đổi tự nguyện: tiêu đề "Bảo mật tài khoản".

**Panel phải**

```
  Xin chào, Nguyễn Văn Anh
  ┌ ⚠ Lần đăng nhập đầu tiên: bạn cần đặt mật khẩu mới ────┐   ← #force-note
  └─────────────────────────────────────────────────────────┘
  Mật khẩu hiện tại        [••••••••          👁]
  Mật khẩu mới             [••••••••••        👁]
                           ▰▰▰▱  Khá mạnh
  Nhập lại mật khẩu mới    [••••••••••        👁]

   ✓ Tối thiểu 8 ký tự
   ✓ Khác mật khẩu hiện tại
   ○ Hai ô mật khẩu mới khớp nhau

  [            Lưu mật khẩu            ]
  ← Quay lại                                    Đăng xuất
```

- **Thanh độ mạnh** gồm 4 đoạn, tính đơn giản ở client: độ dài ≥ 8, ≥ 12, có cả chữ và số, có ký tự đặc biệt. Đoạn tô màu chuyển danger → warn → primary → signal. Chỉ để tham khảo, không chặn gửi.
- **Checklist trực tiếp**: đúng ba điều kiện mà `initChangePassword` đang kiểm tra khi submit. Mỗi dòng tự chuyển ○ thành ✓ xanh (có animation vẽ dấu tick) khi gõ thỏa. Nút "Lưu" chỉ sáng hẳn khi đủ ba ✓, nhưng vẫn bấm được để giữ logic báo lỗi hiện có.
- `#force-note` thành banner warn có icon, viền trái.
- Thành công: callout xanh "Đã đổi mật khẩu, đang vào trang của bạn…" kèm thanh tiến trình 800ms, khớp `setTimeout` hiện tại.

---

### 6.4 `admin/index.html`: tổng quan

**File:** `admin/index.html`, `admin-dashboard.js`

```
 Chào buổi chiều, Quản trị viên                         ( ● Realtime )
 Thứ Tư, 14/10/2026
┌──────────────┐┌──────────────┐┌═══════════════════┐┌──────────────┐
│ [👥] TỔNG TK  ││ [🎓] SINH VIÊN││ ● ĐANG ONLINE      ││ [🔒] BỊ KHÓA  │
│ 1.284        ││ 1.198        ││ 87                ││ 6            │
│ Xem danh sách→││ Xem →        ││ ╱╲_╱╲__╱‾ (phiên)  ││ Xem →        │
└──────────────┘└──────────────┘└═══════════════════┘└──────────────┘
┌────────────────────────────────────────────┐┌─────────────────────┐
│ ● Đang online                     87 người ││ Hoạt động realtime  │
│────────────────────────────────────────────││─────────────────────│
│ (A) B21DCCN001          Sinh viên  2 thiết bị│ │ ● anh vừa online     │
│     Nguyễn Văn Anh      · 12 phút    [⏏]  ││ │  14:02:11            │
│ (B) B21DCCN014          Sinh viên  1 thiết bị│ │ ○ binh đã offline    │
│     Trần Thị Bình       · 3 phút          ││ │  14:01:57            │
│ …                                          ││ │ …                    │
└────────────────────────────────────────────┘└─────────────────────┘
```
Nguyên tắc chung cho mọi trang: **không hiện dữ liệu mà API chưa có**. Mọi con số trong thiết kế đều lấy từ API hiện tại hoặc tính ở client.

**Header**
- Lời chào theo giờ: "Chào buổi sáng" (5–11h), "buổi trưa" (11–13h), "buổi chiều" (13–18h), "buổi tối". Kèm `fullName` và ngày dạng "Thứ Tư, 14/10/2026" (`Intl.DateTimeFormat('vi-VN', { weekday: 'long', … })`).

**Thẻ thống kê** (thay `small-box` màu đặc của AdminLTE)
- Card trắng, icon tile màu, nhãn overline, **số lớn** `--fs-display` có hiệu ứng **đếm lên** (count-up 600ms, easing out) ở lần tải đầu. Khi số thay đổi do realtime thì số **lăn** (cũ trượt lên, mới trượt vào).
- Link "Xem …" đổi thành dòng chữ nhỏ có mũi tên, cả card bấm được.
- Thẻ **Đang online** là thẻ chính, nổi bật hơn ba thẻ còn lại: nền `--ink-900` có dot-grid, số trắng, chấm phát sóng xanh. Bên dưới có **sparkline** số người online trong phiên xem trang này: lưu tối đa 60 điểm mỗi khi `presence.changed`, vẽ bằng SVG `<polyline>` do JS tạo, không cần thư viện.
- Giảng viên (không có `users.manage`) chỉ thấy thẻ online. Thẻ khi đó rộng hết hàng, kèm dòng chữ "Bạn chỉ xem được trạng thái online". Giữ logic `.stat-admin-only`.

**Bảng Đang online**
- Cột đầu: avatar chữ cái có chấm xanh, username mono, họ tên ở dòng dưới.
- "Kết nối" thành chữ "2 thiết bị" (`connections`). Từ 2 trở lên thì màu warn nhẹ vì có thể là dùng chung tài khoản.
- "Từ lúc" hiển thị **thời gian tương đối** ("12 phút trước") qua `Intl.RelativeTimeFormat('vi')`. Hover hiện giờ chính xác (`title`). Tự cập nhật mỗi 30 giây.
- Nút đăng xuất cưỡng bức: icon `fa-eject` / `fa-sign-out-alt`, chỉ hiện rõ khi hover hàng, xác nhận bằng `confirmDialog` (cam).
- Có người mới online: hàng mới **flash** nền `--signal-50`. Có người offline: hàng mờ dần rồi biến mất sau khi render lại. Muốn làm được thì so sánh danh sách `id` trước và sau `loadPresence()`.
- Rỗng: empty state "Chưa có ai online" với icon `fa-wifi` mờ.

**Dòng Hoạt động realtime (`#feed`)**
- Kiểu **timeline**: đường kẻ dọc 2px `--border` bên trái, mỗi sự kiện là một chấm (xanh = online, xám rỗng = offline).
- Mục mới **trượt xuống từ trên** và có nền flash nhẹ.
- Gom sự kiện gần nhau: cùng một người online rồi offline trong 5 giây (F5 trang) thì chỉ hiện một dòng "tải lại trang", tránh nhiễu.
- Card có chiều cao cố định bằng bảng online, cuộn bên trong, đầu và cuối có fade gradient.

---

### 6.5 `admin/users.html`: người dùng

**File:** `admin/users.html`, `admin-users.js`

```
 Người dùng                                [+ Thêm tài khoản] [⇪ Import sinh viên]
 Quản lý 1.284 tài khoản trong hệ thống
┌──────────────────────────────────────────────────────────────────────────┐
│ [🔍 Tìm theo tài khoản hoặc họ tên…       /]  [Vai trò ▾]  [Trạng thái ▾] │
│ Đang lọc:  ( Sinh viên ✕ )  ( Bị khóa ✕ )   Xóa bộ lọc                     │
│──────────────────────────────────────────────────────────────────────────│
│ TÀI KHOẢN                     VAI TRÒ     TRẠNG THÁI        ĐĂNG NHẬP      │
│ (A●) B21DCCN001                Sinh viên   (Hoạt động)       12/10 08:14  ⋯│
│      Nguyễn Văn Anh                        (MK mặc định)                  │
│ (B ) gv.tranb  (Bạn)           Giảng viên  (Hoạt động)       14/10 13:50   │
│      Trần Văn Bình                                                        │
│ (C ) B21DCCN009   ░mờ░         Sinh viên   (Bị khóa)          —        ⋯ │
│──────────────────────────────────────────────────────────────────────────│
│ Hiển thị 1–20 / 1.284                          ‹  1  [2]  3  4  5  ›     │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Thanh tìm kiếm** cao 40px, có gợi ý phím tắt `/` (nhấn `/` để focus ô tìm kiếm). Thêm đúng một listener `keydown`.
- **Chip bộ lọc**: khi `role` hoặc `status` khác rỗng, hiện chip ngay dưới thanh tìm kiếm, bấm ✕ để bỏ lọc. Người dùng vào từ thẻ thống kê (ví dụ `?status=0`) sẽ hiểu ngay vì sao danh sách ít.
- **Hàng tài khoản bị khóa**: avatar xám, chữ `--text-muted`, kèm icon khóa nhỏ.
- **Chấm online** nằm trên avatar và cập nhật realtime (logic `online` Set đã có). Khi đổi trạng thái, chấm có hiệu ứng pop.
- **Thao tác**: desktop hiện nhóm 3 nút icon khi hover (đăng xuất / khóa-mở khóa / xóa). Mobile gom vào nút `⋯` mở dropdown có chữ rõ ràng ("Đăng xuất mọi thiết bị", "Khóa tài khoản", "Xóa tài khoản" màu đỏ, tách bằng đường kẻ).
- **Xác nhận**: khóa dùng dialog cam. Xóa dùng dialog đỏ **bắt gõ lại username**. Lỗi `USER_HAS_COURSES` hiện ngay trong dialog thay vì toast, kèm link "Xem khóa học" tới `/teacher/`.
- **Phân trang**: nút tròn 32px, trang hiện tại nền `--primary-600`. Đổi trang thì cuộn mượt lên đầu bảng.
- **Đang tải**: 8 hàng skeleton. **Không có kết quả**: empty state "Không tìm thấy *“{q}”*" kèm nút "Xóa bộ lọc".

**Modal Thêm tài khoản**
- Vai trò là **radio card 2×2** có icon: Giảng viên (`fa-chalkboard-teacher`), Quản trị viên (`fa-user-shield`), Sinh viên (`fa-user-graduate`), Khách (`fa-user-clock`). Giữ `<select id="c-role">` ẩn và đồng bộ, hoặc sửa JS đọc từ radio. Cả hai đều chỉ cần ít dòng.
- Chọn **Sinh viên** thì hiện callout gợi ý "Tạo hàng loạt nhanh hơn ở trang Import →".
- Ô mật khẩu ban đầu có nút **"Tạo ngẫu nhiên"** (10 ký tự, bỏ các ký tự dễ nhầm `0O1lI`) và nút sao chép (có phương án dự phòng, xem mục 1).
- Tạo xong: modal đóng, hàng mới xuất hiện với hiệu ứng flash.

---

### 6.6 `admin/import.html`: import sinh viên

**File:** `admin/import.html`, `admin-import.js`

```
 Import sinh viên
 Tạo tài khoản hàng loạt · Mật khẩu ban đầu là ngày sinh
┌──────────────────────────────────────┐┌──────────────────────────────────┐
│ ① DANH SÁCH CẦN TẠO                  ││ ② KẾT QUẢ                        │
│ Định dạng:  mã_SV | ddmmyyyy | Họ tên ││                                  │
│ ┌─┬──────────────────────────────────┐│ ┌────────┐┌────────┐┌────────┐   │
│ │1│B21DCCN001|01012003|Nguyễn Văn A  ││ │ ✓  21 ││ │ ⧉  2   ││ │ ✕  1   │   │
│ │2│B21DCCN002|15022003|Trần Thị B    ││ │ Đã tạo ││ │ Trùng  ││ │ Lỗi    │   │
│ │3│B21DCCN0X3|3102200|Lê C       ⚠  ││ └────────┘└────────┘└────────┘   │
│ │ │                                  ││ [Đã tạo] Trùng  Lỗi              │
│ │ │   ⇣ Kéo thả file .txt vào đây    ││ B21DCCN001  Nguyễn Văn A         │
│ └─┴──────────────────────────────────┘│ …                     [⧉ Sao chép]│
│ 23 dòng · 22 hợp lệ · 1 cần xem lại    ││                                  │
│ [📄 Nạp file .txt]   [Xóa]  [⇪ Import] ││                                  │
└──────────────────────────────────────┘└──────────────────────────────────┘
```

**Vùng nhập**
- Đánh số **①** và **②** ở hai card để thấy rõ đây là quy trình hai bước.
- Hướng dẫn định dạng thành một dòng có ba "phím" mono ngăn bởi `|`, thay cho đoạn văn dài. Phần giải thích chi tiết (dòng `#`, không ghi đè tài khoản có sẵn) gói vào dòng "Xem quy tắc" có thể mở ra.
- **Textarea có cột số dòng**: một `<div>` số dòng bên trái, cuộn đồng bộ với textarea qua sự kiện `scroll`. Font mono, nền `--surface-2`.
- **Kéo thả file**: kéo file vào card thì cả card hiện viền nét đứt `--primary-500` và lớp phủ "Thả file .txt để nạp". Tái dùng luồng đọc file trong `$file` change.
- **Kiểm tra trước ở client** (không thay server, chỉ báo sớm): cạnh `#line-count` ghi thêm "22 hợp lệ · 1 cần xem lại" bằng regex đơn giản (3 phần, ngày đủ 8 chữ số). Dòng nghi lỗi có dấu ⚠ ở cột số dòng.
- Nút **Import** là nút chính, bị vô hiệu khi không có dòng dữ liệu.

**Vùng kết quả**
- Chưa có kết quả: empty state minh họa mũi tên trỏ sang trái, "Kết quả sẽ hiện ở đây".
- Có kết quả: ba **ô số lớn** (xanh / vàng / đỏ), số **đếm lên**. Ô "Đã tạo" có dấu ✓ được vẽ bằng animation stroke. Bấm ô nào thì chuyển sang tab tương ứng (giữ tab Bootstrap hiện có).
- Tab "Lỗi" hiện số dòng, nội dung gốc và lý do (`importReason`), lý do tô màu danger.
- Nút **Sao chép danh sách** ở tab Đã tạo và Lỗi, để admin dán lại sửa nhanh.

---

### 6.7 `teacher/index.html`: danh sách khóa học

**File:** `teacher/index.html`, `teacher-courses.js`

```
 Khóa học của tôi                                         [+ Tạo khóa học]
 4 khóa học · 312 sinh viên
┌───────────────────────┐┌───────────────────────┐┌───────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓││▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒││ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│▓ INT1340    ▤ tuần   ▓││▒ INT1434    🗀 mục    ▒││ ┆                   ┆ │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓││▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒││ ┆   + Khóa học mới  ┆ │
│ Lập trình mạng        ││ Cơ sở dữ liệu phân tán││ ┆                   ┆ │
│ 🎓 86 sinh viên       ││ 🎓 54 sinh viên       ││ ┆                   ┆ │
│ Tạo 02/09/2026        ││ Tạo 05/09/2026        ││ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
└───────────────────────┘└───────────────────────┘└───────────────────────┘
```

- **Ảnh bìa khóa học** cao 96px: nền `--hue` (từ hash `code`), dot-grid trắng mờ, thêm một hình topo nhỏ mờ ở góc phải (SVG dùng chung, tô `currentColor`). Mã học phần mono trắng 20px, đậm, đặt trên bìa. Góc phải là icon định dạng (tuần `fa-calendar-week`, mục `fa-layer-group`, chỉ file `fa-list`).
- Thân card: tên khóa học `--fs-h2` (tối đa 2 dòng, cắt bằng `line-clamp`), số sinh viên, ngày tạo dạng tương đối. Với admin có thêm dòng giảng viên kèm avatar nhỏ.
- Hover: card nâng lên, dot-grid trên bìa **trôi chậm** (`background-position` animate 6 giây). Hiệu ứng nhỏ nhưng làm trang "sống".
- **Card "Khóa học mới"** viền nét đứt ở cuối lưới, mở `#course-modal`. Trùng chức năng với nút header nhưng giúp lưới không cụt.
- Dòng phụ header "4 khóa học · 312 sinh viên" cộng từ `studentCount`, không cần API mới.
- Có hơn 6 khóa học thì hiện ô **lọc nhanh** theo mã hoặc tên (lọc ở client).
- Đang tải: 3 card skeleton có bìa xám. Rỗng: minh họa bảng đen (`fa-chalkboard`), "Bắt đầu khóa học đầu tiên" và nút chính.

**Modal Tạo khóa học**
- Mã học phần: chữ mono IN HOA tự động. Bên cạnh có **xem trước ảnh bìa**: khi gõ mã, một bìa mini 120×48 đổi màu theo hash ngay lập tức. Giảng viên thấy "khóa học của mình trông thế nào" ngay từ lúc tạo, một chi tiết nhỏ nhưng thú vị.
- Cách sắp xếp nội dung: **3 radio card** (mục 4.10), mỗi card có minh họa mini bằng CSS (các thanh ngang xếp chồng cho "Theo tuần", hình thư mục cho "Mặc định", danh sách cho "Chỉ file").
- Tạo xong: chuyển thẳng vào trang khóa học (logic hiện có).

---

### 6.8 `teacher/course.html`: quản lý khóa học

**File:** `teacher/course.html`, `teacher-course.js`, `course-common.js`

**Hero đầu trang** (thay `content-header`)

```
┌──────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ nền --hue + dot-grid ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ ← Khóa học                                                       [⋯]    │
│ INT1340 · Theo tuần                                                      │
│ Lập trình mạng                                                           │
│ 🎓 86 sinh viên   📄 24 tài liệu   📝 3 bài kiểm tra                      │
└──────────────────────────────────────────────────────────────────────────┘
  [📂 Nội dung]   [🎓 Sinh viên 86]   [📝 Bài kiểm tra 3]      ← tab gạch chân
```

- Hero cao khoảng 160px, góc dưới bo `--r-lg`. Chữ trắng. Tiêu đề `--fs-h1`.
- Nút **Xóa khóa học** chuyển vào menu `⋯` ("Xóa khóa học" màu đỏ, dialog bắt gõ lại mã học phần). Không đặt nút đỏ ngay đầu trang.
- **Tab**: kiểu gạch chân 2px `--hue`, số đếm là pill xám. Tab đang mở được lưu vào `location.hash` (`#students`) để F5 vẫn ở đúng tab.

**Tab Nội dung**
- **Vùng tải lên** thành dropzone ngang:
  ```
  ┌ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┐
  ┆ ⇪  Kéo thả file vào đây hoặc [chọn file]   PDF · DOCX · PPTX ≤ 20 MB ┆
  ┆    Vào mục: [Tuần 3 ▾]     ☐ Ẩn với sinh viên         [Tải lên]     ┆
  └ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┘
  ```
  Chọn file xong thì hiện "chip" tên file, icon loại và kích thước. File sai đuôi hoặc quá 20 MB (`ALLOWED_EXT`, `MAX_UPLOAD_BYTES`) bị báo ngay trên chip, chip đỏ. Trong lúc tải, thanh tiến trình chạy trong dropzone (nếu `api.js` hỗ trợ được tiến trình; nếu không thì dùng thanh chạy vô hạn).
- **Mục / tuần** hiển thị dạng **timeline dọc**: bên trái là cột số "01, 02, 03…" (overline + số lớn mờ), bên phải là card mục. Card mục:
  - Header: tên mục, số file, nút thu gọn/mở (lưu trạng thái vào `localStorage` trong `try/catch`), nút xóa mục ẩn trong `⋯`.
  - Hàng file: icon tile loại file, tên (link), kích thước, nhãn "Ẩn" (warn). File **ẩn** hiển thị nền sọc chéo rất nhạt và tên in nghiêng, để giảng viên nhận ra ngay file nào sinh viên không thấy.
  - Nút ẩn/hiện là **công tắc mắt**, đổi trạng thái thì icon có hiệu ứng "nháy mắt" (scaleY).
- Mục "Chưa phân mục" có viền nét đứt, nằm cuối.
- Thêm mục: dòng cuối timeline là một ô "+ Thêm Tuần 4" (tự gợi ý số tuần tiếp theo khi format = 1) để sẵn để gõ.

**Tab Sinh viên**
- Trái (7/12): bảng sinh viên có avatar, MSSV mono, họ tên, cách tham gia dạng tag nhỏ ("Mã" / "Dán" / "Chọn"), thời gian tương đối. Nút gỡ khỏi lớp hiện khi hover.
- Phải (5/12): card **Thêm sinh viên** với segmented control 3 lựa chọn (Dán MSSV / Chọn / Mã tham gia), giữ pill Bootstrap nhưng đổi kiểu.
  - **Dán MSSV:** textarea mono, kết quả (`paste-report`) dạng 3 dòng có icon ✓ / ⧉ / ✕.
  - **Chọn từ danh sách:** `pick-item` thành hàng checkbox lớn có avatar. Đã có trong lớp thì mờ đi, kèm tag "đã có". Nút dưới cùng hiện số đã chọn: "Thêm 5 sinh viên".
  - **Mã tham gia** (điểm nhấn):
    ```
    ┌───────────────────────────────────┐
    │  MÃ THAM GIA                      │
    │   ┌───┬───┬───┬───┬───┬───┐       │
    │   │ K │ 7 │ M │ 2 │ Q │ X │       │  ← từng ký tự trong ô riêng, mono 28px
    │   └───┴───┴───┴───┴───┴───┘       │
    │  [⧉ Sao chép]  [⛶ Chiếu lên màn hình] │
    │  [↻ Tạo mã mới]           [Tắt]   │
    └───────────────────────────────────┘
    ```
    - Mã hiển thị như **vé**: các ký tự nằm trong ô riêng, nền `--hue-soft`, viền nét đứt quanh (giữ ý `.enroll-key`). Tạo mã mới thì từng ký tự **lật** lần lượt (rotateX, lệch 40ms).
    - **"Chiếu lên màn hình"**: mở lớp phủ toàn màn hình (Fullscreen API) nền `--ink-950` có dot-grid và topo mờ. Ở giữa là tên khóa học, mã học phần, và **mã tham gia cỡ 12–16vw** trắng. Dòng hướng dẫn bên dưới: "Vào **http://\<địa chỉ máy chủ\>/** → Trang của tôi → nhập mã" (lấy `location.host`). Góc dưới hiện **số sinh viên đã tham gia, nhảy theo realtime** nếu server gửi sự kiện ghi danh; nếu chưa có sự kiện thì cứ 10 giây gọi lại API danh sách sinh viên. Esc để thoát. Đây là tính năng "đúng chất phòng máy" giúp giảng viên đỡ phải đọc mã cho cả lớp.
    - Khi tắt mã thì vé xám đi, hiện "Đang tắt: sinh viên không tự tham gia được".

**Tab Bài kiểm tra**
- Trái: danh sách card bài kiểm tra. Mỗi card có **dải màu trái 4px theo loại** (Luyện tập / Thực hành / Thi), badge loại, viên trạng thái (có đếm ngược nếu Chưa mở), tiêu đề, mô tả, link đề.
  - **Thanh thời gian**: một thanh mảnh từ `opensAt` tới `closesAt`, có chấm "bây giờ". Chưa mở thì thanh xám, đang mở thì phần đã qua tô `--signal-500`, đã đóng thì xám đậm. Không có `closesAt` thì thanh mờ dần về bên phải (không hạn).
  - Sắp xếp: Đang mở trước, Chưa mở theo giờ mở gần nhất, Đã đóng cuối (sắp ở client).
- Phải: form **Tạo bài mới**
  - Loại: **segmented control** 3 màu. Chọn "Thi" thì form đổi viền sang đỏ nhạt và hiện callout "Đề sẽ tự ẩn và chỉ mở cho sinh viên khi tới giờ".
  - Đề (PDF): select có icon PDF. Chưa có PDF nào thì hiện "Tải PDF ở tab Nội dung trước" kèm link chuyển tab.
  - Mở lúc / Đóng lúc: hai ô `datetime-local`, kèm **nút nhanh** "Ngay bây giờ", "+1 giờ", "+1 ngày", "Cuối tuần". Bên dưới là **câu tóm tắt tự sinh**: "Mở lúc 14:00 hôm nay, đóng sau 1 giờ 30 phút".

---

### 6.9 `student/index.html`: trang của tôi

**File:** `student/index.html`, `student-dashboard.js`

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░ hero --ink-900 + dot-grid + topo mờ ░░░░░░░░░░░░░░░░░ │
│ ░  Chào buổi sáng,                                     ┌──────────────┐ ░ │
│ ░  Nguyễn Văn Anh                                      │  (A●)        │ ░ │
│ ░  Thứ Tư, 14/10/2026 · ● Đang kết nối realtime        │  B21DCCN001  │ ░ │
│ ░                                                      │  Sinh viên   │ ░ │
│ ░  ┌───────────────────────────────────┬────────────┐  │ [🔑 Đổi MK]   │ ░ │
│ ░  │ 🔑  Nhập mã tham gia lớp…           │ Tham gia → │  └──────────────┘ ░ │
│ ░  └───────────────────────────────────┴────────────┘                   ░ │
└──────────────────────────────────────────────────────────────────────────┘
 KHÓA HỌC CỦA TÔI · 5
┌───────────────────────┐┌───────────────────────┐┌───────────────────────┐
│▓▓ INT1340 ▓▓▓▓▓▓▓▓▓▓▓▓▓││▒▒ INT1434 ▒▒▒▒▒▒▒▒▒▒▒▒▒││░░ BAS1203 ░░░░░░░░░░░░░│
│ Lập trình mạng        ││ CSDL phân tán         ││ Toán rời rạc          │
│ (B) Trần Văn Bình     ││ (C) Lê Thị Chi        ││ (D) Phạm Đức          │
└───────────────────────┘└───────────────────────┘└───────────────────────┘
 THÔNG BÁO                                                    ● 2 mới
┌──────────────────────────────────────────────────────────────────────────┐
│ ● Lịch thi giữa kỳ                                           14:02      │
│   Lớp INT1340 thi vào thứ Sáu tuần này…                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Hero**
- Lời chào theo buổi (như mục 6.4) cộng **họ tên** cỡ `--fs-display`. Nếu muốn cá nhân hơn thì chỉ dùng tên ("Chào buổi sáng, Anh").
- Dòng phụ: ngày và trạng thái realtime bằng chữ.
- **Ô nhập mã tham gia** là hành động chính của trang, đặt ngay trong hero: cao 52px, mono IN HOA, giãn chữ `.15em`, nút "Tham gia" liền khối.
  - Sai mã (`INVALID_ENROLL_KEY`): ô rung và viền đỏ, hiện chữ lỗi ngay dưới, không chỉ báo bằng toast.
  - Đúng mã: hiệu ứng **"mở khóa"**: icon 🔑 xoay thành ✓, rồi **card khóa học mới bay vào đầu lưới** (scale .9 → 1 cộng flash `--hue-soft`). Toast "Đã tham gia INT1340 – Lập trình mạng" giữ nguyên.
- **Card profile** thu nhỏ, nằm bên phải hero (desktop) hoặc dưới hero (mobile): avatar 64px có chấm online realtime (thay `#p-online`), MSSV mono, vai trò, nút "Đổi mật khẩu" dạng nút phụ. Giữ các `id` (`#p-name`, `#p-username`, `#p-role`, `#p-online`).

**Khóa học của tôi**
- Đổi từ `list-group` sang **lưới card** giống trang giảng viên (cùng màu bìa từ hash mã học phần) nhưng gọn hơn: bìa 64px, tên khóa học, giảng viên kèm avatar nhỏ.
- Rỗng: minh họa sách mở, "Bạn chưa tham gia khóa học nào", gợi ý "Nhập mã giảng viên cung cấp ở ô phía trên" và **mũi tên trỏ lên** ô nhập mã. Bấm vào thì focus ô và ô nảy nhẹ một lần.

**Thông báo**
- Thông báo realtime mới **trượt vào đầu danh sách**, có chấm "mới" màu `--primary-600`. Chấm mất sau khi thông báo đã hiện trong khung nhìn 3 giây (IntersectionObserver).
- Badge "● 2 mới" ở header card và số trên chuông navbar đồng bộ.
- Thời gian hiển thị tương đối ("vừa xong", "5 phút trước").
- Rỗng: "Chưa có thông báo. Thông báo từ giảng viên sẽ hiện ngay tại đây".

---

### 6.10 `student/course.html`: trong khóa học

**File:** `student/course.html`, `student-course.js`, `course-common.js`

```
┌──────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ hero --hue + dot-grid ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ ← Trang của tôi                                                          │
│ INT1340                                                                  │
│ Lập trình mạng                                                           │
│ (B) Giảng viên: Trần Văn Bình                                            │
│ Mô tả khóa học, tối đa 3 dòng… [Xem thêm]                                │
└──────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐┌─────────────────────────┐
│ 01  TUẦN 1 · Giới thiệu              3 file ▾││ 📝 BÀI KIỂM TRA          │
│     [PDF] Bai01-Gioi-thieu.pdf     1.2 MB  ↗ ││ ┃ (Thi) (● Đang mở)      │
│     [PPT] Slide-tuan-1.pptx        4.8 MB  ⇣ ││ ┃ Giữa kỳ                │
│                                              ││ ┃ ▬▬▬▬▬▬●───── còn 42:10 │
│ 02  TUẦN 2 · Socket TCP              2 file ▾││ ┃ [📄 Xem đề]             │
│     [PDF] Bai02-Socket.pdf         0.9 MB  ↗ ││─────────────────────────│
│                                              ││ ┃ (Thực hành)(🔒 Chưa mở)│
│ 03  TUẦN 3 · …                        0 file ││ ┃ Lab 3: UDP             │
│     Chưa có tài liệu                         ││ ┃ Mở sau 01:15:30        │
└──────────────────────────────────────────────┘└─────────────────────────┘
                                                     ▲ sticky khi cuộn
```

**Hero:** giống hero giảng viên nhưng không có nút quản trị. Mô tả dài thì cắt 3 dòng, có "Xem thêm".

**Tài liệu (trái)**
- Timeline mục / tuần giống bên giảng viên (số "01, 02…" lớn mờ), **thu gọn được** và nhớ trạng thái bằng `localStorage`.
- Hàng file: icon tile loại file, tên, kích thước, và **gợi ý hành động bên phải**: PDF là ↗ "Mở" (tab mới), DOCX/PPTX là ⇣ "Tải về". Dùng đúng phân biệt trong `fileLink()`.
- Cả hàng là vùng bấm (không chỉ chữ link), hover nền `--surface-2`.
- Mục rỗng thu thành một dòng mờ "Chưa có tài liệu", không chiếm card to.
- Hơn khoảng 15 file thì hiện ô **tìm tài liệu** ở đầu cột (lọc ở client).

**Bài kiểm tra (phải, sticky `top: 76px` trên desktop)**
- Mỗi bài là một khối có **dải trái màu theo loại**. Bài **Thi** đang mở được nhấn mạnh: nền `--danger-50`, viền `--danger-500`.
- **Chưa mở:** viên xám có icon khóa và **đếm ngược** (mục 4.9). Dòng "Đề sẽ hiện khi tới giờ mở" giữ nguyên nhưng thêm icon khóa.
- **Tới giờ mở** (khi `scheduleNextOpen()` tải lại): khối của bài vừa mở có hiệu ứng **"bật mở"**: icon khóa lắc rồi mở ra, viên chuyển sang "Đang mở" kèm pop, nền flash `--signal-50`, nút **"Xem đề"** trượt vào. Kèm toast "Đề *Giữa kỳ* đã mở". Đây là khoảnh khắc sinh viên chờ nhất nên cần rõ ràng và có cảm xúc. Muốn làm được thì so sánh `status` trước và sau khi `load()`.
- **Đang mở và có `closesAt`:** thanh thời gian kèm "còn 42:10". Dưới 10 phút chữ chuyển warn, dưới 2 phút chuyển danger.
- **Đã đóng:** thu gọn thành một dòng mờ, gom vào nhóm "Đã đóng (2)" có thể mở ra.
- Nút **"Xem đề"** là nút chính (đỏ với Thi, coban với loại khác), cao 40px, rộng hết khối.
- Mobile: cột bài kiểm tra **chuyển lên trên** tài liệu nếu có bài đang mở hoặc sắp mở trong 24 giờ, ngược lại thì nằm dưới.

---

## 7. Danh sách vi tương tác (micro-interactions)

| # | Tương tác | Thời lượng | Ở đâu |
|---|---|---|---|
| 1 | Chấm live phát sóng | 2s lặp | live-pill, thẻ Online, avatar online |
| 2 | Gói tin chạy trên topo | 3–6s lặp | login, change-password, chiếu mã |
| 3 | Đếm lên số thống kê | 600ms | admin dashboard, kết quả import |
| 4 | Flash hàng mới | 1,2s | bảng online, bảng user, feed, thông báo |
| 5 | Rung khi lỗi | 300ms | form login, đổi mật khẩu, nhập mã tham gia |
| 6 | Vẽ dấu ✓ | 400ms | checklist mật khẩu, import thành công, đăng nhập thành công |
| 7 | Lật ký tự | 40ms/ký tự | tạo mã tham gia mới |
| 8 | Ổ khóa mở | 500ms | đề thi tới giờ mở |
| 9 | Fade + trượt lên khi dữ liệu tới | 320ms, lệch 30ms | mọi danh sách |
| 10 | Card nâng khi hover | 120ms | card khóa học |

Tất cả tắt hoặc rút về tức thời khi `prefers-reduced-motion: reduce`. Animation lặp vô hạn (1, 2) **tạm dừng khi tab bị ẩn** (`document.visibilityState`) để đỡ tốn CPU trong phòng máy.

---

## 8. Khả năng tiếp cận

- Tương phản chữ thường ≥ 4.5:1. `--text-muted` trên `--surface` đạt khoảng 5.3:1. **Không** dùng `--text-subtle` cho chữ quan trọng.
- Màu không phải kênh duy nhất: trạng thái luôn đi kèm chữ hoặc icon (chấm online có `title` và chữ ẩn `.sr-only`).
- Đếm ngược: phần tử bao ngoài có `aria-live="off"`; chỉ khi **đổi trạng thái** (mở đề) mới thông báo qua một vùng `aria-live="polite"` riêng.
- Toast: vùng chứa `role="status"`, toast lỗi `role="alert"`.
- Modal và lớp phủ chiếu mã: giữ focus bên trong, Esc để đóng, trả focus về nút đã mở.
- Mọi nút chỉ có icon đều có `aria-label` (một số chỗ hiện mới có `title`).
- Vùng bấm tối thiểu 32×32px (nút `btn-xs` trong bảng nâng từ khoảng 24px lên 28–32px).

---

## 9. Responsive

| Breakpoint | Thay đổi chính |
|---|---|
| ≥ 1200px | Lưới khóa học 3 cột, dashboard 4 thẻ thống kê trên một hàng |
| 992–1199px | Lưới 2–3 cột, sidebar cố định |
| 768–991px | Sidebar thành off-canvas, login chuyển sang dải đầu trang, cột bài kiểm tra xuống dưới |
| < 768px | Lưới 1 cột, bảng chỉ còn cột "Tài khoản" (2 dòng) và cột thao tác `⋯`, hero thấp hơn (120px), header đặt nút hành động chính thành nút tròn nổi góc dưới phải (FAB) cho "Tạo khóa học" / "Thêm tài khoản" |

Lề hai bên trên mobile là 16px. Không để trang cuộn ngang. Bảng rộng vẫn có `table-responsive`.

---

## 10. Kế hoạch triển khai

### 10.1 Tổ chức CSS

Giữ **một file** `public/assets/css/app.css` (đúng README), chia thành các khối có tiêu đề:

```
/* 1. Tokens            :root, .hue-*                         */
/* 2. Base              body, chữ, link, focus, reduced-motion */
/* 3. AdminLTE override sidebar, navbar, card, table, form, btn, toast, modal */
/* 4. Components        live-pill, avatar, tag, radio-card, segmented,
                        skeleton, empty-state, timeline, countdown, dropzone,
                        ticket (mã tham gia), confirm, overlay           */
/* 5. Pages             body[data-page="…"] …                          */
/* 6. Motion            @keyframes ping, shake, flash, flip, draw, unlock */
```

Nếu file vượt khoảng 1.200 dòng thì tách `tokens.css` và `components.css`, nạp theo thứ tự sau `adminlte.min.css`.

Thêm `data-page` cho `<body>` của mọi trang (`dashboard`, `users`, `import`, `courses`, `course-manage`, `student-home`, `student-course`) để viết CSS riêng cho từng trang mà không đụng các trang khác.

### 10.2 Tiện ích JS cần thêm (`ui.js`, `course-common.js`)

| Hàm | Mục đích |
|---|---|
| `hueClass(str)` | hash chuỗi (mã học phần / username) thành `'hue-0'…'hue-7'` |
| `initials(fullName)` | chữ đầu của tên (từ cuối) |
| `avatar(user, { size, online })` | trả HTML avatar (đã `esc`) |
| `fmtRelative(iso)` | "5 phút trước" qua `Intl.RelativeTimeFormat('vi')` |
| `greeting(date)` | "Chào buổi sáng / trưa / chiều / tối" |
| `countUp(el, to)` | animation số |
| `startCountdowns(root)` | một interval cho mọi `[data-countdown]` |
| `confirmDialog(opts)` | thay `window.confirm` |
| `copyText(text)` | clipboard có phương án dự phòng cho HTTP |
| `renderWsStatus(el, status)` | live-pill dùng chung cho 4 trang |
| `flash(el)` | thêm class flash rồi tự gỡ |

Tất cả là hàm thuần, không gọi API, đúng vai trò hiện tại của `ui.js`.

### 10.3 Thứ tự làm (mỗi bước đều chạy được ngay)

1. **Nền tảng:** tokens, ghi đè AdminLTE (card, nút, bảng, form, sidebar, navbar), live-pill, toast. Riêng bước này đã thay đổi khoảng 60% cảm nhận về giao diện mà không đụng logic.
2. **Cửa vào:** `login.html`, `change-password.html`, `index.html` (SVG topo, chia đôi, checklist mật khẩu).
3. **Sinh viên:** `student/index.html`, `student/course.html` (hero, card khóa học, đếm ngược, đề bật mở). Đây là nhóm người dùng đông nhất.
4. **Giảng viên:** `teacher/index.html`, `teacher/course.html` (bìa màu, timeline mục, dropzone, vé mã và chiếu mã).
5. **Quản trị:** `admin/index.html`, `admin/users.html`, `admin/import.html` (thẻ thống kê, sparkline, chip lọc, confirm dialog, xem trước import).
6. **Hoàn thiện:** skeleton, empty state, kiểm tra reduced-motion, bàn phím, mobile 360px, máy yếu (DevTools CPU throttle 4×).

### 10.4 Checklist trước khi hợp nhất mỗi trang

- [ ] Không có `style="…"` hay script inline mới; mọi dữ liệu server qua `esc()`.
- [ ] Các `id` mà JS dùng còn nguyên; F5 không lỗi console.
- [ ] Chạy được khi rút dây mạng Internet (không có request ra ngoài, xem tab Network).
- [ ] Ba trạng thái **đang tải / rỗng / lỗi** đều có thiết kế.
- [ ] Rộng 360px không cuộn ngang; bấm được bằng bàn phím; focus ring hiện rõ.
- [ ] `prefers-reduced-motion` tắt được mọi animation lặp.
- [ ] Mock server (`npm run mock`) với 23 sinh viên `B21DCCN0xx`: bảng, lưới và realtime hiển thị đúng.
