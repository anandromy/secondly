import { db } from "@/lib/utils"

export async function POST(req: Request) {
    const projectId = await req.json()
    if(!projectId) {
        return Response.json({
            message: "Provide project id",
            success: false
        }, { status: 404 })
    }
    try {
        const project = await db.project.findUnique({
            where: {
                id: projectId
            }
        })
        return Response.json({
            project,
            success: true
        }, { status: 200 })
    } catch (error) {
        console.error("Error in fetching project by id: ", error)
        return Response.json({
            message: "Some error occured while fetching project",
            success: false
        }, { status: 500 })
    }
}