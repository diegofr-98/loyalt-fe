import { useEffect, useState } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { DataTable } from "@/components/customers/data-table"
import { columns } from "@/components/customers/columns"
import { useBusiness } from "@/hooks/useBusiness"
import { useAuth } from "@/hooks/useAuth"
import { fetchCustomersByBusinessId } from "@/api/requests"
import type { Customer } from "@/api/types"

export default function Customers() {

  const { business } = useBusiness()
  const { session } = useAuth()

  const [customers, setCustomers] = useState<Customer[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const loadCustomers = async (pageNumber: number) => {

    if (!business?.uuid || !session?.access_token) return

    const response = await fetchCustomersByBusinessId(
      business.uuid,
      session.access_token,
      pageNumber,
      10
    )

    setCustomers(response.content)
    setTotalPages(response.totalPages)
    setPage(response.number)
  }

  useEffect(() => {
    loadCustomers(0)
  }, [business, session])

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">

        <div className="flex items-center gap-4">
          <SidebarTrigger />

          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">
              Lista de clientes registrados
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={customers}
          page={page}
          totalPages={totalPages}
          onPageChange={loadCustomers}
        />

      </div>
    </DashboardLayout>
  )
}