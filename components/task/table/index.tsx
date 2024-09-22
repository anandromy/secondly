"use client"

import { CheckListItem, Status } from "@prisma/client"
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, ColumnFiltersState, FilterFn } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
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

const projectFilterFn: FilterFn<TableTaskItem> = (row, columnId, filterValue: string[]) => {
    console.log("Project Filter Called:", { rowProjectId: row.original.Project.id, filterValue });
    if (!filterValue || filterValue.length === 0) return true;
    const projectId = row.original.Project.id;
    return filterValue.includes(projectId);
};

const columns = [
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => <span>Task Name</span>
    }),
    columnHelper.accessor("Project.id", {
        header: () => <span>Project</span>,
        cell: (info) => {
            const project = info.row.original.Project;
            return (
                <span>{project.icon} {project.name}</span>
            );
        },
        filterFn: projectFilterFn
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
                    const [hours, minutes, seconds] = time.split(":")
                    return (
                        <span>{`${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`}</span>
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
        },
        filterFn: (row, columnId, filterValue: Status[]) => {
            const rowValue = row.getValue(columnId) as Status;
            return filterValue.length === 0 || filterValue.includes(rowValue);
        }
    }),
]

export const TaskTable = ({ defaultData }: TaskTableProps) => {
    const [data, setData] = useState<TableTaskItem[]>(() => [...defaultData])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
        
    const filteredData = useMemo(() => {
        return data.filter(item => {
            for (const filter of columnFilters) {
                if (filter.id === "Project.id") {
                    // @ts-ignore
                    if (!filter.value.includes(item.Project.id)) {
                        return false;
                    }
                }
            }
            return true;
        });
    }, [data, columnFilters]);

    const table = useReactTable({
        columns,
        data: filteredData,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
    })

    return (
        <div className="p-2">
            <Filter columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
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