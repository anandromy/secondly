import { db } from "@/lib/utils"

export const getTasks = async () => {
    const tasks = await db.task.findMany({
        where: {
            userId: "cm014wqjp00002sqj2eoep8zu"
        },
        select: {
            id: true,
            name: true,
            status: true,
            deadline: true,
            description: true,
            Project: {
                select: {
                    name: true,
                    icon: true
                }
            }
        }
    })

    return tasks
}