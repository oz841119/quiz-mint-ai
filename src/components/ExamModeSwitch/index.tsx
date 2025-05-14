import { BookOpen, BookOpenCheck } from "lucide-react";
import { Button } from "../shadcn-ui/button";
import { cn } from "@/lib/utils";

interface ExamModeSwitchProps {
  isExamMode: boolean;
  onToggle: () => void;
  className?: string;
}

export const ExamModeSwitch = ({
  isExamMode,
  onToggle,
  className,
}: ExamModeSwitchProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "text-xs cursor-pointer",
        isExamMode
          ? "text-gray-500 hover:text-blue-500"
          : "bg-green-50 text-green-700 hover:bg-green-100",
        className,
      )}
      onClick={onToggle}
    >
      {isExamMode ? (
        <>
          <BookOpen className="h-4 w-4 mr-1.5" />
          Exam Mode
        </>
      ) : (
        <>
          <BookOpenCheck className="h-4 w-4 mr-1.5" />
          Study Mode
        </>
      )}
    </Button>
  );
};
