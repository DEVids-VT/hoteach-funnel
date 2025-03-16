
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import FadeIn from "@/components/animations/FadeIn";
import FlameLoader from "@/components/FlameLoader";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import FlameButton from "@/components/FlameButton";

// Placeholder project data
const projectDetails = {
  1: {
    id: 1,
    title: "Build a Responsive Portfolio Website",
    description: "Create a professional portfolio website to showcase your skills and projects. Learn HTML, CSS, and basic JavaScript while implementing responsive design principles.",
    difficulty: "Beginner",
    duration: "2 weeks",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    overview: "This project will guide you through building a modern portfolio website from scratch. You'll learn how to structure content with HTML, style it with CSS, and add interactivity with JavaScript. The end result will be a responsive website that looks great on all devices.",
    learningObjectives: [
      "Understand HTML5 semantic elements",
      "Implement responsive layouts using CSS Flexbox and Grid",
      "Create smooth animations and transitions",
      "Build a contact form with validation",
      "Deploy your website to a hosting service"
    ],
    resources: [
      { name: "HTML5 Guide", url: "#" },
      { name: "CSS Flexbox Tutorial", url: "#" },
      { name: "JavaScript for Beginners", url: "#" },
      { name: "Responsive Design Best Practices", url: "#" }
    ]
  },
  2: {
    id: 2,
    title: "Develop a Weather App",
    description: "Build a weather application that fetches and displays current weather data using a public API. Practice JavaScript, API integration, and UI design.",
    difficulty: "Intermediate",
    duration: "3 weeks",
    skills: ["JavaScript", "API Integration", "UI Design", "Asynchronous Programming"],
    overview: "In this project, you'll create a weather application that allows users to search for weather information by city name. You'll integrate with a public weather API, handle asynchronous data fetching, and present the data in a user-friendly interface.",
    learningObjectives: [
      "Work with REST APIs and fetch data",
      "Handle JSON responses",
      "Implement async/await for asynchronous operations",
      "Create an intuitive user interface for data visualization",
      "Implement error handling for API requests"
    ],
    resources: [
      { name: "JavaScript Fetch API Guide", url: "#" },
      { name: "Working with APIs Tutorial", url: "#" },
      { name: "UI Design Fundamentals", url: "#" },
      { name: "Error Handling Best Practices", url: "#" }
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Simulate API call with a timeout
    const fetchData = () => {
      setTimeout(() => {
        const projectData = projectDetails[Number(id) as keyof typeof projectDetails];
        setProject(projectData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <FlameLoader size="lg" />
        <p className="mt-4 text-lg">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <FadeIn>
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="mt-4">
            Sorry, we couldn't find the project you're looking for. Please go back to the projects list.
          </p>
          <FlameButton 
            className="mt-6" 
            onClick={() => window.history.back()}
          >
            Go Back
          </FlameButton>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl pt-24">
      <FadeIn>
        <div className="flex items-center gap-2 mb-8">
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-gray-500 hover:text-hotteach-red"
          >
            &larr; Back to Projects
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="bg-hotteach-yellow/10 text-hotteach-dark border-hotteach-yellow">
            {project.difficulty}
          </Badge>
          <Badge variant="outline" className="bg-hotteach-red/10 text-hotteach-red border-hotteach-red">
            {project.duration}
          </Badge>
          {project.skills.map((skill: string) => (
            <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-800">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="text-lg mb-8">{project.description}</p>

        <Card className="p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
          <p>{project.overview}</p>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          {project.learningObjectives.map((objective: string, index: number) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>

        <Separator className="my-8" />

        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.resources.map((resource: { name: string, url: string }, index: number) => (
            <a 
              key={index}
              href={resource.url}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <span className="w-4 h-4 text-hotteach-red">📚</span>
              {resource.name}
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <FlameButton size="lg">
            Start This Project
          </FlameButton>
        </div>
      </FadeIn>
    </div>
  );
};

export default ProjectDetail;
