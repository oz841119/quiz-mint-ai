"use client";

import { useExamsContext } from "@/contexts/examsContext";
import { Button } from "../shadcn-ui/button";
import { Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../shadcn-ui/dialog";
import { AddExamDialog } from "../AddExamDialog";

export const ExamManager = () => {
  const { exams, addExam, removeExam, isLoading } = useExamsContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRemoveConfirmDialogOpen, setIsRemoveConfirmDialogOpen] =
    useState(false);
  const [examToRemove, setExamToRemove] = useState<string | null>(null);

  const handleAddExam = (exam: {
    name: string;
  }) => {
    addExam({
      name: exam.name,
      routeParam: crypto.randomUUID(),
      pageLabel: exam.name,
      menuLabel: exam.name,
    });
    setIsAddDialogOpen(false);
  };

  const confirmRemoveExam = (routeParam: string) => {
    setExamToRemove(routeParam);
    setIsRemoveConfirmDialogOpen(true);
  };

  const handleRemoveExam = () => {
    if (examToRemove) {
      removeExam(examToRemove);
      setExamToRemove(null);
      setIsRemoveConfirmDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Exam List</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus size={16} />
          <span>Add Exam</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">Loading...</div>
      ) : exams.length === 0 ? (
        <div className="py-8 text-center">
          No exams found. Please add an exam.
        </div>
      ) : (
        <div className="grid gap-3">
          {exams.map((exam) => (
            <div
              key={exam.routeParam}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <Link
                href={`/dashboard/exam/${exam.routeParam}`}
                className="flex-1"
              >
                <h3 className="font-medium hover:underline">{exam.name}</h3>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => confirmRemoveExam(exam.routeParam)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Remove Dialog */}
      <Dialog
        open={isRemoveConfirmDialogOpen}
        onOpenChange={setIsRemoveConfirmDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>
              Are you sure you want to delete this exam? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsRemoveConfirmDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRemoveExam}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddExamDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddExam}
      />
    </div>
  );
};
