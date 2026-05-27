import { Button } from "../ui/button"
import { 
    Upload, 
    Plus, 
    TrendingUp, 
    FileText, 
    Radar, 
    Trophy, 
    Sparkles, 
    Eye, 
    Copy
} from "lucide-react"
import { useState, useEffect } from "react"
import api from "@/api/api"
import { useNavigate, Link } from "react-router"
import { toast } from "sonner"
import { useAppSelector } from "@/store/hooks"

export default function MainContent() {
    const navigate = useNavigate();
    const user = useAppSelector( (state:any) => state.auth.user )
    const userName = user?.name || "Professional"
    
    const [resumesCount, setResumesCount] = useState(0);
    const [jdsCount, setJdsCount] = useState(0);
    const [avgAtsScore, setAvgAtsScore] = useState(85);
    const [resumes, setResumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                
                // 2. Fetch resumes
                const resumesRes = await api.get("/resume/");
                let fetchedResumes = [];
                if (resumesRes.success && resumesRes.resumes) {
                    fetchedResumes = resumesRes.resumes;
                    setResumes(fetchedResumes);
                    setResumesCount(fetchedResumes.length);
                    
                    // Calculate average score
                    if (fetchedResumes.length > 0) {
                        const totalScore = fetchedResumes.reduce((acc: number, curr: any) => acc + (curr.score || 85), 0);
                        setAvgAtsScore(Math.round(totalScore / fetchedResumes.length));
                    }
                }

                // 3. Fetch JDs
                const jdsRes = await api.get("/jd");
                if (jdsRes.success && jdsRes.data) {
                    setJdsCount(jdsRes.data.length);
                }
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const performanceCards = [
        {
            id: 1,
            title: "Resumes Generated",
            value: resumesCount.toString(),
            icon: FileText,
            color: "var(--primary)",
            growth: "+12%",
            trend: resumesCount > 0,
        },
        {
            id: 2,
            title: "JDs Analyzed",
            value: jdsCount.toString(),
            icon: Radar,
            color: "var(--tertiary)",
            growth: "+5%",
            trend: jdsCount > 0,
        },
        {
            id: 3,
            title: "Avg. ATS Score",
            value: avgAtsScore.toString(),
            suffix: "/100",
            progress: avgAtsScore,
            icon: Trophy,
            color: "var(--secondary)",
            special: true,
        },
    ];

    const insights = [
        {
            id: 1,
            title: 'Missing Metrics in "Product Manager" Profile',
            description:
                "Your latest iteration lacks quantifiable results in the Q3 launch section. Suggesting 3 KPI additions.",
            type: "error",
            action: "Apply Fixes",
        },
        {
            id: 2,
            title: "Leadership Gaps Detected",
            description:
                "Recent target JDs heavily index on cross-functional team management. Highlight your squad leadership experience more prominently.",
            type: "success",
        },
    ];

    const StatCard = ({
        title,
        value,
        suffix,
        icon: Icon,
        color,
        growth,
        trend,
        progress,
        special,
    }: any) => {
        return (
            <div
                className={`col-span-1 bg-[var(--surface-container-low)]/60 backdrop-blur-xl border border-white/5 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden`}
            >
                {special && (
                    <div
                        className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl"
                        style={{ backgroundColor: `${color}20` }}
                    />
                )}

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div
                        className="p-2 rounded-lg"
                        style={{
                            backgroundColor: `${color}15`,
                            color: color,
                        }}
                    >
                        <Icon className="w-6 h-6" />
                    </div>

                    {trend && (
                        <span className="text-[var(--secondary)] font-semibold text-xs flex items-center gap-1 bg-[var(--secondary)]/10 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            {growth}
                        </span>
                    )}
                </div>

                <div className="relative z-10">
                    <div className="flex items-baseline gap-1">
                        <p className="font-['Satoshi'] text-6xl font-bold text-[var(--on-surface)]">
                            {value}
                        </p>

                        {suffix && (
                            <span className="font-['Satoshi'] text-2xl text-[var(--on-surface-variant)]">
                                {suffix}
                            </span>
                        )}
                    </div>

                    <p className="font-['Inter'] text-sm text-[var(--on-surface-variant)]">
                        {title}
                    </p>
                </div>

                {progress && (
                    <div className="mt-2 w-full bg-[var(--background)] h-1.5 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: color,
                            }}
                        />
                    </div>
                )}
            </div>
        );
    };

    const InsightCard = ({ title, description, type, action }: any) => {
        const dotColor =
            type === "error"
                ? "bg-[var(--error)]"
                : "bg-[var(--secondary)]";

        const borderColor =
            type === "error"
                ? "border-[var(--secondary)]/20"
                : "border-white/5";

        return (
            <div
                className={`p-4 bg-[var(--surface-container)] border rounded-lg ${borderColor}`}
            >
                <div className="flex items-start gap-4">
                    <div
                        className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`}
                    />

                    <div>
                        <p className="font-['Inter'] text-sm text-[var(--on-surface)] font-semibold mb-1">
                            {title}
                        </p>

                        <p className="font-['Inter'] text-[13px] text-[var(--on-surface-variant)] leading-relaxed">
                            {description}
                        </p>

                        {action && (
                            <button className="mt-2 text-[var(--secondary)] font-semibold text-xs tracking-wide hover:underline">
                                {action}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return(
        <div className="max-w-[1200px] mx-auto space-y-12 pb-12">
            {/* Welcome & Quick Actions */}
            <section className="flex justify-between items-center">
                <div>
                    <h2 className="font-['Satoshi'] text-4xl font-bold text-[var(--on-surface)] tracking-tighter">Command Center</h2>
                    <p className="font-['Inter'] text-lg text-[var(--on-surface-variant)] mt-2">Welcome back, {userName}. Your career metrics are trending upwards.</p>
                </div>
                <div className="flex gap-4">
                    <Button onClick={() => navigate("/dashboard/ai")} variant="outline" className="px-4 py-2 rounded-lg border border-[var(--outline-variant)]/20 bg-[var(--surface-container-low)] text-[var(--on-surface)] hover:bg-[var(--surface-container-highest)] transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload JD
                    </Button>
                    <Button onClick={() => navigate("/dashboard/resume")} className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--on-primary)] shadow-[0_0_15px_rgba(65,79,209,0.3)] hover:opacity-90 transition-opacity flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Resume
                    </Button>
                </div>
            </section>

            {/* Grid Layout */}
           <div className="grid grid-cols-12 gap-6">
                {/* Performance Cards */}
                <div className="col-span-12 md:col-span-8 grid grid-cols-3 gap-4">
                    {performanceCards.map((card) => (
                        <StatCard key={card.id} {...card} />
                    ))}
                </div>

                {/* AI Insights Panel */}
                <div className="col-span-12 md:col-span-4 rounded-xl relative p-[1px]">
                    <div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-50"
                        style={{
                            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            padding: "1px",
                        }}
                    />

                    <div className="bg-[var(--surface-container-low)] rounded-xl h-full p-6 relative overflow-hidden flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--secondary)]/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

                        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 relative z-10">
                            <Sparkles className="text-[var(--secondary)] w-6 h-6" />

                            <h3 className="font-['Satoshi'] text-2xl font-bold text-[var(--on-surface)]">
                                Intelligence Sync
                            </h3>
                        </div>

                        <div className="space-y-4 flex-1 relative z-10">
                            {insights.map((insight) => (
                                <InsightCard key={insight.id} {...insight} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Gallery & Activity */}
            <div className="grid grid-cols-12 gap-6">
                {/* Resume Gallery */}
                <div className="col-span-12 md:col-span-8">
                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                        <h3 className="font-['Satoshi'] text-2xl font-bold text-[var(--on-surface)]">Active Deployments</h3>
                        <a className="text-[var(--primary)] font-semibold text-xs tracking-wide hover:underline cursor-pointer">View All</a>
                    </div>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-sm text-[var(--on-surface-variant)] py-4">Loading active deployments...</div>
                        ) : resumes.length > 0 ? (
                            resumes.slice(0, 3).map((resume: any, index: number) => {
                                const targetRole = (resume.workExp && resume.workExp[0] && resume.workExp[0].post) || "Software Engineer";
                                const targetCompany = (resume.workExp && resume.workExp[0] && resume.workExp[0].organisation) || "Target Company";
                                const score = resume.score || 85;
                                return (
                                    <div key={resume._id || index} className="bg-[var(--surface-container)] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-[var(--surface-container-highest)] transition-colors group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-16 bg-[var(--surface-container-low)] border border-white/10 rounded flex items-center justify-center relative shadow-sm">
                                                <span className="font-['IBM_Plex_Serif'] text-[8px] text-[var(--tertiary)]/50 text-center leading-tight">RESUME<br/>v{index+1}.0</span>
                                                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[var(--secondary)]"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-['Inter'] text-base text-[var(--on-surface)] font-semibold">{targetRole}</h4>
                                                <p className="font-['Inter'] text-sm text-[var(--on-surface-variant)]">Target: {targetCompany} · Optimized {new Date(resume.createdAt || "").toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <span className="font-['Satoshi'] text-2xl font-bold text-[var(--secondary)] block leading-none mb-1">{score}</span>
                                                <span className="font-semibold text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)]">ATS Score</span>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => navigate("/dashboard/resume")} className="p-2 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors"><Eye className="w-5 h-5" /></button>
                                                <button onClick={() => {
                                                    navigator.clipboard.writeText(JSON.stringify(resume, null, 2));
                                                    toast.success("Resume JSON copied to clipboard!");
                                                }} className="p-2 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors"><Copy className="w-5 h-5" /></button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-sm text-[var(--on-surface-variant)] py-4 bg-[var(--surface-container)] rounded-xl border border-white/5 text-center">
                                No resumes generated yet. Go to <Link to="/dashboard/resume" className="text-[var(--primary)] hover:underline">Resume Editor</Link> to create one.
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Activity Timeline */}
                <div className="col-span-12 md:col-span-4">
                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                        <h3 className="font-['Satoshi'] text-2xl font-bold text-[var(--on-surface)]">Telemetry</h3>
                    </div>
                    <div className="relative pl-6 border-l border-white/10 space-y-6 py-2">
                        <div className="relative">
                            <div className="absolute -left-[29px] top-1 w-2 h-2 bg-[var(--secondary)] rounded-full ring-4 ring-[var(--background)]"></div>
                            <p className="font-['Inter'] text-sm text-[var(--on-surface)] font-semibold">Stripe JD Analyzed</p>
                            <p className="font-['Inter'] text-[13px] text-[var(--on-surface-variant)] mt-1">AI identified 14 key matching criteria.</p>
                            <span className="font-semibold text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)] mt-1 block">2 hrs ago</span>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[29px] top-1 w-2 h-2 bg-[var(--primary)] rounded-full ring-4 ring-[var(--background)]"></div>
                            <p className="font-['Inter'] text-sm text-[var(--on-surface)] font-semibold">Resume v2.4 Exported</p>
                            <p className="font-['Inter'] text-[13px] text-[var(--on-surface-variant)] mt-1">Downloaded as PDF format.</p>
                            <span className="font-semibold text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)] mt-1 block">5 hrs ago</span>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[29px] top-1 w-2 h-2 bg-[var(--tertiary)] rounded-full ring-4 ring-[var(--background)]"></div>
                            <p className="font-['Inter'] text-sm text-[var(--on-surface)] font-semibold">Profile Workspace Updated</p>
                            <p className="font-['Inter'] text-[13px] text-[var(--on-surface-variant)] mt-1">Added "Q3 Revenue Growth" metric.</p>
                            <span className="font-semibold text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)] mt-1 block">1 day ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}