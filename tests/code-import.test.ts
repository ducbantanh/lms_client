import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildImport,
  decodeText,
  folderTitle,
  limitsFromStatement,
  planImport,
  sampleImportZip,
  testSlot,
  type ImportSource,
} from '../src/lib/code-import.ts';
import { readZip } from '../src/lib/zip.ts';

/** Thư mục giả: đường dẫn → nội dung. */
function sources(files: Record<string, string>): ImportSource[] {
  return Object.entries(files).map(([path, text]) => {
    const data = new TextEncoder().encode(text);
    return { path, size: data.length, read: async () => data };
  });
}

const readText = async (_: ImportSource, bytes: Uint8Array) => decodeText(bytes, true);

test('testSlot ghép cặp như server, thêm thư mục input/ output/', () => {
  assert.deepEqual(testSlot('bai1/tests/05.inp'), {
    dir: 'bai1/tests',
    key: 'bai1/tests/05',
    label: 'bai1/tests/05',
    input: true,
  });
  assert.equal(testSlot('bai1/output05.txt')?.input, false);
  assert.equal(testSlot('bai1/output05.txt')?.key, 'bai1/05');
  assert.equal(testSlot('Test01/BAI.OUT')?.key, 'test01/bai');
  assert.equal(testSlot('bai1/input/7.txt')?.key, 'bai1/7');
  assert.equal(testSlot('bai1/output/7.txt')?.input, false);
  assert.equal(testSlot('bai1/de.txt'), null);
  assert.equal(testSlot('bai1/main.cpp'), null);
});

test('một bài nhiều câu: tests/, kiểu Themis, input/ + output/, đề theo tên ưu tiên', () => {
  const plan = planImport(
    sources({
      'Tuan 3/01-Tong/de.md': '# Tổng',
      'Tuan 3/01-Tong/loigiai.txt': 'không phải đề',
      'Tuan 3/01-Tong/tests/1.in': '1 2',
      'Tuan 3/01-Tong/tests/1.out': '3',
      'Tuan 3/01-Tong/tests/10.in': '5 5',
      'Tuan 3/01-Tong/tests/10.out': '10',
      'Tuan 3/01-Tong/tests/2.in': '0 0',
      'Tuan 3/01-Tong/tests/2.out': '0',
      'Tuan 3/BAI2/BAI2.docx': 'docx',
      'Tuan 3/BAI2/Test01/BAI2.INP': '4',
      'Tuan 3/BAI2/Test01/BAI2.OUT': 'YES',
      'Tuan 3/BAI2/Test02/BAI2.INP': '7',
      'Tuan 3/BAI2/Test02/BAI2.OUT': 'NO',
      'Tuan 3/c3/input/a.txt': 'x',
      'Tuan 3/c3/output/a.txt': 'y',
      'Tuan 3/c3/input/b.txt': 'z',
      'Tuan 3/__MACOSX/c3/._a.txt': '',
    }),
  );
  assert.equal(plan.assessments.length, 1);
  const [assessment] = plan.assessments;
  assert.equal(assessment.title, 'Tuan 3');
  assert.deepEqual(
    assessment.problems.map((problem) => problem.dir),
    ['01-Tong', 'BAI2', 'c3'],
  );
  const [tong, bai2, c3] = assessment.problems;
  assert.deepEqual(
    tong.tests.map((item) => item.name),
    ['1', '2', '10'],
  );
  assert.equal(tong.statement?.path, '01-Tong/de.md');
  assert.deepEqual(
    bai2.tests.map((item) => item.name),
    ['Test01', 'Test02'],
  );
  assert.equal(bai2.statement?.path, 'BAI2/BAI2.docx');
  assert.equal(c3.tests.length, 1);
  assert.deepEqual(c3.issues, ['b: thiếu file output']);
});

test('nhiều thư mục bài = nhiều bài; ZIP phẳng chỉ có test = một câu', () => {
  const many = planImport(
    sources({
      'HK1/Tuan 1/bai1/1.in': '1',
      'HK1/Tuan 1/bai1/1.out': '1',
      'HK1/Tuan 1/bai2/1.in': '1',
      'HK1/Tuan 1/bai2/1.out': '1',
      'HK1/Tuan 2/bai1/de.txt': 'đề',
      'HK1/Tuan 2/bai1/1.in': '1',
      'HK1/Tuan 2/bai1/1.out': '1',
    }),
  );
  // Themis với tên thư mục test tùy ý: các thư mục cùng chứa BAI.INP là test của một câu
  const themis = planImport(
    sources({
      'BAI/a/BAI.INP': '1',
      'BAI/a/BAI.OUT': '1',
      'BAI/b/BAI.INP': '2',
      'BAI/b/BAI.OUT': '2',
    }),
  );
  assert.deepEqual(
    themis.assessments[0].problems.map((problem) => [problem.dir, problem.tests.length]),
    [['', 2]],
  );
  assert.deepEqual(
    many.assessments.map((item) => [item.title, item.problems.length]),
    [
      ['Tuan 1', 2],
      ['Tuan 2', 1],
    ],
  );
  const flat = planImport(sources({ '1.in': '1', '1.out': '2', '2.in': '3', '2.out': '4' }));
  assert.equal(flat.assessments.length, 1);
  assert.equal(flat.assessments[0].title, null);
  assert.equal(flat.assessments[0].problems[0].tests.length, 2);
});

test('buildImport: tên câu, giới hạn trong đề, test mẫu và ZIP test ẩn', async () => {
  const result = await buildImport(
    planImport(
      sources({
        'Tuan 1/02-So_chan/de.md':
          '# Số chẵn\n\nIn YES nếu n chẵn.\n\nGiới hạn thời gian: 2 giây\nBộ nhớ: 512 MB',
        'Tuan 1/02-So_chan/sample1.in': '4',
        'Tuan 1/02-So_chan/sample1.out': 'YES',
        'Tuan 1/02-So_chan/1.in': '7',
        'Tuan 1/02-So_chan/1.out': 'NO',
        'Tuan 1/02-So_chan/2.in': '8',
        'Tuan 1/02-So_chan/2.out': 'YES',
        'Tuan 1/Tong_hai_so/1.in': '1 2',
        'Tuan 1/Tong_hai_so/1.out': '3',
      }),
    ),
    readText,
  );
  assert.equal(result.tests, 4);
  const [chan, tong] = result.assessments[0].problems;
  assert.equal(chan.title, 'Số chẵn');
  assert.equal(chan.statement.startsWith('In YES'), true);
  assert.equal(chan.timeLimit, '2');
  assert.equal(chan.memoryLimit, '512');
  assert.deepEqual(
    chan.tests.map((item) => [item.name, item.sample, item.input, item.expected]),
    [['sample1', true, '4', 'YES']],
  );
  assert.deepEqual(
    chan.archiveCheck?.tests.map((item) => item.name),
    ['1', '2'],
  );
  // ZIP sinh ra đọc lại được, tên file theo quy tắc .in/.out của server
  const entries = readZip(await chan.archive!.arrayBuffer());
  assert.deepEqual(
    entries.map((entry) => entry.path),
    ['1.in', '1.out', '2.in', '2.out'],
  );
  assert.equal(new TextDecoder().decode(await entries[3].read()), 'YES');
  // Không có đề: tên lấy từ thư mục, test đầu là test mẫu, không cần ZIP
  assert.equal(tong.title, 'Tong hai so');
  assert.equal(tong.tests[0].sample, true);
  assert.equal(tong.archive, null);
  assert.deepEqual(result.warnings, ['Tong_hai_so – không có file đề, hãy nhập đề bài']);
  // Đề không phải Markdown mở đầu bằng tên câu: bỏ dòng trùng tên, lấy dòng đó (có dấu) làm tên câu
  const word = await buildImport(
    planImport(
      sources({
        'So nguyen to/de.txt': 'Số nguyên tố\nIn YES nếu n nguyên tố.',
        'So nguyen to/1.in': '7',
        'So nguyen to/1.out': 'YES',
      }),
    ),
    readText,
  );
  assert.equal(word.assessments[0].problems[0].title, 'Số nguyên tố');
  assert.equal(word.assessments[0].problems[0].statement, 'In YES nếu n nguyên tố.');
});

test('file mẫu tải về nhập lại được đúng một bài hai câu', async () => {
  const zip = await sampleImportZip();
  const entries = readZip(await zip.arrayBuffer());
  const plan = planImport(entries);
  assert.equal(plan.assessments.length, 1);
  const result = await buildImport(plan, readText);
  assert.equal(result.assessments[0].title, 'Bai tap tuan 1');
  assert.deepEqual(
    result.assessments[0].problems.map((problem) => [problem.title, problem.tests.length]),
    [
      ['Tổng hai số', 1],
      ['Số chẵn', 1],
    ],
  );
  assert.deepEqual(result.warnings, []);
});

test('folderTitle, limitsFromStatement, decodeText', () => {
  assert.equal(folderTitle('01-Tong_hai_so'), 'Tong hai so');
  assert.equal(folderTitle('BAI1'), 'BAI1');
  assert.equal(folderTitle('3. Đếm số'), 'Đếm số');
  assert.deepEqual(limitsFromStatement('Time limit: 500 ms\nMemory limit: 64 MB'), {
    timeLimit: '0,5',
    memoryLimit: '64',
  });
  assert.deepEqual(limitsFromStatement('Thời gian: 99 giây'), {
    timeLimit: null,
    memoryLimit: null,
  });
  assert.equal(decodeText(new Uint8Array([0xef, 0xbb, 0xbf, 0x61])), 'a');
  // "Đề" lưu bằng Windows-1258 (ê + dấu huyền kết hợp 0xCC)
  assert.equal(decodeText(new Uint8Array([0xd0, 0xea, 0xcc]), true).normalize('NFC'), 'Đề');
});
