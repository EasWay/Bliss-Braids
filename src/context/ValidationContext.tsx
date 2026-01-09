'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ValidationState {
  [stepIndex: number]: {
    isValid: boolean;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
  };
}

interface ValidationContextType {
  validationState: ValidationState;
  setStepValidation: (stepIndex: number, isValid: boolean, errors?: Record<string, string>) => void;
  setFieldError: (stepIndex: number, fieldName: string, error: string) => void;
  clearFieldError: (stepIndex: number, fieldName: string) => void;
  setFieldTouched: (stepIndex: number, fieldName: string, touched: boolean) => void;
  isStepValid: (stepIndex: number) => boolean;
  getStepErrors: (stepIndex: number) => Record<string, string>;
  getFieldError: (stepIndex: number, fieldName: string) => string | undefined;
  isFieldTouched: (stepIndex: number, fieldName: string) => boolean;
  canProceedToNextStep: (currentStep: number) => boolean;
  resetValidation: () => void;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

const initialValidationState: ValidationState = {
  0: { isValid: false, errors: {}, touched: {} }, // Service Selection
  1: { isValid: false, errors: {}, touched: {} }, // Size Selection
  2: { isValid: false, errors: {}, touched: {} }, // Length Selection
  3: { isValid: true, errors: {}, touched: {} },  // Add-ons (optional)
  4: { isValid: false, errors: {}, touched: {} }, // Date Selection
  5: { isValid: false, errors: {}, touched: {} }, // Time Selection
  6: { isValid: false, errors: {}, touched: {} }, // Contact Form
};

export function ValidationProvider({ children }: { children: ReactNode }) {
  const [validationState, setValidationState] = useState<ValidationState>(initialValidationState);

  const setStepValidation = useCallback((stepIndex: number, isValid: boolean, errors: Record<string, string> = {}) => {
    setValidationState(prev => ({
      ...prev,
      [stepIndex]: {
        ...prev[stepIndex],
        isValid,
        errors
      }
    }));
  }, []);

  const setFieldError = useCallback((stepIndex: number, fieldName: string, error: string) => {
    setValidationState(prev => ({
      ...prev,
      [stepIndex]: {
        ...prev[stepIndex],
        errors: {
          ...prev[stepIndex]?.errors,
          [fieldName]: error
        },
        isValid: error === '' && Object.keys(prev[stepIndex]?.errors || {}).filter(key => key !== fieldName).length === 0
      }
    }));
  }, []);

  const clearFieldError = useCallback((stepIndex: number, fieldName: string) => {
    setValidationState(prev => {
      const newErrors = { ...prev[stepIndex]?.errors };
      delete newErrors[fieldName];
      
      return {
        ...prev,
        [stepIndex]: {
          ...prev[stepIndex],
          errors: newErrors,
          isValid: Object.keys(newErrors).length === 0
        }
      };
    });
  }, []);

  const setFieldTouched = useCallback((stepIndex: number, fieldName: string, touched: boolean) => {
    setValidationState(prev => ({
      ...prev,
      [stepIndex]: {
        ...prev[stepIndex],
        touched: {
          ...prev[stepIndex]?.touched,
          [fieldName]: touched
        }
      }
    }));
  }, []);

  // These functions read from state but don't need to be in dependencies
  // since they're stable references
  const isStepValid = useCallback((stepIndex: number): boolean => {
    return validationState[stepIndex]?.isValid ?? false;
  }, [validationState]);

  const getStepErrors = useCallback((stepIndex: number): Record<string, string> => {
    return validationState[stepIndex]?.errors ?? {};
  }, [validationState]);

  const getFieldError = useCallback((stepIndex: number, fieldName: string): string | undefined => {
    return validationState[stepIndex]?.errors?.[fieldName];
  }, [validationState]);

  const isFieldTouched = useCallback((stepIndex: number, fieldName: string): boolean => {
    return validationState[stepIndex]?.touched?.[fieldName] ?? false;
  }, [validationState]);

  const canProceedToNextStep = useCallback((currentStep: number): boolean => {
    return validationState[currentStep]?.isValid ?? false;
  }, [validationState]);

  const resetValidation = useCallback(() => {
    setValidationState(initialValidationState);
  }, []);

  const value: ValidationContextType = {
    validationState,
    setStepValidation,
    setFieldError,
    clearFieldError,
    setFieldTouched,
    isStepValid,
    getStepErrors,
    getFieldError,
    isFieldTouched,
    canProceedToNextStep,
    resetValidation
  };

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  );
}

export function useValidation() {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
}