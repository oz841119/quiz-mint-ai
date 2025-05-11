import { EXAMS } from "@/configs/exams";
import Image from "next/image";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../shadcn-ui/sidebar";
import Logo from "../Logo";

export const AppSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader className="flex items-center gap-3 px-4 py-3 border-b">
				<Logo />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup>
					<SidebarGroupLabel>EXAM</SidebarGroupLabel>
					<SidebarContent>
						<SidebarMenu>
							<SidebarMenuItem>
								{EXAMS.map((exam) => (
									<SidebarMenuButton key={exam.routeParam}>
										<a href={`/dashboard/exam/${exam.routeParam}`}>
											{exam.menuLabel}
										</a>
									</SidebarMenuButton>
								))}
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};
