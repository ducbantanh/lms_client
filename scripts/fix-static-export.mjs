/**
 * FILE 4/4 — SỬA TÊN FILE SAU KHI NEXT.JS BUILD TRÊN WINDOWS
 *
 * npm tự chạy file này qua script "postbuild" sau npm run build.
 * Ví dụ: dashboard/__next.dashboard/__PAGE__.txt
 *     → dashboard/__next.dashboard.__PAGE__.txt
 *
 * Browser yêu cầu tên phẳng ở dòng thứ hai. Script thêm bản sao, không xóa bản gốc,
 * không sửa source và không sửa node_modules.
 * Theo dõi upstream: https://github.com/vercel/next.js/issues/85374
 */
import { readdir, copyFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const exportDirectory = fileURLToPath(new URL('../out/', import.meta.url));
let copiedFileCount = 0;

/** Trả đường dẫn phẳng cần tạo; null nghĩa là file đã đúng hoặc không phải RSC segment. */
function getFlatSegmentPath(sourceFile) {
  const relativePath = path.relative(exportDirectory, sourceFile);
  const pathParts = relativePath.split(path.sep);
  const segmentStartIndex = pathParts.findIndex((part) => part.startsWith('__next.'));

  const isNotSegmentFile = segmentStartIndex < 0;
  const isAlreadyFlat = segmentStartIndex === pathParts.length - 1;
  if (isNotSegmentFile || isAlreadyFlat) {
    return null;
  }

  // Giữ thư mục route (dashboard/), chỉ ghép phần __next... phía sau bằng dấu chấm.
  const routeDirectories = pathParts.slice(0, segmentStartIndex);
  const flatFileName = pathParts.slice(segmentStartIndex).join('.');
  return path.join(exportDirectory, ...routeDirectories, flatFileName);
}

/** File chưa có là bình thường; lỗi quyền đọc hoặc lỗi ổ đĩa vẫn phải báo ra. */
async function readFileIfExists(filePath) {
  try {
    return await readFile(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/** Cho phép chạy lại nhiều lần, nhưng không ghi đè file cùng tên có nội dung khác. */
async function copySegmentFile(sourceFile, destinationFile) {
  const existingContent = await readFileIfExists(destinationFile);
  if (existingContent !== null) {
    const sourceContent = await readFile(sourceFile);
    if (!existingContent.equals(sourceContent)) {
      throw new Error(`RSC filename collision: ${destinationFile}`);
    }
  }
  await copyFile(sourceFile, destinationFile);
  copiedFileCount += 1;
}

/** Duyệt các thư mục con trong out/ và chỉ xử lý file .txt của Next.js. */
async function normalizeSegmentFiles(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  for (const entry of entries) {
    const sourceFile = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      await normalizeSegmentFiles(sourceFile);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.txt')) {
      continue;
    }

    const destinationFile = getFlatSegmentPath(sourceFile);
    if (destinationFile !== null) {
      await copySegmentFile(sourceFile, destinationFile);
    }
  }
}

await normalizeSegmentFiles(exportDirectory);
console.log(`Static export: normalized ${copiedFileCount} RSC segment paths.`);
