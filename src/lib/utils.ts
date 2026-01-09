import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance utility functions
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Image optimization utilities
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return '';
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

// Format utilities
export function formatPrice(price: number): string {
  return `GHS ${price}`;
}

export function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} mins`;
  }
  
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours} ${wholeHours === 1 ? 'hour' : 'hours'}`;
  }
  
  return `${wholeHours}h ${minutes}m`;
}