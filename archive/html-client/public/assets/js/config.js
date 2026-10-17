// Chỉ cấu hình public. Không đặt mật khẩu, cookie hoặc token trong file này.
// Mock server cung cấp bản riêng tại cùng URL để bật màn hình giai đoạn 2.
export const config = Object.freeze({
  apiBase: '/api/v1',
  socketPath: '/ws',
  requestTimeoutMs: 15_000,
  features: Object.freeze({ courses: false, createUser: false }),
});
