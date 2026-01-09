'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CustomerInfo } from '@/types';

interface BookingFormState {
  customerInfo: CustomerInfo | null;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

interface BookingFormContextType {
  formState: BookingFormState;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setSubmitting: (submitting: boolean) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  resetForm: () => void;
}

const BookingFormContext = createContext<BookingFormContextType | undefined>(undefined);

const initialFormState: BookingFormState = {
  customerInfo: null,
  isSubmitting: false,
  errors: {},
};

export function BookingFormProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<BookingFormState>(initialFormState);

  // Debounced update for partial customer info (prevents excessive re-renders during typing)
  const updateCustomerInfo = useCallback((info: Partial<CustomerInfo>) => {
    setFormState(prev => ({
      ...prev,
      customerInfo: prev.customerInfo ? { ...prev.customerInfo, ...info } : info as CustomerInfo,
      // Clear field-specific errors when user starts typing
      errors: Object.keys(info).reduce((acc, key) => {
        const { [key]: _, ...rest } = prev.errors;
        return rest;
      }, prev.errors)
    }));
  }, []);

  // Set complete customer info (used when form is submitted)
  const setCustomerInfo = useCallback((info: CustomerInfo) => {
    setFormState(prev => ({
      ...prev,
      customerInfo: info
    }));
  }, []);

  const setSubmitting = useCallback((submitting: boolean) => {
    setFormState(prev => ({
      ...prev,
      isSubmitting: submitting
    }));
  }, []);

  const setErrors = useCallback((errors: Record<string, string>) => {
    setFormState(prev => ({
      ...prev,
      errors
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      errors: {}
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialFormState);
  }, []);

  const value = {
    formState,
    updateCustomerInfo,
    setCustomerInfo,
    setSubmitting,
    setErrors,
    clearErrors,
    resetForm,
  };

  return (
    <BookingFormContext.Provider value={value}>
      {children}
    </BookingFormContext.Provider>
  );
}

export function useBookingForm() {
  const context = useContext(BookingFormContext);
  if (context === undefined) {
    throw new Error('useBookingForm must be used within a BookingFormProvider');
  }
  return context;
}