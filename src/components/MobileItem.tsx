import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import LogoutButton from "./auth/LogoutButton"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MobileItemProps {
   href: string
   label: string
   icon: ForwardRefExoticComponent<Omit<LucideProps, "forwardRef"> & RefAttributes<SVGSVGElement>>
   active?: boolean
}

const MobileItem = ({ label, icon: Icon, href, active }: MobileItemProps) => {
   return (
      <div className="flex-1 h-full border-t">
         {label === "Logout" ?
            <LogoutButton className="w-full h-20 flex flex-col items-center justify-center bg-transparent hover:bg-transparent text-muted-foreground hover:text-primary">
               <Icon className="flex-shrink-0 w-5 h-5" strokeWidth={1.5} />
               <span className={cn("text-xs text-center")}>{label}</span>
            </LogoutButton>
            :
            <Link href={href} className={cn("w-full h-full flex flex-col items-center justify-center gap-1 text-muted-foreground/50", { "text-primary font-medium": active })}>
               <Icon className="flex-shrink-0 w-5 h-5" strokeWidth={1.5} />
               <span className={cn("text-xs text-center")}>{label}</span>
            </Link>
         }
      </div>
   )
}

export default MobileItem
