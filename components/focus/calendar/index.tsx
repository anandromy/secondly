import { db } from "@/lib/utils"

export const Calendar = async () => {
    const sessions = await db.session.findMany({
        where: {
            endTime: {
                not: null
            }
        },
        include: {
            Task: {
                select: {
                    name: true,
                    deadline: true,
                    Project: {
                       select: {
                        name: true
                       }
                    }
                }
            }
        }
    })
    return(
        <div className="w-[300px] border rounded-lg px-3">
            {sessions.map((item) => {
                const duration = format(item.endTime?.getTime() as number - item.startTime.getTime())
                return (
                    <div className="flex items-center">
                        {`${item.Task.name} worked for ${duration}`}
                    </div>
                )
            })}
        </div>
    )
}

const format = (ms: number): string => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    const s = seconds % 60
    const mins = minutes % 60

    return `${hours} h ${mins} minutes ${s} seconds`
}