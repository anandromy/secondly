"use server"

import { SignupSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
    const validateFields = SignupSchema.safeParse(values)
    if(!validateFields.success){
        return { error: "Invalid Fields"}
    }

    const { name, email, password } = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    if(existingUser) {
        return { error: "User already exists" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Account created successfully!" }
}