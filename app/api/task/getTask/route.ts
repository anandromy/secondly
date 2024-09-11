import { db } from "@/lib/utils"

export async function POST(req: Request) {
    const projectId = await req.json()
    if(!projectId) {
        return Response.json({
            message: "No project id",
            success: false
        }, { status: 404 })
    }
    try {
        const tasks = await db.task.findMany({
            where: {
                userId: "cm014wqjp00002sqj2eoep8zu",
                projectId: projectId
            },
            select: {
                id: true,
                name: true,
                deadline: true,
                status: true,
                description: true,
                Project: {
                   select: {
                    id: true,
                    name: true,
                    icon: true
                   }
                }
            }
        })
        return Response.json({
            tasks,
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log("Error while fetching tasks by project id: ", error)
        return Response.json({
            message: "Some error occured while fetching tasks",
            success: false
        }, { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const tasks = await db.task.findMany({
            where: {
                userId: "cm014wqjp00002sqj2eoep8zu"  
            }, select: {
                id: true,
                name: true,
                deadline: true,
                status: true,
                description: true,
                Project: {
                   select: {
                    id: true,
                    name: true,
                    icon: true
                   }
                }
            }
        })
        return Response.json({
            tasks,
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log("Error in fetching all tasks: ", error)
        return Response.json({
            message: "Error occured while fetching tasks",
            success: false
        }, { status: 500 })
    }
}