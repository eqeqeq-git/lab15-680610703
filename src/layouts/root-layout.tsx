import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-semibold tracking-wide text-foreground">
              ระบบลงทะเบียนเรียน
            </span>
          </div>
          <ModeToggle />
        </header>

        <main className="flex flex-1 flex-col">
          <div className="flex-1">
            <Outlet />
          </div>

          <footer className="border-t bg-background px-3 py-2 text-center text-[10px] text-muted-foreground sm:text-xs">
            จัดทำโดย Pakin Wataek รหัสนักศึกษา 680610703
          </footer>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
