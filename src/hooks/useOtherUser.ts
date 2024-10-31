import { Conversation, User } from "@/types"
import { useSession } from "next-auth/react"
import { useMemo } from "react"

const useOtherUser = (conversation: Conversation | { users: User[] }) => {
   const session = useSession()
   
   const otherUser = useMemo(() => {
      const currentUserId = session.data?.user.id
      
      const otherUsers = conversation.users.filter((user) => user.id !== currentUserId)
      
      return { otherUser: otherUsers[0], otherUsers }
   }, [session.data?.user.id, conversation.users]) 
   
   return otherUser
}

export default useOtherUser