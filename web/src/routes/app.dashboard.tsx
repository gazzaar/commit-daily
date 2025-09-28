import { createFileRoute } from '@tanstack/react-router';
import { useHabits, useToggleHabit } from '../hooks/habits';
import HabitItem from '../components/HabitItem/HabitItem';

export const Route = createFileRoute('/app/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const { data, isLoading, error } = useHabits();
  const toggleHabit = useToggleHabit();

  const handleToggleHabit = async (habitId: string) => {
    try {
      const date = new Date().toISOString().substring(0, 10);
      await toggleHabit.mutateAsync({
        habitId,
        date,
      });
    } catch (err) {}
  };

  if (isLoading) return <h1>...</h1>;
  if (error) return <div> Error {(error as Error).message}</div>;

  return (
    <>
      {data?.habits?.map((h) => (
        <HabitItem habitData={h} key={h.id}>
          <input
            type='checkbox'
            checked={h.completedToday}
            onChange={() => handleToggleHabit(h.id)}
          />
        </HabitItem>
      ))}
    </>
  );
}
