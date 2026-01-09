'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface BookingNavigationState {
  currentStep: number;
  completedSteps: Set<number>;
  totalSteps: number;
}

interface BookingNavigationContextType {
  navigation: BookingNavigationState;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  markStepCompleted: (step: number) => void;
  isStepCompleted: (step: number) => boolean;
  canGoToStep: (step: number) => boolean;
  resetNavigation: () => void;
}

const BookingNavigationContext = createContext<BookingNavigationContextType | undefined>(undefined);

const TOTAL_STEPS = 7;

const initialNavigationState: BookingNavigationState = {
  currentStep: 0,
  completedSteps: new Set(),
  totalSteps: TOTAL_STEPS,
};

export function BookingNavigationProvider({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<BookingNavigationState>(initialNavigationState);

  const setCurrentStep = useCallback((step: number) => {
    if (step >= 0 && step < TOTAL_STEPS) {
      setNavigation(prev => ({
        ...prev,
        currentStep: step
      }));
    }
  }, []);

  const goToNextStep = useCallback(() => {
    setNavigation(prev => {
      const nextStep = Math.min(prev.currentStep + 1, TOTAL_STEPS - 1);
      return {
        ...prev,
        currentStep: nextStep,
        completedSteps: new Set([...prev.completedSteps, prev.currentStep])
      };
    });
  }, []);

  const goToPreviousStep = useCallback(() => {
    setNavigation(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  }, []);

  const markStepCompleted = useCallback((step: number) => {
    setNavigation(prev => ({
      ...prev,
      completedSteps: new Set([...prev.completedSteps, step])
    }));
  }, []);

  const isStepCompleted = useCallback((step: number) => {
    return navigation.completedSteps.has(step);
  }, [navigation.completedSteps]);

  const canGoToStep = useCallback((step: number) => {
    // Can always go to current step or previous completed steps
    if (step <= navigation.currentStep) return true;
    
    // Can go to next step if current step is completed
    if (step === navigation.currentStep + 1 && navigation.completedSteps.has(navigation.currentStep)) {
      return true;
    }
    
    return false;
  }, [navigation.currentStep, navigation.completedSteps]);

  const resetNavigation = useCallback(() => {
    setNavigation(initialNavigationState);
  }, []);

  const value = {
    navigation,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,
    markStepCompleted,
    isStepCompleted,
    canGoToStep,
    resetNavigation,
  };

  return (
    <BookingNavigationContext.Provider value={value}>
      {children}
    </BookingNavigationContext.Provider>
  );
}

export function useBookingNavigation() {
  const context = useContext(BookingNavigationContext);
  if (context === undefined) {
    throw new Error('useBookingNavigation must be used within a BookingNavigationProvider');
  }
  return context;
}