import Navigation from "@/components/LandingPage/landing-navigation";
import HeroSection from "@/components/LandingPage/landing-hero-section";

export default function LandingPage() {
    
    return (
        <main className="w-screen min-h-screen h-full bg-sky-950">
            <Navigation />
            <HeroSection />
        </main>
    )
}