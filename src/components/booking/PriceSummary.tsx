'use client';

import { useBooking } from '@/context/BookingContext';

export default function PriceSummary() {
  const { getTotalPrice, getEstimatedDuration, bookingState } = useBooking();
  
  const totalPrice = getTotalPrice();
  const duration = getEstimatedDuration();
  
  // Don't show if no service selected yet
  if (!bookingState.selectedService) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/60">Estimated Total:</span>
        <span className="font-bold text-primary">GHS {totalPrice}</span>
      </div>
      {duration > 0 && (
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-white/60">Duration:</span>
          <span className="font-medium text-white">{duration}h</span>
        </div>
      )}
    </div>
  );
}
