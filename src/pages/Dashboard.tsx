
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import FlameButton from "@/components/FlameButton";
import FlameLoader from "@/components/FlameLoader";
import LearningPathCard from "@/components/LearningPathCard";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/animations/FadeIn";
import { useOnboarding } from "@/context/OnboardingContext";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart,
  BookOpen,
  Award,
  Users,
  Calendar,
  CheckCircle 
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { stage, userPreferences } = useOnboarding();
  
  // Redirect if not completed onboarding
  useEffect(() => {
    if (stage !== "complete") {
      navigate("/");
    }
  }, [stage, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <FadeIn>
            <section className="mb-10">
              <div className="glass-card rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                      Welcome back, {userPreferences?.name?.split(" ")[0] || "Student"}!
                    </h1>
                    <p className="text-muted-foreground">
                      Your personalized learning journey awaits. Ready to continue where you left off?
                    </p>
                  </div>
                  <FlameButton variant="secondary" size="lg">
                    Continue Learning
                  </FlameButton>
                </div>
              </div>
            </section>
          </FadeIn>
          
          {/* Progress Stats */}
          <FadeIn delay={100}>
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Courses</h3>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                </Card>
                
                <Card className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-hotteach-yellow/20 p-3">
                      <Award className="h-6 w-6 text-hotteach-yellow" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Achievements</h3>
                      <p className="text-3xl font-bold">7</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Next achievement</span>
                      <span className="text-sm font-medium">2 days</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </Card>
                
                <Card className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-hotteach-red/20 p-3">
                      <CheckCircle className="h-6 w-6 text-hotteach-red" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Completed</h3>
                      <p className="text-3xl font-bold">12</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">This month</span>
                      <span className="text-sm font-medium">+4</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </Card>
              </div>
            </section>
          </FadeIn>
          
          {/* Learning Paths Section */}
          <FadeIn delay={200}>
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Learning Paths</h2>
                <Link to="/paths" className="text-sm text-hotteach-red hover:underline">
                  View all paths
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningPaths.map((path, index) => (
                  <LearningPathCard
                    key={path.title}
                    title={path.title}
                    description={path.description}
                    difficulty={path.difficulty}
                    estimatedTime={path.estimatedTime}
                    topics={path.topics}
                    isRecommended={index === 0}
                  />
                ))}
              </div>
            </section>
          </FadeIn>
          
          {/* Dashboard Tabs */}
          <FadeIn delay={300}>
            <section className="mb-12">
              <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="projects" className="flex gap-2 items-center">
                    <BarChart className="h-4 w-4" />
                    <span>Hot Projects</span>
                  </TabsTrigger>
                  <TabsTrigger value="community" className="flex gap-2 items-center">
                    <Users className="h-4 w-4" />
                    <span>Community</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects" className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        difficulty={project.difficulty}
                        topics={project.topics}
                        isHot={index === 0}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="community" className="space-y-4">
                  <div className="glass-card rounded-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-full md:w-3/5">
                        <h3 className="text-xl font-bold mb-2">
                          Join the HotTeach Community
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Connect with like-minded learners, share your progress, and get help when you need it.
                        </p>
                        <FlameButton variant="outline" size="md">
                          Join Discord Community
                        </FlameButton>
                      </div>
                      <div className="w-full md:w-2/5 flex justify-center">
                        <img 
                          src="/lovable-uploads/8e6113bc-a70f-42ac-92a8-47816f4dba8d.png" 
                          alt="Community" 
                          className="h-32 object-contain opacity-70"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <Card className="p-5">
                      <h3 className="text-lg font-medium mb-3">Latest Discussions</h3>
                      <ul className="space-y-3">
                        <li className="border-b pb-2">
                          <a href="#" className="hover:text-hotteach-red">How to optimize React performance?</a>
                          <p className="text-sm text-muted-foreground">32 replies • 2 hours ago</p>
                        </li>
                        <li className="border-b pb-2">
                          <a href="#" className="hover:text-hotteach-red">Best practices for API design</a>
                          <p className="text-sm text-muted-foreground">17 replies • Yesterday</p>
                        </li>
                        <li>
                          <a href="#" className="hover:text-hotteach-red">Share your portfolio projects!</a>
                          <p className="text-sm text-muted-foreground">48 replies • 3 days ago</p>
                        </li>
                      </ul>
                    </Card>
                    
                    <Card className="p-5">
                      <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
                      <ul className="space-y-3">
                        <li className="border-b pb-2">
                          <a href="#" className="hover:text-hotteach-red">Web Development Workshop</a>
                          <p className="text-sm text-muted-foreground">May 15, 2023 • 2:00 PM</p>
                        </li>
                        <li className="border-b pb-2">
                          <a href="#" className="hover:text-hotteach-red">Code Review Session</a>
                          <p className="text-sm text-muted-foreground">May 18, 2023 • 4:00 PM</p>
                        </li>
                        <li>
                          <a href="#" className="hover:text-hotteach-red">React Ecosystem Webinar</a>
                          <p className="text-sm text-muted-foreground">May 22, 2023 • 1:00 PM</p>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="calendar" className="space-y-4">
                  <Card className="p-5">
                    <h3 className="text-lg font-medium mb-4">Your Learning Schedule</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-md">
                        <div className="bg-blue-100 text-blue-600 w-12 h-12 flex flex-col items-center justify-center rounded-md">
                          <span className="text-xs font-bold">MAY</span>
                          <span className="text-lg font-bold">14</span>
                        </div>
                        <div>
                          <h4 className="font-medium">React Hooks Deep Dive</h4>
                          <p className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</p>
                        </div>
                        <FlameButton variant="ghost" size="sm" className="ml-auto">
                          Join
                        </FlameButton>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 bg-hotteach-yellow/10 rounded-md">
                        <div className="bg-hotteach-yellow/20 text-hotteach-dark w-12 h-12 flex flex-col items-center justify-center rounded-md">
                          <span className="text-xs font-bold">MAY</span>
                          <span className="text-lg font-bold">16</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Database Design Principles</h4>
                          <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                        </div>
                        <FlameButton variant="ghost" size="sm" className="ml-auto">
                          Join
                        </FlameButton>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 bg-hotteach-red/10 rounded-md">
                        <div className="bg-hotteach-red/20 text-hotteach-red w-12 h-12 flex flex-col items-center justify-center rounded-md">
                          <span className="text-xs font-bold">MAY</span>
                          <span className="text-lg font-bold">18</span>
                        </div>
                        <div>
                          <h4 className="font-medium">API Integration Workshop</h4>
                          <p className="text-sm text-muted-foreground">3:00 PM - 4:30 PM</p>
                        </div>
                        <FlameButton variant="ghost" size="sm" className="ml-auto">
                          Join
                        </FlameButton>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

const learningPaths = [
  {
    title: "Web Development Fundamentals",
    description: "Master the core concepts of HTML, CSS, and JavaScript to build modern websites.",
    difficulty: "beginner" as const,
    estimatedTime: "8 weeks",
    topics: ["HTML", "CSS", "JavaScript", "Responsive Design"]
  },
  {
    title: "React Developer",
    description: "Learn to build dynamic UIs with React, the popular JavaScript library.",
    difficulty: "intermediate" as const,
    estimatedTime: "10 weeks",
    topics: ["React", "Redux", "React Router", "Hooks", "Context API"]
  },
  {
    title: "Full-Stack Development",
    description: "Become a versatile developer by mastering both front-end and back-end technologies.",
    difficulty: "advanced" as const,
    estimatedTime: "16 weeks",
    topics: ["Node.js", "Express", "MongoDB", "RESTful APIs", "Authentication"]
  }
];

const projects = [
  {
    id: "1",
    title: "Build a Personal Portfolio",
    description: "Create a stunning portfolio website to showcase your projects and skills.",
    difficulty: "beginner" as const,
    topics: ["HTML", "CSS", "JavaScript", "Responsive Design"]
  },
  {
    id: "2",
    title: "E-commerce Store",
    description: "Build a fully functional online store with payment processing.",
    difficulty: "intermediate" as const,
    topics: ["React", "Node.js", "Express", "MongoDB", "Stripe API"]
  },
  {
    id: "3",
    title: "Social Media Dashboard",
    description: "Create a dashboard that integrates with multiple social media platforms.",
    difficulty: "advanced" as const,
    topics: ["React", "Redux", "API Integration", "Data Visualization"]
  }
];

export default Dashboard;
