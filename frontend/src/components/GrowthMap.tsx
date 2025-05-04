import React from 'react';
import { ChevronRight, SearchCheck, AlignHorizontalJustifyCenter, ClipboardList } from 'lucide-react';

export const GrowthMap = () => {
  return (
    <section className="py-20 bg-cream overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/subtle-dots.png')] opacity-5" />
      <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />

      {/* Floating circles */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '0.9s' }}></div>
      <div className="absolute bottom-1/3 left-1/5 w-16 h-16 border border-accent/20 rounded-full animate-float" style={{ animationDelay: '1.3s' }}></div>
      <div className="absolute top-1/2 right-1/6 w-12 h-12 border border-accent/25 rounded-full animate-float" style={{ animationDelay: '0.6s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-center text-navy mb-16 tracking-tight relative" data-aos="fade-up">
          <span className="relative z-10">Our Proven Path to Growth</span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-12 bg-accent/10 rounded-full blur-xl -z-10"></div>
        </h2>

        {/* Roadmap Container */}
        <div className="max-w-5xl mx-auto relative" data-aos="fade-up">
          {/* Connecting Line */}
          <div className="absolute top-0 bottom-0 left-[50%] w-1 bg-gradient-to-b from-accent/20 via-accent to-accent/20 transform -translate-x-1/2 hidden md:block" />

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 relative">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right order-1 md:order-1" data-aos="fade-right">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                <h3 className="text-2xl font-semibold text-navy mb-4 font-playfair">Deep Dive Discovery</h3>
                <p className="text-navy/80 leading-relaxed">We break down your business, inside and out — offers, systems, sales, and structure. The goal? To uncover what’s holding you back and what’s worth doubling down on.</p>
              </div>
            </div>

            {/* Timeline Node */}
            <div className="z-20 flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-md"></div>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-white shadow-lg relative z-10">
                  <SearchCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-12 order-3 invisible md:visible">
              {/* Placeholder for layout balance */}
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 relative">
            <div className="md:w-1/2 md:pr-12 invisible md:visible order-1">
              {/* Placeholder for layout balance */}
            </div>

            {/* Timeline Node */}
            <div className="z-20 flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-md"></div>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-white shadow-lg relative z-10">
                  <AlignHorizontalJustifyCenter className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 text-left order-3" data-aos="fade-left">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative z-10 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2 blur-xl"></div>
                <h3 className="text-2xl font-semibold text-navy mb-4 font-playfair">Assessment and Alignment</h3>
                <p className="text-navy/80 leading-relaxed">We map your goals to market realities and internal capabilities. This is where we align the vision with what’s actually achievable and scalable.</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center relative">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right order-1 md:order-1" data-aos="fade-right">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                <h3 className="text-2xl font-semibold text-navy mb-4 font-playfair">Solution Review and Delivery</h3>
                <p className="text-navy/80 leading-relaxed">You’ll get a clear plan of action, priority fixes, and strategic recommendations. We walk you through it all — so you know exactly what to do, why, and in what order.</p>
              </div>
            </div>

            {/* Timeline Node */}
            <div className="z-20 flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-md"></div>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-white shadow-lg relative z-10">
                  <ClipboardList className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-12 order-3 invisible md:visible">
              {/* Placeholder for layout balance */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
