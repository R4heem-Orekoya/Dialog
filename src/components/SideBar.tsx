import { ReactNode } from "react"
import DesktopSideBar from "./DesktopSideBar"
import MobileTab from "./MobileTab"
import { currentUser } from "@/data/user"

const SideBar = async ({ children }: { children: ReactNode }) => {
   const user = await currentUser()
   
   return (
      <div className="h-full relative">
         <DesktopSideBar currentUser={user!} />
         <MobileTab />
         <div className="md:pl-20 h-full">
            {children}    
         </div>
      </div>
   )
}

export default SideBar