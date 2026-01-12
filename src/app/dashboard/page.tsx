import { ExamManager } from "@/components/ExamManager";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Quiz Mint AI",
  description: "Manage your exams and track your progress with Quiz Mint AI dashboard.",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <ExamManager />
    </div>
  );
}
