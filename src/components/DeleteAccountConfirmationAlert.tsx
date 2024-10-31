"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"


const DeleteAccountConfirmationAlert = () => {
   const router = useRouter()
   const [isDeleting, setIsDeleting] = useState(false)
   const [isAlertOpen, setIsAlertOpen] = useState(false)
   
   const handleDelete = () => {
      setIsDeleting(true)
      axios.delete("/api/settings/delete-account")
      .then(() => {
         setIsDeleting(false)
         router.refresh()
      })
      .catch(() => {
         toast.error("Something went wrong, try again!")
      })
      .finally(() => {
         toast.success("Account deleted!")
      })
   }
   
   return (
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
         <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
               <AlertDialogDescription>
                  Are you sure you want to delete your account?😔 
                  This action cannot be undone.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <Button variant="destructive" disabled={isDeleting} onClick={handleDelete} className="flex items-center gap-2">
                  Delete
                  {isDeleting && <Loader2 className="w-4 h-4 animate-spin"/>}
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default DeleteAccountConfirmationAlert
