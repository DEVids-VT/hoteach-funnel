
import { cn } from "@/lib/utils";
import FlameButton from "./FlameButton";
import { Flame } from "lucide-react";

interface LearningPathCardProps {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  topics: string[];
  isRecommended?: boolean;
  onClick?: () => void;
  className?: string;
}

const LearningPathCard = ({
  title,
  description,
  difficulty,
  estimatedTime,
  topics,
  isRecommended = false,
  onClick,
  className
}: LearningPathCardProps) => {
  const difficultyColor = {
    beginner: "bg-green-500",
    intermediate: "bg-yellow-500",
    advanced: "bg-red-500"
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300",
        isRecommended ? "border-hotteach-red shadow-lg" : "hover:shadow-md",
        className
      )}
    >
      {isRecommended && (
        <div className="bg-hotteach-red text-white text-xs font-semibold py-1 px-3 flex items-center justify-center gap-1">
          <Flame className="w-3 h-3" />
          Recommended Path For You
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center gap-2">
            <span 
              className={cn(
                "inline-block w-3 h-3 rounded-full",
                difficultyColor[difficulty]
              )}
            />
            <span className="text-xs text-muted-foreground capitalize">
              {difficulty}
            </span>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        
        <div className="mb-4">
          <span className="text-xs text-muted-foreground block mb-2">
            Estimated time: {estimatedTime}
          </span>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {topics.map((topic) => (
              <span 
                key={topic} 
                className="text-xs bg-muted px-2 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        
        <FlameButton 
          variant="outline" 
          size="sm"
          className="w-full"
          onClick={onClick}
        >
          View Path
        </FlameButton>
      </div>
    </div>
  );
};

export default LearningPathCard;
