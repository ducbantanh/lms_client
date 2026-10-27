'use client';

import { MAX_VIOLATION_LIMIT, MIN_AWAY_MS, type ProctorForm } from '@/lib/proctor';

/** Các ô cài đặt giám sát bài kiểm tra (trang Tạo bài thi, trang Giám sát). */
export function ProctorSettingsFields({
  value,
  onChange,
  disabled = false,
}: {
  value: ProctorForm;
  onChange: (next: ProctorForm) => void;
  disabled?: boolean;
}) {
  const set = (patch: Partial<ProctorForm>) => onChange({ ...value, ...patch });
  return (
    <div className="proctor-fields">
      <label className="check-field">
        <input
          type="checkbox"
          checked={value.enabled}
          disabled={disabled}
          onChange={(event) => set({ enabled: event.target.checked })}
        />
        Giám sát bài thi (chống gian lận)
      </label>
      {value.enabled ? (
        <>
          <p className="admin-hint">
            Sinh viên phải vào phòng thi mới xem được đề; trong giờ thi chỉ mở được trang làm bài và
            chỉ làm trên một máy. Bạn theo dõi và khóa / mở khóa bài ở trang Giám sát của bài.
          </p>
          <label className="check-field">
            <input
              type="checkbox"
              checked={value.fullscreen}
              disabled={disabled}
              onChange={(event) => set({ fullscreen: event.target.checked })}
            />
            Bắt buộc làm bài ở chế độ toàn màn hình
          </label>
          <label className="check-field">
            <input
              type="checkbox"
              checked={value.accessCode}
              disabled={disabled}
              onChange={(event) => set({ accessCode: event.target.checked })}
            />
            Yêu cầu mã phòng thi (6 chữ số, đổi mỗi phút, chiếu ở trang Giám sát)
          </label>
          <div className="form-row">
            <label className="form-field">
              <span>
                Mạng được vào thi <span className="optional">(IP hoặc dải CIDR)</span>
              </span>
              <textarea
                className="input mono"
                rows={2}
                value={value.networks}
                disabled={disabled}
                maxLength={500}
                placeholder="vd. 192.168.10.0/24, 10.0.0.5 · để trống: mọi mạng"
                onChange={(event) => set({ networks: event.target.value })}
              />
            </label>
            <label className="form-field">
              <span>
                Khóa bài khi vi phạm <span className="optional">(lần)</span>
              </span>
              <input
                className="input"
                type="number"
                min={1}
                max={MAX_VIOLATION_LIMIT}
                step={1}
                value={value.maxViolations}
                disabled={disabled}
                placeholder="Không khóa, chỉ ghi lại"
                onChange={(event) => set({ maxViolations: event.target.value })}
              />
            </label>
          </div>
          <p className="admin-hint">
            Tính là vi phạm: rời trang quá {MIN_AWAY_MS / 1000} giây (chuyển tab, chuyển ứng dụng),
            thoát toàn màn hình, dán nội dung từ ngoài vào, nối thêm màn hình, đổi IP giữa giờ. Bài
            bị khóa thì sinh viên chờ bạn mở khóa.
          </p>
        </>
      ) : null}
    </div>
  );
}
