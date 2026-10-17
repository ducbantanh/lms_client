# Đọc các script theo thứ tự nào?

Đây là code **Node.js chạy trên máy phát triển**, không phải component React chạy trong
trình duyệt. Vì vậy các file này không có hook như `useState` hoặc `useEffect`.

Nếu bạn đang học cách viết giao diện, có thể bắt đầu ở `app/` và `components/` trước.
Các script này phục vụ bước build, chạy thử và kết nối tới backend.

## 1. Bắt đầu với `preview.mjs`

Chạy `npm run preview` sẽ thực hiện:

```text
Kiểm tra out/index.html đã có chưa
  → Đặt thư mục giao diện là out/
  → Đặt cổng mặc định 3100
  → Chạy server.js
```

Nếu chưa có `out/index.html`, script nhắc chạy `npm run build` trước.
`import.meta.url` là địa chỉ file script hiện tại. `new URL('../out/', import.meta.url)`
tìm thư mục `out/` dựa theo vị trí script, nên không phụ thuộc thư mục của terminal.

## 2. Đọc `server.js`

Đây là “người chuyển tiếp” giữa browser và Spring Boot:

```text
Browser → localhost:3100
             ├── GET /               → static.js → out/index.html
             ├── GET /fonts/...      → static.js → file font trong out/
             ├── /api/v1/auth/login  → Spring Boot :8080 → kết quả về browser
             └── /ws                 ↔ Spring Boot :8080 (WebSocket hai chiều)
```

File chia thành năm phần có số thứ tự: cấu hình, hàm dùng chung, HTTP, WebSocket, khởi động.

| Tên trong code | Nghĩa |
|---|---|
| `browserRequest` | Yêu cầu nhận từ trình duyệt |
| `browserResponse` | Đối tượng để gateway trả kết quả cho trình duyệt |
| `backendRequest` | Yêu cầu gateway gửi tiếp tới Spring Boot |
| `backendResponse` | Phản hồi Spring Boot gửi về gateway |
| `browserSocket` / `backendSocket` | Hai đầu kết nối WebSocket |
| `pipe()` | Chuyển dữ liệu từ luồng này sang luồng kia từng phần |
| `on('...', callback)` | Đăng ký hàm sẽ chạy khi một sự kiện xảy ra |

HTTP dùng một cặp request/response. WebSocket bắt đầu bằng HTTP rồi đổi giao thức khi
backend trả mã **101**. Sau đó hai phía có thể chủ động gửi dữ liệu cho nhau.
Các handler `error`, `close`, `aborted` dọn kết nối khi có lỗi hoặc người dùng đóng trang.

## 3. Đọc `static.js`

`serveStatic()` chỉ đọc file trong thư mục giao diện được chỉ định:

1. Chấp nhận GET/HEAD.
2. Tách đường dẫn khỏi URL, loại bỏ đường dẫn không hợp lệ.
3. Kiểm tra file nằm trong thư mục được phép đọc.
4. Nếu là thư mục, tìm `index.html` bên trong.
5. Đọc file, gửi đúng `Content-Type` và nội dung về browser.

Ví dụ: CSS cần `text/css`; JavaScript cần `text/javascript`.
`HEAD` chỉ nhận header, không nhận nội dung file. `realpath()` tìm đường dẫn thực trên
ổ đĩa để không đọc nhầm file bên ngoài thông qua liên kết thư mục.

## 4. Cuối cùng là `fix-static-export.mjs`

Script này tự chạy **sau build** qua tên lệnh `postbuild` trong `package.json`.
Nó xử lý một vấn đề tên file Next.js xuất trên Windows:

```text
File đã xuất:  out/dashboard/__next.dashboard/__PAGE__.txt
Browser cần:  out/dashboard/__next.dashboard.__PAGE__.txt
```

Script tìm file `.txt` tương ứng, thêm bản sao tên đúng và giữ bản gốc.
Nếu tên đích đã có nhưng nội dung khác, nó báo lỗi thay vì ghi đè.
Các file này giúp Next.js chuyển trang; đây không phải dữ liệu bài học của sinh viên.

## Các biến cấu hình hay dùng

| Biến môi trường | Giá trị mặc định | Ý nghĩa |
|---|---|---|
| `API_TARGET` | `http://127.0.0.1:8080` | Địa chỉ Spring Boot |
| `PORT` | `3100` khi chạy preview | Cổng gateway phục vụ browser |
| `HOST` | `127.0.0.1` | Chỉ nhận kết nối trên máy hiện tại; `0.0.0.0` để nhận từ LAN |
| `CLIENT_STATIC_ROOT` | Được preview đặt thành `out/` | Thư mục file giao diện |

Trong PowerShell, đổi backend trước khi chạy:

```powershell
$env:API_TARGET = 'http://127.0.0.1:8080'
npm run preview
```

Bạn không cần chỉnh các script chỉ để sửa màu, bố cục, nút hay nội dung giao diện.
