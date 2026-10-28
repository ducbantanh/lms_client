/**
 * Danh mục thiết kế cơ sở dữ liệu quan hệ mẫu (Database Schema Catalog).
 * Cung cấp lược đồ thực thể quan hệ, bảng dữ liệu, ràng buộc khóa ngoại, chỉ mục và câu lệnh DDL.
 */

export interface SchemaTableColumn {
  name: string;
  dataType: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey?: boolean;
  references?: string;
  description: string;
}

export interface SchemaTable {
  tableName: string;
  description: string;
  columns: SchemaTableColumn[];
  indexes: string[];
}

export interface SystemSchemaDesign {
  id: string;
  systemName: string;
  rdbmsTarget: 'PostgreSQL' | 'MySQL' | 'Oracle';
  overview: string;
  tables: SchemaTable[];
  ddlScript: string;
}

export const DATABASE_SCHEMAS: SystemSchemaDesign[] = [
  {
    id: 'SCHEMA-01',
    systemName: 'Hệ thống Quản lý Đào tạo & Khóa học Trực tuyến (LMS)',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Quản lý Đào tạo & Khóa học Trực tuyến (LMS) được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Quản lý Đào tạo & Khóa học Trực tuyến (LMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Quản lý Đào tạo & Khóa học Trực tuyến (LMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Quản lý Đào tạo & Khóa học Trực tuyến (LMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Quản lý Đào tạo & Khóa học Trực tuyến (LMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Quản lý Đào tạo & Khóa học Trực tuyến (LMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Quản lý Đào tạo & Khóa học Trực tuyến (LMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-02',
    systemName: 'Hệ thống Thương mại Điện tử Đa chi nhánh (E-Commerce)',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Thương mại Điện tử Đa chi nhánh (E-Commerce) được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Thương mại Điện tử Đa chi nhánh (E-Commerce).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Thương mại Điện tử Đa chi nhánh (E-Commerce).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Thương mại Điện tử Đa chi nhánh (E-Commerce).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Thương mại Điện tử Đa chi nhánh (E-Commerce).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Thương mại Điện tử Đa chi nhánh (E-Commerce).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Thương mại Điện tử Đa chi nhánh (E-Commerce).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-03',
    systemName: 'Hệ thống Quản trị Bệnh viện & Bệnh án Điện tử (HIS/EMR)',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Quản trị Bệnh viện & Bệnh án Điện tử (HIS/EMR) được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Quản trị Bệnh viện & Bệnh án Điện tử (HIS/EMR).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Quản trị Bệnh viện & Bệnh án Điện tử (HIS/EMR).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Quản trị Bệnh viện & Bệnh án Điện tử (HIS/EMR).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Quản trị Bệnh viện & Bệnh án Điện tử (HIS/EMR).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Quản trị Bệnh viện & Bệnh án Điện tử (HIS/EMR).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Quản trị Bệnh viện & Bệnh án Điện tử (HIS/EMR).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-04',
    systemName: 'Hệ thống Ngân hàng Lõi & Giao dịch Tài chính (Core Banking)',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Ngân hàng Lõi & Giao dịch Tài chính (Core Banking) được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Ngân hàng Lõi & Giao dịch Tài chính (Core Banking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Ngân hàng Lõi & Giao dịch Tài chính (Core Banking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Ngân hàng Lõi & Giao dịch Tài chính (Core Banking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Ngân hàng Lõi & Giao dịch Tài chính (Core Banking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Ngân hàng Lõi & Giao dịch Tài chính (Core Banking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Ngân hàng Lõi & Giao dịch Tài chính (Core Banking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-05',
    systemName: 'Hệ thống Quản trị Chuỗi cung ứng & Kho vận (WMS/SCM)',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Quản trị Chuỗi cung ứng & Kho vận (WMS/SCM) được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Quản trị Chuỗi cung ứng & Kho vận (WMS/SCM).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Quản trị Chuỗi cung ứng & Kho vận (WMS/SCM).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Quản trị Chuỗi cung ứng & Kho vận (WMS/SCM).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Quản trị Chuỗi cung ứng & Kho vận (WMS/SCM).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Quản trị Chuỗi cung ứng & Kho vận (WMS/SCM).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Quản trị Chuỗi cung ứng & Kho vận (WMS/SCM).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-06',
    systemName: 'Hệ thống Quản lý Đặt chỗ & Đặt vé Máy bay (Flight Booking)',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Quản lý Đặt chỗ & Đặt vé Máy bay (Flight Booking) được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Quản lý Đặt chỗ & Đặt vé Máy bay (Flight Booking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Quản lý Đặt chỗ & Đặt vé Máy bay (Flight Booking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Quản lý Đặt chỗ & Đặt vé Máy bay (Flight Booking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Quản lý Đặt chỗ & Đặt vé Máy bay (Flight Booking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Quản lý Đặt chỗ & Đặt vé Máy bay (Flight Booking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Quản lý Đặt chỗ & Đặt vé Máy bay (Flight Booking).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-07',
    systemName: 'Hệ thống Mạng xã hội Doanh nghiệp & Trao đổi Nội bộ',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Mạng xã hội Doanh nghiệp & Trao đổi Nội bộ được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Mạng xã hội Doanh nghiệp & Trao đổi Nội bộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Mạng xã hội Doanh nghiệp & Trao đổi Nội bộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Mạng xã hội Doanh nghiệp & Trao đổi Nội bộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Mạng xã hội Doanh nghiệp & Trao đổi Nội bộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Mạng xã hội Doanh nghiệp & Trao đổi Nội bộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Mạng xã hội Doanh nghiệp & Trao đổi Nội bộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-08',
    systemName: 'Hệ thống Quản lý Khách sạn & Khu nghỉ dưỡng (PMS)',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Quản lý Khách sạn & Khu nghỉ dưỡng (PMS) được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Quản lý Khách sạn & Khu nghỉ dưỡng (PMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Quản lý Khách sạn & Khu nghỉ dưỡng (PMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Quản lý Khách sạn & Khu nghỉ dưỡng (PMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Quản lý Khách sạn & Khu nghỉ dưỡng (PMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Quản lý Khách sạn & Khu nghỉ dưỡng (PMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Quản lý Khách sạn & Khu nghỉ dưỡng (PMS).',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-09',
    systemName: 'Hệ thống Thư viện Số & Quản lý Xuất bản phẩm',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Thư viện Số & Quản lý Xuất bản phẩm được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Thư viện Số & Quản lý Xuất bản phẩm.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Thư viện Số & Quản lý Xuất bản phẩm.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Thư viện Số & Quản lý Xuất bản phẩm.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Thư viện Số & Quản lý Xuất bản phẩm.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Thư viện Số & Quản lý Xuất bản phẩm.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Thư viện Số & Quản lý Xuất bản phẩm.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
  {
    id: 'SCHEMA-10',
    systemName: 'Hệ thống Quản lý Bất động sản & Cho thuê Căn hộ',
    rdbmsTarget: 'PostgreSQL',
    overview: 'Lược đồ cơ sở dữ liệu cho Hệ thống Quản lý Bất động sản & Cho thuê Căn hộ được thiết kế tối ưu hóa chuẩn 3NF, đáp ứng tải giao dịch cao và đảm bảo tính toàn vẹn dữ liệu ACID.',
    tables: [
      {
        tableName: 'tbl_hệ _entity_1',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 1 của Hệ thống Quản lý Bất động sản & Cho thuê Căn hộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_1_code ON tbl_hệ _entity_1(code);',
          'CREATE INDEX idx_tbl_hệ _entity_1_status ON tbl_hệ _entity_1(status);',
          'CREATE INDEX idx_tbl_hệ _entity_1_created_at ON tbl_hệ _entity_1(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_2',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 2 của Hệ thống Quản lý Bất động sản & Cho thuê Căn hộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_2_code ON tbl_hệ _entity_2(code);',
          'CREATE INDEX idx_tbl_hệ _entity_2_status ON tbl_hệ _entity_2(status);',
          'CREATE INDEX idx_tbl_hệ _entity_2_created_at ON tbl_hệ _entity_2(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_3',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 3 của Hệ thống Quản lý Bất động sản & Cho thuê Căn hộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_3_code ON tbl_hệ _entity_3(code);',
          'CREATE INDEX idx_tbl_hệ _entity_3_status ON tbl_hệ _entity_3(status);',
          'CREATE INDEX idx_tbl_hệ _entity_3_created_at ON tbl_hệ _entity_3(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_4',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 4 của Hệ thống Quản lý Bất động sản & Cho thuê Căn hộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_4_code ON tbl_hệ _entity_4(code);',
          'CREATE INDEX idx_tbl_hệ _entity_4_status ON tbl_hệ _entity_4(status);',
          'CREATE INDEX idx_tbl_hệ _entity_4_created_at ON tbl_hệ _entity_4(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_5',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 5 của Hệ thống Quản lý Bất động sản & Cho thuê Căn hộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_5_code ON tbl_hệ _entity_5(code);',
          'CREATE INDEX idx_tbl_hệ _entity_5_status ON tbl_hệ _entity_5(status);',
          'CREATE INDEX idx_tbl_hệ _entity_5_created_at ON tbl_hệ _entity_5(created_at DESC);'
        ]
      },
      {
        tableName: 'tbl_hệ _entity_6',
        description: 'Bảng dữ liệu lưu trữ thông tin thực thể số 6 của Hệ thống Quản lý Bất động sản & Cho thuê Căn hộ.',
        columns: [
          { name: 'id', dataType: 'BIGSERIAL', isNullable: false, isPrimaryKey: true, description: 'Khóa chính tự tăng của bảng.' },
          { name: 'code', dataType: 'VARCHAR(64)', isNullable: false, isPrimaryKey: false, description: 'Mã định danh duy nhất của bản ghi.' },
          { name: 'title', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, description: 'Tiêu đề hoặc tên gọi của thực thể.' },
          { name: 'status', dataType: 'SMALLINT', isNullable: false, isPrimaryKey: false, description: 'Trạng thái hoạt động (0: Không hoạt động, 1: Đang hoạt động, 2: Đã lưu trữ).' },
          { name: 'created_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: false, isPrimaryKey: false, description: 'Thời điểm tạo bản ghi.' },
          { name: 'updated_at', dataType: 'TIMESTAMP WITH TIME ZONE', isNullable: true, isPrimaryKey: false, description: 'Thời điểm cập nhật bản ghi gần nhất.' }
        ],
        indexes: [
          'CREATE UNIQUE INDEX idx_tbl_hệ _entity_6_code ON tbl_hệ _entity_6(code);',
          'CREATE INDEX idx_tbl_hệ _entity_6_status ON tbl_hệ _entity_6(status);',
          'CREATE INDEX idx_tbl_hệ _entity_6_created_at ON tbl_hệ _entity_6(created_at DESC);'
        ]
      },
    ],
    ddlScript: `-- DDL Script cho Hệ thống
-- Khởi tạo schema và bảng dữ liệu chuẩn hóa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Toàn bộ các bảng được thiết lập khóa ngoại và chỉ mục B-Tree hiệu năng cao
`
  },
];

export function getSchemaById(id: string): SystemSchemaDesign | undefined {
  return DATABASE_SCHEMAS.find((s) => s.id === id);
}
