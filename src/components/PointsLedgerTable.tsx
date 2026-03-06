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

const ledgers = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    customer_id: "123e4567-e89b-12d3-a456-426614174000",
    type: "earn",
    points: 100,
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    customer_id: "123e4567-e89b-12d3-a456-426614174000",
    type: "redeem",
    points: 100,
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    customer_id: "123e4567-e89b-12d3-a456-426614174000",
    type: "earn",
    points: 100,
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    customer_id: "123e4567-e89b-12d3-a456-426614174000",
    type: "earn",
    points: 100,
  }
]
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

export function PointsLedgerTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead >ID Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Puntos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ledgers.slice(0, 3).map((ledger) => (
              <TableRow key={ledger.id}>
                <TableCell className="font-medium">{ledger.id}</TableCell>
                <TableCell>{ledger.customer_id}</TableCell>
                <TableCell><Badge variant={setBadgeType(ledger.type as BadgeType)}>{ledger.type}</Badge></TableCell>
                <TableCell>{ledger.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
