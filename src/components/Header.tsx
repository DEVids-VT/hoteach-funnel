
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import FlameButton from "./FlameButton";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { stage } = useOnboarding();
  
  // Show header only on certain pages
  const showHeader = !["/checkout", "/activate", "/onboarding"].includes(location.pathname);
  
  // Determine if we're logged in based on the stage
  const isLoggedIn = stage === "complete";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showHeader) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/5bd49670-0867-4c7c-8190-423e52c722ce.png" 
            alt="HoTeach Logo" 
            className="h-10 object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" title="Dashboard" />
              <NavLink to="/projects" title="Projects" />
              <NavLink to="/courses" title="Courses" />
              <NavLink to="/community" title="Community" />
            </>
          ) : (
            <>
              <NavLink to="/#features" title="Features" />
              <NavLink to="/#how-it-works" title="How It Works" />
              <NavLink to="/#testimonials" title="Testimonials" />
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <FlameButton variant="primary" size="sm">
              My Account
            </FlameButton>
          ) : (
            <FlameButton 
              as={Link} 
              to="/#get-started" 
              variant="primary" 
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("get-started");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </FlameButton>
          )}
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  title: string;
}

const NavLink = ({ to, title }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to.startsWith("/#") && location.pathname === "/");

  return (
    <Link
      to={to}
      className={cn(
        "text-sm font-medium transition-colors hover:text-hotteach-red relative",
        isActive ? "text-hotteach-red" : "text-foreground"
      )}
      onClick={(e) => {
        if (to.startsWith("/#")) {
          e.preventDefault();
          const element = document.getElementById(to.split("#")[1]);
          element?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      {title}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-hotteach-red rounded-full" />
      )}
    </Link>
  );
};

export default Header;
