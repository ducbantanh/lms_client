/**
 * Ô nhập nhóm của học phần trong form tạo/sửa khóa học: mỗi nhóm là một khóa học riêng
 * (INT1340 nhóm 01, nhóm 02...). Bỏ trống = không chia nhóm; server từ chối trùng mã + nhóm.
 */
export function GroupField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-field">
      <span>
        Nhóm <span className="optional">(không bắt buộc)</span>
      </span>
      <input
        className="input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="01"
        maxLength={16}
      />
    </label>
  );
}
