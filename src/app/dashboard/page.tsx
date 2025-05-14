import { ExamManager } from "@/components/ExamManager";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <ExamManager />
    </div>
  );
}
