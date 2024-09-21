import { getTasks } from "@/app/actions/task"
import { TaskTable } from "@/components/task/table"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

const TaskPage = async () => {

    const tasks = await getTasks()
    return(
        <div className="w-full py-2 px-4">
            <div className="flex justify-end">
                <Button asChild variant="ghost" className="hover:text-blue-500">
                    <Link href="http://localhost:3000/tasks/add">
                        <PlusIcon className="h-4 w-4"/> Add task
                    </Link>
                </Button>
            </div>
            <TaskTable defaultData={tasks} />
        </div>
    )
}

export default TaskPage