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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  rewards: Reward[]
  onEdit: (reward: Reward) => void
}

export function RewardTable({ rewards, onEdit }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Costo en puntos</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rewards.map((reward) => (
          <TableRow key={reward.uuid}>
            <TableCell>
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src={reward.imgUrl} className="object-cover" />
                <AvatarFallback className="rounded-md">
                  {reward.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{reward.name}</TableCell>
            <TableCell>{reward.costPoints}</TableCell>
            <TableCell>{reward.active ? 'Activo' : 'Inactivo'}</TableCell>
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
