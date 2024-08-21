import { Checkbox } from "@/components/ui/checkbox"
import { Task } from "@prisma/client"

type Props = {
    tasks?: Task[]
    setTaskId: (id: string | null) => void
    taskId: string | null
}

export const TaskTable = ({ tasks, setTaskId, taskId }: Props) => {
    return(
        <div className=" h-96 border py-6 px-6 rounded-lg overflow-y-scroll space-y-1.5">
            { tasks && tasks?.length !== 0 &&
                tasks.map((task) => (
                    <div
                        className={`bg-muted rounded-md py-3 px-3 cursor-pointer flex justify-start items-center gap-3 text-muted-foreground 
                            ${task.id ===  taskId && "border border-muted-foreground"}`}
                        onClick={() => setTaskId(task.id)}
                    >
                        <Checkbox className="h-5 w-5" />
                        {task.name}
                    </div>
                ))
            }
        </div>
    )
}