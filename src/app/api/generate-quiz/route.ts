import { AIService } from '@/AIService';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  try {
    const { examName, language } = await request.json();
    const createAIService = new AIService('gemini-2.0-flash', process.env.GEMINI_2_0_FLASH_AIP_KEY!)
    const quiz = await createAIService.createQuiz({
      examName,
      language,
    })
    return NextResponse.json({
      model: createAIService.model,
      ...quiz
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
} 