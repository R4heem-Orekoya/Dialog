"use client"

import axios from "axios"
import { User } from "@/types"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import ProfilePicture from "./ProfilePicture"
import { toast } from "sonner"

interface UserBoxProps {
   data: User
}

const UserBox = ({ data }: UserBoxProps) => {
   const router = useRouter()
   
   const handleClick = useCallback(() => {
      const promise = axios.post("/api/conversations", {
         userId: data.id
      })
      .then((data) => {
         router.push(`/conversations/${data.data.id}`)
         router.refresh()
      })
      
      toast.promise(promise, {
         loading: 'Initialising conversation...',
         success: () => {
            return `Conversation initialised.`;
         },
      })
   }, [data, router])
   
   return (
      <div 
         onClick={handleClick} 
         className="relative flex items-center space-x-3 bg-white hover:bg-zinc-100 p-3 rounded-md cursor-pointer group" 
      >
         <ProfilePicture user={data} />
         <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
               <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold text-primary">{data.name}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UserBox
