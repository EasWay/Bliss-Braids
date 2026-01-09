'use client';

import { useBooking } from '@/context/BookingContext';
import { ValidationProvider } from '@/context/ValidationContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useToast } from '@/components/ui/Toast';
import VerticalStepper from './VerticalStepper';

// Step components
import ServiceSelection from './ServiceSelection';
import SizeSelector from './SizeSelector';
import LengthSelector from './LengthSelector';
import AddOnsStep from './AddOnsStep';
import DatePicker from './DatePicker';
import TimeSlots from './TimeSlots';
import ContactForm from './ContactForm';

const STEPS = [
  {
    label: 'Choose Your Service',
    description: 'Select the braiding style that best suits your needs',
  },
  {
    label: 'Select Braid Size',
    description: 'Choose from small, medium, or large braid sizes',
  },
  {
    label: 'Choose Hair Length',
    description: 'Pick your desired hair length for the perfect look',
  },
  {
    label: 'Add Optional Extras',
    description: 'Enhance your style with additional services',
    optional: true,
  },
  {
    label: 'Pick Your Date',
    description: 'Select your preferred appointment date',
  },
  {
    label: 'Select Time Slot',
    description: 'Choose an available time that works for you',
  },
  {
    label: 'Contact Details',
    description: 'Provide your information to complete the booking',
  },
];

export default function BookingWizard() {
  const { currentStep, goToNextStep, goToPreviousStep, resetBooking, bookingState } = useBooking();
  const { showToast } = useToast();

  const handleStepError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Booking wizard step error:', error, errorInfo);
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
        return !!bookingState.selectedService;
      case 1: // Size selection
        return !!bookingState.selectedSize;
      case 2: // Length selection
        return !!bookingState.selectedLength;
      case 3: // Add-ons (optional - always valid)
        return true;
      case 4: // Date selection
        return !!bookingState.selectedDate;
      case 5: // Time selection
        return !!bookingState.selectedTime;
      case 6: // Contact form - check if all required fields are filled
        return !!(
          bookingState.customerInfo?.name &&
          bookingState.customerInfo?.whatsapp &&
          bookingState.customerInfo?.email
        );
      default:
        return false;
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = () => isStepCompleted(currentStep);

  // Get array of completed steps for visual feedback
  const completedSteps = STEPS.map((_, index) => isStepCompleted(index));

  const handleNext = () => {
    if (isCurrentStepValid()) {
      goToNextStep();
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  const handleReset = () => {
    resetBooking();
  };

  return (
    <ValidationProvider>
      <ErrorBoundary onError={handleStepError}>
        <VerticalStepper
          steps={STEPS}
          activeStep={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          onReset={handleReset}
          isNextDisabled={!isCurrentStepValid()}
          completedSteps={completedSteps}
          completionMessage="Booking submitted successfully! Check your email for confirmation."
        >
          <ServiceSelection />
          <SizeSelector />
          <LengthSelector />
          <AddOnsStep />
          <DatePicker />
          <TimeSlots />
          <ContactForm />
        </VerticalStepper>
      </ErrorBoundary>
    </ValidationProvider>
  );
}
