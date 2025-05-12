"use client";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
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
				<Select value={selectedModel} onValueChange={setSelectedModel}>
					<SelectTrigger className="w-80">
						<SelectValue placeholder="選擇模型" />
					</SelectTrigger>
					<SelectContent>
						{MODELS.map((model) => (
							<SelectItem key={model.value} value={model.value}>
								{model.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
					<SelectTrigger className="w-48">
						<SelectValue placeholder="選擇語言" />
					</SelectTrigger>
					<SelectContent>
						{MODEL_LANGUAGES.map((lang) => (
							<SelectItem key={lang.value} value={lang.value}>
								{lang.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
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
			{quizList?.map((quiz) => (
				<QuizCard key={quiz.id} quiz={quiz} className="w-full" />
			))}
		</div>
	);
}
