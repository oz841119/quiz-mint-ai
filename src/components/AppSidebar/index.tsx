import { exams } from "@/config/exam";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../shadcn-ui/sidebar";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Quiz Mint AI</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup>
          <SidebarGroupLabel>EXAM</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {exams.map((exam) => (
                  <SidebarMenuButton key={exam.routeParam}>
                    <a href={`/dashboard/exam/${exam.routeParam}`}>{exam.menuLabel}</a>
                  </SidebarMenuButton>
                ))}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
};
