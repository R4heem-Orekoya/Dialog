import { getSession } from "@/lib/auth/getSession"
import SignUpForm from "@/components/auth/SignUpForm"
import { redirect } from "next/navigation"
import ButtonLink from "@/components/ButtonLink"
import { ArrowLeft } from "lucide-react"

const Page = async () => {
   const session = await getSession()
   
   if(session?.user) redirect("/users")
   
   return (
      <section className="relative min-h-screen py-12  flex justify-center items-center px-6 sm:px-8">
         <div className="absolute top-0 left-0 p-6 md:p-8 xl:p-10">
            <ButtonLink href="/" variant="secondary">
               <ArrowLeft className="w-4 h-4 mr-1" strokeWidth={1.6}/>
               Back
            </ButtonLink>
         </div>
         <SignUpForm />
      </section>
   )
}

export default Page

