import { getUsers } from "@/data/user"
import UserBox from "./UserBox"

const UserList = async () => {
   const users = await getUsers()
   
   return (
      <>
         {users.map((user) => (
            <UserBox key={user.id} data={user} />
         ))}
      </>
   )
}

export default UserList
