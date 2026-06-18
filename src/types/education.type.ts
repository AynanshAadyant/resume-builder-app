import { type User } from "./user.type"
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