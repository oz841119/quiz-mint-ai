import { AIService } from "@/AIService";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { examName, language, modelName } = await request.json();
    const aiService = new AIService({
      modelName: modelName,
    });
    console.log(aiService.modelName);
    const quiz = await aiService.createQuiz({
      examName,
      language,
    });
    return NextResponse.json({
      model: aiService.modelName,
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
