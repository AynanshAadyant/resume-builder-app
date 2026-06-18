import { type User } from "./user.type"

export interface Skill {
    _id?: string;
    category: string;
    values: string[];
    user?: string | User;
}