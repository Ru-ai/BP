
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { MessageSquareQuote, Star, ChevronRight, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "Brad Partners helped us scale from $20K to $60K monthly revenue in just 3 months. Their systems are game-changing.",
    author: "Gautaman",
    role: "Founder, Kaelir",
    stars: 5,
    highlight: true
  },
  {
    quote: "The ROI from working with Brad Partners was immediate. They helped us optimize our processes and triple our revenue.",
    author: "Sumit",
    role: "Founder, Haute Pink",
    stars: 5
  },
  {
    quote: "Their proven systems and strategies transformed our agency. We're now doing $50K+ months consistently.",
    author: "Arun",
    role: "Founder, Brad Advertising",
    stars: 5
  },
];

export const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Set active index when carousel scrolls
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
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (api) {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        api.scrollTo(nextIndex);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, api]);

  return (
    <div className="py-20 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/subtle-dots.png')] opacity-5" />
      <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDuration: '14s' }} />
      
      {/* Floating circles */}
      <div className="absolute top-1/3 right-1/6 w-16 h-16 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-1/4 left-1/5 w-20 h-20 border border-accent/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-12 h-12 border border-accent/25 rounded-full animate-float" style={{ animationDelay: '1.1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-accent/20 text-accent px-4 py-1">
            <Users2 className="w-4 h-4 mr-2" /> Client Success Stories
          </Badge>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-center text-navy mb-12 relative">
          <span className="relative z-10">What Our Clients Say</span>
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
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-4">
                  <Card className={cn(
                    "p-8 bg-white/80 backdrop-blur-md shadow-lg transition-all duration-500 h-full relative overflow-hidden transform hover:-translate-y-2",
                    testimonial.highlight ? 
                      "border-accent/30 shadow-xl shadow-accent/10 hover:shadow-accent/20" : 
                      "border-navy/10 hover:shadow-xl"
                  )}>
                    {/* Card decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>
                    
                    {testimonial.highlight && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-bl-lg backdrop-blur-sm">
                          Featured
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-6 relative z-10">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                          <MessageSquareQuote className="w-6 h-6" />
                        </div>
                      </div>
                      
                      {/* Star Rating */}
                      <div className="flex items-center mb-6">
                        {Array(testimonial.stars).fill(0).map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      
                      <p className="text-navy/80 font-inter leading-relaxed italic text-lg">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="border-t border-navy/10 pt-4 mt-6 flex items-center justify-between">
                        <div>
                          <p className="font-playfair font-semibold text-xl text-navy">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-navy/60">{testimonial.role}</p>
                        </div>
                        
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
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (api) api.scrollTo(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-accent w-6" : "bg-accent/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
