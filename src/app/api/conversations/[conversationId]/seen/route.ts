import { currentUser } from "@/data/user";
import { prisma } from "@/lib/db/prisma";
import { pusherServer } from "@/lib/pusher";
import { update } from "lodash";
import { NextResponse } from "next/server";

export async function POST (request: Request, { params }: { params: { conversationId?: string }}) {
   try {
      const signedInUser = await currentUser()
      const { conversationId } = params
      
      if(!signedInUser?.id || !signedInUser?.email) return new NextResponse("Unauthorised", { status: 401 })
         
      const conversation = await prisma.conversation.findUnique({
         where: {
            id: conversationId
         },
         include: {
            messages: {
               include: {
                  seen: true
               }
            },
            users: true
         }
      })
      
      if(!conversation) return new NextResponse("Invalid Conversation Id", { status: 400 })
      
      const lastMessage = conversation.messages[conversation.messages.length - 1]
      
      if(!lastMessage) return NextResponse.json(conversation)
         
      const updatedMessage = await prisma.message.update({
         where: {
            id: lastMessage.id
         },
         include: {
            sender: true,
            seen: true
         },
         data: {
            seen: {
               connect: {
                  id: signedInUser.id
               }
            }
         }
      })
      
      await pusherServer.trigger(signedInUser.email, "conversation-update", {
         id: conversationId,
         messages: [updatedMessage]
      })
      
      if(lastMessage.seenIds.indexOf(signedInUser.id) !== -1) {
         return NextResponse.json(conversation)
      }
      
      await pusherServer.trigger(conversationId!, "message-update", updatedMessage)
      
      return NextResponse.json(updatedMessage)
   } catch (error: any) {
      console.log(error, "ERROR_MESSAGES_SEEN");
      return new NextResponse("Internal Server Error", { status: 500 })
   }
}