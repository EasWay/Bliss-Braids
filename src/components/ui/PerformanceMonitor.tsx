'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and if performance API is available
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined' || !window.performance) {
      return;
    }

    const metrics: Partial<PerformanceMetrics> = {};

    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
            break;
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime;
            break;
          case 'first-input':
            metrics.fid = entry.processingStart - entry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value;
            }
            break;
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming;
            metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            break;
        }
      }
    });

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      console.warn('Performance monitoring not fully supported');
    }

    // Report metrics after page load
    const reportMetrics = () => {
      // Only report if we have meaningful data
      if (Object.keys(metrics).length > 0) {
        console.log('Performance Metrics:', metrics);
        
        // You can send these to your analytics service
        // Example: analytics.track('performance', metrics);
      }
    };

    // Report after a delay to ensure all metrics are captured
    const timeoutId = setTimeout(reportMetrics, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // This component doesn't render anything
  return null;
}

// Hook for manual performance tracking
export function usePerformanceTracking() {
  const trackEvent = (eventName: string, startTime?: number) => {
    if (typeof window === 'undefined' || !window.performance) return;

    const endTime = performance.now();
    const duration = startTime ? endTime - startTime : 0;

    console.log(`Performance: ${eventName} took ${duration.toFixed(2)}ms`);
    
    // You can send this to your analytics service
    // Example: analytics.track('performance_event', { event: eventName, duration });
  };

  const startTimer = () => {
    return typeof window !== 'undefined' && window.performance ? performance.now() : 0;
  };

  return { trackEvent, startTimer };
}