'use client';

import { useState, useMemo } from 'react';
import { ServiceCategory } from '@/types';
import { portfolioImages } from '@/data/portfolio';
import FilterPills from './FilterPills';
import ImageCard from './ImageCard';

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | ServiceCategory>('all');

  // Filter images based on active filter
  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioImages;
    }
    return portfolioImages.filter((image) => image.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="py-16 px-4 bg-bg-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Our Braiding Artistry
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
            Explore our portfolio of stunning braiding styles. Each piece is crafted with precision and care.
          </p>
        </div>

        {/* Filter Pills */}
        <FilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Masonry Grid - 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate text-lg">No images found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
