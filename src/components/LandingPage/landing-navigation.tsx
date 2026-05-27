import { Button } from "../ui/button";
import { Link } from "react-router"

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
        <nav className="w-full flex flex-row justify-between items-center p-3 px-15 readonly">
            <section className="left">
                <a href=""> {logo ? <img src={logo} alt="Logo" /> : <span className="text-white font-bold text-3xl"> ResumeAI </span>} </a>
            </section>
            <section className="middle">

            </section>
            <section className="right">
                <AuthButtons />
            </section>
        </nav>
    )
}