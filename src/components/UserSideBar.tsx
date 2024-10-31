import { Suspense } from "react"
import UserList from "./UserList"
import ListSkeleton from "./ListSkeleton"

const UserSideBar = () => {
   return (
      <aside className="fixed h-[calc(100vh-70px)] md:h-full md:left-20 md:w-80 md:block overflow-y-auto border-r w-full left-0">
         <div className="flex-col space-y-4">
            <div className="text-2xl font-bold flex items-center text-primary h-16 px-4 border-b">
               People
            </div>
            
            <div className="grid gap-2 px-4">
               <Suspense fallback={<ListSkeleton />}>
                  <UserList />
               </Suspense>
            </div>
         </div>     
      </aside>
   )
}

export default UserSideBar
