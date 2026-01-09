import { headers } from 'next/headers';

export type DeviceType = 'mobile' | 'desktop';

/**
 * Server-side device detection based on User-Agent
 * Returns 'mobile' for phones/tablets, 'desktop' for everything else
 * ONLY use this in Server Components
 */
export async function getDeviceType(): Promise<DeviceType> {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  
  // Mobile detection regex
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  
  return mobileRegex.test(userAgent) ? 'mobile' : 'desktop';
}
