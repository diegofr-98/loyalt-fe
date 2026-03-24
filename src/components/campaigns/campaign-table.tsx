import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export function CampaignTable({ campaigns, onEdit }: any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Points</TableHead>
          <TableHead>Start date</TableHead>
          <TableHead>End date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {campaigns.map((campaign: any) => (
          <TableRow key={campaign.uuid}>
            <TableCell>{campaign.name}</TableCell>
            <TableCell>{campaign.points}</TableCell>
            <TableCell>{campaign.startDate}</TableCell>
            <TableCell>{campaign.finishDate}</TableCell>

            <TableCell className="text-right">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(campaign)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
