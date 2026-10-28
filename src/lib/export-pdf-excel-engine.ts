/**
 * Bộ tạo báo cáo và định dạng tài liệu xuất bản của hệ thống F LMS.
 * Hỗ trợ chuyển đổi bảng điểm, danh sách điểm danh, báo cáo kiểm tra thành HTML in ấn và CSV/Excel.
 */

export interface StudentScoreRecord {
  studentId: string;
  studentName: string;
  classGroup: string;
  attendanceScore: number;
  midtermScore: number;
  practiceScore: number;
  finalExamScore: number;
  totalScore: number;
  letterGrade: string;
  passed: boolean;
}

export function generateTranscriptHtml(
  courseTitle: string,
  courseCode: string,
  teacherName: string,
  semester: string,
  records: StudentScoreRecord[]
): string {
  const rows = records
    .map(
      (r, idx) => `
    <tr class="${r.passed ? '' : 'failed'}">
      <td style="text-align: center;">${idx + 1}</td>
      <td style="font-family: monospace; font-weight: bold;">${r.studentId}</td>
      <td>${r.studentName}</td>
      <td style="text-align: center;">${r.classGroup}</td>
      <td style="text-align: right;">${r.attendanceScore.toFixed(1)}</td>
      <td style="text-align: right;">${r.midtermScore.toFixed(1)}</td>
      <td style="text-align: right;">${r.practiceScore.toFixed(1)}</td>
      <td style="text-align: right;">${r.finalExamScore.toFixed(1)}</td>
      <td style="text-align: right; font-weight: bold;">${r.totalScore.toFixed(1)}</td>
      <td style="text-align: center; font-weight: bold;">${r.letterGrade}</td>
      <td style="text-align: center; color: ${r.passed ? '#059669' : '#dc2626'};">${r.passed ? 'Đạt' : 'Học lại'}</td>
    </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>BẢNG ĐIỂM TỔNG KẾT - ${courseCode}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; line-height: 1.4; color: #1e293b; padding: 24px; }
    .header { text-align: center; margin-bottom: 24px; border-bottom: 2px solid #0f172a; padding-bottom: 16px; }
    .title { font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 8px 0; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 6px 10px; }
    th { background-color: #f1f5f9; font-weight: bold; text-transform: uppercase; font-size: 11px; }
    .failed { background-color: #fef2f2; }
    .signatures { display: flex; justify-content: space-between; margin-top: 48px; text-align: center; }
    .sign-box { width: 200px; }
  </style>
</head>
<body>
  <div class="header">
    <div style="font-size: 12px; text-transform: uppercase;">TRƯỜNG ĐẠI HỌC - KHOA CÔNG NGHỆ THÔNG TIN</div>
    <div class="title">BẢNG ĐIỂM TỔNG KẾT HỌC PHẦN</div>
    <div>Học kỳ: <b>${semester}</b></div>
  </div>
  <div class="meta">
    <div>Môn học: <b>${courseTitle}</b> (${courseCode})</div>
    <div>Giảng viên phụ trách: <b>${teacherName}</b></div>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width: 40px;">STT</th>
        <th style="width: 100px;">Mã SV</th>
        <th>Họ và tên</th>
        <th style="width: 80px;">Lớp</th>
        <th style="width: 60px;">Chuyên cần</th>
        <th style="width: 60px;">Giữa kỳ</th>
        <th style="width: 60px;">Thực hành</th>
        <th style="width: 60px;">Cuối kỳ</th>
        <th style="width: 60px;">Tổng kết</th>
        <th style="width: 50px;">Điểm chữ</th>
        <th style="width: 70px;">Kết quả</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <div class="signatures">
    <div class="sign-box">
      <div><b>GIẢNG VIÊN CHẤM THI</b></div>
      <div style="margin-top: 60px;">${teacherName}</div>
    </div>
    <div class="sign-box">
      <div><b>TRƯỞNG BỘ MÔN</b></div>
      <div style="margin-top: 60px;">(Ký và ghi rõ họ tên)</div>
    </div>
  </div>
</body>
</html>`;
}

export function exportScoresToCsv(records: StudentScoreRecord[]): string {
  const header = ['STT', 'Mã Sinh Viên', 'Họ Và Tên', 'Lớp', 'Chuyên Cần', 'Giữa Kỳ', 'Thực Hành', 'Cuối Kỳ', 'Điểm Tổng Kết', 'Điểm Chữ', 'Trạng Thái'];
  const lines = records.map((r, i) => [
    i + 1,
    `"${r.studentId}"`,
    `"${r.studentName}"`,
    `"${r.classGroup}"`,
    r.attendanceScore,
    r.midtermScore,
    r.practiceScore,
    r.finalExamScore,
    r.totalScore,
    `"${r.letterGrade}"`,
    r.passed ? 'ĐẠT' : 'HỌC LẠI'
  ].join(','));
  return [header.join(','), ...lines].join('\n');
}
