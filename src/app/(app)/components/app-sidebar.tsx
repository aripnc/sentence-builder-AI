"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { RiQuestionAnswerFill } from "@remixicon/react";
import { Home, HousePlus, SmilePlus } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { NavUser } from "./nav-user";

interface UserProps {
  name: string;
  email: string;
  image?: string | null | undefined;
}

const data = {
  navMain: [
    {
      title: "Options",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
          isActive: true,
        },
        {
          title: "Nova Palavra",
          url: "/vocabularies",
          icon: HousePlus,
        },
        {
          title: "Revisar",
          url: "/review",
          icon: SmilePlus,
        },
      ],
    },
  ],
};

export function AppSidebar() {
  const { data: session } = authClient.useSession();
  const path = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="text-base h-16 max-md:mt-2 mb-2 justify-center">
        <RiQuestionAnswerFill className="size-7" />
      </SidebarHeader>
      <SidebarContent className="-mt-2">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/65">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button group-data-[collapsible=icon]:px-[5px]! text-base gap-3 h-9 [&>svg]:size-auto"
                      tooltip={item.title}
                      isActive={item.url === path}
                    >
                      <a href={item.url}>
                        {item.icon && (
                          <item.icon
                            className="text-muted-foreground/65 group-data-[active=true]/menu-button:text-primary"
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user as UserProps} />
      </SidebarFooter>
    </Sidebar>

    // <Sidebar collapsible="offcanvas">
    //   <SidebarHeader className="flex flex-row items-center bg-primary text-white text-3xl px-4 py-6 font-semibold">
    //     <RiQuestionAnswerFill className="size-7" />
    //     PhrasalMind
    //   </SidebarHeader>
    //   <SidebarContent className="bg-secondary">
    //     <SidebarGroup className="px-2">
    //       <SidebarGroupContent>
    //         <SidebarMenu className="mt-5 space-y-1">
    //           {items.map((item) => (
    //             <SidebarMenuButton
    //               className="bg-primary rounded-none hover:bg-primary/80 active:bg-primary/80 text-base font-semibold"
    //               key={item.title}
    //               asChild
    //             >
    //               <a href={item.url}>
    //                 <item.icon className="text-white" />
    //                 <span className="text-white">{item.title}</span>
    //               </a>
    //             </SidebarMenuButton>
    //           ))}
    //         </SidebarMenu>
    //       </SidebarGroupContent>
    //     </SidebarGroup>
    //   </SidebarContent>
    //   <SidebarFooter className="bg-secondary">
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild className="border-0">
    //         <SidebarMenuButton className="flex bg-primary py-6 justify-center hover:bg-primary/80 outline-0">
    //           <div className="flex items-center gap-x-3">
    //             <div className="flex flex-row flex-wrap items-center gap-12">
    //               <Avatar>
    //                 <AvatarImage
    //                   className="rounded-lg"
    //                   src={session?.user.image as string}
    //                   alt="@shadcn"
    //                 />
    //               </Avatar>
    //             </div>
    //             <div className="text-base font-semibold text-white">
    //               {session?.user.name}
    //             </div>
    //           </div>
    //           <ChevronUp className="ml-auto text-primary-foreground" />
    //         </SidebarMenuButton>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent side="top">
    //         <DropdownMenuItem>
    //           <Button
    //             variant="ghost"
    //             onClick={handleSignOut}
    //             className="text-base font-semibold text-muted-foreground"
    //           >
    //             Log out
    //           </Button>
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </SidebarFooter>
    // </Sidebar>
  );
}
