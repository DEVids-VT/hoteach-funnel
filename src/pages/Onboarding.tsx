
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlameButton from "@/components/FlameButton";
import ProgressIndicator from "@/components/ProgressIndicator";
import { useOnboarding } from "@/context/OnboardingContext";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const { stage, setStage, userPreferences, updateUserPreferences, addCompletedStep } = useOnboarding();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not in the correct stage
  useEffect(() => {
    if (stage !== "preferences") {
      navigate("/");
    }
  }, [stage, navigate]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Update onboarding state
      addCompletedStep("preferences");
      setStage("complete");
      
      // Show success toast
      toast.success("Your learning profile is ready! Welcome to HotTeach.", {
        duration: 3000,
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    }, 2000);
  };

  const steps = [
    { id: "checkout", label: "Checkout", isActive: false, isCompleted: true },
    { id: "activation", label: "Activation", isActive: false, isCompleted: true },
    { id: "onboarding", label: "Onboarding", isActive: true, isCompleted: false },
    { id: "complete", label: "Complete", isActive: false, isCompleted: false }
  ];

  const onboardingSteps = [
    {
      title: "Personal Information",
      fields: (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={userPreferences.name}
              onChange={(e) => updateUserPreferences({ name: e.target.value })}
              className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-hotteach-red/30"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={userPreferences.email}
              onChange={(e) => updateUserPreferences({ email: e.target.value })}
              className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-hotteach-red/30"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
      )
    },
    {
      title: "Your Goals",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">
              What are your learning goals?
            </label>
            <div className="space-y-2">
              {[
                "Career advancement",
                "Learning new skills",
                "Starting a business",
                "Personal growth",
                "Academic success"
              ].map((goal) => (
                <label key={goal} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-hotteach-red/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={userPreferences.goals.includes(goal)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateUserPreferences({ 
                          goals: [...userPreferences.goals, goal] 
                        });
                      } else {
                        updateUserPreferences({ 
                          goals: userPreferences.goals.filter(g => g !== goal) 
                        });
                      }
                    }}
                    className="rounded text-hotteach-red"
                  />
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Experience Level",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">
              What's your current experience level?
            </label>
            <div className="space-y-2">
              {[
                { label: "Beginner - I'm just starting out", value: "beginner" },
                { label: "Intermediate - I have some experience", value: "intermediate" },
                { label: "Advanced - I'm very experienced", value: "advanced" }
              ].map((level) => (
                <label key={level.value} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-hotteach-red/50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="experience"
                    value={level.value}
                    checked={userPreferences.experience === level.value}
                    onChange={() => updateUserPreferences({ experience: level.value as any })}
                    className="text-hotteach-red"
                  />
                  <span>{level.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Interests",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">
              Select your areas of interest
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Web Development",
                "Mobile Apps",
                "Data Science",
                "AI & Machine Learning",
                "Design",
                "Product Management",
                "Marketing",
                "Business"
              ].map((interest) => (
                <label key={interest} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-hotteach-red/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={userPreferences.interests.includes(interest)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateUserPreferences({ 
                          interests: [...userPreferences.interests, interest] 
                        });
                      } else {
                        updateUserPreferences({ 
                          interests: userPreferences.interests.filter(i => i !== interest) 
                        });
                      }
                    }}
                    className="rounded text-hotteach-red"
                  />
                  <span className="text-sm">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Time Commitment",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">
              How much time can you commit weekly?
            </label>
            <div className="space-y-2">
              {[
                { label: "Low - Less than 5 hours per week", value: "low" },
                { label: "Medium - 5-10 hours per week", value: "medium" },
                { label: "High - More than 10 hours per week", value: "high" }
              ].map((time) => (
                <label key={time.value} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-hotteach-red/50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="timeCommitment"
                    value={time.value}
                    checked={userPreferences.timeCommitment === time.value}
                    onChange={() => updateUserPreferences({ timeCommitment: time.value as any })}
                    className="text-hotteach-red"
                  />
                  <span>{time.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-md">
          <FadeIn>
            <div className="text-center mb-8">
              <img 
                src="/lovable-uploads/5bd49670-0867-4c7c-8190-423e52c722ce.png" 
                alt="HoTeach Logo" 
                className="h-10 object-contain mx-auto mb-6"
              />
              <ProgressIndicator steps={steps} className="mb-10" />
              <h1 className="text-3xl font-bold mb-2">Set Up Your Profile</h1>
              <p className="text-muted-foreground">
                Help us create your personalized learning experience
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {onboardingSteps[currentStep].title}
                </h2>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {onboardingSteps.length}
                </span>
              </div>
              
              {onboardingSteps[currentStep].fields}
              
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`text-sm font-medium ${
                    currentStep === 0
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-hotteach-red hover:text-hotteach-red/80"
                  }`}
                >
                  Back
                </button>
                
                <FlameButton
                  onClick={handleNext}
                  variant="secondary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  {currentStep < onboardingSteps.length - 1 ? "Next" : "Complete Profile"}
                </FlameButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
