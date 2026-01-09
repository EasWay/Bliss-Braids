'use client';

import { ReactNode } from 'react';
import { BookingConfigProvider } from './BookingConfigContext';
import { BookingFormProvider } from './BookingFormContext';
import { BookingNavigationProvider } from './BookingNavigationContext';

/**
 * Combined provider for all booking-related contexts
 * This prevents provider hell and ensures proper context hierarchy
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  return (
    <BookingNavigationProvider>
      <BookingConfigProvider>
        <BookingFormProvider>
          {children}
        </BookingFormProvider>
      </BookingConfigProvider>
    </BookingNavigationProvider>
  );
}

// Re-export hooks for convenience
export { useBookingConfig } from './BookingConfigContext';
export { useBookingForm } from './BookingFormContext';
export { useBookingNavigation } from './BookingNavigationContext';