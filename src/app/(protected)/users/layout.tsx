import SideBar from "@/components/SideBar";
import UserSideBar from "@/components/UserSideBar";
import { ReactNode } from "react";

interface UserLayoutProps {
   children: ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {   
   return (
      <SideBar>
         <div>
            <UserSideBar />
            {children}
         </div>
      </SideBar>
   )
}