"use client";
import { useExamsContext } from "@/contexts/examsContext";
export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { exam } = useExamsContext();
  return (
    <div>
      <h1 className="md:text-2xl font-bold mb-4">{exam?.pageLabel}</h1>
      {children}
    </div>
  );
}
