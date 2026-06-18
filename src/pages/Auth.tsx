import { Outlet } from "react-router";
import { FileCheck2, Sparkles, Target } from "lucide-react";

export default function AuthPage() {
    const authHighlights = [
        { icon: Target, label: "Role-fit keyword coverage" },
        { icon: FileCheck2, label: "ATS-ready resume drafts" },
        { icon: Sparkles, label: "AI suggestions without the clutter" },
    ];

    return (
        <section className="min-h-screen w-screen bg-(--background) p-4 text-slate-950 md:p-6">
            <main className="flex items-center justify-center px-5 py-10 md:px-10">
                    <div className="w-full max-w-md">
                        <div className="mb-8 lg:hidden">
                            <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-cyan-200">
                                    <Sparkles className="h-5 w-5" />
                                </span>
                                <span className="text-2xl font-bold">ResumeAI</span>
                            </div>
                            <p className="text-sm text-slate-500">Tailored resumes for every target role.</p>
                        </div>
                        <Outlet />
                    </div>
                </main>
        </section>
    )
}
