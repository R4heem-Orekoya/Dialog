"use client"

import useConversation from "@/hooks/useConversation"
import { cn, renderDate } from "@/lib/utils"
import { Conversation } from "@/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import ProfilePicture from "./ProfilePicture"
import useOtherUser from "@/hooks/useOtherUser"
import GroupProfilePicture from "./GroupProfilePicture"

interface ConversationBox {
   data: Conversation
}

const ConversationBox = ({ data }: ConversationBox) => {
   const { otherUser } = useOtherUser(data)
   const session = useSession()
   const router = useRouter()
   const { conversationId } = useConversation()
   
   const selected = conversationId === data.id
   
   const handleClick = useCallback(() => {
      router.push(`/conversations/${data.id}`)
   }, [data.id, router])
   
   const lastMessage = useMemo(() => {
      const messages = data.messages || []
      
      return messages[messages.length - 1]
   }, [data.messages])
   
   const userId = useMemo(() => {
      return session.data?.user?.id
   }, [session.data?.user.id])
   
   const doesLastMessageBelongToUser = useMemo(() => {
      if(!userId) return false
      
      return lastMessage?.sender?.id === userId
   }, [userId, lastMessage])
   
   const hasSeen = useMemo(() => {      
      if(!lastMessage) return false
      
      const seenArray = lastMessage.seen || []
      
      if(!userId) {
         return false
      }
      
      return seenArray.filter((user) => user.id === userId).length !== 0
   }, [userId, lastMessage])
   
   const lastMessageText = useMemo(() => {
      if(lastMessage?.image) {
         return (
            doesLastMessageBelongToUser ? "You sent a photo 📸." : "Sent a photo 📸."
         )
      }
      
      if(lastMessage?.body) {
         return lastMessage.body
      }
      
      return "Started a conversation"
   }, [lastMessage, doesLastMessageBelongToUser]) 
   
   const date = useCallback((date: Date) => renderDate(date), [])
   
   return (
      <div onClick={handleClick} className={cn("relative w-full flex items-center space-x-3 p-3 bg-white hover:bg-zinc-100 rounded-md transition cursor-pointer", {"border bg-zinc-100": selected })}>
         {data.isGroup ? ( 
            <GroupProfilePicture users={data.users}/>
         ): (
            <ProfilePicture user={otherUser} /> 
         )}
         <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
               <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-primary">{data.name || otherUser.name}</p>
                  {lastMessage?.createdAt && (
                     <p className="text-xs">
                        {date(new Date(lastMessage.createdAt))}
                     </p>
                  )}
               </div>
               <p className={cn("text-sm truncate text-muted-foreground", { "text-zinc-900 font-semibold": !hasSeen })}>{lastMessageText}</p>
            </div>
         </div>
      </div>
   )
}

export default ConversationBox
