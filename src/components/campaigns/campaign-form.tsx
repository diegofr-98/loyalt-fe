"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Campaign } from "@/api/types"
import { useCampaigns } from "@/hooks/useCampaigns"

type Props = {
  campaign?: Campaign | null
  onSubmit?: (data: Campaign) => void
}

export function CampaignForm({ campaign, onSubmit }: Props) {

  const { createCampaign, updateCampaign, loading } = useCampaigns()

  console.log(campaign, 'campaign form')
  const [name, setName] = useState(campaign?.name ?? "")
  const [points, setPoints] = useState<number>(campaign?.points ?? 0)
  const [startDate, setStartDate] = useState(campaign?.startDate ?? "")
  const [finishDate, setFinishDate] = useState(campaign?.finishDate ?? "")

  const formatDate = (date: string) => {
    return new Date(date).toISOString()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = {
        name,
        startDate: formatDate(startDate),
        finishDate: formatDate(finishDate),
        points,
      }

      let response

      if (campaign) {
        response = await updateCampaign(campaign.uuid, payload)
        console.log("EDITING CAMPAIGN >>>", campaign)
      } else {
        response = await createCampaign(payload)
      }

      console.log("campaign response", response)

      onSubmit?.(response)

    } catch (error) {
      console.error("Error saving campaign:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Input
        placeholder="Nombre de campaña"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Puntos"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
      />

      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <Input
        type="date"
        value={finishDate}
        onChange={(e) => setFinishDate(e.target.value)}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar campaña"}
      </Button>

    </form>
  )
}