import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const session = await auth() 
        
      if(!session?.user.email || !session?.user.id) return new NextResponse("Unauthorised", { status: 401 })
         
      const req = await request.formData()
      const socketId = req.get('socket_id') as string;
      const channelName = req.get('channel_name') as string;
      const data = { user_id: session.user.email }
      
      const authResponse = pusherServer.authorizeChannel(socketId, channelName, data)
      // console.log(authResponse);
      
      return NextResponse.json(authResponse)
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Serever Error", { status: 500 })
   }
}