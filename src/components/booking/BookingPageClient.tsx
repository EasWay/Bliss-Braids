'use client';

import { useState, useEffect } from 'react';
import { useDeviceType } from '@/lib/device-detection.client';
import MobileBookingPage from '@/components/mobile/booking/MobileBookingPage';
import DesktopBookingPage from '@/components/desktop/booking/DesktopBookingPage';

export default function BookingPageClient() {
  const [mounted, setMounted] = useState(false);
  const deviceType = useDeviceType();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing desktop version until mounted
  if (!mounted) {
    return <DesktopBookingPage />;
  }

  if (deviceType === 'mobile') {
    return <MobileBookingPage />;
  }

  return <DesktopBookingPage />;
}
