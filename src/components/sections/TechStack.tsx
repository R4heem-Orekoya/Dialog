"use client"

import { Cpu, Globe, Layers, Lock, Triangle, Zap } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const TechStack = () => {
   const [hoveredTech, setHoveredTech] = useState<string | null>(null)
   
   const technologies = [
      {
        name: "Next.js 14",
        icon: <Globe className="h-6 w-6" strokeWidth={1.5}/>,
        color: "bg-black",
        description: "React framework for production-grade applications with server-side rendering and static site generation."
      },
      {
        name: "Socket.IO",
        icon: <Zap className="h-6 w-6" strokeWidth={1.5}/>,
        color: "bg-yellow-500",
        description: "Enables real-time, bidirectional and event-based communication between web clients and servers."
      },
      {
        name: "TypeScript",
        icon: <Cpu className="h-6 w-6" strokeWidth={1.5}/>,
        color: "bg-blue-500",
        description: "Typed superset of JavaScript that compiles to plain JavaScript, adding optional static typing."
      },
      {
        name: "Tailwind CSS",
        icon: <Layers className="h-6 w-6" strokeWidth={1.5}/>,
        color: "bg-teal-500",
        description: "Utility-first CSS framework for rapidly building custom user interfaces."
      },
      {
        name: "Vercel",
        icon: <Triangle  className="h-6 w-6" strokeWidth={1.5}/>,
        color: "bg-zinc-950",
        description: "Cloud platform for static sites and Serverless Functions, optimal for Next.js deployments."
      },
      {
        name: "Auth.js",
        icon: <Lock className="h-6 w-6" strokeWidth={1.5}/>,
        color: "bg-red-500",
        description: "Authentication for Next.js applications, supporting various providers and strategies."
      }
   ]
    
   return (
      <section className="space-y-8 py-8 md:py-12 lg:py-24 text-center">
         <div className="mx-auto max-w-4xl space-y-4 text-center flex flex-col items-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
               Tech Stack
            </h2>
            <p className="max-w-[80%] leading-normal text-muted-foreground text-sm sm:text-lg sm:leading-7">These are technologies i used to build this project.</p>
         </div>
         <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-8 xl:px-10">
            {technologies.map((tech) => (
               <div
                  key={tech.name}
                  className="flex flex-col items-center"
               >
                  <motion.div
                     onMouseEnter={() => setHoveredTech(tech.name)}
                     onMouseLeave={() => setHoveredTech(null)}
                     className={cn("bg-red-300 p-4 rounded-full text-white shadow-lg", tech.color)}
                     whileHover={{ scale: 1.2 }}
                     transition={{ type: "spring", stiffness: 500, damping: 8 }}
                  >
                     {tech.icon}
                  </motion.div>
                  <h3 className="mt-4 font-semibold text-zinc-900">{tech.name}</h3>
               </div>
            ))}
         </div>
         <div className="mt-12 text-center px-6 md:px-8 xl:px-10">
            {hoveredTech ? (
               <motion.p
                  key={hoveredTech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.1 }}
                  className="sm:text-lg text-muted-foreground max-w-2xl mx-auto"
               >
                  {technologies.find(tech => tech.name === hoveredTech)?.description}
               </motion.p>
            ) : (
               <p className="sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hover over a technology to learn more about its role in the stack.
               </p>
            )}
         </div>
      </section>
   )
}

export default TechStack
