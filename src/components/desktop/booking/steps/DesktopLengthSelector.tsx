'use client';

import React, { useEffect } from 'react';
import { useBookingConfig } from '@/context/BookingProvider';
import { useValidation } from '@/context/ValidationContext';
import { HairLength } from '@/types';
import { AlertCircle } from 'lucide-react';

export default function DesktopLengthSelector() {
  const { config, updateLength } = useBookingConfig();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  const { selectedService, selectedSize, selectedLength } = config;
  
  const STEP_INDEX = 2;

  if (!selectedService || !selectedSize) {
    return (
      <div className="text-center py-8">
        <p className="text-white/80">Please select a service and size first</p>
      </div>
    );
  }

  // Validate step whenever selection changes
  useEffect(() => {
    const isValid = !!selectedLength;
    setStepValidation(STEP_INDEX, isValid);
    
    if (selectedLength) {
      clearFieldError(STEP_INDEX, 'length');
    }
  }, [selectedLength, setStepValidation, clearFieldError]);

  const lengthOptions: { value: HairLength; label: string; description: string }[] = [
    { value: 'shoulder', label: 'Shoulder Length', description: 'Classic and manageable' },
    { value: 'midBack', label: 'Mid-Back Length', description: 'Elegant and versatile' },
    { value: 'waist', label: 'Waist Length', description: 'Long and dramatic' },
    { value: 'butt', label: 'Butt/Thigh Length', description: 'Maximum length and impact' }
  ];

  const handleLengthSelect = (length: HairLength) => {
    updateLength(length);
    setFieldTouched(STEP_INDEX, 'length', true);
  };

  const lengthError = getFieldError(STEP_INDEX, 'length');
  const showError = isFieldTouched(STEP_INDEX, 'length') && lengthError;

  return (
    <div className="space-y-3">
      <div className="grid gap-2" role="radiogroup" aria-label="Select hair length">
        {lengthOptions.map((option) => {
          const isSelected = selectedLength === option.value;
          const variant = selectedService.lengthVariants[option.value];
          const priceAddition = variant.priceAdd;

          return (
            <button
              key={option.value}
              onClick={() => handleLengthSelect(option.value)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option.label}, ${priceAddition === 0 ? 'base price' : `plus ${priceAddition} GHS`}`}
              className={`
                w-full p-3 rounded-lg transition-all text-left 
                focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-1 focus:ring-offset-[#020119]
                ${isSelected ? 'bg-[#F50057]/20' : 'bg-white/5 hover:bg-[#F50057]/5'}
              `}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-[#F50057]' : 'bg-white/20'}`}>
                    {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">
                      {option.label}
                    </h3>
                    <p className="text-xs text-white/70 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-[#F50057]">
                    {priceAddition === 0 ? 'Base Price' : `+GH₵${priceAddition}`}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {showError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 flex items-start gap-2">
          <AlertCircle className="h-3 w-3 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-300">{lengthError}</p>
        </div>
      )}
    </div>
  );
}