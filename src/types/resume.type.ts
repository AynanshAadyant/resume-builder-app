import { type Profile, type User } from "./user.type"
import type { WorkExperience } from "./workExperience.type";
import type { Project } from "./project.type";
import type { Skill } from "./skill.type";
import type { Education } from "./education.type";
import type { Certification } from "./certification.type";
import type { Achievement } from "./achievement.type";
import type { Miscellaneous } from "./miscellaneous.type";

export interface Resume {
    _id?: string;
    user?: string | User;
    title ?: string,
    company ?: string,
    role ?: string,
    profile ?: Profile,
    workExp : WorkExperience[],
    projects : Project[],
    skills : Skill[],
    education : Education[],
    certifications : Certification[],
    achievements : Achievement[],
    extra : any[],
    createdAt ?: any
}