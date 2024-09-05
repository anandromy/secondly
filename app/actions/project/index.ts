import { ActionResponse } from "@/types/response";
import { db } from "@/lib/utils";
import emojiRegex from "emoji-regex"

const regex = emojiRegex()

type Props = {
    userId: string
}

type AddProjectProps = {
    name: string
    icon: string
    userId: string
}

export const getProjects = async ({ userId }: Props) => {
    const projects = await db.project.findMany({
        where: {
            userId
        }
    })

    return projects
}

export const addProject = async ({ name, icon, userId }: AddProjectProps): Promise<ActionResponse>=> {
    const emojis = icon.match(regex)
    if (emojis?.length !== 1) {
        return {
            success: false,
            message: "Icon length should be one"
        }
    }
    await db.project.create({
        data: {
            userId: userId,
            name: name,
            icon: emojis[0]
        }
    })

    return {
        success: true,
        message: "Created new Project"
    }
}