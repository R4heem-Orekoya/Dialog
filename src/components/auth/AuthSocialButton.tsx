import { Button } from "../ui/button"
import { IconType } from 'react-icons';


interface AuthSocialButtonProps{
   onClick: () => void,
   icon: IconType,
   provider: string,
   disabled?: boolean
}

const AuthSocialButton = ({ onClick, icon: Icon, provider, disabled }: AuthSocialButtonProps) => {
   return (
      <Button disabled={disabled} onClick={onClick} variant="outline" className="flex-1 flex justify-center items-center gap-2 text-xs">
         <Icon className="w-4 h-4"/>
         <span>{provider}</span>
      </Button>
   )
}

export default AuthSocialButton
