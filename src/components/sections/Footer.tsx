import React from "react"
import Logo from "../Logo"
import Link from "next/link"

const Footer = () => {
   return (
      <footer className="py-8 px-6 md:px-8 xl:px-10 flex justify-between items-center gap-4">
         <Logo />
         <p className="text-sm text-muted-foreground">
            Built by 
            <Link className="underline underline-offset-2 text-primary duration-300" href="https://redoxx.vercel.app">
               Redoxx
            </Link>.
            Hosted on 
            <Link className="underline underline-offset-2 text-primary duration-300" href="https://vercel.com">
               Vercel 
            </Link>.
         </p>
      </footer>
   )
}

export default Footer
