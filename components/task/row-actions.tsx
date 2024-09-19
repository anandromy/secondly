"use client"
import { Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { CheckSquareIcon, EditIcon, TrashIcon } from "lucide-react"
import { Task } from "./columns"

interface DataTabelRowActionProps<TData> {
    row: Row<Task>
}

export const DataTableRowActions = <TData,>({ row }: DataTabelRowActionProps<TData>) => {
    const markAsDone = async (id: string) => {
        const res = await fetch(`http://localhost:3000/api/task/${id}?action=check`, {
            method: "PUT"
        })
        const data = await res.json()
        console.log("This is recevied: ", data)
    }

    const markAsUndone = async (id: string) => {
        const res = await fetch(`http://localhost:3000/api/task/${id}?action=uncheck`, {
            method: "PUT"
        })
        const data = await res.json()
        console.log("This is the received data: ", data)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open Menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {row.original.status === "done" ? (
                    <DropdownMenuItem className="cursor-pointer" onClick={async () => {
                        // TODO: OPTIMISTIC UI
                        await markAsUndone(row.original.id)
                        console.log("DONE ASYNC FUNCTION")
                    }}>
                        <CheckSquareIcon className="h-4 w-4 mr-2" />Marks as undone
                    </DropdownMenuItem>
                ): (
                    <DropdownMenuItem className="cursor-pointer" onClick={async () => {
                        await markAsDone(row.original.id)
                        console.log("DONE ASYNC FUNCTION")
                    }}>
                        <CheckSquareIcon className="h-4 w-4 mr-2" />Marks as done
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <EditIcon className="w-4 h-4 mr-2" />See checklist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <TrashIcon className="w-4 h-4 mr-2" />Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}