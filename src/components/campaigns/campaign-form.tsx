"use client"

import { useState } from "react"
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

  const formatDate = (date: string) => {
    return new Date(date).toISOString()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 🔥 validación básica
    if (!name || !startDate || !finishDate) return

    const payload: FormData = {
      name,
      startDate: formatDate(startDate),
      finishDate: formatDate(finishDate),
      points,
    }

    onSubmit(payload) // ✅ limpio, sin undefined
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