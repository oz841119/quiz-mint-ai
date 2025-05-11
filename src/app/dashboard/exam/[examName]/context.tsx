'use client'
import { createContext, useContext, useState } from "react";
import { exams } from "@/config/exam";
import { useParams } from "next/navigation";

type Exam = {
  name: string;
  routeParam: string;
  pageLabel: string;
  menuLabel: string;
};

type ExamContextType = {
  exam: Exam | null;
};

export const ExamContext = createContext<ExamContextType>({
  exam: null
});

export const useExamContext = () => {
  return useContext(ExamContext);
};

export const ExamProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const examName = params.examName;
  const exam = exams.find((exam) => exam.routeParam === examName) || null;
  return <ExamContext.Provider value={{ exam }}>{children}</ExamContext.Provider>;
};
