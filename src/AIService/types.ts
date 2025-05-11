type Quiz = {
  question: string;
  options: string[];
  answers: number[];
  explanation: string;
  language: string;
}
type AIServiceProvider = {
  askQuiz: ({examName, language}: {examName: string, language: string}) => Promise<Quiz | null>;
}