"use client"

import { CheckListItem, Status } from "@prisma/client"
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table"
import { useState } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell, TableCaption} from "@/components/ui/table"
import { Filter } from "./filter"

type TaskTableProps = {
    defaultData: TableTaskItem[]
}

export type TableTaskItem = {
    id: string,
    name: string,
    deadline: Date,
    status: Status,
    description: string,
    Project: {
        id: string,
        name: string,
        icon: string
    },
    CheckList: CheckListItem[]
}

const columnHelper = createColumnHelper<TableTaskItem>()
const columns = [
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => <span>Task Name</span>
    }),
    columnHelper.accessor("Project.icon", {
        header: () => <span>Project</span>,
        cell: (info) => info.getValue()
    }),
    columnHelper.group({
        header: "Deadline",
        columns: [
            columnHelper.accessor("deadline", {
                header: "Date",
                cell: (info) => {
                    const date = info.getValue().toDateString()
                    return (
                       <span>{date}</span>
                    )
                }
            }),
            columnHelper.accessor("deadline", {
                header: "Time",
                cell: (info) => {
                    const time = info.getValue().toLocaleTimeString()
                    const [hours, minutes, seconds ] = time.split(":")
                    return (
                        <span>{`${hours.padStart(2, "0")}: ${minutes.padStart(2, "0")}: ${seconds.padStart(2, "0")}`}</span>
                    )
                }
            })
        ]
    }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: (info) => {
            const status = info.getValue()
            return (
                <span className={`${status === "done" && "bg-[hsla(137,66%,36%,0.12)] border text-green-500 border-green-500" || status === "backlog" && "bg-[hsla(0,66%,52%,0.15)] border border-destructive text-destructive" || status === "in_progress" && "bg-[hsla(32,79%,63%,0.12)] border text-yellow-500 border-yellow-500" || status === "todo" && "text-muted-foreground border"} rounded-md py-1 px-3`}>
                    {status}
                </span>
            )
        }
    }),
]

export const TaskTable = ({ defaultData }: TaskTableProps) => {
    const [ data, setData ] = useState<TableTaskItem[]>(() => [...defaultData])
    const [ columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([{
        id: "status",
        value: "todo"
    }])
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters
    })

    return (
        <div className="p-2">
            <Filter />
            <Table className="mt-4">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className={`${header.subHeaders.length >= 1 && "text-center"}`}>
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}