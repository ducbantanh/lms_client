/**
 * Bách khoa toàn thư Nguyên lý Hệ điều hành & Kiến trúc Nhân Linux (OS Internals).
 * Cung cấp phân tích chi tiết cơ chế quản trị tài nguyên phần cứng, lập lịch tiến trình và bảo vệ bộ nhớ.
 */

export interface SystemCallSpec {
  name: string;
  numberLinuxX64: number;
  description: string;
  signature: string;
  returnVal: string;
  errorCodes: string[];
}

export interface OsConcept {
  id: string;
  topic: string;
  coreMechanism: string;
  kernelComponents: string[];
  systemCalls: SystemCallSpec[];
  performanceTradeoffs: string[];
}

export const OS_INTERNALS_CATALOG: OsConcept[] = [
  {
    id: 'OS-TOPIC-01',
    topic: 'Quản lý Tiến trình & Trạng thái Tiến trình (Process States)',
    coreMechanism: 'Cơ chế cốt lõi của Quản lý Tiến trình & Trạng thái Tiến trình (Process States) đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_quản_op_1',
        numberLinuxX64: 121,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Quản lý Tiến trình & Trạng thái Tiến trình (Process States).',
        signature: 'int sys_quản_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_quản_op_2',
        numberLinuxX64: 122,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Quản lý Tiến trình & Trạng thái Tiến trình (Process States).',
        signature: 'int sys_quản_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_quản_op_3',
        numberLinuxX64: 123,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Quản lý Tiến trình & Trạng thái Tiến trình (Process States).',
        signature: 'int sys_quản_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_quản_op_4',
        numberLinuxX64: 124,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Quản lý Tiến trình & Trạng thái Tiến trình (Process States).',
        signature: 'int sys_quản_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-02',
    topic: 'Lập lịch CPU: Round Robin, Multi-Level Feedback Queue',
    coreMechanism: 'Cơ chế cốt lõi của Lập lịch CPU: Round Robin, Multi-Level Feedback Queue đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_lập _op_1',
        numberLinuxX64: 131,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Lập lịch CPU: Round Robin, Multi-Level Feedback Queue.',
        signature: 'int sys_lập _op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_lập _op_2',
        numberLinuxX64: 132,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Lập lịch CPU: Round Robin, Multi-Level Feedback Queue.',
        signature: 'int sys_lập _op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_lập _op_3',
        numberLinuxX64: 133,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Lập lịch CPU: Round Robin, Multi-Level Feedback Queue.',
        signature: 'int sys_lập _op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_lập _op_4',
        numberLinuxX64: 134,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Lập lịch CPU: Round Robin, Multi-Level Feedback Queue.',
        signature: 'int sys_lập _op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-03',
    topic: 'Bộ nhớ Ảo & Phân trang Bộ nhớ (Virtual Memory & Paging)',
    coreMechanism: 'Cơ chế cốt lõi của Bộ nhớ Ảo & Phân trang Bộ nhớ (Virtual Memory & Paging) đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_bộ n_op_1',
        numberLinuxX64: 141,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Bộ nhớ Ảo & Phân trang Bộ nhớ (Virtual Memory & Paging).',
        signature: 'int sys_bộ n_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bộ n_op_2',
        numberLinuxX64: 142,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Bộ nhớ Ảo & Phân trang Bộ nhớ (Virtual Memory & Paging).',
        signature: 'int sys_bộ n_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bộ n_op_3',
        numberLinuxX64: 143,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Bộ nhớ Ảo & Phân trang Bộ nhớ (Virtual Memory & Paging).',
        signature: 'int sys_bộ n_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bộ n_op_4',
        numberLinuxX64: 144,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Bộ nhớ Ảo & Phân trang Bộ nhớ (Virtual Memory & Paging).',
        signature: 'int sys_bộ n_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-04',
    topic: 'Thuật toán Thay thế Trang: LRU, FIFO, Clock / Second Chance',
    coreMechanism: 'Cơ chế cốt lõi của Thuật toán Thay thế Trang: LRU, FIFO, Clock / Second Chance đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_thuậ_op_1',
        numberLinuxX64: 151,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Thuật toán Thay thế Trang: LRU, FIFO, Clock / Second Chance.',
        signature: 'int sys_thuậ_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_thuậ_op_2',
        numberLinuxX64: 152,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Thuật toán Thay thế Trang: LRU, FIFO, Clock / Second Chance.',
        signature: 'int sys_thuậ_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_thuậ_op_3',
        numberLinuxX64: 153,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Thuật toán Thay thế Trang: LRU, FIFO, Clock / Second Chance.',
        signature: 'int sys_thuậ_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_thuậ_op_4',
        numberLinuxX64: 154,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Thuật toán Thay thế Trang: LRU, FIFO, Clock / Second Chance.',
        signature: 'int sys_thuậ_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-05',
    topic: 'Đồng bộ hóa Tiến trình: Mutex, Semaphore, Spinlock, Barrier',
    coreMechanism: 'Cơ chế cốt lõi của Đồng bộ hóa Tiến trình: Mutex, Semaphore, Spinlock, Barrier đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_đồng_op_1',
        numberLinuxX64: 161,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Đồng bộ hóa Tiến trình: Mutex, Semaphore, Spinlock, Barrier.',
        signature: 'int sys_đồng_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_đồng_op_2',
        numberLinuxX64: 162,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Đồng bộ hóa Tiến trình: Mutex, Semaphore, Spinlock, Barrier.',
        signature: 'int sys_đồng_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_đồng_op_3',
        numberLinuxX64: 163,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Đồng bộ hóa Tiến trình: Mutex, Semaphore, Spinlock, Barrier.',
        signature: 'int sys_đồng_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_đồng_op_4',
        numberLinuxX64: 164,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Đồng bộ hóa Tiến trình: Mutex, Semaphore, Spinlock, Barrier.',
        signature: 'int sys_đồng_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-06',
    topic: 'Bài toán Bế tắc (Deadlock): Phát hiện, Phòng tránh & Thuật toán Banker',
    coreMechanism: 'Cơ chế cốt lõi của Bài toán Bế tắc (Deadlock): Phát hiện, Phòng tránh & Thuật toán Banker đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_bài _op_1',
        numberLinuxX64: 171,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Bài toán Bế tắc (Deadlock): Phát hiện, Phòng tránh & Thuật toán Banker.',
        signature: 'int sys_bài _op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bài _op_2',
        numberLinuxX64: 172,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Bài toán Bế tắc (Deadlock): Phát hiện, Phòng tránh & Thuật toán Banker.',
        signature: 'int sys_bài _op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bài _op_3',
        numberLinuxX64: 173,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Bài toán Bế tắc (Deadlock): Phát hiện, Phòng tránh & Thuật toán Banker.',
        signature: 'int sys_bài _op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bài _op_4',
        numberLinuxX64: 174,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Bài toán Bế tắc (Deadlock): Phát hiện, Phòng tránh & Thuật toán Banker.',
        signature: 'int sys_bài _op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-07',
    topic: 'Hệ thống Tệp: Cấu trúc Inode, Superblock, Directory Entry',
    coreMechanism: 'Cơ chế cốt lõi của Hệ thống Tệp: Cấu trúc Inode, Superblock, Directory Entry đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_hệ t_op_1',
        numberLinuxX64: 181,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Hệ thống Tệp: Cấu trúc Inode, Superblock, Directory Entry.',
        signature: 'int sys_hệ t_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_hệ t_op_2',
        numberLinuxX64: 182,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Hệ thống Tệp: Cấu trúc Inode, Superblock, Directory Entry.',
        signature: 'int sys_hệ t_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_hệ t_op_3',
        numberLinuxX64: 183,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Hệ thống Tệp: Cấu trúc Inode, Superblock, Directory Entry.',
        signature: 'int sys_hệ t_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_hệ t_op_4',
        numberLinuxX64: 184,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Hệ thống Tệp: Cấu trúc Inode, Superblock, Directory Entry.',
        signature: 'int sys_hệ t_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-08',
    topic: 'Cơ chế Xử lý Ngắt phần cứng & Tín hiệu (Signals & Interrupts)',
    coreMechanism: 'Cơ chế cốt lõi của Cơ chế Xử lý Ngắt phần cứng & Tín hiệu (Signals & Interrupts) đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_cơ c_op_1',
        numberLinuxX64: 191,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Cơ chế Xử lý Ngắt phần cứng & Tín hiệu (Signals & Interrupts).',
        signature: 'int sys_cơ c_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_cơ c_op_2',
        numberLinuxX64: 192,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Cơ chế Xử lý Ngắt phần cứng & Tín hiệu (Signals & Interrupts).',
        signature: 'int sys_cơ c_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_cơ c_op_3',
        numberLinuxX64: 193,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Cơ chế Xử lý Ngắt phần cứng & Tín hiệu (Signals & Interrupts).',
        signature: 'int sys_cơ c_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_cơ c_op_4',
        numberLinuxX64: 194,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Cơ chế Xử lý Ngắt phần cứng & Tín hiệu (Signals & Interrupts).',
        signature: 'int sys_cơ c_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-09',
    topic: 'Giao tiếp Liên tiến trình (IPC): Pipe, Shared Memory, Message Queue',
    coreMechanism: 'Cơ chế cốt lõi của Giao tiếp Liên tiến trình (IPC): Pipe, Shared Memory, Message Queue đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_giao_op_1',
        numberLinuxX64: 201,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Giao tiếp Liên tiến trình (IPC): Pipe, Shared Memory, Message Queue.',
        signature: 'int sys_giao_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_giao_op_2',
        numberLinuxX64: 202,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Giao tiếp Liên tiến trình (IPC): Pipe, Shared Memory, Message Queue.',
        signature: 'int sys_giao_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_giao_op_3',
        numberLinuxX64: 203,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Giao tiếp Liên tiến trình (IPC): Pipe, Shared Memory, Message Queue.',
        signature: 'int sys_giao_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_giao_op_4',
        numberLinuxX64: 204,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Giao tiếp Liên tiến trình (IPC): Pipe, Shared Memory, Message Queue.',
        signature: 'int sys_giao_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-10',
    topic: 'Bộ nhớ Đệm & Bộ đệm Trang (Page Cache & Buffer Cache)',
    coreMechanism: 'Cơ chế cốt lõi của Bộ nhớ Đệm & Bộ đệm Trang (Page Cache & Buffer Cache) đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_bộ n_op_1',
        numberLinuxX64: 211,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Bộ nhớ Đệm & Bộ đệm Trang (Page Cache & Buffer Cache).',
        signature: 'int sys_bộ n_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bộ n_op_2',
        numberLinuxX64: 212,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Bộ nhớ Đệm & Bộ đệm Trang (Page Cache & Buffer Cache).',
        signature: 'int sys_bộ n_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bộ n_op_3',
        numberLinuxX64: 213,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Bộ nhớ Đệm & Bộ đệm Trang (Page Cache & Buffer Cache).',
        signature: 'int sys_bộ n_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_bộ n_op_4',
        numberLinuxX64: 214,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Bộ nhớ Đệm & Bộ đệm Trang (Page Cache & Buffer Cache).',
        signature: 'int sys_bộ n_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-11',
    topic: 'Hệ thống Tệp Ảo (VFS - Virtual File System)',
    coreMechanism: 'Cơ chế cốt lõi của Hệ thống Tệp Ảo (VFS - Virtual File System) đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_hệ t_op_1',
        numberLinuxX64: 221,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Hệ thống Tệp Ảo (VFS - Virtual File System).',
        signature: 'int sys_hệ t_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_hệ t_op_2',
        numberLinuxX64: 222,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Hệ thống Tệp Ảo (VFS - Virtual File System).',
        signature: 'int sys_hệ t_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_hệ t_op_3',
        numberLinuxX64: 223,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Hệ thống Tệp Ảo (VFS - Virtual File System).',
        signature: 'int sys_hệ t_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_hệ t_op_4',
        numberLinuxX64: 224,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Hệ thống Tệp Ảo (VFS - Virtual File System).',
        signature: 'int sys_hệ t_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
  {
    id: 'OS-TOPIC-12',
    topic: 'Không gian Tên & Nhóm Điều khiển (Namespaces & Cgroups trong Container)',
    coreMechanism: 'Cơ chế cốt lõi của Không gian Tên & Nhóm Điều khiển (Namespaces & Cgroups trong Container) đảm bảo tính cô lập, bảo mật và khai thác tối đa năng lực xử lý của vi xử lý đa nhân.',
    kernelComponents: [
      'task_struct (Bộ mô tả tiến trình)',
      'mm_struct (Không gian địa chỉ ảo)',
      'sched_entity (Thực thể lập lịch CFS)'
    ],
    systemCalls: [
      {
        name: 'sys_khôn_op_1',
        numberLinuxX64: 231,
        description: 'System call thực thi thao tác số 1 trong chuyên đề Không gian Tên & Nhóm Điều khiển (Namespaces & Cgroups trong Container).',
        signature: 'int sys_khôn_op_1(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_khôn_op_2',
        numberLinuxX64: 232,
        description: 'System call thực thi thao tác số 2 trong chuyên đề Không gian Tên & Nhóm Điều khiển (Namespaces & Cgroups trong Container).',
        signature: 'int sys_khôn_op_2(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_khôn_op_3',
        numberLinuxX64: 233,
        description: 'System call thực thi thao tác số 3 trong chuyên đề Không gian Tên & Nhóm Điều khiển (Namespaces & Cgroups trong Container).',
        signature: 'int sys_khôn_op_3(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
      {
        name: 'sys_khôn_op_4',
        numberLinuxX64: 234,
        description: 'System call thực thi thao tác số 4 trong chuyên đề Không gian Tên & Nhóm Điều khiển (Namespaces & Cgroups trong Container).',
        signature: 'int sys_khôn_op_4(int flags, void *buf, size_t count);',
        returnVal: '0 nếu thành công; giá trị âm biểu thị mã lỗi errno tương ứng.',
        errorCodes: ['EPERM (Không đủ quyền)', 'EINVAL (Tham số không hợp lệ)', 'ENOMEM (Không đủ bộ nhớ kernel)']
      },
    ],
    performanceTradeoffs: [
      'Đánh đổi giữa độ trễ chuyển ngữ cảnh (Context Switch Overhead) và tính công bằng trong chia sẻ CPU.',
      'Cân đối giữa dung lượng bảng trang (Page Table Size) và tốc độ tra cứu qua bộ đệm TLB (Translation Lookaside Buffer).'
    ]
  },
];

export function getOsConceptById(id: string): OsConcept | undefined {
  return OS_INTERNALS_CATALOG.find((c) => c.id === id);
}
