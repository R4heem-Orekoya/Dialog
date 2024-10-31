import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma"
import { getUserByEmail, getUserById } from "@/data/user"
import bcrypt from "bcryptjs"
import google from "next-auth/providers/google"
import github from "next-auth/providers/github"
import credentials from "next-auth/providers/credentials"
import { signInValidator } from "@/lib/zod/validators"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/error"
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    //TODO: Send verification email "i don't have a domain to use :("
    // async signIn({ user, account }) {
    //   //Allow OAuth without email verification
    //   if(account?.provider !== "credentials") return true
      
    //   const dbUser = await getUserById(user.id as string)
      
    //   //Prevent sign in without verification
    //   if(!dbUser || !dbUser.emailVerified) return false
      
    //   //TODO: Add 2FA Check
      
    //   return true
    // },
    
    async session({ token, session }) {
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      return session
    },
    
    async jwt({ token }) {
      if(!token.sub) return token
      
      const dbUser = await getUserById(token.sub)
      
      if(!dbUser) return token
      
      return token 
    }
  },
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    credentials({
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
})