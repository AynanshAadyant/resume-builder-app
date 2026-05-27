import { 
    Calendar, 
    ChevronDown, 
    Download, 
    TrendingUp, 
    MousePointerClick, 
    Sparkles, 
    ArrowRight, 
    MoreHorizontal, 
    Award 
} from "lucide-react"
import { useState, useEffect } from "react"
import api from "@/api/api"

export default function Insights() {
    const [profileStrength, setProfileStrength] = useState(84);
    const [keywords, setKeywords] = useState<string[]>([
        "Scalability", "TypeScript", "Product Vision", "AI/ML", 
        "Unit Testing", "Cross-functional", "User Centric", 
        "Figma", "Mentorship", "Architecture"
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get profile
                const profileRes = await api.get("/profile/get");
                if (profileRes.success && profileRes.data) {
                    const data = profileRes.data;
                    let strength = 0;
                    
                    if (data.profile) {
                        strength += 10;
                        if (data.profile.linkedIn) strength += 2;
                        if (data.profile.github) strength += 2;
                        if (data.profile.portfolio) strength += 2;
                    }
                    if (data.education && data.education.length > 0) strength += 14;
                    if (data.workExperiences && data.workExperiences.length > 0) strength += 20;
                    if (data.projects && data.projects.length > 0) strength += 20;
                    if (data.skills && data.skills.length > 0) strength += 15;
                    if (data.certifications && data.certifications.length > 0) strength += 10;
                    if (data.achievements && data.achievements.length > 0) strength += 5;

                    setProfileStrength(Math.min(strength, 100));
                }

                // Get JDs to populate keywords cloud
                const jdsRes = await api.get("/jd");
                if (jdsRes.success && jdsRes.data) {
                    const extractedKeywords: string[] = [];
                    jdsRes.data.forEach((jd: any) => {
                        if (jd.parsedText && Array.isArray(jd.parsedText.skills)) {
                            extractedKeywords.push(...jd.parsedText.skills);
                        } else if (jd.skills && Array.isArray(jd.skills)) {
                            extractedKeywords.push(...jd.skills);
                        }
                    });
                    
                    if (extractedKeywords.length > 0) {
                        const uniqueKeywords = Array.from(new Set(
                            extractedKeywords.map(k => k.trim()).filter(Boolean)
                        ));
                        if (uniqueKeywords.length > 3) {
                            setKeywords(uniqueKeywords.slice(0, 15));
                        }
                    }
                }
            } catch (err) {
                console.error("Error loading insights data:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-[1200px] mx-auto pb-24">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h2 className="font-['Satoshi'] text-4xl font-bold text-[var(--on-surface)] mb-2">Insights & Analytics</h2>
                    <p className="font-['Inter'] text-lg text-[var(--on-surface-variant)]">Real-time performance mapping and market intelligence.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-[var(--surface-container)] border border-white/5 px-4 py-2 rounded-lg cursor-pointer hover:bg-[var(--surface-container-high)] transition-colors">
                        <Calendar className="w-4 h-4 text-[var(--on-surface-variant)]" />
                        <span className="font-['Inter'] text-sm text-[var(--on-surface-variant)]">Last 90 Days</span>
                        <ChevronDown className="w-4 h-4 text-[var(--on-surface-variant)]" />
                    </div>
                    <button className="bg-[var(--surface-container-highest)] border border-white/10 px-4 py-2 rounded-lg font-['Inter'] text-sm text-[var(--on-surface)] hover:bg-[var(--surface-bright)] transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* KPI Stats */}
                <div className="col-span-12 lg:col-span-4 bg-[var(--surface-container)] border border-white/5 backdrop-blur-md p-6 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-['Inter'] text-xs font-semibold text-[var(--on-surface-variant)] mb-1 uppercase tracking-widest">Profile Strength</p>
                            <h3 className="font-['Satoshi'] text-6xl font-bold text-[var(--primary)] -tracking-[0.02em]">{profileStrength}<span className="text-2xl font-medium tracking-normal">%</span></h3>
                        </div>
                        <div className="bg-[var(--primary)]/10 p-2 rounded-lg text-[var(--primary)]">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="w-full h-1 bg-[var(--surface-container-highest)] rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--primary)] rounded-full shadow-[0_0_12px_rgba(189,194,255,0.4)]" style={{ width: `${profileStrength}%` }}></div>
                        </div>
                        <p className="font-['Inter'] text-sm text-[var(--on-surface-variant)] mt-2">Based on master profile completion</p>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 bg-[var(--surface-container)] border border-white/5 backdrop-blur-md p-6 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-['Inter'] text-xs font-semibold text-[var(--on-surface-variant)] mb-1 uppercase tracking-widest">Interview Conversion</p>
                            <h3 className="font-['Satoshi'] text-6xl font-bold text-[var(--secondary)] -tracking-[0.02em]">28<span className="text-2xl font-medium tracking-normal">%</span></h3>
                        </div>
                        <div className="bg-[var(--secondary)]/10 p-2 rounded-lg text-[var(--secondary)]">
                            <MousePointerClick className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex-1 flex gap-1 h-8 items-end">
                            <div className="w-2 bg-[var(--secondary)]/20 h-[40%] rounded-t-sm"></div>
                            <div className="w-2 bg-[var(--secondary)]/20 h-[60%] rounded-t-sm"></div>
                            <div className="w-2 bg-[var(--secondary)]/40 h-[50%] rounded-t-sm"></div>
                            <div className="w-2 bg-[var(--secondary)]/60 h-[80%] rounded-t-sm"></div>
                            <div className="w-2 bg-[var(--secondary)] h-full rounded-t-sm"></div>
                        </div>
                        <p className="font-['Inter'] text-sm text-[var(--secondary)] font-bold">14 Leads</p>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 bg-[var(--surface-container)] border border-[var(--secondary)]/20 backdrop-blur-md p-6 rounded-xl relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(189,194,255,0.05)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(90,218,206,0.05)_0px,transparent_50%)] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--secondary)]/5 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_infinite_linear] pointer-events-none"></div>
                    
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                        <Sparkles className="text-[var(--secondary)] w-5 h-5" />
                        <p className="font-['Inter'] text-xs font-bold text-[var(--secondary)] uppercase tracking-widest">AI Growth Suggestion</p>
                    </div>
                    <p className="font-['Inter'] text-base text-[var(--on-surface)] mb-6 italic relative z-10">
                        "Your Python and AWS skills are trending high in NYC. Highlighting your recent 'Cloud Deployment' project could increase visibility by 24%."
                    </p>
                    <button className="text-[var(--secondary)] font-['Inter'] text-sm font-bold flex items-center gap-1 group w-fit relative z-10">
                        Apply optimization 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* ATS Trends Line Chart */}
                <div className="col-span-12 lg:col-span-8 bg-[var(--surface-container)] border border-white/5 backdrop-blur-md p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-12">
                        <h4 className="font-['Satoshi'] text-2xl font-medium text-[var(--on-surface)]">ATS Score Trends</h4>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1 font-['Inter'] font-semibold text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)]">
                                <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span> YOUR SCORE
                            </span>
                            <span className="flex items-center gap-1 font-['Inter'] font-semibold text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)]">
                                <span className="w-2 h-2 rounded-full bg-[var(--surface-variant)]"></span> MARKET AVG
                            </span>
                        </div>
                    </div>
                    <div className="relative h-64 w-full">
                        {/* Chart Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                            <div className="border-t border-white/5 w-full h-0"></div>
                            <div className="border-t border-white/5 w-full h-0"></div>
                            <div className="border-t border-white/5 w-full h-0"></div>
                            <div className="border-t border-white/5 w-full h-0"></div>
                            <div className="border-t border-white/10 w-full h-0"></div>
                        </div>
                        {/* Line Chart Representation (SVG) */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
                            {/* Market Avg Path */}
                            <path className="text-[var(--surface-variant)]/30" d="M0,160 Q100,150 200,170 T400,165 T600,155 T800,160" fill="none" stroke="currentColor" strokeWidth="2"></path>
                            {/* Score Path */}
                            <path className="text-[var(--primary)]" d="M0,180 Q100,140 200,120 T400,110 T600,60 T800,40" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <circle className="fill-[var(--primary)]" cx="800" cy="40" r="4"></circle>
                            <circle className="fill-[var(--primary)]/20" cx="800" cy="40" r="10"></circle>
                        </svg>
                        {/* Labels */}
                        <div className="absolute bottom-[-32px] w-full flex justify-between font-['Inter'] font-semibold text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)] px-4">
                            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
                        </div>
                    </div>
                </div>

                {/* Skill Demand Heatmap */}
                <div className="col-span-12 lg:col-span-4 bg-[var(--surface-container)] border border-white/5 backdrop-blur-md p-6 rounded-xl">
                    <h4 className="font-['Satoshi'] text-2xl font-medium text-[var(--on-surface)] mb-4">Market Demand</h4>
                    <p className="font-['Inter'] text-sm text-[var(--on-surface-variant)] mb-6">Top skills for Senior Product Designer roles.</p>
                    <div className="grid grid-cols-5 gap-1">
                        {/* Heatmap Blocks */}
                        <div className="aspect-square bg-[var(--primary)]/10 rounded-sm flex items-center justify-center group relative cursor-help">
                            <div className="absolute invisible group-hover:visible bg-[var(--surface-container-highest)] p-1 rounded text-[10px] -top-8 z-10 whitespace-nowrap text-[var(--on-surface)]">Vue.js (Low)</div>
                        </div>
                        <div className="aspect-square bg-[var(--primary)]/40 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/60 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/30 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/80 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/20 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/90 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/50 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)] rounded-sm shadow-[0_0_8px_rgba(189,194,255,0.4)]"></div>
                        <div className="aspect-square bg-[var(--primary)]/40 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/10 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/30 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/70 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/20 rounded-sm"></div>
                        <div className="aspect-square bg-[var(--primary)]/10 rounded-sm"></div>
                    </div>
                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[var(--on-surface)]">System Design</span>
                            <span className="bg-[var(--secondary)]/10 text-[var(--secondary)] font-bold px-2 py-0.5 rounded text-[10px]">CRITICAL</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[var(--on-surface)]">Data Visualization</span>
                            <span className="bg-[var(--primary)]/10 text-[var(--primary)] font-bold px-2 py-0.5 rounded text-[10px]">GROWING</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[var(--on-surface-variant)]">Agile/Scrum</span>
                            <span className="bg-[var(--surface-variant)]/20 text-[var(--on-surface-variant)] font-bold px-2 py-0.5 rounded text-[10px]">STABLE</span>
                        </div>
                    </div>
                </div>

                {/* Word Cloud of Keywords */}
                <div className="col-span-12 lg:col-span-5 bg-[var(--surface-container)] border border-white/5 backdrop-blur-md p-6 rounded-xl overflow-hidden relative">
                    <h4 className="font-['Satoshi'] text-2xl font-medium text-[var(--on-surface)] mb-6 relative z-10">JD Keywords Cloud</h4>
                    <div className="flex flex-wrap gap-4 justify-center items-center py-6 opacity-90 relative z-10">
                        {keywords.map((kw, i) => {
                            const sizeClasses = ["text-3xl font-bold", "text-base", "text-2xl font-medium", "text-2xl font-bold", "text-xs font-semibold uppercase tracking-widest", "text-lg font-semibold"];
                            const colorClasses = ["text-[var(--primary)]", "text-[var(--on-surface-variant)]", "text-[var(--on-surface)]", "text-[var(--secondary)]", "text-[var(--primary)]/60", "text-[var(--secondary)]/80"];
                            
                            const sizeClass = sizeClasses[i % sizeClasses.length];
                            const colorClass = colorClasses[i % colorClasses.length];
                            
                            return (
                                <span key={i} className={`${colorClass} ${sizeClass} font-['Satoshi'] cursor-default hover:scale-110 transition-transform`}>
                                    {kw}
                                </span>
                            );
                        })}
                    </div>
                    {/* Subtle Mesh Over */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--surface-container-low)]/40 to-transparent z-0"></div>
                </div>

                {/* Success Rate / Conversion Funnel */}
                <div className="col-span-12 lg:col-span-7 bg-[var(--surface-container)] border border-white/5 backdrop-blur-md p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h4 className="font-['Satoshi'] text-2xl font-medium text-[var(--on-surface)]">Application Funnel</h4>
                            <p className="font-['Inter'] text-sm text-[var(--on-surface-variant)]">Journey from apply to offer.</p>
                        </div>
                        <button className="p-2 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {/* Funnel Item */}
                        <div className="relative">
                            <div className="flex justify-between items-center mb-1 px-4">
                                <span className="font-['Inter'] text-xs font-bold uppercase tracking-widest text-[var(--on-surface)]">Applied</span>
                                <span className="font-['Inter'] text-sm text-[var(--on-surface-variant)]">124 Companies</span>
                            </div>
                            <div className="h-10 w-full bg-[var(--primary)]/10 rounded-lg overflow-hidden flex items-center px-4 border border-[var(--primary)]/10 relative">
                                <div className="h-full bg-[var(--primary)] absolute left-0 top-0 w-full opacity-20"></div>
                                <div className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest text-[var(--primary-fixed)] relative z-10">100% Volume</div>
                            </div>
                        </div>

                        {/* Funnel Item */}
                        <div className="relative">
                            <div className="flex justify-between items-center mb-1 px-4">
                                <span className="font-['Inter'] text-xs font-bold uppercase tracking-widest text-[var(--on-surface)]">HR Screen</span>
                                <span className="font-['Inter'] text-sm text-[var(--on-surface-variant)]">42 Invites</span>
                            </div>
                            <div className="h-10 w-[65%] mx-auto bg-[var(--primary)]/20 rounded-lg overflow-hidden flex items-center px-4 border border-[var(--primary)]/20 relative">
                                <div className="h-full bg-[var(--primary)] absolute left-0 top-0 w-full opacity-30"></div>
                                <div className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest text-[var(--primary-fixed)] relative z-10">34% Conversion</div>
                            </div>
                        </div>

                        {/* Funnel Item */}
                        <div className="relative">
                            <div className="flex justify-between items-center mb-1 px-4">
                                <span className="font-['Inter'] text-xs font-bold uppercase tracking-widest text-[var(--on-surface)]">Technical Round</span>
                                <span className="font-['Inter'] text-sm text-[var(--on-surface-variant)]">18 Interviews</span>
                            </div>
                            <div className="h-10 w-[40%] mx-auto bg-[var(--secondary)]/20 rounded-lg overflow-hidden flex items-center px-4 border border-[var(--secondary)]/20 relative">
                                <div className="h-full bg-[var(--secondary)] absolute left-0 top-0 w-full opacity-30"></div>
                                <div className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest text-[var(--secondary)] relative z-10">43% Conversion</div>
                            </div>
                        </div>

                        {/* Funnel Item */}
                        <div className="relative mt-6">
                            <div className="flex justify-between items-center mb-2 px-4">
                                <span className="font-['Inter'] text-xs font-bold uppercase tracking-widest text-[var(--secondary)]">Offer Received</span>
                                <span className="font-['Inter'] text-sm text-[var(--on-surface)]">3 Offers</span>
                            </div>
                            <div className="h-10 w-[15%] mx-auto bg-[var(--secondary)] rounded-lg shadow-[0_0_15px_rgba(90,218,206,0.3)] flex items-center justify-center relative">
                                <Award className="text-[var(--on-secondary)] w-5 h-5 fill-current" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}