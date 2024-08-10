"use server"

import { SigninSchema } from "@/schemas"
import { z } from "zod"

export const login = async (values: z.infer<typeof SigninSchema>) => {

    // Server side validation is neccessary because client side validation can be bypassed
    const validatedFields =  SigninSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    return { success: "Email sent!" }
}