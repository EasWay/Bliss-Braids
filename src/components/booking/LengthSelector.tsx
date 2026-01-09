'use client';

import React, { useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { useValidation } from '@/context/ValidationContext';
import { HairLength } from '@/types';
import { AlertCircle } from 'lucide-react';
import PriceSummary from './PriceSummary';

export default function LengthSelector() {
  const { bookingState, updateLength, goToNextStep } = useBooking();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  const { selectedService, selectedSize, selectedLength } = bookingState;
  
  const STEP_INDEX = 2;

  if (!selectedService || !selectedSize) {
    return null;
  }

  // Validate step whenever selection changes
  useEffect(() => {
    const isValid = !!selectedLength;
    setStepValidation(STEP_INDEX, isValid);
    
    if (selectedLength) {
      clearFieldError(STEP_INDEX, 'length');
    }
  }, [selectedLength, setStepValidation, clearFieldError]);

  const lengthOptions: { value: HairLength; label: string }[] = [
    { value: 'shoulder', label: 'Shoulder' },
    { value: 'midBack', label: 'Mid-Back' },
    { value: 'waist', label: 'Waist' },
    { value: 'butt', label: 'Butt/Thigh' }
  ];

  const handleLengthSelect = (length: HairLength) => {
    updateLength(length);
    setFieldTouched(STEP_INDEX, 'length', true);
  };

  const handleContinue = () => {
    setFieldTouched(STEP_INDEX, 'length', true);
    
    if (selectedLength) {
      goToNextStep();
    } else {
      setFieldError(STEP_INDEX, 'length', 'Please select a hair length to continue');
    }
  };

  const lengthError = getFieldError(STEP_INDEX, 'length');
  const showError = isFieldTouched(STEP_INDEX, 'length') && lengthError;

  return (
    <div className="space-y-2">
      <div className="space-y-2" role="radiogroup" aria-label="Select hair length">
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
              aria-label={`${option.label} length, ${priceAddition === 0 ? 'base price' : `plus ${priceAddition} GHS`}`}
              className={`
                w-full p-3 rounded-lg border transition-all text-left 
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                ${isSelected ? 'border-primary bg-primary/20' : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'}
              `}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-primary bg-primary' : 'border-white/30'}`}>
                    {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <h3 className="font-semibold text-white text-sm truncate">
                    {option.label}
                  </h3>
                </div>
                <p className="text-xs font-medium text-primary flex-shrink-0">
                  {priceAddition === 0 ? 'Base' : `+${priceAddition}`}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {showError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-300">{lengthError}</p>
        </div>
      )}
      
      <PriceSummary />
    </div>
  );
}
