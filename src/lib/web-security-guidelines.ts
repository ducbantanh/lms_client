/**
 * Cẩm nang an toàn thông tin và lập trình phòng thủ trong phát triển Web (Web Security Guidelines).
 * Tài liệu tham khảo theo tiêu chuẩn OWASP Top 10 và NIST SP 800-53.
 */

export interface SecurityVulnerability {
  id: string;
  name: string;
  cwe: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  attackVector: string;
  impactAnalysis: string;
  mitigationStrategy: string;
  codeExampleBad: string;
  codeExampleGood: string;
}

export const SECURITY_GUIDELINES: SecurityVulnerability[] = [
  {
    id: 'SEC-VULN-001',
    name: 'SQL Injection (SQLi)',
    cwe: 'CWE-89',
    riskLevel: 'CRITICAL',
    description: 'Lỗ hổng bảo mật SQL Injection (SQLi) xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Sử dụng Prepared Statements và Parameterized Queries; không nối chuỗi thô.',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-002',
    name: 'Cross-Site Scripting (XSS)',
    cwe: 'CWE-79',
    riskLevel: 'HIGH',
    description: 'Lỗ hổng bảo mật Cross-Site Scripting (XSS) xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Mã hóa ký tự HTML đầu ra (HTML Entity Encoding) và thiết lập chính sách Content Security Policy (CSP).',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-003',
    name: 'Cross-Site Request Forgery (CSRF)',
    cwe: 'CWE-352',
    riskLevel: 'HIGH',
    description: 'Lỗ hổng bảo mật Cross-Site Request Forgery (CSRF) xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Sử dụng CSRF Token ngẫu nhiên, gắn cờ SameSite=Strict/Lax cho Cookie xác thực.',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-004',
    name: 'Server-Side Request Forgery (SSRF)',
    cwe: 'CWE-918',
    riskLevel: 'CRITICAL',
    description: 'Lỗ hổng bảo mật Server-Side Request Forgery (SSRF) xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Kiểm tra danh sách trắng (Whitelist) tên miền, chặn dải IP nội bộ RFC 1918 (10.0.0.0/8, 127.0.0.1, 192.168.0.0/16).',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-005',
    name: 'Broken Authentication & Session Hijacking',
    cwe: 'CWE-287',
    riskLevel: 'CRITICAL',
    description: 'Lỗ hổng bảo mật Broken Authentication & Session Hijacking xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Sử dụng cơ chế mã hóa mật khẩu bcrypt/argon2id, áp dụng xác thực hai yếu tố (2FA) và cờ HttpOnly; Secure cho Cookie.',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-006',
    name: 'Security Misconfiguration',
    cwe: 'CWE-16',
    riskLevel: 'MEDIUM',
    description: 'Lỗ hổng bảo mật Security Misconfiguration xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Vô hiệu hóa thông tin gỡ lỗi (Debug traces), cập nhật bản vá định kỳ và cấu hình CORS chặt chẽ.',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-007',
    name: 'Vulnerable and Outdated Components',
    cwe: 'CWE-1104',
    riskLevel: 'HIGH',
    description: 'Lỗ hổng bảo mật Vulnerable and Outdated Components xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Quét phụ thuộc bằng npm audit / Snyk / Dependabot, loại bỏ thư viện không còn duy trì.',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-008',
    name: 'Identification and Authentication Failures',
    cwe: 'CWE-384',
    riskLevel: 'HIGH',
    description: 'Lỗ hổng bảo mật Identification and Authentication Failures xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Hủy phiên cũ sau khi đăng nhập (Session Fixation Defense), khóa tài khoản khi nhập sai quá ngưỡng.',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-009',
    name: 'Software and Data Integrity Failures',
    cwe: 'CWE-494',
    riskLevel: 'CRITICAL',
    description: 'Lỗ hổng bảo mật Software and Data Integrity Failures xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Ký số phần mềm, kiểm tra mã băm SHA-256 trước khi thực thi gói cài đặt.',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
  {
    id: 'SEC-VULN-010',
    name: 'Security Logging and Monitoring Failures',
    cwe: 'CWE-778',
    riskLevel: 'MEDIUM',
    description: 'Lỗ hổng bảo mật Security Logging and Monitoring Failures xảy ra khi ứng dụng không kiểm tra dữ liệu đầu vào hoặc xử lý thiếu an toàn trước khi chuyển tiếp dữ liệu đến thành phần thực thi.',
    attackVector: 'Kẻ tấn công gửi các gói tin chứa chuỗi độc hại qua tham số URL, thân request HTTP hoặc Header tùy biến.',
    impactAnalysis: 'Có thể dẫn tới chiếm quyền điều khiển tài khoản, rò rỉ cơ sở dữ liệu hoặc kiểm soát toàn bộ máy chủ ứng dụng.',
    mitigationStrategy: 'Ghi nhật ký đầy đủ các sự kiện nhạy cảm (đăng nhập, đổi mật khẩu, phân quyền) vào hệ thống SIEM tập trung.',
    codeExampleBad: `
// Code không an toàn (Vulnerable Example)
app.get('/api/users', async (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.query.name + "'";
  const results = await db.rawQuery(query);
  res.json(results);
});
`,
    codeExampleGood: `
// Code an toàn (Secure Implementation)
app.get('/api/users', async (req, res) => {
  const query = "SELECT id, username, email FROM users WHERE username = $1";
  const results = await db.query(query, [req.query.name]);
  res.json(results);
});
`
  },
];

export function getVulnerabilityById(id: string): SecurityVulnerability | undefined {
  return SECURITY_GUIDELINES.find((v) => v.id === id);
}
