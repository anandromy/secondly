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