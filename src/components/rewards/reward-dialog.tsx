"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { type Reward } from "@/api/types"
import { RewardForm } from "./reward-form"

type FormData = {
  name: string
  costPoints: number
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  reward?: Reward | null
  createReward: (data: FormData) => Promise<Reward>
  updateReward: (uuid: string, data: FormData) => Promise<Reward>
  loading?: boolean
  onSuccess?: (reward: Reward) => void
}

export function RewardDialog({
  open,
  onOpenChange,
  reward,
  createReward,
  updateReward,
  loading,
  onSuccess,
}: Props) {
  const handleSubmit = async (data: FormData) => {
    try {
      let result: Reward

      if (reward) {
        result = await updateReward(reward.uuid, data)
      } else {
        result = await createReward(data)
      }

      onSuccess?.(result)
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving reward:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>
            {reward ? "Editar recompensa" : "Nueva recompensa"}
          </DialogTitle>
        </DialogHeader>

        <RewardForm
          reward={reward ?? undefined}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  )
}
