"use server"

import { signIn as signInFn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/auth/tokens"
import { prisma } from "@/lib/db/prisma"
import { signUpValidator, TsignUpValidator } from "@/lib/zod/validators"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export const register = async (credentials: TsignUpValidator) => {
   try {
      const validatedCredentials = signUpValidator.safeParse(credentials)
      
      if(!validatedCredentials.success){
         return { error: "Invalid fields!" }
      }
      
      const { email, password, name } = validatedCredentials.data
      
      const existingUser = await getUserByEmail(email)
      
      if(existingUser) {
         return { error: "User with this email already exist!" }
      }
      
      const hashedPassword = await bcrypt.hash(password, 12)
      
      await prisma.user.create({
         data: {
            email,
            hashedPassword,
            name
         }
      })
      
      //TODO: Send verification email "i don't have a domain to use :("
      // const verificationToken = await generateVerificationToken(email)
      // return { success: "Verification email sent!" }     
      
      return { success: "User created!" }
   } catch (error: any) {
      // if(error instanceof PrismaClientInitializationError){
      //    return { error: "Couldn't reach database!"}
      // }
      return { error: error.message }
   }
}