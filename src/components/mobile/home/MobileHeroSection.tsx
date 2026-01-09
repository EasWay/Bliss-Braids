'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function MobileHeroSection() {
  const [imageOpacity, setImageOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll handler for mobile fade effect
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start fading when user scrolls 20% of viewport height
      const fadeStart = windowHeight * 0.2;
      // Complete fade at 80% of viewport height
      const fadeEnd = windowHeight * 0.8;
      
      if (scrollY <= fadeStart) {
        setImageOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setImageOpacity(0);
      } else {
        // Calculate opacity between fadeStart and fadeEnd
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setImageOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden -mt-20">
      {/* Static Image Background */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{ opacity: imageOpacity }}
      >
        <Image
          src="/images/hero-poster1.jpg"
          alt="Professional braiding services - Bliss Braids Accra"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Enhanced Gradient Overlay for better contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ease-out"
        style={{ opacity: imageOpacity }}
      />

      {/* Content - Bottom positioned, left aligned */}
      <div className="relative h-full flex flex-col justify-end px-4 md:px-8 lg:px-12 pb-16 md:pb-20">
        <div className="max-w-2xl">
          {/* Title with stylish underline */}
          <div className="relative inline-block mb-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Bliss Braids
            </h1>
            {/* Slanted underline */}
            <div className="absolute -bottom-1 left-0 w-24 md:w-32 h-1 transform -skew-x-12" style={{ backgroundColor: '#F50057' }}></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-3 leading-tight">
            No waiting. No drama. Just flawless hair in comfort.
          </p>
          
          {/* Trust Badges - Single line */}
          <div className="flex items-center gap-4 text-white/80 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F50057' }} />
              <span>Private 1-on-1</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F50057' }} />
              <span>Air Conditioned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F50057' }} />
              <span>Secure Environment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}