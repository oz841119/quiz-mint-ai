import { getProvider } from "./providers";
import type { providerMap } from "./providers/config";
export class AIService {
  providerName: string;
  modelName: string;
  private provider: AIServiceProvider;
  constructor({
    providerName,
    key,
  }: {
    providerName: keyof typeof providerMap;
    key?: string;
  }) {
    const Provider = getProvider(providerName);
    this.provider = new Provider({
      key: key,
    });
    this.modelName = this.provider.modelName;
    this.providerName = providerName;
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
