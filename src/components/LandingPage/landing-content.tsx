import { ArrowRight, Brain, ClipboardCheck, FileText, Gauge, Layers3, ScanSearch } from "lucide-react"

export default function Content() {
    const cardData = [
        {
            header: "3.2x",
            content: "More interview callbacks",
            detail: "Role-specific bullets and keyword coverage tuned for every JD.",
            icon: Gauge,
        },
        {
            header: "92%",
            content: "Average ATS score",
            detail: "Spot gaps before you export and keep your strongest sections visible.",
            icon: ScanSearch,
        },
        {
            header: "~90s",
            content: "To tailor one resume",
            detail: "Move from job description to a focused draft without rebuilding from scratch.",
            icon: FileText,
        }
    ]

    const stepData = [
        {
            title: "Build your master profile",
            content: "Keep your projects, work history, education, skills, certifications, and wins in one structured workspace.",
            icon: Layers3,
        },
        {
            title: "Paste the job description",
            content: "AI reads requirements, keywords, seniority signals, tools, and responsibilities instantly.",
            icon: Brain,
        },
        {
            title: "Preview the tailored resume",
            content: "Review the final structure, tune the wording, and export a resume that fits the role.",
            icon: ClipboardCheck,
        }
    ]

    return (
        <section className="bg-[var(--background)] w-screen text-white">
            <section id="features" className="mx-auto grid max-w-7xl gap-4 px-5 py-10 md:grid-cols-3 md:px-12">
                {cardData.map((data) => {
                    const Icon = data.icon;

                    return (
                        <article key={data.content} className="group rounded-lg border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]">
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="text-5xl font-bold">{data.header}</p>
                            <h3 className="mt-3 text-lg font-semibold">{data.content}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-400">{data.detail}</p>
                        </article>
                    )
                })}
            </section>

            <section id="workflow" className="relative overflow-hidden border-y border-white/10 bg-[#0d1825] px-5 py-20 md:px-12">
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(90,218,206,0.08)_45%,transparent_70%)]" />
                <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1fr]">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase text-cyan-200">How it works</p>
                        <h2 className="text-4xl font-bold leading-tight md:text-5xl">From profile to polished resume without the blank page.</h2>
                        <p className="mt-5 text-lg leading-8 text-slate-300">
                            The flow is built for repeat applications: create the source of truth once, then tailor quickly for each target role.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {stepData.map((data, index) => {
                            const Icon = data.icon;

                            return (
                                <article key={data.title} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5 md:grid-cols-[auto_1fr]">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.08] text-cyan-200">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-xs font-semibold uppercase text-slate-500">Step {index + 1}</span>
                                            <div className="h-px flex-1 bg-white/10" />
                                        </div>
                                        <h3 className="text-xl font-semibold">{data.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-400">{data.content}</p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section id="proof" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:px-12 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                    <p className="mb-4 text-sm font-semibold uppercase text-amber-200">Resume quality loop</p>
                    <div className="space-y-4">
                        {["Keyword fit", "Impact language", "Role seniority", "Section priority"].map((item, index) => (
                            <div key={item}>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>{item}</span>
                                    <span className="text-slate-400">{82 + index * 4}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/10">
                                    <div className="h-full rounded-full bg-amber-200" style={{ width: `${82 + index * 4}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-bold leading-tight">A landing page with a working-product feel.</h2>
                    <p className="mt-5 text-lg leading-8 text-slate-300">
                        ResumeAI now shows the actual value proposition visually: optimization, scoring, keyword matching, and faster iteration.
                    </p>
                </div>
            </section>
        </section>
    )
}
