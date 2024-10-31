import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { signInValidator } from "@/lib/zod/validators";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs"
 
export default {
   providers: [
      Google({
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET
      }),
      Github({
         clientId: process.env.AUTH_GITHUB_ID,
         clientSecret: process.env.AUTH_GITHUB_SECRET
      }),
      Credentials({
         async authorize(credentials) {
            const validatedCredentials = signInValidator.safeParse(credentials)
            
            if(validatedCredentials.success){
               const { email, password } = validatedCredentials.data
               
               const dbUser = await getUserByEmail(email)
               
               // Check if the email exists in the database
               if(!dbUser) {
                  throw new Error("User with this email does not exist!")
               }
               
               // Check if the user is associated with a different login provider
               if(!dbUser.hashedPassword) {
                  throw new Error("This email is associated with another login provider!")
               }
               
               const isPasswordMatch = await bcrypt.compare(password, dbUser.hashedPassword)
               
               if(!isPasswordMatch) {
                  throw new Error("Invalid credentials!")
               }
               
               return dbUser
            }
            
            return null
         }
      })
   ]
} satisfies NextAuthConfig