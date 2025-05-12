import { AIService } from "@/AIService";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
	try {
		const { examName, language, model } = await request.json();
		const createAIService = new AIService({
			model
		});
		const quiz = await createAIService.createQuiz({
			examName,
			language,
		});
		return NextResponse.json({
			model: createAIService.model,
			id: crypto.randomUUID(),
			...quiz,
		});
	} catch (error) {
		return NextResponse.json(
			{
				error: error,
			},
			{
				status: 500,
			},
		);
	}
}
