"use client"

import { cn } from "@/lib/utils"
import useConversation from "@/hooks/useConversation"
import { Conversation, Message, User } from "@/types"
import ConversationBox from "./ConversationBox"
import GroupModal from "./GroupModal"
import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react"
import { pusherClient } from "@/lib/pusher"
import { find } from "lodash"
import { useRouter } from "next/navigation"
import { ScrollArea } from "./ui/scroll-area"

interface ConversationSideBarProps {
   conversations: Conversation[]
   users: User[]
}

const ConversationSideBar = ({ conversations, users }: ConversationSideBarProps) => {
   const [items, setItems] = useState(conversations)
   const session = useSession()
   const router = useRouter()
   const { isOpen, conversationId } = useConversation()
   
   const pusherKey = useMemo(() => {
      return session.data?.user.email
   }, [session.data?.user.email])
   
   useEffect(() => {
      if(!pusherKey) return
      
      pusherClient.subscribe(pusherKey)
      pusherClient.subscribe(conversationId)
      
      const newHandler = (conversation: Conversation) => {
         setItems((current) => {
            if(find(current, { id: conversation.id })) return current
            
            return [conversation, ...current]
         })
      }
      
      const updateHandler = (conversation: Conversation) => {
         setItems((current) => current.map((currentConversation) => {
            if (currentConversation.id === conversation.id) {
               return {
                  ...currentConversation,
                  messages: conversation.messages
               }
            }
    
            return currentConversation;
         }).sort((a, b) => 
            new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime()
         ))
      }
      
      const removeHandler = (conversation: Conversation) => {
         setItems((current) => {
            return [...current.filter((item) => item.id !== conversation.id)]
         })
         
         if(conversationId === conversation.id) {
            router.push("/conversations")
            router.refresh()
         }
      }
      
      const lastMessageDeleteHandler = (deletedMessage: Message) => {
         setItems((current) => current.map((currentConversation) => {
            if(currentConversation.id === conversationId) {
               return {
                  ...currentConversation,
                  messages: currentConversation.messages.filter((message) => message.id !== deletedMessage.id)
               }
            }
            
            return currentConversation
         }))
         
         router.refresh()
      }
      
      pusherClient.bind('conversation-new', newHandler)
      pusherClient.bind("conversation-update", updateHandler)
      pusherClient.bind("conversation-remove", removeHandler)
      pusherClient.bind("message-delete", lastMessageDeleteHandler)
      
      return () => {
         pusherClient.unsubscribe(pusherKey)
         pusherClient.unbind('conversation-new', newHandler)
         pusherClient.unbind("conversation-update", updateHandler) 
         pusherClient.unbind("conversation-remove", removeHandler)
         pusherClient.unbind("message-delete", lastMessageDeleteHandler)
      }
   }, [pusherKey, conversationId, router])
   
   return (
      <aside className={cn("fixed h-[calc(100vh-70px)] md:h-full md:left-20 md:w-80 md:block border-r", { "hidden": isOpen, "block w-full left-0": !isOpen })}>
         <ScrollArea className="h-full">
            <div className="space-y-4">
               <div className="w-full flex justify-between items-center border-b px-4 h-16">
                  <div className="text-2xl font-bold text-primary py-4">
                     Messages 
                  </div>
                  
                  <GroupModal users={users} />
               </div>
               
               <div className="px-4 space-y-2">
                  {items.map((item) => (
                     <ConversationBox 
                        key={item.id}
                        data={item}
                     />
                  ))}
               </div>
            </div>
         </ScrollArea>
      </aside>
   )
}

export default ConversationSideBar
