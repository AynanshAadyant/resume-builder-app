import { useNavigate } from "react-router";
import { Eye } from "lucide-react";

interface ResumeTileProps {
    resume : any,
    index : number
}

export default function ResumeTile({resume, index } : ResumeTileProps)  
{
    const targetRole = (resume.workExp && resume.workExp[0] && resume.workExp[0].post) || "Target Role";
    const targetCompany = (resume.workExp && resume.workExp[0] && resume.workExp[0].organisation) || "Target Company";
    const score = resume.ats || 0;
    const createdAt = resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : "recently";

    const navigate = useNavigate()

    return (
        <div key={resume._id || index} className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-cyan-200">
            <div className="flex items-center gap-6">
                <div className="relative flex h-16 w-12 items-center justify-center rounded border border-slate-200 bg-slate-50 shadow-sm">
                    <span className="text-center font-['IBM_Plex_Serif'] text-[8px] leading-tight text-slate-400">
                        RESUME<br />v{index + 1}.0
                    </span>
                    <div className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                </div>
                <div>
                    <h4 className="font-['Inter'] text-base font-semibold text-slate-950">{targetRole}</h4>
                    <p className="font-['Inter'] text-sm text-slate-500">
                        Target: {targetCompany} | Optimized {createdAt}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-center">
                    <span className="mb-1 block font-['Satoshi'] text-2xl font-bold leading-none text-emerald-700">{score}</span>
                    <span className="text-[10px] font-semibold uppercase text-slate-400">ATS Score</span>
                </div>
                <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button onClick={() => navigate("/dashboard/resume")} className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950">
                        <Eye className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}