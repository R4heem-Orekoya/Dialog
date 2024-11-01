import { currentUser } from "@/data/user"
import { prisma } from "@/lib/db/prisma"
import { pusherServer } from "@/lib/pusher"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
   try {
      const user = await currentUser()
      const body = await request.json()
      const { userId, isGroup, members, name } = body
      
      if(!user?.email || !user?.id) return new NextResponse("Unauthorised", { status: 401 })
      
      if(isGroup && (members.length < 2 || !name)) {
         return new NextResponse("Invalid data", { status: 400 })
      }
      
      if(isGroup) {
         const newConversation = await prisma.conversation.create({
            data: {
               isGroup,
               name,
               users: {
                  connect: [
                     ...members.map((member: { id: string }) => ({
                        id: member.id
                     })),
                     {
                        id: user.id
                     }
                  ],
               },
               userIds: [
                  user.id, ...members.map((member: { id: string }) => member.id)
               ]
            },
            include: {
               users: true
            }
         })
         
         
         revalidatePath("/conversations", "layout")
         
         newConversation.users.forEach(async (user) => {
            if(user.email) {
               await pusherServer.trigger(user.email, "conversation-new", newConversation)
            }
         });
         
         return NextResponse.json(newConversation)
      }
      
      const existingConversations = await prisma.conversation.findMany({
         where: {
            OR: [
               {
                  userIds: {
                     equals: [user.id, userId]
                  }
               },
               {
                  userIds: {
                     equals: [userId, user.id]
                  }
               }
            ]
         }
      })
      
      const singleConversation = existingConversations[0]
      
      if(singleConversation) return NextResponse.json(singleConversation)
         
      const newConversation = await prisma.conversation.create({
         data: {
            users: {
               connect: [
                  {
                     id: user.id
                  },
                  {
                     id: userId
                  }
               ]
            },
            userIds: [user.id, userId]
         },
         include: {
            users: true
         }
      })
      
      newConversation.users.forEach(async (user) => {
         if(user.email) {
            await pusherServer.trigger(user.email, "conversation-new", newConversation)
         }
      });
      
      return NextResponse.json(newConversation)
   } catch (error) {
      return new NextResponse("Internal server error!", { status: 500 })
   }
}