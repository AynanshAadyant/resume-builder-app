import api from "@/api/api";
import { useAppDispatch } from "@/store/hooks";
import { authenticate } from "@/store/slice/authSlice";
import { setProfile } from "@/store/slice/profileSlice";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const initialize = async () => {
            try {
                const userResponse = await api.get("/auth/current");

                if (
                    userResponse.success ||
                    userResponse.status === 200
                ) {
                    setIsAuthenticated(true);
                    dispatch(authenticate(userResponse.body));

                    const profileResponse = await api.get("/profile/get");

                    if (profileResponse.success) {
                        dispatch(setProfile(profileResponse.data));
                    }
                }
            } catch (e: any) {
                console.error(e.message);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
}
