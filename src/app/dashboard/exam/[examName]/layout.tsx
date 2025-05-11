"use client";
import { useExamContext } from "./context";

export default function ExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { exam } = useExamContext();
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">{exam?.pageLabel}</h1>
			{children}
		</div>
	);
}
