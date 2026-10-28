import test from 'node:test';
import assert from 'node:assert/strict';
import { countImportLines } from '../src/lib/admin.ts';

test('countImportLines bỏ dòng trống, chú thích và dòng tiêu đề CSV như server', () => {
  assert.equal(countImportLines('# chú thích\n\nB21|01012003|An\nB22|02012003|Bình'), 2);
  assert.equal(countImportLines('MSSV,Ngày sinh,Họ tên\r\nGV01,1/2/1980,Lan\r\n'), 1);
  assert.equal(countImportLines('MSSV;Ngày sinh;Họ tên\nGV01;01021980;Lan'), 1);
  // Chỉ dòng đầu mới có thể là tiêu đề; dòng dữ liệu đầu có ngày sinh thì vẫn được đếm
  assert.equal(countImportLines('GV01,01021980,Lan\nGV02,02021980,Hoa'), 2);
  assert.equal(countImportLines(''), 0);
});
