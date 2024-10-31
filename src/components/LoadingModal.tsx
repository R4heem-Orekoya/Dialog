"use client"
import { Discuss } from 'react-loader-spinner'

const LoadingModal = () => {
   return (
      <div className="fixed w-screen h-screen top-0 left-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-[999]">
         <Discuss width={50} height={50} colors={["#09090b", "#18181b"]}/>
      </div>
   )
}

export default LoadingModal
