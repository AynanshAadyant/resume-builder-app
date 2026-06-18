import { type User } from "./user.type"

export interface Project {
    _id?: string;
    title: string;
    techStack: string[];
    contents: string[];
    startDate: string | Date;
    endDate: string | Date;
    features ?: string;
    githubLink?: string;
    projectLink?: string;
    user?: string | User;
}
