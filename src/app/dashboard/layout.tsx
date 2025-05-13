"use client";
import {
	SidebarProvider,
	SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ExamProvider } from "@/contexts/examsContext";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ExamProvider>
			<SidebarProvider>
				<AppSidebar />
				<main className="flex-1">
					<SidebarTrigger />
					{children}
				</main>
			</SidebarProvider>
		</ExamProvider>
	);
}
