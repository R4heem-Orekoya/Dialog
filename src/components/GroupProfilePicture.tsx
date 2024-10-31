import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

interface GroupProfilePictureProps {
   users?: User[]
}

const GroupProfilePicture = ({ users }: GroupProfilePictureProps) => {
   const slicedUsers = users?.slice(0, 3);

   const positionMap = {
      0: 'top-0 left-[12px]',
      1: 'bottom-0',
      2: 'bottom-0 -right-[4px]'
   };

   return (
      <div className="relative size-10 bg-zinc-100 rounded-full">
         
         <Image src="/team.png" sizes="(max-width: 600px) 2.5rem" alt="avatar" fill className="object-contain"/>
      </div>
   )
}

export default GroupProfilePicture