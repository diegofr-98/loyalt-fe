"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import DashboardLayout from "@/layouts/DashboardLayout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { type Reward } from "@/api/types"
import { useRewards } from "@/hooks/useRewards"
import { RewardHeader } from "@/components/rewards/reward-header"
import { RewardTable } from "@/components/rewards/reward-table"
import { RewardPagination } from "@/components/rewards/reward-pagination"
import { RewardDialog } from "@/components/rewards/reward-dialog"

export default function RewardsPage() {
  const {
    visibleRewards,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    createReward,
    updateReward,
    loading,
  } = useRewards()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)

  const handleCreate = () => {
    setSelectedReward(null)
    setDialogOpen(true)
  }

  const handleEdit = (reward: Reward) => {
    setSelectedReward(reward)
    setDialogOpen(true)
  }

  console.log(visibleRewards, 'visibleRewards')

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
        </div>
      </div>

      <div className="p-8 space-y-6">
        <RewardHeader
          search={search}
          setSearch={setSearch}
          onCreate={handleCreate}
        />

        <Card>
          <CardContent className="p-0">
            <RewardTable rewards={visibleRewards} onEdit={handleEdit} />
          </CardContent>
        </Card>

        <RewardPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

        <RewardDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          reward={selectedReward}
          createReward={createReward}
          updateReward={updateReward}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  )
}
