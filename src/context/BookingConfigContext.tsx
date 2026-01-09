'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { 
  Service, 
  AddOn, 
  BraidSize, 
  HairLength 
} from '@/types';

interface BookingConfigState {
  selectedService: Service | null;
  selectedSize: BraidSize | null;
  selectedLength: HairLength | null;
  selectedAddOns: AddOn[];
  selectedDate: Date | null;
  selectedTime: string | null;
}

interface BookingConfigContextType {
  config: BookingConfigState;
  updateService: (service: Service) => void;
  updateSize: (size: BraidSize) => void;
  updateLength: (length: HairLength) => void;
  toggleAddOn: (addOn: AddOn) => void;
  updateDate: (date: Date) => void;
  updateTime: (time: string) => void;
  getTotalPrice: () => number;
  getEstimatedDuration: () => number;
  getDepositAmount: () => number;
  resetConfig: () => void;
}

const BookingConfigContext = createContext<BookingConfigContextType | undefined>(undefined);

const initialConfigState: BookingConfigState = {
  selectedService: null,
  selectedSize: null,
  selectedLength: null,
  selectedAddOns: [],
  selectedDate: null,
  selectedTime: null,
};

export function BookingConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<BookingConfigState>(initialConfigState);

  // Memoized calculation functions to prevent unnecessary recalculations
  const getTotalPrice = useCallback((): number => {
    const { selectedService, selectedSize, selectedLength, selectedAddOns } = config;
    
    if (!selectedService) return 0;
    
    let total = selectedService.basePrice;
    
    if (selectedSize) {
      total = total * selectedService.sizeVariants[selectedSize].priceMultiplier;
    }
    
    if (selectedLength) {
      const lengthPremium = selectedService.lengthVariants[selectedLength].priceAdd;
      if (selectedSize) {
        total += lengthPremium * selectedService.sizeVariants[selectedSize].priceMultiplier;
      } else {
        total += lengthPremium;
      }
    }
    
    selectedAddOns.forEach(addOn => {
      total += addOn.price;
    });
    
    return Math.round(total);
  }, [config.selectedService, config.selectedSize, config.selectedLength, config.selectedAddOns]);

  const getEstimatedDuration = useCallback((): number => {
    const { selectedService, selectedSize } = config;
    
    if (!selectedService || !selectedSize) return 0;
    
    return Math.round(selectedService.baseDuration * selectedService.sizeVariants[selectedSize].timeMultiplier * 10) / 10;
  }, [config.selectedService, config.selectedSize]);

  const getDepositAmount = useCallback((): number => {
    return 50; // Fixed deposit amount in GHS
  }, []);

  // Optimized update functions that only update when values actually change
  const updateService = useCallback((service: Service) => {
    setConfig(prev => prev.selectedService?.id === service.id ? prev : {
      ...prev,
      selectedService: service
    });
  }, []);

  const updateSize = useCallback((size: BraidSize) => {
    setConfig(prev => prev.selectedSize === size ? prev : {
      ...prev,
      selectedSize: size
    });
  }, []);

  const updateLength = useCallback((length: HairLength) => {
    setConfig(prev => prev.selectedLength === length ? prev : {
      ...prev,
      selectedLength: length
    });
  }, []);

  const toggleAddOn = useCallback((addOn: AddOn) => {
    setConfig(prev => {
      const isSelected = prev.selectedAddOns.some(item => item.id === addOn.id);
      return {
        ...prev,
        selectedAddOns: isSelected
          ? prev.selectedAddOns.filter(item => item.id !== addOn.id)
          : [...prev.selectedAddOns, addOn]
      };
    });
  }, []);

  const updateDate = useCallback((date: Date) => {
    setConfig(prev => prev.selectedDate?.getTime() === date.getTime() ? prev : {
      ...prev,
      selectedDate: date
    });
  }, []);

  const updateTime = useCallback((time: string) => {
    setConfig(prev => prev.selectedTime === time ? prev : {
      ...prev,
      selectedTime: time
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(initialConfigState);
  }, []);

  const value = {
    config,
    updateService,
    updateSize,
    updateLength,
    toggleAddOn,
    updateDate,
    updateTime,
    getTotalPrice,
    getEstimatedDuration,
    getDepositAmount,
    resetConfig,
  };

  return (
    <BookingConfigContext.Provider value={value}>
      {children}
    </BookingConfigContext.Provider>
  );
}

export function useBookingConfig() {
  const context = useContext(BookingConfigContext);
  if (context === undefined) {
    throw new Error('useBookingConfig must be used within a BookingConfigProvider');
  }
  return context;
}