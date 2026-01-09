'use client';

import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/lib/device-detection';
import MobileHeader from '@/components/mobile/MobileHeader';
import Footer from '@/components/layout/Footer';
import MobileContactPage from '@/components/mobile/contact/MobileContactPage';
import DesktopContactPage from '@/components/desktop/contact/DesktopContactPage';

export default function ContactPageWrapper() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = isMobileDevice();
      setDeviceType(isMobile ? 'mobile' : 'desktop');
    };

    checkDevice();
  }, []);

  // Show loading state during device detection
  if (!deviceType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  // Mobile layout
  if (deviceType === 'mobile') {
    return (
      <>
        <MobileHeader />
        <MobileContactPage />
      </>
    );
  }

  // Desktop layout
  return (
    <>
      <DesktopContactPage />
      <Footer />
    </>
  );
}
