'use client';

import { useBookingConfig } from '@/context/BookingProvider';
import { useValidation } from '@/context/ValidationContext';
import { timeSlots } from '@/data/timeSlots';
import { AlertCircle, Clock } from 'lucide-react';
import { useEffect } from 'react';

export default function DesktopTimeSlots() {
  const { config, updateTime } = useBookingConfig();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  
  const STEP_INDEX = 5;

  // Validate step whenever selection changes
  useEffect(() => {
    const isValid = !!config.selectedTime;
    setStepValidation(STEP_INDEX, isValid);
    
    if (config.selectedTime) {
      clearFieldError(STEP_INDEX, 'time');
    }
  }, [config.selectedTime, setStepValidation, clearFieldError]);
  
  const handleTimeSelect = (time: string) => {
    updateTime(time);
    setFieldTouched(STEP_INDEX, 'time', true);
  };
  
  const isTimeSelected = (time: string) => {
    return config.selectedTime === time;
  };

  const timeError = getFieldError(STEP_INDEX, 'time');
  const showError = isFieldTouched(STEP_INDEX, 'time') && timeError;
  
  return (
    <div className="space-y-3">
      <div className="bg-[#F50057]/10 border border-[#F50057]/30 rounded-lg p-2 flex items-start gap-2">
        <Clock className="w-3 h-3 text-[#F50057] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white/90">
          Select your preferred appointment time. All times are in Ghana Standard Time (GMT).
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2" role="radiogroup" aria-label="Select appointment time">
        {timeSlots.map((time) => {
          const selected = isTimeSelected(time);
          
          return (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              role="radio"
              aria-checked={selected}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium transition-all
                focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-1 focus:ring-offset-[#020119]
                ${selected 
                  ? 'bg-[#F50057] text-white' 
                  : 'bg-white/5 text-white/80 hover:bg-[#F50057]/10'
                }
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
          <AlertCircle className="h-3 w-3 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-300">{timeError}</p>
        </div>
      )}
    </div>
  );
}