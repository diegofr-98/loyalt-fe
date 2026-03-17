"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { CampaignForm } from "./campaign-form"
import { type Campaign } from "@/api/types"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaign?: Campaign | null
  onSuccess?: (campaign: Campaign) => void
}

export function CampaignDialog({
                                 open,
                                 onOpenChange,
                                 campaign,
                                 onSuccess,
                               }: Props) {

  const handleSuccess = (data: Campaign) => {
    onSuccess?.(data)
    onOpenChange(false)
  }

  console.log(campaign, 'campaign dialog')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">

        <DialogHeader>
          <DialogTitle>
            {campaign ? "Editar campaña" : "Nueva campaña"}
          </DialogTitle>
        </DialogHeader>

        <CampaignForm
          campaign={campaign}
          onSubmit={handleSuccess}
        />

      </DialogContent>
    </Dialog>
  )
}