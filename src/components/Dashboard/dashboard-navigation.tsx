import { SearchIcon, Bell, MessageSquare, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import api from "@/api/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {logout} from "../../store/slice/authSlice"


export default function Navigation() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector( (state:any) => state.auth.user )

    const handleLogout = async() => {
        try{
            const response = await api.post('/auth/logout' )
            if( response.success ) {
                dispatch( logout() )
                toast.info("Log out successful" )
            }
        }
        catch(e:any) {
            console.log( e?.message || "Something went wrong while logging out" )
        }
        finally{
            navigate("/" )
        }
    }

    return(
        <nav className="flex justify-between items-center w-full bg-transparent">
            <div className="flex items-center gap-6 flex-1 max-w-md">
                <div className="relative w-full">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/20 rounded-full py-2 pl-12 pr-4 text-sm text-[var(--on-surface)] focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="message-icon p-2 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
                    <MessageSquare className="w-5 h-5" />
                </button>
                <button className="notification-icon p-2 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
                    <Bell className="w-5 h-5" />
                </button>
                <Button className=" ai-chat-button flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/10 text-[var(--secondary)] border border-[var(--secondary)]/30 rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-[var(--secondary)]/20 transition-all">
                    <Zap className="w-4 h-4" />
                    AI Chat
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src="../../assets/avatar.png"></AvatarImage>
                            <AvatarFallback> {user.name} || A </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white">
                        <DropdownMenuGroup>
                        <DropdownMenuLabel className="cursor-pointer">My Account</DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem className="hover:bg-red-600 hover:text-white cursor-pointer" onClick={(e) => {
                            e.preventDefault()
                            handleLogout()
                        }}> Log Out </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                    </DropdownMenu>

            </div>
        </nav>
    )
}