import * as React from "react"
import { Link, useLocation } from "react-router"
import {
  LayoutDashboard,
  UserCircle,
  Brain,
  FileEdit,
  LineChart,
  Settings,
  HelpCircle
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Profile Builder", url: "/dashboard/profile", icon: UserCircle },
    { title: "AI Workspace", url: "/dashboard/ai", icon: Brain },
    { title: "Resume Editor", url: "/dashboard/resume", icon: FileEdit },
    { title: "Insights", url: "/dashboard/insights", icon: LineChart }
  ],
  navFooter : [
    { title : "Settings", url: "/dashboard/settings", icon: Settings },
    { title : "Support", url: "/dashboard/support", icon: HelpCircle }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-slate-200 bg-white" {...props}>
      <SidebarHeader className="mb-6 px-4 pt-6">
        <Link to="/dashboard" className="flex flex-col">
          <h1 className="font-['Satoshi'] text-2xl font-bold text-slate-950">ResumeAI</h1>
          <p className="mt-1 font-['Inter'] text-xs font-semibold uppercase text-slate-500">Career OS</p>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {data.navMain.map((item) => {
                const isActive = location.pathname === item.url || (item.url !== '/dashboard' && location.pathname.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} className="py-5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 data-[active=true]:bg-slate-950 data-[active=true]:text-white">
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="text-base font-['Inter']">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-slate-200 px-4 pb-6 pt-6">
        <SidebarMenu className="space-y-1 mb-6">
          {data.navFooter.map((item) => {
            const isActive = location.pathname.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive} className={`py-5 transition-colors ${isActive ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950'}`}>
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-base font-['Inter']">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <Button className="w-full rounded-lg bg-slate-950 py-5 text-xs font-semibold uppercase text-white transition-transform hover:bg-slate-800 active:scale-[0.98]">
            Upgrade to Pro
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
