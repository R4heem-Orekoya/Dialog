import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import LogoutButton from "./auth/LogoutButton"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DesktopItemProps {
   href: string
   label: string
   icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
   active?: boolean
}

const DesktopItem = ({href, label, icon: Icon, active }: DesktopItemProps) => {
   return (
      <li>
         {/* <TooltipProvider>
            <Tooltip delayDuration={500} disableHoverableContent>
               <TooltipTrigger asChild> */}
                  {label === "Logout" ? (
                     <LogoutButton variant="outline">
                        <Icon className="w-5 h-5" strokeWidth={1.6}/>
                     </LogoutButton>
                  ): 
                     <Link 
                        href={href} 
                        className={buttonVariants({
                           size: "icon", variant: active ? "default" : "outline"
                        })}
                     >
                        <Icon className="w-5 h-5" strokeWidth={1.6}/>
                        <span className="sr-only">{label}</span>
                     </Link>
                  }  
               {/* </TooltipTrigger>
               <TooltipContent>
                  <p>{label}</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider> */}
      </li>
   )
}

export default DesktopItem
