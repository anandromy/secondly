"use client"

import { EditTask } from "@/components/edit-task"
import { Task } from "@/components/task"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Task as TaskType } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"

const TasksPage = () => {
    const [ tasks, setTasks ] = useState<TaskType[]>([])
    const [ isAdding, setIsAdding ] = useState<boolean>(false)
    const [ isEditing, setIsEditing ] = useState<string | false>(false)

    const fetchTasks = async() => {
        const res = await fetch("/api/task")
        const data = await res.json()
        setTasks(data.message)
    }
    useEffect(() => {
        fetchTasks()
    }, [isAdding, isEditing])

    return (
        <div className="w-full space-y-3 max-w-[600px] ml-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl text-muted-foreground font-bold cursor-pointer hover:text-foreground">Tasks</h1>
                    <h1 className="text-xl text-muted-foreground font-bold cursor-pointer hover:text-foreground">Automation</h1>
                    <h1 className="text-xl text-muted-foreground font-bold cursor-pointer hover:text-foreground">Templates</h1>
                </div>
                <Button variant="ghost">
                    Filter
                </Button>
            </div>
            <Separator className="my-4" />
            {
                tasks.map((task) => (
                    <Task key={task.id} task={task} isEditing={isEditing} setIsEditing={setIsEditing} />
                ))
            }
           <div className={`flex items-center rounded-lg py-2 px-3 gap-3 cursor-pointer hover:bg-muted hover:text-primary ${isAdding && "hidden"}`}
            onClick={() => setIsAdding(true)}
           >
            <PlusIcon className="h-4 w-4" />
            Add task
           </div>
           { isAdding && <EditTask isAdding={isAdding} setIsAdding={setIsAdding} /> }
        </div>
    )
}

export default TasksPage