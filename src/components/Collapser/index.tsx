export const Collapser = ({
	children,
	isOpen,
}: { children: React.ReactNode; isOpen: boolean }) => {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateRows: isOpen ? "1fr" : "0fr",
				transition: "grid-template-rows 0.3s ease-in-out",
			}}
		>
			<div
				style={{
					overflow: "hidden",
				}}
			>
				{children}
			</div>
		</div>
	);
};
