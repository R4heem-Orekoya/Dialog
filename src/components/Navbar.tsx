"use client"

import Logo from "./Logo"
import ButtonLink from "./ButtonLink"
import { LogIn, LogOut, MessageSquareText, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { logout } from "@/actions/logout";
import ProfilePicture from "./ProfilePicture";
import { toast } from "sonner";
import { User } from "@/types";
import { useCallback } from "react";

interface NavbarProps {
	session: User | null
}

const Navbar = ({ session }: NavbarProps) => {
	const handleLogout = useCallback(() => {
		const promise = logout("/")
		toast.promise(promise, {
			loading: 'Logging out...',
			success: () => {
				return "Logged out successfully!";
			},
			error: "Couldn't logout, try again!",
		})
	}, [])
	
	return (
		<nav className="w-[min(1400px,100%)] px-6 md:px-8 lg:px-10 mx-auto h-20 flex justify-between items-center">
			<Logo />
			
			{session ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<ProfilePicture user={session}/>
					</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-[200px]">
						<DropdownMenuLabel>
							<p>{session.name}</p>
							<p className="text-muted-foreground text-xs">{session.email}</p>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href="/conversations" className="flex items-center gap-2">
								<MessageSquareText className="w-4 h-4 text-muted-foreground" strokeWidth={1.6}/>
								Messages
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/users" className="flex items-center gap-2">
								<Users className="w-4 h-4 text-muted-foreground" strokeWidth={1.6}/>
								Users
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<button onClick={handleLogout}
								type="submit" 
								className="flex items-center gap-2"
							>
								<LogOut className="w-4 h-4 text-muted-foreground" strokeWidth={1.6}/>
								logout
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			): (
				<ButtonLink href="/sign-in" variant="secondary">
					Login
					<LogIn strokeWidth={1.5} className="ml-1 w-3 h-3"/>
				</ButtonLink>
			)}
		</nav>
	)
}

export default Navbar
