import Image from "next/image"
import Link from "next/link"

interface logoProps{
   showText?: boolean
}

const Logo = ({ showText = true }: logoProps) => {
   return (
      <Link href="/" className="flex items-center gap-2">
         <div className="relative size-10">
            <Image src="/logo-black.png" alt="Logo" fill className="object-cover"/>
         </div>
         {showText && <span className="font-semibold">Dialog</span>}
      </Link>
   )
}

export default Logo
