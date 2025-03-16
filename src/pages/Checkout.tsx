
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlameButton from "@/components/FlameButton";
import FlameLoader from "@/components/FlameLoader";
import ProgressIndicator from "@/components/ProgressIndicator";
import { useOnboarding } from "@/context/OnboardingContext";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { setStage, addCompletedStep } = useOnboarding();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      
      // Update onboarding state
      addCompletedStep("checkout");
      setStage("activation");
      
      // Show success toast
      toast.success("Payment successful! Check your email for the activation link.", {
        duration: 5000,
      });
      
      // Navigate to activation page
      navigate("/activate");
    }, 2000);
  };

  const steps = [
    { id: "checkout", label: "Checkout", isActive: true, isCompleted: false },
    { id: "activation", label: "Activation", isActive: false, isCompleted: false },
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
              <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
              <p className="text-muted-foreground">
                One step closer to your personalized learning journey
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="glass-card rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">HotTeach Premium</h2>
              
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span>Monthly Subscription</span>
                <span>$49.99</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span>First Month Discount</span>
                <span className="text-green-500">-$30.00</span>
              </div>
              
              <div className="flex justify-between items-center py-3 font-semibold">
                <span>Total Today</span>
                <span>$19.99</span>
              </div>
              
              <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
                <p>Your subscription will renew at $49.99/month after the first month. You can cancel anytime.</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={400}>
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6">
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full p-3 rounded-lg border ${!isValidEmail ? 'border-red-500' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hotteach-red/30`}
                  placeholder="you@example.com"
                  required
                />
                {!isValidEmail && (
                  <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="card" className="block text-sm font-medium mb-2">
                  Card Information
                </label>
                <div className="w-full p-3 rounded-lg border border-border bg-muted/50 text-center text-muted-foreground">
                  [Secure Payment Form Placeholder]
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This is a demo. No actual payment will be processed.
                </p>
              </div>
              
              <FlameButton
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Pay $19.99
              </FlameButton>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </FadeIn>

          <FadeIn delay={600}>
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

export default Checkout;
