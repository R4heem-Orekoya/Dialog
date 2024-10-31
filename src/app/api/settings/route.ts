import { currentUser } from "@/data/user";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   try {
      const signedInUser = await currentUser()
      const { image, name } = await request.json()

      if (!signedInUser?.id || !signedInUser?.email) return new NextResponse("Unauthorised!", { status: 401 })

      if (!image && !name) return new NextResponse("Inavlid data!", { status: 400 })

      if (image && !name) {
         const updatedUser = await prisma.user.update({
            where: {
               id: signedInUser.id
            },
            data: {
               image: image.url,
               image_key: image.key
            }
         })

         return NextResponse.json(updatedUser)
      }

      if (!image && name) {
         const updatedUser = await prisma.user.update({
            where: {
               id: signedInUser.id
            },
            data: {
               name
            }
         })

         return NextResponse.json(updatedUser)
      }

      const updatedUser = await prisma.user.update({
         where: {
            id: signedInUser.id
         },
         data: {
            name,
            image: image.url,
            image_key: image.key
         }
      })

      return NextResponse.json(updatedUser)
   } catch (error: any) {
      console.log(error, "ERROR SETTINGS");
      return new NextResponse("Internal Server Error!", { status: 500 })
   }
}