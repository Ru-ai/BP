
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Briefcase, Linkedin, Instagram } from "lucide-react";

const teamMembers = [
  {
    name: "Siddharth Pathak",
    role: "Founder & CEO",
    image: "/lovable-uploads/bce9df07-2967-461e-8380-adc36b70b7e1.png",
    bio: "4+ years experience when it comes to scaling and growing businesses.",
    socialLinks: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/sidpreneur/", icon: Linkedin },
      { platform: "Instagram", url: "https://www.instagram.com/sidpreneur.biz/", icon: Instagram }
    ]
  },
  {
    name: "Archisman Mahapatra",
    role: "Co-founder & CSO",
    image: "/lovable-uploads/80a3405e-7a97-437c-bc5b-71c6c1f527da.png",
    bio: "3+ years expertise in strategic growth planning and sales optimization.",
    socialLinks: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/archisman-mahapatra/", icon: Linkedin },
      { platform: "Instagram", url: "https://www.instagram.com/arch1sman.biz/", icon: Instagram }
    ]
  }
];

export const TeamSection = () => {
  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('/subtle-dots.png')] opacity-5" />
      <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-pulse" style={{ animationDuration: '15s' }} />
      <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-accent/15 blur-[120px] animate-pulse" style={{ animationDuration: '20s' }} />
      
      {/* Floating geometric elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-accent/40 rounded-full animate-float" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute bottom-1/4 right-10 w-28 h-28 border border-accent/40 rounded-full animate-float" style={{ animationDelay: '1.4s' }}></div>
      <div className="absolute top-2/3 left-1/4 w-16 h-16 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '1.1s' }}></div>
      <div className="absolute top-1/3 right-1/5 w-12 h-12 border-2 border-accent/20 rounded-3xl rotate-45 animate-float" style={{ animationDelay: '1.7s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          {/* Enhanced section header with decorative elements */}
          <div className="inline-flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full"></div>
            <Link to="/profiles">
            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-accent/20 text-accent px-4 py-1 relative z-10">
              <Users className="w-4 h-4 mr-1" /> Our Team
            </Badge>
            </Link>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-navy mb-6 animate-fadeIn relative">
            <span className="relative z-10">Meet the Experts Behind Your Success</span>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/10 rounded-full blur-xl -z-10"></div>
          </h2>
          
          <p className="text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed">
            Our leadership team combines expertise in business scaling, operational excellence, and strategic growth to help your agency reach its full potential.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group"
              data-aos="fade-up"
              data-aos-delay={200 + index * 150}
            >
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl group-hover:shadow-2xl transition-all duration-500 rounded-2xl border border-white/20 overflow-hidden transform group-hover:-translate-y-3 group-hover:scale-[1.01]">
                {/* Enhanced card decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:bg-accent/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl group-hover:bg-accent/15 transition-all duration-700"></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col items-center text-center space-y-5">
                    {/* Enhanced avatar presentation */}
                    <div className="relative mb-2 group-hover:scale-105 transition-all duration-500 ease-out">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700"></div>
                      <Avatar className="w-36 h-36 ring-4 ring-white/40 shadow-xl group-hover:ring-accent/30 transition-all duration-500 relative z-10">
                        <AvatarImage 
                          src={member.image} 
                          alt={member.name}
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          style={
                            member.name === "Archisman Mahapatra" 
                              ? { objectPosition: "center 15%" } 
                              : undefined
                          }
                        />
                        <AvatarFallback className="bg-accent/30 text-accent-light text-xl font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    {/* Enhanced member info with animated transitions */}
                    <div className="space-y-4 relative">
                      <div className="transition-all duration-500 ease-out">
                        <h3 className="text-2xl font-playfair font-semibold text-navy mb-1 group-hover:text-accent transition-colors duration-300">
                          {member.name}
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Briefcase className="w-4 h-4 text-accent" />
                          <p className="text-navy/70 font-medium">
                            {member.role}
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-transparent via-accent/10 to-transparent h-px w-3/4 mx-auto mb-4"></div>
                        <p className="text-navy/80 leading-relaxed transition-all duration-300 group-hover:text-navy">
                          {member.bio}
                        </p>
                      </div>
                      
                      {/* Social links with proper icons */}
                      <div className="pt-3 flex items-center justify-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {member.socialLinks.map((link, i) => {
                          const Icon = link.icon;
                          return (
                            <a 
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-all duration-300 hover:scale-110 hover:shadow-lg"
                              aria-label={`${member.name}'s ${link.platform}`}
                            >
                              <Icon className="w-5 h-5" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
