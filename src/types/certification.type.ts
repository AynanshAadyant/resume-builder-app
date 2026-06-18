import { type User } from "./user.type"

export interface Certification {
    _id?: string;
    title: string;
    issuer: string;
    issueDate: string | Date;
    url?: string;
    user?: string | User;
}