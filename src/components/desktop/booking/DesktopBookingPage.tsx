'use client';

import DesktopBookingWizard from './DesktopBookingWizard';

export default function DesktopBookingPage() {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#020119' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Book Your Appointment
          </h1>
          <p className="text-white/70 text-lg">
            Customize your style and get an instant price estimate
          </p>
        </div>
        
        <DesktopBookingWizard />
      </div>
    </div>
  );
}
