export type DeviceType = 'mobile' | 'desktop';

/**
 * Client-side device detection hook (for client components)
 */
export function useDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = window.navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  
  return mobileRegex.test(userAgent) ? 'mobile' : 'desktop';
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
