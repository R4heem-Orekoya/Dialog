import { CircleX } from "lucide-react"

interface ErrorProps {
   message: string | undefined
}

const Error = ({ message }: ErrorProps) => {
   if(!message) return null
   
   return (
      <div className="bg-red-100/50 text-red-400 border border-red-200 rounded-md p-3 flex items-center gap-3">
         <CircleX className="w-5 h-5 flex-shrink-0"/>
         <p className="text-sm font-medium">{message}</p>
      </div>
   )
}

export default Error
