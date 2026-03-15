import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "./data-table"
import type { Customer } from "@/api/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "points",
    header: "Puntos",
  },
  {
    accessorKey: "googleObjectId",
    header: "ID Google",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => formatDate(row.getValue("createdAt"))
  },
  {
    id: "actions",
    header: "",
    cell: ({ row, table }) => {

      const setExpandedRow = (table.options.meta as any)?.setExpandedRow

      return (
        <DropdownMenu>

          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuItem
              onClick={() =>
                setExpandedRow({
                  rowId: row.id,
                  type: "add",
                })
              }
            >
              Añadir puntos
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                setExpandedRow({
                  rowId: row.id,
                  type: "subtract",
                })
              }
            >
              Restar puntos
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>
      )
    },
  },
]