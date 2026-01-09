'use client';

import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  description: string;
  fullDescription?: string;
  optional?: boolean;
}

interface HorizontalStepperProps {
  steps: Step[];
  activeStep: number;
  children: React.ReactNode[];
  onNext: () => void;
  onBack: () => void;
  onReset?: () => void;
  onStepClick?: (stepIndex: number) => void;
  isNextDisabled?: boolean;
  completedSteps?: boolean[];
  nextLabel?: string;
  backLabel?: string;
  finishLabel?: string;
  completionMessage?: string;
  className?: string;
}

export default function HorizontalStepper({
  steps,
  activeStep,
  children,
  onNext,
  onBack,
  onReset,
  onStepClick,
  isNextDisabled = false,
  completedSteps,
  nextLabel = 'Continue',
  backLabel = 'Back',
  finishLabel = 'Submit Booking',
  completionMessage = "Booking submitted successfully!",
  className,
}: HorizontalStepperProps) {
  const isLastStep = activeStep === steps.length - 1;
  const isCompleted = activeStep === steps.length;
  
  // If completedSteps not provided, mark all past steps as completed
  const isStepCompleted = (index: number) => {
    if (completedSteps) {
      return completedSteps[index];
    }
    return index < activeStep;
  };

  const canClickStep = (stepIndex: number) => {
    return stepIndex <= activeStep || (stepIndex === activeStep + 1 && !isNextDisabled);
  };

  return (
    <div className={cn('w-full', className)}>
      {!isCompleted ? (
        <div className="space-y-8">
          {/* Horizontal Step Indicator */}
          <div className="relative">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                const isFuture = index > activeStep;
                const isCompleted = isStepCompleted(index);
                const clickable = canClickStep(index);

                return (
                  <div key={step.label} className="flex items-center">
                    {/* Step Circle */}
                    <div
                      className={cn(
                        'relative flex items-center',
                        clickable && onStepClick && 'cursor-pointer'
                      )}
                      onClick={() => clickable && onStepClick?.(index)}
                    >
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 relative z-10',
                          isCompleted && 'bg-[#F50057] border-[#F50057] text-white',
                          isActive && !isCompleted && 'bg-white border-[#F50057] text-[#F50057] ring-4 ring-[#F50057]/20',
                          isFuture && !isCompleted && 'bg-gray-100 border-gray-300 text-gray-400',
                          clickable && 'hover:scale-105'
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>

                      {/* Step Label */}
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                        <p
                          className={cn(
                            'text-xs font-medium transition-colors',
                            isActive && 'text-[#F50057]',
                            isPast && 'text-gray-700',
                            isFuture && 'text-gray-400'
                          )}
                        >
                          {step.label}
                          {step.optional && (
                            <span className="text-[10px] text-gray-400 ml-1">(Optional)</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="flex-1 mx-4">
                        <div
                          className={cn(
                            'h-0.5 transition-colors duration-200',
                            isCompleted ? 'bg-[#F50057]' : 'bg-gray-200'
                          )}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="mt-16">
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[activeStep]?.description}
              </h2>
              {steps[activeStep]?.fullDescription && (
                <p className="text-gray-600">
                  {steps[activeStep].fullDescription}
                </p>
              )}
            </div>

            {/* Step Body */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              {children[activeStep]}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                disabled={activeStep === 0}
                className={cn(
                  "px-6 py-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
                  activeStep === 0
                    ? "bg-white/10 text-white/60 cursor-not-allowed"
                    : "bg-white/10 text-white hover:bg-[#F50057]/10"
                )}
              >
                {backLabel}
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                Step {activeStep + 1} of {steps.length}
                <ChevronRight className="w-4 h-4" />
              </div>

              <button
                onClick={onNext}
                disabled={isNextDisabled}
                className={cn(
                  "px-6 py-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isNextDisabled
                    ? "bg-white/10 text-white/60 cursor-not-allowed"
                    : "bg-[#F50057] text-white hover:bg-[#F50057]/90"
                )}
              >
                {isLastStep ? finishLabel : nextLabel}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Completion State */
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {completionMessage}
          </h3>
          <p className="text-gray-600 mb-6">
            We'll send you a confirmation email shortly with all the details.
          </p>
          {onReset && (
            <button
              onClick={onReset}
              className="px-6 py-3 bg-[#F50057] text-white rounded-lg font-medium hover:bg-[#F50057]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-2"
            >
              Book Another Appointment
            </button>
          )}
        </div>
      )}

      {/* Screen Reader Announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isCompleted
          ? completionMessage
          : `Step ${activeStep + 1} of ${steps.length}: ${steps[activeStep]?.description}`}
      </div>
    </div>
  );
}