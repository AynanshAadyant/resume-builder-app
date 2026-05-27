import { 
    Sparkles, 
    CheckCircle
} from "lucide-react"
import { useState } from "react"
import api from "@/api/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { sanitizeMultilineString } from "@/utils/sanitizer"
import { useAppSelector } from "@/store/hooks"

export default function AIWorkspace() {

    const p = useAppSelector( (state : any) => state.profile.profile)

    const [jdID, setJDID] = useState( null )
    const [jdText, setJdText] = useState("");
    const [loading, setLoading] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);

    const [resumeData, setResumeData] = useState<any>( null );
    const [resumeLoading, setResumeLoading] = useState<boolean>(false);

    const handleAnalyze = async () => {
        const sanitized = sanitizeMultilineString(jdText);
        if (!sanitized) return toast.error("Please enter a Job Description");
        setLoading(true);
        try {
            // 1. Store JD
            const storeRes = await api.post("/jd", { JD: sanitized });
            if (storeRes.success && storeRes.data) {
                const jdId = storeRes.data;
                setJDID( jdId )
                // 2. Parse JD
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
            const response = await api.post( "/resume", { profileID: profile_id, jdID : jd_id })
            if( response.success ) {
                setResumeData( response.resume )  
            }
        }
        catch( e : any ) {
            console.error( e )
            toast.error( "Something went wrong" )
        }
        finally {
            setResumeLoading( false )
        }
    }

    return(
        <div className="flex h-[calc(100vh-4rem)] -m-8 overflow-hidden text-white">
            {/* Left Panel: JD Intelligence */}
            <aside className="w-1/3 min-w-[400px] border-r border-white/5 bg-[var(--surface-container-low)] overflow-y-auto flex flex-col relative z-10">
                <div className="p-6 border-b border-white/5 sticky top-0 bg-[var(--surface-container-low)]/90 backdrop-blur z-20">
                    <div className="flex flex-col gap-4 mb-2">
                        <div>
                            <p className="font-semibold text-xs tracking-widest uppercase text-[var(--secondary)] mb-1">Target Role Analysis</p>
                            <h3 className="font-['Satoshi'] text-2xl font-bold text-[var(--on-surface)]">AI Job Parser</h3>
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
                                onClick={( e ) => {
                                    e.preventDefault();
                                    if( p )
                                    generateResume(p.id, jdID )
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
                                    <div className="text-sm font-medium">{parsedData.title || parsedData.jobTitle || "Not found"}</div>
                                </div>
                            </div>
                        </section>

                        {/* Keywords */}
                        <section>
                            <h4 className="font-semibold text-xs tracking-widest uppercase text-[var(--on-surface-variant)] mb-4 border-b border-white/5 pb-2">Extracted Keywords & Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {parsedData.skills && Array.isArray(parsedData.skills) ? (
                                    parsedData.skills.map((skill: string, index: number) => (
                                        <div key={index} className="px-3 py-1.5 rounded-full bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center gap-2">
                                            <CheckCircle className="w-3.5 h-3.5 text-[var(--secondary)]" />
                                            <span className="font-['Inter'] text-sm text-[var(--secondary)]">{skill}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-400">No skills explicitly found in the parsed data.</div>
                                )}
                            </div>
                        </section>
                    </div>
                )}
            </aside>

            {/* Right Panel: Resume Studio */}
            <main className="flex-1 bg-[var(--background)] relative overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[var(--secondary)]/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />
                </div>

                {
                    parsedData
                    ?
                    <div className="relative z-10 max-w-lg w-full">
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

                    :
                    resumeLoading
                    ?
                    <div className="relative z-10 max-w-lg w-full">
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

                    :
                    <div className="relative z-10 max-w-xl w-full">
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
                }
            </main>
        </div>
    )
}