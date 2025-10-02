export const formatStreak = (streak: number) => {
  if (streak === 0) return 'No streak!';
  if (streak === 1) return '🎯 1 day streak';
  return `🎯 ${streak} days streak`;
};
