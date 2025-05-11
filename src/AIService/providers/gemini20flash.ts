import { z } from "zod";
import { createQuizPrompt } from "../utils";

export class Gemini20FlashProvider implements AIServiceProvider {
	private key: string;
	constructor({
		key = process.env.GEMINI_2_0_FLASH_AIP_KEY,
	}: {
		key?: string;
	}) {
		if (!key) {
			throw new Error("GEMINI_2_0_FLASH_AIP_KEY is not set");
		}
		this.key = key;
	}
	async askQuiz({
		examName,
		language,
	}: {
		examName: string;
		language: string;
	}): Promise<Quiz | null> {
		try {
			const prompt = createQuizPrompt({
				examName,
				language,
			});
			const resp = await fetch(
				`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.key}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						contents: [
							{
								parts: [
									{
										text: prompt,
									},
								],
							},
						],
						generationConfig: {
							responseMimeType: "application/json",
						},
					}),
				},
			);
			if (resp.ok) {
				const data = await resp.json();
				const quizText = JSON.parse(data.candidates[0].content.parts[0].text);
				const quiz = z
					.object({
						question: z.string(),
						options: z.array(z.string()),
						answers: z.array(z.number()),
						explanation: z.string(),
						language: z.string(),
					})
					.parse(quizText);
				return quiz;
			}
			throw resp;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
