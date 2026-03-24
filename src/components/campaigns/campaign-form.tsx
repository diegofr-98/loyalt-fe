"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Campaign } from "@/api/types"

type FormData = {
  name: string
  startDate: string
  finishDate: string
  points: number
}

type Props = {
  campaign?: Campaign | null
  onSubmit: (data: FormData) => void
  loading?: boolean
}

export function CampaignForm({ campaign, onSubmit, loading }: Props) {
  const [name, setName] = useState(campaign?.name ?? "")
  const [points, setPoints] = useState<number>(campaign?.points ?? 0)
  const [startDate, setStartDate] = useState(campaign?.startDate ?? "")
  const [finishDate, setFinishDate] = useState(campaign?.finishDate ?? "")

  useEffect(() => {
    setName(campaign?.name ?? "")
    setPoints(campaign?.points ?? 0)
    setStartDate(campaign?.startDate ? campaign.startDate.slice(0, 10) : "")
    setFinishDate(campaign?.finishDate ? campaign.finishDate.slice(0, 10) : "")
  }, [campaign])

  const formatDate = (date: string) => new Date(date).toISOString()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !startDate || !finishDate) return

    onSubmit({
      name,
      startDate: formatDate(startDate),
      finishDate: formatDate(finishDate),
      points,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Campaign name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="text"
        inputMode="numeric"
        placeholder="Points"
        value={points === 0 ? "" : points}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "")
          setPoints(value ? Number(value) : 0)
        }}
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
        {loading ? "Saving..." : "Save campaign"}
      </Button>
    </form>
  )
}
