"use client"
import { Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

interface DataTabelRowActionProps<TData> {
    row: Row<TData>
}
export const DataTableRowActions = <TData,>({ row }: DataTabelRowActionProps<TData>) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open Menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>See checklist</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}