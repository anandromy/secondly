import Google from "next-auth/providers/google"
import Credentials from "@auth/core/providers/credentials"
import { SigninSchema } from "./schemas"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "./data/user"
import bcrypt from "bcryptjs"


export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = SigninSchema.safeParse(credentials)

        if(validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if(!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password)
          if(passwordsMatch) {
            return user
          }
        }
        return null
      },
    })
  ],
} satisfies NextAuthConfig