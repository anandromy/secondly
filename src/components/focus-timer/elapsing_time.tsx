"use client"

import { useEffect, useState } from "react"

type Props = {
    sessions: [{
        startTime?: Date,
        endTime?: Date
    }]
}

export const ElapsingTime = ({ sessions }: Props) => {

    if(sessions && sessions.length > 0){
        const startTime = sessions[0].startTime
        const newDate = new Date(startTime || "")
        const [ elapsedTime, setElapsedTime ] = useState<string>()

        useEffect(() => {
            const updateElapsedTime = () => {
                const { elapsedDays, elapsedHours, elapsedMinutes, elapsedSeconds} = getTimeElapsed(newDate, new Date())
                const formattedTime = `${elapsedHours % 24}h ${elapsedMinutes % 60}m ${elapsedSeconds % 60}s`
                setElapsedTime(formattedTime)
            }

            const intervalId = setInterval(updateElapsedTime, 1000)
            return () => clearInterval(intervalId)
        }, [startTime])

        return(
            <div>
                {elapsedTime}
            </div>
        )
    } else {
        return <div>
            Time
        </div>
    }
}

function getTimeElapsed(start: Date, current: Date) {
    const timeDifference = current.getTime() - start.getTime() 

    const elapsedSeconds = Math.floor(timeDifference / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);

    return {
        elapsedSeconds, elapsedMinutes, elapsedHours, elapsedDays
    }
}