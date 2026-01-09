'use client';

import React, { useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { useValidation } from '@/context/ValidationContext';
import { BraidSize } from '@/types';
import { AlertCircle } from 'lucide-react';
import PriceSummary from './PriceSummary';

export default function SizeSelector() {
  const { bookingState, updateSize, goToNextStep } = useBooking();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  const { selectedService, selectedSize } = bookingState;
  
  const STEP_INDEX = 1;

  if (!selectedService) {
    return null;
  }

  // Validate step whenever selection changes
  useEffect(() => {
    const isValid = !!selectedSize;
    setStepValidation(STEP_INDEX, isValid);
    
    if (selectedSize) {
      clearFieldError(STEP_INDEX, 'size');
    }
  }, [selectedSize, setStepValidation, clearFieldError]);

  const sizeOptions: { value: BraidSize; label: string; multiplier: string }[] = [
    {
      value: 'small',
      label: 'Small',
      multiplier: '1.5x price, 1.5x time'
    },
    {
      value: 'medium',
      label: 'Medium',
      multiplier: '1.0x (Standard)'
    },
    {
      value: 'jumbo',
      label: 'Jumbo',
      multiplier: '0.8x price, 0.6x time'
    }
  ];

  const handleSizeSelect = (size: BraidSize) => {
    updateSize(size);
    setFieldTouched(STEP_INDEX, 'size', true);
  };

  const handleContinue = () => {
    setFieldTouched(STEP_INDEX, 'size', true);
    
    if (selectedSize) {
      goToNextStep();
    } else {
      setFieldError(STEP_INDEX, 'size', 'Please select a braid size to continue');
    }
  };

  const sizeError = getFieldError(STEP_INDEX, 'size');
  const showError = isFieldTouched(STEP_INDEX, 'size') && sizeError;

  return (
    <div className="space-y-2">
      <div className="space-y-2" role="radiogroup" aria-label="Select braid size">
        {sizeOptions.map((option) => {
          const isSelected = selectedSize === option.value;

          return (
            <button
              key={option.value}
              onClick={() => handleSizeSelect(option.value)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option.label} size, ${option.multiplier}`}
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
                  {option.multiplier}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {showError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-300">{sizeError}</p>
        </div>
      )}
      
      <PriceSummary />
    </div>
  );
}
