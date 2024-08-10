import { z } from "zod"

export const SigninSchema = z.object({
    email: z.string({
        message: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})