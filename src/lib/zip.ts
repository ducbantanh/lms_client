/**
 * Đọc / tạo file ZIP ngay trên trình duyệt (không thư viện ngoài): đủ cho file .docx và ZIP bộ test thường gặp
 * (nén stored hoặc deflate, không ZIP64, không mã hóa). Giải nén bằng DecompressionStream của trình duyệt.
 */

const EOCD = 0x06054b50;
const CENTRAL = 0x02014b50;
const LOCAL = 0x04034b50;
/** Bit 11 của cờ: tên file mã hóa UTF-8. */
const UTF8_FLAG = 0x0800;

async function pipeBytes(bytes: Uint8Array, transform: GenericTransformStream) {
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(transform);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

const inflateRaw = (bytes: Uint8Array) => pipeBytes(bytes, new DecompressionStream('deflate-raw'));
const deflateRaw = (bytes: Uint8Array) => pipeBytes(bytes, new CompressionStream('deflate-raw'));

export interface ZipEntry {
  /** Đường dẫn trong ZIP, phân cách bằng /. */
  path: string;
  /** Kích thước sau giải nén (byte). */
  size: number;
  read: () => Promise<Uint8Array>;
}

/** Tên file không có cờ UTF-8: thử UTF-8 trước, sai thì đọc theo windows-1252 (gần đúng CP437 của Windows cũ). */
function decodeName(bytes: Uint8Array, utf8: boolean) {
  if (utf8) return new TextDecoder().decode(bytes);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return new TextDecoder('windows-1252').decode(bytes);
  }
}

/** Mọi file trong ZIP (bỏ mục thư mục); nội dung đọc khi gọi read(). Lỗi: Error('NOT_ZIP' | 'UNSUPPORTED_ZIP'). */
export function readZip(data: ArrayBuffer): ZipEntry[] {
  const view = new DataView(data);
  let eocd = -1;
  // Bản ghi cuối nằm trong 22 byte + tối đa 64 KB chú thích cuối file
  for (let i = data.byteLength - 22; i >= Math.max(0, data.byteLength - 22 - 0xffff); i--) {
    if (view.getUint32(i, true) === EOCD) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('NOT_ZIP');
  const count = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  if (count === 0xffff || offset === 0xffffffff) throw new Error('UNSUPPORTED_ZIP');
  const entries: ZipEntry[] = [];
  for (let n = 0; n < count; n++) {
    if (offset + 46 > data.byteLength || view.getUint32(offset, true) !== CENTRAL)
      throw new Error('NOT_ZIP');
    const flags = view.getUint16(offset + 8, true);
    const method = view.getUint16(offset + 10, true);
    const compressed = view.getUint32(offset + 20, true);
    const size = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const local = view.getUint32(offset + 42, true);
    const path = decodeName(
      new Uint8Array(data, offset + 46, nameLength),
      (flags & UTF8_FLAG) !== 0,
    ).replace(/\\/g, '/');
    offset += 46 + nameLength + extraLength + commentLength;
    if (path.endsWith('/')) continue;
    entries.push({
      path,
      size,
      read: async () => {
        if (flags & 1) throw new Error('UNSUPPORTED_ZIP');
        if (view.getUint32(local, true) !== LOCAL) throw new Error('NOT_ZIP');
        const start =
          local + 30 + view.getUint16(local + 26, true) + view.getUint16(local + 28, true);
        const raw = new Uint8Array(data, start, compressed);
        if (method === 0) return raw;
        if (method === 8) return inflateRaw(raw);
        throw new Error('UNSUPPORTED_ZIP');
      },
    });
  }
  return entries;
}

/** Nội dung (UTF-8) của một file trong zip; null nếu không có. */
export async function readZipText(data: ArrayBuffer, name: string): Promise<string | null> {
  const entry = readZip(data).find((item) => item.path === name);
  return entry ? new TextDecoder().decode(await entry.read()) : null;
}

let crcTable: Uint32Array | null = null;

export function crc32(bytes: Uint8Array) {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crcTable[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

/** Tạo ZIP (deflate, tên UTF-8) từ danh sách file; dùng cho bộ test sinh ra khi nhập và file mẫu. */
export async function writeZip(files: { path: string; data: Uint8Array }[]): Promise<Blob> {
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.path);
    const packed = await deflateRaw(file.data);
    const crc = crc32(file.data);
    const header = new DataView(new ArrayBuffer(30));
    header.setUint32(0, LOCAL, true);
    header.setUint16(4, 20, true);
    header.setUint16(6, UTF8_FLAG, true);
    header.setUint16(8, 8, true);
    header.setUint32(14, crc, true);
    header.setUint32(18, packed.length, true);
    header.setUint32(22, file.data.length, true);
    header.setUint16(26, name.length, true);
    parts.push(new Uint8Array(header.buffer), name, packed);
    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, CENTRAL, true);
    entry.setUint16(4, 20, true);
    entry.setUint16(6, 20, true);
    entry.setUint16(8, UTF8_FLAG, true);
    entry.setUint16(10, 8, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, packed.length, true);
    entry.setUint32(24, file.data.length, true);
    entry.setUint16(28, name.length, true);
    entry.setUint32(42, offset, true);
    central.push(new Uint8Array(entry.buffer), name);
    offset += 30 + name.length + packed.length;
  }
  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, EOCD, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, new Uint8Array(end.buffer)] as BlobPart[], {
    type: 'application/zip',
  });
}
