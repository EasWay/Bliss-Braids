'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { services } from '@/data/services';
import { getServiceImages, ServiceMedia } from '@/data/serviceImages';
import { ServiceImage } from '@/components/ui/OptimizedImage';

export default function ServiceGrid() {
  const router = useRouter();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [imageTransitioning, setImageTransitioning] = useState<{ [key: string]: boolean }>({});
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Initialize image indices and transition states
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

  // Handle image cycling on hover
  const handleMouseEnter = (serviceId: string) => {
    setHoveredService(serviceId);
    const images = getServiceImages(serviceId);
    
    if (images.length > 1) {
      // Start cycling through images with fade effect
      intervalRefs.current[serviceId] = setInterval(() => {
        // Start fade out
        setImageTransitioning(prev => ({ ...prev, [serviceId]: true }));
        
        // After fade out, change image and fade in
        setTimeout(() => {
          setCurrentImageIndex(prev => ({
            ...prev,
            [serviceId]: (prev[serviceId] + 1) % images.length
          }));
          
          // End transition after a brief moment
          setTimeout(() => {
            setImageTransitioning(prev => ({ ...prev, [serviceId]: false }));
          }, 100);
        }, 500); // Half of the transition duration
      }, 3500); // Change image every 3.5 seconds for slower, more comfortable viewing
    }
  };

  const handleMouseLeave = (serviceId: string) => {
    setHoveredService(null);
    
    // Clear interval and reset to first image
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

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional braiding services with transparent pricing. Choose your style and book instantly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const images = getServiceImages(service.id);
            const currentImageData = images[currentImageIndex[service.id] || 0];
            const isTransitioning = imageTransitioning[service.id] || false;
            
            return (
              <div
                key={service.id}
                className={`group relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 ${
                  hoveredService === service.id 
                    ? 'shadow-xl border-pink-200 transform -translate-y-2' 
                    : 'hover:shadow-lg hover:border-gray-300'
                }`}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={() => handleMouseLeave(service.id)}
                onClick={() => router.push(`/booking?style=${service.id}`)}
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
                    <ServiceImage
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
                      priority={currentImageIndex[service.id] === 0}
                    />
                  )}
                  
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    hoveredService === service.id ? 'opacity-20' : 'opacity-0'
                  }`} />
                  
                  {/* Price badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                      <span className="text-sm font-semibold text-gray-900">
                        From GH₵{service.basePrice}
                      </span>
                    </div>
                  </div>

                  {/* Media counter for multiple items */}
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
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Service details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Base Price:</span>
                    <span className="font-semibold text-gray-900">GH₵{service.basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-semibold text-gray-900 capitalize">
                      {service.category.replace('-', ' ')}
                    </span>
                  </div>
                  {images.length > 1 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Gallery:</span>
                      <span className="font-semibold text-gray-900">
                        {images.length} {images.some(img => img.type === 'video') ? 'media' : 'photos'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    hoveredService === service.id
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/booking?style=${service.id}`);
                  }}
                >
                  {hoveredService === service.id ? 'Book This Style' : 'Select Service'}
                </button>
              </div>

                {/* Interactive indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-pink-600 transition-all duration-300 ${
                  hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-gray-600 mb-6">
              Not sure which style is right for you? Our team can help you find the perfect braiding style for your hair type and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/contact')}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => router.push('/portfolio')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}