'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User, Wind, Shield, Coffee } from 'lucide-react';

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    id: 'private',
    icon: <User className="w-6 h-6" />,
    title: 'Private 1-on-1 Sessions',
    description: 'Enjoy personalized attention in a private setting. Your braiding session is exclusively yours with no distractions or waiting times.',
  },
  {
    id: 'comfort',
    icon: <Wind className="w-6 h-6" />,
    title: 'Personalised Comfort',
    description: 'Relax in your preferred environment so you can feel comfortable during long braiding sessions.',
  },
  {
    id: 'security',
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure Environment',
    description: 'Feel safe and secure in our professional home setting. Bring a friend or two - we welcome your companions in our trusted space.',
  },
  {
    id: 'amenities',
    icon: <Coffee className="w-6 h-6" />,
    title: 'Complimentary Services',
    description: 'Stream your favorite shows on Netflix, stay connected with high-speed Wi-Fi, you can bring snacks and drinks - all included at no extra cost.',
  }
];

export default function DesktopWhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 overflow-hidden bg-[#020119]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block relative">
            <h2 className="text-3xl font-bold text-white">
              Why Bliss Braids is <span style={{ color: '#F50057' }}>Different</span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5" style={{ backgroundColor: '#F50057' }}></div>
          </div>
          <p className="text-base max-w-2xl mx-auto mt-6 text-white/80">
            Experience luxury in the comfort of a private, professional home setting.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex items-center gap-6">
          {/* Left Side - First 2 Cards */}
          <div className="flex-1">
            <div className="space-y-3">
              {benefits.slice(0, 2).map((benefit) => (
                <div
                  key={benefit.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 flex items-start gap-3"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" 
                       style={{ backgroundColor: 'rgba(245, 0, 87, 0.2)' }}>
                    <div style={{ color: '#F50057' }}>
                      {benefit.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle - Beauty Salon SVG */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <div className="relative w-64 flex justify-center">
              <img
                src="/svg/Beauty salon.svg"
                alt="Beauty Salon Illustration"
                className="w-full h-auto"
                style={{ maxHeight: '320px' }}
              />
            </div>
          </div>

          {/* Right Side - Last 2 Cards */}
          <div className="flex-1">
            <div className="space-y-3">
              {benefits.slice(2, 4).map((benefit) => (
                <div
                  key={benefit.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 flex items-start gap-3"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" 
                       style={{ backgroundColor: 'rgba(245, 0, 87, 0.2)' }}>
                    <div style={{ color: '#F50057' }}>
                      {benefit.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
