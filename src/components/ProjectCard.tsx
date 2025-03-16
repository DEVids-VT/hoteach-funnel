
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  topics: string[];
  isHot?: boolean;
  image?: string;
  className?: string;
}

const ProjectCard = ({
  id,
  title,
  description,
  difficulty,
  topics,
  isHot = false,
  image,
  className
}: ProjectCardProps) => {
  const difficultyColor = {
    beginner: "bg-green-500 text-white",
    intermediate: "bg-yellow-500 text-white",
    advanced: "bg-red-500 text-white"
  };

  return (
    <Link 
      to={`/projects/${id}`}
      className={cn(
        "group glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {/* Project image */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-hotteach-yellow/20 to-hotteach-red/20 flex items-center justify-center">
            <img 
              src="/lovable-uploads/7e46f90b-8952-4b26-8be2-a9bda056402a.png" 
              alt="Default project" 
              className="w-1/2 h-auto opacity-50"
            />
          </div>
        )}
        
        {/* Hot badge */}
        {isHot && (
          <div className="absolute top-3 right-3 bg-hotteach-red text-white text-xs font-semibold py-1 px-3 rounded-full flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Hot Project
          </div>
        )}
        
        {/* Difficulty badge */}
        <div className="absolute bottom-3 left-3">
          <span className={cn(
            "text-xs px-2 py-1 rounded-full font-medium capitalize",
            difficultyColor[difficulty]
          )}>
            {difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-hotteach-red transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {topics.slice(0, 3).map((topic) => (
            <span 
              key={topic} 
              className="text-xs bg-muted px-2 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
          {topics.length > 3 && (
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              +{topics.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
