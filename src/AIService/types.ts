type Quiz = {
  question: string;
  options: string[];
  answers: number[];
  explanation: string;
  language: string;
};
type AIServiceProvider = {
  modelName: string;
  askQuiz: ({
    examName,
    language,
  }: {
    examName: string;
    language: string;
  }) => Promise<Quiz | null>;
};
