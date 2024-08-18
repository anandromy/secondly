"use client"

import { Button } from "@/components/ui/button"
import { PauseIcon, PlayIcon } from "lucide-react"
import { useEffect, useState } from "react"

type session = {
    startTime?: Date
    endTime?: Date
}

const FocusPage = () => {

    const [ session, setSession ] = useState<any>()

    const fetchSession = async () => {
        const response = await fetch("/api/active-session")
        const data = await response.json()
        if (data.message.length === 0) {
            setSession(null)
        } else {
            setSession(data.message)
        }
    }

    useEffect(() => {
        fetchSession()
    }, [])

    const handleClick = async () => {
        if(!session){
            const response = await fetch("/api/session", {
                method: "POST",
                body: JSON.stringify({ startTime: new Date() })
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
        <div className="border rounded-lg p-3 max-w-lg mx-auto mt-10">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <Button variant="outline" onClick={handleClick}>
                        {
                            session ?
                            <PauseIcon /> : 
                            <PlayIcon />
                        }
                    </Button>
                    <p>Time</p>
                </div>
                <div className="space-x-3">
                    <Button variant="outline" onClick={async () => {
                        const res = await fetch("/api/session", {
                            method: "DELETE",
                            body: JSON.stringify({ sessionId: session[0].id })
                        })
                        const data = await res.json()
                        console.log(data)
                        fetchSession()
                    }}>Cancel</Button>
                    <Button onClick={async() => {
                        const response = await fetch("/api/session", {
                            method: "PUT",
                            body: JSON.stringify({ endTime: new Date(), sessionId: session[0].id })
                        })
            
                        const data = await response.json()
                        console.log(data)
                        fetchSession()
                    }}>Finish</Button>
                </div>
            </div>
        </div>
    )
}

export default FocusPage