import ConversationBody from "@/components/ConversationBody"
import ConversationHeader from "@/components/ConversationHeader"
import EmptyState from "@/components/EmptyState"
import MessageForm from "@/components/MessageForm"
import { getConversationById } from "@/data/conversation"
import { getMessages } from "@/data/message"

const Page = async ({ params: { conversationId } }: { params: { conversationId: string } }) => {
   const conversation = await getConversationById(conversationId)
   const messages = await getMessages(conversationId)
   
   if(!conversation) {
      return (
         <div className="md:pl-80 h-screen">
            <div className="h-full flex flex-col">
               <EmptyState />
            </div>
         </div>
      )
   }
   
   
   return (
      <div className="md:pl-80 h-screen">
         <div className="h-full flex flex-col">
            <ConversationHeader conversation={conversation} />
            <ConversationBody initialMessages={messages} />
            <MessageForm />
         </div>
      </div>
   )
}

export default Page