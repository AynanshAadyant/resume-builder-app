import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Upload,
    Plus,
    TrendingUp,
    FileText,
    Radar,
    Trophy,
    Eye,
    ChevronDown 
} from "lucide-react"
import { useState, useEffect } from "react"
import api from "@/api/api"
import { useNavigate, Link } from "react-router"
import { useAppSelector } from "@/store/hooks"
import ResumeTile from "../ResumeTile"
import JDTile from "../JDTile"

export default function MainContent() {
    const navigate = useNavigate();
    const user = useAppSelector((state: any) => state.auth.user)
    const userName = user?.name || "Professional"

    const [resumesCount, setResumesCount] = useState(0);
    const [jdsCount, setJdsCount] = useState(0);
    const [jds, setJDs] = useState<any[]>([])
    const [avgAtsScore, setAvgAtsScore] = useState(-1);
    const [resumes, setResumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const resumesRes = await api.get("/resume");
                let fetchedResumes = [];
                if (resumesRes.success && resumesRes.resumes) {
                    fetchedResumes = resumesRes.resumes;
                    setResumes(fetchedResumes);
                    setResumesCount(fetchedResumes.length);

                    if (fetchedResumes.length > 0) {
                        const totalScore = fetchedResumes.reduce((acc: number, curr: any) => acc + (curr.ats || 0), 0);
                        setAvgAtsScore(Math.round(totalScore / fetchedResumes.length));
                    }
                }

                const jdsRes = await api.get("/jd");
                if (jdsRes.success && jdsRes.data) {
                    setJdsCount(jdsRes.data.length);
                    setJDs(jdsRes.data);
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
            color: "#2563eb",
            growth: "+12%",
            trend: resumesCount > 0,
        },
        {
            id: 2,
            title: "JDs Analyzed",
            value: jdsCount.toString(),
            icon: Radar,
            color: "#0891b2",
            growth: "+5%",
            trend: jdsCount > 0,
        },
        {
            id: 3,
            title: "Avg. ATS Score",
            value: avgAtsScore > 0 ? avgAtsScore.toString() : "N/A",
            suffix: "/100",
            progress: avgAtsScore,
            icon: Trophy,
            color: "#16a34a",
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
    }: any) => {
        return (
            <div className="col-span-1 flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-start justify-between">
                    <div className="rounded-lg p-2" style={{ backgroundColor: `${color}14`, color }}>
                        <Icon className="h-5 w-5" />
                    </div>

                    {trend && (
                        <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                            <TrendingUp className="h-3 w-3" />
                            {growth}
                        </span>
                    )}
                </div>

                <div>
                    <div className="flex items-baseline gap-1">
                        <p className="font-['Satoshi'] text-4xl font-bold text-slate-950">
                            {value}
                        </p>

                        {suffix && (
                            <span className="font-['Satoshi'] text-xl text-slate-500">
                                {suffix}
                            </span>
                        )}
                    </div>

                    <p className="font-['Inter'] text-sm text-slate-500">
                        {title}
                    </p>
                </div>

                {progress && (
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: color }} />
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500" />
            </div>
        );
    }
    return (
        <div className="p-8 w-full max-w-[1180px] space-y-8 pb-12">
            <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h2 className="font-['Satoshi'] text-3xl font-bold text-slate-950">Dashboard</h2>
                    <p className="mt-2 font-['Inter'] text-base text-slate-500">
                        Welcome back, {userName}. Here is your resume workspace at a glance.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => navigate("/dashboard/ai")} variant="outline" className="flex items-center gap-2 rounded-lg border-slate-200 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950">
                        <Upload className="h-4 w-4" />
                        Upload JD
                    </Button>
                    <Button onClick={() => navigate("/dashboard/prompt")} className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-white transition-colors hover:bg-slate-800">
                        <Plus className="h-4 w-4" />
                        New Resume
                    </Button>
                </div>
            </section>

            <section className="w-full flex flex-row gap-5">
                <div className="w-2/3 flex flex-col gap-5">
                    <div className="col-span-12 grid gap-4 md:col-span-8 md:grid-cols-3">
                        {performanceCards.map((card) => (
                            <StatCard key={card.id} {...card} />
                        ))}
                    </div>
                    <div className="resumes w-full gap-5">
                        <div className="col-span-12 md:col-span-8">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-['Satoshi'] text-xl font-bold text-slate-950">Recent Resumes</h3>
                                <a
                                    onClick={() => {
                                        navigate("/dashboard/resume")
                                    }}
                                    className="cursor-pointer text-xs font-semibold uppercase text-cyan-700 hover:underline">View All</a>
                            </div>
                            <div className="space-y-3">
                                {loading ? (
                                    <div className="rounded-lg border border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
                                        Loading resumes...
                                    </div>
                                ) : resumes.length > 0 ? (
                                    resumes.slice(0, 3).map((resume: any, index: number) => 
                                        <ResumeTile resume={resume} index={index} />
                                    )
                                ) : (
                                    <div className="rounded-lg border border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
                                        No resumes generated yet. Go to <Link to="/dashboard/resume" className="text-cyan-700 hover:underline">Resume Editor</Link> to create one.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="jds w-1/3">
                    <div className="px-4 mb-4 flex items-center justify-between">
                        <h3 className="font-['Satoshi'] text-xl font-bold text-slate-950">
                            Recent JDs
                        </h3>
                        <span className="text-xs font-semibold uppercase text-cyan-700">
                            {jds.length} Total
                        </span>
                    </div>
                    <div className="space-y-3 overflow-y-scroll">
                        {jds.length > 0 ? (
                            jds.slice(0, 5).map((jd, index) => {
                                return <JDTile jd={jd} index={index}/>
                            })
                        ) : (
                            <div className="rounded-lg border border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
                                No JDs analyzed yet.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
