import ButtonLink from "../ButtonLink"
import Logo from "../Logo"
import Error from "./Error"

const ErrorCard = () => {
   return (
      <div className=" p-4 w-[min(320px,100%)] rounded-md flex flex-col justify-center gap-6">
         <div className="grid place-items-center">
            <Logo />
         </div>
         <div className="grid gap-4">
            <Error message="Oops, something went wrong"/>
            <ButtonLink href="/sign-in" variant="secondary" size="lg">Back to login</ButtonLink>
         </div>
      </div>
   )
}

export default ErrorCard
