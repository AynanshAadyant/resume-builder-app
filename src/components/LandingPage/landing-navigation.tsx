import { Button } from "../ui/button";
import { Link } from "react-router"
import { Sparkles } from "lucide-react";

function AuthButtons() {
    const isAuthenticated = false;

    if (isAuthenticated) {
        return (
            <h1> is authenticated </h1>
        )
    }
    else {
        return (
            <section className="flex flex-row gap-2 text-white ">
                <Link to="/auth/login"><Button variant="ghost" className="text-white hover:bg-sky-400 cursor-pointer px-5"> Log in </Button></Link>
                <Link to="/auth/signup"><Button variant="default" className="bg-sky-300 text-sky-900 font-bold px-8 cursor-pointer hover:bg-white hover:text-black rounded-lg"> Get Started </Button></Link>
            </section>
        )
    }
}

export default function Navigation() {
    const logo = null;
    return (
        <nav className="fixed flex flex-row justify-evenly w-full inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08111d]/75 px-5 py-4 backdrop-blur-xl md:px-12">
            <section className="left">
                <a href="" className="flex items-center gap-3">
                    {logo ? <img src={logo} alt="Logo" /> : (
                        <>
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
                                <Sparkles className="h-5 w-5" />
                            </span>
                            <span className="text-2xl font-bold text-white">ResumeAI</span>
                        </>
                    )}
                </a>
            </section>
            <section className="middle hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
                <a href="#features" className="hover:text-white">Features</a>
                <a href="#workflow" className="hover:text-white">Workflow</a>
                <a href="#proof" className="hover:text-white">Results</a>
            </section>
            <section className="right">
                <AuthButtons />
            </section>
        </nav>
    )
}
