import { prisma } from "@/lib/db/prisma"
import { currentUser } from "./user"

export const getConversations = async () => {
   const signedInUser = await currentUser()
   
   if(!signedInUser) return []
   
   try {
      const coversations = await prisma.conversation.findMany({
         orderBy: {
           lastMessageAt: "desc" 
         },
         where: {
            userIds: {
              has: signedInUser.id 
            },
         },
         include: {
            users: true,
            messages: {
               include: {
                  sender: true,
                  seen: true
               }
            }
         }
      })
      
      return coversations
   } catch (error) {
      return []
   }
}

export const getConversationById = async (id: string) => {
   try {
      const signedInUser = await currentUser()
      
      if(!signedInUser?.id || !signedInUser.email) return null
      
      const conversation = await prisma.conversation.findUnique({
         where: {
            id
         },
         include: {
            users: {
               omit: {
                  hashedPassword: true
               }
            },
         }
      })
      
      return conversation
   } catch (error) {
      return null
   }
}