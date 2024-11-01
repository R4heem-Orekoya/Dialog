import { usePathname } from "next/navigation"
import useConversation from "./useConversation"
import { useMemo } from "react"
import { LogOut, MessageSquareText, Users } from "lucide-react"
import { logout } from "@/actions/logout"

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
      {
         label: 'Logout',
         href: "#",
         icon: LogOut,
         onclick: async () => {
            await logout()
         }
      },
   ], [pathname, conversationId])
   
   return routes
}

export default useRoutes