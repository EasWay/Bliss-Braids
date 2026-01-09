'use client';

import Link from 'next/link';
import { useDeviceType } from '@/lib/device-detection.client';
import { ComponentProps } from 'react';

interface SmartLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: string;
  mobileHref?: string;
}

/**
 * Smart Link component that automatically routes to mobile-optimized pages
 * when accessed from mobile devices
 */
export function SmartLink({ href, mobileHref, ...props }: SmartLinkProps) {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  // Use mobile href if provided and user is on mobile
  const targetHref = isMobile && mobileHref ? mobileHref : href;
  
  return <Link href={targetHref} {...props} />;
}
