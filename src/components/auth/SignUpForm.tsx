"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import AuthSocialAction from "./AuthSocialAction"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpValidator, TsignUpValidator } from "@/lib/zod/validators"
import { useForm } from "react-hook-form"
import Logo from "../Logo"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { register as signUp } from "@/actions/register"
import Error from "./Error"
import Success from "./Success"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const SignUpForm = () => {
   const { handleSubmit, register, formState: { errors } } = useForm<TsignUpValidator>({
      resolver: zodResolver(signUpValidator)
   })
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [error, setError] = useState<string | undefined>()
   const [success, setSuccess] = useState<string | undefined>()
   
   const router = useRouter()

   const onSubmit = (data: TsignUpValidator) => {
      setIsSubmitting(true)
      signUp(data)
      .then(async (callback) => {
         if(callback.success && !callback.error) {
            signIn("credentials", { 
               email: data.email, 
               password: data.password, 
               redirectTo: "/users"
            })
            .catch(() => {
               setError("Error signing in!")
               router.push("/sign-in")
            })
         }
         
         setSuccess(callback.success)
         setError(callback.error)
      })
      .catch((error) => {
         console.log(error);
      })
      .finally(() => {
         setIsSubmitting(false)
      })
   }

   return (
      <div className="max-w-[320px] w-full space-y-6">         
         <div className="text-center flex flex-col items-center gap-2">
            <Logo showText={false}/>
            <h2 className="text-xl sm:text-2xl font-bold">Create an account</h2>
            <p className="text-sm text-muted-foreground max-w-[80%]">Enter your name, email and password to create an account.</p>
         </div>
         
         <Error message={error} />
         <Success message={success} />
                  
         <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-1">
               <Input {...register("name")} type="text" id="name" placeholder="your name" />
               {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>
            <div className="grid gap-1">
               <Input {...register("email")} type="email" id="email" placeholder="your_email@example.com" />
               {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
            </div>
            <div className="grid gap-1">
               <Input {...register("password")} type="password" id="password" placeholder="yourstrongpassword" />
               {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
            </div>            

            <Button disabled={isSubmitting} className="disabled:cursor-not-allowed">
               Register
               {isSubmitting && <Loader2 className="w-3 h-3 animate-spin ml-1" />}
            </Button>
         </form>

         <div className="flex gap-2 items-center my-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
            <Separator className="flex-1" />
         </div>

         <AuthSocialAction
            setSuccess={setSuccess}
            setError={setError}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
         />

         <div className="text-sm font-medium flex flex-wrap items-center justify-center gap-1 mt-3">
            <p>
               Already have an account?
            </p>
            <Link href="/sign-in" className="underline text-muted-foreground hover:text-primary cursor-pointer">
               Sign in
            </Link>
         </div>
      </div>
   )
}

export default SignUpForm
