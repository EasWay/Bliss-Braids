'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { services } from '@/data/services';
import { getServiceImages } from '@/data/serviceImages';
import { getServiceGalleryImages } from '@/data/serviceGalleryImages';
import { Service } from '@/types';
import Image from 'next/image';

export default function DesktopServicesPage() {
  const router = useRouter();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [imageTransitioning, setImageTransitioning] = useState<{ [key: string]: boolean }>({});
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    const initialIndices: { [key: string]: number } = {};
    const initialTransitions: { [key: string]: boolean } = {};
    services.forEach(service => {
      initialIndices[service.id] = 0;
      initialTransitions[service.id] = false;
    });
    setCurrentImageIndex(initialIndices);
    setImageTransitioning(initialTransitions);
  }, []);

  const handleMouseEnter = (serviceId: string) => {
    setHoveredService(serviceId);
    const images = getServiceImages(serviceId);
    
    if (images.length > 1) {
      intervalRefs.current[serviceId] = setInterval(() => {
        setImageTransitioning(prev => ({ ...prev, [serviceId]: true }));
        
        setTimeout(() => {
          setCurrentImageIndex(prev => ({
            ...prev,
            [serviceId]: (prev[serviceId] + 1) % images.length
          }));
          
          setTimeout(() => {
            setImageTransitioning(prev => ({ ...prev, [serviceId]: false }));
          }, 100);
        }, 500);
      }, 3500);
    }
  };

  const handleMouseLeave = (serviceId: string) => {
    setHoveredService(null);
    
    if (intervalRefs.current[serviceId]) {
      clearInterval(intervalRefs.current[serviceId]);
      delete intervalRefs.current[serviceId];
    }
    
    setCurrentImageIndex(prev => ({
      ...prev,
      [serviceId]: 0
    }));
    
    setImageTransitioning(prev => ({
      ...prev,
      [serviceId]: false
    }));
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setSelectedImageIndex(0); // Reset to first image
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
    setSelectedImageIndex(0);
  };

  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, []);

  return (
    <div className="min-h-screen pt-8 pb-20" style={{ backgroundColor: '#020119' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Our Services
          </h1>
          <div className="w-45 h-px bg-white mx-auto mb-4"></div>
          <p className="text-xl text-white/80 mx-auto whitespace-nowrap">
            Professional braiding services with transparent pricing. Choose your style and book instantly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 lg:px-16">
          {services.map((service) => {
            const images = getServiceImages(service.id);
            const currentImageData = images[currentImageIndex[service.id] || 0];
            const isTransitioning = imageTransitioning[service.id] || false;
            
            return (
              <div
                key={service.id}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  hoveredService === service.id 
                    ? 'shadow-xl transform -translate-y-2 bg-white/10' 
                    : 'hover:bg-white/8'
                }`}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={() => handleMouseLeave(service.id)}
                onClick={() => handleServiceClick(service)}
              >
                {/* Media Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  {currentImageData.type === 'video' ? (
                    <video
                      src={currentImageData.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`w-full h-full transition-all duration-1000 ease-in-out ${
                        hoveredService === service.id ? 'scale-105' : 'scale-100'
                      }`}
                      style={{
                        objectFit: 'cover',
                        objectPosition: currentImageData.position,
                        opacity: isTransitioning ? 0.4 : 1,
                        transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                      }}
                    />
                  ) : (
                    <Image
                      src={currentImageData.src}
                      alt={service.name}
                      fill
                      className={`transition-all duration-1000 ease-in-out ${
                        hoveredService === service.id ? 'scale-105' : 'scale-100'
                      }`}
                      style={{
                        objectFit: 'cover',
                        objectPosition: currentImageData.position,
                        opacity: isTransitioning ? 0.4 : 1,
                        transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={currentImageIndex[service.id] === 0}
                    />
                  )}
                  
                  <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    hoveredService === service.id ? 'opacity-20' : 'opacity-0'
                  }`} />
                  
                  {/* Price badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-[#F50057] backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                      <span className="text-sm font-semibold text-white">
                        From GH₵{service.basePrice}
                      </span>
                    </div>
                  </div>

                  {/* Media counter */}
                  {images.length > 1 && hoveredService === service.id && (
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-xs font-medium text-white">
                          {currentImageIndex[service.id] + 1} / {images.length}
                          {currentImageData.type === 'video' && ' 📹'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F50057] transition-colors">
                    {service.name}
                  </h3>

                  {/* Service details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Base Price:</span>
                      <span className="font-semibold text-white">GH₵{service.basePrice}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Category:</span>
                      <span className="font-semibold text-white capitalize">
                        {service.category.replace('-', ' ')}
                      </span>
                    </div>
                    {images.length > 1 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Gallery:</span>
                        <span className="font-semibold text-white">
                          {images.length} {images.some(img => img.type === 'video') ? 'media' : 'photos'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action button */}
                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      hoveredService === service.id
                        ? 'bg-[#F50057] text-white shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    {hoveredService === service.id ? 'View Details' : 'Select Service'}
                  </button>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#F50057] transition-all duration-300 ${
                  hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-white/70 mb-6">
              Not sure which style is right for you? Our team can help you find the perfect braiding style for your hair type and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/contact')}
                className="px-6 py-3 bg-[#F50057] text-white rounded-xl font-semibold hover:bg-[#F50057]/90 transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => router.push('/portfolio')}
                className="px-6 py-3 border border-white/20 text-white rounded-xl font-semibold hover:border-white/30 hover:bg-white/5 transition-colors"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Single Dialog for all services */}
        {isDialogOpen && selectedService && (
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            onClick={handleCloseDialog}
          >
            <div 
              className="bg-white rounded-xl p-0 w-96 mx-4 max-h-[90vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: '#020119', color: 'white' }}
            >
              <div className="p-6">
                
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={handleCloseDialog}
                    className="text-white/60 hover:text-white text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* --- MAIN IMAGE SECTION --- */}
                <div className="mb-6">
                  {/* Main Preview - Full Width */}
                  <div className="relative w-full h-64 overflow-hidden rounded-lg bg-white/5 shadow-sm mb-4">
                    {(() => {
                      const galleryImages = getServiceGalleryImages(selectedService.id);
                      const images = getServiceImages(selectedService.id);
                      
                      // Use gallery images if available, otherwise fall back to service images
                      if (galleryImages.length > 0) {
                        const currentImageSrc = galleryImages[selectedImageIndex];
                        return (
                          <Image
                            src={currentImageSrc}
                            alt={selectedService.name}
                            fill
                            className="object-contain"
                            priority
                          />
                        );
                      } else {
                        // Fallback to service images (videos/images)
                        const currentImage = images[0];
                        return currentImage?.type === 'video' ? (
                          <video
                            src={currentImage.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            style={{ objectPosition: currentImage.position }}
                          />
                        ) : (
                          <Image
                            src={currentImage?.src || selectedService.image || '/images/hero-fallback.jpg'}
                            alt={selectedService.name}
                            fill
                            className="object-contain"
                            priority
                          />
                        );
                      }
                    })()}
                  </div>
                  
                  {/* Thumbnails Row */}
                  {(() => {
                    const galleryImages = getServiceGalleryImages(selectedService.id);
                    const images = getServiceImages(selectedService.id);
                    
                    // Use gallery images if available
                    if (galleryImages.length > 1) {
                      return (
                        <div className="flex gap-2 justify-center">
                          {galleryImages.slice(0, 5).map((imageSrc, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedImageIndex(idx)}
                              className={`relative w-12 h-12 shrink-0 rounded-md overflow-hidden transition-all ${
                                selectedImageIndex === idx 
                                  ? "ring-2 ring-[#F50057]" 
                                  : "opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Image 
                                src={imageSrc} 
                                alt="thumb" 
                                fill 
                                className="object-contain"
                              />
                            </button>
                          ))}
                        </div>
                      );
                    } else if (images.length > 1) {
                      // Fallback to service images
                      return (
                        <div className="flex gap-2 justify-center">
                          {images.slice(0, 5).map((media, idx) => (
                            <button
                              key={idx}
                              className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden transition-all opacity-60 hover:opacity-100"
                            >
                              {media.type === 'video' ? (
                                <video
                                  src={media.src}
                                  className="w-full h-full object-cover"
                                  style={{ objectPosition: media.position }}
                                  muted
                                />
                              ) : (
                                <Image 
                                  src={media.src} 
                                  alt="thumb" 
                                  fill 
                                  className="object-contain"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>

                {/* --- SERVICE INFO SECTION --- */}
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                      {selectedService.name}
                    </h2>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-2xl font-bold text-[#F50057]">GHS {selectedService.basePrice}</span>
                      <span className="text-sm text-white/50 uppercase tracking-wide font-medium">Starting Price</span>
                    </div>
                  </div>

                  {/* Service Details Grid */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Available Sizes</h4>
                      <p className="text-sm text-white/90 font-medium leading-relaxed">
                        {Object.values(selectedService.sizeVariants).map(v => v.label).join(' • ')}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Available Lengths</h4>
                      <p className="text-sm text-white/90 font-medium leading-relaxed">
                        {Object.values(selectedService.lengthVariants).map(v => v.label).join(' • ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-white/80 bg-white/5 w-fit px-4 py-2 rounded-lg mx-auto">
                      <span>⏱️ Duration: ~{selectedService.baseDuration} hours</span>
                    </div>
                  </div>
                </div>

                {/* --- MIDDLE SECTION: Description --- */}
                <div className="mb-8">
                  <p className="text-sm text-white/70 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                {/* --- BOTTOM SECTION: Action --- */}
                <button 
                  className="w-full h-11 text-sm font-semibold bg-[#F50057] hover:bg-[#F50057]/90 text-white rounded-lg shadow-md shadow-[#F50057]/10 transition-transform active:scale-[0.98]"
                  onClick={() => {
                    handleCloseDialog();
                    router.push(`/booking?style=${selectedService.id}`);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
