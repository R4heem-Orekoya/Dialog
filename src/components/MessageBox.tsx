"use client"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { cn, renderDate } from "@/lib/utils"
import { Message } from "@/types"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import ImageModal from "./ImageModal"
import { Trash2 } from "lucide-react"
import { useCallback } from "react"
import axios from "axios"
import { toast } from "sonner"
import useConversation from "@/hooks/useConversation"
import { useRouter } from "next/navigation"
interface MessageBoxProps {
   isLast: boolean
   data: Message
}

const MessageBox = ({ isLast, data }: MessageBoxProps) => {
   const router = useRouter()
   const session = useSession()
   const { conversationId } = useConversation()
   
   const isOwn = session.data?.user.id === data?.sender?.id
   const seenList = (data.seen || [])
   .filter((user) => user.id !== data?.sender?.id)
   .map((user) => user.name)
   .join(", ")
   
   const container = cn("flex gap-3 p-4", { "justify-end": isOwn })
   
   const avatar = cn({ "order-2": isOwn })
   
   const body = cn("flex flex-col gap-1", { "items-end": isOwn })
   
   const message = cn("text-sm w-fit overflow-hidden text-primary bg-zinc-100 rounded-lg py-2 px-3", { "bg-primary text-white rounded-tr-none": isOwn, "rounded-tl-none": !isOwn, "bg-zinc-100 p-2": data.image })
   
   const handleDelete = useCallback(() => {
      axios.post(`/api/messages/${data.id}`, {
         conversationId
      })
      .then(() => {
         router.refresh()
      })
      .catch(() => toast.error("Try again!"))
   }, [data.id])
   
   if(!session.data) return null
   
   return (
      <div className={container}>
         <div className={body}>
            <div className="flex items-center gap-1">
               <div className="text-sm text-zinc-500">
                  {data.sender.name}
               </div>
               <div className="text-xs text-zinc-300">
                  {renderDate(new Date(data.createdAt))}
               </div>
               <div className="text-xs text-zinc-300">
                  {new Date(data.createdAt).toDateString() !== new Date().toDateString() && 
                  `at ${format(new Date(data.createdAt), "p")}`}
               </div>
            </div>
            
            {isOwn ? (
               <ContextMenu>
                  <ContextMenuTrigger>
                     <div className={message}>
                        {data.image ? (
                           <ImageModal data={data} />
                        ): <>{data.body}</>}
                     </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                     <ContextMenuItem onClick={handleDelete} className="flex items-center gap-2">
                        <Trash2 className="w-3 h-3 text-red-500"/>
                        <span className="text-red-500">Delete</span>
                     </ContextMenuItem>
                  </ContextMenuContent>
               </ContextMenu>
            ): (
               <div className={message}>
                  {data.image ? (
                     <ImageModal data={data} />
                  ): <>{data.body}</>}
               </div>
            )}
            
            {isLast && isOwn && seenList.length > 0 && (
               <div className="text-xs font-light text-zinc-500">
                  {`Seen by ${seenList}`}
               </div>
            )}
         </div>
      </div>
   )
}

export default MessageBox
