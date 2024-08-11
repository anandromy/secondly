"use server"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { SigninSchema } from "@/schemas"
import { AuthError } from "next-auth"
import { z } from "zod"

export const signin = async (values: z.infer<typeof SigninSchema>) => {

    // Server side validation is neccessary because client side validation can be bypassed
    const validatedFields =  SigninSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT   
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error;
    }
}