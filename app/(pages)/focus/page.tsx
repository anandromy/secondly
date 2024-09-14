import { getActiveSession } from "@/app/actions/focus/getActiveSession"
import { getProjects } from "@/app/actions/project"
import { getTasks } from "@/app/actions/task"
import { Calendar } from "@/components/focus/calendar"
import { SessionCard } from "@/components/focus/session/sessionCard"

const FocusPage = async () => {
    const projects = await getProjects()
    const tasks = await getTasks()

    const activeSession = await getActiveSession()

    if (projects.length === 0 && tasks.length === 0) {
        return (
            <div className="py-6 border rounded-lg max-w-2xl md:ml-12">
                There are no projects or tasks added, add some first
            </div>
        )
    }

    return (
        <div className="pt-6 px-6 h-full flex gap-10 justify-center">
            <SessionCard activeSession={activeSession} />
            <Calendar />
        </div>
    )
}

export default FocusPage