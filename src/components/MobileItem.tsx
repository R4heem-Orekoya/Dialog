"use client"

import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { logout } from "@/actions/logout"

interface MobileItemProps {
   href: string
   label: string
   icon: ForwardRefExoticComponent<Omit<LucideProps, "forwardRef"> & RefAttributes<SVGSVGElement>>
   active?: boolean
}

const MobileItem = ({ label, icon: Icon, href, active }: MobileItemProps) => {
   const router = useRouter()
   
   const handleClick = async () => {
      if(label === "Logout") {
         await logout()
         return
      }
   }
   
   return (
      <Link href={href} onClick={handleClick} className={cn("w-full h-full bg-blue-300 flex flex-col items-center justify-center gap-1 text-muted-foreground/50 hover:text-primary", { "text-primary font-medium": active })}>
         <Icon className="flex-shrink-0 w-5 h-5" strokeWidth={1.5} />
         <span className={cn("text-xs text-center")}>{label}</span>
      </Link>
   )
}

export default MobileItem
