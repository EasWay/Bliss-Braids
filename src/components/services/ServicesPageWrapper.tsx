'use client';

import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/lib/device-detection';
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileFooter from '@/components/mobile/MobileFooter';

import Footer from '@/components/layout/Footer';
import MobileServicesPage from '@/components/mobile/services/MobileServicesPage';
import DesktopServicesPage from '@/components/desktop/services/DesktopServicesPage';

export default function ServicesPageWrapper() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null);

  useEffect(() => {
    setDeviceType(isMobileDevice() ? 'mobile' : 'desktop');
  }, []);

  if (!deviceType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (deviceType === 'mobile') {
    return (
      <>
        <MobileHeader />
        <MobileServicesPage />
        <MobileFooter />
      </>
    );
  }

  return (
    <>
      <DesktopServicesPage />
      <Footer />
    </>
  );
}
