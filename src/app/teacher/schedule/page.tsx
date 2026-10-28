import { MySchedule } from '@/components/schedule/my-schedule';
export const metadata = { title: 'Lịch dạy' };
export default function TeacherSchedulePage() {
  return <MySchedule mode="teach" />;
}
