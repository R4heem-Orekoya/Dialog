import SideBar from "@/components/SideBar"
import { ReactNode } from "react"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import ConversationSideBar from "@/components/ConversationSideBar";
import { getConversations } from "@/data/conversation";
import { getUsers } from "@/data/user";

interface ConversationsLayoutProps{
   children: ReactNode
}

export default async function ConversationsLayout({ children }: ConversationsLayoutProps) {  
   const conversations = await getConversations() 
   const users = await getUsers()
   
   return (
      <SideBar>
         <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
         <div className="h-full">
            <ConversationSideBar 
               users={users}
               conversations={conversations}
            />
            {children}
         </div>
      </SideBar>
   )
}