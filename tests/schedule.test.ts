import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addDays,
  canTakeAttendance,
  conflictLabel,
  countRoomLines,
  countScheduleLines,
  countWeekly,
  dayLabel,
  isoWeekday,
  meetingsByDay,
  movedLabel,
  periodLabel,
  periodTime,
  scheduleImportReason,
  upcomingMeetings,
  weekDays,
  weekLabel,
  weekStart,
} from '../src/lib/schedule.ts';
import type { Meeting } from '../src/lib/schedule.ts';

const meeting = (id: string, patch: Partial<Meeting> = {}): Meeting => ({
  id,
  course: { id: 'c1', code: 'INT1340 · Nhóm 01', title: 'Nhập môn', teacherName: 'GV' },
  room: { id: 'r1', name: '402-A2', building: null },
  scheduleId: 's1',
  date: '2026-10-27',
  startPeriod: 1,
  periods: 3,
  startsAt: '2026-10-27T00:00:00Z',
  endsAt: '2026-10-27T03:00:00Z',
  kind: 0,
  cancelled: false,
  originalDate: null,
  originalStartPeriod: null,
  note: null,
  teaching: false,
  attendanceSessionId: null,
  leaveDeadline: '2026-10-26T00:00:00Z',
  leave: null,
  pendingLeaves: 0,
  ...patch,
});

test('tuần bắt đầu từ thứ 2, chủ nhật thuộc tuần trước đó', () => {
  assert.equal(weekStart('2026-10-28'), '2026-10-26'); // thứ 4
  assert.equal(weekStart('2026-10-26'), '2026-10-26'); // thứ 2
  assert.equal(weekStart('2026-11-01'), '2026-10-26'); // chủ nhật
  assert.deepEqual(weekDays('2026-10-26').at(-1), '2026-11-01');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(isoWeekday('2026-11-01'), 7);
});

test('nhãn ngày, tuần và tiết', () => {
  assert.equal(dayLabel('2026-10-27'), 'Thứ 3 27/10');
  assert.equal(weekLabel('2026-10-26'), '26/10 – 01/11/2026');
  assert.equal(periodLabel(4, 1), 'tiết 4');
  assert.equal(periodLabel(1, 3), 'tiết 1–3');
  assert.equal(periodTime({ firstHour: 7, periodsPerDay: 14 }, 3, 2), '09:00 – 11:00');
});

test('đếm số buổi của lịch lặp, kể cả ngày đầu và ngày cuối', () => {
  // 01/09/2026 thứ 3 → thứ 5 đầu tiên 03/09; 17/09 cũng là thứ 5
  assert.equal(countWeekly(4, '2026-09-01', '2026-09-17'), 3);
  assert.equal(countWeekly(2, '2026-09-01', '2026-09-01'), 1);
  assert.equal(countWeekly(7, '2026-09-01', '2026-09-02'), 0);
  assert.equal(countWeekly(1, '2026-09-10', '2026-09-01'), 0);
  assert.equal(countWeekly(1, '', '2026-09-01'), 0);
});

test('nhóm buổi theo ngày, mỗi ngày theo tiết', () => {
  const grouped = meetingsByDay([
    meeting('b', { date: '2026-10-28', startPeriod: 7 }),
    meeting('a', { date: '2026-10-28', startPeriod: 1 }),
    meeting('c', { date: '2026-10-27' }),
  ]);
  assert.deepEqual([...grouped.keys()], ['2026-10-27', '2026-10-28']);
  assert.deepEqual(
    grouped.get('2026-10-28')?.map((item) => item.id),
    ['a', 'b'],
  );
});

test('điểm danh: chỉ giảng viên phụ trách, buổi chưa hủy và không sau hôm nay', () => {
  const mine = meeting('m', { teaching: true });
  assert.equal(canTakeAttendance(mine, '2026-10-27'), true);
  assert.equal(canTakeAttendance(mine, '2026-10-30'), true);
  assert.equal(canTakeAttendance(mine, '2026-10-26'), false);
  assert.equal(canTakeAttendance({ ...mine, cancelled: true }, '2026-10-27'), false);
  assert.equal(canTakeAttendance(meeting('x'), '2026-10-27'), false);
});

test('buổi sắp tới bỏ buổi đã hủy và buổi đã kết thúc, buổi đang học vẫn tính', () => {
  const now = Date.parse('2026-10-27T01:00:00Z');
  const list = upcomingMeetings(
    [
      meeting('later', { startsAt: '2026-10-28T00:00:00Z', endsAt: '2026-10-28T03:00:00Z' }),
      meeting('now'),
      meeting('done', { startsAt: '2026-10-26T00:00:00Z', endsAt: '2026-10-26T03:00:00Z' }),
      meeting('off', {
        cancelled: true,
        startsAt: '2026-10-29T00:00:00Z',
        endsAt: '2026-10-29T03:00:00Z',
      }),
    ],
    now,
  );
  assert.deepEqual(
    list.map((item) => item.id),
    ['now', 'later'],
  );
});

test('nhãn buổi đã dời và buổi trùng lịch', () => {
  assert.equal(movedLabel(meeting('m')), null);
  assert.equal(
    movedLabel(meeting('m', { originalDate: '2026-10-27', originalStartPeriod: 1 })),
    'Dời từ Thứ 3 27/10, tiết 1',
  );
  assert.equal(
    conflictLabel({
      date: '2026-10-27',
      startPeriod: 1,
      periods: 3,
      reason: 'room',
      course: { id: 'c2', code: 'INT1341', title: 'CTDL', teacherName: null },
      room: { id: 'r1', name: '402-A2', building: null },
    }),
    'Thứ 3 27/10, tiết 1–3, phòng 402-A2: INT1341 (trùng phòng)',
  );
});

test('đếm dòng phòng học bỏ dòng trống, dòng # và dòng tiêu đề đầu tiên', () => {
  assert.equal(countRoomLines(''), 0);
  assert.equal(countRoomLines('Phòng,Tòa nhà,Sức chứa\n402-A2,Nhà A2,60\n\n# ghi chú\nLab 1'), 2);
  assert.equal(countRoomLines('TÊN PHÒNG|Tòa nhà\n402-A2'), 1);
  assert.equal(countRoomLines('402-A2\nPhòng'), 2);
});

test('đếm dòng thời khóa biểu và nhãn lỗi nhập', () => {
  assert.equal(
    countScheduleLines(
      'Mã học phần,Nhóm,Thứ\nINT1340,01,2,1,3,P,07/09/2026,20/12/2026\n\n# x\nINT1339',
    ),
    2,
  );
  assert.equal(countScheduleLines('MÃ HP|Nhóm\nINT1340'), 1);
  const issue = {
    line: 3,
    label: 'INT1319',
    reason: 'CONFLICT_IN_FILE',
    otherLine: 2,
    conflicts: null,
  };
  assert.equal(scheduleImportReason(issue), 'Trùng với dòng khác trong file (dòng 2)');
  assert.equal(scheduleImportReason({ ...issue, reason: 'LẠ', otherLine: null }), 'LẠ');
});
