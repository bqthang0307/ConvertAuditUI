import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-6 sm:mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={cn(
                "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-colors",
                isActive && "bg-excellent-500 text-accent-foreground",
                isCompleted && "bg-excellent-500 text-accent-foreground",
                !isActive && !isCompleted && "text-excellent border border-excellent"
              )}
            >
              {isCompleted ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < totalSteps && (
              <div className="w-20 sm:w-24 md:w-32 lg:w-40 h-px bg-excellent-500" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;