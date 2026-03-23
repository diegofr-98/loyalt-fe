import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { type Reward } from "@/api/types"

type Props = {
  rewards: Reward[]
  onEdit: (reward: Reward) => void
}

export function RewardTable({ rewards, onEdit }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Costo en puntos</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rewards.map((reward) => (
          <TableRow key={reward.uuid}>
            <TableCell>{reward.name}</TableCell>
            <TableCell>{reward.costPoints}</TableCell>

            <TableCell className="text-right">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(reward)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
