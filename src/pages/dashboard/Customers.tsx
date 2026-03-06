import { useEffect, useState } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Customers() {

  const [customers, getCustomers] = useState([])

  useEffect(() => {
    // Aquí iría la lógica para obtener los clientes desde tu backend o base de datos
    // Por ejemplo:
    // const fetchCustomers = async () => {
    //   const { data } = await supabase.from('customers').select('*')
    //   setCustomers(data)
    // }
    // fetchCustomers()
  }, [])

  return (
        <DashboardLayout>
          <div className="p-8 space-y-8">

            <div className="flex items-center gap-4">

              <SidebarTrigger />

              <div>
                <h1 className="text-3xl font-bold">
                  Clientes
                </h1>

                <p className="text-muted-foreground">
                  Lista de clientes registrados
                </p>
              </div>

            </div>

            {/* Aquí iría la tabla o lista de clientes */}

          </div>
        </DashboardLayout>
  )
}