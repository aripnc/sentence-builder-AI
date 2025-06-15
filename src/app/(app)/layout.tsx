import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppSidebar } from "./components/app-sidebar";
import { ModeToggle } from "./components/mode-toggle";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col">
        <div className="flex items-center py-2 justify-between px-4 bg-secondary">
          <SidebarTrigger />
          <ModeToggle />
        </div>

        {children}
      </div>
    </SidebarProvider>
  );
}
