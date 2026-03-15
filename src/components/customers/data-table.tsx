"use client"

import { Fragment, useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import ExpandedRow from "./ExpandedRow"

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function DataTable<TData extends { id: string; points?: number }, TValue>({
  columns,
  data,
  page,
  totalPages,
  onPageChange,
}: DataTableProps<TData, TValue>) {

  const [tableData, setTableData] = useState<TData[]>(data)

  useEffect(() => {
    setTableData(data)
  }, [data])

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [expandedRow, setExpandedRow] = useState<{
    rowId: string
    type: "add" | "subtract"
  } | null>(null)

  // 🔥 actualizar puntos localmente
  const updateCustomerPoints = (customerId: string, delta: number) => {
    setTableData((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              points: (customer.points ?? 0) + delta,
            }
          : customer
      )
    )
  }

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    meta: {
      setExpandedRow,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4">

      {/* SEARCH + COLUMN VISIBILITY */}

      <div className="flex items-center justify-between">

        <Input
          placeholder="Buscar por ID..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columnas
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value: any) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      {/* TABLE */}

      <div className="rounded-md border">
        <Table>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>

                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {expandedRow?.rowId === row.id && (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <ExpandedRow
                          type={expandedRow.type}
                          customerId={row.original.id}
                          onClose={() => setExpandedRow(null)}
                          onPointsChange={updateCustomerPoints}
                        />
                      </motion.div>
                    </TableCell>
                  </TableRow>
                )}

              </Fragment>
            ))}
          </TableBody>

        </Table>
      </div>

      {/* PAGINATION */}

      <div className="flex items-center justify-end gap-2">

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          Anterior
        </Button>

        <span className="text-sm">
          Página {page + 1} de {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          Siguiente
        </Button>

      </div>

    </div>
  )
}