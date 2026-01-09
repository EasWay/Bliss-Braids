'use client';

import React, { useEffect } from 'react';
import { useBookingConfig } from '@/context/BookingProvider';
import { useValidation } from '@/context/ValidationContext';
import { services } from '@/data/services';
import { Service } from '@/types';
import { Check, AlertCircle } from 'lucide-react';

export default function DesktopServiceSelection() {
  const { config, updateService } = useBookingConfig();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  const { selectedService } = config;
  
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

  const serviceError = getFieldError(STEP_INDEX, 'service');
  const showError = isFieldTouched(STEP_INDEX, 'service') && serviceError;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Select braiding service">
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
                w-full text-left p-2.5 rounded-lg transition-all 
                focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-1 focus:ring-offset-[#020119]
                ${isSelected 
                  ? 'bg-[#F50057]/20' 
                  : 'bg-white/5 hover:bg-[#F50057]/5'
                }
              `}
            >
              <div className="space-y-1.5">
                {/* Header with title and selection indicator */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-semibold text-white leading-tight">
                    {service.name}
                  </h3>
                  <div className={`
                    flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5
                    ${isSelected ? 'bg-[#F50057] text-white' : 'bg-white/20'}
                  `}>
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </div>
                </div>

                {/* Service details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80">{service.baseDuration}h</span>
                    <span className="font-semibold text-[#F50057]">GH₵{service.basePrice}</span>
                  </div>
                  
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                    {service.description}
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
          <p className="text-xs font-medium text-red-300">{serviceError}</p>
        </div>
      )}
    </div>
  );
}