"use client"

import useConversation from "@/hooks/useConversation"
import { messageSchema, TMessageSchema } from "@/lib/zod/validators"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import MessageInput from "./MessageInput"
import DesktopImageUploadButton from "./DesktopImageUploadButton"
import MobileImageUploadButton from "./MobileImageUploadButton"
import { zodResolver } from "@hookform/resolvers/zod"

const MessageForm = () => {
   const { conversationId } = useConversation()
   
   const { register, handleSubmit, setValue, formState: { errors } } = useForm<TMessageSchema>({
      resolver: zodResolver(messageSchema)
   })
   
   const onsubmit = ({ message }: TMessageSchema) => {
      setValue("message", "", { shouldValidate: true })
      axios.post("/api/messages", {
         message, conversationId
      }).catch(() => {
         setValue("message", message)
      })
   }
   
   return (
      <div className="h-16 border-t bg-white flex items-center gap-3 px-4 md:px-6">
         <div className="hidden md:flex">
            <DesktopImageUploadButton />
         </div>
         <div className="flex md:hidden">
            <MobileImageUploadButton />
         </div>
         <form onSubmit={handleSubmit(onsubmit)} className="flex items-center gap-2 flex-1 h-full">
            <MessageInput 
               id="message" 
               errors={errors} 
               placeholder="Enter your message..." 
               register={register} required
               handleSubmit={handleSubmit}
               setValue={setValue}
               submit={onsubmit}
            />
            <Button type="submit" size="icon" className="flex-shrink-0 group">
               <Send className="w-5 h-5 group-hover:rotate-45 duration-300" strokeWidth={1.6}/>
            </Button>
         </form>
      </div>
   )
}

export default MessageForm
