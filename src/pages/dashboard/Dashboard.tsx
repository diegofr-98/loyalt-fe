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

export default function Dashboard() {
  const { session } = useAuth()
  const location = useLocation();
  const businessId = location.state?.businessId;

  const [activedCustomers, setActivedCustomers] = useState(0)
  const [emmitedPoints, setEmmitedPoints] = useState(0)
  const [totalRedeemptions, setTotalRedeemptions] = useState(0)
  // const [totalRedeemPoints, setTotalRedeemPoints] = useState(0)

  useEffect(() => {
    const fetchActivedUsers = async () => {
      const { count, error } = await supabase
      .from('customer_business')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', session?.user.id)
      .eq('status', 'active');

    if (error) {
      console.error(error);
      return 0;
    }

    if (count !== null) {
      setActivedCustomers(count);
    }


    }
    const fetchEmmitedPoints = async () => {
      const { data, error } = await supabase
        .from('points_ledger')
        .select('points.sum()')
        .eq('business_id', session?.user.id)
        .eq('type', 'earn')

      if (error) {
        console.error(error);
        return 0;
      }

      if (data !== null) {
        setEmmitedPoints(data[0].sum);
      }
    };

    const fetchTotalRedeemptions = async () => {
      const { count, error } = await supabase
        .from('points_ledger')
        .select('*', { count: 'exact', head: true })
        .eq('business_id', session?.user.id)
        .eq('type', 'redeem')

      if (error) {
        console.error(error);
        return 0;
      }

      if (count !== null) {
        setTotalRedeemptions(count);
      }
    }
    fetchActivedUsers()
    fetchEmmitedPoints()
    fetchTotalRedeemptions()
  }, [])

  return (
    <DashboardLayout>

      <div className="p-8 space-y-8">

        <div className="flex items-center gap-4">

          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-muted-foreground">
              Bienvenido de nuevo
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">

          <Card>
            <CardHeader className="">
              <div className="flex flex-col-2 gap-2 items-center">
                <Users size={28} className="text-blue-500" />
                <CardTitle>Usuarios activos</CardTitle>
              </div>
              <CardDescription className="text-2xl font-bold text-black">
                {activedCustomers}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="">
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
            <CardHeader className="">
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
            <CardHeader className="">
              <div className="flex flex-col-2 gap-2 items-center">
                <CreditCard size={28} className="text-yellow-500" />
                <CardTitle>Tasa de adopción</CardTitle>
              </div>
              <CardDescription className="text-2xl font-bold text-black">
                4
              </CardDescription>
            </CardHeader>
          </Card>

        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ChartExample />
          <PointsLedgerTable />
        </div>

      </div>

    </DashboardLayout>
  )
}