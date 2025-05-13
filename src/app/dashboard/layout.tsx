"use client";
import {
	SidebarProvider,
	SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
