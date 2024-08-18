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
    }).min(6, { message: "Password must be of atleast 8 characters"}),
    name: z.string().min(1, "Name is required")
})

export const CreateSessionSchema = z.object({
    startTime: z.coerce.date()
})

export const EndSessionSchema = z.object({
    sessionId: z.string(),
    endTime: z.coerce.date()
})