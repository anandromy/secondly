import { db } from "@/lib/utils"
export const getActiveSession = async () => {
    const activeSession = await db.session.findFirst({
        where: {
            userId: "cm014wqjp00002sqj2eoep8zu",
            endTime: null
        }
    })

    return activeSession
}