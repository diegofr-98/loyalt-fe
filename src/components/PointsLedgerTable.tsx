import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type BadgeType = "earn" | "redeem"

const setBadgeType = (badgeType: BadgeType): any => {
  switch (badgeType) {
    case "earn":
      return "green"
    case "redeem":
      return "destructive"
    default:
      return "default"
  }
}

export function PointsLedgerTable({ activity }: { activity: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity.map((ledger: any) => (
              <TableRow key={ledger.uuid}>
                <TableCell className="font-medium">{ledger.uuid}</TableCell>
                <TableCell>{ledger.customer_id}</TableCell>
                <TableCell>
                  <Badge variant={setBadgeType(ledger.type as BadgeType)}>
                    {ledger.type}
                  </Badge>
                </TableCell>
                <TableCell>{ledger.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
