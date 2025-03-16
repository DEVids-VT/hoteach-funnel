
import { cn } from "@/lib/utils";

interface FlameLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const FlameLoader = ({ size = "md", className }: FlameLoaderProps) => {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizes[size], className)}>
      <div className="absolute inset-0 flex items-center justify-center animate-flame-pulse">
        <img 
          src="/lovable-uploads/fc3d01d3-2458-402a-a8dc-bbf4ff606e77.png" 
          alt="Flame character" 
          className="w-full h-full object-contain" 
        />
      </div>
      <div className="absolute bottom-0 w-2/3 h-1/3 bg-black/10 rounded-full filter blur-md transform translate-y-1/2 scale-75 animate-pulse"></div>
    </div>
  );
};

export default FlameLoader;
