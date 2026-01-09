'use client';

import { useBookingConfig, useBookingForm, useBookingNavigation } from '@/context/BookingProvider';
import { ValidationProvider } from '@/context/ValidationContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useToast } from '@/components/ui/Toast';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

// Mobile step components (we'll use desktop ones for now, but can create mobile-specific later)
import DesktopServiceSelection from '@/components/desktop/booking/steps/DesktopServiceSelection';
import DesktopSizeSelector from '@/components/desktop/booking/steps/DesktopSizeSelector';
import DesktopLengthSelector from '@/components/desktop/booking/steps/DesktopLengthSelector';
import DesktopAddOnsStep from '@/components/desktop/booking/steps/DesktopAddOnsStep';
import DesktopDatePicker from '@/components/desktop/booking/steps/DesktopDatePicker';
import DesktopTimeSlots from '@/components/desktop/booking/steps/DesktopTimeSlots';
import DesktopContactForm from '@/components/desktop/booking/steps/DesktopContactForm';
import DesktopPricingSidebar from '@/components/desktop/booking/DesktopPricingSidebar';

const STEPS = [
  {
    label: 'Service',
    description: 'Choose Your Service',
    fullDescription: 'Select the braiding style that best suits your needs',
  },
  {
    label: 'Size',
    description: 'Select Braid Size',
    fullDescription: 'Choose from small, medium, or large braid sizes',
  },
  {
    label: 'Length',
    description: 'Choose Hair Length',
    fullDescription: 'Pick your desired hair length for the perfect look',
  },
  {
    label: 'Extras',
    description: 'Add Optional Extras',
    fullDescription: 'Enhance your style with additional services',
    optional: true,
  },
  {
    label: 'Date',
    description: 'Pick Your Date',
    fullDescription: 'Select your preferred appointment date',
  },
  {
    label: 'Time',
    description: 'Select Time Slot',
    fullDescription: 'Choose an available time that works for you',
  },
  {
    label: 'Contact',
    description: 'Contact Details',
    fullDescription: 'Provide your information to complete the booking',
  },
];

export default function MobileBookingWizard() {
  const { config, resetConfig } = useBookingConfig();
  const { formState } = useBookingForm();
  const { navigation, goToNextStep, goToPreviousStep, resetNavigation } = useBookingNavigation();
  const { showToast } = useToast();

  const handleStepError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Mobile booking wizard step error:', error, errorInfo);
    showToast({
      type: 'error',
      title: 'Step Error',
      message: 'There was an issue with this booking step. Please try again.',
      action: {
        label: 'Refresh',
        onClick: () => window.location.reload()
      }
    });
  };

  // Check if a specific step is valid/completed
  const isStepCompleted = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Service selection
        return !!config.selectedService;
      case 1: // Size selection
        return !!config.selectedSize;
      case 2: // Length selection
        return !!config.selectedLength;
      case 3: // Add-ons (optional - always valid)
        return true;
      case 4: // Date selection
        return !!config.selectedDate;
      case 5: // Time selection
        return !!config.selectedTime;
      case 6: // Contact form - check if all required fields are filled
        return !!(
          formState.customerInfo?.name &&
          formState.customerInfo?.whatsapp &&
          formState.customerInfo?.email
        );
      default:
        return false;
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = () => isStepCompleted(navigation.currentStep);

  const handleNext = () => {
    if (isCurrentStepValid()) {
      if (isLastStep) {
        // Trigger form submission for contact form
        const contactForm = document.querySelector('#contact-form') as HTMLFormElement;
        if (contactForm) {
          contactForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      } else {
        goToNextStep();
      }
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  const resetBooking = () => {
    resetConfig();
    resetNavigation();
  };

  const isLastStep = navigation.currentStep === STEPS.length - 1;
  const isCompleted = navigation.currentStep === STEPS.length;

  const stepComponents = [
    <DesktopServiceSelection key="service" />,
    <DesktopSizeSelector key="size" />,
    <DesktopLengthSelector key="length" />,
    <DesktopAddOnsStep key="addons" />,
    <DesktopDatePicker key="date" />,
    <DesktopTimeSlots key="time" />,
    <DesktopContactForm key="contact" />
  ];

  if (isCompleted) {
    return (
      <ValidationProvider>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Booking Submitted!
          </h3>
          <p className="text-white/80 text-sm mb-6">
            We'll send you a confirmation email shortly.
          </p>
          <button
            onClick={resetBooking}
            className="px-4 py-2 bg-[#F50057] text-white rounded-lg font-medium hover:bg-[#F50057]/90 transition-colors text-sm"
          >
            Book Another
          </button>
        </div>
      </ValidationProvider>
    );
  }

  return (
    <ValidationProvider>
      <ErrorBoundary onError={handleStepError}>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/80 uppercase tracking-wide">
                Step {navigation.currentStep + 1} of {STEPS.length}
              </span>
              <span className="text-xs text-white/80">
                {Math.round(((navigation.currentStep + 1) / STEPS.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-[#F50057] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((navigation.currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg p-6">
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">
                {STEPS[navigation.currentStep]?.description}
              </h2>
              {STEPS[navigation.currentStep]?.fullDescription && (
                <p className="text-white/80 text-sm">
                  {STEPS[navigation.currentStep].fullDescription}
                </p>
              )}
            </div>

            {/* Step Component */}
            <div className="mb-6">
              {stepComponents[navigation.currentStep]}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={navigation.currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 bg-white/10 rounded-lg hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className="flex items-center gap-2 px-6 py-2 bg-[#F50057] text-white rounded-lg font-medium hover:bg-[#F50057]/90 disabled:bg-white/20 disabled:text-white/70 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {isLastStep ? 'Submit' : 'Next'}
                {!isLastStep && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Pricing Summary - Sticky at bottom */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg p-4">
            <DesktopPricingSidebar />
          </div>
        </div>
      </ErrorBoundary>
    </ValidationProvider>
  );
}