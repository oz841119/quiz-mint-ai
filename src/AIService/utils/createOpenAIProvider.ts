import OpenAI from "openai";
import { z } from "zod";
import { createQuizPrompt } from "./index";
export const createOpenAIProvider = ({
  modelName,
  baseURL,
  apiKey,
}: { modelName: string; baseURL?: string; apiKey: string }) => {
  return class OpenAIProvider implements AIServiceProvider {
    modelName = modelName;
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
        const openAiClient = new OpenAI({ apiKey, baseURL });
        const response = await openAiClient.chat.completions.create({
          model: modelName,
          messages: [{ role: "user", content: prompt }],
        });
        if (response.choices[0].message.content) {
          const cleaned = response.choices[0].message.content
            .replace(/```json|```/g, "")
            .trim();
          const quizText = JSON.parse(cleaned);
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
        throw new Error("No quiz found");
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };
};
