import { currentUser } from "@/data/user";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher"

export async function POST(request: Request) {
   try {
      const signedInUser = await currentUser()
      const { message, image, conversationId } = await request.json()
      
      if(!signedInUser?.id || !signedInUser.email) return new NextResponse("Unauthorised!", { status: 401 })
         
      let newMessage
      
      if(message && !image) {
         newMessage = await prisma.message.create({
            data: {
               body: message,
               conversation: {
                  connect: {
                     id: conversationId
                  }
               },
               sender: {
                  connect: {
                     id: signedInUser.id
                  }
               },
               seen: {
                  connect: {
                     id: signedInUser.id
                  }
               }
            },
            include: {
               seen: true,
               sender: true
            }
         })
         
         const updatedConversation = await prisma.conversation.update({
            where: {
               id: conversationId
            },
            data: {
               lastMessageAt: new Date(),
               messages: {
                  connect: {
                     id: newMessage.id
                  }
               }
            },
            include: {
               users: true,
               messages: {
                  include: {
                     seen: true
                  }
               }
            }
         })
         
         await pusherServer.trigger(conversationId, "messages-new", newMessage)
         
         const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]
         
         updatedConversation.users.map(async (user) => {
            await pusherServer.trigger(user.email!, "conversation-update", {
               id: conversationId,
               messages: [lastMessage]
            })
         })
         
         console.log("message without image sent");
         
         
         return NextResponse.json(newMessage)
      }
      
      if(!message && image) {
         newMessage = await prisma.message.create({
            data: {
               image: image.url,
               image_key: image.key,
               conversation: {
                  connect: {
                     id: conversationId
                  }
               },
               sender: {
                  connect: {
                     id: signedInUser.id
                  }
               },
               seen: {
                  connect: {
                     id: signedInUser.id
                  }
               }
            },
            include: {
               seen: true,
               sender: true
            }
         })
         
         const updatedConversation = await prisma.conversation.update({
            where: {
               id: conversationId
            },
            data: {
               lastMessageAt: new Date(),
               messages: {
                  connect: {
                     id: newMessage.id
                  }
               }
            },
            include: {
               users: true,
               messages: {
                  include: {
                     seen: true
                  }
               }
            }
         })
         
         await pusherServer.trigger(conversationId, "messages-new", newMessage)
         
         const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]
         
         updatedConversation.users.map(async (user) => {
            await pusherServer.trigger(user.email!, "conversation-update", {
               id: conversationId,
               messages: [lastMessage]
            })
         })
         
         console.log("image without message sent");
         
         return NextResponse.json(newMessage)
      }
      
      newMessage = await prisma.message.create({
         data: {
            body: message,
            image: image.url,
            image_key: image.key,
            conversation: {
               connect: {
                  id: conversationId
               }
            },
            sender: {
               connect: {
                  id: signedInUser.id
               }
            },
            seen: {
               connect: {
                  id: signedInUser.id
               }
            }
         },
         include: {
            seen: true,
            sender: true
         }
      })
      
      const updatedConversation = await prisma.conversation.update({
         where: {
            id: conversationId
         },
         data: {
            lastMessageAt: new Date(),
            messages: {
               connect: {
                  id: newMessage.id
               }
            }
         },
         include: {
            users: true,
            messages: {
               include: {
                  seen: true
               }
            }
         }
      })
      
      await pusherServer.trigger(conversationId, "messages-new", newMessage)
      
      const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]
      
      updatedConversation.users.map(async (user) => {
         await pusherServer.trigger(user.email!, "conversation-update", {
            id: conversationId,
            messages: [lastMessage]
         })
      })
      
      console.log("message and image sent");
      
      return NextResponse.json(newMessage)
   } catch (error) {
      console.log(error, "Error messages");
      return new NextResponse("Internal Server Erro!", { status: 500 })
   }
}