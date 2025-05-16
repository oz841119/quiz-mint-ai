import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, BookOpenCheck, Brain, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Collapser } from "../Collapser";
import { ExamModeSwitch } from "../ExamModeSwitch";
import { PingAnimation } from "../PingAnimation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadcn-ui/card";

type Quiz = {
  question: string;
  options: string[];
  answers: number[];
  explanation: string;
  model: string;
};

export const QuizCard = ({
  quiz,
  className,
  defaultIsExamMode = false,
}: {
  quiz: Quiz;
  className?: string;
  defaultIsExamMode?: boolean;
}) => {
  const [isExamMode, setIsExamMode] = useState(defaultIsExamMode);
  return (
    <Card
      className={cn(
        "hover:shadow-md transition-shadow duration-200",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2 items-center">
            <Brain className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-sm text-gray-700 leading-relaxed flex-1">
              {quiz.question}
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-gray-500 whitespace-nowrap">
            {quiz.model}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {quiz.options.map((option, index) => (
            <motion.div
              key={option}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-2.5 rounded-md border text-sm ${
                !isExamMode && quiz.answers.includes(index)
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                {!isExamMode && quiz.answers.includes(index) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  </motion.div>
                )}
                {option}
              </div>
            </motion.div>
          ))}
        </div>
        <Collapser isOpen={!isExamMode}>
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h3 className="text-xs font-medium text-gray-500 mb-1.5">
              Explanation
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {quiz.explanation}
            </p>
          </div>
        </Collapser>
        <div className="flex justify-end pt-2 border-t relative">
          <ExamModeSwitch
            isExamMode={isExamMode}
            onToggle={() => setIsExamMode(!isExamMode)}
          />
          {isExamMode && (
            <PingAnimation className="absolute right-0 top-0 translate-y-1/2 translate-x-1/2" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
