import { checkItem } from "@/components/task/add/addTaskForm"
import { db } from "@/lib/utils"

export async function POST(req: Request) {
    const { taskName, description, projectId, checkList, isoDate, time } = await req.json()
    const date = new Date(isoDate)
    const [hours, minutes] = time.split(":").map(Number)

    date.setHours(hours, minutes, 0, 0)
    const deadline = new Date(date.toISOString())
    const today = new Date()
    let isPassed
    if(deadline.getTime() < today.getTime()) {
        isPassed = true
    } else {
        isPassed = false
    }
    try{
        const task = await db.task.create({
            data: {
                userId: "cm014wqjp00002sqj2eoep8zu",
                deadline: deadline,
                description: description,
                status: "todo",
                name: taskName,
                projectId: projectId
            }
        })

        const newCheckList = checkList.map((item: checkItem) => {
            return { name: item.name, done: item.done, taskId: task.id }
        })

        await db.checkListItem.createMany({
            data: newCheckList
        })

        return Response.json({
            message: "Created new task",
            success: true
        }, { status: 201 })
    } catch (error) {
        return Response.json({
            message: "Some error occured while adding task",
            success: false
        }, { status: 500 })
    }
}