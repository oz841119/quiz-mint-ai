import { EXAMS } from "@/configs/exams";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
} from "../shadcn-ui/sidebar";
import Logo from "../Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export const AppSidebar = () => {
	const pathname = usePathname();
	const isActive = (path: string) => pathname === path;
	return (
		<Sidebar>
			<SidebarHeader className="flex items-center gap-3 px-4 py-3 border-b">
				<Logo />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>EXAM</SidebarGroupLabel>
						<ul className="flex flex-col">
							{EXAMS.map((exam) => (
								<li
									key={exam.routeParam}
									className={cn("text-sm px-2 rounded-md", isActive(`/dashboard/exam/${exam.routeParam}`) ? "bg-foreground/10" : "hover:bg-foreground/5")}
								>
									<Link href={`/dashboard/exam/${exam.routeParam}`} className="block py-2">
										{exam.menuLabel}
									</Link>
								</li>
							))}
						</ul>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="border-t">
				<div className="flex items-center gap-3 px-4 py-3">
					<div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
						<User className="w-4 h-4" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">Username</p>
						<p className="text-xs text-muted-foreground truncate">user@example.com</p>
					</div>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
};
