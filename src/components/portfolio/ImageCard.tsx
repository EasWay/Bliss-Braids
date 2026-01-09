'use client';

import { PortfolioImage as OptimizedImage } from '@/components/ui/OptimizedImage';
import { PortfolioImage } from '@/types';

interface ImageCardProps {
  image: PortfolioImage;
}

export default function ImageCard({ image }: ImageCardProps) {
  // Determine aspect ratio class
  const aspectRatioClass = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  }[image.aspectRatio];

  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300" 
         style={{ backgroundColor: '#1a1a2e' }}>
      <div className={`relative w-full ${aspectRatioClass}`}>
        <OptimizedImage
          src={image.url}
          alt={image.styleName}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
          quality={80}
        />
        
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg mb-1">{image.styleName}</h3>
            <p className="font-medium" style={{ color: '#F50057' }}>
              Starting from GHS {image.basePrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
