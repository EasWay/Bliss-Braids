'use client';

import { useBooking } from '@/context/BookingContext';
import { useValidation } from '@/context/ValidationContext';
import { timeSlots } from '@/data/timeSlots';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import PriceSummary from './PriceSummary';

export default function TimeSlots() {
  const { bookingState, updateTime, goToNextStep } = useBooking();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  
  const STEP_INDEX = 5;

  // Validate step whenever selection changes
  useEffect(() => {
    const isValid = !!bookingState.selectedTime;
    setStepValidation(STEP_INDEX, isValid);
    
    if (bookingState.selectedTime) {
      clearFieldError(STEP_INDEX, 'time');
    }
  }, [bookingState.selectedTime, setStepValidation, clearFieldError]);
  
  const handleTimeSelect = (time: string) => {
    updateTime(time);
    setFieldTouched(STEP_INDEX, 'time', true);
  };

  const handleContinue = () => {
    setFieldTouched(STEP_INDEX, 'time', true);
    
    if (bookingState.selectedTime) {
      goToNextStep();
    } else {
      setFieldError(STEP_INDEX, 'time', 'Please select a time to continue');
    }
  };
  
  const isTimeSelected = (time: string) => {
    return bookingState.selectedTime === time;
  };

  const timeError = getFieldError(STEP_INDEX, 'time');
  const showError = isFieldTouched(STEP_INDEX, 'time') && timeError;
  
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="Select appointment time">
        {timeSlots.map((time) => {
          const selected = isTimeSelected(time);
          
          return (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              role="radio"
              aria-checked={selected}
              className={`
                px-2 py-2 rounded-lg text-[11px] font-medium transition-all
                focus:outline-none focus:ring-1 focus:ring-primary
                ${selected ? 'bg-primary text-white' : 'bg-white/10 text-white hover:bg-white/20'}
              `}
              aria-label={`Select ${time}`}
            >
              {time}
            </button>
          );
        })}
      </div>

      {showError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-300">{timeError}</p>
        </div>
      )}
      
      <PriceSummary />
    </div>
  );
}
