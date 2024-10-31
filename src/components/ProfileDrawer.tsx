"use client"

import { EllipsisVertical, Info } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { Conversation } from "@prisma/client"
import { User } from "@/types"
import useOtherUser from "@/hooks/useOtherUser"
import { useMemo } from "react"
import { format } from "date-fns"
import ProfilePicture from "./ProfilePicture"
import DeleteConversationConfirmationAlertDialog from "./DeleteConversationConfirmationAlertDialog"
import GroupProfilePicture from "./GroupProfilePicture"

interface ProfileDrawerProps {
   data: Conversation & {
      users: User[]
   }
   statusText: string
}

const ProfileDrawer = ({ data, statusText }: ProfileDrawerProps) => {
   const { otherUser, otherUsers } = useOtherUser(data)
   
   const joinedDate = useMemo(() => {
      return format(new Date(otherUser.createdAt), "PPPPpppp")
   }, [otherUser.createdAt])
   
   const createdDate = useMemo(() => {
      return format(new Date(data.createdAt), "PPPPpppp")
   }, [data.createdAt])
   
   const title = useMemo(() => {
      return data.name || otherUser.name
   }, [otherUser.name, data.name])
   
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
               <EllipsisVertical />
            </Button>
         </SheetTrigger>
         <SheetContent className="w-full sm:max-w-lg flex items-center justify-between flex-col pt-20 pb-12">
            <SheetHeader className="text-center flex flex-col items-center space-y-1">
            {data.isGroup ? (
               <GroupProfilePicture />
            ): (
               <ProfilePicture user={otherUser}/>
            )}
               <SheetTitle className="text-center">{title}</SheetTitle>
               <SheetDescription className="text-center">
                  {statusText}
               </SheetDescription>
            </SheetHeader>
            
            <div className="w-full my-6 flex-1">
               <h3 className="flex items-center gap-2 text-xl font-semibold text-primary">
                  <Info className="w-4 h-4"/>
                  <span>Info</span>
               </h3>
               {data.isGroup ? (
                  <div className="">
                     <div className="pt-6">
                        <h4 className="font-medium text-zinc-900">Created</h4>
                        <p className="text-sm text-muted-foreground">{createdDate}</p>
                     </div>
                     <h4 className="font-medium text-zinc-900 mt-6">Members</h4>
                     <div className="pt-6 grid gap-3">
                        {otherUsers.map((user) => (
                           <div className="flex items-center gap-2" key={user.id}>
                              <ProfilePicture 
                                 showStatus={false}
                                 className="size-8"
                                 user={user}
                              />
                              <p className="text-sm">{user.name}</p>
                              
                           </div>
                        ))}
                     </div>
                  </div>
               ): (
                  <div className="mt-4 space-y-4 divide-y">
                     <div>
                        <h4 className="font-medium text-zinc-900">Email</h4>
                        <p className="text-sm text-muted-foreground">{otherUser.email}</p>
                     </div>
                     <div className="pt-4">
                        <h4 className="font-medium text-zinc-900">Joined</h4>
                        <p className="text-sm text-muted-foreground">{joinedDate}</p>
                     </div>
                  </div>
               )}
            </div>
            
            <SheetFooter>
               <DeleteConversationConfirmationAlertDialog />
            </SheetFooter>
         </SheetContent>
      </Sheet>
   )
}

export default ProfileDrawer
