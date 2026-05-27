import { ArrowRight, CirclePlay, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function HeroSection() {
    return (
        <section className="flex flex-col justify-center items-center p-5 gap-5">
            <Badge variant="outline" className="text-sky-500 border-sky-500 rounded-md"><Sparkles /> AI-Powered Optimisation </Badge>
            <h1 className="text-5xl font-bold text-white text-center"> Build resumes that adapt to <span> every </span> <span> role. </span></h1>
            <p className="text-gray-300 text-center"> AI analyzes job description and rewrites your resume for maximum ATS relevance. Stop guessing what recruiters want to see.</p>
            <div className="buttons flex flex-row justify-center items-center gap-2">
                <Link to="/dashboard"><Button variant="default" className="bg-sky-400 px-8 cursor-pointer"> Start Building <ArrowRight /> </Button></Link>
                <Button variant="outline" className="cursor-pointer px-8 text-white border-sky-300"> <CirclePlay /> See How It Works </Button>
            </div>
        </section>
    )
}