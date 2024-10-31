"use client"

import useConversation from "@/hooks/useConversation"
import EmptyState from "@/components/EmptyState"
import { cn } from "@/lib/utils"

const Page = () => {
   const { isOpen } = useConversation()
   
   return (
      <div className={cn("md:pl-80 h-screen md:block", { "block": isOpen, "hidden": !isOpen })}>
         <EmptyState />
      </div>
   )
}

export default Page
