"use client"

import { useRef } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import DashboardLayout from "../../layouts/DashboardLayout"
import { useBusiness } from "@/hooks/useBusiness"
import QRCode from "react-qr-code"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { DownloadIcon, ExternalLinkIcon } from "lucide-react"

export default function Settings() {
  const { business, loading } = useBusiness()
  const qrWrapperRef = useRef<HTMLDivElement>(null)

  const businessId = business?.uuid
  const businessName = business?.name
  const customerUrl =
    businessId && typeof window !== "undefined"
      ? `${window.location.origin}/customer/${businessId}`
      : ""

  const handleDownloadQr = () => {
    const svg = qrWrapperRef.current?.querySelector("svg")

    if (!svg || !businessId) return

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svg)
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `customer-qr-${businessId}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center gap-4">
          <SidebarTrigger />
        </div>

        {loading && (
          <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <Spinner className="size-8" />
              <p className="text-sm text-muted-foreground">
                Cargando configuracion del negocio...
              </p>
            </div>
          </div>
        )}

        {!loading && businessId && (
          <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="inline-flex flex-col gap-5 rounded-2xl border bg-white p-6 shadow-sm">
              <div className="space-y-1">
                <p className="max-w-[320px] text-2xl font-semibold tracking-tight">
                  !ESCANEA Y UNETE!
                </p>
                <p className="max-w-[320px] text-sm text-muted-foreground">
                  Acumula puntos en cada compra y canjea por regalos
                  exclusivos.
                </p>
              </div>

              <div
                ref={qrWrapperRef}
                className="flex items-center justify-center rounded-xl border bg-white p-4"
              >
                <QRCode value={customerUrl} size={180} />
              </div>

              <p className="max-w-[280px] break-all text-xs text-gray-500">
                {customerUrl}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" onClick={handleDownloadQr}>
                  <DownloadIcon />
                  Descargar QR
                </Button>

                <Button asChild variant="outline">
                  <a href={customerUrl} target="_blank" rel="noreferrer">
                    <ExternalLinkIcon />
                    Ir al link
                  </a>
                </Button>
              </div>

              <p className="max-w-[320px] text-xs text-muted-foreground">
                Este es el Banner Fisico que veria el cliente en tu tienda.
              </p>
            </div>
          </div>
        )}

        {!loading && !businessId && (
          <div className="flex min-h-[60vh] items-center justify-center px-4">
            <Empty className="w-full max-w-sm">
              <EmptyHeader>
                <Button variant="outline" disabled size="sm">
                  <Spinner data-icon="inline-start" />
                  
                </Button>
                <EmptyTitle>Por favor espera unos segundos</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
