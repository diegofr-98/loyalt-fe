import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import {
  fetchPromosByBusinessId,
  fetchRewardsByBusinessId,
  createTransaction,
  createRedemption,
} from "@/api/requests"

import { useBusiness } from "@/hooks/useBusiness"
import { useAuth } from "@/hooks/useAuth"
import { isPromotionValid } from "@/lib/promotions"

type Props = {
  type: "add" | "subtract"
  customerId: string
  onClose: () => void
  onPointsChange: (customerId: string, delta: number) => void
}

type SelectItemType = {
  id: string
  name: string
  points: number
  disabled?: boolean
}

export default function ExpandedRow({
  type,
  customerId,
  onClose,
  onPointsChange,
}: Props) {
  const { business } = useBusiness()
  const { session } = useAuth()

  const [points, setPoints] = useState(0)
  const [items, setItems] = useState<SelectItemType[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!business.uuid || !session?.access_token) return

    const loadData = async () => {
      try {
        if (type === "add") {
          const promos = await fetchPromosByBusinessId(
            business.uuid,
            session.access_token
          )

          const normalized = promos.map((p: any) => ({
            id: p.uuid,
            name: isPromotionValid(p)
              ? p.name
              : `${p.name} (promocion vencida)`,
            points: p.points,
            disabled: !isPromotionValid(p),
          }))

          setItems(normalized)
        } else {
          const rewards = await fetchRewardsByBusinessId(
            business.uuid,
            session.access_token
          )

          const normalized = rewards
            .filter((r: any) => r.active)
            .map((r: any) => ({
              id: r.uuid,
              name: r.name,
              points: r.costPoints,
            }))

          setItems(normalized)
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadData()
  }, [business.uuid, session, type])

  const handleSelect = (value: string) => {
    setSelectedId(value)

    const item = items.find((i) => i.id === value)
    setPoints(item?.points ?? 0)
  }

const handleSubmit = async () => {
  if (!business.uuid || !session?.access_token || !selectedId) return

  try {
    setLoading(true)

    if (type === "add") {
      await createTransaction(
        business.uuid,
        customerId,
        points,
        session.access_token
      )

      onPointsChange(customerId, points)

      toast.success("Puntos añadidos correctamente")
    } else {
      await createRedemption(
        business.uuid,
        customerId,
        selectedId,
        points,
        session.access_token
      )

      onPointsChange(customerId, -points)

      toast.success("Recompensa canjeada correctamente")
    }

    onClose()

  } catch (err) {
    console.error(err)

    toast.error(
      type === "add"
        ? "No se pudieron añadir los puntos"
        : "No se pudo canjear la recompensa"
    )

  } finally {
    setLoading(false)
  }
}

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/40 rounded">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-[220px]">
          <SelectValue
            placeholder={
              type === "add"
                ? "Seleccionar promoción"
                : "Seleccionar recompensa"
            }
          />
        </SelectTrigger>

        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.id} value={item.id} disabled={item.disabled}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        disabled
        value={points}
        className="w-[100px]"
      />

      <Button
        disabled={!selectedId || loading}
        onClick={handleSubmit}
      >
        {loading
          ? "Procesando..."
          : type === "add"
          ? "Añadir puntos"
          : "Restar puntos"}
      </Button>
    </div>
  )
}
