"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { CampaignForm } from "./campaign-form"
import { type Campaign } from "@/api/types"

type FormData = {
  name: string
  startDate: string
  finishDate: string
  points: number
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaign?: Campaign | null
  createCampaign: (data: FormData) => Promise<Campaign>
  updateCampaign: (uuid: string, data: FormData) => Promise<Campaign>
  loading?: boolean
  onSuccess?: (campaign: Campaign) => void
}

export function CampaignDialog({
                                 open,
                                 onOpenChange,
                                 campaign,
                                 createCampaign,
                                 updateCampaign,
                                 loading,
                                 onSuccess,
                               }: Props) {
  const handleSubmit = async (data: FormData) => {
    try {
      let result: Campaign

      if (campaign) {
        // ✏️ UPDATE
        result = await updateCampaign(
          campaign.uuid,
          data
        )
      } else {
        // ➕ CREATE
        result = await createCampaign(data)
      }

      onSuccess?.(result)
      onOpenChange(false)

    } catch (error) {
      console.error("Error saving campaign:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">

        <DialogHeader>
          <DialogTitle>
            {campaign ? "Editar campaña" : "Nueva campaña"}
          </DialogTitle>
        </DialogHeader>

        <CampaignForm
          campaign={campaign ?? undefined}
          onSubmit={handleSubmit}
          loading={loading}
        />

      </DialogContent>
    </Dialog>
  )
}
