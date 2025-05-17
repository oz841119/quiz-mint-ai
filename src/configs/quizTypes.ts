export const QUIZ_TYPES = [
  {
    value: "single-choice",
    label: "單選題",
  },
  {
    value: "multiple-choice",
    label: "複選題",
  },
] as const;

export type QuizType = (typeof QUIZ_TYPES)[number]["value"];
