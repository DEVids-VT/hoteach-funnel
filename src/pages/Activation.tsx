
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlameButton from "@/components/FlameButton";
import FlameLoader from "@/components/FlameLoader";
import ProgressIndicator from "@/components/ProgressIndicator";
import { useOnboarding } from "@/context/OnboardingContext";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";

const Activation = () => {
  const navigate = useNavigate();
  const { stage, setStage, addCompletedStep } = useOnboarding();
  const [isActivating, setIsActivating] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showActivationSuccess, setShowActivationSuccess] = useState(false);

  // Redirect if not in the correct stage
  useEffect(() => {
    if (stage !== "activation" && stage !== "preferences") {
      navigate("/");
    }
  }, [stage, navigate]);

  // Simulate email activation process
  const handleActivate = () => {
    setIsActivating(true);
    
    // Simulate activation process
    setTimeout(() => {
      setIsActivating(false);
      setShowActivationSuccess(true);
      
      // Start countdown for redirection
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Update onboarding state
            addCompletedStep("activation");
            setStage("preferences");
            // Navigate to onboarding
            navigate("/onboarding");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Show success toast
      toast.success("Account successfully activated!", {
        duration: 3000,
      });
      
      return () => clearInterval(timer);
    }, 2000);
  };

  const steps = [
    { id: "checkout", label: "Checkout", isActive: false, isCompleted: true },
    { id: "activation", label: "Activation", isActive: true, isCompleted: false },
    { id: "onboarding", label: "Onboarding", isActive: false, isCompleted: false },
    { id: "complete", label: "Complete", isActive: false, isCompleted: false }
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
              {!showActivationSuccess ? (
                <>
                  <h1 className="text-3xl font-bold mb-2">Activate Your Account</h1>
                  <p className="text-muted-foreground">
                    We've sent an activation link to your email
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold mb-2">Account Activated!</h1>
                  <p className="text-muted-foreground">
                    You're all set! Let's set up your learning preferences.
                  </p>
                </>
              )}
            </div>
          </FadeIn>

          {!showActivationSuccess ? (
            <FadeIn delay={200}>
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="mb-6">
                  <FlameLoader size="md" className="mx-auto" />
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Check Your Email</h2>
                <p className="text-muted-foreground mb-6">
                  We've sent an activation link to your email address. Click the link to activate your account.
                </p>
                
                <div className="p-4 bg-muted rounded-lg mb-6">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Note:</span> This is a demo. In a real application, you would receive an email with an activation link.
                  </p>
                </div>
                
                <FlameButton
                  onClick={handleActivate}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  isLoading={isActivating}
                >
                  {isActivating ? "Activating..." : "Simulate Activation"}
                </FlameButton>
                
                <div className="mt-6">
                  <button 
                    className="text-sm text-muted-foreground hover:text-hotteach-red transition-colors"
                  >
                    Resend activation email
                  </button>
                </div>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={200}>
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Activation Successful!</h2>
                <p className="text-muted-foreground mb-6">
                  Your account has been activated. You're now ready to set up your learning preferences.
                </p>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Redirecting in <span className="font-semibold">{countdown}</span> seconds...
                </p>
                
                <FlameButton
                  onClick={() => {
                    addCompletedStep("activation");
                    setStage("preferences");
                    navigate("/onboarding");
                  }}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Continue to Onboarding
                </FlameButton>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={400}>
            <div className="mt-6 text-center">
              <button 
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground hover:text-hotteach-red transition-colors"
              >
                ← Return to Home
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Activation;
