'use client';

import MobileHeader from '@/components/mobile/MobileHeader';
import MobileFooter from '@/components/mobile/MobileFooter';
import MobileBookingWizard from './MobileBookingWizard';

export default function MobileBookingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#020119' }}>
      <MobileHeader />
      
      <main className="flex-1 pt-16 pb-4 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">
              Book Appointment
            </h1>
            <p className="text-white/80 text-sm">
              Customize your style and get instant pricing
            </p>
          </div>
          
          <MobileBookingWizard />
        </div>
      </main>
      
      <MobileFooter />
    </div>
  );
}
