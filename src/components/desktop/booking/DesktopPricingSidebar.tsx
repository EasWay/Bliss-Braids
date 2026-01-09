'use client';

import { useBookingConfig, useBookingForm } from '@/context/BookingProvider';
import { Calendar, Clock, MapPin, Phone, Mail, User } from 'lucide-react';

export default function DesktopPricingSidebar() {
  const { config, getTotalPrice, getDepositAmount, getEstimatedDuration } = useBookingConfig();
  const { formState } = useBookingForm();

  const totalPrice = getTotalPrice();
  const depositAmount = getDepositAmount();
  const estimatedDuration = getEstimatedDuration();

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return timeString;
  };

  return (
    <div className="space-y-3">
      {/* Service Selection */}
      {config.selectedService && (
        <div className="space-y-1">
          <h4 className="font-medium text-[#F50057] text-xs uppercase tracking-wide border-b border-[#F50057]/20 pb-1">
            Service
          </h4>
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <span className="text-gray-400 text-xs font-medium leading-tight">
                {config.selectedService.name}
              </span>
              <span className="text-gray-300 font-semibold text-xs">
                GH₵{config.selectedService.basePrice}
              </span>
            </div>
            
            {config.selectedSize && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">
                  {config.selectedService.sizeVariants[config.selectedSize].label} size
                </span>
                <span className="text-gray-300 font-medium">
                  ×{config.selectedService.sizeVariants[config.selectedSize].priceMultiplier}
                </span>
              </div>
            )}

            {config.selectedLength && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">
                  {config.selectedService.lengthVariants[config.selectedLength].label}
                </span>
                <span className="text-gray-300 font-medium">
                  +GH₵{config.selectedService.lengthVariants[config.selectedLength].priceAdd}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add-ons */}
      {config.selectedAddOns.length > 0 && (
        <div className="space-y-1">
          <h4 className="font-medium text-[#F50057] text-xs uppercase tracking-wide border-b border-[#F50057]/20 pb-1">
            Add-ons
          </h4>
          <div className="space-y-0.5">
            {config.selectedAddOns.map((addOn) => (
              <div key={addOn.id} className="flex justify-between items-center text-xs">
                <span className="text-gray-400">{addOn.name}</span>
                <span className="text-gray-300 font-medium">+GH₵{addOn.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appointment Details */}
      {(config.selectedDate || config.selectedTime) && (
        <div className="space-y-1">
          <h4 className="font-medium text-[#F50057] text-xs uppercase tracking-wide border-b border-[#F50057]/20 pb-1">
            Appointment
          </h4>
          <div className="space-y-1">
            {config.selectedDate && (
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-3 h-3 text-[#F50057] flex-shrink-0" />
                <span className="text-white/80">
                  {formatDate(config.selectedDate)}
                </span>
              </div>
            )}
            
            {config.selectedTime && (
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3 h-3 text-[#F50057] flex-shrink-0" />
                <span className="text-gray-600">
                  {formatTime(config.selectedTime)}
                </span>
              </div>
            )}

            {estimatedDuration > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span className="text-gray-500">
                  ~{estimatedDuration}h duration
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer Info */}
      {formState.customerInfo && (
        <div className="space-y-1">
          <h4 className="font-medium text-[#F50057] text-xs uppercase tracking-wide border-b border-[#F50057]/20 pb-1">
            Contact
          </h4>
          <div className="space-y-1">
            {formState.customerInfo.name && (
              <div className="flex items-center gap-2 text-xs">
                <User className="w-3 h-3 text-[#F50057] flex-shrink-0" />
                <span className="text-gray-600 truncate">
                  {formState.customerInfo.name}
                </span>
              </div>
            )}
            
            {formState.customerInfo.whatsapp && (
              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-3 h-3 text-[#F50057] flex-shrink-0" />
                <span className="text-gray-600">
                  {formState.customerInfo.whatsapp}
                </span>
              </div>
            )}

            {formState.customerInfo.email && (
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-3 h-3 text-[#F50057] flex-shrink-0" />
                <span className="text-gray-600 truncate">
                  {formState.customerInfo.email}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing Breakdown */}
      {totalPrice > 0 && (
        <div className="border-t border-[#F50057]/20 pt-2">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[#F50057] font-medium text-sm">Total</span>
              <span className="text-lg font-bold text-gray-200">
                GH₵{totalPrice}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Deposit (30%)</span>
              <span className="text-gray-300 font-semibold">
                GH₵{depositAmount}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Balance</span>
              <span className="text-gray-400 font-medium">
                GH₵{totalPrice - depositAmount}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Info */}
      <div className="bg-[#F50057]/5 rounded-lg p-2 -mx-1 border border-[#F50057]/20">
        <div className="flex items-start gap-2">
          <MapPin className="w-3 h-3 text-[#F50057] mt-0.5 flex-shrink-0" />
          <div className="space-y-0.5">
            <h5 className="font-medium text-[#F50057] text-xs">
              Next Steps
            </h5>
            <div className="text-xs text-gray-600 space-y-0.5 leading-relaxed">
              <div className="flex items-start gap-1">
                <span className="text-[#F50057] font-bold">1.</span>
                <span>Complete booking request</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-[#F50057] font-bold">2.</span>
                <span>WhatsApp contact from us</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-[#F50057] font-bold">3.</span>
                <span>Pay GH₵{depositAmount} via Mobile Money</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-[#F50057] font-bold">4.</span>
                <span>Receive location details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}