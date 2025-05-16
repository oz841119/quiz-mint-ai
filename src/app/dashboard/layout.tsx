"use client";
import { AppSidebar } from "@/components/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
import { ExamProvider } from "@/contexts/examsContext";
import { StorageProvider } from "@/contexts/storageContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StorageProvider>
      <ExamProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </ExamProvider>
    </StorageProvider>
  );
}
