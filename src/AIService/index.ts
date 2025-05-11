import { getProvider } from "./providers";
import type { providerMap } from "./providers/config";
export class AIService {
	model: string;
	private provider: AIServiceProvider;
	constructor({
		model,
		key,
	}: {
		model: keyof typeof providerMap;
		key?: string;
	}) {
		const Provider = getProvider(model);
		this.provider = new Provider({
			key: key,
		});
		this.model = model;
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
