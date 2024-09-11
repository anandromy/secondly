"use client"
import { TaskSelector } from "@/components/selectors/taskSelector"
import { Button } from "@/components/ui/button"
import { RocketIcon } from "lucide-react"
import { useState } from "react"


export const SessionCard = () => {
    const [ selectedProjectId, setSelectedProjectId ] = useState<string>()
    const [ selectedTaskId, setSelectedTaskId ] = useState<string>()

    return(
        <div className="max-w-xl rounded-md md:ml-40 space-y-4">
            <TaskSelector setSelectedProjectId={setSelectedProjectId} setSelectedTaskId={setSelectedTaskId} />
            <Button disabled={(selectedProjectId || selectedTaskId) ? false : true} className="w-full mt-4">
                <RocketIcon className="mr-2 h-4 w-4" />
                Start
            </Button>
        </div>
    )
}