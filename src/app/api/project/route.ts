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
        const projects = await db.project.findMany({
            where: {
                userId: session.user.id
            }
        })

        return Response.json({
            message: projects,
            success: true
        }, { status: 200 })
        
    } catch (err) {
        console.error("Error in fetching projects: ", err)
        return Response.json({
            message: "Error occured while fetching projects",
            success: false
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await auth()
    const requestBody = await req.json()
    if(!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }

    try {
        await db.project.create({
            data: {
                name: requestBody.name as string,
                userId: session.user.id as string
            }
        })

        return Response.json({
            message: "Successfully created a new  Project",
            success: true
        }, { status: 201 })
        
    } catch (error) {
        console.error("Error while adding project: ", error)
        return Response.json({
            message: "Some error occured while adding project",
            success: false
        }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    const session = await auth()
    const requestBody = await req.json()
    if(!session || !session.user) {
        return Response.json({
            message: "Not Authenticated",
            success: false
        }, { status: 401 })
    }

    try {
         await db.project.update({
            where: {
                id: requestBody.id as string
            }, data: {
                name: requestBody.name as string
            }
         })

         return Response.json({
            message: "Successfully updated the project",
            success: true
         }, { status: 200 })
    } catch (err) {
        console.error("Error while updating project")
        return Response.json({
            message: "Some error occured while updating project",
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
    const requestBody = await req.json()
    try {
        await db.project.delete({
            where: {
                id: requestBody.id as string
            }
        })

        return Response.json({
            message: "Project deleted successfully",
            success: true
        }, { status: 200 })
    } catch (error) {
        console.error("Error in deleting project: ", error)
        return Response.json({
            message: "Some error occured while deleting project",
            success: false
        }, { status: 500 })
    }
}