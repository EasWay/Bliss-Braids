'use client';

import MobileHeroSection from '@/components/mobile/home/MobileHeroSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { Separator } from '@/components/ui/separator';
import MobileFooter from '@/components/mobile/MobileFooter';
import Image from 'next/image';
import Link from 'next/link';
import { SmartLink } from '@/components/ui/smart-link';

export default function MobileHomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020119' }}>
      {/* Hero Section - Mobile Optimized with Static Image */}
      <MobileHeroSection />
      
      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Services Preview - Horizontal Scroll */}
      <ServicesPreview />
      
      {/* Social Links - Compact */}
      <section className="py-6 px-4" style={{ backgroundColor: '#020119' }}>
        <div className="max-w-sm mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex h-8 items-center justify-center space-x-3 text-xs text-white/80">
              <a 
                href="https://tiktok.com/@blissbraids" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center hover:text-white transition-colors"
              >
                <div className="font-medium text-white text-sm">TikTok</div>
                <Separator className="bg-white/40 mt-1" />
              </a>
              <Separator orientation="vertical" className="bg-white/20" />
              <a 
                href="https://wa.me/233247173819" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center hover:text-white transition-colors"
              >
                <div className="font-medium text-white text-sm">WhatsApp</div>
                <Separator className="bg-white/40 mt-1" />
              </a>
              <Separator orientation="vertical" className="bg-white/20" />
              <div className="text-center">
                <div className="font-medium text-white text-sm">4.9★</div>
              </div>
              <Separator orientation="vertical" className="bg-white/20" />
              <div className="text-center">
                <div className="font-medium text-white text-sm">3+ Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview - Mobile Grid */}
      <section className="py-12 px-4" style={{ backgroundColor: '#020119' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Recent Transformations
          </h2>
          <p className="text-base mb-8 text-white/80">
            Every braid tells a story. Here are some of our latest masterpieces.
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image 
                src="/images/portfolio/Knotless-1.jpg"
                alt="Knotless Braids"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-white text-sm font-semibold">Knotless Braids</span>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image 
                src="/images/Butterfly lock.jpg"
                alt="Box Braids"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-white text-sm font-semibold">Box Braids</span>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image 
                src="/images/Cornrow rasta4.jpg"
                alt="Cornrows"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-white text-sm font-semibold">Cornrows</span>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image 
                src="/images/Boho braids.jpg"
                alt="Boho Braids"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-white text-sm font-semibold">Boho Braids</span>
              </div>
            </div>
          </div>
          
          <SmartLink
            href="/portfolio"
            className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 
                       transition-all duration-300 font-bold text-base border-2 border-white/30
                       shadow-lg active:scale-95 text-white"
          >
            View Full Portfolio
          </SmartLink>
        </div>
      </section>

      {/* Mobile Footer */}
      <MobileFooter />
    </div>
  );
}
