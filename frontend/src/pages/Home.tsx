import React from "react";
import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/SocialProof";
import { TeamSection } from "@/components/TeamSection";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  UserPlus,
  Settings,
  SearchIcon,
} from "lucide-react";
import { GrowthRoadmap } from "@/components/GrowthRoadmap";
import { Link } from "react-router-dom";
import { OurOffers } from "@/components/OurOffers";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(-1);
  const fullText = `The Elevate: 2 Years of Strategy. 2 Days of Your Time.`;

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
      <nav className="fixed top-0 left-0 right-0 bg-navy/90 backdrop-blur-sm z-50 py-3 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/bradmain.jpeg"
              alt="Brad Partners"
              className="h-10 md:h-12"
            />
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-cream font-medium bg-navy/50 px-4 py-2 rounded-md border border-accent/20">
              <span className="font-mono">16:00</span>
            </div>
            <Link to="/elevateForm" className="inline-block">
              <Button className="bg-accent hover:bg-accent/90 text-white font-medium flex items-center">
                Enrol Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 relative min-h-screen flex items-center justify-center bg-gradient-to-b from-cream via-cream to-cream/95 text-navy py-20 px-4 overflow-hidden">
  <div className="absolute inset-0 bg-[url('/subtle-dots.png')] opacity-5" />
  <div
    className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-pulse"
    style={{ animationDuration: "7s" }}
  />
  <div
    className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse"
    style={{ animationDuration: "10s" }}
  />

  <div className="container mx-auto relative z-10" data-aos="fade-up">
    <div className="max-w-4xl mx-auto text-center">
      <div
        className="mb-6 transform hover:scale-105 transition-transform duration-500"
        data-aos="fade-down"
      >
        <div className="relative" style={{ minHeight: "80px" }}>
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

      {logoLoaded && (
        <>
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl font-playfair font-bold mb-4 leading-tight tracking-tight min-h-[80px]"
          >
            <span>
              {typedText.split("\n").map((line, index, arr) => (
                <React.Fragment key={index}>
                  {line}
                  {index !== arr.length - 1 && <br />}
                </React.Fragment>
              ))}
              <span
                className="inline-block w-[2px] h-[1em] bg-accent animate-pulse align-middle"
                style={{ opacity: isTypingComplete ? 0 : 1 }}
              />
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-6 text-navy/90 animate-fadeIn font-light">
            No fluff. No drag. Just high-leverage strategy you can
            actually use.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
            {[
              { icon: SearchIcon, text: "Discover" },
              { icon: Settings, text: "Assess" },
              { icon: TrendingUp, text: "Solve" },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center transition-all duration-500 transform ${
                  activeFeatureIndex >= index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center justify-center bg-accent/10 w-12 h-12 rounded-full mr-3">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-navy/90 font-cormorant text-xl">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <p className="text-lg mb-12 text-navy/80 animate-fadeIn font-light">
            In just 3 simple calls, we’ll break down what’s working,
            what’s not, and where you’re headed. You’ll walk away with
            clear direction, smart fixes, and a plan that actually makes
            sense. Simple moves, serious impacts because you don’t need
            more noise, just direction.
          </p>

          <div className="relative animate-fadeIn">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
            <Link to="/elevateForm">
              <Button className="relative bg-accent hover:bg-accent-light text-white font-medium px-10 py-7 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-accent/20">
                <span className="mr-2">Enroll Now</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
</section>


      <Separator className="h-px bg-navy/10" />
      <div className="bg-gradient-to-b from-cream to-white" data-aos="fade-up">
        <SocialProof />
      </div>
      <Separator className="h-px bg-navy/10" />
      <GrowthRoadmap />
      <Separator className="h-px bg-navy/10" />
      <div data-aos="fade-up">
        <OurOffers />
      </div>
      <Separator className="h-px bg-navy/10" />
      <div data-aos="fade-up">
        <TeamSection />
      </div>
      <Separator className="h-px bg-navy/10" />

      <section
        className="py-20 bg-gradient-to-b from-cream to-white text-navy relative overflow-hidden"
        data-aos="fade-up"
      >
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-pulse" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6 tracking-tight">
          Ready to Elevate Your Business?
          </h2>
          <p className="text-lg text-navy/80 mb-8 max-w-2xl mx-auto font-light">
          Join the ranks of businesses that have transformed their growth with our high-impact, no-nonsense strategy. Let’s accelerate your success with proven systems that drive real results.
          </p>
          {!showForm && (
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
              <Link to="/elevateForm">
                <Button
                  onClick={() => {
                    setShowForm(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
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
