import { logout } from "@/actions/logout"
import { ReactNode } from "react"
import { Button } from "../ui/button"

interface LogoutButtonProps {
   children: ReactNode
   className?: string
   variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

const LogoutButton = ({ children, className, variant }: LogoutButtonProps) => {
   return (
      <form action={logout}>
         <Button type="submit" className={className} size="icon" variant={variant}>
            {children}
         </Button> 
      </form>
   )
}

export default LogoutButton
