'use client';

import { useDeviceType } from '@/lib/device-detection.client';
import MobileBookingPage from '@/components/mobile/booking/MobileBookingPage';
import DesktopBookingPage from '@/components/desktop/booking/DesktopBookingPage';

export default function BookingPageClient() {
  const deviceType = useDeviceType();

  if (deviceType === 'mobile') {
    return <MobileBookingPage />;
  }

  return <DesktopBookingPage />;
}
