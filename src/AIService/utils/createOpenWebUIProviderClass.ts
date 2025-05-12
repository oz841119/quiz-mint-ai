import { z } from "zod";
import { createQuizPrompt } from "./index";

export const createAIProviderClass = ({model}: {model: string}) => {
  return class implements AIServiceProvider {
    private key: string;
    constructor({
      key = process.env.OPEN_WEB_UI_API_KEY,
    }: {
      key?: string;
    }) {
      if (!key) {
        throw new Error("OPEN_WEB_UI_API_KEY is not set");
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
          `${process.env.OPEN_WEB_UI_API_BASE_URL}/api/chat/completions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.key}`,
            },
            body: JSON.stringify({
              "model": model,
              "messages": [
                {
                  "role": "user",
                    "content": prompt
              }
              ]
            }),
          },
        );
        if (resp.ok) {
          const data = await resp.json();
          const quizText = JSON.parse(data.choices[0].message.content);
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
}