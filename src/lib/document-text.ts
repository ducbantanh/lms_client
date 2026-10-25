import { PDFJS_ASSETS, loadPdfjs } from './pdfjs-assets.ts';
import { readZipText } from './zip.ts';

/**
 * Đọc chữ từ file Word (.docx) và PDF ngay trên trình duyệt, để dán vào ô "Nhập câu hỏi từ văn bản".
 * Kết quả chỉ là văn bản thuần: hình ảnh và công thức (Equation) không giữ được. Với Word, đáp án đúng
 * đánh dấu bằng in đậm/gạch chân/chữ màu/tô nền được đổi thành dấu *; PDF không có thông tin này.
 * Người dùng xem lại trong ô nhập trước khi bấm Nhập.
 */

// File .docx là một file zip (lib/zip.ts); giữ export readZipText ở đây cho nơi đang dùng.
export { readZipText };

// ---------------------------------------------------------------- DOCX

export interface ExtractedText {
  text: string;
  /** Số hình ảnh / công thức bị bỏ qua (không có dạng chữ). */
  skipped: number;
  /** Số đáp án được đánh dấu đúng (*) theo định dạng trong Word: in đậm, gạch chân, chữ màu, tô nền. */
  marked: number;
}

interface Level {
  start: number;
  format: string;
  text: string;
}

const ENTITIES: Record<string, string> = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };

function decodeXml(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] !== '#') return ENTITIES[entity] ?? match;
    return String.fromCodePoint(
      entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1)),
    );
  });
}

const attr = (xml: string, tag: string) =>
  xml.match(new RegExp(`<w:${tag}\\b[^>]*\\bw:val="([^"]*)"`))?.[1];

/** numbering.xml → numId → (cấp → định dạng số thứ tự), đã áp dụng startOverride. */
function parseNumbering(xml: string | null): Map<string, Map<number, Level>> {
  const result = new Map<string, Map<number, Level>>();
  if (!xml) return result;
  const abstracts = new Map<string, Map<number, Level>>();
  for (const [, id, body] of xml.matchAll(
    /<w:abstractNum\b[^>]*\bw:abstractNumId="(\d+)"[^>]*>([\s\S]*?)<\/w:abstractNum>/g,
  )) {
    const levels = new Map<number, Level>();
    for (const [, ilvl, level] of body.matchAll(
      /<w:lvl\b[^>]*\bw:ilvl="(\d+)"[^>]*>([\s\S]*?)<\/w:lvl>/g,
    ))
      levels.set(Number(ilvl), {
        start: Number(attr(level, 'start') ?? 1),
        format: attr(level, 'numFmt') ?? 'decimal',
        text: decodeXml(attr(level, 'lvlText') ?? ''),
      });
    abstracts.set(id, levels);
  }
  for (const [, numId, body] of xml.matchAll(
    /<w:num\b[^>]*\bw:numId="(\d+)"[^>]*>([\s\S]*?)<\/w:num>/g,
  )) {
    const levels = new Map(abstracts.get(attr(body, 'abstractNumId') ?? '') ?? []);
    for (const [, ilvl, override] of body.matchAll(
      /<w:lvlOverride\b[^>]*\bw:ilvl="(\d+)"[^>]*>([\s\S]*?)<\/w:lvlOverride>/g,
    )) {
      const start = attr(override, 'startOverride');
      const level = levels.get(Number(ilvl));
      if (start && level) levels.set(Number(ilvl), { ...level, start: Number(start) });
    }
    result.set(numId, levels);
  }
  return result;
}

function letters(value: number) {
  let text = '';
  for (let n = value; n > 0; n = Math.floor((n - 1) / 26))
    text = String.fromCharCode(65 + ((n - 1) % 26)) + text;
  return text;
}

function roman(value: number) {
  const table: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let rest = value;
  let text = '';
  for (const [n, symbol] of table) for (; rest >= n; rest -= n) text += symbol;
  return text;
}

/** Số thứ tự theo numFmt của Word; null = không có chữ (gạch đầu dòng, none). */
function formatNumber(value: number, format: string): string | null {
  switch (format) {
    case 'decimal':
      return String(value);
    case 'decimalZero':
      return String(value).padStart(2, '0');
    case 'upperLetter':
      return letters(value);
    case 'lowerLetter':
      return letters(value).toLowerCase();
    case 'upperRoman':
      return roman(value);
    case 'lowerRoman':
      return roman(value).toLowerCase();
    default:
      return null;
  }
}

/** Thuộc tính bật/tắt của Word: <w:b/>, <w:b w:val="1"/> bật; w:val="0"/"false"/"none" tắt; không có thẻ = null. */
function toggle(rPr: string, tag: string): boolean | null {
  const match = rPr.match(new RegExp(`<w:${tag}((?:\\s+[\\w:]+="[^"]*")*)\\s*/>`));
  if (!match) return null;
  const value = match[1].match(/\bw:val="([^"]*)"/)?.[1];
  return !value || !/^(0|false|off|none)$/i.test(value);
}

/** Màu thật (đỏ, xanh...), không phải đen/xám/trắng: các kênh màu chênh nhau rõ. */
function chromatic(hex: string | undefined) {
  if (!hex || !/^[0-9a-f]{6}$/i.test(hex)) return false;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return Math.max(r, g, b) - Math.min(r, g, b) > 60;
}

/**
 * Run (đoạn chữ cùng định dạng) có được nhấn mạnh như cách giáo viên đánh dấu đáp án đúng không:
 * in đậm, gạch chân, chữ màu, highlight hoặc tô nền — trực tiếp hoặc qua character style (rStyle).
 */
function emphasized(rPr: string, styles: Map<string, boolean>): boolean {
  const style = rPr.match(/<w:rStyle\b[^>]*\bw:val="([^"]*)"/)?.[1];
  const highlight = rPr.match(/<w:highlight\b[^>]*\bw:val="([^"]*)"/)?.[1];
  const fill = rPr.match(/<w:shd\b[^>]*\bw:fill="([^"]*)"/)?.[1];
  return (
    toggle(rPr, 'b') === true ||
    toggle(rPr, 'u') === true ||
    chromatic(rPr.match(/<w:color\b[^>]*\bw:val="([^"]*)"/)?.[1]) ||
    (!!highlight && highlight !== 'none') ||
    (!!fill && /^[0-9a-f]{6}$/i.test(fill) && fill.toUpperCase() !== 'FFFFFF') ||
    (!!style && (styles.get(style) ?? false))
  );
}

/** styles.xml → character style id → có nhấn mạnh (vd. style "Strong" in đậm). */
function parseCharacterStyles(xml: string | null): Map<string, boolean> {
  const result = new Map<string, boolean>();
  if (!xml) return result;
  for (const [, id, body] of xml.matchAll(
    /<w:style\b[^>]*\bw:type="character"[^>]*\bw:styleId="([^"]*)"[^>]*>([\s\S]*?)<\/w:style>/g,
  ))
    result.set(id, emphasized(body.match(/<w:rPr>([\s\S]*?)<\/w:rPr>/)?.[1] ?? '', new Map()));
  return result;
}

/** Nhãn đáp án gõ tay ở đầu dòng: "A.", "b)", "*C.". */
const OPTION_LABEL = /^\s*\*?\s*[A-Za-z][.)]\s+/;

/** Một dòng kết quả; option + emphasized dùng để đánh dấu * đáp án đúng. */
interface Line {
  text: string;
  option: boolean;
  emphasized: boolean;
}

/**
 * Chữ của đoạn (từng ký tự kèm cờ nhấn mạnh) → các dòng. Đáp án nằm cùng dòng cách nhau bằng tab
 * ("A. 1 ⇥ B. 2 ⇥ C. 3 ⇥ D. 4", cách trình bày đề quen thuộc) được tách thành mỗi đáp án một dòng.
 * Đáp án "được nhấn mạnh" khi mọi chữ sau nhãn A./B. đều in đậm/gạch chân/có màu.
 */
function paragraphLines(chars: { ch: string; emph: boolean }[], prefix: string): Line[] {
  const chunks: { ch: string; emph: boolean }[][] = [[]];
  for (const item of chars) {
    if (item.ch === '\t') chunks.push([]);
    else chunks.at(-1)!.push(item);
  }
  const text = (chunk: { ch: string }[]) => chunk.map((item) => item.ch).join('');
  const split =
    !prefix &&
    chunks.length > 1 &&
    chunks.filter((chunk) => text(chunk).trim()).every((chunk) => OPTION_LABEL.test(text(chunk)));
  const parts = split
    ? chunks.filter((chunk) => text(chunk).trim())
    : [chars.map((item) => (item.ch === '\t' ? { ...item, ch: ' ' } : item))];
  return parts.map((part) => {
    const raw = text(part);
    const line = prefix ? `${prefix} ${raw.trimStart()}` : raw;
    // Đáp án đánh số tự động ("A." là số thứ tự của Word) hoặc gõ tay nhãn A./B.
    const numberedOption = /^[A-Za-z][.)]$/.test(prefix);
    const label = numberedOption ? 0 : (raw.match(OPTION_LABEL)?.[0].length ?? -1);
    const content = label < 0 ? [] : part.slice(label).filter((item) => item.ch.trim());
    return {
      text: line,
      option: numberedOption || label >= 0,
      emphasized: content.length > 0 && content.every((item) => item.emph),
    };
  });
}

/**
 * Các đáp án liền nhau là đáp án của một câu: đánh dấu * những đáp án được nhấn mạnh, trừ khi
 * mọi đáp án của câu đều nhấn mạnh (cả đề in đậm/tô màu thì không phân biệt được đáp án đúng).
 */
function markCorrect(lines: Line[]): { lines: string[]; marked: number } {
  let marked = 0;
  const out = lines.map((line) => line.text);
  for (let i = 0; i < lines.length;) {
    if (!lines[i].option) {
      i++;
      continue;
    }
    let j = i;
    while (j < lines.length && lines[j].option) j++;
    const group = lines.slice(i, j);
    if (group.some((line) => !line.emphasized))
      group.forEach((line, k) => {
        if (line.emphasized && !line.text.trimStart().startsWith('*')) {
          out[i + k] = `*${line.text.trimStart()}`;
          marked++;
        }
      });
    i = j;
  }
  return { lines: out, marked };
}

/**
 * document.xml (+ numbering.xml, styles.xml) → văn bản, mỗi đoạn (paragraph) một dòng. Số thứ tự tự động
 * của Word ("A.", "Câu 1:") không nằm trong chữ nên được dựng lại từ numbering.xml. Đáp án in đậm,
 * gạch chân, chữ màu hoặc tô nền được đánh dấu * (đáp án đúng) như khi gõ tay.
 */
export function documentXmlToText(
  documentXml: string,
  numberingXml: string | null,
  stylesXml: string | null = null,
): ExtractedText {
  const numbering = parseNumbering(numberingXml);
  const styles = parseCharacterStyles(stylesXml);
  /** numId → bộ đếm từng cấp; cấp trên tăng thì các cấp dưới đếm lại. */
  const counters = new Map<string, number[]>();
  const lines: Line[] = [];
  let skipped = 0;
  const body = documentXml.slice(documentXml.indexOf('<w:body'));
  for (const [, content = ''] of body.matchAll(/<w:p\b[^>]*?(?:\/>|>([\s\S]*?)<\/w:p>)/g)) {
    skipped += content.match(/<w:drawing\b|<w:pict\b|<m:oMath\b/g)?.length ?? 0;
    const chars: { ch: string; emph: boolean }[] = [];
    for (const [, run] of content.matchAll(/<w:r\b[^>]*>([\s\S]*?)<\/w:r>/g)) {
      const emph = emphasized(run.match(/<w:rPr>([\s\S]*?)<\/w:rPr>/)?.[1] ?? '', styles);
      for (const [token, value] of run.matchAll(
        /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>|<w:tab\/>|<w:(?:br|cr)\b[^>]*\/>/g,
      )) {
        const text = value !== undefined ? decodeXml(value) : token === '<w:tab/>' ? '\t' : '\n';
        for (const ch of text) chars.push({ ch, emph });
      }
    }
    const numPr = content.match(/<w:numPr>([\s\S]*?)<\/w:numPr>/)?.[1];
    const numId = numPr ? attr(numPr, 'numId') : undefined;
    const levels = numId ? numbering.get(numId) : undefined;
    let prefix = '';
    if (numId && levels) {
      const ilvl = Number(attr(numPr!, 'ilvl') ?? 0);
      const count = counters.get(numId) ?? [];
      count[ilvl] = count[ilvl] === undefined ? (levels.get(ilvl)?.start ?? 1) : count[ilvl] + 1;
      count.length = ilvl + 1;
      counters.set(numId, count);
      const level = levels.get(ilvl);
      if (level && formatNumber(1, level.format) !== null)
        prefix = level.text.replace(/%(\d)/g, (_, n: string) => {
          const index = Number(n) - 1;
          const own = levels.get(index);
          return formatNumber(count[index] ?? own?.start ?? 1, own?.format ?? 'decimal') ?? '';
        });
    }
    lines.push(...paragraphLines(chars, prefix));
  }
  const { lines: text, marked } = markCorrect(lines);
  return {
    text: text
      .map((line) => line.replace(/[ \t ]+$/gm, ''))
      .join('\n')
      .trim(),
    skipped,
    marked,
  };
}

export async function docxToText(data: ArrayBuffer): Promise<ExtractedText> {
  const document = await readZipText(data, 'word/document.xml');
  if (document === null) throw new Error('NOT_DOCX');
  return documentXmlToText(
    document,
    await readZipText(data, 'word/numbering.xml'),
    await readZipText(data, 'word/styles.xml'),
  );
}

// ---------------------------------------------------------------- PDF

/** Phần cần dùng của TextItem trong pdf.js. transform[5] là tọa độ y (trục hướng lên). */
export interface PdfTextItem {
  str: string;
  hasEOL?: boolean;
  transform: number[];
  height: number;
}

/**
 * Ghép các mẩu chữ của từng trang thành dòng. Sang dòng khi pdf.js báo hết dòng hoặc tọa độ y đổi;
 * khoảng cách giữa hai dòng lớn hơn ~1,7 lần chiều cao chữ coi là dòng trống (ngăn cách đoạn/câu).
 */
export function pdfItemsToText(pages: PdfTextItem[][]): string {
  const out: string[] = [];
  for (const items of pages) {
    const lines: { text: string; y: number; height: number; ended: boolean }[] = [];
    for (const item of items) {
      const y = item.transform[5];
      const height = item.height || Math.abs(item.transform[3]) || 10;
      const last = lines.at(-1);
      if (!last || last.ended || Math.abs(last.y - y) > height * 0.5)
        lines.push({ text: item.str, y, height, ended: !!item.hasEOL });
      else {
        last.text += item.str;
        last.ended = !!item.hasEOL;
      }
    }
    lines.forEach((line, index) => {
      const previous = lines[index - 1];
      if (previous && previous.y - line.y > 1.7 * Math.max(previous.height, line.height))
        out.push('');
      if (line.text.trim() || !previous) out.push(line.text.trim());
    });
  }
  return out.join('\n').trim();
}

export async function pdfToText(data: ArrayBuffer): Promise<ExtractedText> {
  const pdfjs = await loadPdfjs();
  const task = pdfjs.getDocument({ data, ...PDFJS_ASSETS });
  try {
    const doc = await task.promise;
    const pages: PdfTextItem[][] = [];
    for (let n = 1; n <= doc.numPages; n++) {
      const content = await (await doc.getPage(n)).getTextContent();
      // Bỏ các mục đánh dấu nội dung (TextMarkedContent), chỉ lấy mẩu chữ
      pages.push(content.items.flatMap((item) => ('str' in item ? [item] : [])));
    }
    return { text: pdfItemsToText(pages), skipped: 0, marked: 0 };
  } finally {
    void task.destroy();
  }
}
