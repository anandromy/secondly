import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    const session = await auth()
    if(!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }

    try {
        const backlogs = await db.task.findMany({
            where: {
                userId: session.user.id as string,
                status: "todo",
                deadline: {
                    lte: new Date()
                }
            }
        })
        return Response.json({
            message: "Updated tasks",
            success: true,
            date: new Date(),
            backlogs
        }, { status: 200 })
    } catch (error) {
        console.error("Error in scheduled update of tasks: ", error)
        return Response.json({
            message: "Some error occured while updating tasks on schedule",
            success: false
        }, { status: 500 })
    }
}