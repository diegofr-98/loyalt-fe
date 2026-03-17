import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export function CampaignTable({ campaigns, onEdit }: any) {

    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Puntos</TableHead>
                    <TableHead>Fecha de Inicio</TableHead>
                  <TableHead>Fecha de Vencimiento </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                {campaigns.map((campaign: any) => (

                    <TableRow key={campaign.id}>

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