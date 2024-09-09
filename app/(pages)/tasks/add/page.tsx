import { getProjects } from "@/app/actions/project"
import { AddTaskForm } from "@/components/task/add/addTaskForm"

const AddTask = async () => {
    const projects = await getProjects()
    return (
        <div className="py-2 px-4">
            <AddTaskForm projects={projects} />
        </div>
    )
}

export default AddTask