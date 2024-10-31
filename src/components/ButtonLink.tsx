import Link from "next/link"
import { ReactNode } from "react"
import { buttonVariants } from "./ui/button"

interface ButtonLinkProps {
   children: ReactNode
   href: string
   variant?: "default" | "destructive" | "secondary" | "outline" | "ghost" | "link"
   size?: "default" | "sm" | "lg" | "icon"
}

const ButtonLink = ({ children, href, variant, size }: ButtonLinkProps) => {
   return (
      <Link
         className={buttonVariants({
            variant: variant,
            size: size,
            className: "font-semibold"
         })} 
         href={href}
      >
         {children}
      </Link>
   )
}

export default ButtonLink
