import { getTasks } from "@/app/actions/task"
import { AddTask } from "@/components/task/addTask"
import { columns } from "@/components/task/columns"
import { DataTable } from "@/components/task/data-table"

const TaskPage = async () => {

    const tasks = await getTasks()
    return(
        <div className="w-full py-2 px-4">
            <div className="flex justify-end">
                <AddTask />
            </div>
            <DataTable data={tasks} columns={columns} />
        </div>
    )
}

export default TaskPage