"use client"

import axios from "axios"
import useConversation from "@/hooks/useConversation"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { useCallback, useState } from "react"

const DeleteConversationConfirmationAlertDialog = () => {
   const { conversationId } = useConversation()
   const router = useRouter()
   const [isDeleting, setIsDeleting] = useState(false)
   const [isAlertOpen, setIsAlertOpen] = useState(false)
   
   const handleAlertDialogConfirmation = useCallback(() => {
      setIsDeleting(true)
      axios.delete(`/api/conversations/${conversationId}`)
      .then(() => {
         setIsAlertOpen(false)
         router.push('/conversations');
         router.refresh();
      })
      .catch(() => {
         toast.error('Something went wrong!')
      })
      .finally(() => setIsDeleting(false))
   }, [conversationId, router])
   
   return (
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
         <AlertDialogTrigger asChild>
            <Button variant="secondary" size="icon" className="size-16 rounded-full">
               <Trash2 className="text-red-500"/>
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
               <AlertDialogDescription>
                  Are you sure you want to delete this conversation? 
                  This action cannot be undone.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <Button variant="destructive" disabled={isDeleting} onClick={handleAlertDialogConfirmation} className="flex items-center gap-2">
                  Delete
                  {isDeleting && <Loader2 className="w-4 h-4 animate-spin"/>}
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default DeleteConversationConfirmationAlertDialog
