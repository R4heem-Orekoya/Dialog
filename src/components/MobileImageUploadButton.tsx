"use client"

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { File as FileIcon, Image as ImageIcon, ImageUp, Loader2 } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import useConversation from "@/hooks/useConversation"
import { useUploadThing } from "@/lib/uploadthing"
import axios from "axios"
import { toast } from "sonner"
import Image from "next/image"

const MobileImageUploadButton = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [file, setFile] = useState<globalThis.File | null>(null)
   const fileInputRef = useRef<HTMLInputElement>(null)
   const { conversationId } = useConversation()
   
   const handeClick = useCallback(() => {
      fileInputRef.current?.click()
   }, [])
   
   const { startUpload, isUploading } = useUploadThing("imageUploader", {
      onClientUploadComplete: (file) => {
         axios.post("/api/messages", {
            image: file[0], 
            conversationId
         })
         .catch(() => toast.error("Something went wrong! Try again later!"))
         setIsOpen(false)
         setFile(null)
         toast.success("Image sent successfully")
      },
      onUploadError: (err) => {
         toast.error("Something went wrong! Try again later!")
      }
   });
   
   const uploadFile = useCallback(() => {
      if(!file) return
      startUpload([file])
   }, [file])
   
   return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
         <DrawerTrigger>
            <ImageIcon className="w-5 h-5 cursor-pointer" strokeWidth={1.5}/>
         </DrawerTrigger>
         <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
               <DrawerHeader>
                  <DrawerTitle>Upload Image</DrawerTitle>
                  <DrawerDescription>Upload image and send!</DrawerDescription>
               </DrawerHeader>
               
               {!file ? (
                  <div className="flex flex-col items-center justify-center w-full border border-dashed rounded-md aspect-video px-4 my-4">
                     <ImageUp className="w-16 h-16" strokeWidth={1.5}/>
                     <div className="text-center py-4">
                        <h4 className="text-lg font-semibold">Choose file to send</h4>
                        <p className="text-muted-foreground text-sm font-light -mt-1">Not more than 4MB in size</p>
                     </div>
                     <div>
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
                        <Button onClick={handeClick} variant="outline" className="flex items-center gap-1">
                           Select File
                           <FileIcon className="w-4 h-4" strokeWidth={1.5}/>
                        </Button>
                     </div>
                  </div>
               ): (
                  <div className="relative w-[60%] mx-auto aspect-[5/6] border border-dotted rounded-md my-4">
                     <Image src={URL.createObjectURL(file)} fill className="object-contain" alt={file.name}/>
                  </div>
               )}
               
               <DrawerFooter>
                  <Button disabled={!file || isUploading} onClick={uploadFile} className="flex items-center gap-1">
                     Send
                     {isUploading && <Loader2 className="w-3 h-3 animate-spin"/>}
                  </Button>
                  
                  {file && (
                     <div>
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
                        <Button disabled={isUploading} onClick={handeClick} variant="outline" className="w-full">
                           Change image
                        </Button>    
                     </div>
                  )}
                  <DrawerClose asChild>
                     <Button variant="outline">Close</Button>
                  </DrawerClose>
               </DrawerFooter>
            </div>
         </DrawerContent>
      </Drawer>
   )
}

export default MobileImageUploadButton
