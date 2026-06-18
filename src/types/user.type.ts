export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Profile {
    _id?: string;
    user?: string | User;
    phoneNo: number | string;
    location: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
    createdAt?: string;
    updatedAt?: string;
}













