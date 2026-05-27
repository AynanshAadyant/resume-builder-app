import { Outlet } from "react-router";
export default function AuthPage() {
    return (
        <section className="w-screen min-h-screen h-full bg-[var(--background)] flex flex-col justify-center items-center p-5">
            <Outlet />
        </section>
    )
}