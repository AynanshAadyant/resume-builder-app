import { useState, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/api";
import { useAppSelector } from "@/store/hooks";

export default function DashboardSettings() {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [resumesCount, setResumesCount] = useState(0);


    const user = useAppSelector((state) => state.auth.user)

    //functions


    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const userRes = user;
                setUserName(userRes.name);
                setUserEmail(userRes.email);
                const resumeRes = await api.get("/resume/");
                if (resumeRes.success && resumeRes.resumes) {
                    setResumesCount(resumeRes.resumes.length);
                }

            } catch (err) {
                console.error("Error loading account data:", err);
            }
        };
        loadInitialData();
    }, []);




    return (
        <div className="p-8 w-full max-w-[1180px] pb-12">
            <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h2 className="font-['Satoshi'] text-3xl font-bold text-slate-950">Settings</h2>
                    <p className="mt-2 text-base text-slate-500">Manage account details, AI behavior, and export defaults.</p>
                </div>
            </header>

            <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
                <CardHeader className="flex flex-row justify-between items-center gap-3">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                            <UserCircle className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-xl text-slate-950">Account Details</CardTitle>
                    </div>
                    <Button variant="default"> Save Profile </Button>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg flex flex-col border border-slate-200 bg-slate-50 p-4">
                        <label htmlFor="name" className="text-xs font-semibold uppercase text-slate-400">Name</label>
                        <input name="name" type="text" value={userName || "Alex"}
                            onChange={(e) => {
                                e.preventDefault();
                                setUserName(e.target.value)
                            }}
                            className="mt-1 text-base font-medium text-slate-950"></input>
                    </div>
                    <div className="rounded-lg border flex flex-col border-slate-200 bg-slate-50 p-4">
                        <label htmlFor="email" className="text-xs font-semibold uppercase text-slate-400">Email Address</label>
                        <input type="email" name="email" value={userEmail || "alex@example.com"}
                            onChange={(e) => {
                                e.preventDefault();
                                setUserEmail(e.target.value)
                            }}
                            className="mt-1 text-base font-medium text-slate-950"></input>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                        <span className="text-xs font-semibold uppercase text-slate-400">Active Resumes</span>
                        <p className="mt-1 text-base font-medium text-slate-950">{resumesCount} tailored resumes generated</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
