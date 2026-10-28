/**
 * Danh mục huy hiệu và thành tích học tập (Gamification Badges Catalog).
 * Khuyến khích sinh viên duy trì chuỗi học tập, giải bài tập lập trình và tương tác tích cực.
 */

export interface StudentBadge {
  id: string;
  name: string;
  category: string;
  tier: 'ĐỒNG' | 'BẠC' | 'VÀNG' | 'BẠCH KIM' | 'KIM CƯƠNG';
  xpReward: number;
  iconName: string;
  description: string;
  criteria: string;
}

export const STUDENT_BADGES: StudentBadge[] = [
  {
    id: 'BADGE-001',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 1',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'ĐỒNG',
    xpReward: 150,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 1 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 5 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-002',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 2',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'ĐỒNG',
    xpReward: 300,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 2 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 10 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-003',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 3',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'ĐỒNG',
    xpReward: 450,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 3 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 15 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-004',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 4',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'ĐỒNG',
    xpReward: 600,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 4 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 20 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-005',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 5',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'BẠC',
    xpReward: 750,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 5 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 25 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-006',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 6',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'BẠC',
    xpReward: 900,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 6 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 30 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-007',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 7',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'BẠC',
    xpReward: 1050,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 7 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 35 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-008',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 8',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'BẠC',
    xpReward: 1200,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 8 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 40 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-009',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 9',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'VÀNG',
    xpReward: 1350,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 9 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 45 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-010',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 10',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'VÀNG',
    xpReward: 1500,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 10 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 50 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-011',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 11',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'VÀNG',
    xpReward: 1650,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 11 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 55 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-012',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 12',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'VÀNG',
    xpReward: 1800,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 12 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 60 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-013',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 13',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'BẠCH KIM',
    xpReward: 1950,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 13 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 65 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-014',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 14',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'BẠCH KIM',
    xpReward: 2100,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 14 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 70 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-015',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 15',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'BẠCH KIM',
    xpReward: 2250,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 15 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 75 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-016',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 16',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'BẠCH KIM',
    xpReward: 2400,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 16 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 80 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-017',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 17',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'KIM CƯƠNG',
    xpReward: 2550,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 17 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 85 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-018',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 18',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'KIM CƯƠNG',
    xpReward: 2700,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 18 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 90 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-019',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 19',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'KIM CƯƠNG',
    xpReward: 2850,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 19 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 95 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-020',
    name: 'Huy hiệu HỌC TẬP CHUYÊN CẦN cấp 20',
    category: 'HỌC TẬP CHUYÊN CẦN',
    tier: 'KIM CƯƠNG',
    xpReward: 3000,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 20 trong nhóm hoạt động HỌC TẬP CHUYÊN CẦN.',
    criteria: 'Hoàn thành ít nhất 100 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-021',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 1',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'ĐỒNG',
    xpReward: 150,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 1 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 5 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-022',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 2',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'ĐỒNG',
    xpReward: 300,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 2 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 10 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-023',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 3',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'ĐỒNG',
    xpReward: 450,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 3 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 15 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-024',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 4',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'ĐỒNG',
    xpReward: 600,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 4 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 20 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-025',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 5',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'BẠC',
    xpReward: 750,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 5 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 25 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-026',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 6',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'BẠC',
    xpReward: 900,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 6 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 30 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-027',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 7',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'BẠC',
    xpReward: 1050,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 7 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 35 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-028',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 8',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'BẠC',
    xpReward: 1200,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 8 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 40 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-029',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 9',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'VÀNG',
    xpReward: 1350,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 9 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 45 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-030',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 10',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'VÀNG',
    xpReward: 1500,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 10 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 50 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-031',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 11',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'VÀNG',
    xpReward: 1650,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 11 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 55 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-032',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 12',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'VÀNG',
    xpReward: 1800,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 12 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 60 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-033',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 13',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'BẠCH KIM',
    xpReward: 1950,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 13 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 65 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-034',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 14',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'BẠCH KIM',
    xpReward: 2100,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 14 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 70 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-035',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 15',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'BẠCH KIM',
    xpReward: 2250,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 15 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 75 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-036',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 16',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'BẠCH KIM',
    xpReward: 2400,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 16 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 80 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-037',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 17',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'KIM CƯƠNG',
    xpReward: 2550,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 17 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 85 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-038',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 18',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'KIM CƯƠNG',
    xpReward: 2700,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 18 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 90 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-039',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 19',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'KIM CƯƠNG',
    xpReward: 2850,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 19 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 95 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-040',
    name: 'Huy hiệu LẬP TRÌNH XUẤT SẮC cấp 20',
    category: 'LẬP TRÌNH XUẤT SẮC',
    tier: 'KIM CƯƠNG',
    xpReward: 3000,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 20 trong nhóm hoạt động LẬP TRÌNH XUẤT SẮC.',
    criteria: 'Hoàn thành ít nhất 100 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-041',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 1',
    category: 'THỰC HÀNH LAB',
    tier: 'ĐỒNG',
    xpReward: 150,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 1 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 5 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-042',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 2',
    category: 'THỰC HÀNH LAB',
    tier: 'ĐỒNG',
    xpReward: 300,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 2 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 10 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-043',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 3',
    category: 'THỰC HÀNH LAB',
    tier: 'ĐỒNG',
    xpReward: 450,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 3 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 15 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-044',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 4',
    category: 'THỰC HÀNH LAB',
    tier: 'ĐỒNG',
    xpReward: 600,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 4 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 20 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-045',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 5',
    category: 'THỰC HÀNH LAB',
    tier: 'BẠC',
    xpReward: 750,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 5 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 25 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-046',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 6',
    category: 'THỰC HÀNH LAB',
    tier: 'BẠC',
    xpReward: 900,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 6 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 30 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-047',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 7',
    category: 'THỰC HÀNH LAB',
    tier: 'BẠC',
    xpReward: 1050,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 7 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 35 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-048',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 8',
    category: 'THỰC HÀNH LAB',
    tier: 'BẠC',
    xpReward: 1200,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 8 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 40 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-049',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 9',
    category: 'THỰC HÀNH LAB',
    tier: 'VÀNG',
    xpReward: 1350,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 9 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 45 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-050',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 10',
    category: 'THỰC HÀNH LAB',
    tier: 'VÀNG',
    xpReward: 1500,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 10 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 50 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-051',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 11',
    category: 'THỰC HÀNH LAB',
    tier: 'VÀNG',
    xpReward: 1650,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 11 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 55 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-052',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 12',
    category: 'THỰC HÀNH LAB',
    tier: 'VÀNG',
    xpReward: 1800,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 12 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 60 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-053',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 13',
    category: 'THỰC HÀNH LAB',
    tier: 'BẠCH KIM',
    xpReward: 1950,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 13 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 65 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-054',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 14',
    category: 'THỰC HÀNH LAB',
    tier: 'BẠCH KIM',
    xpReward: 2100,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 14 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 70 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-055',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 15',
    category: 'THỰC HÀNH LAB',
    tier: 'BẠCH KIM',
    xpReward: 2250,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 15 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 75 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-056',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 16',
    category: 'THỰC HÀNH LAB',
    tier: 'BẠCH KIM',
    xpReward: 2400,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 16 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 80 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-057',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 17',
    category: 'THỰC HÀNH LAB',
    tier: 'KIM CƯƠNG',
    xpReward: 2550,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 17 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 85 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-058',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 18',
    category: 'THỰC HÀNH LAB',
    tier: 'KIM CƯƠNG',
    xpReward: 2700,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 18 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 90 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-059',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 19',
    category: 'THỰC HÀNH LAB',
    tier: 'KIM CƯƠNG',
    xpReward: 2850,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 19 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 95 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-060',
    name: 'Huy hiệu THỰC HÀNH LAB cấp 20',
    category: 'THỰC HÀNH LAB',
    tier: 'KIM CƯƠNG',
    xpReward: 3000,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 20 trong nhóm hoạt động THỰC HÀNH LAB.',
    criteria: 'Hoàn thành ít nhất 100 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-061',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 1',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'ĐỒNG',
    xpReward: 150,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 1 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 5 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-062',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 2',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'ĐỒNG',
    xpReward: 300,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 2 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 10 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-063',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 3',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'ĐỒNG',
    xpReward: 450,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 3 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 15 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-064',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 4',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'ĐỒNG',
    xpReward: 600,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 4 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 20 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-065',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 5',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'BẠC',
    xpReward: 750,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 5 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 25 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-066',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 6',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'BẠC',
    xpReward: 900,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 6 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 30 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-067',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 7',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'BẠC',
    xpReward: 1050,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 7 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 35 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-068',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 8',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'BẠC',
    xpReward: 1200,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 8 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 40 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-069',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 9',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'VÀNG',
    xpReward: 1350,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 9 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 45 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-070',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 10',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'VÀNG',
    xpReward: 1500,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 10 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 50 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-071',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 11',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'VÀNG',
    xpReward: 1650,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 11 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 55 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-072',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 12',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'VÀNG',
    xpReward: 1800,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 12 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 60 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-073',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 13',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'BẠCH KIM',
    xpReward: 1950,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 13 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 65 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-074',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 14',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'BẠCH KIM',
    xpReward: 2100,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 14 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 70 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-075',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 15',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'BẠCH KIM',
    xpReward: 2250,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 15 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 75 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-076',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 16',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'BẠCH KIM',
    xpReward: 2400,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 16 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 80 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-077',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 17',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'KIM CƯƠNG',
    xpReward: 2550,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 17 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 85 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-078',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 18',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'KIM CƯƠNG',
    xpReward: 2700,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 18 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 90 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-079',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 19',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'KIM CƯƠNG',
    xpReward: 2850,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 19 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 95 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-080',
    name: 'Huy hiệu ĐỒ HỌA & THIẾT KẾ cấp 20',
    category: 'ĐỒ HỌA & THIẾT KẾ',
    tier: 'KIM CƯƠNG',
    xpReward: 3000,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 20 trong nhóm hoạt động ĐỒ HỌA & THIẾT KẾ.',
    criteria: 'Hoàn thành ít nhất 100 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-081',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 1',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'ĐỒNG',
    xpReward: 150,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 1 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 5 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-082',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 2',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'ĐỒNG',
    xpReward: 300,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 2 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 10 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-083',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 3',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'ĐỒNG',
    xpReward: 450,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 3 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 15 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-084',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 4',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'ĐỒNG',
    xpReward: 600,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 4 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 20 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-085',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 5',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'BẠC',
    xpReward: 750,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 5 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 25 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-086',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 6',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'BẠC',
    xpReward: 900,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 6 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 30 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-087',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 7',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'BẠC',
    xpReward: 1050,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 7 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 35 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-088',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 8',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'BẠC',
    xpReward: 1200,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 8 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 40 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-089',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 9',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'VÀNG',
    xpReward: 1350,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 9 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 45 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-090',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 10',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'VÀNG',
    xpReward: 1500,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 10 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 50 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-091',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 11',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'VÀNG',
    xpReward: 1650,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 11 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 55 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-092',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 12',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'VÀNG',
    xpReward: 1800,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 12 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 60 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-093',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 13',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'BẠCH KIM',
    xpReward: 1950,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 13 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 65 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-094',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 14',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'BẠCH KIM',
    xpReward: 2100,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 14 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 70 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-095',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 15',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'BẠCH KIM',
    xpReward: 2250,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 15 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 75 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-096',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 16',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'BẠCH KIM',
    xpReward: 2400,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 16 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 80 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-097',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 17',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'KIM CƯƠNG',
    xpReward: 2550,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 17 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 85 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-098',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 18',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'KIM CƯƠNG',
    xpReward: 2700,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 18 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 90 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-099',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 19',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'KIM CƯƠNG',
    xpReward: 2850,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 19 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 95 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
  {
    id: 'BADGE-100',
    name: 'Huy hiệu HOẠT ĐỘNG CỘNG ĐỒNG cấp 20',
    category: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    tier: 'KIM CƯƠNG',
    xpReward: 3000,
    iconName: 'Award',
    description: 'Vinh danh sinh viên đạt cột mốc xuất sắc số 20 trong nhóm hoạt động HOẠT ĐỘNG CỘNG ĐỒNG.',
    criteria: 'Hoàn thành ít nhất 100 nhiệm vụ học tập hoặc đạt điểm tối đa trong các kỳ đánh giá liên quan.'
  },
];

export function getBadgesByTier(tier: string): StudentBadge[] {
  return STUDENT_BADGES.filter((b) => b.tier === tier);
}
