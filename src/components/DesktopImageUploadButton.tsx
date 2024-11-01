"use client"

import { File as FileIcon, Image as ImageIcon, ImageUp, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { useUploadThing } from "@/lib/uploadthing"
import useConversation from "@/hooks/useConversation"
import { toast } from "sonner"
import axios from "axios"

const DesktopImageUploadButton = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [file, setFile] = useState<File | null>(null)
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
      onUploadError: () => {
         toast.error("Something went wrong! Try again later!")
      }
   });
   
   const uploadFile = useCallback(() => {
      if(!file) return  
      startUpload([file])
   }, [file, startUpload])
   
   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger>
            <ImageIcon className="w-5 h-5 cursor-pointer" strokeWidth={1.5}/>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Upload Image</DialogTitle>
               <DialogDescription>
                  Upload images and send!
               </DialogDescription>
            </DialogHeader>
            
            {!file ? (
               <div className="flex flex-col items-center justify-center w-full border border-dashed rounded-md aspect-video">
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
               <div className="relative w-[60%] mx-auto aspect-[4/5] border border-dotted rounded-md my-4">
                  <Image src={URL.createObjectURL(file)} fill className="object-contain" alt={file.name}/>
               </div>
            )}
            
            <DialogFooter>
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
                     <Button disabled={isUploading} onClick={handeClick} variant="outline">
                        Change image
                     </Button>
                  </div>
               )}
               <Button disabled={!file || isUploading} onClick={uploadFile} className="flex items-center gap-1">
                  Send
                  {isUploading && <Loader2 className="w-3 h-3 animate-spin"/>}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default DesktopImageUploadButton
