'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  BookingState, 
  Service, 
  AddOn, 
  BraidSize, 
  HairLength, 
  CustomerInfo 
} from '@/types';

interface BookingContextType {
  bookingState: BookingState;
  updateService: (service: Service) => void;
  updateSize: (size: BraidSize) => void;
  updateLength: (length: HairLength) => void;
  toggleAddOn: (addOn: AddOn) => void;
  updateDate: (date: Date) => void;
  updateTime: (time: string) => void;
  updateCustomerInfo: (info: CustomerInfo) => void;
  getTotalPrice: () => number;
  getEstimatedDuration: () => number;
  getDepositAmount: () => number;
  calculatePrice: (service: Service, size: BraidSize, length: HairLength, addOns: AddOn[]) => number;
  resetBooking: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBookingState: BookingState = {
  selectedService: null,
  selectedSize: null,
  selectedLength: null,
  selectedAddOns: [],
  selectedDate: null,
  selectedTime: null,
  customerInfo: null,
  depositPaid: false,
  status: 'draft'
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);
  const [currentStep, setCurrentStep] = useState(0);

  // Calculate total price based on formula: (basePrice + lengthAdd) * sizeMultiplier + addOns
  const calculateTotal = (
    service: Service,
    size: BraidSize,
    length: HairLength,
    addOns: AddOn[]
  ): number => {
    // Start with base price
    let total = service.basePrice;
    
    // Add length premium
    total += service.lengthVariants[length].priceAdd;
    
    // Apply size multiplier
    total = total * service.sizeVariants[size].priceMultiplier;
    
    // Add selected add-ons
    addOns.forEach(addOn => {
      total += addOn.price;
    });
    
    return Math.round(total);
  };

  // Calculate duration based on size time multiplier
  const calculateDuration = (
    service: Service,
    size: BraidSize
  ): number => {
    return Math.round(service.baseDuration * service.sizeVariants[size].timeMultiplier * 10) / 10;
  };

  const updateService = (service: Service) => {
    setBookingState(prev => ({
      ...prev,
      selectedService: service
    }));
  };

  const updateSize = (size: BraidSize) => {
    setBookingState(prev => ({
      ...prev,
      selectedSize: size
    }));
  };

  const updateLength = (length: HairLength) => {
    setBookingState(prev => ({
      ...prev,
      selectedLength: length
    }));
  };

  const toggleAddOn = (addOn: AddOn) => {
    setBookingState(prev => {
      const isSelected = prev.selectedAddOns.some(a => a.id === addOn.id);
      
      if (isSelected) {
        // Remove add-on
        return {
          ...prev,
          selectedAddOns: prev.selectedAddOns.filter(a => a.id !== addOn.id)
        };
      } else {
        // Add add-on
        return {
          ...prev,
          selectedAddOns: [...prev.selectedAddOns, addOn]
        };
      }
    });
  };

  const updateDate = (date: Date) => {
    setBookingState(prev => ({
      ...prev,
      selectedDate: date
    }));
  };

  const updateTime = (time: string) => {
    setBookingState(prev => ({
      ...prev,
      selectedTime: time
    }));
  };

  const updateCustomerInfo = (info: CustomerInfo) => {
    setBookingState(prev => ({
      ...prev,
      customerInfo: info
    }));
  };

  const getTotalPrice = (): number => {
    const { selectedService, selectedSize, selectedLength, selectedAddOns } = bookingState;
    
    if (!selectedService) {
      return 0;
    }
    
    // Start with base price
    let total = selectedService.basePrice;
    
    // If size is selected, apply size multiplier to base price
    if (selectedSize) {
      total = total * selectedService.sizeVariants[selectedSize].priceMultiplier;
    }
    
    // If length is also selected, add length premium and apply size multiplier to it too
    if (selectedLength) {
      const lengthPremium = selectedService.lengthVariants[selectedLength].priceAdd;
      if (selectedSize) {
        total += lengthPremium * selectedService.sizeVariants[selectedSize].priceMultiplier;
      } else {
        total += lengthPremium;
      }
    }
    
    // Add selected add-ons
    selectedAddOns.forEach(addOn => {
      total += addOn.price;
    });
    
    return Math.round(total);
  };

  const getEstimatedDuration = (): number => {
    const { selectedService, selectedSize } = bookingState;
    
    if (!selectedService) {
      return 0;
    }
    
    // If no size selected, return base duration
    if (!selectedSize) {
      return selectedService.baseDuration;
    }
    
    return calculateDuration(selectedService, selectedSize);
  };

  const getDepositAmount = (): number => {
    // 30% of total price as deposit
    return Math.round(getTotalPrice() * 0.3);
  };

  const calculatePrice = (
    service: Service,
    size: BraidSize,
    length: HairLength,
    addOns: AddOn[]
  ): number => {
    return calculateTotal(service, size, length, addOns);
  };

  const resetBooking = () => {
    setBookingState(initialBookingState);
    setCurrentStep(0);
  };

  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const goToPreviousStep = () => {
    const newStep = Math.max(0, currentStep - 1);
    
    // Reset selections for the current step when going back
    setBookingState(prev => {
      const newState = { ...prev };
      
      // Reset based on which step we're leaving
      switch (currentStep) {
        case 1: // Going back from size selection
          newState.selectedSize = null;
          break;
        case 2: // Going back from length selection
          newState.selectedLength = null;
          break;
        case 3: // Going back from add-ons
          newState.selectedAddOns = [];
          break;
        case 4: // Going back from date selection
          newState.selectedDate = null;
          break;
        case 5: // Going back from time selection
          newState.selectedTime = null;
          break;
        case 6: // Going back from contact info
          newState.customerInfo = null;
          break;
      }
      
      return newState;
    });
    
    setCurrentStep(newStep);
  };

  const value: BookingContextType = {
    bookingState,
    updateService,
    updateSize,
    updateLength,
    toggleAddOn,
    updateDate,
    updateTime,
    updateCustomerInfo,
    getTotalPrice,
    getEstimatedDuration,
    getDepositAmount,
    calculatePrice,
    resetBooking,
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  
  return context;
}
