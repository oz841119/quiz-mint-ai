export default function ExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="p-4">{children}</div>
	);
}
