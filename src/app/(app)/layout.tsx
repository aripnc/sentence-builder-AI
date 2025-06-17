import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
      <SidebarInset>
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="w-full flex flex-col justify-center">
            <div className="w-full flex items-center py-2 justify-between px-4">
              <SidebarTrigger />
              <ModeToggle />
            </div>
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
