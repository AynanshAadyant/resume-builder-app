import { type User } from "./user.type"

export interface WorkExperience {
    _id?: string;
    company: string;
    position: string;
    location: string;
    startDate: string | Date;
    endDate: string | Date;
    type: "full-time" | "part-time" | "contract" | "internship" | "freelance" | "other";
    responsibilities: string[];
    user?: string | User;
}