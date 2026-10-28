import { MySchedule } from '@/components/schedule/my-schedule';
export const metadata = { title: 'Lịch học' };
export default function SchedulePage() {
  return <MySchedule mode="learn" />;
}
