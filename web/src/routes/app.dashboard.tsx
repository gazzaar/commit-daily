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
      await toggleHabit.mutateAsync({
        habitId,
      });
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  };

  if (isLoading) return <h1>...</h1>;
  if (error) return <div> Error {(error as Error).message}</div>;
  if (data?.habits.length < 1) return <p>No habits</p>;

  return (
    <>
      <aside className="habits-header">
        <div>
          <h1>Daily habits</h1>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </aside>
      <div className="habits">
        {data?.habits?.map((h) => (
          <HabitItem habitData={h} key={h.id}>
            {(inputId: string) => (
              <>
                <input
                  id={inputId}
                  type="checkbox"
                  checked={h.completedToday}
                  onChange={() => handleToggleHabit(h.id)}
                />
                <label htmlFor={inputId}> Complete today</label>
              </>
            )}
          </HabitItem>
        ))}
      </div>
    </>
  );
}
