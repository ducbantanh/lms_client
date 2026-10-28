/**
 * Bộ dữ liệu giả lập phong phú cho việc chạy thử nghiệm giao diện,
 * preview các bảng số liệu, danh sách bài nộp và báo cáo giảng dạy.
 */

export interface MockStudent {
  id: string;
  studentCode: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  classGroup: string;
  gpa: number;
  completedCredits: number;
  status: 'ACTIVE' | 'WARNING' | 'GRADUATED';
}

export const MOCK_STUDENTS: MockStudent[] = [
  {
    id: 'std-1',
    studentCode: 'SV20260001',
    fullName: 'Sinh Viên Số 1 Nguyễn Văn A',
    email: 'sv20260001@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.6,
    completedCredits: 81,
    status: 'ACTIVE'
  },
  {
    id: 'std-2',
    studentCode: 'SV20260002',
    fullName: 'Sinh Viên Số 2 Nguyễn Văn A',
    email: 'sv20260002@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 2.7,
    completedCredits: 82,
    status: 'ACTIVE'
  },
  {
    id: 'std-3',
    studentCode: 'SV20260003',
    fullName: 'Sinh Viên Số 3 Nguyễn Văn A',
    email: 'sv20260003@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.8,
    completedCredits: 83,
    status: 'ACTIVE'
  },
  {
    id: 'std-4',
    studentCode: 'SV20260004',
    fullName: 'Sinh Viên Số 4 Nguyễn Văn A',
    email: 'sv20260004@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.9,
    completedCredits: 84,
    status: 'ACTIVE'
  },
  {
    id: 'std-5',
    studentCode: 'SV20260005',
    fullName: 'Sinh Viên Số 5 Nguyễn Văn A',
    email: 'sv20260005@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3,
    completedCredits: 85,
    status: 'ACTIVE'
  },
  {
    id: 'std-6',
    studentCode: 'SV20260006',
    fullName: 'Sinh Viên Số 6 Nguyễn Văn A',
    email: 'sv20260006@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.1,
    completedCredits: 86,
    status: 'ACTIVE'
  },
  {
    id: 'std-7',
    studentCode: 'SV20260007',
    fullName: 'Sinh Viên Số 7 Nguyễn Văn A',
    email: 'sv20260007@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.2,
    completedCredits: 87,
    status: 'ACTIVE'
  },
  {
    id: 'std-8',
    studentCode: 'SV20260008',
    fullName: 'Sinh Viên Số 8 Nguyễn Văn A',
    email: 'sv20260008@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.3,
    completedCredits: 88,
    status: 'ACTIVE'
  },
  {
    id: 'std-9',
    studentCode: 'SV20260009',
    fullName: 'Sinh Viên Số 9 Nguyễn Văn A',
    email: 'sv20260009@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.4,
    completedCredits: 89,
    status: 'ACTIVE'
  },
  {
    id: 'std-10',
    studentCode: 'SV20260010',
    fullName: 'Sinh Viên Số 10 Nguyễn Văn A',
    email: 'sv20260010@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.5,
    completedCredits: 90,
    status: 'ACTIVE'
  },
  {
    id: 'std-11',
    studentCode: 'SV20260011',
    fullName: 'Sinh Viên Số 11 Nguyễn Văn A',
    email: 'sv20260011@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.6,
    completedCredits: 91,
    status: 'ACTIVE'
  },
  {
    id: 'std-12',
    studentCode: 'SV20260012',
    fullName: 'Sinh Viên Số 12 Nguyễn Văn A',
    email: 'sv20260012@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.7,
    completedCredits: 92,
    status: 'ACTIVE'
  },
  {
    id: 'std-13',
    studentCode: 'SV20260013',
    fullName: 'Sinh Viên Số 13 Nguyễn Văn A',
    email: 'sv20260013@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.8,
    completedCredits: 93,
    status: 'ACTIVE'
  },
  {
    id: 'std-14',
    studentCode: 'SV20260014',
    fullName: 'Sinh Viên Số 14 Nguyễn Văn A',
    email: 'sv20260014@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.9,
    completedCredits: 94,
    status: 'ACTIVE'
  },
  {
    id: 'std-15',
    studentCode: 'SV20260015',
    fullName: 'Sinh Viên Số 15 Nguyễn Văn A',
    email: 'sv20260015@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.5,
    completedCredits: 95,
    status: 'ACTIVE'
  },
  {
    id: 'std-16',
    studentCode: 'SV20260016',
    fullName: 'Sinh Viên Số 16 Nguyễn Văn A',
    email: 'sv20260016@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.6,
    completedCredits: 96,
    status: 'ACTIVE'
  },
  {
    id: 'std-17',
    studentCode: 'SV20260017',
    fullName: 'Sinh Viên Số 17 Nguyễn Văn A',
    email: 'sv20260017@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 2.7,
    completedCredits: 97,
    status: 'ACTIVE'
  },
  {
    id: 'std-18',
    studentCode: 'SV20260018',
    fullName: 'Sinh Viên Số 18 Nguyễn Văn A',
    email: 'sv20260018@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.8,
    completedCredits: 98,
    status: 'ACTIVE'
  },
  {
    id: 'std-19',
    studentCode: 'SV20260019',
    fullName: 'Sinh Viên Số 19 Nguyễn Văn A',
    email: 'sv20260019@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.9,
    completedCredits: 99,
    status: 'ACTIVE'
  },
  {
    id: 'std-20',
    studentCode: 'SV20260020',
    fullName: 'Sinh Viên Số 20 Nguyễn Văn A',
    email: 'sv20260020@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3,
    completedCredits: 100,
    status: 'ACTIVE'
  },
  {
    id: 'std-21',
    studentCode: 'SV20260021',
    fullName: 'Sinh Viên Số 21 Nguyễn Văn A',
    email: 'sv20260021@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.1,
    completedCredits: 101,
    status: 'ACTIVE'
  },
  {
    id: 'std-22',
    studentCode: 'SV20260022',
    fullName: 'Sinh Viên Số 22 Nguyễn Văn A',
    email: 'sv20260022@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.2,
    completedCredits: 102,
    status: 'ACTIVE'
  },
  {
    id: 'std-23',
    studentCode: 'SV20260023',
    fullName: 'Sinh Viên Số 23 Nguyễn Văn A',
    email: 'sv20260023@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.3,
    completedCredits: 103,
    status: 'ACTIVE'
  },
  {
    id: 'std-24',
    studentCode: 'SV20260024',
    fullName: 'Sinh Viên Số 24 Nguyễn Văn A',
    email: 'sv20260024@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.4,
    completedCredits: 104,
    status: 'ACTIVE'
  },
  {
    id: 'std-25',
    studentCode: 'SV20260025',
    fullName: 'Sinh Viên Số 25 Nguyễn Văn A',
    email: 'sv20260025@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.5,
    completedCredits: 105,
    status: 'ACTIVE'
  },
  {
    id: 'std-26',
    studentCode: 'SV20260026',
    fullName: 'Sinh Viên Số 26 Nguyễn Văn A',
    email: 'sv20260026@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.6,
    completedCredits: 106,
    status: 'ACTIVE'
  },
  {
    id: 'std-27',
    studentCode: 'SV20260027',
    fullName: 'Sinh Viên Số 27 Nguyễn Văn A',
    email: 'sv20260027@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.7,
    completedCredits: 107,
    status: 'ACTIVE'
  },
  {
    id: 'std-28',
    studentCode: 'SV20260028',
    fullName: 'Sinh Viên Số 28 Nguyễn Văn A',
    email: 'sv20260028@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.8,
    completedCredits: 108,
    status: 'ACTIVE'
  },
  {
    id: 'std-29',
    studentCode: 'SV20260029',
    fullName: 'Sinh Viên Số 29 Nguyễn Văn A',
    email: 'sv20260029@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.9,
    completedCredits: 109,
    status: 'ACTIVE'
  },
  {
    id: 'std-30',
    studentCode: 'SV20260030',
    fullName: 'Sinh Viên Số 30 Nguyễn Văn A',
    email: 'sv20260030@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.5,
    completedCredits: 110,
    status: 'ACTIVE'
  },
  {
    id: 'std-31',
    studentCode: 'SV20260031',
    fullName: 'Sinh Viên Số 31 Nguyễn Văn A',
    email: 'sv20260031@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.6,
    completedCredits: 111,
    status: 'ACTIVE'
  },
  {
    id: 'std-32',
    studentCode: 'SV20260032',
    fullName: 'Sinh Viên Số 32 Nguyễn Văn A',
    email: 'sv20260032@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 2.7,
    completedCredits: 112,
    status: 'ACTIVE'
  },
  {
    id: 'std-33',
    studentCode: 'SV20260033',
    fullName: 'Sinh Viên Số 33 Nguyễn Văn A',
    email: 'sv20260033@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.8,
    completedCredits: 113,
    status: 'ACTIVE'
  },
  {
    id: 'std-34',
    studentCode: 'SV20260034',
    fullName: 'Sinh Viên Số 34 Nguyễn Văn A',
    email: 'sv20260034@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.9,
    completedCredits: 114,
    status: 'ACTIVE'
  },
  {
    id: 'std-35',
    studentCode: 'SV20260035',
    fullName: 'Sinh Viên Số 35 Nguyễn Văn A',
    email: 'sv20260035@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3,
    completedCredits: 115,
    status: 'ACTIVE'
  },
  {
    id: 'std-36',
    studentCode: 'SV20260036',
    fullName: 'Sinh Viên Số 36 Nguyễn Văn A',
    email: 'sv20260036@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.1,
    completedCredits: 116,
    status: 'ACTIVE'
  },
  {
    id: 'std-37',
    studentCode: 'SV20260037',
    fullName: 'Sinh Viên Số 37 Nguyễn Văn A',
    email: 'sv20260037@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.2,
    completedCredits: 117,
    status: 'ACTIVE'
  },
  {
    id: 'std-38',
    studentCode: 'SV20260038',
    fullName: 'Sinh Viên Số 38 Nguyễn Văn A',
    email: 'sv20260038@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.3,
    completedCredits: 118,
    status: 'ACTIVE'
  },
  {
    id: 'std-39',
    studentCode: 'SV20260039',
    fullName: 'Sinh Viên Số 39 Nguyễn Văn A',
    email: 'sv20260039@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.4,
    completedCredits: 119,
    status: 'ACTIVE'
  },
  {
    id: 'std-40',
    studentCode: 'SV20260040',
    fullName: 'Sinh Viên Số 40 Nguyễn Văn A',
    email: 'sv20260040@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.5,
    completedCredits: 80,
    status: 'ACTIVE'
  },
  {
    id: 'std-41',
    studentCode: 'SV20260041',
    fullName: 'Sinh Viên Số 41 Nguyễn Văn A',
    email: 'sv20260041@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.6,
    completedCredits: 81,
    status: 'ACTIVE'
  },
  {
    id: 'std-42',
    studentCode: 'SV20260042',
    fullName: 'Sinh Viên Số 42 Nguyễn Văn A',
    email: 'sv20260042@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.7,
    completedCredits: 82,
    status: 'ACTIVE'
  },
  {
    id: 'std-43',
    studentCode: 'SV20260043',
    fullName: 'Sinh Viên Số 43 Nguyễn Văn A',
    email: 'sv20260043@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.8,
    completedCredits: 83,
    status: 'ACTIVE'
  },
  {
    id: 'std-44',
    studentCode: 'SV20260044',
    fullName: 'Sinh Viên Số 44 Nguyễn Văn A',
    email: 'sv20260044@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.9,
    completedCredits: 84,
    status: 'ACTIVE'
  },
  {
    id: 'std-45',
    studentCode: 'SV20260045',
    fullName: 'Sinh Viên Số 45 Nguyễn Văn A',
    email: 'sv20260045@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.5,
    completedCredits: 85,
    status: 'ACTIVE'
  },
  {
    id: 'std-46',
    studentCode: 'SV20260046',
    fullName: 'Sinh Viên Số 46 Nguyễn Văn A',
    email: 'sv20260046@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.6,
    completedCredits: 86,
    status: 'ACTIVE'
  },
  {
    id: 'std-47',
    studentCode: 'SV20260047',
    fullName: 'Sinh Viên Số 47 Nguyễn Văn A',
    email: 'sv20260047@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 2.7,
    completedCredits: 87,
    status: 'ACTIVE'
  },
  {
    id: 'std-48',
    studentCode: 'SV20260048',
    fullName: 'Sinh Viên Số 48 Nguyễn Văn A',
    email: 'sv20260048@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.8,
    completedCredits: 88,
    status: 'ACTIVE'
  },
  {
    id: 'std-49',
    studentCode: 'SV20260049',
    fullName: 'Sinh Viên Số 49 Nguyễn Văn A',
    email: 'sv20260049@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.9,
    completedCredits: 89,
    status: 'ACTIVE'
  },
  {
    id: 'std-50',
    studentCode: 'SV20260050',
    fullName: 'Sinh Viên Số 50 Nguyễn Văn A',
    email: 'sv20260050@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3,
    completedCredits: 90,
    status: 'ACTIVE'
  },
  {
    id: 'std-51',
    studentCode: 'SV20260051',
    fullName: 'Sinh Viên Số 51 Nguyễn Văn A',
    email: 'sv20260051@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.1,
    completedCredits: 91,
    status: 'ACTIVE'
  },
  {
    id: 'std-52',
    studentCode: 'SV20260052',
    fullName: 'Sinh Viên Số 52 Nguyễn Văn A',
    email: 'sv20260052@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.2,
    completedCredits: 92,
    status: 'ACTIVE'
  },
  {
    id: 'std-53',
    studentCode: 'SV20260053',
    fullName: 'Sinh Viên Số 53 Nguyễn Văn A',
    email: 'sv20260053@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.3,
    completedCredits: 93,
    status: 'ACTIVE'
  },
  {
    id: 'std-54',
    studentCode: 'SV20260054',
    fullName: 'Sinh Viên Số 54 Nguyễn Văn A',
    email: 'sv20260054@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.4,
    completedCredits: 94,
    status: 'ACTIVE'
  },
  {
    id: 'std-55',
    studentCode: 'SV20260055',
    fullName: 'Sinh Viên Số 55 Nguyễn Văn A',
    email: 'sv20260055@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.5,
    completedCredits: 95,
    status: 'ACTIVE'
  },
  {
    id: 'std-56',
    studentCode: 'SV20260056',
    fullName: 'Sinh Viên Số 56 Nguyễn Văn A',
    email: 'sv20260056@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.6,
    completedCredits: 96,
    status: 'ACTIVE'
  },
  {
    id: 'std-57',
    studentCode: 'SV20260057',
    fullName: 'Sinh Viên Số 57 Nguyễn Văn A',
    email: 'sv20260057@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.7,
    completedCredits: 97,
    status: 'ACTIVE'
  },
  {
    id: 'std-58',
    studentCode: 'SV20260058',
    fullName: 'Sinh Viên Số 58 Nguyễn Văn A',
    email: 'sv20260058@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.8,
    completedCredits: 98,
    status: 'ACTIVE'
  },
  {
    id: 'std-59',
    studentCode: 'SV20260059',
    fullName: 'Sinh Viên Số 59 Nguyễn Văn A',
    email: 'sv20260059@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.9,
    completedCredits: 99,
    status: 'ACTIVE'
  },
  {
    id: 'std-60',
    studentCode: 'SV20260060',
    fullName: 'Sinh Viên Số 60 Nguyễn Văn A',
    email: 'sv20260060@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.5,
    completedCredits: 100,
    status: 'ACTIVE'
  },
  {
    id: 'std-61',
    studentCode: 'SV20260061',
    fullName: 'Sinh Viên Số 61 Nguyễn Văn A',
    email: 'sv20260061@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.6,
    completedCredits: 101,
    status: 'ACTIVE'
  },
  {
    id: 'std-62',
    studentCode: 'SV20260062',
    fullName: 'Sinh Viên Số 62 Nguyễn Văn A',
    email: 'sv20260062@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 2.7,
    completedCredits: 102,
    status: 'ACTIVE'
  },
  {
    id: 'std-63',
    studentCode: 'SV20260063',
    fullName: 'Sinh Viên Số 63 Nguyễn Văn A',
    email: 'sv20260063@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.8,
    completedCredits: 103,
    status: 'ACTIVE'
  },
  {
    id: 'std-64',
    studentCode: 'SV20260064',
    fullName: 'Sinh Viên Số 64 Nguyễn Văn A',
    email: 'sv20260064@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.9,
    completedCredits: 104,
    status: 'ACTIVE'
  },
  {
    id: 'std-65',
    studentCode: 'SV20260065',
    fullName: 'Sinh Viên Số 65 Nguyễn Văn A',
    email: 'sv20260065@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3,
    completedCredits: 105,
    status: 'ACTIVE'
  },
  {
    id: 'std-66',
    studentCode: 'SV20260066',
    fullName: 'Sinh Viên Số 66 Nguyễn Văn A',
    email: 'sv20260066@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.1,
    completedCredits: 106,
    status: 'ACTIVE'
  },
  {
    id: 'std-67',
    studentCode: 'SV20260067',
    fullName: 'Sinh Viên Số 67 Nguyễn Văn A',
    email: 'sv20260067@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.2,
    completedCredits: 107,
    status: 'ACTIVE'
  },
  {
    id: 'std-68',
    studentCode: 'SV20260068',
    fullName: 'Sinh Viên Số 68 Nguyễn Văn A',
    email: 'sv20260068@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.3,
    completedCredits: 108,
    status: 'ACTIVE'
  },
  {
    id: 'std-69',
    studentCode: 'SV20260069',
    fullName: 'Sinh Viên Số 69 Nguyễn Văn A',
    email: 'sv20260069@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.4,
    completedCredits: 109,
    status: 'ACTIVE'
  },
  {
    id: 'std-70',
    studentCode: 'SV20260070',
    fullName: 'Sinh Viên Số 70 Nguyễn Văn A',
    email: 'sv20260070@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.5,
    completedCredits: 110,
    status: 'ACTIVE'
  },
  {
    id: 'std-71',
    studentCode: 'SV20260071',
    fullName: 'Sinh Viên Số 71 Nguyễn Văn A',
    email: 'sv20260071@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.6,
    completedCredits: 111,
    status: 'ACTIVE'
  },
  {
    id: 'std-72',
    studentCode: 'SV20260072',
    fullName: 'Sinh Viên Số 72 Nguyễn Văn A',
    email: 'sv20260072@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.7,
    completedCredits: 112,
    status: 'ACTIVE'
  },
  {
    id: 'std-73',
    studentCode: 'SV20260073',
    fullName: 'Sinh Viên Số 73 Nguyễn Văn A',
    email: 'sv20260073@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.8,
    completedCredits: 113,
    status: 'ACTIVE'
  },
  {
    id: 'std-74',
    studentCode: 'SV20260074',
    fullName: 'Sinh Viên Số 74 Nguyễn Văn A',
    email: 'sv20260074@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.9,
    completedCredits: 114,
    status: 'ACTIVE'
  },
  {
    id: 'std-75',
    studentCode: 'SV20260075',
    fullName: 'Sinh Viên Số 75 Nguyễn Văn A',
    email: 'sv20260075@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.5,
    completedCredits: 115,
    status: 'ACTIVE'
  },
  {
    id: 'std-76',
    studentCode: 'SV20260076',
    fullName: 'Sinh Viên Số 76 Nguyễn Văn A',
    email: 'sv20260076@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.6,
    completedCredits: 116,
    status: 'ACTIVE'
  },
  {
    id: 'std-77',
    studentCode: 'SV20260077',
    fullName: 'Sinh Viên Số 77 Nguyễn Văn A',
    email: 'sv20260077@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 2.7,
    completedCredits: 117,
    status: 'ACTIVE'
  },
  {
    id: 'std-78',
    studentCode: 'SV20260078',
    fullName: 'Sinh Viên Số 78 Nguyễn Văn A',
    email: 'sv20260078@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.8,
    completedCredits: 118,
    status: 'ACTIVE'
  },
  {
    id: 'std-79',
    studentCode: 'SV20260079',
    fullName: 'Sinh Viên Số 79 Nguyễn Văn A',
    email: 'sv20260079@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.9,
    completedCredits: 119,
    status: 'ACTIVE'
  },
  {
    id: 'std-80',
    studentCode: 'SV20260080',
    fullName: 'Sinh Viên Số 80 Nguyễn Văn A',
    email: 'sv20260080@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3,
    completedCredits: 80,
    status: 'ACTIVE'
  },
  {
    id: 'std-81',
    studentCode: 'SV20260081',
    fullName: 'Sinh Viên Số 81 Nguyễn Văn A',
    email: 'sv20260081@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.1,
    completedCredits: 81,
    status: 'ACTIVE'
  },
  {
    id: 'std-82',
    studentCode: 'SV20260082',
    fullName: 'Sinh Viên Số 82 Nguyễn Văn A',
    email: 'sv20260082@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.2,
    completedCredits: 82,
    status: 'ACTIVE'
  },
  {
    id: 'std-83',
    studentCode: 'SV20260083',
    fullName: 'Sinh Viên Số 83 Nguyễn Văn A',
    email: 'sv20260083@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.3,
    completedCredits: 83,
    status: 'ACTIVE'
  },
  {
    id: 'std-84',
    studentCode: 'SV20260084',
    fullName: 'Sinh Viên Số 84 Nguyễn Văn A',
    email: 'sv20260084@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.4,
    completedCredits: 84,
    status: 'ACTIVE'
  },
  {
    id: 'std-85',
    studentCode: 'SV20260085',
    fullName: 'Sinh Viên Số 85 Nguyễn Văn A',
    email: 'sv20260085@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.5,
    completedCredits: 85,
    status: 'ACTIVE'
  },
  {
    id: 'std-86',
    studentCode: 'SV20260086',
    fullName: 'Sinh Viên Số 86 Nguyễn Văn A',
    email: 'sv20260086@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.6,
    completedCredits: 86,
    status: 'ACTIVE'
  },
  {
    id: 'std-87',
    studentCode: 'SV20260087',
    fullName: 'Sinh Viên Số 87 Nguyễn Văn A',
    email: 'sv20260087@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.7,
    completedCredits: 87,
    status: 'ACTIVE'
  },
  {
    id: 'std-88',
    studentCode: 'SV20260088',
    fullName: 'Sinh Viên Số 88 Nguyễn Văn A',
    email: 'sv20260088@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.8,
    completedCredits: 88,
    status: 'ACTIVE'
  },
  {
    id: 'std-89',
    studentCode: 'SV20260089',
    fullName: 'Sinh Viên Số 89 Nguyễn Văn A',
    email: 'sv20260089@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.9,
    completedCredits: 89,
    status: 'ACTIVE'
  },
  {
    id: 'std-90',
    studentCode: 'SV20260090',
    fullName: 'Sinh Viên Số 90 Nguyễn Văn A',
    email: 'sv20260090@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.5,
    completedCredits: 90,
    status: 'ACTIVE'
  },
  {
    id: 'std-91',
    studentCode: 'SV20260091',
    fullName: 'Sinh Viên Số 91 Nguyễn Văn A',
    email: 'sv20260091@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.6,
    completedCredits: 91,
    status: 'ACTIVE'
  },
  {
    id: 'std-92',
    studentCode: 'SV20260092',
    fullName: 'Sinh Viên Số 92 Nguyễn Văn A',
    email: 'sv20260092@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 2.7,
    completedCredits: 92,
    status: 'ACTIVE'
  },
  {
    id: 'std-93',
    studentCode: 'SV20260093',
    fullName: 'Sinh Viên Số 93 Nguyễn Văn A',
    email: 'sv20260093@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 2.8,
    completedCredits: 93,
    status: 'ACTIVE'
  },
  {
    id: 'std-94',
    studentCode: 'SV20260094',
    fullName: 'Sinh Viên Số 94 Nguyễn Văn A',
    email: 'sv20260094@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 2.9,
    completedCredits: 94,
    status: 'ACTIVE'
  },
  {
    id: 'std-95',
    studentCode: 'SV20260095',
    fullName: 'Sinh Viên Số 95 Nguyễn Văn A',
    email: 'sv20260095@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3,
    completedCredits: 95,
    status: 'ACTIVE'
  },
  {
    id: 'std-96',
    studentCode: 'SV20260096',
    fullName: 'Sinh Viên Số 96 Nguyễn Văn A',
    email: 'sv20260096@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.1,
    completedCredits: 96,
    status: 'ACTIVE'
  },
  {
    id: 'std-97',
    studentCode: 'SV20260097',
    fullName: 'Sinh Viên Số 97 Nguyễn Văn A',
    email: 'sv20260097@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.2,
    completedCredits: 97,
    status: 'ACTIVE'
  },
  {
    id: 'std-98',
    studentCode: 'SV20260098',
    fullName: 'Sinh Viên Số 98 Nguyễn Văn A',
    email: 'sv20260098@st.huce.edu.vn',
    classGroup: '67IT3',
    gpa: 3.3,
    completedCredits: 98,
    status: 'ACTIVE'
  },
  {
    id: 'std-99',
    studentCode: 'SV20260099',
    fullName: 'Sinh Viên Số 99 Nguyễn Văn A',
    email: 'sv20260099@st.huce.edu.vn',
    classGroup: '67IT1',
    gpa: 3.4,
    completedCredits: 99,
    status: 'ACTIVE'
  },
  {
    id: 'std-100',
    studentCode: 'SV20260100',
    fullName: 'Sinh Viên Số 100 Nguyễn Văn A',
    email: 'sv20260100@st.huce.edu.vn',
    classGroup: '67IT2',
    gpa: 3.5,
    completedCredits: 100,
    status: 'ACTIVE'
  },
];

export interface MockSubmission {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  score: number | null;
  status: 'GRADED' | 'PENDING' | 'LATE';
  feedback: string;
}

export const MOCK_SUBMISSIONS: MockSubmission[] = [
  {
    id: 'sub-1',
    assessmentId: 'asm-2',
    studentId: 'std-1',
    studentName: 'Sinh Viên Số 1 Nguyễn Văn A',
    submittedAt: '2026-10-02T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-2',
    assessmentId: 'asm-3',
    studentId: 'std-2',
    studentName: 'Sinh Viên Số 2 Nguyễn Văn A',
    submittedAt: '2026-10-03T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-3',
    assessmentId: 'asm-4',
    studentId: 'std-3',
    studentName: 'Sinh Viên Số 3 Nguyễn Văn A',
    submittedAt: '2026-10-04T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-4',
    assessmentId: 'asm-5',
    studentId: 'std-4',
    studentName: 'Sinh Viên Số 4 Nguyễn Văn A',
    submittedAt: '2026-10-05T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-5',
    assessmentId: 'asm-1',
    studentId: 'std-5',
    studentName: 'Sinh Viên Số 5 Nguyễn Văn A',
    submittedAt: '2026-10-06T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-6',
    assessmentId: 'asm-2',
    studentId: 'std-6',
    studentName: 'Sinh Viên Số 6 Nguyễn Văn A',
    submittedAt: '2026-10-07T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-7',
    assessmentId: 'asm-3',
    studentId: 'std-7',
    studentName: 'Sinh Viên Số 7 Nguyễn Văn A',
    submittedAt: '2026-10-08T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-8',
    assessmentId: 'asm-4',
    studentId: 'std-8',
    studentName: 'Sinh Viên Số 8 Nguyễn Văn A',
    submittedAt: '2026-10-09T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-9',
    assessmentId: 'asm-5',
    studentId: 'std-9',
    studentName: 'Sinh Viên Số 9 Nguyễn Văn A',
    submittedAt: '2026-10-10T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-10',
    assessmentId: 'asm-1',
    studentId: 'std-10',
    studentName: 'Sinh Viên Số 10 Nguyễn Văn A',
    submittedAt: '2026-10-11T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-11',
    assessmentId: 'asm-2',
    studentId: 'std-11',
    studentName: 'Sinh Viên Số 11 Nguyễn Văn A',
    submittedAt: '2026-10-12T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-12',
    assessmentId: 'asm-3',
    studentId: 'std-12',
    studentName: 'Sinh Viên Số 12 Nguyễn Văn A',
    submittedAt: '2026-10-13T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-13',
    assessmentId: 'asm-4',
    studentId: 'std-13',
    studentName: 'Sinh Viên Số 13 Nguyễn Văn A',
    submittedAt: '2026-10-14T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-14',
    assessmentId: 'asm-5',
    studentId: 'std-14',
    studentName: 'Sinh Viên Số 14 Nguyễn Văn A',
    submittedAt: '2026-10-15T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-15',
    assessmentId: 'asm-1',
    studentId: 'std-15',
    studentName: 'Sinh Viên Số 15 Nguyễn Văn A',
    submittedAt: '2026-10-16T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-16',
    assessmentId: 'asm-2',
    studentId: 'std-16',
    studentName: 'Sinh Viên Số 16 Nguyễn Văn A',
    submittedAt: '2026-10-17T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-17',
    assessmentId: 'asm-3',
    studentId: 'std-17',
    studentName: 'Sinh Viên Số 17 Nguyễn Văn A',
    submittedAt: '2026-10-18T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-18',
    assessmentId: 'asm-4',
    studentId: 'std-18',
    studentName: 'Sinh Viên Số 18 Nguyễn Văn A',
    submittedAt: '2026-10-19T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-19',
    assessmentId: 'asm-5',
    studentId: 'std-19',
    studentName: 'Sinh Viên Số 19 Nguyễn Văn A',
    submittedAt: '2026-10-20T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-20',
    assessmentId: 'asm-1',
    studentId: 'std-20',
    studentName: 'Sinh Viên Số 20 Nguyễn Văn A',
    submittedAt: '2026-10-21T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-21',
    assessmentId: 'asm-2',
    studentId: 'std-21',
    studentName: 'Sinh Viên Số 21 Nguyễn Văn A',
    submittedAt: '2026-10-22T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-22',
    assessmentId: 'asm-3',
    studentId: 'std-22',
    studentName: 'Sinh Viên Số 22 Nguyễn Văn A',
    submittedAt: '2026-10-23T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-23',
    assessmentId: 'asm-4',
    studentId: 'std-23',
    studentName: 'Sinh Viên Số 23 Nguyễn Văn A',
    submittedAt: '2026-10-24T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-24',
    assessmentId: 'asm-5',
    studentId: 'std-24',
    studentName: 'Sinh Viên Số 24 Nguyễn Văn A',
    submittedAt: '2026-10-25T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-25',
    assessmentId: 'asm-1',
    studentId: 'std-25',
    studentName: 'Sinh Viên Số 25 Nguyễn Văn A',
    submittedAt: '2026-10-26T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-26',
    assessmentId: 'asm-2',
    studentId: 'std-26',
    studentName: 'Sinh Viên Số 26 Nguyễn Văn A',
    submittedAt: '2026-10-27T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-27',
    assessmentId: 'asm-3',
    studentId: 'std-27',
    studentName: 'Sinh Viên Số 27 Nguyễn Văn A',
    submittedAt: '2026-10-28T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-28',
    assessmentId: 'asm-4',
    studentId: 'std-28',
    studentName: 'Sinh Viên Số 28 Nguyễn Văn A',
    submittedAt: '2026-10-01T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-29',
    assessmentId: 'asm-5',
    studentId: 'std-29',
    studentName: 'Sinh Viên Số 29 Nguyễn Văn A',
    submittedAt: '2026-10-02T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-30',
    assessmentId: 'asm-1',
    studentId: 'std-30',
    studentName: 'Sinh Viên Số 30 Nguyễn Văn A',
    submittedAt: '2026-10-03T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-31',
    assessmentId: 'asm-2',
    studentId: 'std-31',
    studentName: 'Sinh Viên Số 31 Nguyễn Văn A',
    submittedAt: '2026-10-04T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-32',
    assessmentId: 'asm-3',
    studentId: 'std-32',
    studentName: 'Sinh Viên Số 32 Nguyễn Văn A',
    submittedAt: '2026-10-05T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-33',
    assessmentId: 'asm-4',
    studentId: 'std-33',
    studentName: 'Sinh Viên Số 33 Nguyễn Văn A',
    submittedAt: '2026-10-06T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-34',
    assessmentId: 'asm-5',
    studentId: 'std-34',
    studentName: 'Sinh Viên Số 34 Nguyễn Văn A',
    submittedAt: '2026-10-07T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-35',
    assessmentId: 'asm-1',
    studentId: 'std-35',
    studentName: 'Sinh Viên Số 35 Nguyễn Văn A',
    submittedAt: '2026-10-08T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-36',
    assessmentId: 'asm-2',
    studentId: 'std-36',
    studentName: 'Sinh Viên Số 36 Nguyễn Văn A',
    submittedAt: '2026-10-09T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-37',
    assessmentId: 'asm-3',
    studentId: 'std-37',
    studentName: 'Sinh Viên Số 37 Nguyễn Văn A',
    submittedAt: '2026-10-10T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-38',
    assessmentId: 'asm-4',
    studentId: 'std-38',
    studentName: 'Sinh Viên Số 38 Nguyễn Văn A',
    submittedAt: '2026-10-11T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-39',
    assessmentId: 'asm-5',
    studentId: 'std-39',
    studentName: 'Sinh Viên Số 39 Nguyễn Văn A',
    submittedAt: '2026-10-12T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-40',
    assessmentId: 'asm-1',
    studentId: 'std-40',
    studentName: 'Sinh Viên Số 40 Nguyễn Văn A',
    submittedAt: '2026-10-13T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-41',
    assessmentId: 'asm-2',
    studentId: 'std-41',
    studentName: 'Sinh Viên Số 41 Nguyễn Văn A',
    submittedAt: '2026-10-14T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-42',
    assessmentId: 'asm-3',
    studentId: 'std-42',
    studentName: 'Sinh Viên Số 42 Nguyễn Văn A',
    submittedAt: '2026-10-15T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-43',
    assessmentId: 'asm-4',
    studentId: 'std-43',
    studentName: 'Sinh Viên Số 43 Nguyễn Văn A',
    submittedAt: '2026-10-16T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-44',
    assessmentId: 'asm-5',
    studentId: 'std-44',
    studentName: 'Sinh Viên Số 44 Nguyễn Văn A',
    submittedAt: '2026-10-17T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-45',
    assessmentId: 'asm-1',
    studentId: 'std-45',
    studentName: 'Sinh Viên Số 45 Nguyễn Văn A',
    submittedAt: '2026-10-18T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-46',
    assessmentId: 'asm-2',
    studentId: 'std-46',
    studentName: 'Sinh Viên Số 46 Nguyễn Văn A',
    submittedAt: '2026-10-19T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-47',
    assessmentId: 'asm-3',
    studentId: 'std-47',
    studentName: 'Sinh Viên Số 47 Nguyễn Văn A',
    submittedAt: '2026-10-20T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-48',
    assessmentId: 'asm-4',
    studentId: 'std-48',
    studentName: 'Sinh Viên Số 48 Nguyễn Văn A',
    submittedAt: '2026-10-21T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-49',
    assessmentId: 'asm-5',
    studentId: 'std-49',
    studentName: 'Sinh Viên Số 49 Nguyễn Văn A',
    submittedAt: '2026-10-22T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-50',
    assessmentId: 'asm-1',
    studentId: 'std-50',
    studentName: 'Sinh Viên Số 50 Nguyễn Văn A',
    submittedAt: '2026-10-23T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-51',
    assessmentId: 'asm-2',
    studentId: 'std-51',
    studentName: 'Sinh Viên Số 51 Nguyễn Văn A',
    submittedAt: '2026-10-24T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-52',
    assessmentId: 'asm-3',
    studentId: 'std-52',
    studentName: 'Sinh Viên Số 52 Nguyễn Văn A',
    submittedAt: '2026-10-25T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-53',
    assessmentId: 'asm-4',
    studentId: 'std-53',
    studentName: 'Sinh Viên Số 53 Nguyễn Văn A',
    submittedAt: '2026-10-26T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-54',
    assessmentId: 'asm-5',
    studentId: 'std-54',
    studentName: 'Sinh Viên Số 54 Nguyễn Văn A',
    submittedAt: '2026-10-27T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-55',
    assessmentId: 'asm-1',
    studentId: 'std-55',
    studentName: 'Sinh Viên Số 55 Nguyễn Văn A',
    submittedAt: '2026-10-28T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-56',
    assessmentId: 'asm-2',
    studentId: 'std-56',
    studentName: 'Sinh Viên Số 56 Nguyễn Văn A',
    submittedAt: '2026-10-01T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-57',
    assessmentId: 'asm-3',
    studentId: 'std-57',
    studentName: 'Sinh Viên Số 57 Nguyễn Văn A',
    submittedAt: '2026-10-02T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-58',
    assessmentId: 'asm-4',
    studentId: 'std-58',
    studentName: 'Sinh Viên Số 58 Nguyễn Văn A',
    submittedAt: '2026-10-03T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-59',
    assessmentId: 'asm-5',
    studentId: 'std-59',
    studentName: 'Sinh Viên Số 59 Nguyễn Văn A',
    submittedAt: '2026-10-04T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-60',
    assessmentId: 'asm-1',
    studentId: 'std-60',
    studentName: 'Sinh Viên Số 60 Nguyễn Văn A',
    submittedAt: '2026-10-05T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-61',
    assessmentId: 'asm-2',
    studentId: 'std-61',
    studentName: 'Sinh Viên Số 61 Nguyễn Văn A',
    submittedAt: '2026-10-06T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-62',
    assessmentId: 'asm-3',
    studentId: 'std-62',
    studentName: 'Sinh Viên Số 62 Nguyễn Văn A',
    submittedAt: '2026-10-07T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-63',
    assessmentId: 'asm-4',
    studentId: 'std-63',
    studentName: 'Sinh Viên Số 63 Nguyễn Văn A',
    submittedAt: '2026-10-08T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-64',
    assessmentId: 'asm-5',
    studentId: 'std-64',
    studentName: 'Sinh Viên Số 64 Nguyễn Văn A',
    submittedAt: '2026-10-09T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-65',
    assessmentId: 'asm-1',
    studentId: 'std-65',
    studentName: 'Sinh Viên Số 65 Nguyễn Văn A',
    submittedAt: '2026-10-10T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-66',
    assessmentId: 'asm-2',
    studentId: 'std-66',
    studentName: 'Sinh Viên Số 66 Nguyễn Văn A',
    submittedAt: '2026-10-11T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-67',
    assessmentId: 'asm-3',
    studentId: 'std-67',
    studentName: 'Sinh Viên Số 67 Nguyễn Văn A',
    submittedAt: '2026-10-12T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-68',
    assessmentId: 'asm-4',
    studentId: 'std-68',
    studentName: 'Sinh Viên Số 68 Nguyễn Văn A',
    submittedAt: '2026-10-13T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-69',
    assessmentId: 'asm-5',
    studentId: 'std-69',
    studentName: 'Sinh Viên Số 69 Nguyễn Văn A',
    submittedAt: '2026-10-14T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-70',
    assessmentId: 'asm-1',
    studentId: 'std-70',
    studentName: 'Sinh Viên Số 70 Nguyễn Văn A',
    submittedAt: '2026-10-15T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-71',
    assessmentId: 'asm-2',
    studentId: 'std-71',
    studentName: 'Sinh Viên Số 71 Nguyễn Văn A',
    submittedAt: '2026-10-16T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-72',
    assessmentId: 'asm-3',
    studentId: 'std-72',
    studentName: 'Sinh Viên Số 72 Nguyễn Văn A',
    submittedAt: '2026-10-17T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-73',
    assessmentId: 'asm-4',
    studentId: 'std-73',
    studentName: 'Sinh Viên Số 73 Nguyễn Văn A',
    submittedAt: '2026-10-18T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-74',
    assessmentId: 'asm-5',
    studentId: 'std-74',
    studentName: 'Sinh Viên Số 74 Nguyễn Văn A',
    submittedAt: '2026-10-19T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-75',
    assessmentId: 'asm-1',
    studentId: 'std-75',
    studentName: 'Sinh Viên Số 75 Nguyễn Văn A',
    submittedAt: '2026-10-20T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-76',
    assessmentId: 'asm-2',
    studentId: 'std-76',
    studentName: 'Sinh Viên Số 76 Nguyễn Văn A',
    submittedAt: '2026-10-21T10:30:00Z',
    score: 9.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-77',
    assessmentId: 'asm-3',
    studentId: 'std-77',
    studentName: 'Sinh Viên Số 77 Nguyễn Văn A',
    submittedAt: '2026-10-22T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-78',
    assessmentId: 'asm-4',
    studentId: 'std-78',
    studentName: 'Sinh Viên Số 78 Nguyễn Văn A',
    submittedAt: '2026-10-23T10:30:00Z',
    score: 5.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
  {
    id: 'sub-79',
    assessmentId: 'asm-5',
    studentId: 'std-79',
    studentName: 'Sinh Viên Số 79 Nguyễn Văn A',
    submittedAt: '2026-10-24T10:30:00Z',
    score: null,
    status: 'PENDING',
    feedback: ''
  },
  {
    id: 'sub-80',
    assessmentId: 'asm-1',
    studentId: 'std-80',
    studentName: 'Sinh Viên Số 80 Nguyễn Văn A',
    submittedAt: '2026-10-25T10:30:00Z',
    score: 7.0,
    status: 'GRADED',
    feedback: 'Bài làm tốt, cấu trúc code rõ ràng và tối ưu thời gian chạy.'
  },
];
