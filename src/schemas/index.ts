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

export const SignupSchema = z.object({
    email: z.string({
        message: "Email is required"
    }).email({
        message: "Enter a valid email"
    }),
    password: z.string({
        message: "Password is required"
    }).min(8, { message: "Password must be of atleast 8 characters"})
})