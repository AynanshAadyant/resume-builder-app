import { AppSidebar } from "@/components/app-sidebar"
import Navigation from "@/components/Dashboard/dashboard-navigation"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function Dashboard() {
    return (
        <SidebarProvider className="bg-(--background) text-(--on-surface)">
            <AppSidebar />
            <SidebarInset className="bg-(--background)">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-4 bg-(--surface)/80 backdrop-blur-md sticky top-0 z-40">
                    <SidebarTrigger className="-ml-1 text-(--on-surface-variant)" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4 bg-white/10"
                    />
                    <Navigation />
                </header>
                <div className="flex flex-1 flex-col p-8">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
