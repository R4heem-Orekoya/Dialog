import { TMessageSchema } from "@/lib/zod/validators";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import useConversation from "@/hooks/useConversation";

interface MessageInputProps {
   id: "message"
   register: UseFormRegister<TMessageSchema>
   errors: FieldErrors<TMessageSchema>
   required: boolean
   placeholder: string
   handleSubmit: UseFormHandleSubmit<TMessageSchema, undefined>
   setValue:  UseFormSetValue<TMessageSchema>
   submit: ({ message }: TMessageSchema) => void
}

const MessageInput = ({ id, placeholder, register, required, setValue, handleSubmit }: MessageInputProps) => {
   const { conversationId } = useConversation()
   
   const onsubmit = ({ message }: TMessageSchema) => {
      setValue("message", "", { shouldValidate: true })
      axios.post("/api/messages", {
         message, conversationId
      }).catch(() => {
         setValue("message", message)
      })
   }
   
   return (
      <Textarea
         onKeyDown={(e) => {
            if(e.key === "Enter" && e.shiftKey) {
               e.preventDefault()
               handleSubmit(onsubmit)()
            }else if (e.key === 'Enter' && e.shiftKey) {
               
           }
         }}
         {...register(id, { required })} 
         id={id} placeholder={placeholder} 
         className="w-full max-h-10 px-0 py-2.5 resize-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none border-none text-primary placeholder:text-muted-foreground" 
      />
   )
}

export default MessageInput
