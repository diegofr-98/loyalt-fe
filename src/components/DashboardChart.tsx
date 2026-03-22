"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "./ui/skeleton"

const chartConfig = {
  numberOfUsers: {
    label: "Number of users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

  const getLast6Months = () => {
    const months = []
    const today = new Date()

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)

      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, "0")

      months.push({
        key: `${year}-${month}`,
        label: d.toLocaleString("es-ES", { month: "long" }),
      })
    }

    return months
  }


export default function ChartAreaDefault({
  analytics,
}: {
  analytics: any
}) {
  const [chartData, setChartData] = useState<any[]>([])
  const [growthPercent, setGrowthPercent] = useState(0)

  useEffect(() => {
    if (!analytics) return

    const formatted = getLast6Months().map((month) => {
      const found = analytics.usersPerMonth.find(
        (item: any) => item.month === month.key
      )

      return {
        month: month.label,
        numberOfUsers: found ? found.users : 0,
      }
    })

    const prevMonthUsers = formatted[formatted.length - 2]?.numberOfUsers || 0
    const lastMonthUsers = formatted[formatted.length - 1]?.numberOfUsers || 0

    const growth =
      prevMonthUsers === 0
        ? lastMonthUsers === 0
          ? 0
          : 100
        : ((lastMonthUsers - prevMonthUsers) / prevMonthUsers) * 100

    setChartData(formatted)
    setGrowthPercent(Number(growth.toFixed(1)))
  }, [analytics])

  if (!chartData.length) return <div><Skeleton className="h-100" /></div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total users for the last 6 months
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Area
              dataKey="numberOfUsers"
              type="natural"
              fill="var(--color-numberOfUsers)"
              fillOpacity={0.4}
              stroke="var(--color-numberOfUsers)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {growthPercent >= 0 ? (
                <>
                  Growth +{growthPercent}%
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </>
              ) : (
                <>
                  Growth {growthPercent}%
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}