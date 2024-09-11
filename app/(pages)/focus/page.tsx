import { getProjects } from "@/app/actions/project"
import { getTasks } from "@/app/actions/task"
import { SessionCard } from "@/components/focus/session/sessionCard"

const FocusPage = async () => {
    const projects = await getProjects()
    const tasks = await getTasks()

    if (projects.length === 0 && tasks.length === 0) {
        return (
            <div className="py-6 border rounded-lg max-w-2xl md:ml-12">
                There are no projects or tasks added, add some first
            </div>
        )
    }

    return (
        <div className="py-6">
            <SessionCard />
        </div>
    )
}

export default FocusPage