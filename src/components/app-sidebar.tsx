import { Home, NotebookPen } from "lucide-react";
import { NavLink } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { currentUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
  const navItems = [
    { title: "หน้าแรก", to: "/", icon: Home },
    { title: "ลงทะเบียนเรียน", to: "/enrollment", icon: NotebookPen },
  ];

  return (
    <Sidebar className="border-r bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center">
          <p className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">
            CPE & ISNE
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            เมนูหลัก
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ title, to, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                  <NavLink to={to} end={to === "/"}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        className="w-full justify-start rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-200 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:data-[active=true]:bg-slate-800 dark:data-[active=true]:text-white"
                        tooltip={title}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto px-3 pb-4">
        <Separator className="mb-3 bg-slate-200 dark:bg-slate-800" />
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
            <AvatarImage src={currentUser.avatar} alt={currentUser.nickname} />
            <AvatarFallback className="bg-slate-200 text-[10px] text-slate-800 dark:bg-slate-700 dark:text-slate-100">
              {currentUser.nickname.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex flex-col">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
              {currentUser.nickname}
            </p>
            <Badge className="mt-0.5 w-fit border-0 bg-transparent px-0 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              {currentUser.role}
            </Badge>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
