import { Button } from "@/components/ui/button"
import { Session } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
    session: Session
}
export const Timer = ({ session }: Props) => {
    const [ elapsed, setElapsed ] = useState<string>()
    const router = useRouter()
    const startTime = new Date(session.startTime)
    useEffect(() => {
        const updateElapsedTime = () => {
            const elapsedTime = getElapsedTime(startTime)
            setElapsed(elapsedTime)
        }
        const intervalId = setInterval(updateElapsedTime, 1000)
        return () => clearInterval(intervalId)
    }, [])

    const finishSession = async() => {
        const endTime = new Date()
        const res = await fetch("http://localhost:3000/api/focus/session", {
            method: "PUT",
            body: JSON.stringify({
                sessionId: session.id,
                endTime
            })
        })
        const data = await res.json()
        if(res.ok) {
            window.location.reload()
        }
    }

    return(
        <div>
            <pre>
                this is the timer of session : {session.id}
                <br />
                the start time was : {startTime.toString()}
                <br />
                and the elapsed time is {elapsed}
            </pre>
            <Button className="mt-2" disabled={((Number(elapsed?.split(":")[0]) < 1) || (Number(elapsed?.split(":")[0]) === 1 && Number(elapsed?.split(":")[1]) < 30)) ? true : false}
                onClick={async () => {
                    await finishSession()
                }}
            >
                Finish
            </Button>
        </div>
    )
}

const getElapsedTime = (startTime: Date) => {
    const now = new Date()
    const timeDifference = now.getTime() - startTime.getTime()
    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    const remainingMinutes = minutes % 60
    const remainingSeconds = seconds % 60

    const formattedElapsedTime = `${hours.toString().padStart(2, '0')}: ${remainingMinutes.toString().padStart(2, '0')}: ${remainingSeconds.toString().padStart(2, '0')}`
    return formattedElapsedTime
}