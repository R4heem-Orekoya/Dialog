import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'
import AuthContext from "@/components/auth/AuthContext";
import { auth } from "@/auth";
import ActiveStatus from "@/components/ActiveStatus";
import { Mulish } from 'next/font/google'

export const metadata: Metadata = {
  title: "Dialog",
  description: "This is chat application built by redoxx with next js 14 and Pusher.",
};

const mulish = Mulish({ 
  subsets: ['latin'],
  variable: '--font-mulish',
})

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  
  return (
    <html lang="en" className="scroll-smooth">
      <AuthContext session={session!}>
        <ActiveStatus />
        <body className={`antialiased ${mulish.variable} font-Mulish`}>
          <main>
            {children}
          </main>
          <Toaster position="top-center" style={{ fontFamily: "Mulish" }}/>
        </body>
      </AuthContext>
    </html>
  );
}
