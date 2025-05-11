import { ExamProvider } from "./[examName]/context";

export default function ExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ExamProvider>{children}</ExamProvider>;
}
