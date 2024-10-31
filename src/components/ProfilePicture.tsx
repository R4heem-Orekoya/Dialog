import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useActiveList } from "@/hooks/useActiveList"
import { User } from "@/types"

interface ProfilePictureProps {
   user: User
   showStatus?: boolean
   className?: string
}

const ProfilePicture = ({ user, showStatus = true, className }: ProfilePictureProps) => {
   const { members } = useActiveList()
   const isActive = members.indexOf(user?.email!) !== -1
   
   return (
      <div className={cn("relative size-10", className)}>
         <Avatar className={cn("bg-zinc-100", className)}>
            <AvatarImage src={user.image! || `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${user.name!}`} alt={user.name!} />
            <AvatarFallback className="bg-secondary-foreground/40 text-white font-bold">{user.name!.charAt(0)}</AvatarFallback>
         </Avatar>
         {showStatus && isActive && <span className="absolute bottom-0.5 right-0.5 size-2 bg-green-500 ring-2 ring-white group-hover:ring-zinc-100 rounded-full"/>}
      </div>
   )
}

export default ProfilePicture
