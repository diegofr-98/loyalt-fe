import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Pencil, Trash2, X } from "lucide-react"
import { type Reward } from "@/api/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  rewards: Reward[]
  onEdit: (reward: Reward) => void
  onDelete: (reward: Reward) => Promise<void>
  loading?: boolean
}

export function RewardTable({ rewards, onEdit, onDelete, loading }: Props) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const handleDeleteClick = async (reward: Reward) => {
    await onDelete(reward)
    setConfirmDeleteId(null)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Points cost</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
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
            <TableCell>{reward.active ? "Active" : "Inactive"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit(reward)}
                  disabled={loading}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                {confirmDeleteId === reward.uuid ? (
                  <>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDeleteClick(reward)}
                      disabled={loading}
                    >
                      <Check className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setConfirmDeleteId(null)}
                      disabled={loading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setConfirmDeleteId(reward.uuid)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
