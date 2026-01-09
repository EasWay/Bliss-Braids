'use client';

import React, { useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { useValidation } from '@/context/ValidationContext';
import { services } from '@/data/services';
import { Service } from '@/types';
import { Check, AlertCircle } from 'lucide-react';
import PriceSummary from './PriceSummary';

export default function ServiceSelection() {
  const { bookingState, updateService, goToNextStep } = useBooking();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  const { selectedService } = bookingState;
  
  const STEP_INDEX = 0;

  // Validate step whenever selection changes
  useEffect(() => {
    const isValid = !!selectedService;
    setStepValidation(STEP_INDEX, isValid);
    
    if (selectedService) {
      clearFieldError(STEP_INDEX, 'service');
    }
  }, [selectedService, setStepValidation, clearFieldError]);

  const handleServiceSelect = (service: Service) => {
    updateService(service);
    setFieldTouched(STEP_INDEX, 'service', true);
  };

  const handleContinue = () => {
    setFieldTouched(STEP_INDEX, 'service', true);
    
    if (selectedService) {
      goToNextStep();
    } else {
      setFieldError(STEP_INDEX, 'service', 'Please select a service to continue');
    }
  };

  const serviceError = getFieldError(STEP_INDEX, 'service');
  const showError = isFieldTouched(STEP_INDEX, 'service') && serviceError;

  return (
    <div className="space-y-2">
      <div className="space-y-2" role="radiogroup" aria-label="Select braiding service">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id;
          
          return (
            <button
              key={service.id}
              onClick={() => handleServiceSelect(service)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${service.name}, starting from ${service.basePrice} GHS`}
              className={`
                w-full text-left p-3 rounded-lg border transition-all 
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                ${isSelected 
                  ? 'border-primary bg-primary/20' 
                  : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-white/60 mt-0.5">
                    <span>Base Duration: {service.baseDuration}h</span>
                    <span className="font-medium text-primary">From GHS {service.basePrice}</span>
                  </div>
                </div>
                
                <div className={`
                  flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center
                  ${isSelected ? 'border-primary bg-primary' : 'border-white/30'}
                `}>
                  {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {showError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-300">{serviceError}</p>
        </div>
      )}
      
      <PriceSummary />
    </div>
  );
}
