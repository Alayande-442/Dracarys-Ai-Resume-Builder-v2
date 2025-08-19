import { SubscriptionLevel } from "./subscriptions";

interface UsageLimits {
  maxResumes: number;
  maxAIGenerations: number;
  maxCustomResumes: number;
}

export function getUsageLimits(
  subscriptionLevel: SubscriptionLevel,
): UsageLimits {
  return {
    free: {
      maxResumes: 1,
      maxAIGenerations: 1,
      maxCustomResumes: 1,
    },
    pro: {
      maxResumes: 5,
      maxAIGenerations: 5,
      maxCustomResumes: 5,
    },
    "pro-plus": {
      maxResumes: Infinity,
      maxAIGenerations: Infinity,
      maxCustomResumes: Infinity,
    },
  }[subscriptionLevel];
}

export function canUseAITools(
  subscriptionLevel: SubscriptionLevel,
  usageCount: number,
): boolean {
  const { maxAIGenerations } = getUsageLimits(subscriptionLevel);
  return usageCount < maxAIGenerations;
}

export function canUseCustomizations(
  subscriptionLevel: SubscriptionLevel,
  usageCount: number,
): boolean {
  const { maxCustomResumes } = getUsageLimits(subscriptionLevel);
  return usageCount < maxCustomResumes;
}

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
): boolean {
  const { maxResumes } = getUsageLimits(subscriptionLevel);
  return currentResumeCount < maxResumes;
}

// import { SubscriptionLevel } from "./subscriptions";

// export function canCreateResume(
//   subscriptionLevel: SubscriptionLevel,
//   currentResumeCount: number,
// ) {
//   const maxResumeMap: Record<SubscriptionLevel, number> = {
//     free: 1,
//     pro: 3,
//     "pro-plus": Infinity,
//   };
//   const maxResumes = maxResumeMap[subscriptionLevel];

//   return currentResumeCount < maxResumes;
// }

// export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
//   return subscriptionLevel !== "free";
// }

// export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
//   return subscriptionLevel === "pro-plus";
// }
