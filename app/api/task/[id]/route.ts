import { db } from "@/lib/utils"
import { Prisma, Status } from "@prisma/client"
import { NextRequest } from "next/server"

export const PUT = async (req: NextRequest, { params }: { params: { id: string }}) => {
    const id = params.id
    const searchParams = req.nextUrl.searchParams
    let action: Status | undefined
    if(searchParams.get("action") === "check") {
        action = "done"
    } else if(searchParams.get("action") === "uncheck") {
        action = "todo"
    }
    if(!action) {
        return Response.json({
            message: "Invaid action",
            success: false
        }, { status: 400 })
    }
    try {
        await db.task.update({
            where: {
                id: id
            }, data: {
                status: action
            }
        })
        return Response.json({
            message: "Updated successfully",
            success: true
        }, { status: 200 })
    } catch (error) {
        console.error("Error in mark as done task route: ", error)
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code === "P2025") {
                return Response.json({
                    message: "This task doesn't exists",
                    success: false
                }, { status: 404 })
            }
        }
        return Response.json({
            message: "Some error occured while checking off the task",
            success: false
        }, { status: 500 })
    }
}