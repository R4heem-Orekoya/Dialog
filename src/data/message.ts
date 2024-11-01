import { prisma } from "@/lib/db/prisma"
import { currentUser } from "./user"

export const getMessages = async (conversationId: string) => {
   try {
      const signedInUser = await currentUser()
      
      if(!signedInUser?.id || !signedInUser.email) return []
      
      const messages = await prisma.message.findMany({
         where: {
            conversationId
         },
         include: {
            sender: true,
            seen: true
         },
         orderBy: {
            createdAt: "asc"
         }
      })
      
      return messages
   } catch (error) {
      return []
   }
}