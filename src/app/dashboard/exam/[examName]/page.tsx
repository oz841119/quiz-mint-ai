"use client";
import { Button } from "@/components/shadcn-ui/button";
import { BookOpen, BookOpenCheck, Plus } from "lucide-react";
import { useExamContext } from "./context";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { QuizCard } from "@/components/QuizCard";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn-ui/select";
import { MODEL_LANGUAGES } from "@/configs/modelLanguages";
import { MODELS } from "@/configs/models";
import { motion, AnimatePresence } from "framer-motion";

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
	const { exam } = useExamContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [quizList, setQuizList] = useState<Quiz[] | null>(null);
	const [selectedLanguage, setSelectedLanguage] = useState("zh-TW");
	const [selectedModel, setSelectedModel] = useState(MODELS[0].value);
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
					model: selectedModel,
				}),
			});
			if (!response.ok) {
				throw new Error("生成題目失敗，請重新再試。");
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
				<div className="flex items-center space-x-2">
				</div>
				<Select value={selectedModel} onValueChange={setSelectedModel}>
					<SelectTrigger className="w-80 cursor-pointer">
						<SelectValue placeholder="選擇模型" />
					</SelectTrigger>
					<SelectContent>
						{MODELS.map((model) => (
							<SelectItem key={model.value} value={model.value} className="cursor-pointer">
								{model.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
					<SelectTrigger className="w-48 cursor-pointer">
						<SelectValue placeholder="選擇語言" />
					</SelectTrigger>
					<SelectContent>
						{MODEL_LANGUAGES.map((lang) => (
							<SelectItem key={lang.value} value={lang.value} className="cursor-pointer">
								{lang.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
						variant="ghost"
						size="sm"
						className="text-xs text-gray-500 hover:text-blue-500 cursor-pointer"
						onClick={() => setIsExamMode(!isExamMode)}
					>
						{isExamMode ? (
							<>
								<BookOpenCheck className="h-4 w-4 mr-1.5" />
								學習模式
							</>
						) : (
							<>
								<BookOpen className="h-4 w-4 mr-1.5" />
								考試模式
							</>
						)}
					</Button>
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
					創建題目
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
						<QuizCard quiz={quiz} className="w-full" defaultIsExamMode={isExamMode} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
