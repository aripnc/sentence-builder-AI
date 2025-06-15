"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { ChevronUp, FolderHeart, Home, SquareRoundCorner } from "lucide-react";
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
    title: "Revisar",
    url: "/review",
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
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="bg-primary text-white text-3xl flex items-center px-4 py-6 font-semibold">
        PhraseMind
      </SidebarHeader>
      <SidebarContent className="bg-secondary">
        <SidebarGroup className="px-2">
          <SidebarGroupContent>
            <SidebarMenu className="mt-5 space-y-1">
              {items.map((item) => (
                <SidebarMenuButton
                  className="bg-primary rounded-none hover:bg-primary/80 active:bg-primary/80 text-base font-semibold"
                  key={item.title}
                  asChild
                >
                  <a href={item.url}>
                    <item.icon className="text-white" />
                    <span className="text-white">{item.title}</span>
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
            <SidebarMenuButton className="flex bg-primary py-6 justify-center hover:bg-primary/80 outline-0">
              <div className="flex items-center gap-x-3">
                <div className="flex flex-row flex-wrap items-center gap-12">
                  <Avatar>
                    <AvatarImage
                      className="rounded-lg"
                      src={session?.user.image as string}
                      alt="@shadcn"
                    />
                  </Avatar>
                </div>
                <div className="text-base font-semibold text-white">
                  {session?.user.name}
                </div>
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
