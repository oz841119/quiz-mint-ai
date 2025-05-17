export const QUIZ_TYPES = [
  {
    value: "single-choice",
    label: "Single Choice",
  },
  {
    value: "multiple-choice",
    label: "Multiple Choice",
  },
] as const;

export type QuizType = (typeof QUIZ_TYPES)[number]["value"];
