import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

type Props = {
  type: "add" | "subtract"
  customerId: string,
  onClose: () => void
}

export default function ExpandedRow({ type, onClose }: Props) {

  const [points, setPoints] = useState(0)

  const promotions = [
    { id: 1, name: "Compra 10€", points: 10 },
    { id: 2, name: "Compra 20€", points: 20 },
  ]

  const rewards = [
    { id: 1, name: "Café gratis", points: 30 },
    { id: 2, name: "Descuento", points: 50 },
  ]

  const items = type === "add" ? promotions : rewards

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/40 rounded">

        <Select
            onValueChange={(value) => {
            const item = items.find(i => i.id === Number(value))
            setPoints(item?.points ?? 0)
            }}
        >
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tipo de negocio" />
            </SelectTrigger>

            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
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
          onClick={() => {
                // llamar API
                onClose()
            }}
        >
            {type === "add" ? "Añadir puntos" : "Restar puntos"}
        </Button>
    </div>
  )
}