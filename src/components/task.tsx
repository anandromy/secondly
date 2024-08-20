import { Task as TaskType } from "@prisma/client"
import { EditTask } from "./edit-task"

type Props = {
    task: TaskType
    isEditing: string | false,
    setIsEditing: (x: string | false) => void
}

export const Task = ({ task, isEditing, setIsEditing }: Props ) => {
    return(
        <>
            <div className={`flex items-center rounded-lg py-2 px-3 gap-3 cursor-pointer hover:bg-muted hover:text-primary ${isEditing === task.id && "hidden"}`}
                onClick={() => setIsEditing(task.id)}>
            <p>{task.name}</p>
            </div>
            {
                isEditing === task.id && (
                    <EditTask isEditing={isEditing} setIsEditing={setIsEditing} task={task} />
                )
            }
        </>
    )
}