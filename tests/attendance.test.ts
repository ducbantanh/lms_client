import test from 'node:test';
import assert from 'node:assert/strict';
import {
  absentCount,
  applyCheckIn,
  checkInUrl,
  filterRows,
  qrPath,
  sharedIps,
} from '../src/lib/attendance.ts';
import type { AttendanceRow, AttendanceSessionDetail } from '../src/lib/attendance.ts';

const row = (id: string, patch: Partial<AttendanceRow> = {}): AttendanceRow => ({
  studentId: id,
  username: id.toUpperCase(),
  fullName: `Sinh viên ${id}`,
  status: null,
  method: null,
  checkedAt: null,
  ip: null,
  ...patch,
});

const detail = (rows: AttendanceRow[]): AttendanceSessionDetail => ({
  session: {
    id: 's1',
    title: 'Buổi 1',
    qrOpen: true,
    createdAt: '2026-10-23T01:00:00Z',
    present: rows.filter((r) => r.status === 0).length,
    late: rows.filter((r) => r.status === 1).length,
    excused: rows.filter((r) => r.status === 2).length,
  },
  students: rows.length,
  rows,
});

test('absentCount không âm khi sĩ số vừa giảm', () => {
  const session = detail([]).session;
  assert.equal(absentCount({ ...session, present: 3, late: 1, excused: 1 }, 10), 5);
  assert.equal(absentCount({ ...session, present: 5, late: 0, excused: 0 }, 4), 0);
});

test('applyCheckIn thay dòng và tính lại số đếm, bỏ qua sinh viên không trong danh sách', () => {
  const before = detail([row('a'), row('b', { status: 1, method: 1 })]);
  const scanned = row('a', {
    status: 0,
    method: 0,
    checkedAt: '2026-10-23T01:02:00Z',
    ip: '10.0.0.5',
  });
  const after = applyCheckIn(before, scanned);
  assert.equal(after.rows[0], scanned);
  assert.equal(after.session.present, 1);
  assert.equal(after.session.late, 1);
  assert.equal(applyCheckIn(before, row('zz', { status: 0 })), before);
});

test('filterRows lọc theo trạng thái và tìm không dấu', () => {
  const rows = [
    row('b21dccn001', { fullName: 'Nguyễn Văn Minh', status: 0 }),
    row('b21dccn002', { fullName: 'Trần Thị Hoa' }),
  ];
  assert.deepEqual(
    filterRows(rows, '', 'absent').map((r) => r.studentId),
    ['b21dccn002'],
  );
  assert.deepEqual(
    filterRows(rows, '', 'present').map((r) => r.studentId),
    ['b21dccn001'],
  );
  assert.deepEqual(
    filterRows(rows, 'nguyen van', 'all').map((r) => r.studentId),
    ['b21dccn001'],
  );
  assert.deepEqual(
    filterRows(rows, '002', 'all').map((r) => r.studentId),
    ['b21dccn002'],
  );
});

test('sharedIps chỉ báo IP trùng khi mạng không dồn mọi người về một IP', () => {
  const rows = [
    row('a', { ip: '10.0.0.5' }),
    row('b', { ip: '10.0.0.5' }),
    row('c', { ip: '10.0.0.7' }),
    row('d'),
  ];
  assert.deepEqual([...sharedIps(rows)], [['10.0.0.5', 2]]);
  assert.equal(sharedIps([row('a', { ip: '10.0.0.1' }), row('b', { ip: '10.0.0.1' })]).size, 0);
});

test('checkInUrl mã hóa token trong link của QR', () => {
  assert.equal(
    checkInUrl('http://192.168.1.10:8080', 'abc.1x.def'),
    'http://192.168.1.10:8080/attend/?t=abc.1x.def',
  );
});

test('qrPath sinh mã vuông với ba ô định vị ở góc', () => {
  const { size, path } = qrPath('http://192.168.1.10:8080/attend/?t=' + 'x'.repeat(55));
  assert.ok(size >= 21 && (size - 17) % 4 === 0, `kích thước QR hợp lệ: ${size}`);
  // Ô trên cùng bên trái và hai góc của mẫu định vị luôn đen
  assert.ok(path.startsWith('M0 0h1v1h-1z'));
  assert.ok(path.includes(`M${size - 1} 0h1v1h-1z`));
  assert.ok(path.includes(`M0 ${size - 1}h1v1h-1z`));
});
