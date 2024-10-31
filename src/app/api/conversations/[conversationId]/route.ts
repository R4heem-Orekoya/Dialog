import { currentUser } from "@/data/user"
import { prisma } from "@/lib/db/prisma"
import { pusherServer } from "@/lib/pusher"
import { NextResponse } from "next/server"
import { UTApi } from "uploadthing/server"

export async function DELETE(request: Request, { params }: { params: { conversationId?: string }}) {
   try {
      const signedInUser = await currentUser()
      const { conversationId } = params
      
      if (!signedInUser) return new NextResponse("Unauthorised", { status: 401 })
         
      const utapi = new UTApi();
      const existingConversation = await prisma.conversation.findUnique({
         where: {
            id: conversationId,
            userIds: {
               hasSome: [signedInUser.id]
            }
         },
         include: {
            users: true,
            messages: true
         }
      })
      
      if(!existingConversation) return new NextResponse("Invalid Conversation Id!", { status: 400 })
      
      const deletedConversation = await prisma.conversation.deleteMany({
         where: {
            id: conversationId,
            userIds: {
               hasSome: [signedInUser.id]
            }
         }
      })
      
      const imageKeys = existingConversation.messages
                        .map((message) => message.image_key)
                        .filter((key) => key !== null)

      await utapi.deleteFiles(imageKeys)
      
      existingConversation.users.forEach(async (user) => {
         if(user.email) {
            await pusherServer.trigger(user.email, "conversation-remove", existingConversation)
         }
      })
      
      return NextResponse.json(deletedConversation)
   } catch (error: any) {
      console.log();
      return new NextResponse("Internal Server Error", { status: 500 })
   }
}