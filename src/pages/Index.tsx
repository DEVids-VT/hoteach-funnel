import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FadeIn from "@/components/animations/FadeIn";
import FlameButton from "@/components/FlameButton";
import { useOnboarding } from "@/context/OnboardingContext";

const Index = () => {
  const navigate = useNavigate();
  const { stage, setStage } = useOnboarding();

  // Redirect if user is already in the onboarding process
  useEffect(() => {
    if (stage === "checkout") {
      navigate("/checkout");
    } else if (stage === "activation") {
      navigate("/activate");
    } else if (stage === "preferences") {
      navigate("/onboarding");
    } else if (stage === "complete") {
      navigate("/dashboard");
    }
  }, [stage, navigate]);

  const handleGetStarted = () => {
    setStage("checkout");
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <HeroSection />

        {/* Features Section */}
        <section
          id="features"
          className="py-20 px-4 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Choose HotTeach?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our platform adapts to your unique learning needs, making
                  education more efficient and enjoyable.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FadeIn key={feature.title} delay={200 * (index + 1)}>
                  <div className="glass-card rounded-xl p-6 h-full">
                    <div className="w-12 h-12 rounded-lg bg-hotteach-red/10 flex items-center justify-center mb-4">
                      <span className="text-hotteach-red text-xl font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our simple 4-step process to get you started on your
                  personalized learning journey.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <FadeIn key={step.title} delay={200 * (index + 1)}>
                  <div className="glass-card rounded-xl p-6 relative">
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-hotteach-red/20 z-10"></div>
                    )}
                    <div className="w-12 h-12 rounded-full bg-hotteach-yellow flex items-center justify-center mb-4">
                      <span className="text-hotteach-dark font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 px-4 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our Users Say
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hear from people who have transformed their learning journey
                  with HotTeach.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <FadeIn key={testimonial.name} delay={200 * (index + 1)}>
                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-hotteach-yellow/10 to-hotteach-red/10">
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Ignite Your Learning Journey?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join thousands of learners who have accelerated their skills
                  with our personalized learning paths.
                </p>
                <FlameButton
                  onClick={handleGetStarted}
                  variant="secondary"
                  size="xl"
                  className="mx-auto mb-8"
                >
                  Click the Big Flaming Button
                </FlameButton>
                <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  <p className="mb-2">
                    One-time purchase: <span className="font-bold">$20</span>
                  </p>
                  <p>100% return within 1 week if you're not satisfied.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="py-12 px-4 bg-white dark:bg-black border-t">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <img
              src="/lovable-uploads/5bd49670-0867-4c7c-8190-423e52c722ce.png"
              alt="HoTeach Logo"
              className="h-10 object-contain mb-4 md:mb-0"
            />
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-hotteach-red transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-hotteach-red transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-hotteach-red transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HotTeach. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Personalized Learning Paths",
    description:
      "AI-powered recommendations tailored to your goals, skill level, and preferred learning style.",
  },
  {
    title: "Project-Based Learning",
    description:
      "Learn by building real-world projects that strengthen your portfolio and practical skills.",
  },
  {
    title: "Supportive Community",
    description:
      "Connect with like-minded learners and mentors who can help guide your journey.",
  },
];

const steps = [
  {
    title: "Sign Up",
    description:
      "Click the big flaming button and complete the checkout process.",
  },
  {
    title: "Activate",
    description:
      "Check your email and click the activation link to create your account.",
  },
  {
    title: "Profile Setup",
    description: "Tell us about your goals, experience level, and interests.",
  },
  {
    title: "Start Learning",
    description:
      "Access your personalized learning path and begin your journey.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Web Developer",
    quote:
      "HotTeach's personalized approach helped me focus on exactly what I needed to learn. I went from beginner to professional in just 6 months!",
  },
  {
    name: "James Wilson",
    role: "Data Scientist",
    quote:
      "The project-based structure was perfect for me. I learned by doing and now have a portfolio that helped me land my dream job.",
  },
];

export default Index;
