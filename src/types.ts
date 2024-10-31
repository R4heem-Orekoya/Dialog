import { User as prismaUser, Conversation as prismaConversation, Message as prismaMessage } from "@prisma/client"

export type User = Omit<prismaUser, "hashedPassword">

export type Message = prismaMessage & {
   sender: User,
   seen: User[]
};

export type Conversation = prismaConversation & {
   users: User[],
   messages: Message[]
}