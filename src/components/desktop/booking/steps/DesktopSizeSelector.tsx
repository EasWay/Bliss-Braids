'use client';

import React, { useEffect } from 'react';
import { useBookingConfig } from '@/context/BookingProvider';
import { useValidation } from '@/context/ValidationContext';
import { BraidSize } from '@/types';
import { AlertCircle } from 'lucide-react';

export default function DesktopSizeSelector() {
  const { config, updateSize } = useBookingConfig();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  const { selectedService, selectedSize } = config;
  
  const STEP_INDEX = 1;

  if (!selectedService) {
    return (
      <div className="text-center py-8">
        <p className="text-white/80">Please select a service first</p>
      </div>
    );
  }

  // Validate step whenever selection changes
  useEffect(() => {
    const isValid = !!selectedSize;
    setStepValidation(STEP_INDEX, isValid);
    
    if (selectedSize) {
      clearFieldError(STEP_INDEX, 'size');
    }
  }, [selectedSize, setStepValidation, clearFieldError]);

  const sizeOptions: { value: BraidSize; label: string; description: string }[] = [
    {
      value: 'small',
      label: 'Small Braids',
      description: '1.5x price, 1.5x time - More detailed, longer-lasting'
    },
    {
      value: 'medium',
      label: 'Medium Braids',
      description: '1.0x (Standard) - Perfect balance of style and time'
    },
    {
      value: 'jumbo',
      label: 'Jumbo Braids',
      description: '0.8x price, 0.6x time - Quick and bold look'
    }
  ];

  const handleSizeSelect = (size: BraidSize) => {
    updateSize(size);
    setFieldTouched(STEP_INDEX, 'size', true);
  };

  const sizeError = getFieldError(STEP_INDEX, 'size');
  const showError = isFieldTouched(STEP_INDEX, 'size') && sizeError;

  return (
    <div className="space-y-3">
      <div className="grid gap-2" role="radiogroup" aria-label="Select braid size">
        {sizeOptions.map((option) => {
          const isSelected = selectedSize === option.value;
          const variant = selectedService.sizeVariants[option.value];

          return (
            <button
              key={option.value}
              onClick={() => handleSizeSelect(option.value)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option.label}, ${option.description}`}
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
                    {variant.priceMultiplier}x Price
                  </p>
                  <p className="text-xs text-white/80">
                    {variant.timeMultiplier}x Time
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
          <p className="text-xs font-medium text-red-300">{sizeError}</p>
        </div>
      )}
    </div>
  );
}