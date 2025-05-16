"use client";
import { EXAMS } from "@/configs/exams";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useStorage } from "./storageContext";

type Exam = {
  name: string;
  routeParam: string;
  pageLabel: string;
  menuLabel: string;
};

type ExamsContextType = {
  exam: Exam | null;
  addExam: (exam: Exam) => void;
  removeExam: (routeParam: string) => void;
  exams: Exam[];
  isLoading: boolean;
};

export const ExamsContext = createContext<ExamsContextType>({
  exam: null,
  addExam: () => {},
  removeExam: () => {},
  exams: [],
  isLoading: false,
});

export const useExamsContext = () => {
  return useContext(ExamsContext);
};

const STORAGE_KEY = "quiz-mint-ai-exams";

export const ExamProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = useParams();
  const examName = params.examName;
  const storage = useStorage();
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load exams from storage on mount
  useEffect(() => {
    const loadExams = async () => {
      setIsLoading(true);
      try {
        const storedExams = await storage.getItem<Exam[]>(STORAGE_KEY);
        setExams(storedExams || EXAMS);
      } catch (error) {
        console.error("Error loading exams:", error);
        setExams(EXAMS);
      } finally {
        setIsLoading(false);
      }
    };

    loadExams();
  }, [storage]);

  // Save exams to storage whenever they change
  useEffect(() => {
    const saveExams = async () => {
      if (exams.length > 0 && !isLoading) {
        try {
          await storage.setItem(STORAGE_KEY, exams);
        } catch (error) {
          console.error("Error saving exams:", error);
        }
      }
    };

    saveExams();
  }, [exams, storage, isLoading]);

  const addExam = (exam: Exam) => {
    const newExams = [exam, ...exams];
    setExams(newExams);
  };

  const removeExam = (routeParam: string) => {
    const newExams = exams.filter((exam) => exam.routeParam !== routeParam);
    setExams(newExams);
  };

  const exam = exams.find((exam) => exam.routeParam === examName) || null;

  return (
    <ExamsContext.Provider
      value={{
        exam,
        addExam,
        removeExam,
        exams,
        isLoading,
      }}
    >
      {children}
    </ExamsContext.Provider>
  );
};
