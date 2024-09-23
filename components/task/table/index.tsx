"use client"

import { CheckListItem, Status } from "@prisma/client"
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, ColumnFiltersState, FilterFn, getExpandedRowModel, ExpandedState } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Filter } from "./filter"
import { ChevronRight, EditIcon, EllipsisIcon, TrashIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
        header: () => <span>Task Name</span>,
        cell: (info) => {
            return (
                <div className="flex items-center cursor-pointer gap-3" onClick={() => {
                    const toggle = info.row.getToggleExpandedHandler();
                    toggle();
                }}>
                    <span className="transition-transform duration-300 ease-in-out" style={{
                        transform: info.row.getIsExpanded() ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}>
                        <ChevronRight className="h-4 w-4" />
                    </span>
                    <span>{info.getValue()}</span>
                </div>
            )
        }
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
    columnHelper.accessor("id", {
        header: "",
        cell: (info) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer">
                            <TrashIcon className="h-4 w-4 mr-2" />
                            <span>Delete task</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <EditIcon className="h-4 w-4 mr-2" />
                            <span>Edit task</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    })
]

export const TaskTable = ({ defaultData }: TaskTableProps) => {
    const [ data, setData ] = useState<TableTaskItem[]>(() => [...defaultData])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [ expanded, setExpanded ] = useState<ExpandedState>({})
        
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
        getRowCanExpand: (row) => true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
            expanded: expanded
        },
        onColumnFiltersChange: setColumnFilters,
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded
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
                        <>
                            <TableRow key={row.id} className="transition-all duration-1000">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {row.getIsExpanded() && (
                                <TableRow>
                                    <CheckList items={row.original.CheckList} />
                                </TableRow>
                            )}
                        </>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


const CheckList = ({ items }: { items: CheckListItem[] }) => {
    const [checklistItems, setChecklistItems] = useState(items);

    const handleToggle = (id: string) => {
        setChecklistItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    };

    return (
        <div className="p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Checklist</h3>
            <ul className="space-y-2">
                {checklistItems.map(item => (
                    <li key={item.id} className="flex items-center space-x-2">
                        <Checkbox
                            checked={item.done}
                            onCheckedChange={() => handleToggle(item.id)}
                            id={item.id}
                        />
                        <label
                            htmlFor={item.id}
                            className={`cursor-pointer ${item.done ? 'line-through text-gray-500' : ''}`}
                        >
                            {item.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};