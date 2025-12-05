export interface Quizz {
  quizzId: number;
  lessonId: number;
  title: string;
  timeLimit: number;
}

export interface Question {
  questionId: number;
  questionText: string;
  options: string;
  pointValue: number;
}

export interface QuestionDetail {
  questionId: number;
  questionText: string;
  options: string;
  correctAnswer: string;
  pointValue: number;
}
