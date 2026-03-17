"use client"

import { useState, useEffect } from "react"
import { type Campaign } from "@/api/types"
import {
    getAllCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign
} from "@/api/requests"
import { useBusiness } from "@/hooks/useBusiness"
import { useAuth } from "@/hooks/useAuth"

const ROWS_PER_PAGE = 10

// 🔥 Normalizador (clave para evitar bugs backend)
const normalizeCampaign = (data: any): Campaign => ({
    uuid: data.uuid || data.id,
    name: data.name,
    startDate: data.startDate,
    finishDate: data.finishDate,
    points: data.points
})

export const useCampaigns = () => {

    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null)

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { business } = useBusiness()
    const { session } = useAuth()

    const businessId = business?.uuid
    const token = session?.access_token

    // ================================
    // 📥 FETCH ALL
    // ================================
    const fetchCampaigns = async () => {
        if (!businessId || !token) return

        try {
            setLoading(true)
            setError(null)

            const data = await getAllCampaigns(businessId, token)

            // 🔥 normalizamos todo
            const normalized = data.map(normalizeCampaign)

            setCampaigns(normalized)

        } catch (err: any) {
            console.error("Error fetching campaigns", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // ================================
    // 📥 FETCH BY ID
    // ================================
    const fetchCampaignById = async (id: string) => {
        if (!token) return

        try {
            setLoading(true)
            setError(null)

            const data = await getCampaign(id, token)

            const normalized = normalizeCampaign(data)

            setCurrentCampaign(normalized)

            return normalized

        } catch (err: any) {
            console.error("Error fetching campaign", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // ================================
    // ➕ CREATE
    // ================================
    const handleCreateCampaign = async (payload: {
        name: string
        startDate: string
        finishDate: string
        points: number
    }) => {
        if (!businessId || !token) return

        try {
            setLoading(true)
            setError(null)

            const response = await createCampaign({
                businessId,
                ...payload,
                token
            })

            const newCampaign = normalizeCampaign(response)

            // 🔥 update inmediato en UI
            setCampaigns(prev => [newCampaign, ...prev])

            // 🔥 UX FIX
            setPage(1)
            setSearch("")

            return newCampaign

        } catch (err: any) {
            console.error("Error creating campaign", err)
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    // ================================
    // ✏️ UPDATE
    // ================================
    const handleUpdateCampaign = async (
      uuid: string,
      payload: {
          name: string
          startDate: string
          finishDate: string
          points: number
      }
    ) => {

        if (!token || !businessId) return

        try {
            setLoading(true)
            setError(null)

            const response = await updateCampaign({
                id: uuid,
                businessId,
                token,
                ...payload
            })

            const updated = normalizeCampaign(response)

            // 🔥 update en memoria (sin perder uuid)
            setCampaigns(prev =>
              prev.map(c =>
                c.uuid === uuid
                  ? { ...c, ...updated, uuid }
                  : c
              )
            )

            // opcional UX
            setPage(1)

            return updated

        } catch (err: any) {
            console.error("Error updating campaign", err)
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    // ================================
    // 🔄 INIT
    // ================================
    useEffect(() => {
        fetchCampaigns()
    }, [businessId, token])

    // ================================
    // 🔍 FILTER + PAGINATION
    // ================================
    const filtered = campaigns.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE)

    const visibleCampaigns = filtered.slice(
      (page - 1) * ROWS_PER_PAGE,
      page * ROWS_PER_PAGE
    )

    // ================================
    // 🚀 RETURN
    // ================================
    return {
        // data
        campaigns, // 🔥 raw completo
        visibleCampaigns, // 🔥 para UI
        currentCampaign,

        // ui state
        loading,
        error,

        // filters
        search,
        setSearch,

        // pagination
        page,
        setPage,
        totalPages,

        // actions
        fetchCampaigns,
        fetchCampaignById,
        createCampaign: handleCreateCampaign,
        updateCampaign: handleUpdateCampaign
    }
}