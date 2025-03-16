
import React, { createContext, useState, useContext, ReactNode } from "react";

type OnboardingStage = "landing" | "checkout" | "activation" | "preferences" | "complete";

type UserPreferences = {
  name: string;
  email: string;
  goals: string[];
  experience: "beginner" | "intermediate" | "advanced";
  interests: string[];
  timeCommitment: "low" | "medium" | "high";
};

interface OnboardingContextType {
  stage: OnboardingStage;
  setStage: (stage: OnboardingStage) => void;
  userPreferences: UserPreferences;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  completedSteps: OnboardingStage[];
  addCompletedStep: (step: OnboardingStage) => void;
}

const defaultUserPreferences: UserPreferences = {
  name: "",
  email: "",
  goals: [],
  experience: "beginner",
  interests: [],
  timeCommitment: "medium",
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [stage, setStage] = useState<OnboardingStage>("landing");
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultUserPreferences);
  const [completedSteps, setCompletedSteps] = useState<OnboardingStage[]>([]);

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    setUserPreferences((prev) => ({ ...prev, ...preferences }));
  };

  const addCompletedStep = (step: OnboardingStage) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        stage,
        setStage,
        userPreferences,
        updateUserPreferences,
        completedSteps,
        addCompletedStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
