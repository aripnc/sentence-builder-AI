"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import {
  ChevronUp,
  FolderHeart,
  Home,
  Router,
  SquareRoundCorner,
} from "lucide-react";
import { redirect } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Nova Palavra",
    url: "/vocabularies",
    icon: SquareRoundCorner,
  },
  {
    title: "Favoritos",
    url: "/words",
    icon: FolderHeart,
  },
];

export function AppSidebar() {
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login");
        },
        onError: (error) => {
          console.log("erro", error);
        },
      },
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-secondary">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="py-2 space-y-1">
              {items.map((item) => (
                <SidebarMenuButton
                  className="bg-primary text-base font-semibold rounded-sm hover:bg-primary/80"
                  key={item.title}
                  asChild
                >
                  <a href={item.url}>
                    <item.icon className="text-primary-foreground" />
                    <span className="text-primary-foreground">
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-secondary">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-0">
            <SidebarMenuButton className="bg-primary hover:bg-primary/80 outline-0">
              <div className="text-base font-semibold text-primary-foreground">
                {session?.user.email}
              </div>
              <ChevronUp className="ml-auto text-primary-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-base font-semibold text-muted-foreground"
              >
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
