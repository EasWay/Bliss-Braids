'use client';

import React, { useState, useEffect } from 'react';
import { services } from '@/data/services';
import { getServiceImages } from '@/data/serviceImages';
import { getServiceGalleryImages } from '@/data/serviceGalleryImages';
import Image from 'next/image';
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileFooter from '@/components/mobile/MobileFooter';
import { SmartLink } from '@/components/ui/smart-link';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceDetailsDrawer } from '@/components/services/ServiceDetailsDrawer';

// Skeleton Card Component
function ServiceCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-8 w-full rounded-lg mt-3" />
      </div>
      <Skeleton className="h-1 w-full rounded-none" />
    </div>
  );
}

export default function MobileServiceGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Stagger the card animations
      services.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 100); // 100ms delay between each card
      });
    }
  }, [isLoading]);

  return (
    <>
      <MobileHeader />
      <div className="min-h-screen pt-16" style={{ backgroundColor: '#020119' }}>
        <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">
              Our Services
            </h1>
            <p className="text-base text-white/80">
              Professional braiding with transparent pricing
            </p>
          </div>

          {/* Services Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-4">
            {isLoading ? (
              // Show skeleton loaders
              Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))
            ) : (
              services.map((service, index) => {
              const images = getServiceImages(service.id);
              const firstImage = images[0];
              const isVisible = visibleCards.includes(index);
              
              return (
                <div
                  key={service.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  {/* Media Container - Smaller */}
                  <div className="relative h-40 w-full overflow-hidden">
                    {firstImage.type === 'video' ? (
                      <video
                        src={firstImage.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full scale-105"
                        style={{
                          objectFit: 'cover',
                          objectPosition: firstImage.position,
                        }}
                      />
                    ) : (
                      <Image
                        src={firstImage.src}
                        alt={service.name}
                        fill
                        className="scale-105"
                        style={{
                          objectFit: 'cover',
                          objectPosition: firstImage.position,
                        }}
                        sizes="50vw"
                        priority
                      />
                    )}
                    
                    {/* Overlay - Always visible */}
                    <div className="absolute inset-0 bg-black opacity-20" />
                    
                    {/* Price badge */}
                    <div className="absolute top-2 right-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
                        <span className="text-xs font-semibold text-gray-900">
                          GH₵{service.basePrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content - Compact */}
                  <div className="p-3">
                    <h3 className="text-sm font-bold mb-1 line-clamp-1" style={{ color: '#F50057' }}>
                      {service.name}
                    </h3>
                    <p className="text-xs text-white/70 leading-snug mb-3 line-clamp-2">
                      {service.description}
                    </p>

                    {/* View button with Drawer - Always in active state */}
                    <ServiceDetailsDrawer
                      service={{
                        id: service.id,
                        name: service.name,
                        description: service.description,
                        price: service.basePrice,
                        image: firstImage.src,
                        gallery: getServiceGalleryImages(service.id).length > 0 
                          ? getServiceGalleryImages(service.id)
                          : images.map(img => img.src),
                        duration: `${service.baseDuration} hours`,
                        sizeVariants: service.sizeVariants,
                        lengthVariants: service.lengthVariants,
                      }}
                    >
                      <button
                        className="w-full py-2 px-3 rounded-lg font-semibold text-xs text-white shadow-md transition-all active:scale-95"
                        style={{ backgroundColor: '#F50057' }}
                      >
                        View Details
                      </button>
                    </ServiceDetailsDrawer>
                  </div>

                  {/* Active indicator - Always visible */}
                  <div className="h-1" style={{ backgroundColor: '#F50057' }} />
                </div>
              );
            })
            )}
          </div>

          {/* Bottom CTA - Compact */}
          <div className="mt-8">
            <div className="rounded-xl shadow-sm p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-2">
                Need Help Choosing?
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Our team can help you find the perfect style for your hair.
              </p>
              <div className="flex gap-2 justify-center">
                <SmartLink
                  href="/contact"
                  className="px-3 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-xs active:scale-95 transition-transform text-center border border-white/20"
                >
                  Contact Us
                </SmartLink>
                <SmartLink
                  href="/portfolio"
                  className="px-3 py-2 text-white rounded-lg font-semibold text-xs active:scale-95 transition-transform text-center border border-white/20"
                  style={{ backgroundColor: 'rgba(245, 0, 87, 0.6)' }}
                >
                  View Portfolio
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Mobile Footer */}
        <MobileFooter />
      </div>
    </>
  );
}
