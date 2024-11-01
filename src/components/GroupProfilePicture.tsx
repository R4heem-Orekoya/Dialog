import { User } from "@/types";
import Image from "next/image";

interface GroupProfilePictureProps {
   users?: User[]
}

const GroupProfilePicture = ({ }: GroupProfilePictureProps) => {
   return (
      <div className="relative size-10 bg-zinc-100 rounded-full">
         <Image src="/team.png" sizes="(max-width: 600px) 2.5rem" alt="avatar" fill className="object-contain"/>
      </div>
   )
}

export default GroupProfilePicture