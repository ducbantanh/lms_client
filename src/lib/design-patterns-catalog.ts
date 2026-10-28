/**
 * Bách khoa toàn thư mẫu thiết kế phần mềm (Design Patterns Reference).
 * Tài liệu tham khảo toàn diện cho sinh viên học phần Kiến trúc & Thiết kế Phần mềm.
 */

export interface DesignPatternItem {
  id: string;
  name: string;
  category: 'Creational' | 'Structural' | 'Behavioral';
  intent: string;
  applicability: string[];
  structureDescription: string;
  consequences: string[];
  sampleImplementationTypeScript: string;
}

export const DESIGN_PATTERNS: DesignPatternItem[] = [
  {
    id: 'PAT-01',
    name: 'Singleton',
    category: 'Creational',
    intent: 'Đảm bảo một lớp chỉ có duy nhất một thực thể và cung cấp một điểm truy cập toàn cục tới nó.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Singleton thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-02',
    name: 'Factory Method',
    category: 'Creational',
    intent: 'Định nghĩa một giao diện để tạo đối tượng, nhưng để các lớp con quyết định lớp nào sẽ được khởi tạo.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Factory Method thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-03',
    name: 'Abstract Factory',
    category: 'Creational',
    intent: 'Cung cấp giao diện để tạo các họ đối tượng có liên quan hoặc phụ thuộc lẫn nhau mà không cần chỉ định các lớp cụ thể.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Abstract Factory thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-04',
    name: 'Builder',
    category: 'Creational',
    intent: 'Tách biệt việc xây dựng một đối tượng phức tạp khỏi biểu diễn của nó để cùng một quy trình xây dựng có thể tạo ra các biểu diễn khác nhau.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Builder thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-05',
    name: 'Prototype',
    category: 'Creational',
    intent: 'Chỉ định các loại đối tượng cần tạo bằng cách sử dụng một thực thể mẫu và tạo các đối tượng mới bằng cách sao chép nguyên mẫu này.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Prototype thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-06',
    name: 'Adapter',
    category: 'Structural',
    intent: 'Chuyển đổi giao diện của một lớp thành một giao diện khác mà khách hàng mong đợi, giúp các lớp không tương thích có thể làm việc cùng nhau.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Adapter thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-07',
    name: 'Bridge',
    category: 'Structural',
    intent: 'Tách rời phần trừu tượng khỏi phần hiện thực để cả hai có thể thay đổi độc lập với nhau.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Bridge thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-08',
    name: 'Composite',
    category: 'Structural',
    intent: 'Soạn các đối tượng thành cấu trúc cây để biểu diễn các phân cấp bộ phận - toàn thể.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Composite thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-09',
    name: 'Decorator',
    category: 'Structural',
    intent: 'Gắn thêm các trách nhiệm bổ sung cho một đối tượng một cách linh hoạt mà không làm thay đổi các đối tượng khác cùng lớp.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Decorator thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-10',
    name: 'Facade',
    category: 'Structural',
    intent: 'Cung cấp một giao diện thống nhất cho một tập hợp các giao diện trong một hệ thống con.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Facade thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-11',
    name: 'Flyweight',
    category: 'Structural',
    intent: 'Sử dụng chia sẻ để hỗ trợ số lượng lớn các đối tượng mịn một cách hiệu quả.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Flyweight thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-12',
    name: 'Proxy',
    category: 'Structural',
    intent: 'Cung cấp một đối tượng đại diện hoặc giữ chỗ cho một đối tượng khác để kiểm soát việc truy cập vào nó.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Proxy thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-13',
    name: 'Chain of Responsibility',
    category: 'Behavioral',
    intent: 'Tránh việc gắn kết người gửi yêu cầu với người nhận bằng cách cho phép nhiều đối tượng có cơ hội xử lý yêu cầu.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Chain of Responsibility thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-14',
    name: 'Command',
    category: 'Behavioral',
    intent: 'Đóng gói một yêu cầu dưới dạng một đối tượng, qua đó cho phép bạn tham số hóa khách hàng với các yêu cầu khác nhau.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Command thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-15',
    name: 'Interpreter',
    category: 'Behavioral',
    intent: 'Định nghĩa biểu diễn ngữ pháp cho một ngôn ngữ cùng với một trình thông dịch sử dụng biểu diễn đó.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Interpreter thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-16',
    name: 'Iterator',
    category: 'Behavioral',
    intent: 'Cung cấp một cách để truy cập tuần tự các phần tử của một đối tượng tập hợp mà không làm lộ biểu diễn bên dưới.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Iterator thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-17',
    name: 'Mediator',
    category: 'Behavioral',
    intent: 'Định nghĩa một đối tượng đóng gói cách một tập hợp các đối tượng tương tác với nhau.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Mediator thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-18',
    name: 'Memento',
    category: 'Behavioral',
    intent: 'Nắm bắt và ngoại hóa trạng thái bên trong của một đối tượng mà không vi phạm tính đóng gói.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Memento thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-19',
    name: 'Observer',
    category: 'Behavioral',
    intent: 'Định nghĩa mối quan hệ phụ thuộc một-nhiều giữa các đối tượng để khi một đối tượng thay đổi trạng thái, tất cả các đối tượng phụ thuộc đều được thông báo.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Observer thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-20',
    name: 'State',
    category: 'Behavioral',
    intent: 'Cho phép một đối tượng thay đổi hành vi khi trạng thái bên trong của nó thay đổi.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình State thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-21',
    name: 'Strategy',
    category: 'Behavioral',
    intent: 'Định nghĩa một họ các thuật toán, đóng gói từng thuật toán và làm cho chúng có thể hoán đổi cho nhau.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Strategy thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-22',
    name: 'Template Method',
    category: 'Behavioral',
    intent: 'Định nghĩa khung xương của một thuật toán trong một thao tác, hoãn lại một số bước cho các lớp con.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Template Method thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
  {
    id: 'PAT-23',
    name: 'Visitor',
    category: 'Behavioral',
    intent: 'Đại diện cho một thao tác được thực hiện trên các phần tử của một cấu trúc đối tượng.',
    applicability: [
      'Khi hệ thống cần độc lập với cách các sản phẩm của nó được tạo ra, kết hợp và biểu diễn.',
      'Khi các lớp con cần linh hoạt mở rộng mà không ảnh hưởng đến mã nguồn hiện có.',
      'Khi cần giảm thiểu sự phụ thuộc chặt chẽ giữa các thành phần phần mềm.'
    ],
    structureDescription: 'Mô hình Visitor thiết lập cấu trúc phân cấp rõ ràng giữa các interface trừu tượng và các lớp cài đặt cụ thể.',
    consequences: [
      'Tăng tính tái sử dụng và khả năng mở rộng của mã nguồn.',
      'Dễ dàng kiểm thử đơn vị với các mock object.',
      'Có thể làm tăng số lượng lớp nhỏ trong hệ thống nếu lạm dụng.'
    ],
    sampleImplementationTypeScript: `
// Cài đặt mẫu DesignPattern bằng TypeScript
export interface IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean;
}

export class DefaultDesignPattern implements IDesignPattern {
  executeOperation(payload: Record<string, unknown>): boolean {
    console.log('Thực thi thao tác theo mẫu DesignPattern', payload);
    return true;
  }
}
`
  },
];

export function getPatternByName(name: string): DesignPatternItem | undefined {
  return DESIGN_PATTERNS.find((p) => p.name.toLowerCase() === name.toLowerCase());
}
