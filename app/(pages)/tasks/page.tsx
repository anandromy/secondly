import { getTasks } from "@/app/actions/task"
import { columns } from "@/components/task/columns"
import { DataTable } from "@/components/task/data-table"
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
            <DataTable data={tasks} columns={columns} />
        </div>
    )
}

export default TaskPage