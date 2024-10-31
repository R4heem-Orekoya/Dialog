import Logo from "./Logo"
import ButtonLink from "./ButtonLink"
import { LogIn } from "lucide-react";


const Navbar = () => {
   return (
      <nav className="w-[min(1400px,100%)] px-6 md:px-8 lg:px-10 mx-auto h-20 flex justify-between items-center">
         <Logo />
         
         <ul className="flex items-center gap-6">
            <li>
               <ButtonLink href="/sign-in" variant="secondary">
                  Login
                  <LogIn strokeWidth={1.5} className="ml-1 w-3 h-3"/>
               </ButtonLink>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar
