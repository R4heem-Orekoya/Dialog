"use client"

import useConversation from "@/hooks/useConversation"
import { Message } from "@/types"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import axios from "axios"
import { pusherClient } from "@/lib/pusher"
import { find } from "lodash"
import { ScrollArea } from "./ui/scroll-area"

interface ConversationBodyProps {
   initialMessages: Message[]
}

const ConversationBody = ({ initialMessages }: ConversationBodyProps) => {
   const [messages, setMessages] = useState(initialMessages)
   const bottomRef = useRef<HTMLDivElement>(null)
   const { conversationId } = useConversation()
   
   useEffect(() => {
      axios.post(`/api/conversations/${conversationId}/seen`)
   }, [conversationId])

   useEffect(() => {
      pusherClient.subscribe(conversationId)
      bottomRef.current?.scrollIntoView()

      const messageHandler = (message: Message) => {
         axios.post(`/api/conversations/${conversationId}/seen`)
         
         setMessages((current) => {
            if (find(current, { id: message.id })) {
               return current
            }
            
            return [...current, message]
         })
         
         bottomRef.current?.scrollIntoView()
      }
      
      const updateMessageHandler = (newMessage: Message) => {
         setMessages((current) => current.map((currentMessage) => {
            if(currentMessage.id === newMessage.id) return newMessage
            
            return currentMessage
         }))
      }
      
      const messageDeleteHander = (deletedMessage: Message) => {
         setMessages((current) => current.filter((currentMessage) => currentMessage.id !== deletedMessage.id))
      }

      pusherClient.bind("messages-new", messageHandler)
      pusherClient.bind("message-update", updateMessageHandler)
      pusherClient.bind("message-delete", messageDeleteHander)

      return () => {
         pusherClient.unsubscribe(conversationId)
         pusherClient.unbind("messages-new", messageHandler)
         pusherClient.unbind("message-update", updateMessageHandler)
         pusherClient.unbind("message-delete", messageDeleteHander)
      }
   }, [conversationId])
   

   return (
      <ScrollArea className="flex-1">
         <div className="max-h-[100vh-140px]">
            {messages.map((message, i) => (
               <MessageBox
                  data={message}
                  key={message.id}
                  isLast={i == messages.length - 1}
               />
            ))}
            <div ref={bottomRef} className="pt-20" />
         </div>
      </ScrollArea>
   )
}

export default ConversationBody
