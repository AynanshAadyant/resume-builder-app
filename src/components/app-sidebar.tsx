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
    <Sidebar className="border-r border-[var(--outline-variant)]/10 bg-[var(--surface-container-low)]" {...props}>
      <SidebarHeader className="mb-8 px-4 pt-6">
        <Link to="/dashboard" className="flex flex-col">
          <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight font-['Satoshi']">ResumeAI</h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)] mt-1 font-['Inter']">Career OS</p>
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
                    <SidebarMenuButton asChild isActive={isActive} className="hover:bg-[var(--surface-container-highest)] data-[active=true]:bg-[var(--surface-container-highest)] data-[active=true]:text-[var(--primary)] text-[var(--on-surface-variant)] transition-colors py-6">
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

      <SidebarFooter className="px-4 pb-6 border-t border-[var(--outline-variant)]/10 pt-6 mt-auto">
        <SidebarMenu className="space-y-1 mb-6">
          {data.navFooter.map((item) => {
            const isActive = location.pathname.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive} className={`py-6 transition-colors ${isActive ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-bold' : 'text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-highest)]'}`}>
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-base font-['Inter']">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        
        <div className="p-4 rounded-xl bg-[var(--surface-container-highest)]/50 border border-[var(--outline-variant)]/10">
          <Button className="w-full bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90 font-semibold text-xs uppercase tracking-widest py-6 rounded-lg transition-transform active:scale-[0.98]">
            Upgrade to Pro
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

