import { type User } from "./user.type"

export interface Skill {
    _id?: string;
    category: string;
    name: string[];
    user?: string | User;
}