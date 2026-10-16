# Thư viện CSS local

`adminlte.min.css` là bản AdminLTE 3.2.0 đã có trong `archive/html-client/public/vendor/adminlte/`.
Bundle này bao gồm Bootstrap 4.6.1 (xem hai comment đầu file), vì vậy không nạp thêm Bootstrap CSS.

- Giữ nguyên file vendor; mọi override đặt trong `app/globals.css`.
- Import trong `app/layout.tsx` theo thứ tự AdminLTE trước, CSS ứng dụng sau.
- Bootstrap grid, card, form, button và AdminLTE layout/info-box được dùng trực tiếp trong JSX.
- React và native dialog/details quản lý tương tác, không nạp plugin jQuery lên React DOM.
- `AdminLTE-LICENSE`, `Bootstrap-LICENSE`: giấy phép MIT đi kèm.

Font Awesome 5 có CSS/webfonts và giấy phép riêng trong `public/vendor/fontawesome/`.
Tất cả asset được phục vụ cùng origin, không phụ thuộc CDN.

