'use client';

import { useBookingConfig, useBookingForm, useBookingNavigation } from '@/context/BookingProvider';
import { ValidationProvider } from '@/context/ValidationContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useToast } from '@/components/ui/Toast';
import { ArrowLeft, Check } from 'lucide-react';
import VerticalStepper from './VerticalStepper';
import DesktopPricingSidebar from './DesktopPricingSidebar';

// Desktop step components
import DesktopServiceSelection from './steps/DesktopServiceSelection';
import DesktopSizeSelector from './steps/DesktopSizeSelector';
import DesktopLengthSelector from './steps/DesktopLengthSelector';
import DesktopAddOnsStep from './steps/DesktopAddOnsStep';
import DesktopDatePicker from './steps/DesktopDatePicker';
import DesktopTimeSlots from './steps/DesktopTimeSlots';
import DesktopContactForm from './steps/DesktopContactForm';

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

export default function TwoColumnBookingWizard() {
  const { config, resetConfig } = useBookingConfig();
  const { formState } = useBookingForm();
  const { navigation, goToNextStep, goToPreviousStep, setCurrentStep, resetNavigation } = useBookingNavigation();
  const { showToast } = useToast();

  const handleStepError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Desktop booking wizard step error:', error, errorInfo);
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

  // Get array of completed steps for visual feedback
  const completedSteps = STEPS.map((_, index) => isStepCompleted(index));

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

  const handleStepClick = (stepIndex: number) => {
    // Allow clicking on completed steps or current step
    if (stepIndex <= navigation.currentStep) {
      setCurrentStep(stepIndex);
    }
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
      <div className="min-h-screen" style={{ backgroundColor: '#020119' }}>
        <ValidationProvider>
          <div className="max-w-4xl mx-auto pt-20">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Booking submitted successfully!
              </h3>
              <p className="text-white/80 mb-6">
                We'll send you a confirmation email shortly with all the details.
              </p>
              <button
                onClick={resetBooking}
                className="px-6 py-3 bg-[#F50057] text-white rounded-lg font-medium hover:bg-[#F50057]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-2 focus:ring-offset-[#020119]"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </ValidationProvider>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020119' }}>
      <ValidationProvider>
        <ErrorBoundary onError={handleStepError}>
          <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Left Sidebar - Progress Tracker */}
              <div className="lg:w-80 lg:flex-shrink-0">
                <div className="p-6 lg:sticky lg:top-0">
                  {/* Brand Header */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-white">Bliss Braids</h2>
                    <p className="text-sm text-white/80 mt-1">Book Your Appointment</p>
                  </div>
                  
                  {/* Progress Stepper */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                      Progress
                    </h3>
                    <VerticalStepper
                      steps={STEPS}
                      activeStep={navigation.currentStep}
                      onStepClick={handleStepClick}
                      completedSteps={completedSteps}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Main Content Area */}
              <div className="flex-1 flex flex-col">
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between p-4">
                  <button
                    onClick={handleBack}
                    disabled={navigation.currentStep === 0}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white/90 bg-white/10 rounded-lg hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>

                {/* Main Content Container */}
                <div className="flex-1 flex flex-col lg:flex-row">
                  {/* Form Content Area */}
                  <div className="flex-1 p-6">
                    {/* Page Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-xs text-white/80 mb-1 uppercase tracking-wide">
                            Step {navigation.currentStep + 1} of {STEPS.length}
                          </div>
                          <h1 className="text-2xl font-bold text-white">
                            {STEPS[navigation.currentStep]?.description}
                          </h1>
                          {STEPS[navigation.currentStep]?.fullDescription && (
                            <p className="text-white/80 text-sm mt-2">
                              {STEPS[navigation.currentStep].fullDescription}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1">
                      {stepComponents[navigation.currentStep]}
                    </div>

                    {/* Footer Action */}
                    <div className="flex justify-end mt-8 pt-6">
                      <button
                        onClick={handleNext}
                        disabled={!isCurrentStepValid()}
                        className="px-8 py-3 bg-[#F50057] text-white rounded-lg font-medium hover:bg-[#F50057]/90 disabled:bg-white/20 disabled:text-white/70 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-2 focus:ring-offset-[#020119]"
                      >
                        {isLastStep ? 'Submit Booking' : 'Next'}
                      </button>
                    </div>
                  </div>

                  {/* Right Sidebar - Booking Summary */}
                  <div className="lg:w-80 p-6">
                    <DesktopPricingSidebar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </ValidationProvider>
    </div>
  );
}