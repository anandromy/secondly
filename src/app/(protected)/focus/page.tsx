"use client"

import { Session, Task as TaskType } from "@prisma/client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskTable } from "@/components/focus/tasksTable"
import { ElapsingTime } from "@/components/focus/elapsing_time"
import { PauseIcon, PlayIcon } from "lucide-react"
import { SessionStarter } from "@/components/focus/sessionStarter"

export type session = {
    startTime?: Date
    endTime?: Date
}

const FocusPage = () => {

    const [ session, setSession ] = useState<Session[] | null>()
    const [ tasks, setTasks ] = useState<TaskType[]>()
    const [ taskId, setTaskId ] = useState<string | null>(null)

    const fetchSession = async () => {
        const response = await fetch("/api/active-session")
        const data = await response.json()
        if (data.message.length === 0) {
            setSession(null)
        } else {
            setSession(data.message)
        }
    }

    const fetchTasks = async () => {
        const response = await fetch("/api/task")
        const data = await response.json()
        setTasks(data.message)
    }

    useEffect(() => {
        fetchSession()
        fetchTasks()
    }, [])

    const handleClick = async () => {
        if(!session){
            const response = await fetch("/api/session", {
                method: "POST",
                body: JSON.stringify({ startTime: new Date(), taskId })
            })
            const data = await response.json()
            console.log(data)
            fetchSession()
        } else {
            const response = await fetch("/api/session", {
                method: "PUT",
                body: JSON.stringify({ endTime: new Date(), sessionId: session[0].id })
            })

            const data = await response.json()
            console.log(data)
            fetchSession()
        }
    }

    return(
        <div className="h-full ml-32 max-w-[600px]">
            {
                (session && session[0].taskId) ? (
                    <div>
                        <div className="border rounded-lg p-3 max-w-xl">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-3 items-center">
                                    <Button variant="outline" onClick={handleClick} disabled={!taskId}>
                                        {
                                            session ?
                                            <PauseIcon /> : 
                                            <PlayIcon />
                                        }
                                    </Button>
                                    <ElapsingTime sessions={session} />
                                </div>
                                <div className="space-x-3">
                                    <Button variant="outline" onClick={async () => {
                                        const res = await fetch("/api/session", {
                                            method: "DELETE",
                                            body: JSON.stringify({ sessionId: session && session[0].id })
                                        })
                                        const data = await res.json()
                                        console.log(data)
                                        fetchSession()
                                    }}>Cancel</Button>
                                    <Button onClick={async() => {
                                        const response = await fetch("/api/session", {
                                            method: "PUT",
                                            body: JSON.stringify({ endTime: new Date(), sessionId: session && session[0].id })
                                        })
                                        const data = await response.json()
                                        console.log(data)
                                        fetchSession()
                                    }}>Finish</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ): (
                    <>
                        <div className="grid grid-cols-3 items-baseline mb-6">
                            <span className="text-sm font-bold col-span-2">Start a focus session</span>
                            <div className="col-span-1 space-x-4">
                                <span className="bg-muted py-2.5 px-4 rounded-lg cursor-pointer">Projects</span>
                                <span className="bg-muted py-2.5 px-4 rounded-lg cursor-pointer">Tasks</span>
                            </div>
                        </div>
                        <TaskTable tasks={tasks} setTaskId={setTaskId} taskId={taskId} />
                        <SessionStarter taskId={taskId} handleClick={handleClick}/>
                    </>
                )
            }
        </div>
    )
}

export default FocusPage