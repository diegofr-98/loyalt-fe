import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthProvider"
import { fetchBusinessByOwnerId } from "@/api/requests"
import type { Business } from "@/api/types"

export const BusinessContext = createContext<any>(null)

export const BusinessProvider = ({ children }: any) => {
  const { session } = useContext(AuthContext)

  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!session?.user) {
        setBusiness(null)
        setLoading(false)
        return
      }

      const business = await fetchBusinessByOwnerId(session.user.id, session.access_token);

      setBusiness(business)
      setLoading(false)
    }

    fetchBusiness()
  }, [session])

  return (
    <BusinessContext.Provider value={{ business, setBusiness, loading }}>
      {children}
    </BusinessContext.Provider>
  )
}