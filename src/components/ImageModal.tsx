"use client"

import { Message } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import Image from "next/image"

interface ImageModalProps {
   data: Message
}

const ImageModal = ({ data }: ImageModalProps) => {
   return (
      <Dialog>
         <DialogTrigger>
            <Image 
               src={data.image as string} 
               height={300} 
               width={300} 
               alt={data.sender.name as string}
               className="object-cover rounded rounded-tr-none cursor-pointer hover:scale-110 transition"
            />
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  {`Image sent by ${data.sender.name}`}
               </DialogTitle>
            </DialogHeader>
            <div className="relative mx-auto w-[320px] aspect-[4/5] bg-zinc-100 py-4 rounded">
               <Image 
                  src={data.image as string} 
                  fill
                  alt={data.sender.name as string}
                  className="w-full h-full object-contain rounded hover:scale-110 transition"
               />
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default ImageModal
