"use server"

import { signIn as signInFn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/auth/tokens"
import { signInValidator, TsignInValidator } from "@/lib/zod/validators"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export async function signIn (credentials: TsignInValidator) {
   const validatedCredentials = signInValidator.safeParse(credentials)
   
   if(!validatedCredentials.success){
      return { error: "Invalid fields!"}
   }
   
   const { email, password } = validatedCredentials.data
   
   const existingUser = await getUserByEmail(email)
   
   if(!existingUser || !existingUser.email) {
      return { error: "User with this email does not exist!" }
   }
   
   //TODO: Send verification email "i don't have a domain to use :("
   // if(!existingUser.hashedPassword) {
   //    return { error: "This email is associated with another login provider!" }
   // }
   
   // if(!existingUser.emailVerified) {
   //    const verificationToken = await generateVerificationToken(existingUser.email)
      
   //    return { success: "Verification email sent" }
   // }
   
   try {
      await signInFn("credentials", {
         email, password,
         redirectTo: DEFAULT_LOGIN_REDIRECT
         //TODO: callbackUrl ||
      })
            
      return { success: "Signed in successfully" }
   } catch (error) {
      if(error instanceof AuthError){
         switch (error.type) {
            case "CredentialsSignin":
               return { error: "Invalid Credentials!" }
            case "CallbackRouteError":
               return { error: error.cause?.err?.message }
            default:
               return { error: "Something went wrong!" }
         }
      }
      
      throw error
   }
}