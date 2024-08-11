import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } })
        return user
    } catch (error) {
        console.error("Some error in getUserByEmail: ", error)
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id} })
        return user
    } catch (error) {
        console.log("Error in getUserById: ", error)
        return null
    }
}