import { signOut } from "@/auth";
import { currentUser } from "@/data/user";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server"

export async function DELETE() {
   try {
      const signedInUser = await currentUser()
      const uploadthing = new UTApi()
   
      if(!signedInUser) return new NextResponse("Unathorised!", { status: 401 })
   
      const user = await prisma.user.findUnique({
         where: {
            id: signedInUser.id
         },
      })
      
      const filesToDelete = await prisma.conversation.findMany({
         where: {
            users: {
               some: {
                  id: signedInUser.id
               }
            }
         },
         select: {
            messages: {
               select: {
                  image_key: true
               }
            }
         }
      })
      
      const fileKeysToDelete = filesToDelete.flatMap((item) => item.messages.flatMap((item) => item.image_key)).filter((item) => item !== null)
      
      if(user?.image_key) {
         uploadthing.deleteFiles([user.image_key])
      }
      
      uploadthing.deleteFiles([...fileKeysToDelete])
      
      await prisma.user.delete({
         where: {
            id: signedInUser.id
         },
         include: {
            conversations: {
               where: {
                  users: {
                     some: {
                        id: signedInUser.id
                     }
                  }
               }
            }
         }
      })
      
      await signOut()
      return new NextResponse("Account deleted!")
   } catch (error) {
      console.log(error, "DELETE_ENDPOINT");
      return new NextResponse("Internal Server Error!")
   }
}

/*For some reason this was giving my application some wierd behaviours, 
so the delete account functionality will be added later */