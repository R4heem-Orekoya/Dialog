import { currentUser } from "@/data/user";
import { prisma } from "@/lib/db/prisma";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(request: Request, { params }: { params: { messageId?: string }}) {
   try{
      const signedInUser = await currentUser()
      const { messageId } = params
      const { conversationId } = await request.json()
      
      if (!signedInUser) return new NextResponse("Unauthorised", { status: 401 })
      
      const existingMessage = await prisma.message.findUnique({
         where: {
            id: messageId,
            senderId: signedInUser.id
         }
      })
      
      if (!existingMessage) return new NextResponse("Invalid messageId!", { status: 400 })
         
      const deletedMessage = await prisma.message.deleteMany({
         where: {
            id: messageId,
            senderId: signedInUser.id
         }
      })
      
      if(existingMessage.image_key) {
         const utapi = new UTApi()
         utapi.deleteFiles([existingMessage.image_key])
      }
      
      await pusherServer.trigger(conversationId!, "message-delete", existingMessage)
      
      return NextResponse.json({ })
   }catch(error: any) {
      console.log("Error delete message", error);
      return new NextResponse("Internal Server Error", { status: 500 })
   }
}