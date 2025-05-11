import { getProvider } from "./providers";
import { providerMap } from "./providers/config";
export class AIService {
  model: string;
  private provider: AIServiceProvider;
  constructor(model: keyof typeof providerMap, key: string) {
    const Provider = getProvider(model)
    this.provider = new Provider({key})
    this.model = model;
  }
  async createQuiz({
    examName,
    language,
  }: {
    examName: string;
    language: string;
  }): Promise<Quiz | null> {
    try {
      const quiz = await this.provider.askQuiz({
        examName,
        language,
      })
      return quiz
    } catch (error) {
      throw error
    }
  }
}