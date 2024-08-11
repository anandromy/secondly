import { SignupSchema } from "@/schemas";
import { z } from "zod";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
    const { data, error } = SignupSchema.safeParse(values)
    if(error) {
        return { error: error.message }
    }
    console.log(data)
    return { success: "Email Sent!" }
}