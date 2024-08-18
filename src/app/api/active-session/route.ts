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
        const sessions = await db.session.findMany({
            where: {
                userId: session.user.id,
                endTime: null
            }
        })

        return Response.json({
            message: sessions,
            success: true
        }, { status: 200 })
    } catch (err) {
        console.error("Error while fetching active sessions: ", err)
    }
}