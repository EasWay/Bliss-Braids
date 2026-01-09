'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceCategory, PortfolioImage } from '@/types';
import { portfolioImages } from '@/data/portfolio';
import FilterPills from '@/components/portfolio/FilterPills';
import InfiniteMenu from '@/components/ui/InfiniteMenu';

export default function DesktopPortfolioPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | ServiceCategory>('all');

  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioImages;
    }
    return portfolioImages.filter((image) => image.category === activeFilter);
  }, [activeFilter]);

  const handleItemClick = (portfolioImage: PortfolioImage) => {
    // Navigate to booking page with pre-selected style
    router.push(`/booking?style=${portfolioImage.id}&category=${portfolioImage.category}`);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#020119' }}>
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Portfolio
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-6">
              Discover our stunning collection of braiding styles. Each piece showcases our commitment to excellence and artistry.
            </p>
            
            {/* Interactive Instructions */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/70 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
              </svg>
              Drag to explore • Click arrow to book
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mb-12">
            <FilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          {/* InfiniteMenu Display */}
          {filteredImages.length > 0 ? (
            <div className="w-full">
              <div style={{ height: '600px', position: 'relative' }}>
                <InfiniteMenu 
                  portfolioImages={filteredImages}
                  scale={2.3}
                  onItemClick={handleItemClick}
                />
              </div>
              
              {/* Stats and Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-white/60 text-sm">
                  Showing {filteredImages.length} style{filteredImages.length !== 1 ? 's' : ''} 
                  {activeFilter !== 'all' && (
                    <span> in {activeFilter.replace('-', ' ')} category</span>
                  )}
                </p>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => router.push('/booking')}
                    className="px-6 py-2 bg-[#F50057] hover:bg-[#F50057]/90 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                    </svg>
                    Book Now
                  </button>
                  
                  <button
                    onClick={() => router.push('/services')}
                    className="px-6 py-2 border border-white/20 hover:border-white/40 text-white font-medium rounded-lg transition-colors duration-300"
                  >
                    View Services
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No styles found</h3>
                <p className="text-white/60 mb-6">
                  No images found for the selected category. Try selecting a different filter.
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="px-6 py-2 bg-[#F50057] hover:bg-[#F50057]/90 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Show All Styles
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
