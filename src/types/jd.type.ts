import { type User } from "./user.type"

export interface JobDescription {
    _id?: string;
    title?: string;
    description: string;
    skills?: string[];
    user?: string | User;
}