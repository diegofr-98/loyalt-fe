"use client"

import { useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import DashboardLayout from "../../layouts/DashboardLayout"
import { Link } from "react-router-dom"
import { useBusiness } from "@/hooks/useBusiness"

export default function Settings() {
  const { business, loading } = useBusiness()

  const businessId = business?.uuid

  // Debug útil
  useEffect(() => {
    console.log("business actualizado:", business)
  }, [business])

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center gap-4">
          <SidebarTrigger />

          {/* Estado de carga */}
          {loading && (
            <p className="text-sm text-gray-500">Cargando negocio...</p>
          )}

          {/* Cuando ya existe el business */}
          {!loading && businessId && (
            <Link
              to={`/customer/${businessId}`}
              className="text-blue-600 underline"
            >
              Ir a customer
            </Link>
          )}

          {/* Fallback si algo falla */}
          {!loading && !businessId && (
            <p className="text-sm text-red-500">
              No se pudo obtener el businessId
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}