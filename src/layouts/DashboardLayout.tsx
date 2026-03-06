import type { ReactNode } from "react"
import { AppSidebar } from "../components/AppSidebar"
import { useAuth } from "../hooks/useAuth"

import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  )
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const { open } = useSidebar()
  const { session } = useAuth()

  const name = session?.user.user_metadata.name ?? "Usuario"

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar name={name} />

      <SidebarInset className={open ? "flex-1 ml-32" : "flex-1"}>
        {children}
      </SidebarInset>
    </div>
  )
}