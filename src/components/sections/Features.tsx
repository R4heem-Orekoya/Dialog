import { Zap, ShieldCheck, MessageSquare, Users, Globe, Smartphone } from "lucide-react"

const Features = () => {
   const features = [
      {
        icon: <MessageSquare className="h-6 w-5" strokeWidth={1.5} />,
        title: "Real-time Messaging",
        description: "This project is powered by Socket.IO which enables lightning-fast communication with real time messaging."
      },
      {
        icon: <Zap className="h-5 w-5" strokeWidth={1.5} />,
        title: "Next.js 14 Performance",
        description: "This project loads blazingly fast thanks to Next.js 14's cutting-edge performance optimizations."
      },
      {
        icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />,
        title: "Secure Communications",
        description: "Conversations are protected with end-to-end encryption and secure websocket connections."
      },
      {
        icon: <Users className="h-5 w-5" strokeWidth={1.5} />,
        title: "Group Chats",
        description: "This project allows you to create and manage group conversations effortlessly."
      },
      {
        icon: <Globe className="h-5 w-5" strokeWidth={1.5} />,
        title: "Cross-platform Compatibility",
        description: "This project is responsive a web application that works seamlessly across desktop and mobile browsers."
      },
      {
        icon: <Smartphone className="h-5 w-5" strokeWidth={1.5} />,
        title: "Mobile-friendly Design",
        description: "Enjoy a native app-like experience on your mobile devices with intuitive, touch-friendly interface."
      }
   ]
    
   return (
      <section className="w-full mx-auto space-y-8 bg-zinc-50 py-8 md:py-12 lg:py-24">
         <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]">Features</h2>
            <p className="max-w-[80%] leading-normal text-muted-foreground text-sm sm:text-lg sm:leading-7">
               This project was an experiment to see if i could build a chat application, with features
               like auth, real time messaging, API routes, and static pages in
               Next.js 14 app directory.
            </p>
         </div>
         
         <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 px-6 md:px-8 xl:px-10">
            {features.map((feature, i) => (
               <div key={i} className="p-2 bg-background border border-zinc-100 rounded-md hover:shadow-md hover:-translate-y-1 duration-300">
                  <div className="p-2 space-y-2">
                     <div className=" size-9 bg-primary grid place-items-center text-background rounded-md">
                        {feature.icon} 
                     </div>
                     <h3 className="font-semibold mt-2">{feature.title}</h3>
                     <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>
   )
}

export default Features
