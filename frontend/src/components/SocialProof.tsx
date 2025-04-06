
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const brands = [
  { name: "Match Matters", logo: "/lovable-uploads/60ee99c7-9479-4e70-980f-8e0e5d6b974c.png" },
  { name: "Brad Advertising", logo: "/lovable-uploads/b6afdc90-0722-4aac-9f19-2e44940d404e.png" },
  { name: "RetailProX", logo: "/lovable-uploads/7f38b136-515c-46a1-8e51-6cf0e2f656b8.png" },
  { name: "Kaelir", logo: "/lovable-uploads/3fa43530-26d4-4a82-861d-38cec8c221bc.png" },
];

export const SocialProof = () => {
  const [api, setApi] = useState<any>(null);
  
  // Automatically scroll the carousel
  useEffect(() => {
    if (!api) return;
    
    // Create an interval to automatically scroll the carousel
    const autoPlayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Reset to the beginning when reaching the end
      }
    }, 2000); // Changed from 3000 to 2000 (faster speed)
    
    return () => clearInterval(autoPlayInterval);
  }, [api]);
  
  return (
    <div className="relative py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy to-navy/90" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/10 via-accent/30 to-accent/10" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent/10 via-accent/30 to-accent/10" />
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/subtle-dots.png')] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-20" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-8">
          <h3 className="relative inline-block text-cream font-playfair text-2xl mb-3 tracking-wide">
            <span className="relative z-10">Trusted by Leading Agencies and Companies</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></span>
          </h3>
          <p className="text-cream/70 max-w-md mx-auto">
            Join the community of successful businesses leveraging our proven growth strategies
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Glow behind carousel */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 bg-accent/5 blur-xl rounded-full"></div>
          
          <Carousel 
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent className="py-6">
              {/* Duplicate the brands array to create a continuous loop effect */}
              {[...brands, ...brands].map((brand, index) => (
                <CarouselItem 
                  key={index} 
                  className="basis-1/3 md:basis-1/3 lg:basis-1/3 flex justify-center"
                >
                  <div 
                    className={cn(
                      "w-48 h-24 relative flex items-center justify-center", // Increased from w-40 h-20 to w-48 h-24
                      "transition-all duration-500 transform",
                      "hover:scale-110 hover:-translate-y-2",
                      "rounded-xl backdrop-blur-sm bg-white/10 p-3",
                      "border border-white/10",
                      "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
                      "hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]"
                    )}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
