"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { CalendarIcon } from "lucide-react"
import React, { Dispatch, SetStateAction, useState } from "react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

type Props = {
    date: Date | undefined,
    setDate: Dispatch<SetStateAction<Date | undefined>>
}
export const DateSelector = ({ date, setDate }: Props) => {
    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}