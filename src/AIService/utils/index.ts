export { createAIProviderClass } from "./createOpenWebUIProviderClass";

export const createQuizPrompt = ({
	examName,
	language,
}: {
	examName: string;
	language: string;
}) => {
	return `
  Please generate 1 multiple-choice question about ${examName}.
  The question can be either single-choice (with only one correct answer) or multiple-choice (with multiple correct answers).
  Return it in the following JSON format:
  {
    question: Question content,
    options: Array of options,
    answers: Index(es) of the correct option(s) — for single-choice questions, provide a single index; for multiple-choice questions, provide an array of indices,
    explanation: Explanation of the correct answer(s), including why they are correct and why other options are incorrect.
    language: Language
  }。
  Please use ${language}, and make sure to return a pure JSON string only (do not include \`\`\`json or any other text), so I can directly parse it with JSON.parse`;
};
