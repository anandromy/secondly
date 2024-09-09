"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Trash2 as Trash2Icon } from "lucide-react"
import { checkItem } from "./addTaskForm"
import { Dispatch, SetStateAction } from "react"

type Props = {
    checked: boolean,
    handleCheckChange: () => void,
    handleDelete: () => void,
    setCheckList: Dispatch<SetStateAction<checkItem[] | []>>,
    checkList: Array<checkItem>,
    index: number
}

export const CheckListItem = ({ checked, handleCheckChange, handleDelete, setCheckList, checkList, index }: Props) => {

    const handleNameChange = (i: number, name: string) => {
        const newCheckList = checkList.map((item, index) => {
            if(i === index) {
                return  {
                    ...item,
                    name: name
                }
            } else {
                return item
            }
        })

        setCheckList(newCheckList)
    }

    return (
        <div className="flex gap-2 items-center border-b py-1">
            <Checkbox checked={checked} onCheckedChange={handleCheckChange} />
            <Input placeholder="Add an Item" className="border-0 shadow-none focus-visible:ring-0" onChange={(e) => handleNameChange(index, e.target.value)} />
            <Button type="button" variant="ghost" onClick={handleDelete}>
                <Trash2Icon className="text-destructive h-4 w-4" />
            </Button>
        </div>
    )
}