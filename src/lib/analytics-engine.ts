export interface GradeMetric {
  courseId: string;
  courseTitle: string;
  credits: number;
  score: number;
  letterGrade: string;
  gpaPoint: number;
}

export function calculateGPA(metrics: GradeMetric[]): number {
  if (!metrics.length) return 0;
  const totalCredits = metrics.reduce((acc, m) => acc + m.credits, 0);
  if (!totalCredits) return 0;
  const weightedPoints = metrics.reduce((acc, m) => acc + m.gpaPoint * m.credits, 0);
  return Number((weightedPoints / totalCredits).toFixed(2));
}

export function convertScoreToGPA(score: number): { letter: string; point: number } {
  if (score >= 9.0) return { letter: 'A+', point: 4.0 };
  if (score >= 8.5) return { letter: 'A', point: 3.8 };
  if (score >= 8.0) return { letter: 'B+', point: 3.5 };
  if (score >= 7.0) return { letter: 'B', point: 3.0 };
  if (score >= 6.5) return { letter: 'C+', point: 2.5 };
  if (score >= 5.5) return { letter: 'C', point: 2.0 };
  if (score >= 5.0) return { letter: 'D+', point: 1.5 };
  if (score >= 4.0) return { letter: 'D', point: 1.0 };
  return { letter: 'F', point: 0.0 };
}
