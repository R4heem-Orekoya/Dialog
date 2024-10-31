import { headers } from "next/headers"

export const getLocation = () => {
   const headersList = headers()
    
   return {
      ip: headersList.get("x-real-ip"),
      country: headersList.get("x-vercel-ip-country"),
      city: headersList.get("x-vercel-ip-city")
   }
}