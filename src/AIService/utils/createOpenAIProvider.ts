import { z } from "zod";
import { createQuizPrompt } from "./index";
import OpenAI from "openai";
export const createOpenAIProvider = ({ modelName }: { modelName: string }) => {
  return class implements AIServiceProvider {
    public modelName = modelName;
    private key: string;
    constructor({
      key = process.env.MODEL_KEY,
    }: {
      key?: string;
    }) {
      if (!key) {
        throw new Error("MODEL_KEY is not set");
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
        const openAiClient = new OpenAI({
          apiKey: this.key,
          baseURL: process.env.OPEN_AI_BASE_URL,
        });
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
