export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Profile {
    _id?: string;
    user?: string | User;
    phoneNo: number | string;
    location: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface WorkExperience {
    _id?: string;
    company: string;
    position: string;
    location: string;
    startDate: string | Date;
    endDate: string | Date;
    type: "full-time" | "part-time" | "contract" | "internship" | "freelance" | "other";
    responsibilities: string;
    user?: string | User;
}

export interface Education {
    _id?: string;
    degree: string;
    fieldOfStudy: string;
    institution: string;
    location: string;
    startDate: string | Date;
    endDate: string | Date;
    cgpa: number | string;
    content?: string;
    user?: string | User;
}

export interface Project {
    _id?: string;
    title: string;
    tech_stack: string[];
    description: string;
    startDate: string | Date;
    endDate: string | Date;
    features: string;
    github_link?: string;
    live_link?: string;
    user?: string | User;
}

export interface Skill {
    _id?: string;
    category: string;
    name: string;
    user?: string | User;
}

export interface Certification {
    _id?: string;
    title: string;
    issuer: string;
    issueDate: string | Date;
    url?: string;
    user?: string | User;
}

export interface Achievement {
    _id?: string;
    title: string;
    description: string;
    issue_date: string | Date;
    url?: string;
    user?: string | User;
}

export interface JobDescription {
    _id?: string;
    title?: string;
    description: string;
    skills?: string[];
    user?: string | User;
}

export interface Resume {
    _id?: string;
    user?: string | User;
    jobDescription?: string | JobDescription;
    content?: any;
    score?: number;
    createdAt?: string;
    updatedAt?: string;
}
