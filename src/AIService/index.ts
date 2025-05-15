import { getProvider } from "./providers";
import type { providerMap } from "./providers/config";
export class AIService {
  modelName: string;
  private provider: AIServiceProvider;
  constructor({
    modelName,
    key,
  }: {
    modelName: keyof typeof providerMap;
    key?: string;
  }) {
    const Provider = getProvider(modelName);
    this.provider = new Provider({
      key: key,
    });
    this.modelName = this.provider.modelName;
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
