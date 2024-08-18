import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CreateSessionSchema, EndSessionSchema } from "@/schemas";

export async function GET (req: Request) {
    const session = await auth()
    if(!session || !session.user) {
        return Response.json({ 
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }
    
    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        })
        if(!user) {
            return Response.json({
                success: false,
                message: "No user found"
            }, { status: 404 })
        }
        const sessions = await db.session.findMany({
            where: {
                userId: user.id
            }
        })
        return Response.json({
            success: true,
            message: sessions
        }, { status: 200 })
    } catch (error) {
        console.error("Error in fetching work sessions: ", error)
        return Response.json({
            success: false,
            message: "Error occured while fetching sessions",
        }, { status: 500 })
    }
}

export async function POST (req: Request) {
    const authSession = await auth()
    if(!authSession || !authSession.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }
    try {
        const userExits = await db.user.findUnique({
            where: {
                id: authSession.user.id
            }
        })
        if(!userExits) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }
        const session = await req.json()
        const { data, success, error } = CreateSessionSchema.safeParse(session)
        if(!success) {
            console.log("ERROR IN INVALID SESSION", error.message)
            return Response.json({
                success: false,
                message: "Invalid session"
            }, { status: 400 })
        }
        const isActive = await db.session.findMany({
            where: {
                endTime: null
            }
        })
        if(isActive.length > 0) {
            return Response.json({
                success: false,
                message: "A session is already active"
            }, { status: 400 })
        }
        const newSession = await db.session.create({
            data: {
                userId: userExits.id,
                ...data
            }
        })
        return Response.json({
            success: true,
            message: "Successfully created session",
            sessionId: newSession.id
        }, { status: 201 })

    } catch (error) {
        console.error("Error in creating session: ", error)
        return Response.json({
            success: false,
            message: "Error while creating session"
        }, { status: 500 })
    }
}

export async function PUT (req: Request) {
    const session = await req.json()
    const { data, success } = EndSessionSchema.safeParse(session)
    const authSession = await auth()
    if(!authSession || !authSession.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    try {
        if(!success) {
            return Response.json({
                success: false,
                message: "Invalid session"
            }, { status: 400 })
        }
        await db.session.update({
            where: {
                id: data.sessionId,
                endTime: null
            }, 
            data: {
                endTime: data.endTime
            }
        })
        return Response.json({
            success: true,
            message: "Successfully updated session"
        }, { status: 200 })
    } catch (error) {
        console.error("Error while ending session: ", error)
        return Response.json({
            success: false,
            message: "Some error occured while ending session"
        }, { status: 500 })
    }
}

export async function DELETE (req:Request) {
    const requestBody = await req.json()
    const authSession = await auth()
    if(!authSession || !authSession.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }
    try {
        await db.session.delete({
            where: {
                id: requestBody.sessionId
            }
        })
        return Response.json({
            success: true,
            message: "Successfully deleted session"
        }, { status: 200 })
    } catch (error) {
        console.error("Error while deleting session: ", error)
        return Response.json({
            success: false,
            message: "Error while deleting session"
        }, { status: 500 })
    }
}