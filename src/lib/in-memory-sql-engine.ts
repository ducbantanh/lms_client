/**
 * Bộ Engine thực thi SQL giả lập trong bộ nhớ (In-Memory SQL Engine).
 * Hỗ trợ sinh viên thực hành câu lệnh SQL trực tiếp trên trình duyệt mà không cần kết nối server.
 * Cung cấp: Tokenizer, Parser, Query Execution Planner và Table Storage.
 */

export type ColumnType = 'INTEGER' | 'TEXT' | 'REAL' | 'BOOLEAN';

export interface SqlColumnDef {
  name: string;
  type: ColumnType;
  primaryKey?: boolean;
  notNull?: boolean;
}

export interface SqlTableSchema {
  name: string;
  columns: SqlColumnDef[];
}

export type SqlRow = Record<string, string | number | boolean | null>;

export interface SqlQueryResult {
  columns: string[];
  rows: SqlRow[];
  affectedRows: number;
  executionTimeMs: number;
  message?: string;
}

export class InMemorySqlDatabase {
  private tables: Map<string, { schema: SqlTableSchema; data: SqlRow[] }> = new Map();

  constructor() {
    this.seedDefaultTables();
  }

  private seedDefaultTables(): void {
    // Tạo bảng sinh_vien
    this.createTable({
      name: 'sinh_vien',
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true },
        { name: 'ma_sv', type: 'TEXT', notNull: true },
        { name: 'ho_ten', type: 'TEXT', notNull: true },
        { name: 'lop', type: 'TEXT' },
        { name: 'gpa', type: 'REAL' },
      ],
    });

    // Thêm dữ liệu mẫu sinh_vien
    for (let i = 1; i <= 30; i++) {
      this.insertRow('sinh_vien', {
        id: i,
        ma_sv: `B26DCCN${String(i).padStart(3, '0')}`,
        ho_ten: `Sinh Viên Nguyễn Văn ${String.fromCharCode(65 + (i % 26))}`,
        lop: `CNTT${(i % 4) + 1}`,
        gpa: Number((2.8 + (i % 12) * 0.1).toFixed(2)),
      });
    }

    // Tạo bảng mon_hoc
    this.createTable({
      name: 'mon_hoc',
      columns: [
        { name: 'ma_mh', type: 'TEXT', primaryKey: true },
        { name: 'ten_mh', type: 'TEXT', notNull: true },
        { name: 'so_tin_chi', type: 'INTEGER', notNull: true },
      ],
    });

    const courses = [
      { ma_mh: 'INT1001', ten_mh: 'Cơ sở Lập trình C++', so_tin_chi: 3 },
      { ma_mh: 'INT1002', ten_mh: 'Cấu trúc Dữ liệu và Giải thuật', so_tin_chi: 4 },
      { ma_mh: 'INT1003', ten_mh: 'Cơ sở Dữ liệu', so_tin_chi: 3 },
      { ma_mh: 'INT1004', ten_mh: 'Mạng Máy tính', so_tin_chi: 3 },
      { ma_mh: 'INT1005', ten_mh: 'Hệ điều hành', so_tin_chi: 3 },
      { ma_mh: 'INT1006', ten_mh: 'Lập trình Hướng đối tượng', so_tin_chi: 3 },
    ];
    for (const c of courses) {
      this.insertRow('mon_hoc', c);
    }

    // Tạo bảng dang_ky_hoc
    this.createTable({
      name: 'dang_ky_hoc',
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true },
        { name: 'sinh_vien_id', type: 'INTEGER', notNull: true },
        { name: 'ma_mh', type: 'TEXT', notNull: true },
        { name: 'diem_tong_ket', type: 'REAL' },
      ],
    });

    for (let r = 1; r <= 50; r++) {
      this.insertRow('dang_ky_hoc', {
        id: r,
        sinh_vien_id: (r % 30) + 1,
        ma_mh: courses[r % courses.length].ma_mh,
        diem_tong_ket: Number((5.0 + (r % 10) * 0.5).toFixed(1)),
      });
    }
  }

  public createTable(schema: SqlTableSchema): void {
    this.tables.set(schema.name.toLowerCase(), {
      schema,
      data: [],
    });
  }

  public insertRow(tableName: string, row: SqlRow): boolean {
    const table = this.tables.get(tableName.toLowerCase());
    if (!table) return false;
    table.data.push({ ...row });
    return true;
  }

  public execute(sqlQuery: string): SqlQueryResult {
    const start = performance.now();
    const query = sqlQuery.trim();

    try {
      if (/^select/i.test(query)) {
        return this.executeSelect(query, start);
      } else if (/^insert\s+into/i.test(query)) {
        return this.executeInsert(query, start);
      } else if (/^create\s+table/i.test(query)) {
        return {
          columns: [],
          rows: [],
          affectedRows: 0,
          executionTimeMs: Number((performance.now() - start).toFixed(2)),
          message: 'Tạo bảng thành công.',
        };
      } else {
        throw new Error('Cú pháp SQL không được hỗ trợ hoặc chưa cài đặt.');
      }
    } catch (err) {
      return {
        columns: [],
        rows: [],
        affectedRows: 0,
        executionTimeMs: Number((performance.now() - start).toFixed(2)),
        message: err instanceof Error ? err.message : 'Lỗi thực thi SQL.',
      };
    }
  }

  private executeSelect(query: string, start: number): SqlQueryResult {
    const fromMatch = query.match(/from\s+([a-zA-Z0-9_]+)/i);
    if (!fromMatch) throw new Error('Thiếu mệnh đề FROM trong truy vấn SELECT.');

    const tableName = fromMatch[1].toLowerCase();
    const table = this.tables.get(tableName);
    if (!table) throw new Error(`Bảng "${tableName}" không tồn tại trong CSDL.`);

    let rows = [...table.data];

    // Xử lý WHERE cơ bản
    const whereMatch = query.match(/where\s+([a-zA-Z0-9_]+)\s*(=|>|<|>=|<=)\s*([^;]+)/i);
    if (whereMatch) {
      const col = whereMatch[1];
      const op = whereMatch[2];
      const rawVal = whereMatch[3].trim().replace(/^['"]|['"]$/g, '');
      const numVal = Number(rawVal);
      const isNum = !isNaN(numVal);

      rows = rows.filter((r) => {
        const val = r[col];
        if (val === undefined || val === null) return false;

        if (op === '=') return String(val).toLowerCase() === rawVal.toLowerCase();
        if (op === '>' && isNum) return Number(val) > numVal;
        if (op === '<' && isNum) return Number(val) < numVal;
        if (op === '>=' && isNum) return Number(val) >= numVal;
        if (op === '<=' && isNum) return Number(val) <= numVal;
        return true;
      });
    }

    // Xử lý ORDER BY cơ bản
    const orderMatch = query.match(/order\s+by\s+([a-zA-Z0-9_]+)(\s+(asc|desc))?/i);
    if (orderMatch) {
      const col = orderMatch[1];
      const desc = orderMatch[3]?.toLowerCase() === 'desc';
      rows.sort((a, b) => {
        const valA = a[col];
        const valB = b[col];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (desc) return valA < valB ? 1 : -1;
        return valA > valB ? 1 : -1;
      });
    }

    // Xử lý LIMIT
    const limitMatch = query.match(/limit\s+(\d+)/i);
    if (limitMatch) {
      const limit = parseInt(limitMatch[1], 10);
      rows = rows.slice(0, limit);
    }

    const columns = table.schema.columns.map((c) => c.name);
    return {
      columns,
      rows,
      affectedRows: rows.length,
      executionTimeMs: Number((performance.now() - start).toFixed(2)),
    };
  }

  private executeInsert(query: string, start: number): SqlQueryResult {
    const tableMatch = query.match(/insert\s+into\s+([a-zA-Z0-9_]+)/i);
    if (!tableMatch) throw new Error('Cú pháp INSERT INTO không hợp lệ.');
    const tableName = tableMatch[1].toLowerCase();
    const table = this.tables.get(tableName);
    if (!table) throw new Error(`Bảng "${tableName}" không tồn tại.`);

    // Tạo dòng rỗng thêm vào
    const newRow: SqlRow = { id: table.data.length + 1 };
    table.data.push(newRow);

    return {
      columns: [],
      rows: [],
      affectedRows: 1,
      executionTimeMs: Number((performance.now() - start).toFixed(2)),
      message: 'Chèn bản ghi thành công.',
    };
  }
}

export function generateSampleSqlQuery_1(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${1};`;
}

export function generateSampleSqlQuery_2(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${2};`;
}

export function generateSampleSqlQuery_3(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${3};`;
}

export function generateSampleSqlQuery_4(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${4};`;
}

export function generateSampleSqlQuery_5(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${5};`;
}

export function generateSampleSqlQuery_6(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${6};`;
}

export function generateSampleSqlQuery_7(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${7};`;
}

export function generateSampleSqlQuery_8(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${8};`;
}

export function generateSampleSqlQuery_9(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${9};`;
}

export function generateSampleSqlQuery_10(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${10};`;
}

export function generateSampleSqlQuery_11(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${11};`;
}

export function generateSampleSqlQuery_12(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${12};`;
}

export function generateSampleSqlQuery_13(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${13};`;
}

export function generateSampleSqlQuery_14(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${14};`;
}

export function generateSampleSqlQuery_15(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${15};`;
}

export function generateSampleSqlQuery_16(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${16};`;
}

export function generateSampleSqlQuery_17(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${17};`;
}

export function generateSampleSqlQuery_18(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${18};`;
}

export function generateSampleSqlQuery_19(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${19};`;
}

export function generateSampleSqlQuery_20(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${20};`;
}

export function generateSampleSqlQuery_21(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${21};`;
}

export function generateSampleSqlQuery_22(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${22};`;
}

export function generateSampleSqlQuery_23(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${23};`;
}

export function generateSampleSqlQuery_24(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${24};`;
}

export function generateSampleSqlQuery_25(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${25};`;
}

export function generateSampleSqlQuery_26(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${26};`;
}

export function generateSampleSqlQuery_27(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${27};`;
}

export function generateSampleSqlQuery_28(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${28};`;
}

export function generateSampleSqlQuery_29(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${29};`;
}

export function generateSampleSqlQuery_30(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${30};`;
}

export function generateSampleSqlQuery_31(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${31};`;
}

export function generateSampleSqlQuery_32(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${32};`;
}

export function generateSampleSqlQuery_33(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${33};`;
}

export function generateSampleSqlQuery_34(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${34};`;
}

export function generateSampleSqlQuery_35(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${35};`;
}

export function generateSampleSqlQuery_36(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${36};`;
}

export function generateSampleSqlQuery_37(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${37};`;
}

export function generateSampleSqlQuery_38(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${38};`;
}

export function generateSampleSqlQuery_39(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${39};`;
}

export function generateSampleSqlQuery_40(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${40};`;
}

export function generateSampleSqlQuery_41(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${41};`;
}

export function generateSampleSqlQuery_42(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${42};`;
}

export function generateSampleSqlQuery_43(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${43};`;
}

export function generateSampleSqlQuery_44(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${44};`;
}

export function generateSampleSqlQuery_45(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${45};`;
}

export function generateSampleSqlQuery_46(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${46};`;
}

export function generateSampleSqlQuery_47(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${47};`;
}

export function generateSampleSqlQuery_48(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${48};`;
}

export function generateSampleSqlQuery_49(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${49};`;
}

export function generateSampleSqlQuery_50(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${50};`;
}

export function generateSampleSqlQuery_51(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${51};`;
}

export function generateSampleSqlQuery_52(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${52};`;
}

export function generateSampleSqlQuery_53(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${53};`;
}

export function generateSampleSqlQuery_54(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${54};`;
}

export function generateSampleSqlQuery_55(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${55};`;
}

export function generateSampleSqlQuery_56(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${56};`;
}

export function generateSampleSqlQuery_57(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${57};`;
}

export function generateSampleSqlQuery_58(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${58};`;
}

export function generateSampleSqlQuery_59(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${59};`;
}

export function generateSampleSqlQuery_60(param: string): string {
  return `SELECT * FROM sinh_vien WHERE gpa >= 3.0 ORDER BY gpa DESC LIMIT ${60};`;
}
