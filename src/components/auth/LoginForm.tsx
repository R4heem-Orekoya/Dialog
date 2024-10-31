"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import AuthSocialAction from "./AuthSocialAction"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInValidator, TsignInValidator } from "@/lib/zod/validators"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Logo from "../Logo"
import { Loader2 } from "lucide-react"
import { signIn } from "@/actions/signin"
import Error from "./Error"
import Success from "./Success"
import { useSearchParams } from "next/navigation"

const LoginForm = () => {
   const searchParams = useSearchParams()
   const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? 
   "This email is associated with another login provider!" : ""
   
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [error, setError] = useState<string | undefined>()
   const [success, setSuccess] = useState<string | undefined>()
   
   const { handleSubmit, register, formState: { errors } } = useForm<TsignInValidator>({
      resolver: zodResolver(signInValidator)
   })
   
   const onSubmit = (data: TsignInValidator) => {
      setIsSubmitting(true)
      setSuccess("")
      setError("")
      
      signIn(data)
      .then((callback) => {
         setSuccess(callback?.success)
         setError(callback?.error)
      })
      .catch((err) => {
         console.log(err);
      })
      .finally(() => {
         setIsSubmitting(false)
      })
   }
   
   return (
      <div className="max-w-[320px] w-full space-y-6">
         <div className="text-center flex flex-col items-center gap-2">
            <Logo showText={false}/>
            <h2 className="text-xl sm:text-2xl font-bold">Welcome back!</h2>
            <p className="text-sm text-muted-foreground max-w-[80%]">Enter your email and password to log in to your account</p>
         </div>
         
         <Error message={error || urlError} />
         <Success message={success} />
         
         <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 ">
            <div className="grid gap-1">
               <Input {...register("email")} type="email" id="email" placeholder="redoxx@example.com"/>
               {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
            </div>
            <div className="grid gap-1">
               <Input {...register("password")} type="password" id="password" placeholder="yourstrongpassword"/>
               {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
            </div>
            
            <Button disabled={isSubmitting} className="disabled:cursor-not-allowed">
               Login
               {isSubmitting && <Loader2 className="w-3 h-3 animate-spin ml-1"/>}
            </Button>
         </form>
         
         <div className="flex gap-2 items-center">
            <Separator className="flex-1"/>
            <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
            <Separator className="flex-1"/>
         </div>
               
         <AuthSocialAction 
            setSuccess={setSuccess}
            setError={setError}
            isSubmitting={isSubmitting} 
            setIsSubmitting={setIsSubmitting}
         />
               
         <div className="text-sm font-medium flex flex-wrap items-center justify-center gap-1">
            <p>
               Don&apos;t have an account?
            </p>
            <Link href="/sign-up" className="underline text-muted-foreground hover:text-primary cursor-pointer">
               Create an account
            </Link>
         </div>
      </div>
   )
}

export default LoginForm
