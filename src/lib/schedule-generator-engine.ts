/**
 * Thuật toán xếp lịch học và tối ưu phòng học tự động của hệ thống F LMS.
 * Xử lý kiểm tra xung đột giảng viên, phòng máy tính, phòng lý thuyết và ca học.
 */

export interface TimeSlot {
  dayOfWeek: number; // 2 -> 8 (Thứ 2 đến Chủ nhật)
  startPeriod: number; // 1 -> 12
  periodCount: number; // 2, 3, 4 tiết
}

export interface RoomRequirement {
  roomId: string;
  roomName: string;
  capacity: number;
  isComputerLab: boolean;
  building: string;
}

export interface CourseScheduleDemand {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  teacherId: string;
  studentCount: number;
  requiresLab: boolean;
  totalSessions: number;
}

export interface ScheduledSession {
  sessionId: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  roomId: string;
  roomName: string;
  dayOfWeek: number;
  startPeriod: number;
  periodCount: number;
  conflicts: string[];
}

export class ScheduleSolver {
  private demands: CourseScheduleDemand[] = [];
  private rooms: RoomRequirement[] = [];
  private scheduled: ScheduledSession[] = [];

  constructor(demands: CourseScheduleDemand[], rooms: RoomRequirement[]) {
    this.demands = demands;
    this.rooms = rooms;
  }

  public detectConflict(
    session1: ScheduledSession,
    session2: ScheduledSession
  ): boolean {
    if (session1.sessionId === session2.sessionId) return false;
    if (session1.dayOfWeek !== session2.dayOfWeek) return false;

    const s1End = session1.startPeriod + session1.periodCount - 1;
    const s2End = session2.startPeriod + session2.periodCount - 1;
    const timeOverlap = !(s1End < session2.startPeriod || session1.startPeriod > s2End);

    if (!timeOverlap) return false;

    // Trùng phòng hoặc trùng giảng viên
    if (session1.roomId === session2.roomId) return true;
    if (session1.teacherId === session2.teacherId) return true;

    return false;
  }

  public generateSchedule(): ScheduledSession[] {
    const result: ScheduledSession[] = [];
    const availableSlots: TimeSlot[] = [];

    // Tạo các slot học khả dụng (Thứ 2 đến Thứ 7, sáng: tiết 1-3, 4-6; chiều: tiết 7-9, 10-12)
    for (let day = 2; day <= 7; day++) {
      availableSlots.push({ dayOfWeek: day, startPeriod: 1, periodCount: 3 });
      availableSlots.push({ dayOfWeek: day, startPeriod: 4, periodCount: 3 });
      availableSlots.push({ dayOfWeek: day, startPeriod: 7, periodCount: 3 });
      availableSlots.push({ dayOfWeek: day, startPeriod: 10, periodCount: 3 });
    }

    let sessionCounter = 1;

    for (const demand of this.demands) {
      const eligibleRooms = this.rooms.filter((r) => {
        if (r.capacity < demand.studentCount) return false;
        if (demand.requiresLab && !r.isComputerLab) return false;
        return true;
      });

      if (!eligibleRooms.length) continue;

      let sessionsAssigned = 0;
      for (const slot of availableSlots) {
        if (sessionsAssigned >= demand.totalSessions) break;

        for (const room of eligibleRooms) {
          const candidate: ScheduledSession = {
            sessionId: `SES-${String(sessionCounter++).padStart(4, '0')}`,
            courseId: demand.courseId,
            courseTitle: demand.courseTitle,
            teacherId: demand.teacherId,
            roomId: room.roomId,
            roomName: room.roomName,
            dayOfWeek: slot.dayOfWeek,
            startPeriod: slot.startPeriod,
            periodCount: slot.periodCount,
            conflicts: [],
          };

          const hasConflict = result.some((existing) => this.detectConflict(candidate, existing));
          if (!hasConflict) {
            result.push(candidate);
            sessionsAssigned++;
            break;
          }
        }
      }
    }

    this.scheduled = result;
    return result;
  }

  public getRoomUtilizationRate(roomId: string): number {
    const sessions = this.scheduled.filter((s) => s.roomId === roomId);
    const totalPeriodsUsed = sessions.reduce((acc, s) => acc + s.periodCount, 0);
    const totalWeeklyPeriods = 6 * 12; // 6 ngày * 12 tiết = 72 tiết tối đa
    return Number(((totalPeriodsUsed / totalWeeklyPeriods) * 100).toFixed(1));
  }
}

export function validateScheduleRule_1(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_2(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_3(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_4(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_5(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_6(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_7(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_8(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_9(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_10(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_11(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_12(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_13(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_14(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_15(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_16(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_17(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_18(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_19(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_20(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_21(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_22(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_23(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_24(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_25(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_26(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_27(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_28(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_29(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}

export function validateScheduleRule_30(session: ScheduledSession): boolean {
  if (session.periodCount <= 0 || session.periodCount > 6) return false;
  if (session.startPeriod < 1 || session.startPeriod > 12) return false;
  if (session.dayOfWeek < 2 || session.dayOfWeek > 8) return false;
  return true;
}
