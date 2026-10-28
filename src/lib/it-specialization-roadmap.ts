/**
 * Bản đồ kỹ năng và lộ trình đào tạo chuyên sâu (Specialization Roadmap).
 * Giúp sinh viên định hướng nghề nghiệp, theo dõi môn tiên quyết và tích lũy chứng chỉ kỹ năng.
 */

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: 'NỀN TẢNG' | 'CƠ SỞ' | 'CHUYÊN SÂU' | 'THỰC CHIẾN';
  prerequisites: string[];
  recommendedCourses: string[];
  description: string;
  estimatedHours: number;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  targetRoles: string[];
  requiredCredits: number;
  skills: SkillNode[];
}

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'PATH-01',
    title: 'Kỹ thuật Phần mềm (Software Engineering)',
    description: 'Chương trình đào tạo chuyên sâu hướng tới việc cung cấp nguồn nhân lực chất lượng cao trong lĩnh vực Kỹ thuật Phần mềm (Software Engineering), đáp ứng tiêu chuẩn của các tập đoàn công nghệ toàn cầu.',
    targetRoles: ['Kỹ sư phát triển', 'Chuyên gia giải pháp', 'Trưởng nhóm kỹ thuật'],
    requiredCredits: 135,
    skills: [
      {
        id: 'SKILL-1',
        name: 'Kỹ năng 1: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-1: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 50
      },
      {
        id: 'SKILL-2',
        name: 'Kỹ năng 2: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-2: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 60
      },
      {
        id: 'SKILL-3',
        name: 'Kỹ năng 3: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-3: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 70
      },
      {
        id: 'SKILL-4',
        name: 'Kỹ năng 4: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-4: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 80
      },
      {
        id: 'SKILL-5',
        name: 'Kỹ năng 5: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-5: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 90
      },
      {
        id: 'SKILL-6',
        name: 'Kỹ năng 6: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-6: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 100
      },
      {
        id: 'SKILL-7',
        name: 'Kỹ năng 7: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-7: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 110
      },
      {
        id: 'SKILL-8',
        name: 'Kỹ năng 8: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-8: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 120
      },
      {
        id: 'SKILL-9',
        name: 'Kỹ năng 9: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-9: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 130
      },
      {
        id: 'SKILL-10',
        name: 'Kỹ năng 10: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-10: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 140
      },
      {
        id: 'SKILL-11',
        name: 'Kỹ năng 11: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-11: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 150
      },
      {
        id: 'SKILL-12',
        name: 'Kỹ năng 12: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-12: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 160
      },
      {
        id: 'SKILL-13',
        name: 'Kỹ năng 13: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-13: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 170
      },
      {
        id: 'SKILL-14',
        name: 'Kỹ năng 14: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-14: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 180
      },
      {
        id: 'SKILL-15',
        name: 'Kỹ năng 15: Nắm vững các công nghệ cốt lõi trong Kỹ thuật Phần mềm (Software Engineering)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-15: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 190
      },
    ]
  },
  {
    id: 'PATH-16',
    title: 'Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
    description: 'Chương trình đào tạo chuyên sâu hướng tới việc cung cấp nguồn nhân lực chất lượng cao trong lĩnh vực Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI), đáp ứng tiêu chuẩn của các tập đoàn công nghệ toàn cầu.',
    targetRoles: ['Kỹ sư phát triển', 'Chuyên gia giải pháp', 'Trưởng nhóm kỹ thuật'],
    requiredCredits: 135,
    skills: [
      {
        id: 'SKILL-16',
        name: 'Kỹ năng 1: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-16: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 50
      },
      {
        id: 'SKILL-17',
        name: 'Kỹ năng 2: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-17: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 60
      },
      {
        id: 'SKILL-18',
        name: 'Kỹ năng 3: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-18: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 70
      },
      {
        id: 'SKILL-19',
        name: 'Kỹ năng 4: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-19: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 80
      },
      {
        id: 'SKILL-20',
        name: 'Kỹ năng 5: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-20: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 90
      },
      {
        id: 'SKILL-21',
        name: 'Kỹ năng 6: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-21: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 100
      },
      {
        id: 'SKILL-22',
        name: 'Kỹ năng 7: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-22: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 110
      },
      {
        id: 'SKILL-23',
        name: 'Kỹ năng 8: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-23: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 120
      },
      {
        id: 'SKILL-24',
        name: 'Kỹ năng 9: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-24: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 130
      },
      {
        id: 'SKILL-25',
        name: 'Kỹ năng 10: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-25: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 140
      },
      {
        id: 'SKILL-26',
        name: 'Kỹ năng 11: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-26: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 150
      },
      {
        id: 'SKILL-27',
        name: 'Kỹ năng 12: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-27: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 160
      },
      {
        id: 'SKILL-28',
        name: 'Kỹ năng 13: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-28: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 170
      },
      {
        id: 'SKILL-29',
        name: 'Kỹ năng 14: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-29: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 180
      },
      {
        id: 'SKILL-30',
        name: 'Kỹ năng 15: Nắm vững các công nghệ cốt lõi trong Khoa học Dữ liệu & Trí tuệ Nhân tạo (Data Science & AI)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-30: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 190
      },
    ]
  },
  {
    id: 'PATH-31',
    title: 'Điện toán Đám mây & DevOps (Cloud & DevOps)',
    description: 'Chương trình đào tạo chuyên sâu hướng tới việc cung cấp nguồn nhân lực chất lượng cao trong lĩnh vực Điện toán Đám mây & DevOps (Cloud & DevOps), đáp ứng tiêu chuẩn của các tập đoàn công nghệ toàn cầu.',
    targetRoles: ['Kỹ sư phát triển', 'Chuyên gia giải pháp', 'Trưởng nhóm kỹ thuật'],
    requiredCredits: 135,
    skills: [
      {
        id: 'SKILL-31',
        name: 'Kỹ năng 1: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-31: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 50
      },
      {
        id: 'SKILL-32',
        name: 'Kỹ năng 2: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-32: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 60
      },
      {
        id: 'SKILL-33',
        name: 'Kỹ năng 3: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-33: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 70
      },
      {
        id: 'SKILL-34',
        name: 'Kỹ năng 4: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-34: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 80
      },
      {
        id: 'SKILL-35',
        name: 'Kỹ năng 5: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-35: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 90
      },
      {
        id: 'SKILL-36',
        name: 'Kỹ năng 6: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-36: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 100
      },
      {
        id: 'SKILL-37',
        name: 'Kỹ năng 7: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-37: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 110
      },
      {
        id: 'SKILL-38',
        name: 'Kỹ năng 8: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-38: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 120
      },
      {
        id: 'SKILL-39',
        name: 'Kỹ năng 9: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-39: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 130
      },
      {
        id: 'SKILL-40',
        name: 'Kỹ năng 10: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-40: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 140
      },
      {
        id: 'SKILL-41',
        name: 'Kỹ năng 11: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-41: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 150
      },
      {
        id: 'SKILL-42',
        name: 'Kỹ năng 12: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-42: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 160
      },
      {
        id: 'SKILL-43',
        name: 'Kỹ năng 13: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-43: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 170
      },
      {
        id: 'SKILL-44',
        name: 'Kỹ năng 14: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-44: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 180
      },
      {
        id: 'SKILL-45',
        name: 'Kỹ năng 15: Nắm vững các công nghệ cốt lõi trong Điện toán Đám mây & DevOps (Cloud & DevOps)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-45: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 190
      },
    ]
  },
  {
    id: 'PATH-46',
    title: 'An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
    description: 'Chương trình đào tạo chuyên sâu hướng tới việc cung cấp nguồn nhân lực chất lượng cao trong lĩnh vực An toàn Thông tin & Tác chiến Mạng (Cybersecurity), đáp ứng tiêu chuẩn của các tập đoàn công nghệ toàn cầu.',
    targetRoles: ['Kỹ sư phát triển', 'Chuyên gia giải pháp', 'Trưởng nhóm kỹ thuật'],
    requiredCredits: 135,
    skills: [
      {
        id: 'SKILL-46',
        name: 'Kỹ năng 1: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-46: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 50
      },
      {
        id: 'SKILL-47',
        name: 'Kỹ năng 2: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-47: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 60
      },
      {
        id: 'SKILL-48',
        name: 'Kỹ năng 3: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-48: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 70
      },
      {
        id: 'SKILL-49',
        name: 'Kỹ năng 4: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-49: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 80
      },
      {
        id: 'SKILL-50',
        name: 'Kỹ năng 5: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-50: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 90
      },
      {
        id: 'SKILL-51',
        name: 'Kỹ năng 6: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-51: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 100
      },
      {
        id: 'SKILL-52',
        name: 'Kỹ năng 7: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-52: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 110
      },
      {
        id: 'SKILL-53',
        name: 'Kỹ năng 8: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-53: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 120
      },
      {
        id: 'SKILL-54',
        name: 'Kỹ năng 9: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-54: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 130
      },
      {
        id: 'SKILL-55',
        name: 'Kỹ năng 10: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-55: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 140
      },
      {
        id: 'SKILL-56',
        name: 'Kỹ năng 11: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-56: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 150
      },
      {
        id: 'SKILL-57',
        name: 'Kỹ năng 12: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-57: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 160
      },
      {
        id: 'SKILL-58',
        name: 'Kỹ năng 13: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-58: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 170
      },
      {
        id: 'SKILL-59',
        name: 'Kỹ năng 14: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-59: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 180
      },
      {
        id: 'SKILL-60',
        name: 'Kỹ năng 15: Nắm vững các công nghệ cốt lõi trong An toàn Thông tin & Tác chiến Mạng (Cybersecurity)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-60: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 190
      },
    ]
  },
  {
    id: 'PATH-61',
    title: 'Phát triển Ứng dụng Di động (Mobile Development)',
    description: 'Chương trình đào tạo chuyên sâu hướng tới việc cung cấp nguồn nhân lực chất lượng cao trong lĩnh vực Phát triển Ứng dụng Di động (Mobile Development), đáp ứng tiêu chuẩn của các tập đoàn công nghệ toàn cầu.',
    targetRoles: ['Kỹ sư phát triển', 'Chuyên gia giải pháp', 'Trưởng nhóm kỹ thuật'],
    requiredCredits: 135,
    skills: [
      {
        id: 'SKILL-61',
        name: 'Kỹ năng 1: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-61: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 50
      },
      {
        id: 'SKILL-62',
        name: 'Kỹ năng 2: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-62: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 60
      },
      {
        id: 'SKILL-63',
        name: 'Kỹ năng 3: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-63: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 70
      },
      {
        id: 'SKILL-64',
        name: 'Kỹ năng 4: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-64: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 80
      },
      {
        id: 'SKILL-65',
        name: 'Kỹ năng 5: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-65: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 90
      },
      {
        id: 'SKILL-66',
        name: 'Kỹ năng 6: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-66: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 100
      },
      {
        id: 'SKILL-67',
        name: 'Kỹ năng 7: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-67: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 110
      },
      {
        id: 'SKILL-68',
        name: 'Kỹ năng 8: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-68: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 120
      },
      {
        id: 'SKILL-69',
        name: 'Kỹ năng 9: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-69: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 130
      },
      {
        id: 'SKILL-70',
        name: 'Kỹ năng 10: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-70: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 140
      },
      {
        id: 'SKILL-71',
        name: 'Kỹ năng 11: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-71: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 150
      },
      {
        id: 'SKILL-72',
        name: 'Kỹ năng 12: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-72: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 160
      },
      {
        id: 'SKILL-73',
        name: 'Kỹ năng 13: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-73: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 170
      },
      {
        id: 'SKILL-74',
        name: 'Kỹ năng 14: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-74: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 180
      },
      {
        id: 'SKILL-75',
        name: 'Kỹ năng 15: Nắm vững các công nghệ cốt lõi trong Phát triển Ứng dụng Di động (Mobile Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-75: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 190
      },
    ]
  },
  {
    id: 'PATH-76',
    title: 'Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
    description: 'Chương trình đào tạo chuyên sâu hướng tới việc cung cấp nguồn nhân lực chất lượng cao trong lĩnh vực Hệ thống Nhúng & Internet of Things (Embedded & IoT), đáp ứng tiêu chuẩn của các tập đoàn công nghệ toàn cầu.',
    targetRoles: ['Kỹ sư phát triển', 'Chuyên gia giải pháp', 'Trưởng nhóm kỹ thuật'],
    requiredCredits: 135,
    skills: [
      {
        id: 'SKILL-76',
        name: 'Kỹ năng 1: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-76: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 50
      },
      {
        id: 'SKILL-77',
        name: 'Kỹ năng 2: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-77: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 60
      },
      {
        id: 'SKILL-78',
        name: 'Kỹ năng 3: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-78: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 70
      },
      {
        id: 'SKILL-79',
        name: 'Kỹ năng 4: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-79: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 80
      },
      {
        id: 'SKILL-80',
        name: 'Kỹ năng 5: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-80: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 90
      },
      {
        id: 'SKILL-81',
        name: 'Kỹ năng 6: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-81: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 100
      },
      {
        id: 'SKILL-82',
        name: 'Kỹ năng 7: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-82: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 110
      },
      {
        id: 'SKILL-83',
        name: 'Kỹ năng 8: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-83: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 120
      },
      {
        id: 'SKILL-84',
        name: 'Kỹ năng 9: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-84: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 130
      },
      {
        id: 'SKILL-85',
        name: 'Kỹ năng 10: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-85: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 140
      },
      {
        id: 'SKILL-86',
        name: 'Kỹ năng 11: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-86: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 150
      },
      {
        id: 'SKILL-87',
        name: 'Kỹ năng 12: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-87: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 160
      },
      {
        id: 'SKILL-88',
        name: 'Kỹ năng 13: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-88: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 170
      },
      {
        id: 'SKILL-89',
        name: 'Kỹ năng 14: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-89: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 180
      },
      {
        id: 'SKILL-90',
        name: 'Kỹ năng 15: Nắm vững các công nghệ cốt lõi trong Hệ thống Nhúng & Internet of Things (Embedded & IoT)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-90: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 190
      },
    ]
  },
  {
    id: 'PATH-91',
    title: 'Phát triển Trò chơi Điện tử (Game Development)',
    description: 'Chương trình đào tạo chuyên sâu hướng tới việc cung cấp nguồn nhân lực chất lượng cao trong lĩnh vực Phát triển Trò chơi Điện tử (Game Development), đáp ứng tiêu chuẩn của các tập đoàn công nghệ toàn cầu.',
    targetRoles: ['Kỹ sư phát triển', 'Chuyên gia giải pháp', 'Trưởng nhóm kỹ thuật'],
    requiredCredits: 135,
    skills: [
      {
        id: 'SKILL-91',
        name: 'Kỹ năng 1: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-91: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 50
      },
      {
        id: 'SKILL-92',
        name: 'Kỹ năng 2: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-92: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 60
      },
      {
        id: 'SKILL-93',
        name: 'Kỹ năng 3: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-93: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 70
      },
      {
        id: 'SKILL-94',
        name: 'Kỹ năng 4: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-94: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 80
      },
      {
        id: 'SKILL-95',
        name: 'Kỹ năng 5: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-95: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 90
      },
      {
        id: 'SKILL-96',
        name: 'Kỹ năng 6: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-96: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 100
      },
      {
        id: 'SKILL-97',
        name: 'Kỹ năng 7: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-97: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 110
      },
      {
        id: 'SKILL-98',
        name: 'Kỹ năng 8: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-98: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 120
      },
      {
        id: 'SKILL-99',
        name: 'Kỹ năng 9: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-99: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 130
      },
      {
        id: 'SKILL-100',
        name: 'Kỹ năng 10: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-100: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 140
      },
      {
        id: 'SKILL-101',
        name: 'Kỹ năng 11: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-101: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 150
      },
      {
        id: 'SKILL-102',
        name: 'Kỹ năng 12: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-102: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 160
      },
      {
        id: 'SKILL-103',
        name: 'Kỹ năng 13: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-103: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 170
      },
      {
        id: 'SKILL-104',
        name: 'Kỹ năng 14: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-104: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 180
      },
      {
        id: 'SKILL-105',
        name: 'Kỹ năng 15: Nắm vững các công nghệ cốt lõi trong Phát triển Trò chơi Điện tử (Game Development)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-105: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 190
      },
    ]
  },
  {
    id: 'PATH-106',
    title: 'Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
    description: 'Chương trình đào tạo chuyên sâu hướng tới việc cung cấp nguồn nhân lực chất lượng cao trong lĩnh vực Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems), đáp ứng tiêu chuẩn của các tập đoàn công nghệ toàn cầu.',
    targetRoles: ['Kỹ sư phát triển', 'Chuyên gia giải pháp', 'Trưởng nhóm kỹ thuật'],
    requiredCredits: 135,
    skills: [
      {
        id: 'SKILL-106',
        name: 'Kỹ năng 1: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-106: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 50
      },
      {
        id: 'SKILL-107',
        name: 'Kỹ năng 2: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-107: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 60
      },
      {
        id: 'SKILL-108',
        name: 'Kỹ năng 3: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'NỀN TẢNG',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-108: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 70
      },
      {
        id: 'SKILL-109',
        name: 'Kỹ năng 4: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-109: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 80
      },
      {
        id: 'SKILL-110',
        name: 'Kỹ năng 5: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-110: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 90
      },
      {
        id: 'SKILL-111',
        name: 'Kỹ năng 6: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CƠ SỞ',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-111: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 100
      },
      {
        id: 'SKILL-112',
        name: 'Kỹ năng 7: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-112: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 110
      },
      {
        id: 'SKILL-113',
        name: 'Kỹ năng 8: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-113: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 120
      },
      {
        id: 'SKILL-114',
        name: 'Kỹ năng 9: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-114: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 130
      },
      {
        id: 'SKILL-115',
        name: 'Kỹ năng 10: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'CHUYÊN SÂU',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-115: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 140
      },
      {
        id: 'SKILL-116',
        name: 'Kỹ năng 11: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-116: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 150
      },
      {
        id: 'SKILL-117',
        name: 'Kỹ năng 12: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-117: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 160
      },
      {
        id: 'SKILL-118',
        name: 'Kỹ năng 13: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-118: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 170
      },
      {
        id: 'SKILL-119',
        name: 'Kỹ năng 14: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-119: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 180
      },
      {
        id: 'SKILL-120',
        name: 'Kỹ năng 15: Nắm vững các công nghệ cốt lõi trong Hệ thống Thông tin Doanh nghiệp (Enterprise Information Systems)',
        category: 'Kỹ năng Kỹ thuật',
        level: 'THỰC CHIẾN',
        prerequisites: ['Toán rời rạc', 'Lập trình căn bản'],
        recommendedCourses: ['INT1001', 'INT1002', 'INT1003'],
        description: 'Mô tả chi tiết kỹ năng SKILL-120: Sinh viên cần hiểu rõ kiến trúc, triển khai được các dự án mẫu và vượt qua các bài đánh giá năng lực tương ứng.',
        estimatedHours: 190
      },
    ]
  },
];

export function getPathById(id: string): CareerPath | undefined {
  return CAREER_PATHS.find((p) => p.id === id);
}
