"use client";

import { SubscriptionLevel } from "@/lib/subscriptions";
import { error } from "console";
import { createContext, ReactNode, useContext } from "react";

const SubScriptionLevelContext = createContext<SubscriptionLevel | undefined>(
  undefined,
);

interface SubscriptionLevelProviderProps {
  children: ReactNode;
  userSubscriptionLevel: SubscriptionLevel;
}

export default function SubscriptionLevelProvider({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) {
  return (
    <SubScriptionLevelContext.Provider value={userSubscriptionLevel}>
      {children}
    </SubScriptionLevelContext.Provider>
  );
}

// COMMENT hook for subscription level

export function useSubscriptionLevel() {
  const context = useContext(SubScriptionLevelContext);
  if (context === undefined) {
    throw new Error(
      "useSubscriptionLevel must be used within a SubscriptionLevelProvider",
    );
  }
  return context;
}
