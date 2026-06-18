import { ArrowRight, Bot, Brain, FileQuestion, LifeBuoy, Rocket, Search, Share, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const FAQ_DATA = [
    {
        id: "item-1",
        question: "How does the AI handle non-traditional career paths?",
        answer: "ResumeAI maps transferable skills to role-specific language, then emphasizes outcomes, scope, tools, and measurable impact so the experience reads clearly to recruiters."
    },
    {
        id: "item-2",
        question: "Is my data used to train public models?",
        answer: "No. Your workspace data is handled as private application data and is not used to train public models."
    },
    {
        id: "item-3",
        question: "Can I export to multiple file formats?",
        answer: "The export workflow is designed around ATS-friendly documents. PDF support is prioritized, with additional formats depending on the active template and export path."
    },
];

const CATEGORIES = [
    {
        title: "Getting Started",
        description: "Create your master profile, add project evidence, and generate your first targeted resume.",
        icon: Rocket,
        links: ["Profile setup checklist", "First resume generation"],
    },
    {
        title: "AI Optimization",
        description: "Understand keyword matching, role seniority, tone controls, and how suggestions are applied.",
        icon: Brain,
        links: ["Improve ATS fit", "Tune bullet impact"],
    },
    {
        title: "Exporting",
        description: "Keep layouts clean, recruiter-readable, and ready for upload to application portals.",
        icon: Share,
        links: ["PDF export guide", "Template spacing tips"],
    },
];

export default function DashboardSupport() {
    return (
        <div className="mx-auto w-full max-w-[1180px] pb-12">
            <section className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.42fr]">
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700">
                        <Sparkles className="h-4 w-4" />
                        Knowledge Base
                    </div>
                    <h1 className="font-['Satoshi'] text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                        Find the right answer without leaving your workflow.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
                        Search guidance for profile setup, job description analysis, resume generation, exports, and account questions.
                    </p>
                    <div className="relative mt-6 max-w-xl">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            placeholder="Search help articles..."
                            className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-950 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:outline-none"
                        />
                    </div>
                </div>

                <Card className="rounded-lg border-cyan-100 bg-cyan-50/70 p-6 shadow-sm">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-cyan-700">
                        <LifeBuoy className="h-5 w-5" />
                    </div>
                    <h2 className="font-['Satoshi'] text-xl font-bold text-slate-950">Need direct help?</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Ask the AI assistant for formatting, profile, and export help based on your current workflow.
                    </p>
                    <Button className="mt-6 w-full rounded-lg bg-slate-950 text-white hover:bg-slate-800">
                        <Bot className="h-4 w-4" />
                        Contact AI Support
                    </Button>
                </Card>
            </section>

            <section className="mb-8 grid gap-5 md:grid-cols-3">
                {CATEGORIES.map((category) => {
                    const Icon = category.icon;

                    return (
                        <Card key={category.title} className="rounded-lg border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-cyan-200">
                            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-['Satoshi'] text-xl font-bold text-slate-950">{category.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{category.description}</p>
                            <ul className="mt-5 space-y-2">
                                {category.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="flex items-center gap-2 text-sm font-medium text-cyan-700 hover:underline">
                                            <ArrowRight className="h-4 w-4" />
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    );
                })}
            </section>

            <section className="grid gap-5 lg:grid-cols-[1fr_0.42fr]">
                <Card className="rounded-lg border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-end justify-between gap-4">
                        <div>
                            <h2 className="font-['Satoshi'] text-2xl font-bold text-slate-950">Frequently Asked Questions</h2>
                            <p className="mt-1 text-sm text-slate-500">Quick answers for common ResumeAI workflows.</p>
                        </div>
                        <a href="#" className="text-xs font-semibold uppercase text-cyan-700 hover:underline">View All</a>
                    </div>
                    <Accordion type="single" collapsible className="space-y-3">
                        {FAQ_DATA.map((faq) => (
                            <AccordionItem key={faq.id} value={faq.id} className="rounded-lg border border-slate-200 px-4">
                                <AccordionTrigger className="text-left font-['Satoshi'] text-base font-semibold text-slate-950 hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="pb-4 text-sm leading-6 text-slate-500">
                                        {faq.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Card>

                <Card className="rounded-lg border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                        <FileQuestion className="h-5 w-5" />
                    </div>
                    <h2 className="font-['Satoshi'] text-xl font-bold text-slate-950">Featured Guide</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Learn how to translate broad experience into crisp, measurable resume bullets that survive recruiter scanning.
                    </p>
                    <Button variant="outline" className="mt-6 w-full rounded-lg border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                        Download Guide
                    </Button>
                </Card>
            </section>
        </div>
    );
}
