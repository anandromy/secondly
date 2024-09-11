import { db } from "@/lib/utils"
import { redirect } from "next/navigation"

export async function POST(req: Request) {
    const { taskId, startTime } = await req.json()
    if(!taskId || !startTime) {
        return Response.json({
            message: "Invalid data",
            success: false
        }, { status: 400 })
    }
    try {
        const activeSession = await db.session.findFirst({
            where: {
                userId: "cm014wqjp00002sqj2eoep8zu",
                endTime: null
            }
        })
        if(activeSession) {
            return Response.json({
                message: "There is already an active session",
                session: activeSession
            }, { status: 200 })
        }
        const session = await db.session.create({
            data: {
                userId: "cm014wqjp00002sqj2eoep8zu",
                taskId: taskId,
                startTime: startTime,
            }
        })
        return Response.json({
            session,
            success: true
        }, { status: 201 })
    } catch (error) {
        console.error("Error in creating session: ", error)
        return Response.json({
            message: "Error occured while creating new focus session",
            success: false
        }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    const { sessionId, endTime } = await req.json()
    try {
        await db.session.update({
            where: {
                id: sessionId,
                endTime: null
            }, data: {
                endTime: endTime
            }
        })
       return Response.json({
        message: "Successfully updated session",
        success:  true
       }, { status: 200 })
    } catch (error) {
        console.error("Some error occured while updating session: ", error)
        return Response.json({
            message: "Error while updating session",
            success: false
        }, { status: 500 })
    }
}