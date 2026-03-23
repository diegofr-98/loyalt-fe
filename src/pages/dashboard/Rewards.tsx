"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

import { useCampaigns } from "@/hooks/useCampaigns"

import { CampaignHeader } from "@/components/campaigns/campaign-header"
import { CampaignTable } from "@/components/campaigns/campaign-table"
import { CampaignPagination } from "@/components/campaigns/campaign-pagination"
import { CampaignDialog } from "@/components/campaigns/campaign-dialog"
import DashboardLayout from "@/layouts/DashboardLayout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { type Campaign } from "@/api/types"

export default function RewardsPage() {

  const {
    visibleCampaigns,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    createCampaign,
    updateCampaign,
    loading,

  } = useCampaigns()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  const handleCreate = () => {
    setSelectedCampaign(null)
    setDialogOpen(true)
  }

  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setDialogOpen(true)
  }

  return (
    <DashboardLayout>

      <div className="p-8 space-y-8">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
        </div>
      </div>

      <div className="p-8 space-y-6">

        <CampaignHeader
          search={search}
          setSearch={setSearch}
          onCreate={handleCreate}
        />

        <Card>
          <CardContent className="p-0">
            <CampaignTable
              campaigns={visibleCampaigns}
              onEdit={handleEdit}
            />
          </CardContent>
        </Card>

        <CampaignPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

        {/* ✅ DIALOG conectado al backend */}
        <CampaignDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          campaign={selectedCampaign}
          createCampaign={createCampaign}
          updateCampaign={updateCampaign}
          loading={loading}
        />

      </div>

    </DashboardLayout>
  )
}
