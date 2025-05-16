export const createQuizPrompt = ({
  examName,
  language,
}: {
  examName: string;
  language: string;
}) => {
  return `
    Please generate 1 realistic multiple-choice question about ${examName}, similar in style and difficulty to actual exam questions or past exam papers.
    The question can be either single-choice (with only one correct answer) or multiple-choice (with multiple correct answers).
    Each option must begin with a prefix like "A.", "B.", "C.", etc.
    Return it in the following JSON format:
    {
      question: Question content,
      options: Array of options (each option must start with a prefix like "A.", "B.", etc.),
      answers: Index(es) of the correct option(s) — for single-choice questions, provide a single index; for multiple-choice questions, provide an array of indices,
      explanation: Explanation of the correct answer(s), including why they are correct and why other options are incorrect.
      language: Language
    }。
    Please use ${language},
    ensure that the answers field is always an array,
    and make sure to return a pure JSON string only (do not include \`\`\`json or any other text),
    so I can directly parse it with JSON.parse
  `;
};
