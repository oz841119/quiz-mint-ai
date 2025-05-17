import { AIService } from "@/AIService";
import { createOpenAIProvider } from "@/AIService/providers";
import { MODELS } from "@/configs/models";
import { QUIZ_TYPES } from "@/configs/quizTypes";
import { NextResponse } from "next/server";
import { z } from "zod";
const DTOSchema = z.object({
  examName: z.string(),
  language: z.string(),
  modelName: z.enum(
    MODELS.map((model) => model.value) as [string, ...string[]],
  ),
  quizTypes: z.array(
    z.enum(
      QUIZ_TYPES.map((quizType) => quizType.value) as [string, ...string[]],
    ),
  ),
});
export async function POST(request: Request) {
  try {
    const { examName, language, modelName, quizTypes } = DTOSchema.parse(
      await request.json(),
    );
    const provider = createOpenAIProvider({
      modelName,
      baseURL: z.string().parse(process.env.OPEN_AI_BASE_URL),
      apiKey: z.string().parse(process.env.MODEL_KEY),
    });
    const aiService = new AIService(provider);
    const quiz = await aiService.createQuiz({
      examName,
      language,
      quizTypes,
    });
    return NextResponse.json({
      model: aiService.provider.modelName,
      id: crypto.randomUUID(),
      ...quiz,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error)?.message || "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
