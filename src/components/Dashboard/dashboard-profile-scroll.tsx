import { useState, useEffect } from "react"
import { Trash2, PlusCircle, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import api from "@/api/api"
import { toast } from "sonner"
import { sanitizeString, sanitizeMultilineString, sanitizeArray } from "@/utils/sanitizer"
import { useDispatch } from "react-redux"
import { setProfile } from "../../store/slice/profileSlice"
import { useAppSelector } from "@/store/hooks"
import { type Dispatch, type SetStateAction } from "react";
import type { Education } from "@/types/education.type"
import type { WorkExperience } from "@/types/workExperience.type"
import type { Project } from "@/types/project.type"
import type { Skill } from "@/types/skill.type"
import type { Certification } from "@/types/certification.type"
import type { Achievement } from "@/types/achievement.type"
import type { Miscellaneous } from "@/types/miscellaneous.type"

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


interface BasicSectionProps {
    phoneNo: string;
    location: string;
    linkedIn: string;
    github: string;
    portfolio: string;

    setPhoneNo: Dispatch<SetStateAction<string>>;
    setLocation: Dispatch<SetStateAction<string>>;
    setLinkedIn: Dispatch<SetStateAction<string>>;
    setGithub: Dispatch<SetStateAction<string>>;
    setPortfolio: Dispatch<SetStateAction<string>>;
}


function BasicSection({
    phoneNo,
    location,
    linkedIn,
    github,
    portfolio,
    setPhoneNo,
    setLocation,
    setLinkedIn,
    setGithub,
    setPortfolio,
}: BasicSectionProps) {
    const [validPhoneNo, setValidPhoneNo] = useState(true);
    const [validLocation, setValidLocation] = useState(true);
    const [validLinkedIn, setValidLinkedIn] = useState(true);
    const [validGithub, setValidGithub] = useState(true);
    const [validPortfolio, setValidPortfolio] = useState(true);

    const PHONE_REGEX = /^[0-9]{10}$/;
    const URL_REGEX = /^https?:\/\/.+\..+/;
    const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/.+/;
    const GITHUB_REGEX = /^https?:\/\/(www\.)?github\.com\/.+/;



    // Validate the incoming value directly — not the stale state
    const handlePhoneChange = (value: string) => {
        setPhoneNo(value);
        setValidPhoneNo(value === "" || PHONE_REGEX.test(value));
    };

    const handleLocationChange = (value: string) => {
        setLocation(value);
        setValidLocation(value === "" || value.trim().length >= 2);
    };

    const handleLinkedInChange = (value: string) => {
        setLinkedIn(value);
        setValidLinkedIn(value === "" || LINKEDIN_REGEX.test(value));
    };

    const handleGithubChange = (value: string) => {
        setGithub(value);
        setValidGithub(value === "" || GITHUB_REGEX.test(value));
    };

    const handlePortfolioChange = (value: string) => {
        setPortfolio(value);
        setValidPortfolio(value === "" || URL_REGEX.test(value));
    };

    // Shared class builder so every input follows the same error styling
    const inputClass = (isValid: boolean) =>
        `w-full bg-[var(--surface-container)] border rounded-xl p-3 text-sm 
         focus:outline-none transition-colors text-white
         ${!isValid ? "border-red-600 focus:border-red-600" : "border-white/10 focus:border-[var(--secondary)]"}`;

    return (
        <div id="basic" className="bg-white space-y-6 w-full border border-gray-300 rounded-2xl p-8">
            <h1 className="font-bold text-xl">Basic Information :</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">
                        Phone Number *
                    </label>
                    <input
                        type="text"
                        className={inputClass(validPhoneNo)}
                        value={phoneNo || ""}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="Enter contact number"
                    />
                    {!validPhoneNo && <p className="text-red-600 text-xs">Phone number must be 10 digits.</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">
                        Location *
                    </label>
                    <input
                        type="text"
                        className={inputClass(validLocation)}
                        value={location || ""}
                        onChange={(e) => handleLocationChange(e.target.value)}
                        placeholder="City, Country"
                    />
                    {!validLocation && <p className="text-red-600 text-xs">Location seems too short.</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">
                        LinkedIn URL
                    </label>
                    <input
                        type="text"
                        className={inputClass(validLinkedIn)}
                        value={linkedIn || ""}
                        onChange={(e) => handleLinkedInChange(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                    />
                    {!validLinkedIn && <p className="text-red-600 text-xs">Enter a valid LinkedIn URL.</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">
                        GitHub URL
                    </label>
                    <input
                        type="text"
                        className={inputClass(validGithub)}
                        value={github || ""}
                        onChange={(e) => handleGithubChange(e.target.value)}
                        placeholder="https://github.com/username"
                    />
                    {!validGithub && <p className="text-red-600 text-xs">Enter a valid GitHub URL.</p>}
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">
                        Portfolio URL
                    </label>
                    <input
                        type="text"
                        className={inputClass(validPortfolio)}
                        value={portfolio || ""}
                        onChange={(e) => handlePortfolioChange(e.target.value)}
                        placeholder="https://portfolio.com"
                    />
                    {!validPortfolio && <p className="text-red-600 text-xs">Enter a valid portfolio URL.</p>}
                </div>

            </div>
        </div>
    );
}

interface EducationSectionProps {
    education : Education[], 
    setEducation : Dispatch<SetStateAction<any>>
}

function EducationSection( {education, setEducation } : EducationSectionProps)
{
    return(
        <div id="education" className=" bg-white space-y-6 mt-0 w-full border border-gray-300 rounded-2xl p-8 ">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Education History</h3>
                <Button 
                    type="button" 
                    onClick={() => setEducation([...education, { degree: "", fieldOfStudy: "", institution: "", location: "", startDate: "", endDate: "", gpa: "", content: "" }])}
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
                                    setEducation((prev : any)  =>
                                        prev.map((item : any, i : any) =>
                                            i === idx
                                                ? { ...item, institution: e.target.value }
                                                : item
                                        )
                                    );
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
                                    setEducation( (prev : any) => 
                                        prev.map( (item : any, i : any ) => 
                                            i===idx ? 
                                            { ...item, degree : e.target.value}
                                            : 
                                            item
                                        )
                                    );

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
                                    setEducation( (prev : any) => 
                                        prev.map( ( item : any, i : any ) => 
                                            i === idx ? 
                                                { ...item, fieldOfStudy : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setEducation( (prev : any) => 
                                        prev.map( ( item : any , i : any ) => 
                                            i === idx ? 
                                                { ...item, location : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setEducation( (prev : any) => 
                                        prev.map( ( item : any, i : any ) => 
                                            i === idx ? 
                                                { ...item, startDate : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setEducation( (prev : any) => 
                                        prev.map( ( item : any, i : any ) => 
                                            i === idx ? 
                                                { ...item, endDate : e.target.value}
                                            :
                                                item
                                        ))
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-[var(--on-surface-variant)]">CGPA / GPA</label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-white" 
                                value={edu.gpa} 
                                onChange={(e) => {
                                    setEducation( (prev : any) => 
                                        prev.map( ( item : any, i : any ) => 
                                            i === idx ? 
                                                { ...item, cgpa : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setEducation( (prev : any) => 
                                        prev.map( ( item : any, i : any ) => 
                                            i === idx ? 
                                                { ...item, content : e.target.value}
                                            :
                                                item
                                        ))
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

interface WorkExperienceSectionProps {
    workExperiences : WorkExperience[],
    setWorkExperiences : Dispatch<SetStateAction<any[]>>
}

function WorkExperienceSection( {workExperiences, setWorkExperiences} : WorkExperienceSectionProps) {
    return(
        <div id="workex" className=" bg-white space-y-6 mt-0 w-full border border-gray-300 rounded-2xl p-8 ">
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
            {
                workExperiences.length > 0 ?
                    workExperiences.map((work, idx) => (
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
                                            setWorkExperiences( (prev : any) => 
                                                prev.map( ( item : any , i : any ) => 
                                                    i === idx ? 
                                                        { ...item, company : e.target.value}
                                                    :
                                                        item
                                                ))
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
                                            setWorkExperiences( (prev : any) => 
                                                prev.map( ( item : any, i : any ) => 
                                                    i === idx ? 
                                                        { ...item, position : e.target.value}
                                                    :
                                                        item
                                                ))
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
                                            setWorkExperiences( (prev : any) => 
                                                prev.map( ( item : any, i : any ) => 
                                                    i === idx ? 
                                                        { ...item, location : e.target.value}
                                                    :
                                                        item
                                                ))
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-[var(--on-surface-variant)]">Job Type</label>
                                    <select 
                                        className="bg-[var(--surface-container-low)] border border-white/10 rounded-lg p-2.5 text-sm text-black " 
                                        value={work.type} 
                                        onChange={(e) => {
                                            setWorkExperiences( (prev : any) => 
                                                prev.map( ( item : any, i : any ) => 
                                                    i === idx ? 
                                                        { ...item, type : e.target.value}
                                                    :
                                                        item
                                                ))
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
                                            setWorkExperiences( (prev : any) => 
                                                prev.map( ( item : any, i : any ) => 
                                                    i === idx ? 
                                                        { ...item, startDate : e.target.value}
                                                    :
                                                        item
                                                ))
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
                                            setWorkExperiences( (prev : any) => 
                                                prev.map( ( item : any, i : any ) => 
                                                    i === idx ? 
                                                        { ...item, endDate : e.target.value}
                                                    :
                                                        item
                                                ))
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
                                            setWorkExperiences( (prev : any) => 
                                                prev.map( ( item : any, i : any ) => 
                                                    i === idx ? 
                                                        { ...item, responsibilities : e.target.value}
                                                    :
                                                        item
                                                ))
                                        }}
                                        placeholder="Write bullet points or descriptions of responsibilities..."
                                    />
                                </div>
                            </div>
                        </div>
                ))
                :
                <div className="empty">
                    <h1> No Work Experiences added. </h1>
                </div>
            }
        </div>
    )
}

interface ProjectSectionProps {
    projects : Project[],
    setProjects : Dispatch<SetStateAction<any> >
}

function ProjectSection( {projects, setProjects} : ProjectSectionProps ) {
    return(
        <div id="projects" className=" bg-white space-y-6 mt-0 w-full border  border-gray-300 rounded-2xl p-8 ">
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
            {
                projects.length > 0 ?
                projects.map((proj, idx) => (
                    <div key={idx} className="bg-[var(--surface-container)] border border-white/5 p-6 rounded-xl relative space-y-4">
                    <button 
                        onClick={() => { setProjects((prev : any) => prev.filter((_ : any, i : any) => i !== idx)
                );
            }}
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
                                    setProjects( (prev : any) => 
                                        prev.map( ( item : any, i : any ) => 
                                            i === idx ? 
                                                { ...item, title : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setProjects( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, tech_stack : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setProjects( (prev: any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, github_link : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setProjects( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, live_link : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setProjects( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, description : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setProjects( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, features : e.target.value}
                                            :
                                                item
                                        ))
                                }}
                            />
                        </div>
                    </div>
                    </div>
                ))
                :
                <div className="empty">
                    <h1> No Projects added. </h1>
                </div>
            }
        </div>
    )
}

interface SkillsSectionprops {
    skills : Skill[],
    setSkills : Dispatch<SetStateAction<any>>
}

function SkillsSection( {skills, setSkills } : SkillsSectionprops ) {
    return(
        <div id="skills" className=" bg-white space-y-6 mt-0 w-full border  border-gray-300 rounded-2xl p-8 ">
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
            {
                skills.length > 0 ?
                    skills.map((skill, idx) => (
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
                                        setSkills( (prev : any) => 
                                            prev.map( ( item: any, i: any ) => 
                                                i === idx ? 
                                                    { ...item, category : e.target.value}
                                                :
                                                    item
                                            ))
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
                                        setSkills( (prev : any) => 
                                            prev.map( ( item: any, i: any ) => 
                                                i === idx ? 
                                                    { ...item, name : e.target.value}
                                                :
                                                    item
                                            ))
                                    }}
                                    placeholder="JavaScript, TypeScript, Python"
                                />
                            </div>
                        </div>
                    </div>
                ))
                :
                <div className="empty">
                    <h1> No Skills added. </h1>
                </div>
            }
        </div>
    )
}

interface CertificationsSectionProps {
    certifications : Certification[],
    setCertifications : Dispatch<SetStateAction<any> >
}

function CertificationsSection( {certifications, setCertifications } : CertificationsSectionProps ) {
    return(
        <div id="certifications" className=" bg-white space-y-6 mt-0 w-full border  border-gray-300 rounded-2xl p-8 ">
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
            {certifications.length > 0 ? certifications.map((cert, idx) => (
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
                                    setCertifications( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, title : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setCertifications( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, issuer : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setCertifications( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, issueDate : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setCertifications( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, url : e.target.value}
                                            :
                                                item
                                        ))
                                }}
                            />
                        </div>
                    </div>
                </div>
                ))
                :
                <div className="empty border border-gray-300 bg-gray-200 p-8 rounded-2xl items-center flex justify-center">
                    <h1 className="text-gray-500"> No Certifications added. </h1>
                </div>
            }
        </div>
    )
}

interface AchievementsSectionProps {
    achievements : Achievement[],
    setAchievements : Dispatch<SetStateAction<any>>
}

function AchievementsSection( { achievements, setAchievements} : AchievementsSectionProps ) {
    return(
         <div id="achievements" className=" bg-white space-y-6 mt-0 w-full border  border-gray-300 rounded-2xl p-8 ">
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
            {achievements.length > 0 ? achievements.map((ach, idx) => (
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
                                    setAchievements( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, title : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setAchievements( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, issue_date : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setAchievements( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, url : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setAchievements( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, description : e.target.value}
                                            :
                                                item
                                        ))
                                }}
                            />
                        </div>
                    </div>
                </div>
                ))
                :
                <div className="empty border border-gray-300 bg-gray-200 p-8 rounded-2xl items-center flex justify-center">
                    <h1 className="text-gray-500"> No Achievements added. </h1>
                </div>
            }
        </div>
    )
}

interface MiscellaneousSectionProps { 
    miscellaneous : Miscellaneous[],
    setMiscellaneous : Dispatch<SetStateAction<any> >
}

function MiscellaneousSection( { miscellaneous, setMiscellaneous } : MiscellaneousSectionProps ) {
    return(
        <div id="misc" className=" bg-white space-y-6 mt-0 w-full border border-gray-300 rounded-2xl p-8 ">
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
            {
                miscellaneous.length > 0 ?
                miscellaneous.map((misc, idx) => (
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
                                    setMiscellaneous( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, name : e.target.value}
                                            :
                                                item
                                        ))
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
                                    setMiscellaneous( (prev : any) => 
                                        prev.map( ( item: any, i: any ) => 
                                            i === idx ? 
                                                { ...item, description : e.target.value}
                                            :
                                                item
                                        ))
                                }}
                            />
                        </div>
                    </div>
                </div>
                ))
                :
                <div className="empty border border-gray-300 bg-gray-200 p-8 rounded-2xl items-center flex justify-center">
                    <h1 className="text-gray-500"> No Miscellaneous added. </h1>
                </div>
            }
        </div>
    )
}



export default function ProfileBuilderScroll() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const profile = useAppSelector( (state) => state.profile.profile )
    
    // States
    const [phoneNo, setPhoneNo] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [linkedIn, setLinkedIn] = useState<string>("");
    const [github, setGithub] = useState<string>("");
    const [portfolio, setPortfolio]= useState<string>("");

    const [education, setEducation] = useState<Education[]>([]);
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
                let d;
                if( profile !== null ) 
                    d = profile;
                else {
                    const response = await api.get( "/profile/get" )
                    if( response.success ) 
                        d = response.data;
                    else 
                        return;
                    dispatch( setProfile( d ) )
                }
                setPhoneNo( d?.profile?.phoneNo || "" );
                setLocation( d?.profile?.location || "" );
                setLinkedIn( d?.profile?.linkedIn || "" );
                setGithub( d?.profile?.github || "" );
                setPortfolio( d?.profile?.portfolio || "" );
                setEducation(d.education || []);
                setProjects(d.projects || []);
                setWorkExperiences(d.workExperiences || []);
                setCertifications(d.certifications || []);
                setSkills(d.skills || []);
                setAchievements(d.achievements || []);
                setMiscellaneous(d.miscellaneous || []);
            }
        catch (e: any) {
            console.error("Error fetching profile:", e);
            toast.error(e.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!phoneNo || phoneNo.trim() === "" ) {
            return toast.error("Phone number is required");
        }
        if (!location || location.trim() === "" ) {
            return toast.error("Location is required");
        }

        setLoading(true);
        try {
            const isUpdate = !!profile?.profile._id;


            // Sanitize basic profile
            const sanitizedBasic = {
                phoneNo: sanitizeString(phoneNo),
                location: sanitizeString(location),
                linkedIn: sanitizeString(linkedIn),
                github: sanitizeString(github),
                portfolio: sanitizeString(portfolio),
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
                    certifications: sanitizedCerts,
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
                    projects: sanitizedProjects,
                    certifications: sanitizedCerts,
                    education: sanitizedEducation,
                    skills: sanitizedSkills,
                    achievements: sanitizedAchievements,
                    miscellaneous: sanitizedMisc
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
        <div className="profile-builder-clean flex flex-col gap-5 w-full p-8 pb-24 bg-gray-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="font-['Satoshi'] text-4xl font-bold text-[var(--on-surface)] mb-2">Master Profile</h2>
                    <p className="text-[var(--on-surface-variant)] font-['Inter'] text-lg">Construct your definitive career narrative</p>
                </div>
            </div>

            <main className="w-full flex flex-col gap-4 border-0">

                    {/* Basic Info */}
                    <BasicSection phoneNo={phoneNo} location={location} github={github} linkedIn={linkedIn} portfolio={portfolio}
                        setPhoneNo={setPhoneNo} setLocation={setLocation} setGithub={setGithub} setLinkedIn={setLinkedIn} setPortfolio={setPortfolio}
                    />

                    {/* Education */}
                    <EducationSection education={education} setEducation={setEducation}/>

                    {/* Work Experience */}
                    <WorkExperienceSection workExperiences={workExperiences} setWorkExperiences={setWorkExperiences}/>

                    {/* Projects */}
                    <ProjectSection projects={projects} setProjects={setProjects}/>

                    {/* Skills */}
                    <SkillsSection skills={skills} setSkills={setSkills}/>

                    {/* Certifications */}
                    <CertificationsSection certifications={certifications} setCertifications={setCertifications} />

                    {/* Achievements */}
                    <AchievementsSection achievements={achievements} setAchievements={setAchievements}/>

                    {/* Miscellaneous */}
                    <MiscellaneousSection miscellaneous={miscellaneous} setMiscellaneous={setMiscellaneous}/>
            </main>

            <div className="submit flex flex-col justify-center items-center">
                <Button 
                    onClick={handleSave} 
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[#050f19] font-semibold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(189,194,255,0.3)] transition-all active:scale-[0.98]"
                >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Profile"}
                </Button>
            </div>
        </div>
    );
}
