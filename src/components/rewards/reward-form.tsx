"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Reward } from "@/api/types"

type FormData = {
  name: string
  costPoints: number
}

type Props = {
  reward?: Reward | null
  onSubmit: (data: FormData) => void
  loading?: boolean
}

export function RewardForm({ reward, onSubmit, loading }: Props) {
  const [name, setName] = useState(reward?.name ?? "")
  const [costPoints, setCostPoints] = useState<number>(reward?.costPoints ?? 0)

  useEffect(() => {
    setName(reward?.name ?? "")
    setCostPoints(reward?.costPoints ?? 0)
  }, [reward])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    onSubmit({
      name,
      costPoints,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Nombre de recompensa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Costo en puntos"
        value={costPoints}
        onChange={(e) => setCostPoints(Number(e.target.value))}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Guardando..." : "Guardar recompensa"}
      </Button>
    </form>
  )
}
