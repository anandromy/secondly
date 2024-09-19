"use client"

import { $Enums } from "@prisma/client"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableRowActions } from "./row-actions"

export type Task = {
    id: string,
    name: string,
    deadline: Date,
    status: $Enums.Status,
    description: string,
    Project: {
        id: string,
        name: string,
        icon: string
    }
}

const columnHelper = createColumnHelper<Task>()


export const columns: ColumnDef<Task>[] = [
    columnHelper.accessor("name", {
        header: "Task",
        cell: (info) => {
            const icon = info.row.original.Project.icon
            const name = info.getValue()
            return (
                <div className="space-x-3">
                    <span>{icon}</span>
                    <span>{name}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor("deadline", {
        header: "Deadline",
        cell: (info) => {
            const date = info.getValue().toDateString()
            const time = info.getValue().toLocaleTimeString()
            const [hours, minutes, seconds ] = time.split(":")

            return (
                <div className="space-x-3 flex items-center">
                    <p className="w-40">{date}</p>
                    <span>{`${hours.padStart(2, "0")}: ${minutes.padStart(2, "0")}: ${seconds.padStart(2, "0")}`}</span>
                </div>
            )
        }
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
            const status = info.getValue()
            return (
                <span className={`${status === "done" && "bg-[hsla(137,66%,36%,0.12)] border text-green-500 border-green-500" || status === "backlog" && "bg-[hsla(0,66%,52%,0.15)] border border-destructive text-destructive" || status === "in_progress" && "bg-[hsla(32,79%,63%,0.12)] border text-yellow-500 border-yellow-500" || status === "todo" && "text-muted-foreground border"} rounded-md py-1 px-3`}>
                    {status}
                </span>
            )
        }
    }),
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DataTableRowActions row={row} />
            )
        }
    }
] as Array<ColumnDef<Task, unknown>>