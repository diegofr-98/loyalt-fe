import { supabase } from "./supabaseClient"

export const onPointsLedger = supabase
    .channel('points-ledger-changes')
    .on('postgres_changes',
    {
        event: 'INSERT',
        schema: 'public',
        table: 'points_ledger',
        filter: 'business_id=eq.123e4567-e89b-12d3-a456-426614174000'
    },
    (payload) => {
        console.log(payload)
    }
    ).subscribe()