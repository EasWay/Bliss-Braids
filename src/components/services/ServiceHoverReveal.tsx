'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity, AnimatePresence } from 'framer-motion';
import { services } from '@/data/services'; // Importing your real data
import Image from 'next/image';

export default function ServiceHoverReveal() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // --- PHYSICS ENGINE ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 1. The "Float" (Spring Physics)
  // Damping: 20 makes it feel heavy. Stiffness: 150 makes it responsive.
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // 2. The "Swing" (Velocity Rotation)
  // We calculate how fast the mouse is moving horizontally
  const xVelocity = useVelocity(x);
  // We tilt the image between -15deg and 15deg based on that speed
  const rotate = useTransform(xVelocity, [-1000, 1000], [-15, 15]);
  // Smooth out the rotation so it's not jittery
  const smoothRotate = useSpring(rotate, { damping: 20, stiffness: 200 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Helper to format category names (e.g., 'box-braids' -> 'Box Braids')
  const formatCategory = (cat: string) => {
    return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <section className="relative min-h-screen bg-white text-slate-900 py-24 px-4 overflow-hidden cursor-default">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left border-b border-slate-200 pb-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-3">
            Service Menu
          </h2>
          <p className="text-slate-500 text-base md:text-lg">
            Hover to preview style & price
          </p>
        </div>
        
        {/* The Service List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative border-b border-slate-200 transition-colors hover:bg-slate-50"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="py-6 px-4 md:px-6 flex items-center justify-between relative z-20">
                
                {/* Left: Name */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors duration-300">
                    {service.name}
                  </h3>
                  {/* Mobile Only Description (since hover doesn't exist on phones) */}
                  <p className="md:hidden text-slate-500 text-sm mt-1">
                    {service.description}
                  </p>
                </div>
                
                {/* Right: Price & Category */}
                <div className="text-right ml-4">
                  <p className="text-lg md:text-xl font-bold text-slate-900">
                    GH₵{service.basePrice}<span className="text-sm text-slate-400 font-normal">+</span>
                  </p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mt-1 hidden md:block">
                    {formatCategory(service.category)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <a
            href="/booking"
            className="inline-block bg-primary text-white px-12 py-5 rounded-full 
                       hover:bg-primary/90 transition-all font-bold text-xl
                       shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Start Your Transformation
          </a>
        </div>
      </div>

      {/* --- THE FLOATING REVEAL (Desktop Only) --- */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }} // "Snappy" easing
            className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
            style={{
              x, // Follow mouse X (spring)
              y, // Follow mouse Y (spring)
              rotate: smoothRotate, // Tilt based on velocity
              translateX: "-50%", // Center on cursor
              translateY: "-50%",
            }}
          >
            {/* The Image Card */}
            <div className="relative w-[380px] h-[480px] rounded-xl overflow-hidden shadow-2xl bg-white border-4 border-white transform translate-x-12 translate-y-12">
              <Image
                src={services[activeIndex].image || '/images/placeholder.jpg'} // Fallback safety
                alt={services[activeIndex].name}
                fill
                className="object-cover"
                sizes="400px"
                priority
              />
              
              {/* Optional: Dark Overlay for text legibility if you want text over image */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Tag at bottom of image */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-slate-900">
                {formatCategory(services[activeIndex].category)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}