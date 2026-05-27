import api from "@/api/api";
import { useAppDispatch } from "@/store/hooks";
import { authenticate } from "@/store/slice/authSlice";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";


export default function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticted ] = useState( false )
    const [loading, setLoading] = useState( true )

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const fetchUser = async() => {
        try{
            setLoading( true )
            const response = await api.get('/auth/current' )
            if( response.success || response.status === 200 ) {
                setIsAuthenticted( true )
                dispatch( authenticate( response.body ) )
            }
            if( response.status === 500 ) {
                toast.error("Server issue" )
                console.log(response.message )
            }
        }
        catch( e : any ) {
            console.error( e.message || "Something went wrong" )
        }
        finally {
            setLoading( false );
        }
    }

    useEffect( () => {
        fetchUser();
    }, [] )

    if( loading )
    {
        return(
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="w-12 h-12 border-4 border-white/20 border-t-sky-400 rounded-full animate-spin"></div>
            </div>
        )
    }
    else if( isAuthenticated )
    return (
        <>
            <Outlet />
        </>
    );
    else if( !isAuthenticated )
    {
        navigate('/auth/login' )
    }
}