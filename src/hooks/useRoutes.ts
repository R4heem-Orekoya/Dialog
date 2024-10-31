import { usePathname } from "next/navigation"
import useConversation from "./useConversation"
import { useMemo } from "react"
import { Handshake, LogOut, MessageSquareText, User, Users } from "lucide-react"

const useRoutes = () => {
   const pathname = usePathname()
   const { conversationId } = useConversation()
   
   const routes = useMemo(() => [
      {
         label: 'Chats',
         href: "/conversations",
         icon: MessageSquareText ,
         active: pathname === "/conversations" || !!conversationId
      },
      {
         label: 'Users',
         href: "/users",
         icon: Users ,
         active: pathname === "/users"
      },
      // {
      //    label: 'Friend Requests',
      //    href: "/friend-requests",
      //    icon: Handshake ,
      //    active: pathname === "/friend-requests"
      // },
      {
         label: 'Logout',
         href: "#",
         icon: LogOut,
      },
   ], [pathname, conversationId])
   
   return routes
}

export default useRoutes