import { type User } from "./user.type"

export interface Project {
    _id?: string;
    title: string;
    tech_stack: string[];
    description: string[];
    startDate?: string | Date;
    endDate?: string | Date;
    features ?: string;
    github_link?: string;
    live_link?: string;
    user?: string | User;
}
