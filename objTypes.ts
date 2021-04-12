export interface APIresponseTypes {
  success: boolean;
  data: QuestionType[] | AnswerType | [] | {};
}

export interface QuestionType {
  id: string;
  question: string;
  answerId: string;
}

export interface AnswerType {
  id: string;
  answer: string;
}
