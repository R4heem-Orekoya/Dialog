import Navbar from "@/components/Navbar"
import Features from "@/components/sections/Features"
import Hero from "@/components/sections/Hero"
import TechStack from "@/components/sections/TechStack"
import Footer from "@/components/sections/Footer"
import Link from "next/link"
import { currentUser } from "@/data/user"

const Page = async () => {
  const session = await currentUser()
  
  return (
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 w-[90%] aspect-video -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <Navbar session={session}/>
      <Hero />
      <Features />
      <TechStack />
      
      <section className="space-y-8 py-8 bg-zinc-50 md:py-12 lg:py-24 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
          Explore the Code on GitHub
        </h2>
        <div className="space-y-2 px-6 md:px-8 xl:px-10">
          <p className="text-muted-foreground text-lg">
            This project source code is available on <span className="underline underline-offset-2 text-primary"><Link href="https://github.com/R4heem-Orekoya/Dialog">Github</Link></span>.
          </p>
          <p className="text-muted-foreground text-lg">Don&apos;t forget to give it a star ⭐.</p>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default Page