export interface Question {
  questionId: number;
  quizzId: number;
  questionText: string;
  options: JSON;
  correctAnswer: String;
  pointValue: number;
}
