export interface APIresponseTypes {
  success: boolean;
  data: QuestionModel[] | AnswerModel | [] | {};
}

export interface QuestionModel {
  id: string;
  question: string;
  answerId: string;
}

export interface AnswerModel {
  id: string;
  answer: string;
}
