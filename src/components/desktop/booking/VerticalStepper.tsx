'use client';

import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  description: string;
  fullDescription?: string;
  optional?: boolean;
}

interface VerticalStepperProps {
  steps: Step[];
  activeStep: number;
  onStepClick?: (stepIndex: number) => void;
  completedSteps?: boolean[];
  className?: string;
}

export default function VerticalStepper({
  steps,
  activeStep,
  onStepClick,
  completedSteps,
  className,
}: VerticalStepperProps) {
  const isStepCompleted = (index: number) => {
    if (completedSteps) {
      return completedSteps[index];
    }
    return index < activeStep;
  };

  const canClickStep = (stepIndex: number) => {
    return stepIndex <= activeStep && onStepClick;
  };

  return (
    <div className={cn('w-full', className)}>
      <div>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isPast = index < activeStep;
          const isFuture = index > activeStep;
          const isCompleted = isStepCompleted(index);
          const clickable = canClickStep(index);
          const isLastStep = index === steps.length - 1;

          return (
            <div
              key={step.label}
              // pb-10 creates the vertical gap between steps
              className={cn('relative', !isLastStep && 'pb-10')}
            >
              {/* Step Row */}
              <div
                className={cn(
                  'relative flex items-start gap-3 p-3 transition-all duration-200 rounded-lg',
                  isActive && 'bg-[#F50057]/5',
                  clickable && 'cursor-pointer hover:bg-white/10',
                  !isActive && !clickable && 'hover:bg-white/10'
                )}
                onClick={() => clickable && onStepClick?.(index)}
              >
                {/* Step Circle */}
                {/* z-10 ensures the circle sits ON TOP of the connector line */}
                <div
                  className={cn(
                    'relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200 flex-shrink-0',
                    isCompleted && 'bg-[#F50057] border-[#F50057] text-white',
                    isActive &&
                      !isCompleted &&
                      'bg-[#F50057] border-[#F50057] text-white ring-2 ring-[#F50057]/30',
                    isFuture &&
                      !isCompleted &&
                      'bg-white/20 border-white/30 text-white/60',
                    clickable && 'hover:scale-105'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-1">
                    <h3
                      className={cn(
                        'text-sm font-semibold transition-colors',
                        isActive && 'text-[#F50057]',
                        isPast && 'text-white/80',
                        isFuture && 'text-white/60'
                      )}
                    >
                      {step.label}
                      {step.optional && (
                        <span className="text-xs text-white/60 ml-1 font-normal">
                          (Optional)
                        </span>
                      )}
                    </h3>
                    {isActive && (
                      <ChevronRight className="w-3 h-3 text-[#F50057]" />
                    )}
                  </div>
                  <p
                    className={cn(
                      'text-xs mt-1 transition-colors leading-relaxed',
                      isActive && 'text-white/80',
                      isPast && 'text-white/70',
                      isFuture && 'text-white/50'
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {/* Rendered AFTER the Step Row so it sits on top of the row's background */}
              {!isLastStep && (
                <div
                  // left-7 (28px) aligns with: p-3 (12px) + half w-8 (16px) = 28px center
                  // top-3 aligns with the top of the circle, so it starts behind it
                  // h-[calc(100%+20px)] ensures it reaches the next circle through the padding
                  className="absolute left-7 top-3 w-0.5 -ml-px h-[calc(100%+20px)] bg-gray-300"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Step {activeStep + 1} of {steps.length}:{' '}
        {steps[activeStep]?.description}
      </div>
    </div>
  );
}