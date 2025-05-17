export * from "./createOpenAIProvider";
export const createQuizPrompt = ({
  examName,
  language,
  quizTypes,
}: {
  examName: string;
  language: string;
  quizTypes: string[];
}) => {
  return `
    Please generate 1 realistic question about ${examName}, similar in style and difficulty to actual exam questions or past exam papers.
    The question should be one of the following types: ${quizTypes.join(", ")}.
    For multiple-choice questions, each option must begin with a prefix like "A.", "B.", "C.", etc.
    Important: The number of correct answers must match the question type:
    - For single-choice questions, provide exactly one correct answer
    - For multiple-choice questions, provide two or more correct answers, and make sure the question description explicitly states the exact number of correct answers required (e.g., "Select TWO correct answers" or "Choose THREE correct options")
    - Do not generate questions that don't match the specified types
    Return it in the following JSON format:
    {
      question: Question content,
      options: Array of options (each option must start with a prefix like "A.", "B.", etc.),
      answers: Index(es) of the correct option(s) — for single-choice questions, provide a single index; for multiple-choice questions, provide an array of indices,
      explanation: Explanation of the correct answer(s), including why they are correct and why other options are incorrect,
      language: Language,
      quizType: The type of question (one of the specified quizTypes)
    }。
    Please use ${language},
    ensure that the answers field is always an array,
    and make sure to return a pure JSON string only (do not include \`\`\`json or any other text),
    so I can directly parse it with JSON.parse
  `;
};
