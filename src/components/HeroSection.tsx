import { useNavigate } from "react-router-dom";
import FlameButton from "./FlameButton";
import FadeIn from "./animations/FadeIn";
import { useOnboarding } from "@/context/OnboardingContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { setStage } = useOnboarding();

  const handleGetStarted = () => {
    setStage("checkout");
    navigate("/checkout");
  };

  return (
    <section
      id="get-started"
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black -z-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-hotteach-yellow/10 blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-64 h-64 rounded-full bg-hotteach-red/10 blur-3xl"></div>

      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <FadeIn delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ignite Your Learning Journey with{" "}
                <span className="text-hotteach-red">Hot</span>
                <span className="text-hotteach-yellow">Teach</span>
              </h1>
            </FadeIn>

            <FadeIn delay={400}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Personalized learning paths that adapt to your goals, skill
                level, and interests. Start your journey to mastery today!
              </p>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="flex flex-col sm:flex-row gap-4">
                <FlameButton
                  onClick={handleGetStarted}
                  variant="secondary"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  Click the Big Flaming Button
                </FlameButton>
              </div>
            </FadeIn>

            <FadeIn delay={800}>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">500+</span> users have joined
                  this week
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <FadeIn delay={300} direction="down">
              <div className="relative w-full max-w-md">
                <img
                  src="/lovable-uploads/fc3d01d3-2458-402a-a8dc-bbf4ff606e77.png"
                  alt="HoTeach"
                  className="w-full h-auto object-contain animate-float"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
