import { auth } from "@/auth"
import { prisma } from "@/lib/db/prisma"

export const getUserByEmail = async (email: string) => {
   try {
      const user = await prisma.user.findUnique({
         where: {
            email
         }
      })
      
      return user
   } catch(err) {
      return null
   }  
}

export const getUserById = async (id: string) => {
   try {
      const user = await prisma.user.findUnique({
         where: {
            id
         },
         omit: {
            hashedPassword: true
         }
      })
      
      return user
   } catch(err) {
      return null
   }  
}

export const getUsers = async () => {
   const session = await auth()
   
   if(!session?.user) return []
   
   try {
      const users = await prisma.user.findMany({
         orderBy: {
            createdAt: "desc"
         },
         where: {
            NOT: {
               id: session.user.id
            }
         },
         omit: {
            hashedPassword: true
         }
      })
      
      return users
   } catch (error) {
      return []
   }
}

export const currentUser = async () => {
   const session = await auth()
   if (!session?.user) return null
   
   try {
      const user = await getUserById(session.user.id)
      
      return user
   } catch (error) {
      return null
   }
}