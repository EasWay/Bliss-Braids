'use client';

import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/lib/device-detection';
import MobileServicesPage from '@/components/mobile/services/MobileServicesPage';
import DesktopServicesPage from '@/components/desktop/services/DesktopServicesPage';

export default function ServicesPageClient() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null);

  useEffect(() => {
    setDeviceType(isMobileDevice() ? 'mobile' : 'desktop');
  }, []);

  if (!deviceType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return deviceType === 'mobile' ? <MobileServicesPage /> : <DesktopServicesPage />;
}
