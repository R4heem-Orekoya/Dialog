import ButtonLink from "@/components/ButtonLink"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github } from "lucide-react"

const Hero = () => {
   return (
      <section className="space-y-6 pb-12 pt-6 md:pb-16 md:pt-10 lg:py-32 px-6 md:px-8 xl:px-10">
         <div className="container mx-auto flex max-w-[56rem] flex-col items-center justify-center gap-4 text-center">
            <Badge variant="secondary">Redoxx Code</Badge>
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl ">
               Chat Application built using Next js 14 and Pusher.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
               I&apos;m building a chat application Next.js 14 and pusher. 
               Follow along as we figure this out together.
            </p>
            <div className="space-x-4">
               <ButtonLink href="/sign-up">
                  Get Started
                  <ArrowRight strokeWidth={1.5} className="w-4 h-4 ml-1"/>
               </ButtonLink>
               <ButtonLink href="https://github.com/R4heem-Orekoya/Dialog" variant="secondary">
                  GitHub
                  <Github strokeWidth={1.5} className="w-4 h-4 ml-1"/>
               </ButtonLink>
            </div>
         </div>
      </section>
   )
}

export default Hero
