import { Button } from "@/components/ui/button";
import { QualificationForm } from "@/components/QualificationForm";
import { TestimonialSection } from "@/components/TestimonialSection";
import { SocialProof } from "@/components/SocialProof";
import { TeamSection } from "@/components/TeamSection";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, TrendingUp, UserPlus, Settings } from "lucide-react";
import { GrowthRoadmap } from "@/components/GrowthRoadmap";
import { Link } from "react-router-dom";

const Home = () => {
    const [showForm, setShowForm] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(-1);
    const fullText = "The APEX: Your Agency's Path to Scalable Growth";

    // References to track if components are in viewport
    const headingRef = useRef(null);

    useEffect(() => {
        // Preload the logo image
        const logoImg = new Image();
        logoImg.src = "/lovable-uploads/4e5d3fd1-3c90-4a4a-9b48-9acb65aecedc.png";
        logoImg.onload = () => setLogoLoaded(true);

        // Trigger visibility for other animations
        setIsVisible(true);
    }, []);

    // Typing animation effect
    useEffect(() => {
        if (!logoLoaded) return;

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTypingComplete(true);

                // Start sequential feature animations after typing completes
                setTimeout(() => {
                    setActiveFeatureIndex(0);
                }, 300);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [logoLoaded]);

    // Sequential animation for features
    useEffect(() => {
        if (activeFeatureIndex >= 0 && activeFeatureIndex < 3) {
            const timer = setTimeout(() => {
                setActiveFeatureIndex(activeFeatureIndex + 1);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [activeFeatureIndex]);

    return (
        <div className="min-h-screen bg-navy font-inter">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-cream via-cream to-cream/95 text-navy py-20 px-4 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-[url('/subtle-dots.png')] opacity-5" />
                <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
                <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

                <div className="container mx-auto relative z-10" data-aos="fade-up">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Enhanced decorative elements */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-full h-32">
                            <div className="relative w-full h-full">
                                <div className="absolute top-0 left-0 w-24 h-24 border border-accent/30 rounded-full animate-float opacity-40" style={{ animationDelay: '0.2s', left: '15%' }}></div>
                                <div className="absolute top-10 right-0 w-16 h-16 border border-accent/20 rounded-full animate-float opacity-30" style={{ animationDelay: '0.7s', right: '20%' }}></div>
                            </div>
                        </div>

                        {/* Logo with enhanced presentation and prioritized loading */}
                        <div className="mb-12 transform hover:scale-105 transition-transform duration-500" data-aos="fade-down">
                            <div className="relative" style={{ minHeight: "112px" }}>
                                <div className="absolute inset-0 bg-accent/10 rounded-full blur-2xl"></div>
                                {logoLoaded && (
                                    <img
                                        src="/lovable-uploads/4e5d3fd1-3c90-4a4a-9b48-9acb65aecedc.png"
                                        alt="Brad Partners"
                                        className="h-28 mx-auto mb-2 drop-shadow-xl relative z-10"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Only render the rest of the content once the logo has loaded */}
                        {logoLoaded && (
                            <>
                                <h1
                                    ref={headingRef}
                                    className="text-4xl md:text-6xl font-playfair font-bold mb-8 leading-tight tracking-tight min-h-[80px]"
                                >
                                    <span>{typedText}</span>
                                    <span className="inline-block w-[3px] h-[1em] bg-accent ml-1 animate-pulse"
                                        style={{ opacity: isTypingComplete ? 0 : 1 }}></span>
                                    {isTypingComplete && (
                                        <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                                            {/* Gradient already applied in the typed text */}
                                        </span>
                                    )}
                                </h1>

                                <p className="text-xl md:text-2xl mb-6 text-navy/90 animate-fadeIn font-light" style={{ animationDelay: "0.2s" }}>
                                    If You're Doing $15K+/Month, We Can Help You Reach $50K in 12 Weeks With Our Proven Growth Systems.
                                </p>

                                {/* Key benefits with enhanced animations */}
                                <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                                    <div
                                        className={`flex items-center transition-all duration-500 transform ${activeFeatureIndex >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    >
                                        <div className="flex items-center justify-center bg-accent/10 w-12 h-12 rounded-full mr-3">
                                            <TrendingUp className="w-6 h-6 text-accent" />
                                        </div>
                                        <span className="text-navy/90 font-cormorant text-xl">Strategic Growth</span>
                                    </div>

                                    <div
                                        className={`flex items-center transition-all duration-500 transform ${activeFeatureIndex >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    >
                                        <div className="flex items-center justify-center bg-accent/10 w-12 h-12 rounded-full mr-3">
                                            <UserPlus className="w-6 h-6 text-accent" />
                                        </div>
                                        <span className="text-navy/90 font-cormorant text-xl">Client Acquisition</span>
                                    </div>

                                    <div
                                        className={`flex items-center transition-all duration-500 transform ${activeFeatureIndex >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    >
                                        <div className="flex items-center justify-center bg-accent/10 w-12 h-12 rounded-full mr-3">
                                            <Settings className="w-6 h-6 text-accent" />
                                        </div>
                                        <span className="text-navy/90 font-cormorant text-xl">Operational Excellence</span>
                                    </div>
                                </div>

                                <p className="text-lg mb-12 text-navy/80 animate-fadeIn font-light" style={{ animationDelay: "0.4s" }}>
                                    Get the strategies that top agencies use to multiply revenue while working smarter, not harder.
                                </p>

                                <div className="relative animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                                        {/* Decorative glow behind button */}
                                        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
                                        <Link to="/elevateForm">
                                            <Button
                                                className="relative bg-accent hover:bg-accent-light text-white font-medium px-10 py-7 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-accent/20"
                                            >
                                                <span className="mr-2">Enroll Now</span>
                                                <ArrowRight className="h-5 w-5" />
                                            </Button>
                                        </Link>
                                </div>
                            </>
                        )}
                    </div>

                    {showForm && logoLoaded && (
                        <div className="mt-8 animate-fadeIn backdrop-blur-sm bg-white/30 rounded-2xl p-6 shadow-2xl">
                            <QualificationForm />
                        </div>
                    )}

                    {/* Enhanced decorative floating shapes */}
                    <div className="absolute top-1/4 left-10 w-16 h-16 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '1.2s' }}></div>
                    <div className="absolute top-1/3 right-20 w-12 h-12 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '0.8s' }}></div>
                    <div className="absolute bottom-1/3 left-20 w-20 h-20 border border-accent/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream/20 to-transparent" />
            </section>

            {/* Rest of the content */}
            <Separator className="h-px bg-navy/10" />

            {/* Social Proof Section */}
            <div className="bg-gradient-to-b from-cream to-white" data-aos="fade-up" data-aos-delay="100">
                <SocialProof />
            </div>

            <Separator className="h-px bg-navy/10" />

            {/* Replace the "How We Work" section with the new GrowthRoadmap component */}
            <GrowthRoadmap />

            <Separator className="h-px bg-navy/10" />

            {/* Testimonials Section */}
            <div data-aos="fade-up" data-aos-delay="100">
                <TestimonialSection />
            </div>

            <Separator className="h-px bg-navy/10" />

            {/* Meet the Team Section */}
            <div data-aos="fade-up" data-aos-delay="100">
                <TeamSection />
            </div>

            <Separator className="h-px bg-navy/10" />

            {/* CTA Section - Enhanced with subtle UI elements */}
            <section className="py-20 bg-gradient-to-b from-cream to-white text-navy relative overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDuration: '13s' }} />

                {/* Floating circles */}
                <div className="absolute top-1/3 left-1/4 w-20 h-20 border border-accent/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '1.2s' }}></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6 tracking-tight relative inline-block">
                        <span className="relative z-10">Ready to Scale Your Agency?</span>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-8 bg-accent/10 rounded-full blur-xl -z-10"></div>
                    </h2>
                    <p className="text-lg text-navy/80 mb-8 max-w-2xl mx-auto font-light">
                        Join the ranks of successful agencies that have transformed their growth trajectory with our proven systems.
                    </p>
                    {!showForm && (
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
                            <Link to="/elevateForm">
                                <Button
                                    onClick={() => {
                                        setShowForm(true);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="relative bg-accent hover:bg-accent-light text-white font-medium px-10 py-7 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-accent/20"
                                >
                                    Enroll Now
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
