import { db } from "@/lib/utils";

export const getProjects = async () => {
    const projects = await db.project.findMany({
        where: {
            userId: "cm014wqjp00002sqj2eoep8zu"
        }
    })

    return projects
}