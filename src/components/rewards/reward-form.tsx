"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Reward } from "@/api/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FormData = {
  name: string
  costPoints: number
  imgUrl: string
  imageFile: File | null
  active: boolean
}

type Props = {
  reward?: Reward | null
  onSubmit: (data: FormData) => void
  loading?: boolean
}

export function RewardForm({ reward, onSubmit, loading }: Props) {
  const [name, setName] = useState(reward?.name ?? "")
  const [costPoints, setCostPoints] = useState<number>(reward?.costPoints ?? 0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(reward?.imgUrl ?? "")
  const [active, setActive] = useState(reward?.active ?? true)

  useEffect(() => {
    setName(reward?.name ?? "")
    setCostPoints(reward?.costPoints ?? 0)
    setImageFile(null)
    setImagePreview(reward?.imgUrl ?? "")
    setActive(reward?.active ?? true)
  }, [reward])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    onSubmit({
      name,
      costPoints,
      imgUrl: reward?.imgUrl ?? "",
      imageFile,
      active,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Reward name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="text"
        inputMode="numeric"
        placeholder="Points cost"
        value={costPoints === 0 ? "" : costPoints}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "")
          setCostPoints(value ? Number(value) : 0)
        }}
      />

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null

          setImageFile(file)
          setImagePreview(file ? URL.createObjectURL(file) : reward?.imgUrl ?? "")
        }}
      />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Reward preview"
          className="h-24 w-24 rounded-md object-cover"
        />
      )}

      <Select
        value={active ? "true" : "false"}
        onValueChange={(value) => setActive(value === "true")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Reward status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save reward"}
      </Button>
    </form>
  )
}
