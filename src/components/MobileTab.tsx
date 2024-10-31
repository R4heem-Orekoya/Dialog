"use client"

import useConversation from "@/hooks/useConversation"
import useRoutes from "@/hooks/useRoutes"
import MobileItem from "./MobileItem"

const MobileTab = () => {
   const routes = useRoutes()
   const { isOpen } = useConversation()
   
   if(isOpen) return null
   
   return (
      <div className="flex justify-between items-center fixed bottom-0 w-full h-20 bg-white md:hidden">
         <ul className="flex justify-between w-full h-full">
            {routes.map((route) => (
               <MobileItem 
                  active={route.active} 
                  href={route.href}
                  icon={route.icon}
                  key={route.label}
                  label={route.label}
               />
            ))}
         </ul>
      </div>
   )
}

export default MobileTab
