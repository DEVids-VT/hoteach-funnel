
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "none";
}

const FadeIn = ({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: FadeInProps) => {
  const getAnimationClass = () => {
    switch (direction) {
      case "up":
        return "animate-slide-up";
      case "down":
        return "animate-slide-down";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <div 
      className={cn(getAnimationClass(), className)}
      style={{ 
        opacity: 0,
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards" 
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
