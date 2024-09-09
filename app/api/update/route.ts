import { db } from "@/lib/utils";

export async function GET(req: Request) {
    const now = new Date()
    try {
        await db.task.updateMany({
            where: {
                userId: "cm014wqjp00002sqj2eoep8zu",
                deadline: {
                    lt: now
                }
            }, data: {
                status: "backlog"
            }
        })

        return Response.json({
            message: "Successfully updated task status",
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log("Some error occured while updating task status: ", error)
        return Response.json({
            message: "Some error occured while updating task status",
            success: false
        }, { status: 500 })
    }
}