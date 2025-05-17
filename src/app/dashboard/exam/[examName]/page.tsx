"use client";
import { ExamModeSwitch } from "@/components/ExamModeSwitch";
import { QuizCard } from "@/components/QuizCard";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { MODEL_LANGUAGES } from "@/configs/modelLanguages";
import { MODELS } from "@/configs/models";
import type { QuizType } from "@/configs/quizTypes";
import { QUIZ_TYPES } from "@/configs/quizTypes";
import { useExamsContext } from "@/contexts/examsContext";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

type Quiz = {
  question: string;
  options: string[];
  answers: number[];
  explanation: string;
  language: string;
  model: string;
  id: string;
};

export default function ExamPage() {
  const { exam } = useExamsContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizList, setQuizList] = useState<Quiz[] | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("zh-TW");
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0].value);
  const [selectedQuizTypes, setSelectedQuizTypes] = useState<QuizType[]>(
    QUIZ_TYPES.map((quizType) => quizType.value) as QuizType[],
  );
  const [isExamMode, setIsExamMode] = useState(false);

  const handleQuizTypeChange = (type: QuizType, checked: boolean) => {
    if (checked) {
      setSelectedQuizTypes([...selectedQuizTypes, type]);
    } else {
      setSelectedQuizTypes(selectedQuizTypes.filter((t) => t !== type));
    }
  };

  const createQuiz = async () => {
    if (selectedQuizTypes.length === 0) {
      setError("請至少選擇一種題型");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examName: exam?.name,
          language: selectedLanguage,
          modelName: selectedModel,
          quizTypes: selectedQuizTypes,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate quiz, please try again.");
      }
      const data = await response.json();
      setQuizList([data, ...(quizList || [])]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "發生未知錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-full md:w-80 cursor-pointer">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((model) => (
              <SelectItem
                key={model.value}
                value={model.value}
                className="cursor-pointer"
              >
                {model.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full md:w-48 cursor-pointer">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {MODEL_LANGUAGES.map((lang) => (
              <SelectItem
                key={lang.value}
                value={lang.value}
                className="cursor-pointer"
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-4 w-full md:w-auto h-9">
          {QUIZ_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={type.value}
                checked={selectedQuizTypes.includes(type.value)}
                onCheckedChange={(checked) =>
                  handleQuizTypeChange(type.value, checked as boolean)
                }
                className="border-primary cursor-pointer"
              />
              <label
                htmlFor={type.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed cursor-pointer peer-disabled:opacity-70"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <ExamModeSwitch
            isExamMode={isExamMode}
            onToggle={() => setIsExamMode(!isExamMode)}
          />
          <Button
            onClick={createQuiz}
            size="sm"
            className="cursor-pointer flex-1 md:flex-none"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Create Quiz
          </Button>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 md:px-4 py-2 md:py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <AnimatePresence>
        {quizList?.map((quiz) => (
          <motion.div
            className="w-full"
            key={quiz.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuizCard
              quiz={quiz}
              className="w-full"
              defaultIsExamMode={isExamMode}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
