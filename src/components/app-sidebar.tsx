import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router"
import {
  LayoutDashboard,
  UserCircle,
  Brain,
  FileEdit
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
import api from "@/api/api"
import { toast } from "sonner"

const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Profile Builder", url: "/dashboard/profile", icon: UserCircle },
    { title: "AI Workspace", url: "/dashboard/ai", icon: Brain },
    { title: "Resume Editor", url: "/dashboard/resume", icon: FileEdit },
  ],
  navFooter: [
    // { title : "Settings", url: "/dashboard/settings", icon: Settings },
    // { title : "Support", url: "/dashboard/support", icon: HelpCircle }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const navigate = useNavigate()

  const handleLogout = async () => {
    const logout = await api.post('/auth/logout')
    if (logout.success) {
      toast.success("Log out successful");
      navigate("/");
    }
  }

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
        <Button
          onClick={() => {
            handleLogout()
          }}
          className="bg-red-600 text-white font-[Satoshi] font-bold  hover:bg-red-800"> Logout </Button>

      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
