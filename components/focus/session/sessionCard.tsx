"use client"
import { TaskSelector } from "@/components/selectors/taskSelector"
import { Button } from "@/components/ui/button"
import { Session } from "@prisma/client"
import { RocketIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Timer } from "./timer"

type Props = {
    activeSession: Session | null
}
export const SessionCard = ({ activeSession }: Props) => {
    const [ selectedProjectId, setSelectedProjectId ] = useState<string>()
    const [ selectedTaskId, setSelectedTaskId ] = useState<string>()

    const [ session, setSession ] = useState<Session>()

    useEffect(() => {
        if(activeSession){
            setSession(activeSession)
        }
    }, [session])

    const createSession = async () => {
        const startTime = new Date()
        const res = await fetch("http://localhost:3000/api/focus/session", {
            method: "POST",
            body: JSON.stringify({
                startTime,
                taskId: selectedTaskId
            })
        })
        const data = await res.json()
        if(res.ok) {
            setSession(data.session)
        } else {
            console.log(data)
            toast.error("Error in starting focus session")
        }
    }

    return(
        <div className="max-w-xl rounded-md md:ml-40 space-y-4">
            {
                session? (
                    <Timer session={session} />
                ): (
                    <>
                        <TaskSelector setSelectedProjectId={setSelectedProjectId} setSelectedTaskId={setSelectedTaskId} />
                        <Button disabled={(selectedProjectId || selectedTaskId) ? false : true} className="w-full mt-4" onClick={async () => {
                            await createSession()
                        }}>
                            <RocketIcon className="mr-2 h-4 w-4" />
                            Start
                        </Button>
                    </>
                )
            }
        </div>
    )
}