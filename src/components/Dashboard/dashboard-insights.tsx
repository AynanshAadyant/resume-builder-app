import {
    MousePointerClick,
    TrendingUp
} from "lucide-react"
import { useState, useEffect } from "react"
import api from "@/api/api"
import { useAppSelector } from "@/store/hooks";

export default function Insights() {
    const [profileStrength, setProfileStrength] = useState(84);
    const [keywords, setKeywords] = useState<string[]>([""]);
    const [skills, setSkills] = useState<string[]>([""]);
    const profile = useAppSelector((state) => state.profile.profile)
    const [averageATS, setAverageATS] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //fetching profile and calculating strength
                const profileRes = profile
                if (profileRes) {
                    const data = profileRes;
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

                const jdsRes = await api.get("/jd");
                if (jdsRes.success && jdsRes.data) {
                    console.log(jdsRes.data)
                    const extractedKeywords: string[] = [];
                    jdsRes.data.forEach((jd: any) => {
                        console.log(jd.parsedText.skills)
                        if (jd.parsedText && Array.isArray(jd.parsedText.skills)) {
                            extractedKeywords.push(...jd.parsedText.skills.required);
                        }
                    });
                    setKeywords(extractedKeywords)
                }
                console.log(keywords);

                const resumes = await api.get('/resume/')
                if (resumes.success && resumes.resumes) {
                    const allResumes = resumes.resumes;
                    console.log(allResumes)
                    const extractedSkills: string[] = [];
                    let totalATS = 0;
                    allResumes.forEach((resume: any) => {
                        if (resume.skills && Array.isArray(resume.skills)) {
                            resume.skills.forEach((skillCategory: any) => {
                                if (Array.isArray(skillCategory.values)) {
                                    extractedSkills.push(...skillCategory.values);
                                }
                            });
                        }
                    })
                    console.log(totalATS)
                    const avg = totalATS / allResumes.length;

                    if (extractedSkills.length > 0) {
                        const uniqueKeywords = Array.from(new Set(
                            extractedSkills.map(k => k.trim()).filter(Boolean)
                        ));
                        if (uniqueKeywords.length > 3) {
                            setSkills(uniqueKeywords.slice(0, 15));
                        }
                    }
                    setAverageATS(avg);
                    console.log(averageATS)
                }
            } catch (err) {
                console.error("Error loading insights data:", err);
            }
        };
        fetchData();
    }, []);

    const KeywordPill = ({ keyword, index }: { keyword: string; index: number }) => {
        const colorClasses = [
            "bg-cyan-50 text-cyan-700 border-cyan-100",
            "bg-emerald-50 text-emerald-700 border-emerald-100",
            "bg-amber-50 text-amber-700 border-amber-100",
            "bg-slate-50 text-slate-700 border-slate-200",
        ];

        return (
            <span className={`rounded-lg border px-3 py-2 text-sm font-medium ${colorClasses[index % colorClasses.length]}`} key={index}>
                {keyword}
            </span>
        );
    };

    return (
        <div className="mx-auto w-full max-w-[1180px] pb-12">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h2 className="font-['Satoshi'] text-3xl font-bold text-slate-950">Insights</h2>
                    <p className="mt-2 font-['Inter'] text-base text-slate-500">Performance mapping, keyword demand, and resume readiness.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-5">
                <div className="profile-strength col-span-12 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-4">
                    <div className=" flex items-start justify-between">
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Profile Strength</p>
                            <h3 className="font-['Satoshi'] text-5xl font-bold text-slate-950">{profileStrength}<span className="text-xl text-slate-500">%</span></h3>
                        </div>
                        <div className="rounded-lg bg-cyan-50 p-2 text-cyan-700">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-cyan-600" style={{ width: `${profileStrength}%` }}></div>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Based on master profile completion.</p>
                </div>

                <div className="average-ats col-span-12 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase text-slate-400"> Average ATS Score</p>
                            <h3 className="font-['Satoshi'] text-5xl font-bold text-emerald-700">{averageATS} <span className="text-xl text-slate-500">%</span></h3>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                            <MousePointerClick className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-6 flex items-end gap-1">
                        {[40, 60, 50, 80, 100].map((height, index) => (
                            <div key={index} className="w-3 rounded-t bg-emerald-200" style={{ height: `${height / 3}px` }} />
                        ))}
                        <p className="ml-3 text-sm font-bold text-emerald-700">14 Leads</p>
                    </div>
                </div>

                <div className="strong-skills col-span-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4">
                    <h4 className="font-['Satoshi'] text-xl font-bold text-slate-950">Strong Points : </h4>
                    <p className="mt-2 text-sm text-slate-500">Top skills showing up your resumes :</p>

                    <div className="mt-6 space-y-2 flex flex-wrap gap-3">
                        {
                            skills.length > 0
                                ?
                                skills.map((keyword, index) =>
                                    <KeywordPill keyword={keyword} index={index} />
                                )
                                :
                                <p> Generate Resumes to see skills</p>
                        }
                    </div>
                </div>

                <div className="ats-trend-chart col-span-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-8">
                    <div className="mb-10 flex items-center justify-between">
                        <h4 className="font-['Satoshi'] text-xl font-bold text-slate-950">ATS Score Trends</h4>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase text-slate-400">
                                <span className="h-2 w-2 rounded-full bg-cyan-600"></span> Your Score
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase text-slate-400">
                                <span className="h-2 w-2 rounded-full bg-slate-300"></span> Market Avg
                            </span>
                        </div>
                    </div>
                    <div className="relative h-64 w-full">
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {[0, 1, 2, 3, 4].map((line) => (
                                <div key={line} className="h-0 w-full border-t border-slate-100"></div>
                            ))}
                        </div>
                        <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
                            <path className="text-slate-300" d="M0,160 Q100,150 200,170 T400,165 T600,155 T800,160" fill="none" stroke="currentColor" strokeWidth="2"></path>
                            <path className="text-cyan-600" d="M0,180 Q100,140 200,120 T400,110 T600,60 T800,40" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <circle className="fill-cyan-600" cx="800" cy="40" r="4"></circle>
                        </svg>
                        <div className="absolute -bottom-8 flex w-full justify-between px-4 text-[10px] font-semibold uppercase text-slate-400">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
