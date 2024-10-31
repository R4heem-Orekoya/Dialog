import { Loader2, Users } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "./ui/credenza"
import { User } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import MultiSelect from "./MultiSelect"
import { groupSchema, TGroupSchema } from "@/lib/zod/validators"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { log } from "console"
import axios from "axios"
import { toast } from "sonner"

interface GroupModalProps {
   users: User[]
}

const GroupModal = ({ users }: GroupModalProps) => {
   const router = useRouter()
   const [selected, setSelected] = useState<User[]>([]);
   const [isOpen, setIsOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   
   const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<TGroupSchema>({
      resolver: zodResolver(groupSchema),
      defaultValues: {
         name: "",
         selectedUsers: []
      }
   })
   
   const onsubmit = ({ name, selectedUsers }: TGroupSchema) => {
      setIsLoading(true)
      axios.post("/api/conversations", { name, members: selectedUsers, isGroup: true })
      .then(() => {
         router.refresh()
         setIsOpen(false)
      })
      .catch(() => {
         toast.error("Something went wrong!")
      })
      .finally(() => {
         setIsLoading(false)
         setValue("name", "")
         setValue("selectedUsers", [])
         setSelected([])
      })
   }
   
   useEffect(() => {
      setValue("selectedUsers", selected)
   }, [selected])
   
   return (
      <Credenza open={isOpen} onOpenChange={setIsOpen}>
         <CredenzaTrigger asChild>
            <Button variant="ghost" size="icon">
               <Users className="w-5 h-5"/>
            </Button>
         </CredenzaTrigger>
         
         <CredenzaContent className="md:max-w-lg">
            <CredenzaHeader>
               <CredenzaTitle>Create a group chat</CredenzaTitle>
               <CredenzaDescription>
                  Create a chat with more than 2 people.
               </CredenzaDescription>
            </CredenzaHeader>
            
            <form onSubmit={handleSubmit(onsubmit)}>
               <CredenzaBody className="py-4 space-y-6">
                  <div className="grid gap-2">
                     <Label>Group name</Label>
                     <Input {...register("name")}/>
                     {errors.name && <p className="text-xs font-medium text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="grid gap-2">
                     <Label>Members</Label>
                     <MultiSelect 
                        users={users}
                        setValue={setValue}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     {errors.selectedUsers && <p className="text-xs font-medium text-red-500">{errors.selectedUsers.message}</p>}
                  </div>
               </CredenzaBody>
               
               <CredenzaFooter className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                     Create
                     {isLoading && <Loader2 className="w-3 h-3 animate-spin ml-2" />}
                  </Button>
                  <CredenzaClose className={buttonVariants({ variant: "outline", className: "block md:hidden" })}>
                     Cancel
                  </CredenzaClose>
               </CredenzaFooter>
            </form>
         </CredenzaContent>
      </Credenza>
   )
}

export default GroupModal