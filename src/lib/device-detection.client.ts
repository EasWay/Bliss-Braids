import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'desktop';

/**
 * Hydration-safe device detection hook
 * Returns 'desktop' on server and first client render to prevent hydration mismatch
 */
export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    
    setDeviceType(mobileRegex.test(userAgent) ? 'mobile' : 'desktop');
  }, []);

  // Return 'desktop' until mounted to prevent hydration mismatch
  return mounted ? deviceType : 'desktop';
}

/**
 * Simple client-side device detection (synchronous)
 * Use this in client components that need immediate device type
 */
export function isMobileDevice(userAgent?: string): boolean {
  const ua = userAgent || (typeof window !== 'undefined' ? window.navigator.userAgent : '');
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(ua);
}
