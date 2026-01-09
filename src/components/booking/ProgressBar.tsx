'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  const stepNames = [
    'Service Selection',
    'Size Selection',
    'Length Selection',
    'Add-ons',
    'Date Selection',
    'Time Selection',
    'Contact Information'
  ];
  
  const currentStepName = stepNames[currentStep - 1] || 'Unknown';
  
  return (
    <div className="w-full mb-8">
      {/* Screen reader announcement for step changes */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Step {currentStep} of {totalSteps}: {currentStepName}. {percentage}% complete.
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-charcoal" aria-hidden="true">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary" aria-hidden="true">
          {percentage}% Complete
        </span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Booking progress: ${percentage}% complete`}
        />
      </div>
    </div>
  );
}
