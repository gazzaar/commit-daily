import { createFileRoute } from '@tanstack/react-router';
import { useHabits, useToggleHabit } from '../hooks/habits';
import HabitItem from '../components/HabitItem/HabitItem';
import { Checkbox } from '@heroui/checkbox';

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
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  };

  if (isLoading) return <h1>...</h1>;
  if (error) return <div> Error {(error as Error).message}</div>;

  return (
    <div className='habits'>
      {data?.habits?.map((h) => (
        <HabitItem habitData={h} key={h.id}>
          {(inputId: string) => (
            <>
              <input
                id={inputId}
                type='checkbox'
                checked={h.completedToday}
                onChange={() => handleToggleHabit(h.id)}
              />
              <label htmlFor={inputId}> Complete today</label>
            </>
          )}
        </HabitItem>
      ))}
    </div>
  );
}
