"use client"

import useOtherUser from "@/hooks/useOtherUser"
import { User } from "@/types"
import { Conversation } from "@prisma/client"
import { ChevronLeft, Phone, Video } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import ProfilePicture from "./ProfilePicture"
import { Button, buttonVariants } from "./ui/button"
import ProfileDrawer from "./ProfileDrawer"
import GroupProfilePicture from "./GroupProfilePicture"
import { useActiveList } from "@/hooks/useActiveList"

interface ConversationHeaderProps{
   conversation: Conversation & {
      users: User[]
   }
}

const ConversationHeader = ({ conversation }: ConversationHeaderProps) => {
   const { otherUser } = useOtherUser(conversation)
   const { members } = useActiveList()
   const isActive = members.indexOf(otherUser.email!) !== -1
   
   const statusText = useMemo(() => {
      if(conversation.isGroup) {
         return `${conversation.users.length} members`
      }
      
      return isActive ? "Online" : "Offline"
   }, [conversation, isActive])
   
   return (
      <div className="w-full h-16 border-b flex justify-between items-center px-4 md:px-6">
         <div className="flex gap-3 items-center">
            <Link href="/conversations" className={buttonVariants({ size: "icon", variant: "link", className: "md:hidden p-0 w-6 h-6" })}>
               <ChevronLeft className="w-5 h-5" strokeWidth={1.5}/>
               <span className="sr-only">
                  Go back
               </span>
            </Link>
            {conversation.isGroup ? (
               <GroupProfilePicture />
            ): (
               <ProfilePicture user={otherUser} />
            )}
            <div className="flex flex-col">
               <div>
                  {conversation.name || otherUser.name}
               </div>
               <div className="text-xs font-light text-muted-foreground -mt-1">
                  {statusText}
               </div>
            </div>
         </div>
         
         <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
               <Video strokeWidth={1.5} className="w-5 h-5"/>
            </Button>
            <Button variant="ghost" size="icon">
               <Phone strokeWidth={1.5} className="w-5 h-5"/>
            </Button>
            <ProfileDrawer 
               data={conversation}
               statusText={statusText}
            />
         </div>
      </div>
   )
}

export default ConversationHeader
