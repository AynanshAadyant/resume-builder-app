import { ArrowRight, CirclePlay, FileCheck2, Radar, Sparkles, WandSparkles } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import heroImage from "@/assets/hero.png";

export default function HeroSection() {
    const keywordData = ["React", "Systems", "Metrics", "Leadership", "ATS"];

    return (
        <section className="relative flex min-h-screen w-screen items-center overflow-hidden px-5 pb-24 pt-28 text-white">
            <img
                src={heroImage}
                alt="hero image"
                className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,29,0.76)_0%,rgba(8,17,29,0.92)_58%,#0a141e_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />

            <div className="relative flex flex-col z-10 mx-auto w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
                <div className="h-screen hero-section max-w-3xl text-center items-center flex flex-col">
                    <Badge className="mb-6 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-cyan-100 hover:bg-cyan-300/10">
                        <Sparkles className="mr-2 h-4 w-4" />
                        AI resume tailoring workspace
                    </Badge>

                    <h1 className="text-balance text-5xl font-bold leading-[1.02] md:text-7xl">
                        Build resumes that move with every role.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                        Paste a job description, surface the strongest keywords, and turn your profile into a sharper, recruiter-ready resume in minutes.
                    </p>

                    <div className="buttons mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link to="/dashboard">
                            <Button variant="default" className="h-12 rounded-lg bg-cyan-300 px-7 font-semibold text-slate-950 hover:bg-white">
                                Start Building <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <a href="#workflow">
                            <Button variant="outline" className="h-12 rounded-lg border-white/20 bg-white/5 px-7 text-white hover:bg-white hover:text-slate-950">
                                <CirclePlay className="h-4 w-4" /> See Workflow
                            </Button>
                        </a>
                    </div>

                    <div className="mt-10 grid w-full grid-cols-3 gap-3">
                        {[
                            ["92%", "avg ATS score"],
                            ["90s", "tailor time"],
                            ["3.2x", "callbacks"],
                        ].map(([value, label]) => (
                            <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
                                <p className="text-3xl font-bold text-white">{value}</p>
                                <p className="mt-1 text-xs uppercase text-slate-400">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="demo relative hidden lg:block">
                    <div className="landing-float rounded-lg border border-white/12 bg-[#0d1825]/88 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                                <p className="text-xs uppercase text-cyan-200">Live optimization</p>
                                <h2 className="mt-1 text-xl font-semibold">Senior Frontend Engineer</h2>
                            </div>
                            <div className="rounded-lg bg-emerald-300/15 px-3 py-2 text-sm font-bold text-emerald-200">94</div>
                        </div>

                        <div className="grid grid-cols-[0.9fr_1fr] gap-4">
                            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                                <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
                                    <FileCheck2 className="h-4 w-4 text-cyan-200" />
                                    Resume sections
                                </div>
                                <div className="space-y-3">
                                    {["Impact summary", "Product delivery", "Frontend systems", "Mentorship"].map((item, index) => (
                                        <div key={item}>
                                            <div className="mb-1 flex justify-between text-xs text-slate-400">
                                                <span>{item}</span>
                                                <span>{86 + index * 3}%</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                                <div className="h-full rounded-full bg-cyan-300" style={{ width: `${86 + index * 3}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                                <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
                                    <Radar className="h-4 w-4 text-amber-200" />
                                    Matched keywords
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {keywordData.map((keyword) => (
                                        <span key={keyword} className="rounded-lg border border-white/10 bg-white/[0.08] px-3 py-2 text-sm text-slate-200">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 rounded-lg bg-amber-200/10 p-4 text-sm leading-6 text-amber-50">
                                    <WandSparkles className="mb-3 h-5 w-5 text-amber-200" />
                                    Reframed 4 bullets with measurable outcomes and role-specific language.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
