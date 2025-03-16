
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: string;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  className?: string;
}

const ProgressIndicator = ({ steps, className }: ProgressIndicatorProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            {/* Line connector */}
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "absolute top-4 h-[2px] w-full right-0 -mr-1/2", 
                  (step.isCompleted && steps[index + 1].isCompleted) 
                    ? "bg-hotteach-red" 
                    : "bg-gray-200"
                )}
                style={{ right: "-50%" }}
              />
            )}
            
            {/* Step circle */}
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all z-10",
                step.isCompleted 
                  ? "bg-hotteach-red border-hotteach-red text-white" 
                  : step.isActive 
                    ? "bg-white border-hotteach-red text-hotteach-red" 
                    : "bg-white border-gray-200 text-gray-400"
              )}
            >
              {step.isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </div>
            
            {/* Step label */}
            <span 
              className={cn(
                "text-xs mt-2 font-medium",
                step.isActive || step.isCompleted 
                  ? "text-hotteach-red" 
                  : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
