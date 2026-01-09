'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  description?: string;
  optional?: boolean;
}

interface VerticalStepperProps {
  steps: Step[];
  activeStep: number;
  children: React.ReactNode[];
  onNext: () => void;
  onBack: () => void;
  onReset?: () => void;
  isNextDisabled?: boolean;
  completedSteps?: boolean[];
  nextLabel?: string;
  backLabel?: string;
  finishLabel?: string;
  completionMessage?: string;
  className?: string;
}

export default function VerticalStepper({
  steps,
  activeStep,
  children,
  onNext,
  onBack,
  onReset,
  isNextDisabled = false,
  completedSteps,
  nextLabel = 'Continue',
  backLabel = 'Back',
  finishLabel = 'Finish',
  completionMessage = "All steps completed - you're finished",
  className,
}: VerticalStepperProps) {
  const isLastStep = activeStep === steps.length - 1;
  const isCompleted = activeStep === steps.length;
  
  // If completedSteps not provided, mark all past steps as completed
  const isStepCompleted = (index: number) => {
    if (completedSteps) {
      return completedSteps[index];
    }
    return index < activeStep;
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {!isCompleted ? (
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            const isFuture = index > activeStep;
            const isCompleted = isStepCompleted(index);

            return (
              <div key={step.label} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute left-5 top-12 w-0.5 h-full -mb-4',
                      isCompleted ? 'bg-primary' : 'bg-white/20'
                    )}
                    aria-hidden="true"
                  />
                )}

                {/* Step Container */}
                <div className="flex gap-4">
                  {/* Step Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200',
                        isCompleted && 'bg-primary border-primary text-white',
                        isActive && !isCompleted && 'bg-white/10 border-primary text-primary ring-4 ring-primary/20',
                        isFuture && !isCompleted && 'bg-white/5 border-white/20 text-white/40'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    {/* Step Header */}
                    <div className="mb-1">
                      <h3
                        className={cn(
                          'text-sm font-semibold transition-colors',
                          isActive && 'text-white',
                          isPast && 'text-white',
                          isFuture && 'text-white/40'
                        )}
                      >
                        {step.label}
                        {step.optional && (
                          <span className="text-[10px] text-white/60 ml-1">(Optional)</span>
                        )}
                      </h3>
                      {step.description && !isActive && (
                        <p className="text-xs text-white/60 mt-0.5">{step.description}</p>
                      )}
                    </div>

                    {/* Step Body - Only show for active step */}
                    {isActive && (
                      <div className="mt-2">
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-sm p-3 border border-white/10">
                          {children[index]}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={onNext}
                            disabled={isNextDisabled}
                            className={cn(
                              "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                              isNextDisabled
                                ? "bg-white/10 text-white/40 cursor-not-allowed"
                                : "bg-primary text-white hover:bg-primary/90"
                            )}
                          >
                            {isLastStep ? finishLabel : nextLabel}
                          </button>
                          <button
                            onClick={onBack}
                            disabled={index === 0}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-1"
                          >
                            {backLabel}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Completion State */
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border border-white/10">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {completionMessage}
          </h3>
          {onReset && (
            <button
              onClick={onReset}
              className="mt-4 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Screen Reader Announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isCompleted
          ? completionMessage
          : `Step ${activeStep + 1} of ${steps.length}: ${steps[activeStep]?.label}`}
      </div>
    </div>
  );
}
