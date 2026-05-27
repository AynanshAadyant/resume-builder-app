import {
    Plus,
    FileText,
    Building2,
    Eye,
    Trash2,
    PlusCircle,
    Copy
} from "lucide-react"
import { useState, useEffect } from "react"
import api from "@/api/api"
import { toast } from "sonner"
import type { Resume } from "@/types"
import { Button } from "@/components/ui/button"

export default function ResumeEditor() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    // Modal and JD generation states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jdsList, setJdsList] = useState<any[]>([]);
    const [selectedJdId, setSelectedJdId] = useState("");
    const [profileId, setProfileId] = useState("");

    // Viewing states
    const [viewingResume, setViewingResume] = useState<any | null>(null);

    useEffect(() => {
        fetchResumes();
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            // Load Profile to get profileId
            const profileRes = await api.get("/profile/get");
            if (profileRes.success && profileRes.data && profileRes.data.profile) {
                setProfileId(profileRes.data.profile._id);
            }

            // Load parsed JDs
            const jdRes = await api.get("/jd");
            if (jdRes.success && jdRes.data) {
                setJdsList(jdRes.data);
            }
        } catch (err) {
            console.error("Error fetching initial configuration:", err);
        }
    };

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const res = await api.get("/resume/all");
            if (res.success && res.resumes) {
                setResumes(res.resumes);
            }
        } catch (err) {
            console.error("Error fetching resumes:", err);
            toast.error("Failed to load resumes");
        } finally {
            setLoading(false);
        }
    }

    const handleGenerateResume = async () => {
        if (!profileId) {
            return toast.error("Please create your Master Profile in the Profile Builder tab first.");
        }
        if (jdsList.length === 0) {
            return toast.error("Please analyze a Job Description in the AI Workspace first.");
        }
        setIsModalOpen(true);
    };

    const handleConfirmGenerate = async () => {
        if (!selectedJdId) return toast.error("Please select a Job Description");
        
        setGenerating(true);
        const loadToast = toast.loading("Generating optimized resume via AI...");
        try {
            const res = await api.post("/resume/", { 
                profileID: profileId, 
                jdID: selectedJdId 
            });
            toast.dismiss(loadToast);
            if (res.success) {
                toast.success("Resume generated successfully!");
                setIsModalOpen(false);
                setSelectedJdId("");
                fetchResumes();
            } else {
                toast.error(res.message || "Failed to generate resume");
            }
        } catch (err: any) {
            toast.dismiss(loadToast);
            console.error(err);
            toast.error(err?.message || "Failed to generate resume");
        } finally {
            setGenerating(false);
        }
    };

    const handleDeleteResume = async (id: string) => {
        if (!confirm("Are you sure you want to delete this tailored resume?")) return;
        
        const loadToast = toast.loading("Deleting resume...");
        try {
            const res = await api.delete(`/resume/${id}`);
            toast.dismiss(loadToast);
            if (res.success) {
                toast.success("Resume deleted successfully!");
                fetchResumes();
            } else {
                toast.error(res.message || "Failed to delete resume");
            }
        } catch (err: any) {
            toast.dismiss(loadToast);
            console.error(err);
            toast.error(err?.message || "Failed to delete resume");
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto pb-24 text-white">
            {/* Library Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h2 className="font-['Satoshi'] text-4xl font-bold text-[var(--on-surface)] mb-2">Library</h2>
                    <p className="text-[var(--on-surface-variant)] font-['Inter'] text-lg">Manage and optimize your professional documents</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        onClick={handleGenerateResume}
                        disabled={generating}
                        className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[#050f19] font-semibold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(189,194,255,0.3)] transition-all active:scale-[0.98]"
                    >
                        <Plus className="w-5 h-5" />
                        {generating ? "Generating..." : "New Resume"}
                    </Button>
                </div>
            </div>

            {/* Library Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Dynamic Resumes */}
                {!loading && resumes.length > 0 ? resumes.map((resume: any, idx: number) => {
                    const targetRole = (resume.workExp && resume.workExp[0] && resume.workExp[0].post) || "Tailored Resume";
                    const targetCompany = (resume.workExp && resume.workExp[0] && resume.workExp[0].organisation) || "Target Company";
                    const score = resume.score || 85;
                    return (
                        <div key={resume._id || idx} className="group relative bg-[var(--surface-container)] border border-white/5 rounded-xl p-6 flex flex-col hover:bg-[var(--surface-container-high)] transition-all duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-2 bg-[var(--surface-container-highest)] rounded-lg">
                                    <FileText className="text-[var(--primary)] w-6 h-6" />
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="relative w-12 h-12 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle className="text-white/10" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
                                            <circle className="text-[var(--secondary)]" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset={`${125.6 - (125.6 * score) / 100}`} strokeWidth="3"></circle>
                                        </svg>
                                        <span className="absolute text-[10px] font-bold text-[var(--secondary)]">{score}</span>
                                    </div>
                                    <span className="text-[10px] font-semibold text-[var(--on-surface-variant)] mt-1 uppercase tracking-widest">ATS Score</span>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="font-['Satoshi'] text-2xl font-bold text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">{targetRole}</h3>
                                <p className="text-[var(--on-surface-variant)] text-sm flex items-center gap-1 mt-1">
                                    <Building2 className="w-4 h-4" />
                                    Target: {targetCompany} · {new Date(resume.createdAt || "").toLocaleDateString()}
                                </p>
                            </div>

                            {/* Hover Actions Overlay */}
                            <div className="absolute inset-0 bg-[var(--background)]/95 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-4 px-8 z-20">
                                <div className="grid grid-cols-2 gap-2 w-full">
                                    <button 
                                        onClick={() => setViewingResume(resume)}
                                        className="flex items-center justify-center gap-2 py-3 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] rounded-lg text-sm hover:bg-[var(--primary)]/20 transition-all"
                                    >
                                        <Eye className="w-5 h-5" /> View
                                    </button>
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText(JSON.stringify(resume, null, 2));
                                            toast.success("Resume JSON copied to clipboard!");
                                        }}
                                        className="flex items-center justify-center gap-2 py-3 bg-[var(--surface-container-highest)] border border-white/10 text-[var(--on-surface)] rounded-lg text-sm hover:bg-[var(--surface-bright)] transition-all"
                                    >
                                        <Copy className="w-5 h-5" /> Copy JSON
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteResume(resume._id)}
                                        className="flex items-center justify-center gap-2 py-3 col-span-2 bg-[var(--error)]/10 border border-[var(--error)]/20 text-[var(--error)] rounded-lg text-sm hover:bg-[var(--error)]/20 transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }) : !loading && (
                    <div className="text-gray-400 col-span-3 text-center py-12 bg-zinc-900/50 rounded-xl border border-zinc-800">
                        No resumes found. Generate your first tailored resume!
                    </div>
                )}

                {/* Create template button */}
                <button onClick={handleGenerateResume} className="group relative border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 transition-all min-h-[280px]">
                    <div className="w-12 h-12 rounded-full bg-[var(--surface-container-highest)] flex items-center justify-center group-hover:bg-[var(--primary)]/10 transition-colors">
                        <PlusCircle className="text-[var(--on-surface-variant)] group-hover:text-[var(--primary)] w-6 h-6 transition-colors" />
                    </div>
                    <div className="text-center">
                        <span className="block text-[var(--on-surface)] font-['Satoshi'] text-2xl font-bold">Optimize Resume</span>
                        <span className="text-[var(--on-surface-variant)] text-sm">Tailor metrics for a new job description</span>
                    </div>
                </button>
            </div>

            {/* Selection Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--surface-container-low)] border border-white/10 rounded-2xl p-6 max-w-md w-full relative text-white">
                        <h3 className="text-2xl font-bold font-['Satoshi'] mb-4 text-[var(--on-surface)]">Generate Tailored Resume</h3>
                        <p className="text-[var(--on-surface-variant)] text-sm mb-6">Select one of your analyzed Job Descriptions to tailor your master profile metrics and skills.</p>
                        
                        <div className="flex flex-col gap-2 mb-6">
                            <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Job Description</label>
                            <select 
                                className="bg-[var(--surface-container)] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[var(--secondary)] w-full"
                                value={selectedJdId}
                                onChange={(e) => setSelectedJdId(e.target.value)}
                            >
                                <option value="">-- Choose JD --</option>
                                {jdsList.map((jd) => (
                                    <option key={jd._id} value={jd._id} className="bg-[var(--surface-container-low)] text-white">
                                        {jd.title || (jd.rawText ? (jd.rawText.length > 40 ? jd.rawText.substring(0, 40) + "..." : jd.rawText) : "Untitled JD")}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <Button 
                                onClick={handleConfirmGenerate} 
                                disabled={generating || !selectedJdId}
                                className="flex-1 bg-[var(--primary)] text-[#050f19] font-bold py-3 hover:opacity-90 disabled:opacity-50"
                            >
                                {generating ? "Generating..." : "Generate"}
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedJdId("");
                                }}
                                className="flex-1 border-white/10 text-white bg-transparent hover:bg-white/5 py-3"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resume CV Preview Modal */}
            {viewingResume && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col z-50 p-6 overflow-y-auto">
                    <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <h3 className="text-3xl font-bold font-['Satoshi']">Tailored Resume Preview</h3>
                            <div className="flex gap-4">
                                <Button onClick={() => {
                                    navigator.clipboard.writeText(JSON.stringify(viewingResume, null, 2));
                                    toast.success("Resume JSON copied!");
                                }} className="bg-[var(--secondary)] text-[#050f19] font-bold">Copy JSON</Button>
                                <Button onClick={() => setViewingResume(null)} variant="outline" className="border-white/10 text-white bg-transparent hover:bg-white/5">Close</Button>
                            </div>
                        </div>
                        
                        {/* CV layout */}
                        <div className="bg-white text-gray-900 p-12 rounded-xl shadow-2xl font-serif min-h-[800px] leading-relaxed">
                            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
                                <h1 className="text-4xl font-bold tracking-tight uppercase mb-1">Tailored Candidate Resume</h1>
                                <p className="text-sm font-sans tracking-wide text-gray-600">Generated for selected job matching · ATS Score: {viewingResume.score || 85}%</p>
                            </div>
                            
                            {/* Skills */}
                            {viewingResume.skills && viewingResume.skills.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold border-b border-gray-800 pb-1 mb-2 uppercase font-sans tracking-wider">Skills</h2>
                                    <p className="text-sm font-sans leading-relaxed">{viewingResume.skills.join(" · ")}</p>
                                </div>
                            )}

                            {/* Work Experience */}
                            {viewingResume.workExp && viewingResume.workExp.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold border-b border-gray-800 pb-1 mb-3 uppercase font-sans tracking-wider">Experience</h2>
                                    <div className="space-y-4">
                                        {viewingResume.workExp.map((work: any, i: number) => (
                                            <div key={i}>
                                                <div className="flex justify-between font-bold text-sm font-sans">
                                                    <span>{work.post} · {work.organisation}</span>
                                                    <span className="font-normal text-gray-600">{work.startDate ? new Date(work.startDate).toLocaleDateString() : ""} - {work.endDate ? new Date(work.endDate).toLocaleDateString() : "Present"}</span>
                                                </div>
                                                {work.contents && work.contents.length > 0 && (
                                                    <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                                                        {work.contents.map((c: string, ci: number) => (
                                                            <li key={ci}>{c}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {viewingResume.projects && viewingResume.projects.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold border-b border-gray-800 pb-1 mb-3 uppercase font-sans tracking-wider">Projects</h2>
                                    <div className="space-y-4">
                                        {viewingResume.projects.map((proj: any, i: number) => (
                                            <div key={i}>
                                                <div className="flex justify-between font-bold text-sm font-sans">
                                                    <span>{proj.title} ({proj.techStack ? proj.techStack.join(", ") : ""})</span>
                                                    {proj.projectLink && <a href={proj.projectLink} target="_blank" className="text-blue-600 underline font-normal text-xs font-sans">Live Project</a>}
                                                </div>
                                                {proj.contents && proj.contents.length > 0 && (
                                                    <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                                                        {proj.contents.map((c: string, ci: number) => (
                                                            <li key={ci}>{c}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education */}
                            {viewingResume.education && viewingResume.education.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold border-b border-gray-800 pb-1 mb-3 uppercase font-sans tracking-wider">Education</h2>
                                    <div className="space-y-3">
                                        {viewingResume.education.map((edu: any, i: number) => (
                                            <div key={i} className="flex justify-between text-sm font-sans">
                                                <div>
                                                    <span className="font-bold">{edu.degree} in {edu.fieldOfStudy}</span>
                                                    <span className="text-gray-600"> · {edu.institution}</span>
                                                </div>
                                                <span className="text-gray-600">GPA: {edu.gpa}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}