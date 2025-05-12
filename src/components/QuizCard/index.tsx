import { Brain, CheckCircle2 } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../shadcn-ui/card";
import { cn } from "@/lib/utils";
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
}: {
	quiz: Quiz;
	className?: string;
}) => {
	return (
		<Card className={cn("hover:shadow-md transition-shadow duration-200", className)}>
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
						<div
							key={option}
							className={`p-2.5 rounded-md border text-sm ${
								quiz.answers.includes(index)
									? "bg-green-50 border-green-200 text-green-700"
									: "bg-gray-50 border-gray-200 text-gray-700"
							}`}
						>
							<div className="flex items-center">
								{quiz.answers.includes(index) && (
									<CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
								)}
								{option}
							</div>
						</div>
					))}
				</div>
				<div className="mt-4 p-3 bg-gray-50 rounded-md">
					<h3 className="text-xs font-medium text-gray-500 mb-1.5">解釋</h3>
					<p className="text-sm text-gray-600 leading-relaxed">
						{quiz.explanation}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
