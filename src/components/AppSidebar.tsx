import {
  LayoutDashboard,
  LogOut,
  Megaphone,
  QrCode,
  Gift,
  Users,
} from "lucide-react"

import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function AppSidebar({ name }: { name: string }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/signin")
  }

  return (
    <Sidebar className="h-screen">

      <SidebarHeader>

        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex flex-col text-sm">
            <span className="text-xs text-muted-foreground">
              User
            </span>
            <span className="font-semibold">{name}</span>
          </div>

        </div>

      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupLabel>
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard size={18} />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/customers")}>
                  <Users size={18} />
                  Clients
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/campaigns")}>
                  <Megaphone size={18} />
                  Campaigns
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/rewards")}>
                  <Gift size={18} />
                  Rewards
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/qr")}>
                  <QrCode size={18} />
                  QR
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Log out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarFooter>

    </Sidebar>
  )
}
