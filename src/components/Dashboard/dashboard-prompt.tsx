import { 
    Sparkles,
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
        <div className="relative z-10 max-w-xl w-full">
            <div className="bg-[var(--surface-container-low)]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl">

                <div className="w-20 h-20 rounded-3xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="w-10 h-10 text-[var(--secondary)] opacity-90" />
                </div>

                <h2 className="text-4xl font-bold mb-4 text-[var(--on-surface)] font-['Satoshi'] tracking-tight">
                    Prompt Resume Generator
                </h2>

                <p className="text-[var(--on-surface-variant)] leading-relaxed max-w-md mx-auto text-sm">
                    Write a prompt and generate a tailored, ATS-friendly,
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


export default function ResumeFromPrompt() {

    const p = useAppSelector( (state : any) => state.profile.profile)
    const user = useAppSelector( (state : any ) => state.auth.user )

    const resumeRef = useRef<HTMLDivElement>(null);

    const [prompt, setPrompt] = useState("");

    const [resumeData, setResumeData] = useState<any>( null );
    const [resumeLoading, setResumeLoading] = useState<boolean>(false);
    const [resumeError, setResumeError] = useState<boolean>(false);

    
    const generateResume = async () => {
        try {
            let santizedPrompt = sanitizeMultilineString( prompt )
            setResumeLoading( true )
            const response = await api.post( "/resume/create/prompt", { profileID: p.profile._id, prompt : santizedPrompt })
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
            <aside className="w-1/3 min-w-[400px] border-r p-5 border-white/5 bg-[var(--surface-container-low)] overflow-y-auto flex flex-col relative z-10">
                <div className="p-6 border-b border-white/5 sticky top-0 bg-[var(--surface-container-low)]/90 backdrop-blur z-20">
                    <div className="flex flex-col gap-4 mb-2">
                        <div>
                            <p className="font-semibold text-xs tracking-widest uppercase text-[var(--secondary)] mb-1">Prompt Generation</p>
                            <h3 className="font-['Satoshi'] text-2xl font-bold text-[var(--on-surface)]">Resume Generator</h3>
                        </div>
                        <textarea 
                            className="w-full h-32 bg-[var(--surface-container)] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--secondary)] transition-colors"
                            placeholder="Write a prompt to generate a resume from..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <Button 
                            onClick={generateResume } 
                            disabled={resumeLoading || !prompt.trim()}
                            className="w-full bg-[var(--secondary)] text-[#050f19] hover:bg-[#4bc2b7]"
                        >
                            {resumeLoading ? "Generating..." : "Generate Resume"}
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Right Panel: Resume Studio */}
            <main className="flex-1 overflow-auto p-8">                
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[var(--secondary)]/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />
                </div>
                <div className="rights h-[calc(100vh-80px)] overflow-y-auto overflow-x-auto">
                    {
                        resumeError
                        ?
                            <ResumeErrorMessage />
                        :
                        resumeData 
                        ?
                            <div className="resume-container">
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
                            <DefaultResumeMessage />
                    }
                </div>
            </main>
        </div>
    )
}
