"use client"

import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useCallback, useRef, useState } from "react"
import ProfilePicture from "./ProfilePicture"
import { User } from "@/types"
import { useUploadThing } from "@/lib/uploadthing"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import DeleteAccountConfirmationAlert from "./DeleteAccountConfirmationAlert"

interface SettingsModalProps {
   currentUser: User
}

const SettingsModal = ({ currentUser }: SettingsModalProps) => {
   const [isOpen, setIsOpen] = useState(false)
   const [isLoading, setisLoading] = useState(false)
   const [file, setFile] = useState<File | null>(null)
   const [name, setName] = useState(currentUser.name as string)
   const fileInputRef = useRef<HTMLInputElement | null>(null)
   const router = useRouter()

   const { startUpload } = useUploadThing("imageUploader", {
      onClientUploadComplete: (file) => {
         axios.post("/api/settings", {
            image: file[0],
            name
         })
         .then(() => {
            toast.success("Profile updated!")
            router.refresh()
         })
         .catch(() => toast.error("Couldn't update profile, please try again!"))
         .finally(() => {
            setIsOpen(false)
            setisLoading(false)
            setName(currentUser.name as string)
            setFile(null)
         })
      },
      onUploadError: (err) => {
         toast.error("Something went wrong! Try again later!")
      }
   })
   
   const updateName = () => {
      setisLoading(true)
      axios.post("/api/settings", {
         name
      })
      .then(() => {
         toast.success("Name updated!")
         router.refresh()
      })
      .catch(() => toast.error("Couldn't update profile, please try again!"))
      .finally(() => {
         setIsOpen(false)
         setisLoading(false)
         setName(currentUser.name as string)
      })
   }
   
   const updateProfile = useCallback(() => {
      if(!file) return
      setisLoading(true)
      startUpload([file])
   }, [file])

   const handeClick = useCallback(() => {
      fileInputRef.current?.click()
   }, [])

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger>
            <ProfilePicture user={currentUser} />
         </DialogTrigger>
         <DialogContent className="max-w-md">
            <DialogHeader>
               <DialogTitle>Profile</DialogTitle>
               <DialogDescription>Edit your public information.</DialogDescription>
            </DialogHeader>

            <div className="py-6 space-y-6">
               <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input onChange={(e) => setName(e.target.value)} value={name} />
               </div>
               <div className="grid gap-4">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center">
                     {file ? (
                        <img className="size-10 rounded-full object-contain bg-zinc-100" src={URL.createObjectURL(file as File)} alt={`${currentUser.name} profile image`} />
                     ) : (
                        <Avatar className="bg-zinc-100">
                           <AvatarImage src={currentUser?.image ||`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${currentUser.name}`} alt="@shadcn" />
                           <AvatarFallback>{currentUser.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                     )}

                     <div className="space-x-3">
                        <input
                           type="file"
                           accept="image/jpg, image/png, image/gif, image/webp"
                           ref={fileInputRef}
                           style={{ display: "none" }}
                           onChange={(e) => {
                              if (e.target.files) {
                                 setFile(e.target.files[0])
                              }
                           }}
                        />
                        <Button size="sm" variant="ghost" onClick={handeClick}>Change</Button>
                        {file && <button className="text-sm font-medium text-red-500 hover:underline hover:text-red-400" onClick={() => setFile(null)}>Remove</button>}
                     </div>
                  </div>
               </div>
            </div>

            <DialogFooter className="w-full space-x-4 flex items-center justify-between mt-4">
               {/* <DeleteAccountConfirmationAlert /> */}
               <div className="flex items-center justify-end gap-4 flex-1">
                  <DialogClose asChild>
                     <Button variant="ghost">Close</Button>
                  </DialogClose>
                  <Button
                     className="flex items-center gap-2"
                     disabled={(!file && name == currentUser.name) || isLoading} 
                     onClick={file ? updateProfile : updateName}
                  >
                     Save
                     {isLoading && <Loader2 className="w-3 h-3 animate-spin"/>}
                  </Button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default SettingsModal
