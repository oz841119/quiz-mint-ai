import type { AIServiceProvider, Quiz } from "./types";
export class AIService {
  provider: AIServiceProvider;
  constructor(Provider: new () => AIServiceProvider) {
    this.provider = new Provider();
  }
  async createQuiz({
    examName,
    language,
    quizTypes,
  }: {
    examName: string;
    language: string;
    quizTypes: string[];
  }): Promise<Quiz | null> {
    const quiz = await this.provider.askQuiz({
      examName,
      language,
      quizTypes,
    });
    return quiz;
  }
}
