export const formatStreak = (streak: number) => {
  if (streak === 0) return "No streak!";
  if (streak === 1) return "Current Streak: 1 day";
  return `Current Streak: ${streak} days`;
};
