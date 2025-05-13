"use client";
import { createContext, useContext, useState } from "react";
import { useParams } from "next/navigation";
import { EXAMS } from "@/configs/exams";

type Exam = {
	name: string;
	routeParam: string;
	pageLabel: string;
	menuLabel: string;
};

type ExamsContextType = {
	exam: Exam | null;
	addExam: (exam: Exam) => void;
	exams: Exam[];
};

export const ExamsContext = createContext<ExamsContextType>({
	exam: null,
	addExam: () => { },
	exams: [],
});

export const useExamsContext = () => {
	return useContext(ExamsContext);
};

export const ExamProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const params = useParams();
	const examName = params.examName;
	const [exams, setExams] = useState<Exam[]>(EXAMS);
	const addExam = (exam: Exam) => {
		setExams([exam, ...exams]);
	};
	const exam = exams.find((exam) => exam.routeParam === examName) || null;
	return (
		<ExamsContext.Provider
			value={{
				exam,
				addExam,
				exams,
			}}
		>
			{children}
		</ExamsContext.Provider>
	);
};
