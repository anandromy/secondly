import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
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
                message: "No user found",
                success: false
            }, { status: 404 })
        }

        return Response.json({
            message: user,
            success: true
        }, { status: 200 })

    } catch (error) {
        console.error("Error in fetching user: ", error)
        return Response.json({
            success: false,
            message: "Error fetching users"
        }, {status: 500 })
    }
}