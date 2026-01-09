'use client';

import { useBookingConfig } from '@/context/BookingProvider';
import { useValidation } from '@/context/ValidationContext';
import { addOns } from '@/data/addOns';
import { Check } from 'lucide-react';
import { useEffect } from 'react';

export default function DesktopAddOnsStep() {
  const { config, toggleAddOn } = useBookingConfig();
  const { setStepValidation } = useValidation();
  const { selectedAddOns } = config;
  
  const STEP_INDEX = 3;

  // Add-ons step is always valid (optional step)
  useEffect(() => {
    setStepValidation(STEP_INDEX, true);
  }, [setStepValidation]);

  const isAddOnSelected = (addOnId: string) => {
    return selectedAddOns.some(a => a.id === addOnId);
  };

  return (
    <div className="space-y-3">
      <div className="bg-[#F50057]/10 border border-[#F50057]/30 rounded-lg p-2">
        <p className="text-xs text-white/90">
          <strong>Optional:</strong> Add extra services to enhance your style. You can skip this step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="group" aria-label="Optional add-ons">
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
                relative p-3 rounded-lg transition-all text-left 
                focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-1 focus:ring-offset-[#020119]
                ${isSelected ? 'bg-[#F50057]/20' : 'bg-white/5 hover:bg-[#F50057]/5'}
              `}
            >
              <div className={`absolute top-2 right-2 w-4 h-4 rounded flex items-center justify-center ${isSelected ? 'bg-[#F50057]' : 'bg-white/20'}`}>
                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
              </div>

              <div className="pr-6">
                <h3 className="text-sm font-semibold text-white mb-0.5">
                  {addOn.name}
                </h3>
                <p className="text-xs text-white/70 mb-1">
                  {addOn.description}
                </p>
                <p className="text-sm font-bold text-[#F50057]">
                  +GH₵{addOn.price}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {selectedAddOns.length === 0 && (
        <div className="text-center py-2">
          <p className="text-white/80 text-xs">No add-ons selected</p>
        </div>
      )}
    </div>
  );
}