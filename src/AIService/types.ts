export type Quiz = {
  question: string;
  options: string[];
  answers: number[];
  explanation: string;
  language: string;
  quizType: string;
};
export type AIServiceProvider = {
  modelName: string;
  askQuiz: ({
    examName,
    language,
    quizTypes,
  }: {
    examName: string;
    language: string;
    quizTypes: string[];
  }) => Promise<Quiz | null>;
};
