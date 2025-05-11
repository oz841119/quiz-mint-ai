import { AIService } from "@/AIService";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
	try {
		const { examName, language } = await request.json();
		const createAIService = new AIService({
			model: "gemini-2.0-flash",
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
