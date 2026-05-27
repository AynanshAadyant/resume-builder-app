import { useState, useEffect } from "react"
import { Trash2, PlusCircle, Save } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import api from "@/api/api"
import { toast } from "sonner"
import { sanitizeString, sanitizeMultilineString, sanitizeArray } from "@/utils/sanitizer"
import { useDispatch } from "react-redux"
import { setProfile } from "../../store/slice/profileSlice"

export default function ProfileBuilder() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    
    // States
    const [basicInfo, setBasicInfo] = useState<any>({
        phoneNo: "",
        location: "",
        linkedIn: "",
        github: "",
        portfolio: ""
    });
    const [education, setEducation] = useState<any[]>([]);
    const [workExperiences, setWorkExperiences] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [certifications, setCertifications] = useState<any[]>([]);
    const [achievements, setAchievements] = useState<any[]>([]);
    const [miscellaneous, setMiscellaneous] = useState<any[]>([]);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get("/profile/get");
            if (response.success && response.data) {
                dispatch( setProfile( response.data ))
                const d = response.data;
                if (d.profile) {
                    setBasicInfo(d.profile);
                }
                setEducation(d.education || []);
                setProjects(d.projects || []);
                setWorkExperiences(d.workExperiences || []);
                setCertifications(d.certifications || []);
                setSkills(d.skills || []);
                setAchievements(d.achievements || []);
                setMiscellaneous(d.miscellaneous || []);
            }
        } catch (e: any) {
            console.error("Error fetching profile:", e);
            toast.error(e.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const formatDateForInput = (dateString: any) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split("T")[0];
        } catch {
            return "";
        }
    };

    const handleSave = async () => {
        if (!basicInfo.phoneNo) {
            return toast.error("Phone number is required");
        }
        if (!basicInfo.location) {
            return toast.error("Location is required");
        }

        setLoading(true);
        try {
            const isUpdate = !!basicInfo._id;

            // Sanitize basic profile
            const sanitizedBasic = {
                phoneNo: Number(basicInfo.phoneNo) || 0,
                location: sanitizeString(basicInfo.location),
                linkedIn: sanitizeString(basicInfo.linkedIn),
                github: sanitizeString(basicInfo.github),
                portfolio: sanitizeString(basicInfo.portfolio),
            };

            // Sanitize lists
            const sanitizedWork = workExperiences.map((w: any) => ({
                ...(w._id ? { _id: w._id } : {}),
                company: sanitizeString(w.company),
                position: sanitizeString(w.position),
                location: sanitizeString(w.location),
                startDate: w.startDate || new Date().toISOString(),
                endDate: w.endDate || new Date().toISOString(),
                type: w.type || "full-time",
                responsibilities: sanitizeMultilineString(w.responsibilities)
            }));

            const sanitizedProjects = projects.map((p: any) => ({
                ...(p._id ? { _id: p._id } : {}),
                title: sanitizeString(p.title),
                tech_stack: Array.isArray(p.tech_stack) 
                    ? sanitizeArray(p.tech_stack) 
                    : sanitizeArray(String(p.tech_stack || "").split(",")),
                description: sanitizeMultilineString(p.description),
                startDate: p.startDate || new Date().toISOString(),
                endDate: p.endDate || new Date().toISOString(),
                features: sanitizeMultilineString(p.features),
                github_link: sanitizeString(p.github_link),
                live_link: sanitizeString(p.live_link)
            }));

            const sanitizedEducation = education.map((e: any) => ({
                ...(e._id ? { _id: e._id } : {}),
                degree: sanitizeString(e.degree),
                fieldOfStudy: sanitizeString(e.fieldOfStudy),
                institution: sanitizeString(e.institution),
                location: sanitizeString(e.location),
                startDate: e.startDate || new Date().toISOString(),
                endDate: e.endDate || new Date().toISOString(),
                cgpa: Number(e.cgpa) || 0,
                content: sanitizeMultilineString(e.content)
            }));

            const sanitizedSkills = skills.map((s: any) => ({
                ...(s._id ? { _id: s._id } : {}),
                category: sanitizeString(s.category),
                name: sanitizeString(s.name)
            }));

            const sanitizedCerts = certifications.map((c: any) => ({
                ...(c._id ? { _id: c._id } : {}),
                title: sanitizeString(c.title),
                issuer: sanitizeString(c.issuer),
                issueDate: c.issueDate || new Date().toISOString(),
                url: sanitizeString(c.url)
            }));

            const sanitizedAchievements = achievements.map((a: any) => ({
                ...(a._id ? { _id: a._id } : {}),
                title: sanitizeString(a.title),
                description: sanitizeMultilineString(a.description),
                issue_date: a.issue_date || new Date().toISOString(),
                url: sanitizeString(a.url)
            }));

            const sanitizedMisc = miscellaneous.map((m: any) => ({
                ...(m._id ? { _id: m._id } : {}),
                name: sanitizeString(m.name),
                description: sanitizeMultilineString(m.description)
            }));

            let response;
            if (isUpdate) {
                const payload = {
                    ...sanitizedBasic,
                    workExperiences: sanitizedWork,
                    projects: sanitizedProjects,
                    certs: sanitizedCerts,
                    education: sanitizedEducation,
                    skills: sanitizedSkills,
                    achievements: sanitizedAchievements,
                    miscellaneous: sanitizedMisc
                };
                response = await api.put("/profile/update", payload);
            } else {
                const payload = {
                    ...sanitizedBasic,
                    workExperiences: sanitizedWork,
                    Projects: sanitizedProjects,
                    Certifications: sanitizedCerts,
                    Education: sanitizedEducation,
                    Skills: sanitizedSkills,
                    Achievements: sanitizedAchievements,
                    Miscellanous: sanitizedMisc
                };
                response = await api.post("/profile/create", payload);
            }

            if (response.success) {
                toast.success(response.message || "Profile saved successfully!");
                fetchProfile();
            } else {
                toast.error(response.message || "Failed to save profile");
            }
        } catch (err: any) {
            console.error("Save error:", err);
            toast.error(err?.message || "An error occurred while saving profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[1000px] mx-auto pb-24 text-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h2 className="font-['Satoshi'] text-4xl font-bold text-[var(--on-surface)] mb-2">Master Profile</h2>
                    <p className="text-[var(--on-surface-variant)] font-['Inter'] text-lg">Construct your definitive career narrative</p>
                </div>
                <Button 
                    onClick={handleSave} 
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[#050f19] font-semibold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(189,194,255,0.3)] transition-all active:scale-[0.98]"
                >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Profile"}
                </Button>
            </div>

            <main className="bg-[var(--surface-container-low)] border border-white/5 rounded-xl p-8">
                <Tabs defaultValue="basic" className="w-full">
                    <div className="border-b border-white/5 mb-8">
                        <TabsList className="bg-transparent h-auto p-0 flex gap-6 justify-start overflow-x-auto">
                            {["basic", "education", "workex", "projects", "skills", "certifications", "achievements", "misc"].map((tab) => (
                                <TabsTrigger 
                                    key={tab}
                                    value={tab} 
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--primary)] text-[var(--on-surface-variant)] font-semibold text-xs uppercase tracking-widest pb-4 px-2 hover:text-white"
                                >
                                    {tab === "workex" ? "Work Experience" : tab === "misc" ? "Miscellaneous" : tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Basic Info */}
                    <TabsContent value="basic" className="space-y-6 mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Phone Number *</label>
                                <input 
                                    type="number"
                                    className="w-full bg-[var(--surface-container)] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--secondary)] transition-colors text-white"
                                    value={basicInfo.phoneNo || ""}
                                    onChange={(e) => setBasicInfo({ ...basicInfo, phoneNo: e.target.value })}
                                    placeholder="Enter contact number"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Location *</label>
                                <input 
                                    type="text"
                                    className="w-full bg-[var(--surface-container)] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--secondary)] transition-colors text-white"
                                    value={basicInfo.location || ""}
                                    onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
                                    placeholder="City, Country"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">LinkedIn URL</label>
                                <input 
                                    type="text"
                                    className="w-full bg-[var(--surface-container)] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--secondary)] transition-colors text-white"
                                    value={basicInfo.linkedIn || ""}
                                    onChange={(e) => setBasicInfo({ ...basicInfo, linkedIn: e.target.value })}
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">GitHub URL</label>
                                <input 
                                    type="text"
                                    className="w-full bg-[var(--surface-container)] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--secondary)] transition-colors text-white"
                                    value={basicInfo.github || ""}
                                    onChange={(e) => setBasicInfo({ ...basicInfo, github: e.target.value })}
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Portfolio URL</label>
                                <input 
                                    type="text"
                                    className="w-full bg-[var(--surface-container)] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--secondary)] transition-colors text-white"
                                    value={basicInfo.portfolio || ""}
                                    onChange={(e) => setBasicInfo({ ...basicInfo, portfolio: e.target.value })}
                                    placeholder="https://portfolio.com"
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* Education */}
                    <TabsContent value="education" className="space-y-6 mt-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Education History</h3>
                            <Button 
                                type="button" 
                                onClick={() => setEducation([...education, { degree: "", fieldOfStudy: "", institution: "", location: "", startDate: "", endDate: "", cgpa: "", content: "" }])}
                                className="flex items-center gap-2 text-xs bg-[var(--secondary)] hover:bg-[#4bc2b7] text-[#050f19]"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Education
                            </Button>
                        </div>
                        {education.map((edu, idx) => (
                            <div key={idx} className="bg-[var(--surface-container)] border border-white/5 p-6 rounded-xl relative space-y-4">
                                <button 
                                    onClick={() => setEducation(education.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Institution</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={edu.institution} 
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[idx].institution = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Degree</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={edu.degree} 
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[idx].degree = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Field of Study</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={edu.fieldOfStudy} 
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[idx].fieldOfStudy = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Location</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={edu.location} 
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[idx].location = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Start Date</label>
                                        <input 
                                            type="date" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={formatDateForInput(edu.startDate)} 
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[idx].startDate = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">End Date</label>
                                        <input 
                                            type="date" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={formatDateForInput(edu.endDate)} 
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[idx].endDate = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">CGPA / GPA</label>
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={edu.cgpa} 
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[idx].cgpa = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 md:col-span-2">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Additional Notes</label>
                                        <textarea 
                                            rows={2}
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white resize-none" 
                                            value={edu.content || ""} 
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[idx].content = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    {/* Work Experience */}
                    <TabsContent value="workex" className="space-y-6 mt-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Employment History</h3>
                            <Button 
                                type="button" 
                                onClick={() => setWorkExperiences([...workExperiences, { company: "", position: "", location: "", startDate: "", endDate: "", type: "full-time", responsibilities: "" }])}
                                className="flex items-center gap-2 text-xs bg-[var(--secondary)] hover:bg-[#4bc2b7] text-[#050f19]"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Experience
                            </Button>
                        </div>
                        {workExperiences.map((work, idx) => (
                            <div key={idx} className="bg-[var(--surface-container)] border border-white/5 p-6 rounded-xl relative space-y-4">
                                <button 
                                    onClick={() => setWorkExperiences(workExperiences.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Company</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={work.company} 
                                            onChange={(e) => {
                                                const newWork = [...workExperiences];
                                                newWork[idx].company = e.target.value;
                                                setWorkExperiences(newWork);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Position</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={work.position} 
                                            onChange={(e) => {
                                                const newWork = [...workExperiences];
                                                newWork[idx].position = e.target.value;
                                                setWorkExperiences(newWork);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Location</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={work.location} 
                                            onChange={(e) => {
                                                const newWork = [...workExperiences];
                                                newWork[idx].location = e.target.value;
                                                setWorkExperiences(newWork);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Job Type</label>
                                        <select 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={work.type} 
                                            onChange={(e) => {
                                                const newWork = [...workExperiences];
                                                newWork[idx].type = e.target.value;
                                                setWorkExperiences(newWork);
                                            }}
                                        >
                                            <option value="full-time">Full-Time</option>
                                            <option value="part-time">Part-Time</option>
                                            <option value="contract">Contract</option>
                                            <option value="internship">Internship</option>
                                            <option value="freelance">Freelance</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Start Date</label>
                                        <input 
                                            type="date" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={formatDateForInput(work.startDate)} 
                                            onChange={(e) => {
                                                const newWork = [...workExperiences];
                                                newWork[idx].startDate = e.target.value;
                                                setWorkExperiences(newWork);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">End Date</label>
                                        <input 
                                            type="date" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={formatDateForInput(work.endDate)} 
                                            onChange={(e) => {
                                                const newWork = [...workExperiences];
                                                newWork[idx].endDate = e.target.value;
                                                setWorkExperiences(newWork);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 md:col-span-2">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Responsibilities (Paste or write details)</label>
                                        <textarea 
                                            rows={4}
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white resize-none" 
                                            value={work.responsibilities} 
                                            onChange={(e) => {
                                                const newWork = [...workExperiences];
                                                newWork[idx].responsibilities = e.target.value;
                                                setWorkExperiences(newWork);
                                            }}
                                            placeholder="Write bullet points or descriptions of responsibilities..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    {/* Projects */}
                    <TabsContent value="projects" className="space-y-6 mt-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Projects</h3>
                            <Button 
                                type="button" 
                                onClick={() => setProjects([...projects, { title: "", tech_stack: "", description: "", startDate: "", endDate: "", features: "", github_link: "", live_link: "" }])}
                                className="flex items-center gap-2 text-xs bg-[var(--secondary)] hover:bg-[#4bc2b7] text-[#050f19]"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Project
                            </Button>
                        </div>
                        {projects.map((proj, idx) => (
                            <div key={idx} className="bg-[var(--surface-container)] border border-white/5 p-6 rounded-xl relative space-y-4">
                                <button 
                                    onClick={() => setProjects(projects.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Project Title</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={proj.title} 
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[idx].title = e.target.value;
                                                setProjects(newProj);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Tech Stack (comma separated)</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={Array.isArray(proj.tech_stack) ? proj.tech_stack.join(", ") : proj.tech_stack} 
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[idx].tech_stack = e.target.value;
                                                setProjects(newProj);
                                            }}
                                            placeholder="React, Express, MongoDB"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">GitHub Link</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={proj.github_link || ""} 
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[idx].github_link = e.target.value;
                                                setProjects(newProj);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Live Link</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={proj.live_link || ""} 
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[idx].live_link = e.target.value;
                                                setProjects(newProj);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 md:col-span-2">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Description</label>
                                        <textarea 
                                            rows={2}
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white resize-none" 
                                            value={proj.description} 
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[idx].description = e.target.value;
                                                setProjects(newProj);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 md:col-span-2">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Key Features</label>
                                        <textarea 
                                            rows={2}
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white resize-none" 
                                            value={proj.features} 
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[idx].features = e.target.value;
                                                setProjects(newProj);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    {/* Skills */}
                    <TabsContent value="skills" className="space-y-6 mt-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Skills</h3>
                            <Button 
                                type="button" 
                                onClick={() => setSkills([...skills, { category: "", name: "" }])}
                                className="flex items-center gap-2 text-xs bg-[var(--secondary)] hover:bg-[#4bc2b7] text-[#050f19]"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Skill Category
                            </Button>
                        </div>
                        {skills.map((skill, idx) => (
                            <div key={idx} className="bg-[var(--surface-container)] border border-white/5 p-6 rounded-xl relative space-y-4">
                                <button 
                                    onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Category</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={skill.category} 
                                            onChange={(e) => {
                                                const newSkills = [...skills];
                                                newSkills[idx].category = e.target.value;
                                                setSkills(newSkills);
                                            }}
                                            placeholder="Languages, Libraries, Tools"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Skill Names</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={skill.name} 
                                            onChange={(e) => {
                                                const newSkills = [...skills];
                                                newSkills[idx].name = e.target.value;
                                                setSkills(newSkills);
                                            }}
                                            placeholder="JavaScript, TypeScript, Python"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    {/* Certifications */}
                    <TabsContent value="certifications" className="space-y-6 mt-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Certifications</h3>
                            <Button 
                                type="button" 
                                onClick={() => setCertifications([...certifications, { title: "", issuer: "", issueDate: "", url: "" }])}
                                className="flex items-center gap-2 text-xs bg-[var(--secondary)] hover:bg-[#4bc2b7] text-[#050f19]"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Certification
                            </Button>
                        </div>
                        {certifications.map((cert, idx) => (
                            <div key={idx} className="bg-[var(--surface-container)] border border-white/5 p-6 rounded-xl relative space-y-4">
                                <button 
                                    onClick={() => setCertifications(certifications.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Certification Title</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={cert.title} 
                                            onChange={(e) => {
                                                const newCerts = [...certifications];
                                                newCerts[idx].title = e.target.value;
                                                setCertifications(newCerts);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Issuer</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={cert.issuer} 
                                            onChange={(e) => {
                                                const newCerts = [...certifications];
                                                newCerts[idx].issuer = e.target.value;
                                                setCertifications(newCerts);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Issue Date</label>
                                        <input 
                                            type="date" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={formatDateForInput(cert.issueDate)} 
                                            onChange={(e) => {
                                                const newCerts = [...certifications];
                                                newCerts[idx].issueDate = e.target.value;
                                                setCertifications(newCerts);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Credential URL</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={cert.url || ""} 
                                            onChange={(e) => {
                                                const newCerts = [...certifications];
                                                newCerts[idx].url = e.target.value;
                                                setCertifications(newCerts);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    {/* Achievements */}
                    <TabsContent value="achievements" className="space-y-6 mt-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Achievements</h3>
                            <Button 
                                type="button" 
                                onClick={() => setAchievements([...achievements, { title: "", description: "", issue_date: "", url: "" }])}
                                className="flex items-center gap-2 text-xs bg-[var(--secondary)] hover:bg-[#4bc2b7] text-[#050f19]"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Achievement
                            </Button>
                        </div>
                        {achievements.map((ach, idx) => (
                            <div key={idx} className="bg-[var(--surface-container)] border border-white/5 p-6 rounded-xl relative space-y-4">
                                <button 
                                    onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Achievement Title</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={ach.title} 
                                            onChange={(e) => {
                                                const newAchs = [...achievements];
                                                newAchs[idx].title = e.target.value;
                                                setAchievements(newAchs);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Issue Date</label>
                                        <input 
                                            type="date" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={formatDateForInput(ach.issue_date)} 
                                            onChange={(e) => {
                                                const newAchs = [...achievements];
                                                newAchs[idx].issue_date = e.target.value;
                                                setAchievements(newAchs);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Verification URL</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={ach.url || ""} 
                                            onChange={(e) => {
                                                const newAchs = [...achievements];
                                                newAchs[idx].url = e.target.value;
                                                setAchievements(newAchs);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 md:col-span-2">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Description</label>
                                        <textarea 
                                            rows={3}
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white resize-none" 
                                            value={ach.description} 
                                            onChange={(e) => {
                                                const newAchs = [...achievements];
                                                newAchs[idx].description = e.target.value;
                                                setAchievements(newAchs);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    {/* Miscellaneous */}
                    <TabsContent value="misc" className="space-y-6 mt-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Miscellaneous Sections</h3>
                            <Button 
                                type="button" 
                                onClick={() => setMiscellaneous([...miscellaneous, { name: "", description: "" }])}
                                className="flex items-center gap-2 text-xs bg-[var(--secondary)] hover:bg-[#4bc2b7] text-[#050f19]"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Section
                            </Button>
                        </div>
                        {miscellaneous.map((misc, idx) => (
                            <div key={idx} className="bg-[var(--surface-container)] border border-white/5 p-6 rounded-xl relative space-y-4">
                                <button 
                                    onClick={() => setMiscellaneous(miscellaneous.filter((_, i) => i !== idx))}
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1 md:col-span-2">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Section Name</label>
                                        <input 
                                            type="text" 
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                            value={misc.name} 
                                            onChange={(e) => {
                                                const newMisc = [...miscellaneous];
                                                newMisc[idx].name = e.target.value;
                                                setMiscellaneous(newMisc);
                                            }}
                                            placeholder="Languages Spoken, Interests, Extra Curriculars"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 md:col-span-2">
                                        <label className="text-xs text-[var(--on-surface-variant)]">Description</label>
                                        <textarea 
                                            rows={3}
                                            className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white resize-none" 
                                            value={misc.description || ""} 
                                            onChange={(e) => {
                                                const newMisc = [...miscellaneous];
                                                newMisc[idx].description = e.target.value;
                                                setMiscellaneous(newMisc);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}