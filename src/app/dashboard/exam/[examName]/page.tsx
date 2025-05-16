"use client";
import { ExamModeSwitch } from "@/components/ExamModeSwitch";
import { QuizCard } from "@/components/QuizCard";
import { Button } from "@/components/shadcn-ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { MODEL_LANGUAGES } from "@/configs/modelLanguages";
import { MODELS } from "@/configs/models";
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
  const [isExamMode, setIsExamMode] = useState(false);

  const createQuiz = async () => {
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-80 cursor-pointer">
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
          <SelectTrigger className="w-48 cursor-pointer">
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
        <ExamModeSwitch
          isExamMode={isExamMode}
          onToggle={() => setIsExamMode(!isExamMode)}
        />
        <Button
          onClick={createQuiz}
          size="sm"
          className="cursor-pointer"
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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
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
