/**
 * Khung chương trình đào tạo chuẩn và nội dung bài học chi tiết của các học phần CNTT.
 * Được sử dụng cho việc hiển thị đề cương môn học, tài liệu tham khảo và kế hoạch học tập.
 */

export interface LessonPlan {
  week: number;
  title: string;
  objectives: string[];
  readingMaterial: string;
  assignment: string;
  hasLab: boolean;
}

export interface CurriculumTemplate {
  code: string;
  name: string;
  credits: number;
  department: string;
  description: string;
  prerequisites: string[];
  learningOutcomes: string[];
  weeks: LessonPlan[];
}

export const CURRICULUM_TEMPLATES: CurriculumTemplate[] = [
  {
    code: 'INT1001',
    name: 'Nhập môn Lập trình C/C++',
    credits: 3,
    department: 'Khoa học Máy tính',
    description: 'Học phần "Nhập môn Lập trình C/C++" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Nhập môn Lập trình C/C++',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1002',
    name: 'Lập trình Hướng đối tượng Java',
    credits: 4,
    department: 'Khoa học Máy tính',
    description: 'Học phần "Lập trình Hướng đối tượng Java" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Hướng đối tượng Java',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1003',
    name: 'Cấu trúc Dữ liệu và Giải thuật',
    credits: 4,
    department: 'Khoa học Máy tính',
    description: 'Học phần "Cấu trúc Dữ liệu và Giải thuật" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Cấu trúc Dữ liệu và Giải thuật',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1004',
    name: 'Cơ sở Dữ liệu Quan hệ & SQL',
    credits: 3,
    department: 'Hệ thống Thông tin',
    description: 'Học phần "Cơ sở Dữ liệu Quan hệ & SQL" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Cơ sở Dữ liệu Quan hệ & SQL',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1005',
    name: 'Mạng Máy tính và Truyền số liệu',
    credits: 3,
    department: 'Mạng & An toàn',
    description: 'Học phần "Mạng Máy tính và Truyền số liệu" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Mạng Máy tính và Truyền số liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1006',
    name: 'Nguyên lý Hệ điều hành Linux',
    credits: 3,
    department: 'Hệ thống Máy tính',
    description: 'Học phần "Nguyên lý Hệ điều hành Linux" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Nguyên lý Hệ điều hành Linux',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1007',
    name: 'Lập trình Ứng dụng Web Hiện đại',
    credits: 4,
    department: 'Công nghệ Phần mềm',
    description: 'Học phần "Lập trình Ứng dụng Web Hiện đại" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Lập trình Ứng dụng Web Hiện đại',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1008',
    name: 'Kiến trúc và Thiết kế Phần mềm',
    credits: 3,
    department: 'Công nghệ Phần mềm',
    description: 'Học phần "Kiến trúc và Thiết kế Phần mềm" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Kiến trúc và Thiết kế Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1009',
    name: 'Trí tuệ Nhân tạo Cơ bản',
    credits: 3,
    department: 'Khoa học Dữ liệu',
    description: 'Học phần "Trí tuệ Nhân tạo Cơ bản" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Trí tuệ Nhân tạo Cơ bản',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1010',
    name: 'Học máy và Khai phá Dữ liệu',
    credits: 4,
    department: 'Khoa học Dữ liệu',
    description: 'Học phần "Học máy và Khai phá Dữ liệu" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Học máy và Khai phá Dữ liệu',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1011',
    name: 'An toàn và Bảo mật Hệ thống',
    credits: 3,
    department: 'Mạng & An toàn',
    description: 'Học phần "An toàn và Bảo mật Hệ thống" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của An toàn và Bảo mật Hệ thống',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1012',
    name: 'Phát triển Ứng dụng Di động Flutter/React Native',
    credits: 3,
    department: 'Công nghệ Phần mềm',
    description: 'Học phần "Phát triển Ứng dụng Di động Flutter/React Native" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Phát triển Ứng dụng Di động Flutter/React Native',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1013',
    name: 'Điện toán Đám mây và DevOps',
    credits: 3,
    department: 'Hệ thống Máy tính',
    description: 'Học phần "Điện toán Đám mây và DevOps" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Điện toán Đám mây và DevOps',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1014',
    name: 'Xử lý Ngôn ngữ Tự nhiên',
    credits: 3,
    department: 'Khoa học Dữ liệu',
    description: 'Học phần "Xử lý Ngôn ngữ Tự nhiên" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Xử lý Ngôn ngữ Tự nhiên',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
  {
    code: 'INT1015',
    name: 'Kiểm thử và Đảm bảo Chất lượng Phần mềm',
    credits: 3,
    department: 'Công nghệ Phần mềm',
    description: 'Học phần "Kiểm thử và Đảm bảo Chất lượng Phần mềm" cung cấp kiến thức nền tảng và nâng cao, trang bị cho sinh viên kỹ năng thực hành, giải quyết bài toán thực tế và chuẩn bị cho các dự án chuyên sâu.',
    prerequisites: ['Toán rời rạc', 'Giải tích cơ bản'],
    learningOutcomes: [
      'Nắm vững kiến thức cốt lõi và nguyên lý hoạt động của môn học.',
      'Có khả năng thiết kế, cài đặt và phân tích các giải pháp kỹ thuật.',
      'Sử dụng thành thạo các công cụ phát triển hiện đại và thư viện chuẩn.',
      'Rèn luyện tư duy phản biện, kỹ năng làm việc nhóm và giải quyết vấn đề.'
    ],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chuyên đề 1 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 1.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 1, slide bài giảng tuần 1 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 1: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 2,
        title: 'Tuần 2: Chuyên đề 2 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 2.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 2, slide bài giảng tuần 2 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 2: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 3,
        title: 'Tuần 3: Chuyên đề 3 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 3.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 3, slide bài giảng tuần 3 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 3: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 4,
        title: 'Tuần 4: Chuyên đề 4 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 4.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 4, slide bài giảng tuần 4 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 4: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 5,
        title: 'Tuần 5: Chuyên đề 5 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 5.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 5, slide bài giảng tuần 5 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 5: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 6,
        title: 'Tuần 6: Chuyên đề 6 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 6.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 6, slide bài giảng tuần 6 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 6: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 7,
        title: 'Tuần 7: Chuyên đề 7 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 7.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 7, slide bài giảng tuần 7 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 7: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 8,
        title: 'Tuần 8: Chuyên đề 8 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 8.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 8, slide bài giảng tuần 8 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 8: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 9,
        title: 'Tuần 9: Chuyên đề 9 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 9.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 9, slide bài giảng tuần 9 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 9: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 10,
        title: 'Tuần 10: Chuyên đề 10 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 10.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 10, slide bài giảng tuần 10 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 10: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 11,
        title: 'Tuần 11: Chuyên đề 11 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 11.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 11, slide bài giảng tuần 11 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 11: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 12,
        title: 'Tuần 12: Chuyên đề 12 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 12.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 12, slide bài giảng tuần 12 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 12: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 13,
        title: 'Tuần 13: Chuyên đề 13 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 13.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 13, slide bài giảng tuần 13 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 13: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
      {
        week: 14,
        title: 'Tuần 14: Chuyên đề 14 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 14.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 14, slide bài giảng tuần 14 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 14: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: true
      },
      {
        week: 15,
        title: 'Tuần 15: Chuyên đề 15 - Giới thiệu và Ứng dụng thực tiễn của Kiểm thử và Đảm bảo Chất lượng Phần mềm',
        objectives: [
          'Hiểu rõ khái niệm và phạm vi áp dụng của bài học tuần 15.',
          'Nắm bắt quy trình triển khai và các kịch bản thực tế.',
          'Phân tích ưu nhược điểm của các giải pháp kỹ thuật liên quan.'
        ],
        readingMaterial: 'Giáo trình chương 15, slide bài giảng tuần 15 và tài liệu tham khảo quốc tế.',
        assignment: 'Bài tập về nhà tuần 15: Cài đặt chương trình và viết báo cáo phân tích kết quả thử nghiệm.',
        hasLab: false
      },
    ]
  },
];

export function getCurriculumByCode(code: string): CurriculumTemplate | undefined {
  return CURRICULUM_TEMPLATES.find((c) => c.code.toLowerCase() === code.toLowerCase());
}
