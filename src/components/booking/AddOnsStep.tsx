'use client';

import { useBooking } from '@/context/BookingContext';
import { useValidation } from '@/context/ValidationContext';
import { addOns } from '@/data/addOns';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import PriceSummary from './PriceSummary';

export default function AddOnsStep() {
  const { bookingState, toggleAddOn, goToNextStep } = useBooking();
  const { setStepValidation } = useValidation();
  const { selectedAddOns } = bookingState;
  
  const STEP_INDEX = 3;

  // Add-ons step is always valid (optional step)
  useEffect(() => {
    setStepValidation(STEP_INDEX, true);
  }, [setStepValidation]);

  const isAddOnSelected = (addOnId: string) => {
    return selectedAddOns.some(a => a.id === addOnId);
  };

  const handleSkip = () => {
    goToNextStep();
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Optional add-ons">
        {addOns.map((addOn) => {
          const isSelected = isAddOnSelected(addOn.id);
          
          return (
            <button
              key={addOn.id}
              onClick={() => toggleAddOn(addOn)}
              role="checkbox"
              aria-checked={isSelected}
              aria-label={`${addOn.name}, plus ${addOn.price} GHS`}
              className={`
                relative p-2 rounded-lg border transition-all text-left 
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                ${isSelected ? 'border-primary bg-primary/20' : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'}
              `}
            >
              <div className={`absolute top-2 right-2 w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-white/30'}`}>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>

              <div className="pr-5">
                <h3 className="text-xs font-semibold text-white mb-0.5 truncate">
                  {addOn.name}
                </h3>
                <p className="text-xs font-medium text-primary">
                  +{addOn.price}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      
      <PriceSummary />
    </div>
  );
}
