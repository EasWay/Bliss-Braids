export type DeviceType = 'mobile' | 'desktop';

/**
 * Simple device detection (works in both client and server)
 * Use this in client components that need immediate device type
 */
export function isMobileDevice(userAgent?: string): boolean {
  const ua = userAgent || (typeof window !== 'undefined' ? window.navigator.userAgent : '');
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(ua);
}
