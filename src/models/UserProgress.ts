export interface UserProgress {
  progressId: number;
  userId: number;
  lessonId: number;
  status: Progress;
  score: number;
  completeAt: Date;
}
export enum Progress {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}
