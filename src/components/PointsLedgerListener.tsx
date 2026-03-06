import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { onPointsLedger } from "@/lib/supabaseRealtime"

export function PointsLedgerListener({ businessId }: { businessId: string }) {
  useEffect(() => {
    const channel = onPointsLedger
    return () => {
      supabase.removeChannel(channel)
    }

  }, [businessId])

  return null
}