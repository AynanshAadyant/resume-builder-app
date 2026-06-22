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
import { useState } from "react"


export default function Navigation() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector( (state:any) => state.auth.user )

    const [ isSearching, setIsSearching ] =useState<boolean>(false)

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
        <nav className="flex w-full items-center justify-between bg-transparent">
            <div className="flex items-center gap-6 flex-1 max-w-md">
                <div className="relative w-full">
                    <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search resumes, jobs, keywords..." 
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-11 pr-4 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:outline-none"
                    />
                </div>
            </div>
            
            <div className="flex items-center px-10 gap-2 md:gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-9 w-9 border border-slate-200">
                            <AvatarImage src="../../assets/avatar.png"></AvatarImage>
                            <AvatarFallback className="bg-slate-100 text-sm font-semibold text-slate-700">
                                {user?.name?.charAt(0)?.toUpperCase() || "A"}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-slate-200 bg-white text-slate-900 shadow-lg">
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
