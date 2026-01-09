'use client';

import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/lib/device-detection';
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileFooter from '@/components/mobile/MobileFooter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobilePortfolioPage from '@/components/mobile/portfolio/MobilePortfolioPage';
import DesktopPortfolioPage from '@/components/desktop/portfolio/DesktopPortfolioPage';

export default function PortfolioPageWrapper() {
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
        <MobilePortfolioPage />
        <MobileFooter />
      </>
    );
  }

  return (
    <>
      <DesktopPortfolioPage />
      <Footer />
    </>
  );
}
