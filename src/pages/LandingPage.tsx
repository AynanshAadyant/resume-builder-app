import Navigation from "@/components/LandingPage/landing-navigation";
import HeroSection from "@/components/LandingPage/landing-hero-section";
import Content from "@/components/LandingPage/landing-content";
import api from "@/api/api";
import { useEffect } from "react";

export default function LandingPage() {

    const wakeup = async() => {
        try {
            const response = await api.get( '/wakeup' )
            if( response.success ) 
                console.log( "Backend ready" );
            else
                console.log( "Backend error" );
        }
        catch( e : any ) {
            console.log( e.response.data.message || e.message || "Backend error, not starting" )
        }
    }

    useEffect( () => {
        wakeup()
    }, [])
    
    return (
        <div className="min-h-screen w-screen bg-[var(--background)]">
            <Navigation />
            <main className="fadeIn">
                <HeroSection />
                <Content />
            </main>
        </div>
    )
}
