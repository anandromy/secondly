import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createTaskSchema, updateTaskSchema } from "@/schemas";

export async function GET(req: Request) {
    const session = await auth()
    if(!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }
    try {
        const tasks = await db.task.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                project: true
            }
        })

        return Response.json({
            message: tasks,
            success: true
        }, { status: 200 })
    } catch (err) {
        console.error("Error with fetching tasks: ", err)
        return Response.json({
            message: "Some error occured while fetching tasks",
            success: false
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await auth()
    const requestBody = await req.json()
    if(!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }
    const { data, success, error } = createTaskSchema.safeParse(requestBody)
    if(!success) {
        console.log("ERROR IN CREATING TASK DUE TO INVALID USER INPUT: ", error)
        return  Response.json({
            message: "Invalid task",
            success: false
        }, { status: 400 })
    }
    try {
        await db.task.create({
            data: {
                userId: session.user.id as string,
                projectId: data.projectId,
                name: data.name,
                deadline: data.deadline,
                status: data.status,
                description: data.description
            }
        })

        return Response.json({
            message: "Successfully created task",
            success: true
        }, { status: 201 })
    } catch (error) {
        console.error("Some error occured while creating task: ", error)
        return Response.json({
            message: "Some error occured while creating task"
        }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    const session = await auth()
    if(!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }
    const requestBody = await req.json()
    const { data, success } = updateTaskSchema.safeParse(requestBody)
    if(!success) {
        return Response.json({
            message: "Invalid task type",
            success: false
        }, { status: 400 })
    }

    try {
        await db.task.update({
            where: {
                id: data.taskId
            }, data: {
                id: data.taskId,
                project: {
                    connect: { id: data.projectId }
                },
                deadline: data.deadline,
                description: data.description as string,
                name: data.name,
                status: data.status
            }
        })
        return Response.json({
            message: "Successfully updated task",
            success: true
        }, { status: 200 })
    } catch (error) {
        console.error("ERROR WHILE UPDATING TASK: ", error)
        return Response.json({
            message: "Some error occured while updating task",
            success: false
        }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const session = await auth()
    if(!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }
    try {
        const requestBody = await req.json()
        await db.task.delete({
            where: {
                id: requestBody.taskId as string
            }
        })
        return Response.json({
            message: "Successfully deleted task",
            success: true
        }, { status: 200 })
    } catch (error) {
        console.error("Some error occured while deleting task: ", error)
        return Response.json({
            message: "Some error ocurred while deleting task",
            success: false
        }, { status: 500 })
    }
}