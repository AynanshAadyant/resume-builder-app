import { type User } from "./user.type"

export interface WorkExperience {
    _id?: string;
    organisation: string;
    post: string;
    location: string;
    startDate: string | Date;
    endDate: string | Date;
    type: "full-time" | "part-time" | "contract" | "internship" | "freelance" | "other";
    contents: string[];
    user?: string | User;
}