import { db } from "@/lib/utils";
import { ActionResponse } from "@/types/response";
import emojiRegex from "emoji-regex";
import { NextResponse } from "next/server";

type ApiResponse = {
    message: string,
    success: boolean
}

const regex = emojiRegex()

export async function POST(req: Request) {
    const { name, icon } = await req.json()
    const emojis = icon.match(regex)
    if(emojis.length !== 1) {
        return Response.json({
            message: "One icon is required",
            success: false
        }, { status: 400 })
    }
    try {
        await db.project.create({
            data: {
                userId: "cm014wqjp00002sqj2eoep8zu",
                name: name,
                icon: emojis[0]
            }
        })

        return Response.json({
            message: "Successfully created project",
            success: true
        })
    } catch (error) {
        return Response.json({
            message: "Some error occured while adding project",
            success: false
        }, { status: 500 })
    }
}