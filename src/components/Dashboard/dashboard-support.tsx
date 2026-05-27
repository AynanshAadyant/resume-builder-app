import { Sparkles, Rocket, Brain, Share, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const FAQ_DATA = [
    { 
        id: 'item-1', 
        question: 'How does the AI handle non-traditional career paths?', 
        answer: 'Our Career-OS engine uses cross-domain mapping to translate skills from non-traditional paths into industry-standard competencies. By focusing on fundamental outcome metrics, the AI ensures your diverse experience is framed as a strategic asset rather than an anomaly.' 
    },
    { 
        id: 'item-2', 
        question: 'Is my data used to train public models?', 
        answer: 'No, your data is securely isolated. We do not use user data to train public models. We adhere to enterprise-grade privacy standards.' 
    },
    { 
        id: 'item-3', 
        question: 'Can I export to multiple file formats simultaneously?', 
        answer: 'Yes, our export engine supports concurrent batch exports to PDF, DOCX, and TXT.' 
    },
];

export default function DashboardSupport() {
    return (
        <div className="max-w-[1200px] mx-auto pb-24 relative">
            {/* Hero Section */}
            <section className="mb-24 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 rounded-full mb-4">
                    <Sparkles className="text-[var(--secondary)] w-4 h-4" />
                    <span className="text-[12px] font-semibold text-[var(--secondary)] uppercase tracking-widest font-['Inter']">Knowledge Base</span>
                </div>
                <h1 className="text-6xl font-bold mb-4 font-['Satoshi'] text-[var(--on-surface)] tracking-tight">
                    How can we help you <span className="text-[var(--primary)]">succeed</span>?
                </h1>
                <p className="text-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto font-['Inter']">
                    Access deep documentation, AI-powered troubleshooting, and strategic career resources designed for high-performance professionals.
                </p>
            </section>

            {/* Categories Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                {/* Getting Started */}
                <Card className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md rounded-xl relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[var(--primary)]/40 p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-6 border border-[var(--primary)]/10">
                        <Rocket className="text-[var(--primary)] w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-medium mb-2 font-['Satoshi'] text-[var(--on-surface)]">Getting Started</h3>
                    <p className="text-base text-[var(--on-surface-variant)] mb-6 font-['Inter']">
                        Master the fundamentals of ResumeAI. Learn how to connect your professional history and calibrate the AI engine.
                    </p>
                    <ul className="space-y-2 relative z-10">
                        <li className="flex items-center gap-2 text-sm text-[var(--outline)] hover:text-[var(--primary)] transition-colors">
                            <ArrowRight className="w-4 h-4" /> Profile Calibration Guide
                        </li>
                        <li className="flex items-center gap-2 text-sm text-[var(--outline)] hover:text-[var(--primary)] transition-colors">
                            <ArrowRight className="w-4 h-4" /> First Document Generation
                        </li>
                    </ul>
                </Card>

                {/* AI Optimization */}
                <Card className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md rounded-xl relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[var(--secondary)]/40 border-l-2 hover:border-l-[var(--secondary)]/30 p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--secondary)]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <div className="w-12 h-12 rounded-lg bg-[var(--secondary)]/10 flex items-center justify-center mb-6 border border-[var(--secondary)]/10">
                        <Brain className="text-[var(--secondary)] w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-medium mb-2 font-['Satoshi'] text-[var(--on-surface)]">AI Optimization</h3>
                    <p className="text-base text-[var(--on-surface-variant)] mb-6 font-['Inter']">
                        Unlock the full potential of our neural engines. Strategic prompting for senior and executive role variations.
                    </p>
                    <ul className="space-y-2 relative z-10">
                        <li className="flex items-center gap-2 text-sm text-[var(--outline)] hover:text-[var(--secondary)] transition-colors">
                            <ArrowRight className="w-4 h-4" /> Advanced Prompt Engineering
                        </li>
                        <li className="flex items-center gap-2 text-sm text-[var(--outline)] hover:text-[var(--secondary)] transition-colors">
                            <ArrowRight className="w-4 h-4" /> Sentiment and Tone Control
                        </li>
                    </ul>
                </Card>

                {/* Exporting */}
                <Card className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md rounded-xl relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[var(--tertiary)]/40 p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--tertiary)]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <div className="w-12 h-12 rounded-lg bg-[var(--tertiary)]/10 flex items-center justify-center mb-6 border border-[var(--tertiary)]/10">
                        <Share className="text-[var(--tertiary)] w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-medium mb-2 font-['Satoshi'] text-[var(--on-surface)]">Exporting</h3>
                    <p className="text-base text-[var(--on-surface-variant)] mb-6 font-['Inter']">
                        Prepare your documents for ATS compatibility and executive presentation with precision layouts.
                    </p>
                    <ul className="space-y-2 relative z-10">
                        <li className="flex items-center gap-2 text-sm text-[var(--outline)] hover:text-[var(--tertiary)] transition-colors">
                            <ArrowRight className="w-4 h-4" /> ATS Parsing Mastery
                        </li>
                        <li className="flex items-center gap-2 text-sm text-[var(--outline)] hover:text-[var(--tertiary)] transition-colors">
                            <ArrowRight className="w-4 h-4" /> Custom Layout Overrides
                        </li>
                    </ul>
                </Card>
            </section>

            {/* FAQ Section */}
            <section className="mb-24">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 font-['Satoshi'] text-[var(--on-surface)]">Frequently Asked Questions</h2>
                        <p className="text-base text-[var(--on-surface-variant)] font-['Inter']">Common inquiries from our professional community.</p>
                    </div>
                    <a href="#" className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] border-b border-[var(--primary)]/20 pb-1">View All FAQ</a>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                    {FAQ_DATA.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border-none">
                            <Card className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/10 shadow-none backdrop-blur-md rounded-xl overflow-hidden">
                                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:text-[var(--primary)] text-[18px] font-medium text-[var(--on-surface)] font-['Satoshi']">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 pt-0">
                                    <p className="text-[var(--on-surface-variant)] border-l-2 border-[var(--primary)]/20 pl-6 py-2 text-base font-['Inter']">
                                        {faq.answer}
                                    </p>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Insights / Featured Content Card */}
            <section className="mb-24">
                <Card className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/20 shadow-none backdrop-blur-md rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12 p-12">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-l from-[var(--primary)] to-transparent" />
                    </div>
                    <div className="flex-1 z-10">
                        <div className="inline-block px-4 py-1 bg-[var(--primary)]/10 rounded-full mb-4">
                            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)]">New Resource</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 font-['Satoshi'] text-[var(--on-surface)]">Mastering the Executive Presence in 2024</h2>
                        <p className="text-lg text-[var(--on-surface-variant)] mb-12 max-w-xl font-['Inter']">
                            Download our latest strategic whitepaper on aligning AI-generated content with high-stakes board room expectations.
                        </p>
                        <Button className="bg-white text-[#0a141e] font-semibold text-xs uppercase tracking-widest hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)] px-12 py-6">
                            Download Guide
                        </Button>
                    </div>
                    <div className="w-full md:w-80 h-56 rounded-xl overflow-hidden shrink-0">
                        <img 
                            src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop" 
                            alt="Executive Guide" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Card>
            </section>

            {/* Contact AI Support FAB */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
                <div className="bg-[var(--surface-container-low)] p-4 rounded-2xl border border-[var(--secondary)]/30 shadow-2xl max-w-xs relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--secondary)]/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                    <div className="flex items-center gap-2 mb-1 relative z-10">
                        <Sparkles className="text-[var(--secondary)] w-4 h-4" />
                        <span className="text-xs font-semibold text-[var(--secondary)] tracking-widest uppercase">AI Instant Solve</span>
                    </div>
                    <p className="text-sm text-[var(--on-surface-variant)] relative z-10">Try asking me "How do I fix my formatting?"</p>
                </div>
                <Button className="h-16 px-8 bg-[var(--primary)] text-[var(--on-primary)] rounded-full shadow-2xl flex items-center gap-4 hover:scale-95 transition-transform group">
                    <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Contact AI Support</span>
                    <div className="h-2 w-2 bg-[var(--secondary)] rounded-full animate-pulse" />
                </Button>
            </div>
        </div>
    );
}
