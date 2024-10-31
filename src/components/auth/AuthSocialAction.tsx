"use client"

import { FaGithub, FaGoogle } from "react-icons/fa"
import AuthSocialButton from "./AuthSocialButton"
import { Dispatch, SetStateAction } from "react"
import { signIn } from "next-auth/react"

interface AuthSocialActionProps{
   isSubmitting: boolean
   setIsSubmitting: Dispatch<SetStateAction<boolean>>
   setSuccess: Dispatch<SetStateAction<string | undefined>>,
   setError: Dispatch<SetStateAction<string | undefined>>
}

const AuthSocialAction = ({ isSubmitting, setIsSubmitting, setError, setSuccess }: AuthSocialActionProps) => {
   
   const socialAction = (action: "google" | "github") => {
      setIsSubmitting(true)
      setSuccess("")
      setError("")
      
      signIn(action, { redirectTo: "/users" })
      .then((callback) => {
         if (callback?.error) {
            setError("Something went wrong")
         }
  
         if (callback?.ok && !callback?.error) {
            setSuccess('Successfully signedin!')
         }
      })
      .finally(() => setIsSubmitting(false));
   }
   
   return (
      <div className="flex items-center gap-4">
         <AuthSocialButton 
            icon={FaGoogle} 
            onClick={() => socialAction("google")} 
            provider="Google" 
            disabled={isSubmitting}
         />
         <AuthSocialButton 
            icon={FaGithub} 
            onClick={() => socialAction("github")} 
            provider="Github"
            disabled={isSubmitting}
         />
      </div>
   )
} 

export default AuthSocialAction
