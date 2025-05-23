import { useExamsContext } from "@/contexts/examsContext";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AddExamDialog } from "../AddExamDialog";
import Logo from "../Logo";
import { Button } from "../shadcn-ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "../shadcn-ui/sidebar";
export const AppSidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isAddExamDialogOpen, setIsAddExamDialogOpen] = useState(false);
  const { exams, addExam } = useExamsContext();
  const handleAddExam = (exam: {
    name: string;
  }) => {
    addExam({
      name: exam.name,
      routeParam: crypto.randomUUID(),
      pageLabel: exam.name,
      menuLabel: exam.name,
    });
  };
  const { setOpenMobile: setOpenMobileSidebar } = useSidebar();
  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex items-center gap-3 px-4 py-3 border-b">
          <Link href="/">
            <Logo />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center justify-between w-full">
                <span>Main Menu</span>
              </div>
            </SidebarGroupLabel>
            <ul className="flex flex-col">
              <li
                className={cn(
                  "text-sm px-2 rounded-md",
                  isActive("/dashboard")
                    ? "bg-foreground/10"
                    : "hover:bg-foreground/5",
                )}
              >
                <Link
                  href="/dashboard"
                  className="py-2 flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center justify-between w-full">
                <span>Exams</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setIsAddExamDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </SidebarGroupLabel>
            <ul className="flex flex-col">
              {exams.map((exam) => (
                <li
                  key={exam.routeParam}
                  className={cn(
                    "text-sm px-2 rounded-md",
                    isActive(`/dashboard/exam/${exam.routeParam}`)
                      ? "bg-foreground/10"
                      : "hover:bg-foreground/5",
                  )}
                >
                  <Link
                    href={`/dashboard/exam/${exam.routeParam}`}
                    className="block py-2"
                    onClick={() => setOpenMobileSidebar(false)}
                  >
                    {exam.menuLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </SidebarGroup>
        </SidebarContent>
        {/* <SidebarFooter className="border-t">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Username</p>
              <p className="text-xs text-muted-foreground truncate">
                user@example.com
              </p>
            </div>
          </div>
        </SidebarFooter> */}
      </Sidebar>
      <AddExamDialog
        isOpen={isAddExamDialogOpen}
        onOpenChange={setIsAddExamDialogOpen}
        onSubmit={handleAddExam}
      />
    </>
  );
};
