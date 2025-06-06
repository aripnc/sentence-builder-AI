import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
      <main className="w-full p-5 flex flex-col">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <ModeToggle />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
