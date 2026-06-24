import { type Profile, type User } from "./user.type"
import type { WorkExperience } from "./workExperience.type";
import type { Project } from "./project.type";
import type { Skill } from "./skill.type";
import type { Education } from "./education.type";
import type { Certification } from "./certification.type";
import type { Achievement } from "./achievement.type";

export interface Resume {
    _id?: any;
    user?: String | User;
    title?: String;
    company?: String;
    role?: String;
    profile?: Profile;
    workExp: WorkExperience[];
    projects: Project[];
    skills: Skill[];
    education: Education[];
    certifications: any[];
    achievements: any[];
    extra: any[];
    createdAt?: any;
    ats: Number | String;
}