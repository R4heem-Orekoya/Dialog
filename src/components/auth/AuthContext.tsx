"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface AuthContextProps {
   children: ReactNode
   session: Session | null
}

const AuthContext = ({ children, session}: AuthContextProps) => {
   return (
      <SessionProvider refetchOnWindowFocus session={session}>
         {children}
      </SessionProvider>
   )
}

export default AuthContext
