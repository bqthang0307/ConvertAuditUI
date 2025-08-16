import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                isActive && "bg-accent text-accent-foreground",
                isCompleted && "bg-primary text-primary-foreground",
                !isActive && !isCompleted && "bg-muted text-muted-foreground border border-border"
              )}
            >
              {stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div className="w-12 h-px bg-border mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;