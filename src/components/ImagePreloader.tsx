'use client';

import { useEffect } from 'react';

// Critical images that need immediate loading
const CRITICAL_IMAGES = [
  '/images/configurator/Knotless braids.jpg',
  '/images/configurator/jumbo braids.jpg',
  '/images/configurator/spiral braids.jpg',
  '/images/configurator/Boho braids.jpg',
  '/images/configurator/base-model.png',
  '/images/portfolio/Knotless-1.jpg',
];

// Secondary images that can load after critical ones
const SECONDARY_IMAGES = [
  '/images/configurator/Island twist.jpg',
  '/images/configurator/Lemonoade or Cornrow Rasta.jpg',
  '/images/configurator/Cornrow pony.jpg',
  '/images/configurator/Faux or Butterfly Locs.jpg',
  '/images/configurator/Kinky twist.png',
  '/images/configurator/braid size.webp',
  '/images/configurator/Shoulder length.jpg',
  '/images/configurator/Waist length.jpg',
  '/images/configurator/butt length.jpg',
  '/images/configurator/Boho curls.jpg',
  '/images/configurator/Boho curls and beads and premium edges.jpg',
  '/images/configurator/boho-curls-beads.jpg',
  '/images/configurator/addon-curls.png',
  '/images/configurator/extension-waist.png',
  '/images/configurator/shoulder.png',
  '/images/Butterfly lock.jpg',
  '/images/Cornrow rasta.jpg',
  '/images/Boho braids.jpg',
  '/images/Island twist.jpg',
  '/images/Cornrow pony.jpg',
];

export default function ImagePreloader() {
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = CRITICAL_IMAGES.length + SECONDARY_IMAGES.length;

    // Preload critical images first
    const preloadCritical = () => {
      CRITICAL_IMAGES.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          console.log(`✅ Critical image loaded (${loadedCount}/${CRITICAL_IMAGES.length}): ${src}`);
          
          // Start loading secondary images after first few critical ones load
          if (loadedCount >= 3) {
            setTimeout(preloadSecondary, 100);
          }
        };
        img.onerror = () => {
          console.warn(`❌ Failed to load critical image: ${src}`);
        };
      });
    };

    // Preload secondary images
    const preloadSecondary = () => {
      SECONDARY_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            console.log('🎉 All images preloaded successfully!');
          }
        };
        img.onerror = () => {
          console.warn(`❌ Failed to load secondary image: ${src}`);
        };
      });
    };

    // Add resource hints to document head for even faster loading
    const addResourceHints = () => {
      CRITICAL_IMAGES.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Start the preloading process
    addResourceHints();
    
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => preloadCritical());
    } else {
      setTimeout(preloadCritical, 0);
    }

    return () => {
      // Cleanup: remove resource hints if needed
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach(link => {
        if (CRITICAL_IMAGES.includes(link.getAttribute('href') || '')) {
          link.remove();
        }
      });
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}