import { 
    Sparkles, 
    CheckCircle,
    AlertTriangle
} from "lucide-react"
import { useState } from "react"
import api from "@/api/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { sanitizeMultilineString } from "@/utils/sanitizer"
import { useAppSelector } from "@/store/hooks"
import ResumePreview from "../Resumes/Resume"
import { useRef } from "react"
import { usePrintPdf } from "@/utils/downloader"

function GenerateResumeMessage() {
    return(
        <div className="generate-resume relative z-10 max-w-lg w-full">
            <div className="bg-[var(--surface-container-low)]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
                
                <div className="w-16 h-16 rounded-2xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-[var(--secondary)]" />
                </div>

                <h2 className="text-3xl font-bold text-[var(--on-surface)] mb-3 font-['Satoshi']">
                    Ready to Generate
                </h2>

                <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                    Your job description has been successfully analyzed.
                    Generate an ATS-optimized resume tailored specifically
                    for this role.
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[var(--secondary)] tracking-wide uppercase">
                    <div className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
                    AI Analysis Completed
                </div>
            </div>
        </div>
    )
}

function GeneratingResumeMessage() {
    return(
        <div className="generating-resume relative z-10 max-w-lg w-full">
            <div className="bg-[var(--surface-container-low)]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl">

                <div className="relative w-16 h-16 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-[var(--secondary)]/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--secondary)] animate-spin" />
                </div>

                <h2 className="text-3xl font-bold text-[var(--on-surface)] mb-3 font-['Satoshi']">
                    Generating Resume
                </h2>

                <p className="text-[var(--on-surface-variant)] text-sm leading-relaxed">
                    AI is optimizing your resume for ATS systems,
                    recruiter expectations, and technical relevance.
                </p>

                <div className="mt-8 flex justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-bounce delay-100" />
                    <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-bounce delay-200" />
                </div>
            </div>
        </div>
    )
}

function ResumeErrorMessage() {
    return(
        <div className="bg-[var(--surface-container-low)]/70 backdrop-blur-xl border border-red-500/20 rounded-3xl p-10 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--on-surface)] mb-3 font-['Satoshi']">
                Resume Generation Failed
            </h2>
            <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                We couldn't generate your resume at the moment.
                An unexpected issue occurred while processing the
                job requirements and optimizing your profile.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-red-400 tracking-wide uppercase">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                Generation Interrupted
            </div>
        </div>
    )
}

function DefaultResumeMessage() {
    return(
        <div className="relative z-10 max-w-xl flex items-center justify-center w-full h-auto">
            <div className="bg-[var(--surface-container-low)]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl">

                <div className="w-20 h-20 rounded-3xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="w-10 h-10 text-[var(--secondary)] opacity-90" />
                </div>

                <h2 className="text-4xl font-bold mb-4 text-[var(--on-surface)] font-['Satoshi'] tracking-tight">
                    AI Resume Workspace
                </h2>

                <p className="text-[var(--on-surface-variant)] leading-relaxed max-w-md mx-auto text-sm">
                    Paste a job description to extract recruiter-focused
                    skills, ATS keywords, and generate a tailored
                    high-performance resume.
                </p>

                <div className="mt-10 flex justify-center gap-3 flex-wrap">
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--on-surface-variant)]">
                        ATS Optimized
                    </div>

                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--on-surface-variant)]">
                        AI Powered
                    </div>

                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--on-surface-variant)]">
                        Recruiter Focused
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function AIWorkspace() {

    const p = useAppSelector( (state : any) => state.profile.profile)
    const user = useAppSelector( (state : any ) => state.auth.user )

    const resumeRef = useRef<HTMLDivElement>(null);

    const [jdID, setJDID] = useState( null )
    const [jdText, setJdText] = useState("");
    const [loading, setLoading] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);

    const [resumeData, setResumeData] = useState<any>( null );
    const [resumeLoading, setResumeLoading] = useState<boolean>(false);
    const [resumeError, setResumeError] = useState<boolean>(false);

    const handleAnalyze = async () => {
        const sanitized = sanitizeMultilineString(jdText);
        if (!sanitized) return toast.error("Please enter a Job Description");
        setLoading(true);
        try {
            const storeRes = await api.post("/jd", { JD: sanitized });
            if (storeRes.success && storeRes.data) {
                const jdId = storeRes.data;
                setJDID( jdId )

                const parseRes = await api.post(`/jd/parse/${jdId}`, {});
                if (parseRes.success && parseRes.data) {
                    setParsedData(parseRes.data);
                    toast.success("Job Description analyzed successfully!");
                } else {
                    toast.error(parseRes.message || "Failed to parse JD");
                }
            } else {
                toast.error(storeRes.message || "Failed to store JD");
            }
        } catch (err: any) {
            toast.error(err?.message || "An error occurred during analysis");
        } finally {
            setLoading(false);
        }
    }

    const generateResume = async ( profile_id : any, jd_id : any ) => {
        try {
            setResumeLoading( true )
            console.log( profile_id, " ", jd_id )
            const response = await api.post( "/resume/create", { profileID: profile_id, jdID : jd_id })
            if( response.success ) {
                setResumeError( false );
                setResumeData( response.resume );
            }
            else {
                console.log( response );
                setResumeError( true );
            }
        }
        catch( e : any ) {
            console.error( e )
            setResumeError( true );
            toast.error( "Something went wrong" )
        }
        finally {
            setResumeLoading( false );
        }
    }

    const handleDownload = usePrintPdf({
        ref: resumeRef,
        fileName: "resume"
    })

    return(
        <div className="ai-workspace-clean flex h-[calc(100vh-4rem)] overflow-hidden text-white">
            {/* Left Panel: JD Intelligence */}
            <aside className="w-1/3 pl-8 pt-2 min-w-[400px] border-r border-white/5 bg-[var(--surface-container-low)] overflow-y-auto flex flex-col relative z-10">
                <div className="p-6 border-b border-white/5 sticky top-0 bg-[var(--surface-container-low)]/90 backdrop-blur z-20">
                    <div className="flex flex-col gap-4 mb-2">
                        <div>
                            <p className="font-semibold text-xs tracking-widest uppercase text-[var(--secondary)] mb-1">Target Role Analysis</p>
                            <h1 className="font-['Satoshi'] text-black text-3xl font-bold ">AI Job Parser</h1>
                        </div>
                        <textarea 
                            className="w-full h-32 bg-[var(--surface-container)] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--secondary)] transition-colors"
                            placeholder="Paste the job description here..."
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                        />
                        <Button 
                            onClick={handleAnalyze} 
                            disabled={loading || !jdText.trim()}
                            className="w-full bg-[var(--secondary)] text-[#050f19] hover:bg-[#4bc2b7]"
                        >
                            {loading ? "Analyzing..." : "Analyze Job Description"}
                        </Button>
                        {
                            parsedData
                            &&
                            <Button
                                disabled={resumeLoading}
                                onClick={( e ) => {
                                    e.preventDefault();
                                    if( p.profile._id )
                                    generateResume(p.profile._id, jdID )
                                }}
                                className="w-full bg-[var(--secondary)] text-[#050f19] hover:bg-[#4bc2b7]"

                            >
                                { resumeLoading ? "Generating Resume ... " : "Generate Resume" }
                            </Button>
                        }
                    </div>
                </div>

                {parsedData && (
                    <div className="p-6 space-y-12">
                        {/* Extracted Data */}
                        <section>
                            <h4 className="font-semibold text-xs tracking-widest uppercase text-[var(--on-surface-variant)] mb-4 border-b border-white/5 pb-2">Parsed Results</h4>
                            <div className="bg-[var(--surface-container)] border border-white/5 rounded-xl p-4 flex flex-col gap-4">
                                <div>
                                    <span className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider block mb-1">Job Title / Role</span>
                                    <div className="text-sm font-medium">{parsedData.metadata?.jobTitle || "Not found"}</div>
                                </div>
                                <div>
                                    <span className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider block mb-1">Company / Organization</span>
                                    <div className="text-sm font-medium">{parsedData.metadata?.company || "Not found"}</div>
                                </div>
                            </div>
                        </section>

                        {/* Keywords */}
                        <section>
                            <h4 className="font-semibold text-xs tracking-widest uppercase text-[var(--on-surface-variant)] mb-4 border-b border-white/5 pb-2">
                                Extracted Keywords & Skills
                            </h4>

                            {!parsedData.skills ? (
                                <div className="text-sm text-gray-400">
                                    No skills found.
                                </div>
                            ) : (
                                <div className="space-y-6">

                                    {/* Required Skills */}
                                    {Array.isArray(parsedData.skills.required) && (
                                        <div>
                                            <h5 className="text-sm font-semibold mb-3 text-[var(--secondary)]">
                                                Required Skills
                                            </h5>

                                            <div className="flex flex-wrap gap-2">
                                                {parsedData.skills.required.map(
                                                    (skill: string, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="px-3 py-1.5 rounded-full bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center gap-2"
                                                        >
                                                            <CheckCircle className="w-3.5 h-3.5 text-[var(--secondary)]" />
                                                            <span className="text-sm text-[var(--secondary)]">
                                                                {skill}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Preferred Skills */}
                                    {Array.isArray(parsedData.skills.preferred) && (
                                        <div>
                                            <h5 className="text-sm font-semibold mb-3 text-cyan-400">
                                                Preferred Skills
                                            </h5>

                                            <div className="flex flex-wrap gap-2">
                                                {parsedData.skills.preferred.map(
                                                    (skill: string, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-2"
                                                        >
                                                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                                                            <span className="text-sm text-cyan-400">
                                                                {skill}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Categorized Skills */}
                                    {parsedData.skills.categorized &&
                                        typeof parsedData.skills.categorized === "object" && (
                                            <div>
                                                <h5 className="text-sm font-semibold mb-3 text-purple-400">
                                                    Categorized Skills
                                                </h5>

                                                <div className="space-y-4">
                                                    {Object.entries(
                                                        parsedData.skills.categorized
                                                    ).map(([category, skills]: any) => {
                                                        if( skills.length > 0 )
                                                        return(
                                                            <div key={category}>
                                                                <h6 className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                                                                    {category}
                                                                </h6>

                                                                <div className="flex flex-wrap gap-2">
                                                                    {Array.isArray(skills) &&
                                                                        skills.map(
                                                                            (
                                                                                skill: string,
                                                                                index: number
                                                                            ) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20"
                                                                                >
                                                                                    <span className="text-sm text-purple-300">
                                                                                        {skill}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </aside>

            {/* Right Panel: Resume Studio */}
            <main className="flex-1 overflow-auto ">                
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[var(--secondary)]/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />
                </div>
                <div className="rights h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-y-auto overflow-x-auto">
                    {
                        resumeError
                        ?
                            <ResumeErrorMessage />
                        :
                        resumeData 
                        ?
                            <div className="resume-container mt-20">
                                <ResumePreview ref={resumeRef} resume={resumeData} profile={p.profile} user={user} className="" />
                                <button onClick={ 
                                    handleDownload
                                }> Download </button>
                            </div>
                        :
                        resumeLoading
                        ?
                            <GeneratingResumeMessage />
                        :
                        parsedData
                        ?
                            <GenerateResumeMessage />
                        :
                            <DefaultResumeMessage />
                    }
                </div>
            </main>
        </div>
    )
}
