export class AIService {
  provider: AIServiceProvider;
  constructor(Provider: new () => AIServiceProvider) {
    this.provider = new Provider();
  }
  async createQuiz({
    examName,
    language,
  }: {
    examName: string;
    language: string;
  }): Promise<Quiz | null> {
    const quiz = await this.provider.askQuiz({
      examName,
      language,
    });
    return quiz;
  }
}
