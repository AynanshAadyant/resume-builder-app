import { type User } from "./user.type"

export interface Achievement {
    _id?: string;
    title: string;
    description: string;
    issue_date: string | Date;
    url?: string;
    user?: string | User;
}