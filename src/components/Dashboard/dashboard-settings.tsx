import { useState, useEffect } from "react";
import { FileText, Sparkles, UserCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import api from "@/api/api";

export default function DashboardSettings() {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [resumesCount, setResumesCount] = useState(0);

    const [autoQuantify, setAutoQuantify] = useState(true);
    const [toneAdjustment, setToneAdjustment] = useState(true);
    const [semanticKeyword, setSemanticKeyword] = useState(false);

    const [typography, setTypography] = useState("IBM Plex Serif");
    const [margin, setMargin] = useState(2.5);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const userRes = await api.get("/auth/current");
                if (userRes.success && userRes.body) {
                    setUserName(userRes.body.name || "Alex");
                    setUserEmail(userRes.body.email || "alex@example.com");
                }
                const resumeRes = await api.get("/resume/");
                if (resumeRes.success && resumeRes.resumes) {
                    setResumesCount(resumeRes.resumes.length);
                }
            } catch (err) {
                console.error("Error loading account data:", err);
            }
        };
        loadInitialData();

        const storedAi = localStorage.getItem("resumeai:settings:ai");
        if (storedAi) {
            try {
                const parsed = JSON.parse(storedAi);
                setAutoQuantify(parsed.autoQuantify ?? true);
                setToneAdjustment(parsed.toneAdjustment ?? true);
                setSemanticKeyword(parsed.semanticKeyword ?? false);
            } catch (e) {
                console.error(e);
            }
        }

        const storedExport = localStorage.getItem("resumeai:settings:export");
        if (storedExport) {
            try {
                const parsed = JSON.parse(storedExport);
                setTypography(parsed.typography ?? "IBM Plex Serif");
                setMargin(parsed.margin ?? 2.5);
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("resumeai:settings:ai", JSON.stringify({
            autoQuantify,
            toneAdjustment,
            semanticKeyword
        }));
        localStorage.setItem("resumeai:settings:export", JSON.stringify({
            typography,
            margin
        }));
        toast.success("Settings saved successfully!");
    };

    const handleReset = () => {
        setAutoQuantify(true);
        setToneAdjustment(true);
        setSemanticKeyword(false);
        setTypography("IBM Plex Serif");
        setMargin(2.5);
        toast.info("Settings reset to defaults");
    };

    const SettingRow = ({ title, description, checked, onCheckedChange }: any) => (
        <div className="flex items-center justify-between gap-6 rounded-lg border border-slate-200 bg-white p-4">
            <div>
                <p className="font-semibold text-slate-950">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
            </div>
            <Switch checked={checked} onCheckedChange={onCheckedChange} className="data-[state=checked]:bg-cyan-600" />
        </div>
    );

    return (
        <div className="mx-auto w-full max-w-[1180px] pb-12">
            <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h2 className="font-['Satoshi'] text-3xl font-bold text-slate-950">Settings</h2>
                    <p className="mt-2 text-base text-slate-500">Manage account details, AI behavior, and export defaults.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={handleReset} variant="outline" className="rounded-lg border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                        Reset
                    </Button>
                    <Button onClick={handleSave} className="rounded-lg bg-slate-950 text-white hover:bg-slate-800">
                        Save Changes
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="mb-6 h-auto rounded-lg border border-slate-200 bg-white p-1">
                    <TabsTrigger value="account" className="rounded-md data-[state=active]:bg-slate-950 data-[state=active]:text-white">
                        Account
                    </TabsTrigger>
                    <TabsTrigger value="ai-preferences" className="rounded-md data-[state=active]:bg-slate-950 data-[state=active]:text-white">
                        AI Preferences
                    </TabsTrigger>
                    <TabsTrigger value="export" className="rounded-md data-[state=active]:bg-slate-950 data-[state=active]:text-white">
                        Export Defaults
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]">
                        <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
                            <CardHeader className="flex flex-row items-center gap-3">
                                <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                                    <UserCircle className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-xl text-slate-950">Account Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <span className="text-xs font-semibold uppercase text-slate-400">Name</span>
                                    <p className="mt-1 text-base font-medium text-slate-950">{userName || "Alex"}</p>
                                </div>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <span className="text-xs font-semibold uppercase text-slate-400">Email Address</span>
                                    <p className="mt-1 text-base font-medium text-slate-950">{userEmail || "alex@example.com"}</p>
                                </div>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                                    <span className="text-xs font-semibold uppercase text-slate-400">Active Resumes</span>
                                    <p className="mt-1 text-base font-medium text-slate-950">{resumesCount} tailored resumes generated</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-lg border-cyan-100 bg-cyan-50/70 shadow-sm">
                            <CardContent className="p-6">
                                <p className="text-sm font-semibold uppercase text-cyan-700">Usage Tier</p>
                                <div className="mt-4 flex items-end gap-1">
                                    <span className="font-['Satoshi'] text-5xl font-bold leading-none text-slate-950">84</span>
                                    <span className="mb-1 text-base text-slate-500">/ 100 tokens</span>
                                </div>
                                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
                                    <div className="h-full rounded-full bg-cyan-600" style={{ width: "84%" }} />
                                </div>
                                <Button variant="outline" className="mt-6 w-full rounded-lg border-cyan-200 bg-white text-cyan-700 hover:bg-cyan-50">
                                    Get Unlimited Access
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="ai-preferences">
                    <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <div className="rounded-lg bg-cyan-50 p-2 text-cyan-700">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-xl text-slate-950">Intelligence Layers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <SettingRow
                                title="Auto-Quantify Metrics"
                                description="Transform passive descriptions into data-driven achievements where possible."
                                checked={autoQuantify}
                                onCheckedChange={setAutoQuantify}
                            />
                            <SettingRow
                                title="Tone Adjustment"
                                description="Align writing style with role seniority, industry expectations, and recruiter language."
                                checked={toneAdjustment}
                                onCheckedChange={setToneAdjustment}
                            />
                            <SettingRow
                                title="Semantic Keyword Injection"
                                description="Optimize for ATS matching using related terms from the analyzed job description."
                                checked={semanticKeyword}
                                onCheckedChange={setSemanticKeyword}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="export">
                    <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                                <FileText className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-xl text-slate-950">Export Defaults</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-slate-400">Default Typography</label>
                                <Select value={typography} onValueChange={setTypography}>
                                    <SelectTrigger className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-950 focus:ring-cyan-400">
                                        <SelectValue placeholder="Select typography" />
                                    </SelectTrigger>
                                    <SelectContent className="border-slate-200 bg-white text-slate-950">
                                        <SelectItem value="IBM Plex Serif">IBM Plex Serif</SelectItem>
                                        <SelectItem value="Inter">Inter</SelectItem>
                                        <SelectItem value="Satoshi">Satoshi</SelectItem>
                                        <SelectItem value="System Serif">System Serif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-slate-400">Page Margin</label>
                                <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                    <input
                                        type="range"
                                        className="flex-1 accent-cyan-600"
                                        value={margin * 10}
                                        onChange={(e) => setMargin(Number(e.target.value) / 10)}
                                        min="10"
                                        max="50"
                                    />
                                    <span className="min-w-12 text-sm font-bold text-slate-950">{margin}cm</span>
                                </div>
                            </div>
                            <p className="text-sm leading-6 text-slate-500 md:col-span-2">
                                These defaults are applied when generating or exporting new resumes. Template-specific constraints can still adjust spacing automatically.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
