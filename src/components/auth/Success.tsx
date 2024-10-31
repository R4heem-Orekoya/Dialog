import { CircleCheck } from "lucide-react"

interface SuccessProps {
   message: string | undefined
}

const Success = ({ message }: SuccessProps) => {
   if(!message) return null
   
   return (
      <div className="bg-emerald-100/50 text-emerald-400 border border-emerald-200 rounded-md p-3 flex items-center gap-3">
         <CircleCheck className="w-5 h-5 flex-shrink-0"/>
         <p className="text-sm font-medium ">{message}</p>
      </div>
   )
}

export default Success