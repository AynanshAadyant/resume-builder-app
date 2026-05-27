import { useState, useEffect } from "react";
import { Sparkles, FileText } from "lucide-react";
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

    // AI preference states
    const [autoQuantify, setAutoQuantify] = useState(true);
    const [toneAdjustment, setToneAdjustment] = useState(true);
    const [semanticKeyword, setSemanticKeyword] = useState(false);

    // Export states
    const [typography, setTypography] = useState("IBM Plex Serif");
    const [margin, setMargin] = useState(2.5);

    useEffect(() => {
        // Load initial data
        const loadInitialData = async () => {
            try {
                const userRes = await api.get("/auth/current");
                if (userRes.success && userRes.body) {
                    setUserName(userRes.body.name || "Alex");
                    setUserEmail(userRes.body.email || "alex@example.com");
                }
                const resumeRes = await api.get("/resume/all");
                if (resumeRes.success && resumeRes.resumes) {
                    setResumesCount(resumeRes.resumes.length);
                }
            } catch (err) {
                console.error("Error loading account data:", err);
            }
        };
        loadInitialData();

        // Load settings from localStorage
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

    return (
        <div className="max-w-[1200px] mx-auto text-white">
            {/* Page Header */}
            <header className="mb-12">
                <h2 className="text-4xl font-bold text-[var(--on-surface)] mb-1 font-['Satoshi'] tracking-tight">Settings</h2>
                <p className="text-[var(--on-surface-variant)] text-base">Manage your career operating system preferences and AI configurations.</p>
            </header>

            {/* Tab Navigation */}
            <Tabs defaultValue="ai-preferences" className="w-full">
                <div className="border-b border-[var(--outline-variant)]/10 mb-12 overflow-x-auto">
                    <TabsList className="bg-transparent h-auto p-0 flex gap-6 justify-start">
                        <TabsTrigger 
                            value="account" 
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--primary)] text-[var(--on-surface-variant)] font-semibold text-xs uppercase tracking-widest pb-4 px-2"
                        >
                            Account
                        </TabsTrigger>
                        <TabsTrigger 
                            value="ai-preferences" 
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--primary)] text-[var(--on-surface-variant)] font-semibold text-xs uppercase tracking-widest pb-4 px-2"
                        >
                            AI Preferences
                        </TabsTrigger>
                        <TabsTrigger 
                            value="export" 
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--primary)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--primary)] text-[var(--on-surface-variant)] font-semibold text-xs uppercase tracking-widest pb-4 px-2"
                        >
                            Export Defaults
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="ai-preferences">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* AI Assistance Panel */}
                        <div className="col-span-1 lg:col-span-8 space-y-6">
                            <Card className="bg-[var(--surface-container-low)] border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--secondary)]/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                                <CardHeader className="flex flex-row items-center gap-2 pb-6">
                                    <Sparkles className="w-6 h-6 text-[var(--secondary)]" />
                                    <CardTitle className="text-2xl font-medium text-[var(--on-surface)] font-['Satoshi']">Intelligence Layers</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between p-4 bg-[var(--surface-container)] rounded-lg border border-[var(--outline-variant)]/10">
                                        <div>
                                            <p className="font-bold text-[var(--on-surface)]">Auto-Quantify Metrics</p>
                                            <p className="text-sm text-[var(--on-surface-variant)]">Automatically transform passive descriptions into data-driven achievements.</p>
                                        </div>
                                        <Switch checked={autoQuantify} onCheckedChange={setAutoQuantify} className="data-[state=checked]:bg-[var(--primary)]" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-[var(--surface-container)] rounded-lg border border-[var(--outline-variant)]/10">
                                        <div>
                                            <p className="font-bold text-[var(--on-surface)]">Tone Adjustment</p>
                                            <p className="text-sm text-[var(--on-surface-variant)]">Analyze and align your writing style with specific industry standards.</p>
                                        </div>
                                        <Switch checked={toneAdjustment} onCheckedChange={setToneAdjustment} className="data-[state=checked]:bg-[var(--primary)]" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-[var(--surface-container)] rounded-lg border border-[var(--outline-variant)]/10">
                                        <div>
                                            <p className="font-bold text-[var(--on-surface)]">Semantic Keyword Injection</p>
                                            <p className="text-sm text-[var(--on-surface-variant)]">Optimize for Applicant Tracking Systems using real-time job market data.</p>
                                        </div>
                                        <Switch checked={semanticKeyword} onCheckedChange={setSemanticKeyword} className="data-[state=checked]:bg-[var(--primary)]" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Export Defaults Panel */}
                            <Card className="bg-[var(--surface-container-low)] border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md">
                                <CardHeader className="flex flex-row justify-between items-center pb-6">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-6 h-6 text-[var(--primary)]" />
                                        <CardTitle className="text-2xl font-medium text-[var(--on-surface)] font-['Satoshi']">Export Defaults</CardTitle>
                                    </div>
                                    <span className="text-xs uppercase tracking-widest px-4 py-1 bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 rounded-full font-semibold">
                                        PDF Engine v4.2
                                    </span>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Default Typography</label>
                                            <Select value={typography} onValueChange={setTypography}>
                                                <SelectTrigger className="w-full bg-[var(--surface-container-low)] border-[var(--outline-variant)]/20 text-[var(--on-surface)] focus:ring-1 focus:ring-[var(--primary)]">
                                                    <SelectValue placeholder="Select typography" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[var(--surface-container-low)] text-white border-white/5">
                                                    <SelectItem value="IBM Plex Serif">IBM Plex Serif</SelectItem>
                                                    <SelectItem value="Inter">Inter</SelectItem>
                                                    <SelectItem value="Satoshi">Satoshi</SelectItem>
                                                    <SelectItem value="System Serif">System Serif</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Page Margin</label>
                                            <div className="flex items-center gap-4">
                                                <input 
                                                    type="range" 
                                                    className="flex-1 accent-[var(--primary)]" 
                                                    value={margin * 10} 
                                                    onChange={(e) => setMargin(Number(e.target.value) / 10)} 
                                                    min="10" 
                                                    max="50" 
                                                />
                                                <span className="text-sm font-bold text-[var(--on-surface)]">{margin}cm</span>
                                            </div>
                                        </div>
                                        <div className="col-span-full pt-4 flex gap-4">
                                            <Button onClick={handleSave} className="flex-1 bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90 font-bold py-6 shadow-lg shadow-[var(--primary)]/20">
                                                Save Changes
                                            </Button>
                                            <Button onClick={handleReset} variant="outline" className="px-12 py-6 border-[var(--outline-variant)]/30 text-[var(--on-surface)] font-bold hover:bg-[var(--surface-container-highest)] bg-transparent">
                                                Reset
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Info/Stats Panel */}
                        <div className="col-span-1 lg:col-span-4 space-y-6">
                            <Card className="bg-[var(--surface-container-low)] border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md relative overflow-hidden">
                                <CardContent className="p-6 relative z-10">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)] mb-4">Usage Tier</h4>
                                    <div className="flex items-end gap-1 mb-2">
                                        <span className="text-5xl font-bold text-[var(--on-surface)] leading-none font-['Satoshi'] tracking-tighter">84</span>
                                        <span className="text-[var(--on-surface-variant)] text-base mb-1">/ 100</span>
                                    </div>
                                    <p className="text-sm text-[var(--on-surface-variant)] mb-6">AI tokens remaining for this billing cycle.</p>
                                    <div className="w-full bg-[var(--surface-container-highest)] rounded-full h-1.5 mb-6">
                                        <div className="bg-[var(--secondary)] h-full rounded-full" style={{ width: '84%' }}></div>
                                    </div>
                                    <Button variant="outline" className="w-full border-[var(--secondary)]/30 text-[var(--secondary)] font-semibold text-xs uppercase tracking-widest hover:bg-[var(--secondary)]/10 bg-transparent">
                                        Get Unlimited Access
                                    </Button>
                                </CardContent>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)]/10 blur-[60px] -mr-16 -mt-16 rounded-full"></div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="account">
                    <Card className="bg-[var(--surface-container-low)] border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md p-6">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-2xl font-bold font-['Satoshi']">Account Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Name</span>
                                <span className="text-base text-[var(--on-surface)]">{userName || "Alex"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Email Address</span>
                                <span className="text-base text-[var(--on-surface)]">{userEmail || "alex@example.com"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)]">Active Deployments</span>
                                <span className="text-base text-[var(--on-surface)]">{resumesCount} tailored resumes generated</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="export">
                    <Card className="bg-[var(--surface-container-low)] border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md p-6">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-2xl font-bold font-['Satoshi']">Export Overrides</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <p className="text-[var(--on-surface-variant)] text-base font-['Inter'] leading-relaxed">
                                Choose custom theme presets and styling settings that override templates when building new resumes. Margins, fonts, and borders are optimized automatically to match selected templates.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
