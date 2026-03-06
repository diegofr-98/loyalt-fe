import { useEffect, useState } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Campaigns() {

  const [campaings, getCampaigns] = useState([])

  useEffect(() => {
    // Aquí iría la lógica para obtener las campañas desde tu backend o base de datos
    // Por ejemplo:
    // const fetchCampaigns = async () => {
    //   const { data } = await supabase.from('campaigns').select('*')
    //   setCampaigns(data)
    // }
    // fetchCampaigns()
  }, [])

  return (
        <DashboardLayout>
          <div className="p-8 space-y-8">

            <div className="flex items-center gap-4">

              <SidebarTrigger />

              <div>
                <h1 className="text-3xl font-bold">
                  Campañas
                </h1>

                <p className="text-muted-foreground">
                  Lista de campañas registradas
                </p>
              </div>

            </div>

            {/* Aquí iría la tabla o lista de campañas */}

          </div>
        </DashboardLayout>
  )
}