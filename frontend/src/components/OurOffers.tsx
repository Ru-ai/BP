import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const offers = [
  {
    title: "90-Day War Plan",
    description:
      "A focused strategy for the next three months to hit your key goals. We map out exactly what you need to do to grow fast and win big.",
    highlight: true,
  },
  {
    title: "Business Audit and Diagnostics",
    description:
      "We take a deep look at your business, finding what’s working, what’s not, and where you can improve. You get clear insights and a plan to move forward.",
  },
  {
    title: "Offer Perfection",
    description:
      "We help you fine-tune your product or service so it stands out and gets noticed. The goal: make it irresistible to your customers.",
  },
  {
    title: "Risk Analysis and Mitigation",
    description:
      "We identify potential risks and create a plan to handle them, keeping you ready for anything that could come your way.",
  },
  {
    title: "Fix-First Framework",
    description:
      "We focus on fixing the most important issues first, so you get quick wins that make a real difference, fast.",
  },
];

export const OurOffers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (hoveredIndex !== null) return; // Pause auto-scroll when hovered
    const interval = setInterval(() => {
      if (api) {
        const nextIndex = (activeIndex + 1) % offers.length;
        api.scrollTo(nextIndex);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, api, hoveredIndex]);

  return (
    <div className="py-20 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/subtle-dots.png')] opacity-5" />
      <div
        className="absolute top-20 right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse"
        style={{ animationDuration: "10s" }}
      />
      <div
        className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-pulse"
        style={{ animationDuration: "14s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-accent/20 text-accent px-4 py-1"
          >
            Our Top 5 Offers
          </Badge>
        </div>

        <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-center text-navy mb-12 relative">
          <span className="relative z-10">Exactly what you are looking for ;)</span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-12 bg-accent/10 rounded-full blur-xl -z-10"></div>
        </h2>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="relative"
            ref={carouselRef}
          >
            <CarouselContent>
              {offers.map((offer, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 px-6"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    className={cn(
                      "p-8 bg-white/80 backdrop-blur-md shadow-lg transition-all duration-500 h-full relative overflow-hidden transform hover:-translate-y-2 flex flex-col",
                      offer.highlight
                        ? "border-accent/30 shadow-xl shadow-accent/10 hover:shadow-accent/20"
                        : "border-navy/10 hover:shadow-xl",
                      hoveredIndex !== null && hoveredIndex !== index ? "blur-sm" : ""
                    )}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>

                    {offer.highlight && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-bl-lg backdrop-blur-sm">
                          Featured
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-playfair font-semibold text-xl text-navy mb-2">
                          {offer.title}
                        </h3>
                        <p className="text-navy/80 font-inter leading-relaxed text-base">
                          {offer.description}
                        </p>
                      </div>

                      <div className="border-t border-navy/10 pt-4 mt-4 flex justify-end">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-white hover:bg-white text-accent hover:text-accent-light border-accent/20 -left-12" />
            <CarouselNext className="hidden md:flex bg-white hover:bg-white text-accent hover:text-accent-light border-accent/20 -right-12" />
          </Carousel>

          <div className="flex justify-center mt-8 gap-2">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (api) api.scrollTo(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-accent w-6" : "bg-accent/30"
                }`}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>

          {/* Centered CTA Button */}
          <div className="relative animate-fadeIn mt-12 flex justify-center">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
            <Link to="/elevateForm">
              <Button className="relative bg-accent hover:bg-accent-light text-white font-medium px-10 py-7 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-accent/20">
                <span className="mr-2">Enroll Now</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
