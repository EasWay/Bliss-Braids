'use client';

import { useState, useMemo } from 'react';
import { PortfolioImage as OptimizedPortfolioImage } from '@/components/ui/OptimizedImage';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCategory, PortfolioImage } from '@/types';
import { portfolioImages } from '@/data/portfolio';
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileFooter from '@/components/mobile/MobileFooter';

const filters: { value: 'all' | ServiceCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'box-braids', label: 'Box Braids' },
  { value: 'knotless', label: 'Knotless' },
  { value: 'cornrows', label: 'Cornrows' },
  { value: 'locs', label: 'Locs' },
  { value: 'twists', label: 'Twists' }
];

export default function MobilePortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | ServiceCategory>('all');
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  // Filter images based on active filter
  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioImages;
    }
    return portfolioImages.filter((image) => image.category === activeFilter);
  }, [activeFilter]);

  const handleImageTap = (imageId: string) => {
    setSelectedImageId(selectedImageId === imageId ? null : imageId);
  };

  return (
    <>
      <MobileHeader />
      <div className="min-h-screen bg-white">
        {/* Sticky Header with Filters */}
        <div className="sticky top-16 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        {/* Minimalist Title */}
        <div className="px-4 pt-6 pb-3">
          <h1 className="text-sm font-semibold text-charcoal tracking-wide uppercase">
            Gallery view
          </h1>
          <p className="text-xs text-slate mt-1">
            Tap any image to view details
          </p>
        </div>

        {/* Horizontal Scrollable Filter Pills */}
        <div className="overflow-x-auto scrollbar-hide pb-4 px-4">
          <div className="flex gap-2 min-w-max">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  whitespace-nowrap touch-manipulation
                  ${
                    activeFilter === filter.value
                      ? 'bg-charcoal text-white shadow-md'
                      : 'bg-white text-charcoal border border-gray-200 active:bg-gray-50'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Gallery using CSS Columns */}
      <motion.div
        layout
        className="columns-2 gap-3 px-3 py-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid mb-3"
            >
              <div
                className="relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => handleImageTap(image.id)}
              >
                <OptimizedPortfolioImage
                  src={image.url}
                  alt={image.styleName}
                  width={400}
                  height={image.aspectRatio === 'portrait' ? 533 : image.aspectRatio === 'square' ? 400 : 300}
                  className="w-full h-auto"
                  quality={85}
                />

                {/* Tap-to-Reveal Overlay */}
                <AnimatePresence>
                  {selectedImageId === image.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end"
                    >
                      <div className="p-4 w-full">
                        <h3 className="text-white font-bold text-lg">
                          {image.styleName}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12 px-4">
          <p className="text-slate text-sm">No images found for this category.</p>
        </div>
      )}

      {/* Floating Book Now Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
        <a
          href="/booking"
          className="bg-charcoal text-white px-8 py-4 rounded-full shadow-2xl 
                     font-semibold text-base flex items-center gap-2 
                     hover:bg-charcoal/90 active:scale-95 transition-all"
        >
          Book Your Style
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </a>
      </div>
      </div>
      <MobileFooter />
    </>
  );
}
