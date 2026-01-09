'use client';

import dynamic from 'next/dynamic';

// Lazy load the mobile and desktop components
const MobileHomePage = dynamic(() => import('@/components/mobile/home/MobileHomePage'), {
  ssr: false,
  loading: () => (
    <div className="lg:hidden">
      <div className="animate-pulse">
        <div className="h-screen bg-gray-200"></div>
      </div>
    </div>
  )
});

const DesktopHomePage = dynamic(() => import('@/components/desktop/home/DesktopHomePage'), {
  ssr: false,
  loading: () => (
    <div className="hidden lg:block">
      <div className="animate-pulse">
        <div className="h-screen bg-gray-200"></div>
      </div>
    </div>
  )
});

export default function ResponsiveHomePage() {
  return (
    <>
      {/* Mobile Version - Hidden on desktop */}
      <div className="lg:hidden">
        <MobileHomePage />
      </div>
      
      {/* Desktop Version - Hidden on mobile */}
      <div className="hidden lg:block">
        <DesktopHomePage />
      </div>
    </>
  );
}