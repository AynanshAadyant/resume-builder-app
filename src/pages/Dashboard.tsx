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
        <SidebarProvider className="bg-[#f6f8fb] text-slate-900">
            <AppSidebar />
            <SidebarInset className="bg-[#f6f8fb]">
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md">
                    <SidebarTrigger className="-ml-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 bg-slate-200 data-[orientation=vertical]:h-4"
                    />
                    <Navigation />
                </header>
                <div className="flex flex-1 flex-col">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
