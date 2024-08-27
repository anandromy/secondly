"use client"

import { Project, Task as TaskType } from "@prisma/client"
import { useEffect, useState } from "react"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, isAfter, isBefore } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { createTaskSchema, updateTaskSchema } from "@/schemas"

type Props = {
    isAdding?: boolean,
    setIsAdding?: (x: boolean) => void
    isEditing?: string | false
    setIsEditing?: (x: string | false) => void
    task?: TaskType
}

export const EditTask = ({ isAdding, setIsAdding, isEditing, setIsEditing, task }: Props) => {
    const [ projects, setProjects ] = useState<Project[]>([])
    const [ projectId, setProjectId ] = useState<string | null>(task ? task.projectId: null )
    const [ taskName, setTaskName ] = useState<string | null>(task ? task.name: null)
    const [ description, setDescription ] = useState<string | null>(task ? task.description : null)
    const [ deadline, setDeadline ] = useState<Date>()
    const [ status, setStatus ] = useState<"todo" | "backlog" | "done">(task ? task.status : "todo")

    const fetchProjects = async() => {
        const res = await fetch("/api/project")
        const data = await res.json()
        setProjects(data.message)
    }

    useEffect(() => {
       fetchProjects()
    }, [isAdding, isEditing])

    const handleSubmit = async () => {
        
        if(!task?.id) {
            const userInput = { projectId, description, deadline: deadline, name: taskName, status }
            const { data, success } = createTaskSchema.safeParse(userInput)
            if(!success) {
                // TODO: BETTER ERROR HANDLING~ error messages in the form
                console.log("Some user input is wrong, please look into it")
            } else {
                const res = await fetch("/api/task", {
                    method: "POST",
                    body: JSON.stringify(data)
                })
                const apiResponseData = await res.json()
                setIsAdding && setIsAdding(false)
            }
        } else {
            const userInput = { description, deadline, name: taskName, status, taskId: task.id, projectId }
            const { data, success, error } = updateTaskSchema.safeParse(userInput)
            console.log("JSON.stringify: ", JSON.stringify(data))
            if(!success) {
                console.error("Some invalid input. Please check the user input: ", error)
            } else {
                const res = await fetch("/api/task", {
                    method: "PUT",
                    body: JSON.stringify(data)
                })
                const apiResponseData = await res.json()
                // CURRENT TODO
                console.log("utc deadline: ", format(deadline, "P"), "format-utc-tody: ", format(new  Date(), "P"))
                console.log(isBefore(format(deadline, "P"), format(new Date, "P")))
                // setIsEditing && setIsEditing(false)
            }
            
        }
    }

    const handleDelete = async () => {
        const res = await fetch("/api/task", {
            method: "DELETE",
            body: JSON.stringify({ taskId: task?.id })
        })

        const data = await res.json()
        console.log(data)
        setIsEditing && setIsEditing(false)
    }

    return(
        <div className="border rounded-lg py-8">
            <form className="flex flex-col gap-4">
                <div className="flex bg-background rounded-md items-center px-3 gap-1 mx-4">
                    <Select name="projectId" onValueChange={(value) => setProjectId(value)}>
                        {/* TODO: LEARN THIS CLASS TO MAKE INPUT RINGS DISAAPEAR ON FOCUS */}
                        {/* <SelectTrigger className="max-w-[35px] focus:ring-none focus:ring-0 focus:ring-offset-0"> */}
                        <SelectTrigger className="text-nowrap text-xl w-[60px]">
                            {/* @ts-ignore */}
                        <SelectValue placeholder={ task?.id ? task?.project?.name.split(" ")[0] : projects.length > 0 && projects[0].name.split(" ")[0]} />
                        </SelectTrigger>
                        <SelectContent className="py-2 px-3">
                        { projects.length > 0 &&
                            projects.map((project) => (
                                <SelectItem className="cursor-pointer rounded-md text-start" key={project.id} value={project.id}>{project.name}</SelectItem>
                            ))
                        }
                        </SelectContent>
                    </Select>
                    <input defaultValue={task && task?.name} placeholder="Enter task name" className="flex h-16 w-full rounded-md bg-background px-3 py-2 focus:outline-none" onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-1.5 mx-4">
                    <label className="ml-3">Description</label>
                    <textarea placeholder="Describe your task" defaultValue={task && task.description} className="flex w-full rounded-md bg-background px-3 py-2 focus:outline-none" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <Separator className="mb-6" />
            </form>
            <div className="flex justify-between items-center gap-8 mx-4">
                <div className="flex items-center gap-3 flex-1">
                    <Select onValueChange={(value: "todo" | "done" | "backlog") => setStatus(value)}>
                        <SelectTrigger className="max-w-[130px]">
                            <SelectValue placeholder={(task?.id) ? task.status.toUpperCase() : "TODO" } />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todo">TODO</SelectItem>
                            <SelectItem value="done">DONE</SelectItem>
                            <SelectItem value="backlog">BACKLOG</SelectItem>
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild className="flex-1">
                            <Button
                                variant="outline"
                                className={`w-[240px] pl-3 text-left font-normal flex-1 ${!deadline && "text-muted-foreground"}`}
                            >
                                {task ? (deadline ? format(deadline, "PP"): format(task.deadline, "PP")): (
                                    deadline ? format(deadline, "PP"): <span>Pick a deadline</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={deadline}
                                onSelect={(date) => setDeadline(date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <Button onClick={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}>Submit</Button>
                    <Button variant="outline" onClick={(e) => {
                        console.log("date:", deadline?.getDate(), " month:", deadline?.getMonth(), " year:", deadline?.getFullYear())
                        e.preventDefault()
                        // setIsAdding && setIsAdding(false)
                        // setIsEditing && setIsEditing(false)
                    }}>Cancel</Button>
                </div>
            </div>
            {task && <Button variant="destructive" className="ml-6 mb-4"
                onClick={handleDelete}
            >Delete</Button>}
        </div>
    )
}