import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PROCTOR_FORM,
  blockedShortcut,
  describeEvent,
  formatAway,
  inExamMode,
  needsAttention,
  networkEntries,
  proctorForm,
  proctorFormProblem,
  proctorRequest,
  summarize,
} from '../src/lib/proctor.ts';
import type { BoardRow, StudentProctor } from '../src/lib/proctor.ts';
import type { StudentAssessment } from '../src/lib/teaching.ts';

const proctor: StudentProctor = {
  status: 'active',
  violations: 0,
  maxViolations: 5,
  accessCode: false,
  fullscreen: true,
  networkRestricted: false,
  networkAllowed: true,
  lockReason: null,
  startedAt: null,
  canFinish: false,
};

function page(patch: {
  status?: 'upcoming' | 'open' | 'closed';
  answerMode?: 0 | 1 | 2;
  editable?: boolean;
  proctor?: StudentProctor | null;
}): StudentAssessment {
  return {
    course: { id: 'c', code: 'INT1', title: 'Môn' },
    assessment: {
      id: 'a',
      type: 2,
      title: 'Giữa kỳ',
      description: null,
      paperFileId: null,
      paperFileName: null,
      opensAt: null,
      closesAt: '2026-10-27T05:00:00Z',
      status: patch.status ?? 'open',
      answerMode: patch.answerMode ?? 1,
      timeLimitMinutes: null,
      questionCount: 10,
      scoreRelease: 0,
      proctored: true,
    },
    submission: {
      status: 'in_progress',
      submittedAt: null,
      editable: patch.editable ?? true,
      files: [],
      grade: null,
    },
    serverTime: '2026-10-27T03:00:00Z',
    proctor: patch.proctor === undefined ? proctor : patch.proctor,
  };
}

test('chế độ thi chỉ khi bài có giám sát đang mở và chưa kết thúc', () => {
  assert.equal(inExamMode(page({})), true);
  assert.equal(inExamMode(page({ proctor: null })), false);
  assert.equal(inExamMode(page({ status: 'upcoming' })), false);
  assert.equal(inExamMode(page({ status: 'closed' })), false);
  assert.equal(inExamMode(page({ proctor: { ...proctor, status: 'finished' } })), false);
  // Trắc nghiệm / nộp file đã nộp thì thôi; lập trình nộp nhiều lần nên tới khi bấm kết thúc
  assert.equal(inExamMode(page({ editable: false })), false);
  assert.equal(inExamMode(page({ editable: false, answerMode: 2 })), true);
  assert.equal(inExamMode(page({ proctor: { ...proctor, status: 'none' } })), true);
});

test('phím tắt bị chặn', () => {
  const key = (
    k: string,
    mods: Partial<Record<'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey', boolean>> = {},
  ) =>
    blockedShortcut({
      key: k,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      altKey: false,
      ...mods,
    });
  assert.equal(key('F12'), 'F12');
  assert.equal(key('p', { ctrlKey: true }), 'Ctrl+P');
  assert.equal(key('s', { metaKey: true }), 'Cmd+S');
  assert.equal(key('I', { ctrlKey: true, shiftKey: true }), 'Ctrl+Shift+I');
  assert.equal(key('t', { ctrlKey: true }), 'Ctrl+T');
  // Chép / dán, tìm trong ô soạn code, gõ chữ bình thường: không chặn ở đây
  assert.equal(key('c', { ctrlKey: true }), null);
  assert.equal(key('v', { ctrlKey: true }), null);
  assert.equal(key('f', { ctrlKey: true }), null);
  assert.equal(key('p'), null);
  assert.equal(key('Enter', { ctrlKey: true }), null);
});

test('thời gian rời trang', () => {
  assert.equal(formatAway(1_400), '1 giây');
  assert.equal(formatAway(12_000), '12 giây');
  assert.equal(formatAway(125_000), '2 phút 5 giây');
  assert.equal(formatAway(120_000), '2 phút');
  assert.equal(formatAway(3_780_000), '1 giờ 3 phút');
});

test('mô tả dòng nhật ký', () => {
  assert.equal(
    describeEvent({ type: 'left_page', durationMs: 12_000, detail: 'tab' }),
    'Rời trang bài thi 12 giây (chuyển tab)',
  );
  assert.equal(
    describeEvent({ type: 'paste_blocked', durationMs: null, detail: '120' }),
    'Dán nội dung từ ngoài vào (bị chặn) · 120 ký tự',
  );
  assert.equal(
    describeEvent({ type: 'finished', durationMs: null, detail: 'timed_out' }),
    'Kết thúc bài thi · hết giờ làm bài',
  );
  assert.equal(
    describeEvent({ type: 'ip_changed', durationMs: null, detail: 'a → b' }),
    'Đổi địa chỉ IP · a → b',
  );
  assert.equal(describeEvent({ type: 'made_up', durationMs: null, detail: null }), 'made_up');
});

function row(patch: Partial<BoardRow>): BoardRow {
  return {
    studentId: 's',
    username: 'B23',
    fullName: 'SV',
    status: 'active',
    work: 'in_progress',
    online: true,
    awaySince: null,
    fullscreen: true,
    violations: 0,
    startedAt: null,
    lastSeenAt: null,
    finishedAt: null,
    ip: '10.0.0.1',
    ipAllowed: true,
    lockReason: null,
    lastEvent: null,
    ...patch,
  };
}

test('tóm tắt bảng giám thị và dòng cần chú ý', () => {
  const rows = [
    row({}),
    row({ online: false }),
    row({ status: 'locked', violations: 3 }),
    row({ status: 'finished', online: false, violations: 1 }),
    row({ status: 'not_started', online: false, ip: null }),
  ];
  assert.deepEqual(summarize(rows), {
    students: 5,
    notStarted: 1,
    active: 2,
    offline: 1,
    locked: 1,
    finished: 1,
    flagged: 2,
  });
  assert.equal(needsAttention(row({}), true), false);
  assert.equal(needsAttention(row({ online: false }), true), true);
  assert.equal(needsAttention(row({ awaySince: '2026-10-27T03:00:00Z' }), true), true);
  assert.equal(needsAttention(row({ fullscreen: false }), true), true);
  assert.equal(needsAttention(row({ fullscreen: false }), false), false);
  assert.equal(needsAttention(row({ ipAllowed: false }), true), true);
  assert.equal(needsAttention(row({ status: 'locked' }), true), true);
  assert.equal(needsAttention(row({ status: 'finished', online: false }), true), false);
});

test('kiểm tra form cài đặt giám sát', () => {
  const close = '2026-10-27T05:00:00Z';
  assert.equal(proctorFormProblem(DEFAULT_PROCTOR_FORM, close), null);
  assert.match(proctorFormProblem(DEFAULT_PROCTOR_FORM, null) ?? '', /giờ đóng/);
  assert.equal(proctorFormProblem({ ...DEFAULT_PROCTOR_FORM, enabled: false }, null), null);
  assert.equal(
    proctorFormProblem(
      { ...DEFAULT_PROCTOR_FORM, networks: '192.168.10.0/24, 10.0.0.5\n2001:db8::/32' },
      close,
    ),
    null,
  );
  assert.match(
    proctorFormProblem(
      { ...DEFAULT_PROCTOR_FORM, networks: 'phong-may, 300.1.1.1, 10.0.0.0/33' },
      close,
    ) ?? '',
    /phong-may, 300\.1\.1\.1, 10\.0\.0\.0\/33/,
  );
  assert.match(
    proctorFormProblem({ ...DEFAULT_PROCTOR_FORM, maxViolations: '0' }, close) ?? '',
    /từ 1 đến/,
  );
  assert.equal(proctorFormProblem({ ...DEFAULT_PROCTOR_FORM, maxViolations: '' }, close), null);
  assert.deepEqual(networkEntries(' a, b;c\nd '), ['a', 'b', 'c', 'd']);
});

test('đổi giữa form và cài đặt', () => {
  const settings = proctorRequest({ ...DEFAULT_PROCTOR_FORM, networks: '  ', maxViolations: '' });
  assert.deepEqual(settings, {
    enabled: true,
    networks: null,
    accessCode: false,
    fullscreen: true,
    maxViolations: null,
  });
  assert.deepEqual(proctorForm({ ...settings, networks: '10.0.0.0/8', maxViolations: 3 }), {
    enabled: true,
    networks: '10.0.0.0/8',
    accessCode: false,
    fullscreen: true,
    maxViolations: '3',
  });
});
