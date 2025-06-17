"use client";

import { RiLogoutCircleLine, RiMore2Line } from "@remixicon/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

interface UserProps {
  name: string;
  email: string;
  image?: string | null | undefined;
}

interface NavUserProps {
  user: UserProps;
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();

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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="in-data-[state=expanded]:size-6 transition-[width,height] duration-200 ease-in-out">
                <AvatarImage src={user?.image as string} alt={user?.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ms-1">
                <span className="truncate text-base">{user?.name}</span>
              </div>
              <div className="size-8 rounded-lg flex items-center justify-center bg-sidebar-accent/50 in-[[data-slot=dropdown-menu-trigger]:hover]:bg-transparent">
                <RiMore2Line className="size-5 opacity-40" size={20} />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem className="gap-3 px-1">
              <RiLogoutCircleLine
                size={20}
                className="text-muted-foreground/70"
                aria-hidden="true"
              />
              <Button
                variant="ghost"
                className="w-[180px]"
                onClick={handleSignOut}
              >
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
