'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Predefined size configurations for common use cases
export const imageSizes = {
  // Portfolio images
  portfolio: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  
  // Service cards
  serviceCard: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  
  // Hero images
  hero: "100vw",
  
  // Thumbnails
  thumbnail: "(max-width: 768px) 25vw, 10vw",
  
  // Avatar/profile images
  avatar: "(max-width: 768px) 15vw, 8vw",
  
  // Gallery images
  gallery: "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
  
  // Full width images
  fullWidth: "100vw",
  
  // Sidebar images
  sidebar: "(max-width: 1024px) 0px, 20vw"
};

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-100 text-gray-400",
        fill ? "h-full w-full" : "",
        className
      )}>
        <span className="text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative overflow-hidden", 
      fill ? "h-full w-full" : "",
      className
    )}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          fill ? "object-cover" : ""
        )}
        // Force AVIF format for better compression
        unoptimized={false}
        {...props}
      />
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className={cn(
          "absolute inset-0 bg-gray-200 animate-pulse",
          fill ? "w-full h-full" : ""
        )} />
      )}
    </div>
  );
}

// Specialized components for common use cases
export function PortfolioImage({ src, alt, className, ...props }: Omit<OptimizedImageProps, 'sizes'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      sizes={imageSizes.portfolio}
      quality={80}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      {...props}
    />
  );
}

export function ServiceImage({ src, alt, className, ...props }: Omit<OptimizedImageProps, 'sizes'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      sizes={imageSizes.serviceCard}
      quality={85}
      {...props}
    />
  );
}

export function HeroImage({ src, alt, className, priority = true, ...props }: Omit<OptimizedImageProps, 'sizes'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      sizes={imageSizes.hero}
      quality={90}
      priority={priority}
      {...props}
    />
  );
}

export function ThumbnailImage({ src, alt, className, ...props }: Omit<OptimizedImageProps, 'sizes'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      sizes={imageSizes.thumbnail}
      quality={75}
      {...props}
    />
  );
}