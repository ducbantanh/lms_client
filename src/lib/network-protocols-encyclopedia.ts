/**
 * Bách khoa toàn thư giao thức mạng máy tính (Network Protocols Encyclopedia).
 * Cung cấp phân tích chi tiết cấu trúc Header, các trường cờ (Flags), quy trình bắt tay và mô phỏng gói tin.
 */

export interface ProtocolDefinition {
  id: string;
  name: string;
  layer: string;
  defaultPort: number;
  description: string;
  headerFields: { name: string; bitLength: number; description: string }[];
  keyFeatures: string[];
  securityConsiderations: string[];
}

export const PROTOCOL_ENCYCLOPEDIA: ProtocolDefinition[] = [
  {
    id: 'PROTO-01',
    name: 'HTTP/3 & QUIC',
    layer: 'Application',
    defaultPort: 443,
    description: 'Giao thức truyền siêu văn bản thế hệ 3 chạy trên UDP/QUIC giảm độ trễ bắt tay và loại bỏ tắc nghẽn HOL (Head-of-Line).',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-02',
    name: 'WebSocket (RFC 6455)',
    layer: 'Application',
    defaultPort: 80,
    description: 'Giao thức truyền thông hai chiều toàn song công (full-duplex) qua một kết nối TCP duy nhất.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-03',
    name: 'gRPC & Protocol Buffers',
    layer: 'Application',
    defaultPort: 50051,
    description: 'Framework RPC hiệu năng cao mã nguồn mở chạy trên HTTP/2 với định dạng nhị phân Protobuf siêu gọn.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-04',
    name: 'MQTT v5.0',
    layer: 'Application',
    defaultPort: 1883,
    description: 'Giao thức nhắn tin dạng Publish/Subscribe gọn nhẹ tối ưu cho thiết bị IoT băng thông thấp.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-05',
    name: 'DNS (RFC 1035)',
    layer: 'Application',
    defaultPort: 53,
    description: 'Hệ thống phân giải tên miền phân tán toàn cầu ánh xạ tên miền dễ nhớ sang địa chỉ IP nhị phân.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-06',
    name: 'TLS 1.3 (RFC 8446)',
    layer: 'Transport Security',
    defaultPort: 443,
    description: 'Giao thức bảo mật tầng truyền tải với cơ chế bắt tay 1-RTT và mã hóa toàn bộ dữ liệu.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-07',
    name: 'TCP (Transmission Control Protocol)',
    layer: 'Transport',
    defaultPort: 0,
    description: 'Giao thức hướng kết nối tin cậy cung cấp khả năng kiểm soát luồng, kiểm soát tắc nghẽn và sắp xếp thứ tự gói tin.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-08',
    name: 'UDP (User Datagram Protocol)',
    layer: 'Transport',
    defaultPort: 0,
    description: 'Giao thức truyền dữ liệu không kết nối, không đảm bảo tính toàn vẹn nhưng có độ trễ cực thấp.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-09',
    name: 'BGP (Border Gateway Protocol)',
    layer: 'Network Routing',
    defaultPort: 179,
    description: 'Giao thức định tuyến giữa các hệ thống tự trị (AS) là xương sống kết nối toàn bộ mạng Internet.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-10',
    name: 'OSPF (Open Shortest Path First)',
    layer: 'Network Routing',
    defaultPort: 89,
    description: 'Giao thức định tuyến trạng thái liên kết nội miền dựa trên thuật toán Dijkstra.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-11',
    name: 'IPv6 & ICMPv6',
    layer: 'Network',
    defaultPort: 0,
    description: 'Giao thức liên mạng thế hệ mới với không gian địa chỉ 128-bit giải quyết triệt để tình trạng cạn kiệt IPv4.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
  {
    id: 'PROTO-12',
    name: 'DHCP (Dynamic Host Configuration Protocol)',
    layer: 'Application',
    defaultPort: 67,
    description: 'Giao thức cấu hình máy chủ động tự động cấp phát địa chỉ IP, gateway và DNS cho thiết bị mạng.',
    headerFields: [
      { name: 'Source Port / Identifier', bitLength: 16, description: 'Định danh cổng nguồn hoặc phiên gửi của giao thức.' },
      { name: 'Destination Port / Route', bitLength: 16, description: 'Định danh cổng đích tiếp nhận gói tin.' },
      { name: 'Sequence / Transaction Number', bitLength: 32, description: 'Số thứ tự phục vụ đồng bộ hóa và phát hiện mất gói.' },
      { name: 'Checksum / Verification Hash', bitLength: 16, description: 'Mã kiểm tra tính toàn vẹn của dữ liệu.' }
    ],
    keyFeatures: [
      'Tối ưu hóa hiệu năng truyền tải và độ trễ mạng.',
      'Khả năng phục hồi kết nối tự động khi xảy ra đứt quãng.',
      'Tương thích ngược với các hạ tầng mạng hiện có.'
    ],
    securityConsiderations: [
      'Cần tích hợp xác thực hai chiều để chống tấn công Man-in-the-Middle (MitM).',
      'Kiểm soát lưu lượng nhằm giảm thiểu rủi ro tấn công từ chối dịch vụ phân tán (DDoS).'
    ]
  },
];

export function getProtocolByName(name: string): ProtocolDefinition | undefined {
  return PROTOCOL_ENCYCLOPEDIA.find((p) => p.name.toLowerCase().includes(name.toLowerCase()));
}
