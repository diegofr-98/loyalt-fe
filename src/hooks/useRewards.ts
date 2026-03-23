"use client"

import { useEffect, useState } from "react"
import { type Reward } from "@/api/types"
import {
  createReward,
  fetchRewardsByBusinessId,
  updateReward,
} from "@/api/requests"
import { useBusiness } from "@/hooks/useBusiness"
import { useAuth } from "@/hooks/useAuth"

const ROWS_PER_PAGE = 10

type RewardPayload = {
  name: string
  costPoints: number
}

const normalizeReward = (data: any): Reward => ({
  uuid: data.uuid || data.id,
  businessId: data.businessId,
  name: data.name,
  costPoints: data.costPoints,
})

export const useRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [currentReward, setCurrentReward] = useState<Reward | null>(null)

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { business } = useBusiness()
  const { session } = useAuth()

  const businessId = business?.uuid
  const token = session?.access_token

  const fetchRewards = async () => {
    if (!businessId || !token) return

    try {
      setLoading(true)
      setError(null)

      const data = await fetchRewardsByBusinessId(businessId, token)
      const normalized = data.map(normalizeReward)

      setRewards(normalized)
    } catch (err: any) {
      console.error("Error fetching rewards", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateReward = async (payload: RewardPayload) => {
    if (!businessId || !token) {
      throw new Error("Missing business or token")
    }

    try {
      setLoading(true)
      setError(null)

      const response = await createReward({
        businessId,
        token,
        ...payload,
      })

      const newReward = normalizeReward(response)

      setRewards((prev) => [newReward, ...prev])
      setCurrentReward(newReward)
      setPage(1)
      setSearch("")

      return newReward
    } catch (err: any) {
      console.error("Error creating reward", err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateReward = async (uuid: string, payload: RewardPayload) => {
    if (!businessId || !token) {
      throw new Error("Missing business or token")
    }

    try {
      setLoading(true)
      setError(null)

      const response = await updateReward({
        id: uuid,
        businessId,
        token,
        ...payload,
      })

      const updatedReward = normalizeReward(response)

      setRewards((prev) =>
        prev.map((reward) =>
          reward.uuid === uuid
            ? { ...reward, ...updatedReward, uuid }
            : reward
        )
      )
      setCurrentReward(updatedReward)
      setPage(1)

      return updatedReward
    } catch (err: any) {
      console.error("Error updating reward", err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRewards()
  }, [businessId, token])

  const filtered = rewards.filter((reward) =>
    reward.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE)

  const visibleRewards = filtered.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  )

  return {
    rewards,
    visibleRewards,
    currentReward,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    fetchRewards,
    createReward: handleCreateReward,
    updateReward: handleUpdateReward,
  }
}
