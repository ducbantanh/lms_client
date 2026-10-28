import test from 'node:test';
import assert from 'node:assert/strict';
import { deflateRawSync } from 'node:zlib';
import {
  documentXmlToText,
  docxToText,
  pdfItemsToText,
  readZipText,
} from '../src/lib/document-text.ts';
import type { PdfTextItem } from '../src/lib/document-text.ts';

/** Zip tối giản (không tính CRC, trình đọc không kiểm tra) để thử readZipText. */
function zip(files: Record<string, string>, deflate = true): ArrayBuffer {
  const parts: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  for (const [name, text] of Object.entries(files)) {
    const nameBytes = Buffer.from(name);
    const raw = Buffer.from(text);
    const data = deflate ? deflateRawSync(raw) : raw;
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(deflate ? 8 : 0, 8);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0);
    entry.writeUInt16LE(deflate ? 8 : 0, 10);
    entry.writeUInt32LE(data.length, 20);
    entry.writeUInt32LE(raw.length, 24);
    entry.writeUInt16LE(nameBytes.length, 28);
    entry.writeUInt32LE(offset, 42);
    parts.push(local, nameBytes, data);
    central.push(entry, nameBytes);
    offset += local.length + nameBytes.length + data.length;
  }
  const directory = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(Object.keys(files).length, 8);
  end.writeUInt16LE(Object.keys(files).length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  const all = Buffer.concat([...parts, directory, end]);
  return all.buffer.slice(all.byteOffset, all.byteOffset + all.byteLength) as ArrayBuffer;
}

const NUMBERING = `<w:numbering>
  <w:abstractNum w:abstractNumId="0">
    <w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="Câu %1:"/></w:lvl>
    <w:lvl w:ilvl="1"><w:start w:val="1"/><w:numFmt w:val="upperLetter"/><w:lvlText w:val="%2."/></w:lvl>
  </w:abstractNum>
  <w:abstractNum w:abstractNumId="1">
    <w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/></w:lvl>
  </w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
  <w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>
  <w:num w:numId="3"><w:abstractNumId w:val="0"/>
    <w:lvlOverride w:ilvl="0"><w:startOverride w:val="5"/></w:lvlOverride></w:num>
</w:numbering>`;

const para = (text: string, numId?: number, ilvl = 0) =>
  `<w:p><w:pPr>${numId ? `<w:numPr><w:ilvl w:val="${ilvl}"/><w:numId w:val="${numId}"/></w:numPr>` : ''}</w:pPr><w:r><w:t xml:space="preserve">${text}</w:t></w:r></w:p>`;

const documentXml = (paragraphs: string[]) =>
  `<?xml version="1.0"?><w:document><w:body>${paragraphs.join('')}</w:body></w:document>`;

test('documentXmlToText dựng lại số thứ tự tự động của Word theo cấp', () => {
  const { text } = documentXmlToText(
    documentXml([
      para('Java chạy trên gì?', 1, 0),
      para('JVM', 1, 1),
      para('CLR', 1, 1),
      para('ĐÁP ÁN: A'),
      para('Thủ đô?', 1, 0),
      para('Hà Nội', 1, 1),
      para('Huế', 1, 1),
      para('ghi chú', 2, 0),
      para('Câu tiếp', 3, 0),
    ]),
    NUMBERING,
  );
  assert.equal(
    text,
    [
      'Câu 1: Java chạy trên gì?',
      'A. JVM',
      'B. CLR',
      'ĐÁP ÁN: A',
      'Câu 2: Thủ đô?',
      'A. Hà Nội',
      'B. Huế',
      'ghi chú',
      'Câu 5: Câu tiếp',
    ].join('\n'),
  );
});

test('documentXmlToText: tab, xuống dòng, ký tự XML, đoạn trống, đếm hình/công thức', () => {
  const result = documentXmlToText(
    documentXml([
      '<w:p><w:r><w:t>A.</w:t></w:r><w:r><w:tab/><w:t>a &lt; b &amp;&amp; c</w:t></w:r></w:p>',
      '<w:p/>',
      '<w:p><w:r><w:t>dòng 1</w:t><w:br/><w:t>dòng 2</w:t></w:r></w:p>',
      '<w:p><w:r><w:drawing><wp:inline/></w:drawing></w:r><m:oMath><m:r><m:t>x</m:t></m:r></m:oMath></w:p>',
    ]),
    null,
  );
  assert.equal(result.text, 'A. a < b && c\n\ndòng 1\ndòng 2');
  assert.equal(result.skipped, 2);
});

test('readZipText đọc file nén deflate và stored; docxToText đọc document.xml', async () => {
  const files = { 'word/document.xml': documentXml([para('Xin chào')]), 'a.txt': 'ổn' };
  assert.equal(await readZipText(zip(files), 'a.txt'), 'ổn');
  assert.equal(await readZipText(zip(files, false), 'a.txt'), 'ổn');
  assert.equal(await readZipText(zip(files), 'không-có.xml'), null);
  assert.deepEqual(await docxToText(zip(files)), { text: 'Xin chào', skipped: 0, marked: 0 });
  await assert.rejects(docxToText(zip({ 'a.txt': 'x' })), /NOT_DOCX/);
  await assert.rejects(
    readZipText(new TextEncoder().encode('không phải zip').buffer, 'a'),
    /NOT_ZIP/,
  );
});

const item = (str: string, y: number, hasEOL = false): PdfTextItem => ({
  str,
  hasEOL,
  transform: [1, 0, 0, 10, 50, y],
  height: 10,
});

test('pdfItemsToText ghép mẩu chữ theo dòng, khoảng cách lớn thành dòng trống', () => {
  const text = pdfItemsToText([
    [
      item('Câu 1: ', 800),
      item('Java?', 800, true),
      item('A. JVM', 786, true),
      item('B. CLR', 772), // không có hasEOL nhưng y khác: vẫn sang dòng
      item('Câu 2: Thủ đô?', 740, true),
      item('', 726, true),
    ],
    [item('*A. Hà Nội', 800, true)],
  ]);
  assert.equal(text, 'Câu 1: Java?\nA. JVM\nB. CLR\n\nCâu 2: Thủ đô?\n*A. Hà Nội');
});

/** Đoạn gồm các run; mỗi run là [chữ, rPr]. */
const runs = (parts: [string, string?][], numId?: number, ilvl = 0) =>
  `<w:p><w:pPr>${numId ? `<w:numPr><w:ilvl w:val="${ilvl}"/><w:numId w:val="${numId}"/></w:numPr>` : ''}</w:pPr>${parts
    .map(([text, rPr = '']) =>
      text === '\t'
        ? `<w:r>${rPr ? `<w:rPr>${rPr}</w:rPr>` : ''}<w:tab/></w:r>`
        : `<w:r>${rPr ? `<w:rPr>${rPr}</w:rPr>` : ''}<w:t xml:space="preserve">${text}</w:t></w:r>`,
    )
    .join('')}</w:p>`;

const BOLD = '<w:b/>';
const RED = '<w:color w:val="FF0000"/>';

test('documentXmlToText đánh dấu * đáp án in đậm, gạch chân, chữ màu, highlight, character style', () => {
  const styles = `<w:styles><w:style w:type="character" w:styleId="Strong"><w:name w:val="Strong"/>
    <w:rPr><w:b/><w:bCs/></w:rPr></w:style></w:styles>`;
  const result = documentXmlToText(
    documentXml([
      runs([['Câu 1: In đậm?']]),
      runs([['A. Sai']]),
      runs([
        ['B. ', BOLD],
        ['Đúng', BOLD],
      ]),
      runs([['Câu 2: Gạch chân và chữ đỏ (chọn nhiều)?']]),
      runs([['A. Một', '<w:u w:val="single"/>']]),
      runs([['B. Hai']]),
      runs([['C. Ba', RED]]),
      runs([['Câu 3: Highlight và style Strong?']]),
      runs([['A. x', '<w:highlight w:val="yellow"/>']]),
      runs([['B. y']]),
      runs([['C. z', '<w:rStyle w:val="Strong"/>']]),
    ]),
    null,
    styles,
  );
  assert.equal(
    result.text,
    [
      'Câu 1: In đậm?',
      'A. Sai',
      '*B. Đúng',
      'Câu 2: Gạch chân và chữ đỏ (chọn nhiều)?',
      '*A. Một',
      'B. Hai',
      '*C. Ba',
      'Câu 3: Highlight và style Strong?',
      '*A. x',
      'B. y',
      '*C. z',
    ].join('\n'),
  );
  assert.equal(result.marked, 5);
});

test('documentXmlToText không đánh dấu khi chỉ in đậm nhãn, một phần chữ, mọi đáp án, hay chữ đen', () => {
  const result = documentXmlToText(
    documentXml([
      runs([['Câu 1: Chỉ in đậm nhãn']]),
      runs([['A. ', BOLD], ['một']]),
      runs([['B. hai']]),
      runs([['Câu 2: Một phần chữ']]),
      runs([['A. rất ', BOLD], ['đúng']]),
      runs([['B. sai']]),
      runs([['Câu 3: Cả đề tô màu']]),
      runs([['A. x', RED]]),
      runs([['B. y', RED]]),
      runs([['Câu 4: Chữ đen đặt màu rõ ràng, gạch chân tắt']]),
      runs([['A. x', '<w:color w:val="000000"/><w:u w:val="none"/><w:b w:val="0"/>']]),
      runs([['B. y']]),
    ]),
    null,
  );
  assert.equal(result.marked, 0);
  assert.ok(!result.text.includes('*'));
});

test('documentXmlToText: đáp án đánh số tự động in đậm, và nhiều đáp án cùng dòng cách nhau bằng tab', () => {
  const result = documentXmlToText(
    documentXml([
      runs([['Java chạy trên gì?']], 1, 0),
      runs([['JVM', BOLD]], 1, 1),
      runs([['CLR']], 1, 1),
      runs([['Câu 2: 1 + 1 = ?']]),
      runs([['A. 1'], ['\t'], ['B. 2', RED], ['\t'], ['C. 3'], ['\t'], ['D. 4']]),
      runs([['Kết quả:'], ['\t'], ['đúng']]),
    ]),
    NUMBERING,
  );
  assert.equal(
    result.text,
    [
      'Câu 1: Java chạy trên gì?',
      '*A. JVM',
      'B. CLR',
      'Câu 2: 1 + 1 = ?',
      'A. 1',
      '*B. 2',
      'C. 3',
      'D. 4',
      'Kết quả: đúng',
    ].join('\n'),
  );
  assert.equal(result.marked, 2);
});
