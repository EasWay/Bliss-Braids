'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User, Wind, Shield, Coffee } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  expandedText: string; // Simple text that shows when accordion expands
  hoverImage?: string;
  stat?: {
    number: number;
    suffix: string;
    label: string;
  };
}

const benefits: Benefit[] = [
  {
    id: 'private',
    icon: <User className="w-4 h-4 md:w-8 md:h-8" />,
    title: 'Private 1-on-1 Sessions',
    description: 'No crowds, no waiting, just you and me',
    expandedText: 'Enjoy personalized attention in a private setting. Your braiding session is exclusively yours with no distractions or waiting times.',
    hoverImage: '/images/private-session.jpg',
    stat: { number: 100, suffix: '%', label: 'Privacy Guaranteed' }
  },
  {
    id: 'comfort',
    icon: <Wind className="w-4 h-4 md:w-8 md:h-8" />,
    title: 'Personalised Comfort',
    description: 'Choose your own preferred and comfortable location',
    expandedText: 'Relax in your preferred environment so you can feel comfortable during long braiding sessions.',
    hoverImage: '/images/Comfort.png',
    stat: { number: 22, suffix: '°C', label: 'Perfect Temperature' }
  },
  {
    id: 'security',
    icon: <Shield className="w-4 h-4 md:w-8 md:h-8" />,
    title: 'Secure Environment',
    description: 'Safe place for you and your +1 or 2',
    expandedText: 'Feel safe and secure in our professional home setting. Bring a friend or two - we welcome your companions in our trusted space.',
    hoverImage: '/images/Secure-environment.webp',
    stat: { number: 500, suffix: '+', label: 'Happy Clients' }
  },
  {
    id: 'amenities',
    icon: <Coffee className="w-4 h-4 md:w-8 md:h-8" />,
    title: 'Complimentary Services',
    description: 'Netflix, and Wi-Fi while we braid',
    expandedText: 'Stream your favorite shows on Netflix, stay connected with high-speed Wi-Fi, you can bring snacks and drinks - all included at no extra cost.',
    hoverImage: '/images/complimentary.jpeg',
    stat: { number: 0, suffix: '', label: 'Extra Charges' }
  }
];

export default function WhyChooseUsSection() {
  const [animatedStats, setAnimatedStats] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const animateCounter = (id: string, target: number) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setAnimatedStats(prev => ({ ...prev, [id]: Math.floor(current) }));
    }, duration / steps);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start stat animations
          benefits.forEach((benefit) => {
            if (benefit.stat) {
              animateCounter(benefit.id, benefit.stat.number);
            }
          });
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
    <section ref={sectionRef} className="py-8 md:py-16 px-4 overflow-hidden bg-[#020119] md:bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 md:mb-12 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block relative">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white md:text-gray-800 whitespace-nowrap">
              Why Bliss Braids is <span style={{ color: '#F50057' }}>Different</span>
            </h2>
            {/* Minimalist underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5" style={{ backgroundColor: '#F50057' }}></div>
          </div>
          <p className="text-sm md:text-base max-w-2xl mx-auto mt-4 text-white/80 md:text-gray-600">
            Experience luxury in the comfort of a private, professional home setting.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Mobile Accordion / Desktop Carousel */}
          <div className="w-full lg:w-1/2 lg:mr-8">
            {/* Mobile Accordion */}
            <div className="block lg:hidden w-full max-w-sm mx-auto">
              <Accordion.Root type="multiple" className="space-y-4">
                {benefits.map((benefit) => (
                  <Accordion.Item
                    key={benefit.id}
                    value={benefit.id}
                    className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(245, 0, 87, 0.2)' }}>
                            <div style={{ color: '#F50057' }}>
                              {benefit.icon}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-xs mb-0.5 text-white">
                              {benefit.title}
                            </h3>
                            <p className="text-xs text-white/60">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                        <ChevronDown 
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" 
                          style={{ color: '#F50057' }}
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-3 pb-3 pt-1">
                        <p className="text-xs leading-relaxed text-white/70">
                          {benefit.expandedText}
                        </p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* Desktop Carousel */}
            <div className="hidden lg:block">
              <Carousel
                plugins={[plugin.current]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                orientation="vertical"
                className="w-full max-w-xs mx-auto lg:mx-0"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-mt-1 h-[500px]">
                  {benefits.map((benefit) => (
                    <CarouselItem key={benefit.id} className="pt-1 basis-1/2">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center p-6 min-h-[220px]">
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-full flex items-center justify-center 
                                           mb-4 transition-all duration-300" style={{ backgroundColor: 'rgba(245, 0, 87, 0.1)' }}>
                              <div style={{ color: '#F50057' }}>
                                {benefit.icon}
                              </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-base font-bold mb-2 text-center leading-tight" style={{ color: '#111827' }}>
                              {benefit.title}
                            </h3>
                            <p className="text-sm mb-4 leading-tight text-center" style={{ color: '#6B7280' }}>
                              {benefit.description}
                            </p>

                            {/* Animated stat */}
                            {benefit.stat && (
                              <div className="text-center">
                                <div className="text-xl font-bold mb-1" style={{ color: '#F50057' }}>
                                  {animatedStats[benefit.id] || 0}{benefit.stat.suffix}
                                </div>
                                <div className="text-xs font-medium" style={{ color: '#6B7280' }}>
                                  {benefit.stat.label}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          {/* Right Side - Beauty Salon SVG */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-xs lg:max-w-md flex justify-center">
              <img
                src="/svg/Beauty salon.svg"
                alt="Beauty Salon Illustration"
                className="w-full h-auto mx-auto"
                style={{ maxHeight: '350px', maxWidth: '280px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}