import { ActionResponse } from "@/types/response";
import { db } from "@/lib/utils";
import emojiRegex from "emoji-regex"

const regex = emojiRegex()


type AddProjectProps = {
    name: string
    icon: string
}

export const getProjects = async () => {
    const projects = await db.project.findMany({
        where: {
            userId: "cm014wqjp00002sqj2eoep8zu"
        }
    })

    return projects
}

export const addProject = async ({ name, icon }: AddProjectProps): Promise<ActionResponse>=> {
    const emojis = icon.match(regex)
    if (emojis?.length !== 1) {
        return {
            success: false,
            message: "Icon length should be one"
        }
    }
    await db.project.create({
        data: {
            userId: "cm014wqjp00002sqj2eoep8zu",
            name: name,
            icon: emojis[0]
        }
    })

    return {
        success: true,
        message: "Created new Project"
    }
}