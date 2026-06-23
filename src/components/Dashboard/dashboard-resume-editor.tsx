import {
    Building2,
    Eye,
    FileText,
    Plus,
    PlusCircle,
    Trash2,
    X
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import api from "@/api/api"
import { toast } from "sonner"
import type { Resume } from "@/types/resume.type"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/store/hooks"
import ResumePreview from "../Resumes/Resume"
import { usePrintPdf } from "@/utils/downloader"

interface ResumeCardProps {
    resume: Resume,
    idx: number,
    handleDeleteResume?: any,
    loadViewingResume?: any
}

function ResumeCard({ resume, idx, handleDeleteResume, loadViewingResume }: ResumeCardProps) {
    const targetRole = resume.role || "Role Resume";
    const targetCompany = resume.company || "Target Company";
    const ats = resume?.ats.toString() ?? 'N/A';

    console.log( resume );

    return (
        <div key={resume._id || idx} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-cyan-200">
            <div className="mb-6 flex flex-row items-center justify-between">
                <div className="rounded-lg bg-cyan-50 p-2 text-cyan-700">
                    <FileText className="h-5 w-5" />
                </div>
                <p> ATS : {ats} </p>
            </div>

            <div className="mb-6">
                <h3 className="font-['Satoshi'] text-xl font-bold text-slate-950">{targetRole}</h3>
                <p className="mt-2 font-['Satoshi'] flex items-center gap-2 text-xl text-slate-950">
                    <Building2 className="h-4 w-4" />
                    Target: {targetCompany}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => loadViewingResume(resume._id)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-slate-950"
                >
                    <Eye className="h-4 w-4" /> View
                </button>
                <button
                    onClick={() => handleDeleteResume(resume._id)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
                >
                    <Trash2 className="h-4 w-4" /> Delete
                </button>
            </div>
        </div>
    );
}

export default function ResumeEditor() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const resumeRef = useRef(null)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jdsList, setJdsList] = useState<any[]>([]);
    const [selectedJdId, setSelectedJdId] = useState("");
    const completeProfile = useAppSelector(
        (state) => state.profile.profile
    );
    const user = useAppSelector(
        (state) => state.auth.user
    )

    const profile = completeProfile?.profile;
    const [viewingResume, setViewingResume] = useState<any | null>(null);

    useEffect(() => {
        fetchResumes();
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
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
            const res = await api.get("/resume/");
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

    const loadViewingResume = async (id: any) => {
        try {
            const response = await api.get(`/resume/${id}`)
            if (response.success)
                setViewingResume(response.resume);
        }
        catch (e: any) {
            console.log("ERROR in fetching resume : ");
            console.log(e);
            toast.error("Something went wrong");
        }
    }

    const handleGenerateResume = async () => {
        if (!profile?._id) {
            return toast.error("Please create your Master Profile in the Profile Builder tab first.");
        }
        if (jdsList.length === 0) {
            return toast.error("Please analyze a Job Description in the AI Workspace first.");
        }
        setIsModalOpen(true);
    };

    const handleConfirmGenerate = async () => {
        if (!selectedJdId) return toast.error("Please select a Job Description");
        if (!profile?._id) return toast.error("Profile Data missing")
        setGenerating(true);
        const loadToast = toast.loading("Generating optimized resume via AI...");
        try {
            const res = await api.post("/resume/create", {
                profileID: profile?._id,
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

    const handleDownload = usePrintPdf({
        ref: resumeRef,
        fileName: "resume"
    })

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />
            </div>
        );
    }

    return (
        <div className="p-8 w-full max-w-[1180px] pb-12">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h2 className="font-['Satoshi'] text-3xl font-bold text-slate-950">Resume Library</h2>
                    <p className="mt-2 font-['Inter'] text-base text-slate-500">Manage tailored resumes and generate new versions from analyzed job descriptions.</p>
                </div>
                <Button
                    onClick={handleGenerateResume}
                    disabled={generating}
                    className="flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-white transition-colors hover:bg-slate-800"
                >
                    <Plus className="h-5 w-5" />
                    {generating ? "Generating..." : "New Resume"}
                </Button>
            </div>


            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <button onClick={handleGenerateResume} className="group flex min-h-64 flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-slate-300 bg-white p-6 transition-colors hover:border-cyan-300 hover:bg-cyan-50/50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 transition-colors group-hover:bg-white">
                        <PlusCircle className="h-6 w-6 text-slate-500 transition-colors group-hover:text-cyan-700" />
                    </div>
                    <div className="text-center">
                        <span className="block font-['Satoshi'] text-xl font-bold text-slate-950">Optimize Resume</span>
                        <span className="text-sm text-slate-500">Tailor metrics for a new job description</span>
                    </div>
                </button>

                {!loading && resumes.length > 0 ? resumes.map((resume: any, idx: number) =>
                    <ResumeCard key={resume._id || idx} resume={resume} idx={idx} handleDeleteResume={handleDeleteResume} loadViewingResume={loadViewingResume} />
                ) : !loading && (
                    <p></p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
                    <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-xl">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-['Satoshi'] text-2xl font-bold">Generate Tailored Resume</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">Select one analyzed job description to tailor your master profile.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedJdId("");
                                }}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-6 flex flex-col gap-2">
                            <label className="text-xs font-semibold uppercase text-slate-400">Job Description</label>
                            <select
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-950 focus:border-cyan-400 focus:bg-white focus:outline-none"
                                value={selectedJdId}
                                onChange={(e) => setSelectedJdId(e.target.value)}
                            >
                                <option value="">Choose JD</option>
                                {jdsList.map((jd) => (
                                    <option key={jd._id} value={jd._id}>
                                        {jd.title || (jd.rawText ? (jd.rawText.length > 40 ? jd.rawText.substring(0, 40) + "..." : jd.rawText) : "Untitled JD")}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={handleConfirmGenerate}
                                disabled={generating || !selectedJdId}
                                className="flex-1 rounded-lg bg-slate-950 text-white hover:bg-slate-800 disabled:opacity-50"
                            >
                                {generating ? "Generating..." : "Generate"}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedJdId("");
                                }}
                                className="flex-1 rounded-lg border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {viewingResume && (
                <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-gray-400 backdrop-blur-md">
                    <div className="buttons flex flex-row items-center justify-center">
                        <button
                            onClick={() => setViewingResume(null)}
                            className="fixed right-6 top-6 z-50 rounded-lg bg-white p-2 text-slate-700 shadow-lg hover:bg-slate-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <button className="fixed bg-black text-white px-5 rounded left-6 top-6 z-50" onClick={handleDownload}> Download </button>
                    </div>

                    <ResumePreview ref={resumeRef} resume={viewingResume} profile={completeProfile?.profile} user={user} />
                </div>
            )}
        </div>
    )
}
