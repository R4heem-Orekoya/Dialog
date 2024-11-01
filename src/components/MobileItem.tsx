"use client"

import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MobileItemProps {
   href: string
   label: string
   icon: ForwardRefExoticComponent<Omit<LucideProps, "forwardRef"> & RefAttributes<SVGSVGElement>>
   active?: boolean
   onclick: (() => Promise<void>) | undefined
}

const MobileItem = ({ label, icon: Icon, href, active, onclick }: MobileItemProps) => {
   
   return (
      <Link href={href} onClick={onclick} className={cn("w-full h-full flex flex-col items-center justify-center gap-1 text-muted-foreground/50 hover:text-primary z-[9999]", { "text-primary font-medium": active })}>
         <Icon className="flex-shrink-0 w-5 h-5" strokeWidth={1.5} />
         <span className={cn("text-xs text-center")}>{label}</span>
      </Link>
   )
}

export default MobileItem
