
import { ButtonHTMLAttributes, ReactNode, ElementType, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface FlameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  showFlame?: boolean;
  isLoading?: boolean;
  as?: ElementType;
  // Make the component accept any props for the 'as' component
  [x: string]: any;
}

const FlameButton = forwardRef<HTMLButtonElement, FlameButtonProps>(({
  children,
  className,
  variant = "primary",
  size = "md",
  showFlame = true,
  isLoading = false,
  as: Component = "button",
  ...props
}, ref) => {
  const variants = {
    primary: "bg-hotteach-yellow text-hotteach-dark hover:shadow-lg hover:brightness-105",
    secondary: "bg-hotteach-red text-white hover:shadow-lg hover:brightness-105",
    outline: "bg-transparent border-2 border-hotteach-yellow text-hotteach-yellow hover:bg-hotteach-yellow/10",
    ghost: "bg-transparent text-hotteach-yellow hover:bg-hotteach-yellow/10"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
    xl: "px-8 py-4 text-xl rounded-2xl"
  };

  return (
    <Component
      className={cn(
        "relative font-medium transition-all duration-300 ease-out flex items-center justify-center gap-2 hover-scale",
        variants[variant],
        sizes[size],
        isLoading && "opacity-80 pointer-events-none",
        className
      )}
      disabled={isLoading || props.disabled}
      ref={ref}
      {...props}
    >
      {showFlame && !isLoading && (
        <Flame className={cn("w-5 h-5", size === "xl" && "w-6 h-6", "text-hotteach-red animate-flame-pulse")} />
      )}
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Component>
  );
});

FlameButton.displayName = "FlameButton";

export default FlameButton;
