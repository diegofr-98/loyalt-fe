import { SidebarTrigger } from "@/components/ui/sidebar"
import DashboardLayout from "../../layouts/DashboardLayout"
import {
  Users,
  TrendingUp,
  ShoppingBag,
  CreditCard,
} from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/hooks/useAuth"
import ChartExample from "@/components/DashboardChart"
import { PointsLedgerTable } from "@/components/PointsLedgerTable"
import { useLocation } from "react-router-dom"
import { useBusiness } from "@/hooks/useBusiness"
import { fetchCustomersAnalyticsByBusinessId } from "@/api/requests"

export default function Dashboard() {
  const { session } = useAuth()
  const { business } = useBusiness()
  const location = useLocation();
  const businessId = location.state?.businessId || business?.uuid || "";

  const [customersAnalytics, setCustomersAnalytics] = useState<any>(null)
  const [emmitedPoints, setEmmitedPoints] = useState(0)
  const [totalRedeemptions, setTotalRedeemptions] = useState(0)
  const [recentActivity, setRecentActivity] = useState<any>([])
  const [redemptionRate, setRedemptionRate] = useState("0%")

  useEffect(() => {
    if (!businessId || !session?.access_token) return;

    const fetchAllData = async () => {
      try {
        // 🔹 Fetch en paralelo
        const [
          customersData,
          emittedRes,
          redeemRes,
          redeemsCountRes,
          recentActivityRes
        ] = await Promise.all([
          fetchCustomersAnalyticsByBusinessId(
            businessId,
            session.access_token
          ),
          supabase.rpc('get_emmited_points', { business_id_input: businessId }),
          supabase.rpc('get_redeem_points', { business_id_input: businessId }),
          supabase
            .from('points_ledger')
            .select('*', { count: 'exact', head: true })
            .eq('business_id', businessId)
            .eq('type', 'redeem'),
          supabase
            .from('points_ledger')
            .select('*')
            .eq('business_id', businessId)
            .order('created_at', { ascending: false })
            .limit(5)
        ]);

        const emitted = emittedRes.data ?? 0;
        const redeemPoints = Math.abs(redeemRes.data ?? 0);
        const totalPoints = emitted + redeemPoints;

        setCustomersAnalytics(customersData);
        setEmmitedPoints(emitted);
        setTotalRedeemptions(redeemsCountRes.count ?? 0);
        setRecentActivity(recentActivityRes.data ?? []);

        if (totalPoints === 0) {
          setRedemptionRate("0%");
        } else {
          const rate = redeemPoints / totalPoints;
          setRedemptionRate((rate * 100).toFixed(2) + "%");
        }

      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    };

    fetchAllData();
  }, [businessId, session?.access_token]);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">

        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido de nuevo
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">

          <Card>
            <CardHeader>
              <div className="flex flex-col-2 gap-2 items-center">
                <Users size={28} className="text-blue-500" />
                <CardTitle>Usuarios activos</CardTitle>
              </div>
              <CardDescription className="text-2xl font-bold text-black">
                {customersAnalytics?.activeUsers ?? 0}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col-2 gap-2 items-center">
                <TrendingUp size={28} className="text-green-500" />
                <CardTitle>Puntos emitidos</CardTitle>
              </div>
              <CardDescription className="text-2xl font-bold text-black">
                {emmitedPoints}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col-2 gap-2 items-center">
                <ShoppingBag size={28} className="text-red-500" />
                <CardTitle>Canjeos totales</CardTitle>
              </div>
              <CardDescription className="text-2xl font-bold text-black">
                {totalRedeemptions}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col-2 gap-2 items-center">
                <CreditCard size={28} className="text-yellow-500" />
                <CardTitle>Tasa de canjeo</CardTitle>
              </div>
              <CardDescription className="text-2xl font-bold text-black">
                {redemptionRate}
              </CardDescription>
            </CardHeader>
          </Card>

        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ChartExample analytics={customersAnalytics} />
          <PointsLedgerTable activity={recentActivity} />
        </div>

      </div>
    </DashboardLayout>
  )
}