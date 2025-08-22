import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                isActive && "bg-excellent-500 text-accent-foreground",
                isCompleted && "bg-excellent-500 text-accent-foreground",
                !isActive && !isCompleted && "bg-muted text-excellent border border-excellent"
              )}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < totalSteps && (
              <div className="w-[160px] h-px bg-excellent-500" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;